"use client"

import * as React from "react"
import { ArrowUpIcon, CloudIcon, ImageIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import { Textarea } from "@sonojs/ui/components/textarea"
import { cn } from "@/lib/utils"

const MODELS = [
  {
    value: "gpt-5",
    name: "GPT-5",
    description: "Most advanced model",
    max: true,
  },
  {
    value: "gpt-4o",
    name: "GPT-4o",
    description: "Fast and capable",
  },
  {
    value: "claude-3.5",
    name: "Claude 3.5 Sonnet",
    description: "Great for coding tasks",
  },
] as const

const REPLIES = [
  "Got it — I'd start with a clear outline, then fill in setup, API surface, and a couple of real usage examples.",
  "Here's a tight plan: measure the hot path, cut unused work, and cache the expensive reads first.",
  "I'll scan for the three highest-impact bugs, patch them, and note why each fix is safe.",
  "Sounds good. I can break that into small steps and ship a clean first draft you can iterate on.",
] as const

type Turn = {
  id: string
  role: "user" | "assistant"
  text: string
}

const SAMPLE_TURNS: Turn[] = [
  {
    id: "sample-u1",
    role: "user",
    text: "Build a login form with email and password.",
  },
  {
    id: "sample-a1",
    role: "assistant",
    text: "Done — email, password, and a Sign in button with SonoJS Field and Button.",
  },
  {
    id: "sample-u2",
    role: "user",
    text: "Add a forgot-password link under the form.",
  },
  {
    id: "sample-a2",
    role: "assistant",
    text: "Added. Centered muted link under the actions — works in LTR and RTL.",
  },
]

function MaxBadge() {
  return (
    <span className="inline-flex h-3.75 items-center rounded-[4px] border border-border/80 bg-muted/40 px-1.25">
      <span
        className="text-[9px] font-bold uppercase leading-none tracking-[0.06em]"
        style={{
          background:
            "linear-gradient(to right, rgb(129, 161, 193), rgb(125, 124, 155))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        MAX
      </span>
    </span>
  )
}

/** ChatGPT-style radial tick spinner */
function ThinkingSpinner({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      role="status"
      aria-label="Thinking"
      className={cn(
        "size-3.5 shrink-0 origin-center text-muted-foreground motion-safe:animate-spin motion-safe:duration-700",
        className
      )}
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

function replyFor(prompt: string, modelName: string): string {
  const lower = prompt.toLowerCase()
  if (lower.includes("documentation") || lower.includes("docs")) {
    return REPLIES[0]
  }
  if (lower.includes("performance") || lower.includes("optim")) {
    return REPLIES[1]
  }
  if (lower.includes("bug")) {
    return REPLIES[2]
  }
  return `${REPLIES[3]} (${modelName})`
}

/**
 * Home-only interactive chat-composer-02 showcase.
 * Starts with a filled sample thread; sends still work with thinking + reply.
 */
export function HomeChatComposer() {
  const [inputValue, setInputValue] = React.useState("")
  const [modelValue, setModelValue] = React.useState<string>(MODELS[0].value)
  const [turns, setTurns] = React.useState<Turn[]>(SAMPLE_TURNS)
  const [thinking, setThinking] = React.useState(false)
  const selectedModel =
    MODELS.find((m) => m.value === modelValue) ?? MODELS[0]
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const threadRef = React.useRef<HTMLDivElement>(null)
  const timerRef = React.useRef<number | null>(null)
  const replyIndexRef = React.useRef(0)

  React.useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    },
    []
  )

  React.useEffect(() => {
    const el = threadRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [turns, thinking])

  const send = () => {
    const text = inputValue.trim()
    if (!text || thinking) return

    const userTurn: Turn = {
      id: `u-${Date.now()}`,
      role: "user",
      text,
    }
    setTurns((prev) => [...prev.slice(-4), userTurn])
    setInputValue("")
    setThinking(true)

    if (timerRef.current) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      const canned = replyFor(text, selectedModel.name)
      const fallback =
        REPLIES[replyIndexRef.current % REPLIES.length] ?? REPLIES[0]
      replyIndexRef.current += 1
      setTurns((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          text: canned || fallback,
        },
      ])
      setThinking(false)
      timerRef.current = null
    }, 1400)
  }

  const hasThread = turns.length > 0 || thinking

  return (
    <div className="mx-auto flex h-full w-full max-w-xl flex-col gap-2 overflow-visible px-0.5 pb-1 text-foreground sm:gap-3">
      {/* Thread scrolls inside; outer shell stays overflow-visible for input shadow */}
      <div
        ref={threadRef}
        className="min-h-0 flex-1 space-y-2 overflow-x-visible overflow-y-auto overscroll-contain pe-1 sm:space-y-3"
        aria-live="polite"
      >
        {hasThread ? (
          <>
            {turns.map((turn) => (
              <div
                key={turn.id}
                className={cn(
                  "flex",
                  turn.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[92%] rounded-2xl px-3 py-1.5 text-sm leading-relaxed sm:py-2",
                    turn.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "border border-border/70 bg-card text-foreground shadow-soft"
                  )}
                >
                  {turn.text}
                </div>
              </div>
            ))}

            {thinking ? (
              <div className="flex items-center gap-2 px-1 text-sm text-muted-foreground">
                <ThinkingSpinner />
                <span>Thinking</span>
              </div>
            ) : null}
          </>
        ) : (
          <p className="px-1 text-xs text-muted-foreground sm:text-sm">
            Ask anything to try the composer.
          </p>
        )}
      </div>

      <div className="flex shrink-0 cursor-text flex-col rounded-2xl border border-border/70 bg-card shadow-soft">
        <div
          className="relative max-h-20 overflow-y-auto sm:max-h-28"
          onClick={() => inputRef.current?.focus()}
        >
          <Textarea
            ref={inputRef}
            className="min-h-10 w-full resize-none wrap-break-word border-0 bg-transparent p-2.5 text-base whitespace-pre-wrap shadow-none outline-none transition-[padding] duration-200 ease-in-out focus-visible:ring-0 sm:min-h-12 sm:p-3 md:text-base dark:bg-transparent"
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                send()
              }
            }}
            onClick={(e) => e.stopPropagation()}
            placeholder="Ask anything"
            aria-label="Ask anything"
            rows={1}
            value={inputValue}
            disabled={thinking}
          />
        </div>

        <div className="flex min-h-10 items-center gap-2 p-2 pb-1">
          <div className="flex size-7 items-center justify-center rounded-full bg-muted">
            <CloudIcon className="size-4 text-muted-foreground" aria-hidden />
          </div>

          <Select value={modelValue} onValueChange={setModelValue}>
            <SelectTrigger
              size="sm"
              aria-label="Select model"
              className="h-7 max-w-[9.5rem] min-w-0 rounded-full border-transparent bg-transparent px-2 text-sm font-medium text-foreground shadow-none transition-[background-color,color] hover:bg-muted aria-expanded:bg-muted sm:max-w-none dark:bg-transparent dark:hover:bg-muted"
            >
              <SelectValue>
                <span className="flex min-w-0 items-center gap-1.5">
                  <span className="truncate">{selectedModel.name}</span>
                  {"max" in selectedModel && selectedModel.max ? (
                    <MaxBadge />
                  ) : null}
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent
              align="start"
              position="popper"
              sideOffset={6}
              className="w-64 p-1"
            >
              {MODELS.map((model) => (
                <SelectItem
                  className="rounded-md py-1.5"
                  key={model.value}
                  value={model.value}
                >
                  <span className="flex flex-col gap-0.5">
                    <span className="flex items-center gap-1.5 font-medium">
                      {model.name}
                      {"max" in model && model.max ? <MaxBadge /> : null}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {model.description}
                    </span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="ms-auto flex items-center gap-1.5">
            <Button
              type="button"
              aria-label="Attach images"
              title="Attach images"
              className="rounded-full text-muted-foreground transition-[background-color,color] hover:text-foreground"
              size="icon-sm"
              variant="ghost"
            >
              <ImageIcon className="size-4.5" aria-hidden />
            </Button>

            <Button
              type="button"
              aria-label="Send message"
              className="rounded-full transition-[background-color,scale,opacity] active:not-disabled:scale-[0.96]"
              disabled={!inputValue.trim() || thinking}
              size="icon-sm"
              onClick={send}
            >
              {thinking ? (
                <ThinkingSpinner className="size-4 text-primary-foreground" />
              ) : (
                <ArrowUpIcon className="size-4" aria-hidden />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
