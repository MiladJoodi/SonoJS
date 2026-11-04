"use client"

import * as React from "react"

import { cn } from "@sonojs/ui/lib/utils"

import {
  DEFAULT_3D_SLIDER_ITEMS,
  type ThreeDSliderItem,
} from "./items"

export { DEFAULT_3D_SLIDER_ITEMS } from "./items"
export type { ThreeDSliderItem }

export type ThreeDSliderProps = {
  /** Cascaded card items. Defaults to bundled demo images. */
  items?: ThreeDSliderItem[]
  /** Wheel delta multiplier. */
  speedWheel?: number
  /** Drag delta multiplier (typically negative). */
  speedDrag?: number
  /** Inline styles on the stage. */
  containerStyle?: React.CSSProperties
  className?: string
  onItemClick?: (item: ThreeDSliderItem, index: number) => void
}

function createCard(item: ThreeDSliderItem, index: number): HTMLDivElement {
  const card = document.createElement("div")
  card.className =
    "absolute top-1/2 left-1/2 cursor-pointer select-none overflow-hidden rounded-[12px] border border-border/70 bg-card"
  card.style.cssText = `
    --w: clamp(150px, 42vw, 280px);
    --h: clamp(200px, 56vw, 380px);
    width: var(--w); height: var(--h);
    margin-top: calc(var(--h) / -2);
    margin-left: calc(var(--w) / -2);
    will-change: transform, opacity, filter;
    contain: layout style paint;
    transition: none;
    display: block;
    box-shadow: 0 24px 48px -28px rgba(0,0,0,0.55);
  `

  const inner = document.createElement("div")
  inner.style.cssText = "position:absolute;inset:0;z-index:10;"

  const img = document.createElement("img")
  img.src = item.imageUrl
  img.alt = item.title
  img.loading = index < 3 ? "eager" : "lazy"
  img.decoding = "async"
  img.style.cssText =
    "width:100%;height:100%;object-fit:cover;pointer-events:none;display:block;"

  const grad = document.createElement("div")
  grad.style.cssText =
    "position:absolute;inset:0;z-index:10;background:linear-gradient(165deg,rgba(0,0,0,.45) 0%,transparent 42%,rgba(0,0,0,.78) 100%);pointer-events:none;"

  const rim = document.createElement("div")
  rim.style.cssText =
    "position:absolute;inset:0;z-index:12;border-radius:inherit;box-shadow:inset 0 0 0 1px rgba(255,255,255,.12);pointer-events:none;"

  const num = document.createElement("div")
  num.style.cssText =
    "position:absolute;z-index:20;inset-inline-start:18px;top:14px;color:rgba(255,255,255,.92);font-weight:800;font-size:clamp(26px,5.5vw,56px);letter-spacing:-0.05em;line-height:1;font-variant-numeric:tabular-nums;text-shadow:0 8px 24px rgba(0,0,0,.45);"
  num.textContent = item.num

  const meta = document.createElement("div")
  meta.style.cssText =
    "position:absolute;z-index:20;inset-inline-start:18px;inset-inline-end:18px;bottom:18px;display:flex;flex-direction:column;gap:6px;"

  const eyebrow = document.createElement("div")
  eyebrow.style.cssText =
    "color:rgba(255,255,255,.65);font-size:10px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;"
  eyebrow.textContent = "Scene"

  const title = document.createElement("div")
  title.style.cssText =
    "color:#fff;font-weight:700;font-size:clamp(17px,2.4vw,24px);letter-spacing:-0.02em;text-shadow:0 2px 10px rgba(0,0,0,.5);line-height:1.15;"
  title.textContent = item.title

  meta.appendChild(eyebrow)
  meta.appendChild(title)
  inner.appendChild(img)
  inner.appendChild(grad)
  inner.appendChild(rim)
  inner.appendChild(num)
  inner.appendChild(meta)
  card.appendChild(inner)

  return card
}

