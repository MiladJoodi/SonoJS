"use client"

import * as React from "react"
import {
  ArrowUpIcon,
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  GlobeIcon,
  ImageIcon,
  MicIcon,
  MoreHorizontalIcon,
  PaperclipIcon,
  PencilIcon,
  PlusIcon,
  RefreshCwIcon,
  SquareIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  Volume2Icon,
} from "lucide-react"

import { Bubble, BubbleContent } from "@sonojs/ui/components/bubble"
import { Button } from "@sonojs/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
  {
    id: "5",
    role: "user",
    text: "How long would a person survive there without a suit?",
  },
  {
    id: "6",
    role: "assistant",
    text: "A few seconds at most. The pressure down there is 92 times Earth's, similar to being 900 meters underwater, and the heat alone would be fatal almost immediately.\n\nFor reference, the Soviet Venera landers were built for those conditions and still failed within about two hours.",
  },
]

const REPLIES = [
  "Good question. Venus has no moons and no rings, which makes it unusual among the inner planets. Most explanations point to its slow, retrograde spin: any moon it once had would have drifted inward and been pulled apart by tidal forces.\n\nMercury is the only other moonless planet in the solar system.",
  "The clouds are mostly sulfuric acid droplets, sitting about 50 to 70 km above the surface. They reflect roughly 75% of incoming sunlight, which is why Venus is the brightest object in our sky after the Moon.\n\nBelow the clouds the air is almost entirely carbon dioxide, with pressure about 92 times that of Earth at sea level.",
  "Several landers have made it down. The Soviet Venera 7 was the first to transmit from the surface in 1970, and Venera 13 survived for 127 minutes in 1982, long enough to send back the first color photos.\n\nNothing has lasted more than a couple of hours; the heat and pressure destroy electronics quickly.",
]

const LEVELS = [
  { name: "Instant", hint: "5.5" },
  { name: "Medium" },
  { name: "High" },
  { name: "Extra High" },
  { name: "Pro" },
] as const

const MODELS = [
  "GPT-6",
  "GPT-5.6 Sol",
  "GPT-6 Astra",
  "GPT-5.6 Terra",
  "GPT-5.6 Luna",
] as const

const THINK_DELAY = 600
const WORD_DELAY = 35

const easeOut = "ease-[cubic-bezier(0.23,1,0.32,1)]"
const press = `${easeOut} transition-[scale,background-color] duration-150 active:scale-[0.96] motion-reduce:active:scale-100`
const enter = `${easeOut} motion-reduce:slide-in-from-bottom-0 fade-in slide-in-from-bottom-1 animate-in duration-200`
const swap = `${easeOut} fade-in zoom-in-95 motion-reduce:zoom-in-100 animate-in duration-150`
const item = "rounded-lg px-2.5 py-1.5 text-[13px]"

function newId() {
  return crypto.randomUUID()
}

function ActionButton({
  label,
  children,
  onClick,
  className,
  pressed,
}: {
  label: string
  children: React.ReactNode
  onClick?: () => void
  className?: string
  pressed?: boolean
}) {
  return (
    <Button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      className={cn(
        press,
        "size-8 rounded-md text-muted-foreground hover:bg-muted/50 hover:text-foreground",
        pressed && "text-foreground",
        className
      )}
      onClick={onClick}
      size="icon-sm"
      variant="ghost"
    >
      {children}
    </Button>
  )
}

