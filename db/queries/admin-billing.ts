import "server-only"

import { and, desc, eq, inArray, sql } from "drizzle-orm"

import { db } from "@/db"
import { wrapDbError } from "@/db/errors"
import { getPlanBySlug } from "@/db/queries/plans"
import { syncClerkPlanFromDb } from "@/db/queries/sync-clerk-plan"
import { ensureUserFromClerk } from "@/db/queries/users"
import { plans, subscriptions, users } from "@/db/schema"

const ACTIVE_STATUSES = ["active", "trialing", "past_due"] as const

export type AdminPlanSlug = "pro-monthly" | "pro-yearly"

export type AdminUserRow = {
  id: string
  clerkUserId: string
  email: string | null
  plan: "free" | "pro"
  planSlug: string | null
  planName: string | null
  status: string | null
  currentPeriodEnd: string | null
  stripeSubscriptionId: string | null
}

function manualStripeSubId(clerkUserId: string): string {
  // Stripe ids are capped; keep stable + unique per Clerk user.
  const safe = clerkUserId.replace(/[^a-zA-Z0-9_]/g, "").slice(0, 40)
  return `sub_manual_${safe}`
}

export async function listUsersWithPlan(limit = 100): Promise<AdminUserRow[]> {
  try {
    const rows = await db
      .select({
        id: users.id,
        clerkUserId: users.clerkUserId,
        email: users.email,
        createdAt: users.createdAt,
      })
      .from(users)
      .orderBy(desc(users.createdAt))
      .limit(Math.min(Math.max(limit, 1), 500))

    const result: AdminUserRow[] = []
    for (const row of rows) {
      const joined = await db
        .select({
          subscription: subscriptions,
          plan: plans,
        })
        .from(subscriptions)
        .innerJoin(plans, eq(subscriptions.planId, plans.id))
        .where(
          and(
            eq(subscriptions.userId, row.id),
            inArray(subscriptions.status, [...ACTIVE_STATUSES])
          )
        )
        .orderBy(desc(subscriptions.currentPeriodEnd))
        .limit(1)

      const hit = joined[0]
      result.push({
        id: row.id,
        clerkUserId: row.clerkUserId,
        email: row.email,
        plan: hit ? "pro" : "free",
        planSlug: hit?.plan.slug ?? null,
        planName: hit?.plan.name ?? null,
        status: hit?.subscription.status ?? null,
        currentPeriodEnd: hit?.subscription.currentPeriodEnd
          ? hit.subscription.currentPeriodEnd.toISOString()
          : null,
        stripeSubscriptionId: hit?.subscription.stripeSubscriptionId ?? null,
      })
    }
    return result
  } catch (err) {
    wrapDbError("Failed to list users with plan", err)
  }
}

/**
 * Grant complimentary Pro via a stable manual subscription row, then sync Clerk.
 */
export async function grantManualPro(input: {
  clerkUserId: string
  planSlug: AdminPlanSlug
  days: number
}): Promise<AdminUserRow> {
  const clerkUserId = input.clerkUserId.trim()
  if (!clerkUserId) throw new Error("clerkUserId is required")

  const days = Math.min(Math.max(Math.floor(input.days), 1), 3650)
  const plan = await getPlanBySlug(input.planSlug)
  if (!plan || !plan.active) {
    throw new Error(`Plan not found: ${input.planSlug}`)
  }

  const user = await ensureUserFromClerk(clerkUserId)
  const stripeSubscriptionId = manualStripeSubId(clerkUserId)
  const now = new Date()
  const periodEnd = new Date(now.getTime() + days * 24 * 60 * 60 * 1000)

  try {
    await db.execute(sql`
      insert into subscriptions (
        user_id, plan_id, status, stripe_subscription_id,
        current_period_start, current_period_end,
        cancel_at_period_end, canceled_at, ended_at,
        last_reconciled_at
      )
      values (
        ${user.id}::uuid,
        ${plan.id}::uuid,
        'active'::subscription_status,
        ${stripeSubscriptionId},
        ${now},
        ${periodEnd},
        false,
        null,
        null,
        now()
      )
      on conflict (stripe_subscription_id)
      do update set
        user_id = excluded.user_id,
        plan_id = excluded.plan_id,
        status = 'active'::subscription_status,
        current_period_start = excluded.current_period_start,
        current_period_end = excluded.current_period_end,
        cancel_at_period_end = false,
        canceled_at = null,
        ended_at = null,
        last_reconciled_at = now(),
        updated_at = now()
    `)
  } catch (err) {
    wrapDbError("Failed to grant manual Pro subscription", err)
  }

  await syncClerkPlanFromDb(clerkUserId)

  const list = await listUsersWithPlan(500)
  const row = list.find((u) => u.clerkUserId === clerkUserId)
  if (row) return row

  return {
    id: user.id,
    clerkUserId,
    email: user.email,
    plan: "pro",
    planSlug: plan.slug,
    planName: plan.name,
    status: "active",
    currentPeriodEnd: periodEnd.toISOString(),
    stripeSubscriptionId,
  }
}

/**
 * Cancel active subscriptions for the user and sync Clerk → Free.
 */
export async function revokeToFree(clerkUserId: string): Promise<AdminUserRow> {
  const id = clerkUserId.trim()
  if (!id) throw new Error("clerkUserId is required")

  const user = await ensureUserFromClerk(id)
  const now = new Date()

  try {
    await db
      .update(subscriptions)
      .set({
        status: "canceled",
        cancelAtPeriodEnd: false,
        canceledAt: now,
        endedAt: now,
        updatedAt: now,
      })
      .where(
        and(
          eq(subscriptions.userId, user.id),
          inArray(subscriptions.status, [...ACTIVE_STATUSES])
        )
      )
  } catch (err) {
    wrapDbError("Failed to revoke subscriptions to Free", err)
  }

  await syncClerkPlanFromDb(id)

  return {
    id: user.id,
    clerkUserId: id,
    email: user.email,
    plan: "free",
    planSlug: null,
    planName: null,
    status: null,
    currentPeriodEnd: null,
    stripeSubscriptionId: null,
  }
}
