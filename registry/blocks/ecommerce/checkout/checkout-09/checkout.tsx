"use client"

import * as React from "react"
import {
  CheckIcon,
  ChevronLeftIcon,
  CreditCardIcon,
  MapPinIcon,
  PackageIcon,
  ShoppingBagIcon,
  TruckIcon,
} from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@sonojs/ui/components/card"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@sonojs/ui/components/field"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@sonojs/ui/components/radio-group"
import { cn } from "@/lib/utils"

import watchImg from "./images/watch.webp"
import walletImg from "./images/wallet.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const STEPS = [
  { id: 1, label: "Shipping" },
  { id: 2, label: "Payment" },
  { id: 3, label: "Review" },
] as const

const LINE_ITEMS = [
  {
    name: "Minimalist Watch",
    detail: "Color: Midnight Black",
    qty: 1,
    unitPrice: 129,
    image: assetSrc(watchImg),
    alt: "Minimalist watch",
  },
  {
    name: "Leather Wallet",
    detail: "Color: Classic Brown",
    qty: 2,
    unitPrice: 45,
    image: assetSrc(walletImg),
    alt: "Leather wallet",
  },
] as const

const SUBTOTAL = LINE_ITEMS.reduce(
  (sum, item) => sum + item.unitPrice * item.qty,
  0
)
const TAX = 18.62

