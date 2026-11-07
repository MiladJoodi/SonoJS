"use client"

import * as React from "react"

type Listener = (activeId: string | null) => void

type VisibilityReport = { id: string; ratio: number }

const VISIBILITY_MIN = 0.45

let activeId: string | null = null
const listeners = new Set<Listener>()
/** Coarse-pointer cards currently reporting visibility. */
const visibility = new Map<string, number>()

function emit() {
  for (const listener of listeners) listener(activeId)
}

function setActive(next: string | null) {
  if (activeId === next) return
  activeId = next
  emit()
}

function pickMostVisible() {
  let bestId: string | null = null
  let bestRatio = 0
  for (const [id, ratio] of visibility) {
    if (ratio >= VISIBILITY_MIN && ratio > bestRatio) {
      bestRatio = ratio
      bestId = id
    }
  }
  setActive(bestId)
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
}

function prefersFineHover() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  )
}

/** Desktop hover: claim exclusive play for this card. */
export function requestMarketplaceVideoPlay(id: string) {
  if (prefersReducedMotion()) return
  if (!prefersFineHover()) return
  setActive(id)
}

/** Desktop hover leave: release only if this card still owns play. */
export function releaseMarketplaceVideoPlay(id: string) {
  if (activeId === id) setActive(null)
}

/**
 * Mobile / coarse pointer: report intersection ratio.
 * Coordinator keeps only the highest-ratio card (≥ 0.45) active.
 */
export function reportMarketplaceVideoVisibility(report: VisibilityReport) {
  if (prefersReducedMotion() || prefersFineHover()) {
    visibility.delete(report.id)
    return
  }
  if (report.ratio <= 0) {
    visibility.delete(report.id)
  } else {
    visibility.set(report.id, report.ratio)
  }
  pickMostVisible()
}

/** Drop a card from visibility tracking (unmount). */
export function clearMarketplaceVideoVisibility(id: string) {
  if (!visibility.has(id)) return
  visibility.delete(id)
  if (!prefersFineHover()) pickMostVisible()
  else if (activeId === id) setActive(null)
}

/**
 * Subscribe to the single active marketplace cover-video id.
 * Returns whether this `id` is currently allowed to load/play.
 */
export function useMarketplaceActiveVideo(id: string) {
  const [isActive, setIsActive] = React.useState(
    () => activeId === id
  )

  React.useEffect(() => {
    const listener: Listener = (next) => setIsActive(next === id)
    listeners.add(listener)
    setIsActive(activeId === id)
    return () => {
      listeners.delete(listener)
      clearMarketplaceVideoVisibility(id)
      releaseMarketplaceVideoPlay(id)
    }
  }, [id])

  return isActive
}

export { VISIBILITY_MIN as MARKETPLACE_VIDEO_VISIBILITY_MIN }
