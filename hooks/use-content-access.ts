"use client"

import { useAuth, useUser } from "@clerk/nextjs"

import {
  canAccess,
  getEffectivePlanExpiresAt,
  getUserPlan,
  normalizeContentAccess,
  type ContentAccess,
  type Viewer,
} from "@/lib/access"

/** Client mirror of server `canAccess` for blocks install UI. */
export function useContentAccess(access: ContentAccess | string | null | undefined) {
  const level = normalizeContentAccess(access)
  const { isLoaded: authLoaded, isSignedIn, userId } = useAuth()
  const { isLoaded: userLoaded, user } = useUser()

  if (level === "public") {
    return { ready: true, allowed: true, access: level }
  }

  if (!authLoaded || (isSignedIn && !userLoaded)) {
    return { ready: false, allowed: false, access: level }
  }

  const metadata = user?.publicMetadata
  const viewer: Viewer =
    isSignedIn && userId
      ? {
          kind: getUserPlan(metadata),
          userId,
          planExpiresAt: getEffectivePlanExpiresAt(metadata),
        }
      : { kind: "guest" }

  return {
    ready: true,
    allowed: canAccess(viewer, level),
    access: level,
  }
}
