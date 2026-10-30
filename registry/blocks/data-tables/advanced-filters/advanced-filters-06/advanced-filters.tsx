"use client"

import * as React from "react"
import { CheckIcon, ChevronDownIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@sonojs/ui/components/popover"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

const STATUSES = [
  {
    id: "admitted",
    label: "Admitted",
    count: 123,
    tone: "border-emerald-500/40 bg-emerald-500/10",
    bar: "bg-emerald-500",
    dot: "bg-emerald-500",
  },
  {
    id: "temporary",
    label: "Temporarily admitted",
    count: 22,
    tone: "border-sky-500/40 bg-sky-500/10",
    bar: "bg-sky-500",
    dot: "bg-sky-500",
  },
  {
    id: "awaiting",
    label: "Awaiting verification",
    count: 12,
    tone: "border-amber-500/40 bg-amber-500/10",
    bar: "bg-amber-500",
    dot: "bg-amber-500",
  },
  {
    id: "recheck",
    label: "Requires recheck",
    count: 56,
    tone: "border-orange-500/40 bg-orange-500/10",
    bar: "bg-orange-500",
    dot: "bg-orange-500",
  },
  {
    id: "rejected",
    label: "Rejected",
    count: 31,
    tone: "border-red-500/40 bg-red-500/10",
    bar: "bg-red-500",
    dot: "bg-red-500",
  },
] as const

type StatusId = (typeof STATUSES)[number]["id"]

const ALL_IDS = STATUSES.map((s) => s.id) as StatusId[]
const TOTAL = STATUSES.reduce((sum, s) => sum + s.count, 0)

const DEFAULT_SELECTED: StatusId[] = [
  "admitted",
  "temporary",
  "awaiting",
  "recheck",
]

export default function AdvancedFilters06() {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<Set<StatusId>>(
    () => new Set(DEFAULT_SELECTED)
  )

  const allChecked = selected.size === ALL_IDS.length
  const selectedCount = selected.size
  const matched = STATUSES.filter((s) => selected.has(s.id)).reduce(
    (sum, s) => sum + s.count,
    0
  )

  const toggle = (id: StatusId) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleAll = () => {
    setSelected(allChecked ? new Set() : new Set(ALL_IDS))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button type="button" className="max-w-full cursor-pointer gap-2">
          Status
          {selectedCount > 0 ? (
            <Badge
              variant="secondary"
              className="shrink-0 border-transparent bg-primary-foreground/15 text-primary-foreground tabular-nums"
            >
              {selectedCount}
            </Badge>
          ) : null}
          <ChevronDownIcon
            className={cn(
              "size-4 shrink-0 opacity-70 transition-transform",
              open && "rotate-180"
            )}
            aria-hidden
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={8}
        collisionPadding={16}
        className="box-border w-[min(100vw-1.5rem,20rem)] max-w-[calc(100vw-1.5rem)] overflow-hidden border-border/70 p-0 shadow-soft"
      >
        <div className="border-b border-border/70 px-3 py-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1 text-start">
              <p className="text-sm font-semibold">Filter by status</p>
              <p className="truncate text-xs text-muted-foreground">
                Pipeline of{" "}
                <span dir="ltr" className="tabular-nums">
                  {TOTAL.toLocaleString("en-US")}
                </span>
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-24 shrink-0 cursor-pointer justify-center px-2 text-xs"
              onClick={toggleAll}
            >
              {allChecked ? "Clear" : "Select all"}
            </Button>
          </div>
          <div
            className="mt-2.5 flex h-1.5 w-full overflow-hidden rounded-full bg-muted"
            dir="ltr"
          >
            {STATUSES.map((item) => {
              const on = selected.has(item.id)
              return (
                <div
                  key={item.id}
                  title={item.label}
                  className={cn(
                    "h-full shrink-0 transition-opacity",
                    item.bar,
                    on ? "opacity-100" : "opacity-25 dark:opacity-20"
                  )}
                  style={{ width: `${(item.count / TOTAL) * 100}%` }}
                />
              )
            })}
          </div>
          <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
            <span>Showing</span>
            <span
              className="inline-block w-8 text-center font-semibold text-foreground tabular-nums"
              dir="ltr"
            >
              {matched.toLocaleString("en-US")}
            </span>
            <span>of</span>
            <span className="tabular-nums" dir="ltr">
              {TOTAL.toLocaleString("en-US")}
            </span>
          </p>
        </div>

        <div className="space-y-1 p-2" role="listbox" aria-multiselectable>
          {STATUSES.map((item) => {
            const on = selected.has(item.id)
            const pct = Math.round((item.count / TOTAL) * 100)
            return (
              <button
                key={item.id}
                type="button"
                role="option"
                aria-selected={on}
                onClick={() => toggle(item.id)}
                className={cn(
                  "flex w-full cursor-pointer items-center gap-2.5 rounded-md border px-2.5 py-2 text-start transition-colors",
                  on
                    ? item.tone
                    : "border-border/70 bg-card hover:bg-muted/40"
                )}
              >
                <span
                  className={cn(
                    "flex size-4 shrink-0 items-center justify-center rounded-sm border",
                    on
                      ? "border-transparent bg-foreground text-background"
                      : "border-border/70 bg-background"
                  )}
                  aria-hidden
                >
                  {on ? <CheckIcon className="size-2.5" /> : null}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="flex min-w-0 items-center gap-2">
                      <span
                        className={cn("size-2 shrink-0 rounded-full", item.dot)}
                        aria-hidden
                      />
                      <span className="truncate text-sm font-medium">
                        {item.label}
                      </span>
                    </span>
                    <span className="w-8 shrink-0 text-end text-xs font-semibold tabular-nums">
                      {item.count}
                    </span>
                  </span>
                  <span className="mt-1 flex items-center gap-2" dir="ltr">
                    <span className="h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-background/70 dark:bg-background/40">
                      <span
                        className={cn(
                          "block h-full rounded-full transition-[width]",
                          item.bar
                        )}
                        style={{ width: `${pct}%` }}
                      />
                    </span>
                    <span className="w-7 shrink-0 text-end text-[10px] text-muted-foreground tabular-nums">
                      {pct}%
                    </span>
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        <Separator />
        <div className="px-3 py-2.5">
          <Button
            type="button"
            size="sm"
            className="h-9 w-full cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Apply status
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
