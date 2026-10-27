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
import jacketImg from "./images/jacket.webp"
import mastercardMark from "./images/mastercard.webp"
import paypalMark from "./images/paypal.webp"
import sneakersImg from "./images/sneakers.webp"
import sweaterImg from "./images/sweater.webp"
import tshirtImg from "./images/tshirt.webp"
import visaMark from "./images/visa.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const PRODUCTS = [
  {
    id: 1,
    name: "Black Sweater",
    image: assetSrc(sweaterImg),
    alt: "Black sweater",
    quantity: 2,
    price: "$40",
  },
  {
    id: 2,
    name: "Dark Green Tshirt",
    image: assetSrc(tshirtImg),
    alt: "Dark green t-shirt",
    quantity: 1,
    price: "$16",
  },
  {
    id: 3,
    name: "Jacket",
    image: assetSrc(jacketImg),
    alt: "Jacket",
    quantity: 1,
    price: "$16",
  },
  {
    id: 4,
    name: "Black & White Sneakers",
    image: assetSrc(sneakersImg),
    alt: "Black and white sneakers",
    quantity: 1,
    price: "$16",
  },
] as const

const SUMMARY = {
  subtotal: "$102.00",
  shipping: "$6.00",
  tax: "$5.00",
  total: "$113.00",
} as const

function Field({
  id,
  label,
  children,
}: {
  id: string
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      {children}
    </div>
  )
}

function SummaryRow({
  label,
  value,
  emphasize,
}: {
  label: string
  value: string
  emphasize?: boolean
}) {
  return (
    <li
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 text-sm",
        emphasize
          ? "border-t border-border/70 pt-4 font-semibold text-foreground"
          : "text-muted-foreground"
      )}
    >
      <span>{label}</span>
      <span
        dir="ltr"
        className={cn(
          "ms-auto tabular-nums",
          emphasize ? "text-foreground" : "font-semibold text-foreground"
        )}
      >
        {value}
      </span>
    </li>
  )
}

function OrderSidebar() {
  return (
    <aside className="w-full min-w-0 shrink-0 border-b border-border/70 bg-muted/50 md:sticky md:top-0 md:h-svh md:w-[min(100%,420px)] md:min-w-[340px] md:overflow-y-auto md:border-b-0 md:border-e">
      <div className="flex flex-col gap-6 px-4 py-8 sm:px-6 md:px-6 md:py-10">
        <ul className="space-y-5">
          {PRODUCTS.map((product) => (
            <li key={product.id} className="flex items-start gap-3 sm:gap-4">
              <div className="flex size-20 shrink-0 items-center justify-center rounded-md bg-card p-2 sm:size-24 sm:p-3">
                <img
                  src={product.image}
                  alt={product.alt}
                  className="size-full object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-start text-sm font-semibold text-foreground">
                  {product.name}
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex flex-wrap justify-between gap-2">
                    <span>Quantity</span>
                    <span dir="ltr" className="tabular-nums text-foreground">
                      {product.quantity}
                    </span>
                  </li>
                  <li className="flex flex-wrap justify-between gap-2">
                    <span>Total Price</span>
                    <span
                      dir="ltr"
                      className="font-semibold tabular-nums text-foreground"
                    >
                      {product.price}
                    </span>
                  </li>
                </ul>
              </div>
            </li>
          ))}
        </ul>

        <hr className="border-border/70" />

        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
          <Label htmlFor="checkout-01-promo" className="text-sm font-medium">
            Do you have a promo code?
          </Label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Input
              id="checkout-01-promo"
              name="promocode"
              placeholder="Enter promo code"
              className="min-w-0 flex-1"
            />
            <Button type="submit" variant="outline" className="w-full sm:w-auto">
              Apply
            </Button>
          </div>
        </form>

        <ul className="space-y-3">
          <SummaryRow label="Subtotal" value={SUMMARY.subtotal} />
          <SummaryRow label="Shipping" value={SUMMARY.shipping} />
          <SummaryRow label="Tax" value={SUMMARY.tax} />
          <SummaryRow label="Total" value={SUMMARY.total} emphasize />
        </ul>
      </div>
    </aside>
  )
}

