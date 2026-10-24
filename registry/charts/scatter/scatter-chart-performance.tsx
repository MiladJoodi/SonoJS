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
  MARKET_DOWN,
  MARKET_UP,
  chartLineContainerClassName,
} from "../_lib/chart-styles"
import { useChartDir } from "../_lib/use-chart-dir"

/**
 * Scatter Chart Performance — many Scatter series × many points (stress demo).
 * Teaching: `isAnimationActive={false}`; scrub focuses a series (not every point).
 * Locked chrome. Spec: `registry/charts/PORT.md`
 * Installs to: components/charts/scatter-chart-performance.tsx
 */

export type ScatterPerformancePoint = {
  x: number
  y: number
  z: number
  /** Scatter series name — stamped on each mark for tooltip lookup. */
  series: string
  passed: boolean
}

export type ScatterPerformanceSeries = {
  name: string
  /** Semantic pass/fail tint (`--chart-up` / `--chart-down`). */
  passed: boolean
  points: ScatterPerformancePoint[]
}

export type ScatterChartPerformanceProps = {
  title?: string
  subtitle?: string
  /** Override generated cloud. */
  datasets?: ScatterPerformanceSeries[]
  /** Series count when generating. Default 50. */
  seriesCount?: number
  /** Points per series when generating. Default 12 → 600 marks. */
  pointsPerSeries?: number
  /** Deterministic RNG seed. */
  seed?: number
  xLabel?: string
  yLabel?: string
  className?: string
  /** Value-axis side / X reverse. Omit to follow page `dir`. */
  plotDir?: "ltr" | "rtl"
  /** Hover / keyboard focus a series (dims siblings). Default on. */
  scrub?: boolean
}

const NARROW_MQ = "(max-width: 639px)"
const DEFAULT_SERIES = 50
const DEFAULT_POINTS = 12
const Z_RANGE: [number, number] = [24, 120]
const AXIS_TICK_FILL =
  "color-mix(in oklab, var(--foreground) 58%, transparent)"

const SCATTER_TOOLTIP_CURSOR = {
  stroke: "color-mix(in oklab, var(--foreground) 18%, transparent)",
  strokeWidth: 1,
  strokeDasharray: "4 4",
} as const

