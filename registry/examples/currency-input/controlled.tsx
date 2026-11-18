"use client"

import * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { CurrencyInput } from "@sonojs/ui/components/currency-input"

export function CurrencyInputControlled() {
  const [value, setValue] = React.useState<number | null>(42)

  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <CurrencyInput
        currency="USD"
        locale="en-US"
        value={value}
        onValueChange={setValue}
        placeholder="0.00"
      />
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">
          {value == null ? "Empty" : `Number: ${value}`}
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setValue(null)}
        >
          Clear
        </Button>
      </div>
    </div>
  )
}
