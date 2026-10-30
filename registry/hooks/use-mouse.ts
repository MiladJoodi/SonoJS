"use client"

import { type RefObject, useLayoutEffect, useRef, useState } from "react"

export interface MouseState {
  x: number | null
  y: number | null
  elementX: number | null
  elementY: number | null
  elementPositionX: number | null
  elementPositionY: number | null
}

export function useMouse(): [MouseState, RefObject<HTMLDivElement | null>] {
  const [state, setState] = useState<MouseState>({
    x: null,
    y: null,
    elementX: null,
    elementY: null,
    elementPositionX: null,
    elementPositionY: null,
  })

  const ref = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const next: Partial<MouseState> = {
        x: event.pageX,
        y: event.pageY,
      }

      if (ref.current instanceof Element) {
        const { left, top } = ref.current.getBoundingClientRect()
        const elementPositionX = left + window.scrollX
        const elementPositionY = top + window.scrollY
        next.elementX = event.pageX - elementPositionX
        next.elementY = event.pageY - elementPositionY
        next.elementPositionX = elementPositionX
        next.elementPositionY = elementPositionY
      }

      setState((prev) => ({ ...prev, ...next }))
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return [state, ref]
}
