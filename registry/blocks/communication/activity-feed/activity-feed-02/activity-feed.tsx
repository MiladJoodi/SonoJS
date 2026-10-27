"use client"

import type * as React from "react"
import {
  CheckCircle2Icon,
  ChevronRightIcon,
  FileTextIcon,
  GitMergeIcon,
  MessageSquareIcon,
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

const AVATARS = [
  { src: assetSrc(sarahImg), initials: "SJ", name: "Sarah Jenkins" },
  { src: assetSrc(alexImg), initials: "AR", name: "Alex Rivera" },
  { src: assetSrc(davidImg), initials: "DL", name: "David Lee" },
  { src: assetSrc(mariaImg), initials: "MG", name: "Maria Garcia" },
] as const

function TimelineRail({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <ol
      className={cn(
        "relative ms-3 space-y-8 border-s border-border/70 ps-8 sm:ms-4",
        className
      )}
    >
      {children}
    </ol>
  )
}

function TimelineItem({
  icon: Icon,
  iconWrap,
  iconClass,
  title,
  time,
  children,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  iconWrap: string
  iconClass: string
  title: string
  time: string
  children: React.ReactNode
}) {
  return (
    <li className="relative">
      <span
        className={cn(
          "absolute -start-[2.55rem] top-0 flex size-9 items-center justify-center rounded-full ring-4 ring-white dark:ring-background sm:-start-[2.7rem]",
          iconWrap
        )}
      >
        <Icon className={cn("size-[18px]", iconClass)} aria-hidden />
      </span>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        <time className="shrink-0 rounded-full bg-muted/70 px-3 py-1 text-xs text-muted-foreground">
          {time}
        </time>
      </div>
      <div className="mt-3">{children}</div>
    </li>
  )
}

export default function ActivityFeed({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white py-8 text-foreground dark:bg-background",
        className
      )}
      aria-labelledby="activity-feed-02-heading"
      {...props}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="text-start">
            <h1
              id="activity-feed-02-heading"
              className="text-xl font-semibold tracking-tight text-foreground"
            >
              Activity Feed
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Tracking real-time workspace updates
            </p>
          </div>
          <Badge
            variant="outline"
            className="h-10 gap-2 rounded-[10px] border-transparent bg-primary/10 px-5 font-semibold text-primary"
          >
            <span className="size-2 animate-pulse rounded-full bg-primary" />
            24 New Events
          </Badge>
        </header>

        <TimelineRail>
          <TimelineItem
            icon={CheckCircle2Icon}
            iconWrap="bg-emerald-500/10"
            iconClass="text-emerald-600 dark:text-emerald-400"
            title="Design System V5.0 Published"
            time="1h ago"
          >
            <div className="rounded-[12px] border border-emerald-500/20 bg-emerald-500/5 p-4 transition-colors hover:bg-emerald-500/10">
              <p className="text-sm font-medium leading-relaxed text-muted-foreground">
                The latest iteration of the core component library is now live.
                Includes full support for{" "}
                <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                  Tailwind CSS v4
                </span>{" "}
                and{" "}
                <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                  React 19
                </span>
                . Accessibility verified across the installable set.
              </p>
              <div className="mt-3 flex items-center gap-3">
                <Avatar className="size-8 ring-2 ring-emerald-500/20">
                  <AvatarImage src={AVATARS[1].src} alt="" />
                  <AvatarFallback className="text-[10px]">
                    {AVATARS[1].initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 text-start">
                  <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                    Release Manager
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    Merged by Alex Rivera
                  </p>
                </div>
              </div>
            </div>
          </TimelineItem>

          <TimelineItem
            icon={MessageSquareIcon}
            iconWrap="bg-primary/10"
            iconClass="text-primary"
            title="New comments on Dashboard"
            time="3h ago"
          >
            <button
              type="button"
              className="group flex w-full cursor-pointer items-start gap-4 rounded-[12px] border border-border/70 bg-card p-4 text-start shadow-soft transition-all hover:border-primary/30 hover:bg-muted/30"
            >
              <Avatar className="size-8 shrink-0 ring-2 ring-primary/10">
                <AvatarImage src={AVATARS[0].src} alt="" />
                <AvatarFallback className="text-[10px]">
                  {AVATARS[0].initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-primary">
                    Sarah Jenkins
                  </p>
                  <p
                    dir="ltr"
                    className="text-xs text-muted-foreground"
                  >
                    3:42 PM
                  </p>
                </div>
                <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  I think the sidebar transitions should be slightly faster to
                  match the rest of the application&apos;s snappy feel. What do
                  you think?
                </p>
              </div>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border/70 bg-muted/40 transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                <ChevronRightIcon
                  className="icon-dir size-4 text-muted-foreground/40 group-hover:text-primary-foreground"
                  aria-hidden
                />
              </span>
            </button>
          </TimelineItem>

          <TimelineItem
            icon={UserPlusIcon}
            iconWrap="bg-sky-500/10"
            iconClass="text-sky-600 dark:text-sky-400"
            title="Workspace Expansion"
            time="Yesterday"
          >
            <div className="rounded-[12px] border border-border/70 bg-muted/30 p-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex -space-x-3 rtl:space-x-reverse">
                  {AVATARS.map((person) => (
                    <Avatar
                      key={person.initials}
                      className="size-9 ring-2 ring-white dark:ring-background transition-transform hover:z-10 hover:scale-105"
                    >
                      <AvatarImage src={person.src} alt="" />
                      <AvatarFallback className="text-[10px]">
                        {person.initials}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  <span className="flex size-9 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground ring-2 ring-white dark:ring-background">
                    +12
                  </span>
                </div>
                <div className="min-w-0 text-start">
                  <p className="text-sm font-bold text-foreground">
                    Liam O&apos;Connor joined
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Invited by Marcus Thorne
                  </p>
                </div>
              </div>
            </div>
          </TimelineItem>

          <TimelineItem
            icon={GitMergeIcon}
            iconWrap="bg-amber-500/15"
            iconClass="text-amber-700 dark:text-amber-300"
            title="Code Integration"
            time="2 days ago"
          >
            <Card className="overflow-hidden border-2 border-dashed border-border/80 bg-transparent shadow-none transition-colors hover:border-amber-500/45">
              <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-amber-500/10 text-amber-700 dark:text-amber-300">
                    <FileTextIcon className="size-[18px]" aria-hidden />
                  </span>
                  <div className="min-w-0 text-start">
                    <p className="text-xs text-muted-foreground">Branch Merge</p>
                    <p
                      dir="ltr"
                      className="font-semibold text-foreground"
                    >
                      feat/calendar-refactor
                    </p>
                    <p
                      dir="ltr"
                      className="mt-1 text-xs font-medium text-amber-700 dark:text-amber-300"
                    >
                      +248 additions / −12 deletions
                    </p>
                  </div>
                </div>
                <Button type="button" variant="ghost" size="sm">
                  View Diff
                </Button>
              </CardContent>
            </Card>
          </TimelineItem>
        </TimelineRail>

        <footer className="mt-10 text-center">
          <Button type="button" variant="secondary" size="sm" className="px-8">
            Explore Full History
          </Button>
        </footer>
      </div>
    </section>
  )
}
