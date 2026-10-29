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

  React.useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className="relative w-full select-none"
      onMouseMove={(e) => {
        const root = rootRef.current
        if (!root) return
        const rect = root.getBoundingClientRect()
        if (rect.width <= 0 || rect.height <= 0) return
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
        const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1
        targetRef.current = { x: nx * SLIDE, y: ny * SLIDE }
        schedule()
      }}
      onMouseLeave={() => {
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
        quality={100}
        unoptimized
      />
    </div>
  )
}
