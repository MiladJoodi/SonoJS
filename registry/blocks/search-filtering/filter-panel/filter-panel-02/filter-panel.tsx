"use client"

import * as React from "react"
import { StarIcon } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@sonojs/ui/components/accordion"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import { Label } from "@sonojs/ui/components/label"
import { Slider } from "@sonojs/ui/components/slider"
import { cn } from "@/lib/utils"

const CATEGORIES = [
  "Headphones",
  "Keyboards",
  "Monitors",
  "Webcams",
  "Cables",
] as const
const BRANDS = ["Northwind", "Helix", "Aperture", "Summit"] as const
const COLORS = [
  { id: "slate", className: "bg-slate-700" },
  { id: "blue", className: "bg-blue-600" },
  { id: "orange", className: "bg-orange-500" },
  { id: "green", className: "bg-emerald-600" },
  { id: "white", className: "bg-white border border-border/70" },
] as const
const SIZES = ["S", "M", "L", "XL"] as const

function money(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" })
}

/** Standalone ecommerce facet accordion — filter UI as the product. */
export default function FilterPanel({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [categories, setCategories] = React.useState<Set<string>>(
    () => new Set(["Headphones"])
  )
  const [brands, setBrands] = React.useState<Set<string>>(() => new Set())
  const [price, setPrice] = React.useState<[number, number]>([40, 400])
  const [minRating, setMinRating] = React.useState(0)
  const [colors, setColors] = React.useState<Set<string>>(() => new Set())
  const [sizes, setSizes] = React.useState<Set<string>>(() => new Set())

  const toggle = (
    setter: React.Dispatch<React.SetStateAction<Set<string>>>,
    value: string,
    on: boolean
  ) => {
    setter((prev) => {
      const next = new Set(prev)
      if (on) next.add(value)
      else next.delete(value)
      return next
    })
  }

  const activeCount =
    categories.size +
    brands.size +
    colors.size +
    sizes.size +
    (minRating > 0 ? 1 : 0) +
    (price[0] > 40 || price[1] < 400 ? 1 : 0)

  const resultStub =
    48 -
    categories.size * 3 -
    brands.size * 4 -
    (minRating > 0 ? 6 : 0) -
    Math.floor((price[1] - price[0]) / 80)

  const clearAll = () => {
    setCategories(new Set())
    setBrands(new Set())
    setPrice([40, 400])
    setMinRating(0)
    setColors(new Set())
    setSizes(new Set())
  }

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white py-10 text-foreground dark:bg-background",
        className
      )}
      aria-labelledby="filter-panel-02-heading"
      {...props}
    >
      <div className="mx-auto max-w-md px-4 sm:px-6">
        <div className="mb-4 text-center">
          <h1
            id="filter-panel-02-heading"
            className="text-lg font-semibold tracking-tight"
          >
            Product filters
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Accordion facets — install as a standalone panel.
          </p>
        </div>

        <div className="flex flex-col overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
          <div className="flex items-center justify-between gap-2 border-b border-border/70 px-4 py-3.5">
            <div className="flex items-center gap-2 text-start">
              <p className="text-sm font-semibold">Facets</p>
              {activeCount > 0 ? (
                <Badge variant="secondary">{activeCount}</Badge>
              ) : null}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 cursor-pointer px-2 text-xs"
              disabled={activeCount === 0}
              onClick={clearAll}
            >
              Clear
            </Button>
          </div>

          <div className="px-2">
            <Accordion
              type="multiple"
              defaultValue={["category", "price", "rating"]}
              className="w-full"
            >
              <AccordionItem value="category" className="border-border/70 px-2">
                <AccordionTrigger>Category</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2.5">
                    {CATEGORIES.map((cat) => {
                      const id = `fp-02-cat-${cat}`
                      return (
                        <div key={cat} className="flex items-center gap-2.5">
                          <Checkbox
                            id={id}
                            checked={categories.has(cat)}
                            className="cursor-pointer"
                            onCheckedChange={(v) =>
                              toggle(setCategories, cat, v === true)
                            }
                          />
                          <Label
                            htmlFor={id}
                            className="cursor-pointer font-normal"
                          >
                            {cat}
                          </Label>
                        </div>
                      )
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="brand" className="border-border/70 px-2">
                <AccordionTrigger>Brand</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2.5">
                    {BRANDS.map((brand) => {
                      const id = `fp-02-brand-${brand}`
                      return (
                        <div key={brand} className="flex items-center gap-2.5">
                          <Checkbox
                            id={id}
                            checked={brands.has(brand)}
                            className="cursor-pointer"
                            onCheckedChange={(v) =>
                              toggle(setBrands, brand, v === true)
                            }
                          />
                          <Label
                            htmlFor={id}
                            className="cursor-pointer font-normal"
                          >
                            {brand}
                          </Label>
                        </div>
                      )
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="price" className="border-border/70 px-2">
                <AccordionTrigger>Price</AccordionTrigger>
                <AccordionContent>
                  <div className="mb-3 flex justify-between gap-3 text-xs">
                    <span className="text-muted-foreground">Range</span>
                    <span className="font-semibold tabular-nums" dir="ltr">
                      {money(price[0])} – {money(price[1])}
                    </span>
                  </div>
                  <Slider
                    min={40}
                    max={400}
                    step={10}
                    value={price}
                    onValueChange={(value) => {
                      if (value.length >= 2) {
                        setPrice([value[0]!, value[1]!])
                      }
                    }}
                    aria-label="Price range"
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="rating" className="border-border/70 px-2">
                <AccordionTrigger>Rating</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-2">
                    {[4, 3, 2].map((stars) => (
                      <button
                        key={stars}
                        type="button"
                        onClick={() =>
                          setMinRating((prev) => (prev === stars ? 0 : stars))
                        }
                        className={cn(
                          "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted",
                          minRating === stars && "bg-primary/10 text-primary"
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
                                  : "text-muted-foreground/40"
                              )}
                            />
                          ))}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          & up
                        </span>
                      </button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="color" className="border-border/70 px-2">
                <AccordionTrigger>Color</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap gap-2">
                    {COLORS.map((c) => {
                      const on = colors.has(c.id)
                      return (
                        <button
                          key={c.id}
                          type="button"
                          aria-label={c.id}
                          aria-pressed={on}
                          onClick={() => toggle(setColors, c.id, !on)}
                          className={cn(
                            "size-8 cursor-pointer rounded-full transition-shadow",
                            c.className,
                            on &&
                              "ring-2 ring-primary ring-offset-2 ring-offset-card"
                          )}
                        />
                      )
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="size" className="border-border/70 px-2">
                <AccordionTrigger>Size</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap gap-2">
                    {SIZES.map((size) => {
                      const on = sizes.has(size)
                      return (
                        <button
                          key={size}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggle(setSizes, size, !on)}
                          className={cn(
                            "flex size-10 cursor-pointer items-center justify-center rounded-md border text-sm font-medium transition-colors",
                            on
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border/70 hover:border-border"
                          )}
                        >
                          {size}
                        </button>
                      )
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="space-y-2 border-t border-border/70 bg-card p-3">
            <p className="text-center text-xs text-muted-foreground" dir="ltr">
              Showing {Math.max(resultStub, 3)} items
            </p>
            <Button type="button" className="w-full cursor-pointer">
              Show {Math.max(resultStub, 3)} results
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
