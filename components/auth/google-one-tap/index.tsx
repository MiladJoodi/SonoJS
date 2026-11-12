"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

/**
 * Routes where Google One Tap must never initialize (would race OAuth / verify).
 */
function isOneTapBlockedPath(pathname: string | null): boolean {
  if (!pathname) return true
  return (
    pathname === "/sso-callback" ||
    pathname.startsWith("/sso-callback/") ||
    pathname === "/sign-in/verify" ||
    pathname.startsWith("/sign-in/verify/")
  )
}

/**
 * Google One Tap for signed-out visitors on any page they land on.
 *
 * Blocked only on OAuth/verify finish routes. Signed-in users are skipped inside
 * the headless flow (`useAuth`).
 *
 * Phase K: Clerk custom/headless One Tap (GIS + authenticateWithGoogleOneTap)
 * so `prefetchUI={false}` stays intact — no Clerk UI CDN required.
 *
 * The Clerk-hooks + GSI graph is still dynamic-imported (not eager on first paint).
 */
export function SonoGoogleOneTap() {
  const pathname = usePathname()
  const allowed = !isOneTapBlockedPath(pathname)
  const [Flow, setFlow] = React.useState<React.ComponentType | null>(null)

  React.useEffect(() => {
    if (!allowed) {
      setFlow(null)
      return
    }

    let cancelled = false

    const load = () => {
      void import("./custom-flow")
        .then((mod) => {
          if (!cancelled) setFlow(() => mod.CustomGoogleOneTapFlow)
        })
        .catch(() => {
          /* One Tap optional - fail closed */
        })
    }

    // Defer past first paint so marketing LCP is not competing with GSI.
    const ric = window.requestIdleCallback?.(load, { timeout: 2500 })
    if (typeof ric === "number") {
      return () => {
        cancelled = true
        window.cancelIdleCallback?.(ric)
      }
    }

    const t = window.setTimeout(load, 1)
    return () => {
      cancelled = true
      window.clearTimeout(t)
    }
  }, [allowed])

  if (!allowed || !Flow) return null

  return <Flow />
}
