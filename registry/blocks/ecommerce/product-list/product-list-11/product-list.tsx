"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import watch1 from "./images/watch-1.webp"
import watch2 from "./images/watch-2.webp"
import watch3 from "./images/watch-3.webp"
import watch4 from "./images/watch-4.webp"
import watch5 from "./images/watch-5.webp"
import watch7 from "./images/watch-7.webp"
import watch8 from "./images/watch-8.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const STAR_PATH =
  "m23.363 8.584-7.378-1.127L12.678.413c-.247-.526-1.11-.526-1.357 0L8.015 7.457.637 8.584a.75.75 0 0 0-.423 1.265l5.36 5.494-1.267 7.767a.75.75 0 0 0 1.103.777L12 20.245l6.59 3.643a.75.75 0 0 0 1.103-.777l-1.267-7.767 5.36-5.494a.75.75 0 0 0-.423-1.266z"

const PRODUCTS = [
  {
    id: 1,
    name: "French Connection Timex",
    price: "$95.00",
    rating: 4,
    image: assetSrc(watch1),
    alt: "French Connection Timex",
  },
  {
    id: 2,
    name: "Classic Bluetooth",
    price: "$60.00",
    rating: 4,
    image: assetSrc(watch2),
    alt: "Classic Bluetooth",
  },
  {
    id: 3,
    name: "Smart Watch",
    price: "$110.00",
    rating: 4,
    image: assetSrc(watch3),
    alt: "Smart Watch",
  },
  {
    id: 4,
    name: "Amazfit GTR",
    price: "$85.00",
    rating: 4,
    image: assetSrc(watch4),
    alt: "Amazfit GTR",
  },
  {
    id: 5,
    name: "Michael Kors Lexington",
    price: "$77.00",
    rating: 4,
    image: assetSrc(watch5),
    alt: "Michael Kors Lexington",
  },
  {
    id: 6,
    name: "Garmin Venu",
    price: "$90.00",
    rating: 4,
    image: assetSrc(watch8),
    alt: "Garmin Venu",
  },
  {
    id: 7,
    name: "Fitbit Sense",
    price: "$50.00",
    rating: 4,
    image: assetSrc(watch7),
    alt: "Fitbit Sense",
  },
  {
    id: 8,
    name: "Fossil Gen",
    price: "$35.00",
    rating: 4,
    image: assetSrc(watch8),
    alt: "Fossil Gen",
  },
] as const

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div
      className="mt-5 flex justify-center gap-1.5"
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
            "size-3.5",
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

function ProductCard({
  product,
}: {
  product: (typeof PRODUCTS)[number]
}) {
  return (
    <li className="group text-center">
      <a
        href="#"
        className="block cursor-pointer rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
      >
        <div className="relative mx-auto flex aspect-[5/3] max-w-[280px] items-center justify-center">
          <div className="absolute inset-x-[12%] bottom-[8%] h-[18%] rounded-[100%] bg-foreground/5 blur-md transition-opacity group-hover:opacity-70" />
          <img
            src={product.image}
            alt={product.alt}
            className="relative z-10 size-full object-contain transition-transform duration-500 group-hover:-translate-y-1"
          />
        </div>

        <div className="mx-auto mt-6 h-px w-10 bg-border" />

        <h3 className="mt-5 text-sm font-medium tracking-tight text-foreground sm:text-base">
          {product.name}
        </h3>
        <p
          dir="ltr"
          className="mt-2 text-sm font-semibold text-foreground tabular-nums sm:text-base"
        >
          {product.price}
        </p>
        <StarRating rating={product.rating} />
      </a>
    </li>
  )
}

export default function ProductList({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("w-full bg-canvas px-4 py-12 md:px-8 md:py-16", className)}
      aria-labelledby="product-list-11-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-10 px-1 text-center md:mb-16">
          <p className="text-xs font-semibold tracking-[0.22em] text-muted-foreground uppercase">
            Museum floor
          </p>
          <h2
            id="product-list-11-heading"
            className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            Selected watches
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
            Borderless pedestals, soft shadow ellipses, and quiet typography.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-10 sm:gap-y-16 md:grid-cols-3 lg:grid-cols-4">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </section>
  )
}
