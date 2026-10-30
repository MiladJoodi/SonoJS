"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  ActivityIcon,
  AlertTriangleIcon,
  AreaChartIcon,
  BarChart3Icon,
  ClockIcon,
  CpuIcon,
  DollarSignIcon,
  LineChartIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  ZapIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

export type AiUsageTimeRange = "24h" | "7d" | "30d" | "90d"
export type AiUsageMetric = "tokens" | "cost" | "requests" | "latency"
export type AiUsageChartType = "area" | "bar" | "line"
export type AiUsageChartVariant = "default" | "glass" | "minimal" | "dark"

export type AiUsageMetricPoint = {
  date: string
  tokens: number
  cost: number
  requests: number
  latencyMs: number
  gpt4oTokens?: number
  claudeTokens?: number
  geminiTokens?: number
  deepseekTokens?: number
}

export type AiModelUsageShare = {
  name: string
  color: string
  percentage: number
  tokensFormatted: string
  costFormatted: string
}

export type AiUsageChartProps = {
  title?: string
  subtitle?: string
  badgeText?: string
  currencySymbol?: string
  lineColor?: string
  timeRange?: AiUsageTimeRange
  activeMetric?: AiUsageMetric
  chartType?: AiUsageChartType
  selectedModel?: string
  variant?: AiUsageChartVariant
  data?: AiUsageMetricPoint[]
  models?: AiModelUsageShare[]
  budgetLimit?: number
  currentSpend?: number
  tokensCardLabel?: string
  costCardLabel?: string
  requestsCardLabel?: string
  latencyCardLabel?: string
  tokensGrowthText?: string
  costGrowthText?: string
  requestsGrowthText?: string
  latencyGrowthText?: string
  showMetricsCards?: boolean
  showModelBreakdown?: boolean
  showTimeRangeSelector?: boolean
  showMetricSelector?: boolean
  showBudgetAlert?: boolean
  className?: string
  onTimeRangeChange?: (range: AiUsageTimeRange) => void
  onMetricChange?: (metric: AiUsageMetric) => void
  onModelChange?: (model: string) => void
}

const DEFAULT_DATA_24H: AiUsageMetricPoint[] = [
  { date: "00:00", tokens: 28000, cost: 0.42, requests: 520, latencyMs: 240 },
  { date: "04:00", tokens: 14000, cost: 0.21, requests: 290, latencyMs: 220 },
  { date: "08:00", tokens: 68000, cost: 1.05, requests: 1280, latencyMs: 210 },
  { date: "12:00", tokens: 145000, cost: 2.2, requests: 2850, latencyMs: 195 },
  { date: "16:00", tokens: 182000, cost: 2.8, requests: 3600, latencyMs: 185 },
  { date: "20:00", tokens: 120000, cost: 1.85, requests: 2400, latencyMs: 190 },
  { date: "23:59", tokens: 45000, cost: 0.7, requests: 950, latencyMs: 200 },
]

const DEFAULT_DATA_7D: AiUsageMetricPoint[] = [
  { date: "Mon", tokens: 184000, cost: 2.85, requests: 3400, latencyMs: 230 },
  { date: "Tue", tokens: 245000, cost: 3.9, requests: 4800, latencyMs: 210 },
  { date: "Wed", tokens: 312000, cost: 5.1, requests: 6200, latencyMs: 195 },
  { date: "Thu", tokens: 289000, cost: 4.6, requests: 5900, latencyMs: 205 },
  { date: "Fri", tokens: 420000, cost: 6.8, requests: 8400, latencyMs: 180 },
  { date: "Sat", tokens: 360000, cost: 5.75, requests: 7100, latencyMs: 190 },
  { date: "Sun", tokens: 495000, cost: 8.2, requests: 9800, latencyMs: 175 },
]

const DEFAULT_DATA_30D: AiUsageMetricPoint[] = [
  {
    date: "Week 1",
    tokens: 1250000,
    cost: 18.5,
    requests: 24000,
    latencyMs: 220,
  },
  {
    date: "Week 2",
    tokens: 1840000,
    cost: 27.8,
    requests: 36000,
    latencyMs: 205,
  },
  {
    date: "Week 3",
    tokens: 2100000,
    cost: 32.4,
    requests: 41000,
    latencyMs: 190,
  },
  {
    date: "Week 4",
    tokens: 2680000,
    cost: 41.2,
    requests: 52000,
    latencyMs: 180,
  },
]

