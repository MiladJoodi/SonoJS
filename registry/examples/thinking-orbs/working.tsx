"use client"

import { ThinkingOrb } from "@sonojs/ui/components/thinking-orbs"

export function ThinkingOrbsWorking() {
  return (
    <div className="flex items-center justify-center px-8 py-10">
      <div className="origin-center scale-[1.5]">
        <ThinkingOrb state="working" size={64} />
      </div>
    </div>
  )
}
