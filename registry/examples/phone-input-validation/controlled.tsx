"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import {
  PhoneInputValidation,
  type PhoneValidationState,
} from "@sonojs/ui/components/phone-input-validation"

const STATE_LABEL: Record<PhoneValidationState, string> = {
  empty: "Empty",
  incomplete: "Incomplete",
  valid: "Valid",
  invalid: "Invalid",
}

export function PhoneInputValidationControlled() {
  const [national, setNational] = React.useState("(213) 373-4253")
  const [country, setCountry] = React.useState("US")
  const [state, setState] = React.useState<PhoneValidationState>("valid")

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <PhoneInputValidation
        value={national}
        country={country}
        onChange={setNational}
        onValidationChange={setState}
        onCountryChange={(next) => setCountry(next.code)}
        aria-label="Phone number"
      />
      <p className="text-xs text-muted-foreground">
        National: {national || "—"} · Country: {country} · {STATE_LABEL[state]}
      </p>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="self-start"
        onClick={() => {
          setNational("")
          setCountry("DE")
        }}
      >
        Reset
      </Button>
    </div>
  )
}