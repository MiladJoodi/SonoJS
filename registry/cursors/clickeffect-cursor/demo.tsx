"use client"

import { useRef } from "react"

import { CURSOR_STAGE_DARK } from "../_stage"
import { ClickEffectCursor } from "./clickeffect-cursor"

export default function ClickEffectCursorDemo() {
  const stageRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={stageRef} className={`${CURSOR_STAGE_DARK} cursor-none`}>
      <ClickEffectCursor containerRef={stageRef} className="absolute inset-0" />
    </div>
  )
}
