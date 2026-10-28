"use client"

import * as React from "react"
import {
  ArrowLeftIcon,
  DownloadIcon,
  FileTextIcon,
  MailIcon,
  PrinterIcon,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@sonojs/ui/components/alert"
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
  title: "Tax Invoice",
  number: "INV-2026-1104",
  issueDate: "12 Jul 2026",
  supplyDate: "10 Jul 2026",
  dueDate: "26 Jul 2026",
  supplier: {
    name: "Northwind B.V.",
    address: ["Herengracht 182", "1016 BR Amsterdam", "Netherlands"],
    email: "billing@northwind.example",
    vat: "NL123456789B01",
    chamber: "KvK 34123456",
  },
  customer: {
    name: "Orbit Systems Ltd",
    address: ["1 Canada Square", "London E14 5AB", "United Kingdom"],
    email: "accounts@orbit.example",
    vat: "GB123456789",
  },
  items: [
    {
      description: "Enterprise platform license — annual",
      qty: 1,
      unitNet: 4800.0,
    },
    {
      description: "Dedicated success manager — Q3",
      qty: 1,
      unitNet: 1200.0,
    },
    {
      description: "Custom SSO integration (fixed fee)",
      qty: 1,
      unitNet: 900.0,
    },
  ],
  bank: {
    beneficiary: "Northwind B.V.",
    iban: "NL91 ABNA 0417 1643 00",
    bic: "ABNANL2A",
  },
  reverseChargeNote:
    "Tax to be accounted for by the recipient under the reverse charge mechanism. VAT charged by supplier: 0%.",
} as const

function money(n: number) {
  return n.toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
  })
}

export default function Invoice({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const lines = INVOICE.items.map((item) => ({
    ...item,
    net: item.qty * item.unitNet,
    vatRate: 0,
    vat: 0,
  }))
  const netTotal = lines.reduce((s, l) => s + l.net, 0)
  const vatTotal = 0
  const total = netTotal

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
        <div className="border-b border-border/70 bg-zinc-950 px-6 py-6 text-zinc-50 sm:px-10 sm:py-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="text-start">
              <p className="text-xs font-medium tracking-[0.14em] text-zinc-400 uppercase">
                Cross-border B2B
              </p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight">
                {INVOICE.title}
              </h1>
              <p className="mt-1 font-mono text-sm text-zinc-300" dir="ltr">
                {INVOICE.number}
              </p>
            </div>
            <div className="text-start sm:text-end">
              <Badge className="mb-3 border-0 bg-white/10 text-zinc-50">
                Reverse charge
              </Badge>
              <dl className="space-y-1 text-sm text-zinc-300">
                <div className="flex gap-3 sm:justify-end">
                  <dt className="text-zinc-500">Issued</dt>
                  <dd>{INVOICE.issueDate}</dd>
                </div>
                <div className="flex gap-3 sm:justify-end">
                  <dt className="text-zinc-500">Supply</dt>
                  <dd>{INVOICE.supplyDate}</dd>
                </div>
                <div className="flex gap-3 sm:justify-end">
                  <dt className="text-zinc-500">Due</dt>
                  <dd className="text-zinc-50">{INVOICE.dueDate}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <div className="mb-8 grid gap-6 sm:grid-cols-2">
            <section className="rounded-[12px] border border-border/70 p-4 text-start">
              <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Supplier
              </p>
              <p className="text-sm font-semibold">{INVOICE.supplier.name}</p>
              {INVOICE.supplier.address.map((line) => (
                <p key={line} className="text-sm text-muted-foreground">
                  {line}
                </p>
              ))}
              <p className="mt-3 text-xs text-muted-foreground">
                VAT ID{" "}
                <span
                  className="rounded-md bg-muted px-1.5 py-0.5 font-mono font-medium text-foreground"
                  dir="ltr"
                >
                  {INVOICE.supplier.vat}
                </span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {INVOICE.supplier.chamber}
              </p>
            </section>
            <section className="rounded-[12px] border border-border/70 p-4 text-start">
              <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Customer
              </p>
              <p className="text-sm font-semibold">{INVOICE.customer.name}</p>
              {INVOICE.customer.address.map((line) => (
                <p key={line} className="text-sm text-muted-foreground">
                  {line}
                </p>
              ))}
              <p className="mt-3 text-xs text-muted-foreground">
                VAT ID{" "}
                <span
                  className="rounded-md bg-muted px-1.5 py-0.5 font-mono font-medium text-foreground"
                  dir="ltr"
                >
                  {INVOICE.customer.vat}
                </span>
              </p>
            </section>
          </div>

          <Alert className="mb-8 border-border/70 bg-muted/40">
            <FileTextIcon aria-hidden />
            <AlertTitle>Reverse charge</AlertTitle>
            <AlertDescription>{INVOICE.reverseChargeNote}</AlertDescription>
          </Alert>

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
                    <TableCell className="max-w-[16rem] text-start font-medium">
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
                      0%
                    </TableCell>
                    <TableCell className="text-end tabular-nums" dir="ltr">
                      {money(0)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_minmax(14rem,18rem)]">
            <section className="rounded-[12px] border border-border/70 p-4 text-start">
              <p className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Wire instructions
              </p>
              <dl className="space-y-2 text-sm">
                <div className="flex flex-wrap justify-between gap-2">
                  <dt className="text-muted-foreground">Beneficiary</dt>
                  <dd className="font-medium">{INVOICE.bank.beneficiary}</dd>
                </div>
                <div className="flex flex-wrap justify-between gap-2">
                  <dt className="text-muted-foreground">IBAN</dt>
                  <dd className="font-mono font-medium" dir="ltr">
                    {INVOICE.bank.iban}
                  </dd>
                </div>
                <div className="flex flex-wrap justify-between gap-2">
                  <dt className="text-muted-foreground">BIC</dt>
                  <dd className="font-mono font-medium" dir="ltr">
                    {INVOICE.bank.bic}
                  </dd>
                </div>
                <div className="flex flex-wrap justify-between gap-2">
                  <dt className="text-muted-foreground">Reference</dt>
                  <dd className="font-mono font-medium" dir="ltr">
                    {INVOICE.number}
                  </dd>
                </div>
              </dl>
            </section>

            <dl className="rounded-[12px] border border-border/70 bg-muted/30 p-4">
              <div className="flex justify-between py-1.5 text-sm">
                <dt className="text-muted-foreground">Net total</dt>
                <dd className="font-medium tabular-nums" dir="ltr">
                  {money(netTotal)}
                </dd>
              </div>
              <div className="flex justify-between py-1.5 text-sm">
                <dt className="text-muted-foreground">VAT (0%)</dt>
                <dd className="font-medium tabular-nums" dir="ltr">
                  {money(vatTotal)}
                </dd>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between py-1.5">
                <dt className="font-semibold">Amount due</dt>
                <dd className="text-lg font-semibold tabular-nums" dir="ltr">
                  {money(total)}
                </dd>
              </div>
            </dl>
          </div>

          <footer className="border-t border-border/70 pt-5 text-xs text-muted-foreground text-start">
            Payment terms: Net 14. This document is a tax invoice for
            intra-community / reverse-charge supplies. Contact{" "}
            <span dir="ltr">{INVOICE.supplier.email}</span> with questions.
          </footer>
        </div>
      </article>
    </div>
  )
}
