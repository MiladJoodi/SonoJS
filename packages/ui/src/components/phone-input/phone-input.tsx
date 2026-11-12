"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import { cn } from "@sonojs/ui/lib/utils"
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

import countriesData from "./countries.json"

export type PhoneCountry = {
  code: string
  name: string
  dial: string
}

const COUNTRIES = countriesData as PhoneCountry[]

/** Base URL for SonoJS flag SVGs (no trailing slash). Uses GitHub Pages so latest `main` is served. */
export const DEFAULT_FLAG_CDN_BASE = "https://sonojs.github.io/SonoJS-flags"

function isoToFlag(code: string) {
  const iso = code.trim().toUpperCase()
  if (!/^[A-Z]{2}$/.test(iso)) return ""
  return String.fromCodePoint(
    ...[...iso].map((char) => 127397 + char.charCodeAt(0))
  )
}

function flagSrc(code: string, base: string = DEFAULT_FLAG_CDN_BASE) {
  return `${base.replace(/\/$/, "")}/flags/${code.toLowerCase()}.svg`
}

function findCountry(code: string | undefined) {
  if (!code) return COUNTRIES[0]!
  return (
    COUNTRIES.find((c) => c.code.toUpperCase() === code.toUpperCase()) ??
    COUNTRIES[0]!
  )
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

export type PhoneInputProps = Omit<
  React.ComponentProps<"input">,
  "value" | "defaultValue" | "onChange" | "type"
> & {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  country?: string
  defaultCountry?: string
  onCountryChange?: (country: PhoneCountry) => void
  /**
   * CDN base for square flag SVGs (no trailing slash).
   * Default: SonoJS flags on jsDelivr.
   */
  flagCdnBase?: string
  /** When false, only dial codes are shown (no flag images). Default true. */
  showFlag?: boolean
  /** Narrow the control; defaults to full width of parent. */
  className?: string
}

function PhoneInput({
  value: valueProp,
  defaultValue = "",
  onChange,
  country: countryProp,
  defaultCountry = "US",
  onCountryChange,
  flagCdnBase = DEFAULT_FLAG_CDN_BASE,
  showFlag = true,
  disabled,
  id,
  placeholder = "Phone number",
  className,
  ...inputProps
}: PhoneInputProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [menuWidth, setMenuWidth] = React.useState<number>()
  const [uncontrolledCountry, setUncontrolledCountry] = React.useState(() =>
    findCountry(defaultCountry)
  )
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)

  const country =
    countryProp !== undefined
      ? findCountry(countryProp)
      : uncontrolledCountry
  const value = valueProp !== undefined ? valueProp : uncontrolledValue

  const setCountry = React.useCallback(
    (next: PhoneCountry) => {
      if (countryProp === undefined) setUncontrolledCountry(next)
      onCountryChange?.(next)
    },
    [countryProp, onCountryChange]
  )

  const setValue = React.useCallback(
    (next: string) => {
      if (valueProp === undefined) setUncontrolledValue(next)
      onChange?.(next)
    },
    [onChange, valueProp]
  )

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
          className={cn(
            "h-[46px] rounded-md border-border/70",
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
            id={id}
            type="tel"
            dir="ltr"
            inputMode="tel"
            autoComplete="tel-national"
            disabled={disabled}
            placeholder={placeholder}
            value={value}
            onChange={(event) => setValue(event.target.value)}
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
            className="h-9 w-full rounded-md border border-border/70 bg-transparent px-2.5 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring"
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

export {
  PhoneInput,
  COUNTRIES as phoneCountries,
  isoToFlag,
  flagSrc,
}
