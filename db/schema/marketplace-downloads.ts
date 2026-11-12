import {
  index,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"

import { users } from "./users"

export const marketplaceDownloads = pgTable(
  "marketplace_downloads",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    clerkUserId: text("clerk_user_id").notNull(),
    slug: text("slug").notNull(),
    /** `zip` (GitHub archive) or `external` (openUrl redirect). */
    source: text("source").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("marketplace_downloads_user_id_created_at_idx").on(
      table.userId,
      table.createdAt
    ),
    index("marketplace_downloads_slug_created_at_idx").on(
      table.slug,
      table.createdAt
    ),
    index("marketplace_downloads_clerk_user_id_created_at_idx").on(
      table.clerkUserId,
      table.createdAt
    ),
  ]
)

export type MarketplaceDownload = typeof marketplaceDownloads.$inferSelect
export type NewMarketplaceDownload = typeof marketplaceDownloads.$inferInsert
