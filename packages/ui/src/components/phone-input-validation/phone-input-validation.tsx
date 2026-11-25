"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import type { CountryCode } from "libphonenumber-js/max"

import { cn } from "@sonojs/ui/lib/utils"
import {
  DEFAULT_FLAG_CDN_BASE,
  flagSrc,
  isoToFlag,
  phoneCountries,
  type PhoneCountry,
} from "./phone-countries"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@sonojs/ui/components/input-group"
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "@sonojs/ui/components/popover"

import {
  caretFromDigitCount,
  clipNationalDigits,
  countDigitsBefore,
  formatNationalDigits,
  getPhoneValidationState,
  onlyNationalDigits,
  phoneNumberToE164,
  resolvePhoneValidationDisplay,
  type PhoneValidationState,
} from "./lib"

const COUNTRIES = phoneCountries

function findCountry(code: string | undefined) {
  if (!code) return COUNTRIES[0]!
  return (
    COUNTRIES.find((c) => c.code.toUpperCase() === code.toUpperCase()) ??
    COUNTRIES[0]!
  )
}

function countryToIso(country: PhoneCountry): CountryCode {
  return country.code.toUpperCase() as CountryCode
}

function CountryFlag({
  code,
  flagCdnBase,
  className,
}: {
  code: string
  flagCdnBase: string
  className?: string
}) {
  const sourceKey = `${flagCdnBase}|${code}`
  const [failedKey, setFailedKey] = React.useState<string | null>(null)
  const failed = failedKey === sourceKey

  if (failed) {
    const emoji = isoToFlag(code)
    if (emoji) {
      return (
        <span className={cn("text-base leading-none", className)} aria-hidden>
          {emoji}
        </span>
      )
    }
    return (
      <span
        className={cn(
          "flex h-4 w-6 shrink-0 items-center justify-center rounded-[2px] bg-muted text-[8px] font-semibold leading-none text-muted-foreground",
          className
        )}
        aria-hidden
      >
        {code.slice(0, 2).toUpperCase()}
      </span>
    )
  }

  return (
    <img
      src={flagSrc(code, flagCdnBase)}
      alt=""
      width={24}
      height={16}
      loading="lazy"
      decoding="async"
      aria-hidden
      className={cn(
        "h-4 w-6 shrink-0 rounded-[2px] object-cover",
        className
      )}
      onError={() => setFailedKey(sourceKey)}
    />
  )
}

export type PhoneInputValidationProps = Omit<
  React.ComponentProps<"input">,
  "value" | "defaultValue" | "onChange" | "type"
> & {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onValueChange?: (payload: {
    national: string
    digits: string
    state: PhoneValidationState
    e164?: string
  }) => void
  country?: string
  defaultCountry?: string
  onCountryChange?: (country: PhoneCountry) => void
  flagCdnBase?: string
  showFlag?: boolean
  className?: string
  /** Force invalid chrome while typing (overrides derived state). */
  invalid?: boolean
  onValidationChange?: (state: PhoneValidationState) => void
}

