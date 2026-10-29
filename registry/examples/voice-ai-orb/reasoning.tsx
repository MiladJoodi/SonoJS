"use client"

import { VoiceAiOrb } from "@sonojs/ui/components/voice-ai-orb"

export function VoiceAiOrbReasoning() {
  return (
    <div className="flex w-full justify-center py-6">
      <VoiceAiOrb defaultState="reasoning" />
    </div>
  )
}
