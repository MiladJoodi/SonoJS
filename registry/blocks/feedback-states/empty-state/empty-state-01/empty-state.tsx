"use client"

import * as React from "react"
import { FilterIcon, SearchIcon, SlidersHorizontalIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@sonojs/ui/components/empty"
import { Input } from "@sonojs/ui/components/input"
import { cn } from "@/lib/utils"

const FILTERS = ["Docs", "Components", "Blocks"] as const

export default function EmptyState({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [query, setQuery] = React.useState("quantum widgets")
  const [active, setActive] = React.useState<string[]>(["Docs", "Blocks"])

  function toggleFilter(label: string) {
    setActive((prev) =>
      prev.includes(label) ? prev.filter((f) => f !== label) : [...prev, label]
    )
  }

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas px-4 py-10 text-foreground sm:px-6 sm:py-14",
        className
      )}
      aria-labelledby="empty-state-01-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
        <div className="space-y-4 border-b border-border/70 p-4 sm:p-5">
          <div className="relative">
            <SearchIcon
              className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="ps-9"
              placeholder="Search…"
              aria-label="Search"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <FilterIcon className="size-3.5" aria-hidden />
              Filters
            </span>
            {FILTERS.map((label) => {
              const selected = active.includes(label)
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => toggleFilter(label)}
                  className={cn(
                    "cursor-pointer rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
                    selected
                      ? "border-transparent bg-primary/10 text-primary"
                      : "border-border/70 bg-card text-muted-foreground hover:text-foreground"
                  )}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        <Empty className="min-h-[280px] border-0">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SearchIcon aria-hidden />
            </EmptyMedia>
            <EmptyTitle id="empty-state-01-heading">
              No results for “{query || "your search"}”
            </EmptyTitle>
            <EmptyDescription>
              Try different keywords or clear filters. Nothing matched in the
              selected categories.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                onClick={() => {
                  setQuery("")
                  setActive([])
                }}
              >
                Clear filters
              </Button>
              <Button type="button" className="cursor-pointer">
                <SlidersHorizontalIcon className="size-4" aria-hidden />
                Refine search
              </Button>
            </div>
            {active.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-1.5">
                {active.map((label) => (
                  <Badge
                    key={label}
                    variant="outline"
                    className="rounded-full border-transparent bg-muted text-muted-foreground"
                  >
                    {label}
                  </Badge>
                ))}
              </div>
            ) : null}
          </EmptyContent>
        </Empty>
      </div>
    </section>
  )
}
