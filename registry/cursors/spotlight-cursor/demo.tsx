"use client"

import { useRef } from "react"

import { CURSOR_STAGE_DARK } from "../_stage"
import { SpotlightCursor } from "./spotlight-cursor"

export default function SpotlightCursorDemo() {
  const stageRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={stageRef} className={`${CURSOR_STAGE_DARK} cursor-none`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(37,99,235,0.35),transparent_55%),radial-gradient(ellipse_at_80%_70%,rgba(245,158,11,0.25),transparent_50%)]"
      />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center">
        <p className="text-xl font-semibold tracking-tight text-white">
          Find the details
        </p>
        <p className="max-w-sm text-sm leading-relaxed text-zinc-200">
          Soft vignette with a warm beam — copy stays readable under the light.
        </p>
        <div className="mt-2 flex items-center gap-3">
          <div className="size-12 rounded-full bg-amber-400 shadow-[0_0_28px_rgba(251,191,36,0.55)]" />
          <div className="size-12 rounded-[12px] bg-sky-400/90 shadow-[0_0_28px_rgba(56,189,248,0.45)]" />
        </div>
      </div>
      <SpotlightCursor containerRef={stageRef} />
      <p className="pointer-events-none absolute inset-x-0 bottom-4 text-center text-sm font-medium text-white/75">
        Move your mouse
      </p>
    </div>
  )
}
