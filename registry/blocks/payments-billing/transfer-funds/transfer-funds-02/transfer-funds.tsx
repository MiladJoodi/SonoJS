"use client"

import * as React from "react"
import { CalendarClockIcon, CheckCircle2Icon } from "lucide-react"

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
import { Label } from "@sonojs/ui/components/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@sonojs/ui/components/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

type Frequency = "once" | "weekly" | "monthly"

const SOURCES = [
  { id: "acc_main", label: "Main USD wallet", balance: "$12,450.00" },
  { id: "acc_saving", label: "High-yield savings", balance: "$45,000.00" },
] as const

const DESTINATIONS = [
  { id: "rec_rent", label: "Landlord LLC", detail: "ACH ···· 5520" },
  { id: "rec_maya", label: "Maya Chen", detail: "ACH ···· 8821" },
  { id: "rec_ops", label: "Ops checking", detail: "Wire ···· 4401" },
] as const

function nextRunLabel(frequency: Frequency, start: string) {
  if (!start) return "—"
  const d = new Date(start + "T12:00:00")
  if (Number.isNaN(d.getTime())) return "—"
  const fmt = d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  })
  if (frequency === "once") return fmt
  if (frequency === "weekly") return `Every week from ${fmt}`
  return `Monthly on day ${d.getDate()}, from ${fmt}`
}

export default function TransferFunds({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [sourceId, setSourceId] = React.useState("acc_main")
  const [destinationId, setDestinationId] = React.useState("rec_rent")
  const [amount, setAmount] = React.useState("1850.00")
  const [frequency, setFrequency] = React.useState<Frequency>("monthly")
  const [startDate, setStartDate] = React.useState("2026-07-01")
  const [note, setNote] = React.useState("Office rent")
  const [scheduled, setScheduled] = React.useState(false)

  const source = SOURCES.find((s) => s.id === sourceId)
  const destination = DESTINATIONS.find((d) => d.id === destinationId)
  const amountNumber = parseFloat(amount || "0")
  const canSchedule =
    Boolean(sourceId && destinationId && startDate && amount) &&
    amountNumber > 0

  if (scheduled) {
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
            Transfer scheduled
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground tabular-nums" dir="ltr">
              ${Number.isFinite(amountNumber) ? amountNumber.toFixed(2) : "0.00"}
            </span>{" "}
            to {destination?.label ?? "recipient"} —{" "}
            {nextRunLabel(frequency, startDate)}.
          </p>
          <Button
            type="button"
            className="mt-8 cursor-pointer"
            onClick={() => setScheduled(false)}
          >
            Schedule another
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
        aria-labelledby="transfer-funds-02-heading"
      >
        <header className="flex items-start gap-3 border-b border-border/70 px-5 py-5 sm:px-6">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <CalendarClockIcon className="size-5" aria-hidden />
          </span>
          <div className="min-w-0 text-start">
            <h1
              id="transfer-funds-02-heading"
              className="text-lg font-semibold tracking-tight"
            >
              Schedule a transfer
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              One-time or recurring — runs automatically from your wallet.
            </p>
          </div>
        </header>

        <div className="space-y-5 px-5 py-5 sm:px-6">
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel htmlFor="tf-02-from">From</FieldLabel>
              <Select value={sourceId} onValueChange={setSourceId}>
                <SelectTrigger
                  id="tf-02-from"
                  className="h-[46px] w-full cursor-pointer"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SOURCES.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.label} · <span dir="ltr">{s.balance}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="tf-02-to">To</FieldLabel>
              <Select value={destinationId} onValueChange={setDestinationId}>
                <SelectTrigger
                  id="tf-02-to"
                  className="h-[46px] w-full cursor-pointer"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DESTINATIONS.map((d) => (
                    <SelectItem key={d.id} value={d.id}>
                      {d.label} · {d.detail}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="tf-02-amount">Amount</FieldLabel>
              <InputGroup>
                <InputGroupAddon align="inline-start">$</InputGroupAddon>
                <InputGroupInput
                  id="tf-02-amount"
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
            </Field>

            <Field>
              <FieldLabel>Frequency</FieldLabel>
              <RadioGroup
                value={frequency}
                onValueChange={(v) => setFrequency(v as Frequency)}
                className="grid gap-2 sm:grid-cols-3"
                aria-label="Frequency"
              >
                {(
                  [
                    ["once", "Once"],
                    ["weekly", "Weekly"],
                    ["monthly", "Monthly"],
                  ] as const
                ).map(([value, label]) => (
                  <Label
                    key={value}
                    htmlFor={`tf-02-freq-${value}`}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-[12px] border border-border/70 px-3 py-3 text-sm font-medium transition-colors",
                      frequency === value
                        ? "border-primary/40 bg-primary/5"
                        : "hover:bg-muted/40"
                    )}
                  >
                    <RadioGroupItem
                      id={`tf-02-freq-${value}`}
                      value={value}
                      className="cursor-pointer"
                    />
                    {label}
                  </Label>
                ))}
              </RadioGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="tf-02-start">Start date</FieldLabel>
              <Input
                id="tf-02-start"
                type="date"
                dir="ltr"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="cursor-pointer"
              />
              <FieldDescription>
                Next run: {nextRunLabel(frequency, startDate)}
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="tf-02-note">
                Memo{" "}
                <span className="font-normal text-muted-foreground">
                  (optional)
                </span>
              </FieldLabel>
              <Input
                id="tf-02-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Rent — Suite 400"
              />
            </Field>
          </FieldGroup>
        </div>

        <Separator />

        <div className="space-y-3 bg-muted/30 px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="text-muted-foreground">Summary</span>
            <Badge variant="secondary" className="capitalize">
              {frequency}
            </Badge>
          </div>
          <p className="text-start text-sm">
            <span className="font-semibold tabular-nums" dir="ltr">
              ${Number.isFinite(amountNumber) ? amountNumber.toFixed(2) : "0.00"}
            </span>
            <span className="text-muted-foreground">
              {" "}
              from {source?.label ?? "—"} → {destination?.label ?? "—"}
            </span>
          </p>
          <p className="text-start text-xs text-muted-foreground">
            Next run: {nextRunLabel(frequency, startDate)}
          </p>
          <Button
            type="button"
            className="mt-1 w-full cursor-pointer disabled:cursor-not-allowed"
            disabled={!canSchedule}
            onClick={() => setScheduled(true)}
          >
            Schedule transfer
          </Button>
        </div>
      </section>
    </div>
  )
}
