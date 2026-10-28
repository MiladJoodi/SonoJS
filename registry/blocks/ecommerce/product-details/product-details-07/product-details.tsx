"use client"

import * as React from "react"
import { CheckIcon, HeartIcon, Share2Icon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

import glass1 from "./images/glass-1.webp"
import glass2 from "./images/glass-2.webp"
import glass3 from "./images/glass-3.webp"
import glass4 from "./images/glass-4.webp"
import glass5 from "./images/glass-5.webp"
import glass6 from "./images/glass-6.webp"

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
        filled ? "fill-[#ffc107]" : "fill-zinc-300 dark:fill-zinc-600"
      )}
    >
      <path d={STAR_PATH} />
    </svg>
  )
}

const FRAMES = [
  { src: assetSrc(glass1), label: "View 1" },
  { src: assetSrc(glass2), label: "View 2" },
  { src: assetSrc(glass3), label: "View 3" },
  { src: assetSrc(glass4), label: "View 4" },
  { src: assetSrc(glass5), label: "View 5" },
  { src: assetSrc(glass6), label: "View 6" },
] as const

const COLORS = [
  { name: "Black", swatch: "bg-black", label: "Color: Black" },
  { name: "Red", swatch: "bg-red-600", label: "Color: Red" },
  { name: "Blue", swatch: "bg-blue-600", label: "Color: Blue" },
] as const

const FEATURES = [
  "UV Protection",
  "Stylish Design",
  "Lightweight Frame",
  "Scratch-Resistant Lenses",
  "Polarized Lenses",
  "Comfortable Fit",
] as const

export default function ProductDetails({
  name = "White Lens Glass",
  description = "Step up your style game with our premium white lens sunglasses. Crafted for both fashion and function, these sunglasses offer UV protection, a stylish design, and a lightweight frame. The scratch-resistant and polarized lenses ensure durability and clarity, while the comfortable fit makes them ideal for all-day wear. Elevate your look with these must-have accessories for any occasion.",
  price = 130,
  originalPrice = 145,
  rating = 4,
  likes = 100,
  className,
  ...props
}: React.ComponentProps<"section"> & {
  name?: string
  description?: string
  price?: number
  originalPrice?: number
  rating?: number
  likes?: number
}) {
  const baseId = React.useId()
  const [active, setActive] = React.useState(0)
  const [color, setColor] =
    React.useState<(typeof COLORS)[number]["name"]>("Black")
  const selected = FRAMES[active] ?? FRAMES[0]

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas px-4 py-6 text-foreground sm:px-6 md:px-8",
        className
      )}
      aria-label="Product detail"
      {...props}
    >
      <div className="mx-auto w-full max-w-2xl lg:mx-0 lg:max-w-6xl">
        <div className="grid items-start gap-x-8 gap-y-12 lg:grid-cols-5">
          {/* Gallery */}
          <div className="text-center lg:col-span-3">
            <div className="relative p-4 before:absolute before:inset-0 before:rounded before:bg-black/20 dark:before:bg-neutral-500/40">
              <img
                src={selected.src}
                alt={selected.label}
                className="relative z-[1] aspect-[575/418] w-full rounded-sm object-contain object-top"
              />
            </div>

            <div
              role="listbox"
              aria-label="Product image thumbnails"
              className="mx-auto mt-2 flex flex-wrap gap-2"
            >
              {FRAMES.map((f, i) => (
                <button
                  key={f.src}
                  type="button"
                  role="option"
                  aria-selected={i === active}
                  aria-label={f.label}
                  onClick={() => setActive(i)}
                  className={cn(
                    "relative cursor-pointer rounded border p-1 outline-none before:absolute before:inset-0 before:rounded-sm before:bg-black/20 focus-visible:ring-2 focus-visible:ring-ring dark:before:bg-neutral-500/40",
                    i === active ? "border-primary" : "border-transparent"
                  )}
                >
                  <img
                    src={f.src}
                    alt=""
                    aria-hidden
                    className="relative z-[1] h-16 w-20 object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Buy column */}
          <div className="min-w-0 text-start lg:col-span-2">
            <div className="flex flex-wrap items-start gap-4">
              <div>
                <h1 className="text-xl font-bold text-foreground md:text-2xl">
                  {name}
                </h1>
                <div
                  className="mt-3 flex gap-1"
                  role="img"
                  aria-label={`Rated ${rating} out of 5 stars`}
                  dir="ltr"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} filled={i < rating} />
                  ))}
                </div>
              </div>

              <div className="ms-auto flex flex-wrap gap-4">
                <button
                  type="button"
                  className="flex cursor-pointer items-center gap-1 rounded-sm bg-pink-100 px-2.5 py-1.5 text-xs text-pink-600 outline-none focus-visible:ring-2 focus-visible:ring-ring dark:bg-pink-950/40 dark:text-pink-400"
                >
                  <HeartIcon className="size-3 fill-current" aria-hidden />
                  {likes}
                </button>
                <button
                  type="button"
                  aria-label="Share"
                  className="flex cursor-pointer items-center rounded-sm bg-muted px-2.5 py-1.5 text-xs text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Share2Icon className="size-3" aria-hidden />
                </button>
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h3 className="text-xl font-semibold text-foreground">Price</h3>
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

            <div className="flex flex-col gap-4">
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
          </div>
        </div>

        {/* Features + description below */}
        <div className="mt-12 max-w-2xl">
          <h2 className="text-xl font-semibold text-foreground">
            Product Features
          </h2>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <li
                key={f}
                className="flex items-center text-sm text-muted-foreground"
              >
                <span className="me-4 flex size-[17px] shrink-0 items-center justify-center rounded-full bg-primary p-[3px] text-primary-foreground">
                  <CheckIcon className="size-full" strokeWidth={3} aria-hidden />
                </span>
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-foreground">
              Product Description
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
