"use client"

import * as React from "react"
import {
  Cell,
  RadialBar,
  RadialBarChart as RechartsRadialBarChart,
} from "recharts"

import { cn } from "@/lib/utils"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

import { useChartDir } from "../_lib/use-chart-dir"
import { usePrefersReducedMotion } from "../_lib/use-prefers-reduced-motion"

/**
 * Simple Radial Bar Chart — concentric age-band rings with locked metric scrub.
 * Tokens: `--chart-1…5`. Spec: `registry/charts/PORT.md`
 * Installs to: components/charts/simple-radial-bar-chart.tsx
 */

export type SimpleRadialBarPoint = {
  /** Stable id for config / legend keys. */
  band: string
  /** Share value (demo uses percent points). */
  value: number
}

export type SimpleRadialBarChartProps = {
  title?: string
  subtitle?: string
  data?: SimpleRadialBarPoint[]
  className?: string
  /** Sweep direction. Omit to follow page `dir`. */
  plotDir?: "ltr" | "rtl"
  /** Hover / keyboard ring scrub (dim others, update metric). Default on. */
  scrub?: boolean
}

const RADIAL_MS = 200

const SERIES_VARS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const

const BAND_LABELS: Record<string, string> = {
  "18-24": "18–24",
  "25-34": "25–34",
  "35-44": "35–44",
  "45-54": "45–54",
  "55-plus": "55+",
}

/** Audience share by age band (gallery demo). */
const DEMO_DATA: SimpleRadialBarPoint[] = [
  { band: "18-24", value: 31.47 },
  { band: "25-34", value: 26.69 },
  { band: "35-44", value: 15.69 },
  { band: "45-54", value: 8.22 },
  { band: "55-plus", value: 17.93 },
]

const TRACK_FILL =
  "color-mix(in oklab, var(--muted-foreground) 14%, transparent)"

const LABEL_FILL = "#ffffff"

function seriesColor(index: number) {
  return SERIES_VARS[index % SERIES_VARS.length]!
}

function bandLabel(band: string) {
  return BAND_LABELS[band] ?? band
}

function buildConfig(data: SimpleRadialBarPoint[]): ChartConfig {
  const config: ChartConfig = {
    value: { label: "Share" },
  }
  data.forEach((row, index) => {
    config[row.band] = {
      label: bandLabel(row.band),
      color: seriesColor(index),
    }
  })
  return config
}

function withFills(rows: SimpleRadialBarPoint[]) {
  return rows.map((row) => ({
    ...row,
    name: bandLabel(row.band),
    fill: `var(--color-${row.band})`,
  }))
}

function sumValues(rows: SimpleRadialBarPoint[]) {
  return rows.reduce((acc, row) => acc + row.value, 0)
}

function formatNumber(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 1,
  }).format(value)
}

function formatPct(value: number) {
  return `${Math.round(value)}%`
}

const chartRadialContainerClassName =
  "mx-auto aspect-square h-auto w-full max-w-[380px] max-h-[min(70vh,380px)] overflow-visible font-sans text-xs tabular-nums [&_.recharts-surface]:overflow-visible"

