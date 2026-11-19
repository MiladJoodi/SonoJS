"use client"

import * as React from "react"

import {
  AddressAutocomplete,
  formatAddressValue,
  searchMockAddresses,
  type AddressValue,
} from "@sonojs/ui/components/address-autocomplete"
import { Button } from "@sonojs/ui/components/button"

export function AddressAutocompleteControlled() {
  const [value, setValue] = React.useState<AddressValue | null>(null)

  return (
    <div className="flex w-full max-w-md flex-col gap-3 rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <AddressAutocomplete
        value={value}
        onValueChange={setValue}
        onSearch={searchMockAddresses}
        placeholder="Controlled search…"
      />
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setValue(null)}
        >
          Clear
        </Button>
        <p className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
          {value ? formatAddressValue(value) : "No selection"}
        </p>
      </div>
    </div>
  )
}
