"use client"

import * as React from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
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
  chartBarContainerClassName,
} from "../_lib/chart-styles"
import { useChartDir } from "../_lib/use-chart-dir"
import { usePrefersReducedMotion } from "../_lib/use-prefers-reduced-motion"

/**
 * Chart Tooltip Label None - stacked bars with ChartTooltipContent
 * hideLabel + hideIndicator. Locked chrome + metric scrubber.
 * Spec: `registry/charts/PORT.md`
 * Installs to: components/charts/chart-tooltip-label-none.tsx
 */

export type ChartTooltipLabelNonePoint = {
  date: string
  delivery: number
  pickup: number
}

export type ChartTooltipLabelNoneProps = {
  title?: string
  subtitle?: string
  data?: ChartTooltipLabelNonePoint[]
  className?: string
  /** Axis flip. Omit to follow page `dir`. */
  plotDir?: "ltr" | "rtl"
  /** Hover / keyboard category scrub. Default on. */
  scrub?: boolean
}

const BAR_MS = 200
const AXIS_TICK_FILL =
  "color-mix(in oklab, var(--foreground) 58%, transparent)"
const FLAT_RADIUS: [number, number, number, number] = [0, 0, 4, 4]
const TOP_RADIUS: [number, number, number, number] = [4, 4, 0, 0]
/** Idle tip pin so no-label tip stays inspectable. */
const DEFAULT_TIP_INDEX = 1

const DEMO_DATA: ChartTooltipLabelNonePoint[] = [
  { date: "2024-07-15", delivery: 450, pickup: 300 },
  { date: "2024-07-16", delivery: 380, pickup: 420 },
  { date: "2024-07-17", delivery: 520, pickup: 120 },
  { date: "2024-07-18", delivery: 140, pickup: 550 },
  { date: "2024-07-19", delivery: 600, pickup: 350 },
  { date: "2024-07-20", delivery: 480, pickup: 400 },
]

const chartConfig = {
  delivery: {
    label: "Delivery",
    color: CHART_SERIES_A,
  },
  pickup: {
    label: "Pickup",
    color: CHART_SERIES_B,
  },
} satisfies ChartConfig

function formatNumber(value: number, locale: string) {
  return new Intl.NumberFormat(locale).format(Math.round(value))
}

function formatCompact(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)
}

function formatPct(value: number) {
  const sign = value > 0 ? "+" : ""
  return `${sign}${Math.round(value)}%`
}

function formatWeekday(iso: string, locale: string) {
  return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(
    new Date(`${iso}T12:00:00`)
  )
}

function pointTotal(point: ChartTooltipLabelNonePoint) {
  return point.delivery + point.pickup
}

