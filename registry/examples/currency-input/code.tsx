import { CurrencyInput } from "@sonojs/ui/components/currency-input"

export function CurrencyInputCode() {
  return (
    <CurrencyInput
      className="max-w-xs"
      currency="GBP"
      locale="en-GB"
      currencyDisplay="code"
      defaultValue={75}
      placeholder="0.00"
    />
  )
}
