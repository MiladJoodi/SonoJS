"use client"

import {
  GridReveal,
  imageGeneration2DemoSrc,
} from "@sonojs/ui/components/image-generation-2"

export function ImageGeneration2Revealed() {
  return (
    <div className="flex w-full justify-center py-6">
      <div className="w-full max-w-[280px]">
        <GridReveal
          src={imageGeneration2DemoSrc}
          alt="Generated portrait"
          estimatedDuration={1200}
          aspect={1}
        />
      </div>
    </div>
  )
}
