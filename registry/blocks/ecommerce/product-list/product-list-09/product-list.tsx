"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import coffeeMocha from "./images/coffee-mocha.webp"
import echoElegance from "./images/echo-elegance.webp"
import laptopAcer from "./images/laptop-acer.webp"
import laptopAsus from "./images/laptop-asus.webp"
import watch1 from "./images/watch-1.webp"
import watch3 from "./images/watch-3.webp"
import watch4 from "./images/watch-4.webp"
import watch5 from "./images/watch-5.webp"
import watch7 from "./images/watch-7.webp"
import watch8 from "./images/watch-8.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const PRODUCTS = [
  {
    id: 1,
    name: "French Timex",
    price: "$95.00",
    image: assetSrc(watch1),
    alt: "French Timex",
  },
  {
    id: 2,
    name: "Echo Elegance",
    price: "$20.00",
    image: assetSrc(echoElegance),
    alt: "Echo Elegance",
  },
  {
    id: 3,
    name: "Acer One 14 AMD",
    price: "$400.00",
    image: assetSrc(laptopAcer),
    alt: "Acer One 14 AMD",
  },
  {
    id: 4,
    name: "Irish Cream Dream",
    price: "$11.00",
    image: assetSrc(watch4),
    alt: "Irish Cream Dream",
  },
  {
    id: 5,
    name: "Luxury desk clock",
    price: "$90.00",
    image: assetSrc(coffeeMocha),
    alt: "Luxury desk clock",
  },
  {
    id: 6,
    name: "Smart Watch",
    price: "$110.00",
    image: assetSrc(watch7),
    alt: "Smart Watch",
  },
  {
    id: 7,
    name: "Creative Wall Clock",
    price: "$50.00",
    image: assetSrc(watch8),
    alt: "Creative Wall Clock",
  },
  {
    id: 8,
    name: "ASUS Vivobook 15",
    price: "$450.00",
    image: assetSrc(laptopAsus),
    alt: "ASUS Vivobook 15",
  },
  {
    id: 9,
    name: "French Timex",
    price: "$95.00",
    image: assetSrc(watch3),
    alt: "French Timex gold",
  },
  {
    id: 10,
    name: "Echo Elegance",
    price: "$20.00",
    image: assetSrc(echoElegance),
    alt: "Echo Elegance repeat",
  },
  {
    id: 11,
    name: "Acer One 14 AMD",
    price: "$400.00",
    image: assetSrc(laptopAcer),
    alt: "Acer One 14 AMD repeat",
  },
  {
    id: 12,
    name: "Irish Cream Dream",
    price: "$11.00",
    image: assetSrc(watch5),
    alt: "Irish Cream Dream silver",
  },
] as const

function ProductCard({
  product,
  rank,
}: {
  product: (typeof PRODUCTS)[number]
  rank: number
}) {
  return (
    <li className="group relative rounded-[12px] bg-card p-2.5 shadow-soft ring-1 ring-transparent transition-all hover:-translate-y-0.5 hover:ring-border/70">
      <span
        dir="ltr"
        className="absolute start-2 top-2 z-10 font-mono text-[10px] font-semibold tabular-nums text-muted-foreground/70"
      >
        {String(rank).padStart(2, "0")}
      </span>
      <a
        href="#"
        className="block cursor-pointer rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-muted"
      >
        <div className="mx-auto aspect-[5/3] w-full overflow-hidden">
          <img
            src={product.image}
            alt={product.alt}
            className="size-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="mt-2 border-t border-dashed border-border/70 pt-2 text-center">
          <h3 className="truncate text-xs font-semibold text-foreground sm:text-sm">
            {product.name}
          </h3>
          <p
            dir="ltr"
            className="mt-1 text-xs font-bold text-primary tabular-nums sm:text-sm"
          >
            {product.price}
          </p>
        </div>
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
      className={cn(
        "w-full bg-muted/50 px-4 py-10 md:px-8 md:py-14",
        className
      )}
      aria-labelledby="product-list-09-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-start text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              Ranked ticker
            </p>
            <h2
              id="product-list-09-heading"
              className="mt-1 text-start text-2xl font-semibold tracking-tight text-foreground"
            >
              Trending Products
            </h2>
          </div>
          <div className="inline-flex max-w-full items-center gap-2 self-start rounded-full border border-border/70 bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-soft sm:self-auto">
            <span className="size-1.5 shrink-0 animate-pulse rounded-full bg-emerald-500" />
            <span className="truncate">Live bestsellers</span>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 min-[1200px]:grid-cols-6">
          {PRODUCTS.map((product, index) => (
            <ProductCard key={product.id} product={product} rank={index + 1} />
          ))}
        </ul>
      </div>
    </section>
  )
}
