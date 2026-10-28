"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  PlusIcon,
  RefreshCwIcon,
  Trash2Icon,
  WrenchIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@sonojs/ui/components/collapsible"
import { cn } from "@/lib/utils"

type ChangeType = "added" | "changed" | "fixed" | "removed" | "all"

type ChangeItem = { type: Exclude<ChangeType, "all">; text: string }

type Release = {
  version: string
  date: string
  title: string
  changes: ChangeItem[]
  latest?: boolean
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

const RELEASES: Release[] = [
  {
    version: "1.3.0",
    date: "March 20, 2026",
    title: "Error Pages and Blog Components",
    latest: true,
    changes: [
      { type: "added", text: "Error 500, Error 403, and Maintenance pages" },
      { type: "added", text: "Newsletter, blog filters, comments, changelog" },
      { type: "changed", text: "Error 404 moved to Error Pages" },
      { type: "fixed", text: "Decorative icon aria-hidden gaps" },
    ],
  },
  {
    version: "1.2.0",
    date: "March 1, 2026",
    title: "Calendar and Tree Components",
    changes: [
      { type: "added", text: "Calendar single and range modes" },
      { type: "added", text: "Tree expand/collapse and multi-select" },
      { type: "fixed", text: "Select near viewport edges" },
    ],
  },
  {
    version: "1.1.0",
    date: "February 10, 2026",
    title: "Data Table and Timeline",
    changes: [
      { type: "added", text: "Data table sorting and selection" },
      { type: "added", text: "Timeline for activity feeds" },
      { type: "removed", text: "Deprecated SimpleTable" },
    ],
  },
  {
    version: "1.0.0",
    date: "January 15, 2026",
    title: "Initial Release",
    changes: [
      { type: "added", text: "Core UI primitives" },
      { type: "added", text: "Tailwind CSS v4 integration" },
      { type: "added", text: "Theme presets with oklch" },
    ],
  },
]

export default function Changelog({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [filter, setFilter] = React.useState<ChangeType>("all")
  const [openVersion, setOpenVersion] = React.useState<string>(
    RELEASES[0]?.version ?? ""
  )

  return (
    <section
      className={cn(
        "min-h-svh w-full min-w-0 bg-white py-14 text-foreground dark:bg-background sm:py-16",
        className
      )}
      aria-labelledby="changelog-05-heading"
      {...props}
    >
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <header className="mb-6 space-y-2 text-start">
          <h1
            id="changelog-05-heading"
            className="text-3xl font-semibold tracking-tight"
          >
            Version history
          </h1>
          <p className="text-sm text-muted-foreground">
            Expand a release to read its changes. Filter by type anytime.
          </p>
        </header>

        <div className="mb-4 flex flex-wrap gap-2">
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

        <ul
          className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft"
          role="list"
        >
          {RELEASES.map((release, idx) => {
            const visibleChanges =
              filter === "all"
                ? release.changes
                : release.changes.filter((c) => c.type === filter)
            const isOpen = openVersion === release.version
            const hiddenByFilter = filter !== "all" && visibleChanges.length === 0

            if (hiddenByFilter) return null

            return (
              <li
                key={release.version}
                className={cn(idx > 0 && "border-t border-border/70")}
              >
                <Collapsible
                  open={isOpen}
                  onOpenChange={(open) =>
                    setOpenVersion(open ? release.version : "")
                  }
                >
                  <CollapsibleTrigger
                    className={cn(
                      "flex w-full cursor-pointer items-center gap-3 px-4 py-3.5 text-start transition-colors hover:bg-muted/40 sm:px-5",
                      isOpen && "bg-muted/30"
                    )}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-sm font-semibold">
                          v{release.version}
                        </span>
                        {release.latest ? (
                          <Badge
                            variant="outline"
                            className="border-transparent bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                          >
                            Latest
                          </Badge>
                        ) : null}
                        <span
                          dir="ltr"
                          className="text-xs text-muted-foreground"
                        >
                          {release.date}
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-sm text-muted-foreground">
                        {release.title}
                      </p>
                    </div>
                    <Badge variant="secondary" className="shrink-0 tabular-nums">
                      {visibleChanges.length}
                    </Badge>
                    <ChevronDownIcon
                      className={cn(
                        "size-4 shrink-0 text-muted-foreground transition-transform",
                        isOpen && "rotate-180"
                      )}
                      aria-hidden
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <ul
                      className="space-y-2 border-t border-border/60 bg-muted/20 px-4 py-3 sm:px-5"
                      role="list"
                    >
                      {visibleChanges.map((change, ci) => {
                        const meta = TYPE_META[change.type]
                        const Icon = meta.icon
                        return (
                          <li
                            key={ci}
                            className="flex items-start gap-2.5 text-start"
                          >
                            <Badge
                              variant="outline"
                              className={cn(
                                "mt-0.5 shrink-0 gap-1 font-semibold",
                                meta.badgeClass
                              )}
                            >
                              <Icon className="size-3" aria-hidden />
                              {meta.label}
                            </Badge>
                            <p className="text-sm text-muted-foreground">
                              {change.text}
                            </p>
                          </li>
                        )
                      })}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
