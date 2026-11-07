"use client"

import * as React from "react"

/**
 * Horizontal strip: soft auto-scroll + click-drag scrub.
 * Capture starts only after a real drag so card links still navigate.
 * Auto-scroll rAF runs only while the strip is on-screen, the tab is
 * visible, motion is allowed, and the pointer is not scrubbing.
 */
export function useAutoDragScroll(durationSec: number) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    let setWidth = 0
    let down = false
    let dragged = false
    let suppressClick = false
    let x0 = 0
    let left0 = 0
    let last = performance.now()
    let raf = 0
    let inView = true
    let reducedMotion = false
    const DRAG_PX = 8

    const measure = () => {
      setWidth = el.scrollWidth / 3
    }

    const wrap = () => {
      if (setWidth <= 0) return
      el.scrollLeft = ((el.scrollLeft % setWidth) + setWidth) % setWidth
    }

    const shouldRun = () =>
      !reducedMotion && !document.hidden && inView && !down && setWidth > 0

    const stopRaf = () => {
      if (!raf) return
      cancelAnimationFrame(raf)
      raf = 0
    }

    const tick = (now: number) => {
      raf = 0
      if (!shouldRun()) return
      const dt = now - last
      last = now
      el.scrollLeft += (setWidth / (durationSec * 1000)) * dt
      wrap()
      raf = requestAnimationFrame(tick)
    }

    const startRaf = () => {
      if (raf || !shouldRun()) return
      last = performance.now()
      raf = requestAnimationFrame(tick)
    }

    const syncRaf = () => {
      if (shouldRun()) startRaf()
      else stopRaf()
    }

    const ro = new ResizeObserver(() => {
      measure()
      syncRaf()
    })
    ro.observe(el)
    measure()

    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const syncMotion = () => {
      reducedMotion = motionMq.matches
      syncRaf()
    }
    syncMotion()
    motionMq.addEventListener("change", syncMotion)

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        syncRaf()
      },
      { threshold: 0 }
    )
    io.observe(el)

    const onVisibility = () => {
      syncRaf()
    }
    document.addEventListener("visibilitychange", onVisibility)

    startRaf()

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return
      down = true
      dragged = false
      x0 = e.clientX
      left0 = el.scrollLeft
      stopRaf()
    }

    const onMove = (e: PointerEvent) => {
      if (!down) return
      const dx = e.clientX - x0
      if (!dragged) {
        if (Math.abs(dx) < DRAG_PX) return
        dragged = true
        try {
          el.setPointerCapture(e.pointerId)
        } catch {
          /* capture optional */
        }
      }
      el.scrollLeft = left0 - dx
      wrap()
    }

    const onUp = (e: PointerEvent) => {
      if (dragged) suppressClick = true
      down = false
      dragged = false
      try {
        if (el.hasPointerCapture(e.pointerId)) {
          el.releasePointerCapture(e.pointerId)
        }
      } catch {
        /* ignore */
      }
      wrap()
      syncRaf()
    }

    const onClick = (e: MouseEvent) => {
      if (!suppressClick) return
      e.preventDefault()
      e.stopPropagation()
      suppressClick = false
    }

    const blockNativeDrag = (e: Event) => e.preventDefault()

    el.addEventListener("pointerdown", onDown)
    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerup", onUp)
    el.addEventListener("pointercancel", onUp)
    el.addEventListener("click", onClick, true)
    el.addEventListener("dragstart", blockNativeDrag, true)

    return () => {
      stopRaf()
      ro.disconnect()
      io.disconnect()
      motionMq.removeEventListener("change", syncMotion)
      document.removeEventListener("visibilitychange", onVisibility)
      el.removeEventListener("pointerdown", onDown)
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerup", onUp)
      el.removeEventListener("pointercancel", onUp)
      el.removeEventListener("click", onClick, true)
      el.removeEventListener("dragstart", blockNativeDrag, true)
    }
  }, [durationSec])

  return ref
}
