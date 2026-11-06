import "server-only"

import { clerkClient } from "@clerk/nextjs/server"

import {
  canAccess,
  getUserPlan,
  isProExpired,
  type ContentAccess,
  type UserPlan,
  type Viewer,
} from "@/lib/access"
import { getAuthUserId } from "@/lib/clerk-auth"
import {
  resolveEntitlement,
  viewerFromEntitlement,
} from "@/lib/entitlement"

/**
 * Persist Free when Pro has passed `planExpiresAt` in Clerk metadata.
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
      planInterval: null,
    },
  })
  return { updated: true, plan: "free" }
}

async function healClerkMetadataToFree(userId: string): Promise<void> {
  try {
    const client = await clerkClient()
    const user = await client.users.getUser(userId)
    const metadata = user.publicMetadata
    if (getUserPlan(metadata) !== "pro" && !isProExpired(metadata)) return
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        plan: "free",
        planExpiresAt: null,
        planInterval: null,
      },
    })
  } catch (err) {
    console.error("Failed to heal Clerk plan metadata to Free:", err)
  }
}

/**
 * Server viewer for authorization.
 * Neon subscription + period end is authoritative for Pro; Clerk is UI cache.
 */
export async function getViewer(): Promise<Viewer> {
  const userId = await getAuthUserId()
  if (!userId) return { kind: "guest" }

  const entitlement = await resolveEntitlement(userId)
  if (entitlement.kind === "pro") {
    return viewerFromEntitlement(userId, entitlement)
  }

  void healClerkMetadataToFree(userId)
  return { kind: "free", userId, planExpiresAt: null }
}

export async function canAccessContent(
  access: ContentAccess
): Promise<boolean> {
  return canAccess(await getViewer(), access)
}
