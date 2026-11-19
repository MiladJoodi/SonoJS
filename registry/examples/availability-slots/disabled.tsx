"use client"

import {
  AvailabilitySlots,
  type AvailabilityTimeSlot,
} from "@sonojs/ui/components/availability-slots"

const slots: AvailabilityTimeSlot[] = [
  { id: "900", startMinutes: 9 * 60, label: "9:00 AM" },
  {
    id: "930",
    startMinutes: 9 * 60 + 30,
    label: "9:30 AM",
    disabled: true,
  },
  { id: "1000", startMinutes: 10 * 60, label: "10:00 AM" },
  { id: "1030", startMinutes: 10 * 60 + 30, label: "10:30 AM" },
]

export function AvailabilitySlotsDisabled() {
  return (
    <div className="grid w-full max-w-xs gap-6">
      <div className="space-y-2">
        <p className="text-xs font-medium text-foreground">Per-slot disabled</p>
        <AvailabilitySlots slots={slots} defaultValue="1000" />
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-foreground">All disabled</p>
        <AvailabilitySlots slots={slots} disabled />
      </div>
    </div>
  )
}
