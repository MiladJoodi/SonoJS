"use client"

import * as React from "react"

import { CurrencyInput } from "@sonojs/ui/components/currency-input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"

const PRESETS = [
  { id: "USD", currency: "USD", locale: "en-US", label: "US Dollar" },
  { id: "EUR", currency: "EUR", locale: "de-DE", label: "Euro" },
  { id: "GBP", currency: "GBP", locale: "en-GB", label: "British Pound" },
  { id: "IRR", currency: "IRR", locale: "fa-IR", label: "Iranian Rial" },
  { id: "SAR", currency: "SAR", locale: "ar-SA", label: "Saudi Riyal" },
  { id: "AED", currency: "AED", locale: "ar-AE", label: "UAE Dirham" },
  { id: "TRY", currency: "TRY", locale: "tr-TR", label: "Turkish Lira" },
  { id: "JPY", currency: "JPY", locale: "ja-JP", label: "Japanese Yen" },
  { id: "INR", currency: "INR", locale: "en-IN", label: "Indian Rupee" },
  { id: "CNY", currency: "CNY", locale: "zh-CN", label: "Chinese Yuan" },
] as const

export function CurrencyInputPopular() {
  const [presetId, setPresetId] = React.useState<string>("USD")
  const [value, setValue] = React.useState<number | null>(1250000)
  const preset = PRESETS.find((p) => p.id === presetId) ?? PRESETS[0]

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Select
        value={presetId}
        onValueChange={(next) => setPresetId(next)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Currency" />
        </SelectTrigger>
        <SelectContent>
          {PRESETS.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.label} ({item.currency})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <CurrencyInput
        key={preset.id}
        currency={preset.currency}
        locale={preset.locale}
        value={value}
        onValueChange={setValue}
        maximumFractionDigits={preset.currency === "JPY" || preset.currency === "IRR" ? 0 : undefined}
        minimumFractionDigits={preset.currency === "JPY" || preset.currency === "IRR" ? 0 : undefined}
        placeholder="0"
      />
      <p className="text-xs text-muted-foreground">
        Grouping updates as you type. Pass any ISO `currency` + matching `locale`.
      </p>
    </div>
  )
}
