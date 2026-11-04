"use client"

import { SmokeyFrame } from "@sonojs/ui/components/3d/smokey-frame"

export function SmokeyFrameDefault() {
  return (
    <div className="relative h-[min(70vh,520px)] w-full min-h-[420px] overflow-hidden rounded-[12px] bg-black">
      <SmokeyFrame
        className="h-full w-full"
        frameColor="#2563EB"
        frameWidth={0.3}
        speed={0.15}
        falloff={6}
        noiseScale={3}
        transparentBg
        interactive
        glow
      />
    </div>
  )
}
