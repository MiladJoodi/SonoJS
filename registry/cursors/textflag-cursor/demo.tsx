"use client"

import { useRef } from "react"

import { CURSOR_STAGE_LIGHT } from "../_stage"
import { TextFlagCursor } from "./textflag-cursor"

export default function TextFlagCursorDemo() {
  const stageRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={stageRef} className={`${CURSOR_STAGE_LIGHT} cursor-none`}>
      <TextFlagCursor containerRef={stageRef} text="SONOJS" />
      <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
        A waving text flag
      </p>
    </div>
  )
}
