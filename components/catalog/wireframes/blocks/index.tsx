"use client"

import type { ReactNode } from "react"

import { AiAgentsBlockWireframe } from "./ai-agents"

/** Per-category block catalog marks. */
export function getBlockCategoryWireframe(category: string): ReactNode | null {
  switch (category) {
    case "ai-agents":
      return <AiAgentsBlockWireframe />
    default:
      return null
  }
}

export { AiAgentsBlockWireframe } from "./ai-agents"
