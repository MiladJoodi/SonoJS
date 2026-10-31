import "server-only"

import { eq, sql } from "drizzle-orm"

import { db } from "@/db"
import { LostWebhookClaimError, wrapDbError } from "@/db/errors"
import {
  assertAndTouchWebhookClaim,
  claimOwnershipSql,
  type WebhookClaim,
} from "@/db/queries/claim-guard"
import { payments, type Payment } from "@/db/schema"

export type UpsertPaymentInput = {
  userId: string
  subscriptionId?: string | null
  stripeInvoiceId?: string | null
  stripePaymentIntentId?: string | null
  amountCents: number
  currency?: string
  status: Payment["status"]
  claim: WebhookClaim
  /** Stripe `event.created` — used to refuse older/stale status downgrades. */
  lastStripeEventCreated?: number | null
}

/**
 * Claim-gated idempotent payment upsert.
 *
 * Guards:
 * - claim ownership required for insert/update
 * - never apply when existing last_stripe_event_created is strictly newer
 * - never downgrade `succeeded` → `pending` (payment_action_required after paid)
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

  /** Shared ON CONFLICT predicate (invoice and PI paths). */
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
          ${input.subscriptionId ?? null}::uuid,
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
        ${input.subscriptionId ?? null}::uuid,
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

async function assertClaimOrThrow(claim: WebhookClaim): Promise<void> {
  await assertAndTouchWebhookClaim(claim)
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
