"use client"

import * as React from "react"
import { RotateCcwIcon, SearchIcon } from "lucide-react"

import { ReactIcon } from "@/components/icons"
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
          {
            label: "layout.tsx",
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

export function TaskListDefault() {
  const [replay, setReplay] = React.useState(0)
  const [done, setDone] = React.useState(false)

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-start gap-3">
      <TaskList
        key={replay}
        tasks={tasks}
        onComplete={() => setDone(true)}
      />
      {done ? (
        <button
          type="button"
          onClick={() => {
            setDone(false)
            setReplay((n) => n + 1)
          }}
          className="inline-flex cursor-pointer items-center gap-1.5 self-start rounded-lg border border-border/70 bg-background px-2.5 py-1.5 text-xs font-medium text-muted-foreground shadow-xs outline-none transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
        >
          <RotateCcwIcon className="size-3.5" />
          Run again
        </button>
      ) : null}
    </div>
  )
}
