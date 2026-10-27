"use client"

import * as React from "react"
import { Cell, Pie, PieChart } from "recharts"

import { Button } from "@sonojs/ui/components/button"
import { Card, CardContent, CardHeader } from "@sonojs/ui/components/card"
import {
  type ChartConfig,
  ChartContainer,
} from "@sonojs/ui/components/chart"
import { cn } from "@/lib/utils"

type UsageItem = {
  name: string
  current: string
  limit: string
  percentage: number
}

const USAGE_DATA: UsageItem[] = [
  { name: "Registry installs", current: "358K", limit: "1M", percentage: 35.8 },
  { name: "Docs pageviews", current: "317K", limit: "1M", percentage: 31.7 },
  {
    name: "CDN transfer",
    current: "3.07 GB",
    limit: "10 GB",
    percentage: 30.7,
  },
  {
    name: "Preview builds",
    current: "791",
    limit: "10K",
    percentage: 7.9,
  },
  {
    name: "Asset bandwidth",
    current: "4.98 GB",
    limit: "100 GB",
    percentage: 5.0,
  },
  {
    name: "Build minutes",
    current: "3.1 GB-Hrs",
    limit: "100 GB-Hrs",
    percentage: 3.1,
  },
  {
    name: "Analytics events",
    current: "1.3K",
    limit: "50K",
    percentage: 2.6,
  },
  { name: "Registry publishes", current: "4.8K", limit: "200K", percentage: 2.4 },
  {
    name: "API invocations",
    current: "19K",
    limit: "1M",
    percentage: 1.9,
  },
  {
    name: "Image cache reads",
    current: "4.3K",
    limit: "300K",
    percentage: 1.4,
  },
]

const chartConfig = {
  used: {
    label: "Used",
    color: "var(--primary)",
  },
  remaining: {
    label: "Remaining",
    color: "var(--muted)",
  },
} satisfies ChartConfig

function DonutChart({ percentage }: { percentage: number }) {
  const clamped = Math.max(0, Math.min(100, Number(percentage)))
  const backgroundData = [
    { name: "background", value: 100, fill: "var(--border)" },
  ]
  const foregroundData = [
    {
      name: "used",
      value: clamped,
      fill: "var(--primary)",
    },
    {
      name: "empty",
      value: 100 - clamped,
      fill: "transparent",
    },
  ]

  return (
    <ChartContainer
      className="aspect-square size-6 shrink-0"
      config={chartConfig}
    >
      <PieChart>
        <Pie
          cx="50%"
          cy="50%"
          data={backgroundData}
          dataKey="value"
          innerRadius={6}
          isAnimationActive={false}
          nameKey="name"
          outerRadius={10}
        >
          {backgroundData.map((entry) => (
            <Cell fill={entry.fill} key={`bg-${entry.name}`} />
          ))}
        </Pie>
        <Pie
          cx="50%"
          cy="50%"
          data={foregroundData}
          dataKey="value"
          endAngle={-270}
          innerRadius={6}
          nameKey="name"
          outerRadius={10}
          startAngle={90}
        >
          {foregroundData.map((entry) => (
            <Cell fill={entry.fill} key={`fg-${entry.name}`} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}

export default function UsageBasedBilling({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "relative isolate flex w-full min-w-0 items-center justify-center overflow-hidden bg-white dark:bg-background px-4 py-10 text-foreground sm:px-6 sm:py-12",
        className
      )}
      aria-labelledby="usage-based-billing-05-heading"
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute start-1/2 top-[-18%] size-[22rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <Card className="w-full max-w-md gap-3 border-border/70 py-5 shadow-soft">
        <CardHeader className="px-5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1 text-start">
              <h2
                id="usage-based-billing-05-heading"
                className="text-balance text-sm font-medium"
              >
                Last 30 days
              </h2>
              <p className="text-pretty text-xs font-medium text-muted-foreground">
                Updated just now
              </p>
            </div>
            <Button
              type="button"
              size="sm"
              className="h-8 shrink-0 text-xs font-medium"
            >
              Upgrade
            </Button>
          </div>
        </CardHeader>

        <CardContent className="px-3 pt-0">
          <ul className="space-y-0">
            {USAGE_DATA.map((item, index) => (
              <li
                key={item.name}
                className={cn(
                  "flex items-center gap-3 rounded-sm p-2 transition-colors hover:bg-muted/50",
                  index % 2 === 1 && "bg-muted/20"
                )}
              >
                <DonutChart percentage={item.percentage} />
                <span className="flex-1 truncate text-sm leading-4 text-foreground">
                  {item.name}
                </span>
                <span
                  dir="ltr"
                  className="text-xs font-medium tracking-tighter text-muted-foreground tabular-nums"
                >
                  {item.current} /{" "}
                  <span className="text-foreground">{item.limit}</span>
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  )
}
