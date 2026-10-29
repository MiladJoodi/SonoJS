"use client"

import type { ReactNode } from "react"

import { getCssComponentMark } from "./marks"
import {
  FluidOrbComponentMark,
  ThinkingOrbsComponentMark,
  VoiceAiOrbComponentMark,
} from "./special"

export function getComponentWireframe(slug: string): ReactNode {
  switch (slug) {
    case "fluid-orb":
      return <FluidOrbComponentMark />
    case "voice-ai-orb":
      return <VoiceAiOrbComponentMark />
    case "thinking-orbs":
      return <ThinkingOrbsComponentMark />
    default:
      return getCssComponentMark(slug)
  }
}
