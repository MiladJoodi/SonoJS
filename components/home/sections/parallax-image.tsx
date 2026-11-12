"use client"

import * as React from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

const SLIDE = 10

type HomeParallaxImageProps = {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  sizes?: string
}

/**
 * Home section product shot: not draggable; soft slide toward the cursor.
 * Fine-pointer only; rect cached via ResizeObserver (no per-move layout thrash).
 */
export function HomeParallaxImage({
  src,
  alt,
  width,
  height,
  className,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px",
}: HomeParallaxImageProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const imgRef = React.useRef<HTMLImageElement>(null)
  const rafRef = React.useRef(0)
  const targetRef = React.useRef({ x: 0, y: 0 })
  const currentRef = React.useRef({ x: 0, y: 0 })
  const sizeRef = React.useRef({ width: 0, height: 0, left: 0, top: 0 })
  const finePointerRef = React.useRef(false)
  const hoveringRef = React.useRef(false)

  const tick = React.useCallback(() => {
    const img = imgRef.current
    if (!img) {
      rafRef.current = 0
      return
    }
    const cur = currentRef.current
    const target = targetRef.current
    cur.x += (target.x - cur.x) * 0.12
    cur.y += (target.y - cur.y) * 0.12
    img.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`
    if (Math.abs(target.x - cur.x) > 0.05 || Math.abs(target.y - cur.y) > 0.05) {
      rafRef.current = requestAnimationFrame(tick)
    } else {
      rafRef.current = 0
    }
  }, [])

  const schedule = React.useCallback(() => {
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(tick)
  }, [tick])

  const syncRect = React.useCallback(() => {
    const root = rootRef.current
    if (!root) return
    const rect = root.getBoundingClientRect()
    sizeRef.current = {
      width: rect.width,
      height: rect.height,
      left: rect.left,
      top: rect.top,
    }
  }, [])

  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const mq =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(pointer: fine)")
        : null
    finePointerRef.current = mq?.matches ?? false
    const onMq = () => {
      finePointerRef.current = mq?.matches ?? false
      if (!finePointerRef.current) {
        targetRef.current = { x: 0, y: 0 }
        schedule()
      }
    }
    mq?.addEventListener("change", onMq)

    syncRect()
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => syncRect())
        : null
    ro?.observe(root)

    const onScroll = () => {
      // Only remeasure while the pointer is over the image.
      if (finePointerRef.current && hoveringRef.current) syncRect()
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      mq?.removeEventListener("change", onMq)
      ro?.disconnect()
      window.removeEventListener("scroll", onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [schedule, syncRect])

  return (
    <div
      ref={rootRef}
      className="relative w-full select-none"
      onMouseMove={(e) => {
        if (!finePointerRef.current) return
        const { width, height, left, top } = sizeRef.current
        if (width <= 0 || height <= 0) return
        const nx = ((e.clientX - left) / width) * 2 - 1
        const ny = ((e.clientY - top) / height) * 2 - 1
        targetRef.current = { x: nx * SLIDE, y: ny * SLIDE }
        schedule()
      }}
      onMouseEnter={() => {
        hoveringRef.current = true
        if (finePointerRef.current) syncRect()
      }}
      onMouseLeave={() => {
        hoveringRef.current = false
        targetRef.current = { x: 0, y: 0 }
        schedule()
      }}
    >
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        className={cn(
          "pointer-events-none will-change-transform",
          className
        )}
        sizes={sizes}
        unoptimized
      />
    </div>
  )
}
