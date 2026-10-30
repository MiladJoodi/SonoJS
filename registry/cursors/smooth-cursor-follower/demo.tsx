"use client"

import { useRef } from "react"

import { CURSOR_STAGE_LIGHT } from "../_stage"
import { SmoothCursorFollower } from "./smooth-cursor-follower"

export default function SmoothCursorFollowerDemo() {
  const stageRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={stageRef} className={`${CURSOR_STAGE_LIGHT} cursor-none`}>
      <SmoothCursorFollower containerRef={stageRef} />
      <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
        Dual rings — hover to expand
      </p>
      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center gap-3">
        <button
          type="button"
          data-cursor-hover
          className="cursor-pointer rounded-md border border-border/70 bg-card px-4 py-2 text-sm font-medium shadow-soft"
        >
          Hover me
        </button>
        <a
          href="#"
          data-cursor-hover
          className="cursor-pointer rounded-md border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
          onClick={(e) => e.preventDefault()}
        >
          Link
        </a>
      </div>
    </div>
  )
}
