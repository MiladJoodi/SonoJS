"use client"

import { CURSOR_STAGE_LIGHT } from "../_stage"
import { TextIconCursor } from "./texticon-cursor"

export default function TextIconCursorDemo() {
  return (
    <div className={CURSOR_STAGE_LIGHT}>
      <TextIconCursor />
      <p className="pointer-events-none absolute inset-x-0 bottom-4 text-center text-sm text-muted-foreground">
        Hover the hotspots
      </p>
    </div>
  )
}
