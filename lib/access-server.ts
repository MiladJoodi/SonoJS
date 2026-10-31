import "server-only"

import { clerkClient } from "@clerk/nextjs/server"

import {
  canAccess,
  getEffectivePlanExpiresAt,
  getUserPlan,
  isProExpired,
  type ContentAccess,
  type UserPlan,
  type Viewer,
} from "@/lib/access"
import { getAuthUserId } from "@/lib/clerk-auth"

/**
 * Persist Free when Pro has passed `planExpiresAt`.
 * Safe to call repeatedly; no-ops if not expired.
 */
export async function syncExpiredPlanToFree(
  userId: string,
  metadata: unknown
): Promise<{ updated: boolean; plan: UserPlan }> {
  if (!isProExpired(metadata)) {
    return { updated: false, plan: getUserPlan(metadata) }
  }

  const client = await clerkClient()
  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      plan: "free",
      planExpiresAt: null,
    },
  })
  return { updated: true, plan: "free" }
}

export async function getViewer(): Promise<Viewer> {
  const userId = await getAuthUserId()
  if (!userId) return { kind: "guest" }

  // Prefer API user fetch — `currentUser()` also depends on middleware headers.
  const client = await clerkClient()
  const user = await client.users.getUser(userId)
  const metadata = user.publicMetadata

  if (isProExpired(metadata)) {
    void syncExpiredPlanToFree(userId, metadata).catch((err) => {
      console.error("Failed to sync expired Pro → Free:", err)
    })
    return { kind: "free", userId, planExpiresAt: null }
  }

  const plan = getUserPlan(metadata)
  return {
    kind: plan,
    userId,
    planExpiresAt: getEffectivePlanExpiresAt(metadata),
  }
}

export async function canAccessContent(
  access: ContentAccess
): Promise<boolean> {
  return canAccess(await getViewer(), access)
}
