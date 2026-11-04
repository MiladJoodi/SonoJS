"use client"

import {
  DEFAULT_STYLISH_CAROUSEL_ITEMS,
  StylishCarousel,
} from "@sonojs/ui/components/carousels/stylish-carousel"

export function StylishCarouselDefault() {
  return (
    <div className="flex min-h-[480px] w-full items-center justify-center overflow-hidden px-4 py-10">
      <StylishCarousel
        items={DEFAULT_STYLISH_CAROUSEL_ITEMS}
        initialIndex={3}
        slideSize="clamp(160px, 42vmin, 340px)"
        showArrows
        showDots
        clickToNavigate
        autoPlay={0}
        rotationDegrees={28}
        inactiveScale={0.62}
        springBounce={0.15}
        springDuration={0.8}
      />
    </div>
  )
}
