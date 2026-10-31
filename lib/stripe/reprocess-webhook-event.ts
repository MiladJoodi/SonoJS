import "server-only"

import { fetchStripeEvent } from "@/db/lib/stripe-api"
import { runOpsUnlinkedReprocessPipeline } from "@/db/queries/stripe-event-pipeline"
import type { OpsReprocessPipelineResult } from "@/db/queries/stripe-event-pipeline"
import {
  afterStripeEventDb,
  handleStripeEvent,
  type HandleStripeEventResult,
} from "@/lib/stripe/handle-stripe-event"
import type { StripeWebhookEvent } from "@/lib/stripe/verify-webhook"

export type ReprocessStripeWebhookResult = OpsReprocessPipelineResult & {
  eventId: string
  eventType: string
  clerkUserId: string | null
  shouldSyncClerk: boolean
  auditNote: string | null
}

/**
 * Controlled ops reprocess for a Stripe Event that was previously marked
 * processed with an `unlinked_invoice` audit note.
 *
 * - Fetches the historical Event from Stripe (no new charge).
 * - Does not weaken normal webhook idempotency (Stripe retries stay duplicate).
 * - Reuses handleStripeEvent + Clerk sync paths.
 */
export async function reprocessStripeWebhookEvent(
  stripeEventId: string,
  options?: {
    fetchImpl?: typeof fetch
    /** Injected event (tests) — skips Stripe Event retrieve. */
    event?: StripeWebhookEvent
    /**
     * Override Clerk sync after DB writes (tests). Default: afterStripeEventDb.
     */
    afterDb?: (result: HandleStripeEventResult) => Promise<void>
  }
): Promise<ReprocessStripeWebhookResult> {
  const id = stripeEventId.trim()
  if (!id.startsWith("evt_")) {
    throw new Error("stripeEventId must start with evt_")
  }

  const event =
    options?.event ??
    (await fetchStripeEvent(id, options?.fetchImpl ?? fetch))

  let handleResult: HandleStripeEventResult = {
    clerkUserId: null,
    shouldSyncClerk: false,
  }

  const result = await runOpsUnlinkedReprocessPipeline({
    stripeEventId: event.id,
    type: event.type,
    handle: async (claim) => {
      handleResult = await handleStripeEvent(event, claim, {
        fetchImpl: options?.fetchImpl,
      })
      return { auditNote: handleResult.auditNote }
    },
    afterDb: async () => {
      if (options?.afterDb) {
        await options.afterDb(handleResult)
        return
      }
      await afterStripeEventDb(handleResult)
    },
  })

  return {
    ...result,
    eventId: event.id,
    eventType: event.type,
    clerkUserId: handleResult.clerkUserId,
    shouldSyncClerk: handleResult.shouldSyncClerk,
    auditNote: handleResult.auditNote ?? null,
  }
}
