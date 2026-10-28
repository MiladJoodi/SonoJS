"use client"

import * as React from "react"
import { Bitcoin } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { cn } from "@/lib/utils"
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart"
import { between, random } from "@/registry/charts/_lib/chart-mock-data"
import { chartBarContainerClassName } from "@/registry/charts/_lib/chart-styles"
import {
  CANDLE_DOWN,
  CANDLE_UP,
  CandlestickShape,
  candleColor,
  candleRangeKey,
  formatCandleCompact,
  formatCandleDay,
  formatCandlePrice,
  formatCandleTime,
  type MarketCandle,
} from "@/registry/charts/_lib/stock-shared"
import { useChartDir } from "@/registry/charts/_lib/use-chart-dir"

type OhlcvRow = MarketCandle & { vol: number }

type Timeframe = "1H" | "4H" | "1D" | "1W"

const TIMEFRAMES: readonly Timeframe[] = ["1H", "4H", "1D", "1W"] as const

const NARROW_MQ = "(max-width: 639px)"
const AXIS_TICK_FILL =
  "color-mix(in oklab, var(--foreground) 58%, transparent)"
const BAR_TOOLTIP_CURSOR = {
  fill: "color-mix(in oklab, var(--foreground) 6%, transparent)",
} as const

const BTC_START = 67_420
const BTC_START_TIME = Date.UTC(2026, 2, 10, 14, 0)

const chartConfig = {
  candle: { label: "Close", color: CANDLE_UP },
  up: { label: "Bullish", color: "var(--chart-up)" },
  down: { label: "Bearish", color: "var(--chart-down)" },
} satisfies ChartConfig

function generateOhlcv(
  length: number,
  seed: number,
  intervalMs: number,
  startPrice: number,
  startTime: number,
  volatility: number
): OhlcvRow[] {
  const gen = random(seed)
  const rows: OhlcvRow[] = []
  let lastClose = startPrice

  for (let i = 0; i < length; i++) {
    const time = startTime + i * intervalMs
    const open = lastClose
    const drift = between(gen, -volatility, volatility) / 10_000
    const shock =
      between(gen, 0, 100) > 90
        ? between(gen, -volatility * 2, volatility * 2) / 10_000
        : 0
    const close = Math.max(
      100,
      Math.round(open * (1 + drift + shock) * 100) / 100
    )
    const bodyTop = Math.max(open, close)
    const bodyBottom = Math.min(open, close)
    const upperWick = bodyTop * (between(gen, 6, 55) / 10_000)
    const lowerWick = bodyBottom * (between(gen, 6, 55) / 10_000)
    const high = Math.round((bodyTop + upperWick) * 100) / 100
    const low = Math.max(1, Math.round((bodyBottom - lowerWick) * 100) / 100)
    const volume = between(gen, 180, 2_400) * (intervalMs >= 86_400_000 ? 40 : 1)
    rows.push({ time, open, close, low, high, volume, vol: volume })
    lastClose = close
  }

  return rows
}

const SERIES: Record<Timeframe, OhlcvRow[]> = {
  "1H": generateOhlcv(96, 4201, 60 * 60 * 1000, BTC_START, BTC_START_TIME, 18),
  "4H": generateOhlcv(84, 4202, 4 * 60 * 60 * 1000, BTC_START, BTC_START_TIME, 28),
  "1D": generateOhlcv(72, 4203, 24 * 60 * 60 * 1000, BTC_START, BTC_START_TIME, 42),
  "1W": generateOhlcv(52, 4204, 7 * 24 * 60 * 60 * 1000, BTC_START, BTC_START_TIME, 55),
}

const MIN_ZOOM_CANDLES = 8
const DEFAULT_VISIBLE: Record<Timeframe, number> = {
  "1H": 40,
  "4H": 36,
  "1D": 32,
  "1W": 24,
}
const NARROW_VISIBLE: Record<Timeframe, number> = {
  "1H": 28,
  "4H": 24,
  "1D": 22,
  "1W": 16,
}

