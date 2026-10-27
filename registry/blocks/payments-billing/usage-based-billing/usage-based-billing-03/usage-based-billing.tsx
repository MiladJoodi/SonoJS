"use client"

import * as React from "react"

import { Card, CardContent } from "@sonojs/ui/components/card"
import { Progress } from "@sonojs/ui/components/progress"
import { cn } from "@/lib/utils"

const DATA = [
  {
    name: "CLI installs",
    stat: "996",
    limit: "10,000",
    percentage: 9.96,
  },
  {
    name: "Credits",
    stat: "$672",
    limit: "$1,000",
    percentage: 67.2,
  },
  {
    name: "Storage",
    stat: "1.85",
    limit: "10GB",
    percentage: 18.5,
  },
  {
    name: "API calls",
    stat: "4,328",
    limit: "5,000",
    percentage: 86.56,
  },
] as const

function formatPct(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/\.?0+$/, "")
}

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
      aria-labelledby="usage-based-billing-03-heading"
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
            id="usage-based-billing-03-heading"
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            Usage this period
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Quotas for your SonoJS workspace — installs, credits, storage, and API.
          </p>
        </header>

        <dl className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DATA.map((item) => (
            <Card
              key={item.name}
              className="border-border/70 py-4 shadow-soft"
            >
              <CardContent>
                <dt className="text-sm text-muted-foreground">{item.name}</dt>
                <dd
                  dir="ltr"
                  className="text-2xl font-semibold text-foreground tabular-nums"
                >
                  {item.stat}
                </dd>
                <Progress className="mt-6 h-2" value={item.percentage} />
                <dd className="mt-2 flex items-center justify-between gap-2 text-sm">
                  <span dir="ltr" className="text-primary tabular-nums">
                    {formatPct(item.percentage)}%
                  </span>
                  <span
                    dir="ltr"
                    className="text-muted-foreground tabular-nums"
                  >
                    {item.stat} of {item.limit}
                  </span>
                </dd>
              </CardContent>
            </Card>
          ))}
        </dl>
      </div>
    </section>
  )
}
