"use client"

import { CURSOR_STAGE_COMPACT } from "../_stage"
import { EyeTracker } from "./eye-tracker"

export default function EyeTrackerDemo() {
  return (
    <div
      data-cursor-stage
      className={`${CURSOR_STAGE_COMPACT} flex items-center justify-center`}
    >
      <EyeTracker
        follow={60}
        bounce={30}
        size={100}
        shape="Cube"
        eyes="Slant"
        within="[data-cursor-stage]"
      />
      <p className="pointer-events-none absolute inset-x-0 bottom-4 text-center text-sm text-muted-foreground">
        Move the pointer over the stage. Tap the face for a short reply.
      </p>
    </div>
  )
}