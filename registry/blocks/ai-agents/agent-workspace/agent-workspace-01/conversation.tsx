"use client"

import * as React from "react"
import {
  CheckIcon,
  CopyIcon,
  PencilIcon,
  RefreshCwIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  TriangleAlertIcon,
} from "lucide-react"

import { Bubble, BubbleContent } from "@sonojs/ui/components/bubble"
import { Button } from "@sonojs/ui/components/button"
import {
  Message,
  MessageContent,
  MessageFooter,
} from "@sonojs/ui/components/message"
import { Textarea } from "@sonojs/ui/components/textarea"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@sonojs/ui/components/message-scroller"
import { cn } from "@/lib/utils"

import type { Thread, Turn } from "./types"

const easeOut = "ease-[cubic-bezier(0.23,1,0.32,1)]"
const press = `${easeOut} transition-[scale,background-color,color] duration-150 active:scale-[0.96]`
const enter = `${easeOut} motion-reduce:slide-in-from-bottom-0 fade-in slide-in-from-bottom-1 animate-in duration-200`
const swap = `${easeOut} fade-in zoom-in-95 animate-in duration-150`

const actionBtn =
  "size-8 rounded-md text-muted-foreground hover:bg-muted/50 hover:text-foreground"

export function Conversation({
  thread,
  recent,
  altModel,
  editing,
  onEdit,
  onEditingChange,
  onCancelEdit,
  onCommitEdit,
  onRetry,
  onOpen,
}: {
  thread: Thread | null
  recent: Thread[]
  altModel: string
  editing: { id: string; text: string } | null
  onEdit: (turn: Turn) => void
  onEditingChange: (text: string) => void
  onCancelEdit: () => void
  onCommitEdit: () => void
  onRetry: (turnId: string, nextModel?: string) => void
  onOpen: (id: string) => void
}) {
  const [copiedId, setCopiedId] = React.useState<string | null>(null)
  const [votes, setVotes] = React.useState<Record<string, "up" | "down">>({})
  const copyTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const editAreaRef = React.useRef<HTMLTextAreaElement>(null)

  React.useLayoutEffect(() => {
    if (!editing) return
    const el = editAreaRef.current
    if (!el) return
    el.focus()
    const n = el.value.length
    el.setSelectionRange(n, n)
  }, [editing?.id])

  React.useEffect(
    () => () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
    },
    []
  )

  const copyText = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
      copyTimerRef.current = setTimeout(() => {
        setCopiedId((cur) => (cur === id ? null : cur))
        copyTimerRef.current = null
      }, 1800)
    } catch {
      // Clipboard may be denied in embeds; ignore.
    }
  }

  const vote = (id: string, next: "up" | "down") => {
    setVotes((prev) => {
      if (prev[id] === next) {
        const { [id]: _removed, ...rest } = prev
        return rest
      }
      return { ...prev, [id]: next }
    })
  }

  if (!thread) {
    return (
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-6 bg-white px-6 dark:bg-background">
        <div className="max-w-md text-center">
          <h2 className="text-xl font-semibold tracking-tight">
            Start a workspace chat
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Ask anything, attach a file, or reopen a recent thread from the
            sidebar.
          </p>
        </div>
        {recent.length > 0 ? (
          <ul className="flex w-full max-w-md flex-col gap-1">
            {recent.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onOpen(item.id)}
                  className="flex w-full cursor-pointer items-center rounded-lg px-3 py-2 text-start text-sm transition-colors hover:bg-muted"
                >
                  <span className="truncate">{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    )
  }

  const streaming = thread.turns.some((turn) => turn.streaming)

  return (
    <MessageScrollerProvider
      key={thread.id}
      autoScroll={streaming}
      defaultScrollPosition="end"
    >
      <MessageScroller className="min-h-0 flex-1 bg-white dark:bg-background">
        <MessageScrollerViewport>
          <MessageScrollerContent className="mx-auto w-full max-w-2xl justify-end gap-4 px-4 pt-8 pb-4">
            {thread.turns.map((turn) => {
              const mine = turn.role === "user"
              const align = mine ? "end" : "start"
              return (
                <MessageScrollerItem
                  key={turn.id}
                  messageId={turn.id}
                  scrollAnchor={mine}
                  className={cn(mine && "pt-4 first:pt-0", enter)}
                >
                  <Message align={align}>
                    <MessageContent className="gap-2">
                      {editing?.id === turn.id ? (
                        <>
                          <Textarea
                            ref={editAreaRef}
                            aria-label="Edit message"
                            className={cn(
                              enter,
                              "min-h-0 w-md max-w-full resize-none rounded-[18px] border border-border/70 bg-white px-3.5 py-2.5 text-[15px]/6 shadow-xs focus-visible:ring-0 dark:bg-card md:text-[15px]/6"
                            )}
                            value={editing.text}
                            onChange={(e) => onEditingChange(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Escape") onCancelEdit()
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault()
                                onCommitEdit()
                              }
                            }}
                          />
                          <div
                            className={cn(
                              enter,
                              "flex items-center gap-1.5 self-end"
                            )}
                          >
                            <Button
                              type="button"
                              className={cn(press, "rounded-full")}
                              onClick={onCancelEdit}
                              size="sm"
                              variant="secondary"
                            >
                              Cancel
                            </Button>
                            <Button
                              type="button"
                              className={cn(press, "rounded-full")}
                              disabled={!editing.text.trim() || streaming}
                              onClick={onCommitEdit}
                              size="sm"
                            >
                              Send
                            </Button>
                          </div>
                        </>
                      ) : turn.streaming && !turn.text ? (
                        <span className="shimmer text-[15px]/6 text-muted-foreground">
                          Thinking...
                        </span>
                      ) : (
                        turn.text.split("\n\n").map((paragraph, i) => (
                          <Bubble
                            key={`${turn.id}-${i}`}
                            align={align}
                            variant={mine ? "muted" : "ghost"}
                            className="max-w-md data-[variant=ghost]:max-w-full"
                          >
                            <BubbleContent className="rounded-[18px] px-3.5 py-2 text-[15px]/6">
                              {paragraph}
                            </BubbleContent>
                          </Bubble>
                        ))
                      )}

                      {!mine &&
                      turn.reasoning &&
                      !turn.streaming &&
                      editing?.id !== turn.id ? (
                        <p className="max-w-md text-xs text-muted-foreground">
                          Thought for {turn.thought ?? 3}s · {turn.reasoning}
                        </p>
                      ) : null}

                      {turn.error && editing?.id !== turn.id ? (
                        <div className="flex max-w-md items-start gap-2 rounded-[12px] border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive">
                          <TriangleAlertIcon
                            className="mt-0.5 size-3.5 shrink-0"
                            aria-hidden
                          />
                          <div className="flex flex-col gap-1.5">
                            <span>Generation stopped.</span>
                            <div className="flex flex-wrap gap-1.5">
                              <Button
                                type="button"
                                size="xs"
                                variant="outline"
                                className="h-7 rounded-full"
                                onClick={() => onRetry(turn.id)}
                              >
                                Retry
                              </Button>
                              <Button
                                type="button"
                                size="xs"
                                variant="ghost"
                                className="h-7 rounded-full"
                                onClick={() => onRetry(turn.id, altModel)}
                              >
                                Try {altModel}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {turn.text &&
                      !turn.streaming &&
                      editing?.id !== turn.id ? (
                        <MessageFooter className="-mx-2 gap-0.5">
                          <Button
                            type="button"
                            aria-label={
                              copiedId === turn.id ? "Copied" : "Copy"
                            }
                            aria-pressed={copiedId === turn.id}
                            size="icon-sm"
                            variant="ghost"
                            className={cn(
                              press,
                              actionBtn,
                              copiedId === turn.id && "text-foreground"
                            )}
                            onClick={() => copyText(turn.id, turn.text)}
                          >
                            {copiedId === turn.id ? (
                              <CheckIcon
                                className={cn(swap, "size-4")}
                                aria-hidden
                              />
                            ) : (
                              <CopyIcon className="size-4" aria-hidden />
                            )}
                          </Button>
                          {mine ? (
                            <Button
                              type="button"
                              aria-label="Edit"
                              size="icon-sm"
                              variant="ghost"
                              className={cn(press, actionBtn)}
                              disabled={streaming}
                              onClick={() => onEdit(turn)}
                            >
                              <PencilIcon className="size-4" aria-hidden />
                            </Button>
                          ) : (
                            <>
                              <Button
                                type="button"
                                aria-label="Good response"
                                aria-pressed={votes[turn.id] === "up"}
                                size="icon-sm"
                                variant="ghost"
                                className={cn(
                                  press,
                                  actionBtn,
                                  votes[turn.id] === "up" && "text-foreground"
                                )}
                                onClick={() => vote(turn.id, "up")}
                              >
                                <ThumbsUpIcon
                                  className={cn(
                                    "size-4",
                                    votes[turn.id] === "up" && "fill-current"
                                  )}
                                  aria-hidden
                                />
                              </Button>
                              <Button
                                type="button"
                                aria-label="Bad response"
                                aria-pressed={votes[turn.id] === "down"}
                                size="icon-sm"
                                variant="ghost"
                                className={cn(
                                  press,
                                  actionBtn,
                                  votes[turn.id] === "down" && "text-foreground"
                                )}
                                onClick={() => vote(turn.id, "down")}
                              >
                                <ThumbsDownIcon
                                  className={cn(
                                    "size-4",
                                    votes[turn.id] === "down" && "fill-current"
                                  )}
                                  aria-hidden
                                />
                              </Button>
                              <Button
                                type="button"
                                aria-label="Regenerate"
                                size="icon-sm"
                                variant="ghost"
                                className={cn(press, actionBtn)}
                                onClick={() => onRetry(turn.id)}
                              >
                                <RefreshCwIcon
                                  className="size-4"
                                  aria-hidden
                                />
                              </Button>
                            </>
                          )}
                        </MessageFooter>
                      ) : null}
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>
              )
            })}
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton className={easeOut} />
      </MessageScroller>
    </MessageScrollerProvider>
  )
}
