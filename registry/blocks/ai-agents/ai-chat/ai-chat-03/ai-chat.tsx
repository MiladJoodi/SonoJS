"use client"

import * as React from "react"
import {
  ArrowUpIcon,
  PaperclipIcon,
  PlusIcon,
  Settings2Icon,
  ZapIcon,
} from "lucide-react"

import { Bubble, BubbleContent } from "@sonojs/ui/components/bubble"
import { Button } from "@sonojs/ui/components/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@sonojs/ui/components/input-group"
import {
  Message,
  MessageContent,
} from "@sonojs/ui/components/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@sonojs/ui/components/message-scroller"
import { cn } from "@/lib/utils"

type ChatStatus = "ready" | "submitted"

type DemoMessage = {
  id: string
  role: "user" | "assistant"
  content: string
}

const INITIAL_MESSAGES: DemoMessage[] = [
  {
    id: "intro",
    role: "assistant",
    content:
      "Hi, I am your workspace assistant. I can draft copy, summarize documents, and turn notes into tasks. What are you working on?",
  },
  {
    id: "question",
    role: "user",
    content: "Summarize the Q3 launch plan in three bullets.",
  },
  {
    id: "answer",
    role: "assistant",
    content:
      "- **Ship the new onboarding** by Sept 18 with an A/B test on pricing.\n- **Open EU and APAC** with localized checkout.\n- **Launch the partner API** in private beta with 12 partners.",
  },
]

const SUGGESTIONS = [
  "Draft a launch announcement",
  "List open risks",
  "Turn this into tasks",
] as const

const RESPONSES = [
  "Here is a quick outline you can reuse:\n\n1. Swap the mock response with a real API call.\n2. Stream tokens into the assistant bubble.\n3. Keep the layout as-is for a consistent UI.",
  "If you want multi-model support, add a small model selector to the prompt footer and pass the selection to your backend.",
  "You can also inject tools like file upload or voice input by adding buttons to the prompt footer.",
] as const

function renderRichText(content: string) {
  return content.split("\n\n").map((paragraph, i) => (
    <p key={i} className="whitespace-pre-wrap text-pretty leading-relaxed">
      {paragraph.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={j} className="font-semibold">
              {part.slice(2, -2)}
            </strong>
          )
        }
        return <React.Fragment key={j}>{part}</React.Fragment>
      })}
    </p>
  ))
}

