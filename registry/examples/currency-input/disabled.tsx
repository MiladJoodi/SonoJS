import { CurrencyInput } from "@sonojs/ui/components/currency-input"

export function CurrencyInputDisabled() {
  return (
    <CurrencyInput
      className="max-w-xs"
      currency="USD"
      locale="en-US"
      defaultValue={89}
      disabled
    />
  )
}
