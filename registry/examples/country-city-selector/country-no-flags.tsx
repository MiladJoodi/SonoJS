"use client"

import { CountryCitySelect } from "@sonojs/ui/components/country-city-selector"

export function CountryCitySelectorCountryNoFlags() {
  return (
    <CountryCitySelect
      className="w-full max-w-sm"
      includeState={false}
      includeCity={false}
      showFlags={false}
    />
  )
}