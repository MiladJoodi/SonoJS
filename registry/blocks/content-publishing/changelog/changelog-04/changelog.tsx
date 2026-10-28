"use client"

import * as React from "react"
import { PlusIcon, RefreshCwIcon, Trash2Icon, WrenchIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

type ChangeType = "added" | "changed" | "fixed" | "removed"

type ChangeItem = { type: ChangeType; text: string }

type Release = {
  version: string
  date: string
  title: string
  description: string
  changes: ChangeItem[]
  latest?: boolean
}

const RELEASES: Release[] = [
  {
    version: "1.3.0",
    date: "March 20, 2026",
    title: "Error Pages and Blog Components",
    description:
      "New error pages, blog UI blocks, and accessibility polish across the catalog.",
    latest: true,
    changes: [
      { type: "added", text: "Error 500 / 403 / Maintenance examples" },
      { type: "added", text: "Newsletter, filters, comments, changelog" },
      { type: "changed", text: "Error 404 category move" },
      { type: "fixed", text: "Icon a11y and mobile filter wrap" },
    ],
  },
  {
    version: "1.2.0",
    date: "March 1, 2026",
    title: "Calendar and Tree",
    description: "Keyboard-first data display primitives.",
    changes: [
      { type: "added", text: "Calendar selection modes" },
      { type: "added", text: "Tree multi-select" },
      { type: "fixed", text: "Select edge positioning" },
    ],
  },
  {
    version: "1.1.0",
    date: "February 10, 2026",
    title: "Data Table and Timeline",
    description: "Sorting, pagination, and activity feeds.",
    changes: [
      { type: "added", text: "Data table + timeline" },
      { type: "removed", text: "SimpleTable deprecated" },
      { type: "changed", text: "Sticky table headers" },
    ],
  },
  {
    version: "1.0.0",
    date: "January 15, 2026",
    title: "Initial Release",
    description: "Stable primitives, theming, and installable blocks.",
    changes: [
      { type: "added", text: "Core UI + Tailwind v4" },
      { type: "added", text: "Theme presets in oklch" },
    ],
  },
]

function countByType(changes: ChangeItem[], type: ChangeType) {
  return changes.filter((c) => c.type === type).length
}

const COUNT_PILLS: {
  type: ChangeType
  label: string
  className: string
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
}[] = [
  {
    type: "added",
    label: "Added",
    className:
      "border-transparent bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    icon: PlusIcon,
  },
  {
    type: "changed",
    label: "Changed",
    className:
      "border-transparent bg-sky-500/10 text-sky-700 dark:text-sky-300",
    icon: RefreshCwIcon,
  },
  {
    type: "fixed",
    label: "Fixed",
    className:
      "border-transparent bg-amber-500/15 text-amber-800 dark:text-amber-300",
    icon: WrenchIcon,
  },
  {
    type: "removed",
    label: "Removed",
    className: "border-transparent bg-destructive/10 text-destructive",
    icon: Trash2Icon,
  },
]

export default function Changelog({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const latest = RELEASES.find((r) => r.latest) ?? RELEASES[0]
  const older = RELEASES.filter((r) => r !== latest)

  return (
    <section
      className={cn(
        "min-h-svh w-full min-w-0 bg-white py-14 text-foreground dark:bg-background sm:py-16",
        className
      )}
      aria-labelledby="changelog-04-heading"
      {...props}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10 max-w-2xl space-y-3 text-start">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Changelog
          </p>
          <h1
            id="changelog-04-heading"
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Shipping notes
          </h1>
          <p className="text-muted-foreground">
            Magazine-style release highlights with past versions in a card grid.
          </p>
        </header>

        <article className="mb-10 overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
          <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
            <div className="min-w-0 text-start">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="outline"
                  className="border-transparent bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                >
                  Latest
                </Badge>
                <span dir="ltr" className="text-sm text-muted-foreground">
                  {latest.date}
                </span>
              </div>
              <p className="mt-3 font-mono text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
                {latest.version}
              </p>
              <h2 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
                {latest.title}
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                {latest.description}
              </p>
            </div>
            <Button type="button" className="shrink-0 self-start sm:self-end">
              Read release
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 border-t border-border/70 bg-muted/30 px-6 py-3 sm:px-8">
            {COUNT_PILLS.map((pill) => {
              const n = countByType(latest.changes, pill.type)
              if (n === 0) return null
              const Icon = pill.icon
              return (
                <Badge
                  key={pill.type}
                  variant="outline"
                  className={cn("gap-1 font-semibold", pill.className)}
                >
                  <Icon className="size-3" aria-hidden />
                  {n} {pill.label}
                </Badge>
              )
            })}
          </div>
        </article>

        <ul
          className="grid gap-4 sm:grid-cols-2"
          role="list"
        >
          {older.map((release) => (
            <li key={release.version}>
              <button
                type="button"
                className="group flex h-full w-full cursor-pointer flex-col rounded-[12px] border border-border/70 bg-card p-5 text-start shadow-soft transition-colors hover:border-primary/30"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-sm font-semibold">
                    v{release.version}
                  </span>
                  <span dir="ltr" className="text-xs text-muted-foreground">
                    {release.date}
                  </span>
                </div>
                <h3 className="mt-2 text-base font-semibold group-hover:text-primary">
                  {release.title}
                </h3>
                <p className="mt-1 line-clamp-2 flex-1 text-sm text-muted-foreground">
                  {release.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {COUNT_PILLS.map((pill) => {
                    const n = countByType(release.changes, pill.type)
                    if (n === 0) return null
                    return (
                      <Badge
                        key={pill.type}
                        variant="outline"
                        className={cn(
                          "gap-1 text-[10px] font-semibold",
                          pill.className
                        )}
                      >
                        {n} {pill.label}
                      </Badge>
                    )
                  })}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
