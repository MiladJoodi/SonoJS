"use client"

import * as React from "react"
import {
  CalendarDaysIcon,
  CheckIcon,
  ClockIcon,
  MapPinIcon,
  MinusIcon,
  PlusIcon,
  ScanLineIcon,
  TicketIcon,
  type LucideIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
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
import { Spinner } from "@sonojs/ui/components/spinner"
import { Textarea } from "@sonojs/ui/components/textarea"
import { cn } from "@/lib/utils"

import eventCover from "./images/event-cover.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

/* -------------------------------------------------------------------------- */
/* Config                                                                      */
/* -------------------------------------------------------------------------- */

const EVENT = {
  title: "Northlight Design Systems Summit",
  shortTitle: "Northlight Summit 2026",
  date: "Sat, 21 Nov 2026",
  time: "9:00 AM – 6:00 PM",
  location: "Harbor Hall, Rotterdam",
  address: "120 Pier Street, Rotterdam",
  description:
    "One day of talks, workshops, and hallway conversations on building design systems that teams actually adopt.",
} as const

const TICKETS = [
  {
    id: "general",
    name: "General Admission",
    price: 49,
    badge: null,
    benefits: ["All keynotes and talks", "Lunch and coffee", "Event swag bag"],
  },
  {
    id: "vip",
    name: "VIP",
    price: 149,
    badge: "Most popular",
    benefits: [
      "Everything in General",
      "Front-row reserved seating",
      "Speaker dinner on Friday",
      "Recordings and slide decks",
    ],
  },
  {
    id: "student",
    name: "Student",
    price: 19,
    badge: "ID required",
    benefits: [
      "All keynotes and talks",
      "Lunch and coffee",
      "Valid student ID at check-in",
    ],
  },
] as const

type TicketId = (typeof TICKETS)[number]["id"]

const MAX_TICKETS = 5

const DIETARY = [
  { value: "none", label: "No requirements" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "gluten-free", label: "Gluten-free" },
  { value: "halal", label: "Halal" },
  { value: "kosher", label: "Kosher" },
  { value: "other", label: "Other (tell us below)" },
] as const

const HEARD = [
  { value: "colleague", label: "A friend or colleague" },
  { value: "social", label: "Social media" },
  { value: "newsletter", label: "Newsletter" },
  { value: "search", label: "Search engine" },
  { value: "speaker", label: "A speaker or sponsor" },
  { value: "other", label: "Somewhere else" },
] as const

type Attendee = { name: string; email: string; company: string }
type Status = "idle" | "loading" | "success"

const EMPTY_ATTENDEE: Attendee = { name: "", email: "", company: "" }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
})

function formatPrice(value: number) {
  return currency.format(value)
}

function validate(attendees: Attendee[]) {
  const errors: Record<string, string> = {}
  const seen = new Map<string, number>()

  attendees.forEach((attendee, index) => {
    const name = attendee.name.trim()
    const email = attendee.email.trim().toLowerCase()

    if (!name) {
      errors[`a${index}-name`] = "Enter the attendee's full name."
    }

    if (!email) {
      errors[`a${index}-email`] = "Enter an email address."
    } else if (!EMAIL_PATTERN.test(email)) {
      errors[`a${index}-email`] = "Enter a valid email address."
    } else if (seen.has(email)) {
      errors[`a${index}-email`] =
        "Each attendee needs their own email address."
    } else {
      seen.set(email, index)
    }
  })

  return errors
}

function makeReference() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let code = ""
  for (let i = 0; i < 4; i += 1) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)]
  }
  return `EVT-${code}`
}

/* -------------------------------------------------------------------------- */
/* Decorative helpers                                                          */
/* -------------------------------------------------------------------------- */

const QR_SIZE = 11

