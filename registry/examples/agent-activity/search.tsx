"use client"

import * as React from "react"
import { RotateCcwIcon } from "lucide-react"

import {
  AgentActivity,
  type AgentActivityItem,
  type AgentActivityStatus,
} from "@sonojs/ui/components/agent-activity"

export function AgentActivitySearch() {
  const [replay, setReplay] = React.useState(0)
  const [items, setItems] = React.useState<AgentActivityItem[]>([])
  const [status, setStatus] =
    React.useState<AgentActivityStatus>("working")

  React.useEffect(() => {
    setItems([])
    setStatus("working")
    const show = window.setTimeout(() => {
      setItems([
        {
          id: "q1",
          type: "search",
          query: "best peach ice cream suppliers 2026",
          results: [
            {
              id: "r1",
              title: "Stone Fruit Co-op",
              domain: "stonefruit.coop",
              url: "https://example.com",
            },
            {
              id: "r2",
              title: "Summer Scoop Report",
              domain: "scoops.example",
            },
          ],
          moreCount: 4,
        },
      ])
    }, 800)

    const done = window.setTimeout(() => setStatus("complete"), 2800)

    return () => {
      window.clearTimeout(show)
      window.clearTimeout(done)
    }
  }, [replay])

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-3 py-6">
      <AgentActivity
        key={replay}
        items={items}
        status={status}
        contentType="search"
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
