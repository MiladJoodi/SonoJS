"use client"

import * as React from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@sonojs/ui/components/accordion"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
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
        filled ? "fill-[#F5B301]" : "fill-zinc-200 dark:fill-zinc-600",
        className
      )}
    >
      <path d={STAR_PATH} />
    </svg>
  )
}

const THUMBS = [
  {
    src: assetSrc(fashion1),
    alt: "Women Embroidered A-line Kurta — front view",
    label: "Front view",
  },
  {
    src: assetSrc(fashion2),
    alt: "Women Embroidered A-line Kurta — side view",
    label: "Side view",
  },
  {
    src: assetSrc(fashion3),
    alt: "Women Embroidered A-line Kurta — back view",
    label: "Back view",
  },
  {
    src: assetSrc(fashion4),
    alt: "Women Embroidered A-line Kurta — detail view",
    label: "Detail view",
  },
] as const

const SIZES = [
  { label: "SM", ariaLabel: "Size: Small" },
  { label: "MD", ariaLabel: "Size: Medium" },
  { label: "LG", ariaLabel: "Size: Large" },
  { label: "XL", ariaLabel: "Size: Extra Large" },
] as const

export default function ProductDetails({
  name = "Women Embroidered A-line Kurta",
  description = "Women Embroidered Georgette A-line Kurta With Attached Dupatta (Maroon)",
  price = 12,
  originalPrice = 16,
  rating = 4,
  totalRatings = 253,
  totalReviews = 27,
  className,
  ...props
}: React.ComponentProps<"section"> & {
  name?: string
  description?: string
  price?: number
  originalPrice?: number
  rating?: number
  totalRatings?: number
  totalReviews?: number
}) {
  const baseId = React.useId()
  const [active, setActive] = React.useState(0)
  const [size, setSize] = React.useState("MD")
  const [pin, setPin] = React.useState("")
  const img = THUMBS[active] ?? THUMBS[0]

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas px-4 py-6 text-foreground sm:px-6 sm:py-10 md:px-8",
        className
      )}
      aria-label="Product detail"
      {...props}
    >
      <div className="mx-auto w-full max-w-xl lg:max-w-6xl">
        <div className="grid items-start gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Sticky vertical-thumb gallery */}
          <div className="w-full min-w-0 lg:sticky lg:top-6 lg:self-start">
            <div className="flex flex-row gap-2">
              <div
                role="listbox"
                aria-label="Product image thumbnails"
                aria-orientation="vertical"
                className="flex w-14 shrink-0 flex-col gap-2 overflow-y-auto sm:w-16"
              >
                {THUMBS.map((t, i) => (
                  <button
                    key={t.src}
                    type="button"
                    role="option"
                    aria-selected={i === active}
                    aria-label={t.label}
                    onClick={() => setActive(i)}
                    className={cn(
                      "aspect-[64/85] w-full cursor-pointer overflow-hidden rounded-md border-b-2 p-0 outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      i === active
                        ? "border-foreground"
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
              <div className="min-w-0 flex-1">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="aspect-[548/712] w-full rounded-md object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* Product info */}
          <div className="w-full min-w-0 text-start">
            <h1
              id={`${baseId}-title`}
              className="text-xl font-bold tracking-tight text-foreground md:text-2xl"
            >
              {name}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <p className="text-2xl font-bold text-foreground md:text-3xl" dir="ltr">
                <span className="sr-only">Sale price: </span>${price}
              </p>
              <p className="text-lg text-muted-foreground">
                <s aria-label={`Original price: $${originalPrice}`}>
                  <span dir="ltr">${originalPrice}</span>
                </s>
                <span className="ms-1.5 text-sm">Tax included</span>
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div
                className="flex items-center gap-1 rounded-md border border-border/70 bg-muted/40 px-2.5 text-lg font-medium text-foreground"
                role="img"
                aria-label={`Rated ${rating} out of 5 stars`}
                dir="ltr"
              >
                <span aria-hidden>{rating}</span>
                <StarIcon filled />
              </div>
              <p className="text-sm text-muted-foreground">
                <a
                  href={`#${baseId}-reviews`}
                  className="rounded-sm outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {totalRatings} ratings and {totalReviews} reviews
                </a>
              </p>
            </div>

            <Separator className="my-6" />

            <fieldset>
              <legend className="text-lg font-semibold text-foreground">
                Sizes
              </legend>
              <div className="mt-4 flex flex-wrap gap-3">
                {SIZES.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    aria-label={s.ariaLabel}
                    aria-pressed={size === s.label}
                    onClick={() => setSize(s.label)}
                    className={cn(
                      "flex h-11 w-11 cursor-pointer items-center justify-center rounded-md border text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      size === s.label
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border/70 text-foreground hover:border-primary"
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button type="button" variant="outline" className="h-[46px] w-full">
                Add to wishlist
              </Button>
              <Button type="button" className="h-[46px] w-full">
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
              <div className="mt-4 flex max-w-sm flex-col gap-3 sm:flex-row">
                <Label htmlFor={`${baseId}-pin`} className="sr-only">
                  Pincode
                </Label>
                <Input
                  id={`${baseId}-pin`}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter pincode"
                  autoComplete="postal-code"
                  inputMode="numeric"
                  aria-describedby={`${baseId}-pin-desc`}
                  dir="ltr"
                  className="h-[46px] min-w-0 flex-1 shadow-none"
                />
                <Button type="button" className="h-[46px] shrink-0">
                  Apply
                </Button>
              </div>
            </div>

            <Separator className="my-6" />

            <Accordion
              type="single"
              collapsible
              defaultValue="details"
              className="w-full"
            >
              <AccordionItem value="details">
                <AccordionTrigger className="cursor-pointer text-sm font-semibold">
                  Product details
                </AccordionTrigger>
                <AccordionContent>
                  <div className="rounded-md bg-muted/40 p-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Lightweight georgette with tonal embroidery, lined bodice,
                      and an attached dupatta. Relaxed A-line silhouette — true
                      to size.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="vendor">
                <AccordionTrigger className="cursor-pointer text-sm font-semibold">
                  Vendor details
                </AccordionTrigger>
                <AccordionContent>
                  <div className="rounded-md bg-muted/40 p-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Ships in 1–2 business days. Authenticity guaranteed by the
                      vendor partner.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="returns">
                <AccordionTrigger className="cursor-pointer text-sm font-semibold">
                  Return and exchange policy
                </AccordionTrigger>
                <AccordionContent>
                  <div className="rounded-md bg-muted/40 p-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Free returns within 14 days for unworn items with tags.
                      Size exchanges only.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Separator className="my-6" />

            <div id={`${baseId}-reviews`}>
              <h2 className="text-lg font-semibold text-foreground">
                Customer Reviews
              </h2>
              <div
                className="mt-6 flex gap-1"
                role="img"
                aria-label={`Rated ${rating} out of 5 stars`}
                dir="ltr"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} filled={i < rating} className="size-[18px]" />
                ))}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <p className="text-2xl font-medium text-foreground" dir="ltr">
                  {rating.toFixed(1)} / 5
                </p>
                <p className="text-sm text-muted-foreground">
                  Based on {totalRatings} ratings
                </p>
              </div>

              <article className="mt-6 flex flex-col items-start gap-3 sm:flex-row">
                <img
                  src={assetSrc(avatarImg)}
                  alt=""
                  className="size-12 shrink-0 rounded-full border-2 border-border/70 object-cover"
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    Jordan Lee
                  </p>
                  <div
                    className="mt-1 flex items-center gap-1"
                    role="img"
                    aria-label="Rated 3 out of 5 stars"
                    dir="ltr"
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} filled={i < 3} className="size-3" />
                    ))}
                    <time
                      dateTime="2026-04-01"
                      className="ms-2 text-xs font-medium text-muted-foreground"
                    >
                      2 mins ago
                    </time>
                  </div>
                  <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
                    Soft fabric and beautiful embroidery — true to size. Shipping
                    was impressively prompt.
                  </p>
                </div>
              </article>

              <a
                href={`#${baseId}-reviews`}
                className="mt-6 inline-block rounded-sm text-sm font-semibold text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
              >
                Read all reviews
                <span className="sr-only"> for {name}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
