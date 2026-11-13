"use client"

import { HangingBag } from "@sonojs/ui/components/3d/hanging-bag"

/** Same component users get from `sonojs add hanging-bag`. */
export function HangingBagDefault() {
  return (
    <HangingBag
      className="h-[min(100vh,640px)] w-full overflow-hidden rounded-[12px]"
      height="min(100vh, 640px)"
      showHint
    />
  )
}
