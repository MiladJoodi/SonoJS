"use client"

import * as React from "react"
import { addDays, differenceInCalendarDays, format, startOfToday } from "date-fns"
import {
  ArrowRightIcon,
  BedDoubleIcon,
  CalendarIcon,
  CheckIcon,
  LoaderCircleIcon,
  MapPinIcon,
  MinusIcon,
  PlaneIcon,
  PlusIcon,
  ReceiptTextIcon,
  StarIcon,
  UsersIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import { Textarea } from "@sonojs/ui/components/textarea"
import { cn } from "@/lib/utils"

import propertyImg from "./images/property.webp"
import roomDeluxeImg from "./images/room-deluxe.webp"
import roomStandardImg from "./images/room-standard.webp"
import roomSuiteImg from "./images/room-suite.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

/* -------------------------------------------------------------------------- */
/* Sample data                                                                */
/* -------------------------------------------------------------------------- */

type Property = {
  id: string
  name: string
  city: string
  tagline: string
  rating: number
  reviews: number
  /** Multiplier applied to base room rates. */
  rateFactor: number
}

type RoomType = {
  id: string
  name: string
  description: string
  image: string
  baseRate: number // USD / night
  sleeps: number // guests per room
  bed: string
  perks: string[]
}

const PROPERTIES: Property[] = [
  {
    id: "azure-bay",
    name: "Azure Bay Resort",
    city: "Santorini, Greece",
    tagline: "Cliffside suites above the caldera, with an infinity pool.",
    rating: 4.8,
    reviews: 2310,
    rateFactor: 1.25,
  },
  {
    id: "alpine-lodge",
    name: "Alpine Lodge Zermatt",
    city: "Zermatt, Switzerland",
    tagline: "Ski-in chalet comfort with a view of the Matterhorn.",
    rating: 4.9,
    reviews: 1184,
    rateFactor: 1.45,
  },
  {
    id: "meridian-tokyo",
    name: "The Meridian Tokyo",
    city: "Tokyo, Japan",
    tagline: "Skyline rooms steps from Shibuya Crossing.",
    rating: 4.7,
    reviews: 3902,
    rateFactor: 1.1,
  },
  {
    id: "casa-marisol",
    name: "Casa Marisol",
    city: "Lisbon, Portugal",
    tagline: "A restored townhouse with tiled courtyards and rooftop bar.",
    rating: 4.6,
    reviews: 876,
    rateFactor: 0.85,
  },
]

const ROOM_TYPES: RoomType[] = [
  {
    id: "standard",
    name: "Standard Room",
    description: "Quiet, light-filled room with a queen bed and work desk.",
    image: assetSrc(roomStandardImg),
    baseRate: 129,
    sleeps: 2,
    bed: "1 queen bed",
    perks: ["Free Wi-Fi", "Garden view"],
  },
  {
    id: "deluxe",
    name: "Deluxe Room",
    description: "Extra space, a reading nook and a sofa bed for a third guest.",
    image: assetSrc(roomDeluxeImg),
    baseRate: 189,
    sleeps: 3,
    bed: "1 king bed + sofa bed",
    perks: ["Breakfast included", "Balcony"],
  },
  {
    id: "suite",
    name: "Panorama Suite",
    description: "Separate living area, lounge seating and sweeping views.",
    image: assetSrc(roomSuiteImg),
    baseRate: 329,
    sleeps: 5,
    bed: "1 king bed + 2 sofa beds",
    perks: ["Lounge access", "Sea view", "Late checkout"],
  },
]

const LIMITS = {
  rooms: { min: 1, max: 5 },
  adults: { min: 1, max: 10 },
  children: { min: 0, max: 6 },
  maxNights: 14,
  requestsMax: 400,
}

const TAX_RATE = 0.12

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})
const currencyExact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

/** Simulated sold-out nights: a stay can't include a night starting on these days. */
function isSoldOutNight(date: Date) {
  return date.getDate() % 9 === 0
}

