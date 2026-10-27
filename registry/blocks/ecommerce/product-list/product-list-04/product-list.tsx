"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import fashion1 from "./images/fashion-1.webp"
import fashion2 from "./images/fashion-2.webp"
import fashion3 from "./images/fashion-3.webp"
import fashion4 from "./images/fashion-4.webp"
import fashion5 from "./images/fashion-5.webp"
import fashion6 from "./images/fashion-6.webp"
import fashion7 from "./images/fashion-7.webp"
import fashion9 from "./images/fashion-9.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const STAR_PATH =
  "m23.363 8.584-7.378-1.127L12.678.413c-.247-.526-1.11-.526-1.357 0L8.015 7.457.637 8.584a.75.75 0 0 0-.423 1.265l5.36 5.494-1.267 7.767a.75.75 0 0 0 1.103.777L12 20.245l6.59 3.643a.75.75 0 0 0 1.103-.777l-1.267-7.767 5.36-5.494a.75.75 0 0 0-.423-1.266z"

const PRODUCTS = [
  {
    id: 1,
    name: "Crimson Grace Gown",
    subtitle: "Flowy and elegant red dress",
    price: "$10",
    originalPrice: "$15",
    off: "33%",
    rating: 4,
    image: assetSrc(fashion1),
    alt: "Crimson Grace Gown",
  },
  {
    id: 2,
    name: "Emerald Empress Gown",
    subtitle: "Regal, cape-style green outfit",
    price: "$12",
    originalPrice: "$15",
    off: "20%",
    rating: 4,
    image: assetSrc(fashion2),
    alt: "Emerald Empress Gown",
  },
  {
    id: 3,
    name: "Urban Edge Tee",
    subtitle: "Sleek black leather and white tee combo",
    price: "$14",
    originalPrice: "$15",
    off: "7%",
    rating: 4,
    image: assetSrc(fashion3),
    alt: "Urban Edge Tee",
  },
  {
    id: 4,
    name: "Street Luxe Knit Set",
    subtitle: "Casual streetwear with a stylish knit top",
    price: "$12",
    originalPrice: "$15",
    off: "20%",
    rating: 4,
    image: assetSrc(fashion4),
    alt: "Street Luxe Knit Set",
  },
  {
    id: 5,
    name: "Bold Stroll Coat Set",
    subtitle: "Statement black coat with red print trousers",
    price: "$15",
    originalPrice: "$15",
    off: null,
    rating: 4,
    image: assetSrc(fashion5),
    alt: "Bold Stroll Coat Set",
  },
  {
    id: 6,
    name: "Floral Blush Midi Dress",
    subtitle: "Soft, romantic floral dress",
    price: "$14",
    originalPrice: "$15",
    off: "7%",
    rating: 4,
    image: assetSrc(fashion6),
    alt: "Floral Blush Midi Dress",
  },
  {
    id: 7,
    name: "Chic Contrast Blazer Fit",
    subtitle: "Trendy blazer and denim street style",
    price: "$14",
    originalPrice: "$15",
    off: "7%",
    rating: 4,
    image: assetSrc(fashion7),
    alt: "Chic Contrast Blazer Fit",
  },
  {
    id: 8,
    name: "Effortless Café Casuals",
    subtitle: "Relaxed tank top and jeans outfit",
    price: "$14",
    originalPrice: "$15",
    off: "7%",
    rating: 4,
    image: assetSrc(fashion9),
    alt: "Effortless Café Casuals",
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
      className={cn("size-4 fill-current", className)}
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
  const onSale = product.price !== product.originalPrice

  return (
    <li className="group flex flex-col overflow-hidden rounded-[12px] bg-card shadow-soft ring-1 ring-border/70">
      <div className="relative overflow-hidden">
        {product.off ? (
          <span className="absolute start-0 top-4 z-10 rounded-e-md bg-destructive px-2.5 py-1 text-[11px] font-bold tracking-wide text-white shadow-soft">
            −{product.off}
          </span>
        ) : (
          <span className="absolute start-0 top-4 z-10 rounded-e-md bg-foreground px-2.5 py-1 text-[11px] font-bold tracking-wide text-background shadow-soft">
            Full price
          </span>
        )}
        <a
          href="#"
          className="block cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        >
          <img
            src={product.image}
            alt={product.alt}
            className="aspect-[3/4] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card via-card/70 to-transparent sm:h-24" />
        </a>
      </div>

      <div className="relative z-10 -mt-6 flex flex-1 flex-col gap-3 px-2.5 pb-2.5 sm:-mt-10 sm:px-3.5 sm:pb-3.5">
        <div className="rounded-[12px] border border-border/70 bg-card p-2.5 shadow-soft sm:bg-card/95 sm:p-3 sm:backdrop-blur-sm">
          <h3 className="truncate text-start text-sm font-semibold text-foreground">
            {product.name}
          </h3>
          <p className="mt-0.5 truncate text-start text-xs text-muted-foreground">
            {product.subtitle}
          </p>
          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex min-w-0 flex-wrap items-baseline gap-2">
              <p
                dir="ltr"
                className="text-base font-bold text-foreground tabular-nums"
              >
                {product.price}
              </p>
              {onSale ? (
                <p
                  dir="ltr"
                  className="text-sm text-muted-foreground tabular-nums line-through"
                >
                  {product.originalPrice}
                </p>
              ) : null}
            </div>
            <StarRating rating={product.rating} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            className="min-w-0 flex-1"
            aria-label={`Add ${product.name} to cart`}
          >
            Add to cart
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="size-11 shrink-0 px-0"
            aria-label={`Wishlist ${product.name}`}
          >
            <HeartIcon />
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
      aria-labelledby="product-list-04-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 flex flex-col gap-2 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-start text-xs font-semibold tracking-[0.18em] text-destructive uppercase">
              Mid-season sale
            </p>
            <h2
              id="product-list-04-heading"
              className="mt-1 text-start text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            >
              Atelier markdowns
            </h2>
          </div>
          <p className="max-w-xs text-start text-sm text-muted-foreground sm:text-end">
            Discount ribbons + frosted price sheets over editorial covers.
          </p>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </section>
  )
}
