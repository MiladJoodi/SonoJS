"use client"

import * as React from "react"
import {
  CartesianGrid,
  Scatter,
  ScatterChart as RechartsScatterChart,
  XAxis,
  YAxis,
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
 * Joint Line Scatter Chart — dual-series points joined with `lineType="joint"`.
 * Teaching delta vs `simple-scatter-chart`: connecting stroke in data order.
 * Locked chrome + metric scrubber. Spec: `registry/charts/PORT.md`
 * Installs to: components/charts/joint-line-scatter-chart.tsx
 */

export type JointLineScatterPoint = {
  /** Continuous X (demo: height cm). */
  x: number
  /** Continuous Y (demo: weight kg). */
  y: number
}

export type JointLineScatterChartProps = {
  title?: string
  subtitle?: string
  /** Primary series (`--chart-1`). */
  seriesA?: JointLineScatterPoint[]
  /** Secondary series (`--chart-2`). */
  seriesB?: JointLineScatterPoint[]
  seriesALabel?: string
  seriesBLabel?: string
  xLabel?: string
  yLabel?: string
  className?: string
  /** Value-axis side / X reverse. Omit to follow page `dir`. */
  plotDir?: "ltr" | "rtl"
  /** Hover / touch / keyboard scrub across all points. Default on. */
  scrub?: boolean
}

const NARROW_MQ = "(max-width: 639px)"
const ANIM_MS = 200
const AXIS_TICK_FILL =
  "color-mix(in oklab, var(--foreground) 58%, transparent)"

type SeriesKey = "a" | "b"

type FlatPoint = JointLineScatterPoint & {
  series: SeriesKey
  id: string
}

/** Group A — height (cm) × weight (kg). */
const DEMO_A: JointLineScatterPoint[] = [
  { x: 158, y: 52 },
  { x: 162, y: 58 },
  { x: 165, y: 61 },
  { x: 168, y: 64 },
  { x: 171, y: 68 },
  { x: 174, y: 72 },
  { x: 177, y: 75 },
  { x: 180, y: 79 },
]

/** Group B — slightly taller / heavier cluster. */
const DEMO_B: JointLineScatterPoint[] = [
  { x: 166, y: 70 },
  { x: 169, y: 74 },
  { x: 173, y: 78 },
  { x: 176, y: 82 },
  { x: 179, y: 86 },
  { x: 182, y: 90 },
  { x: 185, y: 94 },
  { x: 188, y: 98 },
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
  seriesA: JointLineScatterPoint[],
  seriesB: JointLineScatterPoint[]
): FlatPoint[] {
  const rows: FlatPoint[] = [
    ...seriesA.map((p, i) => ({
      ...p,
      series: "a" as const,
      id: `a-${i}-${p.x}-${p.y}`,
    })),
    ...seriesB.map((p, i) => ({
      ...p,
      series: "b" as const,
      id: `b-${i}-${p.x}-${p.y}`,
    })),
  ]
  return rows.sort((left, right) => left.x - right.x || left.y - right.y)
}

function JointLineScatterChart({
  title = "Height vs Weight",
  subtitle = "Points joined in order — teaching joint line scatter.",
  seriesA = DEMO_A,
  seriesB = DEMO_B,
  seriesALabel = "Group A",
  seriesBLabel = "Group B",
  xLabel = "Height (cm)",
  yLabel = "Weight (kg)",
  className,
  plotDir,
  scrub = true,
}: JointLineScatterChartProps) {
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
      }) satisfies ChartConfig,
    [seriesALabel, seriesBLabel]
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
  const metricValue = active?.y ?? 0
  const prevValue = previous?.y ?? null
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
      ? `${seriesLabel} · ${xLabel} ${formatNumber(active.x, locale)}`
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

  const announce = React.useCallback(
    (index: number) => {
      const point = flat[index]
      if (!point || !liveRef.current) return
      const name = point.series === "a" ? seriesALabel : seriesBLabel
      liveRef.current.textContent = `${name}, ${xLabel} ${formatNumber(point.x, locale)}, ${yLabel} ${formatNumber(point.y, locale)}`
    },
    [flat, locale, seriesALabel, seriesBLabel, xLabel, yLabel]
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
    (chartState: {
      activePayload?: ReadonlyArray<{
        payload?: JointLineScatterPoint & { series?: SeriesKey }
      }>
    }) => {
      if (!scrub) return
      const row = chartState.activePayload?.[0]?.payload
      if (!row || row.x == null || row.y == null) return
      const idx = flat.findIndex(
        (p) =>
          p.x === row.x &&
          p.y === row.y &&
          (row.series == null || p.series === row.series)
      )
      if (idx < 0) return
      scrubbingRef.current = true
      setScrubbing(true)
      setActiveIndex(idx)
    },
    [flat, scrub]
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

  const pointOpacity = (point: FlatPoint) => {
    if (!liveScrubbing || !active) return 1
    return point.id === active.id ? 1 : 0.28
  }

  const pointRadius = (point: FlatPoint) => {
    if (!liveScrubbing || !active) return 5
    return point.id === active.id ? 7 : 4
  }

  const ariaLabel = React.useMemo(() => {
    if (!active) return title
    const deltaText =
      deltaPct == null
        ? ""
        : `, ${deltaUp ? "up" : "down"} ${Math.abs(deltaPct).toFixed(1)}% vs previous`
    return `Joint line scatter chart, ${title}, ${caption}, ${yLabel} ${formatNumber(metricValue, locale)}${deltaText}`
  }, [
    active,
    caption,
    deltaPct,
    deltaUp,
    locale,
    metricValue,
    title,
    yLabel,
  ])

  const seriesAPlot = React.useMemo(
    () => seriesA.map((p, i) => ({ ...p, series: "a" as const, id: `a-${i}-${p.x}-${p.y}` })),
    [seriesA]
  )
  const seriesBPlot = React.useMemo(
    () => seriesB.map((p, i) => ({ ...p, series: "b" as const, id: `b-${i}-${p.x}-${p.y}` })),
    [seriesB]
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
                    top: 12,
                    right: plotRtl ? 8 : 12,
                    left: plotRtl ? 12 : 8,
                    bottom: 36,
                  }
                : { top: 16, right: 16, left: 8, bottom: 40 }
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
                      <div className="flex w-full min-w-[8rem] flex-col gap-1">
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
              line={{
                stroke: "var(--color-a)",
                strokeWidth: 1.75,
                strokeOpacity: liveScrubbing ? 0.55 : 0.9,
              }}
              lineType="joint"
              isAnimationActive={!reducedMotion && !liveScrubbing}
              animationDuration={reducedMotion ? 0 : ANIM_MS}
              animationEasing="ease-out"
              shape={(props) => {
                const point = props.payload as FlatPoint
                return (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={pointRadius(point)}
                    fill="var(--color-a)"
                    fillOpacity={pointOpacity(point)}
                    className={cn(
                      "outline-none",
                      !reducedMotion &&
                        "transition-[fill-opacity] duration-200 ease-out"
                    )}
                    style={{ cursor: scrub ? "pointer" : undefined }}
                  />
                )
              }}
            />
            <Scatter
              name="b"
              data={seriesBPlot}
              fill="var(--color-b)"
              stroke="none"
              line={{
                stroke: "var(--color-b)",
                strokeWidth: 1.75,
                strokeOpacity: liveScrubbing ? 0.55 : 0.9,
              }}
              lineType="joint"
              isAnimationActive={!reducedMotion && !liveScrubbing}
              animationDuration={reducedMotion ? 0 : ANIM_MS}
              animationEasing="ease-out"
              shape={(props) => {
                const point = props.payload as FlatPoint
                return (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={pointRadius(point)}
                    fill="var(--color-b)"
                    fillOpacity={pointOpacity(point)}
                    className={cn(
                      "outline-none",
                      !reducedMotion &&
                        "transition-[fill-opacity] duration-200 ease-out"
                    )}
                    style={{ cursor: scrub ? "pointer" : undefined }}
                  />
                )
              }}
            />
          </RechartsScatterChart>
        </ChartContainer>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span
            className="relative flex size-3 shrink-0 items-center justify-center"
            aria-hidden
          >
            <span
              className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
              style={{ backgroundColor: CHART_SERIES_A }}
            />
            <span
              className="relative size-2 rounded-full"
              style={{ backgroundColor: CHART_SERIES_A }}
            />
          </span>
          <span className="text-foreground">{seriesALabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="relative flex size-3 shrink-0 items-center justify-center"
            aria-hidden
          >
            <span
              className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
              style={{ backgroundColor: CHART_SERIES_B }}
            />
            <span
              className="relative size-2 rounded-full"
              style={{ backgroundColor: CHART_SERIES_B }}
            />
          </span>
          <span className="text-foreground">{seriesBLabel}</span>
        </div>
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
          </tr>
        </thead>
        <tbody>
          {flat.map((row) => (
            <tr key={row.id}>
              <td>{row.series === "a" ? seriesALabel : seriesBLabel}</td>
              <td>{row.x}</td>
              <td>{row.y}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Docs / gallery default export. */
export default function JointLineScatterChartDemo(
  props: JointLineScatterChartProps
) {
  return <JointLineScatterChart {...props} />
}

export { JointLineScatterChart }
