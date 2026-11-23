"use client"

import { CURSOR_STAGE_LIGHT } from "../_stage"
import { SmoothCursor } from "./smooth-cursor"

export default function SmoothCursorDemo() {
  return (
    <div
      className={`${CURSOR_STAGE_LIGHT} flex cursor-none items-center justify-center`}
    >
      <SmoothCursor />
    </div>
  )
}
