"use client"

import * as React from "react"
import { BellIcon, CheckCheckIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@sonojs/ui/components/popover"
import { cn } from "@/lib/utils"

type Item = {
  id: string
  title: string
  body: string
  time: string
  unread: boolean
  initials?: string
}

const INITIAL: Item[] = [
  {
    id: "1",
    title: "Sarah mentioned you",
    body: "Could you review the button states before Friday?",
    time: "2m",
    unread: true,
    initials: "SJ",
  },
  {
    id: "2",
    title: "Access request",
    body: "David Chen wants editor access to Sono Pro.",
    time: "45m",
    unread: true,
    initials: "DC",
  },
  {
    id: "3",
    title: "Build succeeded",
    body: "sonojs-web finished in 1m 24s.",
    time: "2h",
    unread: false,
  },
]

export default function NotificationCenter({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [items, setItems] = React.useState(INITIAL)
  const [open, setOpen] = React.useState(false)
  const unread = items.filter((n) => n.unread).length

  const markAllRead = () =>
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })))

  const markRead = (id: string) =>
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    )

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas px-4 py-4 text-foreground sm:px-6 sm:py-5",
        className
      )}
      aria-label="App chrome with notifications"
      {...props}
    >
      <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
        <header className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-sm font-semibold text-primary">
              S
            </span>
            <span className="text-sm font-semibold tracking-tight">Sono</span>
          </div>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="relative size-9 cursor-pointer"
                aria-label={
                  unread > 0
                    ? `Notifications, ${unread} unread`
                    : "Notifications"
                }
              >
                <BellIcon className="size-4" aria-hidden />
                {unread > 0 ? (
                  <Badge
                    variant="default"
                    className="absolute -end-0.5 -top-0.5 h-4 min-w-4 justify-center rounded-full px-1 text-[10px] tabular-nums"
                  >
                    {unread}
                  </Badge>
                ) : null}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              sideOffset={8}
              className="w-[min(100vw-2rem,22rem)] p-0"
            >
              <div className="flex items-center justify-between gap-2 border-b border-border/70 px-3 py-2.5">
                <p className="text-sm font-semibold">Notifications</p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 cursor-pointer gap-1 px-2 text-xs disabled:cursor-not-allowed"
                  disabled={unread === 0}
                  onClick={markAllRead}
                >
                  <CheckCheckIcon className="size-3.5" aria-hidden />
                  Mark all
                </Button>
              </div>

              <ul className="max-h-72 divide-y divide-border/70 overflow-y-auto">
                {items.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={cn(
                        "flex w-full cursor-pointer gap-3 px-3 py-3 text-start transition-colors",
                        item.unread
                          ? "bg-primary/[0.04] hover:bg-primary/[0.07]"
                          : "hover:bg-muted/40"
                      )}
                      onClick={() => markRead(item.id)}
                    >
                      {item.initials ? (
                        <Avatar className="size-8 shrink-0">
                          <AvatarFallback className="text-xs">
                            {item.initials}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                          <BellIcon className="size-3.5" aria-hidden />
                        </span>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline justify-between gap-2">
                          <span
                            className={cn(
                              "truncate text-sm",
                              item.unread
                                ? "font-semibold"
                                : "font-medium"
                            )}
                          >
                            {item.title}
                          </span>
                          <time className="shrink-0 text-[11px] text-muted-foreground tabular-nums">
                            {item.time}
                          </time>
                        </span>
                        <span className="mt-0.5 line-clamp-2 text-xs leading-snug text-muted-foreground">
                          {item.body}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="border-t border-border/70 p-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="w-full cursor-pointer"
                >
                  View all notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </header>
      </div>
    </section>
  )
}
