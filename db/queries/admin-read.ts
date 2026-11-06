import "server-only"

import { and, count, desc, eq, ilike, inArray, or, sql } from "drizzle-orm"

import { db } from "@/db"
import { wrapDbError } from "@/db/errors"
import {
  listUsersWithPlan,
  type AdminUserRow,
} from "@/db/queries/admin-billing"
import { listPaymentsByClerkId } from "@/db/queries/payments"
import {
  payments,
  plans,
  stripeWebhookEvents,
  subscriptions,
  users,
  type Payment,
  type Plan,
  type StripeWebhookEvent,
} from "@/db/schema"

const ACTIVE_STATUSES = ["active", "trialing", "past_due"] as const

export type AdminOverviewKpis = {
  usersTotal: number
  proActive: number
  freeUsers: number
  subscriptionsActive: number
  subscriptionsPastDue: number
  paymentsSucceeded: number
  paymentsFailed: number
  revenueCentsSucceeded: number
}

export type AdminPaymentRow = {
  id: string
  userId: string
  email: string | null
  clerkUserId: string | null
  amountCents: number
  currency: string
  status: string
  stripeInvoiceId: string | null
  createdAt: string
}

export type AdminSubscriptionRow = {
  id: string
  userId: string
  email: string | null
  clerkUserId: string | null
  planSlug: string
  planName: string
  status: string
  stripeSubscriptionId: string | null
  isManual: boolean
  currentPeriodEnd: string | null
  cancelAtPeriodEnd: boolean
  lastReconciledAt: string | null
}

export type AdminUserDetail = {
  user: {
    id: string
    clerkUserId: string
    email: string | null
    stripeCustomerId: string | null
    createdAt: string
  }
  plan: AdminUserRow
  subscriptions: AdminSubscriptionRow[]
  payments: Array<{
    id: string
    amountCents: number
    currency: string
    status: string
    stripeInvoiceId: string | null
    createdAt: string
  }>
}

export async function getAdminOverviewKpis(): Promise<AdminOverviewKpis> {
  try {
    const [usersTotalRow] = await db.select({ n: count() }).from(users)

    const [activeSubsRow] = await db
      .select({ n: count() })
      .from(subscriptions)
      .where(inArray(subscriptions.status, [...ACTIVE_STATUSES]))

    const [pastDueRow] = await db
      .select({ n: count() })
      .from(subscriptions)
      .where(eq(subscriptions.status, "past_due"))

    const proUserIds = await db
      .selectDistinct({ userId: subscriptions.userId })
      .from(subscriptions)
      .where(inArray(subscriptions.status, [...ACTIVE_STATUSES]))

    const [succeededRow] = await db
      .select({ n: count() })
      .from(payments)
      .where(eq(payments.status, "succeeded"))

    const [failedRow] = await db
      .select({ n: count() })
      .from(payments)
      .where(eq(payments.status, "failed"))

    const [revenueRow] = await db
      .select({
        sum: sql<number>`coalesce(sum(${payments.amountCents}), 0)`,
      })
      .from(payments)
      .where(eq(payments.status, "succeeded"))

    const usersTotal = usersTotalRow?.n ?? 0
    const proActive = proUserIds.length
    const revenueRaw = revenueRow?.sum
    const revenueCentsSucceeded =
      typeof revenueRaw === "number"
        ? revenueRaw
        : Number(revenueRaw ?? 0) || 0

    return {
      usersTotal,
      proActive,
      freeUsers: Math.max(usersTotal - proActive, 0),
      subscriptionsActive: activeSubsRow?.n ?? 0,
      subscriptionsPastDue: pastDueRow?.n ?? 0,
      paymentsSucceeded: succeededRow?.n ?? 0,
      paymentsFailed: failedRow?.n ?? 0,
      revenueCentsSucceeded,
    }
  } catch (err) {
    wrapDbError("Failed to load admin overview KPIs", err)
  }
}

export async function listAdminPayments(
  limit = 100
): Promise<AdminPaymentRow[]> {
  const lim = Math.min(Math.max(limit, 1), 200)
  try {
    const rows = await db
      .select({
        id: payments.id,
        userId: payments.userId,
        email: users.email,
        clerkUserId: users.clerkUserId,
        amountCents: payments.amountCents,
        currency: payments.currency,
        status: payments.status,
        stripeInvoiceId: payments.stripeInvoiceId,
        createdAt: payments.createdAt,
      })
      .from(payments)
      .leftJoin(users, eq(payments.userId, users.id))
      .orderBy(desc(payments.createdAt))
      .limit(lim)

    return rows.map((r) => ({
      id: r.id,
      userId: r.userId,
      email: r.email,
      clerkUserId: r.clerkUserId,
      amountCents: r.amountCents,
      currency: r.currency,
      status: r.status,
      stripeInvoiceId: r.stripeInvoiceId,
      createdAt: r.createdAt.toISOString(),
    }))
  } catch (err) {
    wrapDbError("Failed to list admin payments", err)
  }
}

