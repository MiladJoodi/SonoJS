"use client"

import {
  AddressAutocomplete,
  searchMockAddresses,
} from "@sonojs/ui/components/address-autocomplete"

export function AddressAutocompleteMinChars() {
  return (
    <div className="w-full max-w-md rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <AddressAutocomplete
        onSearch={searchMockAddresses}
        minChars={3}
        placeholder="Type at least 3 characters…"
      />
    </div>
  )
}
