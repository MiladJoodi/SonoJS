"use client"

import * as React from "react"
import { AtSignIcon, SendIcon } from "lucide-react"

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

const PEOPLE = [
  {
    name: "Sarah",
    handle: "@sarah",
    avatar: assetSrc(sarahImg),
    initials: "SJ",
  },
  {
    name: "Alex",
    handle: "@alex",
    avatar: assetSrc(alexImg),
    initials: "AR",
  },
  {
    name: "Maria",
    handle: "@maria",
    avatar: assetSrc(mariaImg),
    initials: "MG",
  },
  {
    name: "David",
    handle: "@david",
    avatar: assetSrc(davidImg),
    initials: "DC",
  },
] as const

const REACTIONS = [
  { id: "up", label: "👍" },
  { id: "party", label: "🎉" },
  { id: "eyes", label: "👀" },
] as const

type ReactionId = (typeof REACTIONS)[number]["id"]

type Comment = {
  id: string
  author: string
  initials: string
  avatar: string
  time: string
  content: string
  reactions: Record<ReactionId, number>
  mine: Partial<Record<ReactionId, boolean>>
  replies: { id: string; author: string; content: string; time: string }[]
}

const INITIAL: Comment[] = [
  {
    id: "1",
    author: "Sarah Jenkins",
    initials: "SJ",
    avatar: assetSrc(sarahImg),
    time: "30m ago",
    content:
      "Hey @alex — can you glance at the mention chips before we merge?",
    reactions: { up: 4, party: 1, eyes: 2 },
    mine: {},
    replies: [
      {
        id: "1a",
        author: "Alex Rivera",
        content: "On it — will leave notes in the PR.",
        time: "18m ago",
      },
    ],
  },
  {
    id: "2",
    author: "Maria Garcia",
    initials: "MG",
    avatar: assetSrc(mariaImg),
    time: "2h ago",
    content: "Ship looks solid. @david thoughts on the reaction row density?",
    reactions: { up: 9, party: 3, eyes: 0 },
    mine: { up: true },
    replies: [],
  },
]

function renderContent(content: string, keyPrefix: string) {
  return content.split(/(@\w+)/g).map((part, i) =>
    part.startsWith("@") ? (
      <span
        key={`${keyPrefix}-${i}`}
        dir="ltr"
        className="font-medium text-primary"
      >
        {part}
      </span>
    ) : (
      <React.Fragment key={`${keyPrefix}-${i}`}>{part}</React.Fragment>
    )
  )
}

export default function Comments({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [comments, setComments] = React.useState(INITIAL)
  const [draft, setDraft] = React.useState("")

  const insertMention = (handle: string) => {
    setDraft((prev) => {
      const needsSpace = prev.length > 0 && !/\s$/.test(prev)
      return `${prev}${needsSpace ? " " : ""}${handle} `
    })
  }

  const toggleReaction = (commentId: string, reactionId: ReactionId) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id !== commentId) return c
        const active = Boolean(c.mine[reactionId])
        return {
          ...c,
          mine: { ...c.mine, [reactionId]: !active },
          reactions: {
            ...c.reactions,
            [reactionId]: Math.max(
              0,
              c.reactions[reactionId] + (active ? -1 : 1)
            ),
          },
        }
      })
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
        reactions: { up: 0, party: 0, eyes: 0 },
        mine: {},
        replies: [],
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
        className="w-full max-w-2xl overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft"
        aria-labelledby="comments-04-heading"
      >
        <header className="flex flex-wrap items-center gap-2 border-b border-border/70 px-5 py-4 sm:px-6">
          <h1
            id="comments-04-heading"
            className="text-base font-semibold tracking-tight"
          >
            Discussion
          </h1>
          <Badge variant="secondary">Mentions</Badge>
        </header>

        <div className="border-b border-border/70 px-5 py-5 sm:px-6">
          <form onSubmit={post} className="space-y-3">
            <div className="flex items-start gap-3">
              <Avatar className="mt-0.5 size-9 shrink-0">
                <AvatarImage src={assetSrc(alexImg)} alt="" />
                <AvatarFallback className="text-xs">YO</AvatarFallback>
              </Avatar>
              <Textarea
                placeholder="Write a comment… use @ to mention"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={3}
                aria-label="Write a comment"
                className="min-h-0 bg-muted/40"
              />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="me-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <AtSignIcon className="size-3.5" aria-hidden />
                  Mention
                </span>
                {PEOPLE.map((person) => (
                  <button
                    key={person.handle}
                    type="button"
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border/70 bg-muted/40 py-1 pe-2.5 ps-1 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                    onClick={() => insertMention(person.handle)}
                  >
                    <Avatar className="size-5">
                      <AvatarImage src={person.avatar} alt="" />
                      <AvatarFallback className="text-[8px]">
                        {person.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span dir="ltr">{person.handle}</span>
                  </button>
                ))}
              </div>
              <Button
                type="submit"
                size="sm"
                disabled={!draft.trim()}
                className="cursor-pointer gap-1.5 self-end disabled:cursor-not-allowed"
              >
                <SendIcon className="size-3.5" aria-hidden />
                Post
              </Button>
            </div>
          </form>
        </div>

        <div className="px-5 py-2 sm:px-6">
          {comments.map((comment, idx) => (
            <article
              key={comment.id}
              aria-label={`Comment by ${comment.author}`}
              className="py-5"
            >
              {idx > 0 ? <Separator className="mb-5" /> : null}
              <div className="flex items-start gap-3">
                <Avatar className="size-9 shrink-0">
                  <AvatarImage src={comment.avatar} alt="" />
                  <AvatarFallback className="text-xs">
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
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {renderContent(comment.content, comment.id)}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {REACTIONS.map((reaction) => {
                      const count = comment.reactions[reaction.id]
                      const active = Boolean(comment.mine[reaction.id])
                      const empty = count === 0 && !active
                      return (
                        <button
                          key={reaction.id}
                          type="button"
                          className={cn(
                            "inline-flex h-8 cursor-pointer items-center gap-1 rounded-full border px-2.5 text-sm transition-colors",
                            empty &&
                              "border-dashed border-border/70 text-muted-foreground hover:bg-muted/50",
                            !empty &&
                              active &&
                              "border-primary/40 bg-primary/10 text-foreground",
                            !empty &&
                              !active &&
                              "border-border/70 bg-muted/40 text-foreground hover:bg-muted"
                          )}
                          onClick={() =>
                            toggleReaction(comment.id, reaction.id)
                          }
                          aria-label={`React with ${reaction.label}`}
                          aria-pressed={active}
                        >
                          <span aria-hidden>{reaction.label}</span>
                          {!empty ? (
                            <span dir="ltr" className="text-xs font-semibold">
                              {count}
                            </span>
                          ) : null}
                        </button>
                      )
                    })}
                  </div>

                  {comment.replies.length > 0 ? (
                    <div className="mt-4 space-y-3 border-s border-border/70 ps-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="text-start">
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
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
