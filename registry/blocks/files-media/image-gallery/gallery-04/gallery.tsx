import type * as React from "react"

import { cn } from "@/lib/utils"

import dryShampoo from "./images/dry-shampoo.webp"
import eyePrimer from "./images/eye-primer.webp"
import facePrimer from "./images/face-primer.webp"
import faceWash from "./images/face-wash.webp"
import hairBrush from "./images/hair-brush.webp"
import lipstick from "./images/lipstick.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const DEFAULT_IMAGES = [
  { id: 1, src: assetSrc(dryShampoo), alt: "Dry Shampoo" },
  { id: 2, src: assetSrc(eyePrimer), alt: "Eye Primer" },
  { id: 3, src: assetSrc(facePrimer), alt: "Face Primer" },
  { id: 4, src: assetSrc(faceWash), alt: "Face Wash" },
  { id: 5, src: assetSrc(hairBrush), alt: "Hair Brush" },
  { id: 6, src: assetSrc(lipstick), alt: "Lipstick" },
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
      className={cn("w-full bg-card", className)}
      aria-labelledby="gallery-heading"
      {...props}
    >
      <h2 id="gallery-heading" className="sr-only">
        Image Gallery
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-3">
        {images.map((item) => (
          <div
            key={item.id}
            className="group relative aspect-[3/4] cursor-pointer overflow-hidden bg-muted before:pointer-events-none before:absolute before:inset-0 before:z-10 before:bg-foreground/30 before:transition-colors hover:before:bg-primary/60 active:before:bg-primary/60"
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-110 group-active:scale-110"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
