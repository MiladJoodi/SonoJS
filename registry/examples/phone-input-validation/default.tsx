"use client"

import * as React from "react"

import type { CountryCode } from "libphonenumber-js/max"

import {
  PhoneInputValidation,
  describePhoneValidationIssue,
  type PhoneValidationState,
} from "@sonojs/ui/components/phone-input-validation"
import { cn } from "@sonojs/ui/lib/utils"

function statusMessage(
  state: PhoneValidationState,
  national: string,
  country: string
): string {
  switch (state) {
    case "empty":
      return "Enter a number"
    case "incomplete":
      return "Keep typing"
    case "valid":
      return "OK"
    case "invalid":
      return describePhoneValidationIssue(national, country as CountryCode)
    default:
      return ""
  }
}

export function PhoneInputValidationDefault() {
  const [state, setState] = React.useState<PhoneValidationState>("empty")
  const [national, setNational] = React.useState("")
  const [country, setCountry] = React.useState("US")
  const message = statusMessage(state, national, country)

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <PhoneInputValidation
        defaultCountry="US"
        onValidationChange={setState}
        onChange={setNational}
        onCountryChange={(c) => setCountry(c.code)}
        aria-label="Phone number"
      />
      <p
        className={cn(
          "text-sm",
          state === "valid" &&
            "text-emerald-600 dark:text-emerald-500",
          state === "invalid" && "text-destructive",
          (state === "empty" || state === "incomplete") &&
            "text-muted-foreground"
        )}
        role="status"
        aria-live="polite"
      >
        {message}
      </p>
    </div>
  )
}