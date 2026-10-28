"use client"

import * as React from "react"
import { CheckIcon, RocketIcon, SparklesIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
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

const STEPS = [
  {
    id: "profile",
    label: "Complete your profile",
    hint: "Name, avatar, and timezone",
  },
  {
    id: "invite",
    label: "Invite a teammate",
    hint: "Share the workspace early",
  },
  {
    id: "component",
    label: "Install your first component",
    hint: "Start with Button or Input",
  },
] as const

export default function EmptyState({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [done, setDone] = React.useState<Record<string, boolean>>({
    profile: true,
    invite: false,
    component: false,
  })

  const completed = Object.values(done).filter(Boolean).length

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas px-4 py-10 text-foreground sm:px-6 sm:py-14",
        className
      )}
      aria-labelledby="empty-state-09-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-lg overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
        <div className="flex items-start gap-3 px-4 pt-5 sm:px-5">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <SparklesIcon className="size-5" aria-hidden />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium tracking-wide text-primary">
              Get started
            </p>
            <h2
              id="empty-state-09-heading"
              className="mt-0.5 text-base font-semibold tracking-tight"
            >
              Set up your workspace
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {completed} of {STEPS.length} steps complete
            </p>
          </div>
        </div>

        <Separator className="my-4" />

        <ul className="space-y-1 px-4 pb-2 sm:px-5">
          {STEPS.map((step) => {
            const checked = done[step.id] === true
            return (
              <li key={step.id}>
                <label
                  htmlFor={`empty-state-09-${step.id}`}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-[12px] border border-transparent px-2 py-2.5 transition-colors hover:bg-muted/40",
                    checked && "opacity-70"
                  )}
                >
                  <Checkbox
                    id={`empty-state-09-${step.id}`}
                    checked={checked}
                    onCheckedChange={(v) =>
                      setDone((prev) => ({ ...prev, [step.id]: v === true }))
                    }
                    className="mt-0.5 cursor-pointer"
                  />
                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        "block text-sm font-medium",
                        checked && "line-through"
                      )}
                    >
                      {step.label}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {step.hint}
                    </span>
                  </span>
                  {checked ? (
                    <CheckIcon
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden
                    />
                  ) : null}
                </label>
              </li>
            )
          })}
        </ul>

        <Empty className="border-0 pt-2 pb-6">
          <EmptyHeader className="max-w-none">
            <EmptyMedia variant="icon" className="sr-only">
              <RocketIcon aria-hidden />
            </EmptyMedia>
            <EmptyTitle className="sr-only">Finish setup</EmptyTitle>
            <EmptyDescription>
              Finish these steps to unlock invites, installs, and your first
              preview.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button type="button" className="cursor-pointer">
              <RocketIcon className="size-4" aria-hidden />
              Start setup
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    </section>
  )
}
