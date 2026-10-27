"use client"

import * as React from "react"
import {
  ActivityIcon,
  ArrowUpRightIcon,
  ClockIcon,
  DollarSignIcon,
  DownloadIcon,
  EyeIcon,
  GlobeIcon,
  MoreHorizontalIcon,
  MousePointerIcon,
  RefreshCwIcon,
  ShoppingCartIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

const TIME_RANGES = ["7d", "30d", "90d", "1y"] as const
type TimeRange = (typeof TIME_RANGES)[number]

type MetricColor = "primary" | "secondary" | "accent" | "success"

const COLOR_CLASSES: Record<MetricColor, { bg: string; text: string }> = {
  primary: { bg: "bg-primary/10", text: "text-primary" },
  secondary: { bg: "bg-secondary", text: "text-secondary-foreground" },
  accent: {
    bg: "bg-amber-500/10",
    text: "text-amber-700 dark:text-amber-400",
  },
  success: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-700 dark:text-emerald-400",
  },
}

const SPARK_STROKE: Record<MetricColor, string> = {
  primary: "var(--primary)",
  secondary: "var(--secondary-foreground)",
  accent: "#d97706",
  success: "#059669",
}

const METRIC_CARDS = [
  {
    id: "revenue",
    label: "Total Revenue",
    icon: DollarSignIcon,
    color: "primary" as const,
    values: {
      "7d": "$12,480",
      "30d": "$48,230",
      "90d": "$142,800",
      "1y": "$580,000",
    },
    changes: { "7d": 12.4, "30d": 8.1, "90d": 22.3, "1y": 34.7 },
  },
  {
    id: "users",
    label: "Active Users",
    icon: UsersIcon,
    color: "secondary" as const,
    values: {
      "7d": "2,840",
      "30d": "11,200",
      "90d": "38,500",
      "1y": "124,000",
    },
    changes: { "7d": 5.2, "30d": -2.1, "90d": 15.8, "1y": 42.1 },
  },
  {
    id: "orders",
    label: "New Orders",
    icon: ShoppingCartIcon,
    color: "accent" as const,
    values: { "7d": "342", "30d": "1,480", "90d": "4,920", "1y": "18,300" },
    changes: { "7d": 18.7, "30d": 6.4, "90d": 28.2, "1y": 51.3 },
  },
  {
    id: "sessions",
    label: "Avg. Session",
    icon: ActivityIcon,
    color: "success" as const,
    values: {
      "7d": "4m 12s",
      "30d": "3m 58s",
      "90d": "4m 30s",
      "1y": "3m 42s",
    },
    changes: { "7d": 3.1, "30d": -5.4, "90d": 7.2, "1y": -1.8 },
  },
] as const

const SPARKLINES: Record<(typeof METRIC_CARDS)[number]["id"], Record<TimeRange, number[]>> = {
  revenue: {
    "7d": [40, 55, 48, 70, 65, 80, 90],
    "30d": [30, 45, 50, 42, 60, 55, 70, 65, 80, 75, 85, 90],
    "90d": [20, 30, 35, 40, 38, 50, 55, 60, 65, 70, 75, 85],
    "1y": [10, 20, 25, 30, 35, 40, 50, 55, 65, 70, 80, 90],
  },
  users: {
    "7d": [60, 55, 65, 50, 70, 60, 75],
    "30d": [40, 55, 50, 60, 55, 65, 60, 70, 65, 60, 70, 75],
    "90d": [30, 40, 45, 50, 48, 55, 60, 58, 65, 60, 70, 75],
    "1y": [20, 30, 35, 40, 50, 45, 55, 60, 65, 70, 75, 80],
  },
  orders: {
    "7d": [50, 65, 55, 75, 70, 85, 90],
    "30d": [35, 50, 55, 60, 50, 65, 70, 65, 75, 80, 85, 90],
    "90d": [25, 35, 40, 50, 55, 60, 65, 70, 72, 78, 82, 88],
    "1y": [15, 25, 30, 40, 45, 50, 55, 60, 70, 75, 82, 90],
  },
  sessions: {
    "7d": [55, 60, 58, 65, 60, 55, 62],
    "30d": [50, 55, 60, 55, 58, 62, 58, 60, 55, 60, 58, 62],
    "90d": [45, 50, 55, 58, 55, 60, 58, 62, 60, 58, 62, 65],
    "1y": [40, 45, 50, 48, 52, 55, 50, 58, 55, 60, 58, 62],
  },
}

