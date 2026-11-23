"use client"

import { useRef } from "react"

import { CURSOR_STAGE_LIGHT } from "../_stage"
import { BubbleCursor } from "./bubble-cursor"

export default function BubbleCursorDemo() {
  const stageRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={stageRef} className={`${CURSOR_STAGE_LIGHT} cursor-none`}>
      <BubbleCursor containerRef={stageRef} />
    </div>
  )
}
