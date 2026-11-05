"use client"

import * as React from "react"
import { RotateCcwIcon, SearchIcon } from "lucide-react"

import { ReactIcon } from "@/components/icons"
import { Button } from "@sonojs/ui/components/button"
import { TaskList, type TaskListTask } from "@sonojs/ui/components/task-list"

const tasks: TaskListTask[] = [
  {
    title: "Found project files",
    runningTitle: "Searching project files",
    icon: SearchIcon,
    steps: [
      { label: 'Searching "app/page.tsx, components structure"' },
      {
        label: "Read",
        chips: [
          {
            label: "page.tsx",
            icon: <ReactIcon className="size-3.5 text-[#61dafb]" />,
          },
        ],
      },
      { label: "Scanning 52 files" },
      {
        label: "Reading files",
        chips: [
          {
            label: "layout.tsx",
            icon: <ReactIcon className="size-3.5 text-[#61dafb]" />,
          },
        ],
      },
    ],
  },
]

const TOTAL_UNITS = 1 + tasks[0].steps.length

export function TaskListControlled() {
  const [revealed, setRevealed] = React.useState(0)

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-start gap-4">
      <TaskList tasks={tasks} revealed={revealed} />
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={revealed >= TOTAL_UNITS}
          onClick={() => setRevealed((n) => Math.min(TOTAL_UNITS, n + 1))}
        >
          Reveal next
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          disabled={revealed === 0}
          onClick={() => setRevealed(0)}
        >
          <RotateCcwIcon className="size-3.5" />
          Reset
        </Button>
        <span className="text-xs text-muted-foreground">
          {revealed}/{TOTAL_UNITS} units
        </span>
      </div>
    </div>
  )
}
