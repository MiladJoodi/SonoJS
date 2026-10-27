"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import shoe1 from "./images/shoe-1.webp"
import shoe2 from "./images/shoe-2.webp"
import shoe3 from "./images/shoe-3.webp"
import shoe4 from "./images/shoe-4.webp"
import shoe5 from "./images/shoe-5.webp"
import shoe6 from "./images/shoe-6.webp"
import shoe7 from "./images/shoe-7.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const PRODUCTS = [
  {
    id: 1,
    name: "Sole Elegance",
    price: "$10.00",
    image: assetSrc(shoe1),
    alt: "Sole Elegance",
    description: "Polished leather silhouette for evening walks.",
    tones: ["#1c1917", "#a8a29e", "#fafaf9"],
  },
  {
    id: 2,
    name: "Urban Sneakers",
    price: "$12.00",
    image: assetSrc(shoe2),
    alt: "Urban Sneakers",
    description: "Breathable knit upper with city-ready cushioning.",
    tones: ["#0f172a", "#38bdf8", "#f8fafc"],
  },
  {
    id: 3,
    name: "Velvet Boots",
    price: "$14.00",
    image: assetSrc(shoe3),
    alt: "Velvet Boots",
    description: "Soft shaft, stacked heel — weekend dinner ready.",
    tones: ["#3f1f1f", "#9a3412", "#fef3c7"],
  },
  {
    id: 4,
    name: "Summit Hiking",
    price: "$12.00",
    image: assetSrc(shoe4),
    alt: "Summit Hiking",
    description: "Grip outsole and weather-sealed seam tape.",
    tones: ["#14532d", "#a3e635", "#ecfccb"],
  },
  {
    id: 5,
    name: "Zenith Glow",
    price: "$15.00",
    image: assetSrc(shoe5),
    alt: "Zenith Glow",
    description: "Iridescent finish that catches every street light.",
    tones: ["#312e81", "#c4b5fd", "#eef2ff"],
  },
  {
    id: 6,
    name: "Echo Elegance",
    price: "$16.00",
    image: assetSrc(shoe6),
    alt: "Echo Elegance",
    description: "Minimal derby with hand-burnished toe.",
    tones: ["#422006", "#d6d3d1", "#fff7ed"],
  },
  {
    id: 7,
    name: "Pumps",
    price: "$12.00",
    image: assetSrc(shoe7),
    alt: "Pumps",
    description: "Clean pointed toe for boardroom to after-hours.",
    tones: ["#881337", "#fda4af", "#fff1f2"],
  },
  {
    id: 8,
    name: "Blaze Burst",
    price: "$11.00",
    image: assetSrc(shoe2),
    alt: "Blaze Burst sneakers",
    description: "High-contrast runner with responsive foam midsole.",
    tones: ["#7c2d12", "#fb923c", "#fff7ed"],
  },
] as const

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
  return (
    <li className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
      <div className="flex flex-col sm:flex-row">
        <a
          href="#"
          className="relative block shrink-0 cursor-pointer bg-muted outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset sm:w-[42%]"
        >
          <div className="aspect-[5/4] p-4 sm:aspect-auto sm:h-full sm:min-h-[180px]">
            <img
              src={product.image}
              alt={product.alt}
              className="size-full object-contain"
            />
          </div>
        </a>

        <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 p-4 sm:p-5">
          <div>
            <div className="flex items-start justify-between gap-3">
              <h3 className="min-w-0 flex-1 truncate text-start text-base font-semibold text-foreground">
                {product.name}
              </h3>
              <p
                dir="ltr"
                className="shrink-0 text-base font-semibold text-foreground tabular-nums"
              >
                {product.price}
              </p>
            </div>
            <p className="mt-2 line-clamp-2 text-start text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>
            <div
              className="mt-3 flex items-center gap-2"
              aria-label="Available colorways"
            >
              {product.tones.map((tone) => (
                <span
                  key={tone}
                  className="size-3.5 rounded-full border border-border/70"
                  style={{ backgroundColor: tone }}
                />
              ))}
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
              aria-label={`Save ${product.name}`}
              title="Wishlist"
            >
              <HeartIcon />
            </Button>
          </div>
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
      aria-labelledby="product-list-03-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8 md:mb-10">
          <p className="text-start text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            Footwear
          </p>
          <h2
            id="product-list-03-heading"
            className="mt-1 text-start text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            Runway rail
          </h2>
          <p className="mt-2 max-w-lg text-start text-sm text-muted-foreground">
            Split cards with colorways — shop like a buyer’s rack, not a grid of
            twins.
          </p>
        </div>

        <ul className="grid gap-4 md:gap-5">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </section>
  )
}
