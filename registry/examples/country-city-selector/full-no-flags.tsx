"use client"

import { CountryCitySelect } from "@sonojs/ui/components/country-city-selector"

export function CountryCitySelectorFullNoFlags() {
  return (
    <CountryCitySelect
      className="w-full max-w-sm"
      includeState
      includeCity
      showFlags={false}
    />
  )
}