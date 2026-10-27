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
import sneakersImg from "./images/sneakers.webp"
import tshirtImg from "./images/tshirt.webp"
import visaMark from "./images/visa.webp"
import watchImg from "./images/watch.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

type CartItem = {
  id: number
  name: string
  color: string
  price: number
  image: string
  alt: string
  quantity: number
}

const INITIAL_CART: CartItem[] = [
  {
    id: 1,
    name: "Velvet Sneaker",
    color: "Black/White",
    price: 18,
    image: assetSrc(sneakersImg),
    alt: "Velvet sneaker",
    quantity: 1,
  },
  {
    id: 2,
    name: "Smart Watch Timex",
    color: "Gray",
    price: 90,
    image: assetSrc(watchImg),
    alt: "Smart watch",
    quantity: 1,
  },
  {
    id: 3,
    name: "T-shirt",
    color: "Dark Green",
    price: 20,
    image: assetSrc(tshirtImg),
    alt: "Dark green t-shirt",
    quantity: 1,
  },
]

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

const SHIPPING = 6
const TAX = 5

function money(n: number) {
  return `$${n.toFixed(2)}`
}

function MinusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-3.5", className)} aria-hidden>
      <path
        fill="currentColor"
        d="M5 12.75h14a.75.75 0 0 0 0-1.5H5a.75.75 0 0 0 0 1.5Z"
      />
    </svg>
  )
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-3.5", className)} aria-hidden>
      <path
        fill="currentColor"
        d="M12.75 5a.75.75 0 0 0-1.5 0v6.25H5a.75.75 0 0 0 0 1.5h6.25V19a.75.75 0 0 0 1.5 0v-6.25H19a.75.75 0 0 0 0-1.5h-6.25V5Z"
      />
    </svg>
  )
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-4", className)} aria-hidden>
      <path
        fill="currentColor"
        d="M9 3.75A1.75 1.75 0 0 1 10.75 2h2.5A1.75 1.75 0 0 1 15 3.75V5h4.25a.75.75 0 0 1 0 1.5H4.75a.75.75 0 0 1 0-1.5H9V3.75Zm1.5.25v1h3v-1a.25.25 0 0 0-.25-.25h-2.5a.25.25 0 0 0-.25.25ZM6.5 8.5a.75.75 0 0 1 .75.75v9.5c0 .69.56 1.25 1.25 1.25h7c.69 0 1.25-.56 1.25-1.25v-9.5a.75.75 0 0 1 1.5 0v9.5A2.75 2.75 0 0 1 15.5 21.5h-7A2.75 2.75 0 0 1 5.75 18.75v-9.5A.75.75 0 0 1 6.5 8.5Zm3.25 2.25a.75.75 0 0 0-1.5 0v7a.75.75 0 0 0 1.5 0v-7Zm4.5 0a.75.75 0 0 0-1.5 0v7a.75.75 0 0 0 1.5 0v-7Z"
      />
    </svg>
  )
}

