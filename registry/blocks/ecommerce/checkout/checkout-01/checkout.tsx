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

function OrderSidebar() {
  return (
    <aside className="w-full min-w-0 bg-muted md:min-h-full">
      <div className="px-4 py-8 sm:px-6 md:sticky md:top-0 md:max-h-svh md:overflow-y-auto">
        <ul className="space-y-6">
          {PRODUCTS.map((product) => (
            <li key={product.id} className="flex min-w-0 items-start gap-3 sm:gap-4">
              <div className="flex size-20 shrink-0 rounded-md bg-white p-2.5 sm:size-24 sm:p-3 dark:bg-card">
                <img
                  src={product.image}
                  alt={product.alt}
                  className="size-full object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-start text-sm font-semibold text-foreground">
                  {product.name}
                </h3>
                <ul className="mt-2 space-y-2 text-sm font-medium text-muted-foreground">
                  <li className="flex min-w-0 flex-wrap gap-x-4 gap-y-1">
                    Quantity
                    <span
                      dir="ltr"
                      className="ms-auto tabular-nums text-foreground"
                    >
                      {product.quantity}
                    </span>
                  </li>
                  <li className="flex min-w-0 flex-wrap gap-x-4 gap-y-1">
                    Total Price
                    <span
                      dir="ltr"
                      className="ms-auto font-semibold tabular-nums text-foreground"
                    >
                      {product.price}
                    </span>
                  </li>
                </ul>
              </div>
            </li>
          ))}
        </ul>

        <hr className="my-6 border-border" />

        <form
          className="mb-8 max-w-sm space-y-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <Label htmlFor="checkout-01-promo">Do you have a promo code?</Label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Input
              id="checkout-01-promo"
              name="promocode"
              placeholder="Enter promo code"
              className="min-w-0 flex-1 bg-white dark:bg-card"
            />
            <Button type="submit" className="w-full sm:w-auto">
              Apply
            </Button>
          </div>
        </form>

        <ul className="space-y-4 text-sm font-medium text-muted-foreground">
          {(
            [
              ["Subtotal", SUMMARY.subtotal],
              ["Shipping", SUMMARY.shipping],
              ["Tax", SUMMARY.tax],
            ] as const
          ).map(([label, value]) => (
            <li key={label} className="flex flex-wrap gap-4">
              {label}
              <span
                dir="ltr"
                className="ms-auto font-semibold tabular-nums text-foreground"
              >
                {value}
              </span>
            </li>
          ))}
          <li aria-hidden className="border-t border-border" />
          <li className="flex flex-wrap gap-4 font-semibold text-foreground">
            Total
            <span dir="ltr" className="ms-auto tabular-nums">
              {SUMMARY.total}
            </span>
          </li>
        </ul>
      </div>
    </aside>
  )
}

function DeliveryDetailsForm() {
  const [paymentMethod, setPaymentMethod] = React.useState("card")
  const [billingSame, setBillingSame] = React.useState(true)

  return (
    <section className="h-max min-w-0 w-full bg-white px-4 py-8 sm:px-6 lg:px-8 dark:bg-background">
      <form className="min-w-0 space-y-0" onSubmit={(e) => e.preventDefault()}>
        <fieldset>
          <legend className="mb-6 text-start text-xl font-semibold text-foreground">
            Delivery Details
          </legend>
          <div className="grid min-w-0 gap-6 lg:grid-cols-2">
            {(
              [
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
            ).map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={`checkout-01-${field.id}`}>{field.label}</Label>
                <Input
                  id={`checkout-01-${field.id}`}
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

        <fieldset className="mt-12">
          <legend className="mb-6 text-start text-xl font-semibold text-foreground">
            Payment method
          </legend>
          <RadioGroup
            value={paymentMethod}
            onValueChange={setPaymentMethod}
            className="grid min-w-0 gap-4 lg:grid-cols-2"
          >
            <label
              htmlFor="checkout-01-card"
              className={cn(
                "min-w-0 cursor-pointer rounded-md border border-border bg-muted p-4",
                paymentMethod === "card" && "border-primary/40"
              )}
            >
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <RadioGroupItem value="card" id="checkout-01-card" />
                <span className="flex min-w-0 flex-wrap gap-2">
                  <img
                    src={assetSrc(visaMark)}
                    alt="Visa"
                    className="h-auto w-10 sm:w-12"
                  />
                  <img
                    src={assetSrc(amexMark)}
                    alt="American Express"
                    className="h-auto w-10 sm:w-12"
                  />
                  <img
                    src={assetSrc(mastercardMark)}
                    alt="Mastercard"
                    className="h-auto w-10 sm:w-12"
                  />
                </span>
              </div>
              <p className="mt-4 text-start text-sm font-medium text-muted-foreground">
                Pay with your debit or credit card
              </p>
            </label>

            <label
              htmlFor="checkout-01-paypal"
              className={cn(
                "min-w-0 cursor-pointer rounded-md border border-border bg-muted p-4",
                paymentMethod === "paypal" && "border-primary/40"
              )}
            >
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <RadioGroupItem value="paypal" id="checkout-01-paypal" />
                <img
                  src={assetSrc(paypalMark)}
                  alt="PayPal"
                  className="h-auto w-16 sm:w-20"
                />
              </div>
              <p className="mt-4 text-start text-sm font-medium text-muted-foreground">
                Pay with your PayPal account
              </p>
            </label>
          </RadioGroup>
        </fieldset>

        <div className="mt-6 flex items-start gap-3">
          <Checkbox
            id="checkout-01-billing"
            checked={billingSame}
            onCheckedChange={(v) => setBillingSame(v === true)}
            className="mt-0.5"
          />
          <Label
            htmlFor="checkout-01-billing"
            className="cursor-pointer text-sm font-normal text-muted-foreground"
          >
            Billing address is the same as shipping address
          </Label>
        </div>

        <div className="mt-8">
          <Button type="submit" className="w-full">
            Pay{" "}
            <span dir="ltr" className="tabular-nums">
              {SUMMARY.total}
            </span>
          </Button>
        </div>
      </form>
    </section>
  )
}

export default function Checkout({
  className,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <main
      className={cn(
        "w-full min-w-0 overflow-x-hidden bg-white dark:bg-background",
        className
      )}
      {...props}
    >
      <h1 className="sr-only">Checkout</h1>
      <div className="grid h-full min-w-0 grid-cols-1 md:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        <OrderSidebar />
        <DeliveryDetailsForm />
      </div>
    </main>
  )
}