/**
 * Kinetic cascade slider - wheel / drag scrub with a live progress rail.
 */
export function ThreeDSlider({
  items = DEFAULT_3D_SLIDER_ITEMS,
  speedWheel = 0.04,
  speedDrag = -0.15,
  containerStyle,
  className,
  onItemClick,
}: ThreeDSliderProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const stageRef = React.useRef<HTMLDivElement>(null)
  const railFillRef = React.useRef<HTMLDivElement>(null)
  const labelRef = React.useRef<HTMLSpanElement>(null)
  const onItemClickRef = React.useRef(onItemClick)

  React.useEffect(() => {
    onItemClickRef.current = onItemClick
  }, [onItemClick])

  React.useEffect(() => {
    const stage = stageRef.current
    if (!stage || items.length === 0) return

    const numItems = items.length

    let progress = 50
    let targetProgress = 50
    let isDown = false
    let startX = 0
    let startY = 0
    let axisLock: "x" | "y" | null = null
    let rafId: number | null = null
    let isAnimating = false

    const cards: HTMLDivElement[] = items.map((item, i) => createCard(item, i))
    cards.forEach((card, i) => {
      card.addEventListener(
        "click",
        () => {
          const denom = numItems > 1 ? numItems - 1 : 1
          targetProgress = (i / denom) * 100
          startLoop()
          onItemClickRef.current?.(items[i]!, i)
        },
        { passive: true }
      )
      stage.appendChild(card)
    })

    const cache: {
      tx: string
      ty: string
      rot: string
      z: string
      op: string
      filter: string
    }[] = items.map(() => ({
      tx: "",
      ty: "",
      rot: "",
      z: "",
      op: "",
      filter: "",
    }))

    function syncChrome(clamped: number) {
      if (railFillRef.current) {
        railFillRef.current.style.width = `${clamped}%`
      }
      if (labelRef.current) {
        const idx = Math.round((clamped / 100) * (numItems - 1))
        const item = items[idx]
        labelRef.current.textContent = item
          ? `${String(idx + 1).padStart(2, "0")} / ${String(numItems).padStart(2, "0")}  ·  ${item.title}`
          : ""
      }
    }

    function update() {
      const lerpFactor = isDown ? 1 : 0.1
      progress += (targetProgress - progress) * lerpFactor

      const clamped = Math.max(0, Math.min(100, progress))
      const activeFloat = (clamped / 100) * (numItems - 1)
      const denom = numItems > 1 ? numItems - 1 : 1
      syncChrome(clamped)

      for (let i = 0; i < numItems; i++) {
        const card = cards[i]
        if (!card) continue

        const ratio = (i - activeFloat) / denom
        const tx = (ratio * 760).toFixed(2)
        const ty = (ratio * 190).toFixed(2)
        const rot = (ratio * 108).toFixed(2)

        const dist = Math.abs(i - activeFloat)
        const z = numItems - dist
        const op = Math.max(
          0,
          Math.min(1, (z / numItems) * 3.1 - 1.75)
        ).toFixed(2)
        const zStr = Math.round(z * 10).toString()
        const blur = dist > 0.35 ? Math.min(4, dist * 1.6).toFixed(2) : "0"
        const filter = blur === "0" ? "none" : `blur(${blur}px)`

        const c = cache[i]!

        if (c.tx !== tx || c.ty !== ty || c.rot !== rot) {
          card.style.transform = `translate3d(${tx}%, ${ty}%, 0) rotate(${rot}deg)`
          c.tx = tx
          c.ty = ty
          c.rot = rot
        }
        if (c.z !== zStr) {
          card.style.zIndex = zStr
          c.z = zStr
        }
        if (c.op !== op) {
          card.style.opacity = op
          c.op = op
        }
        if (c.filter !== filter) {
          card.style.filter = filter
          c.filter = filter
        }
      }
    }

    function loop() {
      update()
      const diff = Math.abs(targetProgress - progress)
      if (diff > 0.01 || isDown) {
        rafId = requestAnimationFrame(loop)
      } else {
        progress = targetProgress
        update()
        isAnimating = false
        rafId = null
      }
    }

    function startLoop() {
      if (isAnimating) return
      isAnimating = true
      rafId = requestAnimationFrame(loop)
    }

    update()

    function getXY(e: MouseEvent | TouchEvent): {
      x?: number
      y?: number
    } {
      if ("touches" in e) {
        return {
          x: e.touches[0]?.clientX,
          y: e.touches[0]?.clientY,
        }
      }
      return {
        x: (e as MouseEvent).clientX,
        y: (e as MouseEvent).clientY,
      }
    }

    function onWheel(e: WheelEvent) {
      const delta = e.deltaY * speedWheel
      const next = targetProgress + delta
      if ((next <= 0 && e.deltaY < 0) || (next >= 100 && e.deltaY > 0)) return
      e.preventDefault()
      targetProgress = Math.max(0, Math.min(100, next))
      startLoop()
    }

    function onDown(e: MouseEvent | TouchEvent) {
      isDown = true
      axisLock = null
      const { x, y } = getXY(e)
      if (x !== undefined) startX = x
      if (y !== undefined) startY = y
      if (!isAnimating) {
        isAnimating = true
        rafId = requestAnimationFrame(loop)
      }
    }

    function onMove(e: MouseEvent | TouchEvent) {
      if (!isDown) return
      const { x, y } = getXY(e)
      if (x === undefined || y === undefined) return

      if (!axisLock) {
        const dx = Math.abs(x - startX)
        const dy = Math.abs(y - startY)
        if (dx < 8 && dy < 8) return
        axisLock = dx > dy ? "x" : "y"
        if (axisLock === "y") {
          isDown = false
          return
        }
      }
      if (axisLock !== "x") return

      const diff = (x - startX) * speedDrag
      targetProgress = Math.max(0, Math.min(100, targetProgress + diff))
      startX = x
    }

    function onUp() {
      if (!isDown && !axisLock) return
      isDown = false
      axisLock = null
    }

    stage.addEventListener("wheel", onWheel, { passive: false })
    stage.addEventListener("mousedown", onDown, { passive: true })
    stage.addEventListener("touchstart", onDown, { passive: true })
    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("mouseup", onUp, { passive: true })
    window.addEventListener("touchmove", onMove, { passive: true })
    window.addEventListener("touchend", onUp, { passive: true })

    return () => {
      stage.removeEventListener("wheel", onWheel)
      stage.removeEventListener("mousedown", onDown)
      stage.removeEventListener("touchstart", onDown)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
      window.removeEventListener("touchmove", onMove)
      window.removeEventListener("touchend", onUp)
      if (rafId) cancelAnimationFrame(rafId)
      cards.forEach((c) => c.remove())
    }
  }, [items, speedWheel, speedDrag])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-[440px] w-full max-w-full overflow-hidden sm:h-[540px] md:h-[620px]",
        className
      )}
      style={{ ...containerStyle, touchAction: "pan-y" }}
      role="region"
      aria-label="3D cascade slider"
    >
      <div ref={stageRef} className="absolute inset-0" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex flex-col gap-2 bg-gradient-to-t from-card via-card/80 to-transparent px-4 pt-14 pb-4 sm:px-6 sm:pt-16 sm:pb-5">
        <span
          ref={labelRef}
          className="truncate text-caption font-medium tracking-wide text-muted-foreground"
        />
        <div className="h-1 w-full overflow-hidden rounded-full bg-border/70">
          <div
            ref={railFillRef}
            className="h-full rounded-full bg-foreground/80 transition-[width] duration-75"
            style={{ width: "50%" }}
          />
        </div>
      </div>
    </div>
  )
}

export default ThreeDSlider
