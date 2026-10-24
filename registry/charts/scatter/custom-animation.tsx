"use client"

import * as React from "react"
import {
  CartesianGrid,
  Scatter,
  ScatterChart as RechartsScatterChart,
  XAxis,
  YAxis,
  ZAxis,
  type AnimationInterpolateFn,
  type CartesianLayout,
  type ScatterPointItem,
} from "recharts"

import { cn } from "@/lib/utils"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

import {
  CHART_SERIES_A,
  chartLineContainerClassName,
} from "../_lib/chart-styles"
import { useChartDir } from "../_lib/use-chart-dir"
import { usePrefersReducedMotion } from "../_lib/use-prefers-reduced-motion"

/**
 * Custom Animation — scatter dataset swap with `animationInterpolateFn` (Recharts ≥3.9).
 * Teaching delta: crossfade / staggered / pop between two point clouds.
 * Locked chrome + metric scrubber. Spec: `registry/charts/PORT.md`
 * Installs to: components/charts/custom-animation.tsx
 */

export type CustomAnimationPoint = {
  x: number
  y: number
  z: number
}

export type CustomAnimationStyle = "crossfade" | "staggered" | "pop"

export type CustomAnimationProps = {
  title?: string
  subtitle?: string
  /** Dataset A (default). */
  dataA?: CustomAnimationPoint[]
  /** Dataset B (swap target). */
  dataB?: CustomAnimationPoint[]
  seriesLabel?: string
  xLabel?: string
  yLabel?: string
  zLabel?: string
  /** Crossfade style. Default `crossfade`. */
  animationStyle?: CustomAnimationStyle
  /** Tween length in ms. Default 1200. */
  animationDuration?: number
  className?: string
  /** Value-axis side / X reverse. Omit to follow page `dir`. */
  plotDir?: "ltr" | "rtl"
  /** Hover / touch / keyboard scrub. Default on. */
  scrub?: boolean
}

const NARROW_MQ = "(max-width: 639px)"
const DEFAULT_ANIM_MS = 1200
const AXIS_TICK_FILL =
  "color-mix(in oklab, var(--foreground) 58%, transparent)"
const Z_RANGE: [number, number] = [64, 280]

type AnimatedScatterPoint = ScatterPointItem & { opacity?: number }

type FlatPoint = CustomAnimationPoint & { id: string }

/** Morning sample — denser mid-range. */
const DEMO_A: CustomAnimationPoint[] = [
  { x: 155, y: 54, z: 90 },
  { x: 160, y: 60, z: 140 },
  { x: 164, y: 66, z: 110 },
  { x: 169, y: 71, z: 200 },
  { x: 173, y: 76, z: 160 },
  { x: 178, y: 81, z: 240 },
  { x: 182, y: 86, z: 180 },
  { x: 186, y: 91, z: 260 },
  { x: 190, y: 96, z: 210 },
  { x: 194, y: 100, z: 300 },
]

/** Afternoon sample — shifted up/right. */
const DEMO_B: CustomAnimationPoint[] = [
  { x: 158, y: 62, z: 120 },
  { x: 163, y: 68, z: 170 },
  { x: 167, y: 74, z: 130 },
  { x: 172, y: 79, z: 230 },
  { x: 176, y: 84, z: 190 },
  { x: 181, y: 89, z: 280 },
  { x: 185, y: 94, z: 220 },
  { x: 189, y: 99, z: 310 },
  { x: 193, y: 104, z: 250 },
  { x: 198, y: 108, z: 340 },
]

const ANIM_STYLE_OPTIONS: {
  id: CustomAnimationStyle
  label: string
}[] = [
  { id: "crossfade", label: "Crossfade" },
  { id: "staggered", label: "Staggered" },
  { id: "pop", label: "Pop" },
]

const SCATTER_TOOLTIP_CURSOR = {
  stroke: "color-mix(in oklab, var(--foreground) 18%, transparent)",
  strokeWidth: 1,
  strokeDasharray: "4 4",
} as const

