"use client"

import * as React from "react"
import { CreditCardIcon, PlusIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@sonojs/ui/components/dialog"
import { Field, FieldGroup, FieldLabel } from "@sonojs/ui/components/field"
import { Input } from "@sonojs/ui/components/input"
import { cn } from "@/lib/utils"

import amexLogo from "./images/american-express.webp"
import masterLogo from "./images/master.webp"
import visaLogo from "./images/visa.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const BRAND = {
  visa: assetSrc(visaLogo),
  master: assetSrc(masterLogo),
  amex: assetSrc(amexLogo),
} as const

function BrandMark({ src }: { src: string }) {
  return (
    <span className="inline-flex items-center rounded-md bg-white px-1.5 py-1 ring-1 ring-border/70">
      <img src={src} alt="" className="h-3.5 w-auto object-contain" />
    </span>
  )
}

export default function PaymentMethods({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [open, setOpen] = React.useState(true)
  const [number, setNumber] = React.useState("")
  const [expiry, setExpiry] = React.useState("")
  const [cvc, setCvc] = React.useState("")
  const [name, setName] = React.useState("")

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white px-4 py-10 text-foreground dark:bg-background sm:px-6 sm:py-14",
        className
      )}
      aria-labelledby="payment-methods-03-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-md overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
        <header className="flex items-start justify-between gap-3 border-b border-border/70 px-5 py-5">
          <div className="min-w-0 text-start">
            <h1
              id="payment-methods-03-heading"
              className="text-lg font-semibold tracking-tight"
            >
              Billing card
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Your primary card for workspace invoices.
            </p>
          </div>
          <Button
            type="button"
            size="sm"
            className="cursor-pointer gap-1.5"
            onClick={() => setOpen(true)}
          >
            <PlusIcon className="size-4" aria-hidden />
            Add card
          </Button>
        </header>

        <div className="flex items-center gap-3 px-5 py-5">
          <BrandMark src={BRAND.visa} />
          <div className="min-w-0 flex-1 text-start">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-medium">Visa ending in 4242</p>
              <Badge
                variant="secondary"
                className="border-transparent bg-primary/10 font-medium text-primary"
              >
                Default
              </Badge>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground" dir="ltr">
              Expires 08/28 · Alex Johnson
            </p>
          </div>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
            <CreditCardIcon className="size-4" aria-hidden />
          </span>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-start">
            <DialogTitle>Add payment card</DialogTitle>
            <DialogDescription>
              Card details are encrypted. We never store the full CVC.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">Accepted</span>
            <BrandMark src={BRAND.visa} />
            <BrandMark src={BRAND.master} />
            <BrandMark src={BRAND.amex} />
          </div>

          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel htmlFor="pm-03-number">Card number</FieldLabel>
              <Input
                id="pm-03-number"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="ACCT-000015"
                dir="ltr"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="font-mono"
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="pm-03-expiry">Expiry</FieldLabel>
                <Input
                  id="pm-03-expiry"
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  placeholder="MM/YY"
                  dir="ltr"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="font-mono"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="pm-03-cvc">CVC</FieldLabel>
                <Input
                  id="pm-03-cvc"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  placeholder="123"
                  dir="ltr"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  className="font-mono"
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="pm-03-name">Name on card</FieldLabel>
              <Input
                id="pm-03-name"
                autoComplete="cc-name"
                placeholder="Alex Johnson"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>
          </FieldGroup>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Save card
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
