"use client"

import * as React from "react"
import { LockIcon, ShieldCheckIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { cn } from "@/lib/utils"

import amexLogo from "./images/american-express.webp"
import masterLogo from "./images/master.webp"
import visaLogo from "./images/visa.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const BRAND = {
  visa: assetSrc(visaLogo),
  amex: assetSrc(amexLogo),
  master: assetSrc(masterLogo),
} as const

function BrandMark({ src }: { src: string }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-md bg-white px-1.5 py-0.5">
      <img src={src} alt="" className="h-4 w-auto object-contain" />
    </span>
  )
}

export default function PaymentForm({
  planName = "Premium",
  planBlurb = "Unlimited assets, cloud sync, and team workspaces for creative studios.",
  amount = "$49",
  className,
  ...props
}: React.ComponentProps<"section"> & {
  planName?: string
  planBlurb?: string
  amount?: string
}) {
  const baseId = React.useId()
  const [agreed, setAgreed] = React.useState(true)

  const nameId = `${baseId}-cardholder`
  const cardNumberId = `${baseId}-card-number`
  const expiryId = `${baseId}-expiry`
  const cvvId = `${baseId}-cvv`
  const termsId = `${baseId}-terms`

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas px-3 py-6 sm:px-4 sm:py-12 md:px-6 md:py-16 lg:px-10",
        className
      )}
      style={{ backgroundColor: "var(--canvas, #f3f3f4)" }}
      aria-labelledby={`${baseId}-heading`}
      {...props}
    >
      <div
        className="mx-auto grid w-full min-w-0 max-w-5xl overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft lg:grid-cols-2"
        style={{
          backgroundColor: "var(--card, #ffffff)",
          boxShadow:
            "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
        }}
      >
        {/* Always-dark editorial rail — stable in light + dark themes */}
        <div className="relative flex flex-col justify-between gap-8 border-b border-border/70 bg-zinc-950 px-5 py-7 text-zinc-50 sm:gap-10 sm:px-8 sm:py-10 lg:border-e lg:border-b-0">
          <div className="text-start">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-zinc-500 uppercase">
              Subscription
            </p>
            <h2
              id={`${baseId}-heading`}
              className="mt-3 text-3xl font-semibold tracking-tight sm:mt-4 sm:text-5xl"
            >
              {planName}
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-400 sm:mt-4 sm:text-base">
              {planBlurb}
            </p>
          </div>

          <div>
            <p
              dir="ltr"
              className="flex flex-wrap items-baseline gap-1 text-start"
            >
              <span className="text-4xl font-bold tracking-tight tabular-nums sm:text-6xl">
                {amount}
              </span>
              <span className="text-sm text-zinc-500">/ month</span>
            </p>
            <ul className="mt-5 space-y-2.5 text-sm text-zinc-400 sm:mt-6">
              <li className="flex items-center gap-2">
                <ShieldCheckIcon className="size-4 shrink-0 text-zinc-300" aria-hidden />
                <span>14-day money-back guarantee</span>
              </li>
              <li className="flex items-center gap-2">
                <LockIcon className="size-4 shrink-0 text-zinc-300" aria-hidden />
                <span>Cancel from Settings in one click</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-card px-4 py-6 sm:px-8 sm:py-10">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 sm:mb-6">
            <p className="text-sm font-semibold text-foreground">Card details</p>
            <div className="flex flex-wrap items-center gap-1.5" aria-hidden>
              <BrandMark src={BRAND.visa} />
              <BrandMark src={BRAND.amex} />
              <BrandMark src={BRAND.master} />
            </div>
          </div>

          <form
            className="space-y-4"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid gap-2 text-start">
              <Label htmlFor={nameId}>Name on card</Label>
              <Input
                id={nameId}
                name="cardholder-name"
                placeholder="Full name"
                autoComplete="cc-name"
                required
                className="h-[46px] shadow-none"
              />
            </div>
            <div className="grid gap-2 text-start">
              <Label htmlFor={cardNumberId}>Card number</Label>
              <Input
                id={cardNumberId}
                name="card-number"
                placeholder="ACCT-000035"
                autoComplete="cc-number"
                inputMode="numeric"
                required
                dir="ltr"
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
                <Label htmlFor={cvvId}>CVV</Label>
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

            <div className="flex items-start gap-3 pt-1">
              <Checkbox
                id={termsId}
                checked={agreed}
                onCheckedChange={(v) => setAgreed(v === true)}
                className="mt-0.5"
              />
              <Label
                htmlFor={termsId}
                className="cursor-pointer text-sm leading-snug font-normal text-muted-foreground"
              >
                I agree to the{" "}
                <a
                  href="#terms"
                  className="font-medium text-foreground underline-offset-4 hover:underline"
                >
                  Terms
                </a>{" "}
                and{" "}
                <a
                  href="#privacy"
                  className="font-medium text-foreground underline-offset-4 hover:underline"
                >
                  Privacy Policy
                </a>
                .
              </Label>
            </div>

            <Button
              type="submit"
              disabled={!agreed}
              className="mt-2 h-[46px] w-full text-base"
            >
              Subscribe · {amount}/mo
            </Button>
          </form>

          <p className="mt-5 text-center text-[11px] leading-relaxed text-muted-foreground sm:mt-6">
            Charged today. Renewal on the same day each month. Manage billing
            anytime.
          </p>
        </div>
      </div>
    </section>
  )
}
