"use client"

import { ThinkingOrb } from "@sonojs/ui/components/thinking-orbs"

export function ThinkingOrbsConnecting() {
  return (
    <div className="flex items-center justify-center px-8 py-6">
      <ThinkingOrb state="connecting" size={64} />
    </div>
  )
}
