"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type Step = {
  id: number
  type: "done" | "in progress" | "open"
  title: string
  description: string
  activityTime: string
}

const STEPS: Step[] = [
  {
    id: 1,
    type: "done",
    title: "Repository connected",
    description: "Linked your GitHub repo to the SonoJS publish pipeline.",
    activityTime: "3d ago",
  },
  {
    id: 2,
    type: "done",
    title: "Registry build configured",
    description: "Set build commands, tokens, and registry output paths.",
    activityTime: "2d ago",
  },
  {
    id: 3,
    type: "done",
    title: "Docs domain verified",
    description: "Custom docs domain checked and SSL certificate issued.",
    activityTime: "31m ago",
  },
  {
    id: 4,
    type: "in progress",
    title: "Running health checks",
    description: "Verifying docs routes and registry JSON endpoints.",
    activityTime: "Running now…",
  },
  {
    id: 5,
    type: "open",
    title: "Go live",
    description: "Promote this build and switch traffic to the new release.",
    activityTime: "Upcoming",
  },
]

export default function ProgressChecklist({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "relative isolate flex w-full min-w-0 items-center justify-center overflow-hidden bg-white dark:bg-background px-4 py-10 text-foreground sm:py-12",
        className
      )}
      aria-labelledby="progress-checklist-05-heading"
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute start-1/2 top-[-18%] size-[22rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-lg">
        <h2
          id="progress-checklist-05-heading"
          className="text-start font-medium text-foreground"
        >
          Deployment progress
        </h2>
        <ul className="mt-6 space-y-6">
          {STEPS.map((step, stepIdx) => (
            <li key={step.id} className="relative flex gap-3">
              <div
                className={cn(
                  "absolute start-0 top-0 flex w-6 justify-center",
                  stepIdx === STEPS.length - 1 ? "h-6" : "-bottom-6"
                )}
              >
                <span aria-hidden className="w-px bg-border" />
              </div>
              <div className="flex items-start gap-2.5">
                <div className="relative flex size-6 flex-none items-center justify-center bg-white dark:bg-background">
                  {step.type === "done" ? (
                    <CheckIcon
                      aria-hidden
                      className="size-5 text-primary"
                      strokeWidth={2.5}
                    />
                  ) : step.type === "in progress" ? (
                    <div
                      aria-hidden
                      className="size-2.5 rounded-full bg-primary ring-4 ring-white dark:ring-background"
                    />
                  ) : (
                    <div
                      aria-hidden
                      className="size-3 rounded-full border border-border bg-card ring-4 ring-white dark:ring-background"
                    />
                  )}
                </div>
                <div className="text-start">
                  <p className="mt-0.5 text-sm font-medium text-foreground">
                    {step.title}{" "}
                    <span
                      dir="ltr"
                      className="font-normal text-muted-foreground/60"
                    >
                      &#8729; {step.activityTime}
                    </span>
                  </p>
                  <p className="mt-0.5 text-sm leading-6 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
