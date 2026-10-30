"use client"

import * as React from "react"
import { ChevronDownIcon, SlidersHorizontalIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@sonojs/ui/components/popover"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

const PRESETS = [
  { id: "100001+", label: "100,001+", min: 100_001, max: null, volume: 18 },
  { id: "10001-100000", label: "10,001–100,000", min: 10_001, max: 100_000, volume: 42 },
  { id: "1001-10000", label: "1,001–10,000", min: 1_001, max: 10_000, volume: 76 },
  { id: "101-1000", label: "101–1,000", min: 101, max: 1_000, volume: 128 },
  { id: "11-100", label: "11–100", min: 11, max: 100, volume: 94 },
  { id: "1-10", label: "1–10", min: 1, max: 10, volume: 61 },
] as const

const MAX_VOLUME = Math.max(...PRESETS.map((p) => p.volume))

type PresetId = (typeof PRESETS)[number]["id"] | "custom"

function parseAmount(raw: string): number | null {
  const parsed = Number.parseInt(raw.replace(/[^\d]/g, ""), 10)
  return Number.isFinite(parsed) ? parsed : null
}

function formatAmount(n: number) {
  return n.toLocaleString("en-US")
}

export default function AdvancedFilters08() {
  const [open, setOpen] = React.useState(false)
  const [preset, setPreset] = React.useState<PresetId>("101-1000")
  const [fromDraft, setFromDraft] = React.useState("")
  const [toDraft, setToDraft] = React.useState("")
  const [applied, setApplied] = React.useState<{
    preset: PresetId
    from: number | null
    to: number | null
  }>({
    preset: "101-1000",
    from: 101,
    to: 1_000,
  })

  const isCustom = preset === "custom"

  const apply = () => {
    if (preset === "custom") {
      const from = parseAmount(fromDraft)
      const to = parseAmount(toDraft)
      let lo = from
      let hi = to
      if (lo != null && hi != null && lo > hi) {
        ;[lo, hi] = [hi, lo]
        setFromDraft(String(lo))
        setToDraft(String(hi))
      }
      setApplied({ preset, from: lo, to: hi })
    } else {
      const option = PRESETS.find((p) => p.id === preset)!
      setApplied({ preset, from: option.min, to: option.max })
    }
    setOpen(false)
  }

  const triggerLabel = (() => {
    if (applied.preset !== "custom") {
      return PRESETS.find((p) => p.id === applied.preset)?.label ?? "Range"
    }
    if (applied.from != null && applied.to != null) {
      return `${formatAmount(applied.from)}–${formatAmount(applied.to)}`
    }
    if (applied.from != null) return `${formatAmount(applied.from)}+`
    if (applied.to != null) return `≤ ${formatAmount(applied.to)}`
    return "Custom"
  })()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button type="button" className="max-w-full cursor-pointer gap-2">
          <SlidersHorizontalIcon
            className="size-4 shrink-0 opacity-80"
            aria-hidden
          />
          <span className="truncate">Filter by range</span>
          <Badge
            variant="secondary"
            className="max-w-28 shrink-0 truncate border-transparent bg-primary-foreground/15 text-primary-foreground tabular-nums sm:max-w-36"
          >
            {triggerLabel}
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
        className="w-[min(100vw-1.5rem,20rem)] max-w-[calc(100vw-1.5rem)] overflow-hidden border-border/70 p-0 shadow-soft"
      >
        <div className="border-b border-border/70 px-3.5 py-3 text-start">
          <p className="text-sm font-semibold">Volume ladder</p>
          <p className="text-xs text-muted-foreground">
            Pick a bucket — bars show relative density
          </p>
        </div>

        <div
          className="max-h-[min(42dvh,17rem)] space-y-1 overflow-y-auto overscroll-contain p-2"
          role="listbox"
          aria-label="Range presets"
        >
          {PRESETS.map((option) => {
            const on = preset === option.id
            const width = Math.max(12, (option.volume / MAX_VOLUME) * 100)
            return (
              <button
                key={option.id}
                type="button"
                role="option"
                aria-selected={on}
                onClick={() => setPreset(option.id)}
                className={cn(
                  "group flex min-h-11 w-full cursor-pointer flex-col gap-1.5 rounded-md border px-2.5 py-2 text-start transition-colors",
                  on
                    ? "border-primary/40 bg-primary/5 dark:bg-primary/10"
                    : "border-transparent hover:bg-muted/60"
                )}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="flex min-w-0 items-center gap-2">
                    <span
                      className={cn(
                        "size-3.5 shrink-0 rounded-full border",
                        on
                          ? "border-primary bg-primary shadow-[0_0_0_3px] shadow-primary/20"
                          : "border-border/70 bg-background"
                      )}
                      aria-hidden
                    />
                    <span
                      className="truncate text-sm font-medium tabular-nums"
                      dir="ltr"
                    >
                      {option.label}
                    </span>
                  </span>
                  <span className="shrink-0 text-[10px] text-muted-foreground tabular-nums">
                    {option.volume}
                  </span>
                </span>
                <span className="h-1.5 w-full overflow-hidden rounded-full bg-muted" dir="ltr">
                  <span
                    className={cn(
                      "block h-full rounded-full transition-all",
                      on ? "bg-primary" : "bg-muted-foreground/35"
                    )}
                    style={{ width: `${width}%` }}
                  />
                </span>
              </button>
            )
          })}

          <button
            type="button"
            role="option"
            aria-selected={isCustom}
            onClick={() => setPreset("custom")}
            className={cn(
              "mt-1 flex min-h-11 w-full cursor-pointer items-center gap-2 rounded-md border px-2.5 py-2.5 text-start text-sm font-medium transition-colors",
              isCustom
                ? "border-primary/40 bg-primary/5 dark:bg-primary/10"
                : "border-dashed border-border/70 hover:bg-muted/60"
            )}
          >
            <span
              className={cn(
                "size-3.5 shrink-0 rounded-full border",
                isCustom
                  ? "border-primary bg-primary shadow-[0_0_0_3px] shadow-primary/20"
                  : "border-border/70 bg-background"
              )}
              aria-hidden
            />
            Custom range
          </button>

          <div
            className={cn(
              "grid grid-cols-2 gap-2 rounded-md border border-border/70 bg-muted/20 p-2.5 dark:bg-muted/15",
              isCustom ? "mt-1" : "hidden"
            )}
          >
            <div className="space-y-1">
              <Label htmlFor="af-08-from" className="text-xs">
                From
              </Label>
              <Input
                id="af-08-from"
                inputMode="numeric"
                placeholder="Min"
                value={fromDraft}
                disabled={!isCustom}
                onChange={(e) => setFromDraft(e.target.value)}
                className="h-9 tabular-nums"
                dir="ltr"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="af-08-to" className="text-xs">
                To
              </Label>
              <Input
                id="af-08-to"
                inputMode="numeric"
                placeholder="Max"
                value={toDraft}
                disabled={!isCustom}
                onChange={(e) => setToDraft(e.target.value)}
                className="h-9 tabular-nums"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        <Separator />
        <div className="flex flex-col-reverse gap-2 px-3 py-3 sm:flex-row sm:items-center sm:justify-end sm:px-3.5">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-10 cursor-pointer sm:h-9"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            className="h-10 cursor-pointer sm:h-9"
            onClick={apply}
          >
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