const crossfade: AnimationInterpolateFn<ScatterPointItem, CartesianLayout> = (
  items,
  t
) => {
  if (items == null) return []
  if (t === 1) {
    return items.flatMap((item) =>
      item.status === "removed" ? [] : [item.next]
    )
  }
  const result: AnimatedScatterPoint[] = []
  for (const item of items) {
    if (item.status === "matched") {
      result.push({ ...item.prev, opacity: 1 - t })
      result.push({ ...item.next, opacity: t })
    } else if (item.status === "added") {
      result.push({ ...item.next, opacity: t })
    } else {
      result.push({ ...item.prev, opacity: 1 - t })
    }
  }
  return result
}

const staggeredCrossfade: AnimationInterpolateFn<
  ScatterPointItem,
  CartesianLayout
> = (items, t) => {
  if (items == null) return []
  if (t === 1) {
    return items.flatMap((item) =>
      item.status === "removed" ? [] : [item.next]
    )
  }
  const count = items.length || 1
  const result: AnimatedScatterPoint[] = []
  items.forEach((item, index) => {
    if (item.status === "matched" || item.status === "added") {
      const delay = index / count
      const progress = Math.max(0, Math.min(1, (t - delay) / (1 - delay || 1)))
      result.push({ ...item.next, opacity: progress })
    }
    if (item.status === "matched" || item.status === "removed") {
      const reverseIndex = count - 1 - index
      const delay = reverseIndex / count
      const progress = Math.max(0, Math.min(1, (t - delay) / (1 - delay || 1)))
      result.push({ ...item.prev, opacity: 1 - progress })
    }
  })
  return result
}

const popCrossfade: AnimationInterpolateFn<ScatterPointItem, CartesianLayout> = (
  items,
  t
) => {
  if (items == null) return []
  if (t === 1) {
    return items.flatMap((item) =>
      item.status === "removed" ? [] : [item.next]
    )
  }
  const result: AnimatedScatterPoint[] = []
  for (const item of items) {
    if (item.status === "matched" || item.status === "added") {
      const { next } = item
      result.push({
        ...next,
        opacity: t,
        size: next.size * t * t,
      })
    }
    if (item.status === "matched" || item.status === "removed") {
      const { prev } = item
      result.push({
        ...prev,
        opacity: 1 - t,
        size: prev.size * (1 - t) * (1 - t),
      })
    }
  }
  return result
}

const ANIM_FNS: Record<
  CustomAnimationStyle,
  AnimationInterpolateFn<ScatterPointItem, CartesianLayout>
