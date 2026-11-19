"use client"

import * as React from "react"
import { Loader2Icon, MapPinIcon, XIcon } from "lucide-react"

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@sonojs/ui/components/command"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@sonojs/ui/components/input-group"
import { cn } from "@sonojs/ui/lib/utils"

import { searchMockAddresses } from "./mock"

export type AddressValue = {
  line1: string
  line2?: string
  city?: string
  region?: string
  postalCode?: string
  country?: string
  countryCode?: string
  lat?: number
  lng?: number
}

export type AddressSuggestion = {
  id: string
  label: string
  secondary?: string
  address: AddressValue
}

export type AddressAutocompleteProps = Omit<
  React.ComponentProps<"div">,
  "defaultValue" | "onChange" | "children"
> & {
  /**
   * Async address lookup. Defaults to the bundled offline mock so the
   * installed component works immediately — swap for Mapbox Search (etc.) in production.
   */
  onSearch?: (query: string) => Promise<AddressSuggestion[]>
  value?: AddressValue | null
  defaultValue?: AddressValue | null
  onValueChange?: (value: AddressValue | null) => void
  /** Debounce before calling `onSearch`. Default `300`. */
  debounceMs?: number
  /** Minimum characters before searching. Default `2`. */
  minChars?: number
  disabled?: boolean
  invalid?: boolean
  placeholder?: string
  emptyMessage?: string
  loadingMessage?: string
  errorMessage?: string
  id?: string
  name?: string
}

export function formatAddressValue(value: AddressValue): string {
  const parts = [
    value.line1,
    value.line2,
    [value.city, value.region].filter(Boolean).join(", "),
    value.postalCode,
    value.country,
  ].filter((part) => part && String(part).trim().length > 0)
  return parts.join(", ")
}

