"use client"

import {
  Availability,
  type AvailabilitySlot,
} from "@sonojs/ui/components/availability"

const seed: AvailabilitySlot[] = [
  { id: "mon", day: 1, startMinutes: 9 * 60, endMinutes: 12 * 60 },
  { id: "wed", day: 3, startMinutes: 13 * 60, endMinutes: 17 * 60 },
]

export function AvailabilityDisabled() {
  return (
    <div className="grid w-full max-w-4xl gap-6">
      <div className="space-y-2">
        <p className="text-xs font-medium text-foreground">Disabled</p>
        <Availability defaultValue={seed} disabled />
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-foreground">Read only</p>
        <Availability defaultValue={seed} readOnly />
      </div>
    </div>
  )
}
