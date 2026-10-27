"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import watch1 from "./images/watch-1.webp"
import watch2 from "./images/watch-2.webp"
import watch3 from "./images/watch-3.webp"
import watch4 from "./images/watch-4.webp"
import watch5 from "./images/watch-5.webp"
import watch6 from "./images/watch-6.webp"
import watch7 from "./images/watch-7.webp"
import watch8 from "./images/watch-8.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const PRODUCTS = [
  {
    id: 1,
    name: "French Connection",
    price: "$95.00",
    meta: "Automatic · 40mm",
    image: assetSrc(watch1),
    alt: "French Connection",
  },
  {
    id: 2,
    name: "Classic Bluetooth",
    price: "$78.00",
    meta: "Smart · GPS",
    image: assetSrc(watch2),
    alt: "Classic Bluetooth",
  },
  {
    id: 3,
    name: "Kors Lexington",
    price: "$68.00",
    meta: "Chronograph",
    image: assetSrc(watch3),
    alt: "Kors Lexington",
  },
  {
    id: 4,
    name: "Smart Watch",
    price: "$105.00",
    meta: "AMOLED · LTE",
    image: assetSrc(watch4),
    alt: "Smart Watch",
  },
  {
    id: 5,
    name: "Alarm Clock Watch",
    price: "$30.00",
    meta: "Quartz · Dual",
    image: assetSrc(watch5),
    alt: "Alarm Clock Watch",
  },
  {
    id: 6,
    name: "Wall Clock",
    price: "$40.00",
    meta: "Silent sweep",
    image: assetSrc(watch6),
    alt: "Wall Clock",
  },
  {
    id: 7,
    name: "Classic Watch",
    price: "$60.00",
    meta: "Leather strap",
    image: assetSrc(watch7),
    alt: "Classic Watch",
  },
  {
    id: 8,
    name: "French Watch",
    price: "$80.00",
    meta: "Sapphire crystal",
    image: assetSrc(watch8),
    alt: "French Watch",
  },
  {
    id: 9,
    name: "French Connection",
    price: "$95.00",
    meta: "Automatic · 40mm",
    image: assetSrc(watch1),
    alt: "French Connection repeat",
  },
  {
    id: 10,
    name: "Classic Bluetooth",
    price: "$78.00",
    meta: "Smart · GPS",
    image: assetSrc(watch2),
    alt: "Classic Bluetooth repeat",
  },
  {
    id: 11,
    name: "Kors Lexington",
    price: "$68.00",
    meta: "Chronograph",
    image: assetSrc(watch3),
    alt: "Kors Lexington repeat",
  },
  {
    id: 12,
    name: "Smart Watch",
    price: "$105.00",
    meta: "AMOLED · LTE",
    image: assetSrc(watch4),
    alt: "Smart Watch repeat",
  },
] as const

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-4 icon-dir text-muted-foreground", className)}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

function ProductCard({
  product,
}: {
  product: (typeof PRODUCTS)[number]
}) {
  return (
    <li>
      <a
        href="#"
        className="group flex items-center gap-3 rounded-[12px] border border-border/70 bg-card p-3 shadow-soft outline-none transition-colors hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas max-sm:flex-col max-sm:items-start sm:gap-5"
      >
        <div className="size-20 shrink-0 overflow-hidden rounded-[10px] bg-muted p-2 sm:size-24">
          <img
            src={product.image}
            alt={product.alt}
            className="size-full object-contain"
          />
        </div>

        <div className="min-w-0 flex-1 text-start">
          <h3 className="truncate text-sm font-semibold text-foreground sm:text-base">
            {product.name}
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{product.meta}</p>
          <p
            dir="ltr"
            className="mt-2 text-sm font-bold text-primary tabular-nums sm:text-base"
          >
            {product.price}
          </p>
        </div>

        <span className="ms-auto inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border/70 bg-card transition-colors group-hover:border-primary/40 max-sm:self-end">
          <ChevronIcon />
        </span>
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
      className={cn("w-full bg-canvas px-4 py-10 md:px-8 md:py-14", className)}
      aria-labelledby="product-list-10-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 md:mb-10">
          <p className="text-start text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            Concierge
          </p>
          <h2
            id="product-list-10-heading"
            className="mt-1 text-start text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            Timepieces
          </h2>
          <p className="mt-2 max-w-md text-start text-sm text-muted-foreground">
            Boutique rows with spec meta and a directional affordance for detail.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </section>
  )
}
