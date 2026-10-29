"use client"

import { ThinkingOrb } from "@sonojs/ui/components/thinking-orbs"

export function ThinkingOrbsSearching() {
  return (
    <div className="flex justify-center py-10">
      <ThinkingOrb state="searching" size={64} />
    </div>
  )
}