function stayHasSoldOutNight(start: Date, end: Date) {
  for (let d = start; d < end; d = addDays(d, 1)) {
    if (isSoldOutNight(d)) return true
  }
  return false
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type FormErrors = Partial<
  Record<
    | "property"
    | "checkIn"
    | "checkOut"
    | "rooms"
    | "adults"
    | "capacity"
    | "room"
    | "name"
    | "email"
    | "phone"
    | "requests",
    string
  >
>

const plural = (n: number, one: string, many: string) =>
  `${n} ${n === 1 ? one : many}`

/* -------------------------------------------------------------------------- */
/* Small pieces                                                               */
/* -------------------------------------------------------------------------- */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
    </p>
  )
}

function Counter({
  label,
  description,
  value,
  min,
  max,
  onChange,
}: {
  label: string
  description: string
  value: number
  min: number
  max: number
  onChange: (next: number) => void
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0 text-start">
        <p className="text-sm font-medium leading-5">{label}</p>
        <p className="text-xs leading-5 text-muted-foreground">{description}</p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="cursor-pointer rounded-full"
          aria-label={`Decrease ${label.toLowerCase()}`}
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
        >
          <MinusIcon aria-hidden />
        </Button>
        <output
          aria-label={label}
          className="w-6 text-center text-sm font-semibold tabular-nums"
        >
          {value}
        </output>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="cursor-pointer rounded-full"
          aria-label={`Increase ${label.toLowerCase()}`}
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
        >
          <PlusIcon aria-hidden />
        </Button>
      </div>
    </div>
  )
}

function ReceiptRow({
  label,
  value,
  strong,
}: {
  label: React.ReactNode
  value: React.ReactNode
  strong?: boolean
}) {
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-4 text-sm",
        strong ? "font-medium" : "text-muted-foreground"
      )}
    >
      <dt>{label}</dt>
      <dd
        className={cn(
          "shrink-0 text-end tabular-nums",
          strong ? "text-foreground" : "font-medium"
        )}
      >
        {value}
      </dd>
    </div>
  )
}

/** Perforation line with side punches (needs a `p-5` parent). */
function Perforation() {
  return (
    <div
      aria-hidden
      className="relative border-t border-dashed border-border"
    >
      <span className="absolute -start-7 -top-2 size-4 rounded-full border border-border/70 bg-canvas" />
      <span className="absolute -end-7 -top-2 size-4 rounded-full border border-border/70 bg-canvas" />
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
          "repeating-linear-gradient(90deg, currentColor 0 3px, transparent 3px 6px, currentColor 6px 7px, transparent 7px 10px, currentColor 10px 12px, transparent 12px 16px, currentColor 16px 17px, transparent 17px 19px)",
      }}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* Block                                                                      */
/* -------------------------------------------------------------------------- */

