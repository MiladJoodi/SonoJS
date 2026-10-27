"use client"

import * as React from "react"
import {
  Building2Icon,
  CheckIcon,
  CreditCardIcon,
  LockIcon,
  WalletIcon,
} from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { cn } from "@/lib/utils"

type PaymentTab = "card" | "paypal" | "bank"

const METHODS: {
  id: PaymentTab
  label: string
  hint: string
  icon: typeof CreditCardIcon
}[] = [
  {
    id: "card",
    label: "Card",
    hint: "Visa, Mastercard, Amex",
    icon: CreditCardIcon,
  },
  {
    id: "paypal",
    label: "PayPal",
    hint: "Pay with balance",
    icon: WalletIcon,
  },
  {
    id: "bank",
    label: "Bank",
    hint: "Wire / ACH",
    icon: Building2Icon,
  },
]

function BankRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-border/50 py-3 text-sm last:border-b-0">
      <dt className="shrink-0 text-muted-foreground">{label}</dt>
      <dd
        dir="ltr"
        className="min-w-0 text-end font-semibold break-all text-foreground tabular-nums"
      >
        {value}
      </dd>
    </div>
  )
}

function PayPalMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn("size-5 shrink-0", className)}
      fill="currentColor"
      aria-hidden
    >
      <path d="M7.5 20.5h2.1c.5 0 .9-.3 1-.8l.5-3.2c.1-.5.5-.8 1-.8h1.3c2.6 0 4.6-1.1 5.2-4.3.3-1.3.1-2.3-.5-3-.7-.8-1.9-1.2-3.5-1.2H9.4c-.5 0-.9.3-1 .8L6.3 19.7c-.1.4.2.8.7.8z" />
    </svg>
  )
}

