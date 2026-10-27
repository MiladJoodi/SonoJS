"use client"

import * as React from "react"
import { SearchIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@sonojs/ui/components/drawer"
import { Label } from "@sonojs/ui/components/label"
import { Separator } from "@sonojs/ui/components/separator"
import { Slider } from "@sonojs/ui/components/slider"
import { cn } from "@/lib/utils"

const CATEGORIES = [
  { id: "pf04-tshirts", label: "TShirts", value: "TShirts" },
  { id: "pf04-jackets", label: "Jackets", value: "Jackets" },
  { id: "pf04-sweaters", label: "Sweaters", value: "Sweaters" },
  { id: "pf04-bags", label: "Crossbody Bags", value: "Crossbody Bags" },
  { id: "pf04-hair", label: "Hair Tie", value: "Hair Tie" },
  { id: "pf04-watches", label: "Luxury Timepieces", value: "Luxury Timepieces" },
] as const

const BRANDS = [
  { id: "pf04-zara", label: "Zara", value: "Zara" },
  { id: "pf04-hm", label: "H&M", value: "H&M" },
  { id: "pf04-uniqlo", label: "Uniqlo", value: "Uniqlo" },
  { id: "pf04-levis", label: "Levi's", value: "Levi's" },
  { id: "pf04-nike", label: "Nike", value: "Nike" },
  { id: "pf04-adidas", label: "Adidas", value: "Adidas" },
  { id: "pf04-puma", label: "Puma", value: "Puma" },
  { id: "pf04-tommy", label: "Tommy Hilfiger", value: "Tommy Hilfiger" },
] as const

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "4XL"] as const

const COLORS = [
  { label: "Blue", bg: "bg-blue-700" },
  { label: "Purple", bg: "bg-purple-700" },
  { label: "Pink", bg: "bg-pink-700" },
  { label: "Orange", bg: "bg-orange-700" },
  { label: "Red", bg: "bg-red-700" },
  { label: "Yellow", bg: "bg-yellow-700" },
  { label: "Black", bg: "bg-black dark:bg-neutral-950" },
  { label: "Gray", bg: "bg-gray-700" },
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
  const [open, setOpen] = React.useState(false)
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  )
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = React.useState<string[]>([])
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 750])
  const [selectedColors, setSelectedColors] = React.useState<string[]>([])
  const [categoryQuery, setCategoryQuery] = React.useState("")
  const [brandQuery, setBrandQuery] = React.useState("")

  const filteredCategories = CATEGORIES.filter((item) =>
    item.label.toLowerCase().includes(categoryQuery.trim().toLowerCase())
  )
  const filteredBrands = BRANDS.filter((item) =>
    item.label.toLowerCase().includes(brandQuery.trim().toLowerCase())
  )

  function clearAll() {
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedSizes([])
    setPriceRange([0, 750])
    setSelectedColors([])
    setCategoryQuery("")
    setBrandQuery("")
  }

  return (
    <div
      className={cn(
        "flex min-h-[28rem] w-full items-start justify-center bg-white px-4 py-10 dark:bg-background",
        className
      )}
      {...props}
    >
      <Drawer direction="end" open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button type="button" variant="outline">
            Open Drawer
          </Button>
        </DrawerTrigger>

        <DrawerContent className="flex max-h-[calc(100dvh-1rem)] w-[min(100%-1rem,24rem)] flex-col sm:max-w-sm">
          <DrawerHeader className="flex flex-row items-center gap-3 border-b border-border/70 text-start">
            <DrawerTitle className="flex-1">Filter</DrawerTitle>
            <button
              type="button"
              onClick={clearAll}
              className="shrink-0 cursor-pointer rounded text-sm font-semibold text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Clear all filters"
            >
              Clear all
            </button>
          </DrawerHeader>

          <div className="min-h-0 flex-1 space-y-0 overflow-y-auto overscroll-contain px-4 py-5 sm:px-6">
            <fieldset>
              <legend className="text-sm font-semibold text-foreground">
                Category
              </legend>
              <SearchField
                id="category-search-04"
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
                id="brand-search-04"
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
                        setSelectedColors((prev) =>
                          toggleItem(prev, color.label)
                        )
                      }
                      className={cn(
                        "size-8 cursor-pointer rounded-full ring-offset-2 ring-offset-popover transition-transform hover:scale-[1.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        color.bg,
                        active && "ring-2 ring-primary"
                      )}
                    />
                  )
                })}
              </div>
            </fieldset>
          </div>

          <DrawerFooter className="flex-row gap-2 border-t border-border/70">
            <Button
              type="button"
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              Apply
            </Button>
            <DrawerClose asChild>
              <Button type="button" variant="outline" className="flex-1">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
