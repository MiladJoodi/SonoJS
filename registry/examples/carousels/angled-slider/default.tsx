"use client"

import {
  AngledSlider,
  DEFAULT_ANGLED_SLIDER_ITEMS,
} from "@sonojs/ui/components/carousels/angled-slider"

export function AngledSliderDefault() {
  return (
    <div className="flex w-full items-center justify-center overflow-hidden">
      <AngledSlider
        items={DEFAULT_ANGLED_SLIDER_ITEMS}
        speed={30}
        className="w-full"
      />
    </div>
  )
}
