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

import { CHART_SERIES_A, CHART_SERIES_B } from "../_lib/chart-styles"
import { useChartDir } from "../_lib/use-chart-dir"
import { usePrefersReducedMotion } from "../_lib/use-prefers-reduced-motion"

/**
 * Chart Radar Label Custom (classic) — dual Store×Online with custom
 * PolarAngleAxis ticks (values + month). Locked metric scrub.
 * Spec: `registry/charts/PORT.md`
 * Installs to: components/charts/chart-radar-label-custom.tsx
 */

export type ChartRadarLabelCustomPoint = {
  month: string
  store: number
  online: number
}

export type ChartRadarLabelCustomProps = {
  title?: string
  subtitle?: string
  data?: ChartRadarLabelCustomPoint[]
  className?: string
  /** Angle flip. Omit to follow page `dir`. */
  plotDir?: "ltr" | "rtl"
  /** Hover / keyboard category scrub. Default on. */
  scrub?: boolean
}

const RADAR_MS = 200
const DEFAULT_TIP_INDEX = 2

const DEMO_DATA: ChartRadarLabelCustomPoint[] = [
  { month: "Jan", store: 186, online: 80 },
  { month: "Feb", store: 305, online: 200 },
  { month: "Mar", store: 237, online: 120 },
  { month: "Apr", store: 73, online: 190 },
  { month: "May", store: 209, online: 130 },
  { month: "Jun", store: 214, online: 140 },
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

const chartRadarContainerClassName =
  "mx-auto aspect-square h-auto w-full max-w-[420px] max-h-[min(70vh,420px)] overflow-visible font-sans text-xs tabular-nums [&_.recharts-surface]:overflow-visible"

function formatNumber(value: number, locale: string) {
  return new Intl.NumberFormat(locale).format(Math.round(value))
}

function formatPct(value: number) {
  const sign = value > 0 ? "+" : ""
  return `${sign}${Math.round(value)}%`
}

function pointTotal(point: ChartRadarLabelCustomPoint) {
  return point.store + point.online
}

function ChartRadarLabelCustom({
  title = "Radar label custom",
  subtitle = "Custom angle ticks show Store/Online values above the month.",
  data = DEMO_DATA,
  className,
  plotDir,
  scrub = true,
}: ChartRadarLabelCustomProps) {
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
    return `Radar chart, ${title}, ${active.month} ${formatNumber(pointTotal(active), locale)}`
  }, [active, liveScrubbing, locale, metricValue, title])

  const anim = !reducedMotion && !liveScrubbing
  const storeOpacity = liveScrubbing ? 0.4 : 0.6

  const renderAngleTick = React.useCallback(
    (props: {
      x?: number | string
      y?: number | string
      textAnchor?: string
      index?: number
    }) => {
      const { x = 0, y = 0, textAnchor, index = 0, ...rest } = props
      const row = data[index]
      if (!row) return null
      const xNum = typeof x === "number" ? x : Number(x)
      const yNum = typeof y === "number" ? y : Number(y)
      const activeTick = liveScrubbing && index === liveIndex
      const dimmed = liveScrubbing && index !== liveIndex
      const anchor =
        textAnchor === "start" ||
        textAnchor === "middle" ||
        textAnchor === "end" ||
        textAnchor === "inherit"
          ? textAnchor
          : undefined

      return (
        <text
          x={xNum}
          y={yNum + (index === 0 ? -10 : 0)}
          textAnchor={anchor}
          fontSize={13}
          fontWeight={500}
          fillOpacity={dimmed ? 0.4 : 1}
          className={cn(
            "fill-foreground tabular-nums",
            activeTick && "font-semibold"
          )}
          {...rest}
        >
          <tspan>{formatNumber(row.store, locale)}</tspan>
          <tspan className="fill-muted-foreground">/</tspan>
          <tspan>{formatNumber(row.online, locale)}</tspan>
          <tspan
            x={xNum}
            dy="1rem"
            fontSize={12}
            className="fill-muted-foreground"
          >
            {row.month}
          </tspan>
        </text>
      )
    },
    [data, liveIndex, liveScrubbing, locale]
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
          className={cn(chartRadarContainerClassName, "max-w-none")}
        >
          <RadarChart
            accessibilityLayer
            data={data}
            margin={{ top: 24, right: 28, bottom: 24, left: 28 }}
            onMouseMove={scrub ? onChartMouseMove : undefined}
            onMouseLeave={scrub ? clearScrub : undefined}
          >
            <ChartTooltip
              cursor={false}
              active
              defaultIndex={liveScrubbing ? liveIndex : tipIndex}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis
              dataKey="month"
              reversed={plotRtl}
              tick={renderAngleTick}
            />
            <PolarGrid
              className="stroke-border/40"
              strokeDasharray="4 4"
            />
            <Radar
              dataKey="store"
              name="Store"
              fill="var(--color-store)"
              stroke="var(--color-store)"
              fillOpacity={storeOpacity}
              strokeWidth={2}
              isAnimationActive={anim}
              animationDuration={RADAR_MS}
              animationEasing="ease-out"
            />
            <Radar
              dataKey="online"
              name="Online"
              fill="var(--color-online)"
              stroke="var(--color-online)"
              fillOpacity={liveScrubbing ? 0.55 : 0.85}
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
        <li className="inline-flex items-center gap-1.5">
          <span
            className="size-2 shrink-0 rounded-full"
            style={{ backgroundColor: "var(--chart-2)" }}
            aria-hidden
          />
          <span>{chartConfig.online.label}</span>
        </li>
      </ul>

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

export default function ChartRadarLabelCustomDemo(
  props: ChartRadarLabelCustomProps
) {
  return <ChartRadarLabelCustom {...props} />
}

export { ChartRadarLabelCustom }
