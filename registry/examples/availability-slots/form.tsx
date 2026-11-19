"use client"

import * as React from "react"

import {
  AvailabilitySlots,
  expandRangesToTimeSlots,
} from "@sonojs/ui/components/availability-slots"
import { Button } from "@sonojs/ui/components/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@sonojs/ui/components/field"

const slots = expandRangesToTimeSlots(
  [{ startMinutes: 10 * 60, endMinutes: 14 * 60 }],
  30
)

export function AvailabilitySlotsForm() {
  const [value, setValue] = React.useState<string | null>(slots[0]?.id ?? null)
  const [submitted, setSubmitted] = React.useState<string | null>(null)
  const selected = slots.find((slot) => slot.id === value)

  return (
    <form
      className="w-full max-w-xs space-y-4"
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(
          selected
            ? JSON.stringify(
                {
                  id: selected.id,
                  startMinutes: selected.startMinutes,
                  endMinutes: selected.endMinutes,
                  label: selected.label,
                },
                null,
                2
              )
            : "null"
        )
      }}
    >
      <FieldGroup>
        <Field>
          <FieldLabel>Meeting time</FieldLabel>
          <FieldDescription>
            Choose one opening, then submit the selected slot.
          </FieldDescription>
          <AvailabilitySlots
            slots={slots}
            value={value}
            onValueChange={setValue}
          />
        </Field>
        <Button type="submit" className="w-full">
          Confirm time
        </Button>
        {submitted ? (
          <pre className="overflow-x-auto rounded-[12px] border border-border/70 bg-muted/40 p-3 text-xs text-muted-foreground">
            {submitted}
          </pre>
        ) : null}
      </FieldGroup>
    </form>
  )
}
