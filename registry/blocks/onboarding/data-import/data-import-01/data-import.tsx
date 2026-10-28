"use client"

import * as React from "react"
import {
  CheckCircle2Icon,
  Loader2Icon,
  RefreshCwIcon,
  XIcon,
} from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Progress } from "@sonojs/ui/components/progress"
import { cn } from "@/lib/utils"

const TOTAL_ROWS = 28_500

type StepStatus = "done" | "active" | "pending"

type Step = {
  id: string
  label: string
  status: StepStatus
}

const INITIAL_STEPS: Step[] = [
  { id: "upload", label: "Upload file", status: "done" },
  { id: "map", label: "Map columns", status: "done" },
  { id: "import", label: "Import rows", status: "active" },
]

export default function DataImport({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [processed, setProcessed] = React.useState(12_400)
  const [steps, setSteps] = React.useState<Step[]>(INITIAL_STEPS)
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

  const percent = Math.min(100, Math.round((processed / TOTAL_ROWS) * 100))
  const complete = processed >= TOTAL_ROWS

  const clearTick = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const startImport = React.useCallback(() => {
    clearTick()
    intervalRef.current = setInterval(() => {
      setProcessed((prev) => {
        if (prev >= TOTAL_ROWS) {
          clearTick()
          return TOTAL_ROWS
        }
        const bump = Math.floor(Math.random() * 180) + 90
        return Math.min(prev + bump, TOTAL_ROWS)
      })
    }, 80)
  }, [clearTick])

  React.useEffect(() => {
    startImport()
    return clearTick
  }, [startImport, clearTick])

  React.useEffect(() => {
    if (!complete) return
    clearTick()
    setSteps((prev) =>
      prev.map((step) =>
        step.id === "import" ? { ...step, status: "done" as const } : step
      )
    )
  }, [complete, clearTick])

  const handleRunAgain = () => {
    setProcessed(12_400)
    setSteps(INITIAL_STEPS)
    startImport()
  }

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white px-4 py-10 text-foreground dark:bg-background sm:px-6 sm:py-12",
        className
      )}
      aria-labelledby="data-import-01-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-lg rounded-[12px] border border-border/70 bg-card p-6 sm:p-8">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 text-start">
            <h1
              id="data-import-01-heading"
              className="text-lg font-semibold tracking-tight"
            >
              Importing contacts
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {complete
                ? "All rows imported successfully."
                : "We’re writing rows into your workspace. Keep this tab open."}
            </p>
          </div>
          {complete ? (
            <Button
              type="button"
              size="icon"
              variant="outline"
              className="size-9 shrink-0 cursor-pointer"
              aria-label="Run import again"
              onClick={handleRunAgain}
            >
              <RefreshCwIcon className="size-4" aria-hidden />
            </Button>
          ) : null}
        </div>

        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="font-medium tabular-nums" dir="ltr">
              {percent}%
            </span>
            <span className="text-muted-foreground tabular-nums" dir="ltr">
              {processed.toLocaleString("en-US")} /{" "}
              {TOTAL_ROWS.toLocaleString("en-US")} rows
            </span>
          </div>
          <Progress value={percent} className="h-2" />
        </div>

        <ol className="mt-6 space-y-3">
          {steps.map((step) => (
            <li
              key={step.id}
              className="flex items-center gap-3 rounded-[12px] border border-border/70 px-3 py-2.5"
            >
              {step.status === "done" ? (
                <CheckCircle2Icon
                  className="size-4 shrink-0 text-primary"
                  aria-hidden
                />
              ) : step.status === "active" ? (
                <Loader2Icon
                  className="size-4 shrink-0 animate-spin text-primary"
                  aria-hidden
                />
              ) : (
                <span
                  className="size-4 shrink-0 rounded-full border border-border"
                  aria-hidden
                />
              )}
              <span
                className={cn(
                  "text-sm",
                  step.status === "pending"
                    ? "text-muted-foreground"
                    : "font-medium text-foreground"
                )}
              >
                {step.label}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          {!complete ? (
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
            >
              <XIcon className="size-4" aria-hidden />
              Cancel
            </Button>
          ) : (
            <Button
              type="button"
              className="cursor-pointer"
              onClick={handleRunAgain}
            >
              <RefreshCwIcon className="size-4" aria-hidden />
              Run again
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
