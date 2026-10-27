"use client"

import * as React from "react"
import { SearchIcon } from "lucide-react"

import { Checkbox } from "@sonojs/ui/components/checkbox"
import { Label } from "@sonojs/ui/components/label"
import { Separator } from "@sonojs/ui/components/separator"
import { Slider } from "@sonojs/ui/components/slider"
import { cn } from "@/lib/utils"

const BRANDS = [
  "Zara",
  "H&M",
  "Uniqlo",
  "Levi’s",
  "Nike",
  "Adidas",
  "Puma",
  "Tommy Hilfiger",
] as const

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "4XL"] as const

const COLORS = [
  { name: "Blue", className: "bg-blue-700" },
  { name: "Purple", className: "bg-purple-700" },
  { name: "Pink", className: "bg-pink-700" },
  { name: "Orange", className: "bg-orange-700" },
  { name: "Red", className: "bg-red-700" },
  { name: "Yellow", className: "bg-yellow-700" },
  { name: "Black", className: "bg-black dark:bg-neutral-950" },
  { name: "Gray", className: "bg-gray-700" },
] as const

const PRICE_MAX = 1000

function toggleItem(list: string[], item: string) {
  return list.includes(item) ? list.filter((i) => i !== item) : [...list, item]
}

export default function ProductFilter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = React.useState<string[]>([])
  const [selectedColors, setSelectedColors] = React.useState<string[]>([])
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 750])
  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredBrands = BRANDS.filter((brand) =>
    brand.toLowerCase().includes(searchTerm.trim().toLowerCase())
  )

  function handleClearAll() {
    setSelectedBrands([])
    setSelectedSizes([])
    setSelectedColors([])
    setPriceRange([0, 750])
    setSearchTerm("")
  }

  return (
    <div
      className={cn(
        "flex w-full flex-col bg-white lg:flex-row dark:bg-background",
        className
      )}
      aria-label="Product filters and results"
      {...props}
    >
      <aside
        className="w-full shrink-0 border-b border-border/70 px-4 py-6 sm:px-6 lg:max-w-[280px] lg:min-h-svh lg:border-e lg:border-b-0"
        role="region"
        aria-labelledby="filter-heading-01"
      >
        <div className="mb-6 flex items-center border-b border-border/70 pb-2">
          <h2
            id="filter-heading-01"
            className="text-lg font-semibold text-foreground"
          >
            Filter
          </h2>
          <button
            type="button"
            onClick={handleClearAll}
            className="ms-auto cursor-pointer rounded text-sm font-semibold text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Clear all filters"
          >
            Clear all
          </button>
        </div>

        <fieldset>
          <legend className="text-sm font-semibold text-foreground">Brand</legend>
          <form
            className="mt-2"
            role="search"
            aria-label="Search brand"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative">
              <label htmlFor="brand-search-01" className="sr-only">
                Search brand
              </label>
              <input
                type="search"
                id="brand-search-01"
                placeholder="Search brand"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 w-full rounded-md border border-border/70 bg-white pe-10 ps-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring dark:bg-card"
              />
              <SearchIcon
                className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
            </div>
          </form>

          <ul className="mt-6 space-y-4" aria-label="Brand options">
            {filteredBrands.map((brand) => {
              const id = `pf01-brand-${brand.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
              return (
                <li key={brand}>
                  <div className="flex items-center gap-2.5">
                    <Checkbox
                      id={id}
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={() =>
                        setSelectedBrands((prev) => toggleItem(prev, brand))
                      }
                    />
                    <Label
                      htmlFor={id}
                      className="cursor-pointer text-sm font-normal text-foreground"
                    >
                      {brand}
                    </Label>
                  </div>
                </li>
              )
            })}
            {filteredBrands.length === 0 ? (
              <li className="text-sm text-muted-foreground">No brands found.</li>
            ) : null}
          </ul>
        </fieldset>

        <Separator className="my-6" />

        <fieldset>
          <legend className="text-sm font-semibold text-foreground">Size</legend>
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
        </fieldset>

        <Separator className="my-6" />

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
              <span aria-live="polite">${priceRange[0]}</span>
              <span aria-live="polite">${priceRange[1]}</span>
            </div>
          </div>
        </fieldset>

        <Separator className="my-6" />

        <fieldset>
          <legend className="text-sm font-semibold text-foreground">Color</legend>
          <div className="mt-4 flex flex-wrap gap-3">
            {COLORS.map((color) => {
              const active = selectedColors.includes(color.name)
              return (
                <button
                  key={color.name}
                  type="button"
                  aria-label={color.name}
                  aria-pressed={active}
                  onClick={() =>
                    setSelectedColors((prev) => toggleItem(prev, color.name))
                  }
                  className={cn(
                    "size-8 cursor-pointer rounded-full ring-offset-2 ring-offset-white transition-transform hover:scale-[1.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:ring-offset-background",
                    color.className,
                    active && "ring-2 ring-primary"
                  )}
                />
              )
            })}
          </div>
        </fieldset>
      </aside>

      <div
        className="w-full min-w-0 p-4 sm:p-6"
        role="main"
        aria-label="Product results"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="h-48 w-full animate-pulse rounded-md bg-muted"
              role="img"
              aria-label="Product placeholder"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
