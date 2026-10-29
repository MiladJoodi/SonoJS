"use client"

import { ThinkingOrb } from "@sonojs/ui/components/thinking-orbs"

export function ThinkingOrbsWeaving() {
  return (
    <div className="flex items-center justify-center px-8 py-6">
      <ThinkingOrb state="weaving" size={64} />
    </div>
  )
}
