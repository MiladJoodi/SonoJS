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
 * Mark subscription to end after the current period (manual renewal).
 * Checkout Session cannot set this via subscription_data - apply after create.
 */
export async function setStripeSubscriptionCancelAtPeriodEnd(
  stripeSubscriptionId: string,
  cancelAtPeriodEnd: boolean,
  fetchImpl: typeof fetch = fetch
): Promise<StripeSubscriptionSnapshot> {
  const body = new URLSearchParams()
  body.set("cancel_at_period_end", cancelAtPeriodEnd ? "true" : "false")

  const res = await fetchImpl(
    `https://api.stripe.com/v1/subscriptions/${encodeURIComponent(stripeSubscriptionId)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getStripeSecret()}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "Stripe-Version": STRIPE_API_VERSION,
      },
      body: body.toString(),
    }
  )

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new StripeApiError(
      `Stripe subscription cancel_at_period_end update failed (${res.status}): ${text.slice(0, 300)}`,
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

export type StripeBillingPortalSession = {
  url: string
}

/**
 * Create a Stripe Customer Portal session (card / cancel / invoices).
 * Injectable `fetchImpl` for tests.
 */
export async function createBillingPortalSession(
  input: {
    customerId: string
    returnUrl: string
  },
  fetchImpl: typeof fetch = fetch
): Promise<StripeBillingPortalSession> {
  const body = new URLSearchParams()
  body.set("customer", input.customerId)
  body.set("return_url", input.returnUrl)

  const res = await fetchImpl("https://api.stripe.com/v1/billing_portal/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getStripeSecret()}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "Stripe-Version": STRIPE_API_VERSION,
    },
    body,
  })

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new StripeApiError(
      `Stripe billing portal session failed (${res.status}): ${text.slice(0, 300)}`,
      res.status
    )
  }

  const data = (await res.json()) as { url?: unknown }
  if (typeof data.url !== "string" || !data.url) {
    throw new StripeApiError("Stripe billing portal session missing url", 502)
  }

  return { url: data.url }
}

function stripeSearchQueryClerkUserId(clerkUserId: string): string {
  return `metadata['clerkUserId']:'${clerkUserId.replace(/'/g, "\\'")}'`
}

async function stripeSearchFirstId(
  path: "customers" | "subscriptions",
  clerkUserId: string,
  fetchImpl: typeof fetch
): Promise<{ id: string; customerId?: string } | null> {
  const params = new URLSearchParams()
  params.set("query", stripeSearchQueryClerkUserId(clerkUserId))
  params.set("limit", "1")

  const res = await fetchImpl(
    `https://api.stripe.com/v1/${path}/search?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getStripeSecret()}`,
        "Stripe-Version": STRIPE_API_VERSION,
      },
    }
  )

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new StripeApiError(
      `Stripe ${path} search failed (${res.status}): ${text.slice(0, 300)}`,
      res.status
    )
  }

  const data = (await res.json()) as {
    data?: Array<{ id?: unknown; customer?: unknown } | null> | null
  }
  const first = Array.isArray(data.data) ? data.data[0] : null
  if (!first || typeof first.id !== "string" || !first.id) return null
  const customerId =
    typeof first.customer === "string" && first.customer
      ? first.customer
      : undefined
  return { id: first.id, customerId }
}

/**
 * Resolve Stripe customer id for a Clerk user.
 * Prefers subscription search (Checkout writes `subscription_data.metadata.clerkUserId`),
 * then customer search if metadata was set on the customer.
 * Injectable `fetchImpl` for tests.
 */
export async function findStripeCustomerIdByClerkUserId(
  clerkUserId: string,
  fetchImpl: typeof fetch = fetch
): Promise<string | null> {
  const id = clerkUserId.trim()
  if (!id) return null

  const fromSub = await stripeSearchFirstId("subscriptions", id, fetchImpl)
  if (fromSub?.customerId) return fromSub.customerId

  const fromCustomer = await stripeSearchFirstId("customers", id, fetchImpl)
  return fromCustomer?.id ?? null
}

