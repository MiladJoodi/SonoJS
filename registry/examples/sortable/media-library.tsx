"use client"

import { useState } from "react"
import { GripVerticalIcon, ImagesIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import {
  Sortable,
  SortableItem,
  SortableItemHandle,
} from "@sonojs/ui/components/sortable"

import detailShot from "./images/media-library/detail-shot.webp"
import heroBanner from "./images/media-library/hero-banner.webp"
import logoMark from "./images/media-library/logo-mark.webp"
import ogImage from "./images/media-library/og-image.webp"
import productShot from "./images/media-library/product-shot.webp"
import teamPhoto from "./images/media-library/team-photo.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

interface GalleryImage {
  id: string
  name: string
  dimensions: string
  size: string
  src: string | { src: string }
}

const defaultImages: GalleryImage[] = [
  {
    id: "1",
    name: "hero-banner.webp",
    dimensions: "1920×1080",
    size: "2.4 MB",
    src: heroBanner,
  },
  {
    id: "2",
    name: "product-shot.webp",
    dimensions: "800×600",
    size: "1.8 MB",
    src: productShot,
  },
  {
    id: "3",
    name: "team-photo.webp",
    dimensions: "1200×800",
    size: "3.2 MB",
    src: teamPhoto,
  },
  {
    id: "4",
    name: "logo-mark.webp",
    dimensions: "800×800",
    size: "420 KB",
    src: logoMark,
  },
  {
    id: "5",
    name: "og-image.webp",
    dimensions: "1200×630",
    size: "890 KB",
    src: ogImage,
  },
  {
    id: "6",
    name: "detail-shot.webp",
    dimensions: "1000×1000",
    size: "1.1 MB",
    src: detailShot,
  },
]

export function SortableMediaLibrary() {
  const [images, setImages] = useState<GalleryImage[]>(defaultImages)

  return (
    <div className="mx-auto w-full max-w-md px-1 py-2 sm:p-4">
      <div className="mb-3 flex items-start justify-between gap-2 px-0.5">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <ImagesIcon className="size-4" />
          </div>
          <div className="min-w-0 text-start">
            <p className="text-sm font-semibold tracking-tight">Media library</p>
            <p className="truncate text-xs text-muted-foreground">
              Display priority for marketing
            </p>
          </div>
        </div>
        <Badge variant="outline" className="shrink-0 tabular-nums">
          {images.length}
        </Badge>
      </div>

      <Sortable
        value={images}
        onValueChange={setImages}
        getItemValue={(item) => item.id}
        strategy="grid"
        className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5"
      >
        {images.map((image, index) => (
          <SortableItem key={image.id} value={image.id}>
            <div className="group relative cursor-pointer overflow-hidden rounded-[12px] border border-border/70 bg-card">
              <div className="relative aspect-square bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={assetSrc(image.src)}
                  alt={image.name}
                  className="absolute inset-0 size-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <span className="absolute start-1.5 top-1.5 flex size-5 items-center justify-center rounded-md bg-black/45 font-mono text-[10px] font-semibold text-white backdrop-blur-sm dark:bg-black/55">
                  {index + 1}
                </span>
                <SortableItemHandle className="cursor-grab! absolute end-1 top-1 flex size-8 items-center justify-center rounded-md bg-black/45 text-white backdrop-blur-sm hover:bg-black/60 dark:bg-black/55 sm:end-1.5 sm:top-1.5 sm:size-auto sm:p-0.5 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
                  <GripVerticalIcon className="size-3.5" />
                </SortableItemHandle>
              </div>
              <div className="space-y-0.5 px-1.5 py-1.5 text-start sm:px-2">
                <p className="truncate text-[11px] font-medium leading-tight">
                  {image.name}
                </p>
                <p className="truncate text-[10px] text-muted-foreground">
                  <span className="hidden sm:inline">{image.dimensions} · </span>
                  {image.size}
                </p>
              </div>
            </div>
          </SortableItem>
        ))}
      </Sortable>
    </div>
  )
}
