"use client"

import * as React from "react"
import {
  ArrowDownToLineIcon,
  ArrowRightLeftIcon,
  CreditCardIcon,
  EyeIcon,
  EyeOffIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SettingsIcon,
  SnowflakeIcon,
  WalletIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

const ACTIVITY = [
  {
    id: 1,
    merchant: "Apple Store",
    date: "Today, 14:23",
    amount: "-$124.00",
    card: "•••• 4444",
  },
  {
    id: 2,
    merchant: "Uber Eats",
    date: "Yesterday, 19:45",
    amount: "-$32.50",
    card: "•••• 4444",
  },
  {
    id: 3,
    merchant: "AWS Services",
    date: "Jun 24, 08:00",
    amount: "-$840.12",
    card: "Main Wallet",
  },
] as const

function ChipMark({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-9 opacity-90", className)}
      viewBox="0 0 40 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="0.5"
        y="0.5"
        width="39"
        height="31"
        rx="5.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.8"
      />
      <path d="M12 16H40" stroke="currentColor" strokeOpacity="0.6" />
      <path d="M12 24H40" stroke="currentColor" strokeOpacity="0.6" />
      <path d="M12 8H40" stroke="currentColor" strokeOpacity="0.6" />
      <path d="M28 0V32" stroke="currentColor" strokeOpacity="0.6" />
      <path d="M16 0V32" stroke="currentColor" strokeOpacity="0.6" />
      <rect
        x="12"
        y="8"
        width="16"
        height="16"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.8"
      />
    </svg>
  )
}

function ActionButton({
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      type="button"
      variant="outline"
      className="h-12 flex-1 font-medium"
      {...props}
    >
      {children}
    </Button>
  )
}

export default function PaymentMethods({
  className,
  ...props
}: React.ComponentProps<"main">) {
  const [showNumbers, setShowNumbers] = React.useState(false)

  return (
    <main
      className={cn(
        "w-full min-w-0 bg-canvas px-4 py-10 text-foreground sm:px-6",
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="min-w-0 text-start">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Cards &amp; Wallets
            </h1>
            <p className="mt-2 text-muted-foreground">
              Manage your physical cards and digital wallet balances.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowNumbers((v) => !v)}
            >
              {showNumbers ? (
                <EyeOffIcon aria-hidden />
              ) : (
                <EyeIcon aria-hidden />
              )}
              {showNumbers ? "Hide numbers" : "Show numbers"}
            </Button>
            <Button type="button">
              <PlusIcon aria-hidden />
              Add Card
            </Button>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Main virtual wallet */}
          <div className="flex flex-col gap-4">
            <div className="relative flex h-[240px] flex-col justify-between overflow-hidden rounded-[12px] border border-border/70 bg-card p-8 shadow-soft">
              <div className="relative z-10 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                    <WalletIcon
                      className="size-5 text-muted-foreground"
                      aria-hidden
                    />
                  </div>
                  <p className="text-lg font-semibold text-foreground">
                    Main Wallet
                  </p>
                </div>
                <Badge variant="secondary">Virtual</Badge>
              </div>

              <div className="relative z-10 text-start">
                <p className="mb-2 text-sm font-medium tracking-wide text-muted-foreground uppercase">
                  Available Balance
                </p>
                <p
                  dir="ltr"
                  className="text-3xl font-semibold tracking-tight tabular-nums text-foreground"
                >
                  $12,450.00
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <ActionButton>
                <ArrowDownToLineIcon
                  className="opacity-70"
                  aria-hidden
                />
                Top Up
              </ActionButton>
              <ActionButton>
                <ArrowRightLeftIcon className="opacity-70" aria-hidden />
                Transfer
              </ActionButton>
            </div>
          </div>

          {/* Physical corporate card */}
          <div className="flex flex-col gap-4">
            <div className="relative flex h-[240px] flex-col justify-between overflow-hidden rounded-[12px] bg-primary p-8 !text-white shadow-soft">
              <div className="relative z-10 flex items-start justify-between gap-3">
                <ChipMark className="text-white" />
                <Badge className="border-white/30 bg-white/20 !text-white hover:bg-white/25">
                  Physical
                </Badge>
              </div>

              <div className="relative z-10 space-y-5 text-start">
                <p
                  dir="ltr"
                  className="font-mono text-2xl font-medium tracking-wide"
                >
                  {showNumbers
                    ? "4111 2222 3333 4444"
                    : "•••• •••• •••• 4444"}
                </p>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-white/70 uppercase">
                      Cardholder
                    </p>
                    <p className="text-sm font-semibold tracking-wide">
                      Alex Johnson
                    </p>
                  </div>
                  <div className="text-end">
                    <p className="text-xs font-semibold tracking-wide text-white/70 uppercase">
                      Valid Thru
                    </p>
                    <p
                      dir="ltr"
                      className="font-mono text-sm font-semibold tracking-wide"
                    >
                      {showNumbers ? "12/28" : "••/••"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <ActionButton>
                <SnowflakeIcon className="opacity-70" aria-hidden />
                Freeze
              </ActionButton>
              <ActionButton>
                <SettingsIcon className="opacity-70" aria-hidden />
                Settings
              </ActionButton>
            </div>
          </div>

          {/* Euro wallet */}
          <div className="flex flex-col gap-4">
            <div className="relative flex h-[240px] flex-col justify-between overflow-hidden rounded-[12px] border border-border/70 bg-card p-8 shadow-soft">
              <div className="relative z-10 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-foreground"
                    aria-hidden
                  >
                    €
                  </div>
                  <p className="text-lg font-semibold text-foreground">
                    Euro Wallet
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Wallet options"
                  className="-me-2"
                >
                  <MoreHorizontalIcon aria-hidden />
                </Button>
              </div>

              <div className="relative z-10 text-start">
                <p className="mb-2 text-sm font-medium tracking-wide text-muted-foreground uppercase">
                  Available Balance
                </p>
                <p
                  dir="ltr"
                  className="text-3xl font-semibold tracking-tight tabular-nums text-foreground"
                >
                  €3,890.50
                </p>
                <p
                  dir="ltr"
                  className="mt-2 text-sm font-medium tracking-wide text-muted-foreground"
                >
                  ≈ $4,240.65 USD
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <ActionButton>
                <ArrowRightLeftIcon className="opacity-70" aria-hidden />
                Convert
              </ActionButton>
              <ActionButton>
                <ArrowDownToLineIcon
                  className="opacity-70"
                  aria-hidden
                />
                Withdraw
              </ActionButton>
            </div>
          </div>
        </div>

        <section className="pt-2">
          <h2 className="mb-6 text-start text-xl font-semibold tracking-tight text-foreground">
            Recent Card Activity
          </h2>
          <div className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
            <ul className="divide-y divide-border/70" role="list">
              {ACTIVITY.map((tx) => (
                <li
                  key={tx.id}
                  className="flex items-center justify-between gap-4 p-5 transition-colors hover:bg-muted/40"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-border/70 bg-muted shadow-xs">
                      <CreditCardIcon
                        className="size-5 text-muted-foreground"
                        aria-hidden
                      />
                    </div>
                    <div className="min-w-0 text-start">
                      <p className="font-semibold text-foreground">
                        {tx.merchant}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {tx.date}
                        <span className="mx-1.5 opacity-50" aria-hidden>
                          •
                        </span>
                        <span dir="ltr">{tx.card}</span>
                      </p>
                    </div>
                  </div>
                  <p
                    dir="ltr"
                    className="shrink-0 font-semibold tabular-nums text-foreground"
                  >
                    {tx.amount}
                  </p>
                </li>
              ))}
            </ul>
            <div className="border-t border-border/70 bg-muted/40 p-3">
              <Button
                type="button"
                variant="ghost"
                className="h-10 w-full text-sm font-medium"
              >
                View all transactions
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
