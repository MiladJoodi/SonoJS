import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core"

import { plans } from "./plans"
import { users } from "./users"

export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "active",
  "trialing",
  "past_due",
  "canceled",
  "unpaid",
  "incomplete",
  "incomplete_expired",
  "paused",
])

export const subscriptions = pgTable(
  "subscriptions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    planId: uuid("plan_id")
      .notNull()
      .references(() => plans.id, { onDelete: "restrict" }),
    status: subscriptionStatusEnum("status").notNull(),
    stripeSubscriptionId: text("stripe_subscription_id"),
    /** Legacy audit field; subscription truth comes from Stripe reconcile. */
    lastStripeEventCreated: integer("last_stripe_event_created"),
    /** Stripe event id that last triggered reconcile (audit only). */
    lastStripeEventId: text("last_stripe_event_id"),
    /** When DB was last reconciled from a live Stripe subscription retrieve. */
    lastReconciledAt: timestamp("last_reconciled_at", { withTimezone: true }),
    currentPeriodStart: timestamp("current_period_start", {
      withTimezone: true,
    }),
    currentPeriodEnd: timestamp("current_period_end", { withTimezone: true }),
    cancelAtPeriodEnd: boolean("cancel_at_period_end").notNull().default(false),
    canceledAt: timestamp("canceled_at", { withTimezone: true }),
    endedAt: timestamp("ended_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("subscriptions_stripe_subscription_id_uidx").on(
      table.stripeSubscriptionId
    ),
    index("subscriptions_user_id_status_idx").on(table.userId, table.status),
    index("subscriptions_current_period_end_idx").on(table.currentPeriodEnd),
  ]
)

export type Subscription = typeof subscriptions.$inferSelect
export type NewSubscription = typeof subscriptions.$inferInsert
