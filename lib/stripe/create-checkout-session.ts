import { StripeApiError } from "@/db/errors"
import { getStripeSecretKey, STRIPE_API_VERSION } from "@/lib/stripe/env"

export type CreateCheckoutSessionInput = {
  clerkUserId: string
  stripePriceId: string
  successUrl: string
  cancelUrl: string
  /** Existing Stripe customer id when already linked in Neon. */
  stripeCustomerId?: string | null
  fetchImpl?: typeof fetch
}

export type CreateCheckoutSessionResult = {
  id: string
  url: string
}

/** Exported for unit tests — builds the form body Stripe expects. */
export function buildCheckoutSessionFormBody(
  input: Omit<CreateCheckoutSessionInput, "fetchImpl">
): URLSearchParams {
  const body = new URLSearchParams()
  body.set("mode", "subscription")
  body.set("line_items[0][price]", input.stripePriceId.trim())
  body.set("line_items[0][quantity]", "1")
  body.set("success_url", input.successUrl)
  body.set("cancel_url", input.cancelUrl)
  body.set("client_reference_id", input.clerkUserId.trim())
  body.set("metadata[clerkUserId]", input.clerkUserId.trim())
  body.set(
    "subscription_data[metadata][clerkUserId]",
    input.clerkUserId.trim()
  )
  const customerId = input.stripeCustomerId?.trim()
  if (customerId) body.set("customer", customerId)
  return body
}

/**
 * Create a Stripe Checkout Session (subscription mode) via raw REST.
 * Never logs or returns the secret key.
 */
export async function createCheckoutSession(
  input: CreateCheckoutSessionInput
): Promise<CreateCheckoutSessionResult> {
  const priceId = input.stripePriceId.trim()
  const clerkUserId = input.clerkUserId.trim()
  if (!priceId) {
    throw new StripeApiError("stripePriceId is required", 400)
  }
  if (!clerkUserId) {
    throw new StripeApiError("clerkUserId is required", 400)
  }

  let secret: string
  try {
    secret = getStripeSecretKey()
  } catch {
    throw new StripeApiError("STRIPE_SECRET_KEY is not set", 500)
  }

  const body = buildCheckoutSessionFormBody(input)
  const fetchImpl = input.fetchImpl ?? fetch
  const res = await fetchImpl("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "Stripe-Version": STRIPE_API_VERSION,
    },
    body: body.toString(),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new StripeApiError(
      `Stripe Checkout Session create failed (${res.status}): ${text.slice(0, 300)}`,
      res.status
    )
  }

  const data = (await res.json()) as { id?: string; url?: string | null }
  if (!data.id || !data.url) {
    throw new StripeApiError(
      "Stripe Checkout Session response missing id or url",
      502
    )
  }

  return { id: data.id, url: data.url }
}
