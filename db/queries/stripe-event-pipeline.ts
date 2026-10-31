import "server-only"

import type { WebhookClaim } from "@/db/queries/claim-guard"
import {
  acquireOpsUnlinkedReprocessClaim,
  claimStripeWebhookEvent,
  markStripeWebhookFailed,
  markStripeWebhookProcessed,
} from "@/db/queries/webhook-events"

import type { PipelineHttpResult } from "@/lib/stripe/http-status"

export type PipelineResult = PipelineHttpResult

export type PipelineHandleResult = {
  /** Stored on processed row in last_error for ops review (not a failure). */
  auditNote?: string | null
}

export type OpsReprocessPipelineResult =
  | PipelineResult
  | {
      status: "rejected"
      reason: "not_found" | "not_eligible" | "in_flight"
    }

/**
 * Stripe webhook orchestrator: claim → handle(DB) → afterDb(Clerk) → mark.
 *
 * HTTP mapping for callers (see `/api/webhooks/stripe`):
 * - duplicate → 200 (idempotent)
 * - in_flight → 503 (Stripe retries; avoids permanent loss if holder dies)
 * - processed → 200 (including unlinked invoices with auditNote)
 * - failed → 500 (Stripe retries; reclaim on failed/stale)
 *
 * Stale reclaim: after 5 minutes without claim heartbeat, a retry can acquire
 * a new claim_token and fence out the previous holder.
 */
export async function runStripeEventPipeline(input: {
  stripeEventId: string
  type: string
  handle: (claim: WebhookClaim) => Promise<PipelineHandleResult | void>
  /** Optional Clerk sync after DB writes; failure fails the event (retryable). */
  afterDb?: (claim: WebhookClaim) => Promise<void>
}): Promise<PipelineResult> {
  const claim = await claimStripeWebhookEvent({
    stripeEventId: input.stripeEventId,
    type: input.type,
  })

  if (claim.outcome === "duplicate") {
    return { status: "skipped", reason: "duplicate" }
  }
  if (claim.outcome === "in_flight") {
    return { status: "skipped", reason: "in_flight" }
  }

  return finishClaimedPipeline({
    stripeEventId: input.stripeEventId,
    claimToken: claim.claimToken,
    handle: input.handle,
    afterDb: input.afterDb,
  })
}

/**
 * Ops-only pipeline for processed+`unlinked_invoice` events.
 * Leaves `claimStripeWebhookEvent` / Stripe HTTP idempotency unchanged.
 */
export async function runOpsUnlinkedReprocessPipeline(input: {
  stripeEventId: string
  type: string
  handle: (claim: WebhookClaim) => Promise<PipelineHandleResult | void>
  afterDb?: (claim: WebhookClaim) => Promise<void>
}): Promise<OpsReprocessPipelineResult> {
  const claim = await acquireOpsUnlinkedReprocessClaim(input.stripeEventId, {
    type: input.type,
  })

  if (claim.outcome === "rejected") {
    return { status: "rejected", reason: claim.reason }
  }

  return finishClaimedPipeline({
    stripeEventId: input.stripeEventId,
    claimToken: claim.claimToken,
    handle: input.handle,
    afterDb: input.afterDb,
  })
}

async function finishClaimedPipeline(input: {
  stripeEventId: string
  claimToken: string
  handle: (claim: WebhookClaim) => Promise<PipelineHandleResult | void>
  afterDb?: (claim: WebhookClaim) => Promise<void>
}): Promise<PipelineResult> {
  const webhookClaim: WebhookClaim = {
    stripeEventId: input.stripeEventId,
    claimToken: input.claimToken,
  }

  try {
    const handleOut = await input.handle(webhookClaim)
    if (input.afterDb) await input.afterDb(webhookClaim)
    const ok = await markStripeWebhookProcessed(
      input.stripeEventId,
      input.claimToken,
      { auditNote: handleOut?.auditNote ?? null }
    )
    if (!ok) {
      return {
        status: "failed",
        error: "Lost claim token before mark processed (fenced out)",
      }
    }
    return { status: "processed" }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    await markStripeWebhookFailed(
      input.stripeEventId,
      input.claimToken,
      message
    )
    return { status: "failed", error: message }
  }
}

export { pipelineResultToHttpStatus } from "@/lib/stripe/http-status"
