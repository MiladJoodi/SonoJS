import { CurrencyInput } from "@sonojs/ui/components/currency-input"

export function CurrencyInputEur() {
  return (
    <CurrencyInput
      className="max-w-xs"
      currency="EUR"
      locale="de-DE"
      defaultValue={1999.99}
      placeholder="0,00"
    />
  )
}
