import { clerkClient } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

import {
  planFingerprint,
  type SyncedPlan,
} from "@/db/lib/plan-fingerprint"
import { syncClerkPlanFromDb } from "@/db/queries/sync-clerk-plan"
import { getAuthUserId } from "@/lib/clerk-auth"

function syncedPlanFromMetadata(metadata: unknown): SyncedPlan {
  if (!metadata || typeof metadata !== "object") {
    return { plan: "free", planInterval: null, planExpiresAt: null }
  }
  const meta = metadata as {
    plan?: unknown
    planInterval?: unknown
    planExpiresAt?: unknown
  }
  const plan = meta.plan === "pro" ? "pro" : "free"
  const planInterval =
    plan === "pro" && meta.planInterval === "yearly"
      ? ("yearly" as const)
      : plan === "pro" && meta.planInterval === "monthly"
        ? ("monthly" as const)
        : plan === "pro"
          ? ("monthly" as const)
          : null
  const planExpiresAt =
    typeof meta.planExpiresAt === "string" && meta.planExpiresAt.trim()
      ? meta.planExpiresAt
      : null
  return { plan, planInterval, planExpiresAt }
}

/**
 * Session heal for Clerk `publicMetadata` plan fields:
 * - Sync from Neon (active sub → Pro, else Free) via `syncClerkPlanFromDb`
 * - Repairs Free→Pro drift when billing is active but Clerk stayed Free
 */
export async function POST() {
  const userId = await getAuthUserId()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const client = await clerkClient()
  const user = await client.users.getUser(userId)
  const before = syncedPlanFromMetadata(user.publicMetadata)

  const synced = await syncClerkPlanFromDb(userId)
  const updated = planFingerprint(before) !== planFingerprint(synced)

  return NextResponse.json({
    plan: synced.plan,
    planInterval: synced.planInterval,
    planExpiresAt: synced.planExpiresAt,
    updated,
  })
}
