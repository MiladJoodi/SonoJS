"use client"

import {
  DEFAULT_3D_SLIDER_ITEMS,
  ThreeDSlider,
} from "@sonojs/ui/components/carousels/3d-slider"

export function ThreeDSliderDefault() {
  return (
    <div className="w-full overflow-hidden py-2">
      <ThreeDSlider items={DEFAULT_3D_SLIDER_ITEMS} className="w-full" />
    </div>
  )
}