const DEFAULT_DATA_90D: AiUsageMetricPoint[] = [
  {
    date: "Month 1",
    tokens: 5400000,
    cost: 82,
    requests: 104000,
    latencyMs: 215,
  },
  {
    date: "Month 2",
    tokens: 7800000,
    cost: 118.5,
    requests: 152000,
    latencyMs: 195,
  },
  {
    date: "Month 3",
    tokens: 9600000,
    cost: 145.2,
    requests: 188000,
    latencyMs: 182,
  },
]

const DEFAULT_MODELS: AiModelUsageShare[] = [
  {
    name: "GPT-4o",
    color: "#3b82f6",
    percentage: 48,
    tokensFormatted: "1.1M tokens",
    costFormatted: "$17.80",
  },
  {
    name: "Claude 3.5 Sonnet",
    color: "#8b5cf6",
    percentage: 32,
    tokensFormatted: "740K tokens",
    costFormatted: "$12.40",
  },
  {
    name: "Gemini 1.5 Pro",
    color: "#10b981",
    percentage: 14,
    tokensFormatted: "320K tokens",
    costFormatted: "$4.90",
  },
  {
    name: "DeepSeek V3",
    color: "#f59e0b",
    percentage: 6,
    tokensFormatted: "140K tokens",
    costFormatted: "$2.10",
  },
]

const VARIANT_STYLES: Record<AiUsageChartVariant, string> = {
  default: "border-border/70 bg-card text-foreground shadow-xs",
  glass:
    "border-border/50 bg-card/70 text-foreground shadow-soft backdrop-blur-xl",
  minimal: "border-border/50 bg-transparent text-foreground",
  dark: "border-zinc-800 bg-zinc-950 text-zinc-100 shadow-md",
}

function metricValue(point: AiUsageMetricPoint, metric: AiUsageMetric) {
  if (metric === "tokens") return point.tokens
  if (metric === "cost") return point.cost
  if (metric === "requests") return point.requests
  return point.latencyMs
}

