"use client"

import * as React from "react"
import {
  BanknoteIcon,
  LeafIcon,
  MinusIcon,
  PackageIcon,
  PlusIcon,
  TruckIcon,
} from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

import product1 from "./images/product-1.webp"
import product2 from "./images/product-2.webp"
import product3 from "./images/product-3.webp"
import product4 from "./images/product-4.webp"
import product5 from "./images/product-5.webp"
import product6 from "./images/product-6.webp"

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
  { src: assetSrc(product1), label: "Primary view" },
  { src: assetSrc(product2), label: "Side view" },
  { src: assetSrc(product3), label: "Ingredients" },
  { src: assetSrc(product4), label: "Lifestyle" },
  { src: assetSrc(product5), label: "Back" },
  { src: assetSrc(product6), label: "Box" },
] as const

const PERKS = [
  { icon: BanknoteIcon, label: "Cash on Delivery" },
  { icon: PackageIcon, label: "Free Returns" },
  { icon: TruckIcon, label: "Free Delivery" },
  { icon: LeafIcon, label: "Dermatologically tested" },
] as const

export default function ProductDetails({
  name = "SunProtect Sunscreen SPF",
  description = "Vitamin E + green tea extract. Lightweight daily sunscreen that hydrates while blocking UV.",
  price = 12,
  originalPrice = 16,
  rating = 4,
  totalRatings = 76,
  netWt = "100 g",
  className,
  ...props
}: React.ComponentProps<"section"> & {
  name?: string
  description?: string
  price?: number
  originalPrice?: number
  rating?: number
  totalRatings?: number
  netWt?: string
}) {
  const baseId = React.useId()
  const [active, setActive] = React.useState(0)
  const [qty, setQty] = React.useState(1)
  const img = IMAGES[active] ?? IMAGES[0]
  const save = Math.round(((originalPrice - price) / originalPrice) * 100)

  return (
    <section
      className={cn("w-full min-w-0 bg-white p-4 sm:p-6 md:p-8", className)}
      aria-label="Product detail"
      {...props}
    >
      <div className="mx-auto w-full max-w-2xl lg:max-w-6xl">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Sticky gallery: main + horizontal thumbs */}
          <div className="w-full min-w-0 lg:sticky lg:top-6 lg:self-start">
            <div className="flex flex-col gap-4">
              <div
                className="rounded-md border border-border/70 bg-card p-2 shadow-soft"
                style={{ backgroundColor: "var(--card, #ffffff)" }}
              >
                <div className="relative aspect-[11/8] w-full overflow-hidden rounded-md bg-muted/30">
                  <img
                    src={img.src}
                    alt={img.label}
                    className="absolute inset-0 size-full object-cover object-top"
                  />
                </div>
              </div>
              <div
                className="w-full overflow-x-auto rounded-md border border-border/70 bg-card p-2 shadow-soft"
                style={{ backgroundColor: "var(--card, #ffffff)" }}
              >
                <div
                  role="listbox"
                  aria-label="Select product image"
                  className="flex justify-between gap-3"
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
                        "size-16 shrink-0 cursor-pointer overflow-hidden rounded-md border-2 outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        i === active
                          ? "border-primary"
                          : "border-transparent opacity-80 hover:opacity-100"
                      )}
                    >
                      <img
                        src={t.src}
                        alt=""
                        aria-hidden
                        className="size-full object-cover object-top"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="w-full min-w-0 text-start">
            <h1 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
              {name}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <div
                className="flex items-center gap-1"
                role="img"
                aria-label={`Rated ${rating} out of 5 stars`}
                dir="ltr"
              >
                <p className="text-base font-semibold text-foreground" aria-hidden>
                  {rating.toFixed(1)}
                </p>
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} filled={i < rating} />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {totalRatings} ratings
              </p>
              <p className="text-sm text-muted-foreground" dir="ltr">
                Net {netWt}
              </p>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>

            <div className="mt-5 flex flex-wrap items-baseline gap-2">
              <s className="text-muted-foreground" dir="ltr">
                ${originalPrice}
              </s>
              <p className="text-3xl font-bold text-primary tabular-nums" dir="ltr">
                ${price}
              </p>
              <span className="rounded-md bg-primary px-2 py-0.5 text-[10px] font-bold tracking-wider text-primary-foreground uppercase">
                Save {save}%
              </span>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center rounded-md border border-border/70 bg-card p-1">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex size-10 cursor-pointer items-center justify-center rounded-md outline-none hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <MinusIcon className="size-3.5" />
                </button>
                <span
                  className="min-w-10 text-center text-sm font-bold tabular-nums"
                  dir="ltr"
                >
                  {qty}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => q + 1)}
                  className="flex size-10 cursor-pointer items-center justify-center rounded-md outline-none hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <PlusIcon className="size-3.5" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground" dir="ltr">
                {qty} × ${price}
              </p>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 min-[400px]:grid-cols-2">
              <Button type="button" variant="outline" className="h-[46px] w-full">
                Add to cart
              </Button>
              <Button type="button" className="h-[46px] w-full">
                Buy now
              </Button>
            </div>

            <Separator className="my-6" />

            <h2 className="text-lg font-semibold text-foreground">
              Select Delivery Location
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter the pincode of your area to check product availability.
            </p>
            <div className="mt-4 flex max-w-sm flex-col gap-3 sm:flex-row">
              <Label htmlFor={`${baseId}-pin`} className="sr-only">
                Pincode
              </Label>
              <Input
                id={`${baseId}-pin`}
                placeholder="Enter pincode"
                inputMode="numeric"
                dir="ltr"
                className="h-[46px] min-w-0 flex-1 shadow-none"
              />
              <Button type="button" className="h-[46px] w-full shrink-0 sm:w-auto">
                Apply
              </Button>
            </div>

            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {PERKS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex flex-col items-center gap-2 rounded-md border border-border/70 bg-card px-2 py-3 text-center shadow-soft"
                  style={{ backgroundColor: "var(--card, #ffffff)" }}
                >
                  <Icon className="size-4 text-primary" aria-hidden />
                  <span className="text-[11px] font-medium text-muted-foreground">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
