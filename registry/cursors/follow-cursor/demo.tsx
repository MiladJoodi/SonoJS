"use client"

import { useRef } from "react"

import { CURSOR_STAGE_LIGHT } from "../_stage"
import { FollowCursor } from "./follow-cursor"

export default function FollowCursorDemo() {
  const stageRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={stageRef} className={`${CURSOR_STAGE_LIGHT} cursor-none`}>
      <FollowCursor containerRef={stageRef} />
      <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
        Move your mouse
      </p>
    </div>
  )
}
