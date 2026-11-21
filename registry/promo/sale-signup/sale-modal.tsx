"use client"

import * as React from "react"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react"
import { ArrowRightIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import dutchOvenImg from "./images/dutch-oven.jpg"

const dutchOvenSrc =
  typeof dutchOvenImg === "string"
    ? dutchOvenImg
    : (dutchOvenImg as { src: string }).src

export type SaleSignupTier = {
  percent: string
  threshold: string
}

export type SaleSignupGift = {
  title: string
  threshold: string
  imageSrc: string
  imageAlt?: string
  footnote?: string
}

export type SaleSignupProps = {
  className?: string
  eyebrow?: string
  title?: string
  titleAccent?: string
  description?: React.ReactNode
  emailPlaceholder?: string
  ctaLabel?: string
  terms?: string
  tiers?: SaleSignupTier[]
  gift?: SaleSignupGift
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  onSubmit?: (email: string) => void | Promise<void>
  /** Auto-open delay in ms (0 = immediate when defaultOpen). */
  delayMs?: number
  /** `absolute` for framed demos; `fixed` for live sites. */
  position?: "fixed" | "absolute"
}

const DEFAULT_TIERS: SaleSignupTier[] = [
  { percent: "15% OFF", threshold: "Orders $85+" },
  { percent: "20% OFF", threshold: "Orders $425+" },
  { percent: "25% OFF", threshold: "Orders $525+" },
]

const DEFAULT_GIFT: SaleSignupGift = {
  title: "FREE Dutch Oven",
  threshold: "Orders $725+",
  imageSrc: dutchOvenSrc,
  imageAlt: "Cream ceramic dutch oven with lid",
  footnote: "*After discount",
}

function HouseCard({
  percent,
  threshold,
  delay,
  reduceMotion,
}: {
  percent: string
  threshold: string
  delay: number
  reduceMotion: boolean
}) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 320, damping: 24, delay }
      }
      className={cn(
        "relative flex aspect-[1/1.05] flex-col items-center justify-center bg-[#F7F1E8] px-3 pb-4 pt-8 text-center shadow-[0_10px_28px_-16px_rgba(0,0,0,0.45)]",
        "[clip-path:polygon(50%_0%,100%_22%,100%_100%,0%_100%,0%_22%)]"
      )}
    >
      <p className="text-[1.35rem] font-bold leading-none tracking-tight text-[#6B2B2E] sm:text-[1.55rem]">
        {percent}
      </p>
      <p className="mt-2 text-[11px] font-medium text-[#6B2B2E]/75 sm:text-xs">
        {threshold}
      </p>
    </motion.div>
  )
}

