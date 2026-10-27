"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import aloederm1 from "./images/aloederm-1.webp"
import aloederm2 from "./images/aloederm-2.webp"
import sunscreen1 from "./images/sunscreen-1.webp"
import sunscreen2 from "./images/sunscreen-2.webp"
import sunscreen3 from "./images/sunscreen-3.webp"
import sunscreen4 from "./images/sunscreen-4.webp"
import sunscreen5 from "./images/sunscreen-5.webp"
import sunscreen6 from "./images/sunscreen-6.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const STAR_PATH =
  "m23.363 8.584-7.378-1.127L12.678.413c-.247-.526-1.11-.526-1.357 0L8.015 7.457.637 8.584a.75.75 0 0 0-.423 1.265l5.36 5.494-1.267 7.767a.75.75 0 0 0 1.103.777L12 20.245l6.59 3.643a.75.75 0 0 0 1.103-.777l-1.267-7.767 5.36-5.494a.75.75 0 0 0-.423-1.266z"

const PRODUCTS = [
  {
    id: 1,
    name: "Skin Glow Combo",
    price: "$8.00",
    originalPrice: "$11.00",
    rating: 4,
    reviews: 102,
    image: assetSrc(sunscreen1),
    alt: "Skin Glow Combo sunscreen",
  },
  {
    id: 2,
    name: "Crystal Glow",
    price: "$9.00",
    originalPrice: "$14.00",
    rating: 4,
    reviews: 100,
    image: assetSrc(sunscreen2),
    alt: "Crystal Glow",
  },
  {
    id: 3,
    name: "Lancome La Base",
    price: "$7.00",
    originalPrice: "$11.00",
    rating: 3,
    reviews: 90,
    image: assetSrc(sunscreen3),
    alt: "Lancome La Base",
  },
  {
    id: 4,
    name: "HD Face Primer",
    price: "$12.00",
    originalPrice: "$16.00",
    rating: 5,
    reviews: 102,
    image: assetSrc(sunscreen4),
    alt: "HD Face Primer",
  },
  {
    id: 5,
    name: "Sunscreen Gel",
    price: "$12.00",
    originalPrice: "$18.00",
    rating: 4,
    reviews: 102,
    image: assetSrc(sunscreen5),
    alt: "Sunscreen Gel",
  },
  {
    id: 6,
    name: "Watermelon Sunscreen",
    price: "$14.00",
    originalPrice: "$20.00",
    rating: 4,
    reviews: 102,
    image: assetSrc(sunscreen6),
    alt: "Watermelon Sunscreen",
  },
  {
    id: 7,
    name: "Aloederm Body Cream",
    price: "$14.00",
    originalPrice: "$22.00",
    rating: 3,
    reviews: 200,
    image: assetSrc(aloederm1),
    alt: "Aloederm Body Cream",
  },
  {
    id: 8,
    name: "Aloederm Face Cream",
    price: "$12.00",
    originalPrice: "$20.00",
    rating: 4,
    reviews: 88,
    image: assetSrc(aloederm2),
    alt: "Aloederm Face Cream",
  },
] as const

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div
      className="flex justify-start gap-1"
      role="img"
      aria-label={`Rated ${rating} out of ${max} stars`}
    >
      {Array.from({ length: max }, (_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={cn(
            "size-3",
            i < rating
              ? "fill-[#F5B301]"
              : "fill-zinc-200 dark:fill-zinc-600"
          )}
        >
          <path d={STAR_PATH} />
        </svg>
      ))}
    </div>
  )
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={cn("size-3.5 fill-current", className)}
    >
      <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" />
    </svg>
  )
}

function ProductCard({
  product,
}: {
  product: (typeof PRODUCTS)[number]
}) {
  return (
    <li className="flex flex-col rounded-[16px] border border-border/60 bg-card p-2 shadow-soft">
      <a
        href="#"
        className="block cursor-pointer rounded-[12px] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
      >
        <div className="overflow-hidden rounded-[12px] bg-gradient-to-b from-rose-50 to-amber-50 dark:from-zinc-900 dark:to-zinc-950">
          <img
            src={product.image}
            alt={product.alt}
            className="aspect-square w-full object-cover object-top"
          />
        </div>
      </a>

      <div className="flex flex-1 flex-col px-2 pt-4 pb-2">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-start text-sm font-semibold text-foreground">
          {product.name}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <StarRating rating={product.rating} />
          <span
            dir="ltr"
            className="text-xs font-medium text-muted-foreground tabular-nums"
          >
            {product.reviews} reviews
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-baseline gap-2">
          <span
            dir="ltr"
            className="text-lg font-semibold tracking-tight text-foreground tabular-nums"
          >
            {product.price}
          </span>
          <s
            dir="ltr"
            className="text-sm text-muted-foreground tabular-nums"
          >
            {product.originalPrice}
          </s>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">
            MRP
          </span>
        </div>

        <div className="mt-auto flex flex-col gap-1 pt-4">
          <Button
            type="button"
            className="w-full"
            aria-label={`Add ${product.name} to bag`}
          >
            Add to Bag
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-auto gap-1.5 py-2 text-muted-foreground"
            aria-label={`Wishlist ${product.name}`}
          >
            <HeartIcon />
            Save for later
          </Button>
        </div>
      </div>
    </li>
  )
}

export default function ProductList({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("w-full bg-canvas px-4 py-10 md:px-8 md:py-14", className)}
      aria-labelledby="product-list-06-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 rounded-[16px] border border-border/70 bg-gradient-to-br from-rose-50/80 via-card to-amber-50/60 px-4 py-5 dark:from-zinc-900/80 dark:via-card dark:to-zinc-950/60 sm:px-8 sm:py-8">
          <p className="text-start text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            Apothecary
          </p>
          <h2
            id="product-list-06-heading"
            className="mt-1 text-start text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            Hot list
          </h2>
          <p className="mt-2 max-w-lg text-start text-sm text-muted-foreground">
            Soft spa tiles with warm product wells — MRP pricing and bag-first
            CTAs.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </section>
  )
}
