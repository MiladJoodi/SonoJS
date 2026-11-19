import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@sonojs/ui/components/field"
import {
  CardCvcInput,
  CardExpiryInput,
  CardNumberInput,
  IbanInput,
} from "@sonojs/ui/components/payment-input"

export function PaymentInputForm() {
  return (
    <div className="w-full max-w-md rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <FieldGroup className="gap-5">
        <Field>
          <FieldLabel htmlFor="pay-card">Card number</FieldLabel>
          <CardNumberInput id="pay-card" defaultValue="4242424242424242" />
          <FieldDescription>Digits only in form state.</FieldDescription>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel htmlFor="pay-exp">Expiry</FieldLabel>
            <CardExpiryInput id="pay-exp" defaultValue="1228" />
          </Field>
          <Field>
            <FieldLabel htmlFor="pay-cvc">CVC</FieldLabel>
            <CardCvcInput id="pay-cvc" defaultValue="123" />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="pay-iban">IBAN</FieldLabel>
          <IbanInput id="pay-iban" defaultValue="DE89370400440532013000" />
          <FieldDescription>
            Spaces are display-only; value is compact.
          </FieldDescription>
        </Field>
      </FieldGroup>
    </div>
  )
}
