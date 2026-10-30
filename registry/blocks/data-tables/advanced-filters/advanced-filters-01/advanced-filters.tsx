"use client"

import * as React from "react"
import { CheckIcon, ChevronDownIcon, SearchIcon, XIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@sonojs/ui/components/popover"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

const CATEGORIES = [
  { id: "apple", label: "Apple", count: 56 },
  { id: "fitbit", label: "Fitbit", count: 56 },
  { id: "dell", label: "Dell", count: 56 },
  { id: "asus", label: "Asus", count: 97 },
  { id: "logitech", label: "Logitech", count: 97 },
  { id: "msi", label: "MSI", count: 97 },
  { id: "bosch", label: "Bosch", count: 176 },
  { id: "sony", label: "Sony", count: 234 },
  { id: "samsung", label: "Samsung", count: 76 },
  { id: "canon", label: "Canon", count: 49 },
  { id: "microsoft", label: "Microsoft", count: 45 },
  { id: "razor", label: "Razor", count: 49 },
] as const

type CategoryId = (typeof CATEGORIES)[number]["id"]

const DEFAULT_SELECTED: CategoryId[] = [
  "asus",
  "logitech",
  "msi",
  "bosch",
  "samsung",
]

export default function AdvancedFilters01() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [selected, setSelected] = React.useState<Set<CategoryId>>(
    () => new Set(DEFAULT_SELECTED)
  )

  const filtered = CATEGORIES.filter((item) =>
    item.label.toLowerCase().includes(query.trim().toLowerCase())
  )

  const toggle = (id: CategoryId) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const clear = () => setSelected(new Set())
  const selectVisible = () => {
    setSelected((prev) => {
      const next = new Set(prev)
      for (const item of filtered) next.add(item.id)
      return next
    })
  }

  const selectedItems = CATEGORIES.filter((c) => selected.has(c.id))

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button type="button" className="w-[9.5rem] max-w-full cursor-pointer gap-2">
          Brands
          <Badge
            variant="secondary"
            className="min-w-5 justify-center border-transparent bg-primary-foreground/15 text-primary-foreground tabular-nums"
          >
            {selected.size}
          </Badge>
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
        <div className="w-full space-y-2 border-b border-border/70 px-3 py-2">
          <div className="flex items-center justify-between gap-2">
            <p className="min-w-0 truncate text-sm font-semibold">
              Filter by brand
            </p>
            <div className="flex shrink-0 items-center gap-0.5">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 w-[4.75rem] cursor-pointer justify-center px-1 text-xs"
                onClick={selectVisible}
              >
                Select all
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 w-12 cursor-pointer justify-center px-1 text-xs"
                disabled={selected.size === 0}
                onClick={clear}
              >
                Clear
              </Button>
            </div>
          </div>
          <div className="relative w-full">
            <SearchIcon
              className="pointer-events-none absolute start-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search brands…"
              className="h-8 w-full ps-8"
              aria-label="Search brands"
            />
          </div>
          {selectedItems.length > 0 ? (
            <div className="flex w-full gap-1 overflow-x-auto overscroll-x-contain pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {selectedItems.map((item) => (
                <Badge
                  key={item.id}
                  variant="secondary"
                  className="h-6 shrink-0 gap-1 pe-1 font-normal"
                >
                  <span>{item.label}</span>
                  <button
                    type="button"
                    aria-label={`Remove ${item.label}`}
                    className="inline-flex size-3.5 shrink-0 cursor-pointer items-center justify-center rounded-sm hover:bg-muted"
                    onClick={() => toggle(item.id)}
                  >
                    <XIcon className="size-2.5" aria-hidden />
                  </button>
                </Badge>
              ))}
            </div>
          ) : null}
        </div>

        <div
          className="max-h-[min(28dvh,10.5rem)] w-full overflow-y-auto overscroll-contain p-1.5"
          role="listbox"
          aria-label="Brands"
        >
          {filtered.length === 0 ? (
            <p className="truncate px-2 py-4 text-center text-sm text-muted-foreground">
              No brands match
            </p>
          ) : (
            filtered.map((item) => {
              const on = selected.has(item.id)
              return (
                <button
                  key={item.id}
                  type="button"
                  role="option"
                  aria-selected={on}
                  onClick={() => toggle(item.id)}
                  className={cn(
                    "flex h-9 w-full min-w-0 cursor-pointer items-center gap-2 rounded-md px-2 text-start transition-colors hover:bg-muted/70 dark:hover:bg-muted/40",
                    on && "bg-primary/5 dark:bg-primary/10"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-md text-[10px] font-semibold uppercase",
                      on
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                    aria-hidden
                  >
                    {item.label.slice(0, 2)}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm font-medium">
                    {item.label}
                  </span>
                  <span className="w-8 shrink-0 text-end text-xs text-muted-foreground tabular-nums">
                    {item.count}
                  </span>
                  <span
                    className={cn(
                      "flex size-4 shrink-0 items-center justify-center rounded-sm border border-border/70",
                      on && "border-primary bg-primary text-primary-foreground"
                    )}
                    aria-hidden
                  >
                    {on ? <CheckIcon className="size-3" /> : null}
                  </span>
                </button>
              )
            })
          )}
        </div>

        <Separator />
        <div className="flex w-full items-center justify-between gap-2 px-3 py-2">
          <p className="flex min-w-0 items-center gap-1 text-xs text-muted-foreground">
            <span className="inline-block w-5 text-center tabular-nums">
              {selected.size}
            </span>
            <span>selected</span>
          </p>
          <Button
            type="button"
            size="sm"
            className="h-8 w-20 shrink-0 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Done
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
