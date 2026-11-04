"use client"

import * as React from "react"

import { cn } from "@sonojs/ui/lib/utils"

import image01 from "./images/01.jpg"
import image02 from "./images/02.jpg"
import image03 from "./images/03.jpg"
import image04 from "./images/04.jpg"
import image05 from "./images/05.jpg"
import image06 from "./images/06.jpg"
import image07 from "./images/07.jpg"
import image08 from "./images/08.jpg"
import image09 from "./images/09.jpg"
import image10 from "./images/10.jpg"
import image11 from "./images/11.jpg"
import image12 from "./images/12.jpg"
import image13 from "./images/13.jpg"
import image14 from "./images/14.jpg"
import image15 from "./images/15.jpg"
import image16 from "./images/16.jpg"
import image17 from "./images/17.jpg"
import image18 from "./images/18.jpg"
import image19 from "./images/19.jpg"
import image20 from "./images/20.jpg"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const BUNDLED = [
  image01,
  image02,
  image03,
  image04,
  image05,
  image06,
  image07,
  image08,
  image09,
  image10,
  image11,
  image12,
  image13,
  image14,
  image15,
  image16,
  image17,
  image18,
  image19,
  image20,
].map(assetSrc)

export type InfiniteDriftBand = {
  images: string[]
  speed?: number
  rotation?: number
  offsetY?: number
  curveAmount?: number
  curveDirection?: 1 | -1
  rotationType?: "fromLeft" | "fromCenter"
}

export type InfiniteDriftProps = {
  bands?: InfiniteDriftBand[]
  height?: string | number
  gap?: number
  imageHeight?: number
  bandHeight?: number
  maxImageWidth?: number
  inertia?: number
  preserveOriginalRatios?: boolean
  className?: string
  children?: React.ReactNode
}

const DEFAULT_BANDS: InfiniteDriftBand[] = [
  {
    offsetY: -220,
    speed: 1,
    rotation: 7,
    rotationType: "fromLeft",
    curveAmount: 40,
    curveDirection: 1,
    images: BUNDLED.slice(0, 4),
  },
  {
    offsetY: -110,
    speed: 1.3,
    rotation: 7,
    rotationType: "fromCenter",
    curveAmount: 35,
    curveDirection: 1,
    images: BUNDLED.slice(4, 8),
  },
  {
    offsetY: 0,
    speed: 0.7,
    rotation: 7,
    curveAmount: 40,
    curveDirection: 1,
    images: BUNDLED.slice(8, 12),
  },
  {
    offsetY: 110,
    speed: 1.2,
    rotation: 7,
    curveAmount: 40,
    curveDirection: 1,
    images: BUNDLED.slice(12, 16),
  },
  {
    offsetY: 220,
    speed: 0.9,
    rotation: 7,
    curveAmount: 35,
    curveDirection: 1,
    images: BUNDLED.slice(16, 20),
  },
]

const glslMod = (a: number, b: number) => ((a % b) + b) % b

const rotate2dPt = (
  px: number,
  py: number,
  cx: number,
  cy: number,
  angle: number
): [number, number] => {
  const dx = px - cx
  const dy = py - cy
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  return [cx + c * dx - s * dy, cy + s * dx + c * dy]
}

type BandState = {
  config: InfiniteDriftBand
  stripCanvas: HTMLCanvasElement
  sequenceWidth: number
  ready: boolean
}

