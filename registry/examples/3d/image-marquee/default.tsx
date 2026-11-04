"use client"

import { ImageMarquee } from "@sonojs/ui/components/3d/image-marquee"

export function ImageMarqueeDefault() {
  return (
    <div className="w-full px-2 py-2">
      <ImageMarquee cols={4} className="h-[360px] sm:h-[520px]" />
    </div>
  )
}
