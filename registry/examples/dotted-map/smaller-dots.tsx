"use client"

import { DottedMap } from "@sonojs/ui/components/dotted-map"

export function DottedMapSmallerDots() {
  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-[12px] border border-border/70">
      <DottedMap dotRadius={0.1} />
    </div>
  )
}
