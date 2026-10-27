"use client"

import * as React from "react"
import {
  Building2Icon,
  CheckIcon,
  CreditCardIcon,
  SparklesIcon,
  WalletIcon,
} from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { cn } from "@/lib/utils"

type PaymentTab = "card" | "paypal" | "bank"

const TABS: {
  id: PaymentTab
  label: string
  shortLabel: string
  icon: typeof CreditCardIcon
}[] = [
  { id: "card", label: "Card", shortLabel: "Card", icon: CreditCardIcon },
  { id: "paypal", label: "PayPal", shortLabel: "PayPal", icon: WalletIcon },
  { id: "bank", label: "Invoice", shortLabel: "Bank", icon: Building2Icon },
]

const INCLUDED = [
  "Unlimited projects & seats",
  "Priority support (4h SLA)",
  "SSO + audit logs",
  "Cancel anytime",
] as const

function BankRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-0.5 border-b border-border/60 py-3 last:border-b-0 sm:grid-cols-[7.5rem_1fr] sm:items-center sm:gap-4">
      <dt className="text-start text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {label}
      </dt>
      <dd
        dir="ltr"
        className="min-w-0 text-start text-sm font-semibold break-all text-foreground tabular-nums"
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
  planName = "Business",
  amount = "$99",
  cadence = "/mo",
  className,
  ...props
}: React.ComponentProps<"section"> & {
  planName?: string
  amount?: string
  cadence?: string
}) {
  const baseId = React.useId()
  const [tab, setTab] = React.useState<PaymentTab>("card")
  const [saveCard, setSaveCard] = React.useState(true)

  const cardNumberId = `${baseId}-card-number`
  const nameId = `${baseId}-name`
  const expiryId = `${baseId}-expiry`
  const cvvId = `${baseId}-cvv`
  const saveId = `${baseId}-save`

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
      <div className="mx-auto w-full min-w-0 max-w-lg">
        <div
          className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft"
          style={{
            backgroundColor: "var(--card, #ffffff)",
            boxShadow:
              "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
          }}
        >
          <div className="relative overflow-hidden border-b border-primary/20 bg-primary px-4 py-5 text-primary-foreground sm:px-6 sm:py-6">
            <SparklesIcon
              className="pointer-events-none absolute -end-2 -top-2 size-24 opacity-20"
              aria-hidden
            />
            <div className="relative flex flex-wrap items-end justify-between gap-3 text-start sm:gap-4">
              <div className="min-w-0">
                <p className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase">
                  Upgrade
                </p>
                <h2
                  id={`${baseId}-heading`}
                  className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl"
                >
                  {planName} plan
                </h2>
                <p className="mt-1 text-sm text-primary-foreground/80">
                  Billed monthly · prorated today
                </p>
              </div>
              <p dir="ltr" className="shrink-0 text-end">
                <span className="text-3xl font-bold tabular-nums">{amount}</span>
                <span className="ms-1 text-sm text-primary-foreground/75">
                  {cadence}
                </span>
              </p>
            </div>
            <ul className="relative mt-4 grid gap-2 sm:mt-5 sm:grid-cols-2">
              {INCLUDED.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-primary-foreground/90"
                >
                  <CheckIcon
                    className="mt-0.5 size-3.5 shrink-0"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 sm:p-6">
            <div
              role="tablist"
              aria-label="Payment method"
              className="flex rounded-[12px] border border-border/70 bg-muted/40 p-1"
            >
              {TABS.map((item) => {
                const active = tab === item.id
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    id={`${baseId}-${item.id}-tab`}
                    aria-controls={`${baseId}-${item.id}-panel`}
                    onClick={() => setTab(item.id)}
                    className={cn(
                      "flex min-h-11 min-w-0 flex-1 cursor-pointer items-center justify-center gap-1 rounded-[10px] px-1.5 py-2 text-xs font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring sm:gap-1.5 sm:px-2 sm:text-sm",
                      active
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className="size-3.5 shrink-0 sm:size-4" aria-hidden />
                    <span className="truncate sm:hidden">{item.shortLabel}</span>
                    <span className="hidden truncate sm:inline">{item.label}</span>
                  </button>
                )
              })}
            </div>

            {tab === "card" ? (
              <form
                id={`${baseId}-card-panel`}
                role="tabpanel"
                aria-labelledby={`${baseId}-card-tab`}
                className="mt-5 space-y-4"
                onSubmit={(event) => event.preventDefault()}
              >
                <div className="grid gap-2 text-start">
                  <Label htmlFor={cardNumberId}>Card number</Label>
                  <Input
                    id={cardNumberId}
                    name="card-number"
                    placeholder="•••• •••• •••• ••••"
                    autoComplete="cc-number"
                    inputMode="numeric"
                    required
                    dir="ltr"
                    className="h-[46px] shadow-none"
                  />
                </div>
                <div className="grid gap-2 text-start">
                  <Label htmlFor={nameId}>Cardholder</Label>
                  <Input
                    id={nameId}
                    name="name-on-card"
                    placeholder="Alex Rivera"
                    autoComplete="cc-name"
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
                      placeholder="MM/YY"
                      autoComplete="cc-exp"
                      required
                      dir="ltr"
                      className="h-[46px] shadow-none"
                    />
                  </div>
                  <div className="grid min-w-0 gap-2 text-start">
                    <Label htmlFor={cvvId}>CVC</Label>
                    <Input
                      id={cvvId}
                      name="cvv"
                      placeholder="123"
                      autoComplete="cc-csc"
                      inputMode="numeric"
                      required
                      dir="ltr"
                      className="h-[46px] shadow-none"
                    />
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Checkbox
                    id={saveId}
                    checked={saveCard}
                    onCheckedChange={(v) => setSaveCard(v === true)}
                    className="mt-0.5"
                  />
                  <Label
                    htmlFor={saveId}
                    className="cursor-pointer text-sm leading-snug font-normal text-muted-foreground"
                  >
                    Save for renewals (encrypted vault)
                  </Label>
                </div>
                <Button type="submit" className="h-[46px] w-full">
                  {`Start ${planName} · ${amount}${cadence}`}
                </Button>
              </form>
            ) : null}

            {tab === "paypal" ? (
              <div
                id={`${baseId}-paypal-panel`}
                role="tabpanel"
                aria-labelledby={`${baseId}-paypal-tab`}
                className="mt-5 space-y-4"
              >
                <p className="text-start text-sm text-muted-foreground">
                  We&apos;ll redirect you to PayPal, then bring you back to your
                  workspace.
                </p>
                <Button
                  type="button"
                  variant="secondary"
                  className="h-[46px] w-full border-transparent font-semibold shadow-none hover:brightness-[0.97] hover:saturate-125"
                  style={{ backgroundColor: "#ffc439", color: "#003087" }}
                >
                  <PayPalMark />
                  Subscribe with PayPal
                </Button>
              </div>
            ) : null}

            {tab === "bank" ? (
              <div
                id={`${baseId}-bank-panel`}
                role="tabpanel"
                aria-labelledby={`${baseId}-bank-tab`}
                className="mt-5"
              >
                <p className="mb-2 text-start text-sm text-muted-foreground">
                  We email a PDF invoice. Access unlocks after the first
                  cleared payment.
                </p>
                <dl className="rounded-[12px] border border-dashed border-border bg-muted/25 px-3 sm:px-4">
                  <BankRow label="Payee" value="Sono Labs Inc." />
                  <BankRow label="Bank" value="First National" />
                  <BankRow label="Account" value="**** 4821" />
                  <BankRow label="Routing" value="021000021" />
                  <BankRow label="Reference" value="INV-BUS-099" />
                </dl>
              </div>
            ) : null}

            <p className="mt-5 text-center text-[11px] text-muted-foreground">
              Prices exclude tax. Change plans from Billing anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
