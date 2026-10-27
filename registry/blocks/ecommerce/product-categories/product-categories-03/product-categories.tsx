"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import bodyButterImg from "./images/body-butter.webp"
import bodyLotionImg from "./images/body-lotion.webp"
import dryShampooImg from "./images/dry-shampoo.webp"
import eyePrimerImg from "./images/eye-primer.webp"
import facePrimerImg from "./images/face-primer.webp"
import faceWashImg from "./images/face-wash.webp"
import hairBrushImg from "./images/hair-brush.webp"
import lipstickImg from "./images/lipstick.webp"
import nailPolishImg from "./images/nail-polish.webp"
import skinGlowImg from "./images/skin-glow.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const CATEGORIES = [
  { name: "Hair Brush", img: assetSrc(hairBrushImg), sku: "BR-01" },
  { name: "Body Lotion", img: assetSrc(bodyLotionImg), sku: "LT-02" },
  { name: "Nail Polish", img: assetSrc(nailPolishImg), sku: "NP-03" },
  { name: "Body Butter", img: assetSrc(bodyButterImg), sku: "BT-04" },
  { name: "Lipstick Category", img: assetSrc(lipstickImg), sku: "LP-05" },
  { name: "Eye Primer", img: assetSrc(eyePrimerImg), sku: "EP-06" },
  { name: "Dry Shampoo", img: assetSrc(dryShampooImg), sku: "DS-07" },
  { name: "Face Wash", img: assetSrc(faceWashImg), sku: "FW-08" },
  { name: "Skin Glow", img: assetSrc(skinGlowImg), sku: "SG-09" },
  { name: "Face Primer", img: assetSrc(facePrimerImg), sku: "FP-10" },
] as const

export default function ProductCategories({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white px-3 py-8 sm:px-4 sm:py-12 md:px-8 dark:bg-background",
        className
      )}
      aria-labelledby="product-categories-03-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-7xl overflow-hidden rounded-[16px] border border-border/70 bg-muted/80 p-4 shadow-soft sm:p-6 md:p-8">
        <div className="mb-5 flex flex-col gap-2 text-start sm:mb-8 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-3">
          <div className="min-w-0">
            <p className="text-caption font-medium tracking-wide text-muted-foreground uppercase">
              Apothecary tray
            </p>
            <h2
              id="product-categories-03-heading"
              className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
            >
              Featured Categories
            </h2>
          </div>
          <p className="text-sm text-muted-foreground" dir="ltr">
            {CATEGORIES.length} formulas
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {CATEGORIES.map((category) => (
            <li key={category.name} className="min-w-0">
              <a
                href="#"
                className="group flex h-full min-h-11 cursor-pointer flex-col overflow-hidden rounded-[12px] border border-border/70 bg-white p-1.5 shadow-soft outline-none transition-colors hover:border-primary/30 focus-visible:ring-2 focus-visible:ring-ring sm:p-2 dark:bg-card"
              >
                <div className="relative aspect-square overflow-hidden rounded-md bg-muted/50">
                  <span
                    className="absolute start-1.5 top-1.5 z-10 rounded-md bg-background/95 px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase backdrop-blur-sm"
                    dir="ltr"
                  >
                    {category.sku}
                  </span>
                  <img
                    src={category.img}
                    alt={category.name}
                    className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="px-1.5 py-2.5 text-center sm:px-2 sm:py-3">
                  <h3 className="line-clamp-2 text-xs font-semibold text-foreground sm:text-sm">
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
