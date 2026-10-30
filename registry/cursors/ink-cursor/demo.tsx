"use client"

import { useRef } from "react"

import { CURSOR_STAGE_LIGHT } from "../_stage"
import { InkCursor } from "./ink-cursor"

export default function InkCursorDemo() {
  const stageRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={stageRef} className={`${CURSOR_STAGE_LIGHT} cursor-none`}>
      <InkCursor containerRef={stageRef} />
      <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
        Liquid ink smear — move quickly
      </p>
    </div>
  )
}
