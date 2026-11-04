"use client"

import {
  DEFAULT_3D_BEND_CAROUSEL_ITEMS,
  ThreeDBendCarousel,
} from "@sonojs/ui/components/carousels/3d-bend-carousel"

export function ThreeDBendCarouselDefault() {
  return (
    <div className="flex w-full justify-center overflow-hidden">
      <ThreeDBendCarousel
        items={DEFAULT_3D_BEND_CAROUSEL_ITEMS}
        orientation="vertical"
        curveDirection="concave"
        grayscaleInactive
        itemWidth={280}
        aspectRatio={0.8}
        gap={-30}
        perspective={1000}
        bendAngle={42}
        depth={360}
        snap
        loop
        autoPlay
        autoPlayInterval={4000}
        height={520}
        className="w-full max-w-3xl"
      />
    </div>
  )
}
