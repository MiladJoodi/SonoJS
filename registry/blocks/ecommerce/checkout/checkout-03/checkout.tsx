"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@sonojs/ui/components/radio-group"
import { cn } from "@/lib/utils"

import amexMark from "./images/amex.webp"
import mastercardMark from "./images/mastercard.webp"
import paypalMark from "./images/paypal.webp"
import visaMark from "./images/visa.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const SHIPPING = 6
const TAX = 5
const SUBTOTAL = 72

const FORM_FIELDS = [
  {
    id: "fname",
    label: "First Name",
    type: "text",
    placeholder: "John",
    autoComplete: "given-name",
  },
  {
    id: "lname",
    label: "Last Name",
    type: "text",
    placeholder: "Doe",
    autoComplete: "family-name",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "john@example.com",
    autoComplete: "email",
  },
  {
    id: "mobile",
    label: "Mobile Number",
    type: "tel",
    placeholder: "123-456-7890",
    autoComplete: "tel",
  },
  {
    id: "address",
    label: "Address Line",
    type: "text",
    placeholder: "123 Main Street",
    autoComplete: "street-address",
  },
  {
    id: "city",
    label: "City",
    type: "text",
    placeholder: "New York",
    autoComplete: "address-level2",
  },
  {
    id: "state",
    label: "State",
    type: "text",
    placeholder: "NY",
    autoComplete: "address-level1",
  },
  {
    id: "postal-code",
    label: "Postal code",
    type: "text",
    placeholder: "10001",
    autoComplete: "postal-code",
  },
] as const

function money(n: number) {
  return `$${n.toFixed(2)}`
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-3.5", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function ProgressSteps() {
  return (
    <ol
      className="mb-10 flex max-w-4xl items-start sm:mb-12"
      aria-label="Checkout progress"
    >
      <li className="w-full min-w-0">
        <div className="relative flex w-full items-center">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary md:size-7">
            <span className="sr-only">Step 1: Completed</span>
            <CheckIcon className="text-primary-foreground" />
          </div>
          <div className="mx-2 h-0.5 w-full rounded-md bg-primary sm:mx-4" />
        </div>
        <div className="mt-3 pe-2 sm:pe-4">
          <p className="text-start text-sm font-semibold text-primary">Cart</p>
        </div>
      </li>
      <li className="w-full min-w-0">
        <div className="relative flex w-full items-center">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-card text-xs font-semibold text-primary md:size-7">
            <span dir="ltr">2</span>
          </div>
          <div className="mx-2 h-0.5 w-full rounded-md bg-border sm:mx-4" />
        </div>
        <div className="mt-3 pe-2 sm:pe-4">
          <p className="text-start text-sm font-semibold text-foreground">
            Checkout
          </p>
        </div>
      </li>
      <li className="min-w-0 shrink-0">
        <div className="flex size-6 items-center justify-center rounded-full border border-border/70 bg-muted/50 text-xs font-semibold text-muted-foreground md:size-7">
          <span dir="ltr">3</span>
        </div>
        <div className="mt-3">
          <p className="text-start text-sm font-medium text-muted-foreground">
            Order
          </p>
        </div>
      </li>
    </ol>
  )
}

