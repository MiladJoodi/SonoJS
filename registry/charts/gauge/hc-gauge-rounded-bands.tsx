"use client"

import * as React from "react"
import type { Options } from "highcharts"

import { cn } from "@/lib/utils"

import {
  ChartHighchartsGauge,
  hcNum,
  hcTooltipValue,
} from "../_lib/hc-gauge-shared"
import { useChartDir } from "../_lib/use-chart-dir"

/**
 * Hc Gauge Rounded Bands — dial with individually rounded plotBands.
 * Distinct teal / amber / rose scale (light + dark); locked header chrome.
 * Spec: `registry/charts/PORT.md`
 * Installs to: components/charts/hc-gauge-rounded-bands.tsx
 */

export type HcGaugeRoundedBandsProps = {
  title?: string
  subtitle?: string
  /** Needle value 0–100. Default 55. */
  value?: number
  className?: string
}

const DEMO_VALUE = 55

const GAUGE_STAGE_ID = "hc-gauge-rounded-bands"

/** Clear hue steps — not three near-identical blues. */
const BAND_THEME = {
  light: {
    low: "#0D9488",
    mid: "#D97706",
    high: "#E11D48",
  },
  dark: {
    low: "#2DD4BF",
    mid: "#FBBF24",
    high: "#FB7185",
  },
} as const

const BANDS = [
  { from: 0, to: 50, color: "var(--gauge-band-1)", label: "0–50" },
  { from: 50, to: 75, color: "var(--gauge-band-2)", label: "50–75" },
  { from: 75, to: 100, color: "var(--gauge-band-3)", label: "75–100" },
] as const

function buildOptions(value: number): Options {
  return {
    chart: { type: "gauge" },
    pane: {
      startAngle: -150,
      endAngle: 150,
      background: undefined,
      borderRadius: "25%",
    },
    yAxis: {
      min: 0,
      max: 100,
      plotBands: BANDS.map(({ from, to, color }) => ({
        from,
        to,
        color,
        borderWidth: 1,
        borderColor: "var(--background)",
        borderRadius: { radius: 4, scope: "individual", where: "all" },
      })),
    },
    series: [
      {
        type: "gauge",
        name: "Score",
        data: [value],
        tooltip: {
          pointFormatter() {
            return `<span style="font-size:0.9em">${this.series.name}</span><br/><b>${hcTooltipValue(this.y ?? 0, " of 100")}</b>`
          },
        },
        dataLabels: {
          formatter() {
            return hcNum(this.y ?? 0)
          },
        },
      },
    ],
  }
}

function HcGaugeRoundedBands({
  title = "Rounded bands",
  subtitle = "Dial with individually rounded plot bands — teal / amber / rose.",
  value = DEMO_VALUE,
  className,
}: HcGaugeRoundedBandsProps) {
  const { ref } = useChartDir()
  const locale = "en"
  const metric = hcNum(value, locale)
  const options = React.useMemo(() => buildOptions(value), [value])

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
        role="img"
        aria-label={`Gauge chart, ${title}, ${metric} of 100`}
        className="touch-pan-y rounded-lg"
      >
        <ChartHighchartsGauge options={options} />
      </div>

      <ul className="mx-auto flex max-w-[420px] flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        {BANDS.map((band) => (
          <li key={band.label} className="inline-flex items-center gap-1.5">
            <span
              className="size-2 shrink-0 rounded-full"
              style={{ backgroundColor: band.color }}
              aria-hidden
            />
            <span>{band.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function HcGaugeRoundedBandsDemo(
  props: HcGaugeRoundedBandsProps
) {
  return <HcGaugeRoundedBands {...props} />
}

export { HcGaugeRoundedBands }
