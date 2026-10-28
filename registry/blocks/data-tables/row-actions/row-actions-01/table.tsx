"use client"

import * as React from "react"
import {
  CheckIcon,
  EyeIcon,
  Loader2Icon,
  PauseIcon,
  PlayIcon,
  Trash2Icon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@sonojs/ui/components/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@sonojs/ui/components/tooltip"
import { cn } from "@/lib/utils"

type TaskStatus = "pending" | "in-progress" | "completed" | "blocked"
type TaskActionType = "start" | "pause" | "complete" | "delete" | "view"

type Task = {
  id: string
  title: string
  assignee: string
  status: TaskStatus
  dueDate: string
  notes: string
}

const tasks: Task[] = [
  {
    id: "TASK-001",
    title: "Implement User Authentication",
    assignee: "Sarah Chen",
    status: "in-progress",
    dueDate: "2024-03-25",
    notes: "OAuth 2.0 integration with Google and GitHub providers",
  },
  {
    id: "TASK-002",
    title: "Design Dashboard UI",
    assignee: "Michael Torres",
    status: "completed",
    dueDate: "2024-03-20",
    notes: "Finalize dashboard layout with responsive grid system",
  },
  {
    id: "TASK-003",
    title: "API Performance Optimization",
    assignee: "Emma Rodriguez",
    status: "pending",
    dueDate: "2024-03-22",
    notes: "Reduce API response time by implementing caching strategy",
  },
  {
    id: "TASK-004",
    title: "Write Unit Tests",
    assignee: "James Wilson",
    status: "in-progress",
    dueDate: "2024-03-28",
    notes: "Achieve 80% code coverage for authentication module",
  },
  {
    id: "TASK-005",
    title: "Database Migration",
    assignee: "Olivia Martinez",
    status: "blocked",
    dueDate: "2024-03-24",
    notes: "Waiting for infrastructure team approval before proceeding",
  },
  {
    id: "TASK-006",
    title: "Update Documentation",
    assignee: "Lucas Anderson",
    status: "pending",
    dueDate: "2024-03-30",
    notes: "Document new API endpoints and authentication flow",
  },
  {
    id: "TASK-007",
    title: "Security Audit",
    assignee: "Sophia Taylor",
    status: "completed",
    dueDate: "2024-03-19",
    notes:
      "Conducted comprehensive security review and vulnerability assessment",
  },
]

const statusStyles: Record<TaskStatus, string> = {
  pending:
    "border-transparent bg-muted text-muted-foreground",
  "in-progress":
    "border-transparent bg-sky-500/10 text-sky-700 dark:text-sky-300",
  completed:
    "border-transparent bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  blocked:
    "border-transparent bg-rose-500/10 text-rose-700 dark:text-rose-400",
}

const statusLabel: Record<TaskStatus, string> = {
  pending: "Pending",
  "in-progress": "In Progress",
  completed: "Completed",
  blocked: "Blocked",
}

function StatusBadge({ status }: { status: TaskStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn("h-6 rounded-full px-2.5 font-medium", statusStyles[status])}
    >
      {statusLabel[status]}
    </Badge>
  )
}

const iconBtn =
  "size-8 cursor-pointer rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"

