"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@sonojs/ui/components/field"
import {
  PhoneInputValidation,
  type PhoneValidationState,
} from "@sonojs/ui/components/phone-input-validation"

function submitError(state: PhoneValidationState): string | null {
  if (state === "valid") return null
  if (state === "empty") return "Phone number is required."
  if (state === "incomplete") return "Enter the full phone number."
  return "This number is not valid for the selected country."
}

export function PhoneInputValidationFormSubmit() {
  const [state, setState] = React.useState<PhoneValidationState>("empty")
  const [attempted, setAttempted] = React.useState(false)
  const [sent, setSent] = React.useState(false)

  const error = submitError(state)

  return (
    <form
      className="flex w-full max-w-sm flex-col gap-4 rounded-[12px] border border-border/70 bg-card p-5 shadow-soft"
      onSubmit={(event) => {
        event.preventDefault()
        setAttempted(true)
        setSent(false)
        if (error) return
        setSent(true)
      }}
    >
      <Field data-invalid={attempted && error ? true : undefined}>
        <FieldLabel htmlFor="phone-validation-submit">Phone</FieldLabel>
        <PhoneInputValidation
          id="phone-validation-submit"
          defaultCountry="US"
          onValidationChange={setState}
        />
        <FieldDescription>
          Submit is blocked until validation state is{" "}
          <span className="font-mono text-xs">valid</span>.
        </FieldDescription>
        {attempted && error ? <FieldError>{error}</FieldError> : null}
      </Field>
      <Button type="submit" size="sm" className="self-start">
        Continue
      </Button>
      {sent ? (
        <p className="text-sm text-emerald-600 dark:text-emerald-500" role="status">
          Submitted (demo) — only runs when the number is valid.
        </p>
      ) : null}
    </form>
  )
}