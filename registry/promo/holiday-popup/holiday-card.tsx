"use client"

import * as React from "react"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react"
import {
  CheckIcon,
  CopyIcon,
  GiftIcon,
  PauseIcon,
  PlayIcon,
  SnowflakeIcon,
  XIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

export type HolidayPopupLook =
  | "winter-night"
  | "candy-cane"
  | "evergreen"

export type HolidayPopupProps = {
  className?: string
  look?: HolidayPopupLook
  eyebrow?: string
  offer?: string
  description?: string
  code?: string
  ctaLabel?: string
  dismissLabel?: string
  endsAt?: string
  chipLabel?: string
  href?: string
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  onCopy?: (code: string) => void
  onCta?: () => void
  /** Auto-open delay in ms (0 = immediate when defaultOpen). */
  delayMs?: number
  /** `absolute` for framed demos; `fixed` for live sites. */
  position?: "fixed" | "absolute"
  snow?: boolean
}

type LookTokens = {
  stage: string
  scrim: string
  card: string
  stitch: string
  icon: string
  eyebrow: string
  offer: string
  body: string
  codeBorder: string
  codeText: string
  copyBtn: string
  copyText: string
  cta: string
  ctaText: string
  dismiss: string
  footer: string
  close: string
  chip: string
  chipText: string
  snowcap: string
}

const LOOK: Record<HolidayPopupLook, LookTokens> = {
  "winter-night": {
    stage:
      "bg-[radial-gradient(120%_80%_at_50%_0%,#F4F8FC_0%,#D7E3F0_45%,#C5D4E6_100%)]",
    scrim: "bg-[#0B1528]/28",
    card: "bg-[#0F1D36]",
    stitch: "border-white/35",
    icon: "text-[#E8C15A]",
    eyebrow: "text-[#E8C15A]/90",
    offer: "text-white",
    body: "text-[#C9D3E6]",
    codeBorder: "border-white/45",
    codeText: "text-white",
    copyBtn: "bg-white hover:bg-white/90",
    copyText: "text-[#0F1D36]",
    cta: "bg-[#E8C15A] hover:bg-[#f0cd6e]",
    ctaText: "text-[#0F1D36]",
    dismiss: "text-white/85 hover:text-white",
    footer: "text-[#8FA0BD]",
    close: "text-white/70 hover:bg-white/10 hover:text-white",
    chip: "bg-[#0F1D36] border-white/10",
    chipText: "text-white",
    snowcap: "#FFFFFF",
  },
  "candy-cane": {
    stage:
      "bg-[radial-gradient(120%_80%_at_50%_0%,#FFF8F4_0%,#F0E2DA_45%,#E5D2C8_100%)]",
    scrim: "bg-[#3A0A10]/22",
    card: "bg-[#B80D22]",
    stitch: "border-white/55",
    icon: "text-white",
    eyebrow: "text-white/90",
    offer: "text-white",
    body: "text-white/90",
    codeBorder: "border-white/70",
    codeText: "text-white",
    copyBtn: "bg-white hover:bg-white/95",
    copyText: "text-[#B80D22]",
    cta: "bg-white hover:bg-white/95",
    ctaText: "text-[#B80D22]",
    dismiss: "text-white/90 hover:text-white",
    footer: "text-white/70",
    close: "text-white/80 hover:bg-white/15 hover:text-white",
    chip: "bg-[#B80D22] border-white/15",
    chipText: "text-white",
    snowcap: "#FFFFFF",
  },
  evergreen: {
    stage:
      "bg-[radial-gradient(120%_80%_at_50%_0%,#F3F7F0_0%,#D9E4D4_45%,#C8D5C2_100%)]",
    scrim: "bg-[#14241C]/20",
    card: "bg-[#F2F0E4]",
    stitch: "border-[#1D3528]/35",
    icon: "text-[#1D3528]",
    eyebrow: "text-[#1D3528]/80",
    offer: "text-[#1D3528]",
    body: "text-[#1D3528]/75",
    codeBorder: "border-[#1D3528]/45",
    codeText: "text-[#1D3528]",
    copyBtn: "bg-[#1D3528] hover:bg-[#274836]",
    copyText: "text-white",
    cta: "bg-[#1D3528] hover:bg-[#274836]",
    ctaText: "text-white",
    dismiss: "text-[#1D3528]/85 hover:text-[#1D3528]",
    footer: "text-[#1D3528]/55",
    close: "text-[#1D3528]/60 hover:bg-[#1D3528]/10 hover:text-[#1D3528]",
    chip: "bg-[#1D3528] border-[#1D3528]/20",
    chipText: "text-[#F2F0E4]",
    snowcap: "#FFFFFF",
  },
}

type Flake = {
  x: number
  y: number
  r: number
  vy: number
  vx: number
  opacity: number
}

function SnowCanvas({
  paused,
  className,
}: {
  paused: boolean
  className?: string
}) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const flakesRef = React.useRef<Flake[]>([])
  const rafRef = React.useRef<number>(0)
  const sizeRef = React.useRef({ w: 0, h: 0 })
  const pausedRef = React.useRef(paused)

  React.useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      sizeRef.current = { w: rect.width, h: rect.height }
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(120, Math.max(48, Math.floor(rect.width / 11)))
      if (flakesRef.current.length !== count) {
        flakesRef.current = Array.from({ length: count }, () => ({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          r: 1.4 + Math.random() * 3.2,
          vy: 0.4 + Math.random() * 1.05,
          vx: -0.3 + Math.random() * 0.6,
          opacity: 0.45 + Math.random() * 0.5,
        }))
      }
    }

    resize()
    const ro = new ResizeObserver(resize)
    if (canvas.parentElement) ro.observe(canvas.parentElement)

    const tick = () => {
      const { w, h } = sizeRef.current
      ctx.clearRect(0, 0, w, h)
      if (!pausedRef.current) {
        for (const flake of flakesRef.current) {
          flake.y += flake.vy
          flake.x += flake.vx + Math.sin(flake.y * 0.02) * 0.15
          if (flake.y > h + 4) {
            flake.y = -4
            flake.x = Math.random() * w
          }
          if (flake.x < -4) flake.x = w + 4
          if (flake.x > w + 4) flake.x = -4
        }
      }
      for (const flake of flakesRef.current) {
        ctx.beginPath()
        ctx.fillStyle = `rgba(255,255,255,${flake.opacity})`
        ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2)
        ctx.fill()
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 z-[5]", className)}
    />
  )
}

