"use client"

import { ThinkingOrb } from "@sonojs/ui/components/thinking-orbs"

export function ThinkingOrbsWorking() {
  return (
    <div className="flex justify-center py-10">
      <ThinkingOrb state="working" size={64} />
    </div>
  )
}
