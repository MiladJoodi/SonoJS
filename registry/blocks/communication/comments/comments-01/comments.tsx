"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  MessageSquareIcon,
  MoreHorizontalIcon,
  SendIcon,
  ThumbsUpIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Separator } from "@sonojs/ui/components/separator"
import { Textarea } from "@sonojs/ui/components/textarea"
import { cn } from "@/lib/utils"

type Reply = {
  id: number
  author: string
  initials: string
  role?: string
  time: string
  content: string
  likes: number
  liked: boolean
}

type Comment = {
  id: number
  author: string
  initials: string
  role?: string
  time: string
  content: string
  likes: number
  liked: boolean
  replies: Reply[]
}

const INITIAL_COMMENTS: Comment[] = [
  {
    id: 1,
    author: "Sarah Chen",
    initials: "SC",
    role: "Maintainer",
    time: "2 hours ago",
    content:
      "This is a great approach to handling accessible dialogs. One thing I would add is that you should also consider the inert attribute on the rest of the page content when the modal is open. It is now supported in all modern browsers.",
    likes: 12,
    liked: false,
    replies: [
      {
        id: 11,
        author: "Alex Rivera",
        initials: "AR",
        time: "1 hour ago",
        content:
          "Great point! We actually added inert support in v1.2. It works alongside the focus trap to ensure screen readers cannot navigate outside the dialog.",
        likes: 5,
        liked: false,
      },
      {
        id: 12,
        author: "Jordan Lee",
        initials: "JL",
        time: "45 min ago",
        content:
          "Is inert better than aria-hidden on the root? We have been using the latter approach.",
        likes: 2,
        liked: false,
      },
    ],
  },
  {
    id: 2,
    author: "Marcus Kim",
    initials: "MK",
    time: "4 hours ago",
    content:
      "I have been looking for exactly this kind of breakdown. The comparison between CSS-in-JS theming and pure CSS custom properties was super helpful. Switching our entire design system to CSS variables reduced our JS bundle by 14 KB.",
    likes: 8,
    liked: false,
    replies: [],
  },
  {
    id: 3,
    author: "Priya Patel",
    initials: "PP",
    time: "6 hours ago",
    content:
      "Would love to see a follow-up article covering how to handle responsive tokens with @theme. For example, should spacing scale change at breakpoints, or should components handle that themselves?",
    likes: 15,
    liked: false,
    replies: [
      {
        id: 31,
        author: "Sarah Chen",
        initials: "SC",
        role: "Maintainer",
        time: "5 hours ago",
        content:
          "That is a great topic for a future article! Short answer: we keep tokens static and let components handle responsive behavior via Tailwind breakpoints. It keeps the token layer simple and predictable.",
        likes: 7,
        liked: false,
      },
    ],
  },
]

function CommentActions({
  likes,
  liked,
  onLike,
  replyCount,
  onReply,
}: {
  likes: number
  liked: boolean
  onLike: () => void
  replyCount?: number
  onReply?: () => void
}) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={onLike}
        className={cn(
          "inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-colors",
          liked
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
        aria-label={`${liked ? "Unlike" : "Like"} (${likes} likes)`}
        aria-pressed={liked}
      >
        <ThumbsUpIcon className="size-3.5" aria-hidden />
        <span dir="ltr">{likes}</span>
      </button>
      {onReply ? (
        <button
          type="button"
          onClick={onReply}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label={`Reply${replyCount ? ` (${replyCount} replies)` : ""}`}
        >
          <MessageSquareIcon className="size-3.5" aria-hidden />
          Reply
        </button>
      ) : null}
      <button
        type="button"
        className="ms-auto inline-flex cursor-pointer items-center rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="More options"
      >
        <MoreHorizontalIcon className="size-3.5" aria-hidden />
      </button>
    </div>
  )
}

