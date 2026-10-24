"use client"

import * as React from "react"
import {
  CartesianGrid,
  Scatter,
  ScatterChart as RechartsScatterChart,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts"

import { cn } from "@/lib/utils"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

import {
  CHART_SERIES_A,
  CHART_SERIES_B,
  chartLineContainerClassName,
} from "../_lib/chart-styles"
import { useChartDir } from "../_lib/use-chart-dir"
import { usePrefersReducedMotion } from "../_lib/use-prefers-reduced-motion"

/**
 * Bubble Chart — dual-series scatter with `ZAxis` sizing (navy × orange).
 * Teaching delta vs `simple-scatter-chart`: bubble radius encodes `z`.
 * Locked chrome + metric scrubber. Spec: `registry/charts/PORT.md`
 * Installs to: components/charts/bubble-chart.tsx
 */

export type BubbleChartPoint = {
  /** Continuous X (demo: height cm). */
  x: number
  /** Continuous Y (demo: weight kg). */
  y: number
  /** Bubble size (demo: activity score). */
  z: number
}

export type BubbleChartProps = {
  title?: string
  subtitle?: string
  /** Primary series (`--chart-1`). */
  seriesA?: BubbleChartPoint[]
  /** Secondary series (`--chart-2`). */
  seriesB?: BubbleChartPoint[]
  seriesALabel?: string
  seriesBLabel?: string
  xLabel?: string
  yLabel?: string
  zLabel?: string
  className?: string
  /** Value-axis side / X reverse. Omit to follow page `dir`. */
  plotDir?: "ltr" | "rtl"
  /** Hover / touch / keyboard scrub across all bubbles. Default on. */
  scrub?: boolean
}

const NARROW_MQ = "(max-width: 639px)"
const ANIM_MS = 200
const AXIS_TICK_FILL =
  "color-mix(in oklab, var(--foreground) 58%, transparent)"
/** Pixel area range for ZAxis → bubble radius. */
const Z_RANGE: [number, number] = [48, 360]

type SeriesKey = "a" | "b"

type FlatPoint = BubbleChartPoint & {
  series: SeriesKey
  id: string
}

/** Group A — height × weight × activity score. */
const DEMO_A: BubbleChartPoint[] = [
  { x: 158, y: 52, z: 80 },
  { x: 162, y: 58, z: 140 },
  { x: 165, y: 61, z: 110 },
  { x: 168, y: 64, z: 200 },
  { x: 171, y: 68, z: 160 },
  { x: 174, y: 72, z: 240 },
  { x: 177, y: 75, z: 180 },
  { x: 180, y: 79, z: 280 },
]

/** Group B — slightly taller / heavier cluster. */
const DEMO_B: BubbleChartPoint[] = [
  { x: 166, y: 70, z: 120 },
  { x: 169, y: 74, z: 190 },
  { x: 173, y: 78, z: 150 },
  { x: 176, y: 82, z: 260 },
  { x: 179, y: 86, z: 210 },
  { x: 182, y: 90, z: 300 },
  { x: 185, y: 94, z: 230 },
  { x: 188, y: 98, z: 340 },
]

const SCATTER_TOOLTIP_CURSOR = {
  stroke: "color-mix(in oklab, var(--foreground) 18%, transparent)",
  strokeWidth: 1,
  strokeDasharray: "4 4",
} as const

function useNarrowViewport() {
  const [narrow, setNarrow] = React.useState(false)

  React.useEffect(() => {
    const mql = window.matchMedia(NARROW_MQ)
    const onChange = () => setNarrow(mql.matches)
    onChange()
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return narrow
}

function formatNumber(value: number, locale: string, digits = 0) {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value)
}

function flattenSeries(
  seriesA: BubbleChartPoint[],
  seriesB: BubbleChartPoint[]
): FlatPoint[] {
  const rows: FlatPoint[] = [
    ...seriesA.map((p, i) => ({
      ...p,
      series: "a" as const,
      id: `a-${i}-${p.x}-${p.y}-${p.z}`,
    })),
    ...seriesB.map((p, i) => ({
      ...p,
      series: "b" as const,
      id: `b-${i}-${p.x}-${p.y}-${p.z}`,
    })),
  ]
  return rows.sort((left, right) => left.x - right.x || left.y - right.y)
}

function BubbleChart({
  title = "Height vs Weight",
  subtitle = "Bubble size encodes activity score — teaching ZAxis sizing.",
  seriesA = DEMO_A,
  seriesB = DEMO_B,
  seriesALabel = "Group A",
  seriesBLabel = "Group B",
  xLabel = "Height (cm)",
  yLabel = "Weight (kg)",
  zLabel = "Score",
  className,
  plotDir,
  scrub = true,
}: BubbleChartProps) {
  const { dir, ref } = useChartDir()
  const plotRtl = (plotDir ?? dir) === "rtl"
  const narrow = useNarrowViewport()
  const reducedMotion = usePrefersReducedMotion()
  const chartAreaRef = React.useRef<HTMLDivElement>(null)
  const liveRef = React.useRef<HTMLParagraphElement>(null)
  const scrubbingRef = React.useRef(false)
  const locale = "en"

  const chartConfig = React.useMemo(
    () =>
      ({
        a: { label: seriesALabel, color: CHART_SERIES_A },
        b: { label: seriesBLabel, color: CHART_SERIES_B },
        z: { label: zLabel },
      }) satisfies ChartConfig,
    [seriesALabel, seriesBLabel, zLabel]
  )

  const flat = React.useMemo(
    () => flattenSeries(seriesA, seriesB),
    [seriesA, seriesB]
  )
  const lastIndex = Math.max(0, flat.length - 1)

  const [activeIndex, setActiveIndex] = React.useState(lastIndex)
  const [scrubbing, setScrubbing] = React.useState(false)
  const [dataTrack, setDataTrack] = React.useState({ flat, lastIndex })
  if (dataTrack.flat !== flat || dataTrack.lastIndex !== lastIndex) {
    setDataTrack({ flat, lastIndex })
    setActiveIndex(lastIndex)
    setScrubbing(false)
  }

  const liveScrubbing = scrub && scrubbing
  const liveIndex = liveScrubbing ? activeIndex : lastIndex
  const active = flat[liveIndex] ?? flat[lastIndex]
  const previous = liveIndex > 0 ? flat[liveIndex - 1] : null
  const metricValue = active?.z ?? 0
  const prevValue = previous?.z ?? null
  const deltaPct =
    prevValue != null && prevValue !== 0
      ? ((metricValue - prevValue) / prevValue) * 100
      : null
  const deltaUp = deltaPct != null && deltaPct >= 0
  const seriesLabel =
    active != null
      ? active.series === "a"
        ? seriesALabel
        : seriesBLabel
      : ""
  const caption =
    active != null
      ? `${seriesLabel} · ${xLabel} ${formatNumber(active.x, locale)} · ${yLabel} ${formatNumber(active.y, locale)}`
      : ""

  const xDomain = React.useMemo(() => {
    const xs = flat.map((p) => p.x)
    const min = Math.min(...xs, 150)
    const max = Math.max(...xs, 190)
    const pad = Math.max(2, (max - min) * 0.08)
    return [Math.floor(min - pad), Math.ceil(max + pad)] as [number, number]
  }, [flat])

  const yDomain = React.useMemo(() => {
    const ys = flat.map((p) => p.y)
    const min = Math.min(...ys, 40)
    const max = Math.max(...ys, 100)
    const pad = Math.max(4, (max - min) * 0.1)
    const lo = Math.max(0, Math.floor((min - pad) / 5) * 5)
    const hi = Math.ceil((max + pad) / 5) * 5
    return [lo, hi] as [number, number]
  }, [flat])

  const zDomain = React.useMemo(() => {
    const zs = flat.map((p) => p.z)
    return [0, Math.max(...zs, 1)] as [number, number]
  }, [flat])

  const announce = React.useCallback(
    (index: number) => {
      const point = flat[index]
      if (!point || !liveRef.current) return
      const name = point.series === "a" ? seriesALabel : seriesBLabel
      liveRef.current.textContent = `${name}, ${xLabel} ${formatNumber(point.x, locale)}, ${yLabel} ${formatNumber(point.y, locale)}, ${zLabel} ${formatNumber(point.z, locale)}`
    },
    [flat, locale, seriesALabel, seriesBLabel, xLabel, yLabel, zLabel]
  )

  const moveActive = React.useCallback(
    (next: number, fromKeyboard = false) => {
      const clamped = Math.min(lastIndex, Math.max(0, next))
      setActiveIndex(clamped)
      if (fromKeyboard) announce(clamped)
    },
    [announce, lastIndex]
  )

  const indexFromClientX = React.useCallback(
    (clientX: number) => {
      const el = chartAreaRef.current
      if (!el || flat.length === 0) return lastIndex
      const rect = el.getBoundingClientRect()
      if (rect.width <= 0) return lastIndex
      let ratio = (clientX - rect.left) / rect.width
      if (plotRtl) ratio = 1 - ratio
      ratio = Math.min(1, Math.max(0, ratio))
      const [xMin, xMax] = xDomain
      const xVal = xMin + ratio * (xMax - xMin)
      let best = 0
      let bestDist = Infinity
      flat.forEach((p, i) => {
        const d = Math.abs(p.x - xVal)
        if (d < bestDist) {
          bestDist = d
          best = i
        }
      })
      return best
    },
    [flat, lastIndex, plotRtl, xDomain]
  )

  const onChartMouseMove = React.useCallback(
    (
      _state: unknown,
      event: React.MouseEvent<SVGGraphicsElement>
    ) => {
      if (!scrub) return
      scrubbingRef.current = true
      setScrubbing(true)
      setActiveIndex(indexFromClientX(event.clientX))
    },
    [indexFromClientX, scrub]
  )

  const onChartMouseLeave = React.useCallback(() => {
    if (!scrub) return
    scrubbingRef.current = false
    setScrubbing(false)
    setActiveIndex(lastIndex)
  }, [lastIndex, scrub])

  React.useEffect(() => {
    const el = chartAreaRef.current
    if (!el || !scrub) return

    const onStart = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      scrubbingRef.current = true
      setScrubbing(true)
      setActiveIndex(indexFromClientX(t.clientX))
    }

    const onMove = (e: TouchEvent) => {
      if (!scrubbingRef.current) return
      const t = e.touches[0]
      if (!t) return
      e.preventDefault()
      setActiveIndex(indexFromClientX(t.clientX))
    }

    const onEnd = () => {
      scrubbingRef.current = false
      setScrubbing(false)
      setActiveIndex(lastIndex)
    }

    el.addEventListener("touchstart", onStart, { passive: true })
    el.addEventListener("touchmove", onMove, { passive: false })
    el.addEventListener("touchend", onEnd)
    el.addEventListener("touchcancel", onEnd)
    return () => {
      el.removeEventListener("touchstart", onStart)
      el.removeEventListener("touchmove", onMove)
      el.removeEventListener("touchend", onEnd)
      el.removeEventListener("touchcancel", onEnd)
    }
  }, [indexFromClientX, lastIndex, scrub])

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!scrub) return
      const reverse = plotRtl
      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault()
          scrubbingRef.current = true
          setScrubbing(true)
          moveActive(activeIndex + (reverse ? 1 : -1), true)
          break
        case "ArrowRight":
          event.preventDefault()
          scrubbingRef.current = true
          setScrubbing(true)
          moveActive(activeIndex + (reverse ? -1 : 1), true)
          break
        case "Home":
          event.preventDefault()
          scrubbingRef.current = true
          setScrubbing(true)
          moveActive(reverse ? lastIndex : 0, true)
          break
        case "End":
          event.preventDefault()
          scrubbingRef.current = true
          setScrubbing(true)
          moveActive(reverse ? 0 : lastIndex, true)
          break
        case "Escape":
          event.preventDefault()
          scrubbingRef.current = false
          setScrubbing(false)
          moveActive(lastIndex, true)
          break
        default:
          break
      }
    },
    [activeIndex, lastIndex, moveActive, plotRtl, scrub]
  )

  const ariaLabel = React.useMemo(() => {
    if (!active) return title
    const deltaText =
      deltaPct == null
        ? ""
        : `, ${deltaUp ? "up" : "down"} ${Math.abs(deltaPct).toFixed(1)}% vs previous`
    return `Bubble chart, ${title}, ${caption}, ${zLabel} ${formatNumber(metricValue, locale)}${deltaText}`
  }, [
    active,
    caption,
    deltaPct,
    deltaUp,
    locale,
    metricValue,
    title,
    zLabel,
  ])

  const seriesAPlot = React.useMemo(
    () =>
      seriesA.map((p, i) => ({
        ...p,
        series: "a" as const,
        id: `a-${i}-${p.x}-${p.y}-${p.z}`,
      })),
    [seriesA]
  )
  const seriesBPlot = React.useMemo(
    () =>
      seriesB.map((p, i) => ({
        ...p,
        series: "b" as const,
        id: `b-${i}-${p.x}-${p.y}-${p.z}`,
      })),
    [seriesB]
  )

  const renderBubble = React.useCallback(
    (
      props: {
        cx?: number
        cy?: number
        width?: number
        height?: number
        payload?: FlatPoint
      },
      fill: string
    ) => {
      const point = props.payload
      if (
        point == null ||
        props.cx == null ||
        props.cy == null ||
        !Number.isFinite(props.cx) ||
        !Number.isFinite(props.cy)
      ) {
        return null
      }
      const baseR = Math.max(4, (props.width ?? 10) / 2)
      const isActive = liveScrubbing && active && point.id === active.id
      const fillOpacity = !liveScrubbing || !active ? 0.72 : isActive ? 0.95 : 0.22
      const activeBoost = isActive ? 1.12 : 1
      return (
        <circle
          cx={props.cx}
          cy={props.cy}
          r={baseR * activeBoost}
          fill={fill}
          fillOpacity={fillOpacity}
          stroke="var(--background)"
          strokeWidth={1}
          className={cn(
            "outline-none",
            !reducedMotion &&
              "transition-[fill-opacity] duration-200 ease-out"
          )}
          style={{ cursor: scrub ? "pointer" : undefined }}
        />
      )
    },
    [active, liveScrubbing, reducedMotion, scrub]
  )

  return (
    <div
      ref={ref}
      className={cn(
        "mx-auto flex w-full min-w-0 max-w-[640px] flex-col gap-5 font-sans tabular-nums sm:gap-6",
        className
      )}
    >
      <header className="flex flex-col gap-4">
        <div className="space-y-1">
          <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>

        <div className="space-y-1">
          <div className="flex flex-wrap items-baseline gap-2">
            <p
              className="text-[2rem] font-semibold leading-9 tracking-tight text-foreground"
              aria-hidden
            >
              {formatNumber(metricValue, locale)}
            </p>
            {deltaPct != null ? (
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium tabular-nums",
                  deltaUp ? "text-[var(--chart-up)]" : "text-destructive"
                )}
                style={{
                  backgroundColor: deltaUp
                    ? "color-mix(in oklab, var(--chart-up) 12%, transparent)"
                    : "color-mix(in oklab, var(--destructive) 12%, transparent)",
                }}
              >
                <span aria-hidden>{deltaUp ? "▲" : "▼"}</span>
                {Math.abs(deltaPct).toFixed(1)}%
                <span className="font-normal text-muted-foreground">
                  vs previous
                </span>
              </span>
            ) : (
              <span className="text-xs text-muted-foreground">—</span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{caption}</p>
        </div>
      </header>

      <p ref={liveRef} className="sr-only" aria-live="polite" />

      <div
        ref={chartAreaRef}
        dir="ltr"
        role="img"
        aria-label={ariaLabel}
        tabIndex={scrub ? 0 : undefined}
        onKeyDown={scrub ? onKeyDown : undefined}
        onBlur={
          scrub
            ? () => {
                scrubbingRef.current = false
                setScrubbing(false)
                setActiveIndex(lastIndex)
              }
            : undefined
        }
        className="touch-pan-y rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <ChartContainer
          config={chartConfig}
          className={cn(chartLineContainerClassName, "max-w-none")}
        >
          <RechartsScatterChart
            accessibilityLayer
            margin={
              narrow
                ? {
                    top: 16,
                    right: plotRtl ? 8 : 12,
                    left: plotRtl ? 12 : 8,
                    bottom: 36,
                  }
                : { top: 20, right: 16, left: 8, bottom: 40 }
            }
            onMouseMove={scrub ? onChartMouseMove : undefined}
            onMouseLeave={scrub ? onChartMouseLeave : undefined}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="4 4"
              stroke="var(--border)"
              strokeOpacity={0.4}
            />
            <XAxis
              type="number"
              dataKey="x"
              name={xLabel}
              reversed={plotRtl}
              domain={xDomain}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{
                fontSize: 12,
                fill: AXIS_TICK_FILL,
              }}
              tickFormatter={(value: number) => formatNumber(value, locale)}
              label={{
                value: xLabel,
                position: "bottom",
                offset: 16,
                style: {
                  fontSize: 11,
                  fill: "var(--muted-foreground)",
                  fontFamily: "var(--font-sans)",
                },
              }}
              className="tabular-nums"
            />
            <YAxis
              type="number"
              dataKey="y"
              name={yLabel}
              orientation={plotRtl ? "right" : "left"}
              width={narrow ? 36 : 44}
              domain={yDomain}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{
                fontSize: 12,
                fill: AXIS_TICK_FILL,
              }}
              tickFormatter={(value: number) => formatNumber(value, locale)}
              className="tabular-nums"
            />
            <ZAxis
              type="number"
              dataKey="z"
              name={zLabel}
              domain={zDomain}
              range={Z_RANGE}
            />
            <ChartTooltip
              shared={false}
              cursor={SCATTER_TOOLTIP_CURSOR}
              content={
                <ChartTooltipContent
                  className="rounded-xl border-border/60 shadow-sm"
                  labelFormatter={(_, payload) => {
                    const row = payload?.[0]?.payload as
                      | FlatPoint
                      | undefined
                    if (!row) return ""
                    return `${xLabel} ${formatNumber(row.x, locale)}`
                  }}
                  formatter={(_value, _name, item, index) => {
                    if (item?.dataKey != null && item.dataKey !== "y") return null
                    if (item?.dataKey == null && index !== 0) return null
                    const row = item?.payload as FlatPoint | undefined
                    if (!row) return null
                    const key = (row.series ?? "a") as SeriesKey
                    const label = chartConfig[key]?.label ?? key
                    const color = chartConfig[key]?.color ?? CHART_SERIES_A
                    return (
                      <div className="flex w-full min-w-[9rem] flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <span
                            className="size-2.5 shrink-0 rounded-full"
                            style={{ background: color }}
                            aria-hidden
                          />
                          <span className="text-muted-foreground">{label}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4 leading-none">
                          <span className="text-muted-foreground">{yLabel}</span>
                          <span className="font-medium tabular-nums text-foreground">
                            {formatNumber(row.y, locale)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4 leading-none">
                          <span className="text-muted-foreground">{zLabel}</span>
                          <span className="font-medium tabular-nums text-foreground">
                            {formatNumber(row.z, locale)}
                          </span>
                        </div>
                      </div>
                    )
                  }}
                />
              }
            />
            <Scatter
              name="a"
              data={seriesAPlot}
              fill="var(--color-a)"
              stroke="none"
              isAnimationActive={!reducedMotion && !liveScrubbing}
              animationDuration={reducedMotion ? 0 : ANIM_MS}
              animationEasing="ease-out"
              shape={(props) => renderBubble(props, "var(--color-a)")}
            />
            <Scatter
              name="b"
              data={seriesBPlot}
              fill="var(--color-b)"
              stroke="none"
              isAnimationActive={!reducedMotion && !liveScrubbing}
              animationDuration={reducedMotion ? 0 : ANIM_MS}
              animationEasing="ease-out"
              shape={(props) => renderBubble(props, "var(--color-b)")}
            />
          </RechartsScatterChart>
        </ChartContainer>
      </div>

      <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <div className="flex items-center gap-2">
            <span
              className="size-2.5 shrink-0 rounded-full opacity-80"
              style={{ backgroundColor: CHART_SERIES_A }}
              aria-hidden
            />
            <span className="text-foreground">{seriesALabel}</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="size-2.5 shrink-0 rounded-full opacity-80"
              style={{ backgroundColor: CHART_SERIES_B }}
              aria-hidden
            />
            <span className="text-foreground">{seriesBLabel}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Bubble size = {zLabel.toLowerCase()}
        </p>
      </div>

      <table className="sr-only">
        <caption>
          {title}. {subtitle}
        </caption>
        <thead>
          <tr>
            <th>Group</th>
            <th>{xLabel}</th>
            <th>{yLabel}</th>
            <th>{zLabel}</th>
          </tr>
        </thead>
        <tbody>
          {flat.map((row) => (
            <tr key={row.id}>
              <td>{row.series === "a" ? seriesALabel : seriesBLabel}</td>
              <td>{row.x}</td>
              <td>{row.y}</td>
              <td>{row.z}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Docs / gallery default export. */
export default function BubbleChartDemo(props: BubbleChartProps) {
  return <BubbleChart {...props} />
}

export { BubbleChart }
