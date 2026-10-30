"use client"

import * as React from "react"
import {
  CheckIcon,
  ChevronDownIcon,
  DollarSignIcon,
  TagsIcon,
  TruckIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
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

const BRANDS = [
  { id: "apple", label: "Apple", count: 56 },
  { id: "samsung", label: "Samsung", count: 76 },
  { id: "sony", label: "Sony", count: 234 },
  { id: "dell", label: "Dell", count: 56 },
  { id: "logitech", label: "Logitech", count: 97 },
  { id: "asus", label: "Asus", count: 97 },
  { id: "bosch", label: "Bosch", count: 176 },
  { id: "canon", label: "Canon", count: 49 },
] as const

const SHIPPING = [
  { id: "any", label: "Any method", eta: "—" },
  { id: "free", label: "Free shipping", eta: "3–7 days" },
  { id: "express", label: "Express", eta: "1–2 days" },
  { id: "standard", label: "Standard", eta: "3–5 days" },
  { id: "pickup", label: "Store pickup", eta: "Today" },
] as const

const PANELS = [
  { id: "price", label: "Price", icon: DollarSignIcon },
  { id: "shipping", label: "Ship", icon: TruckIcon },
  { id: "brands", label: "Brands", icon: TagsIcon },
] as const

type PanelId = (typeof PANELS)[number]["id"]

const PRICE_MIN = 0
const PRICE_MAX = 2000

function money(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  })
}

function clampPrice(n: number) {
  return Math.min(PRICE_MAX, Math.max(PRICE_MIN, n))
}

function toggleSet(
  setter: React.Dispatch<React.SetStateAction<Set<string>>>,
  value: string,
  on: boolean
) {
  setter((prev) => {
    const next = new Set(prev)
    if (on) next.add(value)
    else next.delete(value)
    return next
  })
}

