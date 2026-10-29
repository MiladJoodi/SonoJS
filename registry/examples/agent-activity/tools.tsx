"use client"

import * as React from "react"
import { RotateCcwIcon } from "lucide-react"

import {
  AgentActivity,
  type AgentActivityItem,
  type AgentActivityStatus,
} from "@sonojs/ui/components/agent-activity"

const TOOLS: AgentActivityItem[] = [
  {
    id: "t1",
    type: "tool",
    action: "read",
    target: "inventory/cones.json",
  },
  {
    id: "t2",
    type: "tool",
    action: "edit",
    target: "menu/summer.md",
    additions: 18,
    deletions: 3,
  },
  {
    id: "t3",
    type: "tool",
    action: "run",
    target: "npm run check:menu",
  },
]

export function AgentActivityTools() {
  const [replay, setReplay] = React.useState(0)
  const [items, setItems] = React.useState<AgentActivityItem[]>([])
  const [status, setStatus] =
    React.useState<AgentActivityStatus>("working")

  React.useEffect(() => {
    setItems([])
    setStatus("working")
    let i = 0
    let timeout = 0

    const advance = () => {
      if (i >= TOOLS.length) {
        setStatus("complete")
        return
      }
      const next = TOOLS[i]!
      i += 1
      setItems((prev) => [...prev, next])
      timeout = window.setTimeout(advance, 850)
    }

    timeout = window.setTimeout(advance, 500)
    return () => window.clearTimeout(timeout)
  }, [replay])

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-3 py-6">
      <AgentActivity
        key={replay}
        items={items}
        status={status}
        contentType="tool"
        collapseOnComplete={false}
        defaultOpen
      />
      {status === "complete" ? (
        <button
          type="button"
          onClick={() => setReplay((n) => n + 1)}
          className="inline-flex cursor-pointer items-center gap-1.5 self-start text-xs font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        >
          <RotateCcwIcon className="size-3.5" />
          Replay
        </button>
      ) : null}
    </div>
  )
}