function AddressAutocomplete({
  onSearch,
  value: valueProp,
  defaultValue = null,
  onValueChange,
  debounceMs = 300,
  minChars = 2,
  disabled = false,
  invalid = false,
  placeholder = "Search address…",
  emptyMessage = "No addresses found.",
  loadingMessage = "Searching…",
  errorMessage = "Could not load addresses.",
  id,
  name,
  className,
  ...props
}: AddressAutocompleteProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const listRef = React.useRef<HTMLDivElement>(null)
  const requestIdRef = React.useRef(0)

  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [suggestions, setSuggestions] = React.useState<AddressSuggestion[]>([])
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "ready" | "error"
  >("idle")
  const [uncontrolled, setUncontrolled] = React.useState<AddressValue | null>(
    defaultValue
  )

  const isControlled = valueProp !== undefined
  const selected = isControlled ? valueProp : uncontrolled
  const loading = status === "loading"
  const error = status === "error"
  const trimmedQuery = query.trim()
  const canSearch = !selected && !disabled && trimmedQuery.length >= minChars
  const showList = open && canSearch

  const setSelected = React.useCallback(
    (next: AddressValue | null) => {
      if (!isControlled) setUncontrolled(next)
      onValueChange?.(next)
    },
    [isControlled, onValueChange]
  )

  React.useEffect(() => {
    if (!canSearch) return

    const requestId = ++requestIdRef.current
    const search = onSearch ?? searchMockAddresses
    const timer = window.setTimeout(() => {
      void (async () => {
        try {
          const results = await search(trimmedQuery)
          if (requestId !== requestIdRef.current) return
          setSuggestions(results)
          setStatus("ready")
        } catch {
          if (requestId !== requestIdRef.current) return
          setSuggestions([])
          setStatus("error")
        }
      })()
    }, debounceMs)

    return () => {
      window.clearTimeout(timer)
    }
  }, [canSearch, debounceMs, onSearch, trimmedQuery])

  React.useEffect(() => {
    if (!showList) return

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null
      if (!target) return
      if (rootRef.current?.contains(target)) return
      if (listRef.current?.contains(target)) return
      setOpen(false)
    }

    document.addEventListener("mousedown", onPointerDown)
    document.addEventListener("touchstart", onPointerDown)
    return () => {
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("touchstart", onPointerDown)
    }
  }, [showList])

  const pickSuggestion = React.useCallback(
    (item: AddressSuggestion) => {
      if (disabled) return
      setSelected(item.address)
      setQuery("")
      setSuggestions([])
      setStatus("idle")
      setOpen(false)
      inputRef.current?.blur()
    },
    [disabled, setSelected]
  )

  const clear = React.useCallback(() => {
    if (disabled) return
    setSelected(null)
    setQuery("")
    setSuggestions([])
    setStatus("idle")
    setOpen(false)
    requestAnimationFrame(() => inputRef.current?.focus())
  }, [disabled, setSelected])

  const displayValue = selected ? formatAddressValue(selected) : query

  return (
    <div
      ref={rootRef}
      data-slot="address-autocomplete"
      data-disabled={disabled ? "" : undefined}
      data-invalid={invalid ? "" : undefined}
      className={cn("relative w-full", className)}
      {...props}
    >
      <InputGroup className={cn(disabled && "opacity-50")}>
        <InputGroupAddon align="inline-start">
          <MapPinIcon aria-hidden />
        </InputGroupAddon>
        <InputGroupInput
          ref={inputRef}
          id={id}
          name={name}
          type="text"
          role="combobox"
          aria-expanded={showList}
          aria-autocomplete="list"
          aria-controls={showList ? `${id ?? "address"}-listbox` : undefined}
          aria-invalid={invalid || undefined}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          value={displayValue}
          onChange={(event) => {
            const next = event.target.value
            if (selected) setSelected(null)
            setQuery(next)
            const ready = next.trim().length >= minChars
            if (ready) {
              setOpen(true)
              setStatus("loading")
              setSuggestions([])
            } else {
              setOpen(false)
              setStatus("idle")
              setSuggestions([])
            }
          }}
          onFocus={() => {
            if (!disabled && !selected && query.trim().length >= minChars) {
              setOpen(true)
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setOpen(false)
              if (!selected) {
                setQuery("")
                setStatus("idle")
                setSuggestions([])
              }
            }
          }}
        />
        {loading && !selected ? (
          <InputGroupAddon align="inline-end">
            <Loader2Icon className="animate-spin" aria-hidden />
            <span className="sr-only">{loadingMessage}</span>
          </InputGroupAddon>
        ) : null}
        {(selected || query) && !disabled ? (
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="icon-xs"
              aria-label="Clear address"
              onClick={(event) => {
                event.preventDefault()
                clear()
              }}
            >
              <XIcon />
            </InputGroupButton>
          </InputGroupAddon>
        ) : null}
      </InputGroup>

      {showList ? (
        <div
          ref={listRef}
          id={`${id ?? "address"}-listbox`}
          role="listbox"
          data-slot="address-autocomplete-list"
          className="absolute inset-x-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-md border border-border/70 bg-popover text-popover-foreground shadow-md"
        >
          <Command shouldFilter={false} loop className="rounded-none">
            <CommandList>
              {loading ? (
                <div className="flex items-center gap-2 px-3 py-3 text-sm text-muted-foreground">
                  <Loader2Icon className="size-4 animate-spin" aria-hidden />
                  {loadingMessage}
                </div>
              ) : null}
              {error ? (
                <div className="px-3 py-3 text-sm text-destructive">
                  {errorMessage}
                </div>
              ) : null}
              {status === "ready" && suggestions.length === 0 ? (
                <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                  {emptyMessage}
                </div>
              ) : null}
              {suggestions.length > 0 ? (
                <CommandGroup>
                  {suggestions.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={`${item.id} ${item.label} ${item.secondary ?? ""}`}
                      onSelect={() => pickSuggestion(item)}
                      className="cursor-pointer rounded-md border-b-0 last:border-b-0"
                    >
                      <MapPinIcon
                        className="size-4 shrink-0 text-muted-foreground"
                        aria-hidden
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm">
                          {item.label}
                        </span>
                        {item.secondary ? (
                          <span className="block truncate text-xs text-muted-foreground">
                            {item.secondary}
                          </span>
                        ) : null}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}
            </CommandList>
          </Command>
        </div>
      ) : null}
    </div>
  )
}

export { AddressAutocomplete }
