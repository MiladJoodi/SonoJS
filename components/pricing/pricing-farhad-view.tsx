"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { motion, useReducedMotion } from "motion/react"
import { HeartIcon, Loader2Icon, SparklesIcon } from "lucide-react"

import { CheckoutReturnBanner } from "@/components/pricing/checkout-return-banner"
import { PLANS, type Plan } from "@/components/pricing/pricing-data"
import { startCheckout } from "@/components/pricing/start-checkout"
import { PlanIcon } from "@/components/icons/plan/plan-icon"
import {
  MeteorBorder,
  OfferCardEffectsStyle,
} from "@/registry/blocks/marketing/offer-card/_lib/meteor-border"
import { Button } from "@sonojs/ui/components/button"
import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"

const FARHAD_PHOTO = "/farhad.jpg"
const FARHAD_ACCENT = "#e8b84a"

function useYearlyCheckout(redirectPath: string) {
  const router = useRouter()
  const { isSignedIn } = useAuth()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  async function onCheckout() {
    setError(null)
    if (!isSignedIn) {
      router.push(`/sign-in?redirect_url=${encodeURIComponent(redirectPath)}`)
      return
    }
    setLoading(true)
    try {
      const result = await startCheckout("pro-yearly")
      if (!result.ok) {
        if (result.unauthorized) {
          router.push(
            `/sign-in?redirect_url=${encodeURIComponent(redirectPath)}`
          )
          return
        }
        setError(result.error)
        return
      }
      window.location.assign(result.url)
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, onCheckout }
}

function FarhadCard({
  index,
  reduceMotion,
}: {
  index: number
  reduceMotion: boolean | null
}) {
  const { loading, error, onCheckout } = useYearlyCheckout("/pricing-farhad")
  const borderRadius = 16
  const borderWidth = 1.5
  const innerRadius = borderRadius - borderWidth

  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        reduceMotion
          ? undefined
          : { y: -10, scale: 1.02, transition: { duration: 0.28 } }
      }
      className="relative flex h-full list-none flex-col"
      style={
        {
          "--offer-accent": FARHAD_ACCENT,
          "--offer-accent-hover": "#f0c95c",
        } as React.CSSProperties
      }
    >
      <OfferCardEffectsStyle />
      <MeteorBorder
        meteorColor={FARHAD_ACCENT}
        speed={reduceMotion ? 0.01 : 1.15}
        borderWidth={borderWidth}
        borderRadius={borderRadius}
        className="h-full"
      >
        <div
          className="relative flex h-full flex-col overflow-hidden border border-border/70 bg-card p-5 shadow-soft sm:p-7"
          style={{
            borderRadius: innerRadius,
            background:
              "linear-gradient(165deg, color-mix(in oklab, #1a1210 88%, #c9a227) 0%, var(--card, #ffffff) 38%, var(--card, #ffffff) 100%)",
            boxShadow:
              "0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(180, 120, 40, 0.4)",
          }}
        >
          <div
            aria-hidden
            className="offer-pulse-glow pointer-events-none absolute -inset-e-6 -top-6 size-28 rounded-full blur-2xl"
            style={{
              backgroundColor: "color-mix(in srgb, #e8b84a 22%, transparent)",
            }}
          />

          <div className="relative flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <motion.span
                className="relative size-16 shrink-0 overflow-hidden rounded-full shadow-soft ring-2 ring-amber-400/90 ring-offset-2 ring-offset-card"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        boxShadow: [
                          "0 0 0 0 rgba(232,184,74,0.45)",
                          "0 0 0 10px rgba(232,184,74,0)",
                          "0 0 0 0 rgba(232,184,74,0.45)",
                        ],
                      }
                }
                transition={{ duration: 2.4, repeat: Infinity }}
              >
                <Image
                  src={FARHAD_PHOTO}
                  alt="Farhad"
                  width={128}
                  height={128}
                  className="size-full object-cover object-[center_18%]"
                  priority
                />
              </motion.span>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-black uppercase">
                <SparklesIcon className="size-3" aria-hidden />
                For Farhad only
              </span>
            </div>

            <h2 className="flex flex-wrap items-center gap-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              <span>Farhad Aziztar az janam</span>
              <HeartIcon
                className="size-5 shrink-0 fill-rose-500 text-rose-500"
                aria-hidden
              />
            </h2>

            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-4xl font-semibold tracking-tight text-foreground">
                $1
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                private seat
              </span>
            </div>
          </div>

          <div className="relative mt-auto flex w-full shrink-0 flex-col gap-2 pt-8">
            <Button
              type="button"
              disabled={loading}
              onClick={() => void onCheckout()}
              className="w-full cursor-pointer border-0 bg-amber-500 text-black shadow-none hover:bg-amber-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2Icon className="size-4 animate-spin" aria-hidden />
                  Opening checkout…
                </span>
              ) : (
                "Unlock my $1 Pro"
              )}
            </Button>
            {error ? (
              <p role="alert" className="text-center text-sm text-destructive">
                {error}
              </p>
            ) : null}
          </div>
        </div>
      </MeteorBorder>
    </motion.li>
  )
}

