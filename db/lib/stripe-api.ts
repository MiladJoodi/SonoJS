import { StripeApiError } from "@/db/errors"
import { STRIPE_API_VERSION } from "@/lib/stripe/env"
import type { StripeWebhookEvent } from "@/lib/stripe/verify-webhook"

export type StripeSubscriptionSnapshot = {
  id: string
  status: string
  cancelAtPeriodEnd: boolean
  currentPeriodStart: number | null
  currentPeriodEnd: number | null
  canceledAt: number | null
  endedAt: number | null
  priceId: string | null
  /** Stripe subscription metadata (e.g. clerkUserId from Checkout). */
  metadata: Record<string, unknown>
}

type StripeSubscriptionJson = {
  id: string
  status: string
  cancel_at_period_end?: boolean
  current_period_start?: number
  current_period_end?: number
  canceled_at?: number | null
  ended_at?: number | null
  metadata?: Record<string, unknown> | null
  items?: {
    data?: Array<{ price?: { id?: string } | null } | null>
  }
}

function getStripeSecret(): string {
  const key = process.env.STRIPE_SECRET_KEY?.trim()
  if (!key) {
    throw new StripeApiError("STRIPE_SECRET_KEY is not set", 500)
  }
  return key
}

/**
 * Retrieve live subscription from Stripe REST API (no SDK dependency).
 * Injectable `fetchImpl` for tests.
 */
export async function fetchStripeSubscription(
  stripeSubscriptionId: string,
  fetchImpl: typeof fetch = fetch
): Promise<StripeSubscriptionSnapshot> {
  const res = await fetchImpl(
    `https://api.stripe.com/v1/subscriptions/${encodeURIComponent(stripeSubscriptionId)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getStripeSecret()}`,
        "Stripe-Version": STRIPE_API_VERSION,
      },
    }
  )

  if (!res.ok) {
    const body = await res.text().catch(() => "")
    throw new StripeApiError(
      `Stripe subscription retrieve failed (${res.status}): ${body.slice(0, 300)}`,
      res.status
    )
  }

  const data = (await res.json()) as StripeSubscriptionJson
  const priceId = data.items?.data?.[0]?.price?.id ?? null
  const metadata =
    data.metadata &&
    typeof data.metadata === "object" &&
    !Array.isArray(data.metadata)
      ? { ...data.metadata }
      : {}

  return {
    id: data.id,
    status: data.status,
    cancelAtPeriodEnd: Boolean(data.cancel_at_period_end),
    currentPeriodStart: data.current_period_start ?? null,
    currentPeriodEnd: data.current_period_end ?? null,
    canceledAt: data.canceled_at ?? null,
    endedAt: data.ended_at ?? null,
    priceId,
    metadata,
  }
}

/**
 * Retrieve a historical Stripe Event by id (ops reprocess / diagnostics).
 * Does not create charges or mutate Stripe objects.
 */
export async function fetchStripeEvent(
  stripeEventId: string,
  fetchImpl: typeof fetch = fetch
): Promise<StripeWebhookEvent> {
  const res = await fetchImpl(
    `https://api.stripe.com/v1/events/${encodeURIComponent(stripeEventId)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getStripeSecret()}`,
        "Stripe-Version": STRIPE_API_VERSION,
      },
    }
  )

  if (!res.ok) {
    const body = await res.text().catch(() => "")
    throw new StripeApiError(
      `Stripe event retrieve failed (${res.status}): ${body.slice(0, 300)}`,
      res.status
    )
  }

  const data = (await res.json()) as {
    id?: unknown
    type?: unknown
    created?: unknown
    data?: { object?: unknown }
  }

  if (typeof data.id !== "string" || typeof data.type !== "string") {
    throw new StripeApiError("Stripe event payload missing id/type", 502)
  }

  const object =
    data.data?.object &&
    typeof data.data.object === "object" &&
    !Array.isArray(data.data.object)
      ? (data.data.object as Record<string, unknown>)
      : null

  if (!object) {
    throw new StripeApiError("Stripe event payload missing data.object", 502)
  }

  const created =
    typeof data.created === "number" && Number.isFinite(data.created)
      ? data.created
      : 0

  return {
    id: data.id,
    type: data.type,
    created,
    data: { object },
  }
}
