"use client"

import {
  GridReveal,
  imageGeneration2DemoSrc,
} from "@sonojs/ui/components/image-generation-2"

export function ImageGeneration2Default() {
  return (
    <div className="flex w-full justify-center py-6">
      <div className="w-full max-w-[280px]">
        <GridReveal
          src={imageGeneration2DemoSrc}
          alt="Generated portrait"
          caption="Generating image…"
          estimatedDuration={6000}
          aspect={1}
        />
      </div>
    </div>
  )
}
