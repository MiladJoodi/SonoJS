"use client"

import * as React from "react"
import { Slot } from "radix-ui"

import { cn } from "@sonojs/ui/lib/utils"

type TimelineContextValue = {
  activeStep: number
  setActiveStep: (step: number) => void
  orientation: "horizontal" | "vertical"
}

const TimelineContext = React.createContext<TimelineContextValue | undefined>(
  undefined
)

function useTimeline() {
  const context = React.useContext(TimelineContext)
  if (!context) {
    throw new Error("useTimeline must be used within a Timeline")
  }
  return context
}

type TimelineProps = React.ComponentProps<"div"> & {
  defaultValue?: number
  value?: number
  onValueChange?: (value: number) => void
  orientation?: "horizontal" | "vertical"
}

function Timeline({
  defaultValue = 1,
  value,
  onValueChange,
  orientation = "vertical",
  className,
  children,
  ...props
}: TimelineProps) {
  const [activeStep, setInternalStep] = React.useState(defaultValue)

  const setActiveStep = React.useCallback(
    (step: number) => {
      if (value === undefined) {
        setInternalStep(step)
      }
      onValueChange?.(step)
    },
    [value, onValueChange]
  )

  const currentStep = value ?? activeStep

  return (
    <TimelineContext.Provider
      value={{ activeStep: currentStep, setActiveStep, orientation }}
    >
      <div
        data-slot="timeline"
        data-orientation={orientation}
        className={cn(
          "flex",
          orientation === "horizontal"
            ? "w-full flex-row"
            : "flex-col ps-8",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </TimelineContext.Provider>
  )
}

function TimelineContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="timeline-content"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

type TimelineDateProps = React.ComponentProps<"time"> & {
  asChild?: boolean
}

function TimelineDate({
  asChild = false,
  className,
  ...props
}: TimelineDateProps) {
  const Comp = asChild ? Slot.Root : "time"

  return (
    <Comp
      data-slot="timeline-date"
      className={cn(
        "mb-1 block text-xs font-medium text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function TimelineHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // No `relative` — Indicator/Separator position against TimelineItem.
  return (
    <div data-slot="timeline-header" className={cn(className)} {...props} />
  )
}

type TimelineIndicatorProps = React.ComponentProps<"div"> & {
  asChild?: boolean
}

function TimelineIndicator({
  asChild = false,
  className,
  children,
  ...props
}: TimelineIndicatorProps) {
  const { orientation } = useTimeline()
  const Comp = asChild ? Slot.Root : "div"

  return (
    <Comp
      aria-hidden="true"
      data-slot="timeline-indicator"
      className={cn(
        "absolute z-10 size-4 rounded-full border-2 border-primary/20 bg-canvas group-data-completed/timeline-item:border-primary group-data-completed/timeline-item:bg-primary",
        orientation === "horizontal" &&
          "start-0 -top-8 -translate-y-1/2",
        orientation === "vertical" &&
          "top-0 -start-6 -translate-x-1/2 rtl:translate-x-1/2",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

type TimelineItemProps = React.ComponentProps<"div"> & {
  step: number
}

function TimelineItem({ step, className, ...props }: TimelineItemProps) {
  const { activeStep, orientation } = useTimeline()

  return (
    <div
      data-slot="timeline-item"
      data-completed={step <= activeStep || undefined}
      data-orientation={orientation}
      className={cn(
        "group/timeline-item relative flex flex-1 flex-col gap-0.5 has-[+[data-completed]]:**:data-[slot=timeline-separator]:bg-primary",
        // mt-12 clears -top-8 indicators (size-4/6) so overflow-x parents do not clip them.
        orientation === "horizontal" && "mt-12 pe-8 last:pe-0",
        // Gutter comes from Timeline `ps-8` — do not margin items (avoids missing ms-* utilities).
        orientation === "vertical" && "pb-6 last:pb-0",
        className
      )}
      {...props}
    />
  )
}

function TimelineSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { orientation } = useTimeline()

  return (
    <div
      aria-hidden="true"
      data-slot="timeline-separator"
      className={cn(
        // No self-start: abspos flex items with align-self collapse to height 0.
        "pointer-events-none absolute bg-primary/10 group-last/timeline-item:hidden",
        orientation === "horizontal" &&
          "-top-8 h-0.5 w-[calc(100%-1rem-0.25rem)] translate-x-4 -translate-y-1/2 rtl:-translate-x-4",
        orientation === "vertical" &&
          "-start-6 top-6 bottom-0 w-0.5 -translate-x-1/2 rtl:translate-x-1/2",
        className
      )}
      {...props}
    />
  )
}

function TimelineTitle({
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="timeline-title"
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  )
}

export {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
  useTimeline,
}
