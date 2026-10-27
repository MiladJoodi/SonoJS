"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import gallery4 from "./images/gallery-4.webp"
import gallery5 from "./images/gallery-5.webp"
import gallery6 from "./images/gallery-6.webp"
import gallery7 from "./images/gallery-7.webp"
import gallery8 from "./images/gallery-8.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const DEFAULT_IMAGES = [
  { id: 1, src: assetSrc(gallery8), alt: "Featured gallery image" },
  { id: 2, src: assetSrc(gallery4), alt: "Thumbnail 1" },
  { id: 3, src: assetSrc(gallery5), alt: "Thumbnail 2" },
  { id: 4, src: assetSrc(gallery6), alt: "Thumbnail 3" },
  { id: 5, src: assetSrc(gallery7), alt: "Thumbnail 4" },
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
  const [activeImage, setActiveImage] = React.useState<GalleryImage>(images[0])

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

      <div className="mx-auto max-w-4xl">
        <figure className="aspect-[1024/569] w-full overflow-hidden rounded-[12px] border border-border/70 bg-muted shadow-soft">
          <img
            src={activeImage.src}
            alt={activeImage.alt}
            className="size-full object-cover object-top"
          />
        </figure>

        <ul className="mt-3 grid grid-cols-5 gap-2 sm:mt-4 sm:gap-4">
          {images.map((image) => {
            const isActive = activeImage.id === image.id

            return (
              <li key={image.id} className="aspect-[18/13] min-w-0">
                <button
                  type="button"
                  aria-pressed={isActive}
                  aria-label={`Show ${image.alt}`}
                  onClick={() => setActiveImage(image)}
                  className={cn(
                    "size-full cursor-pointer overflow-hidden rounded-[12px] outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring",
                    isActive && "ring-2 ring-foreground"
                  )}
                >
                  <img
                    src={image.src}
                    alt=""
                    className="size-full object-cover object-top"
                  />
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
