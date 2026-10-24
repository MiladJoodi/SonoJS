"use client"

import * as React from "react"
import {
  CartesianGrid,
  Scatter,
  ScatterChart as RechartsScatterChart,
  Symbols,
  XAxis,
  YAxis,
  type ScatterShapeProps,
  type SymbolType,
} from "recharts"

import { cn } from "@/lib/utils"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

import { chartLineContainerClassName } from "../_lib/chart-styles"
import { useChartDir } from "../_lib/use-chart-dir"
import { usePrefersReducedMotion } from "../_lib/use-prefers-reduced-motion"

/**
 * Scatter Chart With Cells — per-point color + symbol via `shape` (Cell is deprecated).
 * Teaching delta: `Symbols` + `--chart-1…5` instead of uniform fill.
 * Locked chrome + metric scrubber. Spec: `registry/charts/PORT.md`
 * Installs to: components/charts/scatter-chart-with-cells.tsx
 */

export type ScatterChartWithCellsPoint = {
  /** Short legend / tooltip label. */
  name: string
  x: number
  y: number
}

export type ScatterChartWithCellsProps = {
  title?: string
  subtitle?: string
  data?: ScatterChartWithCellsPoint[]
  seriesLabel?: string
  xLabel?: string
  yLabel?: string
  className?: string
  /** Value-axis side / X reverse. Omit to follow page `dir`. */
  plotDir?: "ltr" | "rtl"
  /** Hover / touch / keyboard scrub. Default on. */
  scrub?: boolean
}

const NARROW_MQ = "(max-width: 639px)"
const ANIM_MS = 200
const AXIS_TICK_FILL =
  "color-mix(in oklab, var(--foreground) 58%, transparent)"
const SYMBOL_SIZE = 280

const SERIES_VARS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const

const SYMBOL_TYPES: ReadonlyArray<SymbolType> = [
  "circle",
  "diamond",
  "square",
  "triangle",
  "star",
  "cross",
]

type FlatPoint = ScatterChartWithCellsPoint & { id: string; index: number }

/** Campus sample — each point gets a unique chart token + symbol. */
const DEMO_DATA: ScatterChartWithCellsPoint[] = [
  { name: "Alpha", x: 158, y: 52 },
  { name: "Beta", x: 162, y: 68 },
  { name: "Gamma", x: 168, y: 58 },
  { name: "Delta", x: 174, y: 82 },
  { name: "Epsilon", x: 180, y: 74 },
  { name: "Zeta", x: 186, y: 94 },
]

const SCATTER_TOOLTIP_CURSOR = {
  stroke: "color-mix(in oklab, var(--foreground) 18%, transparent)",
  strokeWidth: 1,
  strokeDasharray: "4 4",
} as const

function seriesColor(index: number) {
  return SERIES_VARS[index % SERIES_VARS.length]!
}

function seriesSymbol(index: number): SymbolType {
  return SYMBOL_TYPES[index % SYMBOL_TYPES.length]!
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

function formatNumber(value: number, locale: string, digits = 0) {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value)
}

function withMeta(rows: ScatterChartWithCellsPoint[]): FlatPoint[] {
  return rows.map((p, i) => ({
    ...p,
    index: i,
    id: `${p.name}-${i}-${p.x}-${p.y}`,
  }))
}

