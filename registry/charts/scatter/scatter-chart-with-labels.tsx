"use client"

import * as React from "react"
import {
  CartesianGrid,
  LabelList,
  Scatter,
  ScatterChart as RechartsScatterChart,
  XAxis,
  YAxis,
  ZAxis,
  type LabelProps,
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
  chartLineContainerClassName,
} from "../_lib/chart-styles"
import { useChartDir } from "../_lib/use-chart-dir"

/**
 * Scatter Chart With Labels — single series + always-on `LabelList` + `ZAxis`.
 * Teaching delta vs `simple-scatter-chart` / `bubble-chart`: point name labels.
 * Locked chrome + metric scrubber. Spec: `registry/charts/PORT.md`
 * Installs to: components/charts/scatter-chart-with-labels.tsx
 */

export type ScatterChartWithLabelsPoint = {
  /** Short always-on label (e.g. campus code). */
  name: string
  /** Continuous X (demo: height cm). */
  x: number
  /** Continuous Y (demo: weight kg). */
  y: number
  /** Bubble size (demo: activity score). */
  z: number
}

export type ScatterChartWithLabelsProps = {
  title?: string
  subtitle?: string
  data?: ScatterChartWithLabelsPoint[]
  seriesLabel?: string
  xLabel?: string
  yLabel?: string
  zLabel?: string
  className?: string
  /** Value-axis side / X reverse. Omit to follow page `dir`. */
  plotDir?: "ltr" | "rtl"
  /** Hover / touch / keyboard scrub. Default on. */
  scrub?: boolean
}

const NARROW_MQ = "(max-width: 639px)"
const AXIS_TICK_FILL =
  "color-mix(in oklab, var(--foreground) 58%, transparent)"
const LABEL_FILL =
  "color-mix(in oklab, var(--foreground) 72%, transparent)"
/** Pixel area range for ZAxis → bubble radius. */
const Z_RANGE: [number, number] = [120, 520]

type FlatPoint = ScatterChartWithLabelsPoint & { id: string }

