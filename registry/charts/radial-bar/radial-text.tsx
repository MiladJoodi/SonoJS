"use client"

import * as React from "react"
import {
  Label,
  PolarAngleAxis,
  PolarRadiusAxis,
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

import { CHART_SERIES_A } from "../_lib/chart-styles"
import { useChartDir } from "../_lib/use-chart-dir"
import { usePrefersReducedMotion } from "../_lib/use-prefers-reduced-motion"

/**
 * Radial Text — single progress ring with centered value + caption Label.
 * Tokens: `--chart-1`. Spec: `registry/charts/PORT.md`
 * Installs to: components/charts/radial-text.tsx
 */

export type RadialTextPoint = {
  /** Progress value shown in the center and metric header. */
  visitors: number
}

export type RadialTextProps = {
  title?: string
  subtitle?: string
  data?: RadialTextPoint[]
  /** Upper bound of the radial scale (full ring). */
  max?: number
  /** Center caption under the value. */
  centerLabel?: string
  className?: string
  /** Sweep direction. Omit to follow page `dir`. */
  plotDir?: "ltr" | "rtl"
}

const RADIAL_MS = 200

const DEMO_DATA: RadialTextPoint[] = [{ visitors: 200 }]

const TRACK_FILL =
  "color-mix(in oklab, var(--muted-foreground) 14%, transparent)"

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: CHART_SERIES_A,
  },
} satisfies ChartConfig

function formatNumber(value: number, locale: string) {
  return new Intl.NumberFormat(locale).format(Math.round(value))
}

const chartRadialContainerClassName =
  "mx-auto aspect-square h-auto w-full max-w-[280px] max-h-[min(70vh,280px)] overflow-visible font-sans text-xs tabular-nums [&_.recharts-surface]:overflow-visible"

function RadialText({
  title = "Today’s visitors",
  subtitle = "Progress toward the daily goal.",
  data = DEMO_DATA,
  max = 250,
  centerLabel = "Visitors",
  className,
  plotDir,
}: RadialTextProps) {
  const { dir, ref } = useChartDir()
  const plotRtl = (plotDir ?? dir) === "rtl"
  const reducedMotion = usePrefersReducedMotion()
  const locale = "en"

  const value = data[0]?.visitors ?? 0
  const plotData = React.useMemo(
    () => [{ visitors: value, fill: "var(--color-visitors)" }],
    [value]
  )
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0

  const startAngle = plotRtl ? -270 : 90
  // Partial sweep (~250°) so the ring reads as progress, not a full donut.
  const sweep = 250
  const endAngle = plotRtl ? -270 + sweep : 90 - sweep

  const ariaLabel = `Radial progress, ${title}, ${formatNumber(value, locale)} ${centerLabel}, ${Math.round(pct)} percent of goal`

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
              {formatNumber(value, locale)}
            </p>
            <span
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium tabular-nums text-muted-foreground"
              style={{
                backgroundColor:
                  "color-mix(in oklab, var(--foreground) 8%, transparent)",
              }}
            >
              {Math.round(pct)}%
              <span className="font-normal">of goal</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground">{centerLabel}</p>
        </div>
      </header>

      <div
        dir="ltr"
        role="img"
        aria-label={ariaLabel}
        className="rounded-lg"
      >
        <ChartContainer
          config={chartConfig}
          className={cn(chartRadialContainerClassName, "max-w-none")}
        >
          <RechartsRadialBarChart
            accessibilityLayer
            data={plotData}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius="72%"
            outerRadius="100%"
          >
            <PolarAngleAxis
              type="number"
              domain={[0, max]}
              tick={false}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(val) => (
                    <div className="flex w-full min-w-[8rem] items-center gap-2">
                      <span
                        className="size-2.5 shrink-0 rounded-[2px]"
                        style={{ background: CHART_SERIES_A }}
                        aria-hidden
                      />
                      <div className="flex flex-1 items-center justify-between gap-4 leading-none">
                        <span className="text-muted-foreground">
                          {centerLabel}
                        </span>
                        <span className="font-medium tabular-nums text-foreground">
                          {formatNumber(Number(val), locale)}
                        </span>
                      </div>
                    </div>
                  )}
                />
              }
            />
            <RadialBar
              dataKey="visitors"
              background={{ fill: TRACK_FILL }}
              cornerRadius={10}
              fill="var(--color-visitors)"
              isAnimationActive={!reducedMotion}
              animationDuration={RADIAL_MS}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox)) {
                    return null
                  }
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                        style={{
                          fontFamily:
                            "var(--font-sono-sans), var(--font-sans)",
                        }}
                      >
                        {formatNumber(value, locale)}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 22}
                        className="fill-muted-foreground text-xs"
                        style={{
                          fontFamily:
                            "var(--font-sono-sans), var(--font-sans)",
                        }}
                      >
                        {centerLabel}
                      </tspan>
                    </text>
                  )
                }}
              />
            </PolarRadiusAxis>
          </RechartsRadialBarChart>
        </ChartContainer>
      </div>

      <table className="sr-only">
        <caption>{title}</caption>
        <tbody>
          <tr>
            <th scope="row">{centerLabel}</th>
            <td>
              {value} / {max}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default function RadialTextDemo(props: RadialTextProps) {
  return <RadialText {...props} />
}

export { RadialText }
