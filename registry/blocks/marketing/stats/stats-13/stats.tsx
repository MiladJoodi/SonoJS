"use client"

import type * as React from "react"
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const weekBars = [42, 55, 48, 62, 70, 66, 78] as const

const sideMetrics = [
  {
    label: "Total users",
    value: "10,492",
    trend: "12% from last month",
    up: true,
  },
  {
    label: "Active projects",
    value: "23",
    trend: "2 from last month",
    up: false,
  },
  {
    label: "Tasks completed",
    value: "1,342",
    trend: "18% from last month",
    up: true,
  },
] as const

export default function Stats({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const maxBar = Math.max(...weekBars)

  return (
    <section
      className={cn(
        "w-full bg-canvas px-4 py-12 text-foreground sm:px-6 md:px-8 md:py-16",
        className
      )}
      aria-labelledby="stats-13-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2
          id="stats-13-heading"
          className="mb-6 text-start text-2xl font-semibold tracking-tight md:text-3xl"
        >
          Dashboard overview
        </h2>

        <div className="grid gap-4 lg:grid-cols-12">
          <article className="rounded-[12px] bg-card p-6 shadow-soft sm:p-7 lg:col-span-7">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="text-start">
                <p className="text-sm font-medium text-muted-foreground">
                  Revenue
                </p>
                <p
                  className="mt-2 text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl"
                  dir="ltr"
                >
                  $84,320
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                <TrendingUpIcon className="size-3.5" aria-hidden />
                <span dir="ltr">+8% MoM</span>
              </span>
            </div>

            <div className="mt-8">
              <div className="mb-2 flex items-center justify-between gap-2 text-xs text-muted-foreground">
                <span>Last 7 days</span>
                <span dir="ltr">Peak Wed</span>
              </div>
              <div
                className="flex h-24 items-end gap-1.5"
                dir="ltr"
                role="img"
                aria-label="Revenue by day for the last seven days"
              >
                {weekBars.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-md bg-primary"
                    style={{
                      height: `${(h / maxBar) * 100}%`,
                      opacity: 0.35 + (h / maxBar) * 0.65,
                    }}
                  />
                ))}
              </div>
              <div
                className="mt-2 flex justify-between text-[10px] font-medium text-muted-foreground uppercase"
                dir="ltr"
              >
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                  <span key={`${d}-${i}`} className="flex-1 text-center">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </article>

          <ul className="flex flex-col gap-4 lg:col-span-5">
            {sideMetrics.map((item) => (
              <li
                key={item.label}
                className="flex overflow-hidden rounded-[12px] bg-card shadow-soft"
              >
                <span className="w-1 shrink-0 self-stretch bg-primary" aria-hidden />
                <div className="flex min-w-0 flex-1 items-start justify-between gap-3 px-5 py-4">
                  <div className="min-w-0 text-start">
                    <p className="text-sm font-medium text-muted-foreground">
                      {item.label}
                    </p>
                    <p
                      className="mt-1 text-2xl font-semibold tracking-tight tabular-nums"
                      dir="ltr"
                    >
                      {item.value}
                    </p>
                  </div>
                  <p
                    className={cn(
                      "inline-flex shrink-0 items-center gap-1 text-xs font-medium",
                      item.up ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {item.up ? (
                      <TrendingUpIcon className="size-3.5" aria-hidden />
                    ) : (
                      <TrendingDownIcon className="size-3.5" aria-hidden />
                    )}
                    <span dir="ltr">{item.trend}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
