"use client"

import * as React from "react"
import type { SunburstData } from "recharts"

import { cn } from "@/lib/utils"

/** Theme-aware series tokens (light/dark via registry cssVars + globals). */
export const SERIES_VARS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const

/** On-fill arc labels — light ink on series fills (PORT on-fill rule). */
export const SUNBURST_LABEL_INK = "#ffffff"

function nestMix(base: string, percentTowardWhite: number) {
  const pct = Math.min(95, Math.max(35, Math.round(percentTowardWhite)))
  return `color-mix(in oklab, ${base} ${pct}%, white)`
}

/**
 * Solid branch colors — children lighten toward white via `color-mix`.
 * Base tokens are CSS vars so fills track light/dark `--chart-*`.
 */
export function colorizeTree(
  nodes: NonNullable<SunburstData["children"]>,
  palette: readonly string[] = SERIES_VARS
): NonNullable<SunburstData["children"]> {
  return nodes.map((node, i) => {
    const base = palette[i % palette.length]!
    return {
      ...node,
      fill: base,
      children: node.children?.map((child, j) => ({
        ...child,
        fill: nestMix(base, 88 - j * 12),
        children: child.children?.map((grand, k) => ({
          ...grand,
          fill: nestMix(base, 72 - k * 10),
        })),
      })),
    }
  })
}

/** Same DFS order as Recharts SunburstChart.drawArcs. */
export function flattenSunburstNames(
  nodes: NonNullable<SunburstData["children"]>
): string[] {
  const names: string[] = []
  const walk = (list: NonNullable<SunburstData["children"]>) => {
    for (const node of list) {
      names.push(String(node.name ?? ""))
      if (node.children?.length) walk(node.children)
    }
  }
  walk(nodes)
  return names
}

export type FlatSunburstNode = {
  name: string
  value: number
  fill?: string
}

/** DFS flatten for keyboard / metric scrub (same order as drawArcs). */
export function flattenSunburstNodes(
  nodes: NonNullable<SunburstData["children"]>
): FlatSunburstNode[] {
  const out: FlatSunburstNode[] = []
  const walk = (list: NonNullable<SunburstData["children"]>) => {
    for (const node of list) {
      out.push({
        name: String(node.name ?? ""),
        value: Number(node.value ?? 0),
        fill: typeof node.fill === "string" ? node.fill : undefined,
      })
      if (node.children?.length) walk(node.children)
    }
  }
  walk(nodes)
  return out
}

/** Simple labels on arcs — no outline stroke. */
export const sunburstTextOptions = {
  fontFamily: "var(--font-sono-sans), var(--font-sans)",
  fontWeight: 600,
  fontSize: "10px",
  stroke: "none",
  fill: SUNBURST_LABEL_INK,
  pointerEvents: "none" as const,
  letterSpacing: "0",
}

/** Truncate a label so it fits on a sector. */
export function shortenSunburstLabel(name: string, maxChars = 9) {
  const t = name.trim()
  if (t.length <= maxChars) return t
  return `${t.slice(0, Math.max(1, maxChars - 1))}…`
}

export type SunburstActive = {
  name: string
  value: number
  fill?: string
} | null

type SunburstTooltipPayloadItem = {
  name?: unknown
  value?: unknown
  color?: string
  payload?: Record<string, unknown>
}

/**
 * Sunburst tooltip — name + value + fill swatch.
 * Pass `dir` from `useChartDir()` (plot island is `dir="ltr"`).
 */
