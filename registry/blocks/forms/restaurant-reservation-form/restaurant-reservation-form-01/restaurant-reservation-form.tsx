"use client"

import * as React from "react"
import { addDays, format, startOfToday } from "date-fns"
import {
  CalendarIcon,
  LoaderCircleIcon,
  MinusIcon,
  PlusIcon,
} from "lucide-react"

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@sonojs/ui/components/popover"
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
import { Textarea } from "@sonojs/ui/components/textarea"
import { cn } from "@/lib/utils"

import diningImg from "./images/dining.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

/* -------------------------------------------------------------------------- */
/* Sample data                                                                */
/* -------------------------------------------------------------------------- */

const RESTAURANT = {
  name: "Ember & Vine",
  cuisine: "Wood-fired seasonal kitchen",
  address: "48 Harbor Lane, Lisbon",
  hours: "Tuesday to Sunday · 5:00 – 10:30 PM",
  intro:
    "Small plates from the open hearth, a short list of natural wines, and a patio that keeps the last of the evening sun.",
} as const

const PARTY = { min: 1, max: 12, largeFrom: 7 }
const BOOKING_WINDOW_DAYS = 60
const NOTES_MAX = 300

const SLOTS = [
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
] as const

type Slot = (typeof SLOTS)[number]

/** Prime-time slots that can't take large parties. */
const PRIME_SLOTS: readonly Slot[] = ["19:00", "19:30", "20:00"]

const SEATING = [
  {
    id: "indoor",
    name: "Indoor",
    phrase: "in the dining room",
    maxParty: 12,
  },
  {
    id: "patio",
    name: "Patio",
    phrase: "on the patio",
    maxParty: 8,
  },
  {
    id: "bar",
    name: "Bar",
    phrase: "at the chef's bar",
    maxParty: 4,
  },
] as const

type SeatingId = (typeof SEATING)[number]["id"]

const OCCASIONS = [
  { value: "none", label: "No special occasion", phrase: "" },
  { value: "birthday", label: "Birthday", phrase: "a birthday" },
  { value: "anniversary", label: "Anniversary", phrase: "an anniversary" },
  { value: "business", label: "Business dinner", phrase: "a business dinner" },
] as const

type OccasionId = (typeof OCCASIONS)[number]["value"]

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Simulated availability: closed Mondays, a few days are fully booked. */
function isClosedDay(date: Date) {
  return date.getDay() === 1
}

function isFullyBooked(date: Date) {
  return date.getDate() % 7 === 0
}

type SlotState = "open" | "booked" | "large-party"

function getSlotState(date: Date | undefined, slot: Slot, party: number): SlotState {
  if (!date) return "open"
  const index = SLOTS.indexOf(slot)
  const seed = date.getDate() * 7 + date.getMonth() * 3 + index * 5
  if (seed % 4 === 0) return "booked"
  if (party >= PARTY.largeFrom && PRIME_SLOTS.includes(slot)) return "large-party"
  return "open"
}

