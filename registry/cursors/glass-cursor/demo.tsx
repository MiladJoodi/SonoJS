"use client"

import { useRef } from "react"

import { CURSOR_STAGE_LIGHT } from "../_stage"
import { GlassCursor } from "./glass-cursor"

export default function GlassCursorDemo() {
  const stageRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={stageRef} className={`${CURSOR_STAGE_LIGHT} cursor-none`}>
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -start-6 top-8 size-44 rounded-full bg-blue-500/35 blur-3xl dark:bg-blue-500/40" />
        <div className="absolute end-6 top-12 size-40 rounded-full bg-fuchsia-500/30 blur-3xl dark:bg-fuchsia-500/35" />
        <div className="absolute bottom-6 start-1/3 size-44 rounded-full bg-emerald-400/30 blur-3xl dark:bg-emerald-400/30" />
      </div>
      <GlassCursor containerRef={stageRef} />
      <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
        Liquid glass — move over the colors
      </p>
    </div>
  )
}
