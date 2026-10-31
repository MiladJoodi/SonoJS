import "server-only"

import type { WebhookClaim } from "@/db/queries/claim-guard"
import { fetchStripeSubscription } from "@/db/lib/stripe-api"
import { getSubscriptionByStripeId } from "@/db/queries/subscriptions"
import { upsertPayment } from "@/db/queries/payments"
import { reconcileSubscriptionFromStripe } from "@/db/queries/subscriptions"
import { syncClerkPlanFromDb } from "@/db/queries/sync-clerk-plan"
import {
  linkStripeCustomerToClerkUser,
  resolveBillingUser,
} from "@/db/queries/users"
import type { Payment, User } from "@/db/schema"
import {
  stripeId,
  stripeMetadataClerkUserId,
} from "@/lib/stripe/stripe-ids"
import type { StripeWebhookEvent } from "@/lib/stripe/verify-webhook"

/**
 * Stripe webhook event dispatch (API version 2024-11-20.acacia).
 *
 * Pro / plan access is determined ONLY from Neon subscription state after
 * `reconcileSubscriptionFromStripe` (live Stripe retrieve). Recording
 * `invoice.payment_action_required` as pending must NEVER grant or extend Pro.
 *
 * `invoice.payment_failed` must NOT force-cancel a subscription from the
 * invoice payload — access follows reconciled Stripe subscription status.
 *
 * Unlinked invoices (unknown customer, no clerkUserId): ack without payment
 * row or Pro grant; pipeline stores an audit note on the processed event.
 */
export type HandleStripeEventResult = {
  clerkUserId: string | null
  /** True when Clerk metadata should be refreshed from Neon. */
  shouldSyncClerk: boolean
  /** Optional note persisted on processed webhook row for investigation. */
  auditNote?: string | null
}

function webhookLog(
  stage: string,
  fields: Record<string, string | boolean | number | null | undefined>
): void {
  // Safe: no secrets, no full PII — ids and flags only
  console.info(
    `[stripe-webhook] ${stage}`,
    JSON.stringify(fields)
  )
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>
  }
  return null
}

function invoiceAmountCents(invoice: Record<string, unknown>): number {
  const paid = invoice.amount_paid
  if (typeof paid === "number" && Number.isFinite(paid)) return paid
  const due = invoice.amount_due
  if (typeof due === "number" && Number.isFinite(due)) return due
  return 0
}

function invoiceCurrency(invoice: Record<string, unknown>): string {
  const c = invoice.currency
  return typeof c === "string" && c.trim() ? c.trim().toLowerCase() : "usd"
}

async function resolveUserFromCustomerFields(input: {
  customerRef: unknown
  metadata?: Record<string, unknown> | null
  clientReferenceId?: unknown
}) {
  const stripeCustomerId = stripeId(
    input.customerRef as string | { id?: string } | null
  )
  const fromMeta = stripeMetadataClerkUserId(input.metadata ?? undefined)
  const fromRef =
    typeof input.clientReferenceId === "string"
      ? input.clientReferenceId.trim() || null
      : null
  const clerkUserId = fromMeta ?? fromRef

  return resolveBillingUser({ stripeCustomerId, clerkUserId })
}

export type HandleStripeEventOptions = {
  /** Injectable Stripe REST fetch (tests). Defaults to global fetch. */
  fetchImpl?: typeof fetch
}

async function handleSubscriptionEvent(
  event: StripeWebhookEvent,
  claim: WebhookClaim,
  obj: Record<string, unknown>,
  options?: HandleStripeEventOptions
): Promise<HandleStripeEventResult> {
  const stripeSubscriptionId = stripeId(obj.id as string)
  if (!stripeSubscriptionId) {
    throw new Error("Subscription event missing id")
  }

  webhookLog("resolve_user", {
    eventId: event.id,
    type: event.type,
    hasSubscription: true,
  })

  const user = await resolveUserFromCustomerFields({
    customerRef: obj.customer,
    metadata: asRecord(obj.metadata),
  })
  if (!user) {
    throw new Error(
      "Cannot reconcile subscription: Stripe customer is not linked to a Clerk user"
    )
  }

  webhookLog("reconcile", {
    eventId: event.id,
    type: event.type,
    stripeSubscriptionId,
  })

  await reconcileSubscriptionFromStripe({
    userId: user.id,
    stripeSubscriptionId,
    claim,
    triggerEventId: event.id,
    fetchImpl: options?.fetchImpl,
  })

  return { clerkUserId: user.clerkUserId, shouldSyncClerk: true }
}

