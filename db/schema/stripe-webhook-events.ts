import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core"

export const webhookEventStatusEnum = pgEnum("webhook_event_status", [
  "processing",
  "processed",
  "failed",
])

/** Idempotency + fencing log for Stripe webhooks. */
export const stripeWebhookEvents = pgTable(
  "stripe_webhook_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    stripeEventId: text("stripe_event_id").notNull(),
    type: text("type").notNull(),
    status: webhookEventStatusEnum("status").notNull().default("processing"),
    claimToken: uuid("claim_token").notNull(),
    attemptCount: integer("attempt_count").notNull().default(1),
    lastError: text("last_error"),
    processedAt: timestamp("processed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("stripe_webhook_events_stripe_event_id_uidx").on(
      table.stripeEventId
    ),
  ]
)

export type StripeWebhookEvent = typeof stripeWebhookEvents.$inferSelect
export type NewStripeWebhookEvent = typeof stripeWebhookEvents.$inferInsert