function useNarrowViewport() {
  const [narrow, setNarrow] = React.useState(false)

  React.useEffect(() => {
    const mql = window.matchMedia(NARROW_MQ)
    const onChange = () => setNarrow(mql.matches)
    onChange()
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return narrow
}

function formatSessionPct(value: number, locale: string) {
  const sign = value > 0 ? "+" : ""
  return `${sign}${new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value)}%`
}

function formatAxisLabel(time: number, timeframe: Timeframe, locale: string) {
  if (timeframe === "1H" || timeframe === "4H") {
    return formatCandleTime(time, locale)
  }
  if (timeframe === "1W") {
    return new Intl.DateTimeFormat(locale, {
      month: "short",
      day: "numeric",
    }).format(new Date(time))
  }
  return formatCandleDay(time, locale)
}

function ChangeBadge({
  value,
  good,
  locale,
}: {
  value: number
  good: boolean
  locale: string
}) {
  return (
    <span
      className="shrink-0 rounded-md px-1.5 py-0.5 text-[11px] font-medium tabular-nums"
      style={{
        color: good ? CANDLE_UP : CANDLE_DOWN,
        background: good
          ? "color-mix(in oklab, var(--chart-up) 14%, transparent)"
          : "color-mix(in oklab, var(--chart-down) 14%, transparent)",
      }}
    >
      {formatSessionPct(value, locale)}
    </span>
  )
}

function OhlcRow({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent?: string
}) {
  return (
    <div className="flex items-center justify-between gap-6">
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <span
        className="text-[12px] font-medium tabular-nums text-foreground"
        style={accent ? { color: accent } : undefined}
      >
        {value}
      </span>
    </div>
  )
}

type BtcTooltipProps = {
  active?: boolean
  payload?: Array<{ payload?: OhlcvRow }>
  timeframe: Timeframe
  locale: string
}

function BtcTooltip({ active, payload, timeframe, locale }: BtcTooltipProps) {
  if (!active || !payload?.length) return null
  const row = payload[0]?.payload
  if (!row) return null

  const candlePct =
    row.open === 0 ? 0 : ((row.close - row.open) / row.open) * 100
  const up = candlePct >= 0

  return (
    <div className="pointer-events-none min-w-[11.5rem] rounded-[12px] border border-border/70 bg-card px-3 py-2.5 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-medium text-muted-foreground">
          {formatAxisLabel(row.time, timeframe, locale)}
        </p>
        <span
          className="rounded-md px-1.5 py-0.5 text-[10px] font-semibold tabular-nums"
          style={{
            color: up ? CANDLE_UP : CANDLE_DOWN,
            background: up
              ? "color-mix(in oklab, var(--chart-up) 14%, transparent)"
              : "color-mix(in oklab, var(--chart-down) 14%, transparent)",
          }}
        >
          {formatSessionPct(candlePct, locale)}
        </span>
      </div>

      <p
        className="mt-1.5 text-[1.125rem] font-semibold leading-none tracking-tight tabular-nums"
        style={{ color: candleColor(row) }}
      >
        {formatCandlePrice(row.close, locale)}
      </p>

      <div className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-1.5">
        <OhlcRow label="Open" value={formatCandlePrice(row.open, locale)} />
        <OhlcRow
          label="High"
          value={formatCandlePrice(row.high, locale)}
          accent={CANDLE_UP}
        />
        <OhlcRow
          label="Low"
          value={formatCandlePrice(row.low, locale)}
          accent={CANDLE_DOWN}
        />
        <OhlcRow
          label="Close"
          value={formatCandlePrice(row.close, locale)}
          accent={candleColor(row)}
        />
      </div>

    </div>
  )
}

export type HomeCandlestickChartProps = {
  className?: string
  /** Renders after the timeframe tabs (e.g. next-chart control). */
  trailing?: React.ReactNode
}

export function HomeCandlestickChart({
  className,
  trailing,
}: HomeCandlestickChartProps) {
  const { dir, ref } = useChartDir()
  const plotRtl = dir === "rtl"
  const narrow = useNarrowViewport()
  const chartAreaRef = React.useRef<HTMLDivElement>(null)
  const locale = "en"

  const [timeframe, setTimeframe] = React.useState<Timeframe>("1D")
  const fullData = SERIES[timeframe]
  const seriesLast = Math.max(0, fullData.length - 1)
  const defaultVisible = narrow
    ? NARROW_VISIBLE[timeframe]
    : DEFAULT_VISIBLE[timeframe]

  const [view, setView] = React.useState(() => {
    const end = seriesLast
    const start = Math.max(0, end - (DEFAULT_VISIBLE["1D"] - 1))
    return { start, end }
  })
  const [seriesTrack, setSeriesTrack] = React.useState({
    timeframe,
    seriesLast,
    defaultVisible,
  })
  if (
    seriesTrack.timeframe !== timeframe ||
    seriesTrack.seriesLast !== seriesLast ||
    seriesTrack.defaultVisible !== defaultVisible
  ) {
    const end = seriesLast
    const start = Math.max(0, end - (defaultVisible - 1))
    setSeriesTrack({ timeframe, seriesLast, defaultVisible })
    setView({ start, end })
  }

  const data = React.useMemo(
    () => fullData.slice(view.start, view.end + 1),
    [fullData, view.end, view.start]
  )
  const lastIndex = Math.max(0, data.length - 1)
  const active = data[lastIndex]
  const first = data[0]
  const total = active?.close ?? 0
  const rangePct =
    first && first.close !== 0
      ? ((total - first.close) / first.close) * 100
      : 0
  const rangeUp = rangePct >= 0
  const sessionPct =
    active && active.open !== 0
      ? ((active.close - active.open) / active.open) * 100
      : 0
  const sessionUp = sessionPct >= 0
  const timeLabel = active
    ? formatAxisLabel(active.time, timeframe, locale)
    : ""

  const yAxisWidth = narrow ? 44 : 52
  const chartMargin = React.useMemo(
    () =>
      narrow
        ? { top: 10, right: 4, left: 2, bottom: 2 }
        : { top: 14, right: 6, left: 2, bottom: 2 },
    [narrow]
  )

  const { domainMin, domainMax } = React.useMemo(() => {
    if (data.length === 0) return { domainMin: 0, domainMax: 1 }
    const lows = data.map((c) => c.low)
    const highs = data.map((c) => c.high)
    const priceMin = Math.min(...lows)
    const priceMax = Math.max(...highs)
    const pad = (priceMax - priceMin) * 0.08 || priceMin * 0.01
    return {
      domainMin: Math.floor(priceMin - pad),
      domainMax: Math.ceil(priceMax + pad),
    }
  }, [data])

  React.useEffect(() => {
    const el = chartAreaRef.current
    if (!el) return

    const clampWindow = (start: number, end: number) => {
      let nextStart = start
      let nextEnd = end
      if (nextStart < 0) {
        nextEnd -= nextStart
        nextStart = 0
      }
      if (nextEnd > seriesLast) {
        const over = nextEnd - seriesLast
        nextStart = Math.max(0, nextStart - over)
        nextEnd = seriesLast
      }
      return { start: nextStart, end: nextEnd }
    }

    const onWheel = (event: WheelEvent) => {
      event.preventDefault()
      const seriesLen = fullData.length
      if (seriesLen <= MIN_ZOOM_CANDLES) return

      setView((prev) => {
        const span = prev.end - prev.start + 1
        let next = prev

        if (event.shiftKey) {
          const step = Math.max(1, Math.round(span * 0.12))
          const dirSign = event.deltaY > 0 ? 1 : -1
          next = clampWindow(
            prev.start + dirSign * step,
            prev.end + dirSign * step
          )
        } else {
          const zoomIn = event.deltaY < 0
          const factor = zoomIn ? 0.82 : 1.22
          let nextSpan = Math.round(span * factor)
          nextSpan = Math.min(
            seriesLen,
            Math.max(Math.min(MIN_ZOOM_CANDLES, seriesLen), nextSpan)
          )
          if (nextSpan === span) return prev

          const rect = el.getBoundingClientRect()
          let anchor = 0.5
          if (rect.width > 0) {
            let ratio = (event.clientX - rect.left) / rect.width
            if (plotRtl) ratio = 1 - ratio
            anchor = Math.min(1, Math.max(0, ratio))
          }

          const focus = prev.start + anchor * (span - 1)
          const nextStart = Math.round(focus - anchor * (nextSpan - 1))
          next = clampWindow(nextStart, nextStart + nextSpan - 1)
        }

        if (next.start === prev.start && next.end === prev.end) {
          return prev
        }
        return next
      })
    }

    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [fullData.length, plotRtl, seriesLast])

  const tooltipContent = React.useCallback(
    (props: Omit<BtcTooltipProps, "timeframe" | "locale">) => (
      <BtcTooltip {...props} timeframe={timeframe} locale={locale} />
    ),
    [locale, timeframe]
  )

  const ariaLabel = `Bitcoin BTC/USD candlestick, ${timeframe}, ${timeLabel} last ${formatCandlePrice(total, locale)}`

  return (
    <div
      ref={ref}
      className={cn(
        "mx-auto flex w-full min-w-0 flex-col font-sans tabular-nums",
        className
      )}
    >
      <div className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft sm:rounded-[14px]">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2.5 border-b border-border/50 px-3 py-2.5 sm:px-4 sm:py-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <span
                className="grid size-10 shrink-0 place-items-center rounded-full"
                style={{
                  background: "color-mix(in oklab, #f7931a 20%, transparent)",
                  color: "#f7931a",
                }}
                aria-hidden
              >
                <Bitcoin className="size-5" strokeWidth={2} />
              </span>
              <p className="min-w-0 text-sm font-semibold leading-none tracking-tight text-foreground sm:text-[15px]">
                Bitcoin
                <span className="ms-1.5 font-medium text-muted-foreground">
                  BTC/USD
                </span>
              </p>
              <ChangeBadge value={rangePct} good={rangeUp} locale={locale} />
            </div>
            <div className="mt-2 flex flex-wrap items-baseline gap-2 ps-[3.25rem]">
              <p className="text-[1.375rem] font-semibold leading-none tracking-tight text-foreground sm:text-2xl">
                {formatCandlePrice(total, locale)}
              </p>
              <span
                className="text-xs font-medium tabular-nums"
                style={{ color: sessionUp ? CANDLE_UP : CANDLE_DOWN }}
              >
                {formatSessionPct(sessionPct, locale)}
              </span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <div
              role="tablist"
              aria-label="Chart timeframe"
              className="flex items-center gap-0.5"
            >
              {TIMEFRAMES.map((tf) => {
                const selected = tf === timeframe
                return (
                  <button
                    key={tf}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setTimeframe(tf)}
                    className={cn(
                      "h-8 min-w-8 cursor-pointer rounded-md border px-2 text-xs font-medium tabular-nums transition-colors",
                      selected
                        ? "border-primary text-foreground"
                        : "border-transparent text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                    )}
                  >
                    {tf}
                  </button>
                )
              })}
            </div>
            {trailing}
          </div>
        </div>

        <div
          ref={chartAreaRef}
          dir="ltr"
          role="img"
          aria-label={ariaLabel}
          className="touch-pan-y"
        >
          <ChartContainer
            config={chartConfig}
            className={cn(
              chartBarContainerClassName,
              "aspect-auto h-[240px] max-h-[300px] max-w-none sm:h-[280px]"
            )}
          >
            <BarChart
              accessibilityLayer
              data={data}
              margin={chartMargin}
              barCategoryGap="14%"
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="4 4"
                stroke="var(--border)"
                strokeOpacity={0.4}
              />
              <XAxis
                dataKey="time"
                scale="band"
                reversed={plotRtl}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={narrow ? 48 : 40}
                tick={{ fontSize: 11, fill: AXIS_TICK_FILL }}
                tickFormatter={(value: number) =>
                  formatAxisLabel(Number(value), timeframe, locale)
                }
              />
              <YAxis
                orientation="right"
                width={yAxisWidth}
                domain={[domainMin, domainMax]}
                tickCount={4}
                tickLine={false}
                axisLine={false}
                tickMargin={6}
                tick={{ fontSize: 11, fill: AXIS_TICK_FILL }}
                tickFormatter={(value: number) =>
                  formatCandleCompact(value, locale)
                }
                className="tabular-nums"
              />
              <ChartTooltip
                cursor={BAR_TOOLTIP_CURSOR}
                content={tooltipContent}
              />
              <Bar
                name="candle"
                dataKey={candleRangeKey}
                shape={CandlestickShape}
                isAnimationActive={false}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  )
}
