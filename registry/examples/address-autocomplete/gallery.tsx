"use client"

import * as React from "react"
import { MapPinIcon } from "lucide-react"

import {
  AddressAutocomplete,
  formatAddressValue,
  searchMockAddresses,
  type AddressValue,
} from "@sonojs/ui/components/address-autocomplete"
import { Badge } from "@sonojs/ui/components/badge"

export function AddressAutocompleteGallery() {
  const [value, setValue] = React.useState<AddressValue | null>(null)

  return (
    <div className="w-full max-w-md rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <MapPinIcon className="size-4" aria-hidden />
        </span>
        <div className="min-w-0 space-y-1">
          <h3 className="text-sm font-semibold tracking-tight text-foreground">
            Shipping address
          </h3>
          <p className="text-xs text-muted-foreground">
            Try <span className="font-medium text-foreground">new</span>,{" "}
            <span className="font-medium text-foreground">london</span>, or{" "}
            <span className="font-medium text-foreground">paris</span>.
          </p>
        </div>
        <Badge variant="secondary" className="ms-auto shrink-0 font-normal">
          {value ? "Selected" : "Empty"}
        </Badge>
      </div>
      <AddressAutocomplete
        value={value}
        onValueChange={setValue}
        onSearch={searchMockAddresses}
        placeholder="Try “new”, “london”, “paris”…"
      />
      {value ? (
        <p className="mt-3 truncate text-xs text-muted-foreground">
          {formatAddressValue(value)}
        </p>
      ) : null}
    </div>
  )
}
