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

import { CHART_SERIES_A, CHART_SERIES_B } from "../_lib/chart-styles"
import { useChartDir } from "../_lib/use-chart-dir"
import { usePrefersReducedMotion } from "../_lib/use-prefers-reduced-motion"

/**
 * Radial Stacked — half-ring Desktop×Mobile stacked along the arc + center total.
 * Tokens: `--chart-1` / `--chart-2`. Spec: `registry/charts/PORT.md`
 * Installs to: components/charts/radial-stacked.tsx
 */

export type RadialStackedPoint = {
  desktop: number
  mobile: number
}

export type RadialStackedProps = {
  title?: string
  subtitle?: string
  data?: RadialStackedPoint[]
  centerLabel?: string
  className?: string
  /** Sweep direction. Omit to follow page `dir`. */
  plotDir?: "ltr" | "rtl"
}

const RADIAL_MS = 200

const DEMO_DATA: RadialStackedPoint[] = [{ desktop: 1260, mobile: 570 }]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: CHART_SERIES_A,
  },
  mobile: {
    label: "Mobile",
    color: CHART_SERIES_B,
  },
} satisfies ChartConfig

function formatNumber(value: number, locale: string) {
  return new Intl.NumberFormat(locale).format(Math.round(value))
}

const chartRadialContainerClassName =
  "mx-auto aspect-square h-auto w-full max-w-[320px] max-h-[min(70vh,320px)] overflow-visible font-sans text-xs tabular-nums [&_.recharts-surface]:overflow-visible"

function RadialStacked({
  title = "Visitors by device",
  subtitle = "Desktop and Mobile stacked on a half ring.",
  data = DEMO_DATA,
  centerLabel = "Visitors",
  className,
  plotDir,
}: RadialStackedProps) {
  const { dir, ref } = useChartDir()
  const plotRtl = (plotDir ?? dir) === "rtl"
  const reducedMotion = usePrefersReducedMotion()
  const locale = "en"

  const row = data[0] ?? DEMO_DATA[0]!
  const total = row.desktop + row.mobile
  const plotData = React.useMemo(
    () => [{ desktop: row.desktop, mobile: row.mobile }],
    [row.desktop, row.mobile]
  )

  // Half ring: LTR 0→180 (CCW from 3 o'clock); RTL mirrors the sweep.
  const startAngle = plotRtl ? 180 : 0
  const endAngle = plotRtl ? 0 : 180

  const ariaLabel = `Stacked radial chart, ${title}, total ${formatNumber(total, locale)} ${centerLabel}, Desktop ${formatNumber(row.desktop, locale)}, Mobile ${formatNumber(row.mobile, locale)}`

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
              {formatNumber(total, locale)}
            </p>
            <span className="text-xs text-muted-foreground">—</span>
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
            innerRadius={80}
            outerRadius={110}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, total]}
              tick={false}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value, name) => {
                    const key = String(name)
                    const label =
                      chartConfig[key as keyof typeof chartConfig]?.label ??
                      key
                    const color =
                      chartConfig[key as keyof typeof chartConfig]?.color
                    return (
                      <div className="flex w-full min-w-[8rem] items-center gap-2">
                        {color ? (
                          <span
                            className="size-2.5 shrink-0 rounded-[2px]"
                            style={{ background: color }}
                            aria-hidden
                          />
                        ) : null}
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
              dataKey="mobile"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-mobile)"
              className="stroke-transparent stroke-2"
              isAnimationActive={!reducedMotion}
              animationDuration={RADIAL_MS}
            />
            <RadialBar
              dataKey="desktop"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-desktop)"
              className="stroke-transparent stroke-2"
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
                        y={(viewBox.cy || 0) - 12}
                        className="fill-foreground text-3xl font-bold"
                        style={{
                          fontFamily:
                            "var(--font-sono-sans), var(--font-sans)",
                        }}
                      >
                        {formatNumber(total, locale)}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 12}
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

      <ul className="mx-auto flex max-w-[380px] flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <li className="inline-flex items-center gap-1.5">
          <span
            className="size-2 shrink-0 rounded-full"
            style={{ backgroundColor: CHART_SERIES_B }}
            aria-hidden
          />
          <span>Mobile</span>
        </li>
        <li className="inline-flex items-center gap-1.5">
          <span
            className="size-2 shrink-0 rounded-full"
            style={{ backgroundColor: CHART_SERIES_A }}
            aria-hidden
          />
          <span>Desktop</span>
        </li>
      </ul>

      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">Series</th>
            <th scope="col">Visitors</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mobile</td>
            <td>{row.mobile}</td>
          </tr>
          <tr>
            <td>Desktop</td>
            <td>{row.desktop}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>{total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default function RadialStackedDemo(props: RadialStackedProps) {
  return <RadialStacked {...props} />
}

export { RadialStacked }