function ActionButton({
  label,
  pending,
  disabled,
  onClick,
  className,
  children,
}: {
  label: string
  pending?: boolean
  disabled?: boolean
  onClick: () => void
  className?: string
  children: React.ReactNode
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          aria-label={label}
          size="icon-sm"
          variant="ghost"
          disabled={disabled}
          onClick={onClick}
          className={cn(iconBtn, className)}
        >
          {pending ? (
            <Loader2Icon className="size-4 animate-spin" aria-hidden />
          ) : (
            children
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

function TaskActions({
  task,
  busy,
  startPending,
  pausePending,
  completePending,
  deletePending,
  onAction,
}: {
  task: Task
  busy: boolean
  startPending: boolean
  pausePending: boolean
  completePending: boolean
  deletePending: boolean
  onAction: (task: Task, type: TaskActionType) => void
}) {
  return (
    <div className="flex items-center gap-0.5">
      {(task.status === "pending" || task.status === "blocked") && (
        <ActionButton
          label="Start"
          pending={startPending}
          disabled={busy}
          onClick={() => onAction(task, "start")}
        >
          <PlayIcon className="size-4" aria-hidden />
        </ActionButton>
      )}
      {task.status === "in-progress" && (
        <>
          <ActionButton
            label="Pause"
            pending={pausePending}
            disabled={busy}
            onClick={() => onAction(task, "pause")}
          >
            <PauseIcon className="size-4" aria-hidden />
          </ActionButton>
          <ActionButton
            label="Complete"
            pending={completePending}
            disabled={busy}
            onClick={() => onAction(task, "complete")}
          >
            <CheckIcon className="size-4" aria-hidden />
          </ActionButton>
        </>
      )}
      <ActionButton
        label="View"
        disabled={busy}
        onClick={() => onAction(task, "view")}
      >
        <EyeIcon className="size-4" aria-hidden />
      </ActionButton>
      <ActionButton
        label="Delete"
        pending={deletePending}
        disabled={busy}
        onClick={() => onAction(task, "delete")}
        className="hover:bg-destructive/10 hover:text-destructive"
      >
        <Trash2Icon className="size-4" aria-hidden />
      </ActionButton>
    </div>
  )
}

export default function RowActions01({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [pendingAction, setPendingAction] = React.useState<{
    id: string
    type: TaskActionType
  } | null>(null)

  const isTaskActionPending = (action: TaskActionType, taskId: string) =>
    pendingAction?.id === taskId && pendingAction.type === action

  const isTaskBusy = (taskId: string) => pendingAction?.id === taskId

  const handleAction = (task: Task, actionType: TaskActionType) => {
    setPendingAction({ id: task.id, type: actionType })
    window.setTimeout(() => {
      setPendingAction(null)
    }, 1000)
  }

  return (
    <TooltipProvider>
      <div className={cn("w-full min-w-0", className)} {...props}>
        <ul className="flex flex-col gap-3 md:hidden">
          {tasks.map((task) => {
            const busy = isTaskBusy(task.id)
            return (
              <li
                key={task.id}
                className="rounded-[12px] border border-border/70 bg-white p-4 shadow-soft dark:bg-card"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0 flex-1 text-start">
                    <p className="text-sm font-medium text-foreground wrap-break-word">
                      {task.title}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {task.assignee}
                    </p>
                  </div>
                  <StatusBadge status={task.status} />
                </div>
                <p className="mt-3 text-sm text-muted-foreground wrap-break-word whitespace-normal">
                  {task.notes}
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-3">
                  <span className="text-xs tabular-nums text-muted-foreground">
                    Due {task.dueDate}
                  </span>
                  <TaskActions
                    task={task}
                    busy={busy}
                    startPending={isTaskActionPending("start", task.id)}
                    pausePending={isTaskActionPending("pause", task.id)}
                    completePending={isTaskActionPending("complete", task.id)}
                    deletePending={isTaskActionPending("delete", task.id)}
                    onAction={handleAction}
                  />
                </div>
              </li>
            )
          })}
        </ul>

        <div className="hidden rounded-[12px] border border-border/70 bg-white shadow-soft md:block dark:bg-card">
          <Table className="min-w-200">
            <TableHeader>
              <TableRow className="border-b border-border/70 hover:bg-transparent">
                <TableHead className="h-12 px-4 font-medium">Title</TableHead>
                <TableHead className="h-12 px-4 font-medium">Assignee</TableHead>
                <TableHead className="h-12 w-30 px-4 font-medium">
                  Status
                </TableHead>
                <TableHead className="h-12 px-4 font-medium">Due Date</TableHead>
                <TableHead className="h-12 px-4 font-medium">Notes</TableHead>
                <TableHead className="h-12 w-45 px-4 font-medium">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => {
                const busy = isTaskBusy(task.id)

                return (
                  <TableRow key={task.id} className="hover:bg-muted/40">
                    <TableCell className="h-16 max-w-60 px-4 text-sm font-medium whitespace-normal">
                      {task.title}
                    </TableCell>
                    <TableCell className="h-16 px-4 text-sm text-muted-foreground">
                      {task.assignee}
                    </TableCell>
                    <TableCell className="h-16 px-4">
                      <StatusBadge status={task.status} />
                    </TableCell>
                    <TableCell className="h-16 px-4 text-sm tabular-nums text-muted-foreground">
                      {task.dueDate}
                    </TableCell>
                    <TableCell className="h-16 max-w-75 px-4 text-sm text-muted-foreground">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="block cursor-help truncate text-start">
                            {task.notes}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-md text-start">
                          {task.notes}
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell className="h-16 px-4">
                      <TaskActions
                        task={task}
                        busy={busy}
                        startPending={isTaskActionPending("start", task.id)}
                        pausePending={isTaskActionPending("pause", task.id)}
                        completePending={isTaskActionPending(
                          "complete",
                          task.id
                        )}
                        deletePending={isTaskActionPending("delete", task.id)}
                        onAction={handleAction}
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </TooltipProvider>
  )
}
