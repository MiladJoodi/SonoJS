import {
  bigint,
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"

/**
 * Per-user lease so concurrent Stripe events serialize Clerk metadata sync.
 * fence + holder_token act as fencing: stale holders cannot release/commit.
 */
export const clerkSyncLeases = pgTable("clerk_sync_leases", {
  clerkUserId: text("clerk_user_id").primaryKey(),
  fence: bigint("fence", { mode: "number" }).notNull().default(0),
  holderToken: uuid("holder_token"),
  lockedUntil: timestamp("locked_until", { withTimezone: true }),
  pending: boolean("pending").notNull().default(false),
  /** Last successfully synced plan fingerprint (plan|expires|interval). */
  lastSyncedFingerprint: text("last_synced_fingerprint"),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
})

export type ClerkSyncLease = typeof clerkSyncLeases.$inferSelect
export type NewClerkSyncLease = typeof clerkSyncLeases.$inferInsert