> = {
  crossfade,
  staggered: staggeredCrossfade,
  pop: popCrossfade,
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

function withIds(rows: CustomAnimationPoint[], prefix: string): FlatPoint[] {
  return rows.map((p, i) => ({
    ...p,
    id: `${prefix}-${i}-${p.x}-${p.y}-${p.z}`,
  }))
}

function CustomAnimation({
  title = "Custom scatter animation",
  subtitle = "Swap datasets — crossfade, staggered, or pop via animationInterpolateFn.",
  dataA = DEMO_A,
  dataB = DEMO_B,
  seriesLabel = "Sample",
  xLabel = "Height (cm)",
  yLabel = "Weight (kg)",
  zLabel = "Score",
  animationStyle: animationStyleProp = "crossfade",
  animationDuration = DEFAULT_ANIM_MS,
  className,
  plotDir,
  scrub = true,
}: CustomAnimationProps) {
  const { dir, ref } = useChartDir()
  const plotRtl = (plotDir ?? dir) === "rtl"
  const narrow = useNarrowViewport()
  const reducedMotion = usePrefersReducedMotion()
  const chartAreaRef = React.useRef<HTMLDivElement>(null)
  const liveRef = React.useRef<HTMLParagraphElement>(null)
  const scrubbingRef = React.useRef(false)
  const locale = "en"

  const [datasetKey, setDatasetKey] = React.useState<"a" | "b">("a")
  const [animStyle, setAnimStyle] =
    React.useState<CustomAnimationStyle>(animationStyleProp)
  const [styleTrack, setStyleTrack] = React.useState(animationStyleProp)
  if (styleTrack !== animationStyleProp) {
    setStyleTrack(animationStyleProp)
    setAnimStyle(animationStyleProp)
  }

  const chartConfig = React.useMemo(
    () =>
      ({
        sample: { label: seriesLabel, color: CHART_SERIES_A },
        z: { label: zLabel },
      }) satisfies ChartConfig,
    [seriesLabel, zLabel]
  )

  const plotData = React.useMemo(
    () => withIds(datasetKey === "a" ? dataA : dataB, datasetKey),
    [dataA, dataB, datasetKey]
  )
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
  const metricValue = active?.z ?? 0
  const prevValue = previous?.z ?? null
  const deltaPct =
    prevValue != null && prevValue !== 0
      ? ((metricValue - prevValue) / prevValue) * 100
      : null
  const deltaUp = deltaPct != null && deltaPct >= 0
  const caption =
    active != null
      ? `${datasetKey === "a" ? "Set A" : "Set B"} · ${xLabel} ${formatNumber(active.x, locale)} · ${yLabel} ${formatNumber(active.y, locale)}`
      : ""

  const xDomain = React.useMemo(() => {
    const xs = [...dataA, ...dataB].map((p) => p.x)
    const min = Math.min(...xs)
    const max = Math.max(...xs)
    const pad = Math.max(2, (max - min) * 0.08)
    return [Math.floor(min - pad), Math.ceil(max + pad)] as [number, number]
  }, [dataA, dataB])

  const yDomain = React.useMemo(() => {
    const ys = [...dataA, ...dataB].map((p) => p.y)
    const min = Math.min(...ys)
    const max = Math.max(...ys)
    const pad = Math.max(4, (max - min) * 0.1)
    const lo = Math.max(0, Math.floor((min - pad) / 5) * 5)
    const hi = Math.ceil((max + pad) / 5) * 5
    return [lo, hi] as [number, number]
  }, [dataA, dataB])

  const zDomain = React.useMemo(() => {
    const zs = [...dataA, ...dataB].map((p) => p.z)
    return [0, Math.max(...zs, 1)] as [number, number]
  }, [dataA, dataB])

  const animMs = reducedMotion ? 0 : animationDuration
  const interpolateFn = ANIM_FNS[animStyle]

  const announce = React.useCallback(
    (index: number) => {
      const point = plotData[index]
      if (!point || !liveRef.current) return
      liveRef.current.textContent = `${seriesLabel}, ${xLabel} ${formatNumber(point.x, locale)}, ${yLabel} ${formatNumber(point.y, locale)}, ${zLabel} ${formatNumber(point.z, locale)}`
    },
    [locale, plotData, seriesLabel, xLabel, yLabel, zLabel]
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
    return `Custom animation scatter, ${title}, ${caption}, ${zLabel} ${formatNumber(metricValue, locale)}`
  }, [active, caption, locale, metricValue, title, zLabel])

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

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setDatasetKey((k) => (k === "a" ? "b" : "a"))}
            className="inline-flex h-8 cursor-pointer items-center rounded-md border border-border bg-background px-2.5 text-sm font-medium text-foreground shadow-xs outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
          >
            Swap dataset ({datasetKey === "a" ? "A → B" : "B → A"})
          </button>
        </div>
        <div
          role="group"
          aria-label="Animation style"
          className="flex flex-wrap gap-1.5"
        >
          {ANIM_STYLE_OPTIONS.map((opt) => {
            const pressed = animStyle === opt.id
            return (
              <button
                key={opt.id}
                type="button"
                aria-pressed={pressed}
                onClick={() => setAnimStyle(opt.id)}
                className={cn(
                  "inline-flex h-7 cursor-pointer items-center rounded-md px-2.5 text-xs font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  pressed
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      </div>

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
            <ZAxis
              type="number"
              dataKey="z"
              name={zLabel}
              domain={zDomain}
              range={Z_RANGE}
            />
            <ChartTooltip
              shared={false}
              cursor={SCATTER_TOOLTIP_CURSOR}
              content={
                <ChartTooltipContent
                  className="rounded-xl border-border/60 shadow-sm"
                  labelFormatter={(_, payload) => {
                    const row = payload?.[0]?.payload as
                      | CustomAnimationPoint
                      | undefined
                    if (!row) return ""
                    return `${xLabel} ${formatNumber(row.x, locale)}`
                  }}
                  formatter={(_value, _name, item, index) => {
                    if (item?.dataKey != null && item.dataKey !== "y") return null
                    if (item?.dataKey == null && index !== 0) return null
                    const row = item?.payload as CustomAnimationPoint | undefined
                    if (!row) return null
                    return (
                      <div className="flex w-full min-w-[9rem] flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <span
                            className="size-2.5 shrink-0 rounded-full"
                            style={{ background: CHART_SERIES_A }}
                            aria-hidden
                          />
                          <span className="text-muted-foreground">
                            {seriesLabel}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4 leading-none">
                          <span className="text-muted-foreground">{yLabel}</span>
                          <span className="font-medium tabular-nums text-foreground">
                            {formatNumber(row.y, locale)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4 leading-none">
                          <span className="text-muted-foreground">{zLabel}</span>
                          <span className="font-medium tabular-nums text-foreground">
                            {formatNumber(row.z, locale)}
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
              fill="var(--color-sample)"
              stroke="none"
              isAnimationActive={!reducedMotion && !liveScrubbing}
              animationDuration={animMs}
              animationEasing="ease-out"
              animationInterpolateFn={
                reducedMotion || liveScrubbing ? undefined : interpolateFn
              }
              shape={(props) => {
                const point = props as AnimatedScatterPoint
                if (
                  point.cx == null ||
                  point.cy == null ||
                  !Number.isFinite(point.cx) ||
                  !Number.isFinite(point.cy)
                ) {
                  return null
                }
                const opacity = point.opacity ?? 1
                const baseR = Math.max(4, (point.width ?? 10) / 2)
                const payload = point.payload as FlatPoint | undefined
                const isActive =
                  liveScrubbing &&
                  active &&
                  payload != null &&
                  payload.id === active.id
                const dim =
                  liveScrubbing && active && !isActive ? 0.28 : 0.78
                return (
                  <circle
                    cx={point.cx}
                    cy={point.cy}
                    r={baseR * (isActive ? 1.1 : 1)}
                    fill="var(--color-sample)"
                    fillOpacity={dim * opacity}
                    stroke="var(--background)"
                    strokeWidth={1}
                    style={{ cursor: scrub ? "pointer" : undefined }}
                  />
                )
              }}
            />
          </RechartsScatterChart>
        </ChartContainer>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span
            className="size-2.5 shrink-0 rounded-full opacity-80"
            style={{ backgroundColor: CHART_SERIES_A }}
            aria-hidden
          />
          <span className="text-foreground">{seriesLabel}</span>
        </div>
        <span>Bubble size = {zLabel.toLowerCase()}</span>
        <span>
          Style:{" "}
          {ANIM_STYLE_OPTIONS.find((o) => o.id === animStyle)?.label ??
            animStyle}
        </span>
      </div>

      <table className="sr-only">
        <caption>
          {title}. {subtitle}
        </caption>
        <thead>
          <tr>
            <th>{xLabel}</th>
            <th>{yLabel}</th>
            <th>{zLabel}</th>
          </tr>
        </thead>
        <tbody>
          {plotData.map((row) => (
            <tr key={row.id}>
              <td>{row.x}</td>
              <td>{row.y}</td>
              <td>{row.z}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Docs / gallery default export. */
export default function CustomAnimationDemo(props: CustomAnimationProps) {
  return <CustomAnimation {...props} />
}

export { CustomAnimation }
