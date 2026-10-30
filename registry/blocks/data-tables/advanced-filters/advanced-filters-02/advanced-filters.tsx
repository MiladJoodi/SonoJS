"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  PackageIcon,
  SearchIcon,
  SparklesIcon,
  StarIcon,
  TagIcon,
  TruckIcon,
  XIcon,
} from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@sonojs/ui/components/accordion"
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
import { RadioGroup, RadioGroupItem } from "@sonojs/ui/components/radio-group"
import { Separator } from "@sonojs/ui/components/separator"
import { Slider } from "@sonojs/ui/components/slider"
import { cn } from "@/lib/utils"

const CATEGORIES = [
  { id: "electronics", label: "Electronics", count: 128 },
  { id: "home", label: "Home & Kitchen", count: 86 },
  { id: "apparel", label: "Apparel", count: 214 },
  { id: "sports", label: "Sports", count: 64 },
  { id: "beauty", label: "Beauty", count: 91 },
] as const

const SUGGESTED_KEYWORDS = [
  "wireless",
  "noise cancelling",
  "portable",
  "eco-friendly",
] as const

const SHIPPING = [
  { id: "any", label: "Any", hint: "No preference" },
  { id: "free", label: "Free shipping", hint: "Seller covers delivery" },
  { id: "express", label: "Express", hint: "1–2 business days" },
  { id: "pickup", label: "Store pickup", hint: "Collect locally" },
] as const

const PRICE_MIN = 0
const PRICE_MAX = 1000

function money(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  })
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

