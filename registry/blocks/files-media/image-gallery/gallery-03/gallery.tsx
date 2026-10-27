import type * as React from "react"

import { cn } from "@/lib/utils"

import gallery1 from "./images/gallery-1.webp"
import gallery2 from "./images/gallery-2.webp"
import gallery3 from "./images/gallery-3.webp"
import gallery4 from "./images/gallery-4.webp"
import gallery5 from "./images/gallery-5.webp"
import gallery6 from "./images/gallery-6.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const DEFAULT_IMAGES = [
  { id: 1, src: assetSrc(gallery1), alt: "Gallery item 1" },
  { id: 2, src: assetSrc(gallery2), alt: "Gallery item 2" },
  { id: 3, src: assetSrc(gallery3), alt: "Gallery item 3" },
  { id: 4, src: assetSrc(gallery4), alt: "Gallery item 4" },
  { id: 5, src: assetSrc(gallery5), alt: "Gallery item 5" },
  { id: 6, src: assetSrc(gallery6), alt: "Gallery item 6" },
] as const

export type GalleryImage = {
  id: number
  src: string
  alt: string
}

export default function Gallery({
  images = DEFAULT_IMAGES,
  className,
  ...props
}: React.ComponentProps<"section"> & {
  images?: readonly GalleryImage[]
}) {
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
        <div className="grid grid-cols-2 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="aspect-[4/3] w-full overflow-hidden rounded-[12px] border border-border/70 bg-muted shadow-soft"
            >
              <img
                src={image.src}
                alt={image.alt}
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
