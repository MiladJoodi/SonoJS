"use client"

import * as React from "react"
import { SlidersHorizontalIcon, XIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import { Label } from "@sonojs/ui/components/label"
import { Separator } from "@sonojs/ui/components/separator"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@sonojs/ui/components/sheet"
import { Slider } from "@sonojs/ui/components/slider"
import { Switch } from "@sonojs/ui/components/switch"
import { cn } from "@/lib/utils"

const QUICK_CONDITIONS = ["New", "Refurbished", "Open box"] as const
const SHIPPING = ["Free shipping", "Same-day", "Pickup"] as const
const SELLERS = ["Top rated", "Verified", "Local"] as const

function money(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" })
}

/** Chip strip + All filters sheet — filter chrome as the product. */
export default function FilterPanel({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [conditions, setConditions] = React.useState<Set<string>>(
    () => new Set(["New"])
  )
  const [shipping, setShipping] = React.useState<Set<string>>(() => new Set())
  const [sellers, setSellers] = React.useState<Set<string>>(() => new Set())
  const [price, setPrice] = React.useState<[number, number]>([50, 1200])
  const [dealsOnly, setDealsOnly] = React.useState(false)
  const [sheetOpen, setSheetOpen] = React.useState(false)

  const toggle = (
    setter: React.Dispatch<React.SetStateAction<Set<string>>>,
    value: string
  ) => {
    setter((prev) => {
      const next = new Set(prev)
      if (next.has(value)) next.delete(value)
      else next.add(value)
      return next
    })
  }

  const chips = [
    ...Array.from(conditions).map((v) => ({ group: "condition" as const, v })),
    ...Array.from(shipping).map((v) => ({ group: "shipping" as const, v })),
    ...Array.from(sellers).map((v) => ({ group: "seller" as const, v })),
    ...(dealsOnly ? [{ group: "deal" as const, v: "Deals" }] : []),
  ]

  const removeChip = (group: (typeof chips)[number]["group"], v: string) => {
    if (group === "condition") toggle(setConditions, v)
    else if (group === "shipping") toggle(setShipping, v)
    else if (group === "seller") toggle(setSellers, v)
    else setDealsOnly(false)
  }

  const clearAll = () => {
    setConditions(new Set())
    setShipping(new Set())
    setSellers(new Set())
    setPrice([50, 1200])
    setDealsOnly(false)
  }

  const activeCount =
    conditions.size +
    shipping.size +
    sellers.size +
    (dealsOnly ? 1 : 0) +
    (price[0] > 50 || price[1] < 1200 ? 1 : 0)

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white py-10 text-foreground dark:bg-background",
        className
      )}
      aria-labelledby="filter-panel-04-heading"
      {...props}
    >
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="mb-6 text-center sm:text-start">
          <h1
            id="filter-panel-04-heading"
            className="text-lg font-semibold tracking-tight"
          >
            Active filters
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Quick chips plus an All filters sheet — no SERP chrome.
          </p>
        </div>

        <div className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
          <div className="flex flex-wrap items-center gap-2 border-b border-border/70 px-4 py-4">
            {QUICK_CONDITIONS.map((c) => {
              const on = conditions.has(c)
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(setConditions, c)}
                  className={cn(
                    "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    on
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border/70 bg-background text-foreground hover:border-border"
                  )}
                >
                  {c}
                </button>
              )
            })}

            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="cursor-pointer gap-1.5"
                >
                  <SlidersHorizontalIcon className="size-3.5" aria-hidden />
                  All filters
                  {activeCount > 0 ? (
                    <Badge variant="secondary">{activeCount}</Badge>
                  ) : null}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="end"
                className="flex w-full flex-col gap-0 sm:max-w-md"
              >
                <SheetHeader className="border-b border-border/70 text-start">
                  <SheetTitle>All filters</SheetTitle>
                </SheetHeader>
                <div className="flex-1 space-y-6 overflow-y-auto px-4 py-5 pb-8">
                  <fieldset>
                    <legend className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Condition
                    </legend>
                    <div className="space-y-2.5">
                      {QUICK_CONDITIONS.map((c) => {
                        const id = `fp-04-cond-${c}`
                        return (
                          <div key={c} className="flex items-center gap-2.5">
                            <Checkbox
                              id={id}
                              checked={conditions.has(c)}
                              className="cursor-pointer"
                              onCheckedChange={() => toggle(setConditions, c)}
                            />
                            <Label
                              htmlFor={id}
                              className="cursor-pointer font-normal"
                            >
                              {c}
                            </Label>
                          </div>
                        )
                      })}
                    </div>
                  </fieldset>

                  <Separator />

                  <fieldset>
                    <legend className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Shipping
                    </legend>
                    <div className="space-y-2.5">
                      {SHIPPING.map((s) => {
                        const id = `fp-04-ship-${s}`
                        return (
                          <div key={s} className="flex items-center gap-2.5">
                            <Checkbox
                              id={id}
                              checked={shipping.has(s)}
                              className="cursor-pointer"
                              onCheckedChange={() => toggle(setShipping, s)}
                            />
                            <Label
                              htmlFor={id}
                              className="cursor-pointer font-normal"
                            >
                              {s}
                            </Label>
                          </div>
                        )
                      })}
                    </div>
                  </fieldset>

                  <Separator />

                  <fieldset>
                    <legend className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Seller
                    </legend>
                    <div className="space-y-2.5">
                      {SELLERS.map((s) => {
                        const id = `fp-04-seller-${s}`
                        return (
                          <div key={s} className="flex items-center gap-2.5">
                            <Checkbox
                              id={id}
                              checked={sellers.has(s)}
                              className="cursor-pointer"
                              onCheckedChange={() => toggle(setSellers, s)}
                            />
                            <Label
                              htmlFor={id}
                              className="cursor-pointer font-normal"
                            >
                              {s}
                            </Label>
                          </div>
                        )
                      })}
                    </div>
                  </fieldset>

                  <Separator />

                  <div>
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                        Price
                      </p>
                      <p className="text-xs font-semibold tabular-nums" dir="ltr">
                        {money(price[0])} – {money(price[1])}
                      </p>
                    </div>
                    <Slider
                      min={50}
                      max={1200}
                      step={10}
                      value={price}
                      onValueChange={(value) => {
                        if (value.length >= 2) {
                          setPrice([value[0]!, value[1]!])
                        }
                      }}
                      aria-label="Price range"
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between gap-3">
                    <Label htmlFor="fp-04-deals" className="cursor-pointer">
                      Deals only
                    </Label>
                    <Switch
                      id="fp-04-deals"
                      checked={dealsOnly}
                      onCheckedChange={setDealsOnly}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
                <SheetFooter className="flex-row gap-2 border-t border-border/70 sm:flex-row">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 cursor-pointer"
                    onClick={clearAll}
                  >
                    Clear
                  </Button>
                  <Button
                    type="button"
                    className="flex-1 cursor-pointer"
                    onClick={() => setSheetOpen(false)}
                  >
                    Apply filters
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>

          <div className="space-y-3 px-4 py-4">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase text-start">
              Applied
            </p>
            {chips.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {chips.map(({ group, v }) => (
                  <button
                    key={`${group}-${v}`}
                    type="button"
                    onClick={() => removeChip(group, v)}
                    className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium"
                  >
                    {v}
                    <XIcon className="size-3 opacity-60" aria-hidden />
                  </button>
                ))}
                <button
                  type="button"
                  onClick={clearAll}
                  className="cursor-pointer px-2 text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </button>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-start">
                No filters applied yet.
              </p>
            )}

            <div
              className="rounded-md border border-dashed border-border/70 bg-muted/20 px-3 py-6 text-center"
              aria-hidden
            >
              <p className="text-xs text-muted-foreground">
                Results preview omitted — this block is the filter chrome.
              </p>
              <div className="mx-auto mt-3 h-2 w-2/3 rounded-full bg-muted" />
              <div className="mx-auto mt-2 h-2 w-1/2 rounded-full bg-muted" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
