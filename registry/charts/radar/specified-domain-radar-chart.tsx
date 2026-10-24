"use client"

import * as React from "react"
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts"

import { cn } from "@/lib/utils"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

import { CHART_SERIES_A, CHART_SERIES_B } from "../_lib/chart-styles"
import { useChartDir } from "../_lib/use-chart-dir"
import { usePrefersReducedMotion } from "../_lib/use-prefers-reduced-motion"

/**
 * Specified Domain Radar Chart — dual Alex×Sara polygons with fixed
 * PolarRadiusAxis domain [0, 150]. Locked metric scrub.
 * Spec: `registry/charts/PORT.md`
 * Installs to: components/charts/specified-domain-radar-chart.tsx
 */

export type SpecifiedDomainRadarPoint = {
  subject: string
  alex: number
  sara: number
}

export type SpecifiedDomainRadarChartProps = {
  title?: string
  subtitle?: string
  data?: SpecifiedDomainRadarPoint[]
  className?: string
  /** Angle flip. Omit to follow page `dir`. */
  plotDir?: "ltr" | "rtl"
  /** Hover / keyboard category scrub. Default on. */
  scrub?: boolean
}

const RADAR_MS = 200
const AXIS_TICK_FILL =
  "color-mix(in oklab, var(--foreground) 58%, transparent)"
/** Idle tip pin so tip chrome stays inspectable. */
const DEFAULT_TIP_INDEX = 2
const RADIUS_DOMAIN: [number, number] = [0, 150]

const DEMO_DATA: SpecifiedDomainRadarPoint[] = [
  { subject: "Math", alex: 120, sara: 110 },
  { subject: "Language", alex: 98, sara: 130 },
  { subject: "English", alex: 86, sara: 130 },
  { subject: "Geography", alex: 99, sara: 100 },
  { subject: "Physics", alex: 85, sara: 90 },
  { subject: "History", alex: 65, sara: 85 },
]

const chartConfig = {
  alex: {
    label: "Alex",
    color: CHART_SERIES_A,
  },
  sara: {
    label: "Sara",
    color: CHART_SERIES_B,
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

function pointTotal(point: SpecifiedDomainRadarPoint) {
  return point.alex + point.sara
}

function SpecifiedDomainRadarChart({
  title = "Specified domain",
  subtitle = "Dual radar with PolarRadiusAxis domain fixed at 0–150.",
  data = DEMO_DATA,
  className,
  plotDir,
  scrub = true,
}: SpecifiedDomainRadarChartProps) {
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
    liveScrubbing && active ? active.subject : "Latest subject"

  const announce = React.useCallback(
    (index: number) => {
      const point = data[index]
      if (!point || !liveRef.current) return
      liveRef.current.textContent = `${point.subject}: ${formatNumber(pointTotal(point), locale)}`
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
    return `Radar chart, ${title}, ${active.subject} ${formatNumber(pointTotal(active), locale)}`
  }, [active, liveScrubbing, locale, metricValue, title])

  const anim = !reducedMotion && !liveScrubbing
  const fillOpacity = liveScrubbing ? 0.4 : 0.55

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
            outerRadius="80%"
            margin={{ top: 16, right: 24, bottom: 16, left: 24 }}
            onMouseMove={scrub ? onChartMouseMove : undefined}
            onMouseLeave={scrub ? clearScrub : undefined}
          >
            <PolarGrid
              className="stroke-border/40"
              strokeDasharray="4 4"
            />
            <PolarAngleAxis
              dataKey="subject"
              reversed={plotRtl}
              tick={{ fill: AXIS_TICK_FILL, fontSize: 12 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={RADIUS_DOMAIN}
              tick={false}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              active
              defaultIndex={liveScrubbing ? liveIndex : tipIndex}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Radar
              dataKey="alex"
              name="Alex"
              fill="var(--color-alex)"
              stroke="var(--color-alex)"
              fillOpacity={fillOpacity}
              strokeWidth={2}
              isAnimationActive={anim}
              animationDuration={RADAR_MS}
              animationEasing="ease-out"
            />
            <Radar
              dataKey="sara"
              name="Sara"
              fill="var(--color-sara)"
              stroke="var(--color-sara)"
              fillOpacity={fillOpacity}
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
          <span>{chartConfig.alex.label}</span>
        </li>
        <li className="inline-flex items-center gap-1.5">
          <span
            className="size-2 shrink-0 rounded-full"
            style={{ backgroundColor: "var(--chart-2)" }}
            aria-hidden
          />
          <span>{chartConfig.sara.label}</span>
        </li>
      </ul>

      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">Subject</th>
            <th scope="col">Alex</th>
            <th scope="col">Sara</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={`a11y-${row.subject}`}>
              <td>{row.subject}</td>
              <td>{row.alex}</td>
              <td>{row.sara}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function SpecifiedDomainRadarChartDemo(
  props: SpecifiedDomainRadarChartProps
) {
  return <SpecifiedDomainRadarChart {...props} />
}

export { SpecifiedDomainRadarChart }
