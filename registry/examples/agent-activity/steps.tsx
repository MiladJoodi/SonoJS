"use client"

import * as React from "react"
import { RotateCcwIcon } from "lucide-react"

import {
  AgentActivity,
  type AgentActivityItem,
  type AgentActivityStatus,
} from "@sonojs/ui/components/agent-activity"

const SEQUENCE: AgentActivityItem[] = [
  {
    id: "s1",
    type: "step",
    label: "Reading flavor briefs",
    status: "complete",
  },
  {
    id: "s2",
    type: "step",
    label: "Scanning supplier lists",
    status: "complete",
  },
  {
    id: "s3",
    type: "step",
    label: "Comparing tasting notes",
    status: "complete",
    meta: "6 flavors",
  },
  {
    id: "s4",
    type: "step",
    label: "Writing the scoop report",
    status: "complete",
  },
]

export function AgentActivitySteps() {
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
      if (i >= SEQUENCE.length) {
        setStatus("complete")
        return
      }
      const next = SEQUENCE[i]!
      i += 1
      setItems((prev) => [
        ...prev.map((item) =>
          item.type === "step" ? { ...item, status: "complete" as const } : item
        ),
        {
          ...next,
          status:
            i < SEQUENCE.length
              ? ("active" as const)
              : ("complete" as const),
        },
      ])
      timeout = window.setTimeout(advance, 900)
    }

    timeout = window.setTimeout(advance, 600)
    return () => window.clearTimeout(timeout)
  }, [replay])

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-3 py-6">
      <AgentActivity
        key={replay}
        items={items}
        status={status}
        duration={4}
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
