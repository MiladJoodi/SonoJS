"use client"

import * as React from "react"
import {
  AlertCircleIcon,
  ArrowRightIcon,
  CheckCircle2Icon,
  CreditCardIcon,
  LandmarkIcon,
  Loader2Icon,
  ReceiptIcon,
  UserIcon,
  WalletIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@sonojs/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@sonojs/ui/components/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import { Textarea } from "@sonojs/ui/components/textarea"
import { cn } from "@/lib/utils"

type Step = "details" | "review" | "success"

const SOURCES = [
  {
    id: "acc_main",
    label: "Main USD wallet",
    balance: 12450,
    currency: "USD",
    symbol: "$",
    icon: WalletIcon,
  },
  {
    id: "acc_saving",
    label: "High-yield savings",
    balance: 45000,
    currency: "USD",
    symbol: "$",
    icon: LandmarkIcon,
  },
  {
    id: "acc_euro",
    label: "Euro wallet",
    balance: 3890.5,
    currency: "EUR",
    symbol: "€",
    icon: WalletIcon,
  },
] as const

const DESTINATIONS = [
  {
    id: "rec_alex",
    label: "Alex Johnson",
    detail: "ACH ···· 1234",
    icon: UserIcon,
  },
  {
    id: "rec_maya",
    label: "Maya Chen",
    detail: "ACH ···· 8821",
    icon: UserIcon,
  },
  {
    id: "rec_card",
    label: "Company debit card",
    detail: "Visa ···· 4242",
    icon: CreditCardIcon,
  },
  {
    id: "rec_ops",
    label: "Ops checking",
    detail: "Wire ···· 4401",
    icon: LandmarkIcon,
  },
] as const

function formatBalance(amount: number, symbol: string) {
  return `${symbol}${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

function StepRail({ step }: { step: Step }) {
  const index = step === "details" ? 0 : step === "review" ? 1 : 2
  const labels = ["Details", "Review", "Done"] as const

  return (
    <nav aria-label="Transfer progress" className="mx-auto w-full max-w-xs">
      <ol className="flex items-center justify-between gap-2">
        {labels.map((label, i) => {
          const done = i < index
          const current = i === index
          return (
            <li
              key={label}
              className="flex flex-1 items-center gap-2 last:flex-none"
            >
              <div className="flex flex-col items-center gap-1.5">
                <span
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                    done || current
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                  aria-current={current ? "step" : undefined}
                >
                  {done ? (
                    <CheckCircle2Icon className="size-4" aria-hidden />
                  ) : (
                    i + 1
                  )}
                </span>
                <span
                  className={cn(
                    "text-[11px] font-medium",
                    current || done
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {label}
                </span>
              </div>
              {i < labels.length - 1 ? (
                <div
                  className={cn(
                    "mb-5 h-px min-w-4 flex-1",
                    i < index ? "bg-primary" : "bg-border/70"
                  )}
                  aria-hidden
                />
              ) : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default function TransferFunds({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [step, setStep] = React.useState<Step>("details")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [showReceipt, setShowReceipt] = React.useState(false)
  const [sourceId, setSourceId] = React.useState("")
  const [destinationId, setDestinationId] = React.useState("")
  const [amount, setAmount] = React.useState("")
  const [note, setNote] = React.useState("")
  const [refId] = React.useState(
    () => `TRX-${Math.random().toString(36).slice(2, 7).toUpperCase()}-9X`
  )

  const source = SOURCES.find((s) => s.id === sourceId)
  const destination = DESTINATIONS.find((d) => d.id === destinationId)
  const amountNumber = parseFloat(amount || "0")
  const amountDisplay = Number.isFinite(amountNumber)
    ? amountNumber.toFixed(2)
    : "0.00"
  const symbol = source?.symbol ?? "$"
  const fee = 0
  const arrival = "Today, in minutes"

  const canContinue =
    Boolean(sourceId && destinationId && amount) &&
    amountNumber > 0 &&
    (!source || amountNumber <= source.balance)

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canContinue) return
    setStep("review")
  }

  const handleConfirm = () => {
    setIsSubmitting(true)
    window.setTimeout(() => {
      setIsSubmitting(false)
      setShowReceipt(false)
      setStep("success")
    }, 1200)
  }

  const resetForm = () => {
    setStep("details")
    setShowReceipt(false)
    setSourceId("")
    setDestinationId("")
    setAmount("")
    setNote("")
  }

  return (
    <div
      className={cn(
        "flex w-full justify-center bg-canvas px-4 py-10 text-foreground sm:px-6 sm:py-12",
        className
      )}
      {...props}
    >
      <div className="w-full max-w-lg space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Transfer funds
          </h1>
          <p className="text-sm text-muted-foreground">
            Move money between your accounts or to a saved recipient.
          </p>
        </div>

        <StepRail step={step} />

        <div className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
          {step === "details" ? (
            <form onSubmit={handleContinue}>
              <div className="space-y-6 p-6 sm:p-8">
                <FieldGroup className="gap-5">
                  <Field>
                    <FieldLabel htmlFor="transfer-funds-01-from">
                      From account
                    </FieldLabel>
                    <Select value={sourceId} onValueChange={setSourceId}>
                      <SelectTrigger
                        id="transfer-funds-01-from"
                        className="h-[46px] w-full cursor-pointer"
                      >
                        <SelectValue placeholder="Select source account" />
                      </SelectTrigger>
                      <SelectContent>
                        {SOURCES.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.label} ·{" "}
                            <span dir="ltr">
                              {formatBalance(item.balance, item.symbol)}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="transfer-funds-01-to">
                      To account or recipient
                    </FieldLabel>
                    <Select
                      value={destinationId}
                      onValueChange={setDestinationId}
                    >
                      <SelectTrigger
                        id="transfer-funds-01-to"
                        className="h-[46px] w-full cursor-pointer"
                      >
                        <SelectValue placeholder="Select destination" />
                      </SelectTrigger>
                      <SelectContent>
                        {DESTINATIONS.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.label} · {item.detail}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="transfer-funds-01-amount">
                      Amount
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupAddon align="inline-start">
                        <span
                          className="text-base font-medium text-muted-foreground"
                          dir="ltr"
                        >
                          {symbol}
                        </span>
                      </InputGroupAddon>
                      <InputGroupInput
                        id="transfer-funds-01-amount"
                        type="number"
                        inputMode="decimal"
                        placeholder="0.00"
                        min="0.01"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="text-lg font-semibold tabular-nums"
                        dir="ltr"
                      />
                    </InputGroup>
                    {source ? (
                      <FieldDescription>
                        Available:{" "}
                        <span dir="ltr">
                          {formatBalance(source.balance, source.symbol)}
                        </span>
                        {amountNumber > source.balance ? (
                          <span className="ms-2 text-destructive">
                            Exceeds balance
                          </span>
                        ) : null}
                      </FieldDescription>
                    ) : null}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="transfer-funds-01-note">
                      Note{" "}
                      <span className="font-normal text-muted-foreground">
                        (optional)
                      </span>
                    </FieldLabel>
                    <Textarea
                      id="transfer-funds-01-note"
                      placeholder="What is this for?"
                      rows={2}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="resize-none"
                    />
                  </Field>
                </FieldGroup>
              </div>
              <div className="border-t border-border/70 px-6 py-4 sm:px-8">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full cursor-pointer gap-2 disabled:cursor-not-allowed"
                  disabled={!canContinue}
                >
                  Continue to review
                  <ArrowRightIcon className="icon-dir size-4" aria-hidden />
                </Button>
              </div>
            </form>
          ) : null}

          {step === "review" ? (
            <>
              <div className="space-y-6 p-6 sm:p-8">
                <div className="text-center">
                  <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    Amount to send
                  </p>
                  <p
                    className="mt-2 text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl"
                    dir="ltr"
                  >
                    {symbol}
                    {amountDisplay}
                  </p>
                  {source ? (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {source.currency}
                    </p>
                  ) : null}
                </div>

                <dl className="divide-y divide-border/70 overflow-hidden rounded-lg border border-border/70">
                  <div className="flex items-center justify-between gap-3 px-4 py-3.5">
                    <dt className="text-sm text-muted-foreground">From</dt>
                    <dd className="flex items-center gap-2 text-sm font-medium">
                      {source ? (
                        <>
                          <source.icon
                            className="size-4 text-muted-foreground"
                            aria-hidden
                          />
                          {source.label}
                        </>
                      ) : (
                        "—"
                      )}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-3 px-4 py-3.5">
                    <dt className="text-sm text-muted-foreground">To</dt>
                    <dd className="flex items-center gap-2 text-end text-sm font-medium">
                      {destination ? (
                        <>
                          <destination.icon
                            className="size-4 shrink-0 text-muted-foreground"
                            aria-hidden
                          />
                          <span>
                            {destination.label}
                            <span className="ms-1.5 font-mono text-xs text-muted-foreground">
                              {destination.detail}
                            </span>
                          </span>
                        </>
                      ) : (
                        "—"
                      )}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-3 px-4 py-3.5">
                    <dt className="text-sm text-muted-foreground">Fee</dt>
                    <dd>
                      <Badge
                        variant="secondary"
                        className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                      >
                        {fee === 0 ? "Free" : formatBalance(fee, symbol)}
                      </Badge>
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-3 px-4 py-3.5">
                    <dt className="text-sm text-muted-foreground">Arrival</dt>
                    <dd className="text-sm font-medium">{arrival}</dd>
                  </div>
                  {note ? (
                    <div className="flex items-start justify-between gap-3 px-4 py-3.5">
                      <dt className="shrink-0 text-sm text-muted-foreground">
                        Note
                      </dt>
                      <dd className="text-end text-sm font-medium break-words">
                        {note}
                      </dd>
                    </div>
                  ) : null}
                </dl>

                <div className="flex gap-3 rounded-lg border border-border/70 bg-muted/40 p-3.5">
                  <AlertCircleIcon
                    className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                    aria-hidden
                  />
                  <p className="text-sm text-muted-foreground">
                    Review carefully. Transfers to external accounts cannot be
                    reversed once processed.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 border-t border-border/70 px-6 py-4 sm:flex-row sm:px-8">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="cursor-pointer sm:flex-1 disabled:cursor-not-allowed"
                  onClick={() => setStep("details")}
                  disabled={isSubmitting}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  size="lg"
                  className="cursor-pointer gap-2 sm:flex-[1.6] disabled:cursor-not-allowed"
                  onClick={handleConfirm}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2Icon
                        className="size-4 animate-spin"
                        aria-hidden
                      />
                      Sending…
                    </>
                  ) : (
                    "Confirm transfer"
                  )}
                </Button>
              </div>
            </>
          ) : null}

          {step === "success" ? (
            <div className="flex flex-col items-center p-6 text-center sm:p-10">
              <div className="mb-5 flex size-14 items-center justify-center rounded-full bg-emerald-500/10">
                <CheckCircle2Icon
                  className="size-7 text-emerald-600 dark:text-emerald-400"
                  aria-hidden
                />
              </div>
              <h2 className="text-xl font-semibold tracking-tight">
                Transfer initiated
              </h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Your transfer of{" "}
                <span
                  className="font-semibold text-foreground tabular-nums"
                  dir="ltr"
                >
                  {symbol}
                  {amountDisplay}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-foreground">
                  {destination?.label ?? "recipient"}
                </span>{" "}
                is on its way.
              </p>

              <dl className="mt-8 w-full divide-y divide-border/70 overflow-hidden rounded-lg border border-border/70 text-start">
                <div className="flex items-center justify-between gap-3 px-4 py-3.5">
                  <dt className="text-sm text-muted-foreground">Reference</dt>
                  <dd
                    className="font-mono text-sm font-medium tracking-wide"
                    dir="ltr"
                  >
                    {refId}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3 px-4 py-3.5">
                  <dt className="text-sm text-muted-foreground">Date & time</dt>
                  <dd className="text-sm font-medium">
                    {new Date().toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3 px-4 py-3.5">
                  <dt className="text-sm text-muted-foreground">Fee</dt>
                  <dd className="text-sm font-medium">Free</dd>
                </div>
                <div className="flex items-center justify-between gap-3 px-4 py-3.5">
                  <dt className="text-sm text-muted-foreground">Arrival</dt>
                  <dd className="text-sm font-medium">{arrival}</dd>
                </div>
              </dl>

              {showReceipt ? (
                <div className="mt-4 w-full rounded-[12px] border border-dashed border-border/70 bg-muted/30 p-4 text-start text-sm">
                  <div className="flex items-center gap-2 font-medium">
                    <ReceiptIcon className="size-4" aria-hidden />
                    Digital receipt
                  </div>
                  <p className="mt-2 text-muted-foreground">
                    Sent from {source?.label ?? "—"} to{" "}
                    {destination?.label ?? "—"}. Keep reference{" "}
                    <span className="font-mono text-foreground" dir="ltr">
                      {refId}
                    </span>{" "}
                    for your records.
                  </p>
                </div>
              ) : null}

              <div className="mt-6 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="cursor-pointer"
                  onClick={resetForm}
                >
                  New transfer
                </Button>
                <Button
                  type="button"
                  size="lg"
                  className="cursor-pointer gap-2"
                  onClick={() => setShowReceipt(true)}
                >
                  <ReceiptIcon className="size-4" aria-hidden />
                  View receipt
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
