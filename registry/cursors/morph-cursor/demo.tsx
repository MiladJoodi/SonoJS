"use client"

import { useRef } from "react"

import { CURSOR_STAGE_LIGHT } from "../_stage"
import { MorphCursor } from "./morph-cursor"

export default function MorphCursorDemo() {
  const stageRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={stageRef} className={`${CURSOR_STAGE_LIGHT} cursor-none`}>
      <MorphCursor containerRef={stageRef} />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-8">
        <p className="pointer-events-none text-sm text-muted-foreground">
          Semantic morph — try each hotspot
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#"
            data-cursor="link"
            className="cursor-pointer rounded-md border border-border/70 bg-card px-4 py-2 text-sm font-medium shadow-soft"
            onClick={(e) => e.preventDefault()}
          >
            Link
          </a>
          <div
            data-cursor="text"
            className="max-w-xs cursor-text rounded-[12px] border border-dashed border-border/80 bg-muted/40 px-4 py-3 text-sm leading-relaxed text-foreground"
          >
            Hover this copy for a caret morph.
          </div>
          <div
            data-cursor="media"
            className="flex size-24 cursor-pointer items-center justify-center rounded-[12px] border border-border/70 bg-card shadow-soft"
          >
            <span className="text-xs text-muted-foreground">Media</span>
          </div>
        </div>
      </div>
    </div>
  )
}
