"use client"

import * as React from "react"
import { CreditCardIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import {
  CardCvcInput,
  CardExpiryInput,
  CardNumberInput,
  cardBrandLabel,
  detectCardBrand,
  isCardNumberComplete,
  type CardBrand,
} from "@sonojs/ui/components/payment-input"

export function PaymentInputGallery() {
  const [number, setNumber] = React.useState("4242424242424242")
  const [expiry, setExpiry] = React.useState("1228")
  const [cvc, setCvc] = React.useState("123")
  const [brand, setBrand] = React.useState<CardBrand>(() =>
    detectCardBrand("4242424242424242")
  )

  const ready = isCardNumberComplete(number) && expiry.length === 4 && cvc.length >= 3

  return (
    <div className="w-full max-w-md rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CreditCardIcon className="size-4" aria-hidden />
        </span>
        <div className="min-w-0 space-y-1">
          <h3 className="text-sm font-semibold tracking-tight text-foreground">
            Card checkout
          </h3>
          <p className="text-xs text-muted-foreground">
            Luhn + brand detection. Values stay raw digits.
          </p>
        </div>
        <Badge
          variant={ready ? "default" : "secondary"}
          className="ms-auto shrink-0 font-normal"
        >
          {ready ? cardBrandLabel(brand) : "Incomplete"}
        </Badge>
      </div>
      <div className="space-y-3">
        <CardNumberInput
          value={number}
          onValueChange={setNumber}
          onBrandChange={setBrand}
          aria-label="Card number"
        />
        <div className="grid grid-cols-2 gap-3">
          <CardExpiryInput
            value={expiry}
            onValueChange={setExpiry}
            aria-label="Expiry"
          />
          <CardCvcInput
            value={cvc}
            onValueChange={setCvc}
            brand={brand}
            aria-label="CVC"
          />
        </div>
      </div>
    </div>
  )
}