function ChartTooltipLabelNone({
  title = "Tooltip label none",
  subtitle = "ChartTooltipContent with hideLabel and hideIndicator.",
  data = DEMO_DATA,
  className,
  plotDir,
  scrub = true,
}: ChartTooltipLabelNoneProps) {
  const { dir, ref } = useChartDir()
  const plotRtl = (plotDir ?? dir) === "rtl"
  const reducedMotion = usePrefersReducedMotion()
  const chartAreaRef = React.useRef<HTMLDivElement>(null)
  const liveRef = React.useRef<HTMLParagraphElement>(null)
  const scrubbingRef = React.useRef(false)
  const locale = "en"

  const lastIndex = Math.max(0, data.length - 1)
  const tipIndex = Math.min(DEFAULT_TIP_INDEX, lastIndex)
  const [activeIndex, setActiveIndex] = React.useState(lastIndex)
  const [scrubbing, setScrubbing] = React.useState(false)
  const [dataTrack, setDataTrack] = React.useState({ data, lastIndex })
  if (dataTrack.data !== data || dataTrack.lastIndex !== lastIndex) {
    setDataTrack({ data, lastIndex })
    setActiveIndex(lastIndex)
    setScrubbing(false)
  }

  const liveScrubbing = scrub && scrubbing
  const liveIndex = liveScrubbing ? activeIndex : lastIndex
  const active = data[liveIndex] ?? data[lastIndex]
  const previous = liveIndex > 0 ? data[liveIndex - 1] : null
  const metricValue = active ? pointTotal(active) : 0
  const prevTotal = previous ? pointTotal(previous) : null
  const deltaPct =
    prevTotal != null && prevTotal !== 0
      ? ((metricValue - prevTotal) / prevTotal) * 100
      : null
  const caption =
    liveScrubbing && active
      ? formatWeekday(active.date, locale)
      : "Latest day"

  const announce = React.useCallback(
    (index: number) => {
      const point = data[index]
      if (!point || !liveRef.current) return
      liveRef.current.textContent = `${formatWeekday(point.date, locale)}: ${formatNumber(pointTotal(point), locale)}`
    },
    [data, locale]
  )

  const activate = React.useCallback(
    (index: number, fromKeyboard = false) => {
      const clamped = Math.min(lastIndex, Math.max(0, index))
      setActiveIndex(clamped)
      setScrubbing(true)
      scrubbingRef.current = true
      if (fromKeyboard) announce(clamped)
    },
    [announce, lastIndex]
  )

  const clearScrub = React.useCallback(() => {
    scrubbingRef.current = false
    setScrubbing(false)
    setActiveIndex(lastIndex)
  }, [lastIndex])

  const indexFromClientX = React.useCallback(
    (clientX: number) => {
      const el = chartAreaRef.current
      if (!el || data.length === 0) return lastIndex
      const rect = el.getBoundingClientRect()
      if (rect.width <= 0) return lastIndex
      let ratio = (clientX - rect.left) / rect.width
      if (plotRtl) ratio = 1 - ratio
      ratio = Math.min(1, Math.max(0, ratio))
      return Math.min(lastIndex, Math.floor(ratio * data.length))
    },
    [data.length, lastIndex, plotRtl]
  )

  const onChartMouseMove = React.useCallback(
    (chartState: { activeTooltipIndex?: number | string | null }) => {
      if (!scrub) return
      if (
        chartState?.activeTooltipIndex === undefined ||
        chartState.activeTooltipIndex === null
      ) {
        return
      }
      const idx = Number(chartState.activeTooltipIndex)
      if (!Number.isFinite(idx)) return
      activate(idx)
    },
    [activate, scrub]
  )

  React.useEffect(() => {
    const el = chartAreaRef.current
    if (!el || !scrub) return

    const onStart = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      activate(indexFromClientX(t.clientX))
    }
    const onMove = (e: TouchEvent) => {
      if (!scrubbingRef.current) return
      const t = e.touches[0]
      if (!t) return
      e.preventDefault()
      activate(indexFromClientX(t.clientX))
    }
    const onEnd = () => clearScrub()

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
  }, [activate, clearScrub, indexFromClientX, scrub])

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!scrub) return
      const reverse = plotRtl
      const idx = liveScrubbing ? activeIndex : lastIndex
      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault()
          activate(idx + (reverse ? 1 : -1), true)
          break
        case "ArrowRight":
          event.preventDefault()
          activate(idx + (reverse ? -1 : 1), true)
          break
        case "Home":
          event.preventDefault()
          activate(reverse ? lastIndex : 0, true)
          break
        case "End":
          event.preventDefault()
          activate(reverse ? 0 : lastIndex, true)
          break
        case "Escape":
          event.preventDefault()
          clearScrub()
          break
        default:
          break
      }
    },
    [
      activate,
      activeIndex,
      clearScrub,
      lastIndex,
      liveScrubbing,
      plotRtl,
      scrub,
    ]
  )

  const ariaLabel = React.useMemo(() => {
    if (!liveScrubbing || !active) {
      return `Stacked bar chart, ${title}, latest ${formatNumber(metricValue, locale)}`
    }
    return `Stacked bar chart, ${title}, ${formatWeekday(active.date, locale)} ${formatNumber(pointTotal(active), locale)}`
  }, [active, liveScrubbing, locale, metricValue, title])

  const yTickFormatter = React.useCallback(
    (v: number) => formatCompact(v, locale),
    [locale]
  )

  const xTickFormatter = React.useCallback(
    (value: string) => formatWeekday(value, locale),
    [locale]
  )

  const plotMargin = React.useMemo(
    () =>
      plotRtl
        ? { top: 10, right: 12, left: 8, bottom: 8 }
        : { top: 10, right: 8, left: 12, bottom: 8 },
    [plotRtl]
  )

  const anim = !reducedMotion && !liveScrubbing
  const cellOpacity = (index: number) => {
    if (!liveScrubbing) return 1
    return index === liveIndex ? 1 : 0.4
  }

  return (
    <div
      ref={ref}
      className={cn(
        "mx-auto flex w-full min-w-0 max-w-[520px] flex-col gap-5 font-sans tabular-nums sm:gap-6",
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
            {deltaPct != null && liveScrubbing ? (
              <span
                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium tabular-nums"
                style={{
                  color:
                    deltaPct >= 0
                      ? "var(--chart-up)"
                      : "var(--destructive)",
                  backgroundColor:
                    "color-mix(in oklab, var(--foreground) 8%, transparent)",
                }}
              >
                {formatPct(deltaPct)}
              </span>
            ) : (
              <span className="text-xs text-muted-foreground">-</span>
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
        onBlur={scrub ? clearScrub : undefined}
        className="touch-pan-y rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <ChartContainer
          config={chartConfig}
          className={cn(chartBarContainerClassName, "max-w-none")}
        >
          <BarChart
            accessibilityLayer
            data={data}
            margin={plotMargin}
            onMouseMove={scrub ? onChartMouseMove : undefined}
            onMouseLeave={scrub ? clearScrub : undefined}
          >
            <CartesianGrid vertical={false} strokeDasharray="4 4" />
            <XAxis
              dataKey="date"
              reversed={plotRtl}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={xTickFormatter}
              tick={{ fill: AXIS_TICK_FILL, fontSize: 12 }}
            />
            <YAxis
              orientation={plotRtl ? "right" : "left"}
              width={44}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={4}
              tickFormatter={yTickFormatter}
              tick={{ fill: AXIS_TICK_FILL, fontSize: 12 }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={tipIndex}
              content={
                <ChartTooltipContent
                  hideLabel
                  hideIndicator
                  className="rounded-xl border-border/60 shadow-sm"
                />
              }
            />
            <Bar
              dataKey="delivery"
              name="delivery"
              stackId="a"
              fill="var(--color-delivery)"
              radius={FLAT_RADIUS}
              maxBarSize={36}
              isAnimationActive={anim}
              animationDuration={BAR_MS}
              animationEasing="ease-out"
            >
              {data.map((row, index) => (
                <Cell
                  key={`delivery-${row.date}`}
                  fillOpacity={cellOpacity(index)}
                  className={
                    !reducedMotion
                      ? "transition-[fill-opacity] duration-200 ease-out"
                      : undefined
                  }
                />
              ))}
            </Bar>
            <Bar
              dataKey="pickup"
              name="pickup"
              stackId="a"
              fill="var(--color-pickup)"
              radius={TOP_RADIUS}
              maxBarSize={36}
              isAnimationActive={anim}
              animationDuration={BAR_MS}
              animationEasing="ease-out"
            >
              {data.map((row, index) => (
                <Cell
                  key={`pickup-${row.date}`}
                  fillOpacity={cellOpacity(index)}
                  className={
                    !reducedMotion
                      ? "transition-[fill-opacity] duration-200 ease-out"
                      : undefined
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>

      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Delivery</th>
            <th scope="col">Pickup</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={`a11y-${row.date}`}>
              <td>{row.date}</td>
              <td>{row.delivery}</td>
              <td>{row.pickup}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function ChartTooltipLabelNoneDemo(
  props: ChartTooltipLabelNoneProps
) {
  return <ChartTooltipLabelNone {...props} />
}

export { ChartTooltipLabelNone }