function formatSlot(slot: string) {
  const [h, m] = slot.split(":").map(Number)
  const suffix = h >= 12 ? "PM" : "AM"
  const hour = h % 12 === 0 ? 12 : h % 12
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`
}

function makeReference() {
  return `RSV-${Math.floor(1000 + Math.random() * 9000)}`
}

const NUMBER_WORDS = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
]

type FormKey =
  | "date"
  | "time"
  | "seating"
  | "name"
  | "email"
  | "phone"
  | "notes"

type FormErrors = Partial<Record<FormKey, string>>

function RequiredMark() {
  return (
    <span className="text-destructive" aria-hidden>
      *
    </span>
  )
}

function Chapter({
  numeral,
  title,
}: {
  numeral: string
  title: string
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden
        className="font-medium italic tracking-wide text-primary"
      >
        <bdi dir="ltr">{numeral}</bdi>
      </span>
      <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        {title}
      </h2>
      <span aria-hidden className="h-px flex-1 bg-border/70" />
    </div>
  )
}

function RecapRow({
  label,
  value,
}: {
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="min-w-0 break-words text-end font-medium">{value}</dd>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Block                                                                      */
/* -------------------------------------------------------------------------- */

export default function RestaurantReservationForm({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const uid = React.useId()
  const formRef = React.useRef<HTMLFormElement>(null)
  const id = (key: string) => `${uid}-${key}`

  const [party, setParty] = React.useState(2)
  const [date, setDate] = React.useState<Date | undefined>()
  const [dateOpen, setDateOpen] = React.useState(false)
  const [time, setTime] = React.useState<Slot | "">("")
  const [seating, setSeating] = React.useState<SeatingId | "">("")
  const [occasion, setOccasion] = React.useState<OccasionId>("none")
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [notes, setNotes] = React.useState("")

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

  const today = React.useMemo(() => startOfToday(), [])
  const lastDay = React.useMemo(() => addDays(today, BOOKING_WINDOW_DAYS), [today])

  const isDateDisabled = React.useCallback(
    (d: Date) =>
      d < today || d > lastDay || isClosedDay(d) || isFullyBooked(d),
    [today, lastDay]
  )

  const seat = SEATING.find((s) => s.id === seating)
  const occasionItem = OCCASIONS.find((o) => o.value === occasion)

  const openSlots = React.useMemo(
    () =>
      date ? SLOTS.filter((slot) => getSlotState(date, slot, party) === "open") : [],
    [date, party]
  )

  /* Validation -------------------------------------------------------------- */

  const errors = React.useMemo<FormErrors>(() => {
    const next: FormErrors = {}
    if (!date) next.date = "Choose a date for your visit."
    else if (isDateDisabled(date)) next.date = "That date is unavailable."

    if (!time) next.time = "Pick a time slot."
    else if (getSlotState(date, time, party) !== "open")
      next.time = "That time is no longer available. Choose another slot."

    if (!seating) next.seating = "Choose where you'd like to sit."
    else if (seat && party > seat.maxParty)
      next.seating = `${seat.name} seats up to ${seat.maxParty} guests. Choose another area or reduce your party.`

    if (name.trim().length < 2) next.name = "Enter the name for the booking."
    if (!email.trim()) next.email = "Enter your email address."
    else if (!EMAIL_RE.test(email.trim()))
      next.email = "Enter a valid email address."

    const digits = phone.replace(/\D/g, "")
    if (!phone.trim()) next.phone = "Enter a phone number."
    else if (digits.length < 7 || digits.length > 15)
      next.phone = "Enter a valid phone number (7–15 digits)."

    if (notes.length > NOTES_MAX)
      next.notes = `Keep requests under ${NOTES_MAX} characters.`
    return next
  }, [date, time, seating, seat, party, name, email, phone, notes, isDateDisabled])

  const hasErrors = Object.keys(errors).length > 0
  const show = (key: FormKey) =>
    attempted || touched[key] ? errors[key] : undefined

  function touch(key: FormKey) {
    setTouched((prev) => (prev[key] ? prev : { ...prev, [key]: true }))
  }

  /* Handlers ---------------------------------------------------------------- */

  function changeParty(next: number) {
    const value = Math.min(PARTY.max, Math.max(PARTY.min, next))
    setParty(value)
    // Drop a slot that can't seat the new party size.
    if (time && getSlotState(date, time, value) !== "open") setTime("")
  }

  function selectDate(next: Date | undefined) {
    setDate(next)
    if (next) {
      setDateOpen(false)
      touch("date")
      // A previously chosen slot may not exist on the new day.
      if (time && getSlotState(next, time, party) !== "open") setTime("")
    }
  }

  function selectTime(slot: Slot) {
    setTime(slot)
    touch("time")
  }

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
    setParty(2)
    setDate(undefined)
    setTime("")
    setSeating("")
    setOccasion("none")
    setName("")
    setEmail("")
    setPhone("")
    setNotes("")
    setTouched({})
    setAttempted(false)
    setSubmitting(false)
    setReference(null)
  }

  /* Render ------------------------------------------------------------------ */

  const dateLabel = date ? format(date, "EEEE, d MMMM yyyy") : null
  const headingId = id("heading")

  const recapParty = `A table for ${NUMBER_WORDS[party] ?? party}`
  const recapWhen =
    date && time
      ? `${format(date, "EEEE, d MMMM")} at ${formatSlot(time)}`
      : date
        ? `${format(date, "EEEE, d MMMM")}, time to be chosen`
        : "a date yet to be chosen"
  const recapSeat = seat ? seat.phrase : "with seating still to be chosen"
  const recapOccasion = occasionItem?.phrase
    ? `, to mark ${occasionItem.phrase}`
    : ""

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas px-4 py-10 text-foreground sm:px-6 sm:py-16",
        className
      )}
      aria-labelledby={headingId}
      {...props}
    >
      <div className="mx-auto w-full max-w-2xl rounded-[12px] border border-border/70 bg-card px-5 py-8 shadow-soft sm:px-12 sm:py-12">
        {/* Masthead */}
        <header className="flex flex-col items-center gap-5 text-center">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:text-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={assetSrc(diningImg)}
              alt="A candlelit table set for dinner with wine glasses and a plated dish"
              className="size-24 shrink-0 rounded-full object-cover ring-1 ring-border/70 ring-offset-4 ring-offset-card"
            />
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                {RESTAURANT.cuisine}
              </p>
              <h1
                id={headingId}
                className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                {RESTAURANT.name}
              </h1>
              <p className="text-sm italic text-muted-foreground">
                {RESTAURANT.address}
              </p>
            </div>
          </div>
          <p className="max-w-md text-pretty text-sm italic leading-6 text-muted-foreground">
            {RESTAURANT.intro}
          </p>
          <p className="text-xs tracking-wide text-muted-foreground">
            {RESTAURANT.hours}
          </p>
        </header>

        <Separator className="my-8" />

        {reference ? (
          <div
            role="status"
            className="mx-auto flex w-full max-w-md flex-col items-center gap-6 text-center"
          >
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Your table is noted
              </p>
              <h2 className="text-2xl font-semibold tracking-tight">
                Until then, {name.trim().split(" ")[0]}.
              </h2>
              <p className="text-pretty text-sm leading-6 text-muted-foreground">
                This is a demo — no table has been reserved and nothing was
                sent to {email.trim()}. The reference below is for illustration
                only.
              </p>
            </div>

            <div className="flex w-full flex-col gap-4 rounded-[12px] border border-dashed border-border bg-muted/30 p-5 text-start">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  Table card
                </span>
                <span
                  dir="ltr"
                  className="font-mono text-lg font-semibold tracking-widest"
                >
                  {reference}
                </span>
              </div>
              <Separator />
              <dl className="flex flex-col gap-2.5">
                <RecapRow
                  label="Party"
                  value={`${party} ${party === 1 ? "guest" : "guests"}`}
                />
                <RecapRow
                  label="When"
                  value={`${date ? format(date, "EEE, d MMM") : ""} · ${time ? formatSlot(time) : ""}`}
                />
                <RecapRow label="Seating" value={seat?.name} />
                {occasion !== "none" ? (
                  <RecapRow label="Occasion" value={occasionItem?.label} />
                ) : null}
              </dl>
            </div>

            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={handleReset}
            >
              Start another demo request
            </Button>
          </div>
        ) : (
          <form
            ref={formRef}
            noValidate
            onSubmit={handleSubmit}
            className="flex flex-col gap-10"
          >
            {/* I. Party + date + time */}
            <fieldset
              disabled={submitting}
              className="flex min-w-0 flex-col gap-6"
            >
              <legend className="sr-only">Party size, date and time</legend>
              <Chapter numeral="I." title="The evening" />

              <div className="flex flex-col items-center gap-2">
                <span
                  id={id("party-label")}
                  className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground"
                >
                  Party of
                </span>
                <div
                  role="group"
                  aria-labelledby={id("party-label")}
                  className="flex items-center gap-6"
                >
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="cursor-pointer rounded-full"
                    aria-label="Remove one guest"
                    disabled={party <= PARTY.min}
                    onClick={() => changeParty(party - 1)}
                  >
                    <MinusIcon aria-hidden />
                  </Button>
                  <output
                    aria-live="polite"
                    className="min-w-[2ch] text-center text-7xl font-semibold leading-none tracking-tighter tabular-nums"
                  >
                    {party}
                  </output>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="cursor-pointer rounded-full"
                    aria-label="Add one guest"
                    disabled={party >= PARTY.max}
                    onClick={() => changeParty(party + 1)}
                  >
                    <PlusIcon aria-hidden />
                  </Button>
                </div>
                <p className="text-sm italic text-muted-foreground">
                  {party === 1 ? "guest" : "guests"} · tables for up to{" "}
                  {PARTY.max}
                </p>
                {party >= PARTY.largeFrom ? (
                  <p className="text-center text-xs text-muted-foreground">
                    Parties of {PARTY.largeFrom}+ can&apos;t book the 7:00–8:00
                    PM seatings online.
                  </p>
                ) : null}
              </div>

              <Field data-invalid={!!show("date")}>
                <FieldLabel htmlFor={id("date")}>
                  Date <RequiredMark />
                </FieldLabel>
                <Popover open={dateOpen} onOpenChange={setDateOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      id={id("date")}
                      type="button"
                      variant="outline"
                      aria-invalid={!!show("date")}
                      className={cn(
                        "w-full cursor-pointer justify-between font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <span className={cn(date && "italic")}>
                        {dateLabel ?? "Choose an evening"}
                      </span>
                      <CalendarIcon aria-hidden />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto max-w-[calc(100vw-2rem)] p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      className="[--cell-size:--spacing(10)] md:[--cell-size:--spacing(7)]"
                      selected={date}
                      defaultMonth={date ?? today}
                      startMonth={today}
                      endMonth={lastDay}
                      disabled={isDateDisabled}
                      modifiers={{ booked: isFullyBooked }}
                      modifiersClassNames={{ booked: "line-through" }}
                      onSelect={selectDate}
                      autoFocus
                    />
                    <p className="border-t border-border/70 px-3 py-2 text-xs text-muted-foreground">
                      Closed Mondays · struck-through days are fully booked.
                    </p>
                  </PopoverContent>
                </Popover>
                <FieldError>{show("date")}</FieldError>
              </Field>

              <Field data-invalid={!!show("time")}>
                <FieldLabel id={id("time-label")}>
                  Time <RequiredMark />
                </FieldLabel>
                {date ? (
                  openSlots.length > 0 ? (
                    <div
                      role="radiogroup"
                      aria-labelledby={id("time-label")}
                      aria-invalid={!!show("time") || undefined}
                      tabIndex={show("time") ? -1 : undefined}
                      className="-mx-1 -mt-1 flex snap-x gap-2 overflow-x-auto px-1 pb-2 pt-1"
                    >
                      {openSlots.map((slot) => {
                        const checked = time === slot
                        return (
                          <button
                            key={slot}
                            type="button"
                            role="radio"
                            aria-checked={checked}
                            onClick={() => selectTime(slot)}
                            className={cn(
                              "h-[46px] shrink-0 cursor-pointer snap-start rounded-full border border-border/70 px-4 text-sm font-medium tabular-nums outline-none transition-colors hover:bg-muted/60 focus-visible:ring-[3px] focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50",
                              checked &&
                                "border-primary bg-primary text-primary-foreground hover:bg-primary"
                            )}
                          >
                            <bdi dir="ltr">{formatSlot(slot)}</bdi>
                          </button>
                        )
                      })}
                    </div>
                  ) : (
                    <FieldDescription>
                      Nothing open for {party}{" "}
                      {party === 1 ? "guest" : "guests"} that evening — try
                      another date or a smaller party.
                    </FieldDescription>
                  )
                ) : (
                  <FieldDescription>
                    Choose a date and the open tables will appear here.
                  </FieldDescription>
                )}
                <FieldError>{show("time")}</FieldError>
              </Field>
            </fieldset>

            {/* II. Seating */}
            <fieldset
              disabled={submitting}
              className="flex min-w-0 flex-col gap-5"
            >
              <legend className="sr-only">Seating and occasion</legend>
              <Chapter numeral="II." title="Where you sit" />

              <RadioGroup
                value={seating}
                onValueChange={(value) => {
                  setSeating(value as SeatingId)
                  touch("seating")
                }}
                aria-label="Seating preference"
                className="grid grid-cols-3 gap-2"
              >
                {SEATING.map((item) => {
                  const fits = party <= item.maxParty
                  const selected = seating === item.id
                  const inputId = id(`seat-${item.id}`)
                  return (
                    <label
                      key={item.id}
                      htmlFor={inputId}
                      className={cn(
                        "flex cursor-pointer flex-col items-center gap-1 border-b-2 border-transparent px-1 pb-3 pt-2 text-center transition-colors hover:text-foreground has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/40",
                        selected
                          ? "border-primary text-foreground"
                          : "text-muted-foreground",
                        !fits && "opacity-60"
                      )}
                    >
                      <RadioGroupItem
                        id={inputId}
                        value={item.id}
                        aria-invalid={
                          !!show("seating") && selected ? true : undefined
                        }
                        className="sr-only"
                      />
                      <span className="text-lg font-medium tracking-tight">
                        {item.name}
                      </span>
                      <span className="text-xs italic">
                        {fits
                          ? `seats up to ${item.maxParty}`
                          : `too small for ${party}`}
                      </span>
                    </label>
                  )
                })}
              </RadioGroup>
              <FieldError>{show("seating")}</FieldError>

              <Field>
                <FieldLabel htmlFor={id("occasion")}>
                  Occasion{" "}
                  <span className="font-normal text-muted-foreground">
                    (optional)
                  </span>
                </FieldLabel>
                <Select
                  value={occasion}
                  onValueChange={(v) => setOccasion(v as OccasionId)}
                >
                  <SelectTrigger
                    id={id("occasion")}
                    className="w-full cursor-pointer border-border/50 text-muted-foreground shadow-none data-[state=open]:text-foreground"
                  >
                    <SelectValue placeholder="Select an occasion" />
                  </SelectTrigger>
                  <SelectContent>
                    {OCCASIONS.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </fieldset>

            {/* III. Contact */}
            <fieldset
              disabled={submitting}
              className="flex min-w-0 flex-col gap-5"
            >
              <legend className="sr-only">Guest details</legend>
              <Chapter numeral="III." title="In whose name" />
              <FieldGroup className="gap-4">
                <Field data-invalid={!!show("name")}>
                  <FieldLabel htmlFor={id("name")}>
                    Name <RequiredMark />
                  </FieldLabel>
                  <Input
                    id={id("name")}
                    name="name"
                    autoComplete="name"
                    placeholder="Maya Santos"
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

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                      placeholder="maya@example.com"
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
                  <Field data-invalid={!!show("phone")}>
                    <FieldLabel htmlFor={id("phone")}>
                      Phone <RequiredMark />
                    </FieldLabel>
                    <Input
                      id={id("phone")}
                      name="phone"
                      type="tel"
                      dir="ltr"
                      autoComplete="tel"
                      placeholder="+351 912 345 678"
                      value={phone}
                      aria-invalid={!!show("phone")}
                      aria-describedby={
                        show("phone") ? `${id("phone")}-error` : undefined
                      }
                      onChange={(e) => setPhone(e.target.value)}
                      onBlur={() => touch("phone")}
                    />
                    <FieldError id={`${id("phone")}-error`}>
                      {show("phone")}
                    </FieldError>
                  </Field>
                </div>

                <Field data-invalid={!!show("notes")}>
                  <FieldLabel htmlFor={id("notes")}>
                    A note for the kitchen{" "}
                    <span className="font-normal text-muted-foreground">
                      (optional)
                    </span>
                  </FieldLabel>
                  <Textarea
                    id={id("notes")}
                    name="notes"
                    rows={3}
                    placeholder="Allergies, a high chair, a quiet corner…"
                    value={notes}
                    aria-invalid={!!show("notes")}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  <div className="flex items-start justify-between gap-3">
                    <FieldDescription>
                      Requests are noted but can&apos;t be guaranteed.
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

            {/* Recap + confirm */}
            <div className="flex flex-col items-center gap-5">
              <blockquote
                aria-live="polite"
                className="w-full border-s-2 border-primary/60 ps-5 text-start"
              >
                <p className="text-pretty text-lg italic leading-8 text-foreground/90">
                  {recapParty}, {recapWhen}, {recapSeat}
                  {recapOccasion}.
                </p>
                <footer className="mt-2 text-xs tracking-wide text-muted-foreground">
                  — {RESTAURANT.name}. Tables are held for 15 minutes.
                </footer>
              </blockquote>

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
                    Confirming…
                  </>
                ) : (
                  "Confirm reservation"
                )}
              </Button>
              <p className="text-center text-xs leading-5 text-muted-foreground">
                Demo form — nothing is booked, saved or emailed.
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
