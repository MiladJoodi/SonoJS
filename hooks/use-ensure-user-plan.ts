"use client"

import * as React from "react"
import { useAuth, useUser } from "@clerk/nextjs"

import {
  getPlanExpiresAt,
  getPlanInterval,
  getUserPlan,
} from "@/lib/access"

export type EnsurePlanResponse = {
  plan: "free" | "pro"
  planInterval: "monthly" | "yearly" | null
  planExpiresAt: string | null
  updated?: boolean
}

function metadataMatchesSynced(
  metadata: unknown,
  synced: EnsurePlanResponse
): boolean {
  if (getUserPlan(metadata) !== synced.plan) return false
  if (synced.plan === "free") return true
  if (getPlanInterval(metadata) !== (synced.planInterval ?? "monthly")) {
    return false
  }
  const expires = getPlanExpiresAt(metadata)?.toISOString() ?? null
  return expires === synced.planExpiresAt
}

/**
 * Session sync for Clerk plan metadata via `/api/account/ensure-plan`:
 * - Always heals from Neon (Free↔Pro drift)
 * - Reloads Clerk user when metadata changed
 * - Exposes `planReady` so UI withholds a confident Free chip until heal finishes
 */
export function useEnsureUserPlan() {
  const { isSignedIn } = useAuth()
  const { user, isLoaded } = useUser()
  const [planReady, setPlanReady] = React.useState(false)
  const syncedUserId = React.useRef<string | null>(null)
  const inFlight = React.useRef(false)

  React.useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) {
      setPlanReady(false)
      syncedUserId.current = null
      return
    }

    if (syncedUserId.current === user.id) {
      setPlanReady(true)
      return
    }

    if (inFlight.current) return
    inFlight.current = true

    let cancelled = false

    void fetch("/api/account/ensure-plan", { method: "POST" })
      .then((res) => (res.ok ? res.json() : null))
      .then(async (data: EnsurePlanResponse | null) => {
        if (cancelled || !data) {
          if (!cancelled) {
            syncedUserId.current = user.id
            setPlanReady(true)
          }
          return
        }

        const needsReload =
          data.updated === true ||
          !metadataMatchesSynced(user.publicMetadata, data)

        if (needsReload) {
          await user.reload()
        }

        if (!cancelled) {
          syncedUserId.current = user.id
          setPlanReady(true)
        }
      })
      .catch(() => {
        if (!cancelled) {
          // Don't block the chip forever on network errors
          syncedUserId.current = user.id
          setPlanReady(true)
        }
      })
      .finally(() => {
        inFlight.current = false
      })

    return () => {
      cancelled = true
    }
  }, [isLoaded, isSignedIn, user])

  return {
    planReady: Boolean(isLoaded && isSignedIn && user && planReady),
  }
}
