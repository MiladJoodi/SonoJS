"use client"

import { CURSOR_STAGE_DARK } from "../_stage"
import GlowCursor from "./glow-cursor"

export default function GlowCursorDemo() {
  return (
    <div className={`${CURSOR_STAGE_DARK} cursor-none`}>
      <GlowCursor
        color="#5f8bff"
        intensity={1.3}
        trailWidth={3}
        linger={1.4}
        glow={1.2}
        clickBurst
        theme="dark"
      />
    </div>
  )
}
