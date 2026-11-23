"use client"

import * as React from "react"
import { BanknoteIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { CurrencyInput } from "@sonojs/ui/components/currency-input"

export function CurrencyInputGallery() {
  const [value, setValue] = React.useState<number | null>(49)

  return (
    <div className="w-full max-w-md rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <BanknoteIcon className="size-4" aria-hidden />
        </span>
        <div className="min-w-0 space-y-1">
          <h3 className="text-sm font-semibold tracking-tight text-foreground">
            List price
          </h3>
          <p className="text-xs text-muted-foreground">
            Stored as a number - shown with locale formatting.
          </p>
        </div>
        <Badge variant="secondary" className="ms-auto shrink-0 font-normal">
          {value == null ? "-" : `$${value.toFixed(2)}`}
        </Badge>
      </div>
      <CurrencyInput
        currency="USD"
        locale="en-US"
        value={value}
        onValueChange={setValue}
        placeholder="0.00"
      />
    </div>
  )
}
