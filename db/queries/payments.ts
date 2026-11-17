import "server-only"

import { and, desc, eq, sql } from "drizzle-orm"

import { db } from "@/db"
import { LostWebhookClaimError, wrapDbError } from "@/db/errors"
import {
  assertAndTouchWebhookClaim,
  claimOwnershipSql,
  type WebhookClaim,
} from "@/db/queries/claim-guard"
import { payments, users, type Payment } from "@/db/schema"

export type UpsertPaymentInput = {
  userId: string
  subscriptionId?: string | null
  stripeInvoiceId?: string | null
  stripePaymentIntentId?: string | null
  amountCents: number
  currency?: string
  status: Payment["status"]
  claim: WebhookClaim
  /** Stripe `event.created` - used to refuse older/stale status downgrades. */
  lastStripeEventCreated?: number | null
}

/**
 * Claim-gated idempotent payment upsert.
 *
 * Guards:
 * - claim ownership required for insert/update
 * - never apply when existing last_stripe_event_created is strictly newer
 * - never downgrade `succeeded` → `pending` (payment_action_required after paid)
 *
 * Deduping (Managed Payments + basil):
 * `checkout.session.completed` may insert a PI-only row; later `invoice.paid`
 * often has no top-level `payment_intent` (basil). Before inserting by invoice
 * id, attach the invoice onto an existing PI row when possible so admin /
 * Billing show one payment per charge.
 */
export async function upsertPayment(
  input: UpsertPaymentInput
): Promise<{ payment: Payment; applied: boolean }> {
  const invoiceId = input.stripeInvoiceId?.trim() || null
  const piId = input.stripePaymentIntentId?.trim() || null
  if (!invoiceId && !piId) {
    throw new Error("stripeInvoiceId or stripePaymentIntentId is required")
  }

  const owned = claimOwnershipSql(input.claim)
  const currency = input.currency ?? "usd"
  const eventCreated = input.lastStripeEventCreated ?? null
  const status = input.status
  const subscriptionId = input.subscriptionId ?? null

  /** Shared ON CONFLICT / UPDATE predicate. */
  const updateAllowed = sql`
    ${owned}
    and (
      payments.last_stripe_event_created is null
      or ${eventCreated}::int is null
      or payments.last_stripe_event_created <= ${eventCreated}::int
    )
    and not (
      payments.status = 'succeeded'
      and ${status}::payment_status = 'pending'
    )
  `

  try {
    if (invoiceId) {
      const merged = await mergeInvoiceOntoExistingPaymentIntent({
        userId: input.userId,
        invoiceId,
        piId,
        amountCents: input.amountCents,
        currency,
        status,
        subscriptionId,
        eventCreated,
        owned,
        updateAllowed,
        claim: input.claim,
      })
      if (merged) return merged

      const result = await db.execute(sql`
        with claim_ok as (
          select 1 as ok
          where ${owned}
        )
        insert into payments (
          user_id, subscription_id, stripe_invoice_id, stripe_payment_intent_id,
          amount_cents, currency, status, last_stripe_event_created
        )
        select
          ${input.userId}::uuid,
          ${subscriptionId}::uuid,
          ${invoiceId},
          ${piId},
          ${input.amountCents},
          ${currency},
          ${status}::payment_status,
          ${eventCreated}
        from claim_ok
        on conflict (stripe_invoice_id)
        do update set
          user_id = excluded.user_id,
          subscription_id = coalesce(excluded.subscription_id, payments.subscription_id),
          stripe_payment_intent_id = coalesce(payments.stripe_payment_intent_id, excluded.stripe_payment_intent_id),
          amount_cents = excluded.amount_cents,
          currency = excluded.currency,
          status = excluded.status,
          last_stripe_event_created = coalesce(excluded.last_stripe_event_created, payments.last_stripe_event_created),
          updated_at = now()
        where ${updateAllowed}
        returning id
      `)

      if (executeRowCount(result)) {
        const payment = await getPaymentByStripeInvoiceId(invoiceId)
        if (!payment) throw new LostWebhookClaimError()
        return { payment, applied: true }
      }

      await assertClaimOrThrow(input.claim)
      const payment = await getPaymentByStripeInvoiceId(invoiceId)
      if (!payment) throw new LostWebhookClaimError()
      return { payment, applied: false }
    }

    const result = await db.execute(sql`
      with claim_ok as (
        select 1 as ok
        where ${owned}
      )
      insert into payments (
        user_id, subscription_id, stripe_invoice_id, stripe_payment_intent_id,
        amount_cents, currency, status, last_stripe_event_created
      )
      select
        ${input.userId}::uuid,
        ${subscriptionId}::uuid,
        ${invoiceId},
        ${piId},
        ${input.amountCents},
        ${currency},
        ${status}::payment_status,
        ${eventCreated}
      from claim_ok
      on conflict (stripe_payment_intent_id)
      do update set
        user_id = excluded.user_id,
        subscription_id = coalesce(excluded.subscription_id, payments.subscription_id),
        stripe_invoice_id = coalesce(payments.stripe_invoice_id, excluded.stripe_invoice_id),
        amount_cents = excluded.amount_cents,
        currency = excluded.currency,
        status = excluded.status,
        last_stripe_event_created = coalesce(excluded.last_stripe_event_created, payments.last_stripe_event_created),
        updated_at = now()
      where ${updateAllowed}
      returning id
    `)

    if (executeRowCount(result)) {
      const payment = await db.query.payments.findFirst({
        where: eq(payments.stripePaymentIntentId, piId!),
      })
      if (!payment) throw new LostWebhookClaimError()
      return { payment, applied: true }
    }

    await assertClaimOrThrow(input.claim)
    const payment = await db.query.payments.findFirst({
      where: eq(payments.stripePaymentIntentId, piId!),
    })
    if (!payment) throw new LostWebhookClaimError()
    return { payment, applied: false }
  } catch (err) {
    if (err instanceof LostWebhookClaimError) throw err
    wrapDbError("Failed to upsert payment", err)
  }
}

