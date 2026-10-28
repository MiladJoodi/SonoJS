"use client"

import * as React from "react"
import {
  CheckIcon,
  MessageSquareIcon,
  RotateCcwIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Separator } from "@sonojs/ui/components/separator"
import { Textarea } from "@sonojs/ui/components/textarea"
import { cn } from "@/lib/utils"

import alexImg from "./images/alex.webp"
import davidImg from "./images/david.webp"
import mariaImg from "./images/maria.webp"
import sarahImg from "./images/sarah.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

type Reply = {
  id: string
  author: string
  initials: string
  avatar: string
  time: string
  content: string
}

type ReviewComment = {
  id: string
  author: string
  initials: string
  avatar: string
  time: string
  file: string
  line: string
  content: string
  resolved: boolean
  replies: Reply[]
}

const INITIAL: ReviewComment[] = [
  {
    id: "r1",
    author: "Sarah Jenkins",
    initials: "SJ",
    avatar: assetSrc(sarahImg),
    time: "20m ago",
    file: "button.tsx",
    line: "46",
    content:
      "Default height should stay at 46px on mobile — don’t shrink below the control scale.",
    resolved: false,
    replies: [
      {
        id: "r1a",
        author: "Alex Rivera",
        initials: "AR",
        avatar: assetSrc(alexImg),
        time: "12m ago",
        content: "Agreed — keeping `h-[46px]` and only adjusting padding.",
      },
    ],
  },
  {
    id: "r2",
    author: "Maria Garcia",
    initials: "MG",
    avatar: assetSrc(mariaImg),
    time: "1h ago",
    file: "login-form.tsx",
    line: "112",
    content:
      "Use logical `ps`/`pe` here so the icon doesn’t flip incorrectly in RTL.",
    resolved: true,
    replies: [],
  },
  {
    id: "r3",
    author: "David Chen",
    initials: "DC",
    avatar: assetSrc(davidImg),
    time: "2h ago",
    file: "input.tsx",
    line: "28",
    content: "Focus ring looks good — can we match the shared `--ring` token?",
    resolved: false,
    replies: [],
  },
]