export function InfiniteDrift({
  bands = DEFAULT_BANDS,
  height = 600,
  gap = 20,
  imageHeight = 100,
  bandHeight = 120,
  maxImageWidth = 300,
  inertia = 0.92,
  preserveOriginalRatios = true,
  className,
  children,
}: InfiniteDriftProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const scrollState = React.useRef({
    scrollY: 0,
    targetScrollY: 0,
    scrollVelocity: 0,
    isDragging: false,
    lastMouseY: 0,
  })

  React.useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = Math.max(1, Math.round(container.clientWidth * dpr))
      canvas.height = Math.max(1, Math.round(container.clientHeight * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const bandStates: BandState[] = bands.map((config) => ({
      config,
      stripCanvas: document.createElement("canvas"),
      sequenceWidth: 0,
      ready: false,
    }))

    let cancelled = false

    const loadBand = async (bs: BandState) => {
      const { config } = bs
      const imgs = await Promise.all(
        config.images.map(
          (url) =>
            new Promise<HTMLImageElement | HTMLCanvasElement>((resolve) => {
              const img = new Image()
              img.crossOrigin = "anonymous"
              img.onload = () => resolve(img)
              img.onerror = () => {
                const fb = document.createElement("canvas")
                fb.width = 400
                fb.height = 300
                const fc = fb.getContext("2d")
                if (fc) {
                  fc.fillStyle = `hsl(${Math.random() * 360},70%,60%)`
                  fc.fillRect(0, 0, 400, 300)
                }
                resolve(fb)
              }
              img.src = url
            })
        )
      )
      if (cancelled) return

      let seqW = 0
      const infos = imgs.map((src) => {
        const nw =
          (src as HTMLImageElement).naturalWidth ||
          (src as HTMLCanvasElement).width
        const nh =
          (src as HTMLImageElement).naturalHeight ||
          (src as HTMLCanvasElement).height
        const ratio = nw / nh || 1.5
        let w: number
        let h: number
        if (preserveOriginalRatios) {
          h = imageHeight
          w = Math.round(h * ratio)
          if (w > maxImageWidth) {
            w = maxImageWidth
            h = Math.round(w / ratio)
          }
        } else {
          h = imageHeight
          w = Math.round(h * 1.5)
        }
        seqW += w + gap
        return { src, w, h }
      })
      seqW -= gap

      const CLONES = 3
      const strip = bs.stripCanvas
      strip.width = Math.max(1, seqW * CLONES)
      strip.height = bandHeight
      const sc = strip.getContext("2d")
      if (!sc) return
      let cx2 = 0
      for (let c = 0; c < CLONES; c++) {
        for (const info of infos) {
          sc.drawImage(
            info.src,
            cx2,
            (bandHeight - info.h) / 2,
            info.w,
            info.h
          )
          cx2 += info.w + gap
        }
      }
      bs.sequenceWidth = seqW
      bs.ready = true
    }

    void Promise.all(bandStates.map(loadBand))

    const drawBand = (
      bs: BandState,
      W: number,
      H: number,
      scrollY: number
    ) => {
      if (!bs.ready || bs.sequenceWidth <= 0) return
      const { config, stripCanvas, sequenceWidth } = bs

      const rotRad = ((config.rotation || 0) * Math.PI) / 180
      const hasRot = Math.abs(rotRad) > 0.0001
      const curveAmount = config.curveAmount ?? 0
      const curveDir = config.curveDirection ?? 1
      const speed = config.speed ?? 1
      const offsetY = config.offsetY ?? 0
      const fromLeft = config.rotationType === "fromLeft"

      const bandTopBase = (H - bandHeight) * 0.5 + offsetY
      const bandCenterY = bandTopBase + bandHeight * 0.5
      const pivotX = fromLeft ? 0 : W * 0.5
      const pivotY = bandCenterY
      const scrollPos = scrollY * speed

      ctx.save()

      ctx.beginPath()
      if (hasRot) {
        const pad = curveAmount + 4
        const corners: [number, number][] = [
          [0, bandTopBase - pad],
          [W, bandTopBase - pad],
          [W, bandTopBase + bandHeight + pad],
          [0, bandTopBase + bandHeight + pad],
        ]
        corners.forEach(([cx_, cy_], i) => {
          const [rx, ry] = rotate2dPt(cx_, cy_, pivotX, pivotY, -rotRad)
          if (i === 0) ctx.moveTo(rx, ry)
          else ctx.lineTo(rx, ry)
        })
        ctx.closePath()
      } else {
        const pad = curveAmount + 4
        ctx.rect(0, bandTopBase - pad, W, bandHeight + pad * 2)
      }
      ctx.clip()

      for (let x = 0; x < W; x++) {
        const nx = x / W
        const curveFactor = 4 * (nx - 0.5) * (nx - 0.5)
        const curveOffset = (0.5 - curveFactor) * curveAmount * curveDir
        const bandTop = bandTopBase + curveOffset

        let srcX = x
        if (hasRot) {
          const [rx] = rotate2dPt(x, bandCenterY, pivotX, pivotY, rotRad)
          srcX = rx
        }

        const wrappedX = glslMod(srcX + scrollPos, sequenceWidth)
        const texSrcX = wrappedX + sequenceWidth

        if (texSrcX < 0 || texSrcX >= stripCanvas.width) continue

        ctx.drawImage(
          stripCanvas,
          texSrcX,
          0,
          1,
          bandHeight,
          x,
          bandTop,
          1,
          bandHeight
        )
      }

      ctx.restore()
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    let animId = 0
    const animate = () => {
      animId = requestAnimationFrame(animate)
      const W = container.clientWidth
      const H = container.clientHeight
      const state = scrollState.current

      if (!reduceMotion && !state.isDragging) {
        state.targetScrollY += state.scrollVelocity
        state.scrollVelocity *= inertia
        if (Math.abs(state.scrollVelocity) < 0.1) state.scrollVelocity = 0
      }
      state.scrollY += (state.targetScrollY - state.scrollY) * 0.1

      ctx.clearRect(0, 0, W, H)
      for (const bs of bandStates) drawBand(bs, W, H, state.scrollY)
    }
    animate()

    const handleWheel = (e: WheelEvent) => {
      if (reduceMotion) return
      e.preventDefault()
      scrollState.current.targetScrollY += e.deltaY
      scrollState.current.scrollVelocity = e.deltaY * 0.15
    }

    let lastScrollTop = window.scrollY
    const handleGlobalScroll = () => {
      if (reduceMotion) return
      const c = window.scrollY
      const d = c - lastScrollTop
      lastScrollTop = c
      scrollState.current.targetScrollY += d * 2.5
      scrollState.current.scrollVelocity = d * 0.3
    }

    const handleMouseDown = (e: MouseEvent) => {
      if (reduceMotion) return
      scrollState.current.isDragging = true
      scrollState.current.lastMouseY = e.clientY
      scrollState.current.scrollVelocity = 0
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!scrollState.current.isDragging) return
      const d = e.clientY - scrollState.current.lastMouseY
      scrollState.current.targetScrollY += d * 2
      scrollState.current.lastMouseY = e.clientY
      scrollState.current.scrollVelocity = d * 0.25
    }

    const handleMouseUp = () => {
      scrollState.current.isDragging = false
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (reduceMotion || !e.touches[0]) return
      scrollState.current.lastMouseY = e.touches[0].clientY
      scrollState.current.isDragging = true
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!scrollState.current.isDragging || !e.touches[0]) return
      const d = e.touches[0].clientY - scrollState.current.lastMouseY
      scrollState.current.targetScrollY += d * 2.5
      scrollState.current.lastMouseY = e.touches[0].clientY
      scrollState.current.scrollVelocity = d * 0.3
    }

    container.addEventListener("wheel", handleWheel, { passive: false })
    container.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("resize", resize)
    window.addEventListener("scroll", handleGlobalScroll, { passive: true })
    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    })
    container.addEventListener("touchmove", handleTouchMove, { passive: true })
    container.addEventListener("touchend", handleMouseUp)

    return () => {
      cancelled = true
      cancelAnimationFrame(animId)
      container.removeEventListener("wheel", handleWheel)
      container.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("resize", resize)
      window.removeEventListener("scroll", handleGlobalScroll)
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
      container.removeEventListener("touchend", handleMouseUp)
    }
  }, [
    bands,
    gap,
    imageHeight,
    bandHeight,
    maxImageWidth,
    inertia,
    preserveOriginalRatios,
  ])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full cursor-grab overflow-hidden bg-background active:cursor-grabbing",
        className
      )}
      style={{ height }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
      {children}
    </div>
  )
}

export default InfiniteDrift