function formatCompact(value: number) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`
  return String(value)
}

/** AI usage analytics surface — tokens, cost, requests, latency, model share. */
function AiUsageChart({
  title = "AI Usage & API Token Analytics",
  subtitle = "Monitor token consumption, model costs, request throughput, and latency.",
  badgeText = "Live API",
  currencySymbol = "$",
  lineColor = "#3b82f6",
  timeRange: propTimeRange = "7d",
  activeMetric: propActiveMetric = "tokens",
  chartType: propChartType = "area",
  variant = "default",
  data,
  models = DEFAULT_MODELS,
  budgetLimit = 100,
  currentSpend = 37.2,
  tokensCardLabel = "Tokens Used",
  costCardLabel = "Est. API Cost",
  requestsCardLabel = "Total Requests",
  latencyCardLabel = "Avg Latency",
  tokensGrowthText = "+18.4% vs last week",
  costGrowthText = "Within Budget",
  requestsGrowthText = "99.98% Success",
  latencyGrowthText = "-12ms Faster",
  showMetricsCards = true,
  showModelBreakdown = true,
  showTimeRangeSelector = true,
  showBudgetAlert = true,
  className,
  onTimeRangeChange,
  onMetricChange,
}: AiUsageChartProps) {
  const reactId = React.useId().replace(/:/g, "")
  const areaGradientId = `auc-area-${reactId}`
  const barGradientId = `auc-bar-${reactId}`

  const [timeRange, setTimeRange] =
    React.useState<AiUsageTimeRange>(propTimeRange)
  const [activeMetric, setActiveMetric] =
    React.useState<AiUsageMetric>(propActiveMetric)
  const [chartType, setChartType] =
    React.useState<AiUsageChartType>(propChartType)
  const [hoveredPoint, setHoveredPoint] =
    React.useState<AiUsageMetricPoint | null>(null)

  React.useEffect(() => {
    setTimeRange(propTimeRange)
  }, [propTimeRange])
  React.useEffect(() => {
    setActiveMetric(propActiveMetric)
  }, [propActiveMetric])
  React.useEffect(() => {
    setChartType(propChartType)
  }, [propChartType])

  const activeData = React.useMemo(() => {
    if (data) return data
    if (timeRange === "24h") return DEFAULT_DATA_24H
    if (timeRange === "30d") return DEFAULT_DATA_30D
    if (timeRange === "90d") return DEFAULT_DATA_90D
    return DEFAULT_DATA_7D
  }, [data, timeRange])

  const handleTimeRange = (range: AiUsageTimeRange) => {
    setTimeRange(range)
    onTimeRangeChange?.(range)
  }

  const handleMetric = (metric: AiUsageMetric) => {
    setActiveMetric(metric)
    onMetricChange?.(metric)
  }

  const totals = React.useMemo(() => {
    const totalTokens = activeData.reduce((acc, d) => acc + d.tokens, 0)
    const totalCost = activeData.reduce((acc, d) => acc + d.cost, 0)
    const totalRequests = activeData.reduce((acc, d) => acc + d.requests, 0)
    const avgLatency = Math.round(
      activeData.reduce((acc, d) => acc + d.latencyMs, 0) /
        (activeData.length || 1)
    )
    return {
      tokensFormatted: formatCompact(totalTokens),
      costFormatted: `${currencySymbol}${totalCost.toFixed(2)}`,
      requestsFormatted: formatCompact(totalRequests),
      latencyMs: avgLatency,
    }
  }, [activeData, currencySymbol])

  const maxMetricValue = React.useMemo(
    () =>
      Math.max(
        ...activeData.map((d) => metricValue(d, activeMetric)),
        1
      ),
    [activeData, activeMetric]
  )

  const svgWidth = 600
  const svgHeight = 220
  const paddingX = 30
  const paddingY = 25

  const points = React.useMemo(() => {
    const usableW = svgWidth - paddingX * 2
    const usableH = svgHeight - paddingY * 2
    return activeData.map((d, idx) => {
      const x =
        paddingX + (idx / (activeData.length - 1 || 1)) * usableW
      const rawVal = metricValue(d, activeMetric)
      const y =
        svgHeight - paddingY - (rawVal / maxMetricValue) * usableH
      return { x, y, rawVal, dataPoint: d }
    })
  }, [activeData, activeMetric, maxMetricValue])

  const pathD = React.useMemo(() => {
    if (points.length < 2) return ""
    let d = `M ${points[0].x} ${points[0].y}`
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i]
      const p1 = points[i + 1]
      const cx = (p0.x + p1.x) / 2
      d += ` C ${cx} ${p0.y}, ${cx} ${p1.y}, ${p1.x} ${p1.y}`
    }
    return d
  }, [points])

  const areaD = React.useMemo(() => {
    if (!pathD || points.length < 2) return ""
    const lastX = points[points.length - 1].x
    const firstX = points[0].x
    const bottomY = svgHeight - paddingY
    return `${pathD} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`
  }, [pathD, points])

  const budgetPct = Math.round(
    (currentSpend / Math.max(1, budgetLimit)) * 100
  )

  const metricCards: {
    key: AiUsageMetric
    label: string
    value: string
    growth: string
    icon: React.ReactNode
    activeClass: string
    invertGrowth?: boolean
  }[] = [
    {
      key: "tokens",
      label: tokensCardLabel,
      value: totals.tokensFormatted,
      growth: tokensGrowthText,
      icon: <ZapIcon className="size-3.5 text-blue-500" />,
      activeClass: "border-blue-500/40 bg-blue-500/10 shadow-xs",
    },
    {
      key: "cost",
      label: costCardLabel,
      value: totals.costFormatted,
      growth: costGrowthText,
      icon: <DollarSignIcon className="size-3.5 text-emerald-500" />,
      activeClass: "border-emerald-500/40 bg-emerald-500/10 shadow-xs",
    },
    {
      key: "requests",
      label: requestsCardLabel,
      value: totals.requestsFormatted,
      growth: requestsGrowthText,
      icon: <ActivityIcon className="size-3.5 text-violet-500" />,
      activeClass: "border-violet-500/40 bg-violet-500/10 shadow-xs",
    },
    {
      key: "latency",
      label: latencyCardLabel,
      value: `${totals.latencyMs} ms`,
      growth: latencyGrowthText,
      icon: <ClockIcon className="size-3.5 text-amber-500" />,
      activeClass: "border-amber-500/40 bg-amber-500/10 shadow-xs",
      invertGrowth: true,
    },
  ]

  return (
    <div
      data-slot="ai-usage-chart"
      className={cn(
        "relative w-full space-y-6 rounded-3xl border p-6 font-sans transition-all duration-300 md:p-8",
        VARIANT_STYLES[variant],
        className
      )}
    >
      <div className="flex flex-col justify-between gap-4 border-b border-border/70 pb-5 md:flex-row md:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
              <CpuIcon className="size-4" />
            </div>
            <h2 className="text-lg font-bold tracking-tight text-foreground md:text-xl">
              {title}
            </h2>
            {badgeText ? (
              <Badge variant="outline" className="font-mono text-[10px]">
                {badgeText}
              </Badge>
            ) : null}
          </div>
          {subtitle ? (
            <p className="mt-1 max-w-xl text-xs text-muted-foreground">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {showTimeRangeSelector ? (
            <div className="flex items-center rounded-xl border border-border/60 bg-muted/60 p-1">
              {(["24h", "7d", "30d", "90d"] as const).map((range) => (
                <Button
                  key={range}
                  type="button"
                  variant={timeRange === range ? "default" : "ghost"}
                  size="xs"
                  onClick={() => handleTimeRange(range)}
                  className={cn(
                    "h-7 rounded-lg px-2.5 text-xs font-medium uppercase",
                    timeRange !== range && "text-muted-foreground"
                  )}
                >
                  {range}
                </Button>
              ))}
            </div>
          ) : null}

          <div className="flex items-center rounded-xl border border-border/60 bg-muted/60 p-1">
            {(
              [
                ["area", AreaChartIcon, "Area chart"],
                ["bar", BarChart3Icon, "Bar chart"],
                ["line", LineChartIcon, "Line chart"],
              ] as const
            ).map(([type, Icon, label]) => (
              <Button
                key={type}
                type="button"
                variant={chartType === type ? "default" : "ghost"}
                size="icon-xs"
                onClick={() => setChartType(type)}
                className="size-7 rounded-lg"
                title={label}
                aria-label={label}
              >
                <Icon className="size-3.5" />
              </Button>
            ))}
          </div>
        </div>
      </div>

      {showBudgetAlert ? (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-amber-500/25 bg-amber-500/10 p-3.5 text-xs font-medium text-amber-900 dark:text-amber-200"
        >
          <div className="flex items-center gap-2.5">
            <AlertTriangleIcon className="size-4 shrink-0 text-amber-500" />
            <span>
              Monthly budget:{" "}
              <strong>
                {currencySymbol}
                {currentSpend.toFixed(2)}
              </strong>{" "}
              of {currencySymbol}
              {budgetLimit.toFixed(2)} ({budgetPct}% consumed)
            </span>
          </div>
          <Badge
            variant="outline"
            className="border-amber-500/40 bg-amber-500/15 text-amber-800 dark:text-amber-200"
          >
            Normal
          </Badge>
        </motion.div>
      ) : null}

      {showMetricsCards ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {metricCards.map((card) => (
            <button
              key={card.key}
              type="button"
              onClick={() => handleMetric(card.key)}
              className={cn(
                "cursor-pointer rounded-2xl border p-4 text-start transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring",
                activeMetric === card.key
                  ? card.activeClass
                  : "border-border/60 bg-muted/40 hover:bg-muted/70"
              )}
            >
              <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                <span>{card.label}</span>
                {card.icon}
              </div>
              <div className="mt-1.5 font-mono text-xl font-bold text-foreground">
                {card.value}
              </div>
              <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald-500">
                {card.invertGrowth ? (
                  <TrendingDownIcon className="size-3" />
                ) : (
                  <TrendingUpIcon className="size-3" />
                )}
                <span>{card.growth}</span>
              </div>
            </button>
          ))}
        </div>
      ) : null}

      <div className="relative w-full rounded-2xl border border-border/70 bg-muted/30 p-4">
        <div className="flex items-center justify-between px-2 pb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          <span>
            {activeMetric} trend ({timeRange})
          </span>
          <span className="font-mono text-[11px] normal-case">
            Peak: {maxMetricValue.toLocaleString()}
            {activeMetric === "cost" ? ` ${currencySymbol}` : ""}
          </span>
        </div>

        <div className="relative h-[220px] w-full">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="h-full w-full overflow-visible"
            role="img"
            aria-label={`${activeMetric} chart for ${timeRange}`}
          >
            <defs>
              <linearGradient id={areaGradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={lineColor} stopOpacity="0.45" />
                <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
              </linearGradient>
              <linearGradient id={barGradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={lineColor} stopOpacity="0.9" />
                <stop offset="100%" stopColor={lineColor} stopOpacity="0.5" />
              </linearGradient>
            </defs>

            {[0, 0.33, 0.66, 1].map((ratio, i) => {
              const y = paddingY + ratio * (svgHeight - paddingY * 2)
              return (
                <line
                  key={i}
                  x1={paddingX}
                  y1={y}
                  x2={svgWidth - paddingX}
                  y2={y}
                  stroke="currentColor"
                  strokeOpacity="0.08"
                  strokeDasharray="4 4"
                />
              )
            })}

            {chartType === "area" ? (
              <>
                <motion.path
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  d={areaD}
                  fill={`url(#${areaGradientId})`}
                />
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  d={pathD}
                  fill="none"
                  stroke={lineColor}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </>
            ) : null}

            {chartType === "line" ? (
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                d={pathD}
                fill="none"
                stroke={lineColor}
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            ) : null}

            {chartType === "bar"
              ? points.map((pt, i) => {
                  const barW = Math.max(
                    16,
                    Math.floor(
                      (svgWidth - paddingX * 2) / (activeData.length || 1) - 16
                    )
                  )
                  const bottomY = svgHeight - paddingY
                  const barH = Math.max(4, bottomY - pt.y)
                  return (
                    <rect
                      key={i}
                      x={pt.x - barW / 2}
                      y={pt.y}
                      width={barW}
                      height={barH}
                      rx="6"
                      fill={`url(#${barGradientId})`}
                      className="cursor-pointer transition-opacity hover:opacity-85"
                      onMouseEnter={() => setHoveredPoint(pt.dataPoint)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                  )
                })
              : null}

            {chartType !== "bar"
              ? points.map((pt, i) => (
                  <circle
                    key={i}
                    cx={pt.x}
                    cy={pt.y}
                    r="5"
                    fill={lineColor}
                    stroke="var(--card)"
                    strokeWidth="2"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPoint(pt.dataPoint)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                ))
              : null}
          </svg>

          <div className="flex justify-between px-6 pt-2 font-mono text-[11px] text-muted-foreground select-none">
            {activeData.map((d) => (
              <span key={d.date}>{d.date}</span>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {hoveredPoint ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute end-6 top-4 z-20 space-y-1 rounded-2xl border border-border/70 bg-zinc-900 p-3 font-mono text-xs text-white shadow-soft"
            >
              <div className="border-b border-zinc-800 pb-1 font-bold text-blue-400">
                {hoveredPoint.date} summary
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-zinc-400">Tokens:</span>
                <span className="font-semibold">
                  {hoveredPoint.tokens.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-zinc-400">Cost:</span>
                <span className="font-semibold text-emerald-400">
                  {currencySymbol}
                  {hoveredPoint.cost.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-zinc-400">Requests:</span>
                <span className="font-semibold">
                  {hoveredPoint.requests.toLocaleString()}
                </span>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {showModelBreakdown ? (
        <div className="space-y-4 border-t border-border/70 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              LLM model consumption
            </h3>
            <span className="font-mono text-xs text-muted-foreground">
              {models.length} active models
            </span>
          </div>
          <div className="space-y-3">
            {models.map((m) => (
              <div key={m.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block size-2.5 rounded-full"
                      style={{ backgroundColor: m.color }}
                    />
                    <span className="font-semibold text-foreground">
                      {m.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
                    <span>{m.tokensFormatted}</span>
                    <span className="font-semibold text-foreground">
                      {m.costFormatted}
                    </span>
                    <span className="w-8 text-end font-bold text-foreground">
                      {m.percentage}%
                    </span>
                  </div>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${m.percentage}%`,
                      backgroundColor: m.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export { AiUsageChart }
