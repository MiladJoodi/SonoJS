import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@sonojs/ui/components/field"
import { CurrencyInput } from "@sonojs/ui/components/currency-input"

export function CurrencyInputForm() {
  return (
    <FieldGroup className="w-full max-w-sm">
      <Field>
        <FieldLabel htmlFor="budget">Monthly budget</FieldLabel>
        <CurrencyInput
          id="budget"
          currency="USD"
          locale="en-US"
          defaultValue={500}
          placeholder="0.00"
        />
        <FieldDescription>
          Used for spend alerts. Value is a number in your form state.
        </FieldDescription>
      </Field>
    </FieldGroup>
  )
}
