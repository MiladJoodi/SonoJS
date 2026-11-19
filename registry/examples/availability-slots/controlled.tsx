"use client"

import * as React from "react"

import {
  AvailabilitySlots,
  expandRangesToTimeSlots,
} from "@sonojs/ui/components/availability-slots"
import { Button } from "@sonojs/ui/components/button"

const slots = expandRangesToTimeSlots(
  [{ startMinutes: 13 * 60, endMinutes: 17 * 60 }],
  30
)

export function AvailabilitySlotsControlled() {
  const [value, setValue] = React.useState<string | null>(null)
  const label = slots.find((slot) => slot.id === value)?.label

  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <AvailabilitySlots slots={slots} value={value} onValueChange={setValue} />
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setValue(null)}
        >
          Clear
        </Button>
        <p className="text-xs text-muted-foreground">
          {label ?? "No time selected"}
        </p>
      </div>
    </div>
  )
}
