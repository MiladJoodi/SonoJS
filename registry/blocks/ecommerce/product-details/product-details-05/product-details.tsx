"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

import laptop1 from "./images/laptop-1.webp"
import laptop2 from "./images/laptop-2.webp"
import laptop3 from "./images/laptop-3.webp"
import laptop4 from "./images/laptop-4.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const STAR_PATH =
  "m23.363 8.584-7.378-1.127L12.678.413c-.247-.526-1.11-.526-1.357 0L8.015 7.457.637 8.584a.75.75 0 0 0-.423 1.265l5.36 5.494-1.267 7.767a.75.75 0 0 0 1.103.777L12 20.245l6.59 3.643a.75.75 0 0 0 1.103-.777l-1.267-7.767 5.36-5.494a.75.75 0 0 0-.423-1.266z"

function StarIcon({ filled }: { filled?: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden
      className={cn(
        "size-3.5",
        filled ? "fill-[#F5B301]" : "fill-zinc-200 dark:fill-zinc-600"
      )}
    >
      <path d={STAR_PATH} />
    </svg>
  )
}

const IMAGES = [
  { src: assetSrc(laptop1), label: "Front" },
  { src: assetSrc(laptop2), label: "Side" },
  { src: assetSrc(laptop3), label: "Ports" },
  { src: assetSrc(laptop4), label: "Keyboard" },
] as const

const COLORS = [
  { name: "Silver", swatch: "bg-zinc-300" },
  { name: "Space gray", swatch: "bg-zinc-700" },
] as const

const SPECS = [
  { label: "Type", value: "Ultrabook" },
  { label: "Processor", value: "M3 Pro · 12-core" },
  { label: "RAM", value: "18 GB unified" },
  { label: "SSD", value: "512 GB" },
  { label: "Display", value: '14" Liquid Retina' },
  { label: "Battery", value: "Up to 18 hours" },
] as const

export default function ProductDetails({
  name = "NovaBook Pro 14 | Laptop",
  tagline = "Built for creators who ship. Silent fans, all-day battery, studio color.",
  price = 1999,
  rating = 4,
  reviews = 1284,
  className,
  ...props
}: React.ComponentProps<"section"> & {
  name?: string
  tagline?: string
  price?: number
  rating?: number
  reviews?: number
}) {
  const baseId = React.useId()
  const [active, setActive] = React.useState(0)
  const [color, setColor] =
    React.useState<(typeof COLORS)[number]["name"]>("Silver")
  const img = IMAGES[active] ?? IMAGES[0]

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white px-4 py-6 sm:px-6 md:px-8",
        className
      )}
      aria-label="Product detail"
      {...props}
    >
      <div className="mx-auto w-full max-w-4xl lg:max-w-7xl">
        <div
          className="grid grid-cols-1 items-start gap-10 rounded-md border border-border/70 bg-card p-4 shadow-soft md:p-6 lg:grid-cols-5 lg:gap-12"
          style={{ backgroundColor: "var(--card, #ffffff)" }}
        >
          {/* Gallery */}
          <div className="w-full text-center lg:sticky lg:top-6 lg:col-span-3 lg:self-start">
            <div className="relative py-4">
              <img
                src={img.src}
                alt={img.label}
                className="mx-auto aspect-[251/171] w-4/5 rounded-sm object-contain"
              />
            </div>
            <div
              role="listbox"
              aria-label="Angles"
              className="mt-2 flex flex-wrap justify-center gap-2"
            >
              {IMAGES.map((t, i) => (
                <button
                  key={t.src}
                  type="button"
                  role="option"
                  aria-selected={i === active}
                  aria-label={t.label}
                  onClick={() => setActive(i)}
                  className={cn(
                    "size-16 cursor-pointer overflow-hidden rounded-md border-2 outline-none focus-visible:ring-2 focus-visible:ring-ring sm:size-[4.5rem]",
                    i === active
                      ? "border-primary"
                      : "border-transparent opacity-70 hover:opacity-100"
                  )}
                >
                  <img
                    src={t.src}
                    alt=""
                    aria-hidden
                    className="size-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info + specs */}
          <div className="min-w-0 text-start lg:col-span-2">
            <div className="flex items-center gap-2" dir="ltr">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} filled={i < rating} />
              ))}
              <span className="text-sm text-muted-foreground">
                {reviews.toLocaleString()} reviews
              </span>
            </div>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {name}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">{tagline}</p>
            <p className="mt-5 text-3xl font-bold tabular-nums" dir="ltr">
              ${price.toLocaleString()}
            </p>

            <p className="mt-6 text-sm font-semibold">Choose a color</p>
            <div className="mt-2 flex gap-2.5">
              {COLORS.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  aria-label={c.name}
                  aria-pressed={color === c.name}
                  onClick={() => setColor(c.name)}
                  className={cn(
                    "size-9 cursor-pointer rounded-full border-2 outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    c.swatch,
                    color === c.name
                      ? "border-foreground ring-2 ring-foreground/15 ring-offset-2 ring-offset-background"
                      : "border-background"
                  )}
                />
              ))}
            </div>

            <div className="mt-5">
              <Label htmlFor={`${baseId}-pin`} className="sr-only">
                Delivery ZIP
              </Label>
              <div className="flex gap-2">
                <Input
                  id={`${baseId}-pin`}
                  placeholder="Delivery ZIP"
                  dir="ltr"
                  className="h-[46px] min-w-0 flex-1 shadow-none"
                />
                <Button type="button" variant="secondary" className="h-[46px] shrink-0">
                  Check
                </Button>
              </div>
            </div>

            <Button type="button" className="mt-5 h-[46px] w-full">
              Add to cart
            </Button>

            <Separator className="my-6" />

            <h2 className="text-lg font-semibold">Product information</h2>
            <dl className="mt-4 space-y-3">
              {SPECS.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-4 border-b border-border/50 pb-2 text-sm"
                >
                  <dt className="font-medium text-muted-foreground">
                    {row.label}
                  </dt>
                  <dd className="text-end font-semibold text-foreground">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
