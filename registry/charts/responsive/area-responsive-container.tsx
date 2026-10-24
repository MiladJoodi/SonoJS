"use client"

import * as React from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
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
  chartAreaContainerClassName,
} from "../_lib/chart-styles"
import { useChartDir } from "../_lib/use-chart-dir"
import { usePrefersReducedMotion } from "../_lib/use-prefers-reduced-motion"

/**
 * Area Responsive Container — fluid ChartContainer stage + area + dual ReferenceLines.
 * Locked metric scrub; EN months; `--chart-1` series, `--chart-2` / `--chart-4` refs.
 * Spec: `registry/charts/PORT.md`
 * Installs to: components/charts/area-responsive-container.tsx
 */

export type AreaResponsivePoint = {
  month: string
  store: number
}

export type AreaResponsiveContainerProps = {
  title?: string
  subtitle?: string
  data?: AreaResponsivePoint[]
  className?: string
  /** Axis flip. Omit to follow page `dir`. */
  plotDir?: "ltr" | "rtl"
  /** Hover / keyboard category scrub. Default on. */
  scrub?: boolean
}

const AREA_MS = 200
const AXIS_TICK_FILL =
  "color-mix(in oklab, var(--foreground) 58%, transparent)"
const Y_DOMAIN: [number, number] = [0, 6000]
const TARGET_Y = 4000
/** Category marked as the “min month” reference (March). */
const MIN_MONTH = "Mar"

const DEMO_DATA: AreaResponsivePoint[] = [
  { month: "Jan", store: 4000 },
  { month: "Feb", store: 3000 },
  { month: "Mar", store: 2000 },
  { month: "Apr", store: 2780 },
  { month: "May", store: 1890 },
  { month: "Jun", store: 2390 },
  { month: "Jul", store: 3490 },
]

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

const stageClassName = cn(chartAreaContainerClassName, "max-h-[420px]")

