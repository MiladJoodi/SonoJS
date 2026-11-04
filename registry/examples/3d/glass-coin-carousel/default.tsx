"use client"

import { GlassCoinCarousel } from "@sonojs/ui/components/3d/glass-coin-carousel"

export function GlassCoinCarouselDefault() {
  return (
    <div className="h-[min(70vh,520px)] w-full min-h-[420px]">
      <GlassCoinCarousel
        className="h-full w-full"
        color1="#2DD4BF"
        color2="#818CF8"
        maxOpacity={0.9}
      />
    </div>
  )
}
