"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import coffeeImg from "./images/coffee.webp"
import fashionImg from "./images/fashion.webp"
import laptop1Img from "./images/laptop-1.webp"
import laptop2Img from "./images/laptop-2.webp"
import mugImg from "./images/mug.webp"
import sneakersImg from "./images/sneakers.webp"
import sunglass1Img from "./images/sunglass-1.webp"
import sunglass2Img from "./images/sunglass-2.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const CATEGORIES = [
  { id: 1, name: "Sunglasses", img: assetSrc(sunglass1Img), link: "#" },
  { id: 2, name: "Sneakers", img: assetSrc(sneakersImg), link: "#" },
  { id: 3, name: "Laptops", img: assetSrc(laptop1Img), link: "#" },
  { id: 4, name: "Coffee", img: assetSrc(coffeeImg), link: "#" },
  { id: 5, name: "Coffee mugs", img: assetSrc(mugImg), link: "#" },
  { id: 6, name: "Fashion sunglasses", img: assetSrc(sunglass2Img), link: "#" },
  { id: 7, name: "Fashion products", img: assetSrc(fashionImg), link: "#" },
  { id: 8, name: "Electronics", img: assetSrc(laptop2Img), link: "#" },
] as const

export default function ProductCategories({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "w-full min-w-0 bg-zinc-950 px-4 py-8 text-white sm:py-12 md:px-8",
        className
      )}
      aria-labelledby="product-categories-02-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-6 flex flex-col gap-2 text-start sm:mb-10">
          <p className="text-caption font-medium tracking-[0.18em] text-zinc-400 uppercase">
            Poster wall
          </p>
          <h2
            id="product-categories-02-heading"
            className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl"
          >
            Top Categories
          </h2>
          <p className="max-w-xl text-sm text-zinc-400">
            Tall campaign posters — tap a tile to open the aisle.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((category) => (
            <li key={category.id} className="min-w-0">
              <a
                href={category.link}
                className={cn(
                  "group relative block min-h-11 cursor-pointer overflow-hidden rounded-[12px] bg-zinc-900 outline-none",
                  "ring-1 ring-white/10 focus-visible:ring-2 focus-visible:ring-white/60"
                )}
              >
                <div className="aspect-[41/50] w-full overflow-hidden">
                  <img
                    src={category.img}
                    alt={category.name}
                    className="size-full object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04] sm:p-5"
                  />
                </div>
                {/* Always visible on touch; hover only lifts a bit on fine pointers */}
                <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-2.5 pb-2.5 pt-12 text-start sm:px-3 sm:pb-3 sm:pt-14">
                  <span className="line-clamp-2 text-xs font-semibold tracking-tight text-white sm:text-sm">
                    {category.name}
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