function ScatterChartWithCells({
  title = "Per-point symbols",
  subtitle = "Each mark uses a chart token + symbol via shape (modern Cell pattern).",
  data = DEMO_DATA,
  seriesLabel = "Campus",
  xLabel = "Height (cm)",
  yLabel = "Weight (kg)",
  className,
  plotDir,
  scrub = true,
}: ScatterChartWithCellsProps) {
  const { dir, ref } = useChartDir()
  const plotRtl = (plotDir ?? dir) === "rtl"
  const narrow = useNarrowViewport()
  const reducedMotion = usePrefersReducedMotion()
  const chartAreaRef = React.useRef<HTMLDivElement>(null)
  const liveRef = React.useRef<HTMLParagraphElement>(null)
  const scrubbingRef = React.useRef(false)
  const locale = "en"

  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {
      sample: { label: seriesLabel },
    }
    data.forEach((row, index) => {
      config[row.name] = {
        label: row.name,
        color: seriesColor(index),
      }
    })
    return config
  }, [data, seriesLabel])

  const plotData = React.useMemo(() => withMeta(data), [data])
  const lastIndex = Math.max(0, plotData.length - 1)

  const [activeIndex, setActiveIndex] = React.useState(lastIndex)
  const [scrubbing, setScrubbing] = React.useState(false)
  const [dataTrack, setDataTrack] = React.useState({ plotData, lastIndex })
  if (dataTrack.plotData !== plotData || dataTrack.lastIndex !== lastIndex) {
    setDataTrack({ plotData, lastIndex })
    setActiveIndex(lastIndex)
    setScrubbing(false)
  }

  const liveScrubbing = scrub && scrubbing
  const liveIndex = liveScrubbing ? activeIndex : lastIndex
  const active = plotData[liveIndex] ?? plotData[lastIndex]
  const previous = liveIndex > 0 ? plotData[liveIndex - 1] : null
  const metricValue = active?.y ?? 0
  const prevValue = previous?.y ?? null
  const deltaPct =
    prevValue != null && prevValue !== 0
      ? ((metricValue - prevValue) / prevValue) * 100
      : null
  const deltaUp = deltaPct != null && deltaPct >= 0
  const caption =
    active != null
      ? `${active.name} · ${xLabel} ${formatNumber(active.x, locale)}`
      : ""

  const xDomain = React.useMemo(() => {
    const xs = plotData.map((p) => p.x)
    const min = Math.min(...xs)
    const max = Math.max(...xs)
    const pad = Math.max(2, (max - min) * 0.1)
    return [Math.floor(min - pad), Math.ceil(max + pad)] as [number, number]
  }, [plotData])

  const yDomain = React.useMemo(() => {
    const ys = plotData.map((p) => p.y)
    const min = Math.min(...ys)
    const max = Math.max(...ys)
    const pad = Math.max(4, (max - min) * 0.12)
    const lo = Math.max(0, Math.floor((min - pad) / 5) * 5)
    const hi = Math.ceil((max + pad) / 5) * 5
    return [lo, hi] as [number, number]
  }, [plotData])

  const announce = React.useCallback(
    (index: number) => {
      const point = plotData[index]
      if (!point || !liveRef.current) return
      liveRef.current.textContent = `${point.name}, ${xLabel} ${formatNumber(point.x, locale)}, ${yLabel} ${formatNumber(point.y, locale)}`
    },
    [locale, plotData, xLabel, yLabel]
  )

  const moveActive = React.useCallback(
    (next: number, fromKeyboard = false) => {
      const clamped = Math.min(lastIndex, Math.max(0, next))
      setActiveIndex(clamped)
      if (fromKeyboard) announce(clamped)
    },
    [announce, lastIndex]
  )

  const indexFromClientX = React.useCallback(
    (clientX: number) => {
      const el = chartAreaRef.current
      if (!el || plotData.length === 0) return lastIndex
      const rect = el.getBoundingClientRect()
      if (rect.width <= 0) return lastIndex
      let ratio = (clientX - rect.left) / rect.width
      if (plotRtl) ratio = 1 - ratio
      ratio = Math.min(1, Math.max(0, ratio))
      const [xMin, xMax] = xDomain
      const xVal = xMin + ratio * (xMax - xMin)
      let best = 0
      let bestDist = Infinity
      plotData.forEach((p, i) => {
        const d = Math.abs(p.x - xVal)
        if (d < bestDist) {
          bestDist = d
          best = i
        }
      })
      return best
    },
    [lastIndex, plotData, plotRtl, xDomain]
  )

  const onChartMouseMove = React.useCallback(
    (
      _state: unknown,
      event: React.MouseEvent<SVGGraphicsElement>
    ) => {
      if (!scrub) return
      scrubbingRef.current = true
      setScrubbing(true)
      setActiveIndex(indexFromClientX(event.clientX))
    },
    [indexFromClientX, scrub]
  )

  const onChartMouseLeave = React.useCallback(() => {
    if (!scrub) return
    scrubbingRef.current = false
    setScrubbing(false)
    setActiveIndex(lastIndex)
  }, [lastIndex, scrub])

  React.useEffect(() => {
    const el = chartAreaRef.current
    if (!el || !scrub) return

    const onStart = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      scrubbingRef.current = true
      setScrubbing(true)
      setActiveIndex(indexFromClientX(t.clientX))
    }

    const onMove = (e: TouchEvent) => {
      if (!scrubbingRef.current) return
      const t = e.touches[0]
      if (!t) return
      e.preventDefault()
      setActiveIndex(indexFromClientX(t.clientX))
    }

    const onEnd = () => {
      scrubbingRef.current = false
      setScrubbing(false)
      setActiveIndex(lastIndex)
    }

    el.addEventListener("touchstart", onStart, { passive: true })
    el.addEventListener("touchmove", onMove, { passive: false })
    el.addEventListener("touchend", onEnd)
    el.addEventListener("touchcancel", onEnd)
    return () => {
      el.removeEventListener("touchstart", onStart)
      el.removeEventListener("touchmove", onMove)
      el.removeEventListener("touchend", onEnd)
      el.removeEventListener("touchcancel", onEnd)
    }
  }, [indexFromClientX, lastIndex, scrub])

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!scrub) return
      const reverse = plotRtl
      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault()
          scrubbingRef.current = true
          setScrubbing(true)
          moveActive(activeIndex + (reverse ? 1 : -1), true)
          break
        case "ArrowRight":
          event.preventDefault()
          scrubbingRef.current = true
          setScrubbing(true)
          moveActive(activeIndex + (reverse ? -1 : 1), true)
          break
        case "Home":
          event.preventDefault()
          scrubbingRef.current = true
          setScrubbing(true)
          moveActive(reverse ? lastIndex : 0, true)
          break
        case "End":
          event.preventDefault()
          scrubbingRef.current = true
          setScrubbing(true)
          moveActive(reverse ? 0 : lastIndex, true)
          break
        case "Escape":
          event.preventDefault()
          scrubbingRef.current = false
          setScrubbing(false)
          moveActive(lastIndex, true)
          break
        default:
          break
      }
    },
    [activeIndex, lastIndex, moveActive, plotRtl, scrub]
  )

  const ariaLabel = React.useMemo(() => {
    if (!active) return title
    return `Scatter chart with cells, ${title}, ${caption}, ${yLabel} ${formatNumber(metricValue, locale)}`
  }, [active, caption, locale, metricValue, title, yLabel])

  const renderSymbol = React.useCallback(
    (props: ScatterShapeProps) => {
      const point = props.payload as FlatPoint | undefined
      const index =
        typeof props.index === "number"
          ? props.index
          : (point?.index ?? 0)
      const isActive =
        !liveScrubbing ||
        !active ||
        (point != null && point.id === active.id)
      const size = isActive && liveScrubbing ? SYMBOL_SIZE * 1.15 : SYMBOL_SIZE
      return (
        <g
          opacity={isActive ? 1 : 0.28}
          style={{ cursor: scrub ? "pointer" : undefined }}
          className={cn(
            !reducedMotion && "transition-opacity duration-200 ease-out"
          )}
        >
          <Symbols
            {...props}
            size={size}
            fill={seriesColor(index)}
            type={seriesSymbol(index)}
          />
        </g>
      )
    },
    [active, liveScrubbing, reducedMotion, scrub]
  )

  return (
    <div
      ref={ref}
      className={cn(
        "mx-auto flex w-full min-w-0 max-w-[640px] flex-col gap-5 font-sans tabular-nums sm:gap-6",
        className
      )}
    >
      <header className="flex flex-col gap-4">
        <div className="space-y-1">
          <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>

        <div className="space-y-1">
          <div className="flex flex-wrap items-baseline gap-2">
            <p
              className="text-[2rem] font-semibold leading-9 tracking-tight text-foreground"
              aria-hidden
            >
              {formatNumber(metricValue, locale)}
            </p>
            {deltaPct != null ? (
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium tabular-nums",
                  deltaUp ? "text-[var(--chart-up)]" : "text-destructive"
                )}
                style={{
                  backgroundColor: deltaUp
                    ? "color-mix(in oklab, var(--chart-up) 12%, transparent)"
                    : "color-mix(in oklab, var(--destructive) 12%, transparent)",
                }}
              >
                <span aria-hidden>{deltaUp ? "▲" : "▼"}</span>
                {Math.abs(deltaPct).toFixed(1)}%
                <span className="font-normal text-muted-foreground">
                  vs previous
                </span>
              </span>
            ) : (
              <span className="text-xs text-muted-foreground">—</span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{caption}</p>
        </div>
      </header>

      <p ref={liveRef} className="sr-only" aria-live="polite" />

      <div
        ref={chartAreaRef}
        dir="ltr"
        role="img"
        aria-label={ariaLabel}
        tabIndex={scrub ? 0 : undefined}
        onKeyDown={scrub ? onKeyDown : undefined}
        onBlur={
          scrub
            ? () => {
                scrubbingRef.current = false
                setScrubbing(false)
                setActiveIndex(lastIndex)
              }
            : undefined
        }
        className="touch-pan-y rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <ChartContainer
          config={chartConfig}
          className={cn(chartLineContainerClassName, "max-w-none")}
        >
          <RechartsScatterChart
            accessibilityLayer
            margin={
              narrow
                ? {
                    top: 16,
                    right: plotRtl ? 8 : 12,
                    left: plotRtl ? 12 : 8,
                    bottom: 36,
                  }
                : { top: 20, right: 16, left: 8, bottom: 40 }
            }
            onMouseMove={scrub ? onChartMouseMove : undefined}
            onMouseLeave={scrub ? onChartMouseLeave : undefined}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="4 4"
              stroke="var(--border)"
              strokeOpacity={0.4}
            />
            <XAxis
              type="number"
              dataKey="x"
              name={xLabel}
              reversed={plotRtl}
              domain={xDomain}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{
                fontSize: 12,
                fill: AXIS_TICK_FILL,
              }}
              tickFormatter={(value: number) => formatNumber(value, locale)}
              label={{
                value: xLabel,
                position: "bottom",
                offset: 16,
                style: {
                  fontSize: 11,
                  fill: "var(--muted-foreground)",
                  fontFamily: "var(--font-sans)",
                },
              }}
              className="tabular-nums"
            />
            <YAxis
              type="number"
              dataKey="y"
              name={yLabel}
              orientation={plotRtl ? "right" : "left"}
              width={narrow ? 36 : 44}
              domain={yDomain}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{
                fontSize: 12,
                fill: AXIS_TICK_FILL,
              }}
              tickFormatter={(value: number) => formatNumber(value, locale)}
              className="tabular-nums"
            />
            <ChartTooltip
              shared={false}
              cursor={SCATTER_TOOLTIP_CURSOR}
              content={
                <ChartTooltipContent
                  className="rounded-xl border-border/60 shadow-sm"
                  labelFormatter={(_, payload) => {
                    const row = payload?.[0]?.payload as
                      | FlatPoint
                      | undefined
                    if (!row) return ""
                    return `${row.name} · ${xLabel} ${formatNumber(row.x, locale)}`
                  }}
                  formatter={(_value, _name, item, index) => {
                    if (item?.dataKey != null && item.dataKey !== "y") return null
                    if (item?.dataKey == null && index !== 0) return null
                    const row = item?.payload as FlatPoint | undefined
                    if (!row) return null
                    const color = seriesColor(row.index)
                    return (
                      <div className="flex w-full min-w-[8rem] items-center gap-2">
                        <span
                          className="size-2.5 shrink-0 rounded-[2px]"
                          style={{ background: color }}
                          aria-hidden
                        />
                        <div className="flex flex-1 items-center justify-between gap-4 leading-none">
                          <span className="text-muted-foreground">{yLabel}</span>
                          <span className="font-medium tabular-nums text-foreground">
                            {formatNumber(row.y, locale)}
                          </span>
                        </div>
                      </div>
                    )
                  }}
                />
              }
            />
            <Scatter
              name="sample"
              data={plotData}
              fill="var(--chart-1)"
              stroke="none"
              isAnimationActive={!reducedMotion && !liveScrubbing}
              animationDuration={reducedMotion ? 0 : ANIM_MS}
              animationEasing="ease-out"
              shape={renderSymbol}
            />
          </RechartsScatterChart>
        </ChartContainer>
      </div>

      <ul className="mx-auto flex max-w-[420px] flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        {plotData.map((row) => (
          <li key={row.id} className="inline-flex items-center gap-1.5">
            <span
              className="size-2.5 shrink-0 rounded-[2px]"
              style={{ backgroundColor: seriesColor(row.index) }}
              aria-hidden
            />
            <span className="text-foreground">{row.name}</span>
          </li>
        ))}
      </ul>

      <table className="sr-only">
        <caption>
          {title}. {subtitle}
        </caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>{xLabel}</th>
            <th>{yLabel}</th>
          </tr>
        </thead>
        <tbody>
          {plotData.map((row) => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.x}</td>
              <td>{row.y}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Docs / gallery default export. */
export default function ScatterChartWithCellsDemo(
  props: ScatterChartWithCellsProps
) {
  return <ScatterChartWithCells {...props} />
}

export { ScatterChartWithCells }
