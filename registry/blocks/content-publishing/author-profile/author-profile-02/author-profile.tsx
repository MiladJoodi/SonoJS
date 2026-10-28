"use client"

import * as React from "react"
import {
  BookOpenIcon,
  HeartIcon,
  MessageSquareIcon,
  UsersIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import cover01 from "./images/cover-01.webp"
import portrait01 from "./images/portrait-01.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const AUTHOR = {
  name: "Maya Chen",
  handle: "@mayachen",
  initials: "MC",
  role: "Senior Engineer",
  company: "Northwind",
  bio: "Building the future of web apps. OSS contributor, design systems nerd, and occasional blogger.",
  followers: 12400,
  following: 384,
  posts: 142,
  portrait: assetSrc(portrait01),
  cover: assetSrc(cover01),
  tags: ["React", "TypeScript", "Design Systems"],
  recentPosts: [
    {
      title: "Why I switched from CSS Modules to utility-first CSS",
      likes: 428,
      comments: 34,
      date: "Oct 12, 2026",
    },
    {
      title: "Building accessible component libraries from scratch",
      likes: 312,
      comments: 21,
      date: "Sep 28, 2026",
    },
    {
      title: "Tokens that survive a rebrand",
      likes: 256,
      comments: 18,
      date: "Sep 3, 2026",
    },
  ],
}

function formatCount(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)
}

export default function AuthorProfile({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [following, setFollowing] = React.useState(false)

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-background py-14 text-foreground sm:py-20",
        className
      )}
      aria-labelledby="author-profile-02-heading"
      {...props}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <article className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
          <div className="relative aspect-[3/1] w-full overflow-hidden bg-muted sm:h-56 sm:aspect-auto">
            <img
              src={AUTHOR.cover}
              alt=""
              className="size-full object-cover"
              aria-hidden
            />
          </div>

          <div className="relative px-5 pb-6 sm:px-8 sm:pb-8">
            <div className="-mt-12 mb-5 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
              <Avatar className="size-24 ring-4 ring-card sm:size-28">
                <AvatarImage src={AUTHOR.portrait} alt="" />
                <AvatarFallback className="text-xl">
                  {AUTHOR.initials}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant={following ? "outline" : "default"}
                  aria-pressed={following}
                  className="cursor-pointer"
                  onClick={() => setFollowing((f) => !f)}
                >
                  <UsersIcon className="size-4" aria-hidden />
                  {following ? "Following" : "Follow"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => undefined}
                >
                  <MessageSquareIcon className="size-4" aria-hidden />
                  Message
                </Button>
              </div>
            </div>

            <div className="mb-4 text-start">
              <h1
                id="author-profile-02-heading"
                className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
              >
                {AUTHOR.name}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground" dir="ltr">
                {AUTHOR.handle}
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {AUTHOR.role} at{" "}
                <span className="font-semibold text-foreground">
                  {AUTHOR.company}
                </span>
              </p>
            </div>

            <p className="mb-5 max-w-2xl text-start text-sm leading-relaxed text-muted-foreground sm:text-base">
              {AUTHOR.bio}
            </p>

            <div className="mb-5 flex flex-wrap gap-2">
              {AUTHOR.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="mb-8 grid grid-cols-3 overflow-hidden rounded-[12px] border border-border/70 bg-muted/40">
              {(
                [
                  ["Followers", formatCount(AUTHOR.followers)],
                  ["Following", formatCount(AUTHOR.following)],
                  ["Posts", String(AUTHOR.posts)],
                ] as const
              ).map(([label, value], i) => (
                <div
                  key={label}
                  className={cn(
                    "flex flex-col items-center py-3.5 sm:py-4",
                    i < 2 && "border-e border-border/70"
                  )}
                >
                  <p
                    dir="ltr"
                    className="text-base font-bold tabular-nums text-foreground sm:text-lg"
                  >
                    {value}
                  </p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2">
                <BookOpenIcon
                  className="size-3.5 text-muted-foreground"
                  aria-hidden
                />
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Recent posts
                </p>
              </div>
              <ul
                className="divide-y divide-border/70 overflow-hidden rounded-[12px] border border-border/70"
                role="list"
              >
                {AUTHOR.recentPosts.map((post) => (
                  <li key={post.title}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="flex cursor-pointer flex-col gap-2 p-4 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0 flex-1 text-start">
                        <p className="text-sm font-medium text-foreground">
                          {post.title}
                        </p>
                        <p
                          className="mt-1 text-xs text-muted-foreground"
                          dir="ltr"
                        >
                          {post.date}
                        </p>
                      </div>
                      <span className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
                        <span
                          dir="ltr"
                          className="inline-flex items-center gap-1 tabular-nums"
                        >
                          <HeartIcon className="size-3.5" aria-hidden />
                          {post.likes}
                        </span>
                        <span
                          dir="ltr"
                          className="inline-flex items-center gap-1 tabular-nums"
                        >
                          <MessageSquareIcon className="size-3.5" aria-hidden />
                          {post.comments}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
