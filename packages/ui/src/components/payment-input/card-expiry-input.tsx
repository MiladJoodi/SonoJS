"use client"

import * as React from "react"

import { InputGroup, InputGroupInput } from "@sonojs/ui/components/input-group"
import { cn } from "@sonojs/ui/lib/utils"
import {
  caretFromDigitCount,
  countDigitsBefore,
  formatCardExpiry,
  onlyDigits,
  parseCardExpiry,
} from "./lib"

export type CardExpiryInputProps = Omit<
  React.ComponentProps<"input">,
  "value" | "defaultValue" | "onChange" | "type" | "inputMode"
> & {
  /** Raw MMYY digits (controlled). */
  value?: string
  defaultValue?: string
  onValueChange?: (digits: string) => void
  invalid?: boolean
}

function CardExpiryInput({
  value: valueProp,
  defaultValue = "",
  onValueChange,
  invalid,
  className,
  disabled,
  id,
  onBlur,
  onFocus,
  ...props
}: CardExpiryInputProps) {
  const [uncontrolled, setUncontrolled] = React.useState(() =>
    onlyDigits(defaultValue).slice(0, 4)
  )
  const isControlled = valueProp !== undefined
  const digits = onlyDigits(isControlled ? (valueProp ?? "") : uncontrolled).slice(
    0,
    4
  )
  const display = formatCardExpiry(digits)
  const parsed = parseCardExpiry(digits)
  const [focused, setFocused] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const showInvalid =
    invalid ?? (digits.length === 4 && !parsed.valid && !focused)

  const setDigits = (next: string) => {
    const clipped = onlyDigits(next).slice(0, 4)
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
        ref={inputRef}
        id={id}
        type="text"
        inputMode="numeric"
        autoComplete="cc-exp"
        placeholder="MM/YY"
        disabled={disabled}
        value={display}
        aria-invalid={showInvalid || undefined}
        data-slot="input-group-control"
        className="tabular-nums"
        onFocus={(e) => {
          setFocused(true)
          onFocus?.(e)
        }}
        onBlur={(e) => {
          setFocused(false)
          onBlur?.(e)
        }}
        onChange={(e) => {
          const el = e.target
          const caret = el.selectionStart ?? el.value.length
          const digitCount = countDigitsBefore(el.value, caret)
          const next = onlyDigits(el.value).slice(0, 4)
          setDigits(next)
          const formatted = formatCardExpiry(next)
          requestAnimationFrame(() => {
            const node = inputRef.current
            if (!node) return
            const pos = caretFromDigitCount(formatted, digitCount)
            node.setSelectionRange(pos, pos)
          })
        }}
        {...props}
      />
    </InputGroup>
  )
}

export { CardExpiryInput }
