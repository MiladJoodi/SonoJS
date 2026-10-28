"use client"

import * as React from "react"
import {
  BookOpenIcon,
  HeartIcon,
  MessageSquareIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import { Button } from "@sonojs/ui/components/button"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

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
  portrait: assetSrc(portrait01),
  followers: 12400,
  posts: 142,
  likes: 28400,
  metrics: [
    {
      label: "Followers",
      value: "12.4k",
      change: "+8.2%",
      fill: 78,
      icon: UsersIcon,
    },
    {
      label: "Posts",
      value: "142",
      change: "+12",
      fill: 62,
      icon: BookOpenIcon,
    },
    {
      label: "Likes",
      value: "28.4k",
      change: "+4.1%",
      fill: 91,
      icon: HeartIcon,
    },
  ],
  weekly: [42, 58, 36, 74, 68, 88, 76],
  recentPosts: [
    {
      title: "Why I switched from CSS Modules to utility-first CSS",
      likes: 428,
      comments: 34,
      reach: 82,
    },
    {
      title: "Building accessible component libraries from scratch",
      likes: 312,
      comments: 21,
      reach: 64,
    },
    {
      title: "Token pipelines that survive a rebrand",
      likes: 256,
      comments: 18,
      reach: 51,
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
  const maxWeekly = Math.max(...AUTHOR.weekly)

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-background py-14 text-foreground sm:py-20",
        className
      )}
      aria-labelledby="author-profile-09-heading"
      {...props}
    >
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <article className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex min-w-0 items-center gap-4">
              <Avatar className="size-14 shrink-0 ring-2 ring-border/70">
                <AvatarImage src={AUTHOR.portrait} alt="" />
                <AvatarFallback>{AUTHOR.initials}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 text-start">
                <div className="flex flex-wrap items-center gap-2">
                  <h1
                    id="author-profile-09-heading"
                    className="truncate text-lg font-semibold text-foreground"
                  >
                    {AUTHOR.name}
                  </h1>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
                    <TrendingUpIcon className="size-3" aria-hidden />
                    Live
                  </span>
                </div>
                <p className="text-sm text-muted-foreground" dir="ltr">
                  {AUTHOR.handle}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {AUTHOR.role} at {AUTHOR.company}
                </p>
              </div>
            </div>
            <Button
              type="button"
              size="sm"
              variant={following ? "outline" : "default"}
              aria-pressed={following}
              className="w-full cursor-pointer sm:w-auto"
              onClick={() => setFollowing((f) => !f)}
            >
              <UsersIcon className="size-3.5" aria-hidden />
              {following ? "Following" : "Follow"}
            </Button>
          </div>

          <Separator />

          <div className="grid gap-3 p-5 sm:grid-cols-3 sm:p-6">
            {AUTHOR.metrics.map((metric) => {
              const Icon = metric.icon
              return (
                <div
                  key={metric.label}
                  className="rounded-[12px] border border-border/70 bg-muted/30 p-4"
                >
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="flex size-7 items-center justify-center rounded-md bg-background text-muted-foreground">
                      <Icon className="size-3.5" aria-hidden />
                    </span>
                    <span
                      className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300"
                      dir="ltr"
                    >
                      {metric.change}
                    </span>
                  </div>
                  <p
                    className="text-2xl font-semibold tracking-tight tabular-nums text-foreground"
                    dir="ltr"
                  >
                    {metric.value}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {metric.label}
                  </p>
                  <div
                    className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted"
                    role="presentation"
                  >
                    <div
                      className="h-full rounded-full bg-primary transition-[width]"
                      style={{ width: `${metric.fill}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="px-5 pb-2 sm:px-6">
            <div className="rounded-[12px] border border-border/70 bg-muted/20 p-4">
              <div className="mb-3 flex items-center justify-between gap-2">
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Engagement · 7 days
                </p>
                <p className="text-xs text-muted-foreground" dir="ltr">
                  Peak {maxWeekly}
                </p>
              </div>
              <div
                className="flex h-16 items-end gap-1.5"
                role="img"
                aria-label="Weekly engagement bars"
              >
                {AUTHOR.weekly.map((value, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm bg-primary/80"
                    style={{
                      height: `${Math.max(12, (value / maxWeekly) * 100)}%`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="mb-3 flex items-center gap-2">
              <BookOpenIcon
                className="size-3.5 text-muted-foreground"
                aria-hidden
              />
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Recent posts
              </p>
            </div>
            <ul className="space-y-1" role="list">
              {AUTHOR.recentPosts.map((post) => (
                <li key={post.title}>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="group -mx-2 flex cursor-pointer flex-col gap-2 rounded-md px-2 py-3 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0 flex-1 text-start">
                      <p className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                        {post.title}
                      </p>
                      <div
                        className="mt-2 h-1 max-w-40 overflow-hidden rounded-full bg-muted"
                        role="presentation"
                      >
                        <div
                          className="h-full rounded-full bg-primary/70"
                          style={{ width: `${post.reach}%` }}
                        />
                      </div>
                    </div>
                    <span className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
                      <span
                        dir="ltr"
                        className="inline-flex items-center gap-1 tabular-nums"
                      >
                        <HeartIcon className="size-3" aria-hidden />
                        {formatCount(post.likes)}
                      </span>
                      <span
                        dir="ltr"
                        className="inline-flex items-center gap-1 tabular-nums"
                      >
                        <MessageSquareIcon className="size-3" aria-hidden />
                        {post.comments}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </section>
  )
}
