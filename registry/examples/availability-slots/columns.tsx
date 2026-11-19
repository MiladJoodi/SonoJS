"use client"

import {
  AvailabilitySlots,
  expandRangesToTimeSlots,
} from "@sonojs/ui/components/availability-slots"

const slots = expandRangesToTimeSlots(
  [{ startMinutes: 9 * 60, endMinutes: 15 * 60 }],
  30
)

export function AvailabilitySlotsColumns() {
  return (
    <div className="w-full max-w-md space-y-2">
      <p className="text-xs text-muted-foreground">
        Dense layout with{" "}
        <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
          {"columns={3}"}
        </code>
        .
      </p>
      <AvailabilitySlots slots={slots} columns={3} />
    </div>
  )
}