export default function Checkout({
  className,
  ...props
}: React.ComponentProps<"main">) {
  const [paymentMethod, setPaymentMethod] = React.useState("card")
  const [billingSame, setBillingSame] = React.useState(true)
  const [promo, setPromo] = React.useState("")
  const total = SUBTOTAL + SHIPPING + TAX

  return (
    <main
      className={cn("w-full bg-white dark:bg-background", className)}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-10">
        <ProgressSteps />

        <div className="grid gap-8 lg:grid-cols-[1fr_min(100%,340px)] lg:items-start lg:gap-10">
          <form
            className="order-2 min-w-0 space-y-10 lg:order-1"
            onSubmit={(e) => e.preventDefault()}
          >
            <fieldset className="space-y-5">
              <legend className="text-start text-xl font-semibold tracking-tight text-foreground">
                Delivery Details
              </legend>
              <div className="grid gap-4 sm:grid-cols-2">
                {FORM_FIELDS.map((field) => (
                  <div
                    key={field.id}
                    className={cn(
                      "space-y-2",
                      field.id === "address" && "sm:col-span-2"
                    )}
                  >
                    <Label htmlFor={`checkout-03-${field.id}`}>
                      {field.label}
                    </Label>
                    <Input
                      id={`checkout-03-${field.id}`}
                      name={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete}
                      dir={
                        field.type === "tel" || field.id === "postal-code"
                          ? "ltr"
                          : undefined
                      }
                      required
                    />
                  </div>
                ))}
              </div>
            </fieldset>

            <fieldset className="space-y-5">
              <legend className="text-start text-xl font-semibold tracking-tight text-foreground">
                Payment method
              </legend>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="grid gap-4 sm:grid-cols-2"
              >
                <label
                  htmlFor="checkout-03-card"
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-[12px] border border-border/70 bg-card px-3 py-3 shadow-soft",
                    paymentMethod === "card" && "border-primary/40 bg-primary/5"
                  )}
                >
                  <RadioGroupItem value="card" id="checkout-03-card" />
                  <span className="sr-only">Card</span>
                  <span className="flex flex-wrap gap-1.5" aria-hidden>
                    <img src={assetSrc(visaMark)} alt="" className="h-5" />
                    <img src={assetSrc(amexMark)} alt="" className="h-5" />
                    <img
                      src={assetSrc(mastercardMark)}
                      alt=""
                      className="h-5"
                    />
                  </span>
                </label>
                <label
                  htmlFor="checkout-03-paypal"
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-[12px] border border-border/70 bg-card px-3 py-3 shadow-soft",
                    paymentMethod === "paypal" &&
                      "border-primary/40 bg-primary/5"
                  )}
                >
                  <RadioGroupItem value="paypal" id="checkout-03-paypal" />
                  <span className="sr-only">PayPal</span>
                  <img
                    src={assetSrc(paypalMark)}
                    alt=""
                    aria-hidden
                    className="h-6"
                  />
                </label>
              </RadioGroup>
            </fieldset>

            <div className="flex items-start gap-3">
              <Checkbox
                id="checkout-03-billing"
                checked={billingSame}
                onCheckedChange={(v) => setBillingSame(v === true)}
                className="mt-0.5"
              />
              <Label
                htmlFor="checkout-03-billing"
                className="cursor-pointer text-sm font-normal text-muted-foreground"
              >
                Billing address is the same as shipping address
              </Label>
            </div>

            <Button type="submit" size="lg" className="w-full lg:hidden">
              Pay now ·{" "}
              <span dir="ltr" className="tabular-nums">
                {money(total)}
              </span>
            </Button>
          </form>

          <aside className="order-1 min-w-0 lg:order-2 lg:sticky lg:top-8">
            <div className="rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
              <h2 className="mb-5 text-start text-lg font-semibold text-foreground">
                Order Summary
              </h2>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between gap-3 text-muted-foreground">
                  <span>Subtotal</span>
                  <span
                    dir="ltr"
                    className="font-semibold tabular-nums text-foreground"
                  >
                    {money(SUBTOTAL)}
                  </span>
                </li>
                <li className="flex justify-between gap-3 text-muted-foreground">
                  <span>Shipping</span>
                  <span
                    dir="ltr"
                    className="font-semibold tabular-nums text-foreground"
                  >
                    {money(SHIPPING)}
                  </span>
                </li>
                <li className="flex justify-between gap-3 text-muted-foreground">
                  <span>Tax</span>
                  <span
                    dir="ltr"
                    className="font-semibold tabular-nums text-foreground"
                  >
                    {money(TAX)}
                  </span>
                </li>
                <li className="flex justify-between gap-3 border-t border-border/70 pt-3 font-semibold text-foreground">
                  <span>Total</span>
                  <span dir="ltr" className="tabular-nums">
                    {money(total)}
                  </span>
                </li>
              </ul>

              <form
                className="mt-5 space-y-2 border-t border-border/70 pt-5"
                onSubmit={(e) => e.preventDefault()}
              >
                <Label htmlFor="checkout-03-promo" className="text-sm">
                  Promo code
                </Label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Input
                    id="checkout-03-promo"
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    placeholder="Enter code"
                    className="min-w-0 flex-1"
                  />
                  <Button
                    type="submit"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    Apply
                  </Button>
                </div>
              </form>

              <Button type="button" size="lg" className="mt-5 hidden w-full lg:inline-flex">
                Pay now ·{" "}
                <span dir="ltr" className="tabular-nums">
                  {money(total)}
                </span>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
