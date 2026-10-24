"use client"

import * as React from "react"
import { Cell, Pie, PieChart } from "recharts"

import { cn } from "@/lib/utils"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

import { pieSliceTooltip } from "../_lib/pie-tooltip"
import { useChartDir } from "../_lib/use-chart-dir"
import { usePrefersReducedMotion } from "../_lib/use-prefers-reduced-motion"

/**
 * Pie Responsive Container — fluid square ChartContainer stage + labeled pie.
 * Locked metric scrub; EN regions; `--chart-1…4`; ChartLegend wrap row.
 * Spec: `registry/charts/PORT.md`
 * Installs to: components/charts/pie-responsive-container.tsx
 */

export type PieResponsiveSlice = {
  province: string
  sales: number
}

export type PieResponsiveContainerProps = {
  title?: string
  subtitle?: string
  data?: PieResponsiveSlice[]
  className?: string
  /** Slice order / start angle. Omit to follow page `dir`. */
  plotDir?: "ltr" | "rtl"
  /** Hover / keyboard slice scrub. Default on. */
  scrub?: boolean
}

const SERIES_VARS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const

/** Same shape as FarsiUI sample (4 slices); EN region keys. */
const DEMO_DATA: PieResponsiveSlice[] = [
  { province: "west", sales: 400 },
  { province: "midwest", sales: 300 },
  { province: "south", sales: 300 },
  { province: "northeast", sales: 200 },
]

const SLICE_LABELS: Record<string, string> = {
  west: "West",
  midwest: "Midwest",
  south: "South",
  northeast: "Northeast",
}

function seriesColor(index: number) {
  return SERIES_VARS[index % SERIES_VARS.length]!
}

function buildConfig(data: PieResponsiveSlice[]): ChartConfig {
  const config: ChartConfig = {
    sales: { label: "Sales" },
  }
  data.forEach((slice, index) => {
    config[slice.province] = {
      label: SLICE_LABELS[slice.province] ?? slice.province,
      color: seriesColor(index),
    }
  })
  return config
}

function withFills(slices: PieResponsiveSlice[]) {
  return slices.map((slice) => ({
    ...slice,
    fill: `var(--color-${slice.province})`,
  }))
}

function sumSales(slices: PieResponsiveSlice[]) {
  return slices.reduce((acc, slice) => acc + slice.sales, 0)
}

function formatNumber(value: number, locale: string) {
  return new Intl.NumberFormat(locale).format(Math.round(value))
}

function formatPct(value: number) {
  return `${Math.round(value)}%`
}

/** Teaching square stage — fluid within a fixed outer height (FA pattern). */
const stageClassName =
  "mx-auto aspect-square h-full w-full max-w-[300px] overflow-visible font-sans text-xs tabular-nums [&_.recharts-surface]:overflow-visible [&_.recharts-pie-label-text]:fill-foreground"

function PieResponsiveContainer({
  title = "Sales by region",
  subtitle = "Responsive square pie stage with value labels and legend.",
  data = DEMO_DATA,
  className,
  plotDir,
  scrub = true,
}: PieResponsiveContainerProps) {
  const { dir, ref } = useChartDir()
  const plotRtl = (plotDir ?? dir) === "rtl"
  const reducedMotion = usePrefersReducedMotion()
  const liveRef = React.useRef<HTMLParagraphElement>(null)
  const locale = "en"

  const chartConfig = React.useMemo(() => buildConfig(data), [data])
  const plotData = React.useMemo(() => withFills(data), [data])
  const total = sumSales(data)
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
  const liveSlice = data[liveIndex] ?? data[lastIndex]
  const metricValue = liveScrubbing && liveSlice ? liveSlice.sales : total
  const sharePct =
    liveScrubbing && liveSlice && total > 0
      ? (liveSlice.sales / total) * 100
      : null
  const caption =
    liveScrubbing && liveSlice
      ? (SLICE_LABELS[liveSlice.province] ?? liveSlice.province)
      : "All regions"

  const startAngle = plotRtl ? -270 : 90
  const endAngle = plotRtl ? 90 : -270

  const announce = React.useCallback(
    (index: number) => {
      if (!liveRef.current) return
      const slice = data[index]
      if (!slice) return
      const label = SLICE_LABELS[slice.province] ?? slice.province
      const pct = total > 0 ? (slice.sales / total) * 100 : 0
      liveRef.current.textContent = `${label}: ${formatNumber(slice.sales, locale)} (${formatPct(pct)})`
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
    if (!liveScrubbing || !liveSlice) {
      return `Pie chart, ${title}, total ${formatNumber(total, locale)}`
    }
    const pct = total > 0 ? formatPct((liveSlice.sales / total) * 100) : ""
    return `Pie chart, ${title}, ${caption} ${formatNumber(liveSlice.sales, locale)} ${pct}`
  }, [caption, liveScrubbing, liveSlice, locale, title, total])

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
        className="mx-auto h-[300px] w-full touch-pan-y rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <ChartContainer config={chartConfig} className={stageClassName}>
          <PieChart accessibilityLayer>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  dir={dir}
                  hideLabel
                  nameKey="province"
                  formatter={(value, _name, item) =>
                    pieSliceTooltip(value, item, {
                      locale,
                      config: chartConfig,
                      nameKey: "province",
                    })
                  }
                />
              }
            />
            <Pie
              data={plotData}
              dataKey="sales"
              nameKey="province"
              cx="50%"
              cy="50%"
              startAngle={startAngle}
              endAngle={endAngle}
              stroke="var(--background)"
              strokeWidth={2}
              label={({ value }) => formatNumber(Number(value), locale)}
              isAnimationActive={false}
              onMouseEnter={
                scrub ? (_, index) => activate(index) : undefined
              }
              onMouseLeave={scrub ? clearScrub : undefined}
            >
              {plotData.map((slice, index) => (
                <Cell
                  key={slice.province}
                  fill={slice.fill}
                  fillOpacity={cellOpacity(index)}
                  className={cn(
                    "outline-none",
                    scrub && "cursor-pointer",
                    !reducedMotion &&
                      "transition-[fill-opacity] duration-200 ease-out"
                  )}
                />
              ))}
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="province" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </div>

      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">Province</th>
            <th scope="col">Sales</th>
          </tr>
        </thead>
        <tbody>
          {data.map((slice) => (
            <tr key={`a11y-${slice.province}`}>
              <td>{SLICE_LABELS[slice.province] ?? slice.province}</td>
              <td>{slice.sales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function PieResponsiveContainerDemo(
  props: PieResponsiveContainerProps
) {
  return <PieResponsiveContainer {...props} />
}

export { PieResponsiveContainer }
