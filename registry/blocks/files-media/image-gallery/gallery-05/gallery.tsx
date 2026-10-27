import type * as React from "react"

import { cn } from "@/lib/utils"

import dryShampoo from "./images/dry-shampoo.webp"
import fashion1 from "./images/fashion-1.webp"
import fashion5 from "./images/fashion-5.webp"
import fashion6 from "./images/fashion-6.webp"
import fashion7 from "./images/fashion-7.webp"
import fashion8 from "./images/fashion-8.webp"
import fashion9 from "./images/fashion-9.webp"
import fashion10 from "./images/fashion-10.webp"
import lipstick from "./images/lipstick.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const DEFAULT_IMAGES = [
  { id: 1, src: assetSrc(fashion5), alt: "Fashion portrait five" },
  { id: 2, src: assetSrc(fashion7), alt: "Fashion portrait seven" },
  { id: 3, src: assetSrc(fashion1), alt: "Fashion portrait one" },
  { id: 4, src: assetSrc(dryShampoo), alt: "Dry shampoo product" },
  { id: 5, src: assetSrc(fashion10), alt: "Fashion portrait ten" },
  { id: 6, src: assetSrc(fashion6), alt: "Fashion portrait six" },
  { id: 7, src: assetSrc(fashion9), alt: "Fashion portrait nine" },
  { id: 8, src: assetSrc(fashion8), alt: "Fashion portrait eight" },
  { id: 9, src: assetSrc(lipstick), alt: "Lipstick product" },
] as const

export type GalleryImage = {
  id: number
  src: string
  alt: string
}

export default function Gallery({
  title = "People",
  description = "Access a wide range of people photos designed to enhance your templates, presentations, and modern web projects, helping you create engaging and visually appealing designs with ease.",
  ctaLabel = "More pictures",
  ctaHref = "#",
  images = DEFAULT_IMAGES,
  className,
  ...props
}: React.ComponentProps<"section"> & {
  title?: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
  images?: readonly GalleryImage[]
}) {
  return (
    <section
      className={cn(
        "w-full bg-muted px-4 py-12 md:px-8 md:py-16",
        className
      )}
      aria-labelledby="gallery-heading"
      {...props}
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="max-w-3xl text-start">
          <h2
            id="gallery-heading"
            className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:mb-6 md:text-4xl"
          >
            {title}
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
          <a
            href={ctaHref}
            className="mt-6 inline-flex h-[46px] w-full cursor-pointer items-center justify-center rounded-md border border-primary bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:mt-8 sm:w-auto"
          >
            {ctaLabel}
          </a>
        </div>

        <div className="columns-2 gap-3 sm:columns-3 sm:gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="mb-3 break-inside-avoid overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft sm:mb-4"
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="h-auto w-full max-w-full object-cover object-top"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
