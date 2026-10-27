"use client"

import * as React from "react"
import {
  CheckCircle2Icon,
  FolderIcon,
  PlugIcon,
  RocketIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

type StepData = {
  id: string
  title: string
  description: string
  icon: LucideIcon
  actionLabel: string
}

const STEPS: StepData[] = [
  {
    id: "workspace",
    title: "Create your workspace",
    description:
      "Name your workspace and pick a URL. This is where your team will share components and docs.",
    icon: RocketIcon,
    actionLabel: "Get started",
  },
  {
    id: "invite",
    title: "Invite your team",
    description:
      "Add teammates by email so designers and engineers can collaborate on the same registry.",
    icon: UsersIcon,
    actionLabel: "Send invites",
  },
  {
    id: "project",
    title: "Add your first component",
    description:
      "Install a block with the SonoJS CLI and open it in your app to confirm the setup.",
    icon: FolderIcon,
    actionLabel: "View install guide",
  },
  {
    id: "integrations",
    title: "Connect your tools",
    description:
      "Link GitHub so registry updates and PRs stay in sync with your design system.",
    icon: PlugIcon,
    actionLabel: "Connect GitHub",
  },
]

function getIconColor(isCompleted: boolean, isActive: boolean) {
  if (isCompleted) return "text-muted-foreground/30"
  if (isActive) return "text-primary"
  return "text-muted-foreground/40"
}

function getTitleClass(isCompleted: boolean, isActive: boolean) {
  if (isCompleted) return "text-muted-foreground/50 line-through"
  if (isActive) return "text-foreground"
  return "text-muted-foreground"
}

function StepIndicator({
  index,
  isCompleted,
  isActive,
}: {
  index: number
  isCompleted: boolean
  isActive: boolean
}) {
  if (isCompleted) {
    return (
      <div className="flex size-7 items-center justify-center">
        <CheckCircle2Icon
          aria-hidden
          className="size-7 text-emerald-600 dark:text-emerald-400"
        />
      </div>
    )
  }
  return (
    <div
      className={cn(
        "flex size-7 items-center justify-center rounded-full text-xs font-semibold",
        isActive
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-muted-foreground"
      )}
    >
      {index + 1}
    </div>
  )
}

function StepCard({
  step,
  index,
  isCompleted,
  isActive,
  onComplete,
}: {
  step: StepData
  index: number
  isCompleted: boolean
  isActive: boolean
  onComplete: () => void
}) {
  const StepIcon = step.icon

  return (
    <div
      className={cn(
        "rounded-[12px] border p-4 transition-colors",
        isActive && "border-primary/30 bg-muted/50",
        !isActive && "border-border/70 bg-card"
      )}
    >
      <div className="flex gap-3">
        <div className="mt-0.5 shrink-0">
          <StepIndicator
            index={index}
            isActive={isActive}
            isCompleted={isCompleted}
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-3">
            <div className="min-w-0 flex-1 text-start">
              <p
                className={cn(
                  "font-medium leading-6",
                  getTitleClass(isCompleted, isActive)
                )}
              >
                {step.title}
              </p>
              <p
                className={cn(
                  "mt-0.5 text-sm leading-5",
                  isActive
                    ? "text-muted-foreground"
                    : "text-muted-foreground/60"
                )}
              >
                {step.description}
              </p>
              {isActive ? (
                <Button
                  type="button"
                  className="mt-3"
                  size="sm"
                  onClick={onComplete}
                >
                  <StepIcon className="size-4 shrink-0" aria-hidden />
                  {step.actionLabel}
                </Button>
              ) : null}
            </div>
            <StepIcon
              aria-hidden
              className={cn(
                "mt-0.5 size-5 shrink-0",
                getIconColor(isCompleted, isActive)
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProgressChecklist({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [completedSteps, setCompletedSteps] = React.useState<Set<number>>(
    () => new Set([0])
  )

  const currentStep = STEPS.findIndex((_, i) => !completedSteps.has(i))
  const completedCount = completedSteps.size
  const allDone = completedCount === STEPS.length

  const handleComplete = (index: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev)
      next.add(index)
      return next
    })
  }

  return (
    <section
      className={cn(
        "relative isolate flex w-full min-w-0 items-center justify-center overflow-hidden bg-white dark:bg-background px-4 py-10 text-foreground sm:py-12",
        className
      )}
      aria-labelledby="progress-checklist-02-heading"
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute start-1/2 top-[-18%] size-[22rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="w-full max-w-xl">
        <header className="mb-6 text-start">
          <h2
            id="progress-checklist-02-heading"
            className="text-lg font-semibold text-foreground"
          >
            Set up your workspace
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Complete these steps to get your SonoJS team up and running.
          </p>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {allDone ? (
                  <span className="font-medium text-emerald-700 dark:text-emerald-400">
                    All steps complete
                  </span>
                ) : (
                  <>
                    <span className="font-medium text-foreground">
                      {completedCount}
                    </span>{" "}
                    of {STEPS.length} completed
                  </>
                )}
              </span>
            </div>
            <div
              className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={STEPS.length}
              aria-valuenow={completedCount}
              aria-label="Onboarding progress"
            >
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                style={{
                  width: `${(completedCount / STEPS.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </header>

        <div className="space-y-3">
          {STEPS.map((step, index) => (
            <StepCard
              key={step.id}
              step={step}
              index={index}
              isActive={index === currentStep}
              isCompleted={completedSteps.has(index)}
              onComplete={() => handleComplete(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
