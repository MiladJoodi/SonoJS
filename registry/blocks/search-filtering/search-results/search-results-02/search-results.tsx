"use client"

import * as React from "react"
import { PackageIcon, SearchIcon, StarIcon, XIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@sonojs/ui/components/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import { cn } from "@/lib/utils"

const CATEGORIES = ["All", "Audio", "Wearables", "Accessories", "Home"] as const

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price ↑" },
  { value: "price-desc", label: "Price ↓" },
  { value: "rating", label: "Top rated" },
] as const

type Category = Exclude<(typeof CATEGORIES)[number], "All">

interface Product {
  id: string
  name: string
  category: Category
  brand: string
  price: number
  rating: number
  tone: string
}

const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Studio Headphones Pro",
    category: "Audio",
    brand: "Sono",
    price: 249,
    rating: 4.8,
    tone: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
  },
  {
    id: "p2",
    name: "Pulse Smartwatch",
    category: "Wearables",
    brand: "Northline",
    price: 189,
    rating: 4.5,
    tone: "bg-violet-500/15 text-violet-700 dark:text-violet-300",
  },
  {
    id: "p3",
    name: "Wireless Earbuds Mini",
    category: "Audio",
    brand: "Apex",
    price: 79,
    rating: 4.2,
    tone: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  },
  {
    id: "p4",
    name: "Leather Desk Mat",
    category: "Accessories",
    brand: "Orbit",
    price: 48,
    rating: 4.6,
    tone: "bg-amber-500/15 text-amber-800 dark:text-amber-300",
  },
  {
    id: "p5",
    name: "Ambient Desk Lamp",
    category: "Home",
    brand: "Sono",
    price: 129,
    rating: 4.7,
    tone: "bg-orange-500/15 text-orange-800 dark:text-orange-300",
  },
  {
    id: "p6",
    name: "Fitness Band SE",
    category: "Wearables",
    brand: "Apex",
    price: 99,
    rating: 4.1,
    tone: "bg-rose-500/15 text-rose-700 dark:text-rose-300",
  },
  {
    id: "p7",
    name: "USB-C Hub 8-in-1",
    category: "Accessories",
    brand: "Northline",
    price: 69,
    rating: 4.4,
    tone: "bg-primary/10 text-primary",
  },
  {
    id: "p8",
    name: "Ceramic Diffuser",
    category: "Home",
    brand: "Orbit",
    price: 56,
    rating: 4.3,
    tone: "bg-teal-500/15 text-teal-800 dark:text-teal-300",
  },
  {
    id: "p9",
    name: "Noise-Cancel Over-Ear",
    category: "Audio",
    brand: "Northline",
    price: 299,
    rating: 4.9,
    tone: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300",
  },
]

function money(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" })
}

/** Product PLP SERP — search, category pills, sort, product grid (results hero). */
export default function SearchResults({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [query, setQuery] = React.useState("headphones")
  const [category, setCategory] = React.useState<(typeof CATEGORIES)[number]>("All")
  const [sort, setSort] = React.useState("relevance")

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = PRODUCTS.filter((p) => {
      if (category !== "All" && p.category !== category) return false
      if (
        q &&
        !p.name.toLowerCase().includes(q) &&
        !p.brand.toLowerCase().includes(q)
      ) {
        return false
      }
      return true
    })
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price)
    else if (sort === "price-desc")
      list = [...list].sort((a, b) => b.price - a.price)
    else if (sort === "rating")
      list = [...list].sort((a, b) => b.rating - a.rating)
    return list
  }, [query, category, sort])

  return (
    <div
      className={cn(
        "min-h-[min(48rem,100svh)] bg-white text-foreground dark:bg-background",
        className
      )}
      {...props}
    >
      <div className="border-b border-border/70 bg-card shadow-soft">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:px-6">
          <InputGroup className="h-[46px] flex-1">
            <InputGroupAddon align="inline-start">
              <SearchIcon aria-hidden />
            </InputGroupAddon>
            <InputGroupInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              aria-label="Search products"
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

      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
        <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="Category">
          {CATEGORIES.map((cat) => {
            const on = category === cat
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setCategory(cat)}
                className={cn(
                  "cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                  on
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border/70 bg-card text-foreground hover:border-border"
                )}
              >
                {cat}
              </button>
            )
          })}
        </div>

        <p className="mb-5 text-sm text-muted-foreground text-start">
          <span className="font-semibold text-foreground" dir="ltr">
            {filtered.length}
          </span>{" "}
          products
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

        {filtered.length === 0 ? (
          <div className="rounded-[12px] border border-dashed border-border/70 px-4 py-16 text-center">
            <PackageIcon
              className="mx-auto mb-3 size-8 text-muted-foreground"
              aria-hidden
            />
            <p className="text-sm font-medium">No products found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try another category or clear the search.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-4 cursor-pointer"
              onClick={() => {
                setQuery("")
                setCategory("All")
              }}
            >
              Reset
            </Button>
          </div>
        ) : (
          <ul
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
          >
            {filtered.map((p) => (
              <li
                key={p.id}
                className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft"
              >
                <div
                  className={cn(
                    "flex aspect-4/3 items-center justify-center",
                    p.tone
                  )}
                  aria-hidden
                >
                  <PackageIcon className="size-10 opacity-70" />
                </div>
                <div className="space-y-2 p-4 text-start">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.brand}</p>
                    </div>
                    <Badge variant="outline">{p.category}</Badge>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold tabular-nums" dir="ltr">
                      {money(p.price)}
                    </p>
                    <span
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground"
                      dir="ltr"
                    >
                      <StarIcon
                        className="size-3.5 fill-amber-400 text-amber-400"
                        aria-hidden
                      />
                      {p.rating.toFixed(1)}
                    </span>
                  </div>
                  <Button type="button" size="sm" className="w-full cursor-pointer">
                    Add to cart
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
