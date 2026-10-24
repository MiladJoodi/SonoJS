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
 * Radial Bar Chart Click To Focus Legend — click a ring or legend chip to focus.
 * Dim others to 20%; click again to clear. Tokens: `--chart-1…5`.
 * Spec: `registry/charts/PORT.md`
 * Installs to: components/charts/radial-bar-chart-click-to-focus-legend.tsx
 */

export type RadialBarClickFocusPoint = {
  band: string
  value: number
}

export type RadialBarChartClickToFocusLegendProps = {
  title?: string
  subtitle?: string
  data?: RadialBarClickFocusPoint[]
  className?: string
  /** Sweep direction. Omit to follow page `dir`. */
  plotDir?: "ltr" | "rtl"
}

const RADIAL_MS = 200
const DIM_OPACITY = 0.2

const SERIES_VARS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const

const BAND_LABELS: Record<string, string> = {
  alpha: "Alpha",
  beta: "Beta",
  gamma: "Gamma",
  delta: "Delta",
  epsilon: "Epsilon",
}

/** Five concentric series — one unique `--chart-1…5` each (English labels). */
const DEMO_DATA: RadialBarClickFocusPoint[] = [
  { band: "alpha", value: 86 },
  { band: "beta", value: 72 },
  { band: "gamma", value: 64 },
  { band: "delta", value: 51 },
  { band: "epsilon", value: 38 },
]

const TRACK_FILL =
  "color-mix(in oklab, var(--muted-foreground) 14%, transparent)"

function seriesColor(index: number) {
  return SERIES_VARS[index % SERIES_VARS.length]!
}

function bandLabel(band: string) {
  return BAND_LABELS[band] ?? band
}

function buildConfig(data: RadialBarClickFocusPoint[]): ChartConfig {
  const config: ChartConfig = {
    value: { label: "Score" },
  }
  data.forEach((row, index) => {
    config[row.band] = {
      label: bandLabel(row.band),
      color: seriesColor(index),
    }
  })
  return config
}

function withFills(rows: RadialBarClickFocusPoint[]) {
  return rows.map((row) => ({
    ...row,
    name: bandLabel(row.band),
    fill: `var(--color-${row.band})`,
  }))
}

function sumValues(rows: RadialBarClickFocusPoint[]) {
  return rows.reduce((acc, row) => acc + row.value, 0)
}

function formatNumber(value: number, locale: string) {
  return new Intl.NumberFormat(locale).format(Math.round(value))
}

const chartRadialContainerClassName =
  "mx-auto aspect-square h-auto w-full max-w-[380px] max-h-[min(70vh,380px)] overflow-visible font-sans text-xs tabular-nums [&_.recharts-surface]:overflow-visible"

