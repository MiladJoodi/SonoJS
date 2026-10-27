"use client"

import * as React from "react"
import { ChevronRightIcon, SearchIcon, XIcon } from "lucide-react"

import { Checkbox } from "@sonojs/ui/components/checkbox"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@sonojs/ui/components/collapsible"
import { Label } from "@sonojs/ui/components/label"
import { Slider } from "@sonojs/ui/components/slider"
import { cn } from "@/lib/utils"

const CATEGORIES = [
  { id: "pf02-tshirts", label: "T-Shirts", value: "T-Shirts" },
  { id: "pf02-jackets", label: "Jackets", value: "jackets" },
  { id: "pf02-sweaters", label: "Sweaters", value: "sweaters" },
  { id: "pf02-sneakers", label: "Sneakers", value: "sneakers" },
  { id: "pf02-bags", label: "Crossbody Bags", value: "Crossbody-Bags" },
  { id: "pf02-hair", label: "Hair Tie", value: "Hair-Tie" },
  { id: "pf02-watches", label: "Luxury Timepieces", value: "Luxury-Timepieces" },
  { id: "pf02-glasses", label: "Sunglasses", value: "sunglasses" },
] as const

const BRANDS = [
  { id: "pf02-zara", label: "Zara", value: "Zara" },
  { id: "pf02-hm", label: "H&M", value: "H&M" },
  { id: "pf02-uniqlo", label: "Uniqlo", value: "Uniqlo" },
  { id: "pf02-levis", label: "Levi's", value: "Levi's" },
  { id: "pf02-nike", label: "Nike", value: "Nike" },
  { id: "pf02-adidas", label: "Adidas", value: "Adidas" },
  { id: "pf02-puma", label: "Puma", value: "Puma" },
  { id: "pf02-tommy", label: "Tommy Hilfiger", value: "Tommy Hilfiger" },
] as const

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "4XL"] as const

const COLORS = [
  { label: "Blue", className: "bg-blue-700" },
  { label: "Purple", className: "bg-purple-700" },
  { label: "Pink", className: "bg-pink-700" },
  { label: "Orange", className: "bg-orange-700" },
  { label: "Red", className: "bg-red-700" },
  { label: "Yellow", className: "bg-yellow-700" },
  { label: "Black", className: "bg-black dark:bg-neutral-950" },
  { label: "Gray", className: "bg-gray-700" },
] as const

const INITIAL_RECENT = ["Jackets", "Tommy Hilfiger", "Orange", "Zara", "XL"]
const PRICE_MAX = 1000

function toggleItem(list: string[], item: string) {
  return list.includes(item) ? list.filter((i) => i !== item) : [...list, item]
}

