"use client"

import * as React from "react"
import {
  Label,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
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
 * Chart Radial Stacked (classic) — semicircle stacked Store×Online ring.
 * Locked navy×orange dual series; centered total Label; no Card shell.
 * Spec: `registry/charts/PORT.md`
 * Installs to: components/charts/chart-radial-stacked.tsx
 */

export type ChartRadialStackedPoint = {
  month: string
  store: number
  online: number
}

export type ChartRadialStackedProps = {
  title?: string
  subtitle?: string
  data?: ChartRadialStackedPoint[]
  className?: string
  /** Arc direction. Omit to follow page `dir`. */
  plotDir?: "ltr" | "rtl"
}

const RADIAL_MS = 200

/** Classic January sample — Store×Online. */
const DEMO_DATA: ChartRadialStackedPoint[] = [
  { month: "january", store: 1260, online: 570 },
]

const chartConfig = {
  store: {
    label: "Store",
    color: "var(--chart-1)",
  },
  online: {
    label: "Online",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

function formatNumber(value: number, locale: string) {
  return new Intl.NumberFormat(locale).format(Math.round(value))
}

const chartRadialContainerClassName =
  "mx-auto aspect-square h-[250px] w-[250px] max-w-full overflow-visible font-sans text-xs tabular-nums [&_.recharts-surface]:overflow-visible"

function ChartRadialStacked({
  title = "Sales by channel",
  subtitle = "Stacked Store × Online — January.",
  data = DEMO_DATA,
  className,
  plotDir,
}: ChartRadialStackedProps) {
  const { dir, ref } = useChartDir()
  const plotRtl = (plotDir ?? dir) === "rtl"
  const reducedMotion = usePrefersReducedMotion()
  const locale = "en"

  const point = data[0] ?? DEMO_DATA[0]!
  const total = point.store + point.online
  const plotData = React.useMemo(() => [point], [point])

  // Semicircle; RTL mirrors the sweep.
  const endAngle = plotRtl ? -180 : 180

  const ariaLabel = `Radial stacked chart, ${title}, total ${formatNumber(total, locale)}, Store ${formatNumber(point.store, locale)}, Online ${formatNumber(point.online, locale)}`

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
            <span className="text-xs text-muted-foreground">total</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Store {formatNumber(point.store, locale)} · Online{" "}
            {formatNumber(point.online, locale)}
          </p>
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
            innerRadius={80}
            outerRadius={110}
          >
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  dir={dir}
                  hideLabel
                  indicator="dot"
                />
              }
            />
            <RadialBar
              dataKey="online"
              fill="var(--color-online)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
              isAnimationActive={!reducedMotion}
              animationDuration={RADIAL_MS}
              animationEasing="ease-out"
            />
            <RadialBar
              dataKey="store"
              fill="var(--color-store)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
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
                    <text x={cx} y={cy} textAnchor="middle">
                      <tspan
                        x={cx}
                        y={cy - 16}
                        className="fill-foreground text-2xl font-bold"
                      >
                        {formatNumber(total, locale)}
                      </tspan>
                      <tspan
                        x={cx}
                        y={cy + 4}
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
        <li className="inline-flex items-center gap-1.5">
          <span
            className="size-2 shrink-0 rounded-full"
            style={{ backgroundColor: "var(--chart-1)" }}
            aria-hidden
          />
          <span>Store</span>
        </li>
        <li className="inline-flex items-center gap-1.5">
          <span
            className="size-2 shrink-0 rounded-full"
            style={{ backgroundColor: "var(--chart-2)" }}
            aria-hidden
          />
          <span>Online</span>
        </li>
      </ul>

      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">Month</th>
            <th scope="col">Store</th>
            <th scope="col">Online</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={`a11y-${row.month}`}>
              <td>{row.month}</td>
              <td>{row.store}</td>
              <td>{row.online}</td>
              <td>{row.store + row.online}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function ChartRadialStackedDemo(
  props: ChartRadialStackedProps
) {
  return <ChartRadialStacked {...props} />
}

export { ChartRadialStacked }
