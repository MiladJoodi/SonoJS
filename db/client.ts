import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

import * as schema from "./schema"

export function getDatabaseUrl(): string {
  const url = process.env.DATABASE_URL
  if (!url?.trim()) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env.local (server-only)."
    )
  }
  return url
}

/** Create a Drizzle client for Neon HTTP. Prefer importing `db` from `@/db`. */
export function createDb() {
  const sql = neon(getDatabaseUrl())
  return drizzle(sql, { schema })
}

export type Db = ReturnType<typeof createDb>
