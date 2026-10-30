"use client"

import { useRef } from "react"

import { CURSOR_STAGE_LIGHT } from "../_stage"
import { InvertCursor } from "./invert-cursor"

export default function InvertCursorDemo() {
  const stageRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={stageRef} className={`${CURSOR_STAGE_LIGHT} cursor-none`}>
      {/* Content under the lens so difference has a real backdrop */}
      <div className="absolute inset-0 grid grid-cols-2">
        <div className="flex items-center justify-center bg-white p-6">
          <p className="max-w-[12rem] text-center text-2xl font-semibold tracking-tight text-black">
            Invert lens
          </p>
        </div>
        <div className="flex items-center justify-center bg-black p-6">
          <p className="max-w-[12rem] text-center text-2xl font-semibold tracking-tight text-white">
            Over contrast
          </p>
        </div>
        <div className="flex items-center justify-center bg-black p-6">
          <p className="text-sm font-medium text-zinc-300">Editorial 2026</p>
        </div>
        <div className="flex items-center justify-center bg-white p-6">
          <p className="text-sm font-medium text-zinc-700">blend difference</p>
        </div>
      </div>
      <InvertCursor containerRef={stageRef} />
    </div>
  )
}