/** Sample spacing (px) along the card width — matches holiday-popup.framer.website. */
const SNOWCAP_STEP = 3
/** Crest depth; size≈50% → 10 + 0.5*12 = 16. */
const SNOWCAP_DEPTH = 16

function snowcapSideTaper(index: number, count: number, depth: number) {
  const dist = Math.min(index, count - 1 - index) * SNOWCAP_STEP
  // Stay flat through the card's ~28px corner radius so snow doesn't spike past the curve.
  const t = Math.max(0, Math.min(1, (dist - 28) / 36))
  return depth * t * t * (3 - 2 * t)
}

function buildSnowcapHeights(count: number, depth: number) {
  const heights = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    const jag =
      0.66 +
      0.18 * Math.sin(i * 0.13) +
      0.1 * Math.sin(i * 0.31 + 1.3)
    heights[i] = Math.min(snowcapSideTaper(i, count, depth), depth * jag)
  }
  return heights
}

function snowcapPath(heights: Float32Array, width: number, baseline: number) {
  const n = heights.length
  const xAt = (i: number) => Math.min(width, i * SNOWCAP_STEP)
  const topY = (i: number) => baseline - heights[i]!
  const dripY = (i: number) =>
    baseline +
    Math.min(2.5, heights[i]! * 0.22) * (0.7 + 0.3 * Math.sin(i * 0.45))
  const f = (v: number) => v.toFixed(1)

  let d = `M${f(xAt(0))} ${f(baseline)}L${f(xAt(0))} ${f(topY(0))}`
  for (let i = 1; i < n - 1; i++) {
    d += `Q${f(xAt(i))} ${f(topY(i))} ${f((xAt(i) + xAt(i + 1)) / 2)} ${f(
      (topY(i) + topY(i + 1)) / 2
    )}`
  }
  d += `L${f(xAt(n - 1))} ${f(topY(n - 1))}L${f(xAt(n - 1))} ${f(dripY(n - 1))}`
  for (let i = n - 2; i > 0; i--) {
    d += `Q${f(xAt(i))} ${f(dripY(i))} ${f((xAt(i) + xAt(i - 1)) / 2)} ${f(
      (dripY(i) + dripY(i - 1)) / 2
    )}`
  }
  return `${d}Z`
}

