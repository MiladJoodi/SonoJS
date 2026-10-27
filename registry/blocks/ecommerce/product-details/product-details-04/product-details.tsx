"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { cn } from "@/lib/utils"

import avatarImg from "./images/avatar.webp"
import product1 from "./images/product-1.webp"
import product2 from "./images/product-2.webp"
import product3 from "./images/product-3.webp"
import product4 from "./images/product-4.webp"
import product5 from "./images/product-5.webp"

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

const MOSAIC = [
  assetSrc(product1),
  assetSrc(product2),
  assetSrc(product3),
  assetSrc(product4),
] as const

const HERO = assetSrc(product5)

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

const FEATURES = [
  "A t-shirt is a wardrobe essential because it is so versatile.",
  "Available in a wide range of sizes, from extra small to extra large, and even in tall and petite sizes.",
  "This is easy to care for. They can usually be machine-washed and dried on low heat.",
  "You can add your own designs, paintings, or embroidery to make it your own.",
] as const

export default function ProductDetails({
  title = "Adjective Attire | T-shirt",
  subtitle = "Well-Versed Commerce",
  description = "Elevate your casual style with our premium men's t-shirt. Crafted for comfort and designed with a modern fit, this versatile shirt is an essential addition to your wardrobe. The soft and breathable fabric ensures all-day comfort, making it perfect for everyday wear. Its classic crew neck and short sleeves offer a timeless look.",
  price = 12,
  originalPrice = 16,
  rating = 4,
  totalRatings = 76,
  totalReviews = 50,
  className,
  ...props
}: React.ComponentProps<"section"> & {
  title?: string
  subtitle?: string
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
    React.useState<(typeof COLORS)[number]["name"]>("Black")

  return (
    <section
      className={cn("w-full min-w-0 bg-white", className)}
      aria-label="Product detail"
      {...props}
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-y-2 lg:grid-cols-5">
        {/* Sticky gallery: compact mosaic + tall hero */}
        <div className="grid min-w-0 max-h-[min(70vh,560px)] grid-cols-2 gap-0.5 overflow-hidden lg:sticky lg:top-0 lg:col-span-3 lg:self-start">
          <div className="grid min-h-0 grid-cols-2 gap-0.5 content-start">
            {MOSAIC.map((src, i) => (
              <div key={src} className="min-h-0 overflow-hidden">
                <img
                  src={src}
                  alt={`Product view ${i + 1}`}
                  className="aspect-[3/4] h-full max-h-[280px] w-full object-cover object-top shadow-md transition-transform duration-300 hover:scale-[1.03]"
                />
              </div>
            ))}
          </div>
          <div className="min-h-0 overflow-hidden">
            <img
              src={HERO}
              alt="Product hero"
              className="h-full max-h-[min(70vh,560px)] w-full object-cover object-top shadow-md transition-transform duration-300 hover:scale-[1.03]"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="w-full min-w-0 overflow-x-hidden px-4 py-6 text-start sm:px-6 md:px-8 lg:col-span-2">
          <div>
            <h1 className="text-xl font-bold text-foreground md:text-2xl">
              {title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>

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

            <div className="mt-8 flex flex-wrap items-center gap-4">
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

          <div className="mt-8">
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
                      "flex h-9 w-10 shrink-0 cursor-pointer items-center justify-center rounded-md border text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring",
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

            <fieldset className="mt-8">
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

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button
                type="button"
                variant="outline"
                className="h-[46px] w-full min-w-0 sm:flex-1"
              >
                Add to wishlist
              </Button>
              <Button
                type="button"
                className="h-[46px] w-full min-w-0 sm:flex-1"
              >
                Add to cart
              </Button>
            </div>
          </div>

          <div className="mt-8">
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

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-foreground">
              Product Description
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
            <ul className="mt-4 list-disc space-y-3 ps-4 text-sm text-muted-foreground">
              {FEATURES.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8" id={`${baseId}-reviews`}>
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
