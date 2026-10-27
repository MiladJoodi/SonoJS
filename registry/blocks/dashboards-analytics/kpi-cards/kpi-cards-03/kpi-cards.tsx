"use client"

import * as React from "react"
import { ArrowRightIcon } from "lucide-react"
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
} from "@sonojs/ui/components/card"
import {
  type ChartConfig,
  ChartContainer,
} from "@sonojs/ui/components/chart"
import { cn } from "@/lib/utils"

const DATA = [
  {
    name: "Design",
    progress: 25,
    budget: "$1,000",
    current: "$250",
    href: "#",
    fill: "var(--chart-1)",
  },
  {
    name: "Marketing",
    progress: 55,
    budget: "$1,000",
    current: "$550",
    href: "#",
    fill: "var(--chart-2)",
  },
  {
    name: "Docs",
    progress: 85,
    budget: "$1,000",
    current: "$850",
    href: "#",
    fill: "var(--chart-3)",
  },
  {
    name: "Engineering",
    progress: 70,
    budget: "$2,000",
    current: "$1,400",
    href: "#",
    fill: "var(--chart-4)",
  },
] as const

const chartConfig = {
  progress: {
    label: "Progress",
    color: "var(--primary)",
  },
} satisfies ChartConfig

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
      aria-labelledby="kpi-cards-03-heading"
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
            id="kpi-cards-03-heading"
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            Department budgets
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Spend vs plan this quarter across SonoJS teams.
          </p>
        </header>

        <dl className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DATA.map((item) => (
            <Card
              key={item.name}
              className="gap-0 border-border/70 p-0 shadow-soft"
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
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
                          dataKey="progress"
                          fill={item.fill}
                        />
                      </RadialBarChart>
                    </ChartContainer>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        dir="ltr"
                        className="text-base font-medium text-foreground tabular-nums"
                      >
                        {item.progress}%
                      </span>
                    </div>
                  </div>
                  <div className="min-w-0 text-start">
                    <dd
                      dir="ltr"
                      className="text-base font-medium text-foreground tabular-nums"
                    >
                      {item.current} / {item.budget}
                    </dd>
                    <dt className="text-sm text-muted-foreground">
                      Budget {item.name}
                    </dt>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-end border-t border-border/70 p-0">
                <a
                  href={item.href}
                  className="inline-flex items-center gap-1 px-6 py-3 text-sm font-medium text-primary hover:text-primary/90"
                >
                  View more
                  <ArrowRightIcon
                    className="icon-dir size-4"
                    aria-hidden
                  />
                </a>
              </CardFooter>
            </Card>
          ))}
        </dl>
      </div>
    </section>
  )
}
