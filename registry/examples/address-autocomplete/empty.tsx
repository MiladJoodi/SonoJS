"use client"

import {
  AddressAutocomplete,
  searchMockAddresses,
} from "@sonojs/ui/components/address-autocomplete"

export function AddressAutocompleteEmpty() {
  return (
    <div className="w-full max-w-md rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <AddressAutocomplete
        onSearch={(query) => searchMockAddresses(query, { empty: true })}
        placeholder="Any query returns empty…"
        emptyMessage="No matching addresses."
      />
    </div>
  )
}
