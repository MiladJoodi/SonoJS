"use client"

import * as React from "react"

import { Badge } from "@sonojs/ui/components/badge"
import { Card, CardContent } from "@sonojs/ui/components/card"
import { cn } from "@/lib/utils"

type UsageItem = {
  label: string
  amount: number
  percentage: number
  color: "emerald" | "amber" | "rose"
}

const DATA: UsageItem[] = [
  { label: "Compute", amount: 450, percentage: 52.3, color: "emerald" },
  { label: "Storage", amount: 285, percentage: 33.1, color: "amber" },
  { label: "Bandwidth", amount: 125, percentage: 14.6, color: "rose" },
]

const COLOR_CLASSES = {
  emerald: "bg-emerald-500 dark:bg-emerald-400",
  amber: "bg-amber-500 dark:bg-amber-400",
  rose: "bg-rose-500 dark:bg-rose-400",
} as const

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
      aria-labelledby="usage-based-billing-07-heading"
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute start-1/2 top-[-18%] size-[22rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <Card className="w-full max-w-sm border-border/70 shadow-soft">
        <CardContent className="flex flex-col justify-between pt-0">
          <div className="text-start">
            <div className="flex items-center gap-2">
              <h2
                id="usage-based-billing-07-heading"
                className="text-balance text-sm font-bold text-foreground"
              >
                Usage
              </h2>
              <Badge
                variant="secondary"
                className="bg-amber-50 text-amber-700 ring-1 ring-amber-500/30 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/20"
              >
                +12.5%
              </Badge>
            </div>

            <p className="mt-2 flex items-baseline gap-2 text-pretty">
              <span dir="ltr" className="text-xl text-foreground tabular-nums">
                $860
              </span>
              <span className="text-sm text-muted-foreground">this month</span>
            </p>

            <div className="mt-4">
              <p className="text-pretty text-sm font-medium text-foreground">
                Resource breakdown
              </p>
              <div
                dir="ltr"
                className="mt-2 flex items-center gap-0.5"
              >
                {DATA.map((item) => (
                  <div
                    key={item.label}
                    className={cn(
                      "h-1.5 rounded-xs",
                      COLOR_CLASSES[item.color]
                    )}
                    style={{ width: `${item.percentage}%` }}
                  />
                ))}
              </div>
            </div>

            <ul className="mt-5 space-y-2" role="list">
              {DATA.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-2 text-xs"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "size-2.5 shrink-0 rounded-xs",
                      COLOR_CLASSES[item.color]
                    )}
                  />
                  <span className="text-foreground">{item.label}</span>
                  <span
                    dir="ltr"
                    className="text-muted-foreground tabular-nums"
                  >
                    (${item.amount} / {item.percentage}%)
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 text-pretty text-xs text-muted-foreground">
            Configure limits in{" "}
            <a
              href="#"
              className="text-emerald-700 hover:underline dark:text-emerald-400"
            >
              resource settings
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
