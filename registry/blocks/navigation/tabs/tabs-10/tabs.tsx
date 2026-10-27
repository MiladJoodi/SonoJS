"use client"

import * as React from "react"
import {
  FolderKanbanIcon,
  HouseIcon,
  LineChartIcon,
  UsersIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@sonojs/ui/components/tabs"

const triggerClass = cn(
  "h-11 min-h-11 flex-none justify-center gap-2 rounded-none border-0 px-4 text-sm font-medium whitespace-nowrap",
  "text-muted-foreground shadow-none after:hidden after:opacity-0",
  "hover:bg-muted/60 hover:text-foreground",
  "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
  "data-[state=active]:shadow-none data-[state=active]:hover:bg-primary",
  "data-[state=active]:hover:text-primary-foreground",
  "first:rounded-s-[12px] last:rounded-e-[12px]",
  "[&_svg]:size-4"
)

const nav = [
  { value: "home", label: "Home", icon: HouseIcon },
  { value: "projects", label: "Projects", icon: FolderKanbanIcon },
  { value: "team", label: "Team", icon: UsersIcon },
  { value: "reports", label: "Reports", icon: LineChartIcon },
] as const

type WorkspaceTab = (typeof nav)[number]["value"]

function HomePanel() {
  return (
    <div className="space-y-3">
      <h4 className="text-base font-semibold text-foreground">
        Good afternoon, Sara
      </h4>
      <p className="text-sm text-muted-foreground">
        3 projects need review · 2 comments awaiting reply
      </p>
      <div className="flex flex-wrap gap-2">
        <Button className="h-10 rounded-[12px]">Open inbox</Button>
        <Button variant="outline" className="h-10 rounded-[12px]">
          Create project
        </Button>
      </div>
    </div>
  )
}

function ProjectsPanel() {
  return (
    <div className="space-y-2">
      {(
        [
          ["Website redesign", "In progress", "Due Fri"],
          ["Component audit", "Review", "Due Mon"],
          ["Billing portal", "Backlog", "Unscheduled"],
        ] as const
      ).map(([name, status, due]) => (
        <div
          key={name}
          className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border/70 px-3 py-2.5"
        >
          <div>
            <p className="text-sm font-medium text-foreground">{name}</p>
            <p className="text-xs text-muted-foreground">{status}</p>
          </div>
          <span className="text-xs text-muted-foreground">{due}</span>
        </div>
      ))}
    </div>
  )
}

function TeamPanel() {
  return (
    <div className="space-y-2">
      {(
        [
          ["Sara Reed", "Design · Online"],
          ["Alex Kim", "Engineering · Away"],
          ["Maya Chen", "Product · Online"],
        ] as const
      ).map(([name, meta]) => (
        <div
          key={name}
          className="flex items-center justify-between rounded-md border border-border/70 px-3 py-2.5 text-sm"
        >
          <span className="font-medium text-foreground">{name}</span>
          <span className="text-muted-foreground">{meta}</span>
        </div>
      ))}
    </div>
  )
}

function ReportsPanel() {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Weekly digest ready · Velocity up 8% vs last sprint
      </p>
      <Button variant="outline" className="h-10 rounded-[12px]">
        Download PDF
      </Button>
    </div>
  )
}

const panels: Record<WorkspaceTab, React.ReactNode> = {
  home: <HomePanel />,
  projects: <ProjectsPanel />,
  team: <TeamPanel />,
  reports: <ReportsPanel />,
}

export default function TabsBlock({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [tab, setTab] = React.useState<WorkspaceTab>("projects")

  return (
    <div
      className={cn(
        "mx-auto min-w-0 w-full max-w-3xl overflow-x-clip rounded-[12px] border border-border/70 bg-card p-4 shadow-soft sm:p-5 md:p-6",
        className
      )}
      style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
      {...props}
    >
      <Tabs
        value={tab}
        onValueChange={(value) => setTab(value as WorkspaceTab)}
        className="min-w-0 w-full gap-5"
      >
        <TabsList
          aria-label="Workspace"
          className="no-scrollbar h-auto w-full min-w-0 flex-row justify-start gap-0 overflow-x-auto overflow-y-hidden rounded-[12px] bg-canvas p-0"
        >
          {nav.map((item) => (
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

        {/* Sizer = Projects panel so shorter tabs don’t collapse the card. */}
        <div className="relative rounded-[12px] border border-border/70 bg-canvas/50 p-5">
          <div className="invisible" aria-hidden>
            <ProjectsPanel />
          </div>
          <div className="absolute inset-0 overflow-hidden p-5">
            {panels[tab]}
          </div>
        </div>
      </Tabs>
    </div>
  )
}
