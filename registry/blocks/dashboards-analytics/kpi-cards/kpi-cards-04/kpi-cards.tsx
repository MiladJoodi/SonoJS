"use client"

import * as React from "react"
import { Area, AreaChart, XAxis } from "recharts"

import { Card, CardContent } from "@sonojs/ui/components/card"
import { ChartContainer } from "@sonojs/ui/components/chart"
import { cn } from "@/lib/utils"

const SERIES = {
  registry: "Registry installs",
  docs: "Docs traffic",
  cli: "CLI downloads",
} as const

type SeriesKey = keyof typeof SERIES

const DATA: Array<Record<"date", string> & Record<SeriesKey, number>> = [
  { date: "Nov 24, 2025", registry: 142.87, docs: 65.32, cli: 83.25 },
  { date: "Nov 25, 2025", registry: 151.43, docs: 59.78, cli: 79.64 },
  { date: "Nov 26, 2025", registry: 157.28, docs: 64.21, cli: 76.19 },
  { date: "Nov 27, 2025", registry: 162.94, docs: 57.46, cli: 72.84 },
  { date: "Nov 28, 2025", registry: 148.37, docs: 49.82, cli: 81.56 },
  { date: "Nov 29, 2025", registry: 139.56, docs: 55.63, cli: 92.38 },
  { date: "Nov 30, 2025", registry: 145.83, docs: 61.27, cli: 88.75 },
  { date: "Dec 01, 2025", registry: 138.29, docs: 68.94, cli: 93.42 },
  { date: "Dec 02, 2025", registry: 129.64, docs: 74.56, cli: 97.18 },
  { date: "Dec 03, 2025", registry: 119.82, docs: 71.38, cli: 89.43 },
  { date: "Dec 04, 2025", registry: 128.54, docs: 63.95, cli: 92.76 },
  { date: "Dec 05, 2025", registry: 137.21, docs: 58.47, cli: 84.29 },
  { date: "Dec 06, 2025", registry: 134.68, docs: 69.12, cli: 79.38 },
  { date: "Dec 07, 2025", registry: 152.73, docs: 73.89, cli: 81.42 },
  { date: "Dec 08, 2025", registry: 168.59, docs: 78.54, cli: 75.68 },
]

const SUMMARY: Array<{
  key: SeriesKey
  ticker: string
  value: string
  change: string
  percentageChange: string
  changeType: "positive" | "negative"
}> = [
  {
    key: "registry",
    ticker: "REG",
    value: "168.6k",
    change: "+15.9k",
    percentageChange: "+10.4%",
    changeType: "positive",
  },
  {
    key: "docs",
    ticker: "DOCS",
    value: "78.5k",
    change: "+4.7k",
    percentageChange: "+6.3%",
    changeType: "positive",
  },
  {
    key: "cli",
    ticker: "CLI",
    value: "75.7k",
    change: "-5.7k",
    percentageChange: "-7.1%",
    changeType: "negative",
  },
]

export default function KpiCards({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "relative isolate w-full min-w-0 bg-canvas px-4 pt-10 pb-14 text-foreground sm:px-6 sm:pt-12 sm:pb-16",
        className
      )}
      aria-labelledby="kpi-cards-04-heading"
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute start-1/2 top-[-18%] size-[22rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-6 text-start">
          <h2
            id="kpi-cards-04-heading"
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            Product trends
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Registry installs, docs traffic, and CLI downloads over the last
            two weeks.
          </p>
        </header>

        <dl className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SUMMARY.map((item) => {
            const label = SERIES[item.key]
            const gradientId = `kpi-cards-04-${item.key}`
            const color =
              item.changeType === "positive"
                ? "hsl(142.1 76.2% 36.3%)"
                : "hsl(0 72.2% 50.6%)"

            return (
              <Card
                key={item.key}
                className="border-border/70 p-0 shadow-soft"
              >
                <CardContent className="p-0">
                  <div className="p-4 pb-0 text-start">
                    <dt className="text-sm font-medium text-foreground">
                      {label}{" "}
                      <span className="font-normal text-muted-foreground">
                        ({item.ticker})
                      </span>
                    </dt>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
                      <dd
                        dir="ltr"
                        className={cn(
                          "text-lg font-semibold tabular-nums",
                          item.changeType === "positive"
                            ? "text-emerald-700 dark:text-emerald-400"
                            : "text-rose-600 dark:text-rose-400"
                        )}
                      >
                        {item.value}
                      </dd>
                      <dd
                        dir="ltr"
                        className="flex flex-wrap items-center gap-1 text-sm"
                      >
                        <span className="font-medium text-foreground tabular-nums">
                          {item.change}
                        </span>
                        <span
                          className={cn(
                            "tabular-nums",
                            item.changeType === "positive"
                              ? "text-emerald-700 dark:text-emerald-400"
                              : "text-rose-600 dark:text-rose-400"
                          )}
                        >
                          ({item.percentageChange})
                        </span>
                      </dd>
                    </div>
                  </div>

                  <div className="mt-2 h-16 overflow-hidden">
                    <ChartContainer
                      className="h-full w-full"
                      config={{
                        [item.key]: {
                          label,
                          color,
                        },
                      }}
                    >
                      <AreaChart
                        data={DATA}
                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id={gradientId}
                            x1="0"
                            x2="0"
                            y1="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor={color}
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="95%"
                              stopColor={color}
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" hide />
                        <Area
                          type="monotone"
                          dataKey={item.key}
                          stroke={color}
                          strokeWidth={1.5}
                          fill={`url(#${gradientId})`}
                          fillOpacity={0.4}
                        />
                      </AreaChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </dl>
      </div>
    </section>
  )
}