export function SunburstTooltipContent({
  active,
  payload,
  className,
  locale = "en",
  dir = "ltr",
  formatValue,
}: {
  active?: boolean
  payload?: ReadonlyArray<SunburstTooltipPayloadItem>
  className?: string
  locale?: string
  dir?: "ltr" | "rtl"
  formatValue?: (value: number, locale: string) => string
}) {
  if (!active || !payload?.length) return null

  const item = payload[0]
  const raw = item?.payload
  const name = String(raw?.name ?? item?.name ?? "")
  const num = Number(raw?.value ?? item?.value)
  if (!name || !Number.isFinite(num)) return null

  const color =
    (typeof raw?.fill === "string" ? raw.fill : undefined) ?? item?.color
  const display =
    formatValue?.(num, locale) ??
    new Intl.NumberFormat(locale).format(Math.round(num))

  return (
    <div
      dir={dir}
      className={cn(
        "pointer-events-none grid min-w-[9rem] items-start gap-1.5 rounded-md border border-border bg-background px-2.5 py-2 text-xs shadow-sm",
        className
      )}
    >
      <div className="flex w-full items-center gap-2">
        {color ? (
          <span
            className="size-2.5 shrink-0 rounded-[2px]"
            style={{ background: color }}
            aria-hidden
          />
        ) : null}
        <div className="flex flex-1 items-center justify-between gap-4 leading-none">
          <span className="text-muted-foreground">{name}</span>
          <span className="font-medium tabular-nums text-foreground">
            {display}
          </span>
        </div>
      </div>
    </div>
  )
}

/**
 * Recharts hardcodes dataKey values as label text.
 * Swap them for node names after paint (order matches drawArcs).
 */
export function SunburstNameLabels({
  names,
  children,
  className,
}: {
  names: string[]
  children: React.ReactNode
  className?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    const root = ref.current
    if (!root) return

    const apply = () => {
      const svg = root.querySelector("svg")
      const svgW = svg?.clientWidth || 400
      const maxLabelPx = svgW * 0.16
      const texts = root.querySelectorAll(".recharts-sunburst g > text")
      texts.forEach((el, i) => {
        const node = el as SVGTextElement
        const raw = names[i]
        if (!raw) return
        let next = shortenSunburstLabel(raw, 10)
        if (node.textContent !== next) node.textContent = next
        node.style.letterSpacing = "0"
        try {
          let w = node.getBBox().width
          if (w > maxLabelPx) {
            next = shortenSunburstLabel(raw, 7)
            node.textContent = next
            w = node.getBBox().width
          }
          if (w > maxLabelPx) {
            node.style.opacity = "0"
            node.setAttribute("aria-hidden", "true")
          } else {
            node.style.opacity = "1"
            node.removeAttribute("aria-hidden")
          }
        } catch {
          /* getBBox before layout may throw */
        }
      })
    }

    apply()
    const observer = new MutationObserver(() => {
      requestAnimationFrame(apply)
    })
    observer.observe(root, {
      childList: true,
      subtree: true,
      characterData: true,
    })
    return () => observer.disconnect()
  }, [names])

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      {children}
    </div>
  )
}

/** Center hole disc — name + value (+ optional unit). Pass page `dir`. */
export function SunburstCenter({
  active,
  total,
  totalLabel,
  unit,
  formatValue,
  dir = "ltr",
  className,
}: {
  active: SunburstActive
  total: number
  totalLabel: string
  unit?: string
  formatValue: (value: number) => string
  dir?: "ltr" | "rtl"
  className?: string
}) {
  const title = active?.name ?? totalLabel
  const value = active?.value ?? total
  const accent = active?.fill

  return (
    <div
      dir={dir}
      className={cn(
        "pointer-events-none absolute inset-0 flex items-center justify-center",
        className
      )}
    >
      <div className="flex size-[34%] min-w-[6.5rem] flex-col items-center justify-center rounded-full border border-border/80 bg-background/95 px-2.5 text-center shadow-sm">
        <span className="line-clamp-2 max-w-full truncate text-[10px] leading-tight text-muted-foreground">
          {title}
        </span>
        <span
          className="mt-0.5 text-xl font-bold leading-none tabular-nums tracking-tight"
          style={{
            color: accent || "var(--foreground)",
          }}
        >
          {formatValue(value)}
        </span>
        {unit ? (
          <span className="mt-0.5 text-[10px] text-muted-foreground">{unit}</span>
        ) : null}
      </div>
    </div>
  )
}
