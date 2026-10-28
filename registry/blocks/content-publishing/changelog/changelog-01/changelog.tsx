"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  PlusIcon,
  RefreshCwIcon,
  SparklesIcon,
  TagIcon,
  Trash2Icon,
  WrenchIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@sonojs/ui/components/card"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

type ChangeType = "added" | "changed" | "fixed" | "removed"

type ChangeItem = {
  type: ChangeType
  text: string
}

type Release = {
  version: string
  date: string
  title: string
  description: string
  changes: ChangeItem[]
  latest?: boolean
}

const CHANGE_CONFIG: Record<
  ChangeType,
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
    description:
      "New error page examples, blog UI blocks, and accessibility improvements across the board.",
    latest: true,
    changes: [
      {
        type: "added",
        text: "Error 500, Error 403, and Maintenance page examples",
      },
      {
        type: "added",
        text: "Newsletter section, blog category filter, comments section, and changelog examples",
      },
      {
        type: "added",
        text: "New Error Pages category in the blocks catalog",
      },
      {
        type: "changed",
        text: "Moved Error 404 from Page Sections to the new Error Pages category",
      },
      {
        type: "fixed",
        text: "Missing aria-hidden attributes on decorative icons across examples",
      },
      {
        type: "fixed",
        text: "Category filter tabs now wrap properly on mobile viewports",
      },
    ],
  },
  {
    version: "1.2.0",
    date: "March 1, 2026",
    title: "Calendar and Tree Components",
    description:
      "Two new data-display components with full keyboard navigation and ARIA support.",
    changes: [
      {
        type: "added",
        text: "Calendar component with single and range selection modes",
      },
      {
        type: "added",
        text: "Tree component with expand/collapse and multi-select",
      },
      {
        type: "added",
        text: "Calendar supports disabled dates and min/max constraints",
      },
      {
        type: "changed",
        text: "Data table pagination now uses the Pagination component internally",
      },
      {
        type: "fixed",
        text: "Select dropdown positioning near viewport edges",
      },
    ],
  },
  {
    version: "1.1.0",
    date: "February 10, 2026",
    title: "Data Table and Timeline",
    description:
      "Feature-rich data table with sorting, pagination, and selection. Timeline for activity feeds.",
    changes: [
      {
        type: "added",
        text: "Data table with sorting, pagination, and row selection",
      },
      {
        type: "added",
        text: "Timeline component for activity feeds and changelogs",
      },
      {
        type: "added",
        text: "Empty component for zero-data scenarios",
      },
      {
        type: "changed",
        text: "Table component now supports sticky headers",
      },
      {
        type: "fixed",
        text: "Accordion keyboard navigation when nested inside Tabs",
      },
      {
        type: "removed",
        text: "Deprecated SimpleTable component (use Table instead)",
      },
    ],
  },
  {
    version: "1.0.0",
    date: "January 15, 2026",
    title: "Initial Release",
    description:
      "The first stable release of SonoJS with a full set of installable components and blocks.",
    changes: [
      {
        type: "added",
        text: "Core UI primitives across forms, layout, navigation, data display, feedback, and overlays",
      },
      {
        type: "added",
        text: "Full Tailwind CSS v4 integration with @theme and @source support",
      },
      {
        type: "added",
        text: "Example pages covering application UI, page sections, and blog layouts",
      },
      {
        type: "added",
        text: "Theme presets with oklch color spaces for perceptual uniformity",
      },
    ],
  },
]

export default function Changelog({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [showAll, setShowAll] = React.useState(false)
  const displayedReleases = showAll ? RELEASES : RELEASES.slice(0, 3)

  return (
    <section
      className={cn(
        "min-h-svh w-full min-w-0 bg-white py-16 text-foreground dark:bg-background sm:py-20",
        className
      )}
      aria-labelledby="changelog-01-heading"
      {...props}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-start sm:mb-12">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-[12px] bg-primary/10">
              <TagIcon className="size-5 text-primary" aria-hidden />
            </div>
            <h1
              id="changelog-01-heading"
              className="text-h1 font-semibold tracking-tight text-foreground"
            >
              Changelog
            </h1>
          </div>
          <p className="text-base text-muted-foreground">
            All notable changes to SonoJS. We follow Semantic Versioning.
          </p>
        </div>

        <div className="relative">
          <div
            className="absolute start-[19px] top-2 bottom-2 hidden w-px bg-border sm:block"
            aria-hidden
          />

          <div className="flex flex-col">
            {displayedReleases.map((release, idx) => (
              <div key={release.version} className="relative">
                {idx > 0 ? <Separator className="my-7 sm:ms-10" /> : null}

                <div className="flex gap-4 sm:gap-6">
                  <div className="hidden shrink-0 flex-col items-center sm:flex">
                    <div
                      className={cn(
                        "relative z-10 flex size-10 items-center justify-center rounded-full border-2",
                        release.latest
                          ? "border-primary bg-primary text-primary-foreground shadow-soft"
                          : "border-border bg-card"
                      )}
                    >
                      {release.latest ? (
                        <SparklesIcon className="size-4" aria-hidden />
                      ) : (
                        <TagIcon
                          className="size-4 text-muted-foreground"
                          aria-hidden
                        />
                      )}
                    </div>
                  </div>

                  <Card
                    className={cn(
                      "flex-1 transition-colors hover:border-primary/30",
                      release.latest &&
                        "border-primary/35 shadow-soft ring-1 ring-primary/15"
                    )}
                  >
                    <CardContent className="flex flex-col gap-4 p-5 sm:p-6">
                      <div className="text-start">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <Badge
                            variant={release.latest ? "default" : "outline"}
                            className="font-mono"
                          >
                            v{release.version}
                          </Badge>
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
                        <CardTitle className="text-lg">
                          {release.title}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {release.description}
                        </CardDescription>
                      </div>

                      <div className="rounded-[12px] border border-border/60 bg-muted/40 p-4">
                        <ul className="space-y-2.5" role="list">
                          {release.changes.map((change, ci) => {
                            const cfg = CHANGE_CONFIG[change.type]
                            const Icon = cfg.icon
                            return (
                              <li
                                key={`${release.version}-${ci}`}
                                className="group/item flex w-full flex-col items-start gap-2 sm:flex-row sm:gap-3"
                              >
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "mt-0.5 min-w-[5.5rem] shrink-0 justify-center gap-1 font-semibold",
                                    cfg.badgeClass
                                  )}
                                >
                                  <Icon className="size-3" aria-hidden />
                                  {cfg.label}
                                </Badge>
                                <p className="text-sm text-muted-foreground transition-colors group-hover/item:text-foreground">
                                  {change.text}
                                </p>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {!showAll && RELEASES.length > 3 ? (
          <div className="mt-10 text-center sm:ms-10">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAll(true)}
            >
              <ChevronDownIcon className="size-4" aria-hidden />
              Show older releases
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
