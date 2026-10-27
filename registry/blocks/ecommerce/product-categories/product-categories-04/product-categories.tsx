"use client"

import * as React from "react"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import facePrimerImg from "./images/face-primer.webp"
import faceWashImg from "./images/face-wash.webp"
import skinGlowImg from "./images/skin-glow.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const CATEGORIES = [
  {
    name: "Face Wash",
    img: assetSrc(faceWashImg),
    alt: "Face wash category with up to 50 percent discount",
    discount: "Up to 50% off",
    tone: "from-black/60 via-black/30 to-transparent",
  },
  {
    name: "Skin Glow",
    img: assetSrc(skinGlowImg),
    alt: "Skin glow products category with up to 50 percent discount",
    discount: "Up to 50% off",
    tone: "from-black/65 via-black/25 to-transparent",
  },
  {
    name: "Face Primer",
    img: assetSrc(facePrimerImg),
    alt: "Face primer category with up to 50 percent discount",
    discount: "Up to 50% off",
    tone: "from-black/60 via-black/30 to-transparent",
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
      aria-labelledby="product-categories-04-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-6 max-w-2xl text-start sm:mb-8">
          <p className="text-caption font-medium tracking-wide text-primary uppercase">
            Spotlight triptych
          </p>
          <h2
            id="product-categories-04-heading"
            className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl md:text-3xl"
          >
            Featured Categories
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Three full-bleed drops — discount up front, checkout one tap away.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {CATEGORIES.map((category) => (
            <li key={category.name} className="min-w-0">
              <a
                href="#"
                className="group relative block cursor-pointer overflow-hidden rounded-[16px] border border-border/70 shadow-soft outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <img
                  src={category.img}
                  alt={category.alt}
                  className="aspect-[4/5] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03] sm:aspect-square"
                />
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 bg-gradient-to-t",
                    category.tone
                  )}
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 z-10 space-y-3 p-4 text-start sm:space-y-4 sm:p-6">
                  <div>
                    <p className="text-caption font-medium tracking-wide text-white/85 uppercase">
                      {category.name}
                    </p>
                    <h3 className="mt-1 text-xl font-bold tracking-tight text-white sm:text-2xl">
                      {category.discount}
                    </h3>
                  </div>
                  <span className="inline-flex h-11 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity group-hover:opacity-90">
                    Shop now
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
