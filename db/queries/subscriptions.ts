import "server-only"

import { and, desc, eq, inArray, sql } from "drizzle-orm"

import { db } from "@/db"
import {
  LostReconcileLeaseError,
  LostWebhookClaimError,
  StripeApiError,
  wrapDbError,
} from "@/db/errors"
import {
  fetchStripeSubscription,
  type StripeSubscriptionSnapshot,
} from "@/db/lib/stripe-api"
import {
  assertAndTouchWebhookClaim,
  claimOwnershipSql,
  type WebhookClaim,
} from "@/db/queries/claim-guard"
import { getPlanBySlug } from "@/db/queries/plans"
import {
  acquireSubscriptionReconcileLease,
  reconcileLeaseOwnershipSql,
  releaseSubscriptionReconcileLease,
  renewSubscriptionReconcileLease,
} from "@/db/queries/subscription-reconcile-leases"
import {
  plans,
  subscriptions,
  users,
  type Subscription,
} from "@/db/schema"

const ACTIVE_STATUSES = ["active", "trialing", "past_due"] as const

const STRIPE_STATUS_MAP: Record<string, Subscription["status"]> = {
  active: "active",
  trialing: "trialing",
  past_due: "past_due",
  canceled: "canceled",
  unpaid: "unpaid",
  incomplete: "incomplete",
  incomplete_expired: "incomplete_expired",
  paused: "paused",
}

export type SubscriptionWithPlan = Subscription & {
  plan: typeof plans.$inferSelect
}

export type ReconcileLeaseHolder = {
  fence: number
  holderToken: string
}

export async function getSubscriptionByStripeId(
  stripeSubscriptionId: string
): Promise<Subscription | null> {
  try {
    const row = await db.query.subscriptions.findFirst({
      where: eq(subscriptions.stripeSubscriptionId, stripeSubscriptionId),
    })
    return row ?? null
  } catch (err) {
    wrapDbError("Failed to get subscription by Stripe id", err)
  }
}

export async function getActiveSubscriptionByClerkId(
  clerkUserId: string
): Promise<SubscriptionWithPlan | null> {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.clerkUserId, clerkUserId),
    })
    if (!user) return null

    const joined = await db
      .select({
        subscription: subscriptions,
        plan: plans,
      })
      .from(subscriptions)
      .innerJoin(plans, eq(subscriptions.planId, plans.id))
      .where(
        and(
          eq(subscriptions.userId, user.id),
          inArray(subscriptions.status, [...ACTIVE_STATUSES])
        )
      )
      .orderBy(desc(subscriptions.currentPeriodEnd))
      .limit(1)

    const hit = joined[0]
    if (!hit) return null
    return { ...hit.subscription, plan: hit.plan }
  } catch (err) {
    wrapDbError("Failed to get active subscription by Clerk id", err)
  }
}

async function resolvePlanIdFromStripePrice(
  priceId: string | null
): Promise<string> {
  if (priceId) {
    const byPrice = await db.query.plans.findFirst({
      where: eq(plans.stripePriceId, priceId),
    })
    if (byPrice) return byPrice.id
  }
  const monthly = await getPlanBySlug("pro-monthly")
  if (!monthly) throw new Error("pro-monthly plan missing — run db:seed")
  return monthly.id
}

function mapStripeStatus(status: string): Subscription["status"] {
  return STRIPE_STATUS_MAP[status] ?? "incomplete"
}

