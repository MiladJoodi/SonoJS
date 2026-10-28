"use client"

import * as React from "react"
import {
  ArrowDownToLineIcon,
  CheckCircle2Icon,
  Clock3Icon,
  FileTextIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

type InvoiceStatus = "paid" | "open" | "past_due"

type Invoice = {
  id: string
  label: string
  period: string
  amount: string
  status: InvoiceStatus
  issued: string
}

const MONTHS = [
  {
    month: "June 2026",
    invoices: [
      {
        id: "INV-2406",
        label: "Pro · Seat expansion",
        period: "Jun 1 – Jun 30",
        amount: "$147.00",
        status: "paid" as const,
        issued: "Jun 1, 2026",
      },
      {
        id: "INV-2405",
        label: "Pro · Monthly",
        period: "Jun 1 – Jun 30",
        amount: "$49.00",
        status: "paid" as const,
        issued: "Jun 1, 2026",
      },
    ],
  },
  {
    month: "May 2026",
    invoices: [
      {
        id: "INV-2404",
        label: "Pro · Monthly",
        period: "May 1 – May 31",
        amount: "$49.00",
        status: "paid" as const,
        issued: "May 1, 2026",
      },
      {
        id: "INV-2403",
        label: "Usage overage",
        period: "Apr 15 – May 1",
        amount: "$18.40",
        status: "open" as const,
        issued: "May 2, 2026",
      },
    ],
  },
  {
    month: "April 2026",
    invoices: [
      {
        id: "INV-2402",
        label: "Pro · Monthly",
        period: "Apr 1 – Apr 30",
        amount: "$49.00",
        status: "past_due" as const,
        issued: "Apr 1, 2026",
      },
    ],
  },
] as const

function StatusBadge({ status }: { status: InvoiceStatus }) {
  if (status === "paid") {
    return (
      <Badge className="gap-1 border-transparent bg-emerald-500/15 font-medium text-emerald-700 dark:text-emerald-400">
        <CheckCircle2Icon className="size-3" aria-hidden />
        Paid
      </Badge>
    )
  }
  if (status === "open") {
    return (
      <Badge className="gap-1 border-transparent bg-sky-500/15 font-medium text-sky-700 dark:text-sky-400">
        <Clock3Icon className="size-3" aria-hidden />
        Open
      </Badge>
    )
  }
  return (
    <Badge variant="destructive" className="gap-1 font-medium">
      Past due
    </Badge>
  )
}

export default function BillingHistory({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "relative isolate w-full min-w-0 overflow-hidden bg-white py-10 text-foreground dark:bg-background sm:py-14",
        className
      )}
      aria-labelledby="billing-history-02-heading"
      {...props}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-e-[-10%] top-10 size-72 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute inset-s-[-8%] bottom-0 size-64 rounded-full bg-emerald-500/5 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
        <header className="mb-8 flex flex-col gap-4 text-start sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              Statements
            </p>
            <h1
              id="billing-history-02-heading"
              className="mt-1 text-3xl font-semibold tracking-tight"
            >
              Invoice archive
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Month-by-month PDF invoices for Acme Studio.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="cursor-pointer gap-1.5"
          >
            <ArrowDownToLineIcon className="size-3.5" aria-hidden />
            Download all
          </Button>
        </header>

        <div className="space-y-8">
          {MONTHS.map((group) => (
            <div key={group.month}>
              <div className="mb-3 flex items-center gap-3">
                <h2 className="text-sm font-semibold tracking-tight">
                  {group.month}
                </h2>
                <Separator className="flex-1" />
                <span className="text-xs text-muted-foreground tabular-nums">
                  {group.invoices.length}{" "}
                  {group.invoices.length === 1 ? "invoice" : "invoices"}
                </span>
              </div>

              <ul className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
                {group.invoices.map((invoice, index) => (
                  <li key={invoice.id}>
                    {index > 0 ? <Separator /> : null}
                    <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:gap-4 sm:px-5">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                        <FileTextIcon className="size-4" aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1 text-start">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold" dir="ltr">
                            {invoice.id}
                          </p>
                          <StatusBadge status={invoice.status} />
                        </div>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {invoice.label}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {invoice.period}
                          <span className="mx-1.5 opacity-50" aria-hidden>
                            ·
                          </span>
                          Issued {invoice.issued}
                        </p>
                      </div>
                      <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end sm:justify-center">
                        <p
                          dir="ltr"
                          className="text-base font-semibold tabular-nums"
                        >
                          {invoice.amount}
                        </p>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 cursor-pointer gap-1.5 px-2"
                        >
                          <ArrowDownToLineIcon
                            className="size-3.5"
                            aria-hidden
                          />
                          PDF
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
