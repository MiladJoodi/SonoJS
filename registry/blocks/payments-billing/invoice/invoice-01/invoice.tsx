"use client"

import * as React from "react"
import {
  ArrowLeftIcon,
  CheckCircle2Icon,
  CreditCardIcon,
  DownloadIcon,
  MailIcon,
  PrinterIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Separator } from "@sonojs/ui/components/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@sonojs/ui/components/table"
import { cn } from "@/lib/utils"

const INVOICE = {
  title: "VAT Invoice",
  number: "INV-2026-0842",
  issueDate: "23 Jun 2026",
  supplyDate: "23 Jun 2026",
  dueDate: "7 Jul 2026",
  currency: "EUR",
  supplier: {
    name: "Northwind B.V.",
    address: ["Herengracht 182", "1016 BR Amsterdam", "Netherlands"],
    email: "billing@northwind.example",
    vat: "NL123456789B01",
  },
  customer: {
    name: "Acme GmbH",
    address: ["Friedrichstraße 68", "10117 Berlin", "Germany"],
    email: "ap@acme.example",
    vat: "DE987654321",
  },
  items: [
    {
      description: "Pro platform — annual subscription",
      qty: 1,
      unitNet: 420.0,
      vatRate: 21,
    },
    {
      description: "Additional seats (×5)",
      qty: 5,
      unitNet: 36.0,
      vatRate: 21,
    },
    {
      description: "Priority support add-on",
      qty: 1,
      unitNet: 80.0,
      vatRate: 21,
    },
  ],
  discount: { label: "LAUNCH10", rate: 0.1 },
  payment: {
    method: "Visa ···· 4242",
    date: "23 Jun 2026",
    reference: "pi_3PxQhLHk8J2a9f01",
  },
} as const

function money(n: number) {
  return n.toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
  })
}

function lineNet(qty: number, unitNet: number) {
  return qty * unitNet
}

function lineVat(qty: number, unitNet: number, rate: number) {
  return lineNet(qty, unitNet) * (rate / 100)
}

