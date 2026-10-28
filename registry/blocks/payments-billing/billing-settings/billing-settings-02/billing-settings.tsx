"use client"

import * as React from "react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@sonojs/ui/components/field"
import { Input } from "@sonojs/ui/components/input"
import { Separator } from "@sonojs/ui/components/separator"
import { Switch } from "@sonojs/ui/components/switch"
import { cn } from "@/lib/utils"

export default function BillingSettings({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = React.useState("billing@acme.com")
  const [receipts, setReceipts] = React.useState(true)
  const [reminders, setReminders] = React.useState(true)

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
        aria-labelledby="billing-settings-02-heading"
      >
        <header className="border-b border-border/70 px-5 py-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-2 text-start">
            <h1
              id="billing-settings-02-heading"
              className="text-base font-semibold tracking-tight"
            >
              Billing preferences
            </h1>
            <Badge variant="secondary">Pro</Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Where invoices go and which emails you get.
          </p>
        </header>

        <div className="space-y-5 px-5 py-5 sm:px-6">
          <div className="rounded-[12px] border border-border/70 bg-muted/40 px-4 py-3 text-start">
            <p className="text-sm font-medium text-foreground">Current plan</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              <span className="font-medium text-foreground" dir="ltr">
                $49
              </span>
              /month · Next charge Jul 1, 2026
            </p>
          </div>

          <Field>
            <FieldLabel htmlFor="billing-settings-02-email">
              Billing email
            </FieldLabel>
            <Input
              id="billing-settings-02-email"
              type="email"
              dir="ltr"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FieldDescription>
              Invoices and payment receipts are sent here.
            </FieldDescription>
          </Field>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 text-start">
                <p className="text-sm font-medium text-foreground">
                  Email receipts
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Send a PDF receipt after every successful charge.
                </p>
              </div>
              <Switch
                checked={receipts}
                onCheckedChange={(v) => setReceipts(v === true)}
                className="cursor-pointer"
                aria-label="Email receipts"
              />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 text-start">
                <p className="text-sm font-medium text-foreground">
                  Renewal reminders
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Remind me 7 days before the next renewal.
                </p>
              </div>
              <Switch
                checked={reminders}
                onCheckedChange={(v) => setReminders(v === true)}
                className="cursor-pointer"
                aria-label="Renewal reminders"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-border/70 bg-muted/40 px-5 py-3 sm:px-6">
          <Button type="button" variant="ghost" className="cursor-pointer">
            Cancel
          </Button>
          <Button type="button" className="cursor-pointer">
            Save preferences
          </Button>
        </div>
      </section>
    </div>
  )
}
