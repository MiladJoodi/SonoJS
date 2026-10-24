"use client"

import * as React from "react"
import {
  SunburstChart as RechartsSunburst,
  type SunburstData,
} from "recharts"

import { cn } from "@/lib/utils"
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart"

import {
  SERIES_VARS,
  SunburstCenter,
  SunburstNameLabels,
  SunburstTooltipContent,
  colorizeTree,
  flattenSunburstNames,
  flattenSunburstNodes,
  sunburstTextOptions,
  type FlatSunburstNode,
  type SunburstActive,
} from "../_lib/sunburst-shared"
import { useChartDir } from "../_lib/use-chart-dir"

/**
 * Sunburst Chart Theme Colors — team headcount by org (locked palette shades).
 * Locked metric scrub chrome + center disc; `--chart-1…5` + color-mix nest shades.
 * Spec: `registry/charts/PORT.md`
 * Installs to: components/charts/sunburst-chart-theme-colors.tsx
 */

export type SunburstThemeBranch = {
  name: string
  value: number
  children?: SunburstThemeBranch[]
}

export type SunburstChartThemeColorsProps = {
  title?: string
  subtitle?: string
  data?: SunburstThemeBranch[]
  className?: string
  /** Hover / keyboard node scrub. Default on. */
  scrub?: boolean
}

const GROUP_LABELS: Record<string, string> = {
  Engineering: "Engineering",
  Sales: "Sales",
  Marketing: "Marketing",
  Support: "Support",
}

/** Sample org headcount — EN names; totals 150. */
const DEMO_CHILDREN: SunburstThemeBranch[] = [
  {
    name: "Engineering",
    value: 60,
    children: [
      { name: "Frontend", value: 25 },
      {
        name: "Backend",
        value: 20,
        children: [
          { name: "API", value: 12 },
          { name: "Data", value: 8 },
        ],
      },
      { name: "QA", value: 15 },
    ],
  },
  {
    name: "Sales",
    value: 40,
    children: [
      { name: "Direct", value: 25 },
      { name: "Partners", value: 15 },
    ],
  },
  {
    name: "Marketing",
    value: 30,
    children: [
      { name: "Content", value: 18 },
      { name: "Ads", value: 12 },
    ],
  },
  {
    name: "Support",
    value: 20,
    children: [
      { name: "Tickets", value: 12 },
      { name: "Phone", value: 8 },
    ],
  },
]

const DEMO_TOTAL = 150

function sumTree(nodes: SunburstThemeBranch[]): number {
  return nodes.reduce((acc, node) => {
    if (node.children?.length) return acc + sumTree(node.children)
    return acc + node.value
  }, 0)
}

function formatHeadcount(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  }).format(Math.round(value))
}

function formatPct(value: number) {
  return `${Math.round(value)}%`
}

const chartSunburstContainerClassName =
  "mx-auto aspect-square h-[320px] w-[320px] max-w-full overflow-visible font-sans text-xs tabular-nums sm:h-[380px] sm:w-[380px] [&_.recharts-sector]:cursor-pointer [&_.recharts-sector]:outline-none [&_.recharts-surface]:overflow-visible"

