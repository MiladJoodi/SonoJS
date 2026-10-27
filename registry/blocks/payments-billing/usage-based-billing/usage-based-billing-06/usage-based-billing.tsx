"use client"

import * as React from "react"

import { Card, CardContent } from "@sonojs/ui/components/card"
import { cn } from "@/lib/utils"

type Segment = {
  label: string
  value: number
  color: string
}

type UsageBasedBillingProps = React.ComponentProps<"section"> & {
  title?: string
  used?: number
  total?: number
  usedLabel?: string
  totalLabel?: string
  segments?: Segment[]
}

const DEFAULT_SEGMENTS: Segment[] = [
  { label: "Components", value: 2400, color: "bg-blue-500" },
  { label: "Assets", value: 1800, color: "bg-emerald-500" },
  { label: "Docs media", value: 3200, color: "bg-amber-500" },
  { label: "Themes", value: 900, color: "bg-violet-500" },
]

export default function UsageBasedBilling({
  title = "Using storage",
  used = 8300,
  total = 15,
  usedLabel = "MB",
  totalLabel = "GB",
  segments = DEFAULT_SEGMENTS,
  className,
  ...props
}: UsageBasedBillingProps) {
  const totalValue = total * 1000
  const freeValue = Math.max(0, totalValue - used)

  return (
    <section
      className={cn(
        "relative isolate flex w-full min-w-0 items-center justify-center overflow-hidden bg-white dark:bg-background px-4 py-10 text-foreground sm:px-6 sm:py-12",
        className
      )}
      aria-labelledby="usage-based-billing-06-heading"
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute start-1/2 top-[-18%] size-[22rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <Card className="w-full max-w-4xl border-border/70 shadow-soft">
        <CardContent className="py-6">
          <p
            id="usage-based-billing-06-heading"
            className="mb-4 text-pretty text-base text-muted-foreground"
          >
            {title}{" "}
            <span
              dir="ltr"
              className="font-semibold text-foreground tabular-nums"
            >
              {used.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}{" "}
              {usedLabel}
            </span>{" "}
            of {total} {totalLabel}
          </p>

          <div
            dir="ltr"
            className="mb-4 flex h-2.5 w-full overflow-hidden rounded-full bg-muted"
          >
            {segments.map((segment) => {
              const percentage = (segment.value / totalValue) * 100
              return (
                <div
                  key={segment.label}
                  role="progressbar"
                  aria-label={segment.label}
                  aria-valuemin={0}
                  aria-valuemax={totalValue}
                  aria-valuenow={segment.value}
                  className={cn("h-full", segment.color)}
                  style={{ width: `${percentage}%` }}
                />
              )
            })}
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            {segments.map((segment) => (
              <div
                key={segment.label}
                className="flex items-center gap-2"
              >
                <span
                  aria-hidden
                  className={cn("size-3 shrink-0 rounded", segment.color)}
                />
                <span className="text-sm text-muted-foreground">
                  {segment.label}
                </span>
                <span
                  dir="ltr"
                  className="text-sm text-muted-foreground tabular-nums"
                >
                  {Math.round(segment.value)}
                  {usedLabel}
                </span>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className="size-3 shrink-0 rounded-sm bg-muted"
              />
              <span className="text-sm text-muted-foreground">Free</span>
              <span
                dir="ltr"
                className="text-sm text-muted-foreground tabular-nums"
              >
                {Math.round(freeValue)}
                {usedLabel}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