export default function Invoice({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const lines = INVOICE.items.map((item) => {
    const net = lineNet(item.qty, item.unitNet)
    const vat = lineVat(item.qty, item.unitNet, item.vatRate)
    return { ...item, net, vat, gross: net + vat }
  })

  const subtotal = lines.reduce((s, l) => s + l.net, 0)
  const discountAmount = -(subtotal * INVOICE.discount.rate)
  const taxable = subtotal + discountAmount
  const vatTotal = taxable * 0.21
  const total = taxable + vatTotal

  return (
    <div
      className={cn(
        "min-h-[min(48rem,100svh)] bg-canvas px-4 py-8 text-foreground sm:px-6 sm:py-12",
        className
      )}
      {...props}
    >
      <div className="mx-auto mb-4 flex max-w-3xl flex-col gap-3 print:hidden sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          className="inline-flex cursor-pointer items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon className="icon-dir size-4" aria-hidden />
          Back to invoices
        </button>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="cursor-pointer gap-1.5"
          >
            <MailIcon className="size-3.5" aria-hidden />
            Email
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="cursor-pointer gap-1.5"
          >
            <DownloadIcon className="size-3.5" aria-hidden />
            Download PDF
          </Button>
          <Button
            type="button"
            size="sm"
            className="cursor-pointer gap-1.5"
            onClick={() => window.print()}
          >
            <PrinterIcon className="size-3.5" aria-hidden />
            Print
          </Button>
        </div>
      </div>

      <article className="mx-auto max-w-3xl overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft print:rounded-none print:border-0 print:shadow-none">
        <div className="p-6 sm:p-10">
          <header className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="text-start">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">
                  N
                </div>
                <div>
                  <p className="text-base font-semibold tracking-tight">
                    {INVOICE.supplier.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {INVOICE.supplier.email}
                  </p>
                </div>
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">
                {INVOICE.title}
              </h1>
              <p className="mt-1 font-mono text-sm text-muted-foreground" dir="ltr">
                {INVOICE.number}
              </p>
            </div>

            <div className="text-start sm:text-end">
              <Badge
                variant="secondary"
                className="mb-3 gap-1 border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
              >
                <CheckCircle2Icon className="size-3.5" aria-hidden />
                Paid
              </Badge>
              <dl className="space-y-1.5 text-sm">
                <div className="flex gap-3 sm:justify-end">
                  <dt className="text-muted-foreground">Issue date</dt>
                  <dd className="font-medium">{INVOICE.issueDate}</dd>
                </div>
                <div className="flex gap-3 sm:justify-end">
                  <dt className="text-muted-foreground">Supply date</dt>
                  <dd className="font-medium">{INVOICE.supplyDate}</dd>
                </div>
                <div className="flex gap-3 sm:justify-end">
                  <dt className="text-muted-foreground">Due date</dt>
                  <dd className="font-medium">{INVOICE.dueDate}</dd>
                </div>
              </dl>
            </div>
          </header>

          <div className="mb-8 grid gap-6 sm:grid-cols-2">
            <section className="rounded-[12px] border border-border/70 bg-muted/30 p-4 text-start">
              <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                From
              </p>
              <p className="text-sm font-semibold text-foreground">
                {INVOICE.supplier.name}
              </p>
              {INVOICE.supplier.address.map((line) => (
                <p key={line} className="text-sm text-muted-foreground">
                  {line}
                </p>
              ))}
              <p className="mt-2 text-xs text-muted-foreground">
                VAT{" "}
                <span className="font-medium text-foreground" dir="ltr">
                  {INVOICE.supplier.vat}
                </span>
              </p>
            </section>
            <section className="rounded-[12px] border border-border/70 bg-muted/30 p-4 text-start">
              <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Bill to
              </p>
              <p className="text-sm font-semibold text-foreground">
                {INVOICE.customer.name}
              </p>
              {INVOICE.customer.address.map((line) => (
                <p key={line} className="text-sm text-muted-foreground">
                  {line}
                </p>
              ))}
              <p className="mt-2 text-xs text-muted-foreground">
                VAT{" "}
                <span className="font-medium text-foreground" dir="ltr">
                  {INVOICE.customer.vat}
                </span>
              </p>
            </section>
          </div>

          <div className="mb-8 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Description</TableHead>
                  <TableHead className="text-end">Qty</TableHead>
                  <TableHead className="text-end">Unit (net)</TableHead>
                  <TableHead className="text-end">Net</TableHead>
                  <TableHead className="text-end">VAT</TableHead>
                  <TableHead className="text-end">VAT amt</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lines.map((line) => (
                  <TableRow key={line.description}>
                    <TableCell className="max-w-[14rem] font-medium text-start">
                      {line.description}
                    </TableCell>
                    <TableCell
                      className="text-end tabular-nums text-muted-foreground"
                      dir="ltr"
                    >
                      {line.qty}
                    </TableCell>
                    <TableCell
                      className="text-end tabular-nums text-muted-foreground"
                      dir="ltr"
                    >
                      {money(line.unitNet)}
                    </TableCell>
                    <TableCell className="text-end tabular-nums" dir="ltr">
                      {money(line.net)}
                    </TableCell>
                    <TableCell
                      className="text-end tabular-nums text-muted-foreground"
                      dir="ltr"
                    >
                      {line.vatRate}%
                    </TableCell>
                    <TableCell className="text-end tabular-nums" dir="ltr">
                      {money(line.vat)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mb-8 flex justify-end">
            <dl className="w-full space-y-0 sm:w-80">
              <div className="flex items-center justify-between py-2 text-sm">
                <dt className="text-muted-foreground">Net subtotal</dt>
                <dd className="font-medium tabular-nums" dir="ltr">
                  {money(subtotal)}
                </dd>
              </div>
              <div className="flex items-center justify-between py-2 text-sm">
                <dt className="text-emerald-700 dark:text-emerald-400">
                  Discount ({INVOICE.discount.label})
                </dt>
                <dd
                  className="font-medium text-emerald-700 tabular-nums dark:text-emerald-400"
                  dir="ltr"
                >
                  {money(discountAmount)}
                </dd>
              </div>
              <div className="flex items-center justify-between py-2 text-sm">
                <dt className="text-muted-foreground">VAT 21%</dt>
                <dd className="font-medium tabular-nums" dir="ltr">
                  {money(vatTotal)}
                </dd>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center justify-between py-2">
                <dt className="text-base font-semibold">Total</dt>
                <dd
                  className="text-xl font-semibold tabular-nums text-foreground"
                  dir="ltr"
                >
                  {money(total)}
                </dd>
              </div>
            </dl>
          </div>

          <section className="rounded-[12px] border border-emerald-500/20 bg-emerald-500/5 p-5 text-start">
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-emerald-700 uppercase dark:text-emerald-300">
              <CreditCardIcon className="size-3.5" aria-hidden />
              Payment received
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              <div>
                <p className="mb-0.5 text-xs text-muted-foreground">Method</p>
                <p className="text-sm font-medium" dir="ltr">
                  {INVOICE.payment.method}
                </p>
              </div>
              <div>
                <p className="mb-0.5 text-xs text-muted-foreground">Date</p>
                <p className="text-sm font-medium">{INVOICE.payment.date}</p>
              </div>
              <div>
                <p className="mb-0.5 text-xs text-muted-foreground">Reference</p>
                <p className="font-mono text-sm font-medium" dir="ltr">
                  {INVOICE.payment.reference}
                </p>
              </div>
            </div>
          </section>

          <footer className="mt-8 border-t border-border/70 pt-5 text-start text-xs text-muted-foreground">
            Payment terms: Due on receipt. Questions?{" "}
            <span dir="ltr">{INVOICE.supplier.email}</span>
          </footer>
        </div>
      </article>
    </div>
  )
}
