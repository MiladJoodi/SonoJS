"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@sonojs/ui/components/avatar"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@sonojs/ui/components/tabs"

const triggerClass = cn(
  "h-8 min-h-8 flex-none rounded-md border-0 px-3.5 text-sm font-medium",
  "text-muted-foreground shadow-none after:hidden after:opacity-0",
  "hover:text-foreground",
  "data-[state=active]:bg-card data-[state=active]:text-foreground",
  "data-[state=active]:shadow-none"
)

const threads = {
  all: [
    {
      id: "1",
      name: "Alex Kim",
      initials: "AK",
      subject: "Launch checklist for v0.2",
      preview: "Can we lock the docs screenshots before Friday?",
      time: "2m",
      unread: true,
    },
    {
      id: "2",
      name: "Maya Chen",
      initials: "MC",
      subject: "RTL audit notes",
      preview: "Sidebar chevrons look good — mega menu still needs a pass.",
      time: "1h",
      unread: true,
    },
    {
      id: "3",
      name: "Jordan Lee",
      initials: "JL",
      subject: "Invoice #1842",
      preview: "Paid · receipt attached for accounting.",
      time: "Yesterday",
      unread: false,
    },
  ],
  unread: [
    {
      id: "1",
      name: "Alex Kim",
      initials: "AK",
      subject: "Launch checklist for v0.2",
      preview: "Can we lock the docs screenshots before Friday?",
      time: "2m",
      unread: true,
    },
    {
      id: "2",
      name: "Maya Chen",
      initials: "MC",
      subject: "RTL audit notes",
      preview: "Sidebar chevrons look good — mega menu still needs a pass.",
      time: "1h",
      unread: true,
    },
  ],
  starred: [
    {
      id: "3",
      name: "Jordan Lee",
      initials: "JL",
      subject: "Invoice #1842",
      preview: "Paid · receipt attached for accounting.",
      time: "Yesterday",
      unread: false,
    },
  ],
  archived: [
    {
      id: "4",
      name: "Support",
      initials: "SU",
      subject: "Welcome to Sono",
      preview: "Here’s how to install your first block.",
      time: "Mon",
      unread: false,
    },
  ],
} as const

function ThreadList({
  items,
}: {
  items: (typeof threads)[keyof typeof threads]
}) {
  return (
    <ul className="h-full divide-y divide-border/70 overflow-hidden rounded-[12px] border border-border/70 bg-canvas/40">
      {items.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            className="flex w-full cursor-pointer items-start gap-3 px-3 py-3 text-start transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Avatar className="size-9">
              <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                {item.initials}
              </AvatarFallback>
            </Avatar>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2">
                <span
                  className={cn(
                    "truncate text-sm",
                    item.unread
                      ? "font-semibold text-foreground"
                      : "font-medium text-foreground"
                  )}
                >
                  {item.name}
                </span>
                <span className="ms-auto shrink-0 text-xs text-muted-foreground">
                  {item.time}
                </span>
              </span>
              <span className="mt-0.5 block truncate text-sm text-foreground">
                {item.subject}
              </span>
              <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                {item.preview}
              </span>
            </span>
            {item.unread ? (
              <span
                aria-hidden
                className="mt-1.5 size-2 shrink-0 rounded-full bg-primary"
              />
            ) : null}
          </button>
        </li>
      ))}
    </ul>
  )
}

type InboxFilter = keyof typeof threads

export default function TabsBlock({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [filter, setFilter] = React.useState<InboxFilter>("all")

  return (
    <div
      className={cn(
        "mx-auto min-w-0 w-full max-w-xl rounded-[12px] border border-border/70 bg-card p-4 shadow-soft sm:p-5 md:p-6",
        className
      )}
      style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
      {...props}
    >
      <Tabs
        value={filter}
        onValueChange={(value) => setFilter(value as InboxFilter)}
        className="w-full gap-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-h4 text-foreground">Inbox</h3>
            <p className="text-sm text-muted-foreground">3 conversations</p>
          </div>
          <TabsList
            aria-label="Inbox filters"
            className="no-scrollbar h-auto w-full max-w-full min-w-0 justify-start gap-1 overflow-x-auto overflow-y-hidden rounded-[12px] border border-border/70 bg-canvas p-1"
          >
            <TabsTrigger value="all" className={triggerClass}>
              All
            </TabsTrigger>
            <TabsTrigger value="unread" className={triggerClass}>
              Unread
            </TabsTrigger>
            <TabsTrigger value="starred" className={triggerClass}>
              Starred
            </TabsTrigger>
            <TabsTrigger value="archived" className={triggerClass}>
              Archived
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Sizer = All list height so filters don’t collapse the card from the top. */}
        <div className="relative">
          <div className="invisible" aria-hidden>
            <ThreadList items={threads.all} />
          </div>
          <div className="absolute inset-0">
            <ThreadList items={threads[filter]} />
          </div>
        </div>
      </Tabs>
    </div>
  )
}
