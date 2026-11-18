import { CurrencyInput } from "@sonojs/ui/components/currency-input"

export function CurrencyInputDefault() {
  return (
    <CurrencyInput
      className="max-w-xs"
      currency="USD"
      locale="en-US"
      defaultValue={1250.5}
      placeholder="0.00"
    />
  )
}
