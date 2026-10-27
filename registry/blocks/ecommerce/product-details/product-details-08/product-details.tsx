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
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

import avatarImg from "./images/avatar.webp"
import tee1 from "./images/tee-1.webp"
import tee2 from "./images/tee-2.webp"
import tee3 from "./images/tee-3.webp"
import tee4 from "./images/tee-4.webp"

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

const SHOTS = [
  { src: assetSrc(tee1), label: "View image 1: front view", alt: "Front view" },
  { src: assetSrc(tee2), label: "View image 2: side view", alt: "Side view" },
  { src: assetSrc(tee3), label: "View image 3: back view", alt: "Back view" },
  { src: assetSrc(tee4), label: "View image 4: detail view", alt: "Detail view" },
] as const

const SIZES = [
  { value: "SM", label: "Size: Small" },
  { value: "MD", label: "Size: Medium" },
  { value: "LG", label: "Size: Large" },
  { value: "XL", label: "Size: Extra Large" },
] as const

const DETAILS = [
  {
    value: "details",
    title: "Product details",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    value: "vendor",
    title: "Vendor details",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    value: "returns",
    title: "Return and exchange policy",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
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
  const [size, setSize] = React.useState<(typeof SIZES)[number]["value"]>("MD")
  const shot = SHOTS[active] ?? SHOTS[0]

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white px-4 py-6 sm:px-6 md:px-8",
        className
      )}
      aria-label="Product detail"
      {...props}
    >
      <div className="mx-auto w-full max-w-xl lg:max-w-6xl">
        <div className="grid items-start gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-12">
          {/* Sticky gallery: main + end-edge vertical thumbs */}
          <div className="w-full min-w-0 lg:sticky lg:top-0 lg:self-start">
            <div className="flex flex-row gap-2">
              <div className="min-w-0 flex-1 overflow-hidden rounded-md bg-muted">
                <img
                  src={shot.src}
                  alt={shot.alt}
                  className="aspect-[548/712] w-full object-cover"
                />
              </div>

              <div
                role="listbox"
                aria-label="Product image thumbnails"
                aria-orientation="vertical"
                className="flex w-16 shrink-0 flex-col gap-3 max-sm:w-14"
              >
                {SHOTS.map((s, i) => (
                  <button
                    key={`${s.src}-${i}`}
                    type="button"
                    role="option"
                    aria-selected={i === active}
                    aria-label={s.label}
                    onClick={() => setActive(i)}
                    className={cn(
                      "aspect-[64/85] w-full cursor-pointer overflow-hidden rounded border-b-2 p-0 outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      i === active
                        ? "border-foreground"
                        : "border-transparent opacity-80 hover:opacity-100"
                    )}
                  >
                    <img
                      src={s.src}
                      alt=""
                      aria-hidden
                      className="size-full object-cover object-top"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product info */}
          <div className="w-full min-w-0 text-start">
            <div>
              <h1 className="text-xl font-bold text-foreground md:text-2xl">
                {name}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>

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

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div
                  className="flex items-center gap-1 rounded-md border border-border/70 bg-muted px-2.5 text-lg font-medium text-foreground"
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
            </div>

            <Separator className="my-6" />

            <div>
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

              <div className="mt-6 flex flex-wrap gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="h-[46px] w-full max-w-[45%] flex-1"
                >
                  Add to wishlist
                </Button>
                <Button
                  type="button"
                  className="h-[46px] w-full max-w-[45%] flex-1"
                >
                  Add to cart
                </Button>
              </div>
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

            <Accordion
              type="single"
              collapsible
              defaultValue="details"
              className="space-y-6"
            >
              {DETAILS.map((item) => (
                <AccordionItem
                  key={item.value}
                  value={item.value}
                  className="border-0"
                >
                  <AccordionTrigger className="cursor-pointer py-0 text-sm font-semibold hover:no-underline hover:text-primary">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="pb-0">
                    <div className="mt-4 bg-muted p-4">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {item.body}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <Separator className="my-6" />

            <div id={`${baseId}-reviews`}>
              <h2 className="text-lg font-semibold text-foreground">
                Customer Reviews
              </h2>

              <div
                className="mt-6 flex gap-2"
                role="img"
                aria-label={`Rated ${rating} out of 5 stars`}
                dir="ltr"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    filled={i < rating}
                    className="size-[18px]"
                  />
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <p className="text-2xl font-medium text-foreground">
                  {rating.toFixed(1)} / 5
                </p>
                <p className="text-sm text-muted-foreground">
                  Based on {totalRatings} ratings
                </p>
              </div>
            </div>

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
                <span className="sr-only"> for {name}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
