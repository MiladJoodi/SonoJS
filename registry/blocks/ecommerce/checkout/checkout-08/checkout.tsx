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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@sonojs/ui/components/sheet"
import { cn } from "@/lib/utils"

import amexMark from "./images/amex.webp"
import mastercardMark from "./images/mastercard.webp"
import paypalMark from "./images/paypal.webp"
import visaMark from "./images/visa.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const DELIVERY_FIELDS = [
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

const CARD_FIELDS = [
  {
    id: "card-number",
    label: "Card Number",
    type: "text",
    placeholder: "1234 5678 9012 3456",
    autoComplete: "cc-number",
  },
  {
    id: "name-on-card",
    label: "Name on card",
    type: "text",
    placeholder: "John Doe",
    autoComplete: "cc-name",
  },
  {
    id: "expiry-date",
    label: "Expiry Date",
    type: "text",
    placeholder: "MM/YY",
    autoComplete: "cc-exp",
  },
  {
    id: "cvv",
    label: "CVV",
    type: "text",
    placeholder: "123",
    autoComplete: "cc-csc",
  },
] as const

const SUBTOTAL = 152
const SHIPPING = 4
const TAX = 4
const TOTAL = 160

function money(n: number) {
  return `$${n.toFixed(2)}`
}

export default function Checkout({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [open, setOpen] = React.useState(false)
  const [paymentMethod, setPaymentMethod] = React.useState("card")
  const [billingSame, setBillingSame] = React.useState(true)

  return (
    <div
      className={cn(
        "flex min-h-[280px] w-full min-w-0 items-center justify-center bg-canvas px-4 py-10",
        className
      )}
      {...props}
    >
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">Open Drawer</Button>
        </SheetTrigger>

        <SheetContent
          side="end"
          showCloseButton
          className="flex h-svh max-h-svh w-full max-w-md flex-col gap-0 overflow-hidden p-0 sm:max-w-md"
        >
          <SheetHeader className="shrink-0 border-b border-border/70 px-5 py-3.5 pe-12 text-start sm:px-6">
            <SheetTitle className="text-base font-semibold tracking-tight">
              Shopping cart
            </SheetTitle>
            <SheetDescription className="sr-only">
              Review totals, enter delivery details, and choose a payment
              method.
            </SheetDescription>
          </SheetHeader>

          <form
            id="checkout-08-form"
            className="flex min-h-0 flex-1 flex-col"
            onSubmit={(e) => {
              e.preventDefault()
              setOpen(false)
            }}
          >
            <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-5 py-5 sm:px-6">
              <div className="rounded-[12px] bg-muted/60 p-4">
                <ul className="divide-y divide-border/70 text-sm">
                  {(
                    [
                      ["Subtotal", money(SUBTOTAL)],
                      ["Shipping", money(SHIPPING)],
                      ["Tax", money(TAX)],
                      ["Total", money(TOTAL)],
                    ] as const
                  ).map(([label, value], i, arr) => (
                    <li
                      key={label}
                      className={cn(
                        "flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0",
                        i === arr.length - 1
                          ? "font-semibold text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      <span>{label}</span>
                      <span
                        dir="ltr"
                        className={cn(
                          "tabular-nums",
                          i === arr.length - 1
                            ? "text-foreground"
                            : "font-semibold text-foreground"
                        )}
                      >
                        {value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <fieldset className="space-y-3">
                <legend className="text-start text-base font-semibold tracking-tight text-foreground">
                  Delivery Details
                </legend>
                <div className="space-y-3">
                  {DELIVERY_FIELDS.map((field) => (
                    <div key={field.id} className="space-y-1.5">
                      <Label htmlFor={`checkout-08-${field.id}`}>
                        {field.label}
                      </Label>
                      <Input
                        id={`checkout-08-${field.id}`}
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

              <fieldset className="space-y-3">
                <legend className="text-start text-base font-semibold tracking-tight text-foreground">
                  Payment method
                </legend>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="grid gap-3"
                >
                  <label
                    htmlFor="checkout-08-card"
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-[12px] border border-border/70 bg-card px-3 py-2.5 shadow-soft",
                      paymentMethod === "card" &&
                        "border-primary/40 bg-primary/5"
                    )}
                  >
                    <RadioGroupItem value="card" id="checkout-08-card" />
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
                    htmlFor="checkout-08-paypal"
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-[12px] border border-border/70 bg-card px-3 py-2.5 shadow-soft",
                      paymentMethod === "paypal" &&
                        "border-primary/40 bg-primary/5"
                    )}
                  >
                    <RadioGroupItem value="paypal" id="checkout-08-paypal" />
                    <span className="sr-only">PayPal</span>
                    <img
                      src={assetSrc(paypalMark)}
                      alt=""
                      aria-hidden
                      className="h-6"
                    />
                  </label>
                </RadioGroup>

                <div className="space-y-3">
                  {CARD_FIELDS.map((field) => (
                    <div key={field.id} className="space-y-1.5">
                      <Label htmlFor={`checkout-08-${field.id}`}>
                        {field.label}
                      </Label>
                      <Input
                        id={`checkout-08-${field.id}`}
                        name={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        autoComplete={field.autoComplete}
                        dir="ltr"
                        required={paymentMethod === "card"}
                        disabled={paymentMethod !== "card"}
                      />
                    </div>
                  ))}
                </div>
              </fieldset>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="checkout-08-billing"
                  checked={billingSame}
                  onCheckedChange={(v) => setBillingSame(v === true)}
                  className="mt-0.5"
                />
                <Label
                  htmlFor="checkout-08-billing"
                  className="cursor-pointer text-sm font-normal text-muted-foreground"
                >
                  Billing address is the same as shipping address
                </Label>
              </div>
            </div>

            <div className="shrink-0 border-t border-border/70 px-5 py-4 sm:px-6">
              <Button type="submit" className="w-full">
                Pay{" "}
                <span dir="ltr" className="tabular-nums">
                  {money(TOTAL)}
                </span>
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  )
}
