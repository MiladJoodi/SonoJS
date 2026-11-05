"use client"

import * as React from "react"
import { createRoot, type Root } from "react-dom/client"
import { PauseIcon, PlayIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@sonojs/ui/lib/utils"

export { defaultIconCloudImages } from "./images"

type SphereIcon = {
  x: number
  y: number
  z: number
  scale: number
  opacity: number
  id: number
}

export type IconCloudProps = {
  icons?: React.ReactNode[]
  images?: string[]
  showControl?: boolean
  className?: string
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function nodeToSvgDataUrl(node: React.ReactElement): Promise<string | null> {
  return new Promise((resolve) => {
    const container = document.createElement("div")
    container.style.cssText =
      "position:fixed;inset-inline-start:-9999px;top:-9999px;pointer-events:none"
    document.body.appendChild(container)
    let root: Root | null = createRoot(container)
    root.render(node)

    requestAnimationFrame(() => {
      const svg = container.querySelector("svg")
      if (!svg) {
        root?.unmount()
        root = null
        container.remove()
        resolve(null)
        return
      }
      const serialized = new XMLSerializer().serializeToString(svg)
      const dataUrl =
        "data:image/svg+xml;charset=utf-8," + encodeURIComponent(serialized)
      root?.unmount()
      root = null
      container.remove()
      resolve(dataUrl)
    })
  })
}

export function IconCloud({
  icons,
  images,
  showControl = true,
  className,
}: IconCloudProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [iconPositions, setIconPositions] = React.useState<SphereIcon[]>([])
  const [isDragging, setIsDragging] = React.useState(false)
  const [isPaused, setIsPaused] = React.useState(false)
  const [lastMousePos, setLastMousePos] = React.useState({ x: 0, y: 0 })
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 })
  const [targetRotation, setTargetRotation] = React.useState<{
    x: number
    y: number
    startX: number
    startY: number
    distance: number
    startTime: number
    duration: number
  } | null>(null)
  const animationFrameRef = React.useRef(0)
  const rotationRef = React.useRef({ x: 0, y: 0 })
  const iconCanvasesRef = React.useRef<HTMLCanvasElement[]>([])
  const imagesLoadedRef = React.useRef<boolean[]>([])

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mediaQuery.matches) {
      setIsPaused(true)
    }

    const handleChange = (e: MediaQueryListEvent) => {
      setIsPaused(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  React.useEffect(() => {
    if (!icons && !images) return

    const items = icons ?? images ?? []
    imagesLoadedRef.current = new Array(items.length).fill(false)
    let cancelled = false

    const newIconCanvases = items.map(() => {
      const offscreen = document.createElement("canvas")
      offscreen.width = 40
      offscreen.height = 40
      return offscreen
    })

    iconCanvasesRef.current = newIconCanvases

    void (async () => {
      for (let index = 0; index < items.length; index++) {
        if (cancelled) return
        const offscreen = newIconCanvases[index]
        const offCtx = offscreen.getContext("2d")
        if (!offCtx) continue

        if (images) {
          const img = new Image()
          img.crossOrigin = "anonymous"
          img.src = items[index] as string
          await new Promise<void>((resolve) => {
            img.onload = () => {
              offCtx.clearRect(0, 0, offscreen.width, offscreen.height)
              offCtx.beginPath()
              offCtx.arc(20, 20, 20, 0, Math.PI * 2)
              offCtx.closePath()
              offCtx.clip()
              offCtx.drawImage(img, 0, 0, 40, 40)
              imagesLoadedRef.current[index] = true
              resolve()
            }
            img.onerror = () => resolve()
          })
        } else {
          const element = items[index] as React.ReactElement
          const dataUrl = await nodeToSvgDataUrl(element)
          if (!dataUrl || cancelled) continue
          const img = new Image()
          await new Promise<void>((resolve) => {
            img.onload = () => {
              offCtx.clearRect(0, 0, offscreen.width, offscreen.height)
              offCtx.scale(0.4, 0.4)
              offCtx.drawImage(img, 0, 0)
              imagesLoadedRef.current[index] = true
              resolve()
            }
            img.onerror = () => resolve()
            img.src = dataUrl
          })
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [icons, images])

  React.useEffect(() => {
    const items = icons ?? images ?? []
    const newIcons: SphereIcon[] = []
    const numIcons = items.length || 20

    const offset = 2 / numIcons
    const increment = Math.PI * (3 - Math.sqrt(5))

    for (let i = 0; i < numIcons; i++) {
      const y = i * offset - 1 + offset / 2
      const r = Math.sqrt(1 - y * y)
      const phi = i * increment

      const x = Math.cos(phi) * r
      const z = Math.sin(phi) * r

      newIcons.push({
        x: x * 100,
        y: y * 100,
        z: z * 100,
        scale: 1,
        opacity: 1,
        id: i,
      })
    }
    setIconPositions(newIcons)
  }, [icons, images])

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect || !canvasRef.current) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    iconPositions.forEach((icon) => {
      const cosX = Math.cos(rotationRef.current.x)
      const sinX = Math.sin(rotationRef.current.x)
      const cosY = Math.cos(rotationRef.current.y)
      const sinY = Math.sin(rotationRef.current.y)

      const rotatedX = icon.x * cosY - icon.z * sinY
      const rotatedZ = icon.x * sinY + icon.z * cosY
      const rotatedY = icon.y * cosX + rotatedZ * sinX

      const screenX = canvasRef.current!.width / 2 + rotatedX
      const screenY = canvasRef.current!.height / 2 + rotatedY

      const scale = (rotatedZ + 200) / 300
      const radius = 20 * scale
      const dx = x - screenX
      const dy = y - screenY

      if (dx * dx + dy * dy < radius * radius) {
        const targetX = -Math.atan2(
          icon.y,
          Math.sqrt(icon.x * icon.x + icon.z * icon.z)
        )
        const targetY = Math.atan2(icon.x, icon.z)

        const currentX = rotationRef.current.x
        const currentY = rotationRef.current.y
        const distance = Math.sqrt(
          Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2)
        )

        const duration = Math.min(2000, Math.max(800, distance * 1000))

        setTargetRotation({
          x: targetX,
          y: targetY,
          startX: currentX,
          startY: currentY,
          distance,
          startTime: performance.now(),
          duration,
        })
        return
      }
    })

    setIsDragging(true)
    setLastMousePos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setMousePos({ x, y })
    }

    if (isDragging) {
      const deltaX = e.clientX - lastMousePos.x
      const deltaY = e.clientY - lastMousePos.y

      rotationRef.current = {
        x: rotationRef.current.x + deltaY * 0.002,
        y: rotationRef.current.y + deltaX * 0.002,
      }

      setLastMousePos({ x: e.clientX, y: e.clientY })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  React.useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (canvas && ctx) {
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY)
        const dx = mousePos.x - centerX
        const dy = mousePos.y - centerY
        const distance = Math.sqrt(dx * dx + dy * dy)
        const speed = 0.003 + (distance / maxDistance) * 0.01

        if (targetRotation) {
          const elapsed = performance.now() - targetRotation.startTime
          const progress = Math.min(1, elapsed / targetRotation.duration)
          const easedProgress = easeOutCubic(progress)

          rotationRef.current = {
            x:
              targetRotation.startX +
              (targetRotation.x - targetRotation.startX) * easedProgress,
            y:
              targetRotation.startY +
              (targetRotation.y - targetRotation.startY) * easedProgress,
          }

          if (progress >= 1) {
            setTargetRotation(null)
          }
        } else if (!isDragging && !isPaused) {
          rotationRef.current = {
            x: rotationRef.current.x + (dy / canvas.height) * speed,
            y: rotationRef.current.y + (dx / canvas.width) * speed,
          }
        }

        iconPositions.forEach((icon, index) => {
          const cosX = Math.cos(rotationRef.current.x)
          const sinX = Math.sin(rotationRef.current.x)
          const cosY = Math.cos(rotationRef.current.y)
          const sinY = Math.sin(rotationRef.current.y)

          const rotatedX = icon.x * cosY - icon.z * sinY
          const rotatedZ = icon.x * sinY + icon.z * cosY
          const rotatedY = icon.y * cosX + rotatedZ * sinX

          const scale = (rotatedZ + 200) / 300
          const opacity = Math.max(0.2, Math.min(1, (rotatedZ + 150) / 200))

          ctx.save()
          ctx.translate(
            canvas.width / 2 + rotatedX,
            canvas.height / 2 + rotatedY
          )
          ctx.scale(scale, scale)
          ctx.globalAlpha = opacity

          if (icons || images) {
            if (
              iconCanvasesRef.current[index] &&
              imagesLoadedRef.current[index]
            ) {
              ctx.drawImage(iconCanvasesRef.current[index], -20, -20, 40, 40)
            }
          } else {
            ctx.beginPath()
            ctx.arc(0, 0, 20, 0, Math.PI * 2)
            ctx.fillStyle = "#4444ff"
            ctx.fill()
            ctx.fillStyle = "white"
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"
            ctx.font = "16px Arial"
            ctx.fillText(`${icon.id + 1}`, 0, 0)
          }

          ctx.restore()
        })

        const hasPendingAssets =
          Boolean(icons || images) &&
          !imagesLoadedRef.current.every((loaded) => loaded)
        const shouldContinue =
          !isPaused || isDragging || targetRotation !== null || hasPendingAssets

        if (shouldContinue) {
          animationFrameRef.current = requestAnimationFrame(animate)
        }
      }

      animate()
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [
    icons,
    images,
    iconPositions,
    isDragging,
    isPaused,
    mousePos,
    targetRotation,
  ])

  return (
    <div className={cn("relative inline-block", className)}>
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="cursor-grab rounded-[12px] active:cursor-grabbing"
        aria-label="Interactive 3D icon cloud"
        role="img"
      />
      {showControl ? (
        <Button
          type="button"
          variant="outline"
          size="icon-xs"
          onClick={() => setIsPaused((paused) => !paused)}
          aria-label={isPaused ? "Play animation" : "Pause animation"}
          className="absolute top-2 end-2"
        >
          {isPaused ? (
            <PlayIcon className="size-3.5" />
          ) : (
            <PauseIcon className="size-3.5" />
          )}
        </Button>
      ) : null}
    </div>
  )
}
