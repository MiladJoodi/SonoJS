"use client"

import { Globe } from "@sonojs/ui/components/3d/globe"

/** Same component users get from `sonojs add globe` (needs `cobe` + `motion`). */
export function GlobeDefault() {
  return (
    <div className="bg-canvas relative flex size-full min-h-[380px] w-full max-w-lg items-center justify-center overflow-hidden rounded-[12px] border border-border/70 px-10 pb-40 pt-8 sm:min-h-[480px] sm:px-16 md:pb-60">
      <span className="pointer-events-none bg-linear-to-b from-foreground to-foreground/30 bg-clip-text text-center text-7xl font-semibold leading-none whitespace-pre-wrap text-transparent sm:text-8xl dark:from-white dark:to-slate-900/10">
        Globe
      </span>
      <Globe className="top-28" />
      <div
        className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.12),rgba(255,255,255,0))] dark:bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.35),rgba(255,255,255,0))]"
        aria-hidden
      />
    </div>
  )
}
