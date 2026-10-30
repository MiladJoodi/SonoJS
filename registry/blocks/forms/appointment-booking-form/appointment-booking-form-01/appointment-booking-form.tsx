"use client"

import * as React from "react"
import { addDays, format, startOfToday } from "date-fns"
import {
  CalendarDaysIcon,
  CheckCircle2Icon,
  ClockIcon,
  LoaderCircleIcon,
  StethoscopeIcon,
  SunIcon,
  SunsetIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@sonojs/ui/components/avatar"
import { Button } from "@sonojs/ui/components/button"
import { Calendar } from "@sonojs/ui/components/calendar"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@sonojs/ui/components/field"
import { Input } from "@sonojs/ui/components/input"
import { Textarea } from "@sonojs/ui/components/textarea"
import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/* Sample data                                                                */
/* -------------------------------------------------------------------------- */

type Service = {
  id: string
  name: string
  description: string
  duration: number // minutes
  price: number // USD
}

type Specialist = {
  id: string
  name: string
  initials: string
  role: string
  /** 0 = Sunday … 6 = Saturday */
  days: number[]
  daysLabel: string
  /** First / last (exclusive) half-hour block index worked in a day. */
  shift: [number, number]
  services: string[]
}

const SERVICES: Service[] = [
  {
    id: "consult",
    name: "Initial consultation",
    description: "Talk through symptoms and goals.",
    duration: 30,
    price: 45,
  },
  {
    id: "checkup",
    name: "Wellness check-up",
    description: "Vitals, screening and health plan.",
    duration: 30,
    price: 60,
  },
  {
    id: "physio",
    name: "Physiotherapy session",
    description: "Hands-on treatment and mobility work.",
    duration: 45,
    price: 85,
  },
  {
    id: "massage",
    name: "Deep-tissue massage",
    description: "Targeted relief for tension and recovery.",
    duration: 60,
    price: 110,
  },
]

const SPECIALISTS: Specialist[] = [
  {
    id: "okafor",
    name: "Dr. Amara Okafor",
    initials: "AO",
    role: "Physiotherapist",
    days: [1, 2, 3, 4],
    daysLabel: "Mon – Thu",
    shift: [0, 16],
    services: ["consult", "physio"],
  },
  {
    id: "reyes",
    name: "Daniel Reyes",
    initials: "DR",
    role: "Massage therapist",
    days: [2, 3, 4, 5, 6],
    daysLabel: "Tue – Sat",
    shift: [2, 18],
    services: ["massage"],
  },
  {
    id: "tan",
    name: "Dr. Mei Lin Tan",
    initials: "MT",
    role: "General practitioner",
    days: [1, 3, 5],
    daysLabel: "Mon · Wed · Fri",
    shift: [0, 12],
    services: ["consult", "checkup"],
  },
]

const DAY_LETTERS = ["S", "M", "T", "W", "T", "F", "S"]

/** Half-hour blocks from 09:00 → 18:00 (index 0 = 09:00). */
const BLOCK_COUNT = 18
/** First block index of the afternoon (12:00). */
const AFTERNOON_START = 6
const BOOKING_WINDOW_DAYS = 60
const CLOSED_DAY_OF_MONTH = 25 // clinic holiday, every month
const NOTES_MAX = 300

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

function blockLabel(index: number) {
  const minutes = 9 * 60 + index * 30
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  const suffix = h >= 12 ? "PM" : "AM"
  const h12 = h % 12 === 0 ? 12 : h % 12
  return `${h12}:${m.toString().padStart(2, "0")} ${suffix}`
}

/** Deterministic pseudo-random so the same slot is always "booked". */
function hash(input: string) {
  let h = 2166136261
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function isBlockBooked(specialistId: string, date: Date, index: number) {
  return hash(`${specialistId}|${format(date, "yyyy-MM-dd")}|${index}`) % 100 < 30
}

type Slot = { index: number; label: string; available: boolean }

function getSlots(
  specialist: Specialist | undefined,
  service: Service | undefined,
  date: Date | undefined
): Slot[] {
  if (!specialist || !service || !date) return []
  if (!specialist.days.includes(date.getDay())) return []
  if (date.getDate() === CLOSED_DAY_OF_MONTH) return []

  const needed = Math.ceil(service.duration / 30)
  const [start, end] = specialist.shift
  const slots: Slot[] = []

  for (let i = start; i < Math.min(end, BLOCK_COUNT); i += 1) {
    let available = i + needed <= end
    for (let b = i; available && b < i + needed; b += 1) {
      if (isBlockBooked(specialist.id, date, b)) available = false
    }
    slots.push({ index: i, label: blockLabel(i), available })
  }
  return slots
}

function hasOpenSlot(
  specialist: Specialist | undefined,
  service: Service | undefined,
  date: Date
) {
  return getSlots(specialist, service, date).some((s) => s.available)
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type FormErrors = Partial<
  Record<
    "service" | "specialist" | "date" | "time" | "name" | "email" | "phone" | "notes",
    string
  >
>

/* -------------------------------------------------------------------------- */
/* Small pieces                                                               */
/* -------------------------------------------------------------------------- */

function PaneLabel({
  children,
  aside,
  id,
}: {
  children: React.ReactNode
  aside?: React.ReactNode
  id?: string
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2
        id={id}
        className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
      >
        {children}
      </h2>
      {aside ? (
        <span className="text-xs tabular-nums text-muted-foreground">
          {aside}
        </span>
      ) : null}
    </div>
  )
}

function StubRow({
  label,
  value,
  muted,
}: {
  label: string
  value: React.ReactNode
  muted?: boolean
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 text-sm">
      <dt className="shrink-0 text-muted-foreground">{label}</dt>
      <dd
        className={cn(
          "min-w-0 text-end font-medium",
          muted && "font-normal text-muted-foreground"
        )}
      >
        {value}
      </dd>
    </div>
  )
}

/** Decorative barcode — pure CSS stripes, no data. */
function Barcode({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      dir="ltr"
      className={cn("h-12 w-full text-foreground", className)}
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, currentColor 0 2px, transparent 2px 5px, currentColor 5px 6px, transparent 6px 9px, currentColor 9px 12px, transparent 12px 14px, currentColor 14px 15px, transparent 15px 19px)",
      }}
    />
  )
}