function FilterSection({
  title,
  id,
  defaultOpen = false,
  children,
}: {
  title: string
  id: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(defaultOpen)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger
        id={`${id}-button`}
        className="flex w-full cursor-pointer items-center justify-between gap-2 rounded text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-controls={`${id}-panel`}
      >
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <ChevronRightIcon
          className={cn(
            "size-3.5 shrink-0 text-muted-foreground transition-transform duration-200",
            open ? "-rotate-90" : "rotate-90"
          )}
          aria-hidden
        />
      </CollapsibleTrigger>
      <CollapsibleContent id={`${id}-panel`} role="region" aria-labelledby={`${id}-button`}>
        <div className="px-1 pb-1">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function SearchField({
  id,
  label,
  placeholder,
  value,
  onChange,
}: {
  id: string
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <form
      className="mt-2"
      role="search"
      aria-label={label}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="relative">
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        <input
          type="search"
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-10 w-full rounded-md border border-border/70 bg-white pe-10 ps-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring dark:bg-card"
        />
        <SearchIcon
          className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
      </div>
    </form>
  )
}

export default function ProductFilter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 750])
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = React.useState<string[]>([])
  const [selectedColors, setSelectedColors] = React.useState<string[]>([])
  const [recentSearches, setRecentSearches] =
    React.useState<string[]>(INITIAL_RECENT)
  const [categoryQuery, setCategoryQuery] = React.useState("")
  const [brandQuery, setBrandQuery] = React.useState("")

  const filteredCategories = CATEGORIES.filter((item) =>
    item.label.toLowerCase().includes(categoryQuery.trim().toLowerCase())
  )
  const filteredBrands = BRANDS.filter((item) =>
    item.label.toLowerCase().includes(brandQuery.trim().toLowerCase())
  )

  function clearAll() {
    setPriceRange([0, 750])
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedSizes([])
    setSelectedColors([])
    setCategoryQuery("")
    setBrandQuery("")
  }

  return (
    <div
      className={cn(
        "flex w-full flex-col bg-white lg:flex-row dark:bg-background",
        className
      )}
      aria-labelledby="filter-heading-02"
      {...props}
    >
      <aside className="w-full shrink-0 border-b border-border/60 bg-muted/50 px-4 py-6 sm:px-6 lg:max-w-[280px] lg:min-h-svh lg:border-e lg:border-b-0 dark:bg-card">
        <div className="mb-6 flex items-center border-b border-border/70 pb-2">
          <h2
            id="filter-heading-02"
            className="text-lg font-semibold text-foreground"
          >
            Filter
          </h2>
          <button
            type="button"
            onClick={clearAll}
            className="ms-auto cursor-pointer rounded text-sm font-semibold text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Clear all filters"
          >
            Clear all
          </button>
        </div>

        <div className="relative space-y-6">
          <fieldset>
            <legend className="text-sm font-semibold text-foreground">Price</legend>
            <div className="mt-6 px-1">
              <Slider
                min={0}
                max={PRICE_MAX}
                step={10}
                value={priceRange}
                onValueChange={(value) => {
                  if (value.length >= 2) setPriceRange([value[0]!, value[1]!])
                }}
                aria-label="Price range"
              />
              <div className="mt-4 flex justify-between text-sm font-medium text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </fieldset>

          <FilterSection title="Category" id="category" defaultOpen>
            <div className="mt-4">
              <SearchField
                id="search-category-02"
                label="Search category"
                placeholder="Search category"
                value={categoryQuery}
                onChange={setCategoryQuery}
              />
              <ul className="mt-6 space-y-4" aria-label="Category options">
                {filteredCategories.map((item) => (
                  <li key={item.id}>
                    <div className="flex items-center gap-2.5">
                      <Checkbox
                        id={item.id}
                        checked={selectedCategories.includes(item.value)}
                        onCheckedChange={() =>
                          setSelectedCategories((prev) =>
                            toggleItem(prev, item.value)
                          )
                        }
                      />
                      <Label
                        htmlFor={item.id}
                        className="cursor-pointer text-sm font-normal"
                      >
                        {item.label}
                      </Label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </FilterSection>

          <FilterSection title="Brand" id="brand">
            <div className="mt-4">
              <SearchField
                id="search-brand-02"
                label="Search brand"
                placeholder="Search brand"
                value={brandQuery}
                onChange={setBrandQuery}
              />
              <ul className="mt-6 space-y-4" aria-label="Brand options">
                {filteredBrands.map((item) => (
                  <li key={item.id}>
                    <div className="flex items-center gap-2.5">
                      <Checkbox
                        id={item.id}
                        checked={selectedBrands.includes(item.value)}
                        onCheckedChange={() =>
                          setSelectedBrands((prev) =>
                            toggleItem(prev, item.value)
                          )
                        }
                      />
                      <Label
                        htmlFor={item.id}
                        className="cursor-pointer text-sm font-normal"
                      >
                        {item.label}
                      </Label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </FilterSection>

          <FilterSection title="Size" id="size">
            <div className="mt-4 flex flex-wrap gap-3">
              {SIZES.map((size) => {
                const active = selectedSizes.includes(size)
                return (
                  <button
                    key={size}
                    type="button"
                    aria-pressed={active}
                    onClick={() =>
                      setSelectedSizes((prev) => toggleItem(prev, size))
                    }
                    className={cn(
                      "min-w-14 cursor-pointer rounded-md border px-1 py-1 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      active
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border/70 text-foreground hover:border-primary"
                    )}
                  >
                    {size}
                  </button>
                )
              })}
            </div>
          </FilterSection>

          <FilterSection title="Color" id="color">
            <div className="mt-4 flex flex-wrap gap-3">
              {COLORS.map((color) => {
                const active = selectedColors.includes(color.label)
                return (
                  <button
                    key={color.label}
                    type="button"
                    aria-label={color.label}
                    aria-pressed={active}
                    onClick={() =>
                      setSelectedColors((prev) => toggleItem(prev, color.label))
                    }
                    className={cn(
                      "size-8 cursor-pointer rounded-full ring-offset-2 ring-offset-white transition-transform hover:scale-[1.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:ring-offset-card",
                      color.className,
                      active && "ring-2 ring-primary"
                    )}
                  />
                )
              })}
            </div>
          </FilterSection>
        </div>
      </aside>

      <div className="w-full min-w-0 px-4 py-6 sm:px-8">
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          Recent Searches
        </h3>
        <div className="flex flex-wrap gap-3">
          {recentSearches.map((tag) => (
            <button
              key={tag}
              type="button"
              aria-label={`Remove ${tag} from recent searches`}
              onClick={() =>
                setRecentSearches((prev) => prev.filter((t) => t !== tag))
              }
              className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border/70 px-2 py-1 text-[13px] font-medium text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {tag}
              <XIcon className="size-2.5 shrink-0" aria-hidden />
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="h-48 w-full rounded-md bg-muted"
              role="img"
              aria-label="Product placeholder"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
