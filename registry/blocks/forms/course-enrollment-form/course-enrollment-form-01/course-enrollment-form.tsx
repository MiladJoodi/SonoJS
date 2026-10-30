"use client"

import * as React from "react"
import { addWeeks, format } from "date-fns"
import {
  CalendarDaysIcon,
  CheckIcon,
  ClockIcon,
  GraduationCapIcon,
  LayersIcon,
  LoaderCircleIcon,
  TicketPercentIcon,
  UsersIcon,
  XIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@sonojs/ui/components/field"
import { Input } from "@sonojs/ui/components/input"
import {
  RadioGroup,
  RadioGroupItem,
} from "@sonojs/ui/components/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

import courseCover from "./images/course-cover.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

/* -------------------------------------------------------------------------- */
/* Sample data                                                                */
/* -------------------------------------------------------------------------- */

const COURSE = {
  title: "Design Systems in Practice",
  tagline:
    "Build, document and ship a component library your team will actually use — from tokens to release process.",
  instructor: {
    name: "Dr. Lena Okafor",
    role: "Principal Design Engineer",
    initials: "LO",
  },
  duration: "8 weeks",
  pace: "4 hrs / week",
  level: "All levels",
  basePrice: 480,
  syllabus: [
    "Design tokens, theming and dark mode",
    "Accessible, composable component APIs",
    "Documentation and visual regression testing",
    "Versioning, releases and adoption strategy",
    "Capstone: ship a library to a real team",
  ],
} as const

type Cohort = {
  id: string
  name: string
  start: Date
  /** Length of the cohort, used to show the date range. */
  weeks: number
  schedule: string
  /** Added to the base price (intensive cohorts cost more). */
  premium: number
  seatsLeft: number
}

const COHORTS: Cohort[] = [
  {
    id: "spring-evening",
    name: "Spring evening",
    start: new Date(2027, 2, 9),
    weeks: 8,
    schedule: "Tue & Thu · 7:00–9:00 PM",
    premium: 0,
    seatsLeft: 7,
  },
  {
    id: "summer-intensive",
    name: "Summer intensive",
    start: new Date(2027, 5, 14),
    weeks: 2,
    schedule: "Mon–Fri · 9:00 AM–1:00 PM",
    premium: 60,
    seatsLeft: 14,
  },
  {
    id: "autumn-weekend",
    name: "Autumn weekend",
    start: new Date(2027, 8, 18),
    weeks: 8,
    schedule: "Sat · 10:00 AM–2:00 PM",
    premium: 0,
    seatsLeft: 0,
  },
]

const LEVELS = [
  { value: "beginner", label: "Beginner — new to design systems" },
  { value: "intermediate", label: "Intermediate — contributed to one" },
  { value: "advanced", label: "Advanced — I maintain one today" },
] as const

type LevelId = (typeof LEVELS)[number]["value"]

const PLANS = [
  {
    id: "full",
    name: "Pay in full",
    description: "One payment today. No plan fee.",
    badge: "Most popular",
  },
  {
    id: "monthly",
    name: "4 monthly installments",
    description: "Split the cost. Includes a 6% plan fee.",
    badge: null,
  },
] as const

type PlanId = (typeof PLANS)[number]["id"]

const INSTALLMENTS = 4
const PLAN_FEE = 0.06
const PROMO = { code: "LEARN10", percent: 10 } as const

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

const currencyWhole = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

function makeReference() {
  return `CRS-${Math.floor(1000 + Math.random() * 9000)}`
}

const round2 = (n: number) => Math.round(n * 100) / 100

function cohortRange(cohort: Cohort) {
  return `${format(cohort.start, "d MMM")} – ${format(
    addWeeks(cohort.start, cohort.weeks),
    "d MMM yyyy"
  )}`
}

type FormKey = "name" | "email" | "level" | "cohort" | "promo" | "terms"
type FormErrors = Partial<Record<FormKey, string>>

type PromoStatus =
  | { state: "idle" }
  | { state: "applied" }
  | { state: "invalid"; message: string }

function RequiredMark() {
  return (
    <span className="text-destructive" aria-hidden>
      *
    </span>
  )
}

function StepHeading({
  step,
  title,
  hint,
}: {
  step: number
  title: string
  hint?: string
}) {
  return (
    <div className="flex items-center gap-3 text-start">
      <span
        aria-hidden
        className="flex size-7 shrink-0 items-center justify-center rounded-md bg-foreground text-xs font-semibold text-background"
      >
        {step}
      </span>
      <div className="min-w-0">
        <h2 className="text-base font-semibold leading-5 tracking-tight">
          {title}
        </h2>
        {hint ? (
          <p className="text-sm leading-5 text-muted-foreground">{hint}</p>
        ) : null}
      </div>
    </div>
  )
}

function MoneyRow({
  label,
  value,
  tone,
}: {
  label: React.ReactNode
  value: React.ReactNode
  tone?: "discount"
}) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <dt className="min-w-0 text-muted-foreground">{label}</dt>
      <dd
        className={cn(
          "min-w-0 break-words text-end font-medium tabular-nums",
          tone === "discount" && "text-emerald-600 dark:text-emerald-400"
        )}
      >
        {value}
      </dd>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Block                                                                      */
/* -------------------------------------------------------------------------- */

export default function CourseEnrollmentForm({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const uid = React.useId()
  const formRef = React.useRef<HTMLFormElement>(null)
  const id = (key: string) => `${uid}-${key}`

  const [cohortId, setCohortId] = React.useState("")
  const [planId, setPlanId] = React.useState<PlanId>("full")
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [level, setLevel] = React.useState<LevelId | "">("")
  const [promoInput, setPromoInput] = React.useState("")
  const [promo, setPromo] = React.useState<PromoStatus>({ state: "idle" })
  const [terms, setTerms] = React.useState(false)

  const [touched, setTouched] = React.useState<Partial<Record<FormKey, boolean>>>({})
  const [attempted, setAttempted] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)
  const [reference, setReference] = React.useState<string | null>(null)

  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  React.useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    []
  )

  const cohort = COHORTS.find((c) => c.id === cohortId)
  const levelLabel = LEVELS.find((l) => l.value === level)?.label.split(" — ")[0]

  /* Pricing ----------------------------------------------------------------- */

  const promoApplied = promo.state === "applied"

  function pricingFor(cohortPremium: number, planKey: PlanId) {
    const gross = COURSE.basePrice + cohortPremium
    const discount = promoApplied ? round2((gross * PROMO.percent) / 100) : 0
    const net = gross - discount
    const fee = planKey === "monthly" ? round2(net * PLAN_FEE) : 0
    const total = round2(net + fee)
    const installment = round2(total / INSTALLMENTS)
    return { gross, discount, net, fee, total, installment }
  }

  const price = pricingFor(cohort?.premium ?? 0, planId)
  const fullPrice = pricingFor(cohort?.premium ?? 0, "full")
  const monthlyPrice = pricingFor(cohort?.premium ?? 0, "monthly")
  const dueToday = planId === "monthly" ? price.installment : price.total

  /* Validation -------------------------------------------------------------- */

  const promoPending =
    promoInput.trim().length > 0 && promo.state !== "applied"

  const errors = ((): FormErrors => {
    const next: FormErrors = {}
    if (!cohort) next.cohort = "Choose a cohort to join."
    else if (cohort.seatsLeft <= 0)
      next.cohort = `${cohort.name} is full. Pick another cohort.`
    if (name.trim().length < 2) next.name = "Enter your full name."
    if (!email.trim()) next.email = "Enter your email address."
    else if (!EMAIL_RE.test(email.trim()))
      next.email = "Enter a valid email address."
    if (!level) next.level = "Select your experience level."
    if (promoPending)
      next.promo = "Apply your promo code, or clear the field to continue."
    if (!terms) next.terms = "Accept the enrollment terms to continue."
    return next
  })()

  const hasErrors = Object.keys(errors).length > 0
  const show = (key: FormKey) =>
    attempted || touched[key] ? errors[key] : undefined

  function touch(key: FormKey) {
    setTouched((prev) => (prev[key] ? prev : { ...prev, [key]: true }))
  }

  /* Promo ------------------------------------------------------------------- */

  function applyPromo() {
    const code = promoInput.trim().toUpperCase()
    if (!code) {
      setPromo({ state: "invalid", message: "Enter a promo code first." })
      return
    }
    if (code === PROMO.code) {
      setPromoInput(code)
      setPromo({ state: "applied" })
    } else {
      setPromo({
        state: "invalid",
        message: "That code isn't valid or has expired.",
      })
    }
  }

  function clearPromo() {
    setPromoInput("")
    setPromo({ state: "idle" })
  }

  /* Submit ------------------------------------------------------------------ */

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting) return
    setAttempted(true)

    if (hasErrors) {
      requestAnimationFrame(() => {
        formRef.current
          ?.querySelector<HTMLElement>("[aria-invalid='true']")
          ?.focus()
      })
      return
    }

    setSubmitting(true)
    timer.current = setTimeout(() => {
      setSubmitting(false)
      setReference(makeReference())
    }, 1200)
  }

  function handleReset() {
    if (timer.current) clearTimeout(timer.current)
    setCohortId("")
    setPlanId("full")
    setName("")
    setEmail("")
    setLevel("")
    setPromoInput("")
    setPromo({ state: "idle" })
    setTerms(false)
    setTouched({})
    setAttempted(false)
    setSubmitting(false)
    setReference(null)
  }

  /* Render ------------------------------------------------------------------ */

  const headingId = id("heading")

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas px-4 py-10 text-foreground sm:px-6 sm:py-14",
        className
      )}
      aria-labelledby={headingId}
      {...props}
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
        {/* Syllabus panel */}
        <article className="flex min-w-0 flex-col gap-6 text-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={assetSrc(courseCover)}
            alt="Course artwork showing a code editor beside a stack of interface cards"
            className="aspect-[16/10] w-full rounded-[12px] border border-border/70 bg-muted object-cover"
          />

          <div className="flex flex-col gap-3">
            <Badge variant="secondary" className="w-fit">
              <GraduationCapIcon aria-hidden />
              Live cohort course
            </Badge>
            <h1
              id={headingId}
              className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              {COURSE.title}
            </h1>
            <p className="text-pretty text-base leading-6 text-muted-foreground">
              {COURSE.tagline}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
            >
              {COURSE.instructor.initials}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-5">
                {COURSE.instructor.name}
              </p>
              <p className="text-sm leading-5 text-muted-foreground">
                {COURSE.instructor.role}
              </p>
            </div>
          </div>

          <dl className="grid grid-cols-3 divide-x divide-border/70 rounded-[12px] border border-border/70 rtl:divide-x-reverse">
            <div className="flex flex-col gap-1 p-3">
              <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <ClockIcon className="size-3.5" aria-hidden />
                Duration
              </dt>
              <dd className="text-sm font-medium">{COURSE.duration}</dd>
            </div>
            <div className="flex flex-col gap-1 p-3">
              <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CalendarDaysIcon className="size-3.5" aria-hidden />
                Pace
              </dt>
              <dd className="text-sm font-medium">{COURSE.pace}</dd>
            </div>
            <div className="flex flex-col gap-1 p-3">
              <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <LayersIcon className="size-3.5" aria-hidden />
                Level
              </dt>
              <dd className="text-sm font-medium">{COURSE.level}</dd>
            </div>
          </dl>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              What you&apos;ll learn
            </h2>
            <ul className="flex flex-col gap-3">
              {COURSE.syllabus.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-5"
                >
                  <span
                    aria-hidden
                    className="mt-px flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                  >
                    <CheckIcon className="size-3" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>

        {/* Enrollment panel */}
        {reference ? (
          <div
            role="status"
            className="flex w-full min-w-0 flex-col items-center gap-6 rounded-[12px] border border-border/70 bg-card p-6 text-center shadow-soft sm:p-10"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckIcon className="size-6" aria-hidden />
            </span>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold tracking-tight">
                You&apos;re in, {name.trim().split(" ")[0]}.
              </h2>
              <p className="mx-auto max-w-md text-pretty text-sm leading-6 text-muted-foreground">
                This is a demo — you haven&apos;t been enrolled, charged or
                emailed at {email.trim()}. The receipt below is for
                illustration only.
              </p>
            </div>

            <div className="w-full max-w-md overflow-hidden rounded-[12px] border border-border/70 bg-background text-start">
              <div className="flex items-center justify-between gap-4 bg-muted/50 px-5 py-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Enrollment receipt
                </span>
                <span
                  dir="ltr"
                  className="font-mono text-sm font-semibold tracking-widest"
                >
                  {reference}
                </span>
              </div>
              <div className="flex flex-col gap-1 border-b border-dashed border-border px-5 py-4">
                <span className="text-xs text-muted-foreground">
                  Your cohort starts
                </span>
                <span className="text-xl font-semibold tracking-tight">
                  {cohort ? format(cohort.start, "EEEE, d MMMM yyyy") : ""}
                </span>
                <span className="text-sm text-muted-foreground">
                  {cohort ? `${cohort.name} · ${cohort.schedule}` : ""}
                </span>
              </div>
              <dl className="flex flex-col gap-2.5 px-5 py-4">
                <MoneyRow label="Course" value={COURSE.title} />
                <MoneyRow label="Learner" value={name.trim()} />
                <MoneyRow
                  label="Plan"
                  value={
                    planId === "monthly"
                      ? `${INSTALLMENTS} monthly installments`
                      : "Paid in full"
                  }
                />
                <Separator />
                <MoneyRow
                  label={planId === "monthly" ? "First installment" : "Total"}
                  value={currency.format(dueToday)}
                />
              </dl>
            </div>

            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={handleReset}
            >
              Start another demo enrollment
            </Button>
          </div>
        ) : (
          <form
            ref={formRef}
            noValidate
            onSubmit={handleSubmit}
            className="flex min-w-0 flex-col gap-8 rounded-[12px] border border-border/70 bg-card p-5 text-start shadow-soft sm:p-8"
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">
                  Enroll in this course
                </h2>
                <p className="text-sm text-muted-foreground">
                  Pick a cohort, choose how to pay, and you&apos;re set.
                </p>
              </div>
              <p className="shrink-0 text-end">
                <span className="block text-xs text-muted-foreground">
                  From
                </span>
                <span className="text-2xl font-semibold tracking-tight tabular-nums">
                  {currencyWhole.format(COURSE.basePrice)}
                </span>
              </p>
            </div>

            {/* Cohort */}
            <fieldset
              disabled={submitting}
              className="flex min-w-0 flex-col gap-4"
            >
              <legend className="sr-only">Cohort</legend>
              <StepHeading
                step={1}
                title="Choose your cohort"
                hint="Same curriculum, different pace and schedule."
              />
              <Field data-invalid={!!show("cohort")}>
                <RadioGroup
                  value={cohortId}
                  onValueChange={(value) => {
                    setCohortId(value)
                    touch("cohort")
                  }}
                  aria-label="Cohort"
                  className="grid grid-cols-1 gap-3"
                >
                  {COHORTS.map((item) => {
                    const full = item.seatsLeft <= 0
                    const selected = item.id === cohortId
                    const inputId = id(`cohort-${item.id}`)
                    return (
                      <label
                        key={item.id}
                        htmlFor={inputId}
                        className={cn(
                          "flex items-start gap-3 rounded-[12px] border border-border/70 bg-card p-4 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/40",
                          full
                            ? "cursor-not-allowed bg-muted/40 opacity-60"
                            : "cursor-pointer hover:bg-muted/40",
                          selected &&
                            "border-primary bg-primary/5 hover:bg-primary/5"
                        )}
                      >
                        <RadioGroupItem
                          id={inputId}
                          value={item.id}
                          disabled={full}
                          aria-invalid={!!show("cohort") || undefined}
                          className="mt-0.5 cursor-pointer disabled:cursor-not-allowed"
                        />
                        <span className="flex min-w-0 flex-1 flex-col gap-1">
                          <span className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-sm font-semibold">
                              {item.name}
                            </span>
                            {full ? (
                              <Badge variant="destructive">Full</Badge>
                            ) : (
                              <Badge
                                variant={
                                  item.seatsLeft <= 8 ? "outline" : "secondary"
                                }
                                className={cn(
                                  item.seatsLeft <= 8 &&
                                    "border-amber-500/50 text-amber-600 dark:text-amber-400"
                                )}
                              >
                                <UsersIcon aria-hidden />
                                <bdi>{item.seatsLeft} seats left</bdi>
                              </Badge>
                            )}
                          </span>
                          <span className="flex items-center gap-1.5 text-sm text-foreground">
                            <CalendarDaysIcon
                              className="size-4 shrink-0 text-muted-foreground"
                              aria-hidden
                            />
                            <span dir="ltr">{cohortRange(item)}</span>
                          </span>
                          <span className="flex flex-wrap items-center justify-between gap-x-3 text-xs text-muted-foreground">
                            <span>{item.schedule}</span>
                            {item.premium > 0 ? (
                              <span className="tabular-nums">
                                <bdi>
                                  +{currencyWhole.format(item.premium)} intensive
                                </bdi>
                              </span>
                            ) : null}
                          </span>
                        </span>
                      </label>
                    )
                  })}
                </RadioGroup>
                {!show("cohort") ? (
                  <FieldDescription>
                    Autumn weekend is full — join the next cohort instead.
                  </FieldDescription>
                ) : null}
                <FieldError>{show("cohort")}</FieldError>
              </Field>
            </fieldset>

            {/* Plan */}
            <fieldset
              disabled={submitting}
              className="flex min-w-0 flex-col gap-4"
            >
              <legend className="sr-only">Pricing plan</legend>
              <StepHeading
                step={2}
                title="Pick a pricing plan"
                hint="Prices update with your cohort and promo code."
              />
              <RadioGroup
                value={planId}
                onValueChange={(value) => setPlanId(value as PlanId)}
                aria-label="Pricing plan"
                className="grid grid-cols-1 gap-3 sm:grid-cols-2"
              >
                {PLANS.map((item) => {
                  const selected = item.id === planId
                  const inputId = id(`plan-${item.id}`)
                  const quote = item.id === "full" ? fullPrice : monthlyPrice
                  return (
                    <label
                      key={item.id}
                      htmlFor={inputId}
                      className={cn(
                        "relative flex cursor-pointer flex-col gap-3 rounded-[12px] border border-border/70 bg-card p-4 pt-5 transition-colors hover:bg-muted/40 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/40",
                        selected &&
                          "border-primary bg-primary/5 hover:bg-primary/5"
                      )}
                    >
                      {item.badge ? (
                        <Badge className="absolute -top-2.5 start-4">
                          {item.badge}
                        </Badge>
                      ) : null}
                      <span className="flex items-start justify-between gap-2">
                        <span className="text-sm font-semibold">
                          {item.name}
                        </span>
                        <RadioGroupItem
                          id={inputId}
                          value={item.id}
                          className="mt-0.5 cursor-pointer"
                        />
                      </span>
                      <span className="flex flex-col">
                        {item.id === "full" ? (
                          <span className="text-2xl font-semibold tracking-tight tabular-nums">
                            {currencyWhole.format(quote.total)}
                          </span>
                        ) : (
                          <span className="text-2xl font-semibold tracking-tight tabular-nums">
                            {currency.format(quote.installment)}
                            <span className="text-sm font-normal text-muted-foreground">
                              {" "}
                              × {INSTALLMENTS} / mo
                            </span>
                          </span>
                        )}
                        <span className="text-xs leading-5 text-muted-foreground">
                          {item.description}
                        </span>
                      </span>
                    </label>
                  )
                })}
              </RadioGroup>
            </fieldset>

            {/* Learner */}
            <fieldset
              disabled={submitting}
              className="flex min-w-0 flex-col gap-4"
            >
              <legend className="sr-only">Learner details</legend>
              <StepHeading
                step={3}
                title="Learner details"
                hint="We'll tailor pairing and pacing to your level."
              />
              <FieldGroup className="gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field data-invalid={!!show("name")}>
                    <FieldLabel htmlFor={id("name")}>
                      Full name <RequiredMark />
                    </FieldLabel>
                    <Input
                      id={id("name")}
                      name="name"
                      autoComplete="name"
                      placeholder="Sam Rivera"
                      value={name}
                      aria-invalid={!!show("name")}
                      aria-describedby={
                        show("name") ? `${id("name")}-error` : undefined
                      }
                      onChange={(e) => setName(e.target.value)}
                      onBlur={() => touch("name")}
                    />
                    <FieldError id={`${id("name")}-error`}>
                      {show("name")}
                    </FieldError>
                  </Field>
                  <Field data-invalid={!!show("email")}>
                    <FieldLabel htmlFor={id("email")}>
                      Email <RequiredMark />
                    </FieldLabel>
                    <Input
                      id={id("email")}
                      name="email"
                      type="email"
                      dir="ltr"
                      autoComplete="email"
                      placeholder="sam@example.com"
                      value={email}
                      aria-invalid={!!show("email")}
                      aria-describedby={
                        show("email") ? `${id("email")}-error` : undefined
                      }
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => touch("email")}
                    />
                    <FieldError id={`${id("email")}-error`}>
                      {show("email")}
                    </FieldError>
                  </Field>
                </div>

                <Field data-invalid={!!show("level")}>
                  <FieldLabel htmlFor={id("level")}>
                    Experience level <RequiredMark />
                  </FieldLabel>
                  <Select
                    value={level}
                    onValueChange={(value) => {
                      setLevel(value as LevelId)
                      touch("level")
                    }}
                  >
                    <SelectTrigger
                      id={id("level")}
                      aria-invalid={!!show("level")}
                      className="w-full cursor-pointer"
                    >
                      <SelectValue placeholder="Select your level" />
                    </SelectTrigger>
                    <SelectContent>
                      {LEVELS.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError>{show("level")}</FieldError>
                </Field>

                {/* Promo */}
                <Field data-invalid={!!show("promo")}>
                  <FieldLabel htmlFor={id("promo")}>
                    Promo code{" "}
                    <span className="font-normal text-muted-foreground">
                      (optional)
                    </span>
                  </FieldLabel>
                  {promoApplied ? (
                    <div className="flex min-h-[46px] items-center justify-between gap-3 rounded-full border border-emerald-500/40 bg-emerald-500/10 py-1.5 ps-3 pe-1.5 text-emerald-700 duration-200 animate-in fade-in zoom-in-95 dark:text-emerald-300">
                      <span className="flex min-w-0 items-center gap-2 text-sm font-medium">
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                          <CheckIcon className="size-3" aria-hidden />
                        </span>
                        <span dir="ltr" className="font-mono tracking-wide">
                          {PROMO.code}
                        </span>
                        <span className="truncate">
                          applied — {PROMO.percent}% off
                        </span>
                      </span>
                      <button
                        type="button"
                        onClick={clearPromo}
                        aria-label={`Remove promo code ${PROMO.code}`}
                        className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full outline-none transition-colors hover:bg-emerald-500/20 focus-visible:ring-[3px] focus-visible:ring-emerald-500/40"
                      >
                        <XIcon className="size-4" aria-hidden />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2">
                      <div className="relative min-w-0 flex-1">
                        <TicketPercentIcon
                          aria-hidden
                          className="pointer-events-none absolute inset-y-0 start-3 my-auto size-4 text-muted-foreground"
                        />
                        <Input
                          id={id("promo")}
                          name="promo"
                          dir="ltr"
                          autoComplete="off"
                          autoCapitalize="characters"
                          placeholder="Enter code"
                          value={promoInput}
                          aria-invalid={
                            !!show("promo") || promo.state === "invalid"
                          }
                          aria-describedby={id("promo-status")}
                          className="ps-9 font-mono uppercase tracking-wide"
                          onChange={(e) => {
                            setPromoInput(e.target.value)
                            if (promo.state !== "idle")
                              setPromo({ state: "idle" })
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              applyPromo()
                            }
                          }}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        className="cursor-pointer"
                        onClick={applyPromo}
                        disabled={!promoInput.trim()}
                      >
                        Apply
                      </Button>
                    </div>
                  )}
                  <div id={id("promo-status")} aria-live="polite">
                    {promo.state === "invalid" ? (
                      <FieldError>{promo.message}</FieldError>
                    ) : promoApplied ? null : (
                      <>
                        <FieldDescription>
                          Try{" "}
                          <span dir="ltr" className="font-mono">
                            LEARN10
                          </span>{" "}
                          for 10% off in this demo.
                        </FieldDescription>
                        <FieldError>{show("promo")}</FieldError>
                      </>
                    )}
                  </div>
                </Field>
              </FieldGroup>
            </fieldset>

            {/* Summary */}
            <section
              aria-label="Enrollment summary"
              className="flex flex-col gap-4 rounded-[12px] bg-muted/40 p-4 sm:p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <h2 className="text-base font-semibold tracking-tight">
                    Order summary
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {cohort
                      ? `${cohort.name} · starts ${format(cohort.start, "d MMM yyyy")}`
                      : "Choose a cohort to see your start date"}
                  </p>
                </div>
                {levelLabel ? (
                  <Badge variant="outline">{levelLabel}</Badge>
                ) : null}
              </div>

              <dl className="flex flex-col gap-2.5" aria-live="polite">
                <MoneyRow
                  label={COURSE.title}
                  value={currency.format(COURSE.basePrice)}
                />
                {cohort && cohort.premium > 0 ? (
                  <MoneyRow
                    label={`${cohort.name} premium`}
                    value={currency.format(cohort.premium)}
                  />
                ) : null}
                {price.discount > 0 ? (
                  <MoneyRow
                    tone="discount"
                    label={`Promo ${PROMO.code} (−${PROMO.percent}%)`}
                    value={`−${currency.format(price.discount)}`}
                  />
                ) : null}
                {price.fee > 0 ? (
                  <MoneyRow
                    label={`Installment plan fee (${Math.round(PLAN_FEE * 100)}%)`}
                    value={currency.format(price.fee)}
                  />
                ) : null}
                <Separator />
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm font-medium">Total</dt>
                  <dd className="text-xl font-semibold tabular-nums tracking-tight">
                    {currency.format(price.total)}
                  </dd>
                </div>
                <MoneyRow
                  label={
                    planId === "monthly"
                      ? `Due today (1 of ${INSTALLMENTS})`
                      : "Due today"
                  }
                  value={currency.format(dueToday)}
                />
              </dl>
              {planId === "monthly" ? (
                <p className="text-xs leading-5 text-muted-foreground">
                  Then {INSTALLMENTS - 1} × {currency.format(price.installment)}{" "}
                  monthly.
                </p>
              ) : null}
            </section>

            {/* Terms + submit */}
            <div className="flex flex-col gap-4">
              <Field data-invalid={!!show("terms")}>
                <div className="flex items-start gap-3">
                  <Checkbox
                    id={id("terms")}
                    checked={terms}
                    disabled={submitting}
                    aria-invalid={!!show("terms")}
                    className="mt-0.5 cursor-pointer"
                    onCheckedChange={(value) => {
                      setTerms(value === true)
                      touch("terms")
                    }}
                  />
                  <FieldLabel
                    htmlFor={id("terms")}
                    className="cursor-pointer text-sm font-normal leading-5"
                  >
                    I understand the cohort schedule, cancellation window and
                    refund terms for this course.
                  </FieldLabel>
                </div>
                <FieldError>{show("terms")}</FieldError>
              </Field>

              {attempted && hasErrors ? (
                <FieldError role="alert">
                  Please fix the highlighted fields to continue.
                </FieldError>
              ) : null}

              <Button
                type="submit"
                size="lg"
                className="w-full cursor-pointer"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <LoaderCircleIcon className="animate-spin" aria-hidden />
                    Enrolling…
                  </>
                ) : (
                  `Enroll · ${currency.format(dueToday)} today`
                )}
              </Button>
              <p className="text-center text-xs leading-5 text-muted-foreground">
                Demo form — you won&apos;t be charged, enrolled or emailed.
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