function ProPlanCard({
  plan,
  index,
  reduceMotion,
}: {
  plan: Plan
  index: number
  reduceMotion: boolean | null
}) {
  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        reduceMotion
          ? undefined
          : { y: plan.featured ? -6 : -4, transition: { duration: 0.25 } }
      }
      className={cn(
        "relative flex h-full list-none flex-col rounded-[12px] border bg-card p-5 shadow-soft sm:p-7",
        plan.featured
          ? "border-primary/45 ring-1 ring-primary/20"
          : "border-border/70"
      )}
      style={{
        backgroundColor: "var(--card, #ffffff)",
        boxShadow:
          "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
      }}
    >
      {plan.featured ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary to-transparent"
        />
      ) : null}

      <div className="flex flex-col gap-2">
        <div className="flex min-h-8 flex-wrap items-center gap-2">
          <PlanIcon plan={plan.id} className="size-5 shrink-0" />
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            {plan.name}
          </h2>
          {plan.badge ? (
            <span className="rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-primary-foreground uppercase">
              {plan.badge}
            </span>
          ) : null}
        </div>

        <div className="mt-3 flex flex-col justify-start">
          <p className="flex flex-wrap items-baseline gap-1.5">
            {plan.compareAtPrice ? (
              <span className="text-xl font-medium text-muted-foreground line-through decoration-muted-foreground/60">
                ${plan.compareAtPrice}
              </span>
            ) : null}
            <span className="text-4xl font-semibold tracking-tight text-foreground">
              ${plan.price}
            </span>
            {plan.currency ? (
              <span className="text-sm font-medium text-muted-foreground">
                {plan.currency}
              </span>
            ) : null}
          </p>
          {plan.savingsNote ? (
            <p className="mt-2 inline-flex w-fit rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              {plan.savingsNote}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-auto flex w-full shrink-0 flex-col gap-2 pt-8">
        <Button
          type="button"
          variant="default"
          disabled
          className="w-full cursor-not-allowed shadow-none disabled:opacity-60"
        >
          {plan.cta}
        </Button>
      </div>
    </motion.li>
  )
}

export function PricingFarhadView() {
  const reduceMotion = useReducedMotion()
  const proPlans = PLANS.filter(
    (p) => p.id === "pro-monthly" || p.id === "pro-yearly"
  )

  return (
    <div className="relative overflow-x-clip">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            radial-gradient(
              ellipse 70% 45% at 50% 0%,
              color-mix(in oklab, #e8b84a 16%, transparent),
              transparent 70%
            ),
            radial-gradient(
              ellipse 40% 35% at 100% 40%,
              color-mix(in oklab, var(--primary) 12%, transparent),
              transparent 70%
            )
          `,
        }}
      />

      <div className="workspace-shell py-12 sm:py-16 lg:py-20">
        <motion.header
          className="mx-auto mb-12 max-w-2xl text-center md:mb-16"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-3 text-sm font-medium tracking-[0.16em] text-amber-700 uppercase dark:text-amber-300">
            Private invite
          </p>
          <h1 className="text-balance text-[clamp(1.75rem,5vw,2.75rem)] font-semibold tracking-[-0.03em] text-foreground">
            Built for Farhad
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
            <Link
              href={siteConfig.legal.terms}
              className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
            >
              Terms
            </Link>
            {" · "}
            <Link
              href={siteConfig.legal.privacy}
              className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
            >
              Privacy
            </Link>
            {" · "}
            <Link
              href={siteConfig.legal.license}
              className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
            >
              License
            </Link>
            {" · "}
            <Link
              href={siteConfig.legal.refund}
              className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
            >
              Refunds
            </Link>
          </p>
        </motion.header>

        <div className="mx-auto mb-2 w-full max-w-6xl">
          <React.Suspense fallback={null}>
            <CheckoutReturnBanner />
          </React.Suspense>
        </div>

        <ul className="mx-auto grid w-full max-w-6xl items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <FarhadCard index={0} reduceMotion={reduceMotion} />
          {proPlans.map((plan, index) => (
            <ProPlanCard
              key={plan.id}
              plan={plan}
              index={index + 1}
              reduceMotion={reduceMotion}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}
