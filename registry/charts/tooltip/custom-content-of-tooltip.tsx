"use client"

import * as React from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  XAxis,
  YAxis,
  type TooltipContentProps,
} from "recharts"

import { cn } from "@/lib/utils"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
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
 * Custom Content Of Tooltip - fully custom tip panel (intro + series rows).
 * Locked chrome + metric scrubber. Spec: `registry/charts/PORT.md`
 * Installs to: components/charts/custom-content-of-tooltip.tsx
 */

export type CustomContentOfTooltipPoint = {
  month: string
  online: number
  store: number
}

export type CustomContentOfTooltipProps = {
  title?: string
  subtitle?: string
  data?: CustomContentOfTooltipPoint[]
  /** Month → short intro shown in the custom tooltip. */
  intros?: Record<string, string>
  className?: string
  /** Axis flip. Omit to follow page `dir`. */
  plotDir?: "ltr" | "rtl"
  /** Hover / keyboard category scrub. Default on. */
  scrub?: boolean
}

const BAR_MS = 200
const AXIS_TICK_FILL =
  "color-mix(in oklab, var(--foreground) 58%, transparent)"
const BAR_RADIUS: [number, number, number, number] = [4, 4, 0, 0]
/** Idle tip pin so custom tip chrome stays inspectable. */
const DEFAULT_TIP_INDEX = 2

const DEMO_DATA: CustomContentOfTooltipPoint[] = [
  { month: "Jan", online: 4000, store: 2400 },
  { month: "Feb", online: 3000, store: 1398 },
  { month: "Mar", online: 2000, store: 9800 },
  { month: "Apr", online: 2780, store: 3908 },
  { month: "May", online: 1890, store: 4800 },
  { month: "Jun", online: 2390, store: 3800 },
  { month: "Jul", online: 3490, store: 4300 },
]

const DEMO_INTROS: Record<string, string> = {
  Jan: "Men's apparel at the start of the year",
  Feb: "Women's apparel - spring peak",
  Mar: "Bags and accessories",
  Apr: "Home goods and furnishings",
  May: "Grocery and supermarket",
  Jun: "Baby food and nursery",
  Jul: "Back-to-school supplies",
}

const chartConfig = {
  online: {
    label: "Online",
    color: CHART_SERIES_A,
  },
  store: {
    label: "Store",
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

function pointTotal(point: CustomContentOfTooltipPoint) {
  return point.online + point.store
}

function MonthTooltip({
  active,
  payload,
  label,
  dir,
  locale,
  intros,
}: TooltipContentProps<number, string> & {
  dir: "ltr" | "rtl"
  locale: string
  intros: Record<string, string>
}) {
  if (!active || !payload?.length) return null

  const key = String(label ?? "")

  return (
    <div
      dir={dir}
      className="rounded-xl border border-border/60 bg-background px-3 py-2 font-sans text-xs shadow-sm"
    >
      <p className="mb-1 font-medium text-foreground">{label}</p>
      <p className="mb-2 leading-relaxed text-muted-foreground">
        {intros[key] ?? ""}
      </p>
      {payload
        .filter((item) => item.type !== "none")
        .map((item) => {
          const seriesKey = String(item.dataKey ?? "")
          const series =
            chartConfig[seriesKey as keyof typeof chartConfig]?.label ??
            seriesKey
          return (
            <p
              key={seriesKey}
              className="mb-0.5 flex items-center justify-between gap-4 last:mb-0"
              style={{ color: item.color ?? "var(--foreground)" }}
            >
              <span>{series}</span>
              <span className="font-medium tabular-nums text-foreground">
                {formatNumber(Number(item.value), locale)}
              </span>
            </p>
          )
        })}
    </div>
  )
}

function CustomContentOfTooltip({
  title = "Custom tooltip content",
  subtitle = "Fully custom tip panel - intro copy plus series rows.",
  data = DEMO_DATA,
  intros = DEMO_INTROS,
  className,
  plotDir,
  scrub = true,
}: CustomContentOfTooltipProps) {
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
  const caption = liveScrubbing && active ? active.month : "Latest month"

  const announce = React.useCallback(
    (index: number) => {
      const point = data[index]
      if (!point || !liveRef.current) return
      liveRef.current.textContent = `${point.month}: ${formatNumber(pointTotal(point), locale)}`
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
      return `Bar chart, ${title}, latest ${formatNumber(metricValue, locale)}`
    }
    return `Bar chart, ${title}, ${active.month} ${formatNumber(pointTotal(active), locale)}`
  }, [active, liveScrubbing, locale, metricValue, title])

  const yTickFormatter = React.useCallback(
    (v: number) => formatCompact(v, locale),
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

  const tooltipContent = React.useCallback(
    (props: TooltipContentProps<number, string>) => (
      <MonthTooltip {...props} dir={dir} locale={locale} intros={intros} />
    ),
    [dir, intros, locale]
  )

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
              tickFormatter={yTickFormatter}
              tick={{ fill: AXIS_TICK_FILL, fontSize: 12 }}
            />
            <ChartTooltip
              // Keep tip visible so custom content stays inspectable.
              active
              defaultIndex={tipIndex}
              cursor={{
                fill: "color-mix(in oklab, var(--foreground) 5%, transparent)",
              }}
              content={tooltipContent}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="online"
              name="Online"
              fill="var(--color-online)"
              radius={BAR_RADIUS}
              maxBarSize={28}
              isAnimationActive={anim}
              animationDuration={BAR_MS}
              animationEasing="ease-out"
            >
              {data.map((row, index) => (
                <Cell
                  key={`online-${row.month}`}
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
              dataKey="store"
              name="Store"
              fill="var(--color-store)"
              radius={BAR_RADIUS}
              maxBarSize={28}
              isAnimationActive={anim}
              animationDuration={BAR_MS}
              animationEasing="ease-out"
            >
              {data.map((row, index) => (
                <Cell
                  key={`store-${row.month}`}
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
            <th scope="col">Month</th>
            <th scope="col">Online</th>
            <th scope="col">Store</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={`a11y-${row.month}`}>
              <td>{row.month}</td>
              <td>{row.online}</td>
              <td>{row.store}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function CustomContentOfTooltipDemo(
  props: CustomContentOfTooltipProps
) {
  return <CustomContentOfTooltip {...props} />
}

export { CustomContentOfTooltip }
