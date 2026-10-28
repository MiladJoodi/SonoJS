"use client"

import * as React from "react"
import {
  ArrowLeftIcon,
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

const STATEMENT = {
  brand: "Northwind Commerce",
  number: "STMT-2026-0914",
  period: "1 Sep 2026 – 14 Sep 2026",
  issueDate: "15 Sep 2026",
  status: "Paid",
  billTo: {
    name: "Helix Retail AG",
    address: ["Bahnhofstrasse 45", "8001 Zürich", "Switzerland"],
    vat: "CHE-123.456.789 MWST",
  },
  shipTo: {
    name: "Helix DC West",
    address: ["Industriepark 7", "4052 Basel", "Switzerland"],
  },
  supplier: {
    name: "Northwind B.V.",
    address: ["Herengracht 182", "1016 BR Amsterdam", "Netherlands"],
    vat: "NL123456789B01",
    iban: "NL91 ABNA 0417 1643 00",
  },
  items: [
    {
      sku: "HW-221",
      description: "Wireless headset Pro",
      qty: 12,
      unitNet: 89,
      vatRate: 21,
    },
    {
      sku: "HW-118",
      description: "USB-C hub 7-port",
      qty: 24,
      unitNet: 34.5,
      vatRate: 21,
    },
    {
      sku: "BK-044",
      description: "Field notebook (pack of 10)",
      qty: 6,
      unitNet: 28,
      vatRate: 9,
    },
    {
      sku: "BK-012",
      description: "Planner refill set",
      qty: 10,
      unitNet: 12.5,
      vatRate: 9,
    },
  ],
} as const

function money(n: number) {
  return n.toLocaleString("de-DE", { style: "currency", currency: "EUR" })
}

/** Wide branded statement with mixed VAT rates and color totals band. */
export default function Invoice({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const lines = STATEMENT.items.map((item) => {
    const net = item.qty * item.unitNet
    return { ...item, net, vat: net * (item.vatRate / 100) }
  })

  const byRate = lines.reduce(
    (acc, line) => {
      const key = String(line.vatRate)
      if (!acc[key]) acc[key] = { rate: line.vatRate, net: 0, vat: 0 }
      acc[key].net += line.net
      acc[key].vat += line.vat
      return acc
    },
    {} as Record<string, { rate: number; net: number; vat: number }>
  )
  const vatRows = Object.values(byRate).sort((a, b) => b.rate - a.rate)
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
      <div className="mx-auto mb-4 flex max-w-4xl flex-col gap-3 print:hidden sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          className="inline-flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon className="icon-dir size-4" aria-hidden />
          Back to statements
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

      <article className="mx-auto max-w-4xl overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft print:rounded-none print:border-0 print:shadow-none">
        <div className="flex">
          <div
            className="hidden w-2 shrink-0 bg-primary sm:block print:hidden"
            aria-hidden
          />
          <div className="min-w-0 flex-1">
            <header className="flex flex-col gap-4 border-b border-border/70 bg-primary/5 px-6 py-6 sm:flex-row sm:items-start sm:justify-between sm:px-8 sm:py-8">
              <div className="text-start">
                <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                  {STATEMENT.brand}
                </p>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                  Sales statement
                </h1>
                <p className="mt-1 font-mono text-sm" dir="ltr">
                  {STATEMENT.number}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Period {STATEMENT.period}
                </p>
              </div>
              <div className="flex flex-col items-start gap-2 sm:items-end">
                <Badge>{STATEMENT.status}</Badge>
                <p className="text-sm text-muted-foreground">
                  Issued {STATEMENT.issueDate}
                </p>
              </div>
            </header>

            <div className="grid gap-6 px-6 py-6 sm:grid-cols-2 sm:px-8">
              <section className="text-start">
                <p className="mb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Bill to
                </p>
                <p className="text-sm font-semibold">{STATEMENT.billTo.name}</p>
                {STATEMENT.billTo.address.map((line) => (
                  <p key={line} className="text-sm text-muted-foreground">
                    {line}
                  </p>
                ))}
                <p className="mt-2 text-xs">
                  VAT{" "}
                  <span className="font-mono font-medium" dir="ltr">
                    {STATEMENT.billTo.vat}
                  </span>
                </p>
              </section>
              <section className="text-start sm:text-end">
                <p className="mb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Ship to
                </p>
                <p className="text-sm font-semibold">{STATEMENT.shipTo.name}</p>
                {STATEMENT.shipTo.address.map((line) => (
                  <p key={line} className="text-sm text-muted-foreground">
                    {line}
                  </p>
                ))}
              </section>
            </div>

            <div className="overflow-x-auto px-6 sm:px-8">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>SKU</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-end">Qty</TableHead>
                    <TableHead className="text-end">Unit (net)</TableHead>
                    <TableHead className="text-end">VAT</TableHead>
                    <TableHead className="text-end">Net</TableHead>
                    <TableHead className="text-end">VAT amt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lines.map((line) => (
                    <TableRow key={line.sku}>
                      <TableCell className="font-mono text-xs" dir="ltr">
                        {line.sku}
                      </TableCell>
                      <TableCell className="text-start font-medium">
                        {line.description}
                      </TableCell>
                      <TableCell className="text-end tabular-nums" dir="ltr">
                        {line.qty}
                      </TableCell>
                      <TableCell className="text-end tabular-nums" dir="ltr">
                        {money(line.unitNet)}
                      </TableCell>
                      <TableCell className="text-end tabular-nums" dir="ltr">
                        {line.vatRate}%
                      </TableCell>
                      <TableCell className="text-end tabular-nums" dir="ltr">
                        {money(line.net)}
                      </TableCell>
                      <TableCell className="text-end tabular-nums" dir="ltr">
                        {money(line.vat)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 grid gap-6 px-6 pb-6 sm:grid-cols-[1fr_minmax(16rem,20rem)] sm:px-8 sm:pb-8">
              <section className="text-start">
                <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  VAT summary by rate
                </p>
                <div className="overflow-hidden rounded-md border border-border/70">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead>Rate</TableHead>
                        <TableHead className="text-end">Net</TableHead>
                        <TableHead className="text-end">VAT</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vatRows.map((row) => (
                        <TableRow key={row.rate}>
                          <TableCell className="tabular-nums" dir="ltr">
                            {row.rate}%
                          </TableCell>
                          <TableCell className="text-end tabular-nums" dir="ltr">
                            {money(row.net)}
                          </TableCell>
                          <TableCell className="text-end tabular-nums" dir="ltr">
                            {money(row.vat)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  Supplier VAT{" "}
                  <span className="font-mono font-medium text-foreground" dir="ltr">
                    {STATEMENT.supplier.vat}
                  </span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  IBAN{" "}
                  <span className="font-mono font-medium text-foreground" dir="ltr">
                    {STATEMENT.supplier.iban}
                  </span>
                </p>
              </section>

              <div className="rounded-[12px] bg-primary px-5 py-5 text-primary-foreground">
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="opacity-90">Net</dt>
                    <dd className="tabular-nums" dir="ltr">
                      {money(netTotal)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="opacity-90">VAT</dt>
                    <dd className="tabular-nums" dir="ltr">
                      {money(vatTotal)}
                    </dd>
                  </div>
                  <Separator className="bg-primary-foreground/25" />
                  <div className="flex justify-between gap-4 pt-1">
                    <dt className="text-base font-semibold">Total</dt>
                    <dd className="text-lg font-semibold tabular-nums" dir="ltr">
                      {money(total)}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
