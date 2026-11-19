"use client"

import {
  Availability,
  type AvailabilitySlot,
} from "@sonojs/ui/components/availability"

const seed: AvailabilitySlot[] = [
  { id: "wed", day: 3, startMinutes: 9 * 60, endMinutes: 9 * 60 + 45 },
]

export function AvailabilitySlotSize() {
  return (
    <div className="w-full max-w-4xl space-y-2">
      <p className="text-xs text-muted-foreground">
        Snap to 15-minute increments with{" "}
        <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
          {"slotMinutes={15}"}
        </code>
        .
      </p>
      <Availability defaultValue={seed} slotMinutes={15} />
    </div>
  )
}
