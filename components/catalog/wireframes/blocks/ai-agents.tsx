"use client"

import { FluidOrb } from "@sonojs/ui/components/fluid-orb"

import { MarkFrame } from "@/components/catalog/wireframes/mark-frame"

/** AI & Agents mark — FluidOrb frozen. */
export function AiAgentsBlockWireframe() {
  return (
    <MarkFrame className="p-0">
      <FluidOrb
        size={88}
        color="#1A73F2"
        animated={false}
        aria-hidden
        className="shrink-0"
      />
    </MarkFrame>
  )
}
