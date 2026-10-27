"use client"

import * as React from "react"
import {
  CheckCircle2Icon,
  Loader2Icon,
  RefreshCwIcon,
} from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@sonojs/ui/components/accordion"
import { Button } from "@sonojs/ui/components/button"
import { Progress } from "@sonojs/ui/components/progress"
import { cn } from "@/lib/utils"

type Step = {
  id: number
  type: "created" | "in progress"
  description: string
  value: number
  createdOn: string | null
  runTime: string | null
}

const INITIAL_STEPS: Step[] = [
  {
    id: 1,
    type: "created",
    description: "Export legacy tokens",
    value: 100,
    createdOn: "2026-03-10 09:32",
    runTime: "12min 18s",
  },
  {
    id: 2,
    type: "created",
    description: "Map to SonoJS schema",
    value: 100,
    createdOn: "2026-03-10 10:03",
    runTime: "18min 45s",
  },
  {
    id: 3,
    type: "in progress",
    description: "Import components",
    value: 45,
    createdOn: null,
    runTime: null,
  },
]

export default function DataImport({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [steps, setSteps] = React.useState<Step[]>(INITIAL_STEPS)
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

  const allComplete = steps.every((s) => s.value === 100)

  const startAnimation = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      setSteps((prev) => {
        const next = prev.map((step) => {
          if (step.id !== 3 || step.value >= 100) {
            return step
          }
          const increment = Math.random() * 0.8 + 0.3
          const newValue = Math.min(step.value + increment, 100)
          if (newValue >= 100) {
            return {
              ...step,
              value: 100,
              type: "created" as const,
              createdOn: "2026-03-10 10:47",
              runTime: "6min 32s",
            }
          }
          return { ...step, value: newValue }
        })
        if (next[2]?.value >= 100 && intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
        return next
      })
    }, 50)
  }, [])

  React.useEffect(() => {
    startAnimation()
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [startAnimation])

  const handleRunAgain = () => {
    setSteps(INITIAL_STEPS)
    startAnimation()
  }

  return (
    <section
      className={cn(
        "relative isolate flex w-full min-w-0 items-center justify-center overflow-hidden bg-white dark:bg-background px-4 py-10 text-foreground sm:py-12",
        className
      )}
      aria-labelledby="data-import-01-heading"
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute start-1/2 top-[-18%] size-[22rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between gap-3">
          <h2
            id="data-import-01-heading"
            className="font-semibold text-foreground"
          >
            Design system migration
          </h2>
          <Button
            type="button"
            size="icon-xs"
            variant="secondary"
            aria-label="Run migration again"
            className={cn(
              allComplete
                ? "opacity-100"
                : "pointer-events-none opacity-0"
            )}
            onClick={handleRunAgain}
          >
            <RefreshCwIcon className="size-4" aria-hidden />
          </Button>
        </div>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          Migrating tokens and components into your SonoJS workspace
        </p>

        <div className="mt-6 flex items-start gap-2">
          {steps.map((step) => (
            <div className="min-w-0 w-full truncate" key={step.id}>
              <Progress className="h-1.5" value={step.value} />
              <div className="mt-2 flex items-center gap-1 truncate">
                {step.value === 100 ? (
                  <CheckCircle2Icon
                    aria-hidden
                    className="size-4 shrink-0 text-primary"
                  />
                ) : (
                  <Loader2Icon
                    aria-hidden
                    className="size-4 shrink-0 animate-spin text-primary"
                  />
                )}
                <p className="truncate text-xs text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Accordion
          type="single"
          collapsible
          className="mt-8"
          defaultValue="logs"
        >
          <AccordionItem
            className="rounded-md border-b-0"
            value="logs"
          >
            <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline">
              Logs overview ({steps.length})
            </AccordionTrigger>
            <AccordionContent>
              <ul className="mt-2 space-y-6 pb-2">
                {steps.map((step, stepIdx) => (
                  <li key={step.id} className="relative flex gap-3">
                    <div
                      className={cn(
                        "absolute start-0 top-0 flex w-6 justify-center",
                        stepIdx === steps.length - 1 ? "h-6" : "-bottom-6"
                      )}
                    >
                      <span aria-hidden className="w-px bg-border" />
                    </div>
                    <div className="flex items-start gap-2.5">
                      <div className="relative flex size-6 flex-none items-center justify-center bg-white dark:bg-background">
                        <div
                          className={cn(
                            "size-3 rounded-full border border-border ring-4 ring-white dark:ring-background",
                            step.type === "created"
                              ? "bg-muted/50"
                              : "bg-card"
                          )}
                        />
                      </div>
                      <div className="text-start">
                        <p className="mt-0.5 text-sm font-medium text-foreground">
                          {step.description}
                        </p>
                        {step.type === "created" ? (
                          <p
                            dir="ltr"
                            className="text-sm leading-6 text-muted-foreground"
                          >
                            Created on {step.createdOn}, Runtime:{" "}
                            {step.runTime}
                          </p>
                        ) : (
                          <p className="text-sm leading-6 text-muted-foreground">
                            12,847 of 28,500 components processed…
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}
