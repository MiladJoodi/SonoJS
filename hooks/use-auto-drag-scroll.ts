"use client"

import * as React from "react"

/**
 * Horizontal strip: soft auto-scroll + click-drag scrub.
 * Blocks native link/image URL drag. No grab cursor.
 */
export function useAutoDragScroll(durationSec: number) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    let setWidth = 0
    let down = false
    let dragged = false
    let x0 = 0
    let left0 = 0
    let last = performance.now()
    let raf = 0

    const measure = () => {
      setWidth = el.scrollWidth / 3
    }

    const wrap = () => {
      if (setWidth <= 0) return
      el.scrollLeft =
        ((el.scrollLeft % setWidth) + setWidth) % setWidth
    }

    const ro = new ResizeObserver(measure)
    ro.observe(el)
    measure()

    const tick = (now: number) => {
      const dt = now - last
      last = now
      if (!down && setWidth > 0) {
        el.scrollLeft += (setWidth / (durationSec * 1000)) * dt
        wrap()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return
      down = true
      dragged = false
      x0 = e.clientX
      left0 = el.scrollLeft
      el.setPointerCapture(e.pointerId)
    }

    const onMove = (e: PointerEvent) => {
      if (!down) return
      const dx = e.clientX - x0
      if (Math.abs(dx) < 4) return
      dragged = true
      el.scrollLeft = left0 - dx
      wrap()
    }

    const onUp = () => {
      down = false
      last = performance.now()
      wrap()
    }

    const onClick = (e: MouseEvent) => {
      if (!dragged) return
      e.preventDefault()
      e.stopPropagation()
      dragged = false
    }

    const blockNativeDrag = (e: Event) => e.preventDefault()

    el.addEventListener("pointerdown", onDown)
    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerup", onUp)
    el.addEventListener("pointercancel", onUp)
    el.addEventListener("click", onClick, true)
    el.addEventListener("dragstart", blockNativeDrag, true)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
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
