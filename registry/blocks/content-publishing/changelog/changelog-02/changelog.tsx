"use client"

import * as React from "react"
import {
  PlusIcon,
  RefreshCwIcon,
  Trash2Icon,
  WrenchIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { cn } from "@/lib/utils"

type ChangeType = "added" | "changed" | "fixed" | "removed" | "all"

type ChangeItem = {
  type: Exclude<ChangeType, "all">
  text: string
  version: string
  date: string
  releaseTitle: string
}

const FILTERS: { id: ChangeType; label: string }[] = [
  { id: "all", label: "All" },
  { id: "added", label: "Added" },
  { id: "changed", label: "Changed" },
  { id: "fixed", label: "Fixed" },
  { id: "removed", label: "Removed" },
]

const TYPE_META: Record<
  Exclude<ChangeType, "all">,
  {
    label: string
    badgeClass: string
    icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  }
> = {
  added: {
    label: "Added",
    badgeClass:
      "border-transparent bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    icon: PlusIcon,
  },
  changed: {
    label: "Changed",
    badgeClass:
      "border-transparent bg-sky-500/10 text-sky-700 dark:text-sky-300",
    icon: RefreshCwIcon,
  },
  fixed: {
    label: "Fixed",
    badgeClass:
      "border-transparent bg-amber-500/15 text-amber-800 dark:text-amber-300",
    icon: WrenchIcon,
  },
  removed: {
    label: "Removed",
    badgeClass: "border-transparent bg-destructive/10 text-destructive",
    icon: Trash2Icon,
  },
}

const FEED: ChangeItem[] = [
  {
    type: "added",
    text: "Error 500, Error 403, and Maintenance page examples",
    version: "1.3.0",
    date: "Mar 20, 2026",
    releaseTitle: "Error Pages and Blog Components",
  },
  {
    type: "added",
    text: "Newsletter section, blog category filter, and changelog examples",
    version: "1.3.0",
    date: "Mar 20, 2026",
    releaseTitle: "Error Pages and Blog Components",
  },
  {
    type: "changed",
    text: "Moved Error 404 into the new Error Pages category",
    version: "1.3.0",
    date: "Mar 20, 2026",
    releaseTitle: "Error Pages and Blog Components",
  },
  {
    type: "fixed",
    text: "Missing aria-hidden on decorative icons across examples",
    version: "1.3.0",
    date: "Mar 20, 2026",
    releaseTitle: "Error Pages and Blog Components",
  },
  {
    type: "added",
    text: "Calendar with single and range selection modes",
    version: "1.2.0",
    date: "Mar 1, 2026",
    releaseTitle: "Calendar and Tree Components",
  },
  {
    type: "added",
    text: "Tree component with expand/collapse and multi-select",
    version: "1.2.0",
    date: "Mar 1, 2026",
    releaseTitle: "Calendar and Tree Components",
  },
  {
    type: "fixed",
    text: "Select dropdown positioning near viewport edges",
    version: "1.2.0",
    date: "Mar 1, 2026",
    releaseTitle: "Calendar and Tree Components",
  },
  {
    type: "added",
    text: "Data table with sorting, pagination, and row selection",
    version: "1.1.0",
    date: "Feb 10, 2026",
    releaseTitle: "Data Table and Timeline",
  },
  {
    type: "removed",
    text: "Deprecated SimpleTable component (use Table instead)",
    version: "1.1.0",
    date: "Feb 10, 2026",
    releaseTitle: "Data Table and Timeline",
  },
  {
    type: "added",
    text: "Core UI primitives across forms, layout, and overlays",
    version: "1.0.0",
    date: "Jan 15, 2026",
    releaseTitle: "Initial Release",
  },
]

export default function Changelog({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [filter, setFilter] = React.useState<ChangeType>("all")
  const items =
    filter === "all" ? FEED : FEED.filter((item) => item.type === filter)

  return (
    <section
      className={cn(
        "min-h-svh w-full min-w-0 bg-white py-14 text-foreground dark:bg-background sm:py-16",
        className
      )}
      aria-labelledby="changelog-02-heading"
      {...props}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 space-y-2 text-start">
          <h1
            id="changelog-02-heading"
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Product updates
          </h1>
          <p className="text-muted-foreground">
            A dense feed of every shipped change — filter by type.
          </p>
        </header>

        <div className="sticky top-0 z-10 -mx-4 mb-6 border-b border-border/70 bg-white/90 px-4 py-3 backdrop-blur-sm dark:bg-background/90 sm:-mx-6 sm:px-6">
          <div className="flex flex-wrap gap-2" role="toolbar" aria-label="Filter by change type">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={cn(
                  "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  filter === f.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border/70 bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <ul className="divide-y divide-border/70 rounded-[12px] border border-border/70 bg-card shadow-soft" role="list">
          {items.map((item, i) => {
            const meta = TYPE_META[item.type]
            const Icon = meta.icon
            return (
              <li key={`${item.version}-${i}`}>
                <button
                  type="button"
                  className="group flex w-full cursor-pointer flex-col gap-2 px-4 py-3.5 text-start transition-colors hover:bg-muted/40 sm:flex-row sm:items-start sm:gap-4 sm:px-5"
                >
                  <div className="flex shrink-0 items-center gap-2 sm:w-36 sm:flex-col sm:items-start sm:gap-1">
                    <Badge
                      variant="outline"
                      className={cn("gap-1 font-semibold", meta.badgeClass)}
                    >
                      <Icon className="size-3" aria-hidden />
                      {meta.label}
                    </Badge>
                    <span className="font-mono text-xs text-muted-foreground">
                      v{item.version}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground group-hover:text-primary">
                      {item.text}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.releaseTitle}
                      <span aria-hidden> · </span>
                      <span dir="ltr">{item.date}</span>
                    </p>
                  </div>
                </button>
              </li>
            )
          })}
          {items.length === 0 ? (
            <li className="px-5 py-10 text-center text-sm text-muted-foreground">
              No changes in this filter.
            </li>
          ) : null}
        </ul>
      </div>
    </section>
  )
}
