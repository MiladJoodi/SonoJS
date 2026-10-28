"use client"

import type * as React from "react"
import { BarChart3Icon, Link2Icon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@sonojs/ui/components/empty"
import { Separator } from "@sonojs/ui/components/separator"
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
      aria-labelledby="empty-state-07-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
        <div className="flex flex-wrap items-end justify-between gap-3 px-4 pt-4 sm:px-5 sm:pt-5">
          <div>
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Analytics
            </p>
            <h2 className="mt-1 text-sm font-semibold">Weekly active users</h2>
          </div>
          <p className="text-xs text-muted-foreground">Last 7 days · No source</p>
        </div>

        <Separator className="mt-4" />

        <div
          aria-hidden
          className="relative mx-4 mt-4 h-28 overflow-hidden rounded-md border border-border/50 bg-muted/20 sm:mx-5"
        >
          <div className="absolute inset-x-0 bottom-0 flex h-full items-end justify-around gap-2 px-4 pb-2 opacity-40">
            {[28, 44, 36, 52, 40, 48, 32].map((h, i) => (
              <div
                key={i}
                className="w-full max-w-6 rounded-t-sm bg-muted-foreground/25"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        <Empty className="min-h-[200px] border-0">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <BarChart3Icon aria-hidden />
            </EmptyMedia>
            <EmptyTitle id="empty-state-07-heading">No data yet</EmptyTitle>
            <EmptyDescription>
              Connect a product analytics source to populate this chart. Ranges
              and comparisons unlock after the first sync.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button type="button" className="cursor-pointer">
              <Link2Icon className="size-4" aria-hidden />
              Connect data source
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    </section>
  )
}
