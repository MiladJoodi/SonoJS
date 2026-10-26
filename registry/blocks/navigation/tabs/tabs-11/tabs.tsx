"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@sonojs/ui/components/tabs"

const triggerClass = cn(
  "relative -mb-px h-10 min-h-10 flex-none rounded-none border-0 border-b-2 border-transparent",
  "bg-transparent px-3.5 text-sm font-medium text-muted-foreground shadow-none",
  "after:hidden after:opacity-0 hover:text-foreground",
  "data-[state=active]:border-primary data-[state=active]:bg-transparent",
  "data-[state=active]:text-primary data-[state=active]:shadow-none"
)

const sections = [
  { value: "leads", label: "Leads" },
  { value: "deals", label: "Deals" },
  { value: "contacts", label: "Contacts" },
  { value: "activities", label: "Activities" },
  { value: "reports", label: "Reports" },
] as const

type CrmTab = (typeof sections)[number]["value"]

function LeadsPanel() {
  return (
    <div className="space-y-2">
      {(
        [
          ["Northwind Labs", "Warm · Demo booked"],
          ["Pixel Forge", "New · Form fill"],
          ["Cedar Health", "Cold · No reply"],
        ] as const
      ).map(([company, meta]) => (
        <div
          key={company}
          className="flex items-center justify-between rounded-md border border-border/70 px-3 py-2.5 text-sm"
        >
          <span className="font-medium text-foreground">{company}</span>
          <span className="text-muted-foreground">{meta}</span>
        </div>
      ))}
    </div>
  )
}

function DealsPanel() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {(
        [
          ["Discovery", "$18k", "3 deals"],
          ["Proposal", "$42k", "5 deals"],
          ["Negotiation", "$67k", "2 deals"],
        ] as const
      ).map(([stage, amount, count]) => (
        <div
          key={stage}
          className="rounded-[12px] border border-border/70 bg-muted/30 p-4"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {stage}
          </p>
          <p className="mt-2 text-xl font-semibold text-foreground">{amount}</p>
          <p className="mt-1 text-sm text-muted-foreground">{count}</p>
        </div>
      ))}
    </div>
  )
}

function ContactsPanel() {
  return (
    <div className="space-y-2">
      {(
        [
          ["Sara Reed", "sara@northwind.dev"],
          ["Omar Haddad", "omar@pixelforge.io"],
          ["Elena Voss", "elena@cedar.health"],
        ] as const
      ).map(([name, email]) => (
        <div
          key={email}
          className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border/70 px-3 py-2.5 text-sm"
        >
          <span className="font-medium text-foreground">{name}</span>
          <span className="text-muted-foreground">{email}</span>
        </div>
      ))}
    </div>
  )
}

function ActivitiesPanel() {
  return (
    <div className="space-y-3">
      {(
        [
          ["Today", "Call with Northwind · 15:00"],
          ["Tomorrow", "Send proposal to Pixel Forge"],
          ["Fri", "QBR prep for Cedar Health"],
        ] as const
      ).map(([when, what]) => (
        <div key={what} className="flex gap-3 text-sm">
          <span className="w-20 shrink-0 text-muted-foreground">{when}</span>
          <span className="text-foreground">{what}</span>
        </div>
      ))}
    </div>
  )
}

function ReportsPanel() {
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">
        Pipeline coverage is 2.4× quota · Win rate 31% this quarter.
      </p>
      <Button variant="outline" className="h-10 rounded-[12px]">
        Open forecast
      </Button>
    </div>
  )
}

const panels: Record<CrmTab, React.ReactNode> = {
  leads: <LeadsPanel />,
  deals: <DealsPanel />,
  contacts: <ContactsPanel />,
  activities: <ActivitiesPanel />,
  reports: <ReportsPanel />,
}

export default function TabsBlock({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [tab, setTab] = React.useState<CrmTab>("deals")

  return (
    <div className={cn("mx-auto min-w-0 w-full max-w-3xl", className)} {...props}>
      <Tabs
        value={tab}
        onValueChange={(value) => setTab(value as CrmTab)}
        className="w-full gap-0 overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted/60 px-3 py-2">
          <p className="px-1 text-sm font-semibold text-foreground">CRM</p>
          <Button size="sm" className="h-8 rounded-[12px]">
            New record
          </Button>
        </div>

        <TabsList
          aria-label="CRM sections"
          className="no-scrollbar h-auto w-full min-w-0 justify-start gap-0 overflow-x-auto overflow-y-hidden rounded-none border-b border-border bg-muted/40 p-0"
        >
          {sections.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className={triggerClass}
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Sizer = Deals grid so shorter sections don’t collapse from the top. */}
        <div className="relative p-5">
          <div className="invisible" aria-hidden>
            <DealsPanel />
          </div>
          <div className="absolute inset-0 overflow-hidden p-5">{panels[tab]}</div>
        </div>
      </Tabs>
    </div>
  )
}
