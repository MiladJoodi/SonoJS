"use client"

import * as React from "react"

import {
  CardNumberInput,
  cardBrandLabel,
  type CardBrand,
} from "@sonojs/ui/components/payment-input"

const SAMPLES: { label: string; value: string }[] = [
  { label: "Visa", value: "4242424242424242" },
  { label: "Mastercard", value: "5555555555554444" },
  { label: "Amex", value: "378282246310005" },
]

export function PaymentInputBrands() {
  const [brand, setBrand] = React.useState<CardBrand>("visa")
  const [value, setValue] = React.useState(SAMPLES[0]!.value)

  return (
    <div className="flex w-full max-w-md flex-col gap-3 rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Sample cards">
        {SAMPLES.map((s) => {
          const selected = value === s.value
          return (
            <button
              key={s.label}
              type="button"
              aria-pressed={selected}
              className={
                selected
                  ? "cursor-pointer rounded-md border border-primary bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground shadow-xs"
                  : "cursor-pointer rounded-md border border-border/70 bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted"
              }
              onClick={() => setValue(s.value)}
            >
              {s.label}
            </button>
          )
        })}
      </div>
      <CardNumberInput
        value={value}
        onValueChange={setValue}
        onBrandChange={setBrand}
        aria-label="Card number"
      />
      <p className="text-xs text-muted-foreground">
        Detected: {cardBrandLabel(brand)}
      </p>
    </div>
  )
}
