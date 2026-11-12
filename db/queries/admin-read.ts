import "server-only"

import { clerkClient } from "@clerk/nextjs/server"
import {
  and,
  asc,
  count,
  desc,
  eq,
  exists,
  gt,
  gte,
  ilike,
  inArray,
  lte,
  notExists,
  or,
  sql,
  type SQL,
} from "drizzle-orm"

import { db } from "@/db"
import { wrapDbError } from "@/db/errors"
import type { AdminUserRow } from "@/db/queries/admin-billing"
import {
  countTemplateDownloadsByUserId,
  countTemplateDownloadsByUserIds,
  listTemplateDownloadsByUserId,
  listTopMarketplaceDownloadsBySlug,
  searchAdminMarketplaceDownloads,
  type MarketplaceDownloadRow,
  type TopMarketplaceDownloadRow,
} from "@/db/queries/marketplace-downloads"
import { listPaymentsByClerkId } from "@/db/queries/payments"
import {
  marketplaceDownloads,
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
  marketplaceDownloadsTotal: number
  usersLast30Days: number
}

export type AdminOverviewAlert = {
  id: "past_due" | "failed_payments_7d" | "paid_now_free"
  label: string
  count: number
  href: string
}

export type AdminOverviewRecentUser = {
  id: string
  email: string | null
  plan: "free" | "pro"
  createdAt: string
}

export type AdminOverviewRecentPayment = {
  id: string
  userId: string
  email: string | null
  amountCents: number
  currency: string
  createdAt: string
}

export type AdminOverviewRecentDownload = {
  id: string
  userId: string
  email: string | null
  slug: string
  title: string
  createdAt: string
}

export type AdminOverviewTopDownload = TopMarketplaceDownloadRow

export type AdminOverviewPayload = {
  primary: {
    usersTotal: number
    proActive: number
    revenueCents30d: number
    downloads30d: number
  }
  status: {
    usersLast7Days: number
    usersLast30Days: number
    canceling: number
    expiringIn7Days: number
    /** Active Pro via Plan Grant (`sub_manual_*`) — not an anomaly. */
    manualPro: number
  }
  alerts: AdminOverviewAlert[]
  recentUsers: AdminOverviewRecentUser[]
  recentPayments: AdminOverviewRecentPayment[]
  recentDownloads: AdminOverviewRecentDownload[]
  /** Top products by download count in the last 30 days. */
  topDownloads: AdminOverviewTopDownload[]
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
    clerkFullName: string | null
  }
  plan: AdminUserRow
  downloadsTotal: number
  downloads: MarketplaceDownloadRow[]
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

export type AdminUserSearchFilter =
  | "all"
  | "free"
  | "pro"
  | "active"
  | "expired"

export type AdminUserSearchSort =
  | "newest"
  | "oldest"
  | "email_asc"
  | "email_desc"

export type AdminUserSearchParams = {
  q?: string
  filter?: AdminUserSearchFilter
  sort?: AdminUserSearchSort
  page?: number
  pageSize?: number
}

export type AdminUserSearchResult = {
  users: AdminUserRow[]
  total: number
  page: number
  pageSize: number
}

async function softClerkFullName(clerkUserId: string): Promise<string | null> {
  try {
    const client = await clerkClient()
    const u = await client.users.getUser(clerkUserId)
    const name = [u.firstName, u.lastName].filter(Boolean).join(" ").trim()
    return name || null
  } catch {
    return null
  }
}

async function getEffectivePlanForUser(
  user: {
    id: string
    clerkUserId: string
    email: string | null
  }
): Promise<AdminUserRow> {
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
  return {
    id: user.id,
    clerkUserId: user.clerkUserId,
    email: user.email,
    plan: hit ? "pro" : "free",
    planSlug: hit?.plan.slug ?? null,
    planName: hit?.plan.name ?? null,
    status: hit?.subscription.status ?? null,
    currentPeriodEnd: hit?.subscription.currentPeriodEnd
      ? hit.subscription.currentPeriodEnd.toISOString()
      : null,
    stripeSubscriptionId: hit?.subscription.stripeSubscriptionId ?? null,
  }
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

    const [downloadsTotalRow] = await db
      .select({ n: count() })
      .from(marketplaceDownloads)

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const [usersLast30Row] = await db
      .select({ n: count() })
      .from(users)
      .where(gt(users.createdAt, thirtyDaysAgo))

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
      marketplaceDownloadsTotal: downloadsTotalRow?.n ?? 0,
      usersLast30Days: usersLast30Row?.n ?? 0,
    }
  } catch (err) {
    wrapDbError("Failed to load admin overview KPIs", err)
  }
}

