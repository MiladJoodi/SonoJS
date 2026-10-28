"use client"

import type * as React from "react"
import {
  ArrowUpRightIcon,
  CheckIcon,
  CircleIcon,
  CommandIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@sonojs/ui/components/avatar"
import { cn } from "@/lib/utils"

const BARS = [38, 52, 47, 61, 58, 72, 69, 81, 76, 88, 84, 94] as const

const TEAM = [
  { name: "Alex Rivera", initials: "AR", role: "Shipping auth" },
  { name: "Sam Chen", initials: "SC", role: "Reviewing PR #482" },
  { name: "Jordan Lee", initials: "JL", role: "Idle · 12m" },
] as const

export default function BentoGrid01({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas py-12 text-foreground sm:py-16 md:py-20",
        className
      )}
      aria-labelledby="bento-grid-01-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8 max-w-lg text-start sm:mb-10">
          <p className="text-sm font-medium text-primary">
            Built for product teams
          </p>
          <h2
            id="bento-grid-01-heading"
            className="mt-2 text-h2 font-semibold tracking-tight text-foreground"
          >
            See what shipped —
            <span className="text-muted-foreground"> and what&apos;s next.</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          {/* Wide analytics */}
          <article className="flex flex-col rounded-[12px] border border-border/70 bg-white p-5 shadow-soft sm:p-6 md:col-span-7 dark:bg-card">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 text-start">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Active installs
                </p>
                <p className="mt-1 flex items-baseline gap-2">
                  <span className="text-3xl font-semibold tracking-tight tabular-nums">
                    18.4k
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-sm font-medium text-primary">
                    <ArrowUpRightIcon className="size-3.5" aria-hidden />
                    9.2%
                  </span>
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                12 weeks
              </span>
            </div>
            <div
              className="mt-8 flex h-32 items-end gap-1.5 sm:gap-2"
              role="img"
              aria-label="Installs trending upward over twelve weeks"
            >
              {BARS.map((h, i) => (
                <div
                  key={i}
                  className={cn(
                    "min-w-0 flex-1 rounded-t-[4px]",
                    i === BARS.length - 1 ? "bg-primary" : "bg-primary/20"
                  )}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Registry installs across public docs — last bar is this week.
            </p>
          </article>

          {/* Team presence */}
          <article className="flex flex-col rounded-[12px] border border-border/70 bg-white p-5 shadow-soft sm:p-6 md:col-span-5 dark:bg-card">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Online now
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                <CircleIcon
                  className="size-2 fill-primary text-primary"
                  aria-hidden
                />
                3 of 8
              </span>
            </div>
            <ul className="mt-5 flex flex-1 flex-col gap-3">
              {TEAM.map((person) => (
                <li key={person.name} className="flex items-center gap-3">
                  <Avatar className="size-9">
                    <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                      {person.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1 text-start">
                    <p className="truncate text-sm font-medium text-foreground">
                      {person.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {person.role}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-border/70 pt-4 text-sm text-muted-foreground">
              Presence updates every few seconds — no extra sidebar chrome.
            </p>
          </article>

          {/* Latency */}
          <article className="rounded-[12px] border border-border/70 bg-white p-5 shadow-soft sm:p-6 md:col-span-4 dark:bg-card">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              p95 latency
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-tight tabular-nums">
              142
              <span className="ms-1 text-base font-medium text-muted-foreground">
                ms
              </span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Edge reads, last hour · US-East.
            </p>
            <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-primary/15">
              <div className="h-full w-[28%] rounded-full bg-primary" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Budget 500ms — still quiet.
            </p>
          </article>

          {/* Checklist */}
          <article className="rounded-[12px] border border-border/70 bg-white p-5 shadow-soft sm:p-6 md:col-span-4 dark:bg-card">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Release checklist
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                "Visual QA on mobile",
                "Changelog drafted",
                "Feature flag off in EU",
              ].map((item, i) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span
                    className={cn(
                      "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full",
                      i < 2
                        ? "bg-primary text-primary-foreground"
                        : "border border-border/70 bg-transparent"
                    )}
                  >
                    {i < 2 ? (
                      <CheckIcon className="size-2.5" aria-hidden />
                    ) : null}
                  </span>
                  <span
                    className={cn(
                      i < 2 ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </article>

          {/* Command */}
          <article className="rounded-[12px] border border-border/70 bg-white p-5 shadow-soft sm:p-6 md:col-span-4 dark:bg-card">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Jump anywhere
            </p>
            <div className="mt-4 flex items-center gap-2 rounded-[10px] border border-primary/20 bg-primary/5 px-3 py-2.5">
              <CommandIcon
                className="size-4 shrink-0 text-primary"
                aria-hidden
              />
              <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
                Search blocks, docs, issues…
              </span>
              <kbd className="hidden shrink-0 rounded border border-primary/20 bg-background px-1.5 py-0.5 font-mono text-[10px] text-primary sm:inline">
                ⌘K
              </kbd>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Same palette your team already uses in the docs site.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
