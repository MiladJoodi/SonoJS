"use client"

import * as React from "react"

import { InputGroup, InputGroupInput } from "@sonojs/ui/components/input-group"
import { cn } from "@sonojs/ui/lib/utils"
import { onlyDigits, type CardBrand } from "./lib"

export type CardCvcInputProps = Omit<
  React.ComponentProps<"input">,
  "value" | "defaultValue" | "onChange" | "type" | "inputMode"
> & {
  value?: string
  defaultValue?: string
  onValueChange?: (digits: string) => void
  /** Amex uses 4 digits; others 3. */
  brand?: CardBrand
  invalid?: boolean
}

function CardCvcInput({
  value: valueProp,
  defaultValue = "",
  onValueChange,
  brand = "unknown",
  invalid,
  className,
  disabled,
  id,
  ...props
}: CardCvcInputProps) {
  const maxLen = brand === "amex" ? 4 : 3
  const [uncontrolled, setUncontrolled] = React.useState(() =>
    onlyDigits(defaultValue).slice(0, maxLen)
  )
  const isControlled = valueProp !== undefined
  const digits = onlyDigits(isControlled ? (valueProp ?? "") : uncontrolled).slice(
    0,
    maxLen
  )

  const showInvalid = invalid ?? false

  const setDigits = (next: string) => {
    const clipped = onlyDigits(next).slice(0, maxLen)
    if (!isControlled) setUncontrolled(clipped)
    onValueChange?.(clipped)
  }

  return (
    <InputGroup
      className={cn(
        showInvalid &&
          "has-[[data-slot=input-group-control]]:border-destructive",
        className
      )}
      data-disabled={disabled ? "" : undefined}
      data-invalid={showInvalid ? "" : undefined}
    >
      <InputGroupInput
        id={id}
        type="text"
        inputMode="numeric"
        autoComplete="cc-csc"
        placeholder={brand === "amex" ? "1234" : "123"}
        maxLength={maxLen}
        disabled={disabled}
        value={digits}
        aria-invalid={showInvalid || undefined}
        data-slot="input-group-control"
        className="tabular-nums"
        onChange={(e) => setDigits(e.target.value)}
        {...props}
      />
    </InputGroup>
  )
}

export { CardCvcInput }
