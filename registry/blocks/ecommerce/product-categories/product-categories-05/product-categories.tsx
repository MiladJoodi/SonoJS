"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import bestImg from "./images/best.webp"
import budgetImg from "./images/budget.webp"
import casualImg from "./images/casual.webp"
import dealsImg from "./images/deals.webp"
import ethnicImg from "./images/ethnic.webp"
import festiveImg from "./images/festive.webp"
import refreshImg from "./images/refresh.webp"
import streetImg from "./images/street.webp"
import summerImg from "./images/summer.webp"
import winterImg from "./images/winter.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const CATEGORIES = [
  {
    name: "Ethnic Wear",
    img: assetSrc(ethnicImg),
    alt: "Woman wearing red ethnic dress",
  },
  {
    name: "Festive Styles",
    img: assetSrc(festiveImg),
    alt: "Woman wearing green festive outfit",
  },
  {
    name: "Casual Wear",
    img: assetSrc(casualImg),
    alt: "Woman in casual outfit with jacket",
  },
  {
    name: "Street Style",
    img: assetSrc(streetImg),
    alt: "Woman walking in stylish streetwear outfit",
  },
  {
    name: "Budget Picks",
    img: assetSrc(budgetImg),
    alt: "Woman wearing trendy budget outfit",
  },
  {
    name: "Summer Dresses",
    img: assetSrc(summerImg),
    alt: "Woman wearing floral summer dress",
  },
  {
    name: "Hot Deals",
    img: assetSrc(dealsImg),
    alt: "Woman in casual blazer outfit",
  },
  {
    name: "Refresh Sale",
    img: assetSrc(refreshImg),
    alt: "Woman wearing printed traditional outfit",
  },
  {
    name: "Best Styles",
    img: assetSrc(bestImg),
    alt: "Woman walking out in stylish outfit",
  },
  {
    name: "Winter Essentials",
    img: assetSrc(winterImg),
    alt: "Woman wearing winter outfit with jacket",
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
      aria-labelledby="product-categories-05-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-7xl">
        <header className="mb-8 grid gap-3 border-s-2 border-primary ps-3 text-start sm:mb-12 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-4 sm:ps-4">
          <div className="min-w-0">
            <p className="text-caption font-medium tracking-wide text-muted-foreground uppercase">
              Lookbook index
            </p>
            <h2
              id="product-categories-05-heading"
              className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl md:text-3xl"
            >
              Featured Categories
            </h2>
          </div>
          <p className="text-sm text-muted-foreground" dir="ltr">
            Vol. 05 · {CATEGORIES.length} edits
          </p>
        </header>

        <ul className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-8 md:grid-cols-4 lg:grid-cols-5">
          {CATEGORIES.map((category, index) => (
            <li key={category.name} className="min-w-0">
              <a
                href="#"
                className="group block min-h-11 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="relative overflow-hidden rounded-[12px] border border-border/70 bg-muted">
                  <span
                    className="absolute end-1.5 top-1.5 z-10 rounded-md bg-background/95 px-2 py-0.5 text-[10px] font-semibold tabular-nums text-foreground backdrop-blur-sm sm:end-2 sm:top-2"
                    dir="ltr"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="aspect-[205/273] overflow-hidden">
                    <img
                      src={category.img}
                      alt={category.alt}
                      className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                </div>
                <div className="mt-2.5 border-t border-border/70 pt-2.5 text-start sm:mt-3 sm:pt-3">
                  <h3 className="line-clamp-2 text-sm font-semibold text-foreground">
                    {category.name}
                  </h3>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
