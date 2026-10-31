import { clerkClient } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

import {
  getPlanExpiresAt,
  getUserPlan,
  isProExpired,
} from "@/lib/access"
import { getAuthUserId } from "@/lib/clerk-auth"

/**
 * After sign-up (and on each session sync):
 * - Default missing `plan` → `free` (no expiry).
 * - Expired Pro (`planExpiresAt` ≤ now) → `free` and clear expiry.
 * Never upgrades Free → Pro (that stays manual / future billing).
 */
export async function POST() {
  const userId = await getAuthUserId()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const client = await clerkClient()
  const user = await client.users.getUser(userId)
  const metadata = user.publicMetadata
  const existing = metadata?.plan

  if (isProExpired(metadata)) {
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        plan: "free",
        planExpiresAt: null,
      },
    })
    return NextResponse.json({
      plan: "free",
      planExpiresAt: null,
      updated: true,
      reason: "expired",
    })
  }

  if (existing === "pro" || existing === "free") {
    const expiresAt = getPlanExpiresAt(metadata)
    return NextResponse.json({
      plan: getUserPlan(metadata),
      planExpiresAt: expiresAt?.toISOString() ?? null,
      updated: false,
    })
  }

  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      plan: "free",
      planExpiresAt: null,
    },
  })

  return NextResponse.json({
    plan: "free",
    planExpiresAt: null,
    updated: true,
    reason: "default",
  })
}
