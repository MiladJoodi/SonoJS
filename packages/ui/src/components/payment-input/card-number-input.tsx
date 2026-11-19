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
  cardBrandLabel,
  cardMaxLength,
  caretFromDigitCount,
  countDigitsBefore,
  detectCardBrand,
  formatCardNumber,
  isCardNumberComplete,
  luhnCheck,
  maskCardNumber,
  onlyDigits,
  type CardBrand,
} from "./lib"

export type CardNumberInputProps = Omit<
  React.ComponentProps<"input">,
  "value" | "defaultValue" | "onChange" | "type" | "inputMode"
> & {
  /** Raw digits only (controlled). */
  value?: string
  defaultValue?: string
  onValueChange?: (digits: string) => void
  onBrandChange?: (brand: CardBrand) => void
  /** Mask all but last 4 when blurred. */
  masked?: boolean
  showBrand?: boolean
  invalid?: boolean
}

function CardNumberInput({
  value: valueProp,
  defaultValue = "",
  onValueChange,
  onBrandChange,
  masked = false,
  showBrand = true,
  invalid,
  className,
  disabled,
  id,
  onBlur,
  onFocus,
  ...props
}: CardNumberInputProps) {
  const [uncontrolled, setUncontrolled] = React.useState(() =>
    onlyDigits(defaultValue)
  )
  const isControlled = valueProp !== undefined
  const digits = onlyDigits(isControlled ? (valueProp ?? "") : uncontrolled)
  const brand = detectCardBrand(digits)
  const maxLen = cardMaxLength(brand)

  const [focused, setFocused] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const brandRef = React.useRef(brand)

  React.useEffect(() => {
    if (brandRef.current !== brand) {
      brandRef.current = brand
      onBrandChange?.(brand)
    }
  }, [brand, onBrandChange])

  const display =
    masked && !focused && digits.length > 4
      ? maskCardNumber(digits.slice(0, maxLen), brand)
      : formatCardNumber(digits.slice(0, maxLen), brand)

  const complete = isCardNumberComplete(digits.slice(0, maxLen))
  const showInvalid =
    invalid ??
    (digits.length >= 12 && !luhnCheck(digits.slice(0, maxLen)) && !focused)

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
      data-valid={complete ? "" : undefined}
    >
      <InputGroupInput
        ref={inputRef}
        id={id}
        type="text"
        inputMode="numeric"
        autoComplete="cc-number"
        disabled={disabled}
        value={display}
        aria-invalid={showInvalid || undefined}
        data-slot="input-group-control"
        className="tabular-nums tracking-wide"
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
          const next = onlyDigits(el.value).slice(0, maxLen)
          setDigits(next)
          const formatted = formatCardNumber(next, detectCardBrand(next))
          requestAnimationFrame(() => {
            const node = inputRef.current
            if (!node) return
            const pos = caretFromDigitCount(formatted, digitCount)
            node.setSelectionRange(pos, pos)
          })
        }}
        {...props}
      />
      {showBrand ? (
        <InputGroupAddon align="inline-end">
          <InputGroupText className="text-xs font-medium tabular-nums">
            {cardBrandLabel(brand)}
          </InputGroupText>
        </InputGroupAddon>
      ) : null}
    </InputGroup>
  )
}

export { CardNumberInput }
