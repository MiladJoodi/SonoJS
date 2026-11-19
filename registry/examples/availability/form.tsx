"use client"

import * as React from "react"

import {
  Availability,
  type AvailabilitySlot,
} from "@sonojs/ui/components/availability"
import { Button } from "@sonojs/ui/components/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@sonojs/ui/components/field"

const seed: AvailabilitySlot[] = [
  { id: "tue", day: 2, startMinutes: 10 * 60, endMinutes: 13 * 60 },
  { id: "thu", day: 4, startMinutes: 14 * 60, endMinutes: 18 * 60 },
]

export function AvailabilityForm() {
  const [value, setValue] = React.useState<AvailabilitySlot[]>(seed)
  const [submitted, setSubmitted] = React.useState<string | null>(null)

  return (
    <form
      className="w-full max-w-4xl space-y-4"
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(JSON.stringify(value, null, 2))
      }}
    >
      <FieldGroup>
        <Field>
          <FieldLabel>Office hours</FieldLabel>
          <FieldDescription>
            Paint free blocks for the week, then submit the slot JSON.
          </FieldDescription>
          <Availability value={value} onValueChange={setValue} />
        </Field>
        <Button type="submit" className="w-full sm:w-auto">
          Save availability
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
