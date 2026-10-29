"use client"

import { FluidOrb } from "@sonojs/ui/components/fluid-orb"

import { cn } from "@/lib/utils"

/** AI & Agents mark — same FluidOrb, frozen (no motion). */
export function AiAgentsBlockWireframe({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex size-full items-center justify-center overflow-hidden rounded-[6px] bg-muted/20",
        className
      )}
    >
      <FluidOrb
        size={88}
        color="#1A73F2"
        animated={false}
        aria-hidden
        className="shrink-0"
      />
    </div>
  )
}
