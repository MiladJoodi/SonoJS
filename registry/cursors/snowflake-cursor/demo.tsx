"use client"

import { useRef } from "react"

import { CURSOR_STAGE_LIGHT } from "../_stage"
import { SnowflakeCursor } from "./snowflake-cursor"

export default function SnowflakeCursorDemo() {
  const stageRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={stageRef} className={`${CURSOR_STAGE_LIGHT} cursor-none`}>
      <SnowflakeCursor containerRef={stageRef} />
      <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
        Crystal flakes spin and fall
      </p>
    </div>
  )
}
