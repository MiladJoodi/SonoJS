import type * as React from "react"

import { cn } from "@/lib/utils"

import furniture from "./images/furniture.webp"
import gallery1 from "./images/gallery-1.webp"
import gallery4 from "./images/gallery-4.webp"
import gallery5 from "./images/gallery-5.webp"
import gallery6 from "./images/gallery-6.webp"
import realEstate from "./images/real-estate.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const IMAGES = [
  { id: 1, src: assetSrc(gallery1), alt: "Gallery display one" },
  { id: 2, src: assetSrc(furniture), alt: "Furniture display" },
  { id: 3, src: assetSrc(gallery6), alt: "Gallery display two" },
  { id: 4, src: assetSrc(gallery4), alt: "Gallery display three" },
  { id: 5, src: assetSrc(realEstate), alt: "Real estate display" },
  { id: 6, src: assetSrc(gallery5), alt: "Gallery display four" },
] as const

function Frame({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "aspect-[4/3] w-full overflow-hidden rounded-[12px] border border-border/70 bg-muted shadow-soft md:aspect-auto md:h-[300px]",
        className
      )}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="size-full object-cover object-top"
      />
    </div>
  )
}

export default function Gallery({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [first, second, third, fourth, fifth, sixth] = IMAGES

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
        <div className="space-y-4 md:space-y-6">
          <div className="grid gap-4 md:grid-cols-9 md:gap-6">
            <Frame
              src={first.src}
              alt={first.alt}
              className="md:col-span-3"
            />
            <Frame
              src={second.src}
              alt={second.alt}
              className="md:col-span-6"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            <Frame src={third.src} alt={third.alt} />
            <Frame src={fourth.src} alt={fourth.alt} />
          </div>

          <div className="grid gap-4 md:grid-cols-9 md:gap-6">
            <Frame
              src={fifth.src}
              alt={fifth.alt}
              className="md:col-span-6"
            />
            <Frame
              src={sixth.src}
              alt={sixth.alt}
              className="md:col-span-3"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
