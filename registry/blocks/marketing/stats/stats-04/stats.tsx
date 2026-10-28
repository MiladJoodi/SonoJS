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

function MiniArea({
  values,
  up,
  id,
}: {
  values: number[]
  up: boolean
  id: string
}) {
  const w = 120
  const h = 40
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = Math.max(max - min, max * 0.004, 0.0001)
  const stroke = up ? "var(--primary)" : "var(--muted-foreground)"
  const coords = values.map((v, i) => {
    const x = (i / Math.max(values.length - 1, 1)) * w
    const y = h - ((v - min) / span) * (h - 6) - 3
    return [x, y] as const
  })
  const line = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ")
  const area = `${line} L${w},${h} L0,${h} Z`

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className="block overflow-visible"
      aria-hidden
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity={0.3} />
          <stop offset="100%" stopColor={stroke} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path
        d={line}
        fill="none"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type Metric = {
  label: string
  value: string
  period: string
  icon: LucideIcon
  up: boolean
  trend: string
  spark: number[]
  featured?: boolean
}

const metrics: Metric[] = [
  {
    label: "Responses",
    value: "1,450",
    period: "30 days",
    icon: MessageSquareIcon,
    up: false,
    trend: "25% less",
    spark: [92, 88, 90, 84, 79, 76, 74, 71, 68, 65],
    featured: true,
  },
  {
    label: "Projects",
    value: "54",
    period: "30 days",
    icon: BriefcaseIcon,
    up: true,
    trend: "25% more",
    spark: [28, 30, 29, 33, 36, 38, 41, 44, 48, 54],
  },
  {
    label: "Reports",
    value: "492",
    period: "30 days",
    icon: FileTextIcon,
    up: true,
    trend: "12.5% more",
    spark: [310, 320, 335, 350, 360, 390, 410, 440, 470, 492],
  },
  {
    label: "Users",
    value: "235",
    period: "30 days",
    icon: UsersIcon,
    up: false,
    trend: "25% less",
    spark: [280, 270, 265, 260, 255, 250, 245, 242, 238, 235],
  },
]

export default function Stats({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const featured = metrics.find((m) => m.featured)!
  const peers = metrics.filter((m) => !m.featured)

  return (
    <section
      className={cn(
        "w-full bg-canvas px-4 py-12 text-foreground sm:px-6 md:px-8 md:py-16",
        className
      )}
      aria-label="Key metrics"
      {...props}
    >
      <div className="mx-auto grid w-full max-w-6xl gap-4 lg:grid-cols-12">
        <article className="flex flex-col justify-between rounded-[12px] bg-card p-6 shadow-soft sm:p-7 lg:col-span-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <featured.icon className="size-5 text-primary" aria-hidden />
              </span>
              <div className="min-w-0 text-start">
                <h3 className="text-sm font-medium text-muted-foreground">
                  {featured.label}
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  Featured · live desk
                </p>
              </div>
            </div>
            <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
              {featured.period}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
            <div className="text-start">
              <p
                className="text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl"
                dir="ltr"
              >
                {featured.value}
              </p>
              <p
                className={cn(
                  "mt-2 inline-flex items-center gap-1 text-sm font-medium",
                  featured.up ? "text-primary" : "text-muted-foreground"
                )}
              >
                {featured.up ? (
                  <ArrowUpRightIcon className="size-4" aria-hidden />
                ) : (
                  <ArrowDownRightIcon className="size-4" aria-hidden />
                )}
                {featured.trend}
              </p>
            </div>
            <div dir="ltr">
              <MiniArea
                values={featured.spark}
                up={featured.up}
                id="stats-04-featured"
              />
            </div>
          </div>
        </article>

        <ul className="grid gap-4 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-3">
          {peers.map((item) => {
            const Icon = item.icon
            return (
              <li
                key={item.label}
                className="flex flex-col rounded-[12px] bg-card p-5 shadow-soft"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex size-9 items-center justify-center rounded-full bg-muted">
                    <Icon className="size-4 text-foreground" aria-hidden />
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {item.period}
                  </span>
                </div>
                <h3 className="mt-4 text-start text-xs font-medium text-muted-foreground">
                  {item.label}
                </h3>
                <p
                  className="mt-1 text-start text-2xl font-semibold tracking-tight tabular-nums"
                  dir="ltr"
                >
                  {item.value}
                </p>
                <p
                  className={cn(
                    "mt-1 inline-flex items-center gap-1 text-xs font-medium",
                    item.up ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {item.up ? (
                    <ArrowUpRightIcon className="size-3.5" aria-hidden />
                  ) : (
                    <ArrowDownRightIcon className="size-3.5" aria-hidden />
                  )}
                  {item.trend}
                </p>
                <div className="mt-auto pt-4" dir="ltr">
                  <MiniArea
                    values={item.spark}
                    up={item.up}
                    id={`stats-04-${item.label}`}
                  />
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
