"use client"

import type * as React from "react"
import { BellIcon, SettingsIcon } from "lucide-react"

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
      aria-labelledby="empty-state-08-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-md overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
        <div className="flex items-center justify-between gap-3 border-b border-border/70 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2">
            <BellIcon className="size-4 text-muted-foreground" aria-hidden />
            <h2 className="text-sm font-semibold">Notifications</h2>
          </div>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="cursor-pointer"
          >
            <SettingsIcon className="size-3.5" aria-hidden />
            <span className="sr-only sm:not-sr-only">Prefs</span>
          </Button>
        </div>

        <Empty className="min-h-[260px] border-0">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <BellIcon aria-hidden />
            </EmptyMedia>
            <EmptyTitle id="empty-state-08-heading">
              You’re all caught up
            </EmptyTitle>
            <EmptyDescription>
              No new notifications. Mentions, reviews, and deploy alerts will
              appear here.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
            >
              Notification preferences
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    </section>
  )
}