function DeliveryDetailsForm() {
  const [paymentMethod, setPaymentMethod] = React.useState("card")
  const [billingSame, setBillingSame] = React.useState(true)

  return (
    <section className="min-w-0 flex-1 bg-canvas px-4 py-8 sm:px-6 md:px-8 md:py-10 xl:px-12">
      <form
        className="mx-auto w-full max-w-2xl space-y-10"
        onSubmit={(e) => e.preventDefault()}
      >
        <fieldset className="space-y-6">
          <legend className="text-start text-xl font-semibold tracking-tight text-foreground">
            Delivery Details
          </legend>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            <Field id="checkout-01-fname" label="First Name">
              <Input
                id="checkout-01-fname"
                name="fname"
                placeholder="John"
                autoComplete="given-name"
                required
              />
            </Field>
            <Field id="checkout-01-lname" label="Last Name">
              <Input
                id="checkout-01-lname"
                name="lname"
                placeholder="Doe"
                autoComplete="family-name"
                required
              />
            </Field>
            <Field id="checkout-01-email" label="Email">
              <Input
                id="checkout-01-email"
                name="email"
                type="email"
                placeholder="john@example.com"
                autoComplete="email"
                required
              />
            </Field>
            <Field id="checkout-01-mobile" label="Mobile Number">
              <Input
                id="checkout-01-mobile"
                name="mobile"
                type="tel"
                placeholder="123-456-7890"
                autoComplete="tel"
                dir="ltr"
                required
              />
            </Field>
            <Field id="checkout-01-address" label="Address Line">
              <Input
                id="checkout-01-address"
                name="address"
                placeholder="123 Main Street"
                autoComplete="street-address"
                required
              />
            </Field>
            <Field id="checkout-01-city" label="City">
              <Input
                id="checkout-01-city"
                name="city"
                placeholder="New York"
                autoComplete="address-level2"
                required
              />
            </Field>
            <Field id="checkout-01-state" label="State">
              <Input
                id="checkout-01-state"
                name="state"
                placeholder="NY"
                autoComplete="address-level1"
                required
              />
            </Field>
            <Field id="checkout-01-postal" label="Postal code">
              <Input
                id="checkout-01-postal"
                name="postalCode"
                placeholder="10001"
                autoComplete="postal-code"
                dir="ltr"
                required
              />
            </Field>
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
              htmlFor="checkout-01-card"
              className={cn(
                "flex cursor-pointer flex-col gap-3 rounded-[12px] border border-border/70 bg-card p-4 shadow-soft transition-colors",
                paymentMethod === "card" &&
                  "border-primary/50 ring-1 ring-primary/30"
              )}
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="card" id="checkout-01-card" />
                <span className="flex flex-wrap items-center gap-2">
                  <img src={assetSrc(visaMark)} alt="Visa" className="h-6 w-auto" />
                  <img
                    src={assetSrc(amexMark)}
                    alt="American Express"
                    className="h-6 w-auto"
                  />
                  <img
                    src={assetSrc(mastercardMark)}
                    alt="Mastercard"
                    className="h-6 w-auto"
                  />
                </span>
              </div>
              <p className="text-start text-sm text-muted-foreground">
                Pay with your debit or credit card
              </p>
            </label>

            <label
              htmlFor="checkout-01-paypal"
              className={cn(
                "flex cursor-pointer flex-col gap-3 rounded-[12px] border border-border/70 bg-card p-4 shadow-soft transition-colors",
                paymentMethod === "paypal" &&
                  "border-primary/50 ring-1 ring-primary/30"
              )}
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="paypal" id="checkout-01-paypal" />
                <img
                  src={assetSrc(paypalMark)}
                  alt="PayPal"
                  className="h-7 w-auto"
                />
              </div>
              <p className="text-start text-sm text-muted-foreground">
                Pay with your PayPal account
              </p>
            </label>
          </RadioGroup>
        </fieldset>

        <div className="flex items-start gap-3">
          <Checkbox
            id="checkout-01-billing"
            checked={billingSame}
            onCheckedChange={(v) => setBillingSame(v === true)}
            className="mt-0.5"
          />
          <Label
            htmlFor="checkout-01-billing"
            className="cursor-pointer text-sm leading-snug font-normal text-muted-foreground"
          >
            Billing address is the same as shipping address
          </Label>
        </div>

        <Button type="submit" className="w-full" size="lg">
          Pay{" "}
          <span dir="ltr" className="tabular-nums">
            {SUMMARY.total}
          </span>
        </Button>
      </form>
    </section>
  )
}

export default function Checkout({
  className,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <main className={cn("w-full bg-canvas", className)} {...props}>
      <h1 className="sr-only">Checkout</h1>
      <div className="flex flex-col md:flex-row md:items-start">
        <OrderSidebar />
        <DeliveryDetailsForm />
      </div>
    </main>
  )
}
