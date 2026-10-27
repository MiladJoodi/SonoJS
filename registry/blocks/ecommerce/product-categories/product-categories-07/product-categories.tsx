"use client"

import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import bodyButterImg from "./images/body-butter.webp"
import bodyLotionImg from "./images/body-lotion.webp"
import dryShampooImg from "./images/dry-shampoo.webp"
import facePrimerImg from "./images/face-primer.webp"
import faceWashImg from "./images/face-wash.webp"
import skinGlowImg from "./images/skin-glow.webp"
import sunscreenImg from "./images/sunscreen.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const CATEGORIES = [
  { name: "Sunscreen", img: assetSrc(sunscreenImg) },
  { name: "Face Wash", img: assetSrc(faceWashImg) },
  { name: "Skin Glow", img: assetSrc(skinGlowImg) },
  { name: "Dry Shampoo", img: assetSrc(dryShampooImg) },
  { name: "Body Butter", img: assetSrc(bodyButterImg) },
  { name: "Face Primer", img: assetSrc(facePrimerImg) },
  { name: "Body Lotion", img: assetSrc(bodyLotionImg) },
] as const

export default function ProductCategories({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const scrollerRef = React.useRef<HTMLUListElement>(null)

  const scrollShelf = React.useCallback((toward: "prev" | "next") => {
    const el = scrollerRef.current
    if (!el) return
    const delta = Math.min(280, Math.max(160, el.clientWidth * 0.7))
    const rtl = getComputedStyle(el).direction === "rtl"
    const sign = toward === "next" ? 1 : -1
    el.scrollBy({
      left: sign * delta * (rtl ? -1 : 1),
      behavior: "smooth",
    })
  }, [])

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white px-4 py-8 sm:py-12 md:px-8 dark:bg-background",
        className
      )}
      aria-labelledby="product-categories-07-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4 sm:mb-6">
          <div className="min-w-0 flex-1 text-start">
            <p className="text-caption font-medium tracking-wide text-muted-foreground uppercase">
              Wellness shelf
            </p>
            <h2
              id="product-categories-07-heading"
              className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
            >
              Featured Categories
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-11"
              aria-label="Previous categories"
              onClick={() => scrollShelf("prev")}
            >
              <ChevronLeftIcon className="size-4 icon-dir" aria-hidden />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-11"
              aria-label="Next categories"
              onClick={() => scrollShelf("next")}
            >
              <ChevronRightIcon className="size-4 icon-dir" aria-hidden />
            </Button>
          </div>
        </div>

        <ul
          ref={scrollerRef}
          className={cn(
            "flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-2 touch-pan-x sm:gap-5",
            "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          )}
        >
          {CATEGORIES.map((category) => (
            <li
              key={category.name}
              className="w-[44%] shrink-0 snap-start sm:w-[30%] md:w-[22%] lg:w-[14.5%]"
            >
              <a
                href="#"
                className="group block min-h-11 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="overflow-hidden rounded-[14px] border border-border/70 bg-muted/40 p-1.5 shadow-soft">
                  <div className="aspect-square overflow-hidden rounded-[10px]">
                    <img
                      src={category.img}
                      alt={category.name}
                      className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                </div>
                <div className="mt-2.5 text-center sm:mt-3">
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
