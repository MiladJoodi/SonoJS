"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { motion, useReducedMotion } from "motion/react"
import { CheckIcon, Loader2Icon, MinusIcon } from "lucide-react"

import { CheckoutReturnBanner } from "@/components/pricing/checkout-return-banner"
import {
  COMPARISON,
  PLANS,
  TABLE_HEADERS,
  type ComparisonValue,
  type Plan,
  type PlanId,
} from "@/components/pricing/pricing-data"
import {
  startCheckout,
  type CheckoutPlanSlug,
} from "@/components/pricing/start-checkout"
import { PlanIcon } from "@/components/icons/plan-icon"
import { ProIcon } from "@/components/icons/pro-icon"
import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

function isCheckoutPlanSlug(id: PlanId): id is CheckoutPlanSlug {
  return id === "pro-monthly" || id === "pro-yearly"
}

function GreenCheck({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-4.5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-400",
        className
      )}
    >
      <CheckIcon className="size-2.5 stroke-3" aria-hidden />
    </span>
  )
}

function renderValue(value: ComparisonValue) {
  if (value === true) {
    return (
      <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
        <GreenCheck />
        Included
      </span>
    )
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center gap-2 text-sm text-muted-foreground/70">
        <span className="inline-flex size-4.5 items-center justify-center text-muted-foreground/45">
          <MinusIcon className="size-3.5" aria-hidden />
        </span>
        Not included
      </span>
    )
  }
  return (
    <span className="text-sm font-medium text-foreground">{value}</span>
  )
}

function PlanCard({
  plan,
  index,
  reduceMotion,
  isSignedIn,
}: {
  plan: Plan
  index: number
  reduceMotion: boolean | null
  isSignedIn: boolean
}) {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const createAccountLocked = isSignedIn && plan.id === "free"
  const isProCheckout = isCheckoutPlanSlug(plan.id)

  async function onProCheckout() {
    if (!isCheckoutPlanSlug(plan.id)) return
    setError(null)

    if (!isSignedIn) {
      router.push("/sign-in?redirect_url=/pricing")
      return
    }

    setLoading(true)
    try {
      const result = await startCheckout(plan.id)
      if (!result.ok) {
        if (result.unauthorized) {
          router.push("/sign-in?redirect_url=/pricing")
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
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary to-transparent"
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-px -z-10 rounded-[13px] opacity-60 blur-xl"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--primary) 35%, transparent), transparent)",
            }}
            animate={
              reduceMotion ? undefined : { opacity: [0.35, 0.65, 0.35] }
            }
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      ) : null}

      {/* Equal top stack → CTAs share one row across cards */}
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
          ) : (
            <span className="invisible rounded-full px-2.5 py-0.5 text-[11px]" aria-hidden>
              Best Value
            </span>
          )}
        </div>

        <p className="min-h-10 text-sm text-muted-foreground">
          {plan.description}
        </p>

        <div className="mt-3 flex min-h-20 flex-col justify-start">
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
          {plan.priceNote ? (
            <p className="mt-1 text-sm text-muted-foreground">{plan.priceNote}</p>
          ) : null}
          <div className="mt-2 min-h-6">
            {plan.savingsNote ? (
              <p className="inline-flex rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                {plan.savingsNote}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      {createAccountLocked ? (
        <Button
          type="button"
          variant={plan.featured ? "default" : "outline"}
          disabled
          className={cn(
            "mt-6 w-full shrink-0 cursor-not-allowed shadow-none disabled:opacity-60",
            !plan.featured && "border-border/70 bg-card"
          )}
        >
          Create account
        </Button>
      ) : isProCheckout ? (
        <div className="mt-6 flex w-full shrink-0 flex-col gap-2">
          <Button
            type="button"
            variant="default"
            disabled={loading}
            onClick={() => void onProCheckout()}
            className="w-full cursor-pointer shadow-none disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2Icon className="size-4 animate-spin" aria-hidden />
                Redirecting…
              </span>
            ) : (
              plan.cta
            )}
          </Button>
          {error ? (
            <p
              role="alert"
              className="text-center text-sm text-destructive"
            >
              {error}
            </p>
          ) : null}
        </div>
      ) : (
        <Button
          asChild
          variant={plan.featured ? "default" : "outline"}
          className={cn(
            "mt-6 w-full shrink-0 shadow-none",
            !plan.featured && "border-border/70 bg-card hover:bg-muted"
          )}
        >
          <Link href={plan.href}>{plan.cta}</Link>
        </Button>
      )}

      <div className="my-6 h-px w-full shrink-0 bg-border/70" />

      <ul className="flex flex-1 flex-col gap-3">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 text-sm font-medium text-foreground"
          >
            <GreenCheck className="mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.li>
  )
}

