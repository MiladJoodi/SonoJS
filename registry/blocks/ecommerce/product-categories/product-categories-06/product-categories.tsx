"use client"

import * as React from "react"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import casualImg from "./images/casual.webp"
import ethnicImg from "./images/ethnic.webp"
import festiveImg from "./images/festive.webp"
import picksImg from "./images/picks.webp"
import streetImg from "./images/street.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const CATEGORIES = [
  {
    name: "Up To 40% OFF",
    subtitle: "The colors of this season",
    img: assetSrc(ethnicImg),
    tag: "Sale",
  },
  {
    name: "Fresh Looks",
    subtitle: "The colors of this season",
    img: assetSrc(festiveImg),
    tag: "New",
  },
  {
    name: "Up To 30% OFF",
    subtitle: "The colors of this season",
    img: assetSrc(casualImg),
    tag: "Sale",
  },
  {
    name: "Exclusive Fashion",
    subtitle: "The colors of this season",
    img: assetSrc(streetImg),
    tag: "Drop",
  },
  {
    name: "Top Picks for Less",
    subtitle: "The colors of this season",
    img: assetSrc(picksImg),
    tag: "Pick",
  },
] as const

export default function ProductCategories({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white px-4 py-8 sm:py-12 md:px-8 dark:bg-background",
        className
      )}
      aria-labelledby="product-categories-06-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-6 flex flex-col gap-1 text-start sm:mb-10">
          <p className="text-caption font-medium tracking-wide text-primary uppercase">
            Offer desk
          </p>
          <h2
            id="product-categories-06-heading"
            className="text-xl font-bold tracking-tight text-foreground sm:text-2xl md:text-3xl"
          >
            Featured Categories
          </h2>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5">
          {CATEGORIES.map((category) => (
            <li
              key={category.name}
              className="flex min-w-0 flex-col overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft"
            >
              <a
                href="#"
                className="group flex h-full min-h-11 flex-col outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <span className="absolute start-2 top-2 z-10 rounded-full bg-foreground px-2.5 py-1 text-[10px] font-semibold tracking-wide text-background uppercase">
                    {category.tag}
                  </span>
                  <img
                    src={category.img}
                    alt={category.name}
                    className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-3 text-start sm:p-4">
                  <h3 className="text-balance text-sm font-semibold leading-snug text-foreground">
                    {category.name}
                  </h3>
                  <p className="mt-1.5 text-xs font-medium text-muted-foreground">
                    {category.subtitle}
                  </p>
                  <span className="mt-auto inline-flex min-h-10 items-center gap-1 pt-2 text-[13px] font-semibold text-primary">
                    Explore
                    <ArrowRightIcon className="size-3.5 icon-dir" aria-hidden />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
