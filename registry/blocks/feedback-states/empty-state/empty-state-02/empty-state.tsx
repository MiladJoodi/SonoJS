"use client"

import type * as React from "react"
import { InboxIcon, PenSquareIcon, StarIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@sonojs/ui/components/empty"
import { cn } from "@/lib/utils"

const FOLDERS = [
  { id: "inbox", label: "Inbox", count: 0, active: true },
  { id: "starred", label: "Starred", count: 2, active: false },
  { id: "sent", label: "Sent", count: 12, active: false },
] as const

export default function EmptyState({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas px-4 py-10 text-foreground sm:px-6 sm:py-14",
        className
      )}
      aria-labelledby="empty-state-02-heading"
      {...props}
    >
      <div className="mx-auto flex w-full max-w-3xl min-h-[22rem] overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
        <aside className="hidden w-44 shrink-0 border-e border-border/70 bg-muted/30 p-3 sm:block">
          <p className="mb-3 px-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Mail
          </p>
          <ul className="space-y-0.5">
            {FOLDERS.map((folder) => (
              <li key={folder.id}>
                <button
                  type="button"
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-2 text-sm transition-colors",
                    folder.active
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <span className="flex items-center gap-2">
                    {folder.id === "starred" ? (
                      <StarIcon className="size-3.5" aria-hidden />
                    ) : (
                      <InboxIcon className="size-3.5" aria-hidden />
                    )}
                    {folder.label}
                  </span>
                  {folder.count > 0 ? (
                    <Badge
                      variant="outline"
                      className="h-5 min-w-5 justify-center rounded-full border-transparent bg-muted px-1.5 text-[10px] text-muted-foreground"
                    >
                      {folder.count}
                    </Badge>
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center justify-between gap-3 border-b border-border/70 px-4 py-3 sm:px-5">
            <div>
              <h2 className="text-sm font-semibold">Inbox</h2>
              <p className="text-xs text-muted-foreground">0 unread</p>
            </div>
            <Button type="button" size="sm" className="cursor-pointer">
              <PenSquareIcon className="size-3.5" aria-hidden />
              Compose
            </Button>
          </div>

          <Empty className="min-h-0 flex-1 border-0">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <InboxIcon aria-hidden />
              </EmptyMedia>
              <EmptyTitle id="empty-state-02-heading">
                All caught up
              </EmptyTitle>
              <EmptyDescription>
                Your inbox is empty. New messages will show up here.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button type="button" className="cursor-pointer">
                <PenSquareIcon className="size-4" aria-hidden />
                Compose message
              </Button>
            </EmptyContent>
          </Empty>
        </div>
      </div>
    </section>
  )
}
