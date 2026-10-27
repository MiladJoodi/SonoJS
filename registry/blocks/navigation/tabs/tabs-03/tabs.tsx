"use client"

import * as React from "react"
import { FileCodeIcon, HistoryIcon, ImageIcon, PenToolIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@sonojs/ui/components/tabs"

import heroImage from "./images/hero.webp"
import pricingImage from "./images/pricing.webp"
import footerImage from "./images/footer.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const triggerClass = cn(
  "relative h-10 min-h-10 flex-none gap-2 rounded-t-lg border border-transparent",
  "bg-transparent px-3.5 text-sm font-medium text-muted-foreground shadow-none",
  "after:hidden after:opacity-0 hover:text-foreground",
  "data-[state=active]:border-border data-[state=active]:bg-card",
  "data-[state=active]:text-foreground data-[state=active]:shadow-none",
  "[&_svg]:size-4"
)

const frames = [
  { label: "Hero", image: heroImage },
  { label: "Pricing", image: pricingImage },
  { label: "Footer", image: footerImage },
] as const

const tabs = [
  { value: "design", label: "Design", icon: PenToolIcon },
  { value: "code", label: "Code", icon: FileCodeIcon },
  { value: "assets", label: "Assets", icon: ImageIcon },
  { value: "history", label: "History", icon: HistoryIcon },
] as const

type TabValue = (typeof tabs)[number]["value"]

function DesignPanel() {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-foreground">Figma · Landing v3</p>
      <div className="grid gap-2 sm:grid-cols-3">
        {frames.map((frame) => (
          <div
            key={frame.label}
            className="overflow-hidden rounded-md border border-border/70 bg-muted/40"
          >
            <div className="relative aspect-[4/3]">
              <img
                src={assetSrc(frame.image)}
                alt=""
                className="absolute inset-0 size-full object-cover"
              />
            </div>
            <p className="border-t border-border/70 px-3 py-2 text-xs font-medium text-muted-foreground">
              {frame.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function CodePanel() {
  return (
    <div className="space-y-2">
      {(
        [
          ["landing-hero.tsx", "Updated 2h ago"],
          ["pricing-table.tsx", "Updated yesterday"],
          ["theme.css", "Updated 3 days ago"],
        ] as const
      ).map(([file, meta]) => (
        <div
          key={file}
          className="flex items-center justify-between rounded-md border border-border/70 px-3 py-2.5"
        >
          <span className="font-mono text-sm text-foreground">{file}</span>
          <span className="text-xs text-muted-foreground">{meta}</span>
        </div>
      ))}
    </div>
  )
}

function AssetsPanel() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {["logo.svg", "hero.webp", "icon-set", "og.png"].map((name) => (
        <div
          key={name}
          className="flex aspect-square items-end rounded-md border border-border/70 bg-muted/30 p-2"
        >
          <span className="truncate text-xs text-muted-foreground">{name}</span>
        </div>
      ))}
    </div>
  )
}

function HistoryPanel() {
  return (
    <div className="space-y-3">
      {(
        [
          ["Sara Reed", "Merged pricing layout", "Today 14:20"],
          ["Alex Kim", "Updated token radius", "Yesterday"],
          ["Maya Chen", "Added hero motion", "Mon"],
        ] as const
      ).map(([who, what, when]) => (
        <div key={what} className="flex gap-3 text-sm">
          <span className="w-20 shrink-0 text-muted-foreground">{when}</span>
          <span>
            <span className="font-medium text-foreground">{who}</span>
            <span className="text-muted-foreground"> — {what}</span>
          </span>
        </div>
      ))}
    </div>
  )
}

const panels: Record<TabValue, React.ReactNode> = {
  design: <DesignPanel />,
  code: <CodePanel />,
  assets: <AssetsPanel />,
  history: <HistoryPanel />,
}

export default function TabsBlock({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [tab, setTab] = React.useState<TabValue>("design")

  return (
    <div
      className={cn(
        "mx-auto min-w-0 w-full max-w-2xl overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft",
        className
      )}
      style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
      {...props}
    >
      <div className="border-b border-border/70 px-4 py-3">
        <p className="text-sm font-semibold text-foreground">
          Brand refresh · Sprint 14
        </p>
        <p className="text-xs text-muted-foreground">Shared project workspace</p>
      </div>

      <Tabs
        value={tab}
        onValueChange={(value) => setTab(value as TabValue)}
        className="w-full gap-0"
      >
        <TabsList
          variant="line"
          aria-label="Project files"
          className="no-scrollbar h-auto max-w-full min-w-0 w-full justify-start gap-1 overflow-x-auto overflow-y-hidden rounded-none border-0 bg-transparent px-2 pt-2"
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

        {/* Sizer = Design grid so shorter tabs don’t collapse the card from the top. */}
        <div className="relative bg-card p-4 sm:p-5">
          <div className="invisible" aria-hidden>
            <DesignPanel />
          </div>
          <div className="absolute inset-0 overflow-hidden p-4 sm:p-5">
            {panels[tab]}
          </div>
        </div>
      </Tabs>
    </div>
  )
}