function CheckoutStepper({ step }: { step: number }) {
  return (
    <nav aria-label="Checkout progress" className="mb-10 flex justify-center">
      <ol className="relative flex w-full max-w-2xl items-start">
        <li
          className="pointer-events-none absolute inset-s-0 inset-e-0 top-4 z-0 h-0.5 -translate-y-1/2 bg-border/70"
          aria-hidden
        />
        {STEPS.map((s) => {
          const done = step > s.id
          const current = step === s.id
          const active = step >= s.id
          return (
            <li
              key={s.id}
              className="relative z-10 flex flex-1 flex-col items-center gap-2"
            >
              <span
                className={cn(
                  "flex size-8 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "border-2 border-border/70 bg-card text-muted-foreground"
                )}
                aria-current={current ? "step" : undefined}
              >
                {done ? (
                  <CheckIcon className="size-4" aria-hidden />
                ) : (
                  s.id
                )}
              </span>
              <span
                className={cn(
                  "text-xs font-medium",
                  active ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {s.label}
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

function OrderSummary({
  shippingMethod,
}: {
  shippingMethod: string
}) {
  const shippingCost = shippingMethod === "express" ? 15 : 0
  const total = SUBTOTAL + shippingCost + TAX

  return (
    <Card className="sticky top-8 border-border/70 shadow-soft">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <ShoppingBagIcon className="size-5" aria-hidden />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col gap-4">
          <ul className="flex flex-col gap-4 border-b border-border/70 py-4">
            {LINE_ITEMS.map((item) => (
              <li key={item.name} className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="size-16 shrink-0 rounded-md object-cover"
                />
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.detail}</p>
                  <div className="mt-2 flex w-full items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Qty: {item.qty}
                    </span>
                    <span className="text-sm font-semibold">
                      ${item.unitPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-2 border-b border-border/70 pb-4 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>${SUBTOTAL.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax (8.5%)</span>
              <span>${TAX.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="font-semibold">Total</span>
            <span className="text-xl font-semibold">${total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Checkout09() {
  const [step, setStep] = React.useState(1)
  const [shippingMethod, setShippingMethod] = React.useState("standard")
  const [paymentMethod, setPaymentMethod] = React.useState("card")
  const [saveAddress, setSaveAddress] = React.useState(false)
  const [sameBilling, setSameBilling] = React.useState(true)

  return (
    <div className="min-h-svh bg-canvas px-4 py-12 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-center text-3xl font-semibold tracking-tight">
          Checkout
        </h1>

        <CheckoutStepper step={step} />

        <div className="flex flex-col items-start gap-8 lg:flex-row">
          <div className="w-full lg:w-2/3">
            {step === 1 ? (
              <div className="flex flex-col gap-8">
                <Card className="border-border/70 shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <MapPinIcon className="size-5 text-primary" aria-hidden />
                      Shipping Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FieldGroup className="gap-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <Field>
                          <FieldLabel htmlFor="checkout-09-first">
                            First Name
                          </FieldLabel>
                          <Input
                            id="checkout-09-first"
                            placeholder="John"
                            autoComplete="given-name"
                          />
                        </Field>
                        <Field>
                          <FieldLabel htmlFor="checkout-09-last">
                            Last Name
                          </FieldLabel>
                          <Input
                            id="checkout-09-last"
                            placeholder="Doe"
                            autoComplete="family-name"
                          />
                        </Field>
                      </div>
                      <Field>
                        <FieldLabel htmlFor="checkout-09-street">
                          Street Address
                        </FieldLabel>
                        <Input
                          id="checkout-09-street"
                          placeholder="123 Main St"
                          autoComplete="street-address"
                        />
                      </Field>
                      <div className="grid gap-4 md:grid-cols-3">
                        <Field>
                          <FieldLabel htmlFor="checkout-09-city">City</FieldLabel>
                          <Input
                            id="checkout-09-city"
                            placeholder="San Francisco"
                            autoComplete="address-level2"
                          />
                        </Field>
                        <Field>
                          <FieldLabel htmlFor="checkout-09-state">
                            State / Province
                          </FieldLabel>
                          <Input
                            id="checkout-09-state"
                            placeholder="CA"
                            autoComplete="address-level1"
                          />
                        </Field>
                        <Field>
                          <FieldLabel htmlFor="checkout-09-zip">
                            ZIP / Postal Code
                          </FieldLabel>
                          <Input
                            id="checkout-09-zip"
                            placeholder="94105"
                            autoComplete="postal-code"
                          />
                        </Field>
                      </div>
                      <Field>
                        <FieldLabel htmlFor="checkout-09-country">
                          Country
                        </FieldLabel>
                        <Input
                          id="checkout-09-country"
                          defaultValue="United States"
                          autoComplete="country-name"
                        />
                      </Field>
                      <div className="flex items-center gap-3 pt-2">
                        <Checkbox
                          id="checkout-09-save-address"
                          checked={saveAddress}
                          onCheckedChange={(v) => setSaveAddress(v === true)}
                        />
                        <Label
                          htmlFor="checkout-09-save-address"
                          className="cursor-pointer font-normal"
                        >
                          Save this address for future orders
                        </Label>
                      </div>
                    </FieldGroup>
                  </CardContent>
                </Card>

                <Card className="border-border/70 shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <TruckIcon className="size-5 text-primary" aria-hidden />
                      Shipping Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={shippingMethod}
                      onValueChange={setShippingMethod}
                      className="flex flex-col gap-3"
                    >
                      <label
                        htmlFor="checkout-09-shipping-standard"
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-lg border border-border/70 p-4 transition-colors",
                          shippingMethod === "standard" &&
                            "border-primary bg-primary/5"
                        )}
                      >
                        <RadioGroupItem
                          value="standard"
                          id="checkout-09-shipping-standard"
                        />
                        <span className="flex w-full items-center justify-between gap-3">
                          <span className="flex flex-col">
                            <span className="text-sm font-semibold">
                              Standard Shipping
                            </span>
                            <span className="text-xs text-muted-foreground">
                              3–5 business days
                            </span>
                          </span>
                          <span className="text-sm font-semibold">Free</span>
                        </span>
                      </label>

                      <label
                        htmlFor="checkout-09-shipping-express"
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-lg border border-border/70 p-4 transition-colors",
                          shippingMethod === "express" &&
                            "border-primary bg-primary/5"
                        )}
                      >
                        <RadioGroupItem
                          value="express"
                          id="checkout-09-shipping-express"
                        />
                        <span className="flex w-full items-center justify-between gap-3">
                          <span className="flex flex-col">
                            <span className="text-sm font-semibold">
                              Express Delivery
                            </span>
                            <span className="text-xs text-muted-foreground">
                              1–2 business days
                            </span>
                          </span>
                          <span className="text-sm font-semibold">$15.00</span>
                        </span>
                      </label>
                    </RadioGroup>
                  </CardContent>
                </Card>

                <div className="flex w-full justify-end">
                  <Button type="button" onClick={() => setStep(2)}>
                    Continue to Payment
                  </Button>
                </div>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="flex flex-col gap-8">
                <Card className="border-border/70 shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <CreditCardIcon
                        className="size-5 text-primary"
                        aria-hidden
                      />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="mb-6 flex flex-col gap-3"
                    >
                      <label
                        htmlFor="checkout-09-payment-card"
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-lg border border-border/70 p-4 transition-colors",
                          paymentMethod === "card" &&
                            "border-primary bg-primary/5"
                        )}
                      >
                        <RadioGroupItem
                          value="card"
                          id="checkout-09-payment-card"
                        />
                        <span className="text-sm font-semibold">Credit Card</span>
                      </label>

                      <label
                        htmlFor="checkout-09-payment-paypal"
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-lg border border-border/70 p-4 transition-colors",
                          paymentMethod === "paypal" &&
                            "border-primary bg-primary/5"
                        )}
                      >
                        <RadioGroupItem
                          value="paypal"
                          id="checkout-09-payment-paypal"
                        />
                        <span className="text-sm font-semibold">PayPal</span>
                      </label>
                    </RadioGroup>

                    {paymentMethod === "card" ? (
                      <FieldGroup className="gap-4">
                        <Field>
                          <FieldLabel htmlFor="checkout-09-cardholder">
                            Cardholder Name
                          </FieldLabel>
                          <Input
                            id="checkout-09-cardholder"
                            placeholder="John Doe"
                            autoComplete="cc-name"
                          />
                        </Field>
                        <Field>
                          <FieldLabel htmlFor="checkout-09-card-number">
                            Card Number
                          </FieldLabel>
                          <Input
                            id="checkout-09-card-number"
                            placeholder="0000 0000 0000 0000"
                            autoComplete="cc-number"
                            inputMode="numeric"
                          />
                        </Field>
                        <div className="grid gap-4 md:grid-cols-2">
                          <Field>
                            <FieldLabel htmlFor="checkout-09-exp">
                              Expiration Date
                            </FieldLabel>
                            <Input
                              id="checkout-09-exp"
                              placeholder="MM/YY"
                              autoComplete="cc-exp"
                            />
                          </Field>
                          <Field>
                            <FieldLabel htmlFor="checkout-09-cvc">
                              CVC
                            </FieldLabel>
                            <Input
                              id="checkout-09-cvc"
                              placeholder="123"
                              autoComplete="cc-csc"
                              inputMode="numeric"
                            />
                          </Field>
                        </div>
                      </FieldGroup>
                    ) : (
                      <div className="rounded-lg border border-border/70 bg-muted/40 p-6 text-center">
                        <p className="text-sm text-muted-foreground">
                          You will be redirected to PayPal to complete your
                          purchase securely.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-border/70 shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-base">Billing Address</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="checkout-09-same-address"
                        checked={sameBilling}
                        onCheckedChange={(v) => setSameBilling(v === true)}
                      />
                      <Label
                        htmlFor="checkout-09-same-address"
                        className="cursor-pointer font-normal"
                      >
                        Same as shipping address
                      </Label>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex w-full justify-between gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setStep(1)}
                  >
                    <ChevronLeftIcon className="size-4 icon-dir" aria-hidden />
                    Back to Shipping
                  </Button>
                  <Button type="button" onClick={() => setStep(3)}>
                    Review Order
                  </Button>
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="flex flex-col gap-8">
                <Card className="border-border/70 bg-muted/30 shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <PackageIcon className="size-5 text-primary" aria-hidden />
                      Order Review
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid w-full gap-6 sm:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold">Shipping To</p>
                          <Button
                            type="button"
                            variant="link"
                            size="sm"
                            className="h-auto px-0"
                            onClick={() => setStep(1)}
                          >
                            Edit
                          </Button>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>John Doe</p>
                          <p>123 Main St</p>
                          <p>San Francisco, CA 94105</p>
                          <p>United States</p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold">Payment Method</p>
                          <Button
                            type="button"
                            variant="link"
                            size="sm"
                            className="h-auto px-0"
                            onClick={() => setStep(2)}
                          >
                            Edit
                          </Button>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>
                            {paymentMethod === "card"
                              ? "Visa ending in 4242"
                              : "PayPal account"}
                          </p>
                          {paymentMethod === "card" ? (
                            <p>Exp: 12/28</p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex w-full justify-between gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setStep(2)}
                  >
                    <ChevronLeftIcon className="size-4 icon-dir" aria-hidden />
                    Back to Payment
                  </Button>
                  <Button type="button" size="lg">
                    Place Order
                  </Button>
                </div>
              </div>
            ) : null}
          </div>

          <div className="w-full lg:w-1/3">
            <OrderSummary shippingMethod={shippingMethod} />
          </div>
        </div>
      </div>
    </div>
  )
}
