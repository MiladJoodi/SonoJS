"use client"

import * as React from "react"

import { cn } from "@sonojs/ui/lib/utils"

const DAMPING = 0.94
const GRAVITY = 2800
const MASS = 1
const DRAG_CLICK_PX = 10

type CardPhysicsState = {
  angle: number
  vel: number
}

export type HangingIdCardProps = {
  children?: React.ReactNode
  ropeLength?: number
  ropeColor?: string
  className?: string
  name?: string
  role?: string
  badgeId?: string
  accentColor?: string
  company?: string
  showHint?: boolean
}

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "??"
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase()
  return `${parts[0]![0] ?? ""}${parts[parts.length - 1]![0] ?? ""}`.toUpperCase()
}

function Lanyard({
  length,
  color,
  idPrefix,
}: {
  length: number
  color: string
  idPrefix: string
}) {
  const clampY = length
  const ringY = length + 10
  const hookY = length + 18
  const metalId = `${idPrefix}-metal`
  const hookId = `${idPrefix}-hook`
  const strapId = `${idPrefix}-strap`
  const shineId = `${idPrefix}-shine`

  return (
    <svg
      width="44"
      height={length + 38}
      viewBox={`0 0 44 ${length + 38}`}
      className="mx-auto block max-w-full overflow-visible"
      aria-hidden
    >
      <defs>
        <linearGradient id={metalId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4d4d8" />
          <stop offset="28%" stopColor="#71717a" />
          <stop offset="55%" stopColor="#27272a" />
          <stop offset="78%" stopColor="#a1a1aa" />
          <stop offset="100%" stopColor="#18181b" />
        </linearGradient>
        <linearGradient id={hookId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#a1a1aa" />
          <stop offset="40%" stopColor="#3f3f46" />
          <stop offset="100%" stopColor="#18181b" />
        </linearGradient>
        <linearGradient id={strapId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.5" />
          <stop offset="22%" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="78%" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id={shineId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect
        x="12"
        y="0"
        width="20"
        height={clampY + 4}
        rx="2.5"
        fill={color || "#18181b"}
      />
      <rect
        x="12"
        y="0"
        width="20"
        height={clampY + 4}
        rx="2.5"
        fill={`url(#${strapId})`}
      />
      <rect
        x="14"
        y="0"
        width="6"
        height={clampY + 4}
        fill={`url(#${shineId})`}
      />

      <line
        x1="13.5"
        y1="2"
        x2="13.5"
        y2={clampY + 2}
        stroke="#ffffff"
        strokeOpacity="0.18"
        strokeWidth="0.75"
        strokeDasharray="2.5 2"
      />
      <line
        x1="30.5"
        y1="2"
        x2="30.5"
        y2={clampY + 2}
        stroke="#ffffff"
        strokeOpacity="0.18"
        strokeWidth="0.75"
        strokeDasharray="2.5 2"
      />

      <rect
        x="9.5"
        y={clampY - 1}
        width="25"
        height="12"
        rx="3"
        fill={`url(#${metalId})`}
        stroke="#09090b"
        strokeWidth="0.7"
      />
      <circle cx="13.5" cy={clampY + 5} r="1.4" fill="#e4e4e7" />
      <circle cx="13.5" cy={clampY + 5} r="0.55" fill="#52525b" />
      <circle cx="30.5" cy={clampY + 5} r="1.4" fill="#e4e4e7" />
      <circle cx="30.5" cy={clampY + 5} r="0.55" fill="#52525b" />

      <path
        d={`M 15 ${clampY + 10} C 15 ${ringY + 7}, 29 ${ringY + 7}, 29 ${clampY + 10}`}
        fill="none"
        stroke={`url(#${metalId})`}
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      <rect
        x="18.5"
        y={ringY + 2}
        width="7"
        height="7"
        rx="1.5"
        fill={`url(#${metalId})`}
      />

      <path
        d={`M 20 ${ringY + 8} L 20 ${hookY + 6} C 20 ${hookY + 16}, 24 ${hookY + 16}, 24 ${hookY + 6} L 24 ${ringY + 8}`}
        fill="none"
        stroke={`url(#${hookId})`}
        strokeWidth="3.6"
        strokeLinecap="round"
      />
      <line
        x1="20.6"
        y1={hookY + 1}
        x2="20.6"
        y2={hookY + 11}
        stroke="#f4f4f5"
        strokeWidth="1.15"
        strokeOpacity="0.85"
      />
    </svg>
  )
}

export function HangingIdCard({
  children,
  ropeLength = 120,
  ropeColor = "#18181b",
  className,
  name = "Alex Rivera",
  role = "Product Designer",
  badgeId = "ID-84920",
  accentColor = "#2563EB",
  company = "SonoJS",
  showHint = false,
}: HangingIdCardProps) {
  const reactId = React.useId().replace(/:/g, "")
  const rootRef = React.useRef<HTMLDivElement>(null)
  const pendulumRef = React.useRef<HTMLDivElement>(null)
  const cardFaceRef = React.useRef<HTMLDivElement>(null)
  const floorRef = React.useRef<HTMLDivElement>(null)
  const holoRef = React.useRef<HTMLDivElement>(null)
  const scanRef = React.useRef<HTMLDivElement>(null)

  const physRef = React.useRef<CardPhysicsState>({ angle: 0, vel: 0 })
  const rafRef = React.useRef<number | null>(null)
  const fxRafRef = React.useRef<number | null>(null)
  const prevTimeRef = React.useRef<number | null>(null)
  const prevAngleRef = React.useRef(0)
  const isDraggingRef = React.useRef(false)
  const dragStartX = React.useRef(0)
  const dragAngle0 = React.useRef(0)
  const dragMovedPx = React.useRef(0)
  const suppressClickRef = React.useRef(false)
  const reduceMotionRef = React.useRef(false)
  const visibleRef = React.useRef(true)
  const activePointerId = React.useRef<number | null>(null)
  const maxAngleRef = React.useRef(1.2)
  const [dragging, setDragging] = React.useState(false)
  const [resolvedRope, setResolvedRope] = React.useState(ropeLength)

  const applyVisual = React.useCallback((angle: number, vel: number) => {
    const deg = angle * (180 / Math.PI)
    const swayY = Math.sin(angle) * 4
    const twist = Math.max(-5, Math.min(5, vel * 0.7))
    const shadowX = Math.sin(angle) * 22
    const shadowBlur = 22 + Math.abs(angle) * 14
    const shadowOpacity = 0.2 + Math.abs(angle) * 0.1

    if (pendulumRef.current) {
      pendulumRef.current.style.transform = `rotate(${deg}deg)`
    }
    if (cardFaceRef.current) {
      // Avoid rotateY on coarse pointers - Safari iOS blurs text with preserve-3d
      const coarse =
        typeof window !== "undefined" &&
        window.matchMedia("(pointer: coarse)").matches
      cardFaceRef.current.style.transform = coarse
        ? `translateY(${swayY}px)`
        : `translateY(${swayY}px) rotateY(${twist}deg)`
      cardFaceRef.current.style.filter = `drop-shadow(${shadowX}px 18px ${shadowBlur}px rgba(0,0,0,${shadowOpacity}))`
    }
    if (floorRef.current) {
      floorRef.current.style.background = `radial-gradient(ellipse, rgba(15,23,42,${0.16 + Math.abs(angle) * 0.1}) 0%, transparent 70%)`
      floorRef.current.style.transform = `translateX(${shadowX * 0.35}px) scaleX(${1 + Math.abs(angle) * 0.22})`
    }
  }, [])

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    reduceMotionRef.current = mq.matches
    const onChange = () => {
      reduceMotionRef.current = mq.matches
    }
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  // Responsive rope + swing clamp for narrow viewports
  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const update = () => {
      const w = root.clientWidth || window.innerWidth
      const short = w < 420
      setResolvedRope(short ? Math.min(ropeLength, 96) : ropeLength)
      maxAngleRef.current = short ? 0.85 : 1.25
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(root)
    return () => ro.disconnect()
  }, [ropeLength])

  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry?.isIntersecting ?? true
      },
      { rootMargin: "60px", threshold: 0.01 }
    )
    io.observe(root)
    return () => io.disconnect()
  }, [])

  // Lightweight holo / scan - paused when off-screen or reduced motion
  React.useEffect(() => {
    const start = performance.now()
    const loop = (now: number) => {
      fxRafRef.current = requestAnimationFrame(loop)
      if (!visibleRef.current || reduceMotionRef.current) return
      const t = (now - start) / 1000
      const holo = 35 + Math.sin(t * 0.7) * 55
      const scan = ((t * 40) % 160) - 40
      if (holoRef.current) {
        holoRef.current.style.background = `linear-gradient(115deg, transparent ${holo - 18}%, rgba(255,255,255,0.5) ${holo}%, rgba(96,165,250,0.32) ${holo + 6}%, transparent ${holo + 22}%)`
      }
      if (scanRef.current) {
        scanRef.current.style.transform = `translateX(${scan}%)`
      }
    }
    fxRafRef.current = requestAnimationFrame(loop)
    return () => {
      if (fxRafRef.current) cancelAnimationFrame(fxRafRef.current)
    }
  }, [])

  const applyVisualRef = React.useRef(applyVisual)
  const resolvedRopeRef = React.useRef(resolvedRope)
  React.useEffect(() => {
    applyVisualRef.current = applyVisual
  }, [applyVisual])
  React.useEffect(() => {
    resolvedRopeRef.current = resolvedRope
  }, [resolvedRope])

  const tickRef = React.useRef<(now: number) => void>(() => {})
  React.useEffect(() => {
    tickRef.current = (now: number) => {
      if (prevTimeRef.current === null) prevTimeRef.current = now
      const dt = Math.min((now - prevTimeRef.current) / 1000, 0.05)
      prevTimeRef.current = now

      const s = physRef.current
      const paint = applyVisualRef.current
      if (!isDraggingRef.current) {
        if (reduceMotionRef.current) {
          s.angle = 0
          s.vel = 0
          paint(0, 0)
          return
        }

        const L = resolvedRopeRef.current + 100
        const torque =
          -(GRAVITY / L) * Math.sin(s.angle) - (DAMPING / MASS) * s.vel

        s.vel += torque * dt
        s.angle += s.vel * dt
        paint(s.angle, s.vel)

        if (Math.abs(s.angle) > 0.001 || Math.abs(s.vel) > 0.001) {
          rafRef.current = requestAnimationFrame((t) => tickRef.current(t))
        } else {
          s.angle = 0
          s.vel = 0
          paint(0, 0)
        }
      } else {
        if (dt > 0) {
          s.vel = (s.angle - prevAngleRef.current) / dt
        }
        prevAngleRef.current = s.angle
        paint(s.angle, s.vel)
        rafRef.current = requestAnimationFrame((t) => tickRef.current(t))
      }
    }
  }, [])

  const startPhysics = React.useCallback(() => {
    if (reduceMotionRef.current) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    prevTimeRef.current = null
    rafRef.current = requestAnimationFrame((t) => tickRef.current(t))
  }, [])

  const onPointerDown = React.useCallback((e: React.PointerEvent) => {
    if (activePointerId.current !== null) return
    activePointerId.current = e.pointerId
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      // ignore
    }
    isDraggingRef.current = true
    setDragging(true)
    dragMovedPx.current = 0
    suppressClickRef.current = false
    dragStartX.current = e.clientX
    dragAngle0.current = physRef.current.angle
    prevAngleRef.current = physRef.current.angle
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    prevTimeRef.current = null
    rafRef.current = requestAnimationFrame((t) => tickRef.current(t))
  }, [])

  const onPointerMove = React.useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingRef.current || e.pointerId !== activePointerId.current)
        return
      const dx = e.clientX - dragStartX.current
      dragMovedPx.current = Math.max(dragMovedPx.current, Math.abs(dx))
      const L = resolvedRope + 100
      const newAngle = dragAngle0.current - dx / L
      const maxA = maxAngleRef.current
      const clamped = Math.max(-maxA, Math.min(maxA, newAngle))
      physRef.current.angle = clamped
      applyVisual(clamped, physRef.current.vel)
    },
    [applyVisual, resolvedRope]
  )

  const onPointerUp = React.useCallback((e: React.PointerEvent) => {
    if (e.pointerId !== activePointerId.current) return
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      // ignore
    }
    if (dragMovedPx.current > DRAG_CLICK_PX) {
      suppressClickRef.current = true
    }
    isDraggingRef.current = false
    activePointerId.current = null
    setDragging(false)
  }, [])

  const onCardClick = React.useCallback(
    (e: React.MouseEvent) => {
      if (suppressClickRef.current) {
        suppressClickRef.current = false
        e.preventDefault()
        return
      }
      if (reduceMotionRef.current) return
      if (
        Math.abs(physRef.current.vel) < 0.1 &&
        Math.abs(physRef.current.angle) < 0.05
      ) {
        physRef.current.vel = 3.6
        startPhysics()
      }
    },
    [startPhysics]
  )

  React.useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (fxRafRef.current) cancelAnimationFrame(fxRafRef.current)
    },
    []
  )

  const initials = initialsFromName(name)

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative mx-auto flex w-full max-w-md select-none flex-col items-center px-2",
        className
      )}
      style={{ touchAction: "none" }}
    >
      <div
        ref={floorRef}
        className="pointer-events-none absolute bottom-1 h-7 w-36 rounded-[100%] blur-md sm:bottom-2 sm:h-8 sm:w-44"
        aria-hidden
      />

      <div className="relative z-10 flex flex-col items-center" aria-hidden>
        <div className="h-2 w-10 rounded-full bg-gradient-to-b from-zinc-400 to-zinc-700 shadow-sm dark:from-zinc-500 dark:to-zinc-900" />
        <div
          className="mt-[-2px] size-3.5 rounded-full border border-zinc-500 bg-gradient-to-br from-zinc-300 via-zinc-700 to-zinc-950"
          style={{ boxShadow: `0 0 14px ${accentColor}55` }}
        />
      </div>

      <div
        ref={pendulumRef}
        className={cn(
          "flex cursor-grab flex-col items-center active:cursor-grabbing",
          dragging && "cursor-grabbing"
        )}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClick={onCardClick}
        style={{
          transformOrigin: "top center",
          willChange: "transform",
          marginTop: "-6px",
        }}
        role="img"
        aria-label={`${name}, ${role}, ${badgeId}`}
      >
        <div className="pointer-events-none">
          <Lanyard length={resolvedRope} color={ropeColor} idPrefix={reactId} />
        </div>

        <div
          ref={cardFaceRef}
          className="pointer-events-none relative mt-[-16px] w-[min(15.5rem,82vw)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="relative overflow-hidden rounded-[12px] border border-white/40 bg-white shadow-2xl dark:border-zinc-700/80 dark:bg-zinc-950">
            <div
              ref={holoRef}
              className="pointer-events-none absolute inset-0 z-20 mix-blend-soft-light"
              aria-hidden
            />

            {/* Slim lanyard slot — keep light, not a heavy black bar */}
            <div className="relative z-10 flex justify-center border-b border-zinc-200/70 bg-gradient-to-b from-zinc-50 to-zinc-100/90 pt-2.5 pb-1 dark:border-zinc-800 dark:from-zinc-800 dark:to-zinc-900">
              <div className="flex h-2 w-8 items-center justify-center rounded-full border border-zinc-300/80 bg-zinc-200/90 shadow-inner dark:border-zinc-600 dark:bg-zinc-800">
                <div className="h-0.5 w-5 rounded-full bg-zinc-400/90 dark:bg-zinc-600" />
              </div>
            </div>

            {children ?? (
              <div className="relative z-10 flex flex-col">
                <div
                  className="relative flex flex-col items-center gap-2 px-4 pt-3 pb-4"
                  style={{
                    background: `linear-gradient(145deg, ${accentColor} 0%, #1e3a8a 48%, #0f172a 100%)`,
                  }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 overflow-hidden opacity-40"
                    aria-hidden
                  >
                    <div
                      className="absolute -top-8 -end-6 size-28 rounded-full blur-2xl"
                      style={{ background: accentColor }}
                    />
                    <div className="absolute -bottom-10 -start-8 size-24 rounded-full bg-cyan-400/40 blur-2xl" />
                  </div>

                  <div className="absolute start-3 top-2.5 flex h-5 w-6 items-center justify-center rounded border border-amber-300/80 bg-gradient-to-br from-amber-300 to-amber-500 shadow-sm">
                    <div className="grid size-3 grid-cols-2 gap-px rounded-[1px] border border-amber-800/30 p-px">
                      <div className="bg-amber-700/50" />
                      <div className="bg-amber-700/50" />
                      <div className="bg-amber-700/50" />
                      <div className="bg-amber-700/50" />
                    </div>
                  </div>

                  <p className="relative z-[1] text-[9px] font-semibold tracking-[0.22em] text-white/85 uppercase">
                    {company}
                  </p>

                  <div className="relative z-[1] mt-0.5 flex size-14 items-center justify-center rounded-full border border-white/35 bg-white/15 text-lg font-semibold tracking-wide text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md">
                    {initials}
                    <span
                      className="absolute bottom-0.5 end-0.5 size-2.5 rounded-full border-2 border-white"
                      style={{ background: "#22c55e" }}
                      aria-hidden
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col items-center gap-1 bg-white px-4 pt-3.5 pb-4 dark:bg-zinc-950">
                  <p className="text-center text-sm leading-tight font-semibold text-zinc-900 dark:text-white">
                    {name}
                  </p>
                  <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                    {role}
                  </p>

                  <div className="my-2 h-px w-full bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-800" />

                  <div className="relative flex h-7 w-full items-end justify-center gap-[2px] overflow-hidden px-1">
                    {Array.from({ length: 28 }).map((_, i) => (
                      <div
                        key={i}
                        className="rounded-[1px] bg-zinc-800 dark:bg-zinc-200"
                        style={{
                          width: i % 4 === 0 ? "2.5px" : "1.4px",
                          height: `${48 + Math.sin(i * 1.15) * 38}%`,
                        }}
                      />
                    ))}
                    <div
                      ref={scanRef}
                      className="pointer-events-none absolute inset-y-0 w-10 bg-gradient-to-r from-transparent via-sky-400/45 to-transparent"
                      aria-hidden
                    />
                  </div>

                  <p
                    className="mt-1 font-mono text-[10px] font-bold tracking-[0.2em]"
                    style={{ color: accentColor }}
                  >
                    {badgeId}
                  </p>

                  <div
                    className="mt-1.5 flex items-center gap-1.5 rounded-full px-3 py-0.5 text-[9px] font-bold tracking-widest text-white uppercase"
                    style={{ background: accentColor }}
                  >
                    <span className="size-1.5 animate-pulse rounded-full bg-emerald-300" />
                    Active
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showHint ? (
        <p className="pointer-events-none mt-8 mb-2 px-4 text-center text-[11px] font-medium text-muted-foreground sm:mt-10">
          Drag to swing · tap to nudge
        </p>
      ) : null}
    </div>
  )
}

export default HangingIdCard
