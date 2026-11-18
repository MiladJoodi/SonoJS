"use client"

import { useSyncExternalStore } from "react"

function readKeyboardInset(): number {
  if (typeof window === "undefined") return 0
  const vp = window.visualViewport
  if (!vp || vp.scale > 1.01) return 0
  const next = Math.max(
    0,
    Math.round(window.innerHeight - (vp.height + vp.offsetTop))
  )
  return next > 48 ? next : 0
}

function subscribeKeyboardInset(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {}
  const vp = window.visualViewport
  if (!vp) return () => {}

  vp.addEventListener("resize", onStoreChange)
  vp.addEventListener("scroll", onStoreChange)
  window.addEventListener("resize", onStoreChange)
  return () => {
    vp.removeEventListener("resize", onStoreChange)
    vp.removeEventListener("scroll", onStoreChange)
    window.removeEventListener("resize", onStoreChange)
  }
}

/**
 * Bottom inset (px) occupied by the on-screen keyboard, derived from
 * `visualViewport`. Returns 0 when the keyboard is closed, on desktop, or
 * while the user is pinch-zooming (avoids false positives).
 */
export function useKeyboardInset(enabled = true): number {
  const inset = useSyncExternalStore(
    subscribeKeyboardInset,
    readKeyboardInset,
    () => 0
  )
  return enabled ? inset : 0
}
