"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import laptop1 from "./images/laptop-1.webp"
import laptop2 from "./images/laptop-2.webp"
import laptop3 from "./images/laptop-3.webp"
import laptop4 from "./images/laptop-4.webp"
import laptop5 from "./images/laptop-5.webp"
import laptop6 from "./images/laptop-6.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const STAR_PATH =
  "m23.363 8.584-7.378-1.127L12.678.413c-.247-.526-1.11-.526-1.357 0L8.015 7.457.637 8.584a.75.75 0 0 0-.423 1.265l5.36 5.494-1.267 7.767a.75.75 0 0 0 1.103.777L12 20.245l6.59 3.643a.75.75 0 0 0 1.103-.777l-1.267-7.767 5.36-5.494a.75.75 0 0 0-.423-1.266z"

const LAPTOPS = [
  {
    id: 1,
    name: "HP Polycarbonate Laptop 15S, AMD, 15.6-Inch",
    price: "$600",
    image: assetSrc(laptop2),
    alt: "HP Polycarbonate Laptop 15S",
    rating: 4,
    reviews: 102,
    chip: "AMD",
  },
  {
    id: 2,
    name: "ASUS Vivobook 15, Intel Core i3-1220P 12th Gen",
    price: "$550",
    image: assetSrc(laptop3),
    alt: "ASUS Vivobook 15",
    rating: 3,
    reviews: 82,
    chip: "Intel",
  },
  {
    id: 3,
    name: 'Lenovo V15 Intel Celeron N4500 15.6"',
    price: "$570",
    image: assetSrc(laptop1),
    alt: "Lenovo V15 Intel Celeron N4500",
    rating: 5,
    reviews: 60,
    chip: "Lenovo",
  },
  {
    id: 4,
    name: "Acer One 14 AMD Ryzen 3 (8GB / 256GB SSD)",
    price: "$520",
    image: assetSrc(laptop4),
    alt: "Acer One 14 AMD Ryzen 3",
    rating: 3,
    reviews: 102,
    chip: "Ryzen",
  },
  {
    id: 5,
    name: "Dell 15 Laptop, 8GB / 1TB+256GB SSD",
    price: "$570",
    image: assetSrc(laptop5),
    alt: "Dell 15 Laptop",
    rating: 3,
    reviews: 99,
    chip: "Dell",
  },
  {
    id: 6,
    name: "Samsung 15 Laptop, 8GB / 1TB+256GB SSD",
    price: "$770",
    image: assetSrc(laptop6),
    alt: "Samsung 15 Laptop",
    rating: 4,
    reviews: 102,
    chip: "Samsung",
  },
] as const

function RatingChip({
  rating,
  reviews,
}: {
  rating: number
  reviews: number
}) {
  return (
    <div
      className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-2.5 py-1 text-xs font-medium text-foreground shadow-soft"
      role="img"
      aria-label={`Rated ${rating} out of 5 stars from ${reviews} reviews`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-3.5 fill-[#F5B301]"
      >
        <path d={STAR_PATH} />
      </svg>
      <span dir="ltr" className="tabular-nums">
        {rating}.0
      </span>
      <span className="text-muted-foreground">·</span>
      <span dir="ltr" className="text-muted-foreground tabular-nums">
        {reviews}
      </span>
    </div>
  )
}

function ProductCard({ laptop }: { laptop: (typeof LAPTOPS)[number] }) {
  return (
    <li className="flex flex-col overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft transition-shadow hover:shadow-md">
      <div className="relative bg-zinc-950 dark:bg-zinc-900">
        <span className="absolute start-3 top-3 z-10 rounded-md bg-white/10 px-2 py-1 text-[11px] font-semibold tracking-wide text-white backdrop-blur-sm">
          {laptop.chip}
        </span>
        <a
          href="#"
          className="block cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          <div className="aspect-[16/11] px-4 pt-6 pb-2 sm:px-6 sm:pt-8">
            <img
              src={laptop.image}
              alt={laptop.alt}
              className="size-full object-contain object-bottom drop-shadow-lg"
            />
          </div>
        </a>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        <div className="space-y-3">
          <RatingChip rating={laptop.rating} reviews={laptop.reviews} />
          <h3 className="line-clamp-2 text-start text-sm font-semibold leading-snug text-foreground sm:text-[15px]">
            {laptop.name}
          </h3>
        </div>

        <div className="mt-auto flex flex-col gap-3 border-t border-border/70 pt-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-start text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
              From
            </p>
            <p
              dir="ltr"
              className="text-start text-xl font-semibold tracking-tight text-foreground tabular-nums"
            >
              {laptop.price}
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full sm:w-auto"
            aria-label={`View ${laptop.name}`}
          >
            Specs
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
      aria-labelledby="product-list-02-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 grid gap-3 border-b border-border/70 pb-6 md:mb-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-start text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              Workstations
            </p>
            <h2
              id="product-list-02-heading"
              className="mt-1 text-start text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            >
              Top Laptops
            </h2>
            <p className="mt-2 max-w-xl text-start text-sm text-muted-foreground sm:text-base">
              Spec-first picks with real review scores — dark product stages
              keep hardware looking sharp.
            </p>
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {LAPTOPS.map((laptop) => (
            <ProductCard key={laptop.id} laptop={laptop} />
          ))}
        </ul>
      </div>
    </section>
  )
}
