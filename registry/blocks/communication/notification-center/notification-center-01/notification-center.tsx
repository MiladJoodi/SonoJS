"use client"

import * as React from "react"
import {
  AtSignIcon,
  BellIcon,
  CheckCheckIcon,
  CheckIcon,
  CircleAlertIcon,
  EllipsisIcon,
  GitPullRequestIcon,
  KeyRoundIcon,
  Trash2Icon,
  UserPlusIcon,
  XIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
import { ScrollArea } from "@sonojs/ui/components/scroll-area"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@sonojs/ui/components/tabs"
import { cn } from "@/lib/utils"

type NotificationType = "mention" | "request" | "system" | "security"

type Notification = {
  id: string
  type: NotificationType
  title: string
  body: string
  time: string
  unread: boolean
  actor?: { name: string; initials: string }
}

const INITIAL: Notification[] = [
  {
    id: "n1",
    type: "mention",
    title: "Sarah Jenkins mentioned you",
    body: "in #design-system — Could you review the primary button states before Friday's design review?",
    time: "2m",
    unread: true,
    actor: { name: "Sarah Jenkins", initials: "SJ" },
  },
  {
    id: "n2",
    type: "request",
    title: "Access request",
    body: "David Chen requested editor access to the Sono Pro workspace.",
    time: "45m",
    unread: true,
    actor: { name: "David Chen", initials: "DC" },
  },
  {
    id: "n3",
    type: "security",
    title: "New sign-in",
    body: "Chrome on macOS · San Francisco, CA. If this wasn’t you, revoke the session.",
    time: "1h",
    unread: true,
  },
  {
    id: "n4",
    type: "system",
    title: "Production build succeeded",
    body: "sonojs-web completed in 1m 24s. Preview is ready for review.",
    time: "2h",
    unread: false,
  },
  {
    id: "n5",
    type: "mention",
    title: "Alex Rivera mentioned you",
    body: "in PR #482 — Please take a look at the RTL spacing fixes when you have a moment.",
    time: "Yesterday",
    unread: false,
    actor: { name: "Alex Rivera", initials: "AR" },
  },
  {
    id: "n6",
    type: "request",
    title: "Invite accepted",
    body: "Maya Patel joined Engineering as a member.",
    time: "2d",
    unread: false,
    actor: { name: "Maya Patel", initials: "MP" },
  },
]

function typeTone(type: NotificationType) {
  switch (type) {
    case "mention":
      return "bg-primary/10 text-primary"
    case "request":
      return "bg-muted text-foreground"
    case "security":
      return "bg-destructive/10 text-destructive"
    default:
      return "bg-muted text-muted-foreground"
  }
}

function TypeIcon({
  type,
  className,
}: {
  type: NotificationType
  className?: string
}) {
  const cls = cn("size-4", className)
  switch (type) {
    case "mention":
      return <AtSignIcon className={cls} aria-hidden />
    case "request":
      return <UserPlusIcon className={cls} aria-hidden />
    case "security":
      return <KeyRoundIcon className={cls} aria-hidden />
    default:
      return <GitPullRequestIcon className={cls} aria-hidden />
  }
}

function filterItems(items: Notification[], filter: string) {
  if (filter === "unread") return items.filter((n) => n.unread)
  if (filter === "mentions") return items.filter((n) => n.type === "mention")
  return items
}

export default function NotificationCenter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [items, setItems] = React.useState(INITIAL)
  const unread = items.filter((n) => n.unread).length
  const mentions = items.filter((n) => n.type === "mention").length

  const markRead = (id: string) =>
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    )

  const markAllRead = () =>
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })))

  const remove = (id: string) =>
    setItems((prev) => prev.filter((n) => n.id !== id))

  return (
    <div
      className={cn(
        "flex w-full justify-center bg-canvas px-4 py-10 text-foreground sm:px-6 sm:py-14",
        className
      )}
      {...props}
    >
      <section
        className="w-full max-w-md overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft"
        aria-label="Notifications"
      >
        <header className="flex items-start justify-between gap-3 border-b border-border/70 px-4 py-4 sm:px-5">
          <div className="min-w-0 text-start">
            <div className="flex items-center gap-2">
              <h1 className="text-base font-semibold tracking-tight">
                Notifications
              </h1>
              {unread > 0 ? (
                <Badge variant="secondary" className="tabular-nums">
                  {unread}
                </Badge>
              ) : null}
            </div>
            <p className="mt-1 text-sm text-muted-foreground" role="status">
              {unread > 0
                ? `${unread} unread`
                : "You're all caught up"}
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="shrink-0 cursor-pointer gap-1.5 disabled:cursor-not-allowed"
            disabled={unread === 0}
            onClick={markAllRead}
          >
            <CheckCheckIcon className="size-3.5" aria-hidden />
            Mark all read
          </Button>
        </header>

        <Tabs defaultValue="all" className="gap-0">
          <div className="border-b border-border/70 px-2 pt-1">
            <TabsList
              variant="line"
              className="h-10 w-full justify-start rounded-none bg-transparent p-0"
            >
              <TabsTrigger value="all" className="px-3">
                All
                <span className="text-muted-foreground tabular-nums">
                  {items.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="unread" className="px-3">
                Unread
                <span className="text-muted-foreground tabular-nums">
                  {unread}
                </span>
              </TabsTrigger>
              <TabsTrigger value="mentions" className="px-3">
                Mentions
                <span className="text-muted-foreground tabular-nums">
                  {mentions}
                </span>
              </TabsTrigger>
            </TabsList>
          </div>

          {(["all", "unread", "mentions"] as const).map((filter) => {
            const list = filterItems(items, filter)
            return (
              <TabsContent key={filter} value={filter} className="mt-0">
                {list.length === 0 ? (
                  <div className="flex flex-col items-center px-6 py-14 text-center">
                    <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-muted">
                      {filter === "mentions" ? (
                        <AtSignIcon
                          className="size-4 text-muted-foreground"
                          aria-hidden
                        />
                      ) : (
                        <BellIcon
                          className="size-4 text-muted-foreground"
                          aria-hidden
                        />
                      )}
                    </div>
                    <p className="text-sm font-medium">
                      {filter === "unread"
                        ? "No unread notifications"
                        : filter === "mentions"
                          ? "No mentions yet"
                          : "Inbox is empty"}
                    </p>
                    <p className="mt-1 max-w-[16rem] text-sm text-muted-foreground">
                      New activity from your team will show up here.
                    </p>
                  </div>
                ) : (
                  <ScrollArea className="h-[min(28rem,55svh)]">
                    <ul className="divide-y divide-border/70">
                      {list.map((item) => (
                        <li key={item.id}>
                          <div
                            className={cn(
                              "group relative flex gap-3 px-4 py-3.5 transition-colors sm:px-5",
                              item.unread
                                ? "bg-primary/[0.04] hover:bg-primary/[0.07]"
                                : "hover:bg-muted/40"
                            )}
                          >
                            <div className="relative shrink-0 pt-0.5">
                              {item.actor ? (
                                <Avatar size="default">
                                  <AvatarFallback>
                                    {item.actor.initials}
                                  </AvatarFallback>
                                </Avatar>
                              ) : (
                                <div
                                  className={cn(
                                    "flex size-8 items-center justify-center rounded-full",
                                    typeTone(item.type)
                                  )}
                                >
                                  <TypeIcon type={item.type} />
                                </div>
                              )}
                              {item.actor ? (
                                <span
                                  className={cn(
                                    "absolute -end-0.5 -bottom-0.5 flex size-4 items-center justify-center rounded-full ring-2 ring-card",
                                    typeTone(item.type)
                                  )}
                                  aria-hidden
                                >
                                  <TypeIcon
                                    type={item.type}
                                    className="size-2.5"
                                  />
                                </span>
                              ) : null}
                            </div>

                            <div className="min-w-0 flex-1 text-start">
                              <div className="flex items-start gap-2">
                                <button
                                  type="button"
                                  className="min-w-0 flex-1 cursor-pointer text-start"
                                  onClick={() => markRead(item.id)}
                                >
                                  <div className="flex items-baseline justify-between gap-2">
                                    <p
                                      className={cn(
                                        "truncate text-sm",
                                        item.unread
                                          ? "font-semibold text-foreground"
                                          : "font-medium text-foreground"
                                      )}
                                    >
                                      {item.title}
                                    </p>
                                    <time
                                      className="shrink-0 text-xs text-muted-foreground tabular-nums"
                                      dateTime={item.time}
                                    >
                                      {item.time}
                                    </time>
                                  </div>
                                  <p className="mt-0.5 line-clamp-2 text-sm leading-snug text-muted-foreground">
                                    {item.body}
                                  </p>
                                  {item.unread ? (
                                    <span className="sr-only">Unread</span>
                                  ) : null}
                                </button>
                                <span
                                  className={cn(
                                    "mt-1.5 size-1.5 shrink-0 rounded-full",
                                    item.unread
                                      ? "bg-primary"
                                      : "bg-transparent"
                                  )}
                                  aria-hidden
                                />
                              </div>

                              {item.type === "request" && item.unread ? (
                                <div className="mt-2.5 flex flex-wrap gap-2">
                                  <Button
                                    type="button"
                                    size="xs"
                                    className="cursor-pointer gap-1"
                                    onClick={() => markRead(item.id)}
                                  >
                                    <CheckIcon className="size-3.5" aria-hidden />
                                    Approve
                                  </Button>
                                  <Button
                                    type="button"
                                    size="xs"
                                    variant="outline"
                                    className="cursor-pointer gap-1"
                                    onClick={() => remove(item.id)}
                                  >
                                    <XIcon className="size-3.5" aria-hidden />
                                    Decline
                                  </Button>
                                </div>
                              ) : null}

                              {item.type === "security" && item.unread ? (
                                <div className="mt-2.5 flex flex-wrap gap-2">
                                  <Button
                                    type="button"
                                    size="xs"
                                    variant="outline"
                                    className="cursor-pointer gap-1"
                                    onClick={() => markRead(item.id)}
                                  >
                                    <CircleAlertIcon
                                      className="size-3.5"
                                      aria-hidden
                                    />
                                    Review session
                                  </Button>
                                </div>
                              ) : null}

                              {item.type === "mention" && item.unread ? (
                                <div className="mt-2.5">
                                  <Button
                                    type="button"
                                    size="xs"
                                    variant="outline"
                                    className="cursor-pointer"
                                    onClick={() => markRead(item.id)}
                                  >
                                    Open thread
                                  </Button>
                                </div>
                              ) : null}
                            </div>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon-xs"
                                  className="absolute end-2 top-2 cursor-pointer opacity-0 group-hover:opacity-100 focus-visible:opacity-100 data-[state=open]:opacity-100"
                                  aria-label={`Actions for ${item.title}`}
                                >
                                  <EllipsisIcon className="size-4" aria-hidden />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-44">
                                {item.unread ? (
                                  <>
                                    <DropdownMenuItem
                                      onClick={() => markRead(item.id)}
                                    >
                                      <CheckIcon
                                        className="size-4"
                                        aria-hidden
                                      />
                                      Mark as read
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                  </>
                                ) : null}
                                <DropdownMenuItem
                                  variant="destructive"
                                  onClick={() => remove(item.id)}
                                >
                                  <Trash2Icon className="size-4" aria-hidden />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                )}
              </TabsContent>
            )
          })}
        </Tabs>
      </section>
    </div>
  )
}
