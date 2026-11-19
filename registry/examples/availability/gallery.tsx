"use client"

import * as React from "react"
import { CalendarClockIcon } from "lucide-react"

import {
  Availability,
  type AvailabilitySlot,
} from "@sonojs/ui/components/availability"
import { Badge } from "@sonojs/ui/components/badge"

const seed: AvailabilitySlot[] = [
  { id: "mon-am", day: 1, startMinutes: 9 * 60, endMinutes: 12 * 60 },
  { id: "wed-pm", day: 3, startMinutes: 13 * 60, endMinutes: 17 * 60 },
  { id: "fri-am", day: 5, startMinutes: 10 * 60, endMinutes: 14 * 60 },
]

export function AvailabilityGallery() {
  const [value, setValue] = React.useState<AvailabilitySlot[]>(seed)

  return (
    <div className="w-full max-w-4xl space-y-4">
      <div className="flex items-start gap-3 rounded-[12px] border border-border/70 bg-card p-4 shadow-soft">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CalendarClockIcon className="size-4" aria-hidden />
        </span>
        <div className="min-w-0 space-y-1">
          <h3 className="text-sm font-semibold tracking-tight text-foreground">
            Weekly availability
          </h3>
          <p className="text-xs text-muted-foreground">
            Drag on the grid to add hours. Resize slot edges, then press Delete
            to remove a selected block.
          </p>
        </div>
        <Badge variant="secondary" className="ms-auto shrink-0 font-normal">
          {value.length} slots
        </Badge>
      </div>
      <Availability value={value} onValueChange={setValue} />
    </div>
  )
}
