"use client"

import * as React from "react"
import {
  ArrowRightIcon,
  GitCommitIcon,
  MessageSquareIcon,
  RocketIcon,
  UserPlusIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Card, CardContent } from "@sonojs/ui/components/card"
import { cn } from "@/lib/utils"

import alexImg from "./images/alex.webp"
import davidImg from "./images/david.webp"
import mariaImg from "./images/maria.webp"
import sarahImg from "./images/sarah.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const LIVE = [
  {
    id: "1",
    user: "Sarah Jenkins",
    initials: "SJ",
    avatar: assetSrc(sarahImg),
    title: "Left feedback on Checkout",
    body: "The empty-cart illustration feels a bit heavy — try a lighter stroke.",
    time: "Just now",
    icon: MessageSquareIcon,
    tone: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
  {
    id: "2",
    user: "Alex Rivera",
    initials: "AR",
    avatar: assetSrc(alexImg),
    title: "Deploy finished",
    body: "web@2.14.0 is live in production (us-east-1).",
    time: "8m ago",
    icon: RocketIcon,
    tone: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    id: "3",
    user: "Maria Garcia",
    initials: "MG",
    avatar: assetSrc(mariaImg),
    title: "Merged branch",
    body: "feat/settings-polish · +86 / −12",
    time: "34m ago",
    icon: GitCommitIcon,
    tone: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  },
  {
    id: "4",
    user: "David Chen",
    initials: "DC",
    avatar: assetSrc(davidImg),
    title: "Invited a teammate",
    body: "Jordan Lee joined Design as Editor.",
    time: "1h ago",
    icon: UserPlusIcon,
    tone: "bg-primary/10 text-primary",
  },
  {
    id: "5",
    user: "Sarah Jenkins",
    initials: "SJ",
    avatar: assetSrc(sarahImg),
    title: "Mentioned you in Docs",
    body: "Can you review the API tokens section before Friday?",
    time: "2h ago",
    icon: MessageSquareIcon,
    tone: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  },
] as const

const STATS = [
  { label: "Comments", value: "48", hint: "+12 vs last week" },
  { label: "Deploys", value: "9", hint: "3 to production" },
  { label: "Invites", value: "5", hint: "2 pending" },
] as const

const HIGHLIGHTS = [
  {
    title: "Release 2.14",
    meta: "Alex · production",
    badge: "Deploy",
  },
  {
    title: "Checkout feedback thread",
    meta: "Sarah · 6 replies",
    badge: "Hot",
  },
  {
    title: "Jordan Lee accepted invite",
    meta: "David · Design",
    badge: "Team",
  },
] as const

export default function ActivityFeed({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-full bg-canvas px-4 py-10 text-foreground sm:px-6 sm:py-16",
        className
      )}
      {...props}
    >
      <div className="mx-auto grid w-full max-w-5xl gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.85fr)] lg:items-start">
        <Card className="overflow-hidden border-border/70 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 px-5 py-4 sm:px-6">
            <div className="text-start">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg font-semibold tracking-tight">
                  Live activity
                </h1>
                <Badge
                  variant="outline"
                  className="gap-1.5 border-transparent bg-primary/10 font-medium text-primary"
                >
                  <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                  Live
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Fresh updates across your workspace.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="cursor-pointer"
            >
              Pause
            </Button>
          </div>

          <ul className="divide-y divide-border/70">
            {LIVE.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-start gap-3 px-5 py-4 text-start transition-colors hover:bg-muted/40 sm:gap-4 sm:px-6"
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full",
                        item.tone
                      )}
                    >
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Avatar size="sm">
                          <AvatarImage src={item.avatar} alt="" />
                          <AvatarFallback>{item.initials}</AvatarFallback>
                        </Avatar>
                        <p className="text-sm font-semibold text-foreground">
                          {item.user}
                        </p>
                        <time className="ms-auto text-xs text-muted-foreground">
                          {item.time}
                        </time>
                      </div>
                      <p className="mt-1.5 text-sm font-medium text-foreground">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {item.body}
                      </p>
                    </div>
                    <ArrowRightIcon
                      className="icon-dir mt-2 size-4 shrink-0 text-muted-foreground/50"
                      aria-hidden
                    />
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="border-t border-border/70 px-5 py-3 sm:px-6">
            <Button
              type="button"
              variant="ghost"
              className="w-full cursor-pointer gap-2"
            >
              Open full history
              <ArrowRightIcon className="icon-dir size-4" aria-hidden />
            </Button>
          </div>
        </Card>

        <aside className="space-y-4 lg:sticky lg:top-6">
          <Card className="border-border/70 shadow-soft">
            <CardContent className="space-y-4 p-5">
              <div className="text-start">
                <h2 className="text-sm font-semibold text-foreground">
                  This week
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Snapshot of workspace momentum.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[12px] border border-border/70 bg-muted/40 px-2.5 py-3 text-center"
                  >
                    <p className="text-lg font-semibold tabular-nums text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-[11px] font-medium text-foreground">
                      {stat.label}
                    </p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                      {stat.hint}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 shadow-soft">
            <CardContent className="p-5">
              <h2 className="text-start text-sm font-semibold text-foreground">
                Highlights
              </h2>
              <ul className="mt-3 space-y-2">
                {HIGHLIGHTS.map((item) => (
                  <li key={item.title}>
                    <div className="flex items-start justify-between gap-3 rounded-[12px] border border-border/70 bg-card px-3 py-2.5">
                      <div className="min-w-0 text-start">
                        <p className="truncate text-sm font-medium text-foreground">
                          {item.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.meta}
                        </p>
                      </div>
                      <Badge variant="secondary" className="shrink-0">
                        {item.badge}
                      </Badge>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}
