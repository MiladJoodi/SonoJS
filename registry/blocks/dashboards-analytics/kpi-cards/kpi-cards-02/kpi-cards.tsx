"use client"

import * as React from "react"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const STATUSES = {
  within: { label: "On track", color: "bg-emerald-500" },
  observe: { label: "Needs attention", color: "bg-amber-500" },
  critical: { label: "At risk", color: "bg-rose-500" },
} as const

type StatusKey = keyof typeof STATUSES

type RegionStat = {
  name: string
  stat: string
  goalsAchieved: number
  status: StatusKey
  href: string
}

const DATA: RegionStat[] = [
  {
    name: "Europe",
    stat: "$10,023",
    goalsAchieved: 3,
    status: "observe",
    href: "#",
  },
  {
    name: "North America",
    stat: "$14,092",
    goalsAchieved: 5,
    status: "within",
    href: "#",
  },
  {
    name: "Asia Pacific",
    stat: "$113,232",
    goalsAchieved: 1,
    status: "critical",
    href: "#",
  },
]

const GOALS = [1, 2, 3, 4, 5] as const

export default function KpiCards({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "relative isolate flex w-full min-w-0 items-center justify-center bg-canvas px-4 pt-10 pb-14 text-foreground sm:px-6 sm:pt-12 sm:pb-16",
        className
      )}
      aria-labelledby="kpi-cards-02-heading"
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute start-1/2 top-[-18%] size-[22rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="@container w-full max-w-5xl">
        <header className="mb-6 text-start">
          <h2
            id="kpi-cards-02-heading"
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            Regional performance
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Revenue and quarterly goals across your SonoJS markets.
          </p>
        </header>

        {/* Outer keeps shadow-soft; inner overflow clips divide/hover to radius. */}
        <div className="rounded-[12px] border border-border/70 bg-card shadow-soft">
          <dl className="grid w-full grid-cols-1 divide-y divide-border/70 overflow-hidden rounded-[12px] @2xl:grid-cols-3 @2xl:divide-x @2xl:divide-y-0">
          {DATA.map((item) => {
            const status = STATUSES[item.status]
            return (
              <div
                key={item.name}
                className="group relative flex flex-col gap-6 p-6 transition-colors hover:bg-muted/40"
              >
                <div className="flex items-center justify-between gap-3">
                  <dt className="truncate text-sm font-medium text-foreground">
                    {item.name}
                  </dt>
                  <dd className="flex shrink-0 items-center gap-2 text-sm text-muted-foreground">
                    <span
                      aria-hidden
                      className={cn("size-1.5 rounded-full", status.color)}
                    />
                    {status.label}
                  </dd>
                </div>
                <dd
                  dir="ltr"
                  className="text-3xl font-semibold tracking-tight text-foreground tabular-nums"
                >
                  {item.stat}
                </dd>
                <dd className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Goals achieved</span>
                    <span
                      dir="ltr"
                      className="font-medium text-foreground tabular-nums"
                    >
                      {item.goalsAchieved}/{GOALS.length}
                    </span>
                  </div>
                  <div aria-hidden className="flex gap-1">
                    {GOALS.map((goal) => (
                      <span
                        key={goal}
                        className={cn(
                          "h-1.5 flex-1 rounded-full",
                          goal <= item.goalsAchieved
                            ? status.color
                            : "bg-foreground/10"
                        )}
                      />
                    ))}
                  </div>
                </dd>
                <dd className="text-sm">
                  <a
                    href={item.href}
                    className="inline-flex items-center gap-1 font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span aria-hidden className="absolute inset-0" />
                    View region
                    <ArrowRightIcon
                      aria-hidden
                      className="icon-dir size-4 shrink-0 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                    />
                  </a>
                </dd>
              </div>
            )
          })}
          </dl>
        </div>
      </div>
    </section>
  )
}