function RadialBarChartClickToFocusLegend({
  title = "Channel focus",
  subtitle = "Click a ring or legend chip to isolate a series.",
  data = DEMO_DATA,
  className,
  plotDir,
}: RadialBarChartClickToFocusLegendProps) {
  const { dir, ref } = useChartDir()
  const plotRtl = (plotDir ?? dir) === "rtl"
  const reducedMotion = usePrefersReducedMotion()
  const liveRef = React.useRef<HTMLParagraphElement>(null)
  const locale = "en"

  const chartConfig = React.useMemo(() => buildConfig(data), [data])
  const plotData = React.useMemo(() => withFills(data), [data])
  const total = sumValues(data)
  const lastIndex = Math.max(0, data.length - 1)

  const [selectedBand, setSelectedBand] = React.useState<string | null>(null)
  const [dataTrack, setDataTrack] = React.useState(data)
  if (dataTrack !== data) {
    setDataTrack(data)
    setSelectedBand(null)
  }

  const selectedIndex = selectedBand
    ? data.findIndex((row) => row.band === selectedBand)
    : -1
  const focused = selectedIndex >= 0 ? data[selectedIndex] : null
  const metricValue = focused ? focused.value : total
  const caption = focused ? bandLabel(focused.band) : "All channels"

  const startAngle = plotRtl ? -270 : 90
  const endAngle = plotRtl ? 90 : -270

  const toggleBand = React.useCallback(
    (band: string, fromKeyboard = false) => {
      setSelectedBand((curr) => {
        const next = curr === band ? null : band
        if (fromKeyboard && liveRef.current) {
          if (next == null) {
            liveRef.current.textContent = `All channels: ${formatNumber(total, locale)}`
          } else {
            const row = data.find((r) => r.band === next)
            if (row) {
              liveRef.current.textContent = `${bandLabel(row.band)}: ${formatNumber(row.value, locale)}`
            }
          }
        }
        return next
      })
    },
    [data, locale, total]
  )

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const reverse = plotRtl
      const idx =
        selectedIndex >= 0 ? selectedIndex : reverse ? lastIndex : 0

      switch (event.key) {
        case "ArrowLeft": {
          event.preventDefault()
          const next = Math.min(
            lastIndex,
            Math.max(0, idx + (reverse ? 1 : -1))
          )
          const row = data[next]
          if (row) toggleBand(row.band, true)
          break
        }
        case "ArrowRight": {
          event.preventDefault()
          const next = Math.min(
            lastIndex,
            Math.max(0, idx + (reverse ? -1 : 1))
          )
          const row = data[next]
          if (row) toggleBand(row.band, true)
          break
        }
        case "Home": {
          event.preventDefault()
          const row = data[reverse ? lastIndex : 0]
          if (row) toggleBand(row.band, true)
          break
        }
        case "End": {
          event.preventDefault()
          const row = data[reverse ? 0 : lastIndex]
          if (row) toggleBand(row.band, true)
          break
        }
        case "Escape":
          event.preventDefault()
          setSelectedBand(null)
          if (liveRef.current) {
            liveRef.current.textContent = `All channels: ${formatNumber(total, locale)}`
          }
          break
        default:
          break
      }
    },
    [
      data,
      lastIndex,
      locale,
      plotRtl,
      selectedIndex,
      toggleBand,
      total,
    ]
  )

  const cellOpacity = (band: string) => {
    if (selectedBand == null) return 1
    return band === selectedBand ? 1 : DIM_OPACITY
  }

  const legendOpacity = (band: string) => {
    if (selectedBand == null) return 1
    return band === selectedBand ? 1 : DIM_OPACITY
  }

  const ariaLabel = React.useMemo(() => {
    if (!focused) {
      return `Radial bar chart, ${title}, total ${formatNumber(total, locale)}`
    }
    return `Radial bar chart, ${title}, focused ${caption} ${formatNumber(focused.value, locale)}`
  }, [caption, focused, locale, title, total])

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
              {focused ? "focused" : "—"}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">{caption}</p>
        </div>
      </header>

      <p ref={liveRef} className="sr-only" aria-live="polite" />

      <div
        dir="ltr"
        role="img"
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="touch-pan-y rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <ChartContainer
          config={chartConfig}
          className={cn(chartRadialContainerClassName, "max-w-none")}
        >
          <RechartsRadialBarChart
            accessibilityLayer
            data={plotData}
            innerRadius="12%"
            outerRadius="100%"
            startAngle={startAngle}
            endAngle={endAngle}
            barSize={12}
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
              cornerRadius={8}
              stroke="none"
              isAnimationActive={!reducedMotion}
              animationDuration={RADIAL_MS}
              onClick={(_entry, index) => {
                const row = data[index]
                if (row) toggleBand(row.band)
              }}
              style={{ cursor: "pointer" }}
            >
              {plotData.map((row) => (
                <Cell
                  key={row.band}
                  fill={row.fill}
                  fillOpacity={cellOpacity(row.band)}
                  className={cn(
                    "cursor-pointer outline-none",
                    !reducedMotion &&
                      "transition-[fill-opacity] duration-200 ease-out"
                  )}
                />
              ))}
            </RadialBar>
          </RechartsRadialBarChart>
        </ChartContainer>
      </div>

      <ul className="mx-auto flex max-w-[420px] flex-wrap items-center justify-center gap-x-1 gap-y-2">
        {data.map((row, index) => {
          const active = selectedBand === row.band
          return (
            <li key={row.band}>
              <button
                type="button"
                onClick={() => toggleBand(row.band)}
                aria-pressed={active}
                className={cn(
                  "inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground outline-none transition-opacity duration-200 ease-out hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring",
                  active && "bg-muted text-foreground"
                )}
                style={{ opacity: legendOpacity(row.band) }}
              >
                <span
                  className="size-2 shrink-0 rounded-full"
                  style={{ backgroundColor: seriesColor(index) }}
                  aria-hidden
                />
                <span>{bandLabel(row.band)}</span>
              </button>
            </li>
          )
        })}
      </ul>

      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">Channel</th>
            <th scope="col">Score</th>
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

export default function RadialBarChartClickToFocusLegendDemo(
  props: RadialBarChartClickToFocusLegendProps
) {
  return <RadialBarChartClickToFocusLegend {...props} />
}

export { RadialBarChartClickToFocusLegend }
