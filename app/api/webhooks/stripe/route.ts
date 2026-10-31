import { runStripeEventPipeline } from "@/db/queries/stripe-event-pipeline"
import { pipelineResultToHttpStatus } from "@/lib/stripe/http-status"
import { getStripeWebhookSecret, STRIPE_API_VERSION } from "@/lib/stripe/env"
import {
  afterStripeEventDb,
  handleStripeEvent,
} from "@/lib/stripe/handle-stripe-event"
import {
  StripeWebhookSignatureError,
  verifyStripeWebhook,
} from "@/lib/stripe/verify-webhook"

/**
 * Stripe → SonoJS billing webhook (Test mode).
 *
 * Dashboard / CLI (Test): forward at least
 * - checkout.session.completed
 * - invoice.paid / invoice.payment_failed / invoice.payment_action_required
 * - customer.subscription.created / updated / deleted
 *
 * Local: `npm run stripe:listen` (see README). Do not use `--events invoice.paid` alone.
 *
 * API version: 2024-11-20.acacia — keep webhook endpoint + retrieve in sync.
 *
 * HTTP:
 * - 400 invalid signature
 * - 200 processed | duplicate
 * - 503 in_flight (Stripe retries; stale reclaim after 5m if holder dies)
 * - 500 failed / misconfig (Stripe retries)
 *
 * Never trust Checkout redirect URLs as payment proof.
 * Never log or return Stripe secrets.
 */
export async function POST(req: Request) {
  let secret: string
  try {
    secret = getStripeWebhookSecret()
  } catch {
    console.error("Stripe webhook misconfigured: STRIPE_WEBHOOK_SECRET missing")
    return new Response("Webhook misconfigured", { status: 500 })
  }

  const rawBody = await req.text()
  const signature = req.headers.get("stripe-signature")

  let event
  try {
    event = verifyStripeWebhook(rawBody, signature, secret)
  } catch (err) {
    if (err instanceof StripeWebhookSignatureError) {
      console.error("Stripe webhook signature failed:", err.message)
      return new Response("Webhook signature verification failed", {
        status: 400,
      })
    }
    throw err
  }

  // Capture for afterDb without re-entrancy issues
  let handleResult: Awaited<ReturnType<typeof handleStripeEvent>> = {
    clerkUserId: null,
    shouldSyncClerk: false,
  }

  const result = await runStripeEventPipeline({
    stripeEventId: event.id,
    type: event.type,
    handle: async (claim) => {
      handleResult = await handleStripeEvent(event, claim)
      return { auditNote: handleResult.auditNote }
    },
    afterDb: async () => {
      await afterStripeEventDb(handleResult)
    },
  })

  const status = pipelineResultToHttpStatus(result)
  const body =
    result.status === "failed"
      ? "Webhook handler failed"
      : result.status === "skipped"
        ? result.reason
        : "ok"

  // Touch API version constant so mis-sync is visible in module graph / reviews
  void STRIPE_API_VERSION

  return new Response(body, { status })
}
