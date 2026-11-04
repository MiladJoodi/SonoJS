"use client"

import { InfiniteDrift2 } from "@sonojs/ui/components/3d/infinite-drift-2"

/** Same component users get from `sonojs add infinite-drift-2` (bundled 16 photos). */
export function InfiniteDrift2Default() {
  return (
    <div className="w-full overflow-hidden rounded-[12px] bg-canvas">
      <InfiniteDrift2 height={480} className="rounded-[12px]" />
    </div>
  )
}
