import "server-only"

import { auth, clerkClient, currentUser } from "@clerk/nextjs/server"

import {
  canAccess,
  getEffectivePlanExpiresAt,
  getUserPlan,
  isProExpired,
  type ContentAccess,
  type UserPlan,
  type Viewer,
} from "@/lib/access"

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
  const { userId } = await auth()
  if (!userId) return { kind: "guest" }

  const user = await currentUser()
  const metadata = user?.publicMetadata

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
