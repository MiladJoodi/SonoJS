"use client"

import * as React from "react"
import type { Country } from "@sonojs/geo"

import { cn } from "@sonojs/ui/lib/utils"

import { CountryFlag, DEFAULT_FLAG_CDN_BASE } from "./country-flag"
import {
  fetchCountries,
  fetchCountryByIso2,
  filterCountries,
} from "./geo-data"
import { PickerPopoverList } from "./picker-popover-list"

export type CountrySearchSelectProps = Omit<
  React.ComponentProps<"div">,
  "defaultValue" | "onChange"
> & {
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (iso2: string | null, country?: Country | null) => void
  disabled?: boolean
  placeholder?: string
  emptyMessage?: string
  geoDataBaseUrl?: string
  flagCdnBase?: string
  showFlags?: boolean
  className?: string
  id?: string
}

function CountrySearchSelect({
  value: valueProp,
  defaultValue = null,
  onValueChange,
  disabled = false,
  placeholder = "Choose country",
  emptyMessage = "No countries found.",
  geoDataBaseUrl,
  flagCdnBase = DEFAULT_FLAG_CDN_BASE,
  showFlags = true,
  className,
  id,
  ...props
}: CountrySearchSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [listQuery, setListQuery] = React.useState("")
  const [countries, setCountries] = React.useState<Country[]>([])
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "ready" | "error"
  >("idle")
  const [uncontrolled, setUncontrolled] = React.useState<string | null>(
    defaultValue
  )
  const [selectedCountry, setSelectedCountry] = React.useState<Country | null>(
    null
  )

  const isControlled = valueProp !== undefined
  const selectedIso = isControlled ? valueProp : uncontrolled

  const setSelectedIso = React.useCallback(
    (iso: string | null, country?: Country | null) => {
      if (!isControlled) setUncontrolled(iso)
      setSelectedCountry(country ?? null)
      onValueChange?.(iso, country ?? null)
    },
    [isControlled, onValueChange]
  )

  React.useEffect(() => {
    if (!selectedIso) {
      setSelectedCountry(null)
      return
    }
    let cancelled = false
    void (async () => {
      const country = await fetchCountryByIso2(selectedIso, geoDataBaseUrl)
      if (!cancelled) setSelectedCountry(country ?? null)
    })()
    return () => {
      cancelled = true
    }
  }, [geoDataBaseUrl, selectedIso])

  React.useEffect(() => {
    if (!open || status === "ready") return
    let cancelled = false
    setStatus("loading")
    void fetchCountries(geoDataBaseUrl)
      .then((list) => {
        if (cancelled) return
        setCountries(
          [...list].sort((a, b) =>
            a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
          )
        )
        setStatus("ready")
      })
      .catch(() => {
        if (cancelled) return
        setCountries([])
        setStatus("error")
      })
    return () => {
      cancelled = true
    }
  }, [geoDataBaseUrl, open, status])

  const filtered = React.useMemo(
    () => filterCountries(countries, listQuery),
    [countries, listQuery]
  )

  const visible = React.useMemo(
    () => filtered.slice(0, listQuery.trim() ? 50 : 80),
    [filtered, listQuery]
  )

  const triggerLabel = selectedCountry ? (
    <span className="flex items-center gap-2">
      {showFlags ? (
        <CountryFlag
          code={selectedCountry.iso2}
          flagCdnBase={flagCdnBase}
          emojiFallback={selectedCountry.emoji}
        />
      ) : null}
      <span className="truncate">{selectedCountry.name}</span>
    </span>
  ) : (
    <span className="text-muted-foreground">{placeholder}</span>
  )

  return (
    <div
      id={id}
      data-slot="country-search-select"
      className={cn("w-full", className)}
      {...props}
    >
      <PickerPopoverList
        disabled={disabled}
        open={open}
        onOpenChange={setOpen}
        listQuery={listQuery}
        onListQueryChange={setListQuery}
        searchPlaceholder="Search country…"
        triggerLabel={triggerLabel}
        triggerAriaLabel="Country"
        emptyMessage={
          status === "error" ? "Could not load countries." : emptyMessage
        }
        loading={open && status === "loading"}
        items={visible}
        getKey={(c) => c.iso2}
        isSelected={(c) => c.iso2 === selectedIso}
        onPick={(country) => setSelectedIso(country.iso2, country)}
        renderItem={(country) => (
          <>
            {showFlags ? (
              <CountryFlag
                code={country.iso2}
                flagCdnBase={flagCdnBase}
                emojiFallback={country.emoji}
              />
            ) : null}
            <span className="min-w-0 flex-1 truncate text-start">
              {country.name}
            </span>
            <span className="text-muted-foreground tabular-nums">
              {country.iso2}
            </span>
          </>
        )}
      />
    </div>
  )
}

export { CountrySearchSelect }