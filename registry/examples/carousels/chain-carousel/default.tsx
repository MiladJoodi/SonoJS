"use client"

import {
  ChainCarousel,
  DEFAULT_CHAIN_CAROUSEL_ITEMS,
} from "@sonojs/ui/components/carousels/chain-carousel"

export function ChainCarouselDefault() {
  return (
    <div className="flex w-full flex-col items-center justify-center overflow-hidden py-6">
      <ChainCarousel
        items={DEFAULT_CHAIN_CAROUSEL_ITEMS}
        scrollSpeedMs={1500}
        visibleItemCount={7}
        className="w-full max-w-7xl"
      />
    </div>
  )
}