function asNumber(v: unknown): number {
  if (typeof v === "number") return v
  return Number(v ?? 0) || 0
}

/**
 * Compact dashboard payload for `/admin` — aggregates + small recent lists.
 */
export async function getAdminOverview(): Promise<AdminOverviewPayload> {
  try {
    const now = new Date()
    const days7 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const days30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const in7 = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

    const [
      usersTotalRow,
      proUserIds,
      revenue30Row,
      downloads30Row,
      users7Row,
      users30Row,
      cancelingRow,
      expiringRow,
      pastDueRow,
      failed7Row,
      manualProRow,
      paidNowFreeRow,
      recentUserRows,
      recentPaymentRows,
      recentDownloadResult,
      topDownloads,
    ] = await Promise.all([
      db.select({ n: count() }).from(users).then((r) => r[0]),
      db
        .selectDistinct({ userId: subscriptions.userId })
        .from(subscriptions)
        .where(inArray(subscriptions.status, [...ACTIVE_STATUSES])),
      db
        .select({
          sum: sql<number>`coalesce(sum(${payments.amountCents}), 0)`,
        })
        .from(payments)
        .where(
          and(
            eq(payments.status, "succeeded"),
            gt(payments.createdAt, days30)
          )
        )
        .then((r) => r[0]),
      db
        .select({ n: count() })
        .from(marketplaceDownloads)
        .where(gt(marketplaceDownloads.createdAt, days30))
        .then((r) => r[0]),
      db
        .select({ n: count() })
        .from(users)
        .where(gt(users.createdAt, days7))
        .then((r) => r[0]),
      db
        .select({ n: count() })
        .from(users)
        .where(gt(users.createdAt, days30))
        .then((r) => r[0]),
      db
        .select({ n: count() })
        .from(subscriptions)
        .where(
          and(
            inArray(subscriptions.status, [...ACTIVE_STATUSES]),
            eq(subscriptions.cancelAtPeriodEnd, true)
          )
        )
        .then((r) => r[0]),
      db
        .select({ n: count() })
        .from(subscriptions)
        .where(
          and(
            inArray(subscriptions.status, [...ACTIVE_STATUSES]),
            gte(subscriptions.currentPeriodEnd, now),
            lte(subscriptions.currentPeriodEnd, in7)
          )
        )
        .then((r) => r[0]),
      db
        .select({ n: count() })
        .from(subscriptions)
        .where(eq(subscriptions.status, "past_due"))
        .then((r) => r[0]),
      db
        .select({ n: count() })
        .from(payments)
        .where(
          and(eq(payments.status, "failed"), gt(payments.createdAt, days7))
        )
        .then((r) => r[0]),
      db
        .select({
          n: sql<number>`count(distinct ${subscriptions.userId})`,
        })
        .from(subscriptions)
        .where(
          and(
            inArray(subscriptions.status, [...ACTIVE_STATUSES]),
            sql`${subscriptions.stripeSubscriptionId} like 'sub_manual_%'`
          )
        )
        .then((r) => r[0]),
      db
        .select({
          n: sql<number>`count(distinct ${payments.userId})`,
        })
        .from(payments)
        .where(
          and(
            eq(payments.status, "succeeded"),
            notExists(
              db
                .select({ id: subscriptions.id })
                .from(subscriptions)
                .where(
                  and(
                    eq(subscriptions.userId, payments.userId),
                    inArray(subscriptions.status, [...ACTIVE_STATUSES])
                  )
                )
            )
          )
        )
        .then((r) => r[0]),
      db
        .select({
          id: users.id,
          email: users.email,
          createdAt: users.createdAt,
        })
        .from(users)
        .orderBy(desc(users.createdAt))
        .limit(5),
      db
        .select({
          id: payments.id,
          userId: payments.userId,
          email: users.email,
          amountCents: payments.amountCents,
          currency: payments.currency,
          createdAt: payments.createdAt,
        })
        .from(payments)
        .leftJoin(users, eq(payments.userId, users.id))
        .where(eq(payments.status, "succeeded"))
        .orderBy(desc(payments.createdAt))
        .limit(5),
      searchAdminMarketplaceDownloads({
        page: 1,
        pageSize: 5,
        sort: "newest",
      }),
      listTopMarketplaceDownloadsBySlug({ limit: 5, sinceDays: 30 }),
    ])

    const recentUserIds = recentUserRows.map((u) => u.id)
    const proHits =
      recentUserIds.length === 0
        ? []
        : await db
            .selectDistinct({ userId: subscriptions.userId })
            .from(subscriptions)
            .where(
              and(
                inArray(subscriptions.userId, recentUserIds),
                inArray(subscriptions.status, [...ACTIVE_STATUSES])
              )
            )
    const proSet = new Set(proHits.map((h) => h.userId))

    const pastDue = pastDueRow?.n ?? 0
    const failed7 = failed7Row?.n ?? 0
    const paidNowFree = asNumber(paidNowFreeRow?.n)

    const alerts: AdminOverviewAlert[] = []
    if (pastDue > 0) {
      alerts.push({
        id: "past_due",
        label: "Past due subscriptions",
        count: pastDue,
        href: "/admin/subscriptions",
      })
    }
    if (failed7 > 0) {
      alerts.push({
        id: "failed_payments_7d",
        label: "Failed payments (7 days)",
        count: failed7,
        href: "/admin/payments",
      })
    }
    if (paidNowFree > 0) {
      alerts.push({
        id: "paid_now_free",
        label: "Paid before, now Free",
        count: paidNowFree,
        href: "/admin/users",
      })
    }

    return {
      primary: {
        usersTotal: usersTotalRow?.n ?? 0,
        proActive: proUserIds.length,
        revenueCents30d: asNumber(revenue30Row?.sum),
        downloads30d: downloads30Row?.n ?? 0,
      },
      status: {
        usersLast7Days: users7Row?.n ?? 0,
        usersLast30Days: users30Row?.n ?? 0,
        canceling: cancelingRow?.n ?? 0,
        expiringIn7Days: expiringRow?.n ?? 0,
        manualPro: asNumber(manualProRow?.n),
      },
      alerts,
      recentUsers: recentUserRows.map((u) => ({
        id: u.id,
        email: u.email,
        plan: proSet.has(u.id) ? "pro" : "free",
        createdAt: u.createdAt.toISOString(),
      })),
      recentPayments: recentPaymentRows.map((p) => ({
        id: p.id,
        userId: p.userId,
        email: p.email,
        amountCents: p.amountCents,
        currency: p.currency,
        createdAt: p.createdAt.toISOString(),
      })),
      recentDownloads: recentDownloadResult.downloads.map((d) => ({
        id: d.id,
        userId: d.userId,
        email: d.email,
        slug: d.slug,
        title: d.title,
        createdAt: d.createdAt,
      })),
      topDownloads,
    }
  } catch (err) {
    wrapDbError("Failed to load admin overview", err)
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

    const [plan, downloads, downloadsTotal, clerkFullName, subRows, paymentRows] =
      await Promise.all([
        getEffectivePlanForUser(user),
        listTemplateDownloadsByUserId(user.id, { limit: 50 }),
        countTemplateDownloadsByUserId(user.id),
        softClerkFullName(user.clerkUserId),
        db
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
          .limit(50),
        listPaymentsByClerkId(user.clerkUserId, { limit: 50 }),
      ])

    return {
      user: {
        id: user.id,
        clerkUserId: user.clerkUserId,
        email: user.email,
        stripeCustomerId: user.stripeCustomerId,
        createdAt: user.createdAt.toISOString(),
        clerkFullName,
      },
      plan,
      downloadsTotal,
      downloads,
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

function hasActiveSubscription() {
  return exists(
    db
      .select({ id: subscriptions.id })
      .from(subscriptions)
      .where(
        and(
          eq(subscriptions.userId, users.id),
          inArray(subscriptions.status, [...ACTIVE_STATUSES])
        )
      )
  )
}

function hasActiveOrTrialingSubscription() {
  return exists(
    db
      .select({ id: subscriptions.id })
      .from(subscriptions)
      .where(
        and(
          eq(subscriptions.userId, users.id),
          inArray(subscriptions.status, ["active", "trialing"])
        )
      )
  )
}

function hasExpiredSubscriptionSignal() {
  return exists(
    db
      .select({ id: subscriptions.id })
      .from(subscriptions)
      .where(
        and(
          eq(subscriptions.userId, users.id),
          or(
            inArray(subscriptions.status, ["canceled", "incomplete_expired"]),
            sql`${subscriptions.currentPeriodEnd} < now()`
          )
        )
      )
  )
}

function buildUserSearchWhere(
  q: string,
  filter: AdminUserSearchFilter
): SQL | undefined {
  const clauses: SQL[] = []

  if (q) {
    const pattern = `%${q.replaceAll("%", "\\%").replaceAll("_", "\\_")}%`
    clauses.push(
      or(
        ilike(users.email, pattern),
        ilike(users.clerkUserId, pattern),
        sql`${users.id}::text ilike ${pattern}`
      )!
    )
  }

  if (filter === "pro") {
    clauses.push(hasActiveSubscription())
  } else if (filter === "free") {
    clauses.push(notExists(
      db
        .select({ id: subscriptions.id })
        .from(subscriptions)
        .where(
          and(
            eq(subscriptions.userId, users.id),
            inArray(subscriptions.status, [...ACTIVE_STATUSES])
          )
        )
    ))
  } else if (filter === "active") {
    clauses.push(hasActiveOrTrialingSubscription())
  } else if (filter === "expired") {
    clauses.push(notExists(
      db
        .select({ id: subscriptions.id })
        .from(subscriptions)
        .where(
          and(
            eq(subscriptions.userId, users.id),
            inArray(subscriptions.status, [...ACTIVE_STATUSES])
          )
        )
    ))
    clauses.push(hasExpiredSubscriptionSignal())
  }

  if (clauses.length === 0) return undefined
  if (clauses.length === 1) return clauses[0]
  return and(...clauses)
}

/**
 * Server-driven admin user list: search + filter + sort + pagination.
 * Page of users + one batch plan join (no N+1).
 */
export async function searchAdminUsers(
  params: AdminUserSearchParams | string = {}
): Promise<AdminUserSearchResult> {
  const input =
    typeof params === "string"
      ? ({ q: params } satisfies AdminUserSearchParams)
      : params

  const q = (input.q ?? "").trim().slice(0, 200)
  const filter: AdminUserSearchFilter =
    input.filter === "free" ||
    input.filter === "pro" ||
    input.filter === "active" ||
    input.filter === "expired"
      ? input.filter
      : "all"
  const sort: AdminUserSearchSort =
    input.sort === "oldest" ||
    input.sort === "email_asc" ||
    input.sort === "email_desc"
      ? input.sort
      : "newest"
  const pageSize = Math.min(Math.max(input.pageSize ?? 25, 1), 50)
  const page = Math.min(Math.max(input.page ?? 1, 1), 10_000)
  const offset = (page - 1) * pageSize

  try {
    const where = buildUserSearchWhere(q, filter)

    const [totalRow] = await db.select({ n: count() }).from(users).where(where)
    const total = totalRow?.n ?? 0
    if (total === 0) {
      return { users: [], total: 0, page, pageSize }
    }

    const orderBy =
      sort === "oldest"
        ? asc(users.createdAt)
        : sort === "email_asc"
          ? asc(users.email)
          : sort === "email_desc"
            ? desc(users.email)
            : desc(users.createdAt)

    const pageUsers = await db
      .select({
        id: users.id,
        clerkUserId: users.clerkUserId,
        email: users.email,
      })
      .from(users)
      .where(where)
      .orderBy(orderBy)
      .limit(pageSize)
      .offset(offset)

    if (pageUsers.length === 0) {
      return { users: [], total, page, pageSize }
    }

    const userIds = pageUsers.map((u) => u.id)
    const subHits = await db
      .select({
        userId: subscriptions.userId,
        status: subscriptions.status,
        currentPeriodEnd: subscriptions.currentPeriodEnd,
        stripeSubscriptionId: subscriptions.stripeSubscriptionId,
        planSlug: plans.slug,
        planName: plans.name,
      })
      .from(subscriptions)
      .innerJoin(plans, eq(subscriptions.planId, plans.id))
      .where(
        and(
          inArray(subscriptions.userId, userIds),
          inArray(subscriptions.status, [...ACTIVE_STATUSES])
        )
      )
      .orderBy(desc(subscriptions.currentPeriodEnd))

    const bestByUser = new Map<string, (typeof subHits)[number]>()
    for (const hit of subHits) {
      if (!bestByUser.has(hit.userId)) bestByUser.set(hit.userId, hit)
    }

    const downloadCounts = await countTemplateDownloadsByUserIds(userIds)

    const mapped: AdminUserRow[] = pageUsers.map((u) => {
      const hit = bestByUser.get(u.id)
      return {
        id: u.id,
        clerkUserId: u.clerkUserId,
        email: u.email,
        plan: hit ? "pro" : "free",
        planSlug: hit?.planSlug ?? null,
        planName: hit?.planName ?? null,
        status: hit?.status ?? null,
        currentPeriodEnd: hit?.currentPeriodEnd
          ? hit.currentPeriodEnd.toISOString()
          : null,
        stripeSubscriptionId: hit?.stripeSubscriptionId ?? null,
        downloadsCount: downloadCounts.get(u.id) ?? 0,
      }
    })

    return { users: mapped, total, page, pageSize }
  } catch (err) {
    wrapDbError("Failed to search admin users", err)
  }
}
