"use client"

import { ImageRing } from "@sonojs/ui/components/3d/image-ring"

const CAPTIONS = [
  "Midnight market",
  "Glass canyon",
  "Quiet harbour",
  "Steel dawn",
  "Desert current",
  "Signal tower",
  "Forest hush",
  "Amber trail",
  "Coastal drift",
  "Neon terrace",
]

export function ImageRingDefault() {
  return (
    <div className="h-[min(72vh,600px)] w-full min-h-[440px]">
      <ImageRing
        captions={CAPTIONS}
        autoPlayMs={4200}
        containerClassName="h-full w-full"
      />
    </div>
  )
}
