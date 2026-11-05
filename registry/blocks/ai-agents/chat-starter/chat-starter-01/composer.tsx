"use client"

import * as React from "react"
import {
  ArrowUpIcon,
  InfinityIcon,
  PaperclipIcon,
  SparklesIcon,
  SquareIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

export type ChatStarterComposerProps = {
  value: string
  onValueChange: (value: string) => void
  onSubmit: () => void
  onStop: () => void
  busy: boolean
  model?: string | null
  provider?: string | null
  messageCount: number
  className?: string
}

export function ChatStarterComposer({
  value,
  onValueChange,
  onSubmit,
  onStop,
  busy,
  model,
  provider,
  messageCount,
  className,
}: ChatStarterComposerProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    onSubmit()
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      onSubmit()
    }
  }

  return (
    <div className={cn("flex w-full flex-col gap-2.5", className)}>
      <form
        onSubmit={submit}
        className={cn(
          "flex h-[52px] w-full items-center gap-2.5 rounded-full border border-border/70 p-2 shadow-xs",
          busy ? "bg-muted/40" : "bg-card"
        )}
      >
        <button
          type="button"
          aria-label="Add attachment"
          className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
        >
          <PaperclipIcon className="size-4" aria-hidden />
        </button>

        <label className="sr-only" htmlFor="chat-starter-composer-input">
          Message
        </label>
        <input
          id="chat-starter-composer-input"
          ref={inputRef}
          type="text"
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Ask me anything"
          autoComplete="off"
          className="h-5 min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />

        {model ? (
          <span
            className="flex h-8 shrink-0 items-center gap-1 rounded-xl px-2 text-xs font-medium text-muted-foreground"
            title={`Answering with ${model}`}
          >
            <SparklesIcon className="size-3.5 shrink-0" aria-hidden />
            <span className="hidden max-w-[13ch] truncate sm:inline">
              {shortModel(model)}
            </span>
          </span>
        ) : null}

        <div className="flex shrink-0 items-center gap-2 ps-1.5">
          {busy ? (
            <button
              type="button"
              onClick={onStop}
              aria-label="Stop generating"
              className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
            >
              <SquareIcon className="size-3.5 fill-current" aria-hidden />
            </button>
          ) : (
            <button
              type="submit"
              aria-label="Send message"
              disabled={value.trim().length === 0}
              className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowUpIcon className="size-4" aria-hidden />
            </button>
          )}
        </div>
      </form>

      <div className="flex h-[26px] w-full items-center justify-between px-0.5">
        <StatusItem
          icon={InfinityIcon}
          label={provider ?? "Not configured"}
        />
        <StatusItem
          icon={SparklesIcon}
          label={
            messageCount === 0 ? "New chat" : `${messageCount} messages`
          }
        />
      </div>
    </div>
  )
}

function StatusItem({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
}) {
  return (
    <span className="flex items-center gap-1">
      <Icon className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
      <span className="whitespace-nowrap text-xs font-medium text-muted-foreground">
        {label}
      </span>
    </span>
  )
}

function shortModel(model: string) {
  const slash = model.lastIndexOf("/")
  return slash === -1 ? model : model.slice(slash + 1)
}
