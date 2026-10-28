"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  StarIcon,
  XIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@sonojs/ui/components/input-group"
import { Label } from "@sonojs/ui/components/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

const CATEGORIES = ["Electronics", "Office", "Lifestyle", "Software"] as const
const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price ↑" },
  { value: "price-desc", label: "Price ↓" },
  { value: "rating", label: "Top rated" },
] as const

type Category = (typeof CATEGORIES)[number]

interface Listing {
  id: string
  title: string
  category: Category
  price: number
  rating: number
  verified: boolean
  freeShipping: boolean
  updated: string
  snippet: string
}

const LISTINGS: Listing[] = [
  {
    id: "1",
    title: "Noise-cancel workstation headset",
    category: "Electronics",
    price: 219,
    rating: 4.8,
    verified: true,
    freeShipping: true,
    updated: "2026-06-18",
    snippet: "USB-C + Bluetooth, 40h battery, detachable mic boom.",
  },
  {
    id: "2",
    title: "Ergonomic mesh office chair",
    category: "Office",
    price: 349,
    rating: 4.6,
    verified: true,
    freeShipping: false,
    updated: "2026-06-10",
    snippet: "Lumbar support, breathable mesh, 5-year warranty.",
  },
  {
    id: "3",
    title: "Refurbished 4K portable monitor",
    category: "Electronics",
    price: 189,
    rating: 4.2,
    verified: true,
    freeShipping: true,
    updated: "2026-05-28",
    snippet: "15.6″ IPS, USB-C power, Grade A refurb with stand.",
  },
  {
    id: "4",
    title: "Focus timer desk lamp",
    category: "Lifestyle",
    price: 64,
    rating: 4.4,
    verified: false,
    freeShipping: true,
    updated: "2026-06-01",
    snippet: "Warm/cool modes, built-in Pomodoro timer, USB power.",
  },
  {
    id: "5",
    title: "Team wiki Starter license",
    category: "Software",
    price: 29,
    rating: 4.9,
    verified: true,
    freeShipping: true,
    updated: "2026-06-20",
    snippet: "Up to 10 seats, version history, SSO add-on ready.",
  },
  {
    id: "6",
    title: "Standing desk converter",
    category: "Office",
    price: 159,
    rating: 3.9,
    verified: false,
    freeShipping: false,
    updated: "2026-04-12",
    snippet: "Gas-spring lift, dual monitor tray, cable grommets.",
  },
]

function money(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" })
}

