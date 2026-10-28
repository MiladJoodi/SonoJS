"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@sonojs/ui/components/field"
import { Input } from "@sonojs/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

export default function BillingSettings({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [company, setCompany] = React.useState("Acme Studio Inc.")
  const [address, setAddress] = React.useState("120 Market Street, Suite 400")
  const [city, setCity] = React.useState("San Francisco")
  const [postal, setPostal] = React.useState("94105")
  const [taxId, setTaxId] = React.useState("US-98-7654321")
  const [country, setCountry] = React.useState("us")

  return (
    <div
      className={cn(
        "flex w-full justify-center bg-white px-4 py-10 text-foreground dark:bg-background sm:px-6 sm:py-14",
        className
      )}
      {...props}
    >
      <section
        className="w-full max-w-lg overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft"
        aria-labelledby="billing-settings-04-heading"
      >
        <header className="border-b border-border/70 px-5 py-4 sm:px-6">
          <h1
            id="billing-settings-04-heading"
            className="text-base font-semibold tracking-tight text-start"
          >
            Company &amp; tax
          </h1>
          <p className="mt-1 text-start text-sm text-muted-foreground">
            Shown on invoices and used for tax calculation.
          </p>
        </header>

        <div className="px-5 py-5 sm:px-6">
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel htmlFor="billing-settings-04-company">
                Legal company name
              </FieldLabel>
              <Input
                id="billing-settings-04-company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                autoComplete="organization"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="billing-settings-04-address">
                Billing address
              </FieldLabel>
              <Input
                id="billing-settings-04-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                autoComplete="street-address"
              />
              <FieldDescription>
                Street address that appears on PDF invoices.
              </FieldDescription>
            </Field>

            <div className="grid gap-3 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="billing-settings-04-city">City</FieldLabel>
                <Input
                  id="billing-settings-04-city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  autoComplete="address-level2"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="billing-settings-04-postal">
                  Postal code
                </FieldLabel>
                <Input
                  id="billing-settings-04-postal"
                  dir="ltr"
                  value={postal}
                  onChange={(e) => setPostal(e.target.value)}
                  autoComplete="postal-code"
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="billing-settings-04-country">
                Country
              </FieldLabel>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger
                  id="billing-settings-04-country"
                  className="w-full cursor-pointer"
                  aria-label="Country"
                >
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="gb">United Kingdom</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                  <SelectItem value="ae">United Arab Emirates</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Separator />

            <Field>
              <FieldLabel htmlFor="billing-settings-04-tax">
                Tax ID / VAT
              </FieldLabel>
              <Input
                id="billing-settings-04-tax"
                dir="ltr"
                value={taxId}
                onChange={(e) => setTaxId(e.target.value)}
                placeholder="EU VAT or EIN"
                className="font-mono"
              />
              <FieldDescription>
                Optional. Leave blank if you are not tax-registered.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-border/70 bg-muted/40 px-5 py-3 sm:flex-row sm:justify-end sm:px-6">
          <Button type="button" variant="ghost" className="cursor-pointer">
            Cancel
          </Button>
          <Button type="button" className="cursor-pointer">
            Save details
          </Button>
        </div>
      </section>
    </div>
  )
}
