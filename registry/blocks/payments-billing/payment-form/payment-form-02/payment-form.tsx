"use client"

import * as React from "react"
import {
  CheckIcon,
  ChevronRightIcon,
  LockIcon,
  MapPinIcon,
  TruckIcon,
} from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@sonojs/ui/components/radio-group"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

import amexLogo from "./images/american-express.webp"
import masterLogo from "./images/master.webp"
import paypalLogo from "./images/paypal.webp"
import visaLogo from "./images/visa.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const BRAND = {
  visa: assetSrc(visaLogo),
  amex: assetSrc(amexLogo),
  master: assetSrc(masterLogo),
  paypal: assetSrc(paypalLogo),
} as const

type Method = "card" | "paypal"

const STEPS = ["Cart", "Shipping", "Payment"] as const

function BrandMark({
  src,
  className,
}: {
  src: string
  className?: string
}) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-md bg-white px-1.5 py-0.5">
      <img src={src} alt="" className={cn("h-4 w-auto object-contain", className)} />
    </span>
  )
}

function SummaryRow({
  label,
  value,
  muted,
}: {
  label: string
  value: string
  muted?: boolean
}) {
  return (
    <li className="flex items-baseline justify-between gap-3 text-sm">
      <span className={muted ? "text-muted-foreground" : "text-foreground"}>
        {label}
      </span>
      <span
        dir="ltr"
        className="shrink-0 font-medium text-foreground tabular-nums"
      >
        {value}
      </span>
    </li>
  )
}

