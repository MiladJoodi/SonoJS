"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

import avatarImg from "./images/avatar.webp"
import fashion1 from "./images/fashion-1.webp"
import fashion2 from "./images/fashion-2.webp"
import fashion3 from "./images/fashion-3.webp"
import fashion4 from "./images/fashion-4.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const STAR_PATH =
  "m23.363 8.584-7.378-1.127L12.678.413c-.247-.526-1.11-.526-1.357 0L8.015 7.457.637 8.584a.75.75 0 0 0-.423 1.265l5.36 5.494-1.267 7.767a.75.75 0 0 0 1.103.777L12 20.245l6.59 3.643a.75.75 0 0 0 1.103-.777l-1.267-7.767 5.36-5.494a.75.75 0 0 0-.423-1.266z"

function StarIcon({
  filled,
  className,
}: {
  filled?: boolean
  className?: string
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden
      className={cn(
        "size-3.5",
        filled ? "fill-[#ffc107]" : "fill-zinc-300 dark:fill-zinc-600",
        className
      )}
    >
      <path d={STAR_PATH} />
    </svg>
  )
}

const IMAGES = [
  { src: assetSrc(fashion1), alt: "Product look 1" },
  { src: assetSrc(fashion2), alt: "Product look 2" },
  { src: assetSrc(fashion3), alt: "Product look 3" },
  { src: assetSrc(fashion4), alt: "Product look 4" },
] as const

const SIZES = [
  { value: "SM", label: "Size: Small" },
  { value: "MD", label: "Size: Medium" },
  { value: "LG", label: "Size: Large" },
  { value: "XL", label: "Size: Extra Large" },
] as const

const COLORS = [
  { name: "Black", swatch: "bg-black", label: "Color: Black" },
  { name: "Red", swatch: "bg-red-600", label: "Color: Red" },
  { name: "Blue", swatch: "bg-blue-600", label: "Color: Blue" },
] as const