/**
 * List Stripe customer ids for an email (newest first).
 * Used when Clerk account was recreated but billing stayed on the same email.
 */
export async function listStripeCustomerIdsByEmail(
  email: string,
  fetchImpl: typeof fetch = fetch
): Promise<string[]> {
  const normalized = email.trim().toLowerCase()
  if (!normalized) return []

  const params = new URLSearchParams()
  params.set("email", normalized)
  params.set("limit", "10")

  const res = await fetchImpl(
    `https://api.stripe.com/v1/customers?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getStripeSecret()}`,
        "Stripe-Version": STRIPE_API_VERSION,
      },
    }
  )

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new StripeApiError(
      `Stripe customers-by-email failed (${res.status}): ${text.slice(0, 300)}`,
      res.status
    )
  }

  const data = (await res.json()) as {
    data?: Array<{ id?: unknown } | null> | null
  }
  const rows = Array.isArray(data.data) ? data.data : []
  return rows
    .map((row) => (row && typeof row.id === "string" ? row.id : null))
    .filter((id): id is string => Boolean(id))
}

/**
 * List subscriptions for a Stripe customer (newest first).
 * Injectable `fetchImpl` for tests.
 */
export async function listStripeCustomerSubscriptions(
  customerId: string,
  fetchImpl: typeof fetch = fetch
): Promise<StripeSubscriptionSnapshot[]> {
  const params = new URLSearchParams()
  params.set("customer", customerId)
  params.set("status", "all")
  params.set("limit", "10")

  const res = await fetchImpl(
    `https://api.stripe.com/v1/subscriptions?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getStripeSecret()}`,
        "Stripe-Version": STRIPE_API_VERSION,
      },
    }
  )

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new StripeApiError(
      `Stripe customer subscriptions list failed (${res.status}): ${text.slice(0, 300)}`,
      res.status
    )
  }

  const data = (await res.json()) as {
    data?: StripeSubscriptionJson[] | null
  }
  const rows = Array.isArray(data.data) ? data.data : []
  return rows.map((row) => {
    const priceId = row.items?.data?.[0]?.price?.id ?? null
    const metadata =
      row.metadata &&
      typeof row.metadata === "object" &&
      !Array.isArray(row.metadata)
        ? { ...row.metadata }
        : {}
    return {
      id: row.id,
      status: row.status,
      cancelAtPeriodEnd: Boolean(row.cancel_at_period_end),
      currentPeriodStart: row.current_period_start ?? null,
      currentPeriodEnd: row.current_period_end ?? null,
      canceledAt: row.canceled_at ?? null,
      endedAt: row.ended_at ?? null,
      priceId,
      metadata,
    }
  })
}

export type StripeInvoiceLinks = {
  hostedInvoiceUrl: string | null
  invoicePdf: string | null
}

/**
 * Retrieve invoice hosted URL / PDF from Stripe by invoice id.
 * Injectable `fetchImpl` for tests.
 */
export async function fetchStripeInvoice(
  invoiceId: string,
  fetchImpl: typeof fetch = fetch
): Promise<StripeInvoiceLinks> {
  const res = await fetchImpl(
    `https://api.stripe.com/v1/invoices/${encodeURIComponent(invoiceId)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getStripeSecret()}`,
        "Stripe-Version": STRIPE_API_VERSION,
      },
    }
  )

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new StripeApiError(
      `Stripe invoice retrieve failed (${res.status}): ${text.slice(0, 300)}`,
      res.status
    )
  }

  const data = (await res.json()) as {
    hosted_invoice_url?: unknown
    invoice_pdf?: unknown
  }

  return {
    hostedInvoiceUrl:
      typeof data.hosted_invoice_url === "string"
        ? data.hosted_invoice_url
        : null,
    invoicePdf:
      typeof data.invoice_pdf === "string" ? data.invoice_pdf : null,
  }
}