/** Advanced search results — SERP first, compact Edit filters panel (not a facet builder). */
export default function SearchResults({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [query, setQuery] = React.useState("monitor")
  const [categories, setCategories] = React.useState<Set<Category>>(
    () => new Set(["Electronics"])
  )
  const [verifiedOnly, setVerifiedOnly] = React.useState(true)
  const [freeShipping, setFreeShipping] = React.useState(false)
  const [minRating, setMinRating] = React.useState(false)
  const [sort, setSort] = React.useState("relevance")
  const [editOpen, setEditOpen] = React.useState(false)

  const toggleCat = (c: Category) => {
    setCategories((prev) => {
      const next = new Set(prev)
      if (next.has(c)) next.delete(c)
      else next.add(c)
      return next
    })
  }

  const chips: { key: string; label: string; clear: () => void }[] = []
  for (const c of categories) {
    chips.push({
      key: `cat-${c}`,
      label: c,
      clear: () => toggleCat(c),
    })
  }
  if (verifiedOnly) {
    chips.push({
      key: "verified",
      label: "Verified",
      clear: () => setVerifiedOnly(false),
    })
  }
  if (freeShipping) {
    chips.push({
      key: "ship",
      label: "Free shipping",
      clear: () => setFreeShipping(false),
    })
  }
  if (minRating) {
    chips.push({
      key: "rating",
      label: "4+ stars",
      clear: () => setMinRating(false),
    })
  }

  const clearAll = () => {
    setCategories(new Set())
    setVerifiedOnly(false)
    setFreeShipping(false)
    setMinRating(false)
  }

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = LISTINGS.filter((item) => {
      if (
        q &&
        !item.title.toLowerCase().includes(q) &&
        !item.snippet.toLowerCase().includes(q)
      ) {
        return false
      }
      if (categories.size > 0 && !categories.has(item.category)) return false
      if (verifiedOnly && !item.verified) return false
      if (freeShipping && !item.freeShipping) return false
      if (minRating && item.rating < 4) return false
      return true
    })
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price)
    else if (sort === "price-desc")
      list = [...list].sort((a, b) => b.price - a.price)
    else if (sort === "rating")
      list = [...list].sort((a, b) => b.rating - a.rating)
    else if (sort === "newest")
      list = [...list].sort((a, b) => b.updated.localeCompare(a.updated))
    return list
  }, [query, categories, verifiedOnly, freeShipping, minRating, sort])

  return (
    <div
      className={cn(
        "min-h-[min(48rem,100svh)] bg-white text-foreground dark:bg-background",
        className
      )}
      {...props}
    >
      <div className="border-b border-border/70 bg-card shadow-soft">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:px-6">
          <InputGroup className="h-[46px] flex-1">
            <InputGroupAddon align="inline-start">
              <SearchIcon aria-hidden />
            </InputGroupAddon>
            <InputGroupInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search listings…"
              aria-label="Search listings"
            />
            {query ? (
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  type="button"
                  aria-label="Clear search"
                  className="cursor-pointer"
                  onClick={() => setQuery("")}
                >
                  <XIcon aria-hidden />
                </InputGroupButton>
              </InputGroupAddon>
            ) : null}
          </InputGroup>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="h-[46px] w-full cursor-pointer sm:w-44">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="cursor-pointer gap-1.5"
            aria-expanded={editOpen}
            onClick={() => setEditOpen((o) => !o)}
          >
            <SlidersHorizontalIcon className="size-3.5" aria-hidden />
            Edit filters
            <ChevronDownIcon
              className={cn(
                "size-3.5 opacity-60 transition-transform",
                editOpen && "rotate-180"
              )}
              aria-hidden
            />
          </Button>
          {chips.length > 0 ? (
            <>
              {chips.map((chip) => (
                <button
                  key={chip.key}
                  type="button"
                  onClick={chip.clear}
                  className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium"
                >
                  {chip.label}
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
            </>
          ) : null}
        </div>

        {editOpen ? (
          <div className="mb-6 rounded-[12px] border border-border/70 bg-card p-4 shadow-soft sm:p-5">
            <p className="mb-4 text-sm font-semibold text-start">
              Refine this search
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              <fieldset>
                <legend className="mb-2.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Category
                </legend>
                <div className="space-y-2">
                  {CATEGORIES.map((c) => {
                    const id = `sr-04-cat-${c}`
                    return (
                      <div key={c} className="flex items-center gap-2.5">
                        <Checkbox
                          id={id}
                          checked={categories.has(c)}
                          className="cursor-pointer"
                          onCheckedChange={() => toggleCat(c)}
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
              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Options
                </p>
                <div className="flex items-center gap-2.5">
                  <Checkbox
                    id="sr-04-verified"
                    checked={verifiedOnly}
                    className="cursor-pointer"
                    onCheckedChange={(v) => setVerifiedOnly(v === true)}
                  />
                  <Label
                    htmlFor="sr-04-verified"
                    className="cursor-pointer font-normal"
                  >
                    Verified sellers
                  </Label>
                </div>
                <div className="flex items-center gap-2.5">
                  <Checkbox
                    id="sr-04-ship"
                    checked={freeShipping}
                    className="cursor-pointer"
                    onCheckedChange={(v) => setFreeShipping(v === true)}
                  />
                  <Label
                    htmlFor="sr-04-ship"
                    className="cursor-pointer font-normal"
                  >
                    Free shipping
                  </Label>
                </div>
                <div className="flex items-center gap-2.5">
                  <Checkbox
                    id="sr-04-rating"
                    checked={minRating}
                    className="cursor-pointer"
                    onCheckedChange={(v) => setMinRating(v === true)}
                  />
                  <Label
                    htmlFor="sr-04-rating"
                    className="cursor-pointer font-normal"
                  >
                    4+ star rating
                  </Label>
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                size="sm"
                className="cursor-pointer"
                onClick={() => setEditOpen(false)}
              >
                Apply
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="cursor-pointer"
                onClick={clearAll}
              >
                Clear
              </Button>
            </div>
          </div>
        ) : null}

        <p className="mb-4 text-sm text-muted-foreground text-start">
          <span className="font-semibold text-foreground" dir="ltr">
            {filtered.length}
          </span>{" "}
          results
          {query.trim() ? (
            <>
              {" "}
              for{" "}
              <span className="font-semibold text-foreground">
                &ldquo;{query.trim()}&rdquo;
              </span>
            </>
          ) : null}
        </p>

        <ul className="space-y-3" role="list">
          {filtered.map((item) => (
            <li
              key={item.id}
              className="rounded-[12px] border border-border/70 bg-card p-4 shadow-soft sm:p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 text-start">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h2 className="text-sm font-semibold">{item.title}</h2>
                    <Badge variant="outline">{item.category}</Badge>
                    {item.verified ? <Badge variant="secondary">Verified</Badge> : null}
                  </div>
                  <p className="text-sm text-muted-foreground">{item.snippet}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1" dir="ltr">
                      <StarIcon
                        className="size-3.5 fill-amber-400 text-amber-400"
                        aria-hidden
                      />
                      {item.rating.toFixed(1)}
                    </span>
                    {item.freeShipping ? <span>Free shipping</span> : null}
                    <span dir="ltr">Updated {item.updated}</span>
                  </div>
                </div>
                <p className="shrink-0 text-base font-semibold tabular-nums" dir="ltr">
                  {money(item.price)}
                </p>
              </div>
            </li>
          ))}
          {filtered.length === 0 ? (
            <li className="rounded-[12px] border border-dashed border-border/70 px-4 py-12 text-center text-sm text-muted-foreground">
              No listings match this search.
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  )
}