/**
 * Settled snow bank — same canvas math/layout as
 * https://holiday-popup.framer.website/ (`hlp-capcanvas`).
 */
function Snowcap({ fill }: { fill: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const depth = SNOWCAP_DEPTH

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    const paint = () => {
      const cardW = parent.offsetWidth
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const cssW = cardW
      const cssH = depth + 10
      const pxW = Math.round(cssW * dpr)
      const pxH = Math.round(cssH * dpr)
      if (canvas.width !== pxW || canvas.height !== pxH) {
        canvas.width = pxW
        canvas.height = pxH
      }

      const ctx = canvas.getContext("2d")
      if (!ctx) return
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, cssW, cssH)
      const inset = 2
      ctx.translate(inset, 0)
      ctx.shadowColor = "rgba(20, 40, 70, 0.4)"
      ctx.shadowBlur = 2
      ctx.shadowOffsetY = 1
      ctx.fillStyle = fill
      const drawW = Math.max(1, cardW - inset * 2)
      const samples = Math.max(2, Math.ceil(drawW / SNOWCAP_STEP) + 1)
      ctx.fill(
        new Path2D(snowcapPath(buildSnowcapHeights(samples, depth), drawW, depth + 2))
      )
    }

    paint()
    const ro = new ResizeObserver(paint)
    ro.observe(parent)
    return () => ro.disconnect()
  }, [fill, depth])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute z-20"
      style={{
        top: -17,
        left: 0,
        width: "100%",
        height: depth + 10,
      }}
    />
  )
}

