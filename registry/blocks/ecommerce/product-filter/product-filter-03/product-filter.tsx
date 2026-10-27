"use client"

import * as React from "react"
import { SearchIcon } from "lucide-react"

import { Checkbox } from "@sonojs/ui/components/checkbox"
import { Label } from "@sonojs/ui/components/label"
import { Separator } from "@sonojs/ui/components/separator"
import { Slider } from "@sonojs/ui/components/slider"
import { cn } from "@/lib/utils"

const GENDER_OPTIONS = [
  { id: "men", label: "Men" },
  { id: "women", label: "Women" },
  { id: "kids", label: "Kids" },
  { id: "unisex", label: "Unisex" },
  { id: "other", label: "Other" },
] as const

const CATEGORIES = [
  { id: "pf03-tshirts", label: "TShirts", value: "TShirts" },
  { id: "pf03-jackets", label: "Jackets", value: "Jackets" },
  { id: "pf03-sweaters", label: "Sweaters", value: "Sweaters" },
  { id: "pf03-bags", label: "Crossbody Bags", value: "Crossbody Bags" },
  { id: "pf03-hair", label: "Hair Tie", value: "Hair Tie" },
  { id: "pf03-watches", label: "Luxury Timepieces", value: "Luxury Timepieces" },
] as const

const BRANDS = [
  { id: "pf03-zara", label: "Zara", value: "Zara" },
  { id: "pf03-hm", label: "H&M", value: "H&M" },
  { id: "pf03-uniqlo", label: "Uniqlo", value: "Uniqlo" },
  { id: "pf03-levis", label: "Levi's", value: "Levi's" },
  { id: "pf03-nike", label: "Nike", value: "Nike" },
  { id: "pf03-adidas", label: "Adidas", value: "Adidas" },
  { id: "pf03-puma", label: "Puma", value: "Puma" },
  { id: "pf03-tommy", label: "Tommy Hilfiger", value: "Tommy Hilfiger" },
] as const

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "4XL"] as const

const COLORS = [
  {
    id: "pf03-black",
    label: "Black",
    value: "black",
    swatch: "bg-black dark:bg-neutral-950",
  },
  { id: "pf03-blue", label: "Blue", value: "blue", swatch: "bg-blue-600" },
  {
    id: "pf03-purple",
    label: "Purple",
    value: "purple",
    swatch: "bg-purple-600",
  },
  {
    id: "pf03-orange",
    label: "Orange",
    value: "orange",
    swatch: "bg-orange-600",
  },
  { id: "pf03-pink", label: "Pink", value: "pink", swatch: "bg-pink-600" },
  {
    id: "pf03-yellow",
    label: "Yellow",
    value: "yellow",
    swatch: "bg-yellow-600",
  },
  { id: "pf03-red", label: "Red", value: "red", swatch: "bg-red-600" },
  { id: "pf03-green", label: "Green", value: "green", swatch: "bg-green-600" },
] as const

const DISCOUNTS = [
  { id: "10", label: "10% and above", value: "10" },
  { id: "20", label: "20% and above", value: "20" },
  { id: "30", label: "30% and above", value: "30" },
  { id: "40", label: "40% and above", value: "40" },
  { id: "50", label: "50% and above", value: "50" },
] as const

const PRICE_MAX = 1000

