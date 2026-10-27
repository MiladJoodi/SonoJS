import type * as React from "react"

import { cn } from "@/lib/utils"

import furniture from "./images/furniture.webp"
import gallery1 from "./images/gallery-1.webp"
import gallery4 from "./images/gallery-4.webp"
import gallery5 from "./images/gallery-5.webp"
import gallery6 from "./images/gallery-6.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const TOP_ROW = [
  {
    id: "t1",
    src: assetSrc(gallery1),
    alt: "Featured gallery item",
    span: "sm:col-span-3",
  },
  {
    id: "t2",
    src: assetSrc(furniture),
    alt: "Featured furniture",
    span: "sm:col-span-6",
  },
] as const

const BOTTOM_ROW = [
  { id: "b1", src: assetSrc(gallery6), alt: "Gallery item 1" },
  { id: "b2", src: assetSrc(gallery4), alt: "Gallery item 2" },
  { id: "b3", src: assetSrc(gallery5), alt: "Gallery item 3" },
] as const

export default function Gallery({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "w-full bg-card px-4 py-12 md:px-8 md:py-16",
        className
      )}
      aria-labelledby="gallery-heading"
      {...props}
    >
      <h2 id="gallery-heading" className="sr-only">
        Image Gallery
      </h2>

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-4 sm:grid-cols-9 sm:gap-6">
          {TOP_ROW.map((img) => (
            <div
              key={img.id}
              className={cn(
                "aspect-[4/3] w-full overflow-hidden rounded-[12px] border border-border/70 bg-muted shadow-soft",
                img.span
              )}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="size-full object-cover object-top"
              />
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 sm:mt-6 sm:grid-cols-3 sm:gap-6">
          {BOTTOM_ROW.map((img) => (
            <div
              key={img.id}
              className="aspect-[4/3] w-full overflow-hidden rounded-[12px] border border-border/70 bg-muted shadow-soft"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="size-full object-cover object-top"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
