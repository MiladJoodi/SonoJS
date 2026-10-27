"use client"

import * as React from "react"
import {
  ArrowLeftIcon,
  Building2Icon,
  CheckCircle2Icon,
  CreditCardIcon,
  DownloadIcon,
  MailIcon,
  MapPinIcon,
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
  id: "INV-2026-0842",
  issueDate: "June 23, 2026",
  dueDate: "July 7, 2026",
  status: "paid" as const,
  company: {
    name: "SonoJS Inc.",
    address: "100 Market Street, Suite 300",
    city: "San Francisco, CA 94105",
    email: "billing@sonojs.dev",
    taxId: "US 12-3456789",
  },
  client: {
    name: "Acme Corporation",
    contact: "Sarah Connor",
    address: "555 Enterprise Blvd",
    city: "Austin, TX 73301",
    email: "sarah@acmecorp.io",
  },
  items: [
    {
      description: "SonoJS Pro License (Annual)",
      qty: 1,
      unitPrice: 249.0,
      total: 249.0,
    },
    {
      description: "Extra Team Seats (×5)",
      qty: 5,
      unitPrice: 49.0,
      total: 245.0,
    },
    {
      description: "Priority Support Add-on",
      qty: 1,
      unitPrice: 99.0,
      total: 99.0,
    },
    {
      description: "Template Bundle — Full Access",
      qty: 1,
      unitPrice: 149.0,
      total: 149.0,
    },
  ],
  subtotal: 742.0,
  discount: { label: "LAUNCH20 promo", amount: -74.2 },
  tax: { rate: 8.5, amount: 57.06 },
  total: 724.86,
  payment: {
    method: "Visa ···· 4242",
    date: "June 23, 2026",
    reference: "ch_3PxQhLBHk8J1234567",
  },
}

function money(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })
}

export default function Invoice({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "min-h-[min(48rem,100svh)] bg-canvas px-4 py-8 text-foreground sm:px-6",
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
          <Button type="button" variant="outline" size="sm" className="gap-1.5">
            <MailIcon className="size-3.5" aria-hidden />
            Email
          </Button>
          <Button type="button" variant="outline" size="sm" className="gap-1.5">
            <DownloadIcon className="size-3.5" aria-hidden />
            Download PDF
          </Button>
          <Button
            type="button"
            size="sm"
            className="gap-1.5"
            onClick={() => window.print()}
          >
            <PrinterIcon className="size-3.5" aria-hidden />
            Print
          </Button>
        </div>
      </div>

      <article className="mx-auto max-w-3xl overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft print:rounded-none print:border-0 print:shadow-none">
        <div className="h-1.5 bg-primary print:hidden" aria-hidden />

        <div className="p-6 sm:p-10">
          <header className="mb-10 flex flex-col gap-8 sm:flex-row sm:justify-between">
            <div className="text-start">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
                  S
                </div>
                <div>
                  <h1 className="text-lg font-semibold tracking-tight">
                    {INVOICE.company.name}
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    {INVOICE.company.email}
                  </p>
                </div>
              </div>
              <div className="space-y-0.5 text-xs text-muted-foreground">
                <p>{INVOICE.company.address}</p>
                <p>{INVOICE.company.city}</p>
                <p>Tax ID: {INVOICE.company.taxId}</p>
              </div>
            </div>

            <div className="text-start sm:text-end">
              <Badge
                variant="secondary"
                className="mb-3 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
              >
                <CheckCircle2Icon className="size-3.5" aria-hidden />
                Paid
              </Badge>
              <h2
                className="text-2xl font-semibold tracking-tight tabular-nums"
                dir="ltr"
              >
                {INVOICE.id}
              </h2>
              <dl className="mt-2 space-y-1 text-xs">
                <div className="flex gap-2 sm:justify-end">
                  <dt className="w-14 text-muted-foreground sm:text-end">
                    Issued
                  </dt>
                  <dd className="font-medium">{INVOICE.issueDate}</dd>
                </div>
                <div className="flex gap-2 sm:justify-end">
                  <dt className="w-14 text-muted-foreground sm:text-end">Due</dt>
                  <dd className="font-medium">{INVOICE.dueDate}</dd>
                </div>
              </dl>
            </div>
          </header>

          <section className="mb-8 rounded-lg border border-border/70 bg-muted/30 p-5 text-start">
            <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              <Building2Icon className="size-3.5" aria-hidden />
              Bill to
            </p>
            <h3 className="text-base font-semibold">{INVOICE.client.name}</h3>
            <p className="text-sm text-muted-foreground">
              {INVOICE.client.contact}
            </p>
            <p className="mt-2 inline-flex items-start gap-1.5 text-xs text-muted-foreground">
              <MapPinIcon className="mt-0.5 size-3.5 shrink-0" aria-hidden />
              {INVOICE.client.address}, {INVOICE.client.city}
            </p>
          </section>

          <div className="mb-8 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Description</TableHead>
                  <TableHead className="text-end">Qty</TableHead>
                  <TableHead className="text-end">Unit price</TableHead>
                  <TableHead className="text-end">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {INVOICE.items.map((item) => (
                  <TableRow key={item.description}>
                    <TableCell className="font-medium">
                      {item.description}
                    </TableCell>
                    <TableCell className="text-end text-muted-foreground tabular-nums" dir="ltr">
                      {item.qty}
                    </TableCell>
                    <TableCell className="text-end text-muted-foreground tabular-nums" dir="ltr">
                      {money(item.unitPrice)}
                    </TableCell>
                    <TableCell className="text-end font-semibold tabular-nums" dir="ltr">
                      {money(item.total)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mb-10 flex justify-end">
            <dl className="w-full space-y-0 sm:w-72">
              <div className="flex items-center justify-between py-2.5 text-sm">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-medium tabular-nums" dir="ltr">
                  {money(INVOICE.subtotal)}
                </dd>
              </div>
              <div className="flex items-center justify-between py-2.5 text-sm">
                <dt className="text-emerald-700 dark:text-emerald-400">
                  {INVOICE.discount.label}
                </dt>
                <dd className="font-medium text-emerald-700 tabular-nums dark:text-emerald-400" dir="ltr">
                  {money(INVOICE.discount.amount)}
                </dd>
              </div>
              <div className="flex items-center justify-between py-2.5 text-sm">
                <dt className="text-muted-foreground">
                  Tax ({INVOICE.tax.rate}%)
                </dt>
                <dd className="font-medium tabular-nums" dir="ltr">
                  {money(INVOICE.tax.amount)}
                </dd>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center justify-between py-2">
                <dt className="text-base font-semibold">Total due</dt>
                <dd className="text-xl font-semibold text-primary tabular-nums" dir="ltr">
                  {money(INVOICE.total)}
                </dd>
              </div>
            </dl>
          </div>

          <section className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-5 text-start">
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

          <footer className="mt-10 border-t border-border/70 pt-6 text-center text-xs text-muted-foreground">
            Thank you for your business. Questions? Contact{" "}
            {INVOICE.company.email}
          </footer>
        </div>
      </article>
    </div>
  )
}
