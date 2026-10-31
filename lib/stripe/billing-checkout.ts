import "server-only"

import { StripeApiError } from "@/db/errors"
import { getPlanBySlug } from "@/db/queries/plans"
import { getActiveSubscriptionByClerkId } from "@/db/queries/subscriptions"
import { upsertUserFromClerk } from "@/db/queries/users"
import { siteConfig } from "@/lib/config"
import { createCheckoutSession } from "@/lib/stripe/create-checkout-session"

export const CHECKOUT_PLAN_SLUGS = ["pro-monthly", "pro-yearly"] as const
export type CheckoutPlanSlug = (typeof CHECKOUT_PLAN_SLUGS)[number]

export type BillingCheckoutSuccess = {
  ok: true
  url: string
  sessionId: string
}

export type BillingCheckoutFailure = {
  ok: false
  status: number
  error: string
  planSlug?: string
}

export function isCheckoutPlanSlug(value: unknown): value is CheckoutPlanSlug {
  return (
    typeof value === "string" &&
    (CHECKOUT_PLAN_SLUGS as readonly string[]).includes(value)
  )
}

/**
 * Create a Stripe Checkout Session for an authenticated Clerk user.
 * Pro is NOT granted here — only after webhook reconcile.
 */
export async function createBillingCheckout(input: {
  clerkUserId: string
  planSlug: string
  fetchImpl?: typeof fetch
  /** Test overrides */
  deps?: {
    upsertUser?: typeof upsertUserFromClerk
    getActiveSub?: typeof getActiveSubscriptionByClerkId
    getPlan?: typeof getPlanBySlug
    createSession?: typeof createCheckoutSession
  }
}): Promise<BillingCheckoutSuccess | BillingCheckoutFailure> {
  if (!isCheckoutPlanSlug(input.planSlug)) {
    return { ok: false, status: 400, error: "InvalidPlanSlug" }
  }

  const upsertUser = input.deps?.upsertUser ?? upsertUserFromClerk
  const getActiveSub =
    input.deps?.getActiveSub ?? getActiveSubscriptionByClerkId
  const getPlan = input.deps?.getPlan ?? getPlanBySlug
  const createSession = input.deps?.createSession ?? createCheckoutSession

  const user = await upsertUser({ clerkUserId: input.clerkUserId })

  const active = await getActiveSub(input.clerkUserId)
  if (active) {
    return { ok: false, status: 409, error: "AlreadySubscribed" }
  }

  const plan = await getPlan(input.planSlug)
  if (!plan || !plan.active) {
    return {
      ok: false,
      status: 404,
      error: "PlanNotFound",
      planSlug: input.planSlug,
    }
  }

  const priceId = plan.stripePriceId?.trim() || null
  if (!priceId) {
    return {
      ok: false,
      status: 422,
      error: "PriceNotConfigured",
      planSlug: input.planSlug,
    }
  }

  const base = siteConfig.url.replace(/\/$/, "")
  // session_id lets the return page poll without inventing Pro from the redirect.
  const successUrl = `${base}/pricing?checkout=success&session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${base}/pricing?checkout=cancel`

  try {
    const session = await createSession({
      clerkUserId: input.clerkUserId,
      stripePriceId: priceId,
      successUrl,
      cancelUrl,
      stripeCustomerId: user.stripeCustomerId,
      fetchImpl: input.fetchImpl,
    })
    return { ok: true, url: session.url, sessionId: session.id }
  } catch (err) {
    if (err instanceof StripeApiError) {
      const status =
        err.status >= 400 && err.status < 600 ? err.status : 502
      return {
        ok: false,
        status: status === 400 ? 400 : status >= 500 ? 502 : status,
        error: "StripeCheckoutFailed",
      }
    }
    throw err
  }
}