function ReplyInput({ onSubmit }: { onSubmit: (text: string) => void }) {
  const [text, setText] = React.useState("")

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (text.trim()) {
          onSubmit(text.trim())
          setText("")
        }
      }}
      className="w-full"
    >
      <div className="flex w-full items-start gap-3">
        <Avatar className="mt-1 size-7 shrink-0">
          <AvatarFallback className="text-[10px]">YO</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col gap-2">
          <Textarea
            placeholder="Write a reply…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={2}
            aria-label="Write a reply"
            className="min-h-0 text-sm"
          />
          <div className="flex justify-end">
            <Button type="submit" size="sm" disabled={!text.trim()}>
              <SendIcon className="size-3.5" aria-hidden />
              Reply
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default function Comments({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [comments, setComments] = React.useState(INITIAL_COMMENTS)
  const [newComment, setNewComment] = React.useState("")
  const [replyingTo, setReplyingTo] = React.useState<number | null>(null)
  const [showAll, setShowAll] = React.useState(false)

  const displayedComments = showAll ? comments : comments.slice(0, 2)
  const totalComments = comments.reduce(
    (sum, c) => sum + 1 + c.replies.length,
    0
  )

  function handleLikeComment(commentId: number) {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? {
              ...c,
              liked: !c.liked,
              likes: c.liked ? c.likes - 1 : c.likes + 1,
            }
          : c
      )
    )
  }

  function handleLikeReply(commentId: number, replyId: number) {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? {
              ...c,
              replies: c.replies.map((r) =>
                r.id === replyId
                  ? {
                      ...r,
                      liked: !r.liked,
                      likes: r.liked ? r.likes - 1 : r.likes + 1,
                    }
                  : r
              ),
            }
          : c
      )
    )
  }

  function handleAddComment(e: React.FormEvent) {
    e.preventDefault()
    if (!newComment.trim()) return
    const comment: Comment = {
      id: Date.now(),
      author: "You",
      initials: "YO",
      time: "Just now",
      content: newComment.trim(),
      likes: 0,
      liked: false,
      replies: [],
    }
    setComments((prev) => [comment, ...prev])
    setNewComment("")
  }

  function handleAddReply(commentId: number, text: string) {
    const reply: Reply = {
      id: Date.now(),
      author: "You",
      initials: "YO",
      time: "Just now",
      content: text,
      likes: 0,
      liked: false,
    }
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId ? { ...c, replies: [...c.replies, reply] } : c
      )
    )
    setReplyingTo(null)
  }

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas py-16 text-foreground sm:py-24",
        className
      )}
      aria-labelledby="comments-01-heading"
      {...props}
    >
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="mb-8 flex items-center gap-3">
          <h2
            id="comments-01-heading"
            className="text-xl font-semibold tracking-tight text-foreground"
          >
            Discussion
          </h2>
          <Badge variant="secondary" className="font-semibold">
            <span dir="ltr">{totalComments} comments</span>
          </Badge>
        </div>

        <div className="mb-10 rounded-[12px] border border-border/70 bg-card p-5 shadow-soft">
          <form onSubmit={handleAddComment}>
            <div className="flex items-start gap-4">
              <Avatar className="mt-1 size-9 shrink-0 ring-2 ring-primary/10">
                <AvatarFallback className="text-xs">YO</AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col gap-4">
                <Textarea
                  placeholder="Join the discussion…"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                  aria-label="Write a comment"
                  className="bg-muted/40 focus-visible:bg-card"
                />
                <div className="flex justify-end">
                  <Button type="submit" disabled={!newComment.trim()}>
                    <SendIcon className="size-4" aria-hidden />
                    Post Comment
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="flex flex-col">
          {displayedComments.map((comment, idx) => (
            <article
              key={comment.id}
              aria-label={`Comment by ${comment.author}`}
              className="group/comment"
            >
              {idx > 0 ? <Separator className="my-8 opacity-50" /> : null}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Avatar className="size-9 shrink-0 transition-transform group-hover/comment:scale-105">
                    <AvatarFallback className="text-xs">
                      {comment.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 text-start">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-foreground">
                        {comment.author}
                      </span>
                      {comment.role ? (
                        <Badge
                          variant="outline"
                          className="border-transparent bg-primary/10 text-primary"
                        >
                          {comment.role}
                        </Badge>
                      ) : null}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {comment.time}
                    </p>
                  </div>
                </div>

                <p className="ps-4 text-sm leading-relaxed text-muted-foreground sm:ps-12">
                  {comment.content}
                </p>

                <div className="ps-4 sm:ps-12">
                  <CommentActions
                    likes={comment.likes}
                    liked={comment.liked}
                    onLike={() => handleLikeComment(comment.id)}
                    replyCount={comment.replies.length}
                    onReply={() =>
                      setReplyingTo(
                        replyingTo === comment.id ? null : comment.id
                      )
                    }
                  />
                </div>

                {comment.replies.length > 0 ? (
                  <div className="ms-4 border-s-2 border-border/70 ps-4 sm:ms-12 sm:ps-5">
                    <div className="flex flex-col gap-4">
                      {comment.replies.map((reply) => (
                        <article
                          key={reply.id}
                          aria-label={`Reply by ${reply.author}`}
                        >
                          <div className="flex flex-col gap-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <Avatar className="size-7">
                                <AvatarFallback className="text-[10px]">
                                  {reply.initials}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-semibold text-foreground">
                                {reply.author}
                              </span>
                              {reply.role ? (
                                <Badge
                                  variant="outline"
                                  className="border-transparent bg-primary/10 text-primary"
                                >
                                  {reply.role}
                                </Badge>
                              ) : null}
                              <span className="text-xs text-muted-foreground">
                                {reply.time}
                              </span>
                            </div>
                            <p className="ps-1 text-sm leading-relaxed text-muted-foreground sm:ps-9">
                              {reply.content}
                            </p>
                            <div className="ps-1 sm:ps-9">
                              <CommentActions
                                likes={reply.likes}
                                liked={reply.liked}
                                onLike={() =>
                                  handleLikeReply(comment.id, reply.id)
                                }
                              />
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                ) : null}

                {replyingTo === comment.id ? (
                  <div className="ms-4 ps-4 sm:ms-12 sm:ps-5">
                    <ReplyInput
                      onSubmit={(text) => handleAddReply(comment.id, text)}
                    />
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        {!showAll && comments.length > 2 ? (
          <div className="mt-8 text-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAll(true)}
            >
              <ChevronDownIcon className="size-4" aria-hidden />
              Show {comments.length - 2} more{" "}
              {comments.length - 2 === 1 ? "comment" : "comments"}
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
