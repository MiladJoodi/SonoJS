import { CardNumberInput } from "@sonojs/ui/components/payment-input"

export function PaymentInputCard() {
  return (
    <div className="w-full max-w-md rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <CardNumberInput
        defaultValue="4242424242424242"
        aria-label="Card number"
      />
    </div>
  )
}
