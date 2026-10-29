"use client"

import { ThinkingOrb } from "@sonojs/ui/components/thinking-orbs"

export function ThinkingOrbsWeaving() {
  return (
    <div className="flex justify-center py-10">
      <ThinkingOrb state="weaving" size={64} />
    </div>
  )
}
