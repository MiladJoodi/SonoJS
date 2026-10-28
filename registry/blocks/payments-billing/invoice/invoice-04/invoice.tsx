"use client"

import * as React from "react"
import { DownloadIcon, PrinterIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

const RECEIPT = {
  brand: "Northwind Café",
  number: "RCPT-4821",
  date: "28 Oct 2026 · 14:32",
  vat: "NL123456789B01",
  items: [
    { name: "Flat white", qty: 2, unit: 3.5 },
    { name: "Croissant", qty: 1, unit: 2.8 },
    { name: "Seasonal salad", qty: 1, unit: 9.5 },
  ],
  vatRate: 9,
  paymentRef: "NW-4821-14",
} as const

function money(n: number) {
  return n.toLocaleString("de-DE", { style: "currency", currency: "EUR" })
}

/** Compact thermal-style receipt — narrow width, dense lines. */
export default function Invoice({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const lines = RECEIPT.items.map((item) => ({
    ...item,
    line: item.qty * item.unit,
  }))
  const net = lines.reduce((s, l) => s + l.line, 0)
  const vat = net * (RECEIPT.vatRate / 100)
  const total = net + vat

  return (
    <div
      className={cn(
        "flex w-full justify-center bg-canvas px-4 py-10 text-foreground sm:px-6 sm:py-14",
        className
      )}
      {...props}
    >
      <div className="w-full max-w-sm space-y-3">
        <div className="flex justify-end gap-2 print:hidden">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="cursor-pointer gap-1.5"
          >
            <DownloadIcon className="size-3.5" aria-hidden />
            PDF
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

        <article className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft print:rounded-none print:border-0 print:shadow-none">
          <div className="px-5 py-6 text-center sm:px-6">
            <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              N
            </div>
            <h1 className="text-base font-semibold tracking-tight">
              {RECEIPT.brand}
            </h1>
            <p className="mt-1 font-mono text-xs text-muted-foreground" dir="ltr">
              {RECEIPT.number}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">{RECEIPT.date}</p>
            <Badge variant="secondary" className="mt-3">
              Paid
            </Badge>
          </div>

          <Separator className="border-dashed" />

          <ul className="space-y-2 px-5 py-4 font-mono text-sm sm:px-6" role="list">
            {lines.map((line) => (
              <li key={line.name} className="flex items-start justify-between gap-3">
                <div className="min-w-0 text-start">
                  <p className="truncate font-sans text-sm font-medium">
                    {line.name}
                  </p>
                  <p className="text-xs text-muted-foreground" dir="ltr">
                    {line.qty} × {money(line.unit)}
                  </p>
                </div>
                <span className="shrink-0 tabular-nums" dir="ltr">
                  {money(line.line)}
                </span>
              </li>
            ))}
          </ul>

          <Separator className="border-dashed" />

          <dl className="space-y-1.5 px-5 py-4 font-mono text-sm sm:px-6">
            <div className="flex justify-between">
              <dt className="font-sans text-muted-foreground">Net</dt>
              <dd className="tabular-nums" dir="ltr">
                {money(net)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-sans text-muted-foreground">
                VAT {RECEIPT.vatRate}%
              </dt>
              <dd className="tabular-nums" dir="ltr">
                {money(vat)}
              </dd>
            </div>
            <div className="flex justify-between pt-1 text-base font-semibold">
              <dt className="font-sans">Total</dt>
              <dd className="tabular-nums" dir="ltr">
                {money(total)}
              </dd>
            </div>
          </dl>

          <Separator className="border-dashed" />

          <div className="px-5 py-5 text-center sm:px-6">
            <p className="text-xs text-muted-foreground">Payment reference</p>
            <div
              className="mx-auto mt-2 flex size-24 items-center justify-center rounded-md border border-dashed border-border/70 bg-muted/40"
              aria-hidden
            >
              <div className="grid size-16 grid-cols-4 gap-0.5 p-1">
                {Array.from({ length: 16 }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "rounded-[1px] bg-foreground/80",
                      i % 3 === 0 && "bg-transparent"
                    )}
                  />
                ))}
              </div>
            </div>
            <p className="mt-2 font-mono text-xs font-medium" dir="ltr">
              {RECEIPT.paymentRef}
            </p>
            <p className="mt-3 text-[11px] text-muted-foreground">
              VAT{" "}
              <span dir="ltr" className="font-medium text-foreground">
                {RECEIPT.vat}
              </span>
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Thank you — keep this receipt
            </p>
          </div>
        </article>
      </div>
    </div>
  )
}