function AreaResponsiveContainer({
  title = "Store sales",
  subtitle = "Responsive area stage with min-month and target reference lines.",
  data = DEMO_DATA,
  className,
  plotDir,
  scrub = true,
}: AreaResponsiveContainerProps) {
  const { dir, ref } = useChartDir()
  const plotRtl = (plotDir ?? dir) === "rtl"
  const reducedMotion = usePrefersReducedMotion()
  const chartAreaRef = React.useRef<HTMLDivElement>(null)
  const liveRef = React.useRef<HTMLParagraphElement>(null)
  const scrubbingRef = React.useRef(false)
  const locale = "en"

  const chartConfig = {
    store: {
      label: "Store",
      color: CHART_SERIES_A,
    },
  } satisfies ChartConfig

  const lastIndex = Math.max(0, data.length - 1)
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
  const metricValue = active?.store ?? 0
  const deltaPct =
    previous && previous.store !== 0
      ? ((metricValue - previous.store) / previous.store) * 100
      : null
  const caption = liveScrubbing && active ? active.month : "Latest month"

  const announce = React.useCallback(
    (index: number) => {
      const point = data[index]
      if (!point || !liveRef.current) return
      liveRef.current.textContent = `${point.month}: ${formatNumber(point.store, locale)}`
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
      return `Area chart, ${title}, latest ${formatNumber(metricValue, locale)}`
    }
    return `Area chart, ${title}, ${active.month} ${formatNumber(active.store, locale)}`
  }, [active, liveScrubbing, locale, metricValue, title])

  const yTickFormatter = React.useCallback(
    (v: number) => formatCompact(v, locale),
    [locale]
  )

  /** Vertical ref — sit beside the line; angle keeps text readable. */
  const minMonthLabel = React.useMemo(
    () => ({
      value: "Min month",
      fill: "var(--chart-2)",
      position: plotRtl
        ? ("insideBottomLeft" as const)
        : ("insideBottomRight" as const),
      angle: -90,
      dx: plotRtl ? -14 : 14,
      fontSize: 11,
      fontFamily: "var(--font-sono-sans), var(--font-sans)",
    }),
    [plotRtl]
  )

  /** Horizontal ref — hug the Y-axis side (start in LTR / end in RTL). */
  const targetLabel = React.useMemo(
    () => ({
      value: "Target",
      fill: "var(--chart-4)",
      position: plotRtl
        ? ("insideTopRight" as const)
        : ("insideTopLeft" as const),
      fontSize: 11,
      fontFamily: "var(--font-sono-sans), var(--font-sans)",
    }),
    [plotRtl]
  )

  const plotMargin = React.useMemo(
    () =>
      plotRtl
        ? { top: 20, right: 12, left: 8, bottom: 4 }
        : { top: 20, right: 8, left: 12, bottom: 4 },
    [plotRtl]
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
        onBlur={scrub ? clearScrub : undefined}
        className="touch-pan-y rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <ChartContainer
          config={chartConfig}
          className={cn(stageClassName, "max-w-none")}
        >
          <AreaChart
            accessibilityLayer
            data={data}
            margin={plotMargin}
            onMouseMove={scrub ? onChartMouseMove : undefined}
            onMouseLeave={scrub ? clearScrub : undefined}
          >
            <CartesianGrid vertical={false} strokeDasharray="4 4" />
            <XAxis
              dataKey="month"
              reversed={plotRtl}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fill: AXIS_TICK_FILL, fontSize: 12 }}
            />
            <YAxis
              orientation={plotRtl ? "right" : "left"}
              width={44}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={4}
              domain={Y_DOMAIN}
              tickFormatter={yTickFormatter}
              tick={{ fill: AXIS_TICK_FILL, fontSize: 12 }}
            />
            <ChartTooltip
              cursor={{
                stroke: CHART_SERIES_A,
                strokeOpacity: 0.35,
              }}
              content={<ChartTooltipContent dir={dir} />}
            />
            <ReferenceLine
              x={MIN_MONTH}
              stroke="var(--chart-2)"
              strokeDasharray="4 4"
              label={minMonthLabel}
            />
            <ReferenceLine
              y={TARGET_Y}
              stroke="var(--chart-4)"
              strokeDasharray="4 4"
              label={targetLabel}
            />
            <Area
              type="monotone"
              dataKey="store"
              stroke="var(--color-store)"
              fill="var(--color-store)"
              fillOpacity={0.28}
              strokeWidth={2}
              isAnimationActive={!reducedMotion && !liveScrubbing}
              animationDuration={AREA_MS}
              animationEasing="ease-out"
              activeDot={{
                r: 4,
                strokeWidth: 2,
                stroke: "var(--background)",
                fill: "var(--color-store)",
              }}
            />
          </AreaChart>
        </ChartContainer>
      </div>

      <ul className="mx-auto flex max-w-[640px] flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <li className="inline-flex items-center gap-1.5">
          <span
            className="size-2 shrink-0 rounded-full"
            style={{ backgroundColor: "var(--chart-1)" }}
            aria-hidden
          />
          <span>Store</span>
        </li>
        <li className="inline-flex items-center gap-1.5">
          <span
            className="size-2 shrink-0 rounded-full border border-dashed"
            style={{ borderColor: "var(--chart-2)" }}
            aria-hidden
          />
          <span>Min month</span>
        </li>
        <li className="inline-flex items-center gap-1.5">
          <span
            className="size-2 shrink-0 rounded-full border border-dashed"
            style={{ borderColor: "var(--chart-4)" }}
            aria-hidden
          />
          <span>Target</span>
        </li>
      </ul>

      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">Month</th>
            <th scope="col">Store</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={`a11y-${row.month}`}>
              <td>{row.month}</td>
              <td>{row.store}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function AreaResponsiveContainerDemo(
  props: AreaResponsiveContainerProps
) {
  return <AreaResponsiveContainer {...props} />
}

export { AreaResponsiveContainer }
