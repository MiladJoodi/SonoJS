"use client"

import * as React from "react"
import { SunburstChart, type SunburstData } from "recharts"

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
 * Bundle Size Sunburst — tree-shaken client bundle (bytes) by package group.
 * Locked metric scrub chrome + center disc; `--chart-1…5` + color-mix nest shades.
 * Spec: `registry/charts/PORT.md`
 * Installs to: components/charts/bundle-size-sunburst.tsx
 */

export type BundleSizeSunburstBranch = {
  name: string
  value: number
  children?: BundleSizeSunburstBranch[]
}

export type BundleSizeSunburstProps = {
  title?: string
  subtitle?: string
  data?: BundleSizeSunburstBranch[]
  className?: string
  /** Hover / keyboard node scrub. Default on. */
  scrub?: boolean
}

const GROUP_LABELS: Record<string, string> = {
  Dependencies: "Dependencies",
  Source: "Source",
  Output: "Output",
}

/** Sample tree-shaken bundle (bytes) — EN names. */
const DEMO_CHILDREN: BundleSizeSunburstBranch[] = [
  {
    name: "Dependencies",
    value: 4096,
    children: [
      { name: "react-redux", value: 2304 },
      { name: "victory-vendor", value: 1792 },
    ],
  },
  {
    name: "Source",
    value: 4608,
    children: [
      { name: "Treemap", value: 1536 },
      { name: "Sunburst", value: 1280 },
      { name: "Tooltip", value: 1152 },
      { name: "ChartUtils", value: 640 },
    ],
  },
  {
    name: "Output",
    value: 1024,
    children: [{ name: "Docs", value: 1024 }],
  },
]

const DEMO_TOTAL = 9728

function sumTree(nodes: BundleSizeSunburstBranch[]): number {
  return nodes.reduce((acc, node) => {
    if (node.children?.length) return acc + sumTree(node.children)
    return acc + node.value
  }, 0)
}

function formatBytes(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  }).format(Math.round(value))
}

function formatPct(value: number) {
  return `${Math.round(value)}%`
}

const chartSunburstContainerClassName =
  "mx-auto aspect-square h-[320px] w-[320px] max-w-full overflow-visible font-sans text-xs tabular-nums sm:h-[380px] sm:w-[380px] [&_.recharts-sector]:cursor-pointer [&_.recharts-sector]:outline-none [&_.recharts-surface]:overflow-visible"

function BundleSizeSunburst({
  title = "Client bundle size",
  subtitle = "Tree-shaken JavaScript weight by group — hover a ring to scrub.",
  data = DEMO_CHILDREN,
  className,
  scrub = true,
}: BundleSizeSunburstProps) {
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
      name: "Bundle",
      value: total,
      children: colored,
    }),
    [colored, total]
  )

  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {
      value: { label: "Size (B)", color: SERIES_VARS[0] },
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
    liveScrubbing && liveNode ? liveNode.name : "All packages"

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
      liveRef.current.textContent = `${node.name}: ${formatBytes(node.value, locale)} B (${formatPct(pct)})`
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
      return `Sunburst, ${title}, total ${formatBytes(total, locale)} B`
    }
    const pct = total > 0 ? formatPct((liveNode.value / total) * 100) : ""
    return `Sunburst, ${title}, ${liveNode.name} ${formatBytes(liveNode.value, locale)} B ${pct}`
  }, [liveNode, liveScrubbing, locale, title, total])

  const formatCenter = React.useCallback(
    (value: number) => formatBytes(value, locale),
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
              {formatBytes(metricValue, locale)}{" "}
              <span className="text-lg font-medium text-muted-foreground">
                B
              </span>
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
                <span className="font-normal">of bundle</span>
              </span>
            ) : (
              <span className="text-xs text-muted-foreground">—</span>
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
              <SunburstChart
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
                        `${formatBytes(value, loc)} B`
                      }
                    />
                  }
                />
              </SunburstChart>
            </ChartContainer>
          </SunburstNameLabels>
        </div>

        <SunburstCenter
          dir={dir}
          active={centerActive}
          total={total}
          totalLabel="Total size"
          unit="B"
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
            <th scope="col">Package</th>
            <th scope="col">Size (B)</th>
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

export default function BundleSizeSunburstDemo(props: BundleSizeSunburstProps) {
  return <BundleSizeSunburst {...props} />
}

export { BundleSizeSunburst }
