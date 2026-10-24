"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import {
  ChartGauge,
  GAUGE_NEEDLE,
  GAUGE_TRAFFIC_LABELS,
  formatGaugeMetric,
} from "../_lib/gauge-shared"
import { useChartDir } from "../_lib/use-chart-dir"

/**
 * Gauge Default — vivid emerald / amber / rose traffic bands.
 * Default library needle; light + dark via scoped CSS vars (no remount).
 * Spec: `registry/charts/PORT.md`
 * Installs to: components/charts/gauge-default.tsx
 */

export type GaugeDefaultProps = {
  title?: string
  subtitle?: string
  /** Needle position 0–1. Default 0.66 (library default). */
  percent?: number
  className?: string
}

const DEMO_PERCENT = 0.66

/** Vivid traffic — deeper on light, luminous on dark. */
const BAND_THEME = {
  light: {
    low: "#10B981",
    mid: "#F59E0B",
    high: "#F43F5E",
  },
  dark: {
    low: "#34D399",
    mid: "#FBBF24",
    high: "#FB7185",
  },
} as const

/** Stable reference — new `colors={[...]}` each render re-inits react-gauge-chart. */
const BAND_COLORS: string[] = [
  "var(--gauge-band-1)",
  "var(--gauge-band-2)",
  "var(--gauge-band-3)",
]

const GAUGE_STAGE_ID = "gauge-default"

function GaugeDefault({
  title = "Score gauge",
  subtitle = "Vivid traffic bands — emerald / amber / rose on a fixed stage.",
  percent = DEMO_PERCENT,
  className,
}: GaugeDefaultProps) {
  const { ref } = useChartDir()
  const locale = "en"
  const metric = formatGaugeMetric(percent, locale)

  return (
    <div
      ref={ref}
      data-gauge={GAUGE_STAGE_ID}
      className={cn(
        "mx-auto flex w-full min-w-0 max-w-[640px] flex-col gap-5 font-sans tabular-nums sm:gap-6",
        className
      )}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
[data-gauge="${GAUGE_STAGE_ID}"] {
  --gauge-band-1: ${BAND_THEME.light.low};
  --gauge-band-2: ${BAND_THEME.light.mid};
  --gauge-band-3: ${BAND_THEME.light.high};
}
.dark [data-gauge="${GAUGE_STAGE_ID}"] {
  --gauge-band-1: ${BAND_THEME.dark.low};
  --gauge-band-2: ${BAND_THEME.dark.mid};
  --gauge-band-3: ${BAND_THEME.dark.high};
}
`,
        }}
      />

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
              {metric}
            </p>
            <span className="text-xs text-muted-foreground">of 100</span>
          </div>
          <p className="text-xs text-muted-foreground">Score</p>
        </div>
      </header>

      <div
        dir="ltr"
        role="img"
        aria-label={`Gauge chart, ${title}, ${metric}`}
        className="touch-pan-y rounded-lg"
      >
        <ChartGauge
          id={GAUGE_STAGE_ID}
          colors={BAND_COLORS}
          percent={percent}
          needleColor={GAUGE_NEEDLE}
          needleBaseColor={GAUGE_NEEDLE}
        />
      </div>

      <ul className="mx-auto flex max-w-[420px] flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        {GAUGE_TRAFFIC_LABELS.map((label, index) => (
          <li key={label} className="inline-flex items-center gap-1.5">
            <span
              className="size-2 shrink-0 rounded-full"
              style={{ backgroundColor: BAND_COLORS[index] }}
              aria-hidden
            />
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function GaugeDefaultDemo(props: GaugeDefaultProps) {
  return <GaugeDefault {...props} />
}

export { GaugeDefault }
