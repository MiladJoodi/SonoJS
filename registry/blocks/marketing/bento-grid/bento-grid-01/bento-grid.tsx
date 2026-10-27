"use client"

import type * as React from "react"
import {
  BarChart3Icon,
  GlobeIcon,
  ShieldIcon,
  TerminalIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

const BAR_HEIGHTS = [44, 57, 52, 74, 68, 85, 96] as const

export default function BentoGrid01({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("bg-canvas py-12 text-foreground sm:py-20", className)}
      aria-labelledby="bento-grid-01-heading"
      {...props}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-9 max-w-xl">
          <p className="text-sm font-medium text-primary">A connected platform</p>
          <h2
            id="bento-grid-01-heading"
            className="mt-3 text-3xl font-semibold tracking-tight"
          >
            Everything in its right place.
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Bring insights, security, and delivery into one clear workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-[12px] border border-border/70 bg-card p-6 shadow-soft lg:col-span-2">
            <BarChart3Icon
              className="size-5 text-muted-foreground"
              aria-hidden
            />
            <h3 className="mt-5 text-lg font-semibold">
              Understand the whole picture.
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Track the metrics that matter and see how your product is
              performing over time.
            </p>
            <div className="mt-7 border-t border-border/70 pt-5">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-xs text-muted-foreground">
                  Active users, past week
                </span>
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  +12.8%
                </span>
              </div>
              <div
                className="mt-5 flex h-28 items-end gap-3"
                role="img"
                aria-label="Daily active users increased over the past week"
              >
                {BAR_HEIGHTS.map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-primary/70"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
          </article>

          <article className="rounded-[12px] border border-border/70 bg-card p-6 shadow-soft">
            <ShieldIcon className="size-5 text-muted-foreground" aria-hidden />
            <h3 className="mt-5 text-lg font-semibold">Control access.</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Give each person the access they need. Review permissions and keep
              your team&apos;s work protected.
            </p>
            <dl className="mt-7 space-y-3 border-t border-border/70 pt-5 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">
                  Two-factor authentication
                </dt>
                <dd className="text-emerald-700 dark:text-emerald-400">
                  Enabled
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Access reviews</dt>
                <dd>Monthly</dd>
              </div>
            </dl>
          </article>

          <article className="rounded-[12px] border border-border/70 bg-card p-6 shadow-soft">
            <GlobeIcon className="size-5 text-muted-foreground" aria-hidden />
            <h3 className="mt-5 text-lg font-semibold">Reach your customers.</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Deliver a consistent experience wherever your team and customers
              work.
            </p>
            <p className="mt-7 text-2xl font-semibold tabular-nums">
              28{" "}
              <span className="text-sm font-normal text-muted-foreground">
                regions available
              </span>
            </p>
          </article>

          <article className="rounded-[12px] border border-border/70 bg-card p-6 shadow-soft lg:col-span-2">
            <TerminalIcon
              className="size-5 text-muted-foreground"
              aria-hidden
            />
            <h3 className="mt-5 text-lg font-semibold">Keep delivery moving.</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Review build status and deploy with a workflow your team can
              follow.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-md border border-border/70 bg-muted/40 px-4 py-3 text-sm">
              <code className="font-mono text-muted-foreground" dir="ltr">
                production / main
              </code>
              <span className="text-emerald-700 dark:text-emerald-400">
                Deployed successfully
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
