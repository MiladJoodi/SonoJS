"use client"

import * as React from "react"
import {
  ArrowUpIcon,
  CheckIcon,
  CopyIcon,
  GlobeIcon,
  ImageIcon,
  MicIcon,
  PaperclipIcon,
  PlusIcon,
  RefreshCwIcon,
  SquareIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react"

import { Bubble, BubbleContent } from "@sonojs/ui/components/bubble"
import { Button } from "@sonojs/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@sonojs/ui/components/input-group"
import {
  Message,
  MessageContent,
  MessageFooter,
} from "@sonojs/ui/components/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@sonojs/ui/components/message-scroller"
import { Textarea } from "@sonojs/ui/components/textarea"
import { cn } from "@/lib/utils"

type Turn = {
  id: string
  role: "user" | "assistant"
  text: string
  streaming?: boolean
}

const SEED: Turn[] = [
  {
    id: "1",
    role: "user",
    text: "Is it true that a day on Venus is longer than its year?",
  },
  {
    id: "2",
    role: "assistant",
    text: "Yes. Venus takes 243 Earth days to rotate once, but only 225 days to orbit the Sun, so its day is longer than its year.\n\nIt also spins in the opposite direction to most planets, which means the Sun rises in the west there.",
  },
  { id: "3", role: "user", text: "How hot does it get on the surface?" },
  {
    id: "4",
    role: "assistant",
    text: "The surface sits around 465°C, hot enough to melt lead. The atmosphere traps so much heat that Venus stays hotter than Mercury, even though Mercury is much closer to the Sun.",
  },
]

const REPLIES = [
  "Good question. Venus has no moons and no rings, which makes it unusual among the inner planets. Most explanations point to its slow, retrograde spin: any moon it once had would have drifted inward and been pulled apart by tidal forces.\n\nMercury is the only other moonless planet in the solar system.",
  "The clouds are mostly sulfuric acid droplets, sitting about 50 to 70 km above the surface. They reflect roughly 75% of incoming sunlight, which is why Venus is the brightest object in our sky after the Moon.\n\nBelow the clouds the air is almost entirely carbon dioxide, with pressure about 92 times that of Earth at sea level.",
  "Several landers have made it down. The Soviet Venera 7 was the first to transmit from the surface in 1970, and Venera 13 survived for 127 minutes in 1982, long enough to send back the first color photos.\n\nNothing has lasted more than a couple of hours; the heat and pressure destroy electronics quickly.",
]

const THINK_DELAY = 600
const WORD_DELAY = 35

const easeOut = "ease-[cubic-bezier(0.23,1,0.32,1)]"
const press = `${easeOut} transition-[scale,background-color] duration-150 active:scale-[0.96]`
const enter = `${easeOut} motion-reduce:slide-in-from-bottom-0 fade-in slide-in-from-bottom-1 animate-in duration-200`
const swap = `${easeOut} fade-in zoom-in-95 animate-in duration-150`

function newId() {
  return crypto.randomUUID()
}

export default function AiChat01() {
  const [turns, setTurns] = React.useState<Turn[]>(SEED)
  const [draft, setDraft] = React.useState("")
  const [listening, setListening] = React.useState(false)
  const [edit, setEdit] = React.useState<{ id: string; text: string } | null>(
    null
  )
  const [copiedId, setCopiedId] = React.useState<string | null>(null)
  const [votes, setVotes] = React.useState<Record<string, "up" | "down">>({})
  const replyIndexRef = React.useRef(0)
  const thinkTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const wordTimerRef = React.useRef<ReturnType<typeof setInterval> | null>(null)
  const copyTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const editAreaRef = React.useRef<HTMLTextAreaElement>(null)
  const seedIds = React.useMemo(() => new Set(SEED.map((t) => t.id)), [])

  const streaming = turns.some((t) => t.streaming)

  React.useLayoutEffect(() => {
    if (!edit) return
    const el = editAreaRef.current
    if (!el) return
    el.focus()
    const n = el.value.length
    el.setSelectionRange(n, n)
  }, [edit?.id])

  const clearStreamTimers = React.useCallback(() => {
    if (thinkTimerRef.current) {
      clearTimeout(thinkTimerRef.current)
      thinkTimerRef.current = null
    }
    if (wordTimerRef.current) {
      clearInterval(wordTimerRef.current)
      wordTimerRef.current = null
    }
  }, [])

  React.useEffect(
    () => () => {
      clearStreamTimers()
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
    },
    [clearStreamTimers]
  )

  const stream = React.useCallback(
    (replyId: string) => {
      clearStreamTimers()
      const words = REPLIES[replyIndexRef.current % REPLIES.length]!.split(" ")
      replyIndexRef.current += 1

      setTurns((prev) =>
        prev.map((t) =>
          t.id === replyId ? { ...t, text: "", streaming: true } : t
        )
      )

      thinkTimerRef.current = setTimeout(() => {
        let shown = 0
        wordTimerRef.current = setInterval(() => {
          shown += 1
          const done = shown >= words.length
          setTurns((prev) =>
            prev.map((t) =>
              t.id === replyId
                ? {
                    ...t,
                    text: words.slice(0, shown).join(" "),
                    streaming: !done,
                  }
                : t
            )
          )
          if (done) {
            clearStreamTimers()
          }
        }, WORD_DELAY)
      }, THINK_DELAY)
    },
    [clearStreamTimers]
  )

  const send = (e: React.FormEvent) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text || streaming) return

    const replyId = newId()
    setTurns((prev) => [
      ...prev,
      { id: newId(), role: "user", text },
      { id: replyId, role: "assistant", text: "" },
    ])
    setDraft("")
    setListening(false)
    stream(replyId)
  }

  const resend = () => {
    const text = edit?.text.trim()
    if (!(edit && text) || streaming) return

    const at = turns.findIndex((t) => t.id === edit.id)
    if (at < 0) return

    const replyId = newId()
    setTurns([
      ...turns.slice(0, at),
      { id: edit.id, role: "user", text },
      { id: replyId, role: "assistant", text: "" },
    ])
    setEdit(null)
    stream(replyId)
  }

  const editLast = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowUp" || draft) return
    const last = [...turns].reverse().find((t) => t.role === "user")
    if (!last) return
    e.preventDefault()
    setEdit({ id: last.id, text: last.text })
  }

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

  const renderBody = (turn: Turn) => {
    const mine = turn.role === "user"

    if (edit?.id === turn.id) {
      return (
        <>
          <Textarea
            ref={editAreaRef}
            aria-label="Edit message"
            className={cn(
              enter,
              "min-h-0 w-md max-w-full resize-none rounded-[22px] border-0 bg-muted px-4 py-3 text-[15px]/6 font-medium shadow-none focus-visible:ring-0 md:text-[15px]/6"
            )}
            onChange={(e) => setEdit({ ...edit, text: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Escape") setEdit(null)
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                resend()
              }
            }}
            value={edit.text}
          />
          <div className={cn(enter, "flex items-center gap-1.5 self-end")}>
            <Button
              type="button"
              aria-label={copiedId === turn.id ? "Copied" : "Copy"}
              className={cn(press, "rounded-full")}
              onClick={() => copyText(turn.id, turn.text)}
              size="icon-sm"
              variant="ghost"
            >
              {copiedId === turn.id ? (
                <CheckIcon className={cn(swap, "size-4 text-emerald-600")} aria-hidden />
              ) : (
                <CopyIcon className="size-4" aria-hidden />
              )}
            </Button>
            <Button
              type="button"
              className={cn(press, "rounded-full")}
              onClick={() => setEdit(null)}
              size="sm"
              variant="secondary"
            >
              Cancel
            </Button>
            <Button
              type="button"
              className={cn(press, "rounded-full")}
              disabled={!edit.text.trim() || streaming}
              onClick={resend}
              size="sm"
            >
              Send
            </Button>
          </div>
        </>
      )
    }

    if (turn.streaming && !turn.text) {
      return (
        <span className="shimmer text-[15px]/6 text-muted-foreground">
          Thinking...
        </span>
      )
    }

    return turn.text.split("\n\n").map((paragraph, i) => (
      <Bubble
        key={`${turn.id}-p${i}`}
        align={mine ? "end" : "start"}
        variant="ghost"
        className={
          mine
            ? "-mx-2.5 -my-1 box-content max-w-md cursor-pointer rounded-xl px-2.5 py-1 text-end font-medium transition-colors duration-150 ease-out hover:bg-muted"
            : undefined
        }
        onDoubleClick={
          mine ? () => setEdit({ id: turn.id, text: turn.text }) : undefined
        }
        title={mine ? "Double-click to edit" : undefined}
      >
        <BubbleContent className="text-[15px]/6">{paragraph}</BubbleContent>
      </Bubble>
    ))
  }

  return (
    <div className="w-full bg-canvas px-4 py-10">
      <div className="mx-auto flex h-140 w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft">
      <MessageScrollerProvider
        autoScroll={streaming}
        defaultScrollPosition="end"
      >
        <MessageScroller className="min-h-0 flex-1">
          <MessageScrollerViewport>
            <MessageScrollerContent className="w-full gap-3.5 px-3 pt-8 pb-4">
              {turns.map((turn) => {
                const mine = turn.role === "user"
                return (
                  <MessageScrollerItem
                    key={turn.id}
                    messageId={turn.id}
                    scrollAnchor={mine}
                    className={cn(
                      "px-2.5",
                      mine && "pt-5.5 pb-1 first:pt-1",
                      !seedIds.has(turn.id) && enter
                    )}
                  >
                    <Message align={mine ? "end" : "start"}>
                      <MessageContent className="gap-2">
                        {renderBody(turn)}
                        {!mine && !turn.streaming ? (
                          <MessageFooter className={cn(enter, "gap-0.5")}>
                            <Button
                              type="button"
                              aria-label={
                                copiedId === turn.id ? "Copied" : "Copy"
                              }
                              aria-pressed={copiedId === turn.id}
                              className={cn(
                                press,
                                "size-8 rounded-md text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                                copiedId === turn.id && "text-foreground"
                              )}
                              onClick={() => copyText(turn.id, turn.text)}
                              size="icon-sm"
                              variant="ghost"
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
                            <Button
                              type="button"
                              aria-label="Good response"
                              aria-pressed={votes[turn.id] === "up"}
                              className={cn(
                                press,
                                "size-8 rounded-md text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                                votes[turn.id] === "up" && "text-foreground"
                              )}
                              onClick={() => vote(turn.id, "up")}
                              size="icon-sm"
                              variant="ghost"
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
                              className={cn(
                                press,
                                "size-8 rounded-md text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                                votes[turn.id] === "down" && "text-foreground"
                              )}
                              onClick={() => vote(turn.id, "down")}
                              size="icon-sm"
                              variant="ghost"
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
                              className={cn(
                                press,
                                "size-8 rounded-md text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                              )}
                              onClick={() => stream(turn.id)}
                              size="icon-sm"
                              variant="ghost"
                            >
                              <RefreshCwIcon className="size-4" aria-hidden />
                            </Button>
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

      <form
        className="flex w-full flex-col items-center gap-2.5 px-4 pt-3 pb-4"
        onSubmit={send}
      >
        <InputGroup className="h-13 rounded-full border border-border/70 bg-background px-2.5 shadow-xs has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-0">
          <InputGroupAddon align="inline-start">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <InputGroupButton
                  type="button"
                  aria-label="Add attachment"
                  className={cn(
                    press,
                    "rounded-full border border-transparent text-muted-foreground hover:border-border/70 hover:bg-muted/60 hover:text-foreground"
                  )}
                  size="icon-sm"
                >
                  <PlusIcon className="size-4" aria-hidden />
                </InputGroupButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                sideOffset={10}
                className="w-60 rounded-[20px] p-2 shadow-[0_0_0_1px_oklch(0_0_0/0.06),0_8px_24px_-6px_oklch(0_0_0/0.14)]"
              >
                <DropdownMenuGroup className="flex flex-col gap-0.5">
                  <DropdownMenuItem className="gap-3 rounded-xl px-3 py-2.5 text-[15px] [&>svg]:text-muted-foreground">
                    <PaperclipIcon className="size-4.5" aria-hidden />
                    Add files
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-3 rounded-xl px-3 py-2.5 text-[15px] [&>svg]:text-muted-foreground">
                    <ImageIcon className="size-4.5" aria-hidden />
                    Add photos
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-3 rounded-xl px-3 py-2.5 text-[15px] [&>svg]:text-muted-foreground">
                    <GlobeIcon className="size-4.5" aria-hidden />
                    Search the web
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </InputGroupAddon>

          <InputGroupInput
            className="text-[15px] md:text-[15px]"
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={editLast}
            placeholder={listening ? "Listening..." : "Ask anything"}
            value={draft}
            aria-label="Message"
          />

          <InputGroupAddon align="inline-end">
            {draft.trim() ? (
              <InputGroupButton
                type="submit"
                aria-label="Send"
                className={cn(swap, press, "rounded-full")}
                disabled={streaming}
                size="icon-sm"
                variant="default"
              >
                <ArrowUpIcon className="size-4" aria-hidden />
              </InputGroupButton>
            ) : (
              <InputGroupButton
                type="button"
                aria-label={listening ? "Stop listening" : "Voice input"}
                aria-pressed={listening}
                className={cn(
                  swap,
                  press,
                  "rounded-full border border-transparent",
                  listening
                    ? "border-destructive/30 bg-destructive/15 text-destructive hover:bg-destructive/25 hover:text-destructive"
                    : "text-muted-foreground hover:border-border/70 hover:bg-muted/60 hover:text-foreground"
                )}
                onClick={() => setListening((v) => !v)}
                size="icon-sm"
              >
                {listening ? (
                  <SquareIcon
                    className="size-3.5 fill-current animate-pulse motion-reduce:animate-none"
                    aria-hidden
                  />
                ) : (
                  <MicIcon className="size-4" aria-hidden />
                )}
              </InputGroupButton>
            )}
          </InputGroupAddon>
        </InputGroup>
        <p className="text-xs text-muted-foreground">
          AI can make mistakes. Check important info.
        </p>
      </form>
      </div>
    </div>
  )
}
