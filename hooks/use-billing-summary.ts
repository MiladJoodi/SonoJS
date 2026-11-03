"use client"

import * as React from "react"

export type BillingSummarySubscription = {
  id: string
  status: string
  cancelAtPeriodEnd: boolean
  currentPeriodStart: string | null
  currentPeriodEnd: string | null
  canceledAt: string | null
  plan: { name: string; slug: string }
  source: "neon" | "stripe"
}

export type BillingSummaryPayment = {
  id: string
  amountCents: number
  currency: string
  status: string
  createdAt: string
  stripeInvoiceId: string | null
}

export type BillingSummary = {
  hasStripeCustomer: boolean
  subscription: BillingSummarySubscription | null
  payments: BillingSummaryPayment[]
}

export function useBillingSummary(enabled = true) {
  const [summary, setSummary] = React.useState<BillingSummary | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(enabled)

  React.useEffect(() => {
    if (!enabled) {
      setLoading(false)
      return
    }
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch("/api/billing/summary")
        if (!res.ok) {
          throw new Error(
            res.status === 401
              ? "Sign in to view billing."
              : "Could not load billing."
          )
        }
        const data = (await res.json()) as BillingSummary
        if (!cancelled) setSummary(data)
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Could not load billing."
          )
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [enabled])

  return { summary, error, loading }
}
