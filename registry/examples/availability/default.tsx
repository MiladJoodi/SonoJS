"use client"

import {
  Availability,
  type AvailabilitySlot,
} from "@sonojs/ui/components/availability"

const seed: AvailabilitySlot[] = [
  { id: "tue", day: 2, startMinutes: 10 * 60, endMinutes: 12 * 60 },
  { id: "thu", day: 4, startMinutes: 14 * 60, endMinutes: 16 * 60 },
]

export function AvailabilityDefault() {
  return (
    <div className="w-full max-w-4xl">
      <Availability defaultValue={seed} />
    </div>
  )
}
