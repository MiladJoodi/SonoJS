"use client"

import * as React from "react"
import { ChevronDownIcon, FilterIcon, RotateCcwIcon } from "lucide-react"

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
import { Slider } from "@sonojs/ui/components/slider"
import { cn } from "@/lib/utils"

const CATEGORIES = [
  { id: "gaming", label: "Gaming" },
  { id: "electronics", label: "Electronics" },
  { id: "phone", label: "Phone" },
  { id: "tv", label: "TV/Monitor" },
  { id: "laptop", label: "Laptop" },
  { id: "watch", label: "Watch" },
] as const

const STATES = [
  { id: "all", label: "All" },
  { id: "new", label: "New" },
  { id: "refurbished", label: "Refurbished" },
] as const

const PRICE_MIN = 0
const PRICE_MAX = 5000
const SALES_MIN = 0
const SALES_MAX = 500

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function parseIntSafe(raw: string, fallback: number) {
  const parsed = Number.parseInt(raw.replace(/[^\d]/g, ""), 10)
  return Number.isFinite(parsed) ? parsed : fallback
}

function money(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  })
}

export default function AdvancedFilters07() {
  const [open, setOpen] = React.useState(false)

  const [price, setPrice] = React.useState<[number, number]>([300, 3500])
  const [priceFromDraft, setPriceFromDraft] = React.useState("300")
  const [priceToDraft, setPriceToDraft] = React.useState("3500")

  const [sales, setSales] = React.useState<[number, number]>([1, 100])
  const [salesFromDraft, setSalesFromDraft] = React.useState("1")
  const [salesToDraft, setSalesToDraft] = React.useState("100")

  const [categories, setCategories] = React.useState<Set<string>>(
    () => new Set(["electronics", "phone", "laptop"])
  )
  const [state, setState] = React.useState("all")

  const syncPrice = (next: [number, number]) => {
    setPrice(next)
    setPriceFromDraft(String(next[0]))
    setPriceToDraft(String(next[1]))
  }

  const syncSales = (next: [number, number]) => {
    setSales(next)
    setSalesFromDraft(String(next[0]))
    setSalesToDraft(String(next[1]))
  }

  const commitPriceFrom = () => {
    const lo = clamp(parseIntSafe(priceFromDraft, price[0]), PRICE_MIN, PRICE_MAX)
    syncPrice([lo, Math.max(lo, price[1])])
  }

  const commitPriceTo = () => {
    const hi = clamp(parseIntSafe(priceToDraft, price[1]), PRICE_MIN, PRICE_MAX)
    syncPrice([Math.min(price[0], hi), hi])
  }

  const commitSalesFrom = () => {
    const lo = clamp(parseIntSafe(salesFromDraft, sales[0]), SALES_MIN, SALES_MAX)
    syncSales([lo, Math.max(lo, sales[1])])
  }

  const commitSalesTo = () => {
    const hi = clamp(parseIntSafe(salesToDraft, sales[1]), SALES_MIN, SALES_MAX)
    syncSales([Math.min(sales[0], hi), hi])
  }

  const toggleCategory = (id: string) => {
    setCategories((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const priceDirty = price[0] > PRICE_MIN || price[1] < PRICE_MAX
  const salesDirty = sales[0] > SALES_MIN || sales[1] < SALES_MAX
  const activeCount =
    categories.size +
    (state !== "all" ? 1 : 0) +
    (priceDirty ? 1 : 0) +
    (salesDirty ? 1 : 0)

  const resultCount = Math.max(
    8,
    96 -
      categories.size * 6 -
      (state !== "all" ? 14 : 0) -
      Math.floor((price[1] - price[0]) / 180) -
      Math.floor((sales[1] - sales[0]) / 12)
  )

  const reset = () => {
    syncPrice([PRICE_MIN, PRICE_MAX])
    syncSales([SALES_MIN, SALES_MAX])
    setCategories(new Set())
    setState("all")
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button type="button" className="max-w-full cursor-pointer gap-2">
          <FilterIcon className="size-4 shrink-0 opacity-80" aria-hidden />
          <span className="truncate">Advanced filter</span>
          {activeCount > 0 ? (
            <Badge
              variant="secondary"
              className="shrink-0 border-transparent bg-primary-foreground/15 text-primary-foreground tabular-nums"
            >
              {activeCount}
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
        className="box-border w-[min(100vw-1.5rem,22rem)] max-w-[calc(100vw-1.5rem)] overflow-hidden border-border/70 p-0 shadow-soft"
      >
        <div className="flex flex-wrap items-start justify-between gap-2 border-b border-border/70 px-3 py-2.5">
          <div className="min-w-0 flex-1 text-start">
            <p className="text-sm font-semibold">Catalog cockpit</p>
            <p className="text-xs text-muted-foreground">
              Price, sales, category & condition
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 shrink-0 cursor-pointer gap-1.5 px-2 text-xs"
            onClick={reset}
          >
            <RotateCcwIcon className="size-3.5" aria-hidden />
            Reset
          </Button>
        </div>

        <div className="max-h-[min(42dvh,18rem)] overflow-y-auto overscroll-contain">
          <div className="grid gap-0">
          <div className="space-y-3 border-b border-border/70 p-3">
            <section className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Price range
                </h3>
                <span className="text-xs font-medium tabular-nums" dir="ltr">
                  {money(price[0])}–{money(price[1])}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  inputMode="numeric"
                  aria-label="Price from"
                  value={priceFromDraft}
                  onChange={(e) => setPriceFromDraft(e.target.value)}
                  onBlur={commitPriceFrom}
                  className="h-9 tabular-nums"
                  dir="ltr"
                />
                <Input
                  inputMode="numeric"
                  aria-label="Price to"
                  value={priceToDraft}
                  onChange={(e) => setPriceToDraft(e.target.value)}
                  onBlur={commitPriceTo}
                  className="h-9 tabular-nums"
                  dir="ltr"
                />
              </div>
              <Slider
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={50}
                value={price}
                onValueChange={(value) => {
                  if (value.length >= 2) syncPrice([value[0]!, value[1]!])
                }}
                aria-label="Price range"
              />
            </section>

            <Separator />

            <section className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Sales
                </h3>
                <span className="text-xs font-medium tabular-nums" dir="ltr">
                  {sales[0]}–{sales[1]}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label className="text-[10px] text-muted-foreground">From</Label>
                  <Input
                    inputMode="numeric"
                    value={salesFromDraft}
                    onChange={(e) => setSalesFromDraft(e.target.value)}
                    onBlur={commitSalesFrom}
                    className="h-9 tabular-nums"
                    dir="ltr"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] text-muted-foreground">To</Label>
                  <Input
                    inputMode="numeric"
                    value={salesToDraft}
                    onChange={(e) => setSalesToDraft(e.target.value)}
                    onBlur={commitSalesTo}
                    className="h-9 tabular-nums"
                    dir="ltr"
                  />
                </div>
              </div>
              <Slider
                min={SALES_MIN}
                max={SALES_MAX}
                step={1}
                value={sales}
                onValueChange={(value) => {
                  if (value.length >= 2) syncSales([value[0]!, value[1]!])
                }}
                aria-label="Sales range"
              />
            </section>
          </div>

          <div className="space-y-3 p-3">
            <section className="space-y-2.5">
              <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Category
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((category) => {
                  const on = categories.has(category.id)
                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => toggleCategory(category.id)}
                      className={cn(
                        "min-h-8 cursor-pointer rounded-full border px-2.5 py-1.5 text-xs font-medium transition-colors",
                        on
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border/70 text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {category.label}
                    </button>
                  )
                })}
              </div>
            </section>

            <section className="space-y-2.5">
              <h3 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Condition
              </h3>
              <div className="grid grid-cols-3 gap-1.5">
                {STATES.map((option) => {
                  const on = state === option.id
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setState(option.id)}
                      className={cn(
                        "min-h-10 cursor-pointer rounded-md border px-1.5 py-2 text-xs font-medium transition-colors sm:px-2",
                        on
                          ? "border-primary/40 bg-primary/10 text-foreground dark:bg-primary/15"
                          : "border-border/70 text-muted-foreground hover:bg-muted/60"
                      )}
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>
            </section>

            <div className="rounded-md border border-dashed border-border/70 bg-muted/20 px-3 py-2.5 dark:bg-muted/15">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-xs text-muted-foreground">Matching SKUs</p>
                <p
                  className="text-lg font-semibold tracking-tight tabular-nums"
                  dir="ltr"
                >
                  {resultCount}
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>

        <Separator />
        <div className="flex items-center gap-2 px-3 py-3 sm:px-3.5">
          <Button
            type="button"
            className="h-11 w-full flex-1 cursor-pointer tabular-nums sm:h-10"
            onClick={() => setOpen(false)}
          >
            Show {resultCount} results
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
