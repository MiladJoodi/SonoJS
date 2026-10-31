import { bigint, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

/**
 * Serializes Stripe→DB reconciliation per subscription.
 * Only the fence+holder_token owner may apply a snapshot while locked_until is fresh.
 */
export const subscriptionReconcileLeases = pgTable(
  "subscription_reconcile_leases",
  {
    stripeSubscriptionId: text("stripe_subscription_id").primaryKey(),
    fence: bigint("fence", { mode: "number" }).notNull().default(0),
    holderToken: uuid("holder_token"),
    lockedUntil: timestamp("locked_until", { withTimezone: true }),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  }
)

export type SubscriptionReconcileLease =
  typeof subscriptionReconcileLeases.$inferSelect