function HolidayPopup({
  className,
  look = "winter-night",
  eyebrow = "HOLIDAY SALE",
  offer = "25% off",
  description = "Gifts for everyone on your list, wrapped and ready to give.",
  code = "GIFT25",
  ctaLabel = "Shop gifts",
  dismissLabel = "No thanks",
  endsAt = "Ends Thursday, December 31. One code per order.",
  chipLabel,
  href = "#",
  open: openProp,
  defaultOpen = true,
  onOpenChange,
  onCopy,
  onCta,
  delayMs = 0,
  position = "absolute",
  snow = true,
}: HolidayPopupProps) {
  const reduceMotion = useReducedMotion()
  const tokens = LOOK[look]
  const isControlled = openProp !== undefined
  const [uncontrolled, setUncontrolled] = React.useState(
    delayMs > 0 ? false : defaultOpen
  )
  const [ready, setReady] = React.useState(delayMs <= 0)
  const [copied, setCopied] = React.useState(false)
  const [snowPaused, setSnowPaused] = React.useState(false)
  const [shakeKey, setShakeKey] = React.useState(0)
  const dialogRef = React.useRef<HTMLDivElement>(null)
  const titleId = React.useId()
  const open = isControlled ? !!openProp : uncontrolled
  const chipText = chipLabel ?? offer

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

  React.useEffect(() => {
    if (!ready || !open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [ready, open, setOpen])

  React.useEffect(() => {
    if (!ready || !open || !dialogRef.current) return
    const node = dialogRef.current.querySelector<HTMLElement>(
      "button, [href], [tabindex]:not([tabindex='-1'])"
    )
    node?.focus()
  }, [ready, open])

  React.useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), 1800)
    return () => window.clearTimeout(id)
  }, [copied])

  const copyCode = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      // Clipboard may be unavailable in some embeds — still show feedback.
    }
    setCopied(true)
    setShakeKey((n) => n + 1)
    onCopy?.(code)
  }, [code, onCopy])

  const shellClass =
    position === "fixed"
      ? "fixed inset-0 z-[90]"
      : "absolute inset-0 z-20"

  const visible = ready && open
  const showSnow = snow && !reduceMotion

  return (
    <div
      data-slot="holiday-popup"
      data-look={look}
      className={cn(shellClass, tokens.stage, className)}
    >
      {showSnow ? <SnowCanvas paused={snowPaused} /> : null}

      <AnimatePresence>
        {visible ? (
          <>
            <motion.button
              key="scrim"
              type="button"
              aria-label="Close offer"
              className={cn(
                "absolute inset-0 z-10 cursor-pointer",
                tokens.scrim
              )}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0.12 : 0.28 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              key="dialog"
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="absolute inset-0 z-20 flex items-center justify-center p-4 sm:p-6"
              initial={false}
            >
              <motion.div
                className="relative w-full max-w-[340px]"
                initial={
                  reduceMotion
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: -140, scale: 0.92 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 24, scale: 0.96 }
                }
                transition={
                  reduceMotion
                    ? { duration: 0.15 }
                    : {
                        type: "spring",
                        stiffness: 320,
                        damping: 18,
                        mass: 0.85,
                      }
                }
              >
                <motion.div
                  key={shakeKey}
                  className="relative"
                  animate={
                    reduceMotion || shakeKey === 0
                      ? undefined
                      : { rotate: [0, -1.4, 1.4, -0.6, 0], y: [0, -2, 0] }
                  }
                  transition={{ duration: 0.42 }}
                >
                  <div
                    className={cn(
                      "relative rounded-[28px] px-6 pb-6 pt-8 shadow-[0_28px_60px_-20px_rgba(0,0,0,0.45)] sm:px-7 sm:pb-7 sm:pt-9",
                      tokens.card
                    )}
                  >
                    <div
                      aria-hidden
                      className={cn(
                        "pointer-events-none absolute inset-[10px] rounded-[20px] border border-dashed",
                        tokens.stitch
                      )}
                    />

                    <button
                      type="button"
                      aria-label={snowPaused ? "Play snow" : "Pause snow"}
                      className={cn(
                        "absolute start-3 top-3 z-30 flex size-9 cursor-pointer appearance-none items-center justify-center rounded-full border-0 bg-transparent outline-none transition-colors focus-visible:ring-2 focus-visible:ring-white/35",
                        tokens.close
                      )}
                      onClick={() => setSnowPaused((v) => !v)}
                    >
                      {snowPaused ? (
                        <PlayIcon className="size-3.5" aria-hidden />
                      ) : (
                        <PauseIcon className="size-3.5" aria-hidden />
                      )}
                    </button>

                    <button
                      type="button"
                      aria-label="Close offer"
                      className={cn(
                        "absolute end-3 top-3 z-30 flex size-9 cursor-pointer appearance-none items-center justify-center rounded-full border-0 bg-transparent outline-none transition-colors focus-visible:ring-2 focus-visible:ring-white/35",
                        tokens.close
                      )}
                      onClick={() => setOpen(false)}
                    >
                      <XIcon className="size-4" aria-hidden />
                    </button>

                    <div className="relative flex flex-col items-center text-center">
                      <SnowflakeIcon
                        className={cn("mb-3 size-5", tokens.icon)}
                        strokeWidth={1.75}
                        aria-hidden
                      />
                      <p
                        className={cn(
                          "text-[11px] font-semibold tracking-[0.2em]",
                          tokens.eyebrow
                        )}
                      >
                        {eyebrow}
                      </p>
                      <h2
                        id={titleId}
                        className={cn(
                          "mt-2 text-[2.65rem] font-bold leading-none tracking-tight sm:text-[2.85rem]",
                          tokens.offer
                        )}
                      >
                        {offer}
                      </h2>
                      <p
                        className={cn(
                          "mt-3 max-w-[16.5rem] text-[15px] leading-snug",
                          tokens.body
                        )}
                      >
                        {description}
                      </p>

                      <div
                        className={cn(
                          "mt-6 flex w-full items-center gap-2 rounded-[12px] border border-dashed px-3 py-2.5",
                          tokens.codeBorder
                        )}
                      >
                        <span
                          className={cn(
                            "min-w-0 flex-1 truncate text-start font-mono text-sm font-bold tracking-wide",
                            tokens.codeText
                          )}
                        >
                          {code}
                        </span>
                        <button
                          type="button"
                          className={cn(
                            "inline-flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-md px-3 text-sm font-semibold transition-colors",
                            tokens.copyBtn,
                            tokens.copyText
                          )}
                          onClick={() => void copyCode()}
                          aria-live="polite"
                        >
                          {copied ? (
                            <CheckIcon className="size-3.5" aria-hidden />
                          ) : (
                            <CopyIcon className="size-3.5" aria-hidden />
                          )}
                          {copied ? "Copied" : "Copy"}
                        </button>
                      </div>

                      <a
                        href={href}
                        className={cn(
                          "mt-4 inline-flex h-[46px] w-full cursor-pointer items-center justify-center rounded-[12px] text-sm font-semibold no-underline transition-colors",
                          tokens.cta,
                          tokens.ctaText
                        )}
                        onClick={(event) => {
                          if (onCta) {
                            event.preventDefault()
                            onCta()
                          }
                          void copyCode()
                        }}
                      >
                        {ctaLabel}
                      </a>

                      <button
                        type="button"
                        className={cn(
                          "mt-3 cursor-pointer text-sm underline underline-offset-2 transition-colors",
                          tokens.dismiss
                        )}
                        onClick={() => setOpen(false)}
                      >
                        {dismissLabel}
                      </button>

                      <p
                        className={cn(
                          "mt-5 max-w-[18rem] text-[11px] leading-relaxed",
                          tokens.footer
                        )}
                      >
                        {endsAt}
                      </p>
                    </div>
                  </div>

                  {/* Same layout as hlp-capcanvas: top -(S+2), left -4, w+8, h S+10 */}
                  <Snowcap fill={tokens.snowcap} />
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {ready && !open ? (
          <motion.div
            key="reopen"
            className="absolute bottom-4 start-4 z-30 flex items-center gap-2"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              className={cn(
                "inline-flex h-[46px] cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold shadow-[0_12px_28px_-12px_rgba(0,0,0,0.45)] transition-transform hover:scale-[1.02]",
                tokens.chip,
                tokens.chipText
              )}
              onClick={() => setOpen(true)}
            >
              <GiftIcon className="size-4" aria-hidden />
              {chipText}
            </button>
            {showSnow ? (
              <button
                type="button"
                aria-label={snowPaused ? "Play snow" : "Pause snow"}
                className={cn(
                  "flex size-[46px] cursor-pointer items-center justify-center rounded-full border shadow-[0_12px_28px_-12px_rgba(0,0,0,0.45)] transition-colors",
                  tokens.chip,
                  tokens.chipText
                )}
                onClick={() => setSnowPaused((v) => !v)}
              >
                {snowPaused ? (
                  <PlayIcon className="size-4" aria-hidden />
                ) : (
                  <PauseIcon className="size-4" aria-hidden />
                )}
              </button>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export { HolidayPopup, LOOK }
