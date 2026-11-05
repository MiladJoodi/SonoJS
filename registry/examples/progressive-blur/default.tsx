"use client"

import { ProgressiveBlur } from "@sonojs/ui/components/progressive-blur"
import { ScrollArea } from "@sonojs/ui/components/scroll-area"

/** Same component users get from `sonojs add progressive-blur`. */
export function ProgressiveBlurDefault() {
  return (
    <div className="relative w-full overflow-hidden rounded-[12px] border border-border/70">
      <ScrollArea className="relative h-[400px] overflow-hidden">
        <div className="flex flex-col gap-2 p-4">
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              className="flex h-20 w-full items-center justify-center rounded-[12px] border border-border/70 bg-card"
            >
              {index}
            </div>
          ))}
        </div>
        <ProgressiveBlur position="bottom" height="40%" />
      </ScrollArea>
    </div>
  )
}
