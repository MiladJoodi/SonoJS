"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts"
import type { DefaultLegendContentProps } from "recharts"

import { cn } from "@/lib/utils"
import {
  ChartContainer,
  ChartLegend,
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
 * Legend Styles — dual bar + custom card legend with period totals.
 * Locked metric scrub; navy×orange; EN months.
 * Spec: `registry/charts/PORT.md`
 * Installs to: components/charts/legend-styles.tsx
 */

export type LegendStylesPoint = {
  month: string
  store: number
  online: number
}

export type LegendStylesProps = {
  title?: string
  subtitle?: string
  data?: LegendStylesPoint[]
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

const DEMO_DATA: LegendStylesPoint[] = [
  { month: "Jan", store: 86, online: 72 },
  { month: "Feb", store: 94, online: 68 },
  { month: "Mar", store: 78, online: 91 },
  { month: "Apr", store: 102, online: 84 },
  { month: "May", store: 88, online: 96 },
  { month: "Jun", store: 110, online: 79 },
]

const chartConfig = {
  store: {
    label: "Store",
    color: CHART_SERIES_A,
  },
  online: {
    label: "Online",
    color: CHART_SERIES_B,
  },
} satisfies ChartConfig

const SERIES_META = {
  store: {
    label: "Store",
    hint: "Branches and retail",
    color: CHART_SERIES_A,
  },
  online: {
    label: "Online",
    hint: "Web and app",
    color: CHART_SERIES_B,
  },
} as const

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

function pointTotal(point: LegendStylesPoint) {
  return point.store + point.online
}

function CustomLegend({
  payload,
  totals,
  dir,
  locale,
}: DefaultLegendContentProps & {
  totals: { store: number; online: number }
  dir: "ltr" | "rtl"
  locale: string
}) {
  if (!payload?.length) return null

  return (
    <div
      dir={dir}
      className="mt-5 grid w-full grid-cols-1 gap-3 px-1 sm:grid-cols-2"
    >
      {payload
        .filter((item) => item.type !== "none")
        .map((item) => {
          const key = String(item.dataKey ?? "") as keyof typeof SERIES_META
          const meta = SERIES_META[key]
          if (!meta) return null
          const total = totals[key]

          return (
            <div
              key={key}
              className="relative overflow-hidden rounded-xl border border-border/60 bg-muted/40 px-4 py-3.5 font-sans"
            >
              <span
                aria-hidden
                className="absolute inset-y-0 inset-e-0 w-1"
                style={{ backgroundColor: meta.color }}
              />
              <div className="flex items-start justify-between gap-4 pe-2">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="size-3 shrink-0 rounded-full ring-4 ring-background"
                    style={{ backgroundColor: meta.color }}
                  />
                  <div className="text-start">
                    <p className="text-sm font-medium text-foreground">
                      {meta.label}
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      {meta.hint}
                    </p>
                  </div>
                </div>
                <div className="text-end">
                  <p className="text-[10px] text-muted-foreground">
                    Period total
                  </p>
                  <p
                    className="mt-0.5 text-base font-semibold tabular-nums"
                    dir="ltr"
                    style={{
                      color: meta.color,
                      unicodeBidi: "isolate",
                    }}
                  >
                    {formatNumber(total, locale)}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
    </div>
  )
}

function LegendStyles({
  title = "Channel sales",
  subtitle = "Custom card legend with period totals under the bars.",
  data = DEMO_DATA,
  className,
  plotDir,
  scrub = true,
}: LegendStylesProps) {
  const { dir, ref } = useChartDir()
  const plotRtl = (plotDir ?? dir) === "rtl"
  const reducedMotion = usePrefersReducedMotion()
  const chartAreaRef = React.useRef<HTMLDivElement>(null)
  const liveRef = React.useRef<HTMLParagraphElement>(null)
  const scrubbingRef = React.useRef(false)
  const locale = "en"

  const totals = React.useMemo(
    () => ({
      store: data.reduce((sum, row) => sum + row.store, 0),
      online: data.reduce((sum, row) => sum + row.online, 0),
    }),
    [data]
  )

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
              domain={[0, "dataMax + 20"]}
              tickFormatter={yTickFormatter}
              tick={{ fill: AXIS_TICK_FILL, fontSize: 12 }}
            />
            <ChartTooltip
              cursor={{
                fill: "color-mix(in oklab, var(--foreground) 5%, transparent)",
              }}
              content={<ChartTooltipContent dir={dir} />}
            />
            <ChartLegend
              verticalAlign="bottom"
              content={
                <CustomLegend totals={totals} dir={dir} locale={locale} />
              }
            />
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
          </BarChart>
        </ChartContainer>
      </div>

      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">Month</th>
            <th scope="col">Store</th>
            <th scope="col">Online</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={`a11y-${row.month}`}>
              <td>{row.month}</td>
              <td>{row.store}</td>
              <td>{row.online}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function LegendStylesDemo(props: LegendStylesProps) {
  return <LegendStyles {...props} />
}

export { LegendStyles }
