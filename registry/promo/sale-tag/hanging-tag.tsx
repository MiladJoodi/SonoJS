"use client"

import * as React from "react"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react"
import { CheckIcon, CopyIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type SaleTagTone = "black-friday" | "cyber-monday" | "kraft"

export type SaleTagProps = {
  className?: string
  tone?: SaleTagTone
  eyebrow?: string
  headline?: string
  /** Shown large, e.g. `20% off`. */
  offer?: string
  code?: string
  /** Ends-at line under the code. */
  endsAt?: string
  ctaLabel?: string
  /** `absolute` for framed demos; `fixed` for live sites. */
  position?: "fixed" | "absolute"
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** Auto-open delay in ms (0 = immediate). */
  delayMs?: number
}

const TONE: Record<
  SaleTagTone,
  {
    tag: string
    hole: string
    string: string
    eyebrow: string
    headline: string
    offer: string
    codeBg: string
    codeText: string
    button: string
    buttonText: string
    close: string
    chip: string
    stage: string
  }
> = {
  "black-friday": {
    tag: "bg-[#111111] text-white shadow-[0_28px_60px_-24px_rgba(0,0,0,0.75)]",
    hole: "bg-[#111111] ring-[3px] ring-[#F5E547]",
    string: "bg-[#B0B0B0]",
    eyebrow: "text-[#F5E547]",
    headline: "text-white",
    offer: "text-white",
    codeBg: "bg-white/10 border-white/15",
    codeText: "text-white/90",
    button: "bg-[#F5E547] hover:bg-[#ffe86a]",
    buttonText: "text-[#111111]",
    close: "text-white/55 hover:bg-white/10 hover:text-white",
    chip: "bg-[#111111] text-[#F5E547] border-white/10",
    stage: "bg-[#F3EFE6]",
  },
  "cyber-monday": {
    tag: "bg-[#0B1B33] text-white shadow-[0_28px_60px_-24px_rgba(8,47,73,0.7)]",
    hole: "bg-[#0B1B33] ring-[3px] ring-[#5CE1E6]",
    string: "bg-[#94A3B8]",
    eyebrow: "text-[#5CE1E6]",
    headline: "text-white",
    offer: "text-white",
    codeBg: "bg-white/10 border-white/15",
    codeText: "text-white/90",
    button: "bg-[#5CE1E6] hover:bg-[#7aebef]",
    buttonText: "text-[#0B1B33]",
    close: "text-white/55 hover:bg-white/10 hover:text-white",
    chip: "bg-[#0B1B33] text-[#5CE1E6] border-white/10",
    stage: "bg-[#E8EEF6]",
  },
  kraft: {
    tag: "bg-[#C9A66B] text-[#2C2118] shadow-[0_28px_60px_-24px_rgba(88,57,20,0.45)]",
    hole: "bg-[#C9A66B] ring-[3px] ring-[#2C2118]",
    string: "bg-[#8B7355]",
    eyebrow: "text-[#5C4030]",
    headline: "text-[#2C2118]",
    offer: "text-[#2C2118]",
    codeBg: "bg-[#2C2118]/10 border-[#2C2118]/15",
    codeText: "text-[#2C2118]",
    button: "bg-[#2C2118] hover:bg-[#1a130e]",
    buttonText: "text-[#F5E6C8]",
    close: "text-[#2C2118]/55 hover:bg-[#2C2118]/10 hover:text-[#2C2118]",
    chip: "bg-[#C9A66B] text-[#2C2118] border-[#2C2118]/20",
    stage: "bg-[#EFE6D8]",
  },
}

const MAX_ANGLE = 26
const STRING_PX = 72

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function SaleTag({
  className,
  tone = "black-friday",
  eyebrow = "BLACK FRIDAY",
  headline = "Storewide sale",
  offer = "20% off",
  code = "BF20",
  endsAt = "Ends Nov 30",
  ctaLabel = "Copy code",
  position = "absolute",
  open: openProp,
  defaultOpen = true,
  onOpenChange,
  delayMs = 0,
}: SaleTagProps) {
  const reduceMotionPref = useReducedMotion()
  const palette = TONE[tone]
  const pivotRef = React.useRef<HTMLDivElement>(null)
  const draggingRef = React.useRef(false)
  const enteredRef = React.useRef(false)
  // false on server + first hydration paint (same pattern as rainbow-button).
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
  const [grabbing, setGrabbing] = React.useState(false)
  const [uncontrolled, setUncontrolled] = React.useState(
    delayMs > 0 ? false : defaultOpen
  )
  const [copied, setCopied] = React.useState(false)
  const [ready, setReady] = React.useState(delayMs <= 0)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : uncontrolled
  // Avoid hydration mismatch: reduced-motion is unknown on the server.
  const reduceMotion = !mounted || !!reduceMotionPref

  const angle = useMotionValue(0)
  const springAngle = useSpring(angle, {
    stiffness: 70,
    damping: 7.5,
    mass: 1.15,
  })

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolled(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange]
  )

  React.useEffect(() => {
    if (delayMs <= 0) return
    const id = window.setTimeout(() => {
      setReady(true)
      if (!isControlled && defaultOpen) setUncontrolled(true)
    }, delayMs)
    return () => window.clearTimeout(id)
  }, [delayMs, defaultOpen, isControlled])

  // Drop-in settle: start tilted, then spring home.
  React.useEffect(() => {
    if (!ready || !open) {
      enteredRef.current = false
      return
    }
    if (reduceMotion) {
      enteredRef.current = true
      angle.set(0)
      return
    }
    enteredRef.current = false
    angle.set(-16)
    const id = window.setTimeout(() => {
      angle.set(0)
      enteredRef.current = true
    }, 40)
    return () => window.clearTimeout(id)
  }, [ready, open, reduceMotion, angle])

  // Soft idle sway once settled (and not grabbing).
  React.useEffect(() => {
    if (reduceMotion || !open) return
    let frame = 0
    let raf = 0
    const tick = () => {
      frame += 1
      if (!draggingRef.current && enteredRef.current) {
        const sway = Math.sin(frame / 48) * 1.6
        // Only nudge when near rest so we don't fight a big swing.
        if (Math.abs(angle.get()) < 3.5) angle.set(sway)
      }
      raf = window.requestAnimationFrame(tick)
    }
    raf = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(raf)
  }, [reduceMotion, open, angle])

  // Gentle scroll sway.
  React.useEffect(() => {
    if (reduceMotion || !open) return
    let lastY = window.scrollY
    let clearId = 0
    const onScroll = () => {
      if (draggingRef.current) return
      const dy = window.scrollY - lastY
      lastY = window.scrollY
      const nudge = clamp(angle.get() + dy * 0.08, -MAX_ANGLE, MAX_ANGLE)
      angle.set(nudge)
      window.clearTimeout(clearId)
      clearId = window.setTimeout(() => {
        if (!draggingRef.current) angle.set(0)
      }, 120)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.clearTimeout(clearId)
    }
  }, [reduceMotion, open, angle])

  const angleFromPointer = React.useCallback((clientX: number, clientY: number) => {
    const pivot = pivotRef.current
    if (!pivot) return 0
    const rect = pivot.getBoundingClientRect()
    const originX = rect.left + rect.width / 2
    const originY = rect.top
    const dx = clientX - originX
    const dy = Math.max(clientY - originY, STRING_PX * 0.45)
    // CSS rotate is clockwise; drag-right should swing the tag right → negate.
    const deg = (-Math.atan2(dx, dy) * 180) / Math.PI
    return clamp(deg, -MAX_ANGLE, MAX_ANGLE)
  }, [])

  const endDrag = React.useCallback(() => {
    if (!draggingRef.current) return
    draggingRef.current = false
    setGrabbing(false)
    angle.set(0)
  }, [angle])

  React.useEffect(() => {
    if (!grabbing) return
    const onMove = (event: PointerEvent) => {
      if (!draggingRef.current) return
      angle.set(angleFromPointer(event.clientX, event.clientY))
    }
    const onUp = () => endDrag()
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    window.addEventListener("pointercancel", onUp)
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
      window.removeEventListener("pointercancel", onUp)
    }
  }, [grabbing, angle, angleFromPointer, endDrag])

  const onTagPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return
    const target = event.target as HTMLElement
    if (target.closest("button, a, input, textarea")) return
    event.preventDefault()
    draggingRef.current = true
    setGrabbing(true)
    angle.set(angleFromPointer(event.clientX, event.clientY))
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      // clipboard may be blocked in iframe previews
    }
  }

  const shellClass =
    position === "fixed"
      ? "fixed inset-x-0 top-0 z-[90] flex justify-center pointer-events-none"
      : "absolute inset-x-0 top-0 z-20 flex justify-center pointer-events-none"

  return (
    <div
      data-slot="sale-tag"
      data-tone={tone}
      className={cn(shellClass, className)}
    >
      <AnimatePresence>
        {ready && open ? (
          <motion.div
            key="hanging"
            ref={pivotRef}
            className="pointer-events-none relative flex w-[220px] origin-top flex-col items-center will-change-transform"
            style={{
              rotate: reduceMotion ? 0 : springAngle,
              transformOrigin: "50% 0%",
            }}
            initial={reduceMotion ? { opacity: 0, y: -24 } : { opacity: 0, y: -120 }}
            animate={{ opacity: 1, y: 0 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -64, scale: 0.94 }
            }
            transition={
              reduceMotion
                ? { duration: 0.15 }
                : { type: "spring", stiffness: 260, damping: 22, mass: 0.85 }
            }
          >
            {/* Ceiling string — rotates with the tag from the pivot */}
            <span
              aria-hidden
              className={cn("block w-[1.5px] origin-top rounded-full", palette.string)}
              style={{ height: STRING_PX }}
            />

            <div
              className={cn(
                "pointer-events-auto relative w-full touch-none select-none",
                grabbing ? "cursor-grabbing" : "cursor-grab"
              )}
              onPointerDown={onTagPointerDown}
            >
              {/* Grommet / hole */}
              <span
                aria-hidden
                className={cn(
                  "absolute start-1/2 top-0 z-20 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full",
                  palette.hole
                )}
              />
              <span
                aria-hidden
                className="absolute start-1/2 top-0 z-30 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80"
              />

              <div
                role="dialog"
                aria-label={`${eyebrow} offer`}
                className={cn(
                  "relative overflow-hidden rounded-[18px] px-5 pb-5 pt-7",
                  "before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_30%_0%,rgba(255,255,255,0.14),transparent_55%)]",
                  palette.tag
                )}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-3 top-[3.25rem] border-t border-dashed border-current/15"
                />

                <button
                  type="button"
                  aria-label="Close offer"
                  className={cn(
                    "absolute end-2.5 top-2.5 flex size-8 cursor-pointer items-center justify-center rounded-full transition-colors",
                    palette.close
                  )}
                  onClick={() => setOpen(false)}
                  onPointerDown={(event) => event.stopPropagation()}
                >
                  <XIcon className="size-4" aria-hidden />
                </button>

                <div className="relative space-y-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <span
                      aria-hidden
                      className="h-px w-5 border-t border-dashed border-current/25"
                    />
                    <p
                      className={cn(
                        "text-[11px] font-semibold tracking-[0.22em]",
                        palette.eyebrow
                      )}
                    >
                      {eyebrow}
                    </p>
                    <span
                      aria-hidden
                      className="h-px w-5 border-t border-dashed border-current/25"
                    />
                  </div>
                  <div className="space-y-1">
                    <p
                      className={cn(
                        "text-[2.35rem] font-bold leading-none tracking-tight",
                        palette.offer
                      )}
                    >
                      {offer}
                    </p>
                    <p
                      className={cn(
                        "text-sm font-medium opacity-80",
                        palette.headline
                      )}
                    >
                      {headline}
                    </p>
                  </div>

                  <div
                    className={cn(
                      "mx-auto flex max-w-[11.5rem] items-center justify-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs tracking-wide",
                      palette.codeBg,
                      palette.codeText
                    )}
                  >
                    <span>{code}</span>
                  </div>

                  {endsAt ? (
                    <p className="text-[11px] opacity-60">{endsAt}</p>
                  ) : null}

                  <button
                    type="button"
                    className={cn(
                      "mt-1 inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full text-sm font-semibold transition-colors",
                      palette.button,
                      palette.buttonText
                    )}
                    onClick={copyCode}
                    onPointerDown={(event) => event.stopPropagation()}
                  >
                    {copied ? (
                      <>
                        <CheckIcon className="size-4" aria-hidden />
                        Copied
                      </>
                    ) : (
                      <>
                        <CopyIcon className="size-4" aria-hidden />
                        {ctaLabel}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {ready && !open ? (
          <motion.button
            key="chip"
            type="button"
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 380, damping: 24 }}
            className={cn(
              "pointer-events-auto absolute bottom-4 start-4 z-30 inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold shadow-soft",
              palette.chip
            )}
            onClick={() => setOpen(true)}
            aria-label={`Open ${eyebrow} offer`}
          >
            <span
              aria-hidden
              className="size-2 rounded-full bg-current opacity-80"
            />
            {offer}
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export { SaleTag, TONE }
