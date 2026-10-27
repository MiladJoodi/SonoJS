"use client"

import * as React from "react"
import {
  ArchiveIcon,
  CheckCircle2Icon,
  ChevronRightIcon,
  CircleDashedIcon,
  MailIcon,
  MoreHorizontalIcon,
} from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import {
  Collapsible,
  CollapsibleContent,
} from "@sonojs/ui/components/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
import { cn } from "@/lib/utils"

type OnboardingStep = {
  id: string
  title: string
  description: string
  completed: boolean
  actionLabel: string
}

const INITIAL_STEPS: OnboardingStep[] = [
  {
    id: "profile",
    title: "Complete your profile",
    description:
      "Add your name, photo, and role so teammates know who you are in the workspace.",
    completed: true,
    actionLabel: "Edit profile",
  },
  {
    id: "workspace",
    title: "Create your workspace",
    description:
      "Name your workspace, pick a region, and set defaults for new components.",
    completed: false,
    actionLabel: "Configure workspace",
  },
  {
    id: "install",
    title: "Install your first component",
    description:
      "Run `npx @sonojs/ui@latest add button` to pull a registry item into your app.",
    completed: false,
    actionLabel: "View install guide",
  },
  {
    id: "invite",
    title: "Invite your team",
    description:
      "Send invites so designers and engineers can share the same component library.",
    completed: false,
    actionLabel: "Send invites",
  },
  {
    id: "integrations",
    title: "Connect GitHub",
    description:
      "Link your repo so registry updates and PRs stay in sync with your design system.",
    completed: false,
    actionLabel: "Connect GitHub",
  },
  {
    id: "notifications",
    title: "Set notification preferences",
    description:
      "Choose which team and usage alerts you want by email — security notices always send.",
    completed: false,
    actionLabel: "Manage notifications",
  },
]

function CircularProgress({
  completed,
  total,
}: {
  completed: number
  total: number
}) {
  const progress = total > 0 ? (completed / total) * 100 : 0
  const strokeDashoffset = 100 - progress

  return (
    <svg
      className="-rotate-90"
      height="14"
      width="14"
      viewBox="0 0 14 14"
      aria-hidden
    >
      <circle
        className="stroke-muted"
        cx="7"
        cy="7"
        fill="none"
        pathLength="100"
        r="6"
        strokeWidth="2"
      />
      <circle
        className="stroke-primary"
        cx="7"
        cy="7"
        fill="none"
        pathLength="100"
        r="6"
        strokeDasharray="100"
        strokeLinecap="round"
        strokeWidth="2"
        style={{ strokeDashoffset }}
      />
    </svg>
  )
}

function StepIndicator({ completed }: { completed: boolean }) {
  if (completed) {
    return (
      <CheckCircle2Icon
        aria-hidden
        className="mt-1 size-5 shrink-0 text-primary"
      />
    )
  }
  return (
    <CircleDashedIcon
      aria-hidden
      className="mt-1 size-5 shrink-0 text-muted-foreground/40"
      strokeWidth={2}
    />
  )
}

