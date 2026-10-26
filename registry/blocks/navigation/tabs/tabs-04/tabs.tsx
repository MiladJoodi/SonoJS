"use client"

import * as React from "react"
import {
  ChartColumnIcon,
  EyeIcon,
  TargetIcon,
  UsersIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@sonojs/ui/components/tabs"

const triggerClass = cn(
  "relative top-px h-10 min-h-10 flex-none gap-2 rounded-none border-0 border-b-2 border-transparent",
  "bg-transparent px-3.5 text-sm font-medium text-muted-foreground shadow-none",
  "after:hidden after:opacity-0 hover:text-foreground",
  "data-[state=active]:border-primary data-[state=active]:bg-transparent",
  "data-[state=active]:text-primary data-[state=active]:shadow-none",
  "dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-primary",
  "[&_svg]:size-4"
)

const tabs = [
  { value: "overview", label: "Overview", icon: ChartColumnIcon },
  { value: "traffic", label: "Traffic", icon: EyeIcon },
  { value: "conversions", label: "Conversions", icon: TargetIcon },
  { value: "audience", label: "Audience", icon: UsersIcon },
] as const

type TabValue = (typeof tabs)[number]["value"]

function Metric({
  label,
  value,
  delta,
}: {
  label: string
  value: string
  delta: string
}) {
  return (
    <div className="rounded-[12px] border border-border/70 bg-canvas/60 p-4">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
        {value}
      </p>
      <p className="mt-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
        {delta}
      </p>
    </div>
  )
}

function OverviewPanel() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <Metric label="Sessions" value="48.2k" delta="+12.4%" />
      <Metric label="Bounce rate" value="34%" delta="-2.1%" />
      <Metric label="Avg. duration" value="3m 12s" delta="+18s" />
    </div>
  )
}

function TrafficPanel() {
  return (
    <div className="space-y-2">
      {(
        [
          ["Organic search", "41%", "19.8k"],
          ["Direct", "27%", "13.0k"],
          ["Referral", "18%", "8.7k"],
          ["Social", "14%", "6.7k"],
        ] as const
      ).map(([source, share, count]) => (
        <div
          key={source}
          className="flex items-center gap-3 rounded-[12px] border border-border/70 px-4 py-3"
        >
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">{source}</p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="ms-0 me-auto h-full rounded-full bg-primary"
                style={{ width: share }}
              />
            </div>
          </div>
          <span className="text-sm tabular-nums text-muted-foreground">
            {count}
          </span>
        </div>
      ))}
    </div>
  )
}

function ConversionsPanel() {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Metric label="Sign-ups" value="1,284" delta="+9.2%" />
        <Metric label="Trial → paid" value="18.6%" delta="+1.4%" />
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        Strongest day: Tuesday · Checkout drop-off still highest on mobile.
      </p>
    </div>
  )
}

function AudiencePanel() {
  return (
    <div className="space-y-2">
      {(
        [
          ["United States", "38%"],
          ["Germany", "14%"],
          ["United Kingdom", "11%"],
          ["Canada", "8%"],
        ] as const
      ).map(([country, share]) => (
        <div
          key={country}
          className="flex items-center justify-between rounded-md border border-border/70 px-3 py-2.5 text-sm"
        >
          <span className="text-foreground">{country}</span>
          <span className="tabular-nums text-muted-foreground">{share}</span>
        </div>
      ))}
    </div>
  )
}

const panels: Record<TabValue, React.ReactNode> = {
  overview: <OverviewPanel />,
  traffic: <TrafficPanel />,
  conversions: <ConversionsPanel />,
  audience: <AudiencePanel />,
}

export default function TabsBlock({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [tab, setTab] = React.useState<TabValue>("overview")

  return (
    <div
      className={cn(
        "mx-auto min-w-0 w-full max-w-3xl overflow-x-clip rounded-[12px] border border-border/70 bg-card p-4 shadow-soft sm:p-5 md:p-6",
        className
      )}
      {...props}
    >
      <Tabs
        value={tab}
        onValueChange={(value) => setTab(value as TabValue)}
        className="min-w-0 w-full gap-5"
      >
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0 shrink-0">
            <h3 className="text-h4 text-foreground">Analytics</h3>
            <p className="text-sm text-muted-foreground">
              Last 30 days · All channels
            </p>
          </div>
          <TabsList
            variant="line"
            aria-label="Analytics views"
            className="no-scrollbar h-auto max-w-full min-w-0 w-full justify-start gap-1 overflow-x-auto overflow-y-hidden rounded-none border-b border-border/70 bg-transparent p-0 sm:min-w-0 sm:flex-1 sm:justify-end"
          >
            {tabs.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className={triggerClass}
              >
                <item.icon aria-hidden />
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Sizer = Traffic list so shorter views don’t collapse the card from the top. */}
        <div className="relative">
          <div className="invisible" aria-hidden>
            <TrafficPanel />
          </div>
          <div className="absolute inset-0 overflow-hidden">{panels[tab]}</div>
        </div>
      </Tabs>
    </div>
  )
}