/**
 * Attach invoice id onto a PI-first payment row (product Checkout + later invoice.paid).
 */
async function mergeInvoiceOntoExistingPaymentIntent(input: {
  userId: string
  invoiceId: string
  piId: string | null
  amountCents: number
  currency: string
  status: Payment["status"]
  subscriptionId: string | null
  eventCreated: number | null
  owned: ReturnType<typeof claimOwnershipSql>
  updateAllowed: ReturnType<typeof sql>
  claim: WebhookClaim
}): Promise<{ payment: Payment; applied: boolean } | null> {
  const {
    userId,
    invoiceId,
    piId,
    amountCents,
    currency,
    status,
    subscriptionId,
    eventCreated,
    owned,
    updateAllowed,
    claim,
  } = input

  // Invoice already stored → nothing to merge for insert path.
  const byInvoice = await getPaymentByStripeInvoiceId(invoiceId)
  if (byInvoice) return null

  let targetId: string | null = null

  if (piId) {
    const byPi = await db.query.payments.findFirst({
      where: eq(payments.stripePaymentIntentId, piId),
    })
    if (byPi && (byPi.stripeInvoiceId == null || byPi.stripeInvoiceId === invoiceId)) {
      targetId = byPi.id
    }
  }

  // Basil invoice.paid may omit PI entirely, attach only when a single
  // recent PI-only row matches user+amount (avoids merging two same-price buys).
  if (!targetId && !piId) {
    const recent = await db.execute(sql`
      select id
      from payments
      where user_id = ${userId}::uuid
        and stripe_invoice_id is null
        and stripe_payment_intent_id is not null
        and amount_cents = ${amountCents}
        and created_at > now() - interval '48 hours'
      order by created_at desc
      limit 2
    `)
    const rows = executeRows(recent)
    if (rows.length === 1) {
      const id = rows[0]?.id
      if (typeof id === "string" && id.length > 0) targetId = id
    }
  }

  if (!targetId) return null

  const result = await db.execute(sql`
    with claim_ok as (
      select 1 as ok
      where ${owned}
    )
    update payments
    set
      stripe_invoice_id = ${invoiceId},
      stripe_payment_intent_id = coalesce(
        payments.stripe_payment_intent_id,
        ${piId}
      ),
      subscription_id = coalesce(${subscriptionId}::uuid, payments.subscription_id),
      amount_cents = ${amountCents},
      currency = ${currency},
      status = ${status}::payment_status,
      last_stripe_event_created = coalesce(
        ${eventCreated}::int,
        payments.last_stripe_event_created
      ),
      updated_at = now()
    from claim_ok
    where payments.id = ${targetId}::uuid
      and (
        payments.stripe_invoice_id is null
        or payments.stripe_invoice_id = ${invoiceId}
      )
      and ${updateAllowed}
    returning payments.id
  `)

  if (!executeRowCount(result)) {
    await assertClaimOrThrow(claim)
    const payment = await getPaymentByStripeInvoiceId(invoiceId)
    if (payment) return { payment, applied: false }
    // Stale/refused update, keep the PI row; do not fall through to insert
    // (would unique-violate on stripe_payment_intent_id).
    const again = await db.query.payments.findFirst({
      where: eq(payments.id, targetId),
    })
    if (again) return { payment: again, applied: false }
    return null
  }

  const payment = await getPaymentByStripeInvoiceId(invoiceId)
  if (!payment) throw new LostWebhookClaimError()
  return { payment, applied: true }
}

