"use client"

import * as React from "react"
import {
  CheckCircle2Icon,
  FilterIcon,
  GitCommitIcon,
  MessageSquareIcon,
  RocketIcon,
  ShieldAlertIcon,
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

const FILTERS = [
  { id: "all", label: "All" },
  { id: "team", label: "Team" },
  { id: "code", label: "Code" },
  { id: "system", label: "System" },
] as const

type FilterId = (typeof FILTERS)[number]["id"]
type Category = Exclude<FilterId, "all">

type Activity = {
  id: string
  day: "today" | "yesterday" | "earlier"
  category: Category
  user: string
  initials: string
  avatar: string | null
  action: string
  target: string
  time: string
  detail?: string
  icon: React.ElementType
  iconClass: string
  iconWrap: string
}

const ACTIVITIES: Activity[] = [
  {
    id: "1",
    day: "today",
    category: "team",
    user: "Sarah Jenkins",
    initials: "SJ",
    avatar: assetSrc(sarahImg),
    action: "commented on",
    target: "Pricing page draft",
    time: "12m ago",
    detail:
      "Can we tighten the hero line and move the secondary CTA under the fold?",
    icon: MessageSquareIcon,
    iconClass: "text-sky-600 dark:text-sky-400",
    iconWrap: "bg-sky-500/10",
  },
  {
    id: "2",
    day: "today",
    category: "code",
    user: "Alex Rivera",
    initials: "AR",
    avatar: assetSrc(alexImg),
    action: "deployed",
    target: "web@2.14.0",
    time: "1h ago",
    detail: "Production · us-east-1 · build #1842",
    icon: RocketIcon,
    iconClass: "text-violet-600 dark:text-violet-400",
    iconWrap: "bg-violet-500/10",
  },
  {
    id: "3",
    day: "today",
    category: "code",
    user: "Alex Rivera",
    initials: "AR",
    avatar: assetSrc(alexImg),
    action: "pushed to",
    target: "main",
    time: "2h ago",
    detail: "fix: stabilize activity feed hydration (#512)",
    icon: GitCommitIcon,
    iconClass: "text-emerald-700 dark:text-emerald-400",
    iconWrap: "bg-emerald-500/10",
  },
  {
    id: "4",
    day: "yesterday",
    category: "team",
    user: "David Chen",
    initials: "DC",
    avatar: assetSrc(davidImg),
    action: "invited",
    target: "Jordan Lee",
    time: "Yesterday, 4:20 PM",
    icon: UserPlusIcon,
    iconClass: "text-primary",
    iconWrap: "bg-primary/10",
  },
  {
    id: "5",
    day: "yesterday",
    category: "system",
    user: "System",
    initials: "SY",
    avatar: null,
    action: "completed backup for",
    target: "Primary DB",
    time: "Yesterday, 12:00 AM",
    detail: "48GB archived · retention 30 days",
    icon: CheckCircle2Icon,
    iconClass: "text-emerald-700 dark:text-emerald-400",
    iconWrap: "bg-emerald-500/10",
  },
  {
    id: "6",
    day: "earlier",
    category: "system",
    user: "Security",
    initials: "SEC",
    avatar: null,
    action: "flagged login risk for",
    target: "admin@acme.com",
    time: "Oct 24",
    detail: "3 failed attempts from a new device in 8 minutes.",
    icon: ShieldAlertIcon,
    iconClass: "text-destructive",
    iconWrap: "bg-destructive/10",
  },
  {
    id: "7",
    day: "earlier",
    category: "team",
    user: "Maria Garcia",
    initials: "MG",
    avatar: assetSrc(mariaImg),
    action: "shared",
    target: "Brand guidelines",
    time: "Oct 23",
    icon: MessageSquareIcon,
    iconClass: "text-amber-600 dark:text-amber-400",
    iconWrap: "bg-amber-500/10",
  },
]

const DAY_LABELS: Record<Activity["day"], string> = {
  today: "Today",
  yesterday: "Yesterday",
  earlier: "Earlier",
}

const DAY_ORDER: Activity["day"][] = ["today", "yesterday", "earlier"]

export default function ActivityFeed({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [filter, setFilter] = React.useState<FilterId>("all")

  const filtered = ACTIVITIES.filter(
    (item) => filter === "all" || item.category === filter
  )

  const groups = DAY_ORDER.map((day) => ({
    day,
    items: filtered.filter((item) => item.day === day),
  })).filter((group) => group.items.length > 0)

  return (
    <div
      className={cn(
        "w-full bg-canvas px-4 py-10 text-foreground sm:px-6 sm:py-16",
        className
      )}
      {...props}
    >
      <Card className="mx-auto max-w-2xl overflow-hidden border-border/70 shadow-soft">
        <CardHeader className="border-b border-border/70 pb-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="text-start">
              <CardTitle>Activity</CardTitle>
              <CardDescription>
                Grouped by day — filter by team, code, or system.
              </CardDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="cursor-pointer gap-1.5"
            >
              <FilterIcon className="size-4" aria-hidden />
              Filters
            </Button>
          </div>

          <div
            className="mt-4 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Activity filters"
          >
            {FILTERS.map((item) => {
              const active = filter === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className={cn(
                    "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    active
                      ? "border-primary/40 bg-primary text-primary-foreground"
                      : "border-border/70 bg-card text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                  onClick={() => setFilter(item.id)}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {groups.length === 0 ? (
            <p className="px-6 py-10 text-center text-sm text-muted-foreground">
              No activity in this filter.
            </p>
          ) : (
            groups.map((group) => (
              <section key={group.day} aria-labelledby={`feed-day-${group.day}`}>
                <h2
                  id={`feed-day-${group.day}`}
                  className="sticky top-0 z-10 border-b border-border/70 bg-muted/50 px-5 py-2 text-xs font-semibold tracking-wide text-muted-foreground backdrop-blur-sm sm:px-6"
                >
                  {DAY_LABELS[group.day]}
                </h2>
                <ul className="divide-y divide-border/70">
                  {group.items.map((activity) => {
                    const Icon = activity.icon
                    return (
                      <li
                        key={activity.id}
                        className="flex items-start gap-3 px-5 py-4 sm:gap-4 sm:px-6"
                      >
                        <span
                          className={cn(
                            "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full",
                            activity.iconWrap
                          )}
                        >
                          <Icon
                            className={cn("size-4", activity.iconClass)}
                            aria-hidden
                          />
                        </span>
                        <div className="min-w-0 flex-1 text-start">
                          <div className="flex flex-wrap items-center gap-2">
                            {activity.avatar ? (
                              <Avatar size="sm">
                                <AvatarImage
                                  src={activity.avatar}
                                  alt=""
                                />
                                <AvatarFallback>
                                  {activity.initials}
                                </AvatarFallback>
                              </Avatar>
                            ) : (
                              <Badge variant="secondary">
                                {activity.user}
                              </Badge>
                            )}
                            <p className="min-w-0 flex-1 text-sm">
                              <span className="font-semibold text-foreground">
                                {activity.user}
                              </span>{" "}
                              <span className="text-muted-foreground">
                                {activity.action}
                              </span>{" "}
                              <span className="font-medium text-foreground">
                                {activity.target}
                              </span>
                            </p>
                            <time className="shrink-0 text-xs text-muted-foreground">
                              {activity.time}
                            </time>
                          </div>
                          {activity.detail ? (
                            <div className="mt-2 rounded-[10px] border border-border/70 bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
                              {activity.category === "code" &&
                              activity.detail.startsWith("fix:") ? (
                                <code className="font-mono text-xs" dir="ltr">
                                  {activity.detail}
                                </code>
                              ) : (
                                <p>{activity.detail}</p>
                              )}
                            </div>
                          ) : null}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </section>
            ))
          )}

          <div className="border-t border-border/70 px-5 py-4 sm:px-6">
            <Button
              type="button"
              variant="ghost"
              className="w-full cursor-pointer"
            >
              Load more activity
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
