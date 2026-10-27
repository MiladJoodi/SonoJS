"use client"

import * as React from "react"
import { ArrowUpRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import burgerImg from "./images/burger.webp"
import coffeeImg from "./images/coffee.webp"
import desktopImg from "./images/desktop.webp"
import food1Img from "./images/food-1.webp"
import food2Img from "./images/food-2.webp"
import laptop1Img from "./images/laptop-1.webp"
import laptop2Img from "./images/laptop-2.webp"
import laptop3Img from "./images/laptop-3.webp"
import organicImg from "./images/organic.webp"
import sunCreamImg from "./images/sun-cream.webp"
import sunglassImg from "./images/sunglass.webp"
import sunscreenAImg from "./images/sunscreen-a.webp"
import sunscreenBImg from "./images/sunscreen-b.webp"
import watch1Img from "./images/watch-1.webp"
import watch2Img from "./images/watch-2.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const SECTIONS = [
  {
    id: "trending-heading",
    title: "Trending & Celebration Picks",
    eyebrow: "Now hot",
    items: [
      { name: "Watches", img: assetSrc(watch1Img) },
      { name: "Laptops", img: assetSrc(laptop1Img) },
      { name: "Sun Glasses", img: assetSrc(sunglassImg) },
      { name: "Sunscreen", img: assetSrc(sunscreenAImg) },
    ],
  },
  {
    id: "food-heading",
    title: "Food and Beverage",
    eyebrow: "Pantry",
    items: [
      { name: "Snakes Food", img: assetSrc(food1Img) },
      { name: "Hot Coffee", img: assetSrc(coffeeImg) },
      { name: "Snakes", img: assetSrc(food2Img) },
      { name: "Burger King", img: assetSrc(burgerImg) },
    ],
  },
  {
    id: "electronics-heading",
    title: "Plug in with Electronics",
    eyebrow: "Devices",
    items: [
      { name: "Windows Laptops", img: assetSrc(laptop2Img) },
      { name: "Smart Watches", img: assetSrc(watch2Img) },
      { name: "Desktops", img: assetSrc(desktopImg) },
      { name: "Laptop", img: assetSrc(laptop3Img) },
    ],
  },
  {
    id: "beauty-heading",
    title: "Beauty and Cosmetics",
    eyebrow: "Glow",
    items: [
      { name: "Sunscreen", img: assetSrc(sunscreenBImg) },
      { name: "Sun Cream", img: assetSrc(sunCreamImg) },
      { name: "Organics Cream", img: assetSrc(organicImg) },
      { name: "Skin Care", img: assetSrc(sunscreenAImg) },
    ],
  },
] as const

export default function ProductCategories({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-full min-w-0 bg-muted p-4 sm:p-6 md:p-8",
        className
      )}
      role="region"
      aria-labelledby="product-categories-08-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-lg sm:max-w-full">
        <div className="mb-5 text-start sm:mb-6">
          <p className="text-caption font-medium tracking-wide text-muted-foreground uppercase">
            Marketplace hubs
          </p>
          <h2
            id="product-categories-08-heading"
            className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
          >
            Shop by department
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {SECTIONS.map((section) => (
            <section
              key={section.id}
              aria-labelledby={section.id}
              className="flex min-w-0 flex-col rounded-[12px] border border-border/70 bg-card p-3.5 shadow-soft sm:p-4"
            >
              <div className="mb-3 flex items-start justify-between gap-2 border-b border-border/70 pb-3 sm:mb-4 sm:gap-3">
                <div className="min-w-0 flex-1 text-start">
                  <p className="text-[10px] font-semibold tracking-wider text-primary uppercase">
                    {section.eyebrow}
                  </p>
                  <h3
                    id={section.id}
                    className="mt-0.5 text-sm font-semibold leading-snug text-foreground sm:text-base"
                  >
                    {section.title}
                  </h3>
                </div>
                <a
                  href="#"
                  className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-md border border-border/70 outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={`Browse ${section.title}`}
                >
                  <ArrowUpRightIcon className="size-4" aria-hidden />
                </a>
              </div>

              <ul className="grid grid-cols-2 gap-x-2.5 gap-y-4 sm:gap-x-3 sm:gap-y-5">
                {section.items.map((item) => (
                  <li key={`${section.id}-${item.name}`} className="min-w-0">
                    <a
                      href="#"
                      className="group block min-h-11 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <div className="overflow-hidden rounded-md border border-border/50 bg-muted/60 p-1.5 transition-colors group-hover:bg-muted sm:p-2">
                        <div className="aspect-[5/4]">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="size-full object-contain"
                          />
                        </div>
                      </div>
                      <p className="mt-1.5 line-clamp-2 text-start text-xs font-medium text-foreground sm:mt-2 sm:text-sm">
                        {item.name}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
