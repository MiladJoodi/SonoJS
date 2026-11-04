"use client"

import { ImagePageflip } from "@sonojs/ui/components/3d/image-pageflip"

export function ImagePageflipDefault() {
  return (
    <div className="flex w-full items-center justify-center py-2">
      <ImagePageflip pageWidth={220} pageHeight={310} />
    </div>
  )
}