export default function HotelBookingForm({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const uid = React.useId()
  const formId = `${uid}-form`
  const id = (name: string) => `${uid}-${name}`

  const [propertyId, setPropertyId] = React.useState(PROPERTIES[0].id)
  const [checkIn, setCheckIn] = React.useState<Date | undefined>()
  const [checkOut, setCheckOut] = React.useState<Date | undefined>()
  const [inOpen, setInOpen] = React.useState(false)
  const [outOpen, setOutOpen] = React.useState(false)
  const [rooms, setRooms] = React.useState(1)
  const [adults, setAdults] = React.useState(2)
  const [children, setChildren] = React.useState(0)
  const [roomId, setRoomId] = React.useState(ROOM_TYPES[1].id)
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [requests, setRequests] = React.useState("")

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

  const property = PROPERTIES.find((p) => p.id === propertyId)
  const room = ROOM_TYPES.find((r) => r.id === roomId)

  /* Derived stay + pricing -------------------------------------------------- */

  const nights =
    checkIn && checkOut ? differenceInCalendarDays(checkOut, checkIn) : 0
  const guests = adults + children
  const capacity = (room?.sleeps ?? 0) * rooms
  const nightlyRate =
    room && property ? Math.round(room.baseRate * property.rateFactor) : 0
  const subtotal = nightlyRate * Math.max(nights, 0) * rooms
  const taxes = subtotal * TAX_RATE
  const total = subtotal + taxes

  const isCheckInDisabled = React.useCallback(
    (d: Date) => d < today || isSoldOutNight(d),
    [today]
  )
  const isCheckOutDisabled = React.useCallback(
    (d: Date) => {
      if (!checkIn) return d <= today
      return (
        d <= checkIn ||
        differenceInCalendarDays(d, checkIn) > LIMITS.maxNights ||
        stayHasSoldOutNight(checkIn, d)
      )
    },
    [checkIn, today]
  )

  /* Validation -------------------------------------------------------------- */

  const errors = React.useMemo<FormErrors>(() => {
    const next: FormErrors = {}
    if (!property) next.property = "Choose a destination."
    if (!checkIn) next.checkIn = "Select a check-in date."
    else if (isCheckInDisabled(checkIn))
      next.checkIn = "That check-in date is unavailable."
    if (!checkOut) next.checkOut = "Select a check-out date."
    else if (checkIn && checkOut <= checkIn)
      next.checkOut = "Check-out must be after check-in."
    else if (checkIn && isCheckOutDisabled(checkOut))
      next.checkOut = "Those dates aren't fully available. Try a shorter stay."
    if (rooms < LIMITS.rooms.min) next.rooms = "Book at least 1 room."
    if (adults < LIMITS.adults.min)
      next.adults = "At least 1 adult is required per booking."
    else if (rooms > adults)
      next.rooms = "Each room needs at least one adult. Reduce rooms or add adults."
    if (!room) next.room = "Choose a room type."
    else if (guests > capacity)
      next.capacity = `${room.name} sleeps ${room.sleeps} per room — ${capacity} total for ${rooms} ${rooms === 1 ? "room" : "rooms"}, but you have ${guests} guests. Add a room or choose a larger type.`
    if (name.trim().length < 2) next.name = "Enter the lead guest's full name."
    if (!EMAIL_RE.test(email.trim())) next.email = "Enter a valid email address."
    const digits = phone.replace(/\D/g, "")
    if (digits.length < 7 || digits.length > 15)
      next.phone = "Enter a valid phone number (7–15 digits)."
    if (requests.length > LIMITS.requestsMax)
      next.requests = `Keep requests under ${LIMITS.requestsMax} characters.`
    return next
  }, [
    property,
    checkIn,
    checkOut,
    rooms,
    adults,
    room,
    guests,
    capacity,
    name,
    email,
    phone,
    requests,
    isCheckInDisabled,
    isCheckOutDisabled,
  ])

  const hasErrors = Object.values(errors).some(Boolean)
  // Capacity mismatch is shown immediately — it's a live constraint, not a typo.
  const show = (key: keyof FormErrors) =>
    (attempted || key === "capacity") && errors[key] ? errors[key] : undefined

  /* Handlers ---------------------------------------------------------------- */

  function handleCheckIn(next: Date | undefined) {
    setCheckIn(next)
    if (next) {
      setInOpen(false)
      // Drop a check-out that no longer works with the new check-in.
      if (
        checkOut &&
        (checkOut <= next ||
          differenceInCalendarDays(checkOut, next) > LIMITS.maxNights ||
          stayHasSoldOutNight(next, checkOut))
      ) {
        setCheckOut(undefined)
      }
    }
  }

  function handleRooms(next: number) {
    setRooms(next)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAttempted(true)
    if (hasErrors || submitting) return
    setSubmitting(true)
    timer.current = setTimeout(() => {
      setSubmitting(false)
      setReference(`HTL-${Math.floor(1000 + Math.random() * 9000)}`)
    }, 700)
  }

  function handleReset() {
    if (timer.current) clearTimeout(timer.current)
    setPropertyId(PROPERTIES[0].id)
    setCheckIn(undefined)
    setCheckOut(undefined)
    setRooms(1)
    setAdults(2)
    setChildren(0)
    setRoomId(ROOM_TYPES[1].id)
    setName("")
    setEmail("")
    setPhone("")
    setRequests("")
    setAttempted(false)
    setSubmitting(false)
    setReference(null)
  }

  /* Render ------------------------------------------------------------------ */

  const guestSummary = `${plural(guests, "guest", "guests")} · ${plural(rooms, "room", "rooms")}`
  const hasStay = nights > 0

  const submitContent = submitting ? (
    <>
      <LoaderCircleIcon className="animate-spin" aria-hidden />
      Reserving…
    </>
  ) : (
    "Reserve now"
  )

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas pb-10 text-foreground sm:pb-14",
        className
      )}
      aria-labelledby={id("heading")}
      {...props}
    >
      {/* Full-bleed hero */}
      <header className="relative isolate flex min-h-[26rem] items-end overflow-hidden bg-muted sm:min-h-[32rem]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assetSrc(propertyImg)}
          alt=""
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/35 to-black/10"
        />
        <div className="mx-auto w-full max-w-6xl px-4 pb-32 pt-16 text-start text-white sm:px-6 sm:pb-36">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-white/20 text-white backdrop-blur">
              <StarIcon className="fill-current" aria-hidden />
              {property?.rating.toFixed(1)}
            </Badge>
            <span className="text-xs text-white/80">
              <bdi>{property?.reviews.toLocaleString("en-US")} guest reviews</bdi>
            </span>
            <span className="text-xs text-white/50" aria-hidden>
              •
            </span>
            <span className="text-xs text-white/80">Free cancellation</span>
          </div>
          <h1
            id={id("heading")}
            className="mt-3 max-w-3xl text-balance break-words text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl"
          >
            {property?.name}
          </h1>
          <p className="mt-3 flex items-center gap-1.5 text-base text-white/90">
            <MapPinIcon className="size-4 shrink-0" aria-hidden />
            {property?.city}
          </p>
          <p className="mt-2 max-w-xl text-pretty text-sm leading-6 text-white/75">
            {property?.tagline}
          </p>
        </div>
      </header>

      {reference ? (
        /* --------------------------- Boarding-pass success -------------------------- */
        <div className="relative z-10 mx-auto -mt-24 w-full max-w-6xl px-4 sm:-mt-28 sm:px-6">
          <div
            role="status"
            className="relative mx-auto flex w-full max-w-4xl flex-col rounded-[12px] border border-border/70 bg-card shadow-soft md:flex-row"
          >
            <span
              aria-hidden
              className="absolute -top-2 end-[calc(15rem-0.5rem)] z-10 hidden size-4 rounded-full border border-border/70 bg-canvas md:block"
            />
            <span
              aria-hidden
              className="absolute -bottom-2 end-[calc(15rem-0.5rem)] z-10 hidden size-4 rounded-full border border-border/70 bg-canvas md:block"
            />

            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-center justify-between gap-3 rounded-ss-[12px] rounded-se-[12px] bg-primary px-6 py-3 text-primary-foreground md:rounded-se-none">
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                  <PlaneIcon className="size-4" aria-hidden />
                  Reservation pass
                </span>
                <span className="truncate text-xs text-primary-foreground/80">
                  {property?.name}
                </span>
              </div>

              <div className="flex flex-col gap-6 p-6 text-start sm:p-8">
                <div className="flex items-center gap-3 sm:gap-5">
                  <div className="min-w-0 shrink-0">
                    <Eyebrow>Check-in</Eyebrow>
                    <p className="mt-1 text-3xl font-semibold tracking-tight tabular-nums">
                      {checkIn ? format(checkIn, "d MMM") : "—"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {checkIn ? format(checkIn, "EEEE yyyy") : ""}
                    </p>
                  </div>
                  <div
                    aria-hidden
                    className="flex min-w-10 flex-1 flex-col items-center gap-1 text-muted-foreground"
                  >
                    <span className="text-xs font-medium tabular-nums">
                      <bdi>{plural(nights, "night", "nights")}</bdi>
                    </span>
                    <span className="flex w-full items-center gap-1">
                      <span className="h-px flex-1 bg-border" />
                      <ArrowRightIcon className="icon-dir size-4 shrink-0" />
                    </span>
                  </div>
                  <div className="min-w-0 shrink-0 text-end">
                    <Eyebrow>Check-out</Eyebrow>
                    <p className="mt-1 text-3xl font-semibold tracking-tight tabular-nums">
                      {checkOut ? format(checkOut, "d MMM") : "—"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {checkOut ? format(checkOut, "EEEE yyyy") : ""}
                    </p>
                  </div>
                </div>

                <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-dashed border-border pt-6 text-sm [&>div]:min-w-0 [&_dd]:break-words">
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                      Lead guest
                    </dt>
                    <dd className="mt-1 font-medium">{name.trim()}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                      Destination
                    </dt>
                    <dd className="mt-1 font-medium">{property?.city}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                      Room
                    </dt>
                    <dd className="mt-1 font-medium">
                      <bdi>
                        {rooms} × {room?.name}
                      </bdi>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                      Guests
                    </dt>
                    <dd className="mt-1 font-medium">
                      {plural(adults, "adult", "adults")}
                      {children ? `, ${plural(children, "child", "children")}` : ""}
                    </dd>
                  </div>
                  <div className="col-span-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 rounded-md bg-muted/50 px-4 py-3">
                    <dt className="text-sm text-muted-foreground">
                      Total incl. taxes
                    </dt>
                    <dd className="text-xl font-semibold tabular-nums tracking-tight">
                      {currencyExact.format(total)}
                    </dd>
                  </div>
                </dl>

                <p className="text-pretty text-xs leading-5 text-muted-foreground">
                  Demo only — no room has been booked, charged or emailed. The
                  reference is for illustration.
                </p>
              </div>
            </div>

            <div className="flex flex-col border-t border-dashed border-border md:w-60 md:shrink-0 md:border-s md:border-t-0">
              <div className="hidden items-center rounded-se-[12px] bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground md:flex">
                Booking ref
              </div>
              <div className="flex flex-1 flex-col items-center justify-between gap-5 p-6 sm:p-8">
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground md:hidden">
                    Booking ref
                  </span>
                  <span
                    dir="ltr"
                    className="font-mono text-3xl font-semibold tracking-widest"
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
                  Plan another stay
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form
          id={formId}
          noValidate
          onSubmit={handleSubmit}
          className="relative z-10"
        >
          {/* Frosted booking strip over the hero */}
          <div className="mx-auto -mt-28 w-full max-w-6xl px-4 sm:px-6 lg:-mt-24">
            <div className="rounded-[12px] border border-border/50 bg-card/75 shadow-soft backdrop-blur-xl supports-[backdrop-filter]:bg-card/65">
              <fieldset className="grid min-w-0 grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.25fr)]">
                <legend className="sr-only">Destination, dates and guests</legend>

                <Field data-invalid={!!show("property")}>
                  <FieldLabel htmlFor={id("property")}>Destination</FieldLabel>
                  <Select value={propertyId} onValueChange={setPropertyId}>
                    <SelectTrigger
                      id={id("property")}
                      className="w-full cursor-pointer bg-background/70"
                      aria-invalid={!!show("property")}
                    >
                      <SelectValue placeholder="Search destinations" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROPERTIES.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError>{show("property")}</FieldError>
                </Field>

                <Field data-invalid={!!show("checkIn")}>
                  <FieldLabel htmlFor={id("check-in")}>Check-in</FieldLabel>
                  <Popover open={inOpen} onOpenChange={setInOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        id={id("check-in")}
                        type="button"
                        variant="outline"
                        aria-invalid={!!show("checkIn")}
                        className={cn(
                          "w-full cursor-pointer justify-start bg-background/70 font-normal",
                          !checkIn && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon aria-hidden />
                        {checkIn ? format(checkIn, "EEE, d MMM") : "Add date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto max-w-[calc(100vw-2rem)] p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        className="[--cell-size:--spacing(10)] md:[--cell-size:--spacing(7)]"
                        selected={checkIn}
                        defaultMonth={checkIn ?? today}
                        startMonth={today}
                        disabled={isCheckInDisabled}
                        onSelect={handleCheckIn}
                        autoFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FieldError>{show("checkIn")}</FieldError>
                </Field>

                <Field data-invalid={!!show("checkOut")}>
                  <FieldLabel htmlFor={id("check-out")}>Check-out</FieldLabel>
                  <Popover open={outOpen} onOpenChange={setOutOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        id={id("check-out")}
                        type="button"
                        variant="outline"
                        aria-invalid={!!show("checkOut")}
                        className={cn(
                          "w-full cursor-pointer justify-start bg-background/70 font-normal",
                          !checkOut && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon aria-hidden />
                        {checkOut ? format(checkOut, "EEE, d MMM") : "Add date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto max-w-[calc(100vw-2rem)] p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        className="[--cell-size:--spacing(10)] md:[--cell-size:--spacing(7)]"
                        selected={checkOut}
                        defaultMonth={checkOut ?? checkIn ?? today}
                        startMonth={checkIn ?? today}
                        disabled={isCheckOutDisabled}
                        onSelect={(next) => {
                          setCheckOut(next)
                          if (next) setOutOpen(false)
                        }}
                        autoFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FieldError>{show("checkOut")}</FieldError>
                </Field>

                <Field data-invalid={!!(show("rooms") || show("adults"))}>
                  <FieldLabel htmlFor={id("guests")}>Guests & rooms</FieldLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id={id("guests")}
                        type="button"
                        variant="outline"
                        aria-invalid={!!(show("rooms") || show("adults"))}
                        className="w-full cursor-pointer justify-start bg-background/70 font-normal"
                      >
                        <UsersIcon aria-hidden />
                        <bdi className="truncate">{guestSummary}</bdi>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-80 max-w-[calc(100vw-2rem)] p-4"
                      align="end"
                    >
                      <div className="flex flex-col gap-4">
                        <Counter
                          label="Rooms"
                          description={`Max ${LIMITS.rooms.max}`}
                          value={rooms}
                          min={LIMITS.rooms.min}
                          max={LIMITS.rooms.max}
                          onChange={handleRooms}
                        />
                        <Counter
                          label="Adults"
                          description="Age 13+"
                          value={adults}
                          min={LIMITS.adults.min}
                          max={LIMITS.adults.max}
                          onChange={setAdults}
                        />
                        <Counter
                          label="Children"
                          description="Age 0–12"
                          value={children}
                          min={LIMITS.children.min}
                          max={LIMITS.children.max}
                          onChange={setChildren}
                        />
                        <p className="text-xs leading-5 text-muted-foreground">
                          Each room needs at least one adult.
                        </p>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FieldError>{show("rooms")}</FieldError>
                  <FieldError>{show("adults")}</FieldError>
                </Field>
              </fieldset>

              <div
                aria-live="polite"
                className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-border/50 px-4 py-3 text-sm sm:px-5"
              >
                {hasStay ? (
                  <p className="font-medium">
                    <bdi>{plural(nights, "night", "nights")}</bdi>
                    <span className="font-normal text-muted-foreground">
                      {" "}
                      · {checkIn ? format(checkIn, "d MMM") : ""}{" "}
                      <ArrowRightIcon
                        className="icon-dir inline size-3.5 align-[-2px]"
                        aria-hidden
                      />{" "}
                      {checkOut ? format(checkOut, "d MMM") : ""}
                    </span>
                  </p>
                ) : (
                  <p className="text-muted-foreground">
                    Add check-in and check-out to see rates for your stay.
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Up to {LIMITS.maxNights} nights · sold-out nights are disabled
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-10 grid w-full max-w-6xl grid-cols-1 items-start gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <div className="flex min-w-0 flex-col gap-12">
              {/* Rooms */}
              <fieldset className="flex min-w-0 flex-col gap-5">
                <legend className="sr-only">Room type</legend>
                <div className="flex flex-wrap items-end justify-between gap-2 text-start">
                  <div>
                    <Eyebrow>Stay in style</Eyebrow>
                    <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                      Choose your room
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {hasStay
                      ? `Totals for ${plural(nights, "night", "nights")} · ${plural(rooms, "room", "rooms")}, before taxes`
                      : "Nightly rates, before taxes"}
                  </p>
                </div>

                {show("capacity") ? (
                  <FieldError className="rounded-md bg-destructive/10 px-3 py-2">
                    {show("capacity")}
                  </FieldError>
                ) : null}

                <div
                  role="group"
                  aria-label="Room type"
                  className="flex flex-col gap-4"
                >
                  {ROOM_TYPES.map((item) => {
                    const checked = item.id === roomId
                    const rate = property
                      ? Math.round(item.baseRate * property.rateFactor)
                      : item.baseRate
                    const fits = guests <= item.sleeps * rooms
                    const stayTotal = rate * nights * rooms
                    return (
                      <article
                        key={item.id}
                        onClick={() => setRoomId(item.id)}
                        className={cn(
                          "flex cursor-pointer flex-col overflow-hidden rounded-[12px] border bg-card shadow-soft transition-colors sm:flex-row",
                          checked
                            ? "border-primary ring-1 ring-primary"
                            : "border-border/70 hover:border-border"
                        )}
                      >
                        <div className="relative shrink-0 bg-muted sm:min-h-48 sm:w-48 xl:w-64">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.image}
                            alt={`${item.name} interior`}
                            loading="lazy"
                            className="aspect-[16/10] size-full object-cover sm:absolute sm:inset-0 sm:aspect-auto"
                          />
                          {checked ? (
                            <Badge className="absolute start-3 top-3 bg-primary text-primary-foreground">
                              <CheckIcon aria-hidden />
                              Selected
                            </Badge>
                          ) : null}
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col gap-4 p-5 sm:flex-row sm:gap-5">
                          <div className="flex min-w-0 flex-1 flex-col gap-3 text-start">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-lg font-semibold leading-6 tracking-tight">
                                {item.name}
                              </h3>
                              {!fits ? (
                                <Badge variant="destructive">Too small</Badge>
                              ) : null}
                            </div>
                            <p className="text-pretty text-sm leading-6 text-muted-foreground">
                              {item.description}
                            </p>
                            <ul className="mt-auto flex flex-wrap gap-1.5 text-xs">
                              <li className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-muted-foreground">
                                <UsersIcon className="size-3.5" aria-hidden />
                                Sleeps {item.sleeps}
                              </li>
                              <li className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-muted-foreground">
                                <BedDoubleIcon className="size-3.5" aria-hidden />
                                {item.bed}
                              </li>
                              {item.perks.map((perk) => (
                                <li
                                  key={perk}
                                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-primary"
                                >
                                  <CheckIcon className="size-3.5" aria-hidden />
                                  {perk}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex items-end justify-between gap-4 border-t border-border/70 pt-4 sm:w-36 sm:shrink-0 sm:flex-col sm:items-end sm:justify-between sm:border-s sm:border-t-0 sm:pt-0 sm:ps-5">
                            <div className="text-start sm:text-end">
                              <p className="text-2xl font-semibold tabular-nums tracking-tight">
                                {currency.format(rate)}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                per night
                              </p>
                              {hasStay ? (
                                <p className="mt-1 text-xs font-medium tabular-nums">
                                  {currency.format(stayTotal)} total
                                </p>
                              ) : null}
                            </div>
                            <Button
                              type="button"
                              variant={checked ? "default" : "outline"}
                              aria-pressed={checked}
                              className="cursor-pointer"
                              onClick={(event) => {
                                event.stopPropagation()
                                setRoomId(item.id)
                              }}
                            >
                              {checked ? (
                                <>
                                  <CheckIcon aria-hidden />
                                  Selected
                                </>
                              ) : (
                                "Select"
                              )}
                            </Button>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
                <FieldError>{show("room")}</FieldError>
              </fieldset>

              {/* Lead guest — quiet secondary panel */}
              <fieldset className="flex min-w-0 flex-col gap-5 rounded-[12px] border border-border/70 bg-muted/30 p-5 sm:p-6">
                <legend className="sr-only">Lead guest</legend>
                <div className="text-start">
                  <h2 className="text-base font-semibold tracking-tight">
                    Lead guest
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    We&apos;ll send your confirmation here.
                  </p>
                </div>
                <FieldGroup className="gap-4">
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
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                  <Field data-invalid={!!show("requests")}>
                    <FieldLabel htmlFor={id("requests")}>
                      Special requests{" "}
                      <span className="font-normal text-muted-foreground">
                        (optional)
                      </span>
                    </FieldLabel>
                    <Textarea
                      id={id("requests")}
                      name="requests"
                      rows={3}
                      placeholder="Late arrival, high floor, extra pillows…"
                      value={requests}
                      onChange={(e) => setRequests(e.target.value)}
                      aria-invalid={!!show("requests")}
                    />
                    <div className="flex items-start justify-between gap-3">
                      <FieldDescription>
                        Requests are not guaranteed and depend on availability.
                      </FieldDescription>
                      <span
                        className={cn(
                          "shrink-0 text-xs tabular-nums text-muted-foreground",
                          requests.length > LIMITS.requestsMax &&
                            "text-destructive"
                        )}
                      >
                        {requests.length}/{LIMITS.requestsMax}
                      </span>
                    </div>
                    <FieldError>{show("requests")}</FieldError>
                  </Field>
                </FieldGroup>
              </fieldset>
            </div>

            {/* Docked receipt */}
            <aside
              aria-label="Price summary"
              className="flex flex-col overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft lg:sticky lg:top-6"
            >
              <div className="relative h-28 shrink-0 bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={room?.image}
                  alt=""
                  className="absolute inset-0 size-full object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 text-start text-white">
                  <p className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-white/80">
                    <ReceiptTextIcon className="size-3.5" aria-hidden />
                    Your receipt
                  </p>
                  <p className="truncate text-base font-semibold leading-6">
                    {room?.name} · {property?.name}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 p-5">
                <div className="grid grid-cols-2 gap-3 text-start">
                  <div>
                    <Eyebrow>Check-in</Eyebrow>
                    <p className="mt-1 text-sm font-medium">
                      {checkIn ? format(checkIn, "EEE, d MMM") : "—"}
                    </p>
                    <p className="text-xs text-muted-foreground">from 3:00 PM</p>
                  </div>
                  <div>
                    <Eyebrow>Check-out</Eyebrow>
                    <p className="mt-1 text-sm font-medium">
                      {checkOut ? format(checkOut, "EEE, d MMM") : "—"}
                    </p>
                    <p className="text-xs text-muted-foreground">until 11:00 AM</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  {plural(rooms, "room", "rooms")} ·{" "}
                  {plural(adults, "adult", "adults")}
                  {children ? `, ${plural(children, "child", "children")}` : ""}
                </p>

                <Perforation />

                {hasStay ? (
                  <dl className="flex flex-col gap-2.5" aria-live="polite">
                    <ReceiptRow
                      label="Nightly rate"
                      value={currencyExact.format(nightlyRate)}
                    />
                    <ReceiptRow
                      label="Nights"
                      value={`× ${nights}`}
                    />
                    <ReceiptRow label="Rooms" value={`× ${rooms}`} />
                    <div className="my-0.5 border-t border-border/70" />
                    <ReceiptRow
                      strong
                      label="Room subtotal"
                      value={currencyExact.format(subtotal)}
                    />
                    <ReceiptRow
                      label={`Taxes & fees (${Math.round(TAX_RATE * 100)}%)`}
                      value={currencyExact.format(taxes)}
                    />
                  </dl>
                ) : (
                  <div className="flex flex-col items-center gap-2 rounded-[12px] border border-dashed border-border/70 px-4 py-6 text-center">
                    <span className="flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <CalendarIcon className="size-4" aria-hidden />
                    </span>
                    <p className="text-sm font-medium">Choose your dates</p>
                    <p className="text-pretty text-xs leading-5 text-muted-foreground">
                      From {currency.format(nightlyRate)} per night. Add check-in
                      and check-out to see the full breakdown.
                    </p>
                  </div>
                )}

                <Perforation />

                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <span className="text-sm font-medium">Total (USD)</span>
                  <span className="text-3xl font-semibold tabular-nums tracking-tight">
                    {hasStay ? currencyExact.format(total) : "—"}
                  </span>
                </div>

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
                  Demo form — you won&apos;t be charged and nothing is booked.
                </p>
              </div>
            </aside>
          </div>

          {/* Mobile dock */}
          <div className="sticky bottom-0 z-20 mt-8 flex flex-col gap-2 border-t border-border/70 bg-card/95 p-3 backdrop-blur supports-[backdrop-filter]:bg-card/85 lg:hidden">
            {attempted && hasErrors ? (
              <FieldError>
                Please fix the highlighted fields to continue.
              </FieldError>
            ) : null}
            <div className="mx-auto flex w-full max-w-6xl items-center gap-3 sm:px-3">
              <div className="min-w-0 flex-1 text-start" aria-live="polite">
                <p className="truncate text-xs leading-5 text-muted-foreground">
                  {hasStay
                    ? `${room?.name} · ${plural(nights, "night", "nights")} · ${plural(rooms, "room", "rooms")}`
                    : "Choose dates to see your price"}
                </p>
                <p className="text-lg font-semibold tabular-nums leading-6">
                  {hasStay ? currencyExact.format(total) : "—"}
                  <span className="ms-1.5 text-xs font-normal text-muted-foreground">
                    incl. taxes · demo
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
    </section>
  )
}