async function handleInvoiceEvent(
  event: StripeWebhookEvent,
  claim: WebhookClaim,
  obj: Record<string, unknown>,
  paymentStatus: Payment["status"],
  options?: HandleStripeEventOptions
): Promise<HandleStripeEventResult> {
  const invoiceId = stripeId(obj.id as string)
  if (!invoiceId) {
    throw new Error("Invoice event missing id")
  }

  const stripeCustomerId = stripeId(
    obj.customer as string | { id?: string } | null
  )
  const stripeSubscriptionId = stripeId(
    obj.subscription as string | { id?: string } | null
  )
  const piId = stripeId(
    obj.payment_intent as string | { id?: string } | null
  )

  webhookLog("resolve_user", {
    eventId: event.id,
    type: event.type,
    hasCustomer: Boolean(stripeCustomerId),
    hasSubscription: Boolean(stripeSubscriptionId),
    hasClerkMeta: Boolean(
      stripeMetadataClerkUserId(asRecord(obj.metadata) ?? undefined)
    ),
  })

  let user: User | null = await resolveUserFromCustomerFields({
    customerRef: obj.customer,
    metadata: asRecord(obj.metadata),
  })

  /**
   * New Checkout customers: invoice.metadata is usually empty, but
   * subscription_data.metadata.clerkUserId is on the Subscription.
   * Retrieve once so invoice.paid can link + reconcile without waiting
   * solely for checkout.session.completed.
   */
  if (!user && stripeSubscriptionId) {
    webhookLog("resolve_via_subscription_metadata", {
      eventId: event.id,
      type: event.type,
      stripeSubscriptionId,
    })
    try {
      const sub = await fetchStripeSubscription(
        stripeSubscriptionId,
        options?.fetchImpl
      )
      const clerkFromSub = stripeMetadataClerkUserId(sub.metadata)
      if (clerkFromSub) {
        if (stripeCustomerId) {
          user = await linkStripeCustomerToClerkUser({
            clerkUserId: clerkFromSub,
            stripeCustomerId,
          })
        } else {
          user = await resolveBillingUser({
            clerkUserId: clerkFromSub,
            stripeCustomerId: null,
          })
        }
      }
    } catch (err) {
      webhookLog("subscription_metadata_lookup_failed", {
        eventId: event.id,
        type: event.type,
        stripeSubscriptionId,
        error: err instanceof Error ? err.name : "unknown",
      })
      // Fall through to unlinked handling
    }
  }

  if (!user) {
    const auditNote = [
      "unlinked_invoice",
      `type=${event.type}`,
      `invoice=${invoiceId}`,
      `customer=${stripeCustomerId ?? "none"}`,
      `subscription=${stripeSubscriptionId ?? "none"}`,
      "no_payment_row",
      "no_pro_grant",
    ].join(" ")

    webhookLog("unlinked_invoice", {
      eventId: event.id,
      type: event.type,
      invoiceId,
      hasSubscription: Boolean(stripeSubscriptionId),
    })

    return {
      clerkUserId: null,
      shouldSyncClerk: false,
      auditNote,
    }
  }

  let subscriptionId: string | null = null
  if (stripeSubscriptionId) {
    const existing = await getSubscriptionByStripeId(stripeSubscriptionId)
    subscriptionId = existing?.id ?? null
  }

  /**
   * Pending (payment_action_required) records a payment row only.
   * It must not grant Pro — Pro comes solely from reconciled subscription.
   * upsertPayment refuses succeeded → pending downgrades.
   */
  webhookLog("upsert_payment", {
    eventId: event.id,
    type: event.type,
    paymentStatus,
    invoiceId,
  })

  await upsertPayment({
    userId: user.id,
    subscriptionId,
    stripeInvoiceId: invoiceId,
    stripePaymentIntentId: piId,
    amountCents: invoiceAmountCents(obj),
    currency: invoiceCurrency(obj),
    status: paymentStatus,
    claim,
    lastStripeEventCreated: event.created,
  })

  // Always reconcile live subscription when present — never invent cancel
  // from invoice.payment_failed alone.
  if (stripeSubscriptionId) {
    webhookLog("reconcile", {
      eventId: event.id,
      type: event.type,
      stripeSubscriptionId,
    })
    await reconcileSubscriptionFromStripe({
      userId: user.id,
      stripeSubscriptionId,
      claim,
      triggerEventId: event.id,
      fetchImpl: options?.fetchImpl,
    })
  }

  return { clerkUserId: user.clerkUserId, shouldSyncClerk: true }
}

async function handleCheckoutCompleted(
  event: StripeWebhookEvent,
  claim: WebhookClaim,
  obj: Record<string, unknown>,
  options?: HandleStripeEventOptions
): Promise<HandleStripeEventResult> {
  const stripeCustomerId = stripeId(
    obj.customer as string | { id?: string } | null
  )
  const clerkUserId =
    stripeMetadataClerkUserId(asRecord(obj.metadata)) ??
    (typeof obj.client_reference_id === "string"
      ? obj.client_reference_id.trim() || null
      : null)

  if (!stripeCustomerId || !clerkUserId) {
    return {
      clerkUserId: clerkUserId,
      shouldSyncClerk: false,
      auditNote: "checkout.session.completed missing customer or clerk ref",
    }
  }

  const user = await linkStripeCustomerToClerkUser({
    clerkUserId,
    stripeCustomerId,
  })

  const stripeSubscriptionId = stripeId(
    obj.subscription as string | { id?: string } | null
  )
  if (stripeSubscriptionId) {
    await reconcileSubscriptionFromStripe({
      userId: user.id,
      stripeSubscriptionId,
      claim,
      triggerEventId: event.id,
      fetchImpl: options?.fetchImpl,
    })
    return { clerkUserId: user.clerkUserId, shouldSyncClerk: true }
  }

  return { clerkUserId: user.clerkUserId, shouldSyncClerk: false }
}

export async function handleStripeEvent(
  event: StripeWebhookEvent,
  claim: WebhookClaim,
  options?: HandleStripeEventOptions
): Promise<HandleStripeEventResult> {
  const obj = event.data.object

  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      return handleSubscriptionEvent(event, claim, obj, options)

    case "invoice.paid":
      return handleInvoiceEvent(event, claim, obj, "succeeded", options)

    case "invoice.payment_failed":
      return handleInvoiceEvent(event, claim, obj, "failed", options)

    case "invoice.payment_action_required":
      return handleInvoiceEvent(event, claim, obj, "pending", options)

    case "checkout.session.completed":
      return handleCheckoutCompleted(event, claim, obj, options)

    default:
      return { clerkUserId: null, shouldSyncClerk: false }
  }
}

export async function afterStripeEventDb(
  result: HandleStripeEventResult
): Promise<void> {
  if (!result.shouldSyncClerk || !result.clerkUserId) return
  webhookLog("clerk_sync", {
    clerkUserId: result.clerkUserId,
  })
  await syncClerkPlanFromDb(result.clerkUserId)
}
