"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import aloederm1 from "./images/aloederm-1.webp"
import aloederm2 from "./images/aloederm-2.webp"
import faceBody1 from "./images/face-body-1.webp"
import faceBody2 from "./images/face-body-2.webp"
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
    off: "27%",
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
    off: "36%",
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
    off: "36%",
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
    off: "25%",
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
    off: "33%",
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
    off: "30%",
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
    off: "36%",
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
    off: "40%",
    rating: 4,
    reviews: 88,
    image: assetSrc(aloederm2),
    alt: "Aloederm Face Cream",
  },
  {
    id: 9,
    name: "Shower Cream",
    price: "$15.00",
    originalPrice: "$25.00",
    off: "40%",
    rating: 4,
    reviews: 72,
    image: assetSrc(faceBody1),
    alt: "Shower Cream",
  },
  {
    id: 10,
    name: "Face Body Shower Cream",
    price: "$16.00",
    originalPrice: "$26.00",
    off: "38%",
    rating: 4,
    reviews: 94,
    image: assetSrc(faceBody2),
    alt: "Face Body Shower Cream",
  },
] as const

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div
      className="flex justify-start gap-0.5"
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
            "size-2.5",
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
      className={cn("size-4 fill-foreground", className)}
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
    <li className="relative flex flex-col overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
      <span className="absolute end-2 top-2 z-10 rounded-md bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground tabular-nums">
        −{product.off}
      </span>

      <a
        href="#"
        className="block cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
      >
        <div className="bg-muted p-1.5">
          <div className="overflow-hidden rounded-md bg-card">
            <img
              src={product.image}
              alt={product.alt}
              className="aspect-square w-full object-cover object-top"
            />
          </div>
        </div>

        <div className="space-y-1.5 px-2.5 pt-3 pb-2">
          <h3 className="line-clamp-2 min-h-[2.25rem] text-start text-xs font-semibold leading-snug text-foreground sm:text-sm">
            {product.name}
          </h3>
          <p className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 text-start text-xs font-semibold text-foreground">
            <span className="text-muted-foreground">MRP</span>
            <s
              dir="ltr"
              className="text-muted-foreground tabular-nums"
            >
              {product.originalPrice}
            </s>
            <span dir="ltr" className="tabular-nums">
              {product.price}
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-1.5">
            <StarRating rating={product.rating} />
            <span
              dir="ltr"
              className="text-[10px] text-muted-foreground tabular-nums"
            >
              ({product.reviews})
            </span>
          </div>
        </div>
      </a>

      <div className="mt-auto flex h-[46px] border-t border-border/70">
        <button
          type="button"
          title="Save"
          aria-label={`Wishlist ${product.name}`}
          className="flex w-[28%] cursor-pointer items-center justify-center bg-transparent outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        >
          <HeartIcon />
        </button>
        <button
          type="button"
          aria-label={`Add ${product.name} to bag`}
          className="flex flex-1 cursor-pointer items-center justify-center bg-primary px-1 text-[11px] font-semibold text-primary-foreground outline-none hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset sm:text-sm"
        >
          Add to Bag
        </button>
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
      aria-labelledby="product-list-07-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-4 border-b border-border/70 pb-4 md:mb-10">
          <div>
            <p className="text-start text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              Pharmacy shelf
            </p>
            <h2
              id="product-list-07-heading"
              className="mt-1 text-start text-2xl font-semibold tracking-tight text-foreground"
            >
              Hot list
            </h2>
          </div>
          <p className="hidden max-w-[14rem] text-end text-xs text-muted-foreground sm:block">
            Dense five-up grid with flush bag bar.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 min-[1200px]:grid-cols-5">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </section>
  )
}
