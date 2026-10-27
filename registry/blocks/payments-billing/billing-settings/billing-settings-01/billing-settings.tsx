"use client"

import * as React from "react"
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  CreditCardIcon,
  DownloadIcon,
} from "lucide-react"

import { Alert, AlertDescription } from "@sonojs/ui/components/alert"
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

const INVOICES = [
  {
    id: "INV-2026-001",
    date: "Jun 1, 2026",
    amount: "$49.00",
  },
  {
    id: "INV-2026-002",
    date: "May 1, 2026",
    amount: "$49.00",
  },
  {
    id: "INV-2026-003",
    date: "Apr 1, 2026",
    amount: "$49.00",
  },
  {
    id: "INV-2026-004",
    date: "Mar 1, 2026",
    amount: "$49.00",
  },
] as const

const PLAN_FEATURES = [
  "Unlimited projects and workspaces",
  "Advanced team management",
  "Priority 24/7 support",
] as const

export default function BillingSettings({
  className,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <main
      className={cn(
        "w-full min-w-0 bg-canvas px-4 py-8 text-foreground md:px-8 md:py-10",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <div className="text-start">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Billing &amp; Subscription
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your active plan, payment methods, and billing history.
          </p>
        </div>

        <Alert className="border-amber-500/25 bg-amber-500/10 text-foreground dark:border-amber-400/30 dark:bg-amber-400/10">
          <AlertCircleIcon
            className="text-amber-700 dark:text-amber-400"
            aria-hidden
          />
          <AlertDescription className="text-amber-950 dark:text-amber-100">
            Your card ending in 4242 is expiring soon. Please update your
            payment method to avoid service interruption.
          </AlertDescription>
        </Alert>

        <Card className="gap-0 border-border/70 py-0 shadow-soft">
          <CardHeader className="border-b border-border/70 py-6">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="min-w-0 space-y-1.5 text-start">
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>
                  You are currently on the Pro plan.
                </CardDescription>
              </div>
              <Badge variant="secondary">Pro Plan Active</Badge>
            </div>
          </CardHeader>
          <CardContent className="py-6">
            <div className="mb-6 flex items-end gap-2">
              <p className="text-4xl font-semibold tracking-tight text-foreground">
                $49
              </p>
              <p className="mb-1 text-sm text-muted-foreground">/ month</p>
            </div>
            <ul className="space-y-3" role="list">
              {PLAN_FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <CheckCircle2Icon
                    className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                    aria-hidden
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <Separator />
          <CardFooter className="flex flex-col items-stretch justify-between gap-4 bg-muted/40 py-4 sm:flex-row sm:items-center">
            <p className="text-start text-sm text-muted-foreground">
              Your next billing date is July 1, 2026.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="outline">
                Cancel Plan
              </Button>
              <Button type="button">Upgrade to Enterprise</Button>
            </div>
          </CardFooter>
        </Card>

        <Card className="gap-0 border-border/70 py-0 shadow-soft">
          <CardHeader className="border-b border-border/70 py-6">
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>
              Update your billing information and payment details.
            </CardDescription>
          </CardHeader>
          <CardContent className="py-6">
            <div className="flex items-center justify-between gap-4 rounded-lg border border-border/70 p-4">
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border/70 bg-muted">
                  <CreditCardIcon
                    className="size-5 text-muted-foreground"
                    aria-hidden
                  />
                </div>
                <div className="min-w-0 text-start">
                  <p className="text-sm font-medium text-foreground">
                    Visa ending in 4242
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Expires 08/2026
                  </p>
                </div>
              </div>
              <Button type="button" variant="ghost" size="sm">
                Edit
              </Button>
            </div>
          </CardContent>
          <CardFooter className="border-t border-border/70 py-4">
            <Button type="button" variant="outline">
              Add Payment Method
            </Button>
          </CardFooter>
        </Card>

        <Card className="gap-0 overflow-hidden border-border/70 py-0 shadow-soft">
          <CardHeader className="border-b border-border/70 py-6">
            <CardTitle>Billing History</CardTitle>
            <CardDescription>
              View and download your previous invoices.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="h-11 px-4 sm:px-6">Invoice</TableHead>
                  <TableHead className="h-11 px-4 sm:px-6">Date</TableHead>
                  <TableHead className="h-11 px-4 sm:px-6">Amount</TableHead>
                  <TableHead className="h-11 px-4 sm:px-6">Status</TableHead>
                  <TableHead className="h-11 px-4 text-end sm:px-6">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {INVOICES.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="px-4 py-3 text-sm font-medium sm:px-6">
                      <span dir="ltr">{invoice.id}</span>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-muted-foreground sm:px-6">
                      {invoice.date}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm sm:px-6" dir="ltr">
                      {invoice.amount}
                    </TableCell>
                    <TableCell className="px-4 py-3 sm:px-6">
                      <Badge
                        variant="secondary"
                        className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                      >
                        Paid
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-end sm:px-6">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="gap-1.5"
                      >
                        <DownloadIcon className="size-3.5" aria-hidden />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
