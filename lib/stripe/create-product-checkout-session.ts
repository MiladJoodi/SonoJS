import { StripeApiError } from "@/db/errors"
import { getStripeSecretKey, STRIPE_API_VERSION } from "@/lib/stripe/env"

export const PRODUCT_CHECKOUT_KIND = "product_purchase" as const

/**
 * Stripe product tax code for Managed Payments (live).
 * Matches Dashboard preset: Digital > Software > SaaS > no mobile/plugin > business use.
 * @see https://docs.stripe.com/tax/tax-codes
 */
export const PRODUCT_CHECKOUT_TAX_CODE = "txcd_10103001" as const

export type CreateProductCheckoutSessionInput = {
  clerkUserId: string
  productSlug: string
  productTitle: string
  amountCents: number
  currency?: string
  successUrl: string
  cancelUrl: string
  stripeCustomerId?: string | null
  fetchImpl?: typeof fetch
}

export type CreateProductCheckoutSessionResult = {
  id: string
  url: string
}

/** Exported for unit tests - one-time payment Checkout body (no Price id). */
export function buildProductCheckoutSessionFormBody(
  input: Omit<CreateProductCheckoutSessionInput, "fetchImpl">
): URLSearchParams {
  const amount = Math.floor(input.amountCents)
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new StripeApiError("amountCents must be a positive integer", 400)
  }

  const clerkUserId = input.clerkUserId.trim()
  const productSlug = input.productSlug.trim()
  const productTitle = input.productTitle.trim() || productSlug
  const currency = (input.currency ?? "usd").trim().toLowerCase() || "usd"

  const body = new URLSearchParams()
  body.set("mode", "payment")
  body.set("line_items[0][price_data][currency]", currency)
  body.set("line_items[0][price_data][unit_amount]", String(amount))
  // Catalog price = amount charged (tax included), same as Pro plan Checkout.
  body.set("line_items[0][price_data][tax_behavior]", "inclusive")
  body.set("line_items[0][price_data][product_data][name]", productTitle)
  body.set(
    "line_items[0][price_data][product_data][tax_code]",
    PRODUCT_CHECKOUT_TAX_CODE
  )
  body.set(
    "line_items[0][price_data][product_data][metadata][productSlug]",
    productSlug
  )
  body.set("line_items[0][quantity]", "1")
  body.set("success_url", input.successUrl)
  body.set("cancel_url", input.cancelUrl)
  body.set("client_reference_id", clerkUserId)
  body.set("metadata[clerkUserId]", clerkUserId)
  body.set("metadata[productSlug]", productSlug)
  body.set("metadata[kind]", PRODUCT_CHECKOUT_KIND)
  // Audit only - webhook re-reads catalog price; never trust client.
  body.set("metadata[catalogAmountCents]", String(amount))

  const customerId = input.stripeCustomerId?.trim()
  if (customerId) {
    body.set("customer", customerId)
  } else {
    body.set("customer_creation", "if_required")
  }

  return body
}

/**
 * Create a Stripe Checkout Session (payment mode) with dynamic `price_data`.
 * Amount must already be taken from the server catalog - never from the client.
 */
export async function createProductCheckoutSession(
  input: CreateProductCheckoutSessionInput
): Promise<CreateProductCheckoutSessionResult> {
  const clerkUserId = input.clerkUserId.trim()
  const productSlug = input.productSlug.trim()
  if (!clerkUserId) {
    throw new StripeApiError("clerkUserId is required", 400)
  }
  if (!productSlug) {
    throw new StripeApiError("productSlug is required", 400)
  }

  let secret: string
  try {
    secret = getStripeSecretKey()
  } catch {
    throw new StripeApiError("STRIPE_SECRET_KEY is not set", 500)
  }

  const body = buildProductCheckoutSessionFormBody(input)
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
      `Stripe product Checkout Session create failed (${res.status}): ${text.slice(0, 300)}`,
      res.status
    )
  }

  const data = (await res.json()) as { id?: string; url?: string | null }
  if (!data.id || !data.url) {
    throw new StripeApiError(
      "Stripe product Checkout Session response missing id or url",
      502
    )
  }

  return { id: data.id, url: data.url }
}
