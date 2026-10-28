"use client"

import * as React from "react"
import {
  AlertTriangleIcon,
  ArrowLeftRightIcon,
  CheckCircle2Icon,
  GlobeIcon,
  Loader2Icon,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@sonojs/ui/components/alert"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@sonojs/ui/components/field"
import { Input } from "@sonojs/ui/components/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@sonojs/ui/components/input-group"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

const FX_RATE = 0.9214
const WIRE_FEE_USD = 25

export default function TransferFunds({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [beneficiary, setBeneficiary] = React.useState("Nordic Design GmbH")
  const [iban, setIban] = React.useState("DE89 3704 0044 0532 0130 00")
  const [bic, setBic] = React.useState("COBADEFFXXX")
  const [amount, setAmount] = React.useState("2500.00")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [done, setDone] = React.useState(false)

  const amountNumber = parseFloat(amount || "0")
  const eurReceive = Number.isFinite(amountNumber)
    ? amountNumber * FX_RATE
    : 0
  const totalDebit = Number.isFinite(amountNumber)
    ? amountNumber + WIRE_FEE_USD
    : WIRE_FEE_USD

  const canConfirm =
    Boolean(beneficiary.trim() && iban.trim() && bic.trim() && amount) &&
    amountNumber > 0

  const confirm = () => {
    if (!canConfirm) return
    setIsSubmitting(true)
    window.setTimeout(() => {
      setIsSubmitting(false)
      setDone(true)
    }, 1400)
  }

  if (done) {
    return (
      <div
        className={cn(
          "flex w-full justify-center bg-canvas px-4 py-10 text-foreground sm:px-6 sm:py-14",
          className
        )}
        {...props}
      >
        <div className="w-full max-w-lg overflow-hidden rounded-[12px] border border-border/70 bg-card p-8 text-center shadow-soft sm:p-10">
          <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-emerald-500/10">
            <CheckCircle2Icon
              className="size-7 text-emerald-600 dark:text-emerald-400"
              aria-hidden
            />
          </div>
          <h1 className="text-xl font-semibold tracking-tight">
            Wire submitted
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground tabular-nums" dir="ltr">
              ${Number.isFinite(amountNumber) ? amountNumber.toFixed(2) : "0.00"}
            </span>{" "}
            → approx.{" "}
            <span className="font-semibold text-foreground tabular-nums" dir="ltr">
              €{eurReceive.toFixed(2)}
            </span>{" "}
            for {beneficiary}. ETA 1–3 business days.
          </p>
          <p className="mt-3 font-mono text-xs text-muted-foreground" dir="ltr">
            WIRE-EU-7K2M91
          </p>
          <Button
            type="button"
            className="mt-8 cursor-pointer"
            onClick={() => setDone(false)}
          >
            New wire
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex w-full justify-center bg-canvas px-4 py-10 text-foreground sm:px-6 sm:py-14",
        className
      )}
      {...props}
    >
      <section
        className="w-full max-w-lg overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft"
        aria-labelledby="transfer-funds-03-heading"
      >
        <header className="flex items-start gap-3 border-b border-border/70 px-5 py-5 sm:px-6">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <GlobeIcon className="size-5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1 text-start">
            <div className="flex flex-wrap items-center gap-2">
              <h1
                id="transfer-funds-03-heading"
                className="text-lg font-semibold tracking-tight"
              >
                International wire
              </h1>
              <Badge variant="secondary">USD → EUR</Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              SEPA beneficiary details, live FX quote, and compliance notice.
            </p>
          </div>
        </header>

        <div className="space-y-5 px-5 py-5 sm:px-6">
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel htmlFor="tf-03-name">Beneficiary name</FieldLabel>
              <Input
                id="tf-03-name"
                value={beneficiary}
                onChange={(e) => setBeneficiary(e.target.value)}
                autoComplete="organization"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="tf-03-iban">IBAN</FieldLabel>
              <Input
                id="tf-03-iban"
                dir="ltr"
                value={iban}
                onChange={(e) => setIban(e.target.value)}
                className="font-mono text-sm"
                spellCheck={false}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="tf-03-bic">BIC / SWIFT</FieldLabel>
              <Input
                id="tf-03-bic"
                dir="ltr"
                value={bic}
                onChange={(e) => setBic(e.target.value.toUpperCase())}
                className="font-mono text-sm uppercase"
                spellCheck={false}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="tf-03-amount">You send (USD)</FieldLabel>
              <InputGroup>
                <InputGroupAddon align="inline-start">$</InputGroupAddon>
                <InputGroupInput
                  id="tf-03-amount"
                  type="number"
                  inputMode="decimal"
                  min="0.01"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="font-semibold tabular-nums"
                  dir="ltr"
                />
              </InputGroup>
              <FieldDescription>
                Debited from Main USD wallet · Available $12,450.00
              </FieldDescription>
            </Field>
          </FieldGroup>

          <div className="overflow-hidden rounded-[12px] border border-border/70">
            <div className="flex items-center gap-2 border-b border-border/70 bg-muted/40 px-4 py-2.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              <ArrowLeftRightIcon className="size-3.5" aria-hidden />
              FX quote
            </div>
            <dl className="divide-y divide-border/70 text-sm">
              <div className="flex items-center justify-between gap-3 px-4 py-3">
                <dt className="text-muted-foreground">Rate</dt>
                <dd className="font-medium tabular-nums" dir="ltr">
                  1 USD = {FX_RATE.toFixed(4)} EUR
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3 px-4 py-3">
                <dt className="text-muted-foreground">Beneficiary receives</dt>
                <dd
                  className="text-base font-semibold tabular-nums text-emerald-700 dark:text-emerald-400"
                  dir="ltr"
                >
                  €{eurReceive.toFixed(2)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3 px-4 py-3">
                <dt className="text-muted-foreground">Wire fee</dt>
                <dd className="font-medium tabular-nums" dir="ltr">
                  ${WIRE_FEE_USD.toFixed(2)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3 px-4 py-3">
                <dt className="font-medium">Total debit</dt>
                <dd className="font-semibold tabular-nums" dir="ltr">
                  ${totalDebit.toFixed(2)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3 px-4 py-3">
                <dt className="text-muted-foreground">ETA</dt>
                <dd className="font-medium">1–3 business days</dd>
              </div>
            </dl>
          </div>

          <Alert>
            <AlertTriangleIcon aria-hidden />
            <AlertTitle>Compliance</AlertTitle>
            <AlertDescription>
              International wires may require OFAC screening. Incorrect IBAN/BIC
              can delay or return funds. Rate locked for 30 seconds in production.
            </AlertDescription>
          </Alert>
        </div>

        <Separator />

        <div className="flex flex-col-reverse gap-2 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="cursor-pointer gap-2 disabled:cursor-not-allowed"
            disabled={!canConfirm || isSubmitting}
            onClick={confirm}
          >
            {isSubmitting ? (
              <>
                <Loader2Icon className="size-4 animate-spin" aria-hidden />
                Submitting…
              </>
            ) : (
              "Confirm wire"
            )}
          </Button>
        </div>
      </section>
    </div>
  )
}
