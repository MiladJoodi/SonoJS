import "server-only"

import { and, eq, lt, or, sql } from "drizzle-orm"

import { db } from "@/db"
import { LostReconcileLeaseError, wrapDbError } from "@/db/errors"
import { subscriptionReconcileLeases } from "@/db/schema"

const DEFAULT_LOCK_MS = 30_000

export type ReconcileLease =
  | { acquired: true; fence: number; holderToken: string }
  | { acquired: false }

export function reconcileLeaseOwnershipSql(input: {
  stripeSubscriptionId: string
  fence: number
  holderToken: string
}) {
  return sql`exists (
    select 1
    from subscription_reconcile_leases l
    where l.stripe_subscription_id = ${input.stripeSubscriptionId}
      and l.fence = ${input.fence}
      and l.holder_token = ${input.holderToken}::uuid
      and l.locked_until is not null
      and l.locked_until > now()
  )`
}

export async function acquireSubscriptionReconcileLease(
  stripeSubscriptionId: string,
  options?: { lockMs?: number }
): Promise<ReconcileLease> {
  const lockMs = options?.lockMs ?? DEFAULT_LOCK_MS
  const holderToken = crypto.randomUUID()
  const lockedUntil = new Date(Date.now() + lockMs)
  const now = new Date()

  try {
    await db
      .insert(subscriptionReconcileLeases)
      .values({
        stripeSubscriptionId,
        fence: 0,
      })
      .onConflictDoNothing({
        target: subscriptionReconcileLeases.stripeSubscriptionId,
      })

    const rows = await db
      .update(subscriptionReconcileLeases)
      .set({
        fence: sql`${subscriptionReconcileLeases.fence} + 1`,
        holderToken,
        lockedUntil,
        updatedAt: now,
      })
      .where(
        and(
          eq(
            subscriptionReconcileLeases.stripeSubscriptionId,
            stripeSubscriptionId
          ),
          or(
            sql`${subscriptionReconcileLeases.holderToken} is null`,
            lt(subscriptionReconcileLeases.lockedUntil, now),
            sql`${subscriptionReconcileLeases.lockedUntil} is null`
          )
        )
      )
      .returning()

    const row = rows[0]
    if (!row?.holderToken) return { acquired: false }
    return {
      acquired: true,
      fence: Number(row.fence),
      holderToken: row.holderToken,
    }
  } catch (err) {
    wrapDbError("Failed to acquire subscription reconcile lease", err)
  }
}

export async function renewSubscriptionReconcileLease(
  stripeSubscriptionId: string,
  fence: number,
  holderToken: string,
  options?: { lockMs?: number }
): Promise<void> {
  const lockMs = options?.lockMs ?? DEFAULT_LOCK_MS
  try {
    const rows = await db
      .update(subscriptionReconcileLeases)
      .set({
        lockedUntil: new Date(Date.now() + lockMs),
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(
            subscriptionReconcileLeases.stripeSubscriptionId,
            stripeSubscriptionId
          ),
          eq(subscriptionReconcileLeases.fence, fence),
          eq(subscriptionReconcileLeases.holderToken, holderToken)
        )
      )
      .returning({
        id: subscriptionReconcileLeases.stripeSubscriptionId,
      })
    if (rows.length === 0) throw new LostReconcileLeaseError()
  } catch (err) {
    if (err instanceof LostReconcileLeaseError) throw err
    wrapDbError("Failed to renew subscription reconcile lease", err)
  }
}

export async function releaseSubscriptionReconcileLease(
  stripeSubscriptionId: string,
  fence: number,
  holderToken: string
): Promise<boolean> {
  try {
    const rows = await db
      .update(subscriptionReconcileLeases)
      .set({
        holderToken: null,
        lockedUntil: null,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(
            subscriptionReconcileLeases.stripeSubscriptionId,
            stripeSubscriptionId
          ),
          eq(subscriptionReconcileLeases.fence, fence),
          eq(subscriptionReconcileLeases.holderToken, holderToken)
        )
      )
      .returning({
        id: subscriptionReconcileLeases.stripeSubscriptionId,
      })
    return rows.length > 0
  } catch (err) {
    wrapDbError("Failed to release subscription reconcile lease", err)
  }
}