export default function ProgressChecklist({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [currentSteps, setCurrentSteps] =
    React.useState<OnboardingStep[]>(INITIAL_STEPS)
  const [openStepId, setOpenStepId] = React.useState<string | null>(() => {
    const firstIncomplete = INITIAL_STEPS.find((s) => !s.completed)
    return firstIncomplete?.id ?? INITIAL_STEPS[0]?.id ?? null
  })
  const [dismissed, setDismissed] = React.useState(false)

  const completedCount = currentSteps.filter((s) => s.completed).length

  const handleStepClick = (stepId: string) => {
    setOpenStepId((current) => (current === stepId ? null : stepId))
  }

  const handleStepAction = (step: OnboardingStep) => {
    const updated = currentSteps.map((s) =>
      s.id === step.id ? { ...s, completed: true } : s
    )
    setCurrentSteps(updated)
    const nextIncomplete = updated.find((s) => !s.completed)
    setOpenStepId(nextIncomplete?.id ?? null)
  }

  if (dismissed) {
    return (
      <section
        className={cn(
          "flex min-h-[28rem] w-full items-center justify-center bg-white dark:bg-background px-4 py-10",
          className
        )}
        {...props}
      >
        <div className="text-center">
          <p className="text-pretty text-muted-foreground">
            Checklist dismissed
          </p>
          <button
            type="button"
            className="mt-2 cursor-pointer text-sm text-primary underline underline-offset-4"
            onClick={() => setDismissed(false)}
          >
            Show again
          </button>
        </div>
      </section>
    )
  }

  return (
    <section
      className={cn(
        "relative isolate flex w-full min-w-0 items-center justify-center overflow-hidden bg-white dark:bg-background px-4 py-10 text-foreground sm:py-12",
        className
      )}
      aria-labelledby="progress-checklist-01-heading"
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute start-1/2 top-[-18%] size-[22rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="w-full max-w-lg">
        <div className="rounded-[12px] border border-border/70 bg-card p-4 text-card-foreground shadow-soft">
          <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <h2
              id="progress-checklist-01-heading"
              className="ps-1 text-balance font-semibold text-foreground"
            >
              Get started with SonoJS
            </h2>
            <div className="flex flex-wrap items-center justify-start gap-1.5 sm:justify-end">
              <CircularProgress
                completed={completedCount}
                total={currentSteps.length}
              />
              <p className="me-1 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  {completedCount}
                </span>
                {" / "}
                <span className="font-medium text-foreground">
                  {currentSteps.length}
                </span>{" "}
                completed
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    size="icon-xs"
                    variant="ghost"
                    aria-label="Checklist options"
                  >
                    <MoreHorizontalIcon className="size-4" aria-hidden />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem onClick={() => setDismissed(true)}>
                    <ArchiveIcon className="size-4" aria-hidden />
                    Dismiss
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="mailto:hello@sonojs.com?subject=Onboarding%20feedback">
                      <MailIcon className="size-4" aria-hidden />
                      Give feedback
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div>
            {currentSteps.map((step, index) => {
              const isOpen = openStepId === step.id
              const isFirst = index === 0
              const prevStep = currentSteps[index - 1]
              const isPrevOpen = !!prevStep && openStepId === prevStep.id
              const showBorderTop = !(isFirst || isOpen || isPrevOpen)

              return (
                <div
                  key={step.id}
                  className={cn(
                    "group",
                    isOpen && "rounded-lg",
                    showBorderTop && "border-t border-border/70"
                  )}
                >
                  <div
                    role="button"
                    tabIndex={0}
                    aria-expanded={isOpen}
                    className={cn(
                      "block w-full cursor-pointer text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      isOpen && "rounded-lg"
                    )}
                    onClick={() => handleStepClick(step.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        handleStepClick(step.id)
                      }
                    }}
                  >
                    <div
                      className={cn(
                        "relative overflow-hidden rounded-lg transition-colors",
                        isOpen && "border border-border/70 bg-muted/50"
                      )}
                    >
                      <div className="relative flex items-center justify-between gap-3 py-3 pe-2 ps-4">
                        <div className="flex w-full gap-3">
                          <div className="shrink-0">
                            <StepIndicator completed={step.completed} />
                          </div>
                          <div className="mt-0.5 grow">
                            <h3
                              className={cn(
                                "font-semibold",
                                step.completed
                                  ? "text-primary"
                                  : "text-foreground"
                              )}
                            >
                              {step.title}
                            </h3>
                            <Collapsible open={isOpen}>
                              <CollapsibleContent>
                                <p className="mt-2 max-w-xs text-pretty text-sm text-muted-foreground">
                                  {step.description}
                                </p>
                                <Button
                                  type="button"
                                  size="sm"
                                  className="mt-3"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleStepAction(step)
                                  }}
                                >
                                  {step.actionLabel}
                                </Button>
                              </CollapsibleContent>
                            </Collapsible>
                          </div>
                        </div>
                        {!isOpen ? (
                          <ChevronRightIcon
                            aria-hidden
                            className="icon-dir size-4 shrink-0 text-muted-foreground"
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