/** Half-circle punches that sit on a card edge to fake a perforated ticket. */
function Notch({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute z-10 size-4 rounded-full border border-border/70 bg-canvas",
        className
      )}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* Block                                                                      */
/* -------------------------------------------------------------------------- */

export default function AppointmentBookingForm({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const uid = React.useId()
  const formId = `${uid}-form`
  const id = (name: string) => `${uid}-${name}`

  const [serviceId, setServiceId] = React.useState(SERVICES[0].id)
  const [specialistId, setSpecialistId] = React.useState(SPECIALISTS[0].id)
  const [date, setDate] = React.useState<Date | undefined>()
  const [time, setTime] = React.useState<number | null>(null)
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [notes, setNotes] = React.useState("")

  const [attempted, setAttempted] = React.useState(false)
  const [submitError, setSubmitError] = React.useState<string | null>(null)
  const [submitting, setSubmitting] = React.useState(false)
  const [reference, setReference] = React.useState<string | null>(null)

  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  React.useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    []
  )

  const today = React.useMemo(() => startOfToday(), [])
  const lastBookable = React.useMemo(
    () => addDays(today, BOOKING_WINDOW_DAYS),
    [today]
  )

  const service = SERVICES.find((s) => s.id === serviceId)
  const specialist = SPECIALISTS.find((s) => s.id === specialistId)
  const offersService = !!specialist && specialist.services.includes(serviceId)

  /* Derived availability ---------------------------------------------------- */

  const isDateUnavailable = React.useCallback(
    (d: Date) =>
      d < today ||
      d > lastBookable ||
      !hasOpenSlot(specialist, service, d),
    [today, lastBookable, specialist, service]
  )

  const slots = React.useMemo(
    () => getSlots(specialist, service, date),
    [specialist, service, date]
  )
  const dateConflict = !!date && isDateUnavailable(date)
  const selectedSlot = slots.find((s) => s.index === time)
  const slotValid = !!selectedSlot?.available && !dateConflict
  const slotLost = time !== null && !slotValid
  const openCount = slots.filter((s) => s.available).length

  /* Validation -------------------------------------------------------------- */

  const errors = React.useMemo<FormErrors>(() => {
    const next: FormErrors = {}
    if (!service) next.service = "Choose a service."
    if (!specialist || !offersService)
      next.specialist = "Choose a specialist who offers this service."
    if (!date) next.date = "Pick an appointment date."
    else if (dateConflict)
      next.date = `${specialist?.name ?? "This specialist"} has no openings on that day. Pick another date.`
    if (time === null) next.time = date && !dateConflict ? "Select a time slot." : undefined
    else if (!slotValid)
      next.time = "That time slot is no longer available. Please choose another."
    if (name.trim().length < 2) next.name = "Enter your full name."
    if (!EMAIL_RE.test(email.trim())) next.email = "Enter a valid email address."
    const digits = phone.replace(/\D/g, "")
    if (digits.length < 7 || digits.length > 15)
      next.phone = "Enter a valid phone number (7–15 digits)."
    if (notes.length > NOTES_MAX)
      next.notes = `Notes must be ${NOTES_MAX} characters or fewer.`
    return next
  }, [
    service,
    specialist,
    offersService,
    date,
    dateConflict,
    time,
    slotValid,
    name,
    email,
    phone,
    notes,
  ])

  const hasErrors = Object.values(errors).some(Boolean)
  const show = (key: keyof FormErrors) =>
    (attempted || (key === "date" && dateConflict) || (key === "time" && slotLost)) &&
    errors[key]
      ? errors[key]
      : undefined

  /* Handlers ---------------------------------------------------------------- */

  function selectService(next: Service) {
    setServiceId(next.id)
    setSubmitError(null)
    // Keep a valid specialist: swap to the first one who offers the new service.
    if (!specialist || !specialist.services.includes(next.id)) {
      const fallback = SPECIALISTS.find((s) => s.services.includes(next.id))
      if (fallback) setSpecialistId(fallback.id)
    }
    setTime(null)
  }

  function selectSpecialist(next: Specialist) {
    if (!next.services.includes(serviceId)) return
    setSpecialistId(next.id)
    setSubmitError(null)
    setTime(null)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAttempted(true)
    setSubmitError(null)
    if (hasErrors || submitting) return

    setSubmitting(true)
    timer.current = setTimeout(() => {
      // Re-check the slot at "confirm" time, as a real API would.
      const stillOpen = getSlots(specialist, service, date).some(
        (s) => s.index === time && s.available
      )
      setSubmitting(false)
      if (!stillOpen) {
        setSubmitError(
          "Sorry, that slot was just taken. Please choose another time."
        )
        setTime(null)
        return
      }
      setReference(`APT-${Math.floor(1000 + Math.random() * 9000)}`)
    }, 700)
  }

  function handleReset() {
    if (timer.current) clearTimeout(timer.current)
    setServiceId(SERVICES[0].id)
    setSpecialistId(SPECIALISTS[0].id)
    setDate(undefined)
    setTime(null)
    setName("")
    setEmail("")
    setPhone("")
    setNotes("")
    setAttempted(false)
    setSubmitError(null)
    setSubmitting(false)
    setReference(null)
  }

  /* Render ------------------------------------------------------------------ */

  const dateLabel = date ? format(date, "EEE, d MMM yyyy") : null
  const timeLabel = slotValid && selectedSlot ? selectedSlot.label : null
  const ready = !!service && offersService && !!date && !!timeLabel

  const dockSummary = ready
    ? [
        service?.name,
        specialist?.name,
        format(date!, "d MMM"),
        timeLabel,
      ].join(" · ")
    : "Pick a day and time to continue"

  const groups = [
    {
      key: "morning",
      label: "Morning",
      icon: SunIcon,
      items: slots.filter((s) => s.index < AFTERNOON_START),
    },
    {
      key: "afternoon",
      label: "Afternoon",
      icon: SunsetIcon,
      items: slots.filter((s) => s.index >= AFTERNOON_START),
    },
  ].filter((g) => g.items.length > 0)

  const submitContent = submitting ? (
    <>
      <LoaderCircleIcon className="animate-spin" aria-hidden />
      Confirming…
    </>
  ) : (
    "Confirm appointment"
  )

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas px-4 py-10 text-foreground sm:px-6 sm:py-14",
        className
      )}
      aria-labelledby={id("heading")}
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl">
        {reference ? (
          /* ----------------------------- Success ticket ---------------------------- */
          <div
            role="status"
            className="relative mx-auto flex w-full max-w-3xl flex-col rounded-[12px] border border-border/70 bg-card shadow-soft sm:flex-row"
          >
            <Notch className="-top-2 end-[calc(14rem-0.5rem)] hidden sm:block" />
            <Notch className="-bottom-2 end-[calc(14rem-0.5rem)] hidden sm:block" />
            <div className="flex min-w-0 flex-1 flex-col gap-6 p-6 text-start sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CheckCircle2Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h1
                    id={id("heading")}
                    className="text-lg font-semibold leading-6 tracking-tight"
                  >
                    You&apos;re on the schedule
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Meridian Wellness Clinic
                  </p>
                </div>
              </div>

              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm [&>div]:min-w-0 [&_dd]:break-words">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                    Patient
                  </dt>
                  <dd className="mt-1 font-medium">{name.trim()}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                    Service
                  </dt>
                  <dd className="mt-1 font-medium">{service?.name}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                    Specialist
                  </dt>
                  <dd className="mt-1 font-medium">{specialist?.name}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                    When
                  </dt>
                  <dd className="mt-1 font-medium">
                    {dateLabel} · {timeLabel}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                    Duration
                  </dt>
                  <dd className="mt-1 font-medium">
                    <bdi>{service?.duration} min</bdi>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                    Due at visit
                  </dt>
                  <dd className="mt-1 font-medium tabular-nums">
                    {service ? currency.format(service.price) : "—"}
                  </dd>
                </div>
              </dl>

              <p className="text-pretty text-sm leading-6 text-muted-foreground">
                This is a demo — nothing has actually been booked and no email
                was sent. The reference is for illustration only.
              </p>
            </div>

            <div className="flex flex-col items-center justify-between gap-5 border-t border-dashed border-border p-6 sm:w-56 sm:shrink-0 sm:border-s sm:border-t-0 sm:p-8">
              <div className="flex w-full flex-col items-center gap-1.5 text-center">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  Reference
                </span>
                <span
                  dir="ltr"
                  className="font-mono text-2xl font-semibold tracking-widest"
                >
                  {reference}
                </span>
              </div>
              <Barcode />
              <Button
                type="button"
                variant="outline"
                className="w-full cursor-pointer"
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
          </div>
        ) : (
          /* ------------------------------ Schedule board --------------------------- */
          <form
            id={formId}
            noValidate
            onSubmit={handleSubmit}
            className="relative w-full rounded-[12px] border border-border/70 bg-card shadow-soft"
          >
            {/* Top bar: clinic + service switcher */}
            <header className="flex flex-col gap-4 rounded-t-[12px] border-b border-border/70 bg-muted/30 p-5 sm:px-8">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="text-start">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                    <StethoscopeIcon className="size-4" aria-hidden />
                    Meridian Wellness Clinic
                  </p>
                  <h1
                    id={id("heading")}
                    className="mt-1 text-balance text-2xl font-semibold tracking-tight"
                  >
                    Schedule a visit
                  </h1>
                </div>
                <p className="max-w-xs text-pretty text-xs leading-5 text-muted-foreground sm:text-end">
                  Demo board — nothing is sent or booked.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <span
                  id={id("service-label")}
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Service
                </span>
                <div
                  role="radiogroup"
                  aria-labelledby={id("service-label")}
                  className="-mx-1 -mt-1 flex gap-2 overflow-x-auto px-1 pb-1 pt-1"
                >
                  {SERVICES.map((item) => {
                    const checked = item.id === serviceId
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="radio"
                        aria-checked={checked}
                        title={item.description}
                        onClick={() => selectService(item)}
                        className={cn(
                          "flex min-h-[46px] shrink-0 cursor-pointer flex-col justify-center rounded-full border px-4 py-1.5 text-start outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/40",
                          checked
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border/70 bg-card hover:bg-muted"
                        )}
                      >
                        <span className="text-sm font-medium leading-5">
                          {item.name}
                        </span>
                        <span
                          className={cn(
                            "text-xs leading-4 tabular-nums",
                            checked
                              ? "text-primary-foreground/80"
                              : "text-muted-foreground"
                          )}
                        >
                          <bdi>
                            {item.duration} min · {currency.format(item.price)}
                          </bdi>
                        </span>
                      </button>
                    )
                  })}
                </div>
                <FieldError>{show("service")}</FieldError>
              </div>
            </header>

            {/* Board */}
            <div className="grid grid-cols-1 lg:grid-cols-[17rem_minmax(0,1fr)_19rem]">
              {/* Specialists */}
              <div className="flex flex-col gap-3 border-b border-border/70 p-5 sm:px-8 lg:border-b-0 lg:border-e lg:px-5">
                <PaneLabel
                  id={id("specialist-label")}
                  aside={
                    <bdi>
                      {`${SPECIALISTS.filter((s) => s.services.includes(serviceId)).length} available`}
                    </bdi>
                  }
                >
                  Specialist
                </PaneLabel>
                <div
                  role="radiogroup"
                  aria-labelledby={id("specialist-label")}
                  className="flex flex-col gap-2"
                >
                  {SPECIALISTS.map((item) => {
                    const checked = item.id === specialistId
                    const offers = item.services.includes(serviceId)
                    const open = date
                      ? getSlots(item, service, date).filter((s) => s.available)
                          .length
                      : null

                    let status: string
                    if (!offers) status = "Not offered"
                    else if (open === null) status = item.daysLabel
                    else if (open > 0) status = `${open} open`
                    else status = "Unavailable"

                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="radio"
                        aria-checked={checked}
                        disabled={!offers}
                        onClick={() => selectSpecialist(item)}
                        className={cn(
                          "flex w-full cursor-pointer items-start gap-3 rounded-[12px] border p-3 text-start outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50",
                          checked
                            ? "border-primary bg-primary/5 dark:bg-primary/10"
                            : "border-border/70 bg-card enabled:hover:bg-muted/50"
                        )}
                      >
                        <Avatar className="size-10">
                          <AvatarFallback
                            className={cn(
                              "text-sm font-semibold",
                              checked
                                ? "bg-primary text-primary-foreground"
                                : "bg-primary/10 text-primary"
                            )}
                          >
                            {item.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="flex min-w-0 flex-1 flex-col">
                          <span className="truncate text-sm font-semibold leading-5">
                            {item.name}
                          </span>
                          <span className="truncate text-xs leading-5 text-muted-foreground">
                            {item.role}
                          </span>
                          <span className="mt-2 flex flex-wrap items-end justify-between gap-x-2 gap-y-1">
                            <span className="flex items-end gap-0.5">
                              <span className="sr-only">
                                Works {item.daysLabel}
                              </span>
                              {DAY_LETTERS.map((letter, day) => {
                                const works = item.days.includes(day)
                                const onSelected = date?.getDay() === day
                                return (
                                  <span
                                    key={day}
                                    aria-hidden
                                    className="flex w-3.5 flex-col items-center gap-0.5"
                                  >
                                    <span
                                      className={cn(
                                        "size-1.5 rounded-full",
                                        works ? "bg-primary" : "bg-border",
                                        onSelected &&
                                          "ring-2 ring-primary/30 ring-offset-1 ring-offset-card"
                                      )}
                                    />
                                    <span
                                      className={cn(
                                        "text-[9px] leading-3",
                                        onSelected
                                          ? "font-semibold text-foreground"
                                          : "text-muted-foreground"
                                      )}
                                    >
                                      {letter}
                                    </span>
                                  </span>
                                )
                              })}
                            </span>
                            <span
                              className={cn(
                                "shrink-0 pb-0.5 text-[11px] font-medium leading-3 tabular-nums",
                                open !== null && open > 0 && offers
                                  ? "text-primary"
                                  : "text-muted-foreground"
                              )}
                            >
                              <bdi>{status}</bdi>
                            </span>
                          </span>
                        </span>
                      </button>
                    )
                  })}
                </div>
                <FieldError>{show("specialist")}</FieldError>
              </div>

              {/* Calendar + slots */}
              <div className="flex min-w-0 flex-col gap-5 p-5 sm:px-8 lg:px-6">
                <div className="flex flex-col gap-3">
                  <PaneLabel
                    aside={
                      date ? format(date, "EEEE, d MMMM") : "Next 60 days"
                    }
                  >
                    Date
                  </PaneLabel>
                  <div
                    className={cn(
                      "rounded-[12px] border bg-background/60 p-3",
                      show("date") ? "border-destructive/60" : "border-border/70"
                    )}
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      defaultMonth={date ?? today}
                      startMonth={today}
                      endMonth={lastBookable}
                      disabled={isDateUnavailable}
                      onSelect={(next) => {
                        setDate(next)
                        setTime(null)
                        setSubmitError(null)
                      }}
                      className="mx-auto w-full max-w-[22rem] bg-transparent p-0"
                      classNames={{ root: "rdp-root w-full" }}
                    />
                  </div>
                  <FieldError>{show("date")}</FieldError>
                </div>

                <div className="flex flex-col gap-3">
                  <PaneLabel
                    id={id("time-label")}
                    aside={
                      date && !dateConflict
                        ? `${openCount} of ${slots.length} open`
                        : undefined
                    }
                  >
                    Time
                  </PaneLabel>
                  {!date || dateConflict || slots.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 rounded-[12px] border border-dashed border-border/70 px-4 py-8 text-center">
                      <span className="flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        {date ? (
                          <ClockIcon className="size-4" aria-hidden />
                        ) : (
                          <CalendarDaysIcon className="size-4" aria-hidden />
                        )}
                      </span>
                      <p className="text-sm font-medium">
                        {dateConflict
                          ? "No openings that day"
                          : "No date selected"}
                      </p>
                      <p className="max-w-xs text-pretty text-xs leading-5 text-muted-foreground">
                        {dateConflict
                          ? `${specialist?.name ?? "This specialist"} isn't available on the selected day. Try another date.`
                          : `Choose a day above to see ${specialist?.name ?? "the specialist"}'s open times.`}
                      </p>
                    </div>
                  ) : (
                    <div
                      role="group"
                      aria-labelledby={id("time-label")}
                      className="flex flex-col gap-4"
                    >
                      {groups.map((group) => (
                        <div key={group.key} className="flex flex-col gap-2">
                          <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                            <group.icon className="size-3.5" aria-hidden />
                            {group.label}
                          </p>
                          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 xl:grid-cols-5">
                            {group.items.map((slot) => {
                              const active = slot.index === time
                              return (
                                <button
                                  key={slot.index}
                                  type="button"
                                  disabled={!slot.available}
                                  aria-pressed={active}
                                  onClick={() => {
                                    setTime(slot.index)
                                    setSubmitError(null)
                                  }}
                                  className={cn(
                                    "h-[46px] cursor-pointer rounded-md border px-1 text-xs font-medium tabular-nums outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/40",
                                    "disabled:cursor-not-allowed disabled:border-transparent disabled:bg-muted/40 disabled:text-muted-foreground/60 disabled:line-through",
                                    active
                                      ? "border-primary bg-primary text-primary-foreground"
                                      : "border-border/70 bg-card enabled:hover:border-primary/50 enabled:hover:bg-primary/5"
                                  )}
                                >
                                  {slot.label}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <FieldError>{show("time")}</FieldError>
                </div>
              </div>

              {/* Ticket stub rail (desktop) */}
              <aside
                aria-label="Booking summary"
                className="relative hidden border-s border-dashed border-border lg:row-span-2 lg:col-start-3 lg:row-start-1 lg:flex"
              >
                <div className="sticky top-6 flex w-full flex-col gap-5 self-start p-6">
                  <div className="text-start">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Your visit
                    </p>
                    <p className="mt-1 text-lg font-semibold leading-6 tracking-tight">
                      {service?.name ?? "—"}
                    </p>
                  </div>

                  <dl className="flex flex-col gap-2.5" aria-live="polite">
                    <StubRow
                      label="Specialist"
                      value={offersService ? specialist?.name : "—"}
                    />
                    <StubRow
                      label="Date"
                      value={dateLabel ?? "Not selected"}
                      muted={!dateLabel}
                    />
                    <StubRow
                      label="Time"
                      value={timeLabel ?? "Not selected"}
                      muted={!timeLabel}
                    />
                    <StubRow
                      label="Duration"
                      value={service ? `${service.duration} min` : "—"}
                    />
                  </dl>

                  <div className="border-t border-dashed border-border pt-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm text-muted-foreground">
                        Due at visit
                      </span>
                      <span className="text-3xl font-semibold tabular-nums tracking-tight">
                        {service ? currency.format(service.price) : "—"}
                      </span>
                    </div>
                  </div>

                  <Barcode className="h-8 opacity-60" />

                  {submitError ? (
                    <FieldError className="rounded-md bg-destructive/10 px-3 py-2">
                      {submitError}
                    </FieldError>
                  ) : null}
                  {attempted && hasErrors ? (
                    <FieldError>
                      Please fix the highlighted fields to continue.
                    </FieldError>
                  ) : null}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full cursor-pointer"
                    disabled={submitting}
                  >
                    {submitContent}
                  </Button>
                  <p className="text-center text-xs leading-5 text-muted-foreground">
                    Demo form — nothing is sent or booked.
                  </p>
                </div>
              </aside>

              {/* Patient details */}
              <fieldset className="flex min-w-0 flex-col gap-4 border-t border-border/70 p-5 sm:px-8 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-6 lg:py-6">
                <legend className="sr-only">Your details</legend>
                <PaneLabel>Patient details</PaneLabel>
                <FieldGroup className="gap-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Field data-invalid={!!show("name")}>
                      <FieldLabel htmlFor={id("name")}>
                        Full name <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Input
                        id={id("name")}
                        name="name"
                        autoComplete="name"
                        placeholder="Jordan Lee"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        aria-invalid={!!show("name")}
                      />
                      <FieldError>{show("name")}</FieldError>
                    </Field>
                    <Field data-invalid={!!show("email")}>
                      <FieldLabel htmlFor={id("email")}>
                        Email <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Input
                        id={id("email")}
                        name="email"
                        type="email"
                        dir="ltr"
                        autoComplete="email"
                        placeholder="jordan@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={!!show("email")}
                      />
                      <FieldError>{show("email")}</FieldError>
                    </Field>
                    <Field data-invalid={!!show("phone")}>
                      <FieldLabel htmlFor={id("phone")}>
                        Phone <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Input
                        id={id("phone")}
                        name="phone"
                        type="tel"
                        dir="ltr"
                        autoComplete="tel"
                        placeholder="+1 555 0100"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        aria-invalid={!!show("phone")}
                      />
                      <FieldError>{show("phone")}</FieldError>
                    </Field>
                  </div>

                  <Field data-invalid={!!show("notes")}>
                    <FieldLabel htmlFor={id("notes")}>
                      Notes{" "}
                      <span className="font-normal text-muted-foreground">
                        (optional)
                      </span>
                    </FieldLabel>
                    <Textarea
                      id={id("notes")}
                      name="notes"
                      rows={3}
                      placeholder="Anything the specialist should know beforehand…"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      aria-invalid={!!show("notes")}
                    />
                    <div className="flex items-start justify-between gap-3">
                      <FieldDescription>
                        Allergies, injuries or accessibility needs.
                      </FieldDescription>
                      <span
                        className={cn(
                          "shrink-0 text-xs tabular-nums text-muted-foreground",
                          notes.length > NOTES_MAX && "text-destructive"
                        )}
                      >
                        {notes.length}/{NOTES_MAX}
                      </span>
                    </div>
                    <FieldError>{show("notes")}</FieldError>
                  </Field>
                </FieldGroup>
              </fieldset>
            </div>

            {/* Mobile dock */}
            <div className="sticky bottom-0 z-20 flex flex-col gap-2 rounded-b-[12px] border-t border-border/70 bg-card/95 p-3 backdrop-blur supports-[backdrop-filter]:bg-card/85 lg:hidden">
              {submitError ? (
                <FieldError className="rounded-md bg-destructive/10 px-3 py-2">
                  {submitError}
                </FieldError>
              ) : null}
              {attempted && hasErrors ? (
                <FieldError>
                  Please fix the highlighted fields to continue.
                </FieldError>
              ) : null}
              <div className="flex items-center gap-3">
                <div className="min-w-0 flex-1 text-start" aria-live="polite">
                  <p
                    className={cn(
                      "truncate text-xs leading-5",
                      ready ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {dockSummary}
                  </p>
                  <p className="text-sm font-semibold tabular-nums">
                    {service ? currency.format(service.price) : "—"}
                    <span className="ms-1.5 text-xs font-normal text-muted-foreground">
                      demo only
                    </span>
                  </p>
                </div>
                <Button
                  type="submit"
                  className="shrink-0 cursor-pointer"
                  disabled={submitting}
                >
                  {submitContent}
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
