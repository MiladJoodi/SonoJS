"use client"

import * as React from "react"
import { DownloadIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

import visaLogo from "./images/visa.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const VISA = assetSrc(visaLogo)

const INVOICES = [
  { id: "INV-001", date: "Jun 1, 2026", amount: "$49.00" },
  { id: "INV-002", date: "May 1, 2026", amount: "$49.00" },
  { id: "INV-003", date: "Apr 1, 2026", amount: "$49.00" },
] as const

export default function BillingSettings({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex w-full justify-center bg-white px-4 py-10 text-foreground dark:bg-background sm:px-6 sm:py-14",
        className
      )}
      {...props}
    >
      <section
        className="w-full max-w-lg overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft"
        aria-labelledby="billing-settings-01-heading"
      >
        <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border/70 px-5 py-4 sm:px-6">
          <div className="min-w-0 text-start">
            <h1
              id="billing-settings-01-heading"
              className="text-base font-semibold tracking-tight"
            >
              Billing
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Plan, payment method, and recent invoices.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="cursor-pointer"
          >
            Manage plan
          </Button>
        </header>

        <div className="flex items-start justify-between gap-4 px-5 py-5 sm:px-6">
          <div className="min-w-0 space-y-1 text-start">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold text-foreground">Pro</p>
              <Badge
                variant="secondary"
                className="border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
              >
                Active
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground" dir="ltr">
                $49
              </span>
              /month · Renews Jul 1, 2026
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="cursor-pointer"
          >
            Change
          </Button>
        </div>

        <Separator />

        <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-border/70 bg-white px-1">
              <img
                src={VISA}
                alt=""
                className="h-3.5 w-auto max-w-7 object-contain"
              />
            </span>
            <div className="min-w-0 text-start">
              <p className="text-sm font-medium">Visa ···· 4242</p>
              <p className="text-xs text-muted-foreground">Expires 08/26</p>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="cursor-pointer"
          >
            Update
          </Button>
        </div>

        <Separator />

        <div className="px-5 py-4 sm:px-6">
          <p className="mb-2 text-start text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Recent invoices
          </p>
          <ul className="space-y-0.5" role="list">
            {INVOICES.map((invoice) => (
              <li
                key={invoice.id}
                className="flex items-center justify-between gap-3 rounded-md px-1 py-2 hover:bg-muted/40"
              >
                <div className="min-w-0 text-start">
                  <p className="text-sm font-medium" dir="ltr">
                    {invoice.id}
                  </p>
                  <p className="text-xs text-muted-foreground">{invoice.date}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <span className="text-sm tabular-nums" dir="ltr">
                    {invoice.amount}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="size-8 cursor-pointer"
                    aria-label={`Download ${invoice.id}`}
                  >
                    <DownloadIcon className="size-3.5" aria-hidden />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
