"use client"

import * as React from "react"
import {
  Label,
  PolarGrid,
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
 * Radial Shape — thick square-ended arc over a thin muted track + center Label.
 * Teaching delta vs `radial-text`: no `cornerRadius`, heavier bar, decorative sweep.
 * Tokens: `--chart-1`. Spec: `registry/charts/PORT.md`
 * Installs to: components/charts/radial-shape.tsx
 */

export type RadialShapePoint = {
  visitors: number
}

export type RadialShapeProps = {
  title?: string
  subtitle?: string
  data?: RadialShapePoint[]
  centerLabel?: string
  className?: string
  /** Sweep direction. Omit to follow page `dir`. */
  plotDir?: "ltr" | "rtl"
}

const RADIAL_MS = 200

const DEMO_DATA: RadialShapePoint[] = [{ visitors: 1260 }]

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

function RadialShape({
  title = "Monthly visitors",
  subtitle = "Thick square-ended arc — decorative sweep with center total.",
  data = DEMO_DATA,
  centerLabel = "Visitors",
  className,
  plotDir,
}: RadialShapeProps) {
  const { dir, ref } = useChartDir()
  const plotRtl = (plotDir ?? dir) === "rtl"
  const reducedMotion = usePrefersReducedMotion()
  const locale = "en"

  const value = data[0]?.visitors ?? 0
  const plotData = React.useMemo(
    () => [{ visitors: value, fill: "var(--color-visitors)" }],
    [value]
  )

  // ~100° decorative sweep (fills the arc; not a progress domain).
  const startAngle = 0
  const sweep = 100
  const endAngle = plotRtl ? sweep : -sweep

  const ariaLabel = `Radial shape chart, ${title}, ${formatNumber(value, locale)} ${centerLabel}`

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
            innerRadius={65}
            outerRadius={95}
          >
            {/* Thin track: outer muted disc punched by inner background disc. */}
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              polarRadius={[86, 74]}
              className="[&_.recharts-polar-grid-concentric-circle:first-child]:fill-muted [&_.recharts-polar-grid-concentric-circle:last-child]:fill-background"
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
              /* Square ends — teaching contrast vs radial-text cornerRadius. */
              cornerRadius={0}
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
            <td>{value}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default function RadialShapeDemo(props: RadialShapeProps) {
  return <RadialShape {...props} />
}

export { RadialShape }