export default function AdvancedFilters02() {
  const [open, setOpen] = React.useState(false)
  const [keywordDraft, setKeywordDraft] = React.useState("")
  const [keywords, setKeywords] = React.useState<string[]>(["wireless"])
  const [categories, setCategories] = React.useState<Set<string>>(
    () => new Set(["electronics"])
  )
  const [price, setPrice] = React.useState<[number, number]>([50, 450])
  const [shipping, setShipping] = React.useState("any")
  const [minRating, setMinRating] = React.useState(4)

  const addKeyword = (raw: string) => {
    const value = raw.trim().toLowerCase()
    if (!value) return
    setKeywords((prev) => (prev.includes(value) ? prev : [...prev, value]))
    setKeywordDraft("")
  }

  const removeKeyword = (value: string) => {
    setKeywords((prev) => prev.filter((k) => k !== value))
  }

  const priceDirty = price[0] > PRICE_MIN || price[1] < PRICE_MAX
  const activeCount =
    keywords.length +
    categories.size +
    (shipping !== "any" ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (priceDirty ? 1 : 0)

  const resultStub = Math.max(
    12,
    186 -
      keywords.length * 11 -
      categories.size * 9 -
      (shipping !== "any" ? 18 : 0) -
      (minRating > 0 ? minRating * 7 : 0) -
      Math.floor((price[1] - price[0]) / 40)
  )

  const clearAll = () => {
    setKeywords([])
    setKeywordDraft("")
    setCategories(new Set())
    setPrice([PRICE_MIN, PRICE_MAX])
    setShipping("any")
    setMinRating(0)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button type="button" className="max-w-full cursor-pointer gap-2">
          <SparklesIcon className="size-4 shrink-0 opacity-80" aria-hidden />
          <span className="truncate">Smart filters</span>
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
        className="w-[min(100vw-1.5rem,23rem)] max-w-[calc(100vw-1.5rem)] overflow-hidden border-border/70 p-0 shadow-soft"
      >
        <div className="relative overflow-hidden border-b border-border/70 px-3.5 py-3.5">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_start,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_55%)]"
            aria-hidden
          />
          <div className="relative flex items-start justify-between gap-2">
            <div className="min-w-0 text-start">
              <p className="text-sm font-semibold">Refine results</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Layer keywords, facets & delivery
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="relative h-8 shrink-0 cursor-pointer px-2 text-xs"
              disabled={activeCount === 0}
              onClick={clearAll}
            >
              Reset all
            </Button>
          </div>
          <div className="relative mt-3 flex items-center gap-2 rounded-md border border-border/70 bg-card/80 px-2.5 py-2 backdrop-blur-sm">
            <span className="relative flex size-2 shrink-0">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-40" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <p className="min-w-0 flex-1 text-xs text-muted-foreground">
              Live match estimate
            </p>
            <p className="text-sm font-semibold tabular-nums" dir="ltr">
              ~{resultStub}
            </p>
          </div>
        </div>

        <div className="max-h-[min(42dvh,18rem)] overflow-y-auto overscroll-contain px-2">
          <Accordion
            type="multiple"
            defaultValue={["keywords", "price"]}
            className="w-full"
          >
            <AccordionItem value="keywords" className="border-border/70 px-1.5">
              <AccordionTrigger className="cursor-pointer py-3 text-sm hover:no-underline">
                <span className="flex items-center gap-2">
                  <SearchIcon className="size-3.5 text-muted-foreground" aria-hidden />
                  Keywords
                  {keywords.length > 0 ? (
                    <Badge variant="secondary" className="h-5 px-1.5 tabular-nums">
                      {keywords.length}
                    </Badge>
                  ) : null}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pb-1">
                  <form
                    className="flex gap-2"
                    onSubmit={(e) => {
                      e.preventDefault()
                      addKeyword(keywordDraft)
                    }}
                  >
                    <Input
                      value={keywordDraft}
                      onChange={(e) => setKeywordDraft(e.target.value)}
                      placeholder="Add a keyword…"
                      aria-label="Filter keyword"
                      className="h-10"
                    />
                    <Button
                      type="submit"
                      size="sm"
                      className="h-10 shrink-0 cursor-pointer px-3"
                      disabled={!keywordDraft.trim()}
                    >
                      Add
                    </Button>
                  </form>

                  {keywords.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {keywords.map((word) => (
                        <Badge
                          key={word}
                          variant="secondary"
                          className="gap-1 pe-1 font-normal"
                        >
                          <span dir="auto">{word}</span>
                          <button
                            type="button"
                            aria-label={`Remove ${word}`}
                            className="inline-flex size-4 cursor-pointer items-center justify-center rounded-sm hover:bg-muted"
                            onClick={() => removeKeyword(word)}
                          >
                            <XIcon className="size-3" aria-hidden />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  ) : null}

                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTED_KEYWORDS.filter((s) => !keywords.includes(s)).map(
                      (suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => addKeyword(suggestion)}
                          className="cursor-pointer rounded-full border border-dashed border-border/70 px-2.5 py-0.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
                        >
                          + {suggestion}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="category" className="border-border/70 px-1.5">
              <AccordionTrigger className="cursor-pointer py-3 text-sm hover:no-underline">
                <span className="flex items-center gap-2">
                  <TagIcon className="size-3.5 text-muted-foreground" aria-hidden />
                  Category
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1 pb-1">
                  {CATEGORIES.map((cat) => {
                    const id = `af-02-cat-${cat.id}`
                    const on = categories.has(cat.id)
                    return (
                      <label
                        key={cat.id}
                        htmlFor={id}
                        className={cn(
                          "flex cursor-pointer items-center gap-2.5 rounded-md border border-transparent px-2 py-2 transition-colors hover:bg-muted/60",
                          on && "border-border/70 bg-muted/40"
                        )}
                      >
                        <Checkbox
                          id={id}
                          checked={on}
                          className="cursor-pointer"
                          onCheckedChange={(v) =>
                            toggleSet(setCategories, cat.id, v === true)
                          }
                        />
                        <span className="flex min-w-0 flex-1 items-baseline justify-between gap-2 text-sm">
                          <span className="truncate">{cat.label}</span>
                          <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                            {cat.count}
                          </span>
                        </span>
                      </label>
                    )
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="price" className="border-border/70 px-1.5">
              <AccordionTrigger className="cursor-pointer py-3 text-sm hover:no-underline">
                <span className="flex min-w-0 items-center gap-2">
                  <PackageIcon
                    className="size-3.5 shrink-0 text-muted-foreground"
                    aria-hidden
                  />
                  <span className="shrink-0">Price</span>
                  <span
                    className="min-w-0 truncate text-xs font-normal text-muted-foreground tabular-nums"
                    dir="ltr"
                  >
                    {money(price[0])}–{money(price[1])}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pb-1">
                  <div className="rounded-md border border-border/70 bg-muted/30 px-3 py-3">
                    <Slider
                      min={PRICE_MIN}
                      max={PRICE_MAX}
                      step={10}
                      value={price}
                      onValueChange={(value) => {
                        if (value.length >= 2) {
                          setPrice([value[0]!, value[1]!])
                        }
                      }}
                      aria-label="Price range"
                    />
                    <div className="mt-3 flex justify-between text-xs text-muted-foreground tabular-nums">
                      <span dir="ltr">{money(PRICE_MIN)}</span>
                      <span dir="ltr">{money(PRICE_MAX)}</span>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="shipping" className="border-border/70 px-1.5">
              <AccordionTrigger className="cursor-pointer py-3 text-sm hover:no-underline">
                <span className="flex items-center gap-2">
                  <TruckIcon className="size-3.5 text-muted-foreground" aria-hidden />
                  Shipping
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <RadioGroup
                  value={shipping}
                  onValueChange={setShipping}
                  className="gap-1.5 pb-1"
                >
                  {SHIPPING.map((option) => {
                    const id = `af-02-ship-${option.id}`
                    return (
                      <label
                        key={option.id}
                        htmlFor={id}
                        className={cn(
                          "flex cursor-pointer items-start gap-2.5 rounded-md border border-transparent px-2 py-2 transition-colors hover:bg-muted/60",
                          shipping === option.id &&
                            "border-border/70 bg-muted/40"
                        )}
                      >
                        <RadioGroupItem
                          value={option.id}
                          id={id}
                          className="mt-0.5 cursor-pointer"
                        />
                        <span className="min-w-0">
                          <Label
                            htmlFor={id}
                            className="cursor-pointer font-medium"
                          >
                            {option.label}
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            {option.hint}
                          </p>
                        </span>
                      </label>
                    )
                  })}
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="rating" className="border-border/70 px-1.5">
              <AccordionTrigger className="cursor-pointer py-3 text-sm hover:no-underline">
                <span className="flex items-center gap-2">
                  <StarIcon className="size-3.5 text-muted-foreground" aria-hidden />
                  Rating
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-1.5 pb-1">
                  {[4, 3, 2, 1].map((stars) => (
                    <button
                      key={stars}
                      type="button"
                      onClick={() =>
                        setMinRating((prev) => (prev === stars ? 0 : stars))
                      }
                      className={cn(
                        "flex cursor-pointer flex-col items-start gap-1 rounded-md border border-border/70 px-2.5 py-2 text-start transition-colors hover:bg-muted/60",
                        minRating === stars &&
                          "border-amber-500/40 bg-amber-500/10 dark:border-amber-400/30 dark:bg-amber-400/10"
                      )}
                    >
                      <span className="flex" dir="ltr" aria-hidden>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <StarIcon
                            key={i}
                            className={cn(
                              "size-3.5",
                              i < stars
                                ? "fill-amber-400 text-amber-400"
                                : "text-muted-foreground/30"
                            )}
                          />
                        ))}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {stars}+ & up
                      </span>
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <Separator />
        <div className="flex flex-col-reverse gap-2 px-3 py-3 sm:flex-row sm:items-center sm:px-3.5">
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
            className="h-10 cursor-pointer gap-2 tabular-nums sm:ms-auto sm:h-9"
            onClick={() => setOpen(false)}
          >
            Show ~{resultStub} results
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