const BAR_DATA: Record<TimeRange, { label: string; value: number }[]> = {
  "7d": [
    { label: "Mon", value: 65 },
    { label: "Tue", value: 80 },
    { label: "Wed", value: 55 },
    { label: "Thu", value: 90 },
    { label: "Fri", value: 75 },
    { label: "Sat", value: 45 },
    { label: "Sun", value: 38 },
  ],
  "30d": [
    { label: "Wk 1", value: 60 },
    { label: "Wk 2", value: 72 },
    { label: "Wk 3", value: 58 },
    { label: "Wk 4", value: 85 },
  ],
  "90d": [
    { label: "Jan", value: 55 },
    { label: "Feb", value: 68 },
    { label: "Mar", value: 78 },
  ],
  "1y": [
    { label: "Q1", value: 55 },
    { label: "Q2", value: 68 },
    { label: "Q3", value: 80 },
    { label: "Q4", value: 92 },
  ],
}

const TOP_PAGES = [
  { path: "/", label: "Homepage", views: "24,821", pct: 32 },
  { path: "/pricing", label: "Pricing", views: "12,340", pct: 16 },
  { path: "/docs", label: "Documentation", views: "9,480", pct: 12 },
  { path: "/blog", label: "Blog", views: "7,120", pct: 9 },
  { path: "/components", label: "Components", views: "5,860", pct: 7 },
] as const

const TRAFFIC_SOURCES = [
  { source: "Organic Search", pct: 42, bar: "bg-primary", dot: "bg-primary" },
  {
    source: "Direct",
    pct: 24,
    bar: "bg-secondary-foreground/70",
    dot: "bg-secondary-foreground/70",
  },
  {
    source: "Social Media",
    pct: 18,
    bar: "bg-amber-500",
    dot: "bg-amber-500",
  },
  { source: "Referral", pct: 10, bar: "bg-sky-500", dot: "bg-sky-500" },
  {
    source: "Email",
    pct: 6,
    bar: "bg-emerald-500",
    dot: "bg-emerald-500",
  },
] as const

const QUICK_STATS = [
  {
    icon: EyeIcon,
    label: "Page Views",
    value: "78,420",
    sub: "This period",
    color: "primary" as const,
  },
  {
    icon: MousePointerIcon,
    label: "Click Rate",
    value: "3.24%",
    sub: "+0.8% vs avg",
    color: "secondary" as const,
  },
  {
    icon: ClockIcon,
    label: "Bounce Rate",
    value: "41.2%",
    sub: "-3.1% vs avg",
    color: "accent" as const,
  },
  {
    icon: GlobeIcon,
    label: "Countries",
    value: "89",
    sub: "Unique origins",
    color: "success" as const,
  },
] as const