export default function AiChat02() {
  const [turns, setTurns] = React.useState<Turn[]>(SEED)
  const [draft, setDraft] = React.useState("")
  const [listening, setListening] = React.useState(false)
  const [level, setLevel] = React.useState("Extra High")
  const [model, setModel] = React.useState("GPT-5.6 Sol")
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
          if (done) clearStreamTimers()
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
    const reply = turns[at + 1]

    setTurns((prev) =>
      prev.map((t) => (t.id === edit.id ? { ...t, text } : t))
    )
    setEdit(null)
    if (reply?.role === "assistant") {
      stream(reply.id)
    }
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
      // ignore
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

  const renderBody = (turn: Turn, align: "start" | "end") => {
    if (edit?.id === turn.id) {
      return (
        <>
          <Textarea
            ref={editAreaRef}
            aria-label="Edit message"
            className={cn(
              enter,
              "min-h-0 w-md max-w-full resize-none rounded-[18px] border-0 bg-muted px-3.5 py-2.5 text-[15px]/6 shadow-none focus-visible:ring-0 md:text-[15px]/6"
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
        align={align}
        className="max-w-md data-[variant=ghost]:max-w-full"
        variant={turn.role === "user" ? "muted" : "ghost"}
      >
        <BubbleContent className="rounded-[18px] px-3.5 py-1.5 text-[15px]/5.5 group-data-[variant=ghost]/bubble:text-[15px]/6">
          {paragraph}
        </BubbleContent>
      </Bubble>
    ))
  }

  return (
    <div className="w-full bg-white px-4 py-10 dark:bg-background">
      <div className="mx-auto flex h-140 w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft">
      <MessageScrollerProvider autoScroll={false}>
        <MessageScroller className="min-h-0 flex-1">
          <MessageScrollerViewport>
            <MessageScrollerContent className="w-full gap-4.5 px-4 pt-8 pb-4">
              {turns.map((turn) => {
                const mine = turn.role === "user"
                const align = mine ? "end" : "start"
                return (
                  <MessageScrollerItem
                    key={turn.id}
                    messageId={turn.id}
                    scrollAnchor={mine}
                    className={cn(
                      mine && "pt-4.5 first:pt-0",
                      !seedIds.has(turn.id) && enter
                    )}
                  >
                    <Message align={align}>
                      <MessageContent className="gap-2.5">
                        {renderBody(turn, align)}
                        {turn.text && edit?.id !== turn.id ? (
                          <MessageFooter className="-mx-2 gap-0.5">
                            <ActionButton
                              label={copiedId === turn.id ? "Copied" : "Copy"}
                              pressed={copiedId === turn.id}
                              className={
                                copiedId === turn.id
                                  ? "text-foreground"
                                  : undefined
                              }
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
                            </ActionButton>
                            {mine ? (
                              <ActionButton
                                label="Edit"
                                onClick={() =>
                                  setEdit({ id: turn.id, text: turn.text })
                                }
                              >
                                <PencilIcon className="size-4" aria-hidden />
                              </ActionButton>
                            ) : (
                              <>
                                <ActionButton
                                  label="Good response"
                                  pressed={votes[turn.id] === "up"}
                                  onClick={() => vote(turn.id, "up")}
                                >
                                  <ThumbsUpIcon
                                    className={cn(
                                      "size-4",
                                      votes[turn.id] === "up" && "fill-current"
                                    )}
                                    aria-hidden
                                  />
                                </ActionButton>
                                <ActionButton
                                  label="Bad response"
                                  pressed={votes[turn.id] === "down"}
                                  onClick={() => vote(turn.id, "down")}
                                >
                                  <ThumbsDownIcon
                                    className={cn(
                                      "size-4",
                                      votes[turn.id] === "down" &&
                                        "fill-current"
                                    )}
                                    aria-hidden
                                  />
                                </ActionButton>
                                <ActionButton
                                  label="Regenerate"
                                  onClick={() => stream(turn.id)}
                                >
                                  <RefreshCwIcon
                                    className="size-4"
                                    aria-hidden
                                  />
                                </ActionButton>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      type="button"
                                      aria-label="More"
                                      className={cn(
                                        press,
                                        "rounded-lg border border-transparent text-muted-foreground hover:border-border/70 hover:bg-muted/60 hover:text-foreground"
                                      )}
                                      size="icon-sm"
                                      variant="ghost"
                                    >
                                      <MoreHorizontalIcon
                                        className="size-4"
                                        aria-hidden
                                      />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    align="start"
                                    className="w-44 rounded-[14px] p-1.5"
                                  >
                                    <DropdownMenuGroup className="flex flex-col gap-0.5">
                                      <DropdownMenuItem
                                        className={cn(item, "gap-2.5")}
                                      >
                                        <Volume2Icon
                                          className="size-4"
                                          aria-hidden
                                        />
                                        Read aloud
                                      </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                  </DropdownMenuContent>
                                </DropdownMenu>
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
          <MessageScrollerButton
            size="sm"
            className={cn(
              easeOut,
              "bottom-2 h-7 gap-1.5 rounded-full border-0 px-3.5 text-xs font-medium text-muted-foreground shadow-[0_0_0_1px_oklch(0_0_0/0.06),0_2px_8px_oklch(0_0_0/0.08)] transition-[translate,scale,opacity,background-color] hover:text-foreground data-[active=true]:active:scale-[0.96] dark:shadow-[0_0_0_1px_oklch(1_0_0/0.1),0_2px_8px_oklch(0_0_0/0.3)]"
            )}
          >
            <ChevronDownIcon className="size-3.5" aria-hidden />
            Jump to latest
          </MessageScrollerButton>
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
                className="w-56 rounded-[14px] p-1.5"
              >
                <DropdownMenuGroup className="flex flex-col gap-0.5">
                  <DropdownMenuItem className={cn(item, "gap-2.5")}>
                    <PaperclipIcon className="size-4" aria-hidden />
                    Add files
                  </DropdownMenuItem>
                  <DropdownMenuItem className={cn(item, "gap-2.5")}>
                    <ImageIcon className="size-4" aria-hidden />
                    Add photos
                  </DropdownMenuItem>
                  <DropdownMenuItem className={cn(item, "gap-2.5")}>
                    <GlobeIcon className="size-4" aria-hidden />
                    Search the web
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </InputGroupAddon>

          <InputGroupInput
            className="text-[15px] md:text-[15px]"
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                e.currentTarget.form?.requestSubmit()
              }
            }}
            placeholder={listening ? "Listening..." : "Ask anything"}
            value={draft}
            aria-label="Message"
          />

          <InputGroupAddon align="inline-end" className="gap-1.5">
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <InputGroupButton
                  type="button"
                  aria-label="Intelligence level"
                  className={cn(
                    press,
                    "h-8 gap-1.5 rounded-full border border-border/70 bg-muted/50 px-3 text-[13px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  size="sm"
                >
                  {level}
                  <ChevronDownIcon className="size-3" aria-hidden />
                </InputGroupButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                side="top"
                sideOffset={10}
                className="w-52 rounded-[14px] p-1.5"
              >
                <DropdownMenuGroup className="flex flex-col gap-0.5">
                  <DropdownMenuLabel className="px-2.5 pt-1 pb-0.5 text-[11px]">
                    Intelligence
                  </DropdownMenuLabel>
                  <DropdownMenuRadioGroup
                    value={level}
                    onValueChange={setLevel}
                  >
                    {LEVELS.map((l) => (
                      <DropdownMenuRadioItem
                        key={l.name}
                        value={l.name}
                        className={cn(item, "pe-8 ps-2.5")}
                      >
                        <span className="flex w-full items-center justify-between gap-2">
                          {l.name}
                          {"hint" in l && l.hint ? (
                            <span className="text-xs text-muted-foreground">
                              {l.hint}
                            </span>
                          ) : null}
                        </span>
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                  <DropdownMenuSeparator className="mx-1.5 my-1" />
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger
                      className={cn(
                        item,
                        "[&>svg]:size-3.5 [&>svg]:text-muted-foreground"
                      )}
                    >
                      {model}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="w-44 rounded-[14px] p-1.5">
                      <DropdownMenuRadioGroup
                        className="flex flex-col gap-0.5"
                        value={model}
                        onValueChange={setModel}
                      >
                        {MODELS.map((m) => (
                          <DropdownMenuRadioItem
                            key={m}
                            value={m}
                            className={cn(item, "pe-8 ps-2.5")}
                          >
                            {m}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
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
