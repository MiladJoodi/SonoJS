"use client"

import { HangingIdCard } from "@sonojs/ui/components/3d/hanging-id-card"

/** Same component users get from `sonojs add hanging-id-card`. */
export function HangingIdCardDefault() {
  return (
    <div className="relative flex min-h-[min(520px,78svh)] w-full items-start justify-center overflow-x-clip overflow-y-visible rounded-[12px] bg-[linear-gradient(180deg,#eef2ff_0%,#f8fafc_42%,#e2e8f0_100%)] px-2 pt-8 pb-5 sm:min-h-[560px] sm:px-4 sm:pt-10 sm:pb-6 dark:bg-[linear-gradient(180deg,#0b1220_0%,#111827_55%,#020617_100%)]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.18),transparent_70%)]"
        aria-hidden
      />
      <HangingIdCard showHint />
    </div>
  )
}