export default function Comments({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [items, setItems] = React.useState(INITIAL)
  const [replyingTo, setReplyingTo] = React.useState<string | null>(null)
  const [replyDraft, setReplyDraft] = React.useState("")
  const [filter, setFilter] = React.useState<"open" | "all">("open")

  const openCount = items.filter((i) => !i.resolved).length
  const visible =
    filter === "open" ? items.filter((i) => !i.resolved) : items

  const toggleResolved = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, resolved: !item.resolved } : item
      )
    )
  }

  const submitReply = (id: string) => {
    if (!replyDraft.trim()) return
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              replies: [
                ...item.replies,
                {
                  id: String(Date.now()),
                  author: "You",
                  initials: "YO",
                  avatar: assetSrc(alexImg),
                  time: "Just now",
                  content: replyDraft.trim(),
                },
              ],
            }
          : item
      )
    )
    setReplyDraft("")
    setReplyingTo(null)
  }

  return (
    <div
      className={cn(
        "flex w-full justify-center bg-canvas px-4 py-10 text-foreground sm:px-6 sm:py-14",
        className
      )}
      {...props}
    >
      <section
        className="w-full max-w-2xl overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft"
        aria-labelledby="comments-03-heading"
      >
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 px-5 py-4 sm:px-6">
          <div className="text-start">
            <div className="flex items-center gap-2">
              <h1
                id="comments-03-heading"
                className="text-base font-semibold tracking-tight"
              >
                Review comments
              </h1>
              <Badge variant="secondary" className="tabular-nums">
                <span dir="ltr">{openCount} open</span>
              </Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Line-anchored feedback on this change.
            </p>
          </div>
          <div
            className="flex gap-1 rounded-md border border-border/70 bg-muted/40 p-0.5"
            role="tablist"
            aria-label="Filter review comments"
          >
            {(
              [
                { id: "open", label: "Open" },
                { id: "all", label: "All" },
              ] as const
            ).map((item) => {
              const active = filter === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className={cn(
                    "cursor-pointer rounded-[8px] px-3 py-1.5 text-xs font-medium transition-colors",
                    active
                      ? "bg-card text-foreground shadow-soft"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setFilter(item.id)}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </header>

        <ul className="divide-y divide-border/70" role="list">
          {visible.length === 0 ? (
            <li className="px-6 py-12 text-center text-sm text-muted-foreground">
              No open review comments.
            </li>
          ) : (
            visible.map((item) => (
              <li key={item.id} className="px-5 py-5 sm:px-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex min-w-0 items-start gap-3 text-start">
                    <Avatar className="size-9 shrink-0">
                      <AvatarImage src={item.avatar} alt="" />
                      <AvatarFallback className="text-xs">
                        {item.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold">
                          {item.author}
                        </span>
                        <time className="text-xs text-muted-foreground">
                          {item.time}
                        </time>
                        {item.resolved ? (
                          <Badge
                            variant="secondary"
                            className="border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                          >
                            Resolved
                          </Badge>
                        ) : (
                          <Badge variant="outline">Open</Badge>
                        )}
                      </div>
                      <p
                        dir="ltr"
                        className="mt-1 font-mono text-xs text-muted-foreground"
                      >
                        {item.file}:{item.line}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant={item.resolved ? "outline" : "secondary"}
                    className="cursor-pointer gap-1.5 self-start"
                    onClick={() => toggleResolved(item.id)}
                  >
                    {item.resolved ? (
                      <>
                        <RotateCcwIcon className="size-3.5" aria-hidden />
                        Unresolve
                      </>
                    ) : (
                      <>
                        <CheckIcon className="size-3.5" aria-hidden />
                        Resolve
                      </>
                    )}
                  </Button>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:ps-12">
                  {item.content}
                </p>

                {item.replies.length > 0 ? (
                  <div className="mt-4 space-y-3 border-s border-border/70 ps-4 sm:ms-12">
                    {item.replies.map((reply) => (
                      <div key={reply.id} className="flex items-start gap-2.5">
                        <Avatar className="size-7 shrink-0">
                          <AvatarImage src={reply.avatar} alt="" />
                          <AvatarFallback className="text-[10px]">
                            {reply.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 text-start">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-semibold">
                              {reply.author}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {reply.time}
                            </span>
                          </div>
                          <p className="mt-0.5 text-sm text-muted-foreground">
                            {reply.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="mt-4 sm:ps-12">
                  {replyingTo === item.id ? (
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Reply…"
                        value={replyDraft}
                        onChange={(e) => setReplyDraft(e.target.value)}
                        rows={2}
                        aria-label="Write a reply"
                        className="min-h-0 bg-muted/40 text-sm"
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="cursor-pointer"
                          onClick={() => {
                            setReplyingTo(null)
                            setReplyDraft("")
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          className="cursor-pointer disabled:cursor-not-allowed"
                          disabled={!replyDraft.trim()}
                          onClick={() => submitReply(item.id)}
                        >
                          Reply
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="cursor-pointer gap-1.5"
                      onClick={() => setReplyingTo(item.id)}
                    >
                      <MessageSquareIcon className="size-3.5" aria-hidden />
                      Reply
                    </Button>
                  )}
                </div>
              </li>
            ))
          )}
        </ul>

        {filter === "open" && openCount < items.length ? (
          <>
            <Separator />
            <div className="px-5 py-3 sm:px-6">
              <Button
                type="button"
                variant="ghost"
                className="w-full cursor-pointer"
                onClick={() => setFilter("all")}
              >
                Show {items.length - openCount} resolved
              </Button>
            </div>
          </>
        ) : null}
      </section>
    </div>
  )
}
