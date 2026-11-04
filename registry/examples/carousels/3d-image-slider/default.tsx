"use client"

import {
  DEFAULT_3D_IMAGE_SLIDER_IMAGES,
  ThreeDImageSlider,
} from "@sonojs/ui/components/carousels/3d-image-slider"

export function ThreeDImageSliderDefault() {
  return (
    <div className="relative flex h-[400px] w-full max-w-full items-center justify-center overflow-hidden sm:h-[520px]">
      <ThreeDImageSlider
        images={DEFAULT_3D_IMAGE_SLIDER_IMAGES}
        duration={32}
        cardWidth="min(68vw, 14em)"
        className="w-full"
      />
    </div>
  )
}
