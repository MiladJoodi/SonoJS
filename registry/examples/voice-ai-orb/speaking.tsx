"use client"

import { VoiceAiOrb } from "@sonojs/ui/components/voice-ai-orb"

export function VoiceAiOrbSpeaking() {
  return (
    <div className="flex w-full justify-center py-6">
      <VoiceAiOrb defaultState="speaking" />
    </div>
  )
}
