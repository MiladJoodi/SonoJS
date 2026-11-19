import {
  CardNumberInput,
  IbanInput,
} from "@sonojs/ui/components/payment-input"

export function PaymentInputDisabled() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3 rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <CardNumberInput
        defaultValue="4242424242424242"
        disabled
        aria-label="Card number"
      />
      <IbanInput
        defaultValue="DE89370400440532013000"
        disabled
        aria-label="IBAN"
      />
    </div>
  )
}
