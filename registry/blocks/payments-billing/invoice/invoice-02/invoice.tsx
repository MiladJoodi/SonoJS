"use client"

import * as React from "react"
import {
  ArrowLeftIcon,
  Building2Icon,
  ClockIcon,
  CopyIcon,
  DownloadIcon,
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
  title: "VAT Invoice",
  number: "INV-2026-0918",
  issueDate: "1 Jul 2026",
  supplyDate: "1 Jul 2026",
  dueDate: "15 Jul 2026",
  supplier: {
    name: "Northwind B.V.",
    address: ["Herengracht 182", "1016 BR Amsterdam", "Netherlands"],
    email: "billing@northwind.example",
    vat: "NL123456789B01",
  },
  customer: {
    name: "Beacon Labs SAS",
    address: ["14 Rue de la Paix", "75002 Paris", "France"],
    email: "finance@beacon.example",
    vat: "FR44345678901",
  },
  items: [
    {
      description: "Team plan — monthly subscription",
      qty: 1,
      unitNet: 89.0,
      vatRate: 21,
    },
    {
      description: "Usage overage — API calls",
      qty: 1,
      unitNet: 42.5,
      vatRate: 21,
    },
    {
      description: "Onboarding workshop (remote)",
      qty: 2,
      unitNet: 150.0,
      vatRate: 21,
    },
  ],
  bank: {
    beneficiary: "Northwind B.V.",
    iban: "NL91 ABNA 0417 1643 00",
    bic: "ABNANL2A",
  },
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
  const lines = INVOICE.items.map((item) => {
    const net = item.qty * item.unitNet
    const vat = net * (item.vatRate / 100)
    return { ...item, net, vat }
  })
  const netTotal = lines.reduce((s, l) => s + l.net, 0)
  const vatTotal = lines.reduce((s, l) => s + l.vat, 0)
  const total = netTotal + vatTotal

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
            Send reminder
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
        <Alert className="rounded-none border-0 border-b border-amber-500/25 bg-amber-500/10 print:hidden">
          <ClockIcon className="text-amber-700 dark:text-amber-400" aria-hidden />
          <AlertTitle className="text-amber-950 dark:text-amber-100">
            Open · Due {INVOICE.dueDate}
          </AlertTitle>
          <AlertDescription className="text-amber-950/90 dark:text-amber-100/90">
            Amount due{" "}
            <span className="font-semibold tabular-nums" dir="ltr">
              {money(total)}
            </span>
            . Pay by SEPA transfer using the details below.
          </AlertDescription>
        </Alert>

        <div className="p-6 sm:p-10">
          <header className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="text-start">
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {INVOICE.supplier.name}
              </p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                {INVOICE.title}
              </h1>
              <p className="mt-1 font-mono text-sm" dir="ltr">
                {INVOICE.number}
              </p>
            </div>
            <div className="text-start sm:text-end">
              <Badge
                variant="outline"
                className="mb-3 border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-200"
              >
                Open
              </Badge>
              <dl className="space-y-1.5 text-sm">
                <div className="flex gap-3 sm:justify-end">
                  <dt className="text-muted-foreground">Issued</dt>
                  <dd className="font-medium">{INVOICE.issueDate}</dd>
                </div>
                <div className="flex gap-3 sm:justify-end">
                  <dt className="text-muted-foreground">Supply</dt>
                  <dd className="font-medium">{INVOICE.supplyDate}</dd>
                </div>
                <div className="flex gap-3 sm:justify-end">
                  <dt className="text-muted-foreground">Due</dt>
                  <dd className="font-medium">{INVOICE.dueDate}</dd>
                </div>
              </dl>
            </div>
          </header>

          <div className="mb-8 grid gap-6 sm:grid-cols-2">
            <section className="text-start">
              <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                From
              </p>
              <p className="text-sm font-semibold">{INVOICE.supplier.name}</p>
              {INVOICE.supplier.address.map((line) => (
                <p key={line} className="text-sm text-muted-foreground">
                  {line}
                </p>
              ))}
              <p className="mt-2 text-xs">
                VAT{" "}
                <span className="font-medium" dir="ltr">
                  {INVOICE.supplier.vat}
                </span>
              </p>
            </section>
            <section className="text-start">
              <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Bill to
              </p>
              <p className="text-sm font-semibold">{INVOICE.customer.name}</p>
              {INVOICE.customer.address.map((line) => (
                <p key={line} className="text-sm text-muted-foreground">
                  {line}
                </p>
              ))}
              <p className="mt-2 text-xs">
                VAT{" "}
                <span className="font-medium" dir="ltr">
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
                    <TableCell className="max-w-[14rem] text-start font-medium">
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
            <dl className="w-full sm:w-80">
              <div className="flex justify-between py-2 text-sm">
                <dt className="text-muted-foreground">Net total</dt>
                <dd className="font-medium tabular-nums" dir="ltr">
                  {money(netTotal)}
                </dd>
              </div>
              <div className="flex justify-between py-2 text-sm">
                <dt className="text-muted-foreground">VAT 21%</dt>
                <dd className="font-medium tabular-nums" dir="ltr">
                  {money(vatTotal)}
                </dd>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between py-2">
                <dt className="text-base font-semibold">Amount due</dt>
                <dd className="text-xl font-semibold tabular-nums" dir="ltr">
                  {money(total)}
                </dd>
              </div>
            </dl>
          </div>

          <section className="rounded-[12px] border border-border/70 bg-muted/40 p-5 text-start">
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              <Building2Icon className="size-3.5" aria-hidden />
              Pay by bank transfer (SEPA)
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground">Beneficiary</p>
                <p className="text-sm font-medium">{INVOICE.bank.beneficiary}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Payment reference</p>
                <div className="flex items-center gap-2">
                  <p className="font-mono text-sm font-medium" dir="ltr">
                    {INVOICE.number}
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="size-7 cursor-pointer print:hidden"
                    aria-label="Copy payment reference"
                  >
                    <CopyIcon className="size-3.5" aria-hidden />
                  </Button>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">IBAN</p>
                <p className="font-mono text-sm font-medium" dir="ltr">
                  {INVOICE.bank.iban}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">BIC</p>
                <p className="font-mono text-sm font-medium" dir="ltr">
                  {INVOICE.bank.bic}
                </p>
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Include the payment reference so we can match your transfer.
              Payment terms: Net 14.
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
