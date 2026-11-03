"use client"

import * as React from "react"
import Link from "next/link"
import { AlertTriangleIcon, ExternalLinkIcon } from "lucide-react"

import type {
  BillingSummary,
  BillingSummarySubscription,
} from "@/hooks/use-billing-summary"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@sonojs/ui/components/alert"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@sonojs/ui/components/card"
import { Spinner } from "@sonojs/ui/components/spinner"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@sonojs/ui/components/table"

function formatMoney(amountCents: number, currency: string): string {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amountCents / 100)
  } catch {
    return `${(amountCents / 100).toFixed(2)} ${currency.toUpperCase()}`
  }
}

function formatDate(iso: string | null): string {
  if (!iso) return "—"
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return "—"
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

function subscriptionStatusLabel(status: string): string {
  switch (status) {
    case "active":
      return "Active"
    case "trialing":
      return "Trialing"
    case "past_due":
      return "Past due"
    case "unpaid":
      return "Unpaid"
    case "canceled":
      return "Canceled"
    case "paused":
      return "Paused"
    default:
      return status.replaceAll("_", " ")
  }
}

function subscriptionBadgeVariant(
  status: string
): "default" | "secondary" | "destructive" | "outline" {
  if (status === "active" || status === "trialing") return "default"
  if (status === "past_due" || status === "unpaid") return "destructive"
  if (status === "canceled") return "outline"
  return "secondary"
}

function paymentStatusLabel(status: string): string {
  switch (status) {
    case "succeeded":
      return "Succeeded"
    case "pending":
      return "Pending"
    case "failed":
      return "Failed"
    case "refunded":
      return "Refunded"
    case "canceled":
      return "Canceled"
    default:
      return status
  }
}

export function BillingPanel({
  className,
  summary,
  loading,
  loadError,
}: {
  className?: string
  summary: BillingSummary | null
  loading: boolean
  loadError: string | null
}) {
  const [portalBusy, setPortalBusy] = React.useState(false)
  const [portalError, setPortalError] = React.useState<string | null>(null)

  const openPortal = async () => {
    setPortalBusy(true)
    setPortalError(null)
    try {
      const res = await fetch("/api/billing/portal", { method: "POST" })
      const data = (await res.json().catch(() => ({}))) as {
        url?: string
        error?: string
      }
      if (!res.ok) {
        if (data.error === "NoStripeCustomer") {
          throw new Error(
            "No Stripe customer is linked yet. Upgrade from Pricing to start a subscription."
          )
        }
        throw new Error("Could not open the billing portal. Try again.")
      }
      if (!data.url) {
        throw new Error("Could not open the billing portal. Try again.")
      }
      window.location.assign(data.url)
    } catch (err) {
      setPortalError(
        err instanceof Error ? err.message : "Could not open the billing portal."
      )
      setPortalBusy(false)
    }
  }

  if (loading) {
    return (
      <div
        className={cn(
          "flex min-h-[12rem] items-center justify-center",
          className
        )}
      >
        <Spinner className="size-5 text-muted-foreground" />
      </div>
    )
  }

  if (loadError || !summary) {
    return (
      <Card className={cn("gap-0 border-border/60 py-0 shadow-none", className)}>
        <CardHeader className="border-b border-border/50 py-6">
          <CardTitle>Billing</CardTitle>
          <CardDescription>Subscription and payment history.</CardDescription>
        </CardHeader>
        <CardContent className="py-6">
          <p className="text-sm text-destructive">
            {loadError ?? "Could not load billing."}
          </p>
        </CardContent>
      </Card>
    )
  }

  const sub: BillingSummarySubscription | null = summary.subscription
  const isPastDue = sub?.status === "past_due" || sub?.status === "unpaid"
  const canManagePortal = summary.hasStripeCustomer

  return (
    <div className={cn("space-y-6", className)}>
      {isPastDue ? (
        <Alert variant="destructive">
          <AlertTriangleIcon />
          <AlertTitle>Payment past due</AlertTitle>
          <AlertDescription>
            We could not collect your latest payment. Update your payment
            method soon — Pro access may stop if the charge keeps failing.
          </AlertDescription>
        </Alert>
      ) : null}

      <Card className="gap-0 border-border/60 py-0 shadow-none">
        <CardHeader className="border-b border-border/50 py-6">
          <CardTitle>Subscription</CardTitle>
          <CardDescription>
            Live billing record (Neon, with Stripe fallback when needed).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 py-6">
          {sub ? (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-base font-medium text-foreground">
                    {sub.plan.name}
                  </p>
                  <Badge variant={subscriptionBadgeVariant(sub.status)}>
                    {subscriptionStatusLabel(sub.status)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Current period ends {formatDate(sub.currentPeriodEnd)}
                </p>
                {sub.cancelAtPeriodEnd ? (
                  <p className="text-sm text-muted-foreground">
                    Cancels at the end of the billing period.
                  </p>
                ) : null}
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              You are on the free plan. Upgrade anytime to unlock Pro.
            </p>
          )}
          {portalError ? (
            <p className="text-sm text-destructive">{portalError}</p>
          ) : null}
        </CardContent>
        <CardFooter className="border-t border-border/50 py-4">
          {canManagePortal ? (
            <Button
              type="button"
              className="cursor-pointer"
              disabled={portalBusy}
              onClick={() => void openPortal()}
            >
              {portalBusy ? (
                <>
                  <Spinner className="size-4" />
                  Opening…
                </>
              ) : (
                "Manage billing"
              )}
            </Button>
          ) : (
            <Button asChild className="cursor-pointer">
              <Link href="/pricing">View pricing</Link>
            </Button>
          )}
        </CardFooter>
      </Card>

      <Card className="gap-0 border-border/60 py-0 shadow-none">
        <CardHeader className="border-b border-border/50 py-6">
          <CardTitle>Payment history</CardTitle>
          <CardDescription>
            Charges recorded for your account. Invoice opens the Stripe-hosted
            page when available.
          </CardDescription>
        </CardHeader>
        <CardContent className="py-0">
          {summary.payments.length === 0 ? (
            <p className="py-6 text-sm text-muted-foreground">
              No payments yet.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-end">Invoice</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {summary.payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{formatDate(payment.createdAt)}</TableCell>
                    <TableCell>
                      {formatMoney(payment.amountCents, payment.currency)}
                    </TableCell>
                    <TableCell>
                      {paymentStatusLabel(payment.status)}
                    </TableCell>
                    <TableCell className="text-end">
                      {payment.stripeInvoiceId ? (
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="cursor-pointer"
                        >
                          <a
                            href={`/api/billing/invoices/${payment.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Invoice
                            <ExternalLinkIcon className="size-3.5" />
                          </a>
                        </Button>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
