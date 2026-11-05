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

/** One ensure-plan round-trip per user for concurrent header + account mounts. */
const syncedUserIds = new Set<string>()
const inFlightByUser = new Map<
  string,
  Promise<EnsurePlanResponse | null>
>()
const listeners = new Set<() => void>()

function notifyEnsureListeners() {
  for (const listener of listeners) listener()
}

async function ensurePlanRequest(): Promise<EnsurePlanResponse | null> {
  const res = await fetch("/api/account/ensure-plan", { method: "POST" })
  if (!res.ok) return null
  return (await res.json()) as EnsurePlanResponse
}

function loadEnsurePlanShared(
  userId: string,
  force: boolean
): Promise<EnsurePlanResponse | null> {
  if (!force && syncedUserIds.has(userId)) {
    return Promise.resolve(null)
  }
  const existing = inFlightByUser.get(userId)
  if (existing) return existing

  const promise = ensurePlanRequest()
    .catch(() => null)
    .finally(() => {
      inFlightByUser.delete(userId)
    })
  inFlightByUser.set(userId, promise)
  return promise
}

/** Clear session heal cache (e.g. after checkout confirms Pro). */
export function invalidateEnsureUserPlanCache() {
  syncedUserIds.clear()
  inFlightByUser.clear()
  notifyEnsureListeners()
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
  const [nonce, setNonce] = React.useState(0)
  const localSyncedUserId = React.useRef<string | null>(null)
  const forceNext = React.useRef(false)

  React.useEffect(() => {
    const onInvalidate = () => {
      forceNext.current = true
      localSyncedUserId.current = null
      setPlanReady(false)
      setNonce((n) => n + 1)
    }
    listeners.add(onInvalidate)
    return () => {
      listeners.delete(onInvalidate)
    }
  }, [])

  React.useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) {
      if (isLoaded && !isSignedIn) {
        syncedUserIds.clear()
        inFlightByUser.clear()
      }
      setPlanReady(false)
      localSyncedUserId.current = null
      return
    }

    const force = forceNext.current
    if (
      !force &&
      (localSyncedUserId.current === user.id || syncedUserIds.has(user.id))
    ) {
      localSyncedUserId.current = user.id
      setPlanReady(true)
      return
    }

    forceNext.current = false
    let cancelled = false

    void loadEnsurePlanShared(user.id, force)
      .then(async (data) => {
        if (cancelled) return

        if (data) {
          const needsReload =
            data.updated === true ||
            !metadataMatchesSynced(user.publicMetadata, data)

          if (needsReload) {
            await user.reload()
          }
        }

        if (!cancelled) {
          syncedUserIds.add(user.id)
          localSyncedUserId.current = user.id
          setPlanReady(true)
        }
      })
      .catch(() => {
        if (!cancelled) {
          // Don't block the chip forever on network errors
          syncedUserIds.add(user.id)
          localSyncedUserId.current = user.id
          setPlanReady(true)
        }
      })

    return () => {
      cancelled = true
    }
  }, [isLoaded, isSignedIn, user, nonce])

  return {
    planReady: Boolean(isLoaded && isSignedIn && user && planReady),
  }
}
