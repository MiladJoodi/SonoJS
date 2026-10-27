"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type Activity = {
  id: number
  type: "done" | "upcoming"
  description: string
  user: { name: string; initial: string; bgColor: string }
  activityTime: string
}

const ACTIVITIES: Activity[] = [
  {
    id: 1,
    type: "done",
    description: "created workspace “Acme Design System”",
    user: { name: "Sarah K.", initial: "S", bgColor: "bg-violet-500" },
    activityTime: "3d ago",
  },
  {
    id: 2,
    type: "done",
    description: "added button and card via the CLI",
    user: { name: "Marcus L.", initial: "M", bgColor: "bg-orange-500" },
    activityTime: "2d ago",
  },
  {
    id: 3,
    type: "done",
    description: "shared the login-01 block with the team",
    user: { name: "Sarah K.", initial: "S", bgColor: "bg-emerald-500" },
    activityTime: "2h ago",
  },
  {
    id: 4,
    type: "done",
    description: "left feedback on the settings form layout",
    user: { name: "Jamie R.", initial: "J", bgColor: "bg-fuchsia-500" },
    activityTime: "5m ago",
  },
  {
    id: 5,
    type: "upcoming",
    description: "scheduled a registry review for today",
    user: { name: "Team Ops", initial: "T", bgColor: "bg-blue-500" },
    activityTime: "today 2:30pm",
  },
]

export default function ActivityFeed({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "relative isolate flex w-full min-w-0 items-center justify-center overflow-hidden bg-white dark:bg-background px-4 py-10 text-foreground sm:py-12",
        className
      )}
      aria-labelledby="activity-feed-03-heading"
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute start-1/2 top-[-18%] size-[22rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-lg">
        <header className="text-start">
          <h2
            id="activity-feed-03-heading"
            className="font-medium text-foreground"
          >
            Workspace activity
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Recent updates from your SonoJS team
          </p>
        </header>

        <ul className="mt-6 space-y-6 pb-2">
          {ACTIVITIES.map((step, stepIdx) => (
            <li key={step.id} className="relative flex gap-3">
              <div
                className={cn(
                  "absolute start-0 top-0 flex w-6 justify-center",
                  stepIdx === ACTIVITIES.length - 1 ? "h-6" : "-bottom-6"
                )}
              >
                <span aria-hidden className="w-px bg-border" />
              </div>
              <div className="flex min-w-0 flex-1 items-start gap-2">
                <div className="flex shrink-0 items-center gap-2">
                  <div className="relative flex size-6 flex-none items-center justify-center bg-white dark:bg-background">
                    <div
                      className={cn(
                        "size-3 rounded-full border border-border ring-4 ring-white dark:ring-background",
                        step.type === "done" ? "bg-muted/50" : "bg-card"
                      )}
                    />
                  </div>
                  <span
                    aria-hidden
                    className={cn(
                      step.user.bgColor,
                      "inline-flex size-6 flex-none items-center justify-center rounded-full text-xs text-white"
                    )}
                  >
                    {step.user.initial}
                  </span>
                </div>
                <p className="mt-0.5 min-w-0 text-pretty text-sm font-medium text-foreground">
                  {step.user.name}
                  <span className="font-normal text-muted-foreground">
                    {" "}
                    {step.description}
                  </span>
                  <span
                    dir="ltr"
                    className="font-normal text-muted-foreground/60"
                  >
                    {" "}
                    &#8729; {step.activityTime}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
