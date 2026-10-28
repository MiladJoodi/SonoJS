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

const INVOICE = {
  title: "VAT Invoice",
  number: "INV-2026-2201",
  original: true,
  issueDate: "20 Jul 2026",
  supplyDate: "18 Jul 2026",
  dueDate: "3 Aug 2026",
  po: "PO-88421",
  project: "Studio redesign — Phase 2",
  terms: "Net 14 · Bank transfer",
  supplier: {
    name: "Northwind B.V.",
    address: ["Herengracht 182", "1016 BR Amsterdam", "Netherlands"],
    vat: "NL123456789B01",
    chamber: "KvK 34123456",
    email: "billing@northwind.example",
  },
  customer: {
    name: "Studio Helix GmbH",
    address: ["Torstraße 112", "10119 Berlin", "Germany"],
    vat: "DE112233445",
    email: "ap@helix.example",
  },
  items: [
    {
      description: "UI system audit & workshop",
      qty: 1,
      unitNet: 1800,
      vatRate: 21,
    },
    {
      description: "Design tokens package",
      qty: 1,
      unitNet: 650,
      vatRate: 21,
    },
    {
      description: "Implementation support (8h)",
      qty: 8,
      unitNet: 95,
      vatRate: 21,
    },
  ],
  signatory: "M. Vermeer, Finance",
} as const

function money(n: number) {
  return n.toLocaleString("de-DE", { style: "currency", currency: "EUR" })
}

/** Formal A4 invoice with signature line and company stamp placeholder. */
export default function Invoice({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const lines = INVOICE.items.map((item) => {
    const net = item.qty * item.unitNet
    return { ...item, net, vat: net * (item.vatRate / 100) }
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
          className="inline-flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
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
          <header className="mb-8 flex flex-col gap-4 border-b border-border/70 pb-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="text-start">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-semibold tracking-tight">
                  {INVOICE.title}
                </h1>
                {INVOICE.original ? (
                  <Badge variant="outline">Original</Badge>
                ) : null}
              </div>
              <p className="mt-1 font-mono text-sm" dir="ltr">
                {INVOICE.number}
              </p>
              <p className="mt-3 text-sm font-semibold">
                {INVOICE.supplier.name}
              </p>
              {INVOICE.supplier.address.map((line) => (
                <p key={line} className="text-xs text-muted-foreground">
                  {line}
                </p>
              ))}
            </div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-start sm:text-end">
              <dt className="text-muted-foreground">Issue</dt>
              <dd className="font-medium">{INVOICE.issueDate}</dd>
              <dt className="text-muted-foreground">Supply</dt>
              <dd className="font-medium">{INVOICE.supplyDate}</dd>
              <dt className="text-muted-foreground">Due</dt>
              <dd className="font-medium">{INVOICE.dueDate}</dd>
              <dt className="text-muted-foreground">PO</dt>
              <dd className="font-mono font-medium" dir="ltr">
                {INVOICE.po}
              </dd>
              <dt className="text-muted-foreground">Project</dt>
              <dd className="font-medium sm:max-w-48 sm:justify-self-end">
                {INVOICE.project}
              </dd>
            </dl>
          </header>

          <div className="mb-8 grid gap-6 sm:grid-cols-2">
            <section className="text-start">
              <p className="mb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
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
                <span className="font-mono font-medium" dir="ltr">
                  {INVOICE.customer.vat}
                </span>
              </p>
            </section>
            <section className="text-start sm:text-end">
              <p className="mb-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Supplier VAT
              </p>
              <p className="font-mono text-sm font-medium" dir="ltr">
                {INVOICE.supplier.vat}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {INVOICE.supplier.chamber}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                Terms: {INVOICE.terms}
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
                      {money(line.net)}
                    </TableCell>
                    <TableCell className="text-end tabular-nums" dir="ltr">
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

          <div className="mb-10 flex justify-end">
            <dl className="w-full sm:w-72">
              <div className="flex justify-between py-1.5 text-sm">
                <dt className="text-muted-foreground">Net</dt>
                <dd className="tabular-nums" dir="ltr">
                  {money(netTotal)}
                </dd>
              </div>
              <div className="flex justify-between py-1.5 text-sm">
                <dt className="text-muted-foreground">VAT 21%</dt>
                <dd className="tabular-nums" dir="ltr">
                  {money(vatTotal)}
                </dd>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between py-1.5">
                <dt className="font-semibold">Total</dt>
                <dd className="text-lg font-semibold tabular-nums" dir="ltr">
                  {money(total)}
                </dd>
              </div>
            </dl>
          </div>

          <div className="grid gap-8 border-t border-border/70 pt-8 sm:grid-cols-2">
            <div className="text-start">
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Authorized signature
              </p>
              <div className="mt-10 border-b border-foreground/40" />
              <p className="mt-2 text-sm font-medium">{INVOICE.signatory}</p>
              <p className="text-xs text-muted-foreground">
                For and on behalf of {INVOICE.supplier.name}
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end">
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Company stamp / seal
              </p>
              <div
                className="mt-3 flex size-28 items-center justify-center rounded-full border-2 border-dashed border-border/80 bg-muted/30 text-center"
                role="img"
                aria-label="Company stamp placeholder"
              >
                <span className="max-w-22 text-[10px] leading-tight text-muted-foreground">
                  Official seal
                  <br />
                  <span dir="ltr">{INVOICE.supplier.vat}</span>
                </span>
              </div>
            </div>
          </div>

          <footer className="mt-8 text-start text-[11px] text-muted-foreground">
            Contact {INVOICE.supplier.email}. This is the original customer copy.
          </footer>
        </div>
      </article>
    </div>
  )
}
