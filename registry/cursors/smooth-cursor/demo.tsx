"use client"

import { CURSOR_STAGE_LIGHT } from "../_stage"
import { SmoothCursor } from "./smooth-cursor"

export default function SmoothCursorDemo() {
  return (
    <div
      className={`${CURSOR_STAGE_LIGHT} flex cursor-none items-center justify-center`}
    >
      <span className="pointer-events-none hidden text-sm text-muted-foreground md:block">
        Move your mouse around
      </span>
      <span className="pointer-events-none block text-sm text-muted-foreground md:hidden">
        Smooth Cursor is disabled on touch devices
      </span>
      <SmoothCursor />
    </div>
  )
}
