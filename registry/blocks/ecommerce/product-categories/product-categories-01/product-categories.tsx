"use client"

import * as React from "react"
import { ArrowUpRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import casualImg from "./images/casual.webp"
import ethnicImg from "./images/ethnic.webp"
import festiveImg from "./images/festive.webp"
import streetwearImg from "./images/streetwear.webp"
import summerImg from "./images/summer.webp"
import winterImg from "./images/winter.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const CATEGORIES = [
  {
    id: 1,
    title: "Ethnic Collection",
    offer: "Up to 40% off",
    img: assetSrc(ethnicImg),
    alt: "Ethnic Collection clothing",
  },
  {
    id: 2,
    title: "Festive Styles",
    offer: "Fresh looks",
    img: assetSrc(festiveImg),
    alt: "Festive Styles outfits",
  },
  {
    id: 3,
    title: "Casual Wear",
    offer: "Up to 30% off",
    img: assetSrc(casualImg),
    alt: "Casual Wear",
  },
  {
    id: 4,
    title: "Streetwear",
    offer: "Exclusive styles",
    img: assetSrc(streetwearImg),
    alt: "Streetwear collection",
  },
  {
    id: 5,
    title: "Winter Essentials",
    offer: "Top picks for less",
    img: assetSrc(winterImg),
    alt: "Winter Essentials",
  },
  {
    id: 6,
    title: "Summer Collection",
    offer: "Shop & save 40%",
    img: assetSrc(summerImg),
    alt: "Summer Collection",
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
      aria-labelledby="product-categories-01-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-6 flex flex-col gap-3 border-b border-border/70 pb-5 sm:mb-8 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-4 sm:pb-6">
          <div className="min-w-0 text-start">
            <p className="text-caption font-medium tracking-wide text-primary uppercase">
              Lookbook orbit
            </p>
            <h2
              id="product-categories-01-heading"
              className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl md:text-3xl"
            >
              Top Categories
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 self-start rounded-md px-1 text-sm font-medium text-primary outline-none focus-visible:ring-2 focus-visible:ring-ring sm:self-auto"
          >
            View all
            <ArrowUpRightIcon className="size-3.5 shrink-0" aria-hidden />
          </a>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {CATEGORIES.map((category, index) => (
            <li key={category.id} className="min-w-0">
              <a
                href="#"
                className="group flex h-full min-h-11 cursor-pointer flex-col overflow-hidden rounded-[12px] border border-border/70 bg-card p-2.5 shadow-soft outline-none transition-shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring sm:p-3"
              >
                <div className="relative mx-auto size-24 shrink-0 sm:size-28">
                  <span
                    className="absolute start-0 top-0 z-10 flex size-7 items-center justify-center rounded-full border border-border/70 bg-background text-caption font-semibold tabular-nums text-foreground shadow-sm"
                    dir="ltr"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="size-full overflow-hidden rounded-full bg-muted ring-1 ring-border/60">
                    <img
                      src={category.img}
                      alt={category.alt}
                      className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="mt-3 flex flex-1 flex-col text-center sm:mt-4">
                  <h3 className="text-balance text-sm font-semibold text-foreground">
                    {category.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {category.offer}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
