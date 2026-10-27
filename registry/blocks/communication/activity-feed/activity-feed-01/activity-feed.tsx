"use client"

import * as React from "react"
import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  FileTextIcon,
  FilterIcon,
  GitCommitIcon,
  MessageSquareIcon,
  MoreHorizontalIcon,
  UserPlusIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@sonojs/ui/components/card"
import { cn } from "@/lib/utils"

import alexImg from "./images/alex.webp"
import davidImg from "./images/david.webp"
import mariaImg from "./images/maria.webp"
import sarahImg from "./images/sarah.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

type Activity = {
  id: number
  type: "comment" | "commit" | "team" | "document" | "system" | "alert"
  user: string
  initials: string
  avatar: string | null
  action: string
  target: string
  timestamp: string
  content: string | null
  icon: React.ElementType
  iconClass: string
  iconWrap: string
}

const ACTIVITIES: Activity[] = [
  {
    id: 1,
    type: "comment",
    user: "Sarah Jenkins",
    initials: "SJ",
    avatar: assetSrc(sarahImg),
    action: "commented on",
    target: "Q3 Marketing Plan",
    timestamp: "2 hours ago",
    content:
      "I think we should increase the budget for social media ads by 15% this quarter based on last month's ROI.",
    icon: MessageSquareIcon,
    iconClass: "text-sky-600 dark:text-sky-400",
    iconWrap: "bg-sky-500/10",
  },
  {
    id: 2,
    type: "commit",
    user: "Alex Rivera",
    initials: "AR",
    avatar: assetSrc(alexImg),
    action: "pushed code to",
    target: "main branch",
    timestamp: "4 hours ago",
    content: "fix: resolve hydration mismatch in production build (#412)",
    icon: GitCommitIcon,
    iconClass: "text-emerald-700 dark:text-emerald-400",
    iconWrap: "bg-emerald-500/10",
  },
  {
    id: 3,
    type: "team",
    user: "David Chen",
    initials: "DC",
    avatar: assetSrc(davidImg),
    action: "invited",
    target: "Emma Stone to the Workspace",
    timestamp: "Yesterday, 2:30 PM",
    content: null,
    icon: UserPlusIcon,
    iconClass: "text-primary",
    iconWrap: "bg-primary/10",
  },
  {
    id: 4,
    type: "document",
    user: "Maria Garcia",
    initials: "MG",
    avatar: assetSrc(mariaImg),
    action: "uploaded a new file",
    target: "Brand_Guidelines_2026.pdf",
    timestamp: "Oct 24, 10:15 AM",
    content: null,
    icon: FileTextIcon,
    iconClass: "text-amber-600 dark:text-amber-400",
    iconWrap: "bg-amber-500/10",
  },
  {
    id: 5,
    type: "system",
    user: "System",
    initials: "SY",
    avatar: null,
    action: "completed automated backup",
    target: "Database Cluster US-East",
    timestamp: "Oct 23, 12:00 AM",
    content: "Backup completed successfully. 45GB archived to cold storage.",
    icon: CheckCircle2Icon,
    iconClass: "text-emerald-700 dark:text-emerald-400",
    iconWrap: "bg-emerald-500/10",
  },
  {
    id: 6,
    type: "alert",
    user: "Security Bot",
    initials: "SB",
    avatar: null,
    action: "detected multiple failed login attempts",
    target: "admin@company.com",
    timestamp: "Oct 22, 11:45 PM",
    content:
      "5 failed attempts from IP 192.168.1.42 within 10 minutes. Account temporarily locked.",
    icon: AlertTriangleIcon,
    iconClass: "text-destructive",
    iconWrap: "bg-destructive/10",
  },
]

export default function ActivityFeed01() {
  return (
    <div className="min-h-svh bg-white px-4 py-10 text-foreground dark:bg-background sm:px-6">
      <Card className="mx-auto max-w-3xl border-border/70 shadow-soft">
        <CardHeader className="border-b border-border/70 pb-4">
          <div className="flex w-full flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle>Activity Feed</CardTitle>
              <CardDescription>
                Recent events across your workspace.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="sm" className="gap-1.5">
                <FilterIcon className="size-4" aria-hidden />
                Filter
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                aria-label="More options"
              >
                <MoreHorizontalIcon className="size-4" aria-hidden />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <ol className="relative">
            <div
              className="pointer-events-none absolute inset-s-4 top-4 bottom-4 z-0 w-px bg-border/70"
              aria-hidden
            />

            {ACTIVITIES.map((activity) => {
              const Icon = activity.icon
              return (
                <li
                  key={activity.id}
                  className="relative z-10 mb-8 flex items-start gap-4 last:mb-0"
                >
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-full border-4 border-card",
                      activity.iconWrap
                    )}
                  >
                    <Icon className={cn("size-4", activity.iconClass)} aria-hidden />
                  </span>

                  <div className="flex min-w-0 flex-1 flex-col gap-2 pt-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {activity.avatar ? (
                        <Avatar size="sm">
                          <AvatarImage
                            src={activity.avatar}
                            alt={activity.user}
                          />
                          <AvatarFallback>{activity.initials}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <Badge variant="secondary">{activity.user}</Badge>
                      )}
                      <p className="min-w-0 flex-1 text-sm">
                        <span className="font-semibold text-foreground">
                          {activity.user}
                        </span>
                        <span className="mx-1 text-muted-foreground">
                          {activity.action}
                        </span>
                        <span className="font-medium text-foreground">
                          {activity.target}
                        </span>
                      </p>
                      <time className="ms-auto shrink-0 text-xs whitespace-nowrap text-muted-foreground">
                        {activity.timestamp}
                      </time>
                    </div>

                    {activity.content ? (
                      <div className="mt-1 rounded-lg border border-border/70 bg-muted/40 p-3 text-sm text-muted-foreground">
                        {activity.type === "commit" ? (
                          <code className="font-mono text-xs" dir="ltr">
                            {activity.content}
                          </code>
                        ) : (
                          <p>{activity.content}</p>
                        )}
                      </div>
                    ) : null}
                  </div>
                </li>
              )
            })}
          </ol>

          <div className="mt-6 flex w-full justify-center">
            <Button type="button" variant="ghost" className="w-full sm:w-auto">
              Load More Activity
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
