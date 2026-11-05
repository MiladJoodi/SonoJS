"use client"

import * as React from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, type UIMessage } from "ai"
import { MenuIcon, XIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Spinner } from "@sonojs/ui/components/spinner"
import { cn } from "@/lib/utils"

import { ChatStarterActions } from "./actions"
import { ChatStarterComposer } from "./composer"
import { DemoTransport, SwitchingTransport } from "./demo-transport"
import {
  ChatStarterHistory,
  type ChatThreadSummary,
} from "./history"
import { ChatStarterMessage } from "./message"
import { ChatStarterNavRail } from "./nav-rail"

const ENDPOINT = "/api/chat"
const STORAGE_KEY = "sonojs:chat-starter-threads"
const DEMO_KEY = "sonojs:chat-starter-demo"
const MAX_THREADS = 30

const SUGGESTIONS = [
  "Explain what this starter does",
  "Write a product update in three sentences",
  "Give me five names for a scheduling app",
]

type StoredThread = ChatThreadSummary & {
  messages: UIMessage[]
  messageAt: Record<string, number>
}

type Probe = {
  status: "checking" | "ready" | "unconfigured"
  provider: string | null
  label: string | null
  model: string | null
}

export type ChatStarterProps = {
  className?: string
  /** Docs preview: fill the frame height and prefer demo mode. */
  contained?: boolean
}

