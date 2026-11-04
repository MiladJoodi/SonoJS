"use client"

import * as React from "react"

/** Invisible drag-to-scroll - works over links/cards, no grab cursor. */
export function useDragScroll<T extends HTMLElement>() {
  const ref = React.useRef<T>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    let down = false
    let dragged = false
    let x0 = 0
    let left0 = 0

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
    }

    const onUp = () => {
      down = false
    }

    // Kill click after a real drag so titles/cards don't navigate.
    const onClick = (e: MouseEvent) => {
      if (!dragged) return
      e.preventDefault()
      e.stopPropagation()
      dragged = false
    }

    el.addEventListener("pointerdown", onDown)
    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerup", onUp)
    el.addEventListener("pointercancel", onUp)
    el.addEventListener("click", onClick, true)

    return () => {
      el.removeEventListener("pointerdown", onDown)
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerup", onUp)
      el.removeEventListener("pointercancel", onUp)
      el.removeEventListener("click", onClick, true)
    }
  }, [])

  return ref
}
