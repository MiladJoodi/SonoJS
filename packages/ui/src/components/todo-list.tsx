"use client"

import * as React from "react"
import { ChevronDownIcon, ListTodoIcon } from "lucide-react"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react"

import { AgentDisclosure } from "@sonojs/ui/components/agent-disclosure"
import {
  EASE_OUT,
  EASE_OUT_CSS,
  SPRING_LAYOUT,
  SPRING_SWAP,
} from "@sonojs/ui/lib/ease"
import { cn } from "@sonojs/ui/lib/utils"

export type TodoItemStatus =
  | "pending"
  | "in-progress"
  | "completed"
  | "cancelled"

export type TodoItem = {
  id: string
  title: React.ReactNode
  status?: TodoItemStatus
  progress?: number
  detail?: React.ReactNode
}

export type TodoListProps = {
  items: TodoItem[]
  title?: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  collapseOnComplete?: boolean
  maxHeight?: number
  className?: string
}

const ROLL_BLUR = "blur(3px)"
const ROLL_EXIT_TRANSITION = { duration: 0.14, ease: EASE_OUT } as const

const TEXT_ROLL_VARIANTS: Variants = {
  initial: { opacity: 0, y: "90%", filter: ROLL_BLUR },
  animate: {
    opacity: 1,
    y: "0%",
    filter: "blur(0px)",
    transition: SPRING_SWAP,
  },
  exit: {
    opacity: 0,
    y: "-90%",
    filter: ROLL_BLUR,
    transition: ROLL_EXIT_TRANSITION,
  },
}

