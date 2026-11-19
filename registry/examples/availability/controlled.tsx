"use client"

import * as React from "react"

import {
  Availability,
  type AvailabilitySlot,
} from "@sonojs/ui/components/availability"
import { Button } from "@sonojs/ui/components/button"

const seed: AvailabilitySlot[] = [
  { id: "mon", day: 1, startMinutes: 9 * 60, endMinutes: 11 * 60 },
  { id: "fri", day: 5, startMinutes: 13 * 60, endMinutes: 15 * 60 },
]

export function AvailabilityControlled() {
  const [value, setValue] = React.useState<AvailabilitySlot[]>(seed)

  return (
    <div className="flex w-full max-w-4xl flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setValue([])}
        >
          Clear all
        </Button>
        <p className="text-xs text-muted-foreground">
          {value.length
            ? `${value.length} slot${value.length === 1 ? "" : "s"}`
            : "No slots"}
        </p>
      </div>
      <Availability value={value} onValueChange={setValue} />
    </div>
  )
}
