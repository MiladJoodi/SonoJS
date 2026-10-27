"use client"

import * as React from "react"
import { ExternalLinkIcon } from "lucide-react"
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts"

import { Card, CardContent } from "@sonojs/ui/components/card"
import {
  type ChartConfig,
  ChartContainer,
} from "@sonojs/ui/components/chart"
import { cn } from "@/lib/utils"

const DATA = [
  {
    name: "Workspaces",
    capacity: 20,
    current: 1,
    allowed: 5,
  },
  {
    name: "Blocks installed",
    capacity: 40,
    current: 8,
    allowed: 20,
  },
  {
    name: "Registry items",
    capacity: 30,
    current: 15,
    allowed: 50,
  },
  {
    name: "Storage",
    capacity: 50,
    current: 25,
    allowed: 100,
  },
] as const

const chartConfig = {
  capacity: {
    label: "Capacity",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export default function UsageBasedBilling({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "relative isolate w-full min-w-0 overflow-hidden bg-white dark:bg-background px-4 py-10 text-foreground sm:px-6 sm:py-12",
        className
      )}
      aria-labelledby="usage-based-billing-02-heading"
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute start-1/2 top-[-18%] size-[22rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-5xl">
        <header className="text-start">
          <h2
            id="usage-based-billing-02-heading"
            className="text-balance text-xl font-medium text-foreground"
          >
            Plan overview
          </h2>
          <p className="mt-1 text-pretty text-sm leading-6 text-muted-foreground">
            You are currently on the{" "}
            <span className="font-medium text-foreground">Starter plan</span>.{" "}
            <a
              href="#"
              className="inline-flex items-center gap-1 text-primary hover:underline hover:underline-offset-4"
            >
              View other plans
              <ExternalLinkIcon className="size-4" aria-hidden />
            </a>
          </p>
        </header>

        <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DATA.map((item) => (
            <Card
              key={item.name}
              className="border-border/70 p-4 shadow-soft"
            >
              <CardContent className="flex items-center gap-4 p-0">
                <div className="relative flex items-center justify-center">
                  <ChartContainer
                    className="h-20 w-20"
                    config={chartConfig}
                  >
                    <RadialBarChart
                      data={[item]}
                      barSize={6}
                      endAngle={-270}
                      innerRadius={30}
                      outerRadius={40}
                      startAngle={90}
                    >
                      <PolarAngleAxis
                        angleAxisId={0}
                        axisLine={false}
                        domain={[0, 100]}
                        tick={false}
                        type="number"
                      />
                      <RadialBar
                        angleAxisId={0}
                        background
                        cornerRadius={10}
                        dataKey="capacity"
                        fill="var(--primary)"
                      />
                    </RadialBarChart>
                  </ChartContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      dir="ltr"
                      className="text-base font-medium text-foreground tabular-nums"
                    >
                      {item.capacity}%
                    </span>
                  </div>
                </div>
                <div className="min-w-0 text-start">
                  <dt className="text-sm font-medium text-foreground">
                    {item.name}
                  </dt>
                  <dd
                    dir="ltr"
                    className="text-sm text-muted-foreground"
                  >
                    {item.current} of {item.allowed} used
                  </dd>
                </div>
              </CardContent>
            </Card>
          ))}
        </dl>
      </div>
    </section>
  )
}
