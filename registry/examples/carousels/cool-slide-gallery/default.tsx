"use client"

import {
  CoolSlideGallery,
  DEFAULT_COOL_SLIDE_GALLERY_SLIDES,
} from "@sonojs/ui/components/carousels/cool-slide-gallery"

export function CoolSlideGalleryDefault() {
  return (
    <div className="flex min-h-[480px] w-full max-w-full items-center justify-center overflow-x-clip px-2 py-8 sm:min-h-[560px] sm:px-4 sm:py-10">
      <CoolSlideGallery
        slides={DEFAULT_COOL_SLIDE_GALLERY_SLIDES}
        cardWidth={360}
        cardHeight={420}
        className="w-full"
        radius={6}
        tilt={16}
        sideTilt={5}
        gap={7.5}
        dimOpacity={48}
        showTitle
        showBadge
        titlePosition="bottom-left"
        showArrows
        showDots
        showCounter
        clickable
        draggable
        keyboardNavigation
        autoplay={false}
        animationDuration={0.65}
        easing="smooth"
        maxVisible={2}
        depth={250}
        scaleStep={0.14}
        perspective={1600}
      />
    </div>
  )
}
