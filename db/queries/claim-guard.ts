import "server-only"

import { and, eq, sql } from "drizzle-orm"

import { db } from "@/db"
import { LostWebhookClaimError, wrapDbError } from "@/db/errors"
import { stripeWebhookEvents } from "@/db/schema"

export type WebhookClaim = {
  stripeEventId: string
  claimToken: string
}

/** SQL fragment: true iff this worker still owns the event. */
export function claimOwnershipSql(claim: WebhookClaim) {
  return sql`exists (
    select 1
    from stripe_webhook_events e
    where e.stripe_event_id = ${claim.stripeEventId}
      and e.claim_token = ${claim.claimToken}::uuid
      and e.status = 'processing'
  )`
}

/**
 * Atomic ownership check + heartbeat.
 * Updates updated_at only when claim_token still matches processing row.
 */
export async function assertAndTouchWebhookClaim(
  claim: WebhookClaim
): Promise<void> {
  try {
    const rows = await db
      .update(stripeWebhookEvents)
      .set({ updatedAt: new Date() })
      .where(
        and(
          eq(stripeWebhookEvents.stripeEventId, claim.stripeEventId),
          eq(stripeWebhookEvents.claimToken, claim.claimToken),
          eq(stripeWebhookEvents.status, "processing")
        )
      )
      .returning({ id: stripeWebhookEvents.id })

    if (rows.length === 0) {
      throw new LostWebhookClaimError()
    }
  } catch (err) {
    if (err instanceof LostWebhookClaimError) throw err
    wrapDbError("Failed to assert webhook claim", err)
  }
}