export default function PaymentForm({
  amount = "$49.99",
  merchant = "Sono Studio",
  className,
  ...props
}: React.ComponentProps<"section"> & {
  amount?: string
  merchant?: string
}) {
  const baseId = React.useId()
  const [method, setMethod] = React.useState<PaymentTab>("card")
  const [sameAsShipping, setSameAsShipping] = React.useState(true)

  const cardNumberId = `${baseId}-card-number`
  const nameId = `${baseId}-name`
  const expiryId = `${baseId}-expiry`
  const cvvId = `${baseId}-cvv`
  const billingId = `${baseId}-billing`

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas px-3 py-6 sm:px-4 sm:py-12 md:px-8 md:py-16",
        className
      )}
      style={{ backgroundColor: "var(--canvas, #f3f3f4)" }}
      aria-labelledby={`${baseId}-heading`}
      {...props}
    >
      <div className="mx-auto w-full min-w-0 max-w-md">
        <div
          className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft"
          style={{
            backgroundColor: "var(--card, #ffffff)",
            boxShadow:
              "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
          }}
        >
          {/* Always-dark terminal chrome (stable in light + dark themes) */}
          <div className="relative overflow-hidden bg-zinc-950 px-4 py-5 text-zinc-50 sm:px-6 sm:py-7">
            <div
              className="pointer-events-none absolute -end-8 -top-10 size-40 rounded-full bg-blue-500/35 blur-2xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -start-6 bottom-0 size-28 rounded-full bg-blue-400/20 blur-xl"
              aria-hidden
            />
            <div className="relative text-start">
              <p className="text-[11px] font-medium tracking-[0.16em] text-zinc-400 uppercase">
                Paying {merchant}
              </p>
              <h2
                id={`${baseId}-heading`}
                dir="ltr"
                className="mt-2 text-3xl font-semibold tracking-tight tabular-nums"
              >
                {amount}
              </h2>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-zinc-400">
                <LockIcon className="size-3.5 shrink-0" aria-hidden />
                <span>End-to-end encrypted · Stripe</span>
              </p>
            </div>

            <div className="relative mt-5 rounded-[12px] border border-white/15 bg-white/10 p-3.5 backdrop-blur-sm sm:mt-6 sm:p-4">
              <div className="flex items-center justify-between gap-3">
                <CreditCardIcon className="size-5 opacity-80 sm:size-6" aria-hidden />
                <span className="text-[10px] font-bold tracking-widest text-zinc-300 uppercase">
                  Debit / Credit
                </span>
              </div>
              <p
                dir="ltr"
                className="mt-4 overflow-hidden font-mono text-xs tracking-[0.18em] text-zinc-100 tabular-nums sm:mt-5 sm:text-sm sm:tracking-[0.2em]"
              >
                •••• •••• •••• 4242
              </p>
              <div className="mt-3 flex justify-between gap-3 text-[10px] text-zinc-400 sm:mt-4 sm:text-[11px]">
                <span>CARDHOLDER</span>
                <span dir="ltr">EXP 12/28</span>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <p className="mb-3 text-start text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Payment method
            </p>
            <div
              role="tablist"
              aria-label="Payment method"
              className="grid grid-cols-3 gap-1.5 sm:gap-2"
            >
              {METHODS.map((item) => {
                const active = method === item.id
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    id={`${baseId}-${item.id}-tab`}
                    aria-controls={`${baseId}-${item.id}-panel`}
                    onClick={() => setMethod(item.id)}
                    className={cn(
                      "relative flex min-h-16 cursor-pointer flex-col items-start gap-1 rounded-[12px] border px-2 py-2.5 pe-5 text-start outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring sm:min-h-20 sm:px-3",
                      active
                        ? "border-primary bg-primary/5 text-foreground"
                        : "border-border/70 bg-background text-muted-foreground hover:border-border hover:bg-muted/40 hover:text-foreground"
                    )}
                  >
                    {active ? (
                      <span className="absolute end-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <CheckIcon className="size-2.5" aria-hidden />
                      </span>
                    ) : null}
                    <Icon className="size-4 shrink-0" aria-hidden />
                    <span className="text-xs font-semibold sm:text-sm">
                      {item.label}
                    </span>
                    <span className="hidden text-[10px] leading-tight sm:block">
                      {item.hint}
                    </span>
                  </button>
                )
              })}
            </div>

            {method === "card" ? (
              <form
                id={`${baseId}-card-panel`}
                role="tabpanel"
                aria-labelledby={`${baseId}-card-tab`}
                className="mt-5 space-y-4 sm:mt-6"
                onSubmit={(event) => event.preventDefault()}
              >
                <div className="grid gap-2 text-start">
                  <Label htmlFor={cardNumberId}>Card number</Label>
                  <Input
                    id={cardNumberId}
                    name="card-number"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="1234 5678 9012 3456"
                    required
                    dir="ltr"
                    className="h-[46px] font-mono tracking-wide shadow-none"
                  />
                </div>
                <div className="grid gap-2 text-start">
                  <Label htmlFor={nameId}>Name on card</Label>
                  <Input
                    id={nameId}
                    name="name-on-card"
                    autoComplete="cc-name"
                    placeholder="Jordan Lee"
                    required
                    className="h-[46px] shadow-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  <div className="grid min-w-0 gap-2 text-start">
                    <Label htmlFor={expiryId}>Expiry</Label>
                    <Input
                      id={expiryId}
                      name="expiry-date"
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      placeholder="MM/YY"
                      required
                      dir="ltr"
                      className="h-[46px] shadow-none"
                    />
                  </div>
                  <div className="grid min-w-0 gap-2 text-start">
                    <Label htmlFor={cvvId}>CVV</Label>
                    <Input
                      id={cvvId}
                      name="cvv"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      placeholder="123"
                      required
                      dir="ltr"
                      className="h-[46px] shadow-none"
                    />
                  </div>
                </div>
                <div className="flex items-start gap-3 pt-1">
                  <Checkbox
                    id={billingId}
                    checked={sameAsShipping}
                    onCheckedChange={(v) => setSameAsShipping(v === true)}
                    className="mt-0.5"
                  />
                  <Label
                    htmlFor={billingId}
                    className="cursor-pointer text-sm leading-snug font-normal text-muted-foreground"
                  >
                    Billing address matches shipping
                  </Label>
                </div>
                <Button type="submit" className="mt-2 h-[46px] w-full text-base">
                  Pay {amount}
                </Button>
              </form>
            ) : null}

            {method === "paypal" ? (
              <div
                id={`${baseId}-paypal-panel`}
                role="tabpanel"
                aria-labelledby={`${baseId}-paypal-tab`}
                className="mt-5 space-y-4 sm:mt-6"
              >
                <p className="text-start text-sm text-muted-foreground">
                  You&apos;ll finish on PayPal. We never see your password.
                </p>
                <Button
                  type="button"
                  variant="secondary"
                  className="h-[46px] w-full border-transparent font-semibold shadow-none hover:brightness-[0.97] hover:saturate-125"
                  style={{ backgroundColor: "#ffc439", color: "#003087" }}
                >
                  <PayPalMark />
                  Continue with PayPal
                </Button>
              </div>
            ) : null}

            {method === "bank" ? (
              <div
                id={`${baseId}-bank-panel`}
                role="tabpanel"
                aria-labelledby={`${baseId}-bank-tab`}
                className="mt-5 sm:mt-6"
              >
                <p className="mb-3 text-start text-sm text-muted-foreground">
                  Transfer the exact amount. Orders unlock after settlement.
                </p>
                <dl className="rounded-[12px] border border-border/70 bg-muted/30 px-3 sm:px-4">
                  <BankRow label="Account name" value="ABC Pvt Ltd" />
                  <BankRow label="Bank" value="ABC Bank" />
                  <BankRow label="Account #" value="XXXX XXXX 8561" />
                  <BankRow label="Routing / IFSC" value="ABC0005618" />
                  <BankRow label="Amount" value={amount} />
                </dl>
              </div>
            ) : null}

            <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-border/70 pt-4 text-[11px] text-muted-foreground sm:mt-6">
              <li className="inline-flex items-center gap-1">
                <LockIcon className="size-3 shrink-0" aria-hidden />
                256-bit TLS
              </li>
              <li>PCI DSS</li>
              <li>No card storage</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