export default function PaymentForm({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const baseId = React.useId()
  const [method, setMethod] = React.useState<Method>("card")

  const cardNumberId = `${baseId}-card-number`
  const nameId = `${baseId}-name`
  const expiryId = `${baseId}-expiry`
  const cvvId = `${baseId}-cvv`

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
      <div className="mx-auto w-full min-w-0 max-w-6xl">
        <nav
          aria-label="Checkout progress"
          className="mb-6 flex flex-wrap items-center justify-start gap-1 text-sm sm:mb-10"
        >
          {STEPS.map((step, index) => {
            const done = index < 2
            const current = index === 2
            return (
              <React.Fragment key={step}>
                {index > 0 ? (
                  <ChevronRightIcon
                    className="icon-dir size-3.5 shrink-0 text-muted-foreground/60"
                    aria-hidden
                  />
                ) : null}
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
                    current && "bg-primary text-primary-foreground",
                    done && !current && "text-foreground",
                    !done && !current && "text-muted-foreground"
                  )}
                >
                  {done && !current ? (
                    <CheckIcon className="size-3 shrink-0" aria-hidden />
                  ) : null}
                  {step}
                </span>
              </React.Fragment>
            )
          })}
        </nav>

        {/* Receipt first in DOM = mobile-first order; desktop places form start / receipt end */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10">
          <aside className="min-w-0 lg:col-start-2 lg:row-start-1 lg:self-start lg:sticky lg:top-6">
            <div
              className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft"
              style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
              <div className="border-b border-border/70 bg-muted/40 px-4 py-3 text-start">
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Order receipt
                </p>
                <p dir="ltr" className="mt-0.5 text-sm font-semibold text-foreground">
                  #ORD-28491
                </p>
              </div>
              <ul className="space-y-3 p-4">
                <SummaryRow label="Subtotal" value="$72.00" muted />
                <SummaryRow label="Discount" value="$0.00" muted />
                <SummaryRow label="Shipping" value="$6.00" muted />
                <SummaryRow label="Tax" value="$5.00" muted />
                <Separator />
                <li className="flex items-baseline justify-between gap-3 pt-1">
                  <span className="text-sm font-semibold text-foreground">
                    Total due
                  </span>
                  <span
                    dir="ltr"
                    className="text-xl font-bold text-foreground tabular-nums"
                  >
                    $83.00
                  </span>
                </li>
              </ul>

              <div className="space-y-3 border-t border-border/70 p-4">
                <div className="flex gap-3 text-start">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPinIcon className="size-4" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Ship to
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-foreground">
                      Emily Johnson
                    </p>
                    <p className="text-sm break-words text-muted-foreground">
                      425 Park Ave, Unit 3C · San Francisco, CA 94107
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 text-start">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <TruckIcon className="size-4" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Delivery
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-foreground">
                      Express · Apr 10–11, 2026
                    </p>
                  </div>
                </div>
              </div>

              <p className="flex items-center justify-center gap-1.5 border-t border-border/70 bg-muted/20 px-4 py-3 text-[11px] text-muted-foreground">
                <LockIcon className="size-3 shrink-0" aria-hidden />
                Payments processed securely
              </p>
            </div>
          </aside>

          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            <h2
              id={`${baseId}-heading`}
              className="text-h3 text-start font-semibold tracking-tight text-foreground"
            >
              How would you like to pay?
            </h2>
            <p className="mt-2 text-start text-sm text-muted-foreground">
              Choose a method. Express shipping is already selected for this
              order.
            </p>

            <RadioGroup
              value={method}
              onValueChange={(v) => setMethod(v as Method)}
              className="mt-5 grid gap-3 sm:mt-6"
              aria-label="Payment method"
            >
              <label
                htmlFor={`${baseId}-card`}
                className={cn(
                  "group flex cursor-pointer gap-3 rounded-[12px] border bg-card p-3.5 shadow-soft transition-colors sm:gap-4 sm:p-4",
                  method === "card"
                    ? "border-primary ring-2 ring-primary/15"
                    : "border-border/70 hover:border-border"
                )}
              >
                <RadioGroupItem
                  value="card"
                  id={`${baseId}-card`}
                  className="mt-1 shrink-0"
                />
                <div className="min-w-0 flex-1 text-start">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-foreground">
                      Credit or debit card
                    </p>
                    <span className="flex flex-wrap items-center gap-1">
                      <BrandMark src={BRAND.visa} />
                      <BrandMark src={BRAND.amex} />
                      <BrandMark src={BRAND.master} />
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Instant confirmation · 3-D Secure when required
                  </p>
                </div>
              </label>

              <label
                htmlFor={`${baseId}-paypal`}
                className={cn(
                  "flex cursor-pointer gap-3 rounded-[12px] border bg-card p-3.5 shadow-soft transition-colors sm:gap-4 sm:p-4",
                  method === "paypal"
                    ? "border-primary ring-2 ring-primary/15"
                    : "border-border/70 hover:border-border"
                )}
              >
                <RadioGroupItem
                  value="paypal"
                  id={`${baseId}-paypal`}
                  className="mt-1 shrink-0"
                />
                <div className="min-w-0 flex-1 text-start">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-foreground">PayPal</p>
                    <BrandMark src={BRAND.paypal} className="h-5 max-w-[4.5rem]" />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Use your PayPal balance or linked cards
                  </p>
                </div>
              </label>
            </RadioGroup>

            <form
              className="mt-5 rounded-[12px] border border-border/70 bg-card p-4 shadow-soft sm:mt-6 sm:p-5"
              onSubmit={(event) => event.preventDefault()}
            >
              {method === "card" ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2 text-start sm:col-span-2">
                    <Label htmlFor={cardNumberId}>Card number</Label>
                    <Input
                      id={cardNumberId}
                      name="card-number"
                      placeholder="1234 5678 9012 3456"
                      autoComplete="cc-number"
                      inputMode="numeric"
                      required
                      dir="ltr"
                      className="h-[46px] shadow-none"
                    />
                  </div>
                  <div className="grid gap-2 text-start sm:col-span-2">
                    <Label htmlFor={nameId}>Name on card</Label>
                    <Input
                      id={nameId}
                      name="name-on-card"
                      placeholder="Jordan Lee"
                      autoComplete="cc-name"
                      required
                      className="h-[46px] shadow-none"
                    />
                  </div>
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
                    <Label htmlFor={cvvId}>Security code</Label>
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
              ) : (
                <p className="text-start text-sm text-muted-foreground">
                  Click pay to open PayPal in a secure window. Total charged:{" "}
                  <span dir="ltr" className="font-medium text-foreground tabular-nums">
                    $83.00
                  </span>
                  .
                </p>
              )}

              <Button
                type="submit"
                className="mt-5 h-[46px] w-full sm:w-auto sm:min-w-48"
              >
                {method === "card" ? "Place order · $83.00" : "Pay with PayPal"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
