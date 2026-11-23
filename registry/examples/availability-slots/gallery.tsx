"use client"

import * as React from "react"
import { CalendarClockIcon } from "lucide-react"

import {
  AvailabilitySlots,
  expandRangesToTimeSlots,
} from "@sonojs/ui/components/availability-slots"
import { Badge } from "@sonojs/ui/components/badge"
import { Calendar } from "@sonojs/ui/components/calendar"

const weekdayRanges: Record<number, { startMinutes: number; endMinutes: number }[]> =
  {
    1: [{ startMinutes: 9 * 60, endMinutes: 12 * 60 }],
    2: [{ startMinutes: 10 * 60, endMinutes: 16 * 60 }],
    3: [{ startMinutes: 9 * 60, endMinutes: 12 * 60 }],
    4: [{ startMinutes: 13 * 60, endMinutes: 17 * 60 }],
    5: [{ startMinutes: 9 * 60, endMinutes: 15 * 60 }],
  }

export function AvailabilitySlotsGallery() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [value, setValue] = React.useState<string | null>(null)

  const day = date?.getDay() ?? -1
  const slots = React.useMemo(() => {
    const ranges = weekdayRanges[day] ?? []
    return expandRangesToTimeSlots(ranges, 30)
  }, [day])

  const selectedLabel = slots.find((slot) => slot.id === value)?.label

  return (
    <div className="w-full max-w-3xl space-y-4">
      <div className="flex items-start gap-3 rounded-[12px] border border-border/70 bg-card p-4 shadow-soft">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CalendarClockIcon className="size-4" aria-hidden />
        </span>
        <div className="min-w-0 space-y-1">
          <h3 className="text-sm font-semibold tracking-tight text-foreground">
            Book a time
          </h3>
          <p className="text-xs text-muted-foreground">
            Pick a day, then choose a free slot - same flow as a booking page.
          </p>
        </div>
        <Badge variant="secondary" className="ms-auto shrink-0 font-normal">
          {selectedLabel ?? "None"}
        </Badge>
      </div>

      <div className="flex flex-col gap-4 rounded-[12px] border border-border/70 bg-card p-4 shadow-soft sm:flex-row sm:items-start sm:p-5">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(next) => {
            setDate(next)
            setValue(null)
          }}
          className="mx-auto rounded-lg border border-border/70 sm:mx-0"
        />
        <div className="min-w-0 flex-1 space-y-3">
          <p className="text-sm font-medium text-foreground">
            {date
              ? date.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })
              : "Select a date"}
          </p>
          <AvailabilitySlots
            slots={slots}
            value={value}
            onValueChange={setValue}
            emptyText="No openings this day"
          />
        </div>
      </div>
    </div>
  )
}
