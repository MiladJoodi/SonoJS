"use client"

import {
  AddressAutocomplete,
  searchMockAddresses,
} from "@sonojs/ui/components/address-autocomplete"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@sonojs/ui/components/field"

export function AddressAutocompleteInvalid() {
  return (
    <div className="w-full max-w-md rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <FieldGroup>
        <Field data-invalid>
          <FieldLabel htmlFor="address-invalid">Address</FieldLabel>
          <AddressAutocomplete
            id="address-invalid"
            onSearch={searchMockAddresses}
            invalid
            placeholder="Required address…"
          />
          <FieldError>Select a valid shipping address.</FieldError>
        </Field>
      </FieldGroup>
    </div>
  )
}