export default function ChatStarter({
  className,
  contained = false,
}: ChatStarterProps) {
  const [probe, setProbe] = React.useState<Probe>({
    status: contained ? "unconfigured" : "checking",
    provider: null,
    label: null,
    model: null,
  })
  const [input, setInput] = React.useState("")
  const [navOpen, setNavOpen] = React.useState(false)
  const [threads, setThreads] = React.useState<StoredThread[]>([])
  const [activeId, setActiveId] = React.useState("")
  const [activeUpdatedAt, setActiveUpdatedAt] = React.useState(0)
  const [activeTitle, setActiveTitle] = React.useState<string | null>(null)
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const titleRef = React.useRef<HTMLSpanElement>(null)
  const columnRef = React.useRef<HTMLDivElement>(null)
  const [messageAt, setMessageAt] = React.useState<Record<string, number>>({})
  const [scrolledUnder, setScrolledUnder] = React.useState(false)
  const [canClash, setCanClash] = React.useState(false)
  const [restored, setRestored] = React.useState(false)
  const [demo, setDemo] = React.useState(contained)

  const demoActive =
    demo && (probe.status === "unconfigured" || contained)

  const [transport] = React.useState(
    () =>
      new SwitchingTransport(
        new DefaultChatTransport({ api: ENDPOINT }),
        new DemoTransport()
      )
  )

  React.useEffect(() => {
    if (contained) return
    try {
      setDemo(window.localStorage.getItem(DEMO_KEY) === "on")
    } catch {
      // Storage blocked.
    }
  }, [contained])

  const enterDemo = () => {
    setDemo(true)
    try {
      window.localStorage.setItem(DEMO_KEY, "on")
    } catch {
      // Nothing to remember.
    }
  }

  const { messages, sendMessage, setMessages, status, stop, error } = useChat({
    transport,
  })

  const busy = status === "submitted" || status === "streaming"

  const streamedText = React.useMemo(() => {
    const last = messages[messages.length - 1]
    if (!last || last.role !== "assistant") return ""
    return last.parts
      .filter((part) => part.type === "text")
      .map((part) => (part as { text: string }).text)
      .join("")
  }, [messages])
  const showThinking = busy && streamedText.length === 0

  const transcript = React.useMemo(
    () =>
      messages
        .map(
          (message) =>
            `${message.role === "user" ? "You" : "Assistant"}: ${messageText(message)}`
        )
        .filter((line) => !line.endsWith(": "))
        .join("\n\n"),
    [messages]
  )

  React.useEffect(() => {
    if (contained) return
    let cancelled = false
    fetch(ENDPOINT, { method: "GET" })
      .then((res) => (res.ok ? res.json() : null))
      .then(
        (
          data: {
            configured?: boolean
            provider?: string
            providerLabel?: string
            model?: string
          } | null
        ) => {
          if (cancelled) return
          setProbe({
            status:
              data && data.configured === false ? "unconfigured" : "ready",
            provider: data?.provider ?? null,
            label: data?.providerLabel ?? null,
            model: data?.model ?? null,
          })
        }
      )
      .catch(() => {
        if (!cancelled) {
          setProbe({
            status: "ready",
            provider: null,
            label: null,
            model: null,
          })
        }
      })
    return () => {
      cancelled = true
    }
  }, [contained])

  React.useEffect(() => {
    setActiveId(newThreadId())
    setThreads(orderThreads(readThreads()))
    setRestored(true)
  }, [])

  const liveThread: StoredThread | null = React.useMemo(
    () =>
      activeId && messages.length > 0
        ? {
            id: activeId,
            title: activeTitle ?? deriveTitle(messages),
            updatedAt: activeUpdatedAt,
            messages,
            messageAt,
          }
        : null,
    [activeId, messages, activeUpdatedAt, messageAt, activeTitle]
  )

  const allThreads = React.useMemo(() => {
    const rest = threads.filter((thread) => thread.id !== activeId)
    return orderThreads(liveThread ? [liveThread, ...rest] : rest)
  }, [liveThread, threads, activeId])

  React.useEffect(() => {
    if (!restored || busy) return
    writeThreads(allThreads)
  }, [restored, busy, allThreads])

  React.useEffect(() => {
    const unseen = messages.filter(
      (message) => messageAt[message.id] === undefined
    )
    if (unseen.length === 0) return
    const now = Date.now()
    setMessageAt((prev) => {
      const next = { ...prev }
      for (const message of unseen) next[message.id] = now
      return next
    })
  }, [messages, messageAt])

  React.useEffect(() => {
    const measure = () => {
      const title = titleRef.current?.getBoundingClientRect()
      const column = columnRef.current?.getBoundingClientRect()
      if (!title || !column) return
      setCanClash(title.right + 16 > column.left)
    }
    measure()
    const observer = new ResizeObserver(measure)
    if (scrollRef.current) observer.observe(scrollRef.current)
    return () => observer.disconnect()
  }, [messages.length, activeId])

  React.useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [messages, busy])

  const submit = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || busy) return
    setActiveUpdatedAt(Date.now())
    void sendMessage({ text: trimmed }, { body: { demo: demoActive } })
    setInput("")
  }

  const keepLiveThread = React.useCallback(() => {
    if (!liveThread) return
    setThreads((prev) =>
      orderThreads([
        liveThread,
        ...prev.filter((thread) => thread.id !== liveThread.id),
      ])
    )
  }, [liveThread])

  const startNewChat = React.useCallback(() => {
    if (busy) return
    keepLiveThread()
    setActiveId(newThreadId())
    setActiveUpdatedAt(0)
    setActiveTitle(null)
    setMessageAt({})
    setMessages([])
    setInput("")
  }, [busy, keepLiveThread, setMessages])

  const renameThread = React.useCallback(
    (id: string, title: string) => {
      if (id === activeId) setActiveTitle(title)
      setThreads((prev) =>
        prev.map((thread) =>
          thread.id === id ? { ...thread, title } : thread
        )
      )
    },
    [activeId]
  )

  const toggleUnread = React.useCallback((id: string) => {
    setThreads((prev) =>
      prev.map((thread) =>
        thread.id === id ? { ...thread, unread: !thread.unread } : thread
      )
    )
  }, [])

  const deleteThread = React.useCallback(
    (id: string) => {
      setThreads((prev) => prev.filter((thread) => thread.id !== id))
      if (id === activeId) {
        setActiveId(newThreadId())
        setActiveUpdatedAt(0)
        setActiveTitle(null)
        setMessageAt({})
        setMessages([])
        setInput("")
      }
    },
    [activeId, setMessages]
  )

  const exportThreads = React.useCallback(() => {
    if (allThreads.length === 0) return
    const blob = new Blob([JSON.stringify(allThreads, null, 2)], {
      type: "application/json",
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "sonojs-chats.json"
    document.body.appendChild(link)
    link.click()
    link.remove()
    setTimeout(() => URL.revokeObjectURL(url), 0)
  }, [allThreads])

  const selectThread = React.useCallback(
    (id: string) => {
      if (busy || id === activeId) return
      const thread = allThreads.find((candidate) => candidate.id === id)
      if (!thread) return
      keepLiveThread()
      if (thread.unread) toggleUnread(id)
      setActiveId(id)
      setActiveUpdatedAt(thread.updatedAt)
      setActiveTitle(thread.title)
      setMessageAt(thread.messageAt ?? {})
      setMessages(thread.messages)
      setInput("")
    },
    [busy, activeId, allThreads, keepLiveThread, toggleUnread, setMessages]
  )

  const showSetup =
    !contained &&
    probe.status === "unconfigured" &&
    messages.length === 0 &&
    !demo

  return (
    <div
      className={cn(
        "relative flex w-full gap-4 overflow-hidden bg-background p-3",
        contained ? "h-full min-h-0" : "h-dvh",
        className
      )}
    >
      <ChatStarterNavRail
        onNewChat={startNewChat}
        className="hidden lg:flex"
      />

      {navOpen ? (
        <div
          className={cn(
            contained ? "absolute" : "fixed",
            "inset-0 z-50 flex lg:hidden"
          )}
        >
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setNavOpen(false)}
            className="absolute inset-0 cursor-pointer bg-black/40"
          />
          <div className="relative flex h-full p-3">
            <ChatStarterNavRail
              mobile
              onNewChat={startNewChat}
              onClose={() => setNavOpen(false)}
              className="flex"
            />
          </div>
        </div>
      ) : null}

      <div className="relative flex min-h-0 min-w-0 flex-1 gap-3 overflow-hidden">
        <div className="relative flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-3xl border border-border/70 bg-muted/20">
          <header
            className={cn(
              "absolute inset-x-0 top-0 z-10 flex h-12 items-center gap-2 border-b px-4 pt-[7px] transition-colors",
              scrolledUnder && canClash
                ? "border-border/70 bg-background/60 backdrop-blur-[20px]"
                : "border-transparent"
            )}
          >
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label="Open navigation"
              onClick={() => setNavOpen((open) => !open)}
              className="size-7 lg:hidden"
            >
              {navOpen ? (
                <XIcon className="size-4" />
              ) : (
                <MenuIcon className="size-4" />
              )}
            </Button>
            <span
              ref={titleRef}
              className="min-w-0 shrink truncate text-sm font-medium text-foreground"
            >
              {headerTitle(allThreads, activeId)}
            </span>

            <ChatStarterActions
              className="ms-auto"
              transcript={transcript}
              onExport={exportThreads}
              onToggleUnread={() => toggleUnread(activeId)}
              onDelete={() => deleteThread(activeId)}
              disabled={messages.length === 0}
            />
          </header>

          {showSetup ? (
            <SetupNotice onSkip={enterDemo} />
          ) : (
            <>
              <div
                ref={scrollRef}
                onScroll={(event) =>
                  setScrolledUnder(event.currentTarget.scrollTop > 0)
                }
                className="min-h-0 flex-1 overflow-y-auto scroll-smooth"
              >
                <div
                  ref={columnRef}
                  className={cn(
                    "mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 pt-[72px] pb-6",
                    messages.length === 0 && "min-h-full justify-center"
                  )}
                >
                  {messages.length === 0 ? (
                    <EmptyState onPick={submit} demo={demoActive} />
                  ) : (
                    messages.map((message, index) => (
                      <ChatStarterMessage
                        key={message.id}
                        role={message.role}
                        text={messageText(message)}
                        streaming={busy && index === messages.length - 1}
                        at={messageAt[message.id]}
                      />
                    ))
                  )}

                  {showThinking ? (
                    <div className="flex items-center gap-2 px-1 text-sm text-muted-foreground">
                      <Spinner className="size-4" />
                      Thinking
                    </div>
                  ) : null}

                  {error ? (
                    <p role="alert" className="px-1 text-sm text-muted-foreground">
                      Something went wrong. Check the server logs, then try
                      again.
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="shrink-0 px-3 pb-3">
                <div className="mx-auto w-full max-w-3xl">
                  <ChatStarterComposer
                    value={input}
                    onValueChange={setInput}
                    onSubmit={() => submit(input)}
                    onStop={stop}
                    busy={busy}
                    model={probe.model}
                    provider={
                      demoActive
                        ? "Demo mode"
                        : (probe.label ?? probe.provider)
                    }
                    messageCount={messages.length}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {!showSetup ? (
          <ChatStarterHistory
            threads={allThreads}
            activeId={activeId}
            onSelect={selectThread}
            onNewChat={startNewChat}
            onRename={renameThread}
            onToggleUnread={toggleUnread}
            onDelete={deleteThread}
            onExport={exportThreads}
            disabled={busy}
            className="hidden xl:flex"
          />
        ) : null}
      </div>
    </div>
  )
}

function EmptyState({
  onPick,
  demo = false,
}: {
  onPick: (text: string) => void
  demo?: boolean
}) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-medium text-foreground">
          What can I help with?
        </h2>
        <p className="text-sm text-muted-foreground">
          {demo
            ? "Demo mode: the answers are scripted. Add AI_API_KEY for a real model."
            : "This chat runs against your own API key. History stays in this browser."}
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => onPick(suggestion)}
            className="cursor-pointer rounded-full border border-border/70 bg-card px-3.5 py-2 text-sm text-muted-foreground shadow-xs transition-colors hover:bg-muted hover:text-foreground"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  )
}

function SetupNotice({ onSkip }: { onSkip: () => void }) {
  return (
    <div className="flex min-h-0 flex-1 items-center justify-center p-6">
      <div className="flex max-w-md flex-col gap-3 rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
        <h2 className="text-base font-medium text-foreground">
          Add an API key to start
        </h2>
        <p className="text-sm text-muted-foreground">
          The chat is wired up and ready. It needs a model provider key before
          it can answer.
        </p>
        <ol className="flex list-decimal flex-col gap-1.5 ps-5 text-sm text-muted-foreground">
          <li>
            Add <code className="text-foreground">AI_API_KEY</code> to your
            environment (OpenAI-compatible keys work out of the box).
          </li>
          <li>
            For local work, put it in <code>.env.local</code> and restart the
            dev server.
          </li>
          <li>Redeploy if you are hosting the app.</li>
        </ol>
        <Button type="button" className="w-full" onClick={onSkip}>
          Skip, show me the demo
        </Button>
      </div>
    </div>
  )
}

function orderThreads(threads: StoredThread[]) {
  return [...threads]
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, MAX_THREADS)
}

function messageText(message: UIMessage) {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => (part as { text: string }).text)
    .join("")
}

function newThreadId() {
  return (
    globalThis.crypto?.randomUUID?.() ??
    `t-${Date.now()}-${Math.random().toString(16).slice(2)}`
  )
}

function deriveTitle(messages: UIMessage[]) {
  const firstUser = messages.find((message) => message.role === "user")
  const text = firstUser?.parts
    .filter((part) => part.type === "text")
    .map((part) => (part as { text: string }).text)
    .join("")
    .trim()
  if (!text) return "New chat"
  return text.length > 48 ? `${text.slice(0, 48)}...` : text
}

function headerTitle(threads: ChatThreadSummary[], activeId: string) {
  return threads.find((thread) => thread.id === activeId)?.title ?? "New chat"
}

function readThreads(): StoredThread[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (thread): thread is StoredThread =>
        typeof thread === "object" &&
        thread !== null &&
        typeof (thread as StoredThread).id === "string" &&
        Array.isArray((thread as StoredThread).messages)
    )
  } catch {
    return []
  }
}

function writeThreads(threads: StoredThread[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(threads))
  } catch {
    // Quota or blocked storage.
  }
}
