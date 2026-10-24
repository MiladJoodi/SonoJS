"use client"

import * as React from "react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import { cn } from "@/lib/utils"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

import { CHART_SERIES_A } from "../_lib/chart-styles"
import { useChartDir } from "../_lib/use-chart-dir"
import { usePrefersReducedMotion } from "../_lib/use-prefers-reduced-motion"

/**
 * Chart Radar Grid Circle Fill (classic) — circular PolarGrid tinted with
 * series fill. Locked metric scrub.
 * Spec: `registry/charts/PORT.md`
 * Installs to: components/charts/chart-radar-grid-circle-fill.tsx
 */

export type ChartRadarGridCircleFillPoint = {
  month: string
  store: number
}

export type ChartRadarGridCircleFillProps = {
  title?: string
  subtitle?: string
  data?: ChartRadarGridCircleFillPoint[]
  className?: string
  /** Angle flip. Omit to follow page `dir`. */
  plotDir?: "ltr" | "rtl"
  /** Hover / keyboard category scrub. Default on. */
  scrub?: boolean
}

const RADAR_MS = 200
const AXIS_TICK_FILL =
  "color-mix(in oklab, var(--foreground) 58%, transparent)"
const DEFAULT_TIP_INDEX = 2

const DEMO_DATA: ChartRadarGridCircleFillPoint[] = [
  { month: "Jan", store: 186 },
  { month: "Feb", store: 285 },
  { month: "Mar", store: 237 },
  { month: "Apr", store: 203 },
  { month: "May", store: 209 },
  { month: "Jun", store: 264 },
]

const chartConfig = {
  store: {
    label: "Store",
    color: CHART_SERIES_A,
  },
} satisfies ChartConfig

const chartRadarContainerClassName =
  "mx-auto aspect-square h-auto w-full max-w-[420px] max-h-[min(70vh,420px)] overflow-visible font-sans text-xs tabular-nums [&_.recharts-surface]:overflow-visible [&_.recharts-polar-angle-axis-tick_text]:fill-muted-foreground"

function formatNumber(value: number, locale: string) {
  return new Intl.NumberFormat(locale).format(Math.round(value))
}

function formatPct(value: number) {
  const sign = value > 0 ? "+" : ""
  return `${sign}${Math.round(value)}%`
}

function ChartRadarGridCircleFill({
  title = "Radar grid circle fill",
  subtitle = "Circular PolarGrid tinted with the Store series fill.",
  data = DEMO_DATA,
  className,
  plotDir,
  scrub = true,
}: ChartRadarGridCircleFillProps) {
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
  const metricValue = active ? active.store : 0
  const prevStore = previous ? previous.store : null
  const deltaPct =
    prevStore != null && prevStore !== 0
      ? ((metricValue - prevStore) / prevStore) * 100
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
      if (data.length === 0) return
      const clamped = Math.min(lastIndex, Math.max(0, index))
      setActiveIndex(clamped)
      setScrubbing(true)
      scrubbingRef.current = true
      if (fromKeyboard) announce(clamped)
    },
    [announce, data.length, lastIndex]
  )

  const clearScrub = React.useCallback(() => {
    scrubbingRef.current = false
    setScrubbing(false)
    setActiveIndex(lastIndex)
  }, [lastIndex])

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
      return `Radar chart, ${title}, latest ${formatNumber(metricValue, locale)}`
    }
    return `Radar chart, ${title}, ${active.month} ${formatNumber(active.store, locale)}`
  }, [active, liveScrubbing, locale, metricValue, title])

  const anim = !reducedMotion && !liveScrubbing

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
          className={cn(chartRadarContainerClassName, "max-w-none")}
        >
          <RadarChart
            accessibilityLayer
            data={data}
            margin={{ top: 16, right: 24, bottom: 16, left: 24 }}
            onMouseMove={scrub ? onChartMouseMove : undefined}
            onMouseLeave={scrub ? clearScrub : undefined}
          >
            <ChartTooltip
              cursor={false}
              active
              defaultIndex={liveScrubbing ? liveIndex : tipIndex}
              content={<ChartTooltipContent />}
            />
            <PolarGrid
              className="fill-(--color-store) opacity-20 stroke-border/40"
              gridType="circle"
            />
            <PolarAngleAxis
              dataKey="month"
              reversed={plotRtl}
              tick={{ fill: AXIS_TICK_FILL, fontSize: 12 }}
            />
            <Radar
              dataKey="store"
              name="Store"
              fill="var(--color-store)"
              stroke="var(--color-store)"
              fillOpacity={liveScrubbing ? 0.35 : 0.5}
              strokeWidth={2}
              isAnimationActive={anim}
              animationDuration={RADAR_MS}
              animationEasing="ease-out"
            />
          </RadarChart>
        </ChartContainer>
      </div>

      <ul className="mx-auto flex max-w-[420px] flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <li className="inline-flex items-center gap-1.5">
          <span
            className="size-2 shrink-0 rounded-full"
            style={{ backgroundColor: "var(--chart-1)" }}
            aria-hidden
          />
          <span>{chartConfig.store.label}</span>
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

export default function ChartRadarGridCircleFillDemo(
  props: ChartRadarGridCircleFillProps
) {
  return <ChartRadarGridCircleFill {...props} />
}

export { ChartRadarGridCircleFill }