export function PricingView() {
  const reduceMotion = useReducedMotion()
  const { isSignedIn } = useAuth()

  return (
    <div className="relative overflow-x-clip">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            radial-gradient(
              ellipse 70% 45% at 50% 0%,
              color-mix(in oklab, var(--primary) 18%, transparent),
              transparent 70%
            ),
            radial-gradient(
              ellipse 40% 35% at 100% 40%,
              color-mix(in oklab, var(--chart-2) 10%, transparent),
              transparent 70%
            )
          `,
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-s-1/2 top-24 -z-10 size-112 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl dark:bg-primary/15 rtl:translate-x-1/2"
        animate={
          reduceMotion
            ? undefined
            : { scale: [1, 1.08, 1], opacity: [0.45, 0.7, 0.45] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="workspace-shell py-12 sm:py-16 lg:py-20">
        <motion.header
          className="mx-auto mb-12 max-w-2xl text-center md:mb-16"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-3 text-sm font-medium tracking-[0.16em] text-muted-foreground uppercase">
            Pricing
          </p>
          <h1 className="text-balance text-[clamp(1.75rem,5vw,2.75rem)] font-semibold tracking-[-0.03em] text-foreground">
            Free, Monthly, or Yearly
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base text-muted-foreground">
            Free to start. Pro for the full library and templates.
          </p>
        </motion.header>

        <div className="mx-auto mb-2 w-full max-w-6xl">
          <React.Suspense fallback={null}>
            <CheckoutReturnBanner />
          </React.Suspense>
        </div>

        <ul className="mx-auto grid w-full max-w-6xl items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {PLANS.map((plan, index) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              index={index}
              reduceMotion={reduceMotion}
              isSignedIn={Boolean(isSignedIn)}
            />
          ))}
        </ul>

        <motion.section
          className="mx-auto mt-14 max-w-6xl md:mt-20"
          aria-labelledby="pricing-compare-heading"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-8 text-center">
            <h2
              id="pricing-compare-heading"
              className="text-2xl font-semibold tracking-tight text-foreground"
            >
              Compare plans
            </h2>
          </div>

          <div
            className="overflow-x-auto rounded-[12px] border border-border/70 bg-card shadow-soft"
            style={{
              backgroundColor: "var(--card, #ffffff)",
              boxShadow:
                "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
            }}
          >
            <table className="w-full min-w-160 border-collapse text-start">
              <thead>
                <tr className="border-b border-border/70">
                  <th className="w-[32%] px-5 py-5" scope="col">
                    <span className="sr-only">Feature</span>
                  </th>
                  {TABLE_HEADERS.map((header) => (
                    <th
                      key={header.id}
                      scope="col"
                      className={cn(
                        "px-5 py-5 text-start align-bottom",
                        header.id === "pro-yearly" && "bg-primary/5"
                      )}
                    >
                      <span className="flex items-center gap-1.5 text-base font-semibold tracking-tight text-foreground">
                        <PlanIcon
                          plan={header.id}
                          className="size-4 shrink-0"
                        />
                        {header.name}
                      </span>
                      <span className="mt-1 block text-sm font-normal text-muted-foreground">
                        {header.sub}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {COMPARISON.map((section) => (
                  <React.Fragment key={section.category}>
                    <tr className="bg-muted/40">
                      <td
                        colSpan={4}
                        className="px-5 py-3 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase"
                      >
                        {section.category}
                      </td>
                    </tr>
                    {section.features.map((feature) => (
                      <tr
                        key={feature.label}
                        className="transition-colors hover:bg-muted/25"
                      >
                        <td className="px-5 py-4 align-middle text-sm text-muted-foreground">
                          {feature.label}
                        </td>
                        {feature.values.map((value, index) => (
                          <td
                            key={`${feature.label}-${TABLE_HEADERS[index]?.id}`}
                            className={cn(
                              "px-5 py-4 align-middle",
                              TABLE_HEADERS[index]?.id === "pro-yearly" &&
                                "bg-primary/5"
                            )}
                          >
                            {renderValue(value)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        <motion.p
          className="mt-10 flex w-full flex-wrap items-center justify-center gap-1.5 text-center text-sm text-muted-foreground"
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={reduceMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.45 }}
        >
          <ProIcon className="size-3.5 shrink-0 text-primary" />
          <span>
            Yearly ={" "}
            <span className="font-medium text-foreground">$8.25/mo</span>
            {" · "}
            save ~31% vs Monthly
          </span>
        </motion.p>
      </div>
    </div>
  )
}