function SunburstChartThemeColors({
  title = "Team headcount",
  subtitle = "Org composition by team — hover a ring to scrub.",
  data = DEMO_CHILDREN,
  className,
  scrub = true,
}: SunburstChartThemeColorsProps) {
  const { dir, ref } = useChartDir()
  const plotRtl = dir === "rtl"
  const liveRef = React.useRef<HTMLParagraphElement>(null)
  const locale = "en"

  const colored = React.useMemo(() => colorizeTree(data), [data])
  const names = React.useMemo(() => flattenSunburstNames(colored), [colored])
  const nodes = React.useMemo(() => flattenSunburstNodes(colored), [colored])
  const total = React.useMemo(() => {
    const leafSum = sumTree(data)
    return leafSum > 0 ? leafSum : DEMO_TOTAL
  }, [data])
  const lastIndex = Math.max(0, nodes.length - 1)

  const sunburstData: SunburstData = React.useMemo(
    () => ({
      name: "Company",
      value: total,
      children: colored,
    }),
    [colored, total]
  )

  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {
      value: { label: "People", color: SERIES_VARS[0] },
    }
    colored.forEach((branch, index) => {
      const key = String(branch.name ?? `group-${index}`)
      config[key] = {
        label: GROUP_LABELS[key] ?? key,
        color: SERIES_VARS[index % SERIES_VARS.length],
      }
    })
    return config
  }, [colored])

  const [activeIndex, setActiveIndex] = React.useState(lastIndex)
  const [scrubbing, setScrubbing] = React.useState(false)
  const [dataTrack, setDataTrack] = React.useState({ data, lastIndex })
  if (dataTrack.data !== data || dataTrack.lastIndex !== lastIndex) {
    setDataTrack({ data, lastIndex })
    setActiveIndex(lastIndex)
    setScrubbing(false)
  }

  const liveScrubbing = scrub && scrubbing
  const liveIndex = liveScrubbing ? activeIndex : lastIndex
  const liveNode: FlatSunburstNode | undefined =
    nodes[liveIndex] ?? nodes[lastIndex]
  const metricValue = liveScrubbing && liveNode ? liveNode.value : total
  const sharePct =
    liveScrubbing && liveNode && total > 0
      ? (liveNode.value / total) * 100
      : null
  const caption =
    liveScrubbing && liveNode ? liveNode.name : "All teams"

  const centerActive: SunburstActive =
    liveScrubbing && liveNode
      ? {
          name: liveNode.name,
          value: liveNode.value,
          fill: liveNode.fill,
        }
      : null

  const announce = React.useCallback(
    (index: number) => {
      if (!liveRef.current) return
      const node = nodes[index]
      if (!node) return
      const pct = total > 0 ? (node.value / total) * 100 : 0
      liveRef.current.textContent = `${node.name}: ${formatHeadcount(node.value, locale)} people (${formatPct(pct)})`
    },
    [locale, nodes, total]
  )

  const activate = React.useCallback(
    (index: number, fromKeyboard = false) => {
      if (nodes.length === 0) return
      const clamped = Math.min(lastIndex, Math.max(0, index))
      setActiveIndex(clamped)
      setScrubbing(true)
      if (fromKeyboard) announce(clamped)
    },
    [announce, lastIndex, nodes.length]
  )

  const activateNode = React.useCallback(
    (hit: { name: string; value: number; fill?: string }) => {
      const index = nodes.findIndex(
        (node) =>
          node.name === hit.name &&
          node.value === hit.value &&
          node.fill === hit.fill
      )
      if (index >= 0) activate(index)
    },
    [activate, nodes]
  )

  const clearScrub = React.useCallback(() => {
    setScrubbing(false)
    setActiveIndex(lastIndex)
  }, [lastIndex])

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!scrub) return
      const reverse = plotRtl
      const idx = liveScrubbing ? activeIndex : lastIndex

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault()
          activate(idx + (reverse ? 1 : -1), true)
          break
        case "ArrowRight":
          event.preventDefault()
          activate(idx + (reverse ? -1 : 1), true)
          break
        case "Home":
          event.preventDefault()
          activate(reverse ? lastIndex : 0, true)
          break
        case "End":
          event.preventDefault()
          activate(reverse ? 0 : lastIndex, true)
          break
        case "Escape":
          event.preventDefault()
          clearScrub()
          break
        default:
          break
      }
    },
    [
      activate,
      activeIndex,
      clearScrub,
      lastIndex,
      liveScrubbing,
      plotRtl,
      scrub,
    ]
  )

  const ariaLabel = React.useMemo(() => {
    if (!liveScrubbing || !liveNode) {
      return `Sunburst, ${title}, total ${formatHeadcount(total, locale)} people`
    }
    const pct = total > 0 ? formatPct((liveNode.value / total) * 100) : ""
    return `Sunburst, ${title}, ${liveNode.name} ${formatHeadcount(liveNode.value, locale)} people ${pct}`
  }, [liveNode, liveScrubbing, locale, title, total])

  const formatCenter = React.useCallback(
    (value: number) => formatHeadcount(value, locale),
    [locale]
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
              {formatHeadcount(metricValue, locale)}
            </p>
            {sharePct != null ? (
              <span
                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium tabular-nums text-muted-foreground"
                style={{
                  backgroundColor:
                    "color-mix(in oklab, var(--foreground) 8%, transparent)",
                }}
              >
                {formatPct(sharePct)}
                <span className="font-normal">of org</span>
              </span>
            ) : (
              <span className="text-xs text-muted-foreground">people</span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{caption}</p>
        </div>
      </header>

      <p ref={liveRef} className="sr-only" aria-live="polite" />

      <div className="relative mx-auto w-fit">
        <div
          dir="ltr"
          role="img"
          aria-label={ariaLabel}
          tabIndex={scrub ? 0 : undefined}
          onKeyDown={scrub ? onKeyDown : undefined}
          onBlur={scrub ? clearScrub : undefined}
          className="touch-pan-y rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <SunburstNameLabels names={names} className="w-full">
            <ChartContainer
              config={chartConfig}
              className={cn(chartSunburstContainerClassName, "max-w-none")}
            >
              <RechartsSunburst
                data={sunburstData}
                dataKey="value"
                nameKey="name"
                innerRadius={72}
                padding={2}
                ringPadding={2}
                stroke="var(--background)"
                textOptions={sunburstTextOptions}
                onMouseEnter={
                  scrub
                    ? (node) => {
                        if (!node.name) return
                        activateNode({
                          name: String(node.name),
                          value: Number(node.value ?? 0),
                          fill:
                            typeof node.fill === "string"
                              ? node.fill
                              : undefined,
                        })
                      }
                    : undefined
                }
                onMouseLeave={scrub ? clearScrub : undefined}
              >
                <ChartTooltip
                  cursor={false}
                  content={
                    <SunburstTooltipContent
                      dir={dir}
                      locale={locale}
                      formatValue={(value, loc) =>
                        `${formatHeadcount(value, loc)} people`
                      }
                    />
                  }
                />
              </RechartsSunburst>
            </ChartContainer>
          </SunburstNameLabels>
        </div>

        <SunburstCenter
          dir={dir}
          active={centerActive}
          total={total}
          totalLabel="Headcount"
          unit="people"
          formatValue={formatCenter}
        />
      </div>

      <ul className="mx-auto flex max-w-[640px] flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        {colored.map((branch, index) => (
          <li
            key={String(branch.name)}
            className="inline-flex items-center gap-1.5"
          >
            <span
              className="size-2 shrink-0 rounded-full"
              style={{
                backgroundColor: SERIES_VARS[index % SERIES_VARS.length],
              }}
              aria-hidden
            />
            <span>
              {GROUP_LABELS[String(branch.name)] ?? String(branch.name)}
            </span>
          </li>
        ))}
      </ul>

      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">Team</th>
            <th scope="col">People</th>
          </tr>
        </thead>
        <tbody>
          {nodes.map((node) => (
            <tr key={`a11y-${node.name}-${node.value}`}>
              <td>{node.name}</td>
              <td>{node.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function SunburstChartThemeColorsDemo(
  props: SunburstChartThemeColorsProps
) {
  return <SunburstChartThemeColors {...props} />
}

export { SunburstChartThemeColors }
