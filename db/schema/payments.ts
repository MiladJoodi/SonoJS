import {
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core"

import { subscriptions } from "./subscriptions"
import { users } from "./users"

export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "succeeded",
  "failed",
  "refunded",
  "canceled",
])

export const payments = pgTable(
  "payments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    subscriptionId: uuid("subscription_id").references(() => subscriptions.id, {
      onDelete: "set null",
    }),
    stripeInvoiceId: text("stripe_invoice_id"),
    stripePaymentIntentId: text("stripe_payment_intent_id"),
    amountCents: integer("amount_cents").notNull(),
    currency: text("currency").notNull().default("usd"),
    status: paymentStatusEnum("status").notNull(),
    /** Stripe `event.created` (unix seconds) of last applied webhook. */
    lastStripeEventCreated: integer("last_stripe_event_created"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("payments_stripe_invoice_id_uidx").on(table.stripeInvoiceId),
    uniqueIndex("payments_stripe_payment_intent_id_uidx").on(
      table.stripePaymentIntentId
    ),
    index("payments_user_id_idx").on(table.userId),
  ]
)

export type Payment = typeof payments.$inferSelect
export type NewPayment = typeof payments.$inferInsert
