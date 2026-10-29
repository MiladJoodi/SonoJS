"use client"

import * as React from "react"
import { RotateCcwIcon } from "lucide-react"

import {
  TodoList,
  type TodoItem,
  type TodoItemStatus,
} from "@sonojs/ui/components/todo-list"

const BASE: Omit<TodoItem, "status">[] = [
  { id: "1", title: "Read flavor briefs" },
  { id: "2", title: "Scan supplier lists", detail: "12 vendors" },
  { id: "3", title: "Compare tasting notes", detail: "6 flavors" },
  { id: "4", title: "Write the scoop report" },
]

function statusesForStage(stage: number): TodoItemStatus[] {
  if (stage <= 0) return ["in-progress", "pending", "pending", "pending"]
  if (stage === 1) return ["completed", "in-progress", "pending", "pending"]
  if (stage === 2) return ["completed", "completed", "in-progress", "pending"]
  if (stage === 3) return ["completed", "completed", "completed", "in-progress"]
  return ["completed", "completed", "completed", "completed"]
}

export function TodoListDefault() {
  const [replay, setReplay] = React.useState(0)
  const [stage, setStage] = React.useState(0)

  React.useEffect(() => {
    setStage(0)
  }, [replay])

  React.useEffect(() => {
    if (stage >= 4) return
    const t = window.setTimeout(() => setStage((s) => s + 1), 1100)
    return () => window.clearTimeout(t)
  }, [stage, replay])

  const statuses = statusesForStage(stage)
  const items: TodoItem[] = BASE.map((item, index) => ({
    ...item,
    status: statuses[index],
  }))

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-3">
      <TodoList key={replay} items={items} defaultOpen />
      {stage >= 4 ? (
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
