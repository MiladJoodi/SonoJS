import "server-only"

import { createDb, type Db } from "@/db/client"

/** Shared Drizzle client for Neon (HTTP). Server-only — use in Route Handlers / RSC. */
export const db = createDb()

export type { Db }