function SaleSignup({
  className,
  eyebrow = "BLACK FRIDAY CAME EARLY",
  title = "Up to 25% Off",
  titleAccent = "Is Here",
  description = (
    <>
      Our biggest savings of the year start now. Sign up for{" "}
      <strong className="font-semibold text-[#2C2118]">up to 25% off</strong>,
      exclusive flash offers, and a{" "}
      <strong className="font-semibold text-[#2C2118]">
        FREE Dutch Oven (worth $265)
      </strong>{" "}
      with cart $725+.
    </>
  ),
  emailPlaceholder = "Email Address",
  ctaLabel = "Get the deals",
  terms = "By entering your email address, you agree to our terms & conditions.",
  tiers = DEFAULT_TIERS,
  gift = DEFAULT_GIFT,
  open: openProp,
  defaultOpen = true,
  onOpenChange,
  onSubmit,
  delayMs = 0,
  position = "absolute",
}: SaleSignupProps) {
  const reduceMotionPref = useReducedMotion()
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
  const reduceMotion = !mounted || !!reduceMotionPref

  const [uncontrolled, setUncontrolled] = React.useState(
    delayMs > 0 ? false : defaultOpen
  )
  const [ready, setReady] = React.useState(delayMs <= 0)
  const [email, setEmail] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)
  const titleId = React.useId()
  const dialogRef = React.useRef<HTMLDivElement>(null)

  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : uncontrolled

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
      "input, button, [href], [tabindex]:not([tabindex='-1'])"
    )
    node?.focus()
  }, [ready, open])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const value = email.trim()
    if (!value || submitting) return
    setSubmitting(true)
    try {
      await onSubmit?.(value)
      setOpen(false)
    } finally {
      setSubmitting(false)
    }
  }

  const shellClass =
    position === "fixed"
      ? "fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
      : "absolute inset-0 z-20 flex items-center justify-center p-4 sm:p-6"

  const visible = ready && open

  return (
    <div data-slot="sale-signup" className={cn(shellClass, className)}>
      <AnimatePresence>
        {visible ? (
          <>
            <motion.button
              key="scrim"
              type="button"
              aria-label="Close offer"
              className="absolute inset-0 cursor-pointer bg-[#1a1210]/55 backdrop-blur-[2px]"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
              transition={{ duration: reduceMotion ? 0.12 : 0.28 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              key="dialog"
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className={cn(
                "relative z-10 grid w-full max-w-[920px] overflow-hidden rounded-[12px] shadow-soft",
                "bg-[#F3EBE0] md:grid-cols-2"
              )}
              initial={
                reduceMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.94, y: 18 }
              }
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.96, y: 10 }
              }
              transition={
                reduceMotion
                  ? { duration: 0.15 }
                  : { type: "spring", stiffness: 280, damping: 26, mass: 0.9 }
              }
            >
              {/* Left — signup */}
              <div className="relative flex flex-col justify-center px-7 py-9 sm:px-10 sm:py-12">
                <button
                  type="button"
                  aria-label="Close"
                  className="absolute end-3 top-3 z-20 flex size-9 cursor-pointer items-center justify-center rounded-full bg-black/5 text-[#2C2118]/70 transition-colors hover:bg-black/10 hover:text-[#2C2118]"
                  onClick={() => setOpen(false)}
                >
                  <XIcon className="size-4" aria-hidden />
                </button>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.35]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 1px 1px, rgba(44,33,24,0.07) 1px, transparent 0)",
                    backgroundSize: "14px 14px",
                  }}
                />
                <div className="relative space-y-5">
                  <div className="space-y-3">
                    <p className="text-[11px] font-semibold tracking-[0.18em] text-[#6B2B2E]">
                      {eyebrow}
                    </p>
                    <div className="space-y-1">
                      <h2
                        id={titleId}
                        className="text-[2rem] font-bold leading-[1.05] tracking-tight text-[#2C2118] sm:text-[2.35rem]"
                      >
                        {title}
                      </h2>
                      {titleAccent ? (
                        <p className="text-[1.85rem] font-medium italic leading-none tracking-tight text-[#2C2118] sm:text-[2.15rem]">
                          {titleAccent}
                        </p>
                      ) : null}
                    </div>
                    <p className="max-w-[28rem] text-sm leading-relaxed text-[#2C2118]/75">
                      {description}
                    </p>
                  </div>

                  <form className="space-y-3" onSubmit={handleSubmit}>
                    <label className="sr-only" htmlFor={`${titleId}-email`}>
                      Email address
                    </label>
                    <input
                      id={`${titleId}-email`}
                      type="email"
                      required
                      autoComplete="email"
                      placeholder={emailPlaceholder}
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="h-[46px] w-full rounded-md border border-[#2C2118]/12 bg-white px-3 text-base text-[#2C2118] outline-none transition-[box-shadow,border-color] placeholder:text-[#2C2118]/40 focus-visible:border-[#6B2B2E]/45 focus-visible:ring-2 focus-visible:ring-[#6B2B2E]/25 md:text-sm"
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex h-[46px] w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#8B3A36] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#7A322F] disabled:pointer-events-none disabled:opacity-60"
                    >
                      {ctaLabel}
                      <ArrowRightIcon className="size-4 icon-dir" aria-hidden />
                    </button>
                  </form>

                  {terms ? (
                    <p className="text-[11px] leading-relaxed text-[#2C2118]/45">
                      {terms}
                    </p>
                  ) : null}
                </div>
              </div>

              {/* Right — tiers */}
              <div className="relative overflow-hidden bg-[#6B2B2E] px-6 py-8 sm:px-8 sm:py-10">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -end-16 -top-20 size-56 rounded-full bg-white/10 blur-2xl"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -start-10 bottom-0 size-40 rounded-full bg-black/20 blur-2xl"
                />

                <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
                  {tiers.slice(0, 3).map((tier, index) => (
                    <HouseCard
                      key={`${tier.percent}-${tier.threshold}`}
                      percent={tier.percent}
                      threshold={tier.threshold}
                      delay={0.08 + index * 0.05}
                      reduceMotion={!!reduceMotion}
                    />
                  ))}

                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : {
                            type: "spring",
                            stiffness: 320,
                            damping: 24,
                            delay: 0.23,
                          }
                    }
                    className="relative flex aspect-[1.05/1] flex-col items-center justify-end overflow-hidden rounded-t-[999px] rounded-b-[14px] bg-[#EFE6D8] px-3 pb-3 pt-5 text-center shadow-[0_10px_28px_-16px_rgba(0,0,0,0.45)]"
                  >
                    <img
                      src={gift.imageSrc}
                      alt={gift.imageAlt ?? ""}
                      className="pointer-events-none mb-1 h-[52%] w-auto max-w-[78%] object-contain drop-shadow-[0_8px_16px_rgba(44,33,24,0.25)]"
                    />
                    <p className="text-[0.95rem] font-bold leading-tight text-[#6B2B2E] sm:text-[1.05rem]">
                      {gift.title}
                    </p>
                    <p className="mt-1 text-[11px] font-medium text-[#6B2B2E]/75 sm:text-xs">
                      {gift.threshold}
                    </p>
                  </motion.div>
                </div>

                {gift.footnote ? (
                  <p className="relative mt-4 text-center text-[10px] text-white/55">
                    {gift.footnote}
                  </p>
                ) : null}
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export { SaleSignup, DEFAULT_TIERS, DEFAULT_GIFT }
