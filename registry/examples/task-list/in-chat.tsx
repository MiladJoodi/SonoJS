"use client"

import * as React from "react"
import {
  FileCodeIcon,
  MicIcon,
  PaperclipIcon,
  RotateCcwIcon,
  SearchIcon,
  SparklesIcon,
} from "lucide-react"

import { ReactIcon } from "@/components/icons"
import {
  PromptInput2,
  type PromptAction,
  type PromptModel,
} from "@sonojs/ui/components/prompt-input-2"
import { TaskList, type TaskListTask } from "@sonojs/ui/components/task-list"

const reactChip = (label: string) => ({
  label,
  icon: <ReactIcon className="size-3.5 text-[#61dafb]" />,
})

const tasks: TaskListTask[] = [
  {
    title: "Found project files",
    runningTitle: "Searching project files",
    icon: SearchIcon,
    steps: [
      { label: 'Searching "app/page.tsx, components structure"' },
      {
        label: "Read",
        chips: [reactChip("page.tsx"), reactChip("layout.tsx")],
      },
      { label: "Scanning 52 files" },
      {
        label: "Reading files",
        chips: [reactChip("layout.tsx")],
      },
    ],
  },
  {
    title: "Registered the theme toggle",
    runningTitle: "Wiring the theme toggle",
    icon: FileCodeIcon,
    steps: [
      {
        label: "Created",
        chips: [reactChip("theme-toggle.tsx")],
      },
      {
        label: "Wired it into",
        chips: [reactChip("layout.tsx")],
      },
      { label: "Ran lint and type-check, 0 errors" },
    ],
  },
]

const PROMPT = "Add a dark mode toggle to the dashboard"

const models: PromptModel[] = [
  {
    value: "sono-fast",
    label: "Sono Fast",
    icon: <SparklesIcon />,
  },
]

const actions: PromptAction[] = [
  {
    value: "attach",
    label: "Add attachment",
    description: "Attach a file to the prompt",
    icon: <PaperclipIcon />,
  },
]

type Phase = "idle" | "running" | "answered"

export function TaskListInChat() {
  const [phase, setPhase] = React.useState<Phase>("idle")
  const [turnId, setTurnId] = React.useState(0)
  const [draft, setDraft] = React.useState(PROMPT)
  const [userMessage, setUserMessage] = React.useState<string | null>(null)
  const scrollerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [phase, turnId, userMessage])

  const send = (value: string) => {
    const text = value.trim()
    if (!text || phase === "running") return
    setUserMessage(text)
    setDraft(PROMPT)
    setTurnId((n) => n + 1)
    setPhase("running")
  }

  const reset = () => {
    setPhase("idle")
    setUserMessage(null)
    setDraft(PROMPT)
    setTurnId((n) => n + 1)
  }

  return (
    <div className="mx-auto flex h-[34rem] w-full max-w-lg flex-col overflow-hidden rounded-[14px] border border-border/70 bg-background">
      <div
        ref={scrollerRef}
        className="scrollbar-soft flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 py-5"
      >
        {phase === "idle" ? (
          <p className="m-auto text-center text-sm text-muted-foreground">
            Send the message to start the run.
          </p>
        ) : (
          <>
            {userMessage ? (
              <div className="ms-auto max-w-[85%] rounded-2xl bg-muted px-3.5 py-2.5 text-sm leading-relaxed text-foreground">
                {userMessage}
              </div>
            ) : null}

            <div className="me-auto flex w-full max-w-[94%] flex-col items-start gap-3">
              <TaskList
                key={turnId}
                tasks={tasks}
                startDelay={320}
                stepInterval={700}
                onComplete={() => setPhase("answered")}
              />

              {phase === "answered" ? (
                <>
                  <div className="space-y-1 text-sm leading-relaxed text-muted-foreground">
                    <p>
                      Done. The toggle lives in the header and persists the
                      choice to localStorage, so a reload keeps it.
                    </p>
                    <p>
                      It reads the system preference only on first visit, then
                      the manual choice wins.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex cursor-pointer items-center gap-1.5 self-start rounded-lg border border-border/70 bg-background px-2.5 py-1.5 text-xs font-medium text-muted-foreground shadow-xs outline-none transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <RotateCcwIcon className="size-3.5" />
                    Run again
                  </button>
                </>
              ) : null}
            </div>
          </>
        )}
      </div>

      <div className="shrink-0 border-t border-border/60 p-3">
        <PromptInput2
          value={draft}
          onValueChange={setDraft}
          models={models}
          defaultModel="sono-fast"
          actions={actions}
          loading={phase === "running"}
          disabled={phase === "running"}
          minRows={1}
          maxRows={4}
          placeholder="Ask me anything"
          leadingAction={
            <button
              type="button"
              aria-label="Voice input"
              disabled={phase === "running"}
              className="inline-flex size-8 cursor-pointer items-center justify-center rounded-full text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              <MicIcon className="size-4" />
            </button>
          }
          onSubmit={(value) => send(value)}
          className="border-border/60 shadow-none"
        />
      </div>
    </div>
  )
}
