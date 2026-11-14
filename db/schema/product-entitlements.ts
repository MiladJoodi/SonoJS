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

import { users } from "./users"

/**
 * One-time product ownership (websites now; any catalog slug later).
 * Separate from Pro subscription entitlement in `lib/entitlement.ts`.
 */
export const productEntitlementSourceEnum = pgEnum(
  "product_entitlement_source",
  ["purchase", "admin_grant"]
)

export const productEntitlements = pgTable(
  "product_entitlements",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    clerkUserId: text("clerk_user_id").notNull(),
    /** Catalog slug (`sonojs-website-05`, future templates, …). */
    productSlug: text("product_slug").notNull(),
    source: productEntitlementSourceEnum("source").notNull(),
    /** Stripe Checkout Session id when source is purchase (Phase 3). */
    stripeCheckoutSessionId: text("stripe_checkout_session_id"),
    /** Amount charged at purchase time (cents); null for admin grants. */
    amountCents: integer("amount_cents"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    /** Soft revoke - ownership checks require this null. */
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
  },
  (table) => [
    uniqueIndex("product_entitlements_user_id_product_slug_uidx").on(
      table.userId,
      table.productSlug
    ),
    uniqueIndex("product_entitlements_stripe_checkout_session_id_uidx").on(
      table.stripeCheckoutSessionId
    ),
    index("product_entitlements_clerk_user_id_idx").on(table.clerkUserId),
    index("product_entitlements_product_slug_idx").on(table.productSlug),
  ]
)

export type ProductEntitlement = typeof productEntitlements.$inferSelect
export type NewProductEntitlement = typeof productEntitlements.$inferInsert
export type ProductEntitlementSource =
  (typeof productEntitlementSourceEnum.enumValues)[number]
