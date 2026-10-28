"use client"

import * as React from "react"
import { SendIcon, ThumbsUpIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Textarea } from "@sonojs/ui/components/textarea"
import { cn } from "@/lib/utils"

import alexImg from "./images/alex.webp"
import davidImg from "./images/david.webp"
import mariaImg from "./images/maria.webp"
import sarahImg from "./images/sarah.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

type SortId = "newest" | "top"

type Comment = {
  id: string
  author: string
  initials: string
  avatar: string
  time: string
  content: string
  likes: number
  liked: boolean
  createdAt: number
}

const INITIAL: Comment[] = [
  {
    id: "1",
    author: "Sarah Jenkins",
    initials: "SJ",
    avatar: assetSrc(sarahImg),
    time: "12m ago",
    content:
      "The density feels right for docs feedback. Sorting by Top is useful during launch week.",
    likes: 24,
    liked: false,
    createdAt: 4,
  },
  {
    id: "2",
    author: "Alex Rivera",
    initials: "AR",
    avatar: assetSrc(alexImg),
    time: "1h ago",
    content:
      "Flat threads are easier to scan when reviewing before a release.",
    likes: 11,
    liked: false,
    createdAt: 3,
  },
  {
    id: "3",
    author: "Maria Garcia",
    initials: "MG",
    avatar: assetSrc(mariaImg),
    time: "3h ago",
    content:
      "Could we pin FAQ answers, or is Top sort enough for that use case?",
    likes: 31,
    liked: true,
    createdAt: 2,
  },
  {
    id: "4",
    author: "David Chen",
    initials: "DC",
    avatar: assetSrc(davidImg),
    time: "Yesterday",
    content: "Looks good. Keep timestamps LTR in RTL layouts.",
    likes: 7,
    liked: false,
    createdAt: 1,
  },
]

export default function Comments({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [sort, setSort] = React.useState<SortId>("newest")
  const [comments, setComments] = React.useState(INITIAL)
  const [draft, setDraft] = React.useState("")

  const sorted = [...comments].sort((a, b) =>
    sort === "top" ? b.likes - a.likes : b.createdAt - a.createdAt
  )

  const toggleLike = (id: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              liked: !c.liked,
              likes: c.liked ? c.likes - 1 : c.likes + 1,
            }
          : c
      )
    )
  }

  const post = (e: React.FormEvent) => {
    e.preventDefault()
    if (!draft.trim()) return
    setComments((prev) => [
      {
        id: String(Date.now()),
        author: "You",
        initials: "YO",
        avatar: assetSrc(alexImg),
        time: "Just now",
        content: draft.trim(),
        likes: 0,
        liked: false,
        createdAt: Date.now(),
      },
      ...prev,
    ])
    setDraft("")
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
        className="w-full max-w-xl overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft"
        aria-labelledby="comments-02-heading"
      >
        <header className="border-b border-border/70 px-5 py-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-start">
              <h1
                id="comments-02-heading"
                className="text-base font-semibold tracking-tight"
              >
                Comments
              </h1>
              <Badge variant="secondary" className="tabular-nums">
                <span dir="ltr">{comments.length}</span>
              </Badge>
            </div>
            <div
              className="flex gap-1 rounded-md border border-border/70 bg-muted/40 p-0.5"
              role="tablist"
              aria-label="Sort comments"
            >
              {(
                [
                  { id: "newest", label: "Newest" },
                  { id: "top", label: "Top" },
                ] as const
              ).map((item) => {
                const active = sort === item.id
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
                    onClick={() => setSort(item.id)}
                  >
                    {item.label}
                  </button>
                )
              })}
            </div>
          </div>
        </header>

        <form
          onSubmit={post}
          className="border-b border-border/70 px-5 py-4 sm:px-6"
        >
          <div className="flex items-start gap-3">
            <Avatar className="mt-0.5 size-8 shrink-0">
              <AvatarImage src={assetSrc(alexImg)} alt="" />
              <AvatarFallback className="text-[10px]">YO</AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <Textarea
                placeholder="Add a comment…"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={2}
                aria-label="Add a comment"
                className="min-h-0 bg-muted/40 text-sm"
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  size="sm"
                  disabled={!draft.trim()}
                  className="cursor-pointer disabled:cursor-not-allowed"
                >
                  <SendIcon className="size-3.5" aria-hidden />
                  Post
                </Button>
              </div>
            </div>
          </div>
        </form>

        <ul className="divide-y divide-border/70" role="list">
          {sorted.map((comment) => (
            <li key={comment.id} className="px-5 py-4 sm:px-6">
              <div className="flex items-start gap-3">
                <Avatar className="size-8 shrink-0">
                  <AvatarImage src={comment.avatar} alt="" />
                  <AvatarFallback className="text-[10px]">
                    {comment.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 text-start">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      {comment.author}
                    </span>
                    <time className="text-xs text-muted-foreground">
                      {comment.time}
                    </time>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {comment.content}
                  </p>
                  <button
                    type="button"
                    onClick={() => toggleLike(comment.id)}
                    className={cn(
                      "mt-2 inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md px-2 text-xs font-medium transition-colors",
                      comment.liked
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                    aria-pressed={comment.liked}
                    aria-label={`${comment.liked ? "Unlike" : "Like"} (${comment.likes})`}
                  >
                    <ThumbsUpIcon className="size-3.5" aria-hidden />
                    <span dir="ltr">{comment.likes}</span>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