/** Campus sample — height × weight × score with short labels. */
const DEMO_DATA: ScatterChartWithLabelsPoint[] = [
  { name: "A", x: 158, y: 52, z: 120 },
  { name: "B", x: 162, y: 58, z: 180 },
  { name: "C", x: 168, y: 64, z: 220 },
  { name: "D", x: 172, y: 71, z: 160 },
  { name: "E", x: 176, y: 78, z: 280 },
  { name: "F", x: 182, y: 86, z: 240 },
  { name: "G", x: 186, y: 92, z: 320 },
  { name: "H", x: 190, y: 98, z: 200 },
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

function withIds(rows: ScatterChartWithLabelsPoint[]): FlatPoint[] {
  return rows.map((p, i) => ({
    ...p,
    id: `${p.name}-${i}-${p.x}-${p.y}`,
  }))
}

function ScatterChartWithLabels({
  title = "Campus height vs weight",
  subtitle = "Always-on point labels — teaching LabelList on Scatter.",
  data = DEMO_DATA,
  seriesLabel = "Campus",
  xLabel = "Height (cm)",
  yLabel = "Weight (kg)",
  zLabel = "Score",
  className,
  plotDir,
  scrub = true,
}: ScatterChartWithLabelsProps) {
  const { dir, ref } = useChartDir()
  const plotRtl = (plotDir ?? dir) === "rtl"
  const narrow = useNarrowViewport()
  const chartAreaRef = React.useRef<HTMLDivElement>(null)
  const liveRef = React.useRef<HTMLParagraphElement>(null)
  const scrubbingRef = React.useRef(false)
  const locale = "en"

  const chartConfig = React.useMemo(
    () =>
      ({
        sample: { label: seriesLabel, color: CHART_SERIES_A },
        z: { label: zLabel },
      }) satisfies ChartConfig,
    [seriesLabel, zLabel]
  )

  const plotData = React.useMemo(() => withIds(data), [data])
  const lastIndex = Math.max(0, plotData.length - 1)

  const [activeIndex, setActiveIndex] = React.useState(lastIndex)
  const [scrubbing, setScrubbing] = React.useState(false)
  const [dataTrack, setDataTrack] = React.useState({ plotData, lastIndex })
  if (dataTrack.plotData !== plotData || dataTrack.lastIndex !== lastIndex) {
    setDataTrack({ plotData, lastIndex })
    setActiveIndex(lastIndex)
    setScrubbing(false)
  }

  const liveScrubbing = scrub && scrubbing
  const liveIndex = liveScrubbing ? activeIndex : lastIndex
  const active = plotData[liveIndex] ?? plotData[lastIndex]
  const previous = liveIndex > 0 ? plotData[liveIndex - 1] : null
  const metricValue = active?.z ?? 0
  const prevValue = previous?.z ?? null
  const deltaPct =
    prevValue != null && prevValue !== 0
      ? ((metricValue - prevValue) / prevValue) * 100
      : null
  const deltaUp = deltaPct != null && deltaPct >= 0
  const caption =
    active != null
      ? `${active.name} · ${xLabel} ${formatNumber(active.x, locale)} · ${yLabel} ${formatNumber(active.y, locale)}`
      : ""

  const xDomain = React.useMemo(() => {
    const xs = plotData.map((p) => p.x)
    const min = Math.min(...xs, 150)
    const max = Math.max(...xs, 195)
    const pad = Math.max(2, (max - min) * 0.1)
    return [Math.floor(min - pad), Math.ceil(max + pad)] as [number, number]
  }, [plotData])

  const yDomain = React.useMemo(() => {
    const ys = plotData.map((p) => p.y)
    const min = Math.min(...ys, 40)
    const max = Math.max(...ys, 100)
    const pad = Math.max(4, (max - min) * 0.12)
    const lo = Math.max(0, Math.floor((min - pad) / 5) * 5)
    const hi = Math.ceil((max + pad) / 5) * 5
    return [lo, hi] as [number, number]
  }, [plotData])

  const zDomain = React.useMemo(() => {
    const zs = plotData.map((p) => p.z)
    return [0, Math.max(...zs, 1)] as [number, number]
  }, [plotData])

  const announce = React.useCallback(
    (index: number) => {
      const point = plotData[index]
      if (!point || !liveRef.current) return
      liveRef.current.textContent = `${point.name}, ${xLabel} ${formatNumber(point.x, locale)}, ${yLabel} ${formatNumber(point.y, locale)}, ${zLabel} ${formatNumber(point.z, locale)}`
    },
    [locale, plotData, xLabel, yLabel, zLabel]
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
      if (!el || plotData.length === 0) return lastIndex
      const rect = el.getBoundingClientRect()
      if (rect.width <= 0) return lastIndex
      let ratio = (clientX - rect.left) / rect.width
      if (plotRtl) ratio = 1 - ratio
      ratio = Math.min(1, Math.max(0, ratio))
      const [xMin, xMax] = xDomain
      const xVal = xMin + ratio * (xMax - xMin)
      let best = 0
      let bestDist = Infinity
      plotData.forEach((p, i) => {
        const d = Math.abs(p.x - xVal)
        if (d < bestDist) {
          bestDist = d
          best = i
        }
      })
      return best
    },
    [lastIndex, plotData, plotRtl, xDomain]
  )

  const onChartMouseMove = React.useCallback(
    (chartState: {
      activePayload?: ReadonlyArray<{
        payload?: ScatterChartWithLabelsPoint
      }>
    }) => {
      if (!scrub) return
      const row = chartState.activePayload?.[0]?.payload
      if (!row || row.x == null || row.y == null) return
      const idx = plotData.findIndex(
        (p) =>
          p.x === row.x &&
          p.y === row.y &&
          p.z === row.z &&
          p.name === row.name
      )
      if (idx < 0) return
      scrubbingRef.current = true
      setScrubbing(true)
      setActiveIndex(idx)
    },
    [plotData, scrub]
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
    return `Scatter chart with labels, ${title}, ${caption}, ${zLabel} ${formatNumber(metricValue, locale)}`
  }, [active, caption, locale, metricValue, title, zLabel])

  const nameLabel = React.useCallback(
    (props: LabelProps) => {
      const { x, y, value, index } = props
      if (x == null || y == null || value == null) return null
      const point = typeof index === "number" ? plotData[index] : undefined
      const isActive =
        !liveScrubbing ||
        !active ||
        (point != null && point.id === active.id)
      return (
        <text
          x={Number(x)}
          y={Number(y) - 10}
          textAnchor="middle"
          dominantBaseline="auto"
          fill={LABEL_FILL}
          fontSize={11}
          fontFamily="var(--font-sono-sans), var(--font-sans)"
          opacity={isActive ? 1 : 0.28}
          className="tabular-nums"
        >
          {String(value)}
        </text>
      )
    },
    [active, liveScrubbing, plotData]
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
                    top: 24,
                    right: plotRtl ? 8 : 12,
                    left: plotRtl ? 12 : 8,
                    bottom: 36,
                  }
                : { top: 28, right: 16, left: 8, bottom: 40 }
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
                      | ScatterChartWithLabelsPoint
                      | undefined
                    if (!row) return ""
                    return `${row.name} · ${xLabel} ${formatNumber(row.x, locale)}`
                  }}
                  formatter={(_value, _name, item, index) => {
                    if (item?.dataKey != null && item.dataKey !== "y") return null
                    if (item?.dataKey == null && index !== 0) return null
                    const row = item?.payload as
                      | ScatterChartWithLabelsPoint
                      | undefined
                    if (!row) return null
                    return (
                      <div className="flex w-full min-w-[9rem] flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <span
                            className="size-2.5 shrink-0 rounded-full"
                            style={{ background: CHART_SERIES_A }}
                            aria-hidden
                          />
                          <span className="text-muted-foreground">
                            {seriesLabel}
                          </span>
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
              name="sample"
              data={plotData}
              fill="var(--color-sample)"
              stroke="none"
              /* Always-on labels — no enter tween (avoids label blink). */
              isAnimationActive={false}
              shape={(props) => {
                const point = props.payload as FlatPoint | undefined
                if (
                  props.cx == null ||
                  props.cy == null ||
                  !Number.isFinite(props.cx) ||
                  !Number.isFinite(props.cy)
                ) {
                  return null
                }
                const isActive =
                  !liveScrubbing ||
                  !active ||
                  (point != null && point.id === active.id)
                const baseR = Math.max(5, ((props.width as number) ?? 12) / 2)
                return (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={baseR * (isActive && liveScrubbing ? 1.08 : 1)}
                    fill="var(--color-sample)"
                    fillOpacity={isActive ? 0.78 : 0.22}
                    stroke="var(--background)"
                    strokeWidth={1}
                    style={{ cursor: scrub ? "pointer" : undefined }}
                  />
                )
              }}
            >
              <LabelList dataKey="name" content={nameLabel} />
            </Scatter>
          </RechartsScatterChart>
        </ChartContainer>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span
            className="size-2.5 shrink-0 rounded-full opacity-80"
            style={{ backgroundColor: CHART_SERIES_A }}
            aria-hidden
          />
          <span className="text-foreground">{seriesLabel}</span>
        </div>
        <span>Bubble size = {zLabel.toLowerCase()}</span>
        <span>Labels = campus code</span>
      </div>

      <table className="sr-only">
        <caption>
          {title}. {subtitle}
        </caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>{xLabel}</th>
            <th>{yLabel}</th>
            <th>{zLabel}</th>
          </tr>
        </thead>
        <tbody>
          {plotData.map((row) => (
            <tr key={row.id}>
              <td>{row.name}</td>
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
export default function ScatterChartWithLabelsDemo(
  props: ScatterChartWithLabelsProps
) {
  return <ScatterChartWithLabels {...props} />
}

export { ScatterChartWithLabels }
