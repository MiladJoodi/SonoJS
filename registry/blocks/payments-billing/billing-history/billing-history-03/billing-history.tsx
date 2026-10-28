"use client"

import * as React from "react"
import {
  ArrowDownToLineIcon,
  CheckIcon,
  CopyIcon,
  PrinterIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

type Invoice = {
  id: string
  title: string
  status: "paid" | "open"
  issued: string
  due: string
  subtotal: string
  tax: string
  total: string
  lines: { name: string; qty: number; price: string }[]
}

const INVOICES: Invoice[] = [
  {
    id: "INV-2406",
    title: "Pro · Seat expansion",
    status: "paid",
    issued: "Jun 1, 2026",
    due: "Jun 15, 2026",
    subtotal: "$135.00",
    tax: "$12.00",
    total: "$147.00",
    lines: [
      { name: "Pro plan — monthly", qty: 1, price: "$49.00" },
      { name: "Additional seats × 2", qty: 2, price: "$86.00" },
    ],
  },
  {
    id: "INV-2405",
    title: "Pro · Monthly",
    status: "paid",
    issued: "Jun 1, 2026",
    due: "Jun 15, 2026",
    subtotal: "$45.00",
    tax: "$4.00",
    total: "$49.00",
    lines: [{ name: "Pro plan — monthly", qty: 1, price: "$49.00" }],
  },
  {
    id: "INV-2403",
    title: "Usage overage",
    status: "open",
    issued: "May 2, 2026",
    due: "May 16, 2026",
    subtotal: "$16.85",
    tax: "$1.55",
    total: "$18.40",
    lines: [
      { name: "API calls overage", qty: 1, price: "$12.40" },
      { name: "Storage overage", qty: 1, price: "$6.00" },
    ],
  },
]

export default function BillingHistory({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [selectedId, setSelectedId] = React.useState(INVOICES[0]!.id)
  const [copied, setCopied] = React.useState(false)
  const selected =
    INVOICES.find((i) => i.id === selectedId) ?? INVOICES[0]!

  async function copyId() {
    try {
      await navigator.clipboard.writeText(selected.id)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1400)
    } catch {
      /* ignore */
    }
  }

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white px-4 py-10 text-foreground dark:bg-background sm:px-6 sm:py-14",
        className
      )}
      aria-label="Invoice receipt inspector"
      {...props}
    >
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
        <aside className="flex min-h-0 flex-col border-b border-border/70 lg:border-b-0 lg:border-e">
          <div className="border-b border-border/70 px-4 py-4 text-start">
            <p className="text-sm font-semibold">Invoices</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Select a statement to preview.
            </p>
          </div>
          <ul className="max-h-72 overflow-y-auto p-2 lg:max-h-112">
            {INVOICES.map((invoice) => {
              const active = selected.id === invoice.id
              return (
                <li key={invoice.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(invoice.id)}
                    className={cn(
                      "flex w-full cursor-pointer flex-col gap-1 rounded-md px-3 py-2.5 text-start transition-colors",
                      active ? "bg-primary/10" : "hover:bg-muted/50"
                    )}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-semibold" dir="ltr">
                        {invoice.id}
                      </span>
                      <Badge
                        variant="secondary"
                        className={cn(
                          "text-[10px]",
                          invoice.status === "paid"
                            ? "border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                            : "border-transparent bg-amber-500/15 text-amber-700 dark:text-amber-400"
                        )}
                      >
                        {invoice.status === "paid" ? "Paid" : "Open"}
                      </Badge>
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {invoice.title}
                    </span>
                    <span
                      dir="ltr"
                      className="text-sm font-semibold tabular-nums"
                    >
                      {invoice.total}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </aside>

        <div className="flex min-w-0 flex-col">
          <header className="flex flex-col gap-3 border-b border-border/70 px-5 py-5 sm:flex-row sm:items-start sm:justify-between sm:px-6">
            <div className="min-w-0 text-start">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-mono text-lg font-semibold tracking-tight" dir="ltr">
                  {selected.id}
                </h1>
                <Badge
                  className={cn(
                    "font-medium",
                    selected.status === "paid"
                      ? "border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                      : "border-transparent bg-amber-500/15 text-amber-700 dark:text-amber-400"
                  )}
                >
                  {selected.status === "paid" ? "Paid" : "Open"}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {selected.title}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Issued {selected.issued}
                <span className="mx-1.5 opacity-50" aria-hidden>
                  ·
                </span>
                Due {selected.due}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="cursor-pointer gap-1.5"
                onClick={copyId}
              >
                {copied ? (
                  <CheckIcon className="size-3.5" aria-hidden />
                ) : (
                  <CopyIcon className="size-3.5" aria-hidden />
                )}
                {copied ? "Copied" : "Copy ID"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="cursor-pointer gap-1.5"
              >
                <PrinterIcon className="size-3.5" aria-hidden />
                Print
              </Button>
              <Button
                type="button"
                size="sm"
                className="cursor-pointer gap-1.5"
              >
                <ArrowDownToLineIcon className="size-3.5" aria-hidden />
                PDF
              </Button>
            </div>
          </header>

          <div className="flex-1 space-y-6 p-5 sm:p-6">
            <div className="grid gap-4 rounded-[12px] border border-border/70 bg-muted/30 p-4 sm:grid-cols-2">
              <div className="text-start">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Bill to
                </p>
                <p className="mt-1 text-sm font-medium">Acme Studio Inc.</p>
                <p className="text-sm text-muted-foreground">
                  120 Market Street, Suite 400
                  <br />
                  San Francisco, CA 94105
                </p>
              </div>
              <div className="text-start sm:text-end">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  From
                </p>
                <p className="mt-1 text-sm font-medium">SonoJS Billing</p>
                <p className="text-sm text-muted-foreground">
                  billing@sonojs.dev
                  <br />
                  US · EIN 98-7654321
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-[12px] border border-border/70">
              <div className="grid grid-cols-[minmax(0,1fr)_4rem_5.5rem] gap-2 border-b border-border/70 bg-muted/40 px-4 py-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                <span className="text-start">Item</span>
                <span className="text-end">Qty</span>
                <span className="text-end">Amount</span>
              </div>
              <ul>
                {selected.lines.map((line, i) => (
                  <li key={line.name}>
                    {i > 0 ? <Separator /> : null}
                    <div className="grid grid-cols-[minmax(0,1fr)_4rem_5.5rem] gap-2 px-4 py-3 text-sm">
                      <span className="text-start font-medium">{line.name}</span>
                      <span className="text-end tabular-nums text-muted-foreground" dir="ltr">
                        {line.qty}
                      </span>
                      <span className="text-end font-medium tabular-nums" dir="ltr">
                        {line.price}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <dl className="ms-auto w-full max-w-xs space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="tabular-nums" dir="ltr">
                  {selected.subtotal}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Tax</dt>
                <dd className="tabular-nums" dir="ltr">
                  {selected.tax}
                </dd>
              </div>
              <Separator />
              <div className="flex justify-between gap-4 text-base font-semibold">
                <dt>Total</dt>
                <dd className="tabular-nums" dir="ltr">
                  {selected.total}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
