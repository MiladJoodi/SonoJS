"use client"

import { useRef } from "react"

import { CURSOR_STAGE_LIGHT } from "../_stage"
import { RainbowCursor } from "./rainbow-cursor"

export default function RainbowCursorDemo() {
  const stageRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={stageRef} className={`${CURSOR_STAGE_LIGHT} cursor-none`}>
      <RainbowCursor containerRef={stageRef} />
    </div>
  )
}
