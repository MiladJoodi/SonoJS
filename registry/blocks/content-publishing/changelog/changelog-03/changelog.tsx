"use client"

import * as React from "react"
import {
  ArrowRightIcon,
  DownloadIcon,
  PlusIcon,
  RefreshCwIcon,
  Trash2Icon,
  WrenchIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Separator } from "@sonojs/ui/components/separator"
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

const TYPE_META: Record<
  ChangeType,
  { label: string; className: string; icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }> }
> = {
  added: {
    label: "Added",
    className: "text-emerald-700 dark:text-emerald-300",
    icon: PlusIcon,
  },
  changed: {
    label: "Changed",
    className: "text-sky-700 dark:text-sky-300",
    icon: RefreshCwIcon,
  },
  fixed: {
    label: "Fixed",
    className: "text-amber-800 dark:text-amber-300",
    icon: WrenchIcon,
  },
  removed: {
    label: "Removed",
    className: "text-destructive",
    icon: Trash2Icon,
  },
}

const RELEASES: Release[] = [
  {
    version: "1.3.0",
    date: "March 20, 2026",
    title: "Error Pages and Blog Components",
    description:
      "New error page examples, blog UI blocks, and accessibility improvements across the board.",
    latest: true,
    changes: [
      { type: "added", text: "Error 500, Error 403, and Maintenance page examples" },
      { type: "added", text: "Newsletter, blog filters, comments, and changelog blocks" },
      { type: "changed", text: "Error 404 moved into Error Pages category" },
      { type: "fixed", text: "Decorative icons missing aria-hidden" },
      { type: "fixed", text: "Category filter tabs wrap on mobile" },
    ],
  },
  {
    version: "1.2.0",
    date: "March 1, 2026",
    title: "Calendar and Tree Components",
    description: "Data-display components with keyboard navigation and ARIA support.",
    changes: [
      { type: "added", text: "Calendar with single and range selection" },
      { type: "added", text: "Tree with expand/collapse and multi-select" },
      { type: "fixed", text: "Select dropdown near viewport edges" },
    ],
  },
  {
    version: "1.1.0",
    date: "February 10, 2026",
    title: "Data Table and Timeline",
    description: "Sorting, pagination, selection, and activity timelines.",
    changes: [
      { type: "added", text: "Data table with sorting and row selection" },
      { type: "removed", text: "Deprecated SimpleTable" },
    ],
  },
  {
    version: "1.0.0",
    date: "January 15, 2026",
    title: "Initial Release",
    description: "First stable release with installable components and blocks.",
    changes: [
      { type: "added", text: "Core UI primitives and Tailwind v4 integration" },
    ],
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
      aria-labelledby="changelog-03-heading"
      {...props}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 space-y-2 text-start">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Releases
          </p>
          <h1
            id="changelog-03-heading"
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            What&apos;s new
          </h1>
        </header>

        <article className="overflow-hidden rounded-[12px] border border-primary/30 bg-card shadow-soft ring-1 ring-primary/10">
          <div className="border-b border-border/70 bg-gradient-to-br from-primary/10 via-transparent to-emerald-500/5 px-5 py-6 sm:px-7 sm:py-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="font-mono">v{latest.version}</Badge>
              <Badge
                variant="outline"
                className="border-transparent bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
              >
                Latest
              </Badge>
              <span dir="ltr" className="text-xs text-muted-foreground">
                {latest.date}
              </span>
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              {latest.title}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {latest.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button type="button" size="sm" className="gap-1.5">
                <DownloadIcon className="size-3.5" aria-hidden />
                Get v{latest.version}
              </Button>
              <Button type="button" variant="outline" size="sm" className="gap-1.5">
                Full notes
                <ArrowRightIcon className="size-3.5 icon-dir" aria-hidden />
              </Button>
            </div>
          </div>
          <ul className="space-y-0 divide-y divide-border/60 px-5 py-2 sm:px-7" role="list">
            {latest.changes.map((change, i) => {
              const meta = TYPE_META[change.type]
              const Icon = meta.icon
              return (
                <li
                  key={i}
                  className="flex items-start gap-3 py-3 text-start"
                >
                  <Icon
                    className={cn("mt-0.5 size-4 shrink-0", meta.className)}
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <span className={cn("text-xs font-semibold", meta.className)}>
                      {meta.label}
                    </span>
                    <p className="text-sm text-muted-foreground">{change.text}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </article>

        <div className="mt-10 space-y-1 text-start">
          <h2 className="mb-3 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            Earlier releases
          </h2>
          <ul
            className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft"
            role="list"
          >
            {older.map((release, idx) => (
              <li key={release.version}>
                {idx > 0 ? <Separator /> : null}
                <button
                  type="button"
                  className="group flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-3.5 text-start transition-colors hover:bg-muted/40 sm:px-5"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-sm font-semibold">
                        v{release.version}
                      </span>
                      <span dir="ltr" className="text-xs text-muted-foreground">
                        {release.date}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-sm text-muted-foreground group-hover:text-foreground">
                      {release.title}
                    </p>
                  </div>
                  <ArrowRightIcon
                    className="size-4 shrink-0 text-muted-foreground icon-dir group-hover:text-primary"
                    aria-hidden
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
