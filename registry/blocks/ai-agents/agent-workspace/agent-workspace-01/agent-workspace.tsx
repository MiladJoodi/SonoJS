"use client"

import * as React from "react"
import { CheckIcon, ChevronDownIcon, ShareIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
import { Kbd } from "@sonojs/ui/components/kbd"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@sonojs/ui/components/sidebar"
import { cn } from "@/lib/utils"

import { ChatSidebar } from "./chat-sidebar"
import { CommandMenu } from "./command-menu"
import { Composer } from "./composer"
import { Conversation } from "./conversation"
import { models, replies, threads as seedThreads, user } from "./data"
import { ModelLogo } from "./logos"
import type { Attachment, Thread, Turn } from "./types"

const THINK_DELAY = 900
const TOKEN_DELAY = 40

export default function AgentWorkspace01() {
  const [threads, setThreads] = React.useState<Thread[]>(seedThreads)
  const [activeId, setActiveId] = React.useState<string | null>("heat-pump")
  const [draft, setDraft] = React.useState("")
  const [attachment, setAttachment] = React.useState<Attachment | null>(null)
  const [model, setModel] = React.useState(models[0]!.name)
  const [search, setSearch] = React.useState(false)
  const [editing, setEditing] = React.useState<{
    id: string
    text: string
  } | null>(null)
  const replyIndexRef = React.useRef(0)
  const timerRef = React.useRef<number | null>(null)

  const thread = threads.find((t) => t.id === activeId) ?? null
  const streaming = thread?.turns.some((t) => t.streaming) ?? false
  const altModel = models.find((m) => m.name !== model)?.name ?? model

  React.useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    },
    []
  )

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setSearch(true)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const patch = (threadId: string, turnId: string, fn: (t: Turn) => Turn) =>
    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId
          ? { ...t, turns: t.turns.map((m) => (m.id === turnId ? fn(m) : m)) }
          : t
      )
    )

  const clearTimer = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  const stream = (threadId: string, turnId: string) => {
    clearTimer()
    const reply = replies[replyIndexRef.current % replies.length]!
    replyIndexRef.current += 1

    patch(threadId, turnId, (t) => ({
      ...t,
      text: "",
      reasoning: reply.reasoning,
      thought: undefined,
      error: undefined,
      streaming: true,
    }))

    let shown = 0
    const tick = () => {
      shown = Math.min(
        reply.text.length,
        shown + 2 + Math.floor(Math.random() * 5)
      )
      const done = shown >= reply.text.length
      patch(threadId, turnId, (t) => ({
        ...t,
        text: reply.text.slice(0, shown),
        thought: done
          ? 4 + Math.round(reply.reasoning.length / 40)
          : t.thought,
        streaming: !done,
      }))
      timerRef.current = done
        ? null
        : window.setTimeout(tick, TOKEN_DELAY * (0.5 + Math.random()))
    }
    tick()
  }

  const stop = () => {
    clearTimer()
    const live = thread?.turns.find((t) => t.streaming)
    if (thread && live) {
      patch(thread.id, live.id, (t) => ({
        ...t,
        streaming: false,
        error: true,
      }))
    }
  }

  const send = () => {
    const text = draft.trim()
    if ((!text && !attachment) || streaming) return

    const body = text || `Shared ${attachment?.name ?? "attachment"}`
    const replyId = crypto.randomUUID()
    const turns: Turn[] = [
      { id: crypto.randomUUID(), role: "user", text: body, day: "today" },
      {
        id: replyId,
        role: "assistant",
        text: "",
        streaming: true,
        day: "today",
      },
    ]
    const id = thread?.id ?? crypto.randomUUID()

    setThreads((prev) =>
      thread
        ? [
            {
              ...thread,
              updated: "now",
              group: "today",
              turns: [
                ...thread.turns.map((t) => ({
                  ...t,
                  day: t.day ?? thread.group,
                })),
                ...turns,
              ],
            },
            ...prev.filter((t) => t.id !== id),
          ]
        : [
            {
              id,
              title: body.split(" ").slice(0, 5).join(" ") || "New chat",
              preview: body,
              updated: "now",
              group: "today",
              turns,
            },
            ...prev,
          ]
    )
    setActiveId(id)
    setDraft("")
    setAttachment(null)
    setEditing(null)
    window.setTimeout(() => stream(id, replyId), THINK_DELAY)
  }

  const retry = (turnId: string, next?: string) => {
    if (!thread) return
    if (next) setModel(next)
    patch(thread.id, turnId, (t) => ({
      ...t,
      text: "",
      thought: undefined,
      error: undefined,
      streaming: true,
    }))
    window.setTimeout(() => stream(thread.id, turnId), THINK_DELAY)
  }

  const startEdit = (turn: Turn) => {
    if (streaming || turn.role !== "user") return
    setEditing({ id: turn.id, text: turn.text })
  }

  const cancelEdit = () => setEditing(null)

  const commitEdit = () => {
    if (!thread || !editing || streaming) return
    const text = editing.text.trim()
    if (!text) return

    const at = thread.turns.findIndex((t) => t.id === editing.id)
    if (at < 0) return

    const replyId = crypto.randomUUID()
    setThreads((prev) =>
      prev.map((t) =>
        t.id !== thread.id
          ? t
          : {
              ...t,
              updated: "now",
              preview: text,
              turns: [
                ...t.turns.slice(0, at),
                { ...t.turns[at]!, text },
                {
                  id: replyId,
                  role: "assistant",
                  text: "",
                  streaming: true,
                  day: "today",
                },
              ],
            }
      )
    )
    setEditing(null)
    window.setTimeout(() => stream(thread.id, replyId), THINK_DELAY)
  }

  const activeModel = models.find((m) => m.name === model) ?? models[0]!

  return (
    <SidebarProvider
      className="h-full max-h-full min-h-0!"
      style={{ "--sidebar-width": "260px" } as React.CSSProperties}
    >
      <ChatSidebar
        activeId={activeId}
        onChange={(next) => {
          setThreads(next)
          if (activeId && !next.some((t) => t.id === activeId)) {
            setActiveId(null)
            setEditing(null)
          }
        }}
        onNew={() => {
          setActiveId(null)
          setEditing(null)
        }}
        onSearch={() => setSearch(true)}
        onSelect={(id) => {
          setActiveId(id)
          setEditing(null)
        }}
        threads={threads}
        user={user}
      />

      <SidebarInset className="min-h-0 overflow-hidden bg-white dark:bg-background">
        <header className="flex h-13 shrink-0 items-center gap-2.5 border-b border-border/70 bg-white px-4 dark:bg-background">
          <SidebarTrigger className="size-7.5 rounded-lg text-muted-foreground" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="secondary"
                className="h-8 gap-1.5 rounded-lg px-2.5 text-[13px]"
              >
                <ModelLogo
                  className="size-3.5"
                  vendor={activeModel.vendor}
                />
                {model}
                <ChevronDownIcon
                  className="size-3 text-muted-foreground"
                  aria-hidden
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              sideOffset={6}
              className="w-75 rounded-xl p-1.5"
            >
              <DropdownMenuGroup className="flex flex-col gap-0.5">
                {models.map((m) => (
                  <DropdownMenuItem
                    key={m.name}
                    className={cn(
                      "gap-2.5 rounded-md px-2.5 py-2",
                      m.name === model && "bg-muted"
                    )}
                    onClick={() => setModel(m.name)}
                  >
                    <span className="flex grow flex-col gap-0.5">
                      <span className="flex items-center gap-1.5 text-[13px]/4 font-medium">
                        <ModelLogo
                          className="size-3 shrink-0"
                          vendor={m.vendor}
                        />
                        {m.name}
                      </span>
                      <span className="text-[11px]/3.5 text-muted-foreground">
                        {m.hint}
                      </span>
                    </span>
                    {m.name === model ? (
                      <CheckIcon className="size-3.5" aria-hidden />
                    ) : null}
                    <Kbd className="h-4.5 border border-border bg-background px-1.5 font-mono text-[10px]">
                      {m.context}
                    </Kbd>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="grow" />

          {thread ? (
            <Button
              type="button"
              aria-label="Share thread"
              className="size-7.5 rounded-lg text-muted-foreground"
              size="icon-sm"
              variant="ghost"
            >
              <ShareIcon className="size-4" aria-hidden />
            </Button>
          ) : null}
        </header>

        <Conversation
          altModel={altModel}
          editing={editing}
          onCancelEdit={cancelEdit}
          onCommitEdit={commitEdit}
          onEdit={startEdit}
          onEditingChange={(text) =>
            setEditing((cur) => (cur ? { ...cur, text } : cur))
          }
          onOpen={setActiveId}
          onRetry={retry}
          recent={threads.filter((t) => !t.pinned).slice(0, 3)}
          thread={thread}
        />

        <Composer
          attachment={attachment}
          draft={draft}
          onAttachment={setAttachment}
          onDraft={setDraft}
          onSend={send}
          onStop={stop}
          streaming={streaming}
        />
      </SidebarInset>

      <CommandMenu
        onNew={(text) => {
          setActiveId(null)
          setDraft(text)
        }}
        onOpen={setActiveId}
        onOpenChange={setSearch}
        open={search}
        threads={threads}
      />
    </SidebarProvider>
  )
}
