"use client"

import { ThinkingOrb } from "@sonojs/ui/components/thinking-orbs"

export function ThinkingOrbsSearching() {
  return (
    <div className="flex items-center justify-center px-8 py-10">
      <div className="origin-center scale-[1.5]">
        <ThinkingOrb state="searching" size={64} />
      </div>
    </div>
  )
}
