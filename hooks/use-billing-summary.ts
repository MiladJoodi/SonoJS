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

/** Shared across header + /account so both do not double-fetch. */
const CACHE_TTL_MS = 15_000

type CacheEntry = {
  summary: BillingSummary
  fetchedAt: number
}

let cache: CacheEntry | null = null
let inFlight: Promise<BillingSummary> | null = null
const listeners = new Set<() => void>()

function notifyBillingListeners() {
  for (const listener of listeners) listener()
}

async function fetchBillingSummary(): Promise<BillingSummary> {
  const res = await fetch("/api/billing/summary")
  if (!res.ok) {
    throw new Error(
      res.status === 401
        ? "Sign in to view billing."
        : "Could not load billing."
    )
  }
  return (await res.json()) as BillingSummary
}

function getCachedSummary(): BillingSummary | null {
  if (!cache) return null
  if (Date.now() - cache.fetchedAt > CACHE_TTL_MS) {
    cache = null
    return null
  }
  return cache.summary
}

function loadBillingSummaryShared(): Promise<BillingSummary> {
  const hit = getCachedSummary()
  if (hit) return Promise.resolve(hit)

  if (!inFlight) {
    inFlight = fetchBillingSummary()
      .then((summary) => {
        cache = { summary, fetchedAt: Date.now() }
        return summary
      })
      .finally(() => {
        inFlight = null
      })
  }
  return inFlight
}

/** Drop cache after portal/checkout so mounted hooks refetch. */
export function invalidateBillingSummaryCache() {
  cache = null
  inFlight = null
  notifyBillingListeners()
}

export function useBillingSummary(enabled = true) {
  const [summary, setSummary] = React.useState<BillingSummary | null>(() =>
    enabled ? getCachedSummary() : null
  )
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(
    () => enabled && !getCachedSummary()
  )
  const [nonce, setNonce] = React.useState(0)

  React.useEffect(() => {
    const onInvalidate = () => setNonce((n) => n + 1)
    listeners.add(onInvalidate)
    return () => {
      listeners.delete(onInvalidate)
    }
  }, [])

  React.useEffect(() => {
    if (!enabled) {
      setLoading(false)
      return
    }

    const cached = getCachedSummary()
    if (cached) {
      setSummary(cached)
      setError(null)
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    void loadBillingSummaryShared()
      .then((data) => {
        if (!cancelled) setSummary(data)
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Could not load billing."
          )
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [enabled, nonce])

  return { summary, error, loading }
}
