/**
 * Ops: reprocess a Stripe Event previously ACK'd as processed+unlinked_invoice.
 *
 * Usage:
 *   npx tsx scripts/reprocess-stripe-event.ts evt_… --confirm
 *
 * Requires DATABASE_URL + STRIPE_SECRET_KEY (Test). Does not create charges
 * or delete rows. Normal Stripe webhook idempotency is unchanged.
 */
import { config } from "dotenv"

config({ path: ".env.local" })
config()

async function main() {
  const args = process.argv.slice(2)
  const confirm = args.includes("--confirm")
  const eventId = args.find((a) => a.startsWith("evt_"))

  if (!eventId) {
    console.error(
      "Usage: npx tsx scripts/reprocess-stripe-event.ts evt_<id> --confirm"
    )
    process.exit(1)
  }

  if (!confirm) {
    console.error(
      "Refusing to run without --confirm (ops reprocess is intentional)."
    )
    process.exit(1)
  }

  if (!process.env.DATABASE_URL?.trim()) {
    console.error("DATABASE_URL is required")
    process.exit(1)
  }
  if (!process.env.STRIPE_SECRET_KEY?.trim()) {
    console.error("STRIPE_SECRET_KEY is required")
    process.exit(1)
  }

  const { reprocessStripeWebhookEvent } = await import(
    "@/lib/stripe/reprocess-webhook-event"
  )

  console.info(
    JSON.stringify({
      stage: "ops_reprocess_start",
      eventId,
    })
  )

  const result = await reprocessStripeWebhookEvent(eventId)

  console.info(
    JSON.stringify({
      stage: "ops_reprocess_done",
      eventId: result.eventId,
      eventType: result.eventType,
      status: result.status,
      reason: "reason" in result ? result.reason : undefined,
      error: "error" in result ? result.error : undefined,
      clerkUserId: result.clerkUserId,
      shouldSyncClerk: result.shouldSyncClerk,
      auditNote: result.auditNote,
    })
  )

  if (result.status === "processed") {
    process.exit(0)
  }
  process.exit(result.status === "rejected" ? 2 : 1)
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