function unixToDate(sec: number | null | undefined): Date | null {
  if (sec == null || !Number.isFinite(sec)) return null
  return new Date(sec * 1000)
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Apply a Stripe subscription snapshot only while:
 * - webhook claim is held, and
 * - reconcile lease (fence + holder) is held and unexpired, and
 * - snapshotFetchedAt is not older than subscriptions.last_reconciled_at
 *   (blocks an expired worker's stale snapshot after a newer apply).
 */
export async function applySubscriptionSnapshot(input: {
  userId: string
  stripeSubscriptionId: string
  snapshot: StripeSubscriptionSnapshot
  claim: WebhookClaim
  reconcileLease: ReconcileLeaseHolder
  /** Wall-clock when this worker finished fetching the Stripe snapshot. */
  snapshotFetchedAt: Date
  triggerEventId?: string
}): Promise<{ subscription: Subscription; applied: boolean }> {
  const status = mapStripeStatus(input.snapshot.status)
  const planId = await resolvePlanIdFromStripePrice(input.snapshot.priceId)
  const periodStart = unixToDate(input.snapshot.currentPeriodStart)
  const periodEnd = unixToDate(input.snapshot.currentPeriodEnd)
  const canceledAt = unixToDate(input.snapshot.canceledAt)
  const endedAt = unixToDate(input.snapshot.endedAt)
  const eventId = input.triggerEventId ?? null
  const owned = claimOwnershipSql(input.claim)
  const leaseOwned = reconcileLeaseOwnershipSql({
    stripeSubscriptionId: input.stripeSubscriptionId,
    fence: input.reconcileLease.fence,
    holderToken: input.reconcileLease.holderToken,
  })
  const fetchedAt = input.snapshotFetchedAt

  try {
    const result = await db.execute(sql`
      with gate as (
        select 1 as ok
        where ${owned}
          and ${leaseOwned}
      )
      insert into subscriptions (
        user_id, plan_id, status, stripe_subscription_id,
        last_stripe_event_id, last_reconciled_at,
        current_period_start, current_period_end,
        cancel_at_period_end, canceled_at, ended_at
      )
      select
        ${input.userId}::uuid,
        ${planId}::uuid,
        ${status}::subscription_status,
        ${input.stripeSubscriptionId},
        ${eventId},
        ${fetchedAt},
        ${periodStart},
        ${periodEnd},
        ${input.snapshot.cancelAtPeriodEnd},
        ${canceledAt},
        ${endedAt}
      from gate
      on conflict (stripe_subscription_id)
      do update set
        user_id = excluded.user_id,
        plan_id = excluded.plan_id,
        status = excluded.status,
        last_stripe_event_id = excluded.last_stripe_event_id,
        last_reconciled_at = excluded.last_reconciled_at,
        current_period_start = excluded.current_period_start,
        current_period_end = excluded.current_period_end,
        cancel_at_period_end = excluded.cancel_at_period_end,
        canceled_at = excluded.canceled_at,
        ended_at = excluded.ended_at,
        updated_at = now()
      where ${owned}
        and ${leaseOwned}
        and (
          subscriptions.last_reconciled_at is null
          or subscriptions.last_reconciled_at <= excluded.last_reconciled_at
        )
      returning id
    `)

    if (executeRowCount(result)) {
      const subscription = await getSubscriptionByStripeId(
        input.stripeSubscriptionId
      )
      if (!subscription) throw new LostReconcileLeaseError()
      return { subscription, applied: true }
    }

    // Distinguish lost claim / lost lease / watermark skip
    try {
      await assertAndTouchWebhookClaim(input.claim)
    } catch (err) {
      if (err instanceof LostWebhookClaimError) throw err
      throw err
    }

    try {
      await renewSubscriptionReconcileLease(
        input.stripeSubscriptionId,
        input.reconcileLease.fence,
        input.reconcileLease.holderToken
      )
    } catch (err) {
      if (err instanceof LostReconcileLeaseError) throw err
      throw err
    }

    const subscription = await getSubscriptionByStripeId(
      input.stripeSubscriptionId
    )
    if (!subscription) {
      throw new LostReconcileLeaseError(
        "Subscription missing after gated apply skipped"
      )
    }
    // Lease + claim held but watermark rejected an older snapshot
    return { subscription, applied: false }
  } catch (err) {
    if (
      err instanceof LostWebhookClaimError ||
      err instanceof LostReconcileLeaseError
    ) {
      throw err
    }
    wrapDbError("Failed to apply subscription snapshot", err)
  }
}

/**
 * Serialize per stripe_subscription_id: acquire reconcile lease → fetch Stripe →
 * apply under claim + lease + fetchedAt watermark → release.
 */
export async function reconcileSubscriptionFromStripe(input: {
  userId: string
  stripeSubscriptionId: string
  claim: WebhookClaim
  triggerEventId?: string
  fetchImpl?: typeof fetch
  /** Test hook: max attempts to acquire the reconcile lease. */
  leaseAcquireAttempts?: number
}): Promise<{ subscription: Subscription; applied: boolean }> {
  await assertAndTouchWebhookClaim(input.claim)

  const maxAttempts = input.leaseAcquireAttempts ?? 12
  let lease: ReconcileLeaseHolder | null = null

  for (let i = 0; i < maxAttempts; i++) {
    const acquired = await acquireSubscriptionReconcileLease(
      input.stripeSubscriptionId
    )
    if (acquired.acquired) {
      lease = { fence: acquired.fence, holderToken: acquired.holderToken }
      break
    }
    await sleep(25 + i * 15)
  }

  if (!lease) {
    throw new LostReconcileLeaseError(
      "Could not acquire subscription reconcile lease"
    )
  }

  try {
    await renewSubscriptionReconcileLease(
      input.stripeSubscriptionId,
      lease.fence,
      lease.holderToken
    )

    let snapshot: StripeSubscriptionSnapshot
    try {
      snapshot = await fetchStripeSubscription(
        input.stripeSubscriptionId,
        input.fetchImpl
      )
    } catch (err) {
      if (err instanceof StripeApiError) throw err
      wrapDbError("Stripe subscription retrieve failed", err)
    }

    const snapshotFetchedAt = new Date()

    await renewSubscriptionReconcileLease(
      input.stripeSubscriptionId,
      lease.fence,
      lease.holderToken
    )

    return await applySubscriptionSnapshot({
      userId: input.userId,
      stripeSubscriptionId: input.stripeSubscriptionId,
      snapshot,
      claim: input.claim,
      reconcileLease: lease,
      snapshotFetchedAt,
      triggerEventId: input.triggerEventId,
    })
  } finally {
    await releaseSubscriptionReconcileLease(
      input.stripeSubscriptionId,
      lease.fence,
      lease.holderToken
    ).catch(() => {})
  }
}

/** Claim-gated direct upsert (tests / non-Stripe paths). Prefer reconcile for webhooks. */
export async function upsertSubscriptionByStripeId(input: {
  userId: string
  planId: string
  status: Subscription["status"]
  stripeSubscriptionId: string
  claim: WebhookClaim
  currentPeriodStart?: Date | null
  currentPeriodEnd?: Date | null
  cancelAtPeriodEnd?: boolean
  canceledAt?: Date | null
  endedAt?: Date | null
  triggerEventId?: string
}): Promise<{ subscription: Subscription; applied: boolean }> {
  const owned = claimOwnershipSql(input.claim)
  try {
    const result = await db.execute(sql`
      with claim_ok as (
        select 1 as ok
        where ${owned}
      )
      insert into subscriptions (
        user_id, plan_id, status, stripe_subscription_id,
        last_stripe_event_id, last_reconciled_at,
        current_period_start, current_period_end,
        cancel_at_period_end, canceled_at, ended_at
      )
      select
        ${input.userId}::uuid,
        ${input.planId}::uuid,
        ${input.status}::subscription_status,
        ${input.stripeSubscriptionId},
        ${input.triggerEventId ?? null},
        now(),
        ${input.currentPeriodStart ?? null},
        ${input.currentPeriodEnd ?? null},
        ${input.cancelAtPeriodEnd ?? false},
        ${input.canceledAt ?? null},
        ${input.endedAt ?? null}
      from claim_ok
      on conflict (stripe_subscription_id)
      do update set
        user_id = excluded.user_id,
        plan_id = excluded.plan_id,
        status = excluded.status,
        last_stripe_event_id = excluded.last_stripe_event_id,
        last_reconciled_at = excluded.last_reconciled_at,
        current_period_start = excluded.current_period_start,
        current_period_end = excluded.current_period_end,
        cancel_at_period_end = excluded.cancel_at_period_end,
        canceled_at = excluded.canceled_at,
        ended_at = excluded.ended_at,
        updated_at = now()
      where ${owned}
      returning id
    `)

    if (!executeRowCount(result)) throw new LostWebhookClaimError()

    const subscription = await getSubscriptionByStripeId(
      input.stripeSubscriptionId
    )
    if (!subscription) throw new LostWebhookClaimError()
    return { subscription, applied: true }
  } catch (err) {
    if (err instanceof LostWebhookClaimError) throw err
    wrapDbError("Failed to upsert subscription", err)
  }
}

function executeRowCount(result: unknown): number {
  if (Array.isArray(result)) return result.length
  if (
    result &&
    typeof result === "object" &&
    "rows" in result &&
    Array.isArray((result as { rows: unknown[] }).rows)
  ) {
    return (result as { rows: unknown[] }).rows.length
  }
  if (
    result &&
    typeof result === "object" &&
    "rowCount" in result &&
    typeof (result as { rowCount: unknown }).rowCount === "number"
  ) {
    return (result as { rowCount: number }).rowCount
  }
  return 0
}
