"use client"

import * as React from "react"
import { CheckCircle2Icon } from "lucide-react"

import { Progress } from "@sonojs/ui/components/progress"
import { cn } from "@/lib/utils"

const STEPS = [
  {
    id: "1.",
    title: "Create your workspace",
    description:
      "Choose a name, pick a URL slug, and set your region and defaults.",
  },
  {
    id: "2.",
    title: "Install your first components",
    description:
      "Add Button, Card, and a block with the CLI so your app matches the docs.",
  },
  {
    id: "3.",
    title: "Invite your team",
    description:
      "Send invites so designers and engineers can share the same registry.",
  },
  {
    id: "4.",
    title: "Connect GitHub & launch",
    description:
      "Link your repo, review permissions, and start shipping from the workspace.",
  },
] as const

export default function ProgressChecklist({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [activeStep, setActiveStep] = React.useState(0)
  const progressValue = ((activeStep + 1) / STEPS.length) * 100

  return (
    <section
      className={cn(
        "relative isolate flex w-full min-w-0 items-center justify-center overflow-hidden bg-white dark:bg-background px-4 py-10 text-foreground sm:py-12",
        className
      )}
      aria-labelledby="progress-checklist-03-heading"
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute start-1/2 top-[-18%] size-[22rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="w-full max-w-lg">
        <header className="text-start">
          <h2
            id="progress-checklist-03-heading"
            className="text-lg font-semibold text-foreground"
          >
            Workspace launch
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Complete each step to get your SonoJS workspace ready for the team.
          </p>
          <div className="mt-4 flex items-center justify-end gap-4">
            <span className="text-sm text-muted-foreground">
              Step {activeStep + 1}/{STEPS.length}
            </span>
            <Progress
              className="w-32"
              value={progressValue}
              aria-label="Setup progress"
            />
          </div>
        </header>

        <ul className="mt-4 space-y-4">
          {STEPS.map((step, index) => {
            const isActive = index === activeStep
            const isDone = index < activeStep
            return (
              <li key={step.id}>
                <button
                  type="button"
                  className={cn(
                    "relative w-full cursor-pointer rounded-[12px] border bg-card p-4 text-start shadow-soft transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    isActive
                      ? "border-foreground/20"
                      : "border-border/70"
                  )}
                  onClick={() => setActiveStep(index)}
                  aria-current={isActive ? "step" : undefined}
                >
                  <div className="flex items-start gap-3">
                    {isDone ? (
                      <CheckCircle2Icon
                        aria-hidden
                        className="size-6 shrink-0 text-foreground"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="flex size-6 items-center justify-center font-medium text-muted-foreground"
                      >
                        {step.id}
                      </span>
                    )}
                    <div>
                      <h3
                        className={cn(
                          "font-medium",
                          isDone
                            ? "text-muted-foreground line-through"
                            : "text-foreground"
                        )}
                      >
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>

        <div className="mt-6 rounded-[12px] bg-muted/60 p-4 text-start">
          <h4 className="text-sm font-medium text-foreground">Need help?</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            Reach the SonoJS team at{" "}
            <a
              className="font-medium text-primary hover:underline hover:underline-offset-4"
              href="mailto:hello@sonojs.com"
            >
              hello@sonojs.com
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