function toggleItem(list: string[], item: string) {
  return list.includes(item) ? list.filter((i) => i !== item) : [...list, item]
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
  const [selectedGender, setSelectedGender] = React.useState("men")
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  )
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = React.useState<string[]>([])
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 750])
  const [selectedColors, setSelectedColors] = React.useState<string[]>([])
  const [selectedDiscount, setSelectedDiscount] = React.useState("10")
  const [categoryQuery, setCategoryQuery] = React.useState("")
  const [brandQuery, setBrandQuery] = React.useState("")
  const [colorQuery, setColorQuery] = React.useState("")

  const filteredCategories = CATEGORIES.filter((item) =>
    item.label.toLowerCase().includes(categoryQuery.trim().toLowerCase())
  )
  const filteredBrands = BRANDS.filter((item) =>
    item.label.toLowerCase().includes(brandQuery.trim().toLowerCase())
  )
  const filteredColors = COLORS.filter((item) =>
    item.label.toLowerCase().includes(colorQuery.trim().toLowerCase())
  )

  function clearAll() {
    setSelectedGender("men")
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedSizes([])
    setPriceRange([0, 750])
    setSelectedColors([])
    setSelectedDiscount("10")
    setCategoryQuery("")
    setBrandQuery("")
    setColorQuery("")
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
      <div
        className="shrink-0 pt-6 lg:min-h-svh"
        role="region"
        aria-labelledby="filter-heading-03"
      >
        <div className="flex items-center border-b border-border/70 px-4 pb-4 sm:px-6">
          <h2
            id="filter-heading-03"
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

        <div className="w-full max-w-[280px] shrink-0 border-b border-border/70 px-4 py-6 sm:px-6 lg:border-e lg:border-b-0">
          <fieldset>
            <legend className="sr-only">Select audience</legend>
            <ul className="space-y-4" aria-label="Audience options">
              {GENDER_OPTIONS.map((item) => {
                const checked = selectedGender === item.id
                return (
                  <li key={item.id} className="flex items-center">
                    <input
                      type="radio"
                      name="pf03-audience"
                      id={`pf03-gender-${item.id}`}
                      value={item.id}
                      checked={checked}
                      onChange={() => setSelectedGender(item.id)}
                      className="size-[18px] cursor-pointer appearance-none rounded-full border border-border/70 bg-white checked:bg-primary checked:ring-2 checked:ring-white checked:ring-inset focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:bg-card dark:checked:ring-background"
                    />
                    <label
                      htmlFor={`pf03-gender-${item.id}`}
                      className="ms-2 cursor-pointer text-sm text-foreground"
                    >
                      {item.label}
                    </label>
                  </li>
                )
              })}
            </ul>
          </fieldset>

          <Separator className="my-6" />

          <fieldset>
            <legend className="text-sm font-semibold text-foreground">
              Category
            </legend>
            <SearchField
              id="category-search-03"
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
          </fieldset>

          <Separator className="my-6" />

          <fieldset>
            <legend className="text-sm font-semibold text-foreground">
              Brand
            </legend>
            <SearchField
              id="brand-search-03"
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
          </fieldset>

          <Separator className="my-6" />

          <fieldset>
            <legend className="text-sm font-semibold text-foreground">
              Size
            </legend>
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
                        ? "border-primary text-primary"
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
            <legend className="text-sm font-semibold text-foreground">
              Price
            </legend>
            <div className="mt-6 px-1">
              <Slider
                min={0}
                max={PRICE_MAX}
                step={10}
                value={priceRange}
                onValueChange={(value) => {
                  if (value.length >= 2)
                    setPriceRange([value[0]!, value[1]!])
                }}
                aria-label="Price range"
              />
              <div className="mt-4 flex justify-between text-sm font-medium text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </fieldset>

          <Separator className="my-6" />

          <fieldset>
            <legend className="text-sm font-semibold text-foreground">
              Color
            </legend>
            <SearchField
              id="color-search-03"
              label="Search color"
              placeholder="Search color"
              value={colorQuery}
              onChange={setColorQuery}
            />
            <ul className="mt-6 space-y-4" aria-label="Color options">
              {filteredColors.map((item) => (
                <li key={item.id}>
                  <div className="flex items-center gap-2.5">
                    <Checkbox
                      id={item.id}
                      checked={selectedColors.includes(item.value)}
                      onCheckedChange={() =>
                        setSelectedColors((prev) =>
                          toggleItem(prev, item.value)
                        )
                      }
                    />
                    <Label
                      htmlFor={item.id}
                      className="inline-flex cursor-pointer items-center gap-2 text-sm font-normal"
                    >
                      <span
                        className={cn(
                          "size-4 rounded-full ring-1 ring-border/70",
                          item.swatch
                        )}
                        aria-hidden
                      />
                      {item.label}
                    </Label>
                  </div>
                </li>
              ))}
            </ul>
          </fieldset>

          <Separator className="my-6" />

          <fieldset>
            <legend className="text-sm font-semibold text-foreground">
              Discount
            </legend>
            <ul className="mt-4 space-y-4" aria-label="Discount options">
              {DISCOUNTS.map((item) => {
                const checked = selectedDiscount === item.value
                return (
                  <li key={item.id} className="flex items-center">
                    <input
                      type="radio"
                      name="pf03-discount"
                      id={`pf03-discount-${item.id}`}
                      value={item.value}
                      checked={checked}
                      onChange={() => setSelectedDiscount(item.value)}
                      className="size-[18px] cursor-pointer appearance-none rounded-full border border-border/70 bg-white checked:bg-primary checked:ring-2 checked:ring-white checked:ring-inset focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:bg-card dark:checked:ring-background"
                    />
                    <label
                      htmlFor={`pf03-discount-${item.id}`}
                      className="ms-2 cursor-pointer text-sm text-foreground"
                    >
                      {item.label}
                    </label>
                  </li>
                )
              })}
            </ul>
          </fieldset>
        </div>
      </div>

      <div
        className="w-full min-w-0 p-4 sm:p-6"
        role="main"
        aria-label="Product results"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="h-48 w-full rounded-md bg-muted"
              role="img"
              aria-label="Product"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
