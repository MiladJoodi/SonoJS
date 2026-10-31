"use client"

import * as React from "react"
import { useAuth, useUser } from "@clerk/nextjs"

import { isProExpired } from "@/lib/access"

/**
 * Session sync for Clerk plan metadata:
 * - Missing plan → Free (via `/api/account/ensure-plan`)
 * - Expired Pro → Free + clear `planExpiresAt`
 */
export function useEnsureUserPlan() {
  const { isSignedIn } = useAuth()
  const { user, isLoaded } = useUser()
  const lastKey = React.useRef<string | null>(null)

  React.useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return

    const plan = user.publicMetadata?.plan
    const needsDefault = plan !== "pro" && plan !== "free"
    const needsExpirySync = isProExpired(user.publicMetadata)
    if (!needsDefault && !needsExpirySync) return

    const key = `${user.id}:${String(plan)}:${String(user.publicMetadata?.planExpiresAt)}:${needsExpirySync}`
    if (lastKey.current === key) return
    lastKey.current = key

    void fetch("/api/account/ensure-plan", { method: "POST" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { updated?: boolean } | null) => {
        if (data?.updated) return user.reload()
      })
      .catch(() => {
        lastKey.current = null
      })
  }, [isLoaded, isSignedIn, user])
}