export default function AiChat03() {
  const [messages, setMessages] =
    React.useState<DemoMessage[]>(INITIAL_MESSAGES)
  const [inputValue, setInputValue] = React.useState("")
  const [status, setStatus] = React.useState<ChatStatus>("ready")
  const replyIndexRef = React.useRef(0)
  const timerRef = React.useRef<number | null>(null)

  React.useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    },
    []
  )

  const handleSend = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || status !== "ready") return

    setMessages((prev) => [
      ...prev,
      { id: `user-${crypto.randomUUID()}`, role: "user", content: trimmed },
    ])
    setInputValue("")
    setStatus("submitted")

    const reply = RESPONSES[replyIndexRef.current % RESPONSES.length]!
    replyIndexRef.current += 1

    timerRef.current = window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${crypto.randomUUID()}`,
          role: "assistant",
          content: reply,
        },
      ])
      setStatus("ready")
      timerRef.current = null
    }, 1200)
  }

  const handleReset = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setMessages(INITIAL_MESSAGES.slice(0, 1))
    setInputValue("")
    setStatus("ready")
  }

  return (
    <div className="w-full bg-white px-4 py-10 dark:bg-background">
      <div className="mx-auto flex h-140 w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft">
        <header className="flex items-center justify-between gap-4 border-b border-border/60 px-5 py-4">
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-tight">
              Assistant
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Online
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              className="h-8 gap-1.5 px-2.5 text-xs"
              onClick={handleReset}
              size="sm"
              variant="ghost"
            >
              <PlusIcon className="size-4" aria-hidden />
              New chat
            </Button>
            <Button
              type="button"
              aria-label="Settings"
              title="Settings"
              className="size-8"
              size="icon-sm"
              variant="ghost"
            >
              <Settings2Icon className="size-4" aria-hidden />
            </Button>
          </div>
        </header>

        <MessageScrollerProvider autoScroll={false}>
          <MessageScroller className="min-h-0 flex-1">
            <MessageScrollerViewport>
              <MessageScrollerContent className="gap-5 px-5 py-5">
                {messages.map((message) => {
                  const mine = message.role === "user"
                  return (
                    <MessageScrollerItem
                      key={message.id}
                      messageId={message.id}
                      scrollAnchor={mine}
                    >
                      <Message align={mine ? "end" : "start"}>
                        <MessageContent
                          className={cn(
                            "gap-1.5",
                            !mine && "max-w-prose"
                          )}
                        >
                          {mine ? (
                            <Bubble align="end" variant="default">
                              <BubbleContent className="rounded-2xl rounded-ee-md whitespace-pre-wrap text-pretty leading-relaxed">
                                {message.content}
                              </BubbleContent>
                            </Bubble>
                          ) : (
                            <Bubble align="start" variant="ghost">
                              <BubbleContent className="flex flex-col gap-3 px-0">
                                {renderRichText(message.content)}
                              </BubbleContent>
                            </Bubble>
                          )}
                        </MessageContent>
                      </Message>
                    </MessageScrollerItem>
                  )
                })}

                {status === "submitted" ? (
                  <MessageScrollerItem messageId="typing">
                    <Message align="start">
                      <output
                        aria-label="Assistant is typing"
                        className="flex h-7 items-center gap-1"
                      >
                        {[0, 1, 2].map((dot) => (
                          <span
                            className="size-1.5 animate-bounce rounded-full bg-muted-foreground/60"
                            key={dot}
                            style={{ animationDelay: `${dot * 150}ms` }}
                          />
                        ))}
                      </output>
                    </Message>
                  </MessageScrollerItem>
                ) : null}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>

        <div className="flex flex-col gap-3 p-3">
          <div className="flex flex-wrap gap-2 px-1">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                disabled={status !== "ready"}
                onClick={() => handleSend(suggestion)}
                className="cursor-pointer rounded-full border border-border/70 bg-white px-3 py-1.5 text-xs text-muted-foreground transition-[color,background-color,scale] hover:bg-muted hover:text-foreground active:scale-[0.96] disabled:pointer-events-none disabled:opacity-50 motion-reduce:active:scale-100 dark:bg-card"
              >
                {suggestion}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend(inputValue)
            }}
          >
            <InputGroup className="h-13 rounded-full border border-border/70 bg-white px-2.5 shadow-xs has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-0 dark:bg-card">
              <InputGroupAddon align="inline-start">
                <InputGroupButton
                  type="button"
                  aria-label="Attach file"
                  size="icon-sm"
                  variant="ghost"
                  className="rounded-full border border-transparent text-muted-foreground hover:border-border/70 hover:bg-muted/60 hover:text-foreground"
                >
                  <PaperclipIcon className="size-4" aria-hidden />
                </InputGroupButton>
                <InputGroupButton
                  type="button"
                  aria-label="Quick prompt"
                  size="icon-sm"
                  variant="ghost"
                  className="rounded-full border border-transparent text-muted-foreground hover:border-border/70 hover:bg-muted/60 hover:text-foreground"
                >
                  <ZapIcon className="size-4" aria-hidden />
                </InputGroupButton>
              </InputGroupAddon>
              <InputGroupInput
                value={inputValue}
                placeholder="Message Assistant..."
                aria-label="Message Assistant"
                className="text-[15px] md:text-[15px]"
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSend(inputValue)
                  }
                }}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  type="submit"
                  aria-label="Send"
                  size="icon-sm"
                  variant="default"
                  className="rounded-full transition-[scale,opacity] active:scale-[0.96] motion-reduce:active:scale-100"
                  disabled={!inputValue.trim() || status !== "ready"}
                >
                  <ArrowUpIcon className="size-4" aria-hidden />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </form>
        </div>
      </div>
    </div>
  )
}
