"use client"

import {
  DEFAULT_3D_CAROUSEL_ITEMS,
  ThreeDCarousel,
} from "@sonojs/ui/components/carousels/3d-carousel"

export function ThreeDCarouselDefault() {
  return (
    <div className="flex w-full items-center justify-center overflow-hidden py-6">
      <ThreeDCarousel
        items={DEFAULT_3D_CAROUSEL_ITEMS}
        autoRotate
        rotateInterval={4000}
        cardHeight={500}
        className="w-full"
      />
    </div>
  )
}
