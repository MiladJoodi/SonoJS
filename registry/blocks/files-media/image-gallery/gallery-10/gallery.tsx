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
  {
    id: 1,
    src: assetSrc(gallery8),
    alt: "Featured image showing lifestyle scene",
  },
  { id: 2, src: assetSrc(gallery4), alt: "Thumbnail 2" },
  { id: 3, src: assetSrc(gallery5), alt: "Thumbnail 3" },
  { id: 4, src: assetSrc(gallery6), alt: "Thumbnail 4" },
  { id: 5, src: assetSrc(gallery7), alt: "Thumbnail 5" },
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
  const [selectedImage, setSelectedImage] = React.useState<GalleryImage>(
    images[0]
  )

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

      <div className="mx-auto flex max-w-5xl flex-col items-stretch gap-3 sm:gap-4 md:flex-row md:items-start">
        <figure className="aspect-[1024/610] min-w-0 w-full overflow-hidden rounded-[12px] border border-border/70 bg-muted shadow-soft">
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="size-full object-cover object-top"
          />
        </figure>

        <ul
          className="flex w-full shrink-0 flex-row gap-2 overflow-x-auto pb-1 md:max-h-[550px] md:w-auto md:flex-col md:gap-2 md:overflow-y-auto md:overflow-x-visible md:pb-0"
          role="list"
        >
          {images.map((image, index) => {
            const isActive = selectedImage.id === image.id

            return (
              <li key={image.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  aria-label={`Show image ${index + 1}`}
                  aria-pressed={isActive}
                  className={cn(
                    "size-16 cursor-pointer overflow-hidden rounded-[12px] outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring sm:size-20 md:size-24",
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
