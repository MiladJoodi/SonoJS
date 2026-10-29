"use client"

import { ThinkingOrb } from "@sonojs/ui/components/thinking-orbs"

export function ThinkingOrbsConnecting() {
  return (
    <div className="flex justify-center py-10">
      <ThinkingOrb state="connecting" size={64} />
    </div>
  )
}
