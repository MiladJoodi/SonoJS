"use client"

import {
  DEFAULT_3D_IMAGE_CAROUSEL_SLIDES,
  ThreeDImageCarousel,
} from "@sonojs/ui/components/carousels/3d-image-carousel"

export function ThreeDImageCarouselDefault() {
  return (
    <div className="flex w-full items-center justify-center overflow-hidden py-6">
      <ThreeDImageCarousel
        slides={DEFAULT_3D_IMAGE_CAROUSEL_SLIDES}
        itemCount={5}
        autoplay
        delay={4}
        className="w-full"
      />
    </div>
  )
}