function PhoneInputValidation({
  value: valueProp,
  defaultValue = "",
  onChange,
  onValueChange,
  country: countryProp,
  defaultCountry = "US",
  onCountryChange,
  flagCdnBase = DEFAULT_FLAG_CDN_BASE,
  showFlag = true,
  disabled,
  id,
  placeholder = "Phone number",
  className,
  invalid,
  onValidationChange,
  onBlur,
  onFocus,
  ...inputProps
}: PhoneInputValidationProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [menuWidth, setMenuWidth] = React.useState<number>()
  const [focused, setFocused] = React.useState(false)
  const [uncontrolledCountry, setUncontrolledCountry] = React.useState(() =>
    findCountry(defaultCountry)
  )
  const [uncontrolledDigits, setUncontrolledDigits] = React.useState(() =>
    onlyNationalDigits(defaultValue)
  )

  const country =
    countryProp !== undefined
      ? findCountry(countryProp)
      : uncontrolledCountry
  const iso = countryToIso(country)

  const digits =
    valueProp !== undefined
      ? onlyNationalDigits(valueProp)
      : uncontrolledDigits
  const display = formatNationalDigits(digits, iso)

  const rawState = getPhoneValidationState(display, iso)
  const displayState = resolvePhoneValidationDisplay(rawState, focused)
  const showInvalid = invalid ?? displayState === "invalid"
  const showValid = !showInvalid && displayState === "valid"
  const showIncomplete = !showInvalid && displayState === "incomplete"

  const setCountry = React.useCallback(
    (next: PhoneCountry) => {
      if (countryProp === undefined) setUncontrolledCountry(next)
      onCountryChange?.(next)
    },
    [countryProp, onCountryChange]
  )

  const emitValue = React.useCallback(
    (nextDigits: string, nextIso: CountryCode) => {
      const formatted = formatNationalDigits(nextDigits, nextIso)
      const state = getPhoneValidationState(formatted, nextIso)
      const e164 = phoneNumberToE164(formatted, nextIso)
      if (valueProp === undefined) setUncontrolledDigits(nextDigits)
      onChange?.(formatted)
      onValueChange?.({
        national: formatted,
        digits: nextDigits,
        state,
        e164,
      })
    },
    [onChange, onValueChange, valueProp]
  )

  React.useEffect(() => {
    onValidationChange?.(displayState)
  }, [displayState, onValidationChange])

  const filtered = React.useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return COUNTRIES
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(needle) ||
        c.dial.toLowerCase().includes(needle) ||
        c.code.toLowerCase().includes(needle)
    )
  }, [query])

  React.useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return
    const update = () => {
      setMenuWidth(el.getBoundingClientRect().width)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        if (disabled) return
        setOpen(next)
        if (!next) setQuery("")
      }}
      modal={false}
    >
      <PopoverAnchor asChild>
        <InputGroup
          ref={rootRef}
          dir="ltr"
          data-disabled={disabled ? true : undefined}
          data-invalid={showInvalid ? "" : undefined}
          data-valid={showValid ? "" : undefined}
          data-incomplete={showIncomplete ? "" : undefined}
          className={cn(
            "h-[46px] rounded-md border-border/70",
            showInvalid &&
              "has-[[data-slot=input-group-control]]:border-destructive",
            open ? "overflow-visible" : "overflow-hidden",
            disabled && "opacity-50",
            className
          )}
        >
          <InputGroupAddon
            align="inline-start"
            className="border-e border-border/70 pe-0"
          >
            <PopoverTrigger asChild>
              <InputGroupButton
                type="button"
                size="sm"
                disabled={disabled}
                aria-label="Select country"
                aria-expanded={open}
                className={cn(
                  "h-[calc(100%-6px)] min-h-9 cursor-pointer gap-1.5 rounded-[calc(12px-4px)] px-2.5 tabular-nums disabled:cursor-not-allowed"
                )}
              >
                {showFlag ? (
                  <CountryFlag code={country.code} flagCdnBase={flagCdnBase} />
                ) : null}
                <span className="text-sm text-foreground">{country.dial}</span>
                <ChevronsUpDownIcon
                  className="size-3.5 opacity-50"
                  aria-hidden
                />
              </InputGroupButton>
            </PopoverTrigger>
          </InputGroupAddon>
          <InputGroupInput
            ref={inputRef}
            id={id}
            type="tel"
            dir="ltr"
            inputMode="tel"
            autoComplete="tel-national"
            disabled={disabled}
            placeholder={placeholder}
            value={display}
            data-slot="input-group-control"
            aria-invalid={showInvalid || undefined}
            onFocus={(event) => {
              setFocused(true)
              onFocus?.(event)
            }}
            onBlur={(event) => {
              setFocused(false)
              onBlur?.(event)
            }}
            onChange={(event) => {
              const el = event.target
              const caret = el.selectionStart ?? el.value.length
              const digitCount = countDigitsBefore(el.value, caret)
              const nextDigits = clipNationalDigits(
                onlyNationalDigits(el.value),
                iso
              )
              emitValue(nextDigits, iso)
              const formatted = formatNationalDigits(nextDigits, iso)
              requestAnimationFrame(() => {
                const node = inputRef.current
                if (!node) return
                const pos = caretFromDigitCount(formatted, digitCount)
                node.setSelectionRange(pos, pos)
              })
            }}
            className="h-full text-start disabled:cursor-not-allowed"
            {...inputProps}
          />
        </InputGroup>
      </PopoverAnchor>
      <PopoverContent
        align="start"
        className="w-auto p-0"
        style={menuWidth ? { width: menuWidth } : undefined}
        dir="ltr"
        onOpenAutoFocus={(event) => event.preventDefault()}
        onCloseAutoFocus={(event) => event.preventDefault()}
      >
        <div className="border-b border-border/50 p-2">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search country…"
            className="h-9 w-full cursor-text rounded-md border border-border/70 bg-transparent px-2.5 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring"
            autoComplete="off"
          />
        </div>
        <div className="max-h-72 overflow-y-auto py-0">
          {filtered.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              No countries found.
            </p>
          ) : (
            filtered.map((item, index) => {
              const checked = item.code === country.code
              return (
                <button
                  key={item.code}
                  type="button"
                  data-checked={checked ? true : undefined}
                  className={cn(
                    "flex w-full cursor-pointer items-center gap-2 px-3 py-2.5 text-sm outline-none",
                    "hover:bg-muted/50 focus-visible:bg-muted/50",
                    index < filtered.length - 1 && "border-b border-border/40"
                  )}
                  onClick={() => {
                    setCountry(item)
                    emitValue(digits, countryToIso(item))
                    setOpen(false)
                  }}
                >
                  {showFlag ? (
                    <CountryFlag code={item.code} flagCdnBase={flagCdnBase} />
                  ) : null}
                  <span className="min-w-0 flex-1 truncate text-start">
                    {item.name}
                  </span>
                  <span className="text-muted-foreground tabular-nums">
                    {item.dial}
                  </span>
                  <CheckIcon
                    className={cn(
                      "size-4 shrink-0",
                      checked ? "opacity-100" : "opacity-0"
                    )}
                    aria-hidden
                  />
                </button>
              )
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { PhoneInputValidation }