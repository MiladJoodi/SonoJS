"use client"

import * as React from "react"

import {
  CardCvcInput,
  CardExpiryInput,
  type CardBrand,
} from "@sonojs/ui/components/payment-input"

export function PaymentInputExpiryCvc() {
  const [expiry, setExpiry] = React.useState("1228")
  const [cvc, setCvc] = React.useState("123")
  const brand: CardBrand = "visa"

  return (
    <div className="w-full max-w-md rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
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
  )
}
