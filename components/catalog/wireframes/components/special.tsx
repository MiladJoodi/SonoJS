"use client"

import { FluidOrb } from "@sonojs/ui/components/fluid-orb"

import { MarkFrame } from "@/components/catalog/wireframes/mark-frame"

export function FluidOrbComponentMark() {
  return (
    <MarkFrame density="bold" className="p-0">
      <FluidOrb
        size={96}
        color="#1A73F2"
        animated={false}
        aria-hidden
        className="shrink-0"
      />
    </MarkFrame>
  )
}

/** Static Voice AI Orb — large, no live controls. */
export function VoiceAiOrbComponentMark() {
  const tint = "#7DFFB3"
  return (
    <MarkFrame density="bold">
      <div className="relative flex size-[78%] max-h-[5.5rem] max-w-[5.5rem] items-center justify-center">
        <div
          className="absolute inset-0 rounded-full opacity-40 blur-md"
          style={{ background: tint }}
        />
        <div
          className="absolute inset-[4%] rounded-full border border-dashed opacity-50"
          style={{ borderColor: tint }}
        />
        <div
          className="relative flex size-[62%] items-center justify-center rounded-full"
          style={{
            background: `radial-gradient(circle at 35% 30%, #fff 0%, ${tint} 55%, var(--card) 100%)`,
          }}
        >
          <div className="flex h-[42%] items-end gap-[3px]">
            {[40, 75, 100, 60, 85, 45].map((h, i) => (
              <span
                key={i}
                className="w-[3px] rounded-full bg-card/90"
                style={{ height: `${Math.max(28, h * 0.4)}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </MarkFrame>
  )
}

/** Thinking orbs — three soft circles, large. */
export function ThinkingOrbsComponentMark() {
  return (
    <MarkFrame density="bold">
      <div className="flex items-center gap-2">
        <span className="size-6 rounded-full bg-primary/35" />
        <span className="size-8 rounded-full bg-primary/55" />
        <span className="size-6 rounded-full bg-primary/35" />
      </div>
    </MarkFrame>
  )
}
