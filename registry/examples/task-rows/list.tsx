"use client"

import * as React from "react"
import { RotateCcwIcon } from "lucide-react"

import { TaskRows } from "@sonojs/ui/components/task-rows"

export function TaskRowsList() {
  const [replay, setReplay] = React.useState(0)

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-3">
      <TaskRows key={replay} variant="list" />
      <button
        type="button"
        onClick={() => setReplay((n) => n + 1)}
        className="inline-flex cursor-pointer items-center gap-1.5 self-start text-xs font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
      >
        <RotateCcwIcon className="size-3.5" />
        Replay
      </button>
    </div>
  )
}
