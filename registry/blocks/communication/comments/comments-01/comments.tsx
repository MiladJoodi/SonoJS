"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  MessageSquareIcon,
  MoreHorizontalIcon,
  SendIcon,
  ThumbsUpIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
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
  id: number
  author: string
  initials: string
  avatar: string
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
  avatar: string
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
    author: "Sarah Jenkins",
    initials: "SJ",
    avatar: assetSrc(sarahImg),
    role: "Maintainer",
    time: "2 hours ago",
    content:
      "This is a solid approach for accessible dialogs. Also consider `inert` on the rest of the page while the modal is open — it’s supported in modern browsers now.",
    likes: 12,
    liked: false,
    replies: [
      {
        id: 11,
        author: "Alex Rivera",
        initials: "AR",
        avatar: assetSrc(alexImg),
        time: "1 hour ago",
        content:
          "Great point — we added `inert` in v1.2 alongside the focus trap so screen readers stay inside the dialog.",
        likes: 5,
        liked: false,
      },
      {
        id: 12,
        author: "David Chen",
        initials: "DC",
        avatar: assetSrc(davidImg),
        time: "45 min ago",
        content:
          "Is `inert` preferable to `aria-hidden` on the root? We’ve been using the latter.",
        likes: 2,
        liked: false,
      },
    ],
  },
  {
    id: 2,
    author: "Maria Garcia",
    initials: "MG",
    avatar: assetSrc(mariaImg),
    time: "4 hours ago",
    content:
      "The CSS variables comparison was useful. Moving our theme to custom properties cut about 14 KB from the JS bundle.",
    likes: 8,
    liked: false,
    replies: [],
  },
  {
    id: 3,
    author: "Alex Rivera",
    initials: "AR",
    avatar: assetSrc(alexImg),
    time: "6 hours ago",
    content:
      "Would love a follow-up on responsive tokens — should spacing scale at breakpoints, or should components own that?",
    likes: 15,
    liked: false,
    replies: [
      {
        id: 31,
        author: "Sarah Jenkins",
        initials: "SJ",
        avatar: assetSrc(sarahImg),
        role: "Maintainer",
        time: "5 hours ago",
        content:
          "We keep tokens static and let components handle breakpoints. Keeps the token layer predictable.",
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
          "inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-colors",
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
          className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label={`Reply${replyCount ? ` (${replyCount} replies)` : ""}`}
        >
          <MessageSquareIcon className="size-3.5" aria-hidden />
          Reply
        </button>
      ) : null}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="ms-auto size-8 cursor-pointer"
            aria-label="More options"
          >
            <MoreHorizontalIcon className="size-3.5" aria-hidden />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem className="cursor-pointer">Copy link</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Report</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" className="cursor-pointer">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function ReplyInput({ onSubmit }: { onSubmit: (text: string) => void }) {
  const [text, setText] = React.useState("")

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (!text.trim()) return
        onSubmit(text.trim())
        setText("")
      }}
      className="w-full"
    >
      <div className="flex w-full items-start gap-3">
        <Avatar className="mt-0.5 size-7 shrink-0">
          <AvatarImage src={assetSrc(alexImg)} alt="" />
          <AvatarFallback className="text-[10px]">YO</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col gap-2">
          <Textarea
            placeholder="Write a reply…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={2}
            aria-label="Write a reply"
            className="min-h-0 bg-muted/40 text-sm"
          />
          <div className="flex justify-end gap-2">
            <Button
              type="submit"
              size="sm"
              disabled={!text.trim()}
              className="cursor-pointer disabled:cursor-not-allowed"
            >
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
}: React.ComponentProps<"div">) {
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
    setComments((prev) => [
      {
        id: Date.now(),
        author: "You",
        initials: "YO",
        avatar: assetSrc(alexImg),
        time: "Just now",
        content: newComment.trim(),
        likes: 0,
        liked: false,
        replies: [],
      },
      ...prev,
    ])
    setNewComment("")
  }

  function handleAddReply(commentId: number, text: string) {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? {
              ...c,
              replies: [
                ...c.replies,
                {
                  id: Date.now(),
                  author: "You",
                  initials: "YO",
                  avatar: assetSrc(alexImg),
                  time: "Just now",
                  content: text,
                  likes: 0,
                  liked: false,
                },
              ],
            }
          : c
      )
    )
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
        aria-labelledby="comments-01-heading"
      >
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-2 text-start">
            <h1
              id="comments-01-heading"
              className="text-base font-semibold tracking-tight"
            >
              Discussion
            </h1>
            <Badge variant="secondary" className="tabular-nums">
              <span dir="ltr">{totalComments}</span>
            </Badge>
          </div>
        </header>

        <div className="border-b border-border/70 px-5 py-5 sm:px-6">
          <form onSubmit={handleAddComment}>
            <div className="flex items-start gap-3">
              <Avatar className="mt-0.5 size-9 shrink-0">
                <AvatarImage src={assetSrc(alexImg)} alt="" />
                <AvatarFallback className="text-xs">YO</AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-1 flex-col gap-3">
                <Textarea
                  placeholder="Join the discussion…"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                  aria-label="Write a comment"
                  className="min-h-0 bg-muted/40"
                />
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    size="sm"
                    disabled={!newComment.trim()}
                    className="cursor-pointer disabled:cursor-not-allowed"
                  >
                    <SendIcon className="size-3.5" aria-hidden />
                    Post comment
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="px-5 py-2 sm:px-6">
          {displayedComments.map((comment, idx) => (
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
                    {comment.role ? (
                      <Badge
                        variant="outline"
                        className="border-transparent bg-primary/10 text-primary"
                      >
                        {comment.role}
                      </Badge>
                    ) : null}
                    <time className="text-xs text-muted-foreground">
                      {comment.time}
                    </time>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {comment.content}
                  </p>
                  <div className="mt-2">
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
                    <div className="mt-4 space-y-4 border-s border-border/70 ps-4">
                      {comment.replies.map((reply) => (
                        <article
                          key={reply.id}
                          aria-label={`Reply by ${reply.author}`}
                        >
                          <div className="flex items-start gap-2.5">
                            <Avatar className="size-7 shrink-0">
                              <AvatarImage src={reply.avatar} alt="" />
                              <AvatarFallback className="text-[10px]">
                                {reply.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-sm font-semibold">
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
                                <time className="text-xs text-muted-foreground">
                                  {reply.time}
                                </time>
                              </div>
                              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                {reply.content}
                              </p>
                              <div className="mt-1.5">
                                <CommentActions
                                  likes={reply.likes}
                                  liked={reply.liked}
                                  onLike={() =>
                                    handleLikeReply(comment.id, reply.id)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  ) : null}

                  {replyingTo === comment.id ? (
                    <div className="mt-4">
                      <ReplyInput
                        onSubmit={(text) => handleAddReply(comment.id, text)}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>

        {!showAll && comments.length > 2 ? (
          <div className="border-t border-border/70 px-5 py-3 sm:px-6">
            <Button
              type="button"
              variant="ghost"
              className="w-full cursor-pointer"
              onClick={() => setShowAll(true)}
            >
              <ChevronDownIcon className="size-4" aria-hidden />
              Show {comments.length - 2} more{" "}
              {comments.length - 2 === 1 ? "comment" : "comments"}
            </Button>
          </div>
        ) : null}
      </section>
    </div>
  )
}
