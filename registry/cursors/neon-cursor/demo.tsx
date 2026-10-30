"use client"

import { useRef } from "react"

import { CURSOR_STAGE_DARK } from "../_stage"
import { NeonCursor } from "./neon-cursor"

export default function NeonCursorDemo() {
  const stageRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={stageRef} className={`${CURSOR_STAGE_DARK} cursor-none`}>
      <NeonCursor containerRef={stageRef} />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <p className="pointer-events-none text-sm text-zinc-300">
          Spring neon — click to pulse
        </p>
        <button
          type="button"
          data-cursor-hover
          className="cursor-pointer rounded-md border border-fuchsia-400/50 bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-[0_0_24px_rgba(232,121,249,0.3)]"
        >
          Hover target
        </button>
      </div>
    </div>
  )
}
