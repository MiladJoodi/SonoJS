"use client"

import * as React from "react"
import { Area, AreaChart as RechartsAreaChart } from "recharts"

import {
  DemoCard,
  ShowcaseMotionContext,
  Stagger,
} from "@/components/home/hero-showcase-chrome"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import {
  MARKET_UP,
  chartAreaGradientStops,
  chartNeonGlowProps,
  chartNeonOverflowClassName,
} from "@/registry/charts/_lib/chart-styles"
import { useMarketNeon } from "@/registry/charts/_lib/use-market-neon"
import { cn } from "@/lib/utils"

const CHART_DATA = [
  { month: "Oct", value: 1820 },
  { month: "Nov", value: 2140 },
  { month: "Dec", value: 1980 },
  { month: "Jan", value: 2460 },
  { month: "Feb", value: 2710 },
  { month: "Mar", value: 2590 },
  { month: "Apr", value: 3120 },
  { month: "May", value: 3480 },
]

/** Isolated so Recharts stays out of the default hero showcase chunk. */
export function ShowcaseChartPreview({
  show,
  className,
}: {
  show: boolean
  className?: string
}) {
  const animate = React.useContext(ShowcaseMotionContext)
  const neon = useMarketNeon()
  const color = neon ? MARKET_UP : "var(--chart-1)"
  const glow = neon ? chartNeonGlowProps(color) : null
  const gradId = React.useId().replace(/:/g, "")
  const last = CHART_DATA[CHART_DATA.length - 1]!
  const prev = CHART_DATA[CHART_DATA.length - 2]!
  const deltaPct = ((last.value - prev.value) / prev.value) * 100

  const chartConfig = {
    value: { label: "Users", color },
  } satisfies ChartConfig

  return (
    <DemoCard show={show} className={className}>
      <Stagger i={0} show={show}>
        <div className="mb-4 flex items-start justify-between gap-3 text-start">
          <div className="min-w-0 space-y-0.5">
            <p className="text-sm font-medium text-muted-foreground">
              Active users
            </p>
            <p
              dir="ltr"
              className="text-[1.75rem] font-semibold tracking-tight tabular-nums"
            >
              {last.value.toLocaleString("en-US")}
            </p>
          </div>
          <span
            dir="ltr"
            className="mt-0.5 inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium tabular-nums text-[var(--chart-up)]"
            style={{
              backgroundColor:
                "color-mix(in oklab, var(--chart-up) 12%, transparent)",
            }}
          >
            +{deltaPct.toFixed(1)}%
          </span>
        </div>
      </Stagger>
      <Stagger i={1} show={show}>
        <ChartContainer
          config={chartConfig}
          className={cn(
            "aspect-auto h-[140px] w-full font-sans sm:h-[160px]",
            neon && chartNeonOverflowClassName
          )}
        >
          <RechartsAreaChart
            accessibilityLayer
            data={CHART_DATA}
            margin={{ top: 8, right: 4, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                {chartAreaGradientStops(color, {
                  startOpacity: neon ? 0.32 : 0.4,
                  endOpacity: 0,
                }).map((s) => (
                  <stop
                    key={s.offset}
                    offset={s.offset}
                    stopColor={s.stopColor}
                    stopOpacity={s.stopOpacity}
                  />
                ))}
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              name="value"
              stroke={color}
              fill={`url(#${gradId})`}
              fillOpacity={1}
              isAnimationActive={show && animate}
              animationDuration={500}
              animationEasing="ease-out"
              {...(glow ?? {})}
              strokeWidth={neon ? 2.25 : 2}
            />
          </RechartsAreaChart>
        </ChartContainer>
      </Stagger>
    </DemoCard>
  )
}
