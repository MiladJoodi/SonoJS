"use client"

import { HoverGallery } from "@sonojs/ui/components/3d/hover-gallery"

export function HoverGalleryDefault() {
  return (
    <div className="w-full px-2 py-2">
      <HoverGallery itemHeight={360} />
    </div>
  )
}