function ActionSwapRollText({
  value,
  children,
  className,
}: {
  value: string
  children: React.ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()
  const measureRef = React.useRef<HTMLSpanElement>(null)
  const [width, setWidth] = React.useState<number>()

  React.useLayoutEffect(() => {
    const nextWidth = measureRef.current?.offsetWidth
    if (!nextWidth) return
    setWidth((currentWidth) =>
      currentWidth === nextWidth ? currentWidth : nextWidth
    )
  })

  return (
    <span
      className={cn(
        "relative inline-block overflow-hidden whitespace-nowrap align-bottom",
        className
      )}
      style={{
        width,
        transition: reduce ? undefined : `width 220ms ${EASE_OUT_CSS}`,
      }}
    >
      <span
        ref={measureRef}
        aria-hidden
        className="invisible inline-block whitespace-nowrap"
      >
        {children}
      </span>
      <AnimatePresence initial={false}>
        <motion.span
          key={`roll-${value}`}
          variants={TEXT_ROLL_VARIANTS}
          initial={reduce ? false : "initial"}
          animate={
            reduce
              ? { opacity: 1, filter: "blur(0px)", scale: 1, y: 0 }
              : "animate"
          }
          exit={reduce ? undefined : "exit"}
          className="absolute start-0 top-0 inline-block will-change-[opacity,filter,transform]"
        >
          {children}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function statusLabel(status: TodoItemStatus) {
  if (status === "in-progress") return "In progress"
  if (status === "completed") return "Completed"
  if (status === "cancelled") return "Cancelled"
  return "Pending"
}

function TodoHeaderIcon({ complete }: { complete: boolean }) {
  const reduce = useReducedMotion() ?? false

  return (
    <span
      aria-hidden
      className="relative grid size-6 shrink-0 place-items-center"
    >
      <AnimatePresence initial={false} mode="popLayout">
        {complete ? (
          <motion.svg
            key="complete"
            viewBox="0 0 24 24"
            initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.72 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={reduce ? { duration: 0 } : SPRING_SWAP}
            className="absolute size-5.5 overflow-visible text-emerald-500"
          >
            <circle cx="12" cy="12" r="9" fill="currentColor" />
            <motion.path
              d="M7.5 12.25 10.5 15.25 16.75 8.75"
              fill="none"
              stroke="white"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={
                reduce ? { duration: 0 } : { duration: 0.24, ease: EASE_OUT }
              }
            />
          </motion.svg>
        ) : (
          <motion.span
            key="todo"
            initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.72 }}
            transition={reduce ? { duration: 0 } : SPRING_SWAP}
            className="absolute grid place-items-center text-muted-foreground"
          >
            <ListTodoIcon className="size-4" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}

function TodoStatusIcon({
  status,
  progress,
}: {
  status: TodoItemStatus
  progress?: number
}) {
  const reduce = useReducedMotion() ?? false
  const normalizedProgress =
    progress === undefined ? 0.68 : Math.min(100, Math.max(0, progress)) / 100

  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 24 24"
      initial={false}
      className={cn(
        "mx-0.5 size-5 shrink-0 overflow-visible text-muted-foreground",
        status === "in-progress" && "text-foreground",
        status === "cancelled" && "text-rose-600 dark:text-rose-400"
      )}
    >
      <motion.circle
        cx="12"
        cy="12"
        r="9"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray={status === "pending" ? "2 3" : undefined}
        strokeLinecap="round"
        initial={false}
        animate={{ fillOpacity: status === "completed" ? 0.06 : 0 }}
        transition={
          reduce ? { duration: 0 } : { duration: 0.18, ease: EASE_OUT }
        }
        className={cn(status === "in-progress" && "opacity-20")}
      />
      <motion.circle
        cx="12"
        cy="12"
        r="9"
        pathLength="1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={false}
        animate={{
          pathLength: status === "in-progress" ? normalizedProgress : 0,
          opacity: status === "in-progress" ? 1 : 0,
          rotate:
            status === "in-progress" && progress === undefined && !reduce
              ? 360
              : -90,
        }}
        transition={
          status === "in-progress" && progress === undefined && !reduce
            ? { rotate: { duration: 1.1, repeat: Infinity, ease: "linear" } }
            : reduce
              ? { duration: 0 }
              : SPRING_LAYOUT
        }
        style={{ transformOrigin: "12px 12px" }}
      />
      <motion.path
        d="M7.5 12.25 10.5 15.25 16.75 8.75"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={{
          pathLength: status === "completed" ? 1 : 0,
          opacity: status === "completed" ? 1 : 0,
        }}
        transition={
          reduce ? { duration: 0 } : { duration: 0.24, ease: EASE_OUT }
        }
      />
      <motion.path
        d="M8.5 8.5 15.5 15.5M15.5 8.5 8.5 15.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={false}
        animate={{
          pathLength: status === "cancelled" ? 1 : 0,
          opacity: status === "cancelled" ? 1 : 0,
        }}
        transition={
          reduce ? { duration: 0 } : { duration: 0.2, ease: EASE_OUT }
        }
      />
    </motion.svg>
  )
}

function TodoList({
  items,
  title = "To-dos",
  open,
  defaultOpen = true,
  onOpenChange,
  collapseOnComplete = true,
  maxHeight = 248,
  className,
}: TodoListProps) {
  const reduce = useReducedMotion() ?? false
  const baseId = React.useId()
  const triggerId = `${baseId}-trigger`
  const contentId = `${baseId}-content`
  const viewportRef = React.useRef<HTMLDivElement>(null)
  const previousComplete = React.useRef(false)
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const currentOpen = open ?? internalOpen
  const completed = items.filter((item) => item.status === "completed").length
  const allComplete = items.length > 0 && completed === items.length
  const itemCount = items.length

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (open === undefined) setInternalOpen(next)
      onOpenChange?.(next)
    },
    [onOpenChange, open]
  )

  React.useEffect(() => {
    if (previousComplete.current && !allComplete) {
      setOpen(true)
    }
    if (!previousComplete.current && allComplete && collapseOnComplete) {
      setOpen(false)
    }
    previousComplete.current = allComplete
  }, [allComplete, collapseOnComplete, setOpen])

  React.useLayoutEffect(() => {
    const viewport = viewportRef.current
    if (!viewport || itemCount === 0) return

    const frame = requestAnimationFrame(() => {
      if (viewport.scrollHeight <= viewport.clientHeight) return
      if (typeof viewport.scrollTo === "function") {
        viewport.scrollTo({
          top: viewport.scrollHeight,
          behavior: reduce ? "auto" : "smooth",
        })
      } else {
        viewport.scrollTop = viewport.scrollHeight
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [itemCount, reduce])

  return (
    <section
      data-slot="todo-list"
      aria-label="Agent task list"
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft",
        className
      )}
    >
      <button
        id={triggerId}
        type="button"
        aria-expanded={currentOpen}
        aria-controls={contentId}
        onClick={() => setOpen(!currentOpen)}
        className="group flex h-11 w-full cursor-pointer items-center gap-2.5 rounded-2xl px-3.5 text-start outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <TodoHeaderIcon complete={allComplete} />
        <h3 className="min-w-0 flex-1 truncate text-sm font-medium text-foreground/90">
          {title}
        </h3>
        <span
          className={cn(
            "shrink-0 text-xs font-medium tabular-nums text-muted-foreground",
            allComplete && "text-emerald-600 dark:text-emerald-400"
          )}
        >
          <span className="sr-only">
            {completed} of {items.length} tasks completed
          </span>
          <span aria-hidden className="inline-flex">
            <ActionSwapRollText value={String(completed)}>
              {completed}
            </ActionSwapRollText>
            <span>/</span>
            <span>{items.length}</span>
          </span>
        </span>
        <motion.span
          aria-hidden
          animate={{ rotate: currentOpen ? 180 : 0 }}
          transition={reduce ? { duration: 0 } : SPRING_SWAP}
          className="text-muted-foreground/50 transition-colors group-hover:text-muted-foreground"
        >
          <ChevronDownIcon className="size-3.5" />
        </motion.span>
      </button>

      <AgentDisclosure
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        open={currentOpen}
      >
        <div
          ref={viewportRef}
          className="scrollbar-none overflow-y-auto px-2 pb-2"
          style={{ maxHeight }}
        >
          {items.length ? (
            <ol aria-live="polite" className="space-y-0">
              <AnimatePresence initial={false} mode="popLayout">
                {items.map((item) => {
                  const status = item.status ?? "pending"
                  return (
                    <motion.li
                      layout="position"
                      key={item.id}
                      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -3 }}
                      transition={
                        reduce
                          ? { duration: 0 }
                          : {
                              opacity: { duration: 0.18, ease: EASE_OUT },
                              y: SPRING_LAYOUT,
                              layout: SPRING_LAYOUT,
                            }
                      }
                      className="flex min-h-9 items-center gap-2.5 rounded-xl px-1.5 py-1"
                    >
                      <TodoStatusIcon
                        status={status}
                        progress={item.progress}
                      />
                      <span className="sr-only">{statusLabel(status)}: </span>
                      <span
                        className={cn(
                          "min-w-0 flex-1 truncate text-sm leading-5",
                          status === "pending" && "text-muted-foreground/65",
                          status === "in-progress" && "text-foreground",
                          status === "completed" && "text-muted-foreground/60",
                          status === "cancelled" && "text-muted-foreground/55"
                        )}
                      >
                        <span className="relative inline-block max-w-full">
                          {item.title}
                          <motion.span
                            aria-hidden
                            initial={false}
                            animate={{
                              scaleX: status === "completed" ? 1 : 0,
                              opacity: status === "completed" ? 1 : 0,
                            }}
                            transition={
                              reduce
                                ? { duration: 0 }
                                : {
                                    duration: 0.28,
                                    ease: EASE_OUT,
                                    delay: 0.06,
                                  }
                            }
                            className="absolute inset-x-0 top-1/2 h-px origin-start bg-current"
                          />
                        </span>
                      </span>
                      {item.detail ? (
                        <span className="shrink-0 text-sm text-muted-foreground/55">
                          {item.detail}
                        </span>
                      ) : null}
                    </motion.li>
                  )
                })}
              </AnimatePresence>
            </ol>
          ) : (
            <p className="px-1.5 py-2 text-sm text-muted-foreground">
              No tasks yet
            </p>
          )}
        </div>
      </AgentDisclosure>
    </section>
  )
}

export { TodoList }