export default function ProductDetails({
  title = "Women Embroidered A-line Kurta",
  description = "Women Embroidered Georgette A-line Kurta With Attached Dupatta (Maroon)",
  price = 12,
  originalPrice = 16,
  rating = 4,
  totalRatings = 76,
  totalReviews = 50,
  className,
  ...props
}: React.ComponentProps<"section"> & {
  title?: string
  description?: string
  price?: number
  originalPrice?: number
  rating?: number
  totalRatings?: number
  totalReviews?: number
}) {
  const baseId = React.useId()
  const [size, setSize] = React.useState<(typeof SIZES)[number]["value"]>("MD")
  const [color, setColor] =
    React.useState<(typeof COLORS)[number]["name"]>("Red")

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas px-4 py-6 text-foreground sm:px-6 md:px-8",
        className
      )}
      aria-label="Product detail"
      {...props}
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-8 max-sm:gap-8 sm:gap-12 lg:grid-cols-5 lg:gap-8">
        {/* Full-size 2×2 mosaic — sticky */}
        <div className="w-full min-w-0 lg:sticky lg:top-0 lg:col-span-3 lg:self-start">
          <div className="grid grid-cols-2 gap-0.5">
            {IMAGES.map((img) => (
              <div key={img.src} className="overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="aspect-[182/243] w-full object-cover object-top"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div className="w-full min-w-0 text-start lg:col-span-2">
          <div>
            <h1 className="text-xl font-bold text-foreground md:text-2xl">
              {title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div
                className="flex items-center gap-2"
                role="img"
                aria-label={`Rated ${rating} out of 5 stars`}
                dir="ltr"
              >
                <p
                  className="text-base font-semibold text-foreground"
                  aria-hidden
                >
                  {rating.toFixed(1)}
                </p>
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} filled={i < rating} />
                ))}
              </div>
              <span className="text-muted-foreground" aria-hidden>
                |
              </span>
              <p className="text-sm text-muted-foreground">
                {totalRatings} Ratings
              </p>
              <span className="text-muted-foreground" aria-hidden>
                |
              </span>
              <p className="text-sm text-muted-foreground">
                {totalReviews} Reviews
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <p
                className="text-2xl font-bold text-foreground md:text-3xl"
                dir="ltr"
              >
                <span className="sr-only">Sale price: </span>${price}
              </p>
              <p className="text-lg text-muted-foreground">
                <s aria-label={`Original price: $${originalPrice}`}>
                  <span aria-hidden dir="ltr">
                    ${originalPrice}
                  </span>
                </s>
                <span className="ms-1.5 text-sm">Tax included</span>
              </p>
            </div>
          </div>

          <Separator className="my-6" />

          <fieldset>
            <legend className="text-lg font-semibold text-foreground">
              Sizes
            </legend>
            <div className="mt-4 flex flex-wrap gap-4">
              {SIZES.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  aria-label={s.label}
                  aria-pressed={size === s.value}
                  onClick={() => setSize(s.value)}
                  className={cn(
                    "flex h-9 w-10 shrink-0 cursor-pointer items-center justify-center rounded-md border text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    size === s.value
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border/70 text-foreground hover:border-primary"
                  )}
                >
                  {s.value}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="text-lg font-semibold text-foreground">
              Colors
            </legend>
            <div className="mt-4 flex flex-wrap gap-4">
              {COLORS.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  aria-label={c.label}
                  aria-pressed={color === c.name}
                  onClick={() => setColor(c.name)}
                  className={cn(
                    "h-9 w-10 shrink-0 cursor-pointer rounded-md border outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    c.swatch,
                    color === c.name
                      ? "border-primary ring-2 ring-primary/30 ring-offset-2 ring-offset-background"
                      : "border-border/70 hover:border-primary"
                  )}
                />
              ))}
            </div>
          </fieldset>

          <Separator className="my-6" />

          <div className="flex flex-wrap gap-4">
            <Button
              type="button"
              variant="outline"
              className="h-[46px] w-full max-w-[45%] flex-1"
            >
              Add to wishlist
            </Button>
            <Button type="button" className="h-[46px] w-full max-w-[45%] flex-1">
              Add to cart
            </Button>
          </div>

          <Separator className="my-6" />

          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Select Delivery Location
            </h2>
            <p
              id={`${baseId}-pin-desc`}
              className="mt-2 text-sm text-muted-foreground"
            >
              Enter the pincode of your area to check product availability.
            </p>
            <div className="mt-6 flex max-w-sm flex-col gap-4 sm:flex-row">
              <label htmlFor={`${baseId}-pin`} className="sr-only">
                Pincode
              </label>
              <Input
                id={`${baseId}-pin`}
                name="pincode"
                placeholder="Enter pincode"
                autoComplete="postal-code"
                aria-describedby={`${baseId}-pin-desc`}
                dir="ltr"
                className="h-[46px] min-w-0 flex-1 shadow-none"
              />
              <Button type="button" className="h-[46px] w-max shrink-0">
                Apply
              </Button>
            </div>
          </div>

          <Separator className="my-6" />

          <div id={`${baseId}-reviews`}>
            <h2 className="text-lg font-semibold text-foreground">
              Customer Reviews
            </h2>

            <div className="mt-6">
              <article className="flex flex-col items-start gap-3 sm:flex-row">
                <img
                  src={assetSrc(avatarImg)}
                  alt=""
                  className="size-12 shrink-0 rounded-full border-2 border-border/70 object-cover"
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    John Doe
                  </p>
                  <div
                    className="mt-1 flex items-center gap-1"
                    role="img"
                    aria-label="Rated 3 out of 5 stars"
                    dir="ltr"
                  >
                    <StarIcon filled className="size-3" />
                    <StarIcon filled className="size-3" />
                    <StarIcon filled className="size-3" />
                    <StarIcon className="size-3" />
                    <StarIcon className="size-3" />
                    <time
                      dateTime="2026-04-01"
                      className="ms-2 text-xs font-medium text-muted-foreground"
                    >
                      2 mins ago
                    </time>
                  </div>
                  <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
                    The service was amazing. I never had to wait that long for
                    my food. The staff was friendly and attentive, and the
                    delivery was impressively prompt.
                  </p>
                </div>
              </article>

              <a
                href={`#${baseId}-reviews`}
                className="mt-6 inline-block rounded-sm text-sm font-semibold text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
              >
                Read all reviews
                <span className="sr-only"> for {title}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
