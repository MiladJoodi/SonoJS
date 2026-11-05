"use client"

import * as React from "react"
import { ChevronUpIcon, type LucideIcon } from "lucide-react"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react"

import { EASE_OUT, SPRING_LAYOUT } from "@sonojs/ui/lib/ease"
import { cn } from "@sonojs/ui/lib/utils"

import { TaskTextShimmer } from "./text-shimmer"

export type TaskListChip = {
  label: string
  icon?: React.ReactNode
}

export type TaskListStep = {
  label: string
  chips?: TaskListChip[]
}

export type TaskListTask = {
  title: string
  /** Shown with shimmer while this task is actively revealing. */
  runningTitle?: string
  icon?: LucideIcon | React.ComponentType<{ className?: string }>
  steps: TaskListStep[]
}

export type TaskListProps = {
  tasks: TaskListTask[]
  /**
   * Controlled reveal count. Each task contributes `1 + steps.length`
   * units (header, then each step). When omitted, the list advances on
   * an internal timer.
   */
  revealed?: number
  /** Delay before the first unit appears. Default `320`. */
  startDelay?: number
  /** Gap between automatic units. Default `850`. */
  stepInterval?: number
  /**
   * Collapse finished tasks. `true` collapses each task as it finishes;
   * `"all"` waits until every unit lands, then collapses together.
   * Default off.
   */
  collapseOnComplete?: boolean | "all"
  /** Hold completed steps visible before folding. Default `480`. */
  collapseDelay?: number
  onComplete?: () => void
  className?: string
}

function totalUnits(tasks: TaskListTask[]) {
  return tasks.reduce((sum, task) => sum + 1 + task.steps.length, 0)
}

function taskStartUnit(tasks: TaskListTask[], index: number) {
  let start = 0
  for (let i = 0; i < index; i++) {
    start += 1 + tasks[i].steps.length
  }
  return start
}

type DerivedTask = {
  visible: boolean
  complete: boolean
  running: boolean
  stepsShown: number
  shouldCollapse: boolean
}

function deriveTasks(
  tasks: TaskListTask[],
  revealed: number,
  collapseOnComplete: boolean | "all" | undefined,
  allDone: boolean
): DerivedTask[] {
  return tasks.map((task, index) => {
    const start = taskStartUnit(tasks, index)
    const end = start + 1 + task.steps.length
    const visible = revealed > start
    const complete = revealed >= end
    const running = visible && !complete
    const stepsShown = Math.max(
      0,
      Math.min(task.steps.length, revealed - start - 1)
    )

    let shouldCollapse = false
    if (collapseOnComplete === true) {
      shouldCollapse = complete
    } else if (collapseOnComplete === "all") {
      shouldCollapse = allDone
    }

    return { visible, complete, running, stepsShown, shouldCollapse }
  })
}

function StepChips({ chips }: { chips: TaskListChip[] }) {
  return (
    <>
      {chips.map((chip) => (
        <span
          key={chip.label}
          className="me-0.5 ms-[3px] inline-flex max-w-full -translate-y-px items-center gap-1 rounded-md border border-border/50 bg-muted/40 py-0.5 pe-1.5 ps-1 align-middle transition-colors duration-150 hover:border-border hover:bg-muted/70"
        >
          {chip.icon ? (
            <span
              aria-hidden
              className="flex size-3.5 shrink-0 items-center justify-center [&_svg]:size-3.5"
            >
              {chip.icon}
            </span>
          ) : null}
          <span
            className="truncate text-[11px] font-medium text-foreground"
            dir="ltr"
          >
            {chip.label}
          </span>
        </span>
      ))}
    </>
  )
}

