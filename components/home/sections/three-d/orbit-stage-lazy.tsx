"use client"

import { LazyWhenVisible } from "@/components/home/lazy-when-visible"

function loadHomeOrbitStage() {
  return import("./orbit-stage")
}

/**
 * Lock size with inline styles — BTF CSS arrives after paint, so Tailwind
 * max-w / aspect-square alone briefly leave a full-column circle (CLS).
 */
const ORBIT_BOX_STYLE = {
  width: "100%",
  maxWidth: "26rem",
  aspectRatio: "1 / 1",
} as const

/** Client island: owns the dynamic import so RSC never passes a function prop. */
export function HomeOrbitStageLazy() {
  return (
    <LazyWhenVisible
      loader={loadHomeOrbitStage}
      exportName="HomeOrbitStage"
      className="relative mx-auto w-full"
      style={ORBIT_BOX_STYLE}
      placeholder={
        <div
          aria-hidden
          className="size-full rounded-full border border-border/40 bg-muted/20"
        />
      }
    />
  )
}
