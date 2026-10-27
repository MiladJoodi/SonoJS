"use client"

import type * as React from "react"
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  BriefcaseIcon,
  FileTextIcon,
  MessageSquareIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

type MetricTrend = {
  direction: "up" | "down"
  label: string
}

type Metric = {
  label: string
  value: string
  period: string
  icon: LucideIcon
  trend: MetricTrend
}

const metrics: Metric[] = [
  {
    label: "Responses",
    value: "1 450",
    period: "30 Days",
    icon: MessageSquareIcon,
    trend: { direction: "down", label: "25% less" },
  },
  {
    label: "Projects",
    value: "54",
    period: "30 Days",
    icon: BriefcaseIcon,
    trend: { direction: "up", label: "25% more" },
  },
  {
    label: "Reports",
    value: "492",
    period: "30 Days",
    icon: FileTextIcon,
    trend: { direction: "up", label: "12.5% more" },
  },
  {
    label: "Users",
    value: "235",
    period: "30 Days",
    icon: UsersIcon,
    trend: { direction: "down", label: "25% less" },
  },
]

export default function Stats({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("w-full px-4 md:px-8", className)}
      aria-label="Key metrics"
      {...props}
    >
      <style>{`
        .stats-04-trend-up {
          color: #16a34a;
        }
        .stats-04-trend-down {
          color: #dc2626;
        }
      `}</style>

      <ul className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((item) => {
          const Icon = item.icon
          const TrendIcon =
            item.trend.direction === "up" ? ArrowUpRightIcon : ArrowDownRightIcon
          const trendClass =
            item.trend.direction === "up"
              ? "stats-04-trend-up"
              : "stats-04-trend-down"

          return (
            <li
              key={item.label}
              className="rounded-[12px] border border-border/70 bg-card p-5 shadow-soft"
            >
              <div className="mb-4 flex min-w-0 flex-wrap items-center gap-2.5">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="size-5 text-primary" aria-hidden />
                </span>
                <h3 className="min-w-0 text-sm font-medium text-muted-foreground">
                  {item.label}
                </h3>
                <span className="ms-auto inline-block shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {item.period}
                </span>
              </div>
              <p
                className="mb-2 text-3xl font-semibold tracking-tight text-foreground tabular-nums"
                dir="ltr"
              >
                {item.value}
              </p>
              <p
                className={cn(
                  "inline-flex items-center gap-1.5 text-xs font-medium",
                  trendClass
                )}
              >
                <TrendIcon className="size-4 shrink-0" aria-hidden />
                <span>{item.trend.label}</span>
              </p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