function TreeConnector({ isLast }: { isLast: boolean }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 start-0 w-3 text-muted-foreground/40"
    >
      <svg
        width="12"
        height="15"
        viewBox="0 0 12 15"
        fill="none"
        className="absolute start-0 top-0 rtl:-scale-x-100"
      >
        <path
          d="M0.5 0 V8 Q0.5 14 6.5 14 H11.5"
          stroke="currentColor"
          strokeWidth="1"
          pathLength="1"
          strokeDasharray="1 1"
          strokeDashoffset="0"
        />
      </svg>
      {!isLast ? (
        <span className="absolute start-0 top-2 bottom-0 w-px origin-top bg-current" />
      ) : null}
    </span>
  )
}

function TaskTitle({
  running,
  runningTitle,
  title,
  reduce,
}: {
  running: boolean
  runningTitle?: string
  title: string
  reduce: boolean
}) {
  const showRunning = running && Boolean(runningTitle)
  const label = showRunning ? runningTitle! : title

  return (
    <span className="relative flex min-w-0 flex-1 overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={showRunning ? `run:${label}` : `done:${label}`}
          initial={
            reduce ? false : { opacity: 0, y: 6, filter: "blur(4px)" }
          }
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={
            reduce
              ? { opacity: 0 }
              : { opacity: 0, y: -5, filter: "blur(3px)" }
          }
          transition={
            reduce ? { duration: 0 } : { duration: 0.22, ease: EASE_OUT }
          }
          className="block truncate text-sm font-medium text-muted-foreground"
        >
          {showRunning ? (
            <TaskTextShimmer className="text-muted-foreground">
              {label}
            </TaskTextShimmer>
          ) : (
            label
          )}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function TaskBlock({
  task,
  state,
  reduce,
  collapseDelay,
}: {
  task: TaskListTask
  state: DerivedTask
  reduce: boolean
  collapseDelay: number
}) {
  const Icon = task.icon
  const [open, setOpen] = React.useState(true)
  const [autoFolded, setAutoFolded] = React.useState(false)
  const userToggled = React.useRef(false)

  React.useEffect(() => {
    if (!state.shouldCollapse) {
      setAutoFolded(false)
      if (!userToggled.current) setOpen(true)
      return
    }
    if (reduce || collapseDelay <= 0) {
      setAutoFolded(true)
      if (!userToggled.current) setOpen(false)
      return
    }
    const id = window.setTimeout(() => {
      setAutoFolded(true)
      if (!userToggled.current) setOpen(false)
    }, collapseDelay)
    return () => window.clearTimeout(id)
  }, [state.shouldCollapse, reduce, collapseDelay])

  const expanded = open && state.stepsShown > 0
  const canToggle = state.stepsShown > 0 || autoFolded

  return (
    <motion.li
      layout="position"
      initial={reduce ? false : { opacity: 0, y: 10, filter: "blur(5px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={
        reduce ? { opacity: 0 } : { opacity: 0, y: -4, filter: "blur(4px)" }
      }
      transition={
        reduce
          ? { duration: 0 }
          : {
              opacity: { duration: 0.24, ease: EASE_OUT },
              y: SPRING_LAYOUT,
              filter: { duration: 0.24, ease: EASE_OUT },
              layout: SPRING_LAYOUT,
            }
      }
      className="flex flex-col"
    >
      <button
        type="button"
        aria-expanded={expanded}
        disabled={!canToggle}
        onClick={() => {
          if (!canToggle) return
          userToggled.current = true
          setOpen((value) => !value)
        }}
        className={cn(
          "group flex w-full cursor-pointer items-center gap-2 rounded-md py-0.5 text-start outline-none focus-visible:ring-2 focus-visible:ring-ring",
          !canToggle && "cursor-default"
        )}
      >
        {Icon ? (
          <Icon
            aria-hidden
            className="size-4 shrink-0 text-muted-foreground"
          />
        ) : (
          <span
            aria-hidden
            className="size-1.5 shrink-0 rounded-full bg-muted-foreground/50"
          />
        )}
        <TaskTitle
          running={state.running}
          runningTitle={task.runningTitle}
          title={task.title}
          reduce={reduce}
        />
        {canToggle ? (
          <ChevronUpIcon
            aria-hidden
            className={cn(
              "size-4 shrink-0 text-muted-foreground/50 transition-transform duration-300 ease-out group-hover:text-muted-foreground",
              !expanded && "rotate-180"
            )}
          />
        ) : null}
      </button>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            key="steps"
            initial={
              reduce
                ? false
                : { height: 0, opacity: 0, filter: "blur(5px)" }
            }
            animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
            exit={
              reduce
                ? { opacity: 0 }
                : { height: 0, opacity: 0, filter: "blur(4px)" }
            }
            transition={
              reduce ? { duration: 0 } : { duration: 0.32, ease: EASE_OUT }
            }
            className="overflow-hidden"
          >
            <ul className="ms-2 mt-0.5 flex flex-col">
              <AnimatePresence initial={false}>
                {task.steps.slice(0, state.stepsShown).map((step, index) => {
                  const isLast = index === state.stepsShown - 1
                  return (
                    <motion.li
                      key={`${step.label}-${index}`}
                      initial={
                        reduce
                          ? false
                          : { opacity: 0, height: 0, filter: "blur(4px)" }
                      }
                      animate={{
                        opacity: 1,
                        height: "auto",
                        filter: "blur(0px)",
                      }}
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { duration: 0.28, ease: EASE_OUT }
                      }
                      className="relative overflow-hidden ps-4"
                    >
                      <TreeConnector isLast={isLast && !state.running} />
                      <span className="block py-1 text-[13px] leading-5 text-muted-foreground">
                        {step.label}
                        {step.chips?.length ? (
                          <StepChips chips={step.chips} />
                        ) : null}
                      </span>
                    </motion.li>
                  )
                })}
              </AnimatePresence>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.li>
  )
}

function TaskList({
  tasks,
  revealed: revealedProp,
  startDelay = 320,
  stepInterval = 850,
  collapseOnComplete,
  collapseDelay = 480,
  onComplete,
  className,
}: TaskListProps) {
  const reduce = useReducedMotion() ?? false
  const units = totalUnits(tasks)
  const controlled = revealedProp !== undefined
  const [internalRevealed, setInternalRevealed] = React.useState(0)
  const revealed = controlled ? revealedProp : internalRevealed
  const completedRef = React.useRef(false)
  const tasksKey = React.useMemo(
    () => tasks.map((t) => `${t.title}:${t.steps.length}`).join("|"),
    [tasks]
  )

  React.useEffect(() => {
    if (controlled) return
    setInternalRevealed(0)
    completedRef.current = false
  }, [controlled, tasksKey, startDelay, stepInterval])

  React.useEffect(() => {
    if (controlled || reduce) return
    if (revealed >= units) return

    const delay = revealed === 0 ? startDelay : stepInterval
    const id = window.setTimeout(() => {
      setInternalRevealed((n) => Math.min(units, n + 1))
    }, delay)
    return () => window.clearTimeout(id)
  }, [controlled, reduce, revealed, units, startDelay, stepInterval])

  React.useEffect(() => {
    if (controlled || !reduce) return
    setInternalRevealed(units)
  }, [controlled, reduce, units])

  const allDone = units > 0 && revealed >= units

  React.useEffect(() => {
    if (!allDone || completedRef.current) return
    completedRef.current = true
    onComplete?.()
  }, [allDone, onComplete])

  const derived = deriveTasks(tasks, revealed, collapseOnComplete, allDone)

  return (
    <section
      data-slot="task-list"
      aria-label="Agent task list"
      aria-live="polite"
      className={cn("w-full text-start", className)}
    >
      <ol className="flex flex-col gap-1">
        <AnimatePresence initial={false}>
          {tasks.map((task, index) => {
            const state = derived[index]
            if (!state.visible) return null
            return (
              <TaskBlock
                key={`${task.title}-${index}`}
                task={task}
                state={state}
                reduce={reduce}
                collapseDelay={collapseDelay}
              />
            )
          })}
        </AnimatePresence>
      </ol>
    </section>
  )
}

export { TaskList }
