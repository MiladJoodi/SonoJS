"use client"

import * as React from "react"

import { CurrencyInput } from "@sonojs/ui/components/currency-input"

export function CurrencyInputMinMax() {
  const [value, setValue] = React.useState<number | null>(25)

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <CurrencyInput
        currency="USD"
        locale="en-US"
        min={10}
        max={100}
        value={value}
        onValueChange={setValue}
        placeholder="10–100"
      />
      <p className="text-xs text-muted-foreground">
        Values outside 10–100 are clamped on commit.
      </p>
    </div>
  )
}
