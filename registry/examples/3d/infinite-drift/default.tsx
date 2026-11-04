"use client"

import { InfiniteDrift } from "@sonojs/ui/components/3d/infinite-drift"

export function InfiniteDriftDefault() {
  return (
    <div className="w-full overflow-hidden rounded-[12px]">
      <InfiniteDrift height={480} className="rounded-[12px]" />
    </div>
  )
}
