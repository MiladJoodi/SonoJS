"use client"

import * as React from "react"
import {
  CheckIcon,
  ChevronDownIcon,
  RefreshCwIcon,
  XIcon,
} from "lucide-react"

import { cn } from "@sonojs/ui/lib/utils"

export type TaskRowsVariant = "cards" | "list"

type TaskStatus = "completed" | "running" | "pending" | "failed"

type Task = {
  key: string
  label: string
  amount: string
  status: TaskStatus
  details: Array<{ label: string; meta: string }>
}

const timeline = [600, 900, 2400, 1400]

function StatusIcon({
  status,
  number,
}: {
  status: TaskStatus
  number: number
}) {
  if (status === "completed") {
    return (
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white dark:bg-emerald-500">
        <CheckIcon className="size-3.5" strokeWidth={3} />
      </span>
    )
  }

  if (status === "failed") {
    return (
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-white dark:bg-red-500">
        <XIcon className="size-3.5" strokeWidth={3} />
      </span>
    )
  }

  return (
    <span className="relative flex size-6 shrink-0 items-center justify-center rounded-full border border-border text-[10px] font-semibold tabular-nums">
      {status === "running" ? (
        <span
          aria-hidden
          className="absolute inset-0 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent motion-reduce:animate-none"
        />
      ) : null}
      <span className="relative">{number}</span>
    </span>
  )
}

function StatusPill({ status }: { status: TaskStatus }) {
  if (status === "completed") {
    return (
      <span className="inline-flex h-5 items-center rounded-full bg-emerald-500/10 px-2 text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
        Completed
      </span>
    )
  }

  if (status === "failed") {
    return (
      <span className="inline-flex h-5 items-center gap-1 rounded-full bg-red-500/10 px-2 text-[11px] font-medium text-red-700 dark:text-red-400">
        Failed <RefreshCwIcon className="size-3" />
      </span>
    )
  }

  return null
}

export type TaskRowsProps = {
  /** Cards keeps each row separate; list groups them into one surface. */
  variant?: TaskRowsVariant
  className?: string
}

/** Expandable task progress rows for a multi-step agent workflow. */
function TaskRows({ variant = "cards", className }: TaskRowsProps) {
  const [stage, setStage] = React.useState(0)
  const [openRows, setOpenRows] = React.useState<Record<string, boolean>>({})

  React.useEffect(() => {
    if (stage >= timeline.length) return
    const timer = window.setTimeout(
      () => setStage((current) => current + 1),
      timeline[stage]
    )
    return () => window.clearTimeout(timer)
  }, [stage])

  const reorderStatus: TaskStatus = stage < 3 ? "running" : "completed"
  const emailStatus: TaskStatus =
    stage < 3 ? "pending" : stage === 3 ? "running" : "completed"
  const tasks: Task[] = [
    {
      key: "verify",
      label: "Verified vendor records",
      amount: "12 suppliers",
      status: "completed",
      details: [
        { label: "Matched tax and contact IDs", meta: "12/12" },
        { label: "Flagged stale records", meta: "0" },
      ],
    },
    {
      key: "index",
      label: "Build reorder task list",
      amount: "7 SKUs",
      status: reorderStatus,
      details: [
        { label: "Reading POS export", meta: "3 files" },
        { label: "Scoring stockout risk", meta: "68%" },
      ],
    },
    {
      key: "draft",
      label: "Draft supplier emails",
      amount: "2 messages",
      status: emailStatus,
      details: [
        { label: "Cone supplier follow-up", meta: "draft" },
        { label: "Pistachio reorder note", meta: "draft" },
      ],
    },
  ]

  return (
    <div
      data-slot="task-rows"
      className={cn(
        "flex w-full max-w-md flex-col",
        variant === "list"
          ? "overflow-hidden rounded-[12px] border border-border/70 bg-card"
          : "gap-2",
        className
      )}
    >
      {tasks.map((task, index) => {
        const open =
          openRows[task.key] ??
          ((task.key === "index" && stage === 2) ||
            (task.key === "draft" && stage === 3))
        return (
          <article
            className={cn(
              "overflow-hidden",
              variant === "list"
                ? "border-b border-border/70 last:border-b-0"
                : "rounded-[12px] border border-border/70 bg-card shadow-soft"
            )}
            key={task.key}
          >
            <button
              type="button"
              aria-expanded={open}
              className="flex h-12 w-full cursor-pointer items-center gap-2.5 px-3 text-start transition-colors hover:bg-muted/60"
              onClick={() =>
                setOpenRows((current) => ({ ...current, [task.key]: !open }))
              }
            >
              <StatusIcon number={index + 1} status={task.status} />
              <span className="min-w-0 flex-1 truncate text-[13px] font-medium">
                {task.label}
              </span>
              <span className="text-xs tabular-nums text-muted-foreground">
                {task.amount}
              </span>
              <StatusPill status={task.status} />
              <ChevronDownIcon
                className={cn(
                  "size-4 shrink-0 text-muted-foreground transition-transform duration-200 motion-reduce:transition-none",
                  open && "rotate-180"
                )}
              />
            </button>

            <div
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-300 motion-reduce:transition-none",
                open
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <div className="mx-3 mb-3 grid grid-cols-[24px_1fr] gap-2.5 border-t border-border/70 pt-2.5">
                  <span
                    aria-hidden
                    className="mx-auto h-full w-px bg-border"
                  />
                  <div className="flex flex-col gap-2">
                    {task.details.map((detail) => (
                      <div
                        className="flex items-center justify-between gap-4"
                        key={detail.label}
                      >
                        <span className="text-xs text-muted-foreground">
                          {detail.label}
                        </span>
                        <span className="shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground">
                          {detail.meta}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export { TaskRows }
