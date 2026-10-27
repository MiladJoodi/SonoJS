"use client"

import type * as React from "react"
import {
  AlertCircleIcon,
  HomeIcon,
  MailOpenIcon,
  PlusIcon,
  RefreshCcwIcon,
  SearchIcon,
  SparklesIcon,
} from "lucide-react"

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

export default function EmptyState({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "relative isolate w-full min-w-0 overflow-hidden bg-canvas py-12 text-foreground sm:py-24",
        className
      )}
      aria-labelledby="empty-state-01-heading"
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute start-1/2 top-[-10%] size-[32rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.28] dark:opacity-[0.16]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--foreground) 11%, transparent) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl space-y-12 px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <Badge
            variant="outline"
            className="mb-4 border-transparent bg-primary/10 font-semibold text-primary"
          >
            <SparklesIcon className="size-3" aria-hidden />
            Empty States
          </Badge>
          <h1
            id="empty-state-01-heading"
            className="mb-4 text-h1 font-semibold tracking-tight text-foreground"
          >
            Empty state patterns
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            When there&apos;s nothing to show, guide people toward the next
            useful action — four common scenarios, one language.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* No search results */}
          <article className="group flex flex-col rounded-[16px] border border-border/70 bg-card p-2 shadow-soft transition-colors hover:border-primary/25">
            <Empty className="min-h-[280px] rounded-[12px] border-0 p-8">
              <EmptyHeader>
                <EmptyMedia
                  variant="icon"
                  className="mb-4 size-16 rounded-[14px] bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary [&_svg]:size-7"
                >
                  <SearchIcon aria-hidden />
                </EmptyMedia>
                <EmptyTitle className="text-lg font-semibold">
                  No results found
                </EmptyTitle>
                <EmptyDescription>
                  We couldn&apos;t find anything matching your search. Try
                  different keywords or clear your filters.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button type="button" variant="outline" size="sm">
                  <RefreshCcwIcon className="size-3.5" aria-hidden />
                  Clear filters
                </Button>
              </EmptyContent>
            </Empty>
          </article>

          {/* Empty inbox */}
          <article className="group relative flex flex-col overflow-hidden rounded-[16px] border border-border/70 bg-card p-2 shadow-soft transition-colors hover:border-primary/30">
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary via-sky-400 to-primary/40"
            />
            <Empty className="min-h-[280px] rounded-[12px] border-0 p-8">
              <EmptyHeader>
                <EmptyMedia
                  variant="icon"
                  className="mb-4 size-16 rounded-[14px] bg-primary/10 text-primary [&_svg]:size-7"
                >
                  <MailOpenIcon aria-hidden />
                </EmptyMedia>
                <EmptyTitle className="text-lg font-semibold">
                  All caught up!
                </EmptyTitle>
                <EmptyDescription>
                  Your inbox is empty. New messages and notifications will
                  appear here when they arrive.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button type="button" size="sm">
                  <PlusIcon className="size-4" aria-hidden />
                  Compose message
                </Button>
              </EmptyContent>
            </Empty>
          </article>

          {/* Access restricted */}
          <article className="group flex flex-col rounded-[16px] border border-border/70 bg-card p-2 shadow-soft transition-colors hover:border-amber-500/35">
            <Empty className="min-h-[280px] rounded-[12px] border-0 p-8">
              <EmptyHeader>
                <EmptyMedia
                  variant="icon"
                  className="mb-4 size-16 rounded-[14px] border border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300 [&_svg]:size-7"
                >
                  <AlertCircleIcon aria-hidden />
                </EmptyMedia>
                <EmptyTitle className="text-lg font-semibold">
                  Access restricted
                </EmptyTitle>
                <EmptyDescription>
                  You don&apos;t have permission to view this content. Contact
                  your admin to request access.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button type="button" variant="outline" size="sm">
                  <HomeIcon className="size-4" aria-hidden />
                  Go home
                </Button>
              </EmptyContent>
            </Empty>
          </article>

          {/* Create first project */}
          <button
            type="button"
            className="group flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-[16px] border-2 border-dashed border-border/80 bg-card/60 p-8 text-center transition-all hover:-translate-y-0.5 hover:border-primary/45 hover:bg-primary/5 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="mb-5 flex size-14 items-center justify-center rounded-[14px] border border-border/70 bg-muted/50 text-muted-foreground transition-all group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary">
              <PlusIcon className="size-7" aria-hidden />
            </span>
            <span className="text-lg font-semibold tracking-tight text-muted-foreground transition-colors group-hover:text-foreground">
              Create your first project
            </span>
            <span className="mt-1 text-sm text-muted-foreground">
              Click to get started
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
