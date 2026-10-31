import "server-only"

import { and, eq, ilike, lt, or, sql } from "drizzle-orm"

import { db } from "@/db"
import { wrapDbError } from "@/db/errors"
import {
  stripeWebhookEvents,
  type StripeWebhookEvent,
} from "@/db/schema"

export type ClaimOutcome =
  | { outcome: "acquired"; event: StripeWebhookEvent; claimToken: string }
  | { outcome: "duplicate"; event: StripeWebhookEvent }
  | { outcome: "in_flight"; event: StripeWebhookEvent }

const DEFAULT_STALE_MS = 5 * 60 * 1000

function newClaimToken(): string {
  return crypto.randomUUID()
}

/**
 * Atomically claim a Stripe event for processing (insert or stale/failed reclaim).
 * Only the worker that receives `acquired` may call markProcessed/Failed with claimToken.
 */
export async function claimStripeWebhookEvent(
  input: {
    stripeEventId: string
    type: string
  },
  options?: { staleAfterMs?: number }
): Promise<ClaimOutcome> {
  const staleAfterMs = options?.staleAfterMs ?? DEFAULT_STALE_MS
  const claimToken = newClaimToken()

  try {
    const inserted = await db
      .insert(stripeWebhookEvents)
      .values({
        stripeEventId: input.stripeEventId,
        type: input.type,
        status: "processing",
        claimToken,
        attemptCount: 1,
      })
      .onConflictDoNothing({ target: stripeWebhookEvents.stripeEventId })
      .returning()

    if (inserted[0]) {
      return {
        outcome: "acquired",
        event: inserted[0],
        claimToken: inserted[0].claimToken,
      }
    }

    const existing = await db.query.stripeWebhookEvents.findFirst({
      where: eq(stripeWebhookEvents.stripeEventId, input.stripeEventId),
    })
    if (!existing) {
      throw new Error("Webhook event missing after conflict")
    }

    if (existing.status === "processed") {
      return { outcome: "duplicate", event: existing }
    }

    const staleBefore = new Date(Date.now() - staleAfterMs)
    const isStaleProcessing =
      existing.status === "processing" &&
      existing.updatedAt.getTime() < staleBefore.getTime()
    const canReclaim = existing.status === "failed" || isStaleProcessing

    if (!canReclaim) {
      return { outcome: "in_flight", event: existing }
    }

    const reclaimToken = newClaimToken()
    const reclaimed = await db
      .update(stripeWebhookEvents)
      .set({
        status: "processing",
        claimToken: reclaimToken,
        attemptCount: sql`${stripeWebhookEvents.attemptCount} + 1`,
        lastError: null,
        updatedAt: new Date(),
        type: input.type,
      })
      .where(
        and(
          eq(stripeWebhookEvents.stripeEventId, input.stripeEventId),
          or(
            eq(stripeWebhookEvents.status, "failed"),
            and(
              eq(stripeWebhookEvents.status, "processing"),
              lt(stripeWebhookEvents.updatedAt, staleBefore)
            )
          )
        )
      )
      .returning()

    if (reclaimed[0]) {
      return {
        outcome: "acquired",
        event: reclaimed[0],
        claimToken: reclaimed[0].claimToken,
      }
    }

    const again = await db.query.stripeWebhookEvents.findFirst({
      where: eq(stripeWebhookEvents.stripeEventId, input.stripeEventId),
    })
    if (!again) throw new Error("Webhook event disappeared during reclaim")
    if (again.status === "processed") {
      return { outcome: "duplicate", event: again }
    }
    return { outcome: "in_flight", event: again }
  } catch (err) {
    wrapDbError("Failed to claim Stripe webhook event", err)
  }
}

/**
 * Succeeds only with the current claim_token while status=processing.
 * Optional auditNote is stored in last_error for investigation (e.g. unlinked
 * invoice) while status remains processed — does not imply failure.
 */
export async function markStripeWebhookProcessed(
  stripeEventId: string,
  claimToken: string,
  options?: { auditNote?: string | null }
): Promise<boolean> {
  try {
    const note = options?.auditNote?.trim()
    const rows = await db
      .update(stripeWebhookEvents)
      .set({
        status: "processed",
        processedAt: new Date(),
        updatedAt: new Date(),
        lastError: note ? note.slice(0, 2000) : null,
      })
      .where(
        and(
          eq(stripeWebhookEvents.stripeEventId, stripeEventId),
          eq(stripeWebhookEvents.claimToken, claimToken),
          eq(stripeWebhookEvents.status, "processing")
        )
      )
      .returning({ id: stripeWebhookEvents.id })
    return rows.length > 0
  } catch (err) {
    wrapDbError("Failed to mark Stripe webhook processed", err)
  }
}

/** Succeeds only with the current claim_token while status=processing. */
export async function markStripeWebhookFailed(
  stripeEventId: string,
  claimToken: string,
  error: string
): Promise<boolean> {
  try {
    const rows = await db
      .update(stripeWebhookEvents)
      .set({
        status: "failed",
        lastError: error.slice(0, 2000),
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(stripeWebhookEvents.stripeEventId, stripeEventId),
          eq(stripeWebhookEvents.claimToken, claimToken),
          eq(stripeWebhookEvents.status, "processing")
        )
      )
      .returning({ id: stripeWebhookEvents.id })
    return rows.length > 0
  } catch (err) {
    wrapDbError("Failed to mark Stripe webhook failed", err)
  }
}

export type OpsReprocessClaimOutcome =
  | { outcome: "acquired"; event: StripeWebhookEvent; claimToken: string }
  | {
      outcome: "rejected"
      reason: "not_found" | "not_eligible" | "in_flight"
      event: StripeWebhookEvent | null
    }

/**
 * Ops-only reclaim for events that were ACK'd as processed with an
 * `unlinked_invoice` audit note. Does NOT change normal Stripe claim /
 * idempotency: Stripe retries still see processed → duplicate.
 *
 * Eligibility: status=processed AND last_error contains `unlinked_invoice`.
 */
export async function acquireOpsUnlinkedReprocessClaim(
  stripeEventId: string,
  options?: { type?: string }
): Promise<OpsReprocessClaimOutcome> {
  const reclaimToken = newClaimToken()

  try {
    const reclaimed = await db
      .update(stripeWebhookEvents)
      .set({
        status: "processing",
        claimToken: reclaimToken,
        attemptCount: sql`${stripeWebhookEvents.attemptCount} + 1`,
        lastError: null,
        processedAt: null,
        updatedAt: new Date(),
        ...(options?.type ? { type: options.type } : {}),
      })
      .where(
        and(
          eq(stripeWebhookEvents.stripeEventId, stripeEventId),
          eq(stripeWebhookEvents.status, "processed"),
          ilike(stripeWebhookEvents.lastError, "%unlinked_invoice%")
        )
      )
      .returning()

    if (reclaimed[0]) {
      return {
        outcome: "acquired",
        event: reclaimed[0],
        claimToken: reclaimed[0].claimToken,
      }
    }

    const existing = await db.query.stripeWebhookEvents.findFirst({
      where: eq(stripeWebhookEvents.stripeEventId, stripeEventId),
    })
    if (!existing) {
      return { outcome: "rejected", reason: "not_found", event: null }
    }
    if (existing.status === "processing") {
      return { outcome: "rejected", reason: "in_flight", event: existing }
    }
    return { outcome: "rejected", reason: "not_eligible", event: existing }
  } catch (err) {
    wrapDbError("Failed to acquire ops unlinked reprocess claim", err)
  }
}
