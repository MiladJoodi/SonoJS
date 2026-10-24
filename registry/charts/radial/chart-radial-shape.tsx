"use client"

import * as React from "react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import { cn } from "@/lib/utils"
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart"

import { RadialProvinceTooltipContent } from "../_lib/pie-tooltip"
import { useChartDir } from "../_lib/use-chart-dir"
import { usePrefersReducedMotion } from "../_lib/use-prefers-reduced-motion"

/**
 * Chart Radial Shape (classic) — short arc ring with PolarGrid “shape” + center Label.
 * No Card shell. Tokens: `--chart-2`. Spec: `registry/charts/PORT.md`
 * Installs to: components/charts/chart-radial-shape.tsx
 */

export type ChartRadialShapePoint = {
  province: string
  sales: number
}

export type ChartRadialShapeProps = {
  title?: string
  subtitle?: string
  data?: ChartRadialShapePoint[]
  className?: string
  /** Arc direction. Omit to follow page `dir`. */
  plotDir?: "ltr" | "rtl"
}

const RADIAL_MS = 200

/** Single-region classic sample (matches FarsiUI sales=1260 / chart-2). */
const DEMO_DATA: ChartRadialShapePoint[] = [
  { province: "midwest", sales: 1260 },
]

const SLICE_LABELS: Record<string, string> = {
  midwest: "Midwest",
}

function buildConfig(data: ChartRadialShapePoint[]): ChartConfig {
  const config: ChartConfig = {
    sales: { label: "Sales" },
  }
  data.forEach((point) => {
    config[point.province] = {
      label: SLICE_LABELS[point.province] ?? point.province,
      color: "var(--chart-2)",
    }
  })
  return config
}

function withFills(points: ChartRadialShapePoint[]) {
  return points.map((point) => ({
    ...point,
    fill: `var(--color-${point.province})`,
  }))
}

function formatNumber(value: number, locale: string) {
  return new Intl.NumberFormat(locale).format(Math.round(value))
}

const chartRadialContainerClassName =
  "mx-auto aspect-square h-[250px] w-[250px] max-w-full overflow-visible font-sans text-xs tabular-nums [&_.recharts-surface]:overflow-visible"

function ChartRadialShape({
  title = "Sales by region",
  subtitle = "Short radial arc with PolarGrid shape and centered value.",
  data = DEMO_DATA,
  className,
  plotDir,
}: ChartRadialShapeProps) {
  const { dir, ref } = useChartDir()
  const plotRtl = (plotDir ?? dir) === "rtl"
  const reducedMotion = usePrefersReducedMotion()
  const locale = "en"

  const chartConfig = React.useMemo(() => buildConfig(data), [data])
  const plotData = React.useMemo(() => withFills(data), [data])
  const point = data[0]
  const value = point?.sales ?? 0
  const caption = point
    ? (SLICE_LABELS[point.province] ?? point.province)
    : "—"

  // Classic short sweep →100°; RTL mirrors.
  const endAngle = plotRtl ? -100 : 100

  const ariaLabel = `Radial chart, ${title}, ${caption} ${formatNumber(value, locale)}`

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
            <span className="text-xs text-muted-foreground">sales</span>
          </div>
          <p className="text-xs text-muted-foreground">{caption}</p>
        </div>
      </header>

      <div
        dir="ltr"
        role="img"
        aria-label={ariaLabel}
        className="mx-auto touch-pan-y rounded-lg outline-none"
      >
        <ChartContainer
          config={chartConfig}
          className={cn(chartRadialContainerClassName, "max-w-none")}
        >
          <RadialBarChart
            accessibilityLayer
            data={plotData}
            endAngle={endAngle}
            innerRadius={65}
            outerRadius={95}
          >
            <ChartTooltip
              cursor={false}
              content={
                <RadialProvinceTooltipContent
                  dir={dir}
                  locale={locale}
                  config={chartConfig}
                />
              }
            />
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar
              dataKey="sales"
              background={{ fill: "var(--muted)" }}
              isAnimationActive={!reducedMotion}
              animationDuration={RADIAL_MS}
              animationEasing="ease-out"
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox)) {
                    return null
                  }
                  const cx = viewBox.cx
                  const cy = viewBox.cy
                  if (typeof cx !== "number" || typeof cy !== "number") {
                    return null
                  }
                  return (
                    <text
                      x={cx}
                      y={cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={cx}
                        y={cy}
                        className="fill-foreground text-4xl font-bold"
                      >
                        {formatNumber(value, locale)}
                      </tspan>
                      <tspan
                        x={cx}
                        y={cy + 24}
                        className="fill-muted-foreground"
                      >
                        Sales
                      </tspan>
                    </text>
                  )
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </div>

      <ul className="mx-auto flex max-w-[250px] flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        {data.map((item) => (
          <li key={item.province} className="inline-flex items-center gap-1.5">
            <span
              className="size-2 shrink-0 rounded-full"
              style={{ backgroundColor: "var(--chart-2)" }}
              aria-hidden
            />
            <span>{SLICE_LABELS[item.province] ?? item.province}</span>
          </li>
        ))}
      </ul>

      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">Province</th>
            <th scope="col">Sales</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={`a11y-${item.province}`}>
              <td>{SLICE_LABELS[item.province] ?? item.province}</td>
              <td>{item.sales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function ChartRadialShapeDemo(props: ChartRadialShapeProps) {
  return <ChartRadialShape {...props} />
}

export { ChartRadialShape }