function SimpleRadialBarChart({
  title = "Audience by age",
  subtitle = "Share of visitors — last 30 days.",
  data = DEMO_DATA,
  className,
  plotDir,
  scrub = true,
}: SimpleRadialBarChartProps) {
  const { dir, ref } = useChartDir()
  const plotRtl = (plotDir ?? dir) === "rtl"
  const reducedMotion = usePrefersReducedMotion()
  const liveRef = React.useRef<HTMLParagraphElement>(null)
  const locale = "en"

  const chartConfig = React.useMemo(() => buildConfig(data), [data])
  const plotData = React.useMemo(() => withFills(data), [data])
  const total = sumValues(data)
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
  const liveRow = data[liveIndex] ?? data[lastIndex]
  const metricValue = liveScrubbing && liveRow ? liveRow.value : total
  const sharePct =
    liveScrubbing && liveRow && total > 0
      ? (liveRow.value / total) * 100
      : null
  const caption =
    liveScrubbing && liveRow ? bandLabel(liveRow.band) : "All ages"

  const startAngle = plotRtl ? -270 : 90
  const endAngle = plotRtl ? 90 : -270

  const announce = React.useCallback(
    (index: number) => {
      if (!liveRef.current) return
      const row = data[index]
      if (!row) return
      const pct = total > 0 ? (row.value / total) * 100 : 0
      liveRef.current.textContent = `${bandLabel(row.band)}: ${formatNumber(row.value, locale)} (${formatPct(pct)})`
    },
    [data, locale, total]
  )

  const activate = React.useCallback(
    (index: number, fromKeyboard = false) => {
      if (data.length === 0) return
      const clamped = Math.min(lastIndex, Math.max(0, index))
      setActiveIndex(clamped)
      setScrubbing(true)
      if (fromKeyboard) announce(clamped)
    },
    [announce, data.length, lastIndex]
  )

  const clearScrub = React.useCallback(() => {
    setScrubbing(false)
    setActiveIndex(lastIndex)
  }, [lastIndex])

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

  const cellOpacity = (index: number) => {
    if (!liveScrubbing) return 1
    return index === liveIndex ? 1 : 0.4
  }

  const ariaLabel = React.useMemo(() => {
    if (!liveScrubbing || !liveRow) {
      return `Radial bar chart, ${title}, total ${formatNumber(total, locale)}`
    }
    const pct = total > 0 ? formatPct((liveRow.value / total) * 100) : ""
    return `Radial bar chart, ${title}, ${caption} ${formatNumber(liveRow.value, locale)} ${pct}`
  }, [caption, liveScrubbing, liveRow, locale, title, total])

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
            {sharePct != null ? (
              <span
                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium tabular-nums text-muted-foreground"
                style={{
                  backgroundColor:
                    "color-mix(in oklab, var(--foreground) 8%, transparent)",
                }}
              >
                {formatPct(sharePct)}
                <span className="font-normal">of total</span>
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
          className={cn(chartRadialContainerClassName, "max-w-none")}
        >
          <RechartsRadialBarChart
            accessibilityLayer
            data={plotData}
            innerRadius="18%"
            outerRadius="100%"
            startAngle={startAngle}
            endAngle={endAngle}
            barSize={14}
          >
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  nameKey="band"
                  formatter={(value, _name, item) => {
                    const payload = item?.payload as
                      | { band?: string }
                      | undefined
                    const key = String(payload?.band ?? item?.name ?? "")
                    const label = chartConfig[key]?.label ?? key
                    const color =
                      typeof item?.color === "string"
                        ? item.color
                        : seriesColor(
                            data.findIndex((row) => row.band === key)
                          )
                    return (
                      <div className="flex w-full min-w-[8rem] items-center gap-2">
                        <span
                          className="size-2.5 shrink-0 rounded-[2px]"
                          style={{ background: color }}
                          aria-hidden
                        />
                        <div className="flex flex-1 items-center justify-between gap-4 leading-none">
                          <span className="text-muted-foreground">{label}</span>
                          <span className="font-medium tabular-nums text-foreground">
                            {formatNumber(Number(value), locale)}
                          </span>
                        </div>
                      </div>
                    )
                  }}
                />
              }
            />
            <RadialBar
              dataKey="value"
              background={{ fill: TRACK_FILL }}
              cornerRadius={6}
              isAnimationActive={!reducedMotion && !liveScrubbing}
              animationDuration={RADIAL_MS}
              label={{
                position: "insideStart",
                fill: LABEL_FILL,
                fontSize: 11,
              }}
              onMouseEnter={
                scrub
                  ? (_entry, index) => {
                      activate(index)
                    }
                  : undefined
              }
              onMouseLeave={scrub ? clearScrub : undefined}
            >
              {plotData.map((row, index) => (
                <Cell
                  key={row.band}
                  fill={row.fill}
                  fillOpacity={cellOpacity(index)}
                  className={cn(
                    "outline-none",
                    !reducedMotion &&
                      "transition-[fill-opacity] duration-200 ease-out"
                  )}
                  style={{ cursor: scrub ? "pointer" : undefined }}
                />
              ))}
            </RadialBar>
          </RechartsRadialBarChart>
        </ChartContainer>
      </div>

      <ul className="mx-auto flex max-w-[380px] flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        {data.map((row, index) => (
          <li key={row.band} className="inline-flex items-center gap-1.5">
            <span
              className="size-2 shrink-0 rounded-full"
              style={{ backgroundColor: seriesColor(index) }}
              aria-hidden
            />
            <span>{bandLabel(row.band)}</span>
          </li>
        ))}
      </ul>

      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">Age band</th>
            <th scope="col">Share</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={`a11y-${row.band}`}>
              <td>{bandLabel(row.band)}</td>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function SimpleRadialBarChartDemo(
  props: SimpleRadialBarChartProps
) {
  return <SimpleRadialBarChart {...props} />
}

export { SimpleRadialBarChart }
