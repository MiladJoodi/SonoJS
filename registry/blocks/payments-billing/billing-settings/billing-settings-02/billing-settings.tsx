"use client"

import * as React from "react"
import { CreditCardIcon, DownloadIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

const INVOICES = [
  { id: "INV-001", date: "Jun 1, 2026", amount: "$49.00" },
  { id: "INV-002", date: "May 1, 2026", amount: "$49.00" },
  { id: "INV-003", date: "Apr 1, 2026", amount: "$49.00" },
] as const

export default function BillingSettings({
  className,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <main
      className={cn(
        "w-full min-w-0 bg-canvas px-4 py-10 text-foreground sm:px-6",
        className
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-lg space-y-6">
        <div className="text-start">
          <h1 className="text-2xl font-semibold tracking-tight">Billing</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Plan, payment method, and recent invoices.
          </p>
        </div>

        <div className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
          <div className="flex items-start justify-between gap-4 px-5 py-5">
            <div className="min-w-0 space-y-1 text-start">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-foreground">Pro</p>
                <Badge variant="secondary">Active</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground" dir="ltr">
                  $49
                </span>
                /month · Renews July 1, 2026
              </p>
            </div>
            <Button type="button" variant="outline" size="sm">
              Change plan
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between gap-4 px-5 py-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border/70 bg-muted">
                <CreditCardIcon
                  className="size-4 text-muted-foreground"
                  aria-hidden
                />
              </div>
              <div className="min-w-0 text-start">
                <p className="text-sm font-medium">Visa ···· 4242</p>
                <p className="text-xs text-muted-foreground">Expires 08/26</p>
              </div>
            </div>
            <Button type="button" variant="ghost" size="sm">
              Update
            </Button>
          </div>

          <Separator />

          <div className="px-5 py-4">
            <p className="mb-3 text-start text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Invoices
            </p>
            <ul className="space-y-1" role="list">
              {INVOICES.map((invoice) => (
                <li
                  key={invoice.id}
                  className="flex items-center justify-between gap-3 rounded-md px-1 py-2 hover:bg-muted/50"
                >
                  <div className="min-w-0 text-start">
                    <p className="text-sm font-medium" dir="ltr">
                      {invoice.id}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {invoice.date}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="text-sm tabular-nums" dir="ltr">
                      {invoice.amount}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className="size-8"
                      aria-label={`Download ${invoice.id}`}
                    >
                      <DownloadIcon className="size-3.5" aria-hidden />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
