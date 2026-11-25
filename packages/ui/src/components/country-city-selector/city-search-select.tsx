"use client"

import * as React from "react"
import type { City } from "@sonojs/geo"

import { cn } from "@sonojs/ui/lib/utils"

import {
  fetchCityByIdInCountry,
  fetchSearchCities,
  prefetchCitiesByCountry,
} from "./geo-data"
import { PickerPopoverList } from "./picker-popover-list"

export type CitySearchSelectProps = Omit<
  React.ComponentProps<"div">,
  "defaultValue" | "onChange"
> & {
  countryIso?: string | null
  /** When set, city list is filtered to this state (lighter search set). */
  stateId?: number | null
  /** Require a state before the city field unlocks. */
  requireState?: boolean
  cityId?: number | null
  defaultCityId?: number | null
  onCityChange?: (cityId: number | null, city?: City | null) => void
  disabled?: boolean
  placeholder?: string
  emptyMessage?: string
  geoDataBaseUrl?: string
  className?: string
  id?: string
}

function CitySearchSelect({
  countryIso,
  stateId = null,
  requireState = false,
  cityId: cityIdProp,
  defaultCityId = null,
  onCityChange,
  disabled = false,
  placeholder = "Choose city",
  emptyMessage = "No cities found.",
  geoDataBaseUrl,
  className,
  id,
  ...props
}: CitySearchSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [listQuery, setListQuery] = React.useState("")
  const [results, setResults] = React.useState<City[]>([])
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "ready" | "error"
  >("idle")
  const [uncontrolled, setUncontrolled] = React.useState<number | null>(
    defaultCityId
  )
  const [selectedCity, setSelectedCity] = React.useState<City | null>(null)
  const requestIdRef = React.useRef(0)

  const isControlled = cityIdProp !== undefined
  const selectedId = isControlled ? cityIdProp : uncontrolled
  const needsState = requireState && stateId == null
  const locked = disabled || !countryIso || needsState

  const setSelectedCityId = React.useCallback(
    (id: number | null, city?: City | null) => {
      if (!isControlled) setUncontrolled(id)
      setSelectedCity(city ?? null)
      onCityChange?.(id, city ?? null)
    },
    [isControlled, onCityChange]
  )

  React.useEffect(() => {
    setListQuery("")
    setResults([])
    setStatus("idle")
    setOpen(false)
    setSelectedCity(null)
    if (!isControlled) setUncontrolled(null)
  }, [countryIso, isControlled, stateId])

  React.useEffect(() => {
    if (!countryIso) return
    if (requireState && stateId == null) return
    prefetchCitiesByCountry(countryIso, geoDataBaseUrl)
  }, [countryIso, geoDataBaseUrl, requireState, stateId])

  React.useEffect(() => {
    if (!countryIso || selectedId == null) return
    if (selectedCity?.id === selectedId) return
    let cancelled = false
    void fetchCityByIdInCountry(selectedId, countryIso, geoDataBaseUrl).then(
      (city) => {
        if (!cancelled && city) setSelectedCity(city)
      }
    )
    return () => {
      cancelled = true
    }
  }, [countryIso, geoDataBaseUrl, selectedCity?.id, selectedId])

  React.useEffect(() => {
    if (!open || locked || !countryIso) return
    if (requireState && stateId == null) return

    const requestId = ++requestIdRef.current
    const timer = window.setTimeout(() => {
      void (async () => {
        try {
          setStatus("loading")
          const hits = await fetchSearchCities(
            listQuery,
            countryIso,
            geoDataBaseUrl,
            50,
            requireState ? stateId : null
          )
          if (requestId !== requestIdRef.current) return
          setResults(hits)
          setStatus("ready")
        } catch {
          if (requestId !== requestIdRef.current) return
          setResults([])
          setStatus("error")
        }
      })()
    }, listQuery.trim() ? 200 : 0)

    return () => window.clearTimeout(timer)
  }, [
    countryIso,
    geoDataBaseUrl,
    listQuery,
    locked,
    open,
    requireState,
    stateId,
  ])

  const triggerLabel = selectedCity ? (
    <span className="truncate">{selectedCity.name}</span>
  ) : (
    <span className="text-muted-foreground">
      {!countryIso
        ? "Select a country first"
        : needsState
          ? "Select a state first"
          : placeholder}
    </span>
  )

  return (
    <div
      id={id}
      data-slot="city-search-select"
      className={cn("w-full", className)}
      {...props}
    >
      <PickerPopoverList
        disabled={locked}
        open={open}
        onOpenChange={setOpen}
        listQuery={listQuery}
        onListQueryChange={setListQuery}
        searchPlaceholder="Search city…"
        triggerLabel={triggerLabel}
        triggerAriaLabel="City"
        emptyMessage={
          status === "error" ? "Could not load cities." : emptyMessage
        }
        loading={open && status === "loading"}
        items={results}
        getKey={(c) => String(c.id)}
        isSelected={(c) => c.id === selectedId}
        onPick={(city) => setSelectedCityId(city.id, city)}
        renderItem={(city) => (
          <span className="min-w-0 flex-1 truncate text-start">{city.name}</span>
        )}
      />
    </div>
  )
}

export { CitySearchSelect }