/** Mulberry32 — stable across SSR/client (no Math.random). */
function mulberry32(seed: number) {
  let t = seed >>> 0
  return () => {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

function between(rand: () => number, min: number, max: number) {
  return min + rand() * (max - min)
}

function generateDatasets(
  seriesCount: number,
  pointsPerSeries: number,
  seed: number
): ScatterPerformanceSeries[] {
  const rand = mulberry32(seed)
  return Array.from({ length: seriesCount }, (_, i) => {
    const passed = between(rand, 0, 10) > 5
    const name = `Series ${i + 1}`
    return {
      name,
      passed,
      points: Array.from({ length: pointsPerSeries }, () => ({
        x: between(rand, 0, 100),
        y: between(rand, 0, 100),
        z: between(rand, 10, 100),
        series: name,
        passed,
      })),
    }
  })
}

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

function formatNumber(value: number, locale: string) {
  return new Intl.NumberFormat(locale).format(Math.round(value))
}

function ScatterChartPerformance({
  title = "Many-point scatter",
  subtitle = "Performance stress — animation off; scrub focuses a whole series.",
  datasets: datasetsProp,
  seriesCount = DEFAULT_SERIES,
  pointsPerSeries = DEFAULT_POINTS,
  seed = 42,
  xLabel = "X",
  yLabel = "Y",
  className,
  plotDir,
  scrub = true,
}: ScatterChartPerformanceProps) {
  const { dir, ref } = useChartDir()
  const plotRtl = (plotDir ?? dir) === "rtl"
  const narrow = useNarrowViewport()
  const chartAreaRef = React.useRef<HTMLDivElement>(null)
  const liveRef = React.useRef<HTMLParagraphElement>(null)
  const scrubbingRef = React.useRef(false)
  const locale = "en"

  const datasets = React.useMemo(() => {
    const raw =
      datasetsProp ??
      generateDatasets(seriesCount, pointsPerSeries, seed)
    // Stamp series + passed on every mark so tooltips survive x/y payload order.
    return raw.map((series) => ({
      ...series,
      points: series.points.map((p) => ({
        ...p,
        series: p.series ?? series.name,
        passed: p.passed ?? series.passed,
      })),
    }))
  }, [datasetsProp, pointsPerSeries, seed, seriesCount])

  const totalPoints = React.useMemo(
    () => datasets.reduce((acc, s) => acc + s.points.length, 0),
    [datasets]
  )
  const passedCount = React.useMemo(
    () => datasets.filter((s) => s.passed).length,
    [datasets]
  )
  const lastIndex = Math.max(0, datasets.length - 1)

  const chartConfig = React.useMemo(
    () =>
      ({
        passed: { label: "Passed", color: MARKET_UP },
        failed: { label: "Failed", color: MARKET_DOWN },
      }) satisfies ChartConfig,
    []
  )

  const [activeIndex, setActiveIndex] = React.useState(lastIndex)
  const [scrubbing, setScrubbing] = React.useState(false)
  const [dataTrack, setDataTrack] = React.useState({ datasets, lastIndex })
  if (
    dataTrack.datasets !== datasets ||
    dataTrack.lastIndex !== lastIndex
  ) {
    setDataTrack({ datasets, lastIndex })
    setActiveIndex(lastIndex)
    setScrubbing(false)
  }

  const liveScrubbing = scrub && scrubbing
  const liveIndex = liveScrubbing ? activeIndex : lastIndex
  const active = datasets[liveIndex] ?? datasets[lastIndex]

  const metricValue = liveScrubbing
    ? (active?.points.length ?? 0)
    : totalPoints
  const caption = liveScrubbing
    ? `${active?.name ?? ""} · ${active?.passed ? "Passed" : "Failed"}`
    : `${formatNumber(datasets.length, locale)} series · ${formatNumber(passedCount, locale)} passed`

  const announce = React.useCallback(
    (index: number) => {
      const series = datasets[index]
      if (!series || !liveRef.current) return
      liveRef.current.textContent = `${series.name}, ${series.points.length} points, ${series.passed ? "passed" : "failed"}`
    },
    [datasets]
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
      if (!el || datasets.length === 0) return lastIndex
      const rect = el.getBoundingClientRect()
      if (rect.width <= 0) return lastIndex
      let ratio = (clientX - rect.left) / rect.width
      if (plotRtl) ratio = 1 - ratio
      ratio = Math.min(1, Math.max(0, ratio))
      // Map pointer X → mean-x nearest series (cheap vs scanning every point).
      const xVal = ratio * 100
      let best = 0
      let bestDist = Infinity
      datasets.forEach((series, i) => {
        if (series.points.length === 0) return
        const meanX =
          series.points.reduce((s, p) => s + p.x, 0) / series.points.length
        const d = Math.abs(meanX - xVal)
        if (d < bestDist) {
          bestDist = d
          best = i
        }
      })
      return best
    },
    [datasets, lastIndex, plotRtl]
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
    return `Scatter performance chart, ${title}, ${caption}, metric ${formatNumber(metricValue, locale)}`
  }, [caption, locale, metricValue, title])

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
            <span className="text-xs text-muted-foreground">
              {liveScrubbing ? "points in series" : "total points"}
            </span>
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
              strokeOpacity={0.35}
            />
            <XAxis
              type="number"
              dataKey="x"
              name={xLabel}
              reversed={plotRtl}
              domain={[0, 100]}
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
              domain={[0, 100]}
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
            <ZAxis type="number" dataKey="z" range={Z_RANGE} />
            <ChartTooltip
              shared={false}
              cursor={SCATTER_TOOLTIP_CURSOR}
              content={
                <ChartTooltipContent
                  className="rounded-xl border-border/60 shadow-sm"
                  labelFormatter={(_, payload) => {
                    const row = payload?.[0]?.payload as
                      | ScatterPerformancePoint
                      | undefined
                    if (row?.series) return row.series
                    const named = payload?.find(
                      (p) =>
                        typeof p.name === "string" &&
                        p.name.startsWith("Series")
                    )
                    return typeof named?.name === "string" ? named.name : ""
                  }}
                  formatter={(_value, _name, item, index) => {
                    // Scatter payload lists x + y (+ z); prefer the y channel.
                    if (item?.dataKey != null && item.dataKey !== "y") {
                      return null
                    }
                    if (item?.dataKey == null && index !== 0) return null
                    const row = item?.payload as
                      | ScatterPerformancePoint
                      | undefined
                    if (!row) return null
                    const passed = row.passed
                    const color = passed ? MARKET_UP : MARKET_DOWN
                    return (
                      <div className="flex w-full min-w-[8rem] flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span
                            className="size-2.5 shrink-0 rounded-full"
                            style={{ background: color }}
                            aria-hidden
                          />
                          <span className="text-muted-foreground">
                            {passed ? "Passed" : "Failed"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4 leading-none">
                          <span className="text-muted-foreground">{yLabel}</span>
                          <span className="font-medium tabular-nums text-foreground">
                            {formatNumber(row.y, locale)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4 leading-none">
                          <span className="text-muted-foreground">{xLabel}</span>
                          <span className="font-medium tabular-nums text-foreground">
                            {formatNumber(row.x, locale)}
                          </span>
                        </div>
                      </div>
                    )
                  }}
                />
              }
            />
            {datasets.map((series, index) => {
              const focused =
                !liveScrubbing || index === liveIndex
              return (
                <Scatter
                  key={series.name}
                  name={series.name}
                  data={series.points}
                  fill={series.passed ? MARKET_UP : MARKET_DOWN}
                  fillOpacity={focused ? 0.85 : 0.12}
                  stroke="none"
                  isAnimationActive={false}
                />
              )
            })}
          </RechartsScatterChart>
        </ChartContainer>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span
            className="size-2 shrink-0 rounded-full"
            style={{ backgroundColor: MARKET_UP }}
            aria-hidden
          />
          <span className="text-foreground">Passed</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="size-2 shrink-0 rounded-full"
            style={{ backgroundColor: MARKET_DOWN }}
            aria-hidden
          />
          <span className="text-foreground">Failed</span>
        </div>
        <span className="text-xs">
          {formatNumber(totalPoints, locale)} marks · animation off
        </span>
      </div>

      <table className="sr-only">
        <caption>
          {title}. {subtitle}
        </caption>
        <thead>
          <tr>
            <th>Series</th>
            <th>Status</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {datasets.map((series) => (
            <tr key={series.name}>
              <td>{series.name}</td>
              <td>{series.passed ? "Passed" : "Failed"}</td>
              <td>{series.points.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Docs / gallery default export. */
export default function ScatterChartPerformanceDemo(
  props: ScatterChartPerformanceProps
) {
  return <ScatterChartPerformance {...props} />
}

export { ScatterChartPerformance }
