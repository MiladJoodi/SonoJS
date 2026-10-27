"use client"

import * as React from "react"
import {
  ActivityIcon,
  CreditCardIcon,
  DollarSignIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import {
  Card,
  CardContent,
  CardHeader,
} from "@sonojs/ui/components/card"
import { cn } from "@/lib/utils"

type Stat = {
  title: string
  value: string
  change: string
  isPositive: boolean
  description: string
  icon: LucideIcon
  /** Chronological samples — higher = better. Trend should match `isPositive`. */
  sparkline: number[]
}

const STATS: Stat[] = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    isPositive: true,
    description: "from last month",
    icon: DollarSignIcon,
    sparkline: [18, 20, 19, 24, 28, 31, 36, 42],
  },
  {
    title: "Subscriptions",
    value: "+2350",
    change: "+180.1%",
    isPositive: true,
    description: "from last month",
    icon: UsersIcon,
    sparkline: [8, 10, 14, 13, 22, 30, 38, 46],
  },
  {
    title: "Sales",
    value: "+12,234",
    change: "+19%",
    isPositive: true,
    description: "from last month",
    icon: CreditCardIcon,
    sparkline: [16, 18, 17, 23, 25, 29, 28, 34],
  },
  {
    title: "Active Now",
    value: "+573",
    change: "-5%",
    isPositive: false,
    description: "since last hour",
    icon: ActivityIcon,
    sparkline: [40, 36, 34, 30, 26, 22, 18, 14],
  },
]

const SPARK_W = 100
const SPARK_H = 32
/** Keep stroke + area inside the viewBox (no overflow under the card). */
const SPARK_PAD = 3

type Pt = { x: number; y: number }

/** Smooth cubic path through points (Catmull–Rom → Bezier). Soft like the old curves, without sharp corners. */
function smoothLine(points: Pt[]) {
  if (points.length === 0) return ""
  if (points.length === 1) {
    const p = points[0]!
    return `M${p.x.toFixed(2)},${p.y.toFixed(2)}`
  }

  const clampY = (y: number) =>
    Math.min(SPARK_H - SPARK_PAD, Math.max(SPARK_PAD, y))

  let d = `M${points[0]!.x.toFixed(2)},${points[0]!.y.toFixed(2)}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]!
    const p1 = points[i]!
    const p2 = points[i + 1]!
    const p3 = points[i + 2] ?? p2
    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = clampY(p1.y + (p2.y - p0.y) / 6)
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = clampY(p2.y - (p3.y - p1.y) / 6)
    d += ` C${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`
  }
  return d
}

function sparkGeometry(values: number[]) {
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const plotH = SPARK_H - SPARK_PAD * 2

  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * SPARK_W
    // SVG y grows downward — larger values sit higher on screen.
    const y = SPARK_PAD + (1 - (v - min) / range) * plotH
    return { x, y }
  })

  const line = smoothLine(points)
  const last = points[points.length - 1]!
  const area = `${line} L${last.x.toFixed(2)},${SPARK_H} L0,${SPARK_H} Z`

  return { line, area }
}

function Sparkline({
  values,
  isPositive,
}: {
  values: number[]
  isPositive: boolean
}) {
  const stroke = isPositive ? "#059669" : "#e11d48"
  const { line, area } = sparkGeometry(values)

  return (
    <svg
      viewBox={`0 0 ${SPARK_W} ${SPARK_H}`}
      className="size-full"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path d={area} fill={stroke} className="opacity-10" />
      <path
        d={line}
        fill="none"
        stroke={stroke}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

export default function KpiCards({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "relative isolate w-full min-w-0 bg-canvas px-0 pt-8 pb-12 text-foreground sm:pt-10 sm:pb-14",
        className
      )}
      aria-labelledby="kpi-cards-01-heading"
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute start-1/2 top-[-20%] size-[22rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
        <header className="text-start">
          <h2
            id="kpi-cards-01-heading"
            className="text-2xl font-semibold tracking-tight text-foreground"
          >
            Overview
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Your key performance metrics for this month.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => {
            const Icon = stat.icon
            const TrendIcon = stat.isPositive
              ? TrendingUpIcon
              : TrendingDownIcon
            return (
              <Card
                key={stat.title}
                className="border-border/70 shadow-soft"
              >
                <CardHeader className="flex flex-row items-center justify-between gap-3 pb-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <Icon
                    className="size-5 shrink-0 text-muted-foreground"
                    aria-hidden
                  />
                </CardHeader>
                <CardContent className="pt-0">
                  <p
                    dir="ltr"
                    className="text-2xl font-semibold tracking-tight tabular-nums text-foreground"
                  >
                    {stat.value}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Badge
                      variant={stat.isPositive ? "secondary" : "destructive"}
                      className={cn(
                        "h-5 gap-1 px-1.5",
                        stat.isPositive &&
                          "border-transparent bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
                      )}
                    >
                      <TrendIcon aria-hidden />
                      <span dir="ltr">{stat.change}</span>
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {stat.description}
                    </span>
                  </div>

                  <div className="mt-4 h-10 w-full overflow-hidden">
                    <Sparkline
                      values={stat.sparkline}
                      isPositive={stat.isPositive}
                    />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