/** Deterministic QR-looking pattern seeded from the reference. Decorative only. */
function qrPattern(seed: string) {
  let hash = 2166136261
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  const inFinder = (x: number, y: number) =>
    (x < 3 && y < 3) ||
    (x >= QR_SIZE - 3 && y < 3) ||
    (x < 3 && y >= QR_SIZE - 3)

  const cells: boolean[] = []
  for (let y = 0; y < QR_SIZE; y += 1) {
    for (let x = 0; x < QR_SIZE; x += 1) {
      if (inFinder(x, y)) {
        const lx = x < 3 ? x : x - (QR_SIZE - 3)
        const ly = y < 3 ? y : y - (QR_SIZE - 3)
        cells.push(!(lx === 1 && ly === 1))
      } else {
        hash = Math.imul(hash ^ (hash >>> 13), 1274126177)
        cells.push(((hash >>> 16) & 3) !== 0)
      }
    }
  }
  return cells
}

function QrPattern({ seed, className }: { seed: string; className?: string }) {
  const cells = React.useMemo(() => qrPattern(seed), [seed])
  return (
    <div
      aria-hidden
      dir="ltr"
      className={cn(
        "grid aspect-square w-28 shrink-0 gap-px rounded-md border border-border/70 bg-background p-2",
        className
      )}
      style={{ gridTemplateColumns: `repeat(${QR_SIZE}, minmax(0, 1fr))` }}
    >
      {cells.map((on, index) => (
        <span
          key={index}
          className={cn("aspect-square", on ? "bg-foreground" : "bg-transparent")}
        />
      ))}
    </div>
  )
}

const BARS = [2, 1, 3, 1, 1, 2, 4, 1, 2, 1, 3, 2, 1, 1, 4, 2, 1, 3, 1, 2, 2, 1, 3, 1, 4, 1, 2, 1, 1, 3, 2, 1]

function Barcode({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      dir="ltr"
      className={cn("flex h-9 items-stretch gap-[2px] overflow-hidden", className)}
    >
      {BARS.map((width, index) => (
        <span
          key={index}
          className={cn(
            "shrink-0",
            index % 2 === 0 ? "bg-foreground/80" : "bg-transparent"
          )}
          style={{ width: `${width * 2}px` }}
        />
      ))}
    </div>
  )
}

/** Half-circle cut-outs that make a card read as a torn ticket. */
function Notch({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute size-4 rounded-full border border-border/70 bg-canvas",
        className
      )}
    />
  )
}

function RequiredMark() {
  return (
    <span className="text-destructive" aria-hidden>
      *
    </span>
  )
}

function SectionHeading({
  index,
  title,
  description,
  optional,
}: {
  index: string
  title: string
  description?: string
  optional?: boolean
}) {
  return (
    <div className="flex items-start gap-3 text-start">
      <span
        aria-hidden
        className="flex h-7 min-w-9 items-center justify-center rounded-md border border-dashed border-primary/50 bg-primary/5 px-2 font-mono text-xs font-semibold text-primary"
      >
        {index}
      </span>
      <div className="flex min-w-0 flex-col gap-0.5">
        <h2 className="text-base font-semibold leading-7">
          {title}
          {optional ? (
            <span className="ms-2 text-sm font-normal text-muted-foreground">
              (optional)
            </span>
          ) : null}
        </h2>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
    </div>
  )
}

function EventChip({
  icon: Icon,
  children,
}: {
  icon: LucideIcon
  children: React.ReactNode
}) {
  return (
    <li className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-xs font-medium text-white ring-1 ring-white/20 backdrop-blur-md sm:text-sm">
      <Icon className="size-3.5 shrink-0" aria-hidden />
      <span>{children}</span>
    </li>
  )
}

/* -------------------------------------------------------------------------- */
/* Form                                                                        */
/* -------------------------------------------------------------------------- */

