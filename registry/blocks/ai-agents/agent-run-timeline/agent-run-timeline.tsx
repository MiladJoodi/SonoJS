"use client"

import * as React from "react"
import {
  ArrowUpIcon,
  AsteriskIcon,
  CheckIcon,
  ChevronDownIcon,
  LayersIcon,
  MinusIcon,
  PlusIcon,
  SquareIcon,
  XIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@sonojs/ui/components/collapsible"
import { Kbd } from "@sonojs/ui/components/kbd"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@sonojs/ui/components/popover"

export type TodoStatus =
  | "backlog"
  | "pending"
  | "in_progress"
  | "completed"
  | "failed"
  | "cancelled"

export type TodoActivity = {
  id: string
  verb: string
  target: string
  meta?: string
  duration?: number
  running?: boolean
}

export type Todo = {
  id: string
  content: string
  activeForm: string
  status: TodoStatus
  error?: string
  duration?: number
  summary?: string
  activities?: TodoActivity[]
}

const STATUS_LABEL: Record<TodoStatus, string> = {
  backlog: "Backlog",
  pending: "To do",
  in_progress: "In progress",
  completed: "Done",
  failed: "Failed",
  cancelled: "Cancelled",
}

function formatDuration(seconds: number) {
  if (seconds < 60) return `${seconds}s`
  const minutes = Math.floor(seconds / 60)
  const rest = seconds % 60
  return rest === 0 ? `${minutes}m` : `${minutes}m ${rest}s`
}

function countLabel(done: number, total: number) {
  if (total > 0 && done === total) {
    return `${total} ${total === 1 ? "task" : "tasks"} done`
  }
  return `${done} of ${total} done`
}

function AgentMotion() {
  return (
    <style>{`
      @keyframes agent-text-shimmer {
        0% { background-position: 100% 0; }
        100% { background-position: -100% 0; }
      }
      @keyframes agent-check-draw {
        from { stroke-dashoffset: 22; }
        to { stroke-dashoffset: 0; }
      }
      .agent-shimmer {
        background-image: linear-gradient(
          90deg,
          lab(66.128 0 0) 25%,
          lab(65.037 -1.444 -56.974) 40%,
          oklab(0.868143 -0.0196964 -0.0715631) 50%,
          lab(65.037 -1.444 -56.974) 60%,
          lab(66.128 0 0) 75%
        );
        background-size: 250% 100%;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: agent-text-shimmer 2s linear infinite;
      }
      [dir="rtl"] .agent-shimmer {
        animation-direction: reverse;
      }
      @media (prefers-reduced-motion: reduce) {
        .agent-shimmer {
          animation: none;
          background-image: none;
          color: inherit;
          -webkit-text-fill-color: currentcolor;
        }
      }
    `}</style>
  )
}

function TicksSpinner() {
  return (
    <svg
      viewBox="0 0 24 24"
      role="status"
      aria-label="Loading"
      className="size-3.5 shrink-0 origin-center text-muted-foreground motion-safe:animate-spin motion-safe:duration-700"
    >
      {Array.from({ length: 8 }, (_, index) => (
        <line
          key={index}
          x1="12"
          y1="2.75"
          x2="12"
          y2="6.25"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          opacity={0.25 + (index / 7) * 0.75}
          transform={`rotate(${index * 45} 12 12)`}
        />
      ))}
    </svg>
  )
}

function TodoMark({ status }: { status: TodoStatus }) {
  if (status === "completed") {
    return (
      <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-foreground text-background motion-safe:animate-in motion-safe:zoom-in-50 motion-safe:duration-200">
        <CheckIcon
          className="size-2.5 motion-safe:[stroke-dasharray:22] motion-safe:animate-[agent-check-draw_400ms_ease-out_both]"
          strokeWidth={3}
          aria-hidden
        />
      </span>
    )
  }
  if (status === "in_progress") {
    return (
      <span
        className="size-4 shrink-0 rounded-full border-2 border-muted-foreground/30 border-t-foreground motion-safe:animate-spin motion-safe:duration-[1.4s]"
        aria-hidden
      />
    )
  }
  if (status === "failed") {
    return (
      <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-destructive text-white">
        <XIcon className="size-2.5" aria-hidden />
      </span>
    )
  }
  if (status === "cancelled") {
    return (
      <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground">
        <MinusIcon className="size-2.5" aria-hidden />
      </span>
    )
  }
  return (
    <span
      className={cn(
        "size-4 shrink-0 rounded-full border",
        status === "backlog"
          ? "border-dashed border-muted-foreground/50"
          : "border-foreground/80"
      )}
      aria-hidden
    />
  )
}

function ActivityLine({ activity }: { activity: TodoActivity }) {
  return (
    <li className="flex items-center gap-2 overflow-hidden text-[13px] leading-5 text-muted-foreground motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:duration-500">
      {activity.running ? (
        <TicksSpinner />
      ) : (
        <AsteriskIcon className="size-3 shrink-0 text-muted-foreground" aria-hidden />
      )}
      <span className="min-w-0 flex-1 truncate">
        <span>{activity.verb}</span>{" "}
        <span className="text-foreground/80">{activity.target}</span>
        {activity.meta ? <span> {activity.meta}</span> : null}
      </span>
      {activity.duration != null && activity.duration > 0 ? (
        <span className="shrink-0 tabular-nums">
          {formatDuration(activity.duration)}
        </span>
      ) : null}
    </li>
  )
}

function SummaryLine({ text }: { text: string }) {
  return (
    <p className="flex items-center gap-2 text-[13px] text-muted-foreground">
      <LayersIcon className="size-3.5 shrink-0" aria-hidden />
      <span className="min-w-0 truncate">{text}</span>
    </p>
  )
}

function ActivityList({
  todo,
  open,
}: {
  todo: Todo
  open: boolean
}) {
  const activities = todo.activities ?? []
  const live = todo.status === "in_progress"
  if (activities.length === 0 && !todo.summary) return null

  if (live) {
    return (
      <div className="flex flex-col gap-1 overflow-hidden pb-1 ps-6">
        {todo.summary ? <SummaryLine text={todo.summary} /> : null}
        {activities.length > 0 ? (
          <ul className="flex flex-col gap-1">
            {activities.map((activity) => (
              <ActivityLine key={activity.id} activity={activity} />
            ))}
          </ul>
        ) : null}
      </div>
    )
  }

  return (
    <Collapsible open={open}>
      <CollapsibleContent>
        <ul className="flex flex-col gap-1 pb-1 ps-6">
          {activities.map((activity) => (
            <ActivityLine key={activity.id} activity={activity} />
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  )
}

function TodoRow({ todo }: { todo: Todo }) {
  const hasDetail = Boolean(todo.summary || todo.activities?.length)
  const [open, setOpen] = React.useState(todo.status === "in_progress")
  const [trackedStatus, setTrackedStatus] = React.useState(todo.status)
  if (todo.status !== trackedStatus) {
    setTrackedStatus(todo.status)
    setOpen(todo.status === "in_progress")
  }
  const title = todo.status === "in_progress" ? todo.activeForm : todo.content
  const dim =
    todo.status === "backlog" ||
    todo.status === "cancelled" ||
    todo.status === "failed"

  const heading = (
    <div className="flex min-w-0 flex-1 items-center gap-2">
      <TodoMark status={todo.status} />
      <span className="flex min-w-0 flex-1 items-center gap-2">
        <span className="sr-only">{STATUS_LABEL[todo.status]}. </span>
        <span
          className={cn(
            "min-w-0 truncate text-start text-sm",
            todo.status === "in_progress" && "font-medium agent-shimmer",
            todo.status === "pending" && "font-medium text-foreground",
            todo.status === "completed" &&
              "font-medium text-muted-foreground line-through",
            dim && "text-muted-foreground",
            todo.status === "cancelled" && "line-through"
          )}
        >
          {title}
        </span>
      </span>
      {todo.duration != null && todo.duration > 0 ? (
        <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
          {formatDuration(todo.duration)}
        </span>
      ) : null}
      {hasDetail ? (
        <ChevronDownIcon
          className={cn(
            "size-3.5 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
          aria-hidden
        />
      ) : (
        <span className="size-3.5 shrink-0" aria-hidden />
      )}
    </div>
  )

  return (
    <li className="py-1">
      {hasDetail ? (
        <button
          type="button"
          className="flex w-full cursor-pointer items-center"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {heading}
        </button>
      ) : (
        <div className="flex items-center">{heading}</div>
      )}
      {todo.status === "failed" && todo.error ? (
        <p className="mt-1 ps-6 text-xs text-destructive">{todo.error}</p>
      ) : null}
      {hasDetail ? <ActivityList todo={todo} open={open} /> : null}
    </li>
  )
}

function TaskList({
  todos,
  explanation,
  title = "Tasks",
  collapsible = true,
  defaultOpen = true,
  className,
}: {
  todos: Todo[]
  explanation?: string
  title?: string
  collapsible?: boolean
  defaultOpen?: boolean
  className?: string
}) {
  const [open, setOpen] = React.useState(defaultOpen)
  const done = todos.filter((todo) => todo.status === "completed").length
  const active = todos.find((todo) => todo.status === "in_progress")
  const totalTime = todos.reduce((sum, todo) => sum + (todo.duration ?? 0), 0)

  const body = (
    <div className="flex flex-col">
      <span
        className="mt-2 block h-1 w-full overflow-hidden rounded-full bg-muted"
        aria-hidden
      >
        <span
          className="block h-full rounded-full bg-foreground transition-[width] duration-500"
          style={{
            width: todos.length === 0 ? "0%" : `${(done / todos.length) * 100}%`,
          }}
        />
      </span>
      <div
        className="sr-only"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={todos.length}
        aria-valuenow={done}
        aria-label="Tasks progress"
      />
      {explanation ? (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {explanation}
        </p>
      ) : null}
      <ol className="mt-2">
        {todos.map((todo) => (
          <TodoRow key={todo.id} todo={todo} />
        ))}
      </ol>
      <p className="sr-only" aria-live="polite">
        {active
          ? `Started: ${active.activeForm}`
          : `${countLabel(done, todos.length)}.`}
      </p>
    </div>
  )

  const header = (
    <>
      <span className="text-sm font-semibold">{title}</span>
      <span className="text-sm text-muted-foreground">
        {countLabel(done, todos.length)}
      </span>
      <span className="ms-auto text-xs text-muted-foreground tabular-nums">
        {totalTime > 0 ? formatDuration(totalTime) : null}
      </span>
      {collapsible ? (
        <ChevronDownIcon
          className={cn(
            "size-4 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
          aria-hidden
        />
      ) : null}
    </>
  )

  return (
    <section aria-label={title} className={cn("w-full", className)}>
      <AgentMotion />
      {collapsible ? (
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger className="flex w-full items-center gap-2 text-start">
            {header}
          </CollapsibleTrigger>
          <CollapsibleContent>{body}</CollapsibleContent>
        </Collapsible>
      ) : (
        <>
          <div className="flex items-center gap-2">{header}</div>
          {body}
        </>
      )}
    </section>
  )
}

function StatusPill({
  todos,
  explanation,
  className,
}: {
  todos: Todo[]
  explanation?: string
  className?: string
}) {
  if (todos.length === 0) return null
  const done = todos.filter((todo) => todo.status === "completed").length
  const active = todos.find((todo) => todo.status === "in_progress")
  const finished = done === todos.length
  const label = finished
    ? `All ${todos.length} tasks done`
    : (active?.activeForm ?? countLabel(done, todos.length))

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "inline-flex h-8 max-w-full cursor-pointer items-center gap-2 rounded-full border border-border bg-muted/60 px-2.5 text-start text-sm",
          className
        )}
        aria-label={`${label}. ${done} of ${todos.length} tasks done. Show tasks`}
      >
        <TodoMark status={active ? "in_progress" : finished ? "completed" : "pending"} />
        <span className="truncate">{label}</span>
        {finished ? null : (
          <span className="text-muted-foreground tabular-nums">
            {done}/{todos.length}
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[min(24rem,calc(100vw-2rem))] p-3">
        <TaskList
          todos={todos}
          explanation={explanation}
          collapsible={false}
        />
      </PopoverContent>
    </Popover>
  )
}

function newTodo(): Todo {
  return {
    id: `step-${Math.random().toString(36).slice(2, 8)}`,
    content: "",
    activeForm: "",
    status: "pending",
  }
}

function ReviewPlan({
  todos,
  onChange,
  onApprove,
  onCancel,
  title = "Review the plan",
  approveLabel = "Run plan",
  className,
}: {
  todos: Todo[]
  onChange: (todos: Todo[]) => void
  onApprove: (todos: Todo[]) => void
  onCancel?: () => void
  title?: string
  approveLabel?: string
  className?: string
}) {
  function update(id: string, content: string) {
    onChange(
      todos.map((todo) =>
        todo.id === id ? { ...todo, content, activeForm: content } : todo
      )
    )
  }

  function move(index: number, direction: -1 | 1) {
    const next = index + direction
    if (next < 0 || next >= todos.length) return
    const copy = [...todos]
    const [item] = copy.splice(index, 1)
    copy.splice(next, 0, item)
    onChange(copy)
  }

  function approve() {
    onApprove(
      todos
        .map((todo) => ({ ...todo, content: todo.content.trim() }))
        .filter((todo) => todo.content.length > 0)
    )
  }

  return (
    <section aria-label={title} className={cn("w-full", className)}>
      <h2 className="text-sm font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Edit, reorder or remove steps before the agent starts. Move a step with{" "}
        <Kbd>Alt</Kbd> <Kbd>↑</Kbd> and <Kbd>Alt</Kbd> <Kbd>↓</Kbd>.
      </p>
      <ol className="mt-4 flex flex-col">
        {todos.map((todo, index) => (
          <li key={todo.id} className="group flex items-center gap-3 py-1.5">
            <span className="w-4 shrink-0 text-sm text-muted-foreground tabular-nums">
              {index + 1}
            </span>
            <input
              value={todo.content}
              onChange={(event) => update(todo.id, event.target.value)}
              onKeyDown={(event) => {
                if (!event.altKey) return
                if (event.key === "ArrowUp") {
                  event.preventDefault()
                  move(index, -1)
                }
                if (event.key === "ArrowDown") {
                  event.preventDefault()
                  move(index, 1)
                }
              }}
              aria-label={`Step ${index + 1}`}
              placeholder="Describe a step"
              className="h-8 min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
            <button
              type="button"
              aria-label={`Remove step ${index + 1}`}
              onClick={() =>
                onChange(todos.filter((item) => item.id !== todo.id))
              }
              className="cursor-pointer text-muted-foreground opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
            >
              <XIcon className="size-3.5" />
            </button>
          </li>
        ))}
      </ol>
      <button
        type="button"
        onClick={() => onChange([...todos, newTodo()])}
        className="mt-2 inline-flex cursor-pointer items-center gap-2 py-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <PlusIcon className="size-3.5" />
        Add step
      </button>
      <div className="mt-4 flex items-center gap-2 border-t border-border pt-3">
        <span className="text-sm text-muted-foreground">
          {todos.length} {todos.length === 1 ? "step" : "steps"}
        </span>
        <div className="ms-auto flex items-center gap-2">
          {onCancel ? (
            <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          ) : null}
          <Button
            type="button"
            size="sm"
            className="bg-foreground !text-background hover:bg-foreground/90"
            onClick={approve}
          >
            {approveLabel}
            <Kbd className="bg-background/15 text-inherit">Ctrl</Kbd>
            <Kbd className="bg-background/15 text-inherit">Enter</Kbd>
          </Button>
        </div>
      </div>
    </section>
  )
}

type Beat = {
  hold: number
  verb?: string
  target?: string
  summary?: string
}

type Scene = {
  explanation: string
  seconds: number
  closing?: string
  beats?: Beat[]
  todos: Todo[]
}

function action(verb: string, target: string, hold = 2): Beat {
  return { hold, verb, target }
}

function beatAt(beats: Beat[], live: number) {
  let start = 0
  for (const beat of beats) {
    if (live < start + beat.hold) {
      return { beat, into: live - start }
    }
    start += beat.hold
  }
  const last = beats[beats.length - 1]
  return { beat: last, into: last?.hold ?? 0 }
}

const USER_MESSAGE = "Search lags when I type. Fix it and add a test."
const OPENING = "On it. I’ll keep this list updated as I go."
const FIRST_PLAN =
  "Debounce the search value, wire it in, then prove it with a test."
const REVISED_PLAN =
  "Slow responses can still land out of order, so I’m cancelling stale ones too. The docs don’t mention this hook, so I dropped that step."
const CLOSING =
  "Done. Search waits for a pause before fetching, and the new test covers the delay."

function step(
  id: string,
  content: string,
  activeForm: string,
  status: TodoStatus,
  extra?: Partial<Todo>
): Todo {
  return { id, content, activeForm, status, ...extra }
}

const findActivities: TodoActivity[] = [
  { id: "f1", verb: "Read", target: "hooks/index.ts", meta: "168 lines", duration: 2.4 },
  {
    id: "f2",
    verb: "Searched the web for",
    target: "“debounce vs throttle search input”",
    meta: "3 results",
    duration: 0.6,
  },
  { id: "f3", verb: "Read", target: "lib/api.ts", meta: "98 lines", duration: 1.6 },
  { id: "f4", verb: "Read", target: "package.json", meta: "210 lines", duration: 5.5 },
  { id: "f5", verb: "Read", target: "components/search.tsx", meta: "206 lines", duration: 1 },
  { id: "f6", verb: "Read", target: "app/api/search/route.ts", meta: "43 lines", duration: 2 },
  { id: "f7", verb: "Listed", target: "app/search", meta: "13 items", duration: 2.2 },
]

const hookActivities: TodoActivity[] = [
  {
    id: "h1",
    verb: "Searched the web for",
    target: "“vitest fake timers debounce”",
    meta: "9 results",
    duration: 1.1,
  },
  { id: "h2", verb: "Searched for", target: "“useEffect”", meta: "1 result", duration: 2.4 },
  {
    id: "h3",
    verb: "Created",
    target: "hooks/use-debounced-value.ts",
    meta: "+13",
    duration: 2.4,
  },
]

const useActivities: TodoActivity[] = [
  { id: "u1", verb: "Read", target: "app/api/search/route.ts", meta: "160 lines", duration: 0.9 },
  {
    id: "u2",
    verb: "Searched the web for",
    target: "“react 19 useDeferredValue search”",
    meta: "5 results",
    duration: 2,
  },
  { id: "u3", verb: "Edited", target: "components/search.tsx", meta: "+8 −1", duration: 5.5 },
]

const cancelActivities: TodoActivity[] = [
  { id: "c1", verb: "Read", target: "lib/search.ts", meta: "18 lines", duration: 1.2 },
  { id: "c2", verb: "Edited", target: "lib/search.ts", meta: "+5 −4", duration: 2.2 },
]

const testActivities: TodoActivity[] = [
  { id: "t1", verb: "Read", target: "vitest.config.ts", meta: "249 lines", duration: 1.5 },
  {
    id: "t2",
    verb: "Created",
    target: "hooks/use-debounced-value.test.ts",
    meta: "+16",
    duration: 0.8,
  },
]

const runActivities: TodoActivity[] = [
  { id: "r1", verb: "Ran", target: "pnpm vitest run hooks", meta: "56 passed", duration: 2 },
]

const findBeats: Beat[] = [
  action("Reading", "package.json"),
  action("Searching the web for", "“debounce vs throttle search input”"),
  action("Listing", "app/search"),
  action("Reading", "hooks/use-results.ts"),
  action("Reading", "vitest.config.ts"),
  action("Searching for", "“fetch(”", 1),
  action("Searching for", "“debounce”"),
  { hold: 1, summary: "Read 2 files, searched the web once, listed a folder" },
  action("Reading", "lib/search.ts"),
]

const hookBeats: Beat[] = [
  action("Searching the web for", "“vitest fake timers debounce”", 1),
  action("Creating", "hooks/use-debounced-value.ts"),
]

const useBeats: Beat[] = [
  action("Reading", "package.json", 1),
  action("Searching the web for", "“debounce vs throttle search input”"),
  {
    hold: 3,
    summary: "Read a file, searched the web once",
    verb: "Editing",
    target: "components/search.tsx",
  },
]

const cancelBeats: Beat[] = [
  action("Reading", "lib/api.ts"),
  action("Reading", "hooks/index.ts"),
  { hold: 1, summary: "Read 2 files" },
  action("Listing", "hooks"),
  {
    hold: 3,
    summary: "Read 2 files, listed a folder",
    verb: "Editing",
    target: "lib/search.ts",
  },
]

const testBeats: Beat[] = [
  action("Reading", "components/search-results.tsx"),
  action("Creating", "hooks/use-debounced-value.test.ts"),
]

const runBeats: Beat[] = [action("Running", "pnpm vitest run hooks", 3)]

const SCENES: Scene[] = [
  {
    explanation: FIRST_PLAN,
    seconds: 16,
    beats: findBeats,
    todos: [
      step("find", "Find where search fetches results", "Finding where search fetches results", "in_progress"),
      step("hook", "Add a debounced value hook", "Adding a debounced value hook", "pending"),
      step("use", "Use it in the search box", "Wiring it into the search box", "backlog"),
      step("docs", "Update the docs", "Updating the docs", "backlog"),
      step("test", "Add a test for the delay", "Writing a test for the delay", "backlog"),
      step("run", "Run the tests", "Running the tests", "backlog"),
    ],
  },
  {
    explanation: FIRST_PLAN,
    seconds: 3,
    beats: hookBeats,
    todos: [
      step("find", "Find where search fetches results", "Finding where search fetches results", "completed", {
        duration: 16,
        summary: "Read 5 files, searched the web once, listed a folder",
        activities: findActivities,
      }),
      step("hook", "Add a debounced value hook", "Adding a debounced value hook", "in_progress"),
      step("use", "Use it in the search box", "Wiring it into the search box", "pending"),
      step("docs", "Update the docs", "Updating the docs", "backlog"),
      step("test", "Add a test for the delay", "Writing a test for the delay", "backlog"),
      step("run", "Run the tests", "Running the tests", "backlog"),
    ],
  },
  {
    explanation: REVISED_PLAN,
    seconds: 6,
    beats: useBeats,
    todos: [
      step("find", "Find where search fetches results", "Finding where search fetches results", "completed", {
        duration: 16,
        summary: "Read 5 files, searched the web once, listed a folder",
        activities: findActivities,
      }),
      step("hook", "Add a debounced value hook", "Adding a debounced value hook", "completed", {
        duration: 3,
        summary: "Searched the web once, searched once",
        activities: hookActivities,
      }),
      step("use", "Use it in the search box", "Wiring it into the search box", "in_progress"),
      step("cancel", "Cancel stale requests", "Cancelling stale requests", "pending"),
      step("test", "Add a test for the delay", "Writing a test for the delay", "backlog"),
      step("run", "Run the tests", "Running the tests", "backlog"),
    ],
  },
  {
    explanation: REVISED_PLAN,
    seconds: 10,
    beats: cancelBeats,
    todos: [
      step("find", "Find where search fetches results", "Finding where search fetches results", "completed", {
        duration: 16,
        summary: "Read 5 files, searched the web once, listed a folder",
        activities: findActivities,
      }),
      step("hook", "Add a debounced value hook", "Adding a debounced value hook", "completed", {
        duration: 3,
        summary: "Searched the web once, searched once",
        activities: hookActivities,
      }),
      step("use", "Use it in the search box", "Wiring it into the search box", "completed", {
        duration: 6,
        summary: "Read a file, searched the web once",
        activities: useActivities,
      }),
      step("cancel", "Cancel stale requests", "Cancelling stale requests", "in_progress"),
      step("test", "Add a test for the delay", "Writing a test for the delay", "pending"),
      step("run", "Run the tests", "Running the tests", "backlog"),
    ],
  },
  {
    explanation: REVISED_PLAN,
    seconds: 4,
    beats: testBeats,
    todos: [
      step("find", "Find where search fetches results", "Finding where search fetches results", "completed", {
        duration: 16,
        summary: "Read 5 files, searched the web once, listed a folder",
        activities: findActivities,
      }),
      step("hook", "Add a debounced value hook", "Adding a debounced value hook", "completed", {
        duration: 3,
        summary: "Searched the web once, searched once",
        activities: hookActivities,
      }),
      step("use", "Use it in the search box", "Wiring it into the search box", "completed", {
        duration: 6,
        summary: "Read a file, searched the web once",
        activities: useActivities,
      }),
      step("cancel", "Cancel stale requests", "Cancelling stale requests", "completed", {
        duration: 10,
        summary: "Read a file, edited a file",
        activities: cancelActivities,
      }),
      step("test", "Add a test for the delay", "Writing a test for the delay", "in_progress"),
      step("run", "Run the tests", "Running the tests", "pending"),
    ],
  },
  {
    explanation: REVISED_PLAN,
    seconds: 3,
    beats: runBeats,
    todos: [
      step("find", "Find where search fetches results", "Finding where search fetches results", "completed", {
        duration: 16,
        summary: "Read 5 files, searched the web once, listed a folder",
        activities: findActivities,
      }),
      step("hook", "Add a debounced value hook", "Adding a debounced value hook", "completed", {
        duration: 3,
        summary: "Searched the web once, searched once",
        activities: hookActivities,
      }),
      step("use", "Use it in the search box", "Wiring it into the search box", "completed", {
        duration: 6,
        summary: "Read a file, searched the web once",
        activities: useActivities,
      }),
      step("cancel", "Cancel stale requests", "Cancelling stale requests", "completed", {
        duration: 10,
        summary: "Read a file, edited a file",
        activities: cancelActivities,
      }),
      step("test", "Add a test for the delay", "Writing a test for the delay", "completed", {
        duration: 4,
        summary: "Read a file, created a test",
        activities: testActivities,
      }),
      step("run", "Run the tests", "Running the tests", "in_progress"),
    ],
  },
  {
    explanation: REVISED_PLAN,
    seconds: 0,
    closing: CLOSING,
    todos: [
      step("find", "Find where search fetches results", "Finding where search fetches results", "completed", {
        duration: 16,
        summary: "Read 5 files, searched the web once, listed a folder",
        activities: findActivities,
      }),
      step("hook", "Add a debounced value hook", "Adding a debounced value hook", "completed", {
        duration: 3,
        summary: "Searched the web once, searched once",
        activities: hookActivities,
      }),
      step("use", "Use it in the search box", "Wiring it into the search box", "completed", {
        duration: 6,
        summary: "Read a file, searched the web once",
        activities: useActivities,
      }),
      step("cancel", "Cancel stale requests", "Cancelling stale requests", "completed", {
        duration: 10,
        summary: "Read a file, edited a file",
        activities: cancelActivities,
      }),
      step("test", "Add a test for the delay", "Writing a test for the delay", "completed", {
        duration: 4,
        summary: "Read a file, created a test",
        activities: testActivities,
      }),
      step("run", "Run the tests", "Running the tests", "completed", {
        duration: 3,
        summary: "Ran the test suite",
        activities: runActivities,
      }),
    ],
  },
]

function paint(scene: Scene, live: number): Todo[] {
  const shown = scene.beats?.length ? beatAt(scene.beats, live) : null
  return scene.todos.map((todo) => {
    if (todo.status !== "in_progress") return todo
    if (!shown) return { ...todo, duration: live }
    const { beat, into } = shown
    const activities =
      beat.verb && beat.target
        ? [
            {
              id: `${beat.verb}-${beat.target}`,
              verb: beat.verb,
              target: beat.target,
              running: true,
              duration: into,
            },
          ]
        : []
    return {
      ...todo,
      duration: live,
      summary: beat.summary,
      activities,
    }
  })
}

export function AgentRunTimeline() {
  const [sceneIndex, setSceneIndex] = React.useState(0)
  const [live, setLive] = React.useState(0)
  const [stopped, setStopped] = React.useState(false)
  const [draft, setDraft] = React.useState("")
  const scroller = React.useRef<HTMLDivElement>(null)
  const sceneIndexRef = React.useRef(sceneIndex)
  const stoppedRef = React.useRef(stopped)

  React.useEffect(() => {
    sceneIndexRef.current = sceneIndex
    stoppedRef.current = stopped
  }, [sceneIndex, stopped])

  const scene = SCENES[sceneIndex]
  const todos = paint(scene, live)
  const running = scene.todos.some((todo) => todo.status === "in_progress") && !stopped

  React.useEffect(() => {
    let seconds = 0
    const id = window.setInterval(() => {
      if (stoppedRef.current) return
      const index = sceneIndexRef.current
      const current = SCENES[index]
      if (!current || current.seconds === 0) return
      seconds += 1
      if (seconds >= current.seconds) {
        seconds = 0
        setLive(0)
        setSceneIndex((value) =>
          value === index ? Math.min(value + 1, SCENES.length - 1) : value
        )
        return
      }
      setLive(seconds)
    }, 1000)
    return () => window.clearInterval(id)
  }, [])

  React.useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight })
  }, [sceneIndex])

  return (
    <div className="flex h-full min-h-[720px] flex-col bg-background text-foreground">
      <div ref={scroller} className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-[664px] flex-col gap-4 px-6 py-10">
          <div className="flex">
            <p className="ms-auto w-fit max-w-[80%] rounded-full bg-muted px-3 py-2 text-sm leading-relaxed">
              {USER_MESSAGE}
            </p>
          </div>
          <p className="text-sm font-medium">{OPENING}</p>
          <TaskList todos={todos} explanation={scene.explanation} />
          {scene.closing ? (
            <p className="pt-4 text-sm font-medium">{scene.closing}</p>
          ) : null}
        </div>
      </div>
      <form
        className="mx-auto flex w-full max-w-[640px] flex-col gap-2 px-4 pt-2 pb-4"
        onSubmit={(event) => {
          event.preventDefault()
          setDraft("")
        }}
      >
        <StatusPill todos={todos} explanation={scene.explanation} />
        <div className="flex items-end gap-2 rounded-full border border-border py-1.5 ps-4 pe-1.5">
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault()
                setDraft("")
              }
            }}
            rows={1}
            aria-label="Message"
            placeholder="Ask for a change"
            className="max-h-32 min-h-8 flex-1 resize-none bg-transparent py-1.5 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            aria-label={running ? "Stop" : "Send message"}
            onClick={() => {
              if (running) setStopped(true)
              else setDraft("")
            }}
            className="mb-0.5 flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-foreground text-background"
          >
            {running ? (
              <SquareIcon className="size-3.5 fill-current" />
            ) : (
              <ArrowUpIcon className="size-4" />
            )}
          </button>
        </div>
        <p className="sr-only">Press Enter to send and Shift Enter for a new line.</p>
      </form>
    </div>
  )
}