export default function AdvancedFilters04() {
  const [open, setOpen] = React.useState(false)
  const [panel, setPanel] = React.useState<PanelId>("price")

  const [price, setPrice] = React.useState<[number, number]>([300, 1200])
  const [fromDraft, setFromDraft] = React.useState("300")
  const [toDraft, setToDraft] = React.useState("1200")
  const [shipping, setShipping] = React.useState("free")
  const [brands, setBrands] = React.useState<Set<string>>(
    () => new Set(["apple", "samsung", "logitech"])
  )

  const syncDrafts = (next: [number, number]) => {
    setPrice(next)
    setFromDraft(String(next[0]))
    setToDraft(String(next[1]))
  }

  const commitFrom = () => {
    const parsed = Number.parseInt(fromDraft.replace(/[^\d]/g, ""), 10)
    const lo = Number.isFinite(parsed) ? clampPrice(parsed) : price[0]
    syncDrafts([lo, Math.max(lo, price[1])])
  }

  const commitTo = () => {
    const parsed = Number.parseInt(toDraft.replace(/[^\d]/g, ""), 10)
    const hi = Number.isFinite(parsed) ? clampPrice(parsed) : price[1]
    syncDrafts([Math.min(price[0], hi), hi])
  }

  const priceDirty = price[0] > PRICE_MIN || price[1] < PRICE_MAX
  const activeCount =
    brands.size + (shipping !== "any" ? 1 : 0) + (priceDirty ? 1 : 0)

  const clearAll = () => {
    syncDrafts([PRICE_MIN, PRICE_MAX])
    setShipping("any")
    setBrands(new Set())
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button type="button" className="max-w-full cursor-pointer gap-2">
          <span className="truncate">Shop filters</span>
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
        className="w-[min(100vw-1.5rem,26rem)] max-w-[calc(100vw-1.5rem)] overflow-hidden border-border/70 p-0 shadow-soft"
      >
        <div className="flex flex-wrap items-start justify-between gap-2 border-b border-border/70 px-3 py-3 sm:px-3.5">
          <div className="min-w-0 flex-1 text-start">
            <p className="text-sm font-semibold">Filter with panels</p>
            <p className="text-xs text-muted-foreground">
              Rails on mobile top · desktop side
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 shrink-0 cursor-pointer px-2 text-xs"
            disabled={activeCount === 0}
            onClick={clearAll}
          >
            Clear
          </Button>
        </div>

        <div className="flex min-h-0 flex-col sm:flex-row">
          <div
            className="flex shrink-0 gap-1 overflow-x-auto overscroll-x-contain border-b border-border/70 bg-muted/30 p-1.5 [scrollbar-width:none] sm:w-16 sm:flex-col sm:overflow-visible sm:border-e sm:border-b-0 [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Filter panels"
          >
            {PANELS.map((item) => {
              const Icon = item.icon
              const on = panel === item.id
              const hint =
                item.id === "brands"
                  ? brands.size
                  : item.id === "shipping" && shipping !== "any"
                    ? 1
                    : item.id === "price" && priceDirty
                      ? 1
                      : 0
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setPanel(item.id)}
                  className={cn(
                    "relative flex min-h-11 min-w-[4.5rem] flex-1 cursor-pointer flex-col items-center justify-center gap-1 rounded-md px-2 py-2 text-[10px] font-medium transition-colors sm:min-h-0 sm:w-full sm:flex-none sm:px-1 sm:py-2.5",
                    on
                      ? "bg-card text-foreground shadow-xs"
                      : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                  )}
                >
                  <Icon className="size-4 shrink-0" aria-hidden />
                  {item.label}
                  {hint > 0 ? (
                    <span className="absolute end-1.5 top-1.5 size-1.5 rounded-full bg-primary sm:end-1 sm:top-1" />
                  ) : null}
                </button>
              )
            })}
          </div>

          <div
            className="min-h-0 min-w-0 max-h-[min(38dvh,15rem)] flex-1 overflow-y-auto overscroll-contain p-3 sm:max-h-[min(42dvh,16rem)] sm:p-3.5"
            role="tabpanel"
          >
            {panel === "price" ? (
              <div className="space-y-4">
                <div className="rounded-md border border-border/70 bg-muted/20 px-3 py-3 text-center">
                  <p className="text-xs text-muted-foreground">Selected range</p>
                  <p className="mt-1 text-lg font-semibold tabular-nums" dir="ltr">
                    {money(price[0])} – {money(price[1])}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1.5">
                    <Label htmlFor="af-04-from" className="text-xs">
                      From
                    </Label>
                    <Input
                      id="af-04-from"
                      inputMode="numeric"
                      value={fromDraft}
                      onChange={(e) => setFromDraft(e.target.value)}
                      onBlur={commitFrom}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          commitFrom()
                        }
                      }}
                      className="h-10 tabular-nums"
                      dir="ltr"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="af-04-to" className="text-xs">
                      To
                    </Label>
                    <Input
                      id="af-04-to"
                      inputMode="numeric"
                      value={toDraft}
                      onChange={(e) => setToDraft(e.target.value)}
                      onBlur={commitTo}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          commitTo()
                        }
                      }}
                      className="h-10 tabular-nums"
                      dir="ltr"
                    />
                  </div>
                </div>
                <Slider
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  step={10}
                  value={price}
                  onValueChange={(value) => {
                    if (value.length >= 2) {
                      syncDrafts([value[0]!, value[1]!])
                    }
                  }}
                  aria-label="Price range"
                />
              </div>
            ) : null}

            {panel === "shipping" ? (
              <div className="space-y-1.5">
                {SHIPPING.map((option) => {
                  const on = shipping === option.id
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setShipping(option.id)}
                      className={cn(
                        "flex w-full cursor-pointer items-center gap-3 rounded-md border px-3 py-2.5 text-start transition-colors",
                        on
                          ? "border-primary/40 bg-primary/5 dark:bg-primary/10"
                          : "border-border/70 hover:bg-muted/50"
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-5 shrink-0 items-center justify-center rounded-full border sm:size-4",
                          on
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border/70"
                        )}
                        aria-hidden
                      >
                        {on ? <CheckIcon className="size-2.5" /> : null}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium">
                          {option.label}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ETA {option.eta}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>
            ) : null}

            {panel === "brands" ? (
              <div className="max-h-44 space-y-1 overflow-y-auto pe-0.5">
                {BRANDS.map((brand) => {
                  const id = `af-04-brand-${brand.id}`
                  const on = brands.has(brand.id)
                  return (
                    <label
                      key={brand.id}
                      htmlFor={id}
                      className={cn(
                        "flex cursor-pointer items-center gap-2.5 rounded-md border border-transparent px-2 py-2 transition-colors hover:bg-muted/50",
                        on && "border-border/60 bg-muted/40"
                      )}
                    >
                      <Checkbox
                        id={id}
                        checked={on}
                        className="cursor-pointer"
                        onCheckedChange={(v) =>
                          toggleSet(setBrands, brand.id, v === true)
                        }
                      />
                      <span className="flex min-w-0 flex-1 items-baseline justify-between gap-2 text-sm">
                        <span className="truncate">{brand.label}</span>
                        <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                          {brand.count}
                        </span>
                      </span>
                    </label>
                  )
                })}
              </div>
            ) : null}
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
            onClick={() => setOpen(false)}
          >
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