export async function listAdminSubscriptions(
  limit = 100
): Promise<AdminSubscriptionRow[]> {
  const lim = Math.min(Math.max(limit, 1), 200)
  try {
    const rows = await db
      .select({
        id: subscriptions.id,
        userId: subscriptions.userId,
        email: users.email,
        clerkUserId: users.clerkUserId,
        planSlug: plans.slug,
        planName: plans.name,
        status: subscriptions.status,
        stripeSubscriptionId: subscriptions.stripeSubscriptionId,
        currentPeriodEnd: subscriptions.currentPeriodEnd,
        cancelAtPeriodEnd: subscriptions.cancelAtPeriodEnd,
        lastReconciledAt: subscriptions.lastReconciledAt,
      })
      .from(subscriptions)
      .innerJoin(plans, eq(subscriptions.planId, plans.id))
      .leftJoin(users, eq(subscriptions.userId, users.id))
      .orderBy(desc(subscriptions.updatedAt))
      .limit(lim)

    return rows.map((r) => {
      const stripeId = r.stripeSubscriptionId
      return {
        id: r.id,
        userId: r.userId,
        email: r.email,
        clerkUserId: r.clerkUserId,
        planSlug: r.planSlug,
        planName: r.planName,
        status: r.status,
        stripeSubscriptionId: stripeId,
        isManual: Boolean(stripeId?.startsWith("sub_manual_")),
        currentPeriodEnd: r.currentPeriodEnd
          ? r.currentPeriodEnd.toISOString()
          : null,
        cancelAtPeriodEnd: r.cancelAtPeriodEnd,
        lastReconciledAt: r.lastReconciledAt
          ? r.lastReconciledAt.toISOString()
          : null,
      }
    })
  } catch (err) {
    wrapDbError("Failed to list admin subscriptions", err)
  }
}

export async function listAdminPlans(): Promise<Plan[]> {
  try {
    return await db.query.plans.findMany({
      orderBy: (p, { asc }) => [asc(p.slug)],
    })
  } catch (err) {
    wrapDbError("Failed to list admin plans", err)
  }
}

export async function listAdminStripeEvents(
  limit = 100
): Promise<StripeWebhookEvent[]> {
  const lim = Math.min(Math.max(limit, 1), 200)
  try {
    return await db.query.stripeWebhookEvents.findMany({
      orderBy: [desc(stripeWebhookEvents.createdAt)],
      limit: lim,
    })
  } catch (err) {
    wrapDbError("Failed to list admin Stripe webhook events", err)
  }
}

export async function getAdminUserDetail(
  userId: string
): Promise<AdminUserDetail | null> {
  const id = userId.trim()
  if (!id) return null

  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    })
    if (!user) return null

    const planRows = await listUsersWithPlan(500)
    const plan =
      planRows.find((u) => u.id === user.id) ??
      ({
        id: user.id,
        clerkUserId: user.clerkUserId,
        email: user.email,
        plan: "free" as const,
        planSlug: null,
        planName: null,
        status: null,
        currentPeriodEnd: null,
        stripeSubscriptionId: null,
      } satisfies AdminUserRow)

    const subRows = await db
      .select({
        id: subscriptions.id,
        userId: subscriptions.userId,
        email: users.email,
        clerkUserId: users.clerkUserId,
        planSlug: plans.slug,
        planName: plans.name,
        status: subscriptions.status,
        stripeSubscriptionId: subscriptions.stripeSubscriptionId,
        currentPeriodEnd: subscriptions.currentPeriodEnd,
        cancelAtPeriodEnd: subscriptions.cancelAtPeriodEnd,
        lastReconciledAt: subscriptions.lastReconciledAt,
      })
      .from(subscriptions)
      .innerJoin(plans, eq(subscriptions.planId, plans.id))
      .leftJoin(users, eq(subscriptions.userId, users.id))
      .where(eq(subscriptions.userId, user.id))
      .orderBy(desc(subscriptions.updatedAt))
      .limit(50)

    const paymentRows = await listPaymentsByClerkId(user.clerkUserId, {
      limit: 50,
    })

    return {
      user: {
        id: user.id,
        clerkUserId: user.clerkUserId,
        email: user.email,
        stripeCustomerId: user.stripeCustomerId,
        createdAt: user.createdAt.toISOString(),
      },
      plan,
      subscriptions: subRows.map((r) => {
        const stripeId = r.stripeSubscriptionId
        return {
          id: r.id,
          userId: r.userId,
          email: r.email,
          clerkUserId: r.clerkUserId,
          planSlug: r.planSlug,
          planName: r.planName,
          status: r.status,
          stripeSubscriptionId: stripeId,
          isManual: Boolean(stripeId?.startsWith("sub_manual_")),
          currentPeriodEnd: r.currentPeriodEnd
            ? r.currentPeriodEnd.toISOString()
            : null,
          cancelAtPeriodEnd: r.cancelAtPeriodEnd,
          lastReconciledAt: r.lastReconciledAt
            ? r.lastReconciledAt.toISOString()
            : null,
        }
      }),
      payments: paymentRows.map((p: Payment) => ({
        id: p.id,
        amountCents: p.amountCents,
        currency: p.currency,
        status: p.status,
        stripeInvoiceId: p.stripeInvoiceId,
        createdAt: p.createdAt.toISOString(),
      })),
    }
  } catch (err) {
    wrapDbError("Failed to load admin user detail", err)
  }
}

export async function searchAdminUsers(q: string): Promise<AdminUserRow[]> {
  const query = q.trim()
  if (!query) return listUsersWithPlan(200)

  try {
    const pattern = `%${query.replaceAll("%", "\\%").replaceAll("_", "\\_")}%`
    const matched = await db
      .select({
        id: users.id,
        clerkUserId: users.clerkUserId,
        email: users.email,
      })
      .from(users)
      .where(
        or(
          ilike(users.email, pattern),
          ilike(users.clerkUserId, pattern),
          sql`${users.id}::text ilike ${pattern}`
        )
      )
      .orderBy(desc(users.createdAt))
      .limit(100)

    if (matched.length === 0) return []

    const result: AdminUserRow[] = []
    for (const row of matched) {
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
    wrapDbError("Failed to search admin users", err)
  }
}
