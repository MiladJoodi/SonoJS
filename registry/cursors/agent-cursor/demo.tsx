"use client"

import { useRef } from "react"

import { CURSOR_STAGE_LIGHT } from "../_stage"
import { AgentCursor } from "./agent-cursor"

export default function AgentCursorDemo() {
  const stageRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={stageRef} className={`${CURSOR_STAGE_LIGHT} cursor-none`}>
      <AgentCursor containerRef={stageRef} />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
        <p className="pointer-events-none text-sm text-muted-foreground">
          AI copilot — hover a card
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            type="button"
            data-agent="ask"
            className="cursor-pointer rounded-[12px] border border-border/70 bg-card px-4 py-3 text-sm font-medium shadow-soft"
          >
            Draft brief
          </button>
          <button
            type="button"
            data-agent="rewrite"
            className="cursor-pointer rounded-[12px] border border-border/70 bg-card px-4 py-3 text-sm font-medium shadow-soft"
          >
            Paragraph copy
          </button>
          <button
            type="button"
            data-agent="explain"
            className="cursor-pointer rounded-[12px] border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-medium text-primary"
          >
            Metric spike
          </button>
        </div>
      </div>
    </div>
  )
}
