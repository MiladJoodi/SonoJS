"use client"

import * as React from "react"
import type { City, Country, State } from "@sonojs/geo"

import { Label } from "@sonojs/ui/components/label"
import { cn } from "@sonojs/ui/lib/utils"

import { CitySearchSelect } from "./city-search-select"
import { CountrySearchSelect } from "./country-search-select"
import { StateSearchSelect } from "./state-search-select"

export type CountryCitySelectProps = Omit<
  React.ComponentProps<"div">,
  "defaultValue" | "onChange"
> & {
  country?: string | null
  defaultCountry?: string | null
  onCountryChange?: (iso2: string | null, country?: Country | null) => void
  /** Show state/province after country. */
  includeState?: boolean
  /** Show city after country (and after state when `includeState`). Default true. */
  includeCity?: boolean
  stateId?: number | null
  defaultStateId?: number | null
  onStateChange?: (stateId: number | null, state?: State | null) => void
  cityId?: number | null
  defaultCityId?: number | null
  onCityChange?: (cityId: number | null, city?: City | null) => void
  disabled?: boolean
  showFlags?: boolean
  countryLabel?: string
  stateLabel?: string
  cityLabel?: string
  countryPlaceholder?: string
  statePlaceholder?: string
  cityPlaceholder?: string
  geoDataBaseUrl?: string
  flagCdnBase?: string
  className?: string
}

function FieldBlock({
  label,
  htmlFor,
  children,
}: {
  label?: string
  htmlFor?: string
  children: React.ReactNode
}) {
  if (!label) return children
  return (
    <div className="grid w-full gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  )
}

function CountryCitySelect({
  country: countryProp,
  defaultCountry = null,
  onCountryChange,
  includeState = false,
  includeCity = true,
  stateId: stateIdProp,
  defaultStateId = null,
  onStateChange,
  cityId: cityIdProp,
  defaultCityId = null,
  onCityChange,
  disabled = false,
  showFlags = true,
  countryLabel,
  stateLabel,
  cityLabel,
  countryPlaceholder = "Choose country",
  statePlaceholder = "Choose state / province",
  cityPlaceholder = "Choose city",
  geoDataBaseUrl,
  flagCdnBase,
  className,
  ...props
}: CountryCitySelectProps) {
  const reactId = React.useId()
  const countryFieldId = `${reactId}-country`
  const stateFieldId = `${reactId}-state`
  const cityFieldId = `${reactId}-city`

  const countryControlled = countryProp !== undefined
  const stateControlled = stateIdProp !== undefined
  const cityControlled = cityIdProp !== undefined
  const [uncontrolledCountry, setUncontrolledCountry] = React.useState<
    string | null
  >(defaultCountry)
  const [uncontrolledStateId, setUncontrolledStateId] = React.useState<
    number | null
  >(defaultStateId)
  const [uncontrolledCityId, setUncontrolledCityId] = React.useState<
    number | null
  >(defaultCityId)

  const countryIso = countryControlled ? countryProp : uncontrolledCountry
  const stateId = stateControlled ? stateIdProp : uncontrolledStateId
  const cityId = cityControlled ? cityIdProp : uncontrolledCityId

  const handleCountryChange = React.useCallback(
    (iso: string | null, country?: Country | null) => {
      if (!countryControlled) setUncontrolledCountry(iso)
      if (!stateControlled) setUncontrolledStateId(null)
      if (!cityControlled) setUncontrolledCityId(null)
      onCountryChange?.(iso, country ?? null)
      if (includeState) onStateChange?.(null, null)
      if (includeCity) onCityChange?.(null, null)
    },
    [
      cityControlled,
      countryControlled,
      includeCity,
      includeState,
      onCityChange,
      onCountryChange,
      onStateChange,
      stateControlled,
    ]
  )

  const handleStateChange = React.useCallback(
    (id: number | null, state?: State | null) => {
      if (!stateControlled) setUncontrolledStateId(id)
      if (!cityControlled) setUncontrolledCityId(null)
      onStateChange?.(id, state ?? null)
      if (includeCity) onCityChange?.(null, null)
    },
    [
      cityControlled,
      includeCity,
      onCityChange,
      onStateChange,
      stateControlled,
    ]
  )

  const handleCityChange = React.useCallback(
    (id: number | null, city?: City | null) => {
      if (!cityControlled) setUncontrolledCityId(id)
      onCityChange?.(id, city ?? null)
    },
    [cityControlled, onCityChange]
  )

  return (
    <div
      data-slot="country-city-select"
      className={cn("flex w-full flex-col gap-4", className)}
      {...props}
    >
      <FieldBlock label={countryLabel} htmlFor={countryFieldId}>
        <CountrySearchSelect
          id={countryFieldId}
          disabled={disabled}
          value={countryIso}
          placeholder={countryPlaceholder}
          geoDataBaseUrl={geoDataBaseUrl}
          flagCdnBase={flagCdnBase}
          showFlags={showFlags}
          onValueChange={handleCountryChange}
        />
      </FieldBlock>
      {includeState ? (
        <FieldBlock label={stateLabel} htmlFor={stateFieldId}>
          <StateSearchSelect
            id={stateFieldId}
            disabled={disabled}
            countryIso={countryIso}
            stateId={stateId}
            placeholder={statePlaceholder}
            geoDataBaseUrl={geoDataBaseUrl}
            onStateChange={handleStateChange}
          />
        </FieldBlock>
      ) : null}
      {includeCity ? (
        <FieldBlock label={cityLabel} htmlFor={cityFieldId}>
          <CitySearchSelect
            id={cityFieldId}
            disabled={disabled}
            countryIso={countryIso}
            stateId={includeState ? stateId : null}
            requireState={includeState}
            cityId={cityId}
            placeholder={cityPlaceholder}
            geoDataBaseUrl={geoDataBaseUrl}
            onCityChange={handleCityChange}
          />
        </FieldBlock>
      ) : null}
    </div>
  )
}

export { CountryCitySelect }