export default function Checkout({
  className,
  ...props
}: React.ComponentProps<"main">) {
  const [cartItems, setCartItems] = React.useState(INITIAL_CART)
  const [paymentMethod, setPaymentMethod] = React.useState("card")
  const [billingSame, setBillingSame] = React.useState(true)

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const total = subtotal + SHIPPING + TAX

  const setQty = (id: number, qty: number) => {
    if (qty < 1) return
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    )
  }

  const remove = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <main className={cn("w-full bg-canvas", className)} {...props}>
      <h1 className="sr-only">Checkout</h1>
      <div className="mx-auto grid max-w-6xl gap-0 lg:grid-cols-2">
        <section className="border-b border-border/70 bg-muted/40 px-4 py-8 sm:px-8 lg:border-b-0 lg:border-e lg:py-10">
          <div className="mx-auto max-w-lg space-y-6 lg:ms-auto lg:me-0">
            <h2 className="text-start text-lg font-semibold text-foreground">
              Order Summary
            </h2>
            {cartItems.length === 0 ? (
              <p className="text-sm text-muted-foreground">Your bag is empty.</p>
            ) : (
              <ul className="space-y-5">
                {cartItems.map((item, index) => (
                  <li key={item.id}>
                    <div className="flex gap-3">
                      <div className="flex size-16 shrink-0 items-center justify-center rounded-md bg-card p-1.5 sm:size-20">
                        <img
                          src={item.image}
                          alt={item.alt}
                          className="size-full object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="truncate text-sm font-semibold">
                              {item.name}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {item.color}
                            </p>
                          </div>
                          <button
                            type="button"
                            aria-label={`Remove ${item.name}`}
                            onClick={() => remove(item.id)}
                            className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md text-destructive outline-none hover:bg-destructive/10 focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <div className="inline-flex h-9 items-center rounded-md border border-border/70 bg-card">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() => setQty(item.id, item.quantity - 1)}
                              className="inline-flex size-9 cursor-pointer items-center justify-center outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                            >
                              <MinusIcon />
                            </button>
                            <span
                              dir="ltr"
                              className="min-w-6 text-center text-sm tabular-nums"
                            >
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() => setQty(item.id, item.quantity + 1)}
                              className="inline-flex size-9 cursor-pointer items-center justify-center outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                            >
                              <PlusIcon />
                            </button>
                          </div>
                          <span
                            dir="ltr"
                            className="text-sm font-semibold tabular-nums"
                          >
                            {money(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                    {index < cartItems.length - 1 ? (
                      <hr className="mt-5 border-border/70" />
                    ) : null}
                  </li>
                ))}
              </ul>
            )}

            <hr className="border-border/70" />

            <ul className="space-y-3 text-sm">
              {(
                [
                  ["Subtotal", money(subtotal)],
                  ["Shipping", money(SHIPPING)],
                  ["Tax", money(TAX)],
                ] as const
              ).map(([label, value]) => (
                <li
                  key={label}
                  className="flex justify-between gap-3 text-muted-foreground"
                >
                  <span>{label}</span>
                  <span
                    dir="ltr"
                    className="font-semibold tabular-nums text-foreground"
                  >
                    {value}
                  </span>
                </li>
              ))}
              <li className="flex justify-between gap-3 border-t border-border/70 pt-3 font-semibold text-foreground">
                <span>Total</span>
                <span dir="ltr" className="tabular-nums">
                  {money(total)}
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section className="bg-canvas px-4 py-8 sm:px-8 lg:py-10">
          <form
            className="mx-auto max-w-lg space-y-10 lg:ms-0"
            onSubmit={(e) => e.preventDefault()}
          >
            <fieldset className="space-y-5">
              <legend className="text-start text-xl font-semibold tracking-tight text-foreground">
                Delivery Details
              </legend>
              <div className="grid gap-4 sm:grid-cols-2">
                {DELIVERY_FIELDS.map((field) => (
                  <div
                    key={field.id}
                    className={cn(
                      "space-y-2",
                      field.id === "address" && "sm:col-span-2"
                    )}
                  >
                    <Label htmlFor={`checkout-04-${field.id}`}>
                      {field.label}
                    </Label>
                    <Input
                      id={`checkout-04-${field.id}`}
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
                className="grid gap-3"
              >
                <label
                  htmlFor="checkout-04-card"
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-[12px] border border-border/70 bg-card px-3 py-3 shadow-soft",
                    paymentMethod === "card" &&
                      "border-primary/40 ring-1 ring-primary/20"
                  )}
                >
                  <RadioGroupItem value="card" id="checkout-04-card" />
                  <span className="flex-1 text-sm font-medium">Card</span>
                  <span className="flex gap-1">
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
                  htmlFor="checkout-04-paypal"
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-[12px] border border-border/70 bg-card px-3 py-3 shadow-soft",
                    paymentMethod === "paypal" &&
                      "border-primary/40 ring-1 ring-primary/20"
                  )}
                >
                  <RadioGroupItem value="paypal" id="checkout-04-paypal" />
                  <span className="flex-1 text-sm font-medium">PayPal</span>
                  <img
                    src={assetSrc(paypalMark)}
                    alt="PayPal"
                    className="h-6"
                  />
                </label>
              </RadioGroup>

              {paymentMethod === "card" ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {CARD_FIELDS.map((field) => (
                    <div
                      key={field.id}
                      className={cn(
                        "space-y-2",
                        (field.id === "card-number" ||
                          field.id === "name-on-card") &&
                          "sm:col-span-2"
                      )}
                    >
                      <Label htmlFor={`checkout-04-${field.id}`}>
                        {field.label}
                      </Label>
                      <Input
                        id={`checkout-04-${field.id}`}
                        name={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        autoComplete={field.autoComplete}
                        dir="ltr"
                        required
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="rounded-[12px] bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
                  You&apos;ll confirm the charge on PayPal after submit.
                </p>
              )}
            </fieldset>

            <div className="flex items-start gap-3">
              <Checkbox
                id="checkout-04-billing"
                checked={billingSame}
                onCheckedChange={(v) => setBillingSame(v === true)}
                className="mt-0.5"
              />
              <Label
                htmlFor="checkout-04-billing"
                className="cursor-pointer text-sm font-normal text-muted-foreground"
              >
                Billing address is the same as shipping address
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={!cartItems.length}
            >
              Pay{" "}
              <span dir="ltr" className="tabular-nums">
                {money(total)}
              </span>
            </Button>
          </form>
        </section>
      </div>
    </main>
  )
}