function Sparkline({
  data,
  color,
}: {
  data: number[]
  color: MetricColor
}) {
  const W = 120
  const H = 40
  const pad = 2
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  const points = data.map((v, i) => {
    const x = pad + (i / Math.max(data.length - 1, 1)) * (W - pad * 2)
    const y = pad + ((max - v) / range) * (H - pad * 2)
    return `${x},${y}`
  })
  const line = `M ${points.join(" L ")}`
  const area = `M ${points[0]} L ${points.join(" L ")} L ${W - pad},${H} L ${pad},${H} Z`
  const stroke = SPARK_STROKE[color]

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden>
      <path d={area} fill={stroke} fillOpacity={0.12} />
      <path
        d={line}
        stroke={stroke}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function BarChart({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value), 1)

  return (
    <div className="flex h-48 w-full items-end gap-2.5">
      {data.map((d) => (
        <div
          key={d.label}
          className="flex h-full min-h-0 flex-1 flex-col items-center gap-1.5"
        >
          <div className="flex w-full min-h-0 flex-1 items-end">
            <div
              className="w-full min-h-1 rounded-t-md bg-primary/80 transition-colors hover:bg-primary"
              style={{ height: `${(d.value / max) * 100}%` }}
              title={`${d.label}: ${d.value}`}
              role="img"
              aria-label={`${d.label} ${d.value}`}
            />
          </div>
          <span className="shrink-0 text-xs text-muted-foreground">{d.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function AnalyticsDashboard01() {
  const [range, setRange] = React.useState<TimeRange>("30d")
  const [loading, setLoading] = React.useState(false)

  const handleRefresh = () => {
    setLoading(true)
    window.setTimeout(() => setLoading(false), 800)
  }

  return (
    <div className="min-h-svh bg-canvas text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Your performance overview — updated in real time.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div
              className="flex items-center gap-1 overflow-x-auto rounded-[12px] border border-border/70 bg-card p-1 shadow-soft"
              role="tablist"
              aria-label="Time range"
            >
              {TIME_RANGES.map((r) => {
                const active = range === r
                return (
                  <button
                    key={r}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setRange(r)}
                    className={cn(
                      "shrink-0 cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                      active
                        ? "bg-primary text-primary-foreground shadow-soft"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {r}
                  </button>
                )
              })}
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon-xs"
                aria-label="Refresh data"
                onClick={handleRefresh}
              >
                <RefreshCwIcon
                  className={cn("size-4", loading && "animate-spin")}
                  aria-hidden
                />
              </Button>
              <Button type="button" variant="outline" size="sm" className="gap-1.5">
                <DownloadIcon className="size-4" aria-hidden />
                Export
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {METRIC_CARDS.map((card) => {
            const Icon = card.icon
            const change = card.changes[range]
            const isPositive = change >= 0
            const TrendIcon = isPositive ? TrendingUpIcon : TrendingDownIcon
            const colors = COLOR_CLASSES[card.color]
            return (
              <article
                key={card.id}
                className="rounded-[12px] border border-border/70 bg-card p-5 shadow-soft"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div
                    className={cn(
                      "flex size-10 items-center justify-center rounded-[12px]",
                      colors.bg
                    )}
                  >
                    <Icon className={cn("size-5", colors.text)} aria-hidden />
                  </div>
                  <Sparkline
                    data={SPARKLINES[card.id][range]}
                    color={card.color}
                  />
                </div>
                <p className="mb-1 text-xs font-medium text-muted-foreground">
                  {card.label}
                </p>
                <p className="mb-2 text-xl font-semibold tracking-tight tabular-nums">
                  {card.values[range]}
                </p>
                <div className="flex items-center gap-1">
                  <TrendIcon
                    className={cn(
                      "size-3.5",
                      isPositive
                        ? "text-emerald-700 dark:text-emerald-400"
                        : "text-destructive"
                    )}
                    aria-hidden
                  />
                  <span
                    className={cn(
                      "text-xs font-semibold tabular-nums",
                      isPositive
                        ? "text-emerald-700 dark:text-emerald-400"
                        : "text-destructive"
                    )}
                  >
                    {isPositive ? "+" : ""}
                    {change}%
                  </span>
                  <span className="text-xs text-muted-foreground">
                    vs prev. period
                  </span>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <section className="rounded-[12px] border border-border/70 bg-card p-6 shadow-soft">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold">Revenue</h2>
                <p className="text-xs text-muted-foreground">
                  Breakdown by period
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                aria-label="More revenue options"
              >
                <MoreHorizontalIcon className="size-4" aria-hidden />
              </Button>
            </div>
            <BarChart data={BAR_DATA[range]} />
          </section>

          <section className="rounded-[12px] border border-border/70 bg-card p-6 shadow-soft">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold">Traffic Sources</h2>
                <p className="text-xs text-muted-foreground">
                  Where your visitors come from
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                aria-label="More traffic options"
              >
                <MoreHorizontalIcon className="size-4" aria-hidden />
              </Button>
            </div>
            <ul className="flex flex-col gap-3">
              {TRAFFIC_SOURCES.map((src) => (
                <li key={src.source}>
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn("size-2.5 rounded-full", src.dot)}
                        aria-hidden
                      />
                      <span className="text-sm">{src.source}</span>
                    </div>
                    <span className="text-sm font-semibold tabular-nums">
                      {src.pct}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn("h-full rounded-full", src.bar)}
                      style={{ width: `${src.pct}%` }}
                      role="presentation"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <section className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
            <div className="flex items-center justify-between gap-3 border-b border-border/70 px-6 py-4">
              <h2 className="text-base font-semibold">Top Pages</h2>
              <Button type="button" variant="ghost" size="sm" className="gap-1">
                View all
                <ArrowUpRightIcon className="size-3.5" aria-hidden />
              </Button>
            </div>
            <ul className="divide-y divide-border/70">
              {TOP_PAGES.map((page) => (
                <li
                  key={page.path}
                  className="flex items-center gap-4 px-6 py-3.5 transition-colors hover:bg-muted/40"
                >
                  <span
                    className="hidden w-24 shrink-0 truncate font-mono text-xs text-muted-foreground sm:block"
                    dir="ltr"
                  >
                    {page.path}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{page.label}</p>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary/60"
                        style={{ width: `${Math.min(page.pct * 3, 100)}%` }}
                        role="presentation"
                      />
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <EyeIcon
                      className="size-3.5 text-muted-foreground"
                      aria-hidden
                    />
                    <span className="text-xs font-semibold tabular-nums">
                      {page.views}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {QUICK_STATS.map((stat) => {
              const Icon = stat.icon
              const colors = COLOR_CLASSES[stat.color]
              return (
                <article
                  key={stat.label}
                  className="rounded-[12px] border border-border/70 bg-card p-5 shadow-soft"
                >
                  <div
                    className={cn(
                      "mb-4 flex size-9 items-center justify-center rounded-[12px]",
                      colors.bg
                    )}
                  >
                    <Icon className={cn("size-4", colors.text)} aria-hidden />
                  </div>
                  <p className="mb-1 text-xs text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="mb-1 text-xl font-semibold tracking-tight tabular-nums">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.sub}</p>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
