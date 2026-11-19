"use client"

import {
  AddressAutocomplete,
  searchMockAddresses,
} from "@sonojs/ui/components/address-autocomplete"

export function AddressAutocompleteDisabled() {
  return (
    <div className="w-full max-w-md rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <AddressAutocomplete
        onSearch={searchMockAddresses}
        disabled
        defaultValue={{
          line1: "350 Fifth Avenue",
          city: "New York",
          region: "NY",
          postalCode: "10118",
          country: "United States",
        }}
      />
    </div>
  )
}
