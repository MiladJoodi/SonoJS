"use client"

import {
  AvailabilitySlots,
  expandRangesToTimeSlots,
} from "@sonojs/ui/components/availability-slots"

const slots = expandRangesToTimeSlots(
  [{ startMinutes: 9 * 60, endMinutes: 12 * 60 }],
  30
)

export function AvailabilitySlotsDefault() {
  return (
    <div className="w-full max-w-xs">
      <AvailabilitySlots slots={slots} defaultValue={slots[1]?.id ?? null} />
    </div>
  )
}
