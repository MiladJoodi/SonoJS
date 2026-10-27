"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import coffeeIrish from "./images/coffee-irish.webp"
import coffeeMocha from "./images/coffee-mocha.webp"
import echoElegance from "./images/echo-elegance.webp"
import laptopAcer from "./images/laptop-acer.webp"
import laptopAsus from "./images/laptop-asus.webp"
import sneakers from "./images/sneakers.webp"
import sunglassBlack from "./images/sunglass-black.webp"
import sunglassWhite from "./images/sunglass-white.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const STAR_PATH =
  "m23.363 8.584-7.378-1.127L12.678.413c-.247-.526-1.11-.526-1.357 0L8.015 7.457.637 8.584a.75.75 0 0 0-.423 1.265l5.36 5.494-1.267 7.767a.75.75 0 0 0 1.103.777L12 20.245l6.59 3.643a.75.75 0 0 0 1.103-.777l-1.267-7.767 5.36-5.494a.75.75 0 0 0-.423-1.266z"

const PRODUCTS = [
  {
    id: 1,
    name: "White Sun Glass",
    price: "$35.00",
    rating: 4,
    category: "Eyewear",
    image: assetSrc(sunglassWhite),
    alt: "White Sun Glass",
  },
  {
    id: 2,
    name: "Echo Elegance",
    price: "$20.00",
    rating: 4,
    category: "Footwear",
    image: assetSrc(echoElegance),
    alt: "Echo Elegance",
  },
  {
    id: 3,
    name: "Acer One 14 AMD",
    price: "$400.00",
    rating: 4,
    category: "Laptops",
    image: assetSrc(laptopAcer),
    alt: "Acer One 14 AMD",
  },
  {
    id: 4,
    name: "Irish Cream Dream",
    price: "$11.00",
    rating: 4,
    category: "Pantry",
    image: assetSrc(coffeeIrish),
    alt: "Irish Cream Dream",
  },
  {
    id: 5,
    name: "Mocha Madness",
    price: "$10.00",
    rating: 4,
    category: "Pantry",
    image: assetSrc(coffeeMocha),
    alt: "Mocha Madness",
  },
  {
    id: 6,
    name: "Black Sun Glass",
    price: "$70.00",
    rating: 4,
    category: "Eyewear",
    image: assetSrc(sunglassBlack),
    alt: "Black Sun Glass",
  },
  {
    id: 7,
    name: "Urban Sneakers",
    price: "$20.00",
    rating: 4,
    category: "Footwear",
    image: assetSrc(sneakers),
    alt: "Urban Sneakers",
  },
  {
    id: 8,
    name: "ASUS Vivobook 15",
    price: "$450.00",
    rating: 4,
    category: "Laptops",
    image: assetSrc(laptopAsus),
    alt: "ASUS Vivobook 15",
  },
] as const

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div
      className="mt-3 flex justify-center gap-1"
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

function ProductCard({
  product,
}: {
  product: (typeof PRODUCTS)[number]
}) {
  return (
    <li
      className={cn(
        "group relative overflow-hidden rounded-[16px] bg-muted/80 p-3 ring-1 ring-border/50 sm:p-4",
        "before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-transparent before:content-[''] before:opacity-25 before:transition-colors",
        "lg:hover:before:bg-zinc-950 lg:focus-within:before:bg-zinc-950"
      )}
    >
      <p className="relative z-10 mb-2 text-center text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase transition-colors sm:mb-3 lg:group-hover:text-white/70 lg:group-focus-within:text-white/70">
        {product.category}
      </p>

      <a
        href="#"
        className="relative z-10 block cursor-pointer rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="mx-auto aspect-square w-full max-w-[160px] overflow-hidden sm:max-w-[200px]">
          <img
            src={product.image}
            alt={product.alt}
            className="size-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div
          className={cn(
            "relative z-20 mx-auto mt-3 w-full rounded-[12px] border border-border/70 bg-card px-2.5 py-3 text-center shadow-soft transition-all duration-300 sm:mt-4 sm:px-3 sm:py-3.5",
            "lg:absolute lg:inset-x-3 lg:bottom-[-12rem] lg:mt-0 lg:w-auto",
            "lg:group-hover:bottom-3 lg:group-focus-within:bottom-3"
          )}
        >
          <h3 className="line-clamp-2 text-sm font-semibold text-foreground">
            {product.name}
          </h3>
          <p
            dir="ltr"
            className="mt-1.5 text-sm font-bold text-primary tabular-nums"
          >
            {product.price}
          </p>
          <StarRating rating={product.rating} />
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
      className={cn("w-full bg-canvas px-4 py-10 md:px-8 md:py-14", className)}
      aria-labelledby="product-list-08-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-xl md:max-w-4xl lg:max-w-6xl">
        <div className="mb-8 text-center md:mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            Spotlights
          </p>
          <h2
            id="product-list-08-heading"
            className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            Top Categories
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Pedestal pods — dim the stage on hover and lift a frosted info plate.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </section>
  )
}
