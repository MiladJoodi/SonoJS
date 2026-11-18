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
  adjustCaretForTrailingDecimal,
  caretFromDigitCount,
  clampMoney,
  countDigitsBefore,
  formatCurrencyAmount,
  formatLiveMoneyDraft,
  getCurrencyMeta,
  getNumberSeparators,
  parseMoneyDraft,
  resolveFractionDigits,
  sanitizeMoneyDraft,
  toEditableAmount,
  type CurrencyDisplay,
} from "./lib"

export type CurrencyInputProps = Omit<
  React.ComponentProps<"input">,
  "value" | "defaultValue" | "onChange" | "type" | "inputMode"
> & {
  value?: number | null
  defaultValue?: number | null
  onValueChange?: (value: number | null) => void
  /** ISO 4217 currency code. Default `USD`. */
  currency?: string
  /** BCP 47 locale for separators and symbol placement. Default `en-US`. */
  locale?: string
  currencyDisplay?: CurrencyDisplay
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  min?: number
  max?: number
  /** Show the currency symbol/code addon. Default `true`. */
  showCurrencyAddon?: boolean
}

function CurrencyInput({
  value: valueProp,
  defaultValue = null,
  onValueChange,
  currency = "USD",
  locale = "en-US",
  currencyDisplay = "symbol",
  minimumFractionDigits,
  maximumFractionDigits,
  min,
  max,
  showCurrencyAddon = true,
  disabled = false,
  id,
  className,
  placeholder,
  "aria-invalid": ariaInvalid,
  onFocus,
  onBlur,
  ...props
}: CurrencyInputProps) {
  const isControlled = valueProp !== undefined
  const [uncontrolled, setUncontrolled] = React.useState<number | null>(
    defaultValue
  )
  const numeric = isControlled ? (valueProp ?? null) : uncontrolled

  const [focused, setFocused] = React.useState(false)
  const [draft, setDraft] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)
  const caretRef = React.useRef<number | null>(null)

  const { min: minFrac, max: maxFrac } = React.useMemo(
    () =>
      resolveFractionDigits(
        locale,
        currency,
        minimumFractionDigits,
        maximumFractionDigits
      ),
    [locale, currency, minimumFractionDigits, maximumFractionDigits]
  )

  const { currencyLabel, addonAlign } = React.useMemo(
    () => getCurrencyMeta(locale, currency, currencyDisplay),
    [locale, currency, currencyDisplay]
  )

  const formatOpts = React.useMemo(
    () => ({
      locale,
      currency,
      currencyDisplay,
      minimumFractionDigits: minFrac,
      maximumFractionDigits: maxFrac,
    }),
    [locale, currency, currencyDisplay, minFrac, maxFrac]
  )

  const { decimal } = React.useMemo(
    () => getNumberSeparators(locale),
    [locale]
  )

  const commit = React.useCallback(
    (next: number | null, clamp = false) => {
      const resolved =
        next == null ? null : clamp ? clampMoney(next, min, max) : next
      if (!isControlled) setUncontrolled(resolved)
      onValueChange?.(resolved)
      return resolved
    },
    [isControlled, max, min, onValueChange]
  )

  const display = focused
    ? draft
    : formatCurrencyAmount(numeric, formatOpts)

  React.useLayoutEffect(() => {
    const el = inputRef.current
    if (!el || caretRef.current == null || !focused) return
    const pos = Math.min(caretRef.current, el.value.length)
    el.setSelectionRange(pos, pos)
    caretRef.current = null
  }, [draft, focused])

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const el = event.target
    const previous = el.value
    const previousCaret = el.selectionStart ?? previous.length

    let raw = sanitizeMoneyDraft(previous, locale)
    const decIndex = raw.indexOf(decimal)
    if (decIndex !== -1) {
      raw =
        raw.slice(0, decIndex + 1) +
        raw.slice(decIndex + 1).slice(0, maxFrac)
    }

    const nextDraft = formatLiveMoneyDraft(raw, locale, maxFrac)

    const digitCaret = countDigitsBefore(previous, previousCaret)
    const trailingDec = adjustCaretForTrailingDecimal(
      previous,
      previousCaret,
      nextDraft,
      locale
    )
    caretRef.current =
      trailingDec ?? caretFromDigitCount(nextDraft, digitCaret)

    setDraft(nextDraft)

    const parsed = parseMoneyDraft(nextDraft, locale)
    if (parsed == null) {
      if (
        raw === "" ||
        raw === "-" ||
        raw === decimal
      ) {
        commit(null)
      }
      return
    }
    commit(parsed)
  }

  return (
    <InputGroup
      data-slot="currency-input"
      data-disabled={disabled ? "" : undefined}
      className={cn(className)}
    >
      {showCurrencyAddon ? (
        <InputGroupAddon align={addonAlign}>
          <InputGroupText className="tabular-nums">
            {currencyLabel}
          </InputGroupText>
        </InputGroupAddon>
      ) : null}
      <InputGroupInput
        {...props}
        ref={inputRef}
        id={id}
        dir="ltr"
        inputMode="decimal"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        disabled={disabled}
        placeholder={placeholder}
        aria-invalid={ariaInvalid}
        value={display}
        onChange={onInputChange}
        onFocus={(event) => {
          setFocused(true)
          setDraft(toEditableAmount(numeric, locale, maxFrac))
          onFocus?.(event)
        }}
        onBlur={(event) => {
          const parsed = parseMoneyDraft(draft, locale)
          const next = commit(parsed, true)
          setDraft(
            next == null ? "" : toEditableAmount(next, locale, maxFrac)
          )
          setFocused(false)
          onBlur?.(event)
        }}
      />
    </InputGroup>
  )
}

export { CurrencyInput }
