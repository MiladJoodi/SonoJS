"use client"

import * as React from "react"

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

const PRODUCTS = [
  {
    id: 1,
    name: "Crimson Luxe Gown",
    price: "$100.00",
    image: assetSrc(fashion1),
    alt: "Crimson Luxe Gown",
  },
  {
    id: 2,
    name: "Emerald Draped Dress",
    price: "$120.00",
    image: assetSrc(fashion2),
    alt: "Emerald Draped Dress",
  },
  {
    id: 3,
    name: "Minimalist Leather Tee",
    price: "$110.00",
    image: assetSrc(fashion3),
    alt: "Modern streetwear",
  },
  {
    id: 4,
    name: "Urban Knit Style",
    price: "$115.00",
    image: assetSrc(fashion4),
    alt: "Urban Knit Style",
  },
  {
    id: 5,
    name: "Bold Print Winter Set",
    price: "$105.00",
    image: assetSrc(fashion5),
    alt: "Bold Print Winter",
  },
  {
    id: 6,
    name: "Floral Puff Sleeve",
    price: "$140.00",
    image: assetSrc(fashion6),
    alt: "Floral Puff Sleeve",
  },
  {
    id: 7,
    name: "Striped Tee & Blazer",
    price: "$130.00",
    image: assetSrc(fashion7),
    alt: "Striped Tee & Blazer",
  },
  {
    id: 8,
    name: "Tank Top & Denim",
    price: "$130.00",
    image: assetSrc(fashion9),
    alt: "Tank Top & Denim",
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

function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      aria-hidden="true"
      className={cn("size-4 fill-current", className)}
    >
      <path d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0" />
    </svg>
  )
}

function ProductCard({
  product,
}: {
  product: (typeof PRODUCTS)[number]
}) {
  return (
    <li className="group relative flex flex-col overflow-hidden rounded-[12px] bg-muted shadow-soft ring-1 ring-border/60">
      <div className="relative overflow-hidden">
        <a
          href="#"
          className="block cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          <img
            src={product.image}
            alt={product.alt}
            className="aspect-[3/4] w-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
          />
        </a>
      </div>

      <div
        className={cn(
          "z-10 rounded-[12px] p-3 shadow-soft",
          // Mobile: solid card under photo
          "m-2 border border-border/70 bg-card text-foreground",
          // Desktop: glass capsule over photo on hover
          "lg:absolute lg:inset-x-3 lg:bottom-3 lg:m-0 lg:border-white/20 lg:bg-black/55 lg:text-white lg:backdrop-blur-md",
          "lg:translate-y-2 lg:opacity-0 lg:transition-all lg:duration-300",
          "lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100"
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-start text-sm font-semibold">
              {product.name}
            </h3>
            <p
              dir="ltr"
              className="mt-1 text-start text-sm font-medium tabular-nums text-muted-foreground lg:text-white/85"
            >
              {product.price}
            </p>
          </div>
          <div className="flex shrink-0 gap-1">
            <button
              type="button"
              title="Wishlist"
              aria-label={`Add ${product.name} to wishlist`}
              className="inline-flex size-11 cursor-pointer items-center justify-center rounded-md bg-muted outline-none hover:bg-muted/80 focus-visible:ring-2 focus-visible:ring-ring lg:bg-white/10 lg:hover:bg-white/20 lg:focus-visible:ring-white"
            >
              <HeartIcon />
            </button>
            <button
              type="button"
              title="Cart"
              aria-label={`Add ${product.name} to cart`}
              className="inline-flex size-11 cursor-pointer items-center justify-center rounded-md bg-primary text-primary-foreground outline-none hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring lg:bg-white lg:text-zinc-950 lg:hover:bg-white/90 lg:focus-visible:ring-white"
            >
              <CartIcon />
            </button>
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
      aria-labelledby="product-list-05-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 md:mb-10">
          <p className="text-start text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            Editorial
          </p>
          <h2
            id="product-list-05-heading"
            className="mt-1 text-start text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            Cover stories
          </h2>
          <p className="mt-2 max-w-md text-start text-sm text-muted-foreground">
            Full-bleed looks — solid actions under the photo on mobile; glass
            capsule on desktop hover.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </section>
  )
}
