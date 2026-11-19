import { IbanInput } from "@sonojs/ui/components/payment-input"

export function PaymentInputIban() {
  return (
    <div className="w-full max-w-md rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <IbanInput
        defaultValue="DE89370400440532013000"
        aria-label="IBAN"
      />
    </div>
  )
}
