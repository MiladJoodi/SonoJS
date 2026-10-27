import type * as React from "react"

import { cn } from "@/lib/utils"

import bodyMotion from "./images/body-motion.webp"
import cream from "./images/cream.webp"
import faceCream from "./images/face-cream.webp"
import gallery1 from "./images/gallery-1.webp"
import gallery2 from "./images/gallery-2.webp"
import gallery6 from "./images/gallery-6.webp"
import gallery8 from "./images/gallery-8.webp"
import greenTshirt from "./images/green-tshirt.webp"
import headphones from "./images/headphones.webp"
import sunscreen from "./images/sunscreen.webp"
import valeriia from "./images/valeriia.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const DEFAULT_IMAGES = [
  { id: 1, src: assetSrc(valeriia), alt: "Portrait of Valeriia" },
  { id: 2, src: assetSrc(gallery2), alt: "Portable speaker product shot" },
  { id: 3, src: assetSrc(gallery1), alt: "Phone and power bank on a desk" },
  { id: 4, src: assetSrc(bodyMotion), alt: "Body motion category" },
  { id: 5, src: assetSrc(faceCream), alt: "Face and body cream" },
  { id: 6, src: assetSrc(gallery6), alt: "Lifestyle still life" },
  { id: 7, src: assetSrc(headphones), alt: "Headphones product shot" },
  { id: 8, src: assetSrc(gallery8), alt: "Outdoor laptop session" },
  { id: 9, src: assetSrc(sunscreen), alt: "Sunscreen product shot" },
  { id: 10, src: assetSrc(gallery1), alt: "Phone and power bank detail" },
  { id: 11, src: assetSrc(greenTshirt), alt: "Dark green t-shirt" },
  { id: 12, src: assetSrc(cream), alt: "Cream jar product shot" },
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
        <div className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="group mb-3 break-inside-avoid overflow-hidden rounded-[12px] border border-border/70 bg-muted shadow-soft md:mb-4"
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="h-auto w-full max-w-full object-cover object-top transition-transform duration-300 group-hover:scale-105 group-active:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
