"use client"

import * as React from "react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@sonojs/ui/components/input-group"
import { cn } from "@sonojs/ui/lib/utils"
import {
  caretFromAlnumCount,
  countAlnumBefore,
  formatIban,
  isValidIban,
  sanitizeIban,
} from "./lib"

export type IbanInputProps = Omit<
  React.ComponentProps<"input">,
  "value" | "defaultValue" | "onChange" | "type"
> & {
  /** Raw IBAN without spaces (controlled). */
  value?: string
  defaultValue?: string
  onValueChange?: (iban: string) => void
  /** Show country code from first 2 letters. */
  showCountry?: boolean
  invalid?: boolean
}

function IbanInput({
  value: valueProp,
  defaultValue = "",
  onValueChange,
  showCountry = true,
  invalid,
  className,
  disabled,
  id,
  onBlur,
  onFocus,
  ...props
}: IbanInputProps) {
  const [uncontrolled, setUncontrolled] = React.useState(() =>
    sanitizeIban(defaultValue)
  )
  const isControlled = valueProp !== undefined
  const raw = sanitizeIban(isControlled ? (valueProp ?? "") : uncontrolled).slice(
    0,
    34
  )
  const display = formatIban(raw)
  const country = raw.slice(0, 2)
  const [focused, setFocused] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const valid = isValidIban(raw)
  const showInvalid =
    invalid ?? (raw.length >= 15 && !valid && !focused)

  const setRaw = (next: string) => {
    const clipped = sanitizeIban(next).slice(0, 34)
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
      data-valid={valid ? "" : undefined}
    >
      {showCountry && /^[A-Z]{2}/.test(country) ? (
        <InputGroupAddon align="inline-start">
          <InputGroupText className="text-xs font-medium uppercase">
            {country}
          </InputGroupText>
        </InputGroupAddon>
      ) : null}
      <InputGroupInput
        ref={inputRef}
        id={id}
        type="text"
        autoComplete="off"
        spellCheck={false}
        disabled={disabled}
        value={display}
        placeholder="DE89 3704 0044 0532 0130 00"
        aria-invalid={showInvalid || undefined}
        data-slot="input-group-control"
        className="font-mono text-sm uppercase tracking-wide"
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
          const alnumCount = countAlnumBefore(el.value, caret)
          const next = sanitizeIban(el.value).slice(0, 34)
          setRaw(next)
          const formatted = formatIban(next)
          requestAnimationFrame(() => {
            const node = inputRef.current
            if (!node) return
            const pos = caretFromAlnumCount(formatted, alnumCount)
            node.setSelectionRange(pos, pos)
          })
        }}
        {...props}
      />
    </InputGroup>
  )
}

export { IbanInput }