export default function EventRegistrationForm({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const uid = React.useId()
  const formRef = React.useRef<HTMLFormElement>(null)

  const [ticketId, setTicketId] = React.useState<TicketId>("general")
  const [quantity, setQuantity] = React.useState(1)
  const [attendees, setAttendees] = React.useState<Attendee[]>([
    { ...EMPTY_ATTENDEE },
  ])
  const [dietary, setDietary] = React.useState("")
  const [dietaryNotes, setDietaryNotes] = React.useState("")
  const [heard, setHeard] = React.useState("")
  const [touched, setTouched] = React.useState<Record<string, boolean>>({})
  const [submitted, setSubmitted] = React.useState(false)
  const [status, setStatus] = React.useState<Status>("idle")
  const [reference, setReference] = React.useState("")

  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const ticket = TICKETS.find((item) => item.id === ticketId) ?? TICKETS[0]
  const subtotal = ticket.price * quantity
  const errors = React.useMemo(() => validate(attendees), [attendees])
  const visibleError = (key: string) =>
    submitted || touched[key] ? errors[key] : undefined
  const loading = status === "loading"

  function touch(key: string) {
    setTouched((prev) => (prev[key] ? prev : { ...prev, [key]: true }))
  }

  function changeQuantity(next: number) {
    const value = Math.min(MAX_TICKETS, Math.max(1, next))
    setQuantity(value)
    setAttendees((prev) =>
      Array.from({ length: value }, (_, i) => prev[i] ?? { ...EMPTY_ATTENDEE })
    )
  }

  function updateAttendee(index: number, patch: Partial<Attendee>) {
    setAttendees((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...patch } : item))
    )
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (loading) return

    setSubmitted(true)
    if (Object.keys(errors).length > 0) {
      requestAnimationFrame(() => {
        formRef.current
          ?.querySelector<HTMLElement>("[aria-invalid='true']")
          ?.focus()
      })
      return
    }

    setStatus("loading")
    timerRef.current = setTimeout(() => {
      setReference(makeReference())
      setStatus("success")
    }, 1400)
  }

  function handleReset() {
    setTicketId("general")
    setQuantity(1)
    setAttendees([{ ...EMPTY_ATTENDEE }])
    setDietary("")
    setDietaryNotes("")
    setHeard("")
    setTouched({})
    setSubmitted(false)
    setReference("")
    setStatus("idle")
  }

  const headingId = `${uid}-heading`
  const primaryEmail = attendees[0]?.email.trim()

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas px-4 py-10 text-foreground sm:px-6 sm:py-14",
        className
      )}
      aria-labelledby={headingId}
      {...props}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        {/* ------------------------------ Hero ------------------------------ */}
        <article className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
          <div className="relative isolate flex min-h-72 flex-col justify-end overflow-hidden bg-muted sm:min-h-80">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={assetSrc(eventCover)}
              alt="Abstract gradient artwork for the Northlight Design Systems Summit"
              className="absolute inset-0 -z-20 size-full object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/35 to-black/5"
            />
            <div className="flex flex-col gap-4 p-6 text-start text-white sm:p-8">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium tracking-wide ring-1 ring-white/25 backdrop-blur-md">
                <TicketIcon className="size-3.5" aria-hidden />
                Registration open
              </span>
              <h1
                id={headingId}
                className="max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                {EVENT.title}
              </h1>
              <ul className="flex flex-wrap gap-2">
                <EventChip icon={CalendarDaysIcon}>{EVENT.date}</EventChip>
                <EventChip icon={ClockIcon}>
                  <bdi dir="ltr">{EVENT.time}</bdi>
                </EventChip>
                <EventChip icon={MapPinIcon}>{EVENT.location}</EventChip>
              </ul>
            </div>
          </div>

          {/* Perforated stub strip */}
          <div className="relative border-t border-dashed border-border px-6 py-4 text-start sm:px-8">
            <Notch className="start-0 top-0 -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2" />
            <Notch className="end-0 top-0 translate-x-1/2 -translate-y-1/2 rtl:-translate-x-1/2" />
            <p className="max-w-3xl text-pretty text-sm leading-6 text-muted-foreground">
              {EVENT.description}{" "}
              <span className="text-foreground/70">{EVENT.address}.</span>
            </p>
          </div>
        </article>

        {status === "success" ? (
          <div
            role="status"
            className="mx-auto flex w-full max-w-md flex-col items-center gap-4"
          >
            <div className="relative w-full overflow-hidden rounded-[12px] border border-border/70 bg-card text-start shadow-soft">
              <div className="flex justify-center pt-3">
                <span
                  aria-hidden
                  className="h-2 w-16 rounded-full border border-border/70 bg-canvas"
                />
              </div>
              <div className="mx-4 mt-3 flex items-center justify-between gap-3 rounded-md bg-primary px-4 py-2.5 text-primary-foreground">
                <span className="text-xs font-semibold uppercase tracking-widest">
                  {EVENT.shortTitle}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-medium">
                  <CheckIcon className="size-3.5" aria-hidden />
                  Confirmed
                </span>
              </div>

              <div className="flex flex-col items-center gap-1 px-6 pb-5 pt-6 text-center">
                <h2 className="text-balance text-2xl font-semibold tracking-tight">
                  {attendees[0]?.name.trim() || "Attendee"}
                </h2>
                {attendees[0]?.company.trim() ? (
                  <p className="text-sm text-muted-foreground">
                    {attendees[0].company.trim()}
                  </p>
                ) : null}
                <Badge variant="secondary" className="mt-2">
                  {ticket.name}
                  {quantity > 1 ? ` · ${quantity} tickets` : ""}
                </Badge>
              </div>

              <div className="relative border-t border-dashed border-border">
                <Notch className="start-0 top-0 -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2" />
                <Notch className="end-0 top-0 translate-x-1/2 -translate-y-1/2 rtl:-translate-x-1/2" />
                <div className="flex items-center justify-between gap-4 px-6 py-5">
                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Badge ID
                    </span>
                    <span
                      dir="ltr"
                      className="break-all font-mono text-2xl font-semibold tracking-wider"
                    >
                      {reference}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Simulated reference
                    </span>
                  </div>
                  <QrPattern seed={reference} />
                </div>
              </div>

              <dl className="flex flex-col gap-2 border-t border-border/70 px-6 py-4 text-sm">
                {quantity > 1 ? (
                  <div className="flex items-start justify-between gap-4">
                    <dt className="text-muted-foreground">Attendees</dt>
                    <dd className="min-w-0 break-words text-end font-medium">
                      {attendees.map((a) => a.name.trim()).join(", ")}
                    </dd>
                  </div>
                ) : null}
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted-foreground">Date</dt>
                  <dd className="font-medium">{EVENT.date}</dd>
                </div>
                <div className="flex items-center justify-between gap-4 text-base">
                  <dt className="font-semibold">Total</dt>
                  <dd className="font-semibold tabular-nums">
                    {formatPrice(subtotal)}
                  </dd>
                </div>
              </dl>
            </div>

            <p className="text-center text-sm leading-6 text-muted-foreground">
              This is a demo confirmation. No real registration was made and no
              email was sent{primaryEmail ? ` to ${primaryEmail}` : ""}.
            </p>
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={handleReset}
            >
              Start a new demo registration
            </Button>
          </div>
        ) : (
          <form
            ref={formRef}
            noValidate
            onSubmit={handleSubmit}
            className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px]"
          >
            <div className="flex min-w-0 flex-col gap-10">
              {/* ---------------------------- 01 Tickets ---------------------------- */}
              <fieldset
                className="flex min-w-0 flex-col gap-5"
                disabled={loading}
              >
                <legend className="sr-only">Choose your ticket</legend>
                <SectionHeading
                  index="01"
                  title="Choose your ticket"
                  description="Pick a ticket type, then how many you need."
                />

                <RadioGroup
                  value={ticketId}
                  onValueChange={(value) => setTicketId(value as TicketId)}
                  aria-label="Ticket type"
                  className="grid grid-cols-1 gap-4"
                >
                  {TICKETS.map((item) => {
                    const selected = item.id === ticketId
                    const inputId = `${uid}-ticket-${item.id}`
                    return (
                      <label
                        key={item.id}
                        htmlFor={inputId}
                        className={cn(
                          "group/ticket relative flex cursor-pointer overflow-hidden rounded-[12px] border border-border/70 bg-card text-start shadow-soft transition-shadow hover:shadow-md has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/40",
                          selected && "ring-2 ring-primary"
                        )}
                      >
                        <Notch className="end-28 top-0 translate-x-1/2 -translate-y-1/2 rtl:-translate-x-1/2" />
                        <Notch className="end-28 bottom-0 translate-x-1/2 translate-y-1/2 rtl:-translate-x-1/2" />

                        <div className="flex min-w-0 flex-1 flex-col gap-3 p-4 sm:p-5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-base font-semibold">
                              {item.name}
                            </span>
                            {item.badge ? (
                              <Badge
                                variant={
                                  item.id === "vip" ? "default" : "secondary"
                                }
                              >
                                {item.badge}
                              </Badge>
                            ) : null}
                          </div>
                          <ul className="grid grid-cols-1 gap-x-4 gap-y-1.5 text-sm text-muted-foreground sm:grid-cols-2">
                            {item.benefits.map((benefit) => (
                              <li
                                key={benefit}
                                className="flex items-start gap-2"
                              >
                                <CheckIcon
                                  className="mt-1 size-3.5 shrink-0 text-primary"
                                  aria-hidden
                                />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div
                          className={cn(
                            "flex w-28 shrink-0 flex-col items-center justify-center gap-2 border-s border-dashed border-border px-3 py-4 text-center transition-colors",
                            selected ? "bg-primary/10" : "bg-muted/40"
                          )}
                        >
                          <span className="text-2xl font-semibold tracking-tight tabular-nums">
                            {formatPrice(item.price)}
                          </span>
                          <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                            per ticket
                          </span>
                          <RadioGroupItem
                            id={inputId}
                            value={item.id}
                            className="cursor-pointer"
                          />
                        </div>
                      </label>
                    )
                  })}
                </RadioGroup>

                {/* Quantity stepper */}
                <div className="relative flex flex-wrap items-center justify-between gap-4 rounded-[12px] border border-dashed border-border bg-card p-4 sm:p-5">
                  <div className="flex items-center gap-4 text-start">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-[12px] bg-primary/10 text-primary">
                      <TicketIcon className="size-6" aria-hidden />
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span
                        id={`${uid}-qty-label`}
                        className="text-base font-semibold"
                      >
                        How many tickets?
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Up to {MAX_TICKETS} per registration
                      </span>
                    </div>
                  </div>
                  <div
                    role="group"
                    aria-labelledby={`${uid}-qty-label`}
                    className="flex items-center gap-2 rounded-[12px] border border-border/70 bg-muted/40 p-1.5"
                  >
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="cursor-pointer"
                      aria-label="Remove one ticket"
                      disabled={quantity <= 1}
                      onClick={() => changeQuantity(quantity - 1)}
                    >
                      <MinusIcon aria-hidden />
                    </Button>
                    <output
                      aria-live="polite"
                      className="min-w-12 text-center text-3xl font-semibold tabular-nums"
                    >
                      {quantity}
                    </output>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="cursor-pointer"
                      aria-label="Add one ticket"
                      disabled={quantity >= MAX_TICKETS}
                      onClick={() => changeQuantity(quantity + 1)}
                    >
                      <PlusIcon aria-hidden />
                    </Button>
                  </div>
                </div>
              </fieldset>

              {/* ------------------------- 02 Attendee badges ------------------------ */}
              <div className="flex flex-col gap-5">
                <SectionHeading
                  index="02"
                  title="Attendee badges"
                  description={
                    quantity > 1
                      ? "Every attendee gets their own badge and confirmation."
                      : "We'll print your badge with these details."
                  }
                />

                <div className="grid grid-cols-1 gap-5">
                  {attendees.map((attendee, index) => {
                    const nameKey = `a${index}-name`
                    const emailKey = `a${index}-email`
                    const nameError = visibleError(nameKey)
                    const emailError = visibleError(emailKey)
                    const nameId = `${uid}-${nameKey}`
                    const emailId = `${uid}-${emailKey}`
                    const companyId = `${uid}-a${index}-company`
                    const badgeLabel =
                      quantity > 1
                        ? index === 0
                          ? "Attendee 1 (you)"
                          : `Attendee ${index + 1}`
                        : "Your details"

                    return (
                      <fieldset
                        key={index}
                        disabled={loading}
                        className="relative flex min-w-0 flex-col overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft"
                      >
                        <legend className="sr-only">{badgeLabel}</legend>

                        <div className="flex justify-center pt-3" aria-hidden>
                          <span className="h-2 w-16 rounded-full border border-border/70 bg-canvas" />
                        </div>

                        <div className="mx-4 mt-3 flex items-center justify-between gap-3 rounded-md bg-primary px-4 py-2 text-primary-foreground sm:mx-5">
                          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest">
                            <ScanLineIcon className="size-3.5" aria-hidden />
                            {EVENT.shortTitle}
                          </span>
                          <span className="font-mono text-xs font-medium">
                            {String(index + 1).padStart(2, "0")}/
                            {String(quantity).padStart(2, "0")}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-3 px-4 pb-1 pt-5 text-start sm:px-5">
                          <div className="flex min-w-0 flex-col">
                            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                              {badgeLabel}
                            </span>
                            <span
                              className={cn(
                                "truncate text-2xl font-semibold tracking-tight",
                                !attendee.name.trim() &&
                                  "text-muted-foreground/60"
                              )}
                            >
                              {attendee.name.trim() || "Your name"}
                            </span>
                            <span className="truncate text-sm text-muted-foreground">
                              {attendee.company.trim() || "Company"}
                            </span>
                          </div>
                          <Badge variant="secondary" className="shrink-0">
                            {ticket.name}
                          </Badge>
                        </div>

                        <div className="relative mt-4 border-t border-dashed border-border px-4 py-5 sm:px-5">
                          <Notch className="start-0 top-0 -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2" />
                          <Notch className="end-0 top-0 translate-x-1/2 -translate-y-1/2 rtl:-translate-x-1/2" />
                          <FieldGroup className="gap-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                              <Field
                                data-invalid={nameError ? true : undefined}
                              >
                                <FieldLabel htmlFor={nameId}>
                                  Full name <RequiredMark />
                                </FieldLabel>
                                <Input
                                  id={nameId}
                                  name={`attendees.${index}.name`}
                                  autoComplete={index === 0 ? "name" : "off"}
                                  placeholder="Alex Morgan"
                                  value={attendee.name}
                                  aria-invalid={nameError ? true : undefined}
                                  aria-describedby={
                                    nameError ? `${nameId}-error` : undefined
                                  }
                                  onChange={(e) =>
                                    updateAttendee(index, {
                                      name: e.target.value,
                                    })
                                  }
                                  onBlur={() => touch(nameKey)}
                                />
                                {nameError ? (
                                  <FieldError id={`${nameId}-error`}>
                                    {nameError}
                                  </FieldError>
                                ) : null}
                              </Field>
                              <Field
                                data-invalid={emailError ? true : undefined}
                              >
                                <FieldLabel htmlFor={emailId}>
                                  Email <RequiredMark />
                                </FieldLabel>
                                <Input
                                  id={emailId}
                                  name={`attendees.${index}.email`}
                                  type="email"
                                  dir="ltr"
                                  autoComplete={index === 0 ? "email" : "off"}
                                  placeholder="alex@example.com"
                                  value={attendee.email}
                                  aria-invalid={emailError ? true : undefined}
                                  aria-describedby={
                                    emailError ? `${emailId}-error` : undefined
                                  }
                                  onChange={(e) =>
                                    updateAttendee(index, {
                                      email: e.target.value,
                                    })
                                  }
                                  onBlur={() => touch(emailKey)}
                                />
                                {emailError ? (
                                  <FieldError id={`${emailId}-error`}>
                                    {emailError}
                                  </FieldError>
                                ) : null}
                              </Field>
                            </div>
                            <Field>
                              <FieldLabel htmlFor={companyId}>
                                Company{" "}
                                <span className="font-normal text-muted-foreground">
                                  (optional)
                                </span>
                              </FieldLabel>
                              <Input
                                id={companyId}
                                name={`attendees.${index}.company`}
                                autoComplete={
                                  index === 0 ? "organization" : "off"
                                }
                                placeholder="Northlight Labs"
                                value={attendee.company}
                                onChange={(e) =>
                                  updateAttendee(index, {
                                    company: e.target.value,
                                  })
                                }
                              />
                            </Field>
                          </FieldGroup>
                        </div>
                      </fieldset>
                    )
                  })}
                </div>
              </div>

              {/* ------------------------------ 03 Extras ----------------------------- */}
              <fieldset
                disabled={loading}
                className="flex min-w-0 flex-col gap-5"
              >
                <legend className="sr-only">A few extras (optional)</legend>
                <SectionHeading
                  index="03"
                  title="A few extras"
                  description="Helps the team plan catering and the agenda."
                  optional
                />
                <div className="rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
                  <FieldGroup className="gap-4">
                    <Field>
                      <FieldLabel htmlFor={`${uid}-dietary`}>
                        Dietary requirements
                      </FieldLabel>
                      <Select value={dietary} onValueChange={setDietary}>
                        <SelectTrigger
                          id={`${uid}-dietary`}
                          className="w-full cursor-pointer"
                        >
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          {DIETARY.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor={`${uid}-dietary-notes`}>
                        Allergies or other notes
                      </FieldLabel>
                      <Textarea
                        id={`${uid}-dietary-notes`}
                        name="dietaryNotes"
                        rows={3}
                        placeholder="Nut allergy, step-free access, …"
                        value={dietaryNotes}
                        onChange={(e) => setDietaryNotes(e.target.value)}
                      />
                      <FieldDescription>
                        Applies to everyone on this registration.
                      </FieldDescription>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor={`${uid}-heard`}>
                        How did you hear about us?
                      </FieldLabel>
                      <Select value={heard} onValueChange={setHeard}>
                        <SelectTrigger
                          id={`${uid}-heard`}
                          className="w-full cursor-pointer"
                        >
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          {HEARD.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </FieldGroup>
                </div>
              </fieldset>
            </div>

            {/* ----------------------- Printable ticket preview ----------------------- */}
            <aside
              aria-label="Registration summary"
              className="relative flex min-w-0 flex-col overflow-hidden rounded-[12px] border border-border/70 bg-card text-start shadow-soft lg:sticky lg:top-6"
            >
              <div className="flex items-center justify-between gap-3 bg-primary px-5 py-3 text-primary-foreground">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest">
                  <TicketIcon className="size-4" aria-hidden />
                  Admit {quantity}
                </span>
                <span className="font-mono text-xs">EVT-····</span>
              </div>

              <div className="flex flex-col gap-3 p-5">
                <h2 className="text-lg font-semibold leading-snug tracking-tight">
                  {EVENT.title}
                </h2>
                <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CalendarDaysIcon className="size-4 shrink-0" aria-hidden />
                    {EVENT.date}
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPinIcon className="size-4 shrink-0" aria-hidden />
                    {EVENT.location}
                  </li>
                </ul>
              </div>

              <div className="relative border-t border-dashed border-border">
                <Notch className="start-0 top-0 -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2" />
                <Notch className="end-0 top-0 translate-x-1/2 -translate-y-1/2 rtl:-translate-x-1/2" />
                <div className="flex flex-col gap-4 p-5">
                  <div className="flex items-start justify-between gap-3 text-sm">
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <span className="font-medium">{ticket.name}</span>
                      <span className="text-muted-foreground">
                        {quantity} × {formatPrice(ticket.price)}
                      </span>
                    </div>
                    <span className="font-medium tabular-nums">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <ul className="flex flex-col gap-1.5 text-xs leading-5 text-muted-foreground">
                    {ticket.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2">
                        <CheckIcon
                          className="mt-0.5 size-3.5 shrink-0 text-primary"
                          aria-hidden
                        />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Separator />
                  <dl className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <dt className="text-muted-foreground">Subtotal</dt>
                      <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <dt className="text-muted-foreground">Booking fee</dt>
                      <dd className="tabular-nums">{formatPrice(0)}</dd>
                    </div>
                    <div className="mt-1 flex items-center justify-between gap-3 text-lg font-semibold">
                      <dt>Total</dt>
                      <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="relative flex flex-col gap-4 border-t border-dashed border-border bg-muted/40 p-5">
                <Notch className="start-0 top-0 -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2" />
                <Notch className="end-0 top-0 translate-x-1/2 -translate-y-1/2 rtl:-translate-x-1/2" />
                <Barcode />
                <Button
                  type="submit"
                  size="lg"
                  className="w-full cursor-pointer"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner aria-hidden />
                      Processing…
                    </>
                  ) : (
                    "Complete registration"
                  )}
                </Button>
                <p className="text-xs leading-5 text-muted-foreground">
                  Demo only. Submitting creates a simulated reference — nothing
                  is charged, saved, or sent.
                </p>
              </div>
            </aside>
          </form>
        )}
      </div>
    </section>
  )
}
