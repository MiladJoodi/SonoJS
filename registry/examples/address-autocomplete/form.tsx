"use client"

import * as React from "react"

import {
  AddressAutocomplete,
  searchMockAddresses,
  type AddressValue,
} from "@sonojs/ui/components/address-autocomplete"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@sonojs/ui/components/field"
import { Input } from "@sonojs/ui/components/input"

export function AddressAutocompleteForm() {
  const [value, setValue] = React.useState<AddressValue | null>(null)

  return (
    <div className="w-full max-w-md rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <FieldSet>
        <FieldLegend>Delivery address</FieldLegend>
        <FieldDescription>
          Try <span className="font-medium text-foreground">new</span>,{" "}
          <span className="font-medium text-foreground">london</span>, or{" "}
          <span className="font-medium text-foreground">paris</span> — pick a
          suggestion to fill the fields below.
        </FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="address-search">Search</FieldLabel>
            <AddressAutocomplete
              id="address-search"
              value={value}
              onValueChange={setValue}
              onSearch={searchMockAddresses}
              placeholder="Try “new”, “london”, “paris”…"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="line1">Street</FieldLabel>
            <Input
              id="line1"
              value={value?.line1 ?? ""}
              onChange={(event) =>
                setValue((prev) => ({
                  ...(prev ?? { line1: "" }),
                  line1: event.target.value,
                }))
              }
              placeholder="Street address"
              autoComplete="street-address"
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="city">City</FieldLabel>
              <Input
                id="city"
                value={value?.city ?? ""}
                onChange={(event) =>
                  setValue((prev) => ({
                    ...(prev ?? { line1: "" }),
                    city: event.target.value,
                  }))
                }
                placeholder="City"
                autoComplete="address-level2"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="region">Region</FieldLabel>
              <Input
                id="region"
                value={value?.region ?? ""}
                onChange={(event) =>
                  setValue((prev) => ({
                    ...(prev ?? { line1: "" }),
                    region: event.target.value,
                  }))
                }
                placeholder="State / region"
                autoComplete="address-level1"
              />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="postal">Postal code</FieldLabel>
              <Input
                id="postal"
                value={value?.postalCode ?? ""}
                onChange={(event) =>
                  setValue((prev) => ({
                    ...(prev ?? { line1: "" }),
                    postalCode: event.target.value,
                  }))
                }
                placeholder="Postal code"
                autoComplete="postal-code"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="country">Country</FieldLabel>
              <Input
                id="country"
                value={value?.country ?? ""}
                onChange={(event) =>
                  setValue((prev) => ({
                    ...(prev ?? { line1: "" }),
                    country: event.target.value,
                  }))
                }
                placeholder="Country"
                autoComplete="country-name"
              />
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>
    </div>
  )
}
