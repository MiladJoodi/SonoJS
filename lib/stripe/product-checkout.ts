import "server-only"

import { StripeApiError } from "@/db/errors"
import { userOwnsProductSlug } from "@/db/queries/product-entitlements"
import { ensureUserFromClerk } from "@/db/queries/users"
import { catalogHrefForProject } from "@/lib/templates-preview-data"
import { projectRequiresPurchase } from "@/lib/product-entitlement-access"
import { siteConfig } from "@/lib/config"
import { getTemplateProject } from "@/lib/templates-catalog"
import { createProductCheckoutSession } from "@/lib/stripe/create-product-checkout-session"

export type ProductCheckoutSuccess = {
  ok: true
  url: string
  sessionId: string
}

export type ProductCheckoutFailure = {
  ok: false
  status: number
  error: string
  slug?: string
}

/**
 * Start one-time Checkout for a catalog product.
 * Price always comes from the catalog — never from the request body.
 */
export async function createProductCheckout(input: {
  clerkUserId: string
  slug: string
  fetchImpl?: typeof fetch
}): Promise<ProductCheckoutSuccess | ProductCheckoutFailure> {
  const slug = input.slug.trim()
  if (!slug) {
    return { ok: false, status: 400, error: "InvalidSlug" }
  }

  const project = getTemplateProject(slug)
  if (!project || !project.enabled) {
    return { ok: false, status: 404, error: "ProductNotFound", slug }
  }

  if (!projectRequiresPurchase(project)) {
    return { ok: false, status: 400, error: "ProductNotForSale", slug }
  }

  const amountCents = Math.floor(project.priceCents)
  if (!Number.isFinite(amountCents) || amountCents <= 0) {
    return { ok: false, status: 422, error: "PriceNotConfigured", slug }
  }

  const user = await ensureUserFromClerk(input.clerkUserId)

  if (await userOwnsProductSlug(user.clerkUserId, project.slug)) {
    return { ok: false, status: 409, error: "AlreadyOwned", slug }
  }

  const base = siteConfig.url.replace(/\/$/, "")
  const href = catalogHrefForProject(project)
  const successUrl = `${base}${href}?checkout=success&session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${base}${href}?checkout=cancel`

  try {
    const session = await createProductCheckoutSession({
      clerkUserId: input.clerkUserId,
      productSlug: project.slug,
      productTitle: project.title,
      amountCents,
      currency: "usd",
      successUrl,
      cancelUrl,
      stripeCustomerId: user.stripeCustomerId,
      fetchImpl: input.fetchImpl,
    })
    return { ok: true, url: session.url, sessionId: session.id }
  } catch (err) {
    if (err instanceof StripeApiError) {
      console.error("createProductCheckout: Stripe failed", err.message)
      const status =
        err.status >= 400 && err.status < 600 ? err.status : 502
      return {
        ok: false,
        status: status === 400 ? 400 : status >= 500 ? 502 : status,
        error: "StripeCheckoutFailed",
        slug,
      }
    }
    throw err
  }
}
