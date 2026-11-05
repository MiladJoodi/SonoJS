import "server-only"

import { clerkClient } from "@clerk/nextjs/server"

import { BillingIdentityConflictError } from "@/db/errors"
import {
  findStripeCustomerIdByClerkUserId,
  listStripeCustomerIdsByEmail,
  listStripeCustomerSubscriptions,
  type StripeSubscriptionSnapshot,
} from "@/db/lib/stripe-api"
import {
  clearUserStripeCustomerId,
  getBillingSubscriptionByClerkId,
  getPlanByStripePriceId,
  getUserByClerkId,
  getUserByStripeCustomerId,
  linkStripeCustomerToClerkUser,
  listPaymentsByClerkId,
  ensureUserFromClerk,
} from "@/db/queries"

export type BillingSummarySubscription = {
  id: string
  status: string
  cancelAtPeriodEnd: boolean
  currentPeriodStart: string | null
  currentPeriodEnd: string | null
  canceledAt: string | null
  plan: { name: string; slug: string }
  /** Where this row was resolved for the account UI. */
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

function toIso(value: Date | null | undefined): string | null {
  if (!value) return null
  return value.toISOString()
}

function unixToIso(sec: number | null): string | null {
  if (sec == null || !Number.isFinite(sec)) return null
  return new Date(sec * 1000).toISOString()
}

const STATUS_RANK: Record<string, number> = {
  active: 0,
  trialing: 1,
  past_due: 2,
  unpaid: 3,
  paused: 4,
  canceled: 5,
  incomplete: 6,
  incomplete_expired: 7,
}

function pickBestStripeSubscription(
  rows: StripeSubscriptionSnapshot[]
): StripeSubscriptionSnapshot | null {
  if (rows.length === 0) return null
  return [...rows].sort((a, b) => {
    const ra = STATUS_RANK[a.status] ?? 50
    const rb = STATUS_RANK[b.status] ?? 50
    if (ra !== rb) return ra - rb
    return (b.currentPeriodEnd ?? 0) - (a.currentPeriodEnd ?? 0)
  })[0]
}

async function subscriptionFromStripeCustomer(
  customerId: string,
  fetchImpl?: typeof fetch
): Promise<BillingSummarySubscription | null> {
  const rows = await listStripeCustomerSubscriptions(customerId, fetchImpl)
  const best = pickBestStripeSubscription(rows)
  if (!best) return null

  const plan = best.priceId
    ? await getPlanByStripePriceId(best.priceId)
    : null

  return {
    id: best.id,
    status: best.status,
    cancelAtPeriodEnd: best.cancelAtPeriodEnd,
    currentPeriodStart: unixToIso(best.currentPeriodStart),
    currentPeriodEnd: unixToIso(best.currentPeriodEnd),
    canceledAt: unixToIso(best.canceledAt),
    plan: {
      name: plan?.name ?? "Pro",
      slug: plan?.slug ?? "pro-monthly",
    },
    source: "stripe",
  }
}

async function clerkUserExists(clerkUserId: string): Promise<boolean> {
  try {
    const client = await clerkClient()
    await client.users.getUser(clerkUserId)
    return true
  } catch {
    return false
  }
}

async function getClerkPrimaryEmail(
  clerkUserId: string
): Promise<string | null> {
  try {
    const client = await clerkClient()
    const user = await client.users.getUser(clerkUserId)
    const primary = user.emailAddresses.find(
      (e) => e.id === user.primaryEmailAddressId
    )
    return (
      primary?.emailAddress?.trim().toLowerCase() ||
      user.emailAddresses[0]?.emailAddress?.trim().toLowerCase() ||
      null
    )
  } catch {
    return null
  }
}

/**
 * Link Stripe customer to current Clerk user.
 * If another Neon row holds the customer and that Clerk user is gone (deleted),
 * reclaim the mapping so recreated accounts recover billing.
 */
async function linkOrReclaimStripeCustomer(input: {
  clerkUserId: string
  stripeCustomerId: string
}): Promise<void> {
  try {
    await linkStripeCustomerToClerkUser(input)
    return
  } catch (err) {
    if (!(err instanceof BillingIdentityConflictError)) throw err
  }

  const owner = await getUserByStripeCustomerId(input.stripeCustomerId)
  if (!owner || owner.clerkUserId === input.clerkUserId) return

  const ownerAlive = await clerkUserExists(owner.clerkUserId)
  if (ownerAlive) {
    // Still conflict with a living account - display may use customerId without Neon link.
    return
  }

  await clearUserStripeCustomerId(owner.id)
  await linkStripeCustomerToClerkUser(input)
}

async function resolveStripeCustomerId(
  clerkUserId: string,
  fetchImpl?: typeof fetch
): Promise<string | null> {
  const byClerk = await findStripeCustomerIdByClerkUserId(
    clerkUserId,
    fetchImpl
  )
  if (byClerk) return byClerk

  const email = await getClerkPrimaryEmail(clerkUserId)
  if (!email) return null

  const customerIds = await listStripeCustomerIdsByEmail(email, fetchImpl)
  let bestCustomer: string | null = null
  let bestRank = Number.POSITIVE_INFINITY

  for (const customerId of customerIds) {
    const rows = await listStripeCustomerSubscriptions(customerId, fetchImpl)
    const best = pickBestStripeSubscription(rows)
    if (!best) continue
    const rank = STATUS_RANK[best.status] ?? 50
    if (rank < bestRank) {
      bestRank = rank
      bestCustomer = customerId
    }
  }

  return bestCustomer
}

/**
 * Account Billing snapshot:
 * - payments + preferred subscription → Neon
 * - if Neon has no subscription → live Stripe via linked customer,
 *   subscription metadata search, or email match (recreated Clerk accounts)
 * Does not grant Pro / write Clerk plan metadata.
 */
export async function loadBillingSummary(
  clerkUserId: string,
  options?: { fetchImpl?: typeof fetch }
): Promise<BillingSummary> {
  const fetchImpl = options?.fetchImpl
  await ensureUserFromClerk(clerkUserId)

  const [user, neonSub, payments] = await Promise.all([
    getUserByClerkId(clerkUserId),
    getBillingSubscriptionByClerkId(clerkUserId),
    listPaymentsByClerkId(clerkUserId, { limit: 50 }),
  ])

  let customerId = user?.stripeCustomerId?.trim() || null
  let subscription: BillingSummarySubscription | null = neonSub
    ? {
        id: neonSub.id,
        status: neonSub.status,
        cancelAtPeriodEnd: neonSub.cancelAtPeriodEnd,
        currentPeriodStart: toIso(neonSub.currentPeriodStart),
        currentPeriodEnd: toIso(neonSub.currentPeriodEnd),
        canceledAt: toIso(neonSub.canceledAt),
        plan: {
          name: neonSub.plan.name,
          slug: neonSub.plan.slug,
        },
        source: "neon",
      }
    : null

  if (!subscription) {
    try {
      if (customerId) {
        subscription = await subscriptionFromStripeCustomer(
          customerId,
          fetchImpl
        )
      }

      if (!subscription) {
        const found = await resolveStripeCustomerId(clerkUserId, fetchImpl)
        if (found) {
          customerId = found
          try {
            await linkOrReclaimStripeCustomer({
              clerkUserId,
              stripeCustomerId: found,
            })
          } catch (err) {
            console.error(
              "loadBillingSummary: link/reclaim Stripe customer failed",
              err
            )
          }
          subscription = await subscriptionFromStripeCustomer(
            found,
            fetchImpl
          )
        }
      }
    } catch (err) {
      console.error("loadBillingSummary: Stripe resolve failed", err)
    }
  }

  return {
    hasStripeCustomer: Boolean(customerId),
    subscription,
    payments: payments.map((payment) => ({
      id: payment.id,
      amountCents: payment.amountCents,
      currency: payment.currency,
      status: payment.status,
      createdAt: payment.createdAt.toISOString(),
      stripeInvoiceId: payment.stripeInvoiceId,
    })),
  }
}
