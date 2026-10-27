"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import product1 from "./images/product-1.webp"
import product2 from "./images/product-2.webp"
import product3 from "./images/product-3.webp"
import product4 from "./images/product-4.webp"
import product5 from "./images/product-5.webp"
import product6 from "./images/product-6.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const PRODUCTS = [
  {
    id: 1,
    name: "Lexicon Luxe",
    price: "$10",
    image: assetSrc(product1),
    alt: "Lexicon Luxe t-shirt",
    badge: "New",
  },
  {
    id: 2,
    name: "Adjective Attire",
    price: "$12",
    image: assetSrc(product2),
    alt: "Adjective Attire t-shirt",
    badge: null,
  },
  {
    id: 3,
    name: "ThreadCraft Vibes",
    price: "$14",
    image: assetSrc(product3),
    alt: "ThreadCraft Vibes t-shirt",
    badge: "Best",
  },
  {
    id: 4,
    name: "Verbal Vogue Tees",
    price: "$12",
    image: assetSrc(product4),
    alt: "Verbal Vogue t-shirt",
    badge: null,
  },
  {
    id: 5,
    name: "Jargon Jungle",
    price: "$15",
    image: assetSrc(product5),
    alt: "Jargon Jungle t-shirt",
    badge: "New",
  },
  {
    id: 6,
    name: "Syllable Streetwear",
    price: "$14",
    image: assetSrc(product6),
    alt: "Syllable Streetwear t-shirt",
    badge: null,
  },
  {
    id: 7,
    name: "Syntax Soft Tee",
    price: "$14",
    image: assetSrc(product1),
    alt: "Syntax Soft Tee",
    badge: null,
  },
  {
    id: 8,
    name: "Phoneme Fleece",
    price: "$14",
    image: assetSrc(product2),
    alt: "Phoneme Fleece",
    badge: "Ltd",
  },
] as const

function ProductCard({
  product,
  index,
}: {
  product: (typeof PRODUCTS)[number]
  index: number
}) {
  return (
    <li className="group relative flex flex-col">
      <div className="relative overflow-hidden rounded-[12px] bg-muted">
        {product.badge ? (
          <span className="absolute start-3 top-3 z-10 rounded-md bg-card/95 px-2 py-1 text-[11px] font-semibold tracking-wide text-foreground shadow-soft backdrop-blur-sm">
            {product.badge}
          </span>
        ) : null}
        <span
          dir="ltr"
          className="pointer-events-none absolute end-3 top-3 z-10 rounded-md bg-card/95 px-2 py-1 font-mono text-[11px] tabular-nums text-foreground shadow-soft backdrop-blur-sm"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <a
          href="#"
          className="block cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          <img
            src={product.image}
            alt={product.alt}
            className="aspect-[3/4] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </a>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden p-3 opacity-0 transition-all duration-300 lg:block lg:group-hover:opacity-100 lg:group-focus-within:opacity-100">
          <Button
            type="button"
            size="sm"
            className="pointer-events-auto w-full shadow-soft"
            aria-label={`Add ${product.name} to cart`}
          >
            Quick add
          </Button>
        </div>
      </div>

      <div className="mt-3 space-y-2 px-0.5">
        <div className="space-y-1">
          <h3 className="truncate text-start text-sm font-medium text-foreground">
            {product.name}
          </h3>
          <p
            dir="ltr"
            className="text-start text-base font-semibold tracking-tight text-foreground tabular-nums"
          >
            {product.price}
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          className="w-full lg:hidden"
          aria-label={`Add ${product.name} to cart`}
        >
          Quick add
        </Button>
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
      aria-labelledby="product-list-01-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 flex flex-col gap-2 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-start text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              Drop 24
            </p>
            <h2
              id="product-list-01-heading"
              className="mt-1 text-start text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            >
              Premium Threads
            </h2>
          </div>
          <p className="max-w-sm text-start text-sm text-muted-foreground sm:text-end">
            Soft staples for everyday — tap Quick add, or hover on desktop.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-5 md:gap-x-6 lg:grid-cols-4">
          {PRODUCTS.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </ul>
      </div>
    </section>
  )
}