async function assertClaimOrThrow(claim: WebhookClaim): Promise<void> {
  await assertAndTouchWebhookClaim(claim)
}

function executeRowCount(result: unknown): number {
  return executeRows(result).length || fallbackRowCount(result)
}

function fallbackRowCount(result: unknown): number {
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

function executeRows(result: unknown): Array<Record<string, unknown>> {
  if (Array.isArray(result)) {
    return result.filter(
      (r): r is Record<string, unknown> =>
        Boolean(r) && typeof r === "object" && !Array.isArray(r)
    )
  }
  if (
    result &&
    typeof result === "object" &&
    "rows" in result &&
    Array.isArray((result as { rows: unknown[] }).rows)
  ) {
    return (result as { rows: unknown[] }).rows.filter(
      (r): r is Record<string, unknown> =>
        Boolean(r) && typeof r === "object" && !Array.isArray(r)
    )
  }
  return []
}

export async function getPaymentByStripeInvoiceId(
  stripeInvoiceId: string
): Promise<Payment | null> {
  try {
    const row = await db.query.payments.findFirst({
      where: eq(payments.stripeInvoiceId, stripeInvoiceId),
    })
    return row ?? null
  } catch (err) {
    wrapDbError("Failed to get payment by Stripe invoice id", err)
  }
}

export async function listPaymentsByClerkId(
  clerkUserId: string,
  opts: { limit?: number } = {}
): Promise<Payment[]> {
  const limit = Math.min(Math.max(opts.limit ?? 50, 1), 100)
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.clerkUserId, clerkUserId),
    })
    if (!user) return []

    return await db.query.payments.findMany({
      where: eq(payments.userId, user.id),
      orderBy: [desc(payments.createdAt)],
      limit,
    })
  } catch (err) {
    wrapDbError("Failed to list payments by Clerk id", err)
  }
}

export async function getPaymentForClerkUser(
  paymentId: string,
  clerkUserId: string
): Promise<Payment | null> {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.clerkUserId, clerkUserId),
    })
    if (!user) return null

    const row = await db.query.payments.findFirst({
      where: and(eq(payments.id, paymentId), eq(payments.userId, user.id)),
    })
    return row ?? null
  } catch (err) {
    wrapDbError("Failed to get payment for Clerk user", err)
  }
}
