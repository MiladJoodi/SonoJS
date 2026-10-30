"use client"

import * as React from "react"
import {
  CheckIcon,
  ChevronDownIcon,
  LoaderCircleIcon,
  MinusIcon,
  PlusIcon,
  RotateCcwIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  TruckIcon,
  Undo2Icon,
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
import { RadioGroup, RadioGroupItem } from "@sonojs/ui/components/radio-group"
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

import product1 from "./images/product-1.webp"
import product2 from "./images/product-2.webp"
import product3 from "./images/product-3.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

/* -------------------------------------------------------------------------- */
/* Sample data                                                                */
/* -------------------------------------------------------------------------- */

const PRODUCT = {
  brand: "Atlas Goods",
  name: "Atlas Everyday Tote",
  tagline: "Water-resistant carry-all with a padded laptop sleeve.",
  description:
    "Woven from recycled ripstop with a bonded lining, the Atlas holds a 15-inch laptop, a change of clothes and a lunch without sagging. Internal zip pocket, bottle sleeve and reinforced handles keep things where you left them.",
  price: 89,
  compareAt: 109,
  highlights: [
    "Recycled ripstop, water-resistant finish",
    "Padded sleeve fits up to 15\u2033 laptops",
    "Lifetime stitching guarantee",
  ],
} as const

const GALLERY = [
  { id: "front", label: "Front view", src: assetSrc(product1) },
  { id: "side", label: "Side view", src: assetSrc(product2) },
  { id: "detail", label: "Detail view", src: assetSrc(product3) },
]

const SIZES = [
  { id: "s", label: "S", detail: "12 L" },
  { id: "m", label: "M", detail: "18 L" },
  { id: "l", label: "L", detail: "24 L" },
  { id: "xl", label: "XL", detail: "30 L" },
] as const

const COLORS = [
  { id: "midnight", label: "Midnight", swatch: "#2f3a5f" },
  { id: "sand", label: "Sand", swatch: "#d9b98a" },
  { id: "forest", label: "Forest", swatch: "#2f5d46" },
] as const

type SizeId = (typeof SIZES)[number]["id"]
type ColorId = (typeof COLORS)[number]["id"]

/** Units in stock per color/size. `0` means that combination is unavailable. */
const STOCK: Record<ColorId, Record<SizeId, number>> = {
  midnight: { s: 8, m: 12, l: 3, xl: 0 },
  sand: { s: 0, m: 5, l: 9, xl: 2 },
  forest: { s: 4, m: 0, l: 6, xl: 1 },
}

const MAX_PER_ORDER = 10
const FREE_SHIPPING_FROM = 150

const SHIPPING = [
  {
    id: "standard",
    name: "Standard",
    eta: "5–7 business days",
    cost: 6,
  },
  {
    id: "express",
    name: "Express",
    eta: "2–3 business days",
    cost: 14,
  },
  {
    id: "overnight",
    name: "Overnight",
    eta: "Next business day",
    cost: 29,
  },
] as const

type ShippingId = (typeof SHIPPING)[number]["id"]

const STATES: ReadonlyArray<readonly [string, string]> = [
  ["AZ", "Arizona"],
  ["CA", "California"],
  ["CO", "Colorado"],
  ["FL", "Florida"],
  ["GA", "Georgia"],
  ["IL", "Illinois"],
  ["MA", "Massachusetts"],
  ["MI", "Michigan"],
  ["MN", "Minnesota"],
  ["NC", "North Carolina"],
  ["NJ", "New Jersey"],
  ["NV", "Nevada"],
  ["NY", "New York"],
  ["OH", "Ohio"],
  ["OR", "Oregon"],
  ["PA", "Pennsylvania"],
  ["TX", "Texas"],
  ["UT", "Utah"],
  ["VA", "Virginia"],
  ["WA", "Washington"],
]

const TRUST = [
  { icon: ShieldCheckIcon, label: "Secure checkout" },
  { icon: TruckIcon, label: "Ships in 1 day" },
  { icon: Undo2Icon, label: "30-day returns" },
] as const

const LIMITS = { notesMax: 300 }

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const POSTAL_RE = /^[A-Za-z0-9][A-Za-z0-9 -]{2,9}$/

type FormErrors = Partial<
  Record<
    | "quantity"
    | "name"
    | "email"
    | "phone"
    | "address"
    | "city"
    | "state"
    | "postal"
    | "notes",
    string
  >
>

function Required() {
  return (
    <span className="text-destructive" aria-hidden>
      *
    </span>
  )
}

function Legend({ children }: { children: React.ReactNode }) {
  return (
    <legend className="mb-4 p-0 text-sm font-semibold tracking-tight">
      {children}
    </legend>
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
        strong ? "font-semibold" : "text-muted-foreground"
      )}
    >
      <dt>{label}</dt>
      <dd className="shrink-0 text-end tabular-nums">{value}</dd>
    </div>
  )
}

/** Decorative, deterministic barcode for the packing slip. */
function Barcode({ seed }: { seed: string }) {
  const bars = Array.from({ length: 44 }, (_, i) => {
    const code = seed.charCodeAt(i % seed.length) + i * 7
    return (code % 3) + 1
  })
  return (
    <div
      dir="ltr"
      aria-hidden
      className="flex h-10 items-stretch justify-center gap-[2px] overflow-hidden"
    >
      {bars.map((w, i) => (
        <span
          key={i}
          className="bg-foreground"
          style={{ width: `${w}px`, opacity: i % 5 === 0 ? 0.55 : 1 }}
        />
      ))}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Block                                                                      */
/* -------------------------------------------------------------------------- */

export default function ProductOrderForm({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const uid = React.useId()
  const formId = `${uid}-form`
  const id = (name: string) => `${uid}-${name}`

  const checkoutRef = React.useRef<HTMLDivElement>(null)

  const [imageId, setImageId] = React.useState(GALLERY[0].id)
  const [size, setSize] = React.useState<SizeId>("m")
  const [color, setColor] = React.useState<ColorId>("midnight")
  const [quantity, setQuantity] = React.useState(1)
  const [bagged, setBagged] = React.useState(false)
  const [receiptOpen, setReceiptOpen] = React.useState(false)
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [address, setAddress] = React.useState("")
  const [city, setCity] = React.useState("")
  const [state, setState] = React.useState("")
  const [postal, setPostal] = React.useState("")
  const [shippingId, setShippingId] = React.useState<ShippingId>("standard")
  const [notes, setNotes] = React.useState("")

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

  /* Derived ----------------------------------------------------------------- */

  const stock = STOCK[color][size]
  const maxQty = Math.min(stock, MAX_PER_ORDER)
  const imageIndex = Math.max(
    0,
    GALLERY.findIndex((g) => g.id === imageId)
  )
  const mainImage = GALLERY[imageIndex]
  const sizeLabel = SIZES.find((s) => s.id === size)?.label
  const colorLabel = COLORS.find((c) => c.id === color)?.label
  const shipping = SHIPPING.find((s) => s.id === shippingId) ?? SHIPPING[0]

  const subtotal = PRODUCT.price * quantity
  const freeShipping =
    shipping.id === "standard" && subtotal >= FREE_SHIPPING_FROM
  const shippingCost = freeShipping ? 0 : shipping.cost
  const total = subtotal + shippingCost
  const untilFree = Math.max(0, FREE_SHIPPING_FROM - subtotal)
  const freeProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_FROM) * 100))

  /* Variant handlers keep the pair in a purchasable state ------------------- */

  function clampQty(next: number, nextStock: number) {
    return Math.max(1, Math.min(next, Math.min(nextStock, MAX_PER_ORDER)))
  }

  function handleSize(next: SizeId) {
    if (STOCK[color][next] <= 0) return
    setSize(next)
    setQuantity((q) => clampQty(q, STOCK[color][next]))
  }

  function handleColor(next: ColorId) {
    if (STOCK[next][size] <= 0) return
    setColor(next)
    setQuantity((q) => clampQty(q, STOCK[next][size]))
  }

  function scrollToCheckout() {
    requestAnimationFrame(() =>
      checkoutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    )
  }

  function handleAddToBag() {
    if (stock === 0) return
    if (!bagged) setBagged(true)
    scrollToCheckout()
  }

  /* Validation -------------------------------------------------------------- */

  const errors = React.useMemo<FormErrors>(() => {
    const next: FormErrors = {}
    if (quantity < 1) next.quantity = "Order at least 1 item."
    else if (quantity > maxQty)
      next.quantity = `Only ${maxQty} available in this size and color.`
    if (name.trim().length < 2) next.name = "Enter your full name."
    if (!EMAIL_RE.test(email.trim())) next.email = "Enter a valid email address."
    const digits = phone.replace(/\D/g, "")
    if (digits.length < 7 || digits.length > 15)
      next.phone = "Enter a valid phone number (7–15 digits)."
    if (address.trim().length < 5) next.address = "Enter your street address."
    if (city.trim().length < 2) next.city = "Enter your city."
    if (!state) next.state = "Select a state."
    if (!POSTAL_RE.test(postal.trim()))
      next.postal = "Enter a valid postal code (3–10 characters)."
    if (notes.length > LIMITS.notesMax)
      next.notes = `Keep notes under ${LIMITS.notesMax} characters.`
    return next
  }, [quantity, maxQty, name, email, phone, address, city, state, postal, notes])

  const hasErrors = Object.values(errors).some(Boolean)
  const show = (key: keyof FormErrors) =>
    attempted && errors[key] ? errors[key] : undefined

  /* Submit ------------------------------------------------------------------ */

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAttempted(true)
    if (hasErrors || submitting) return
    setSubmitting(true)
    timer.current = setTimeout(() => {
      setSubmitting(false)
      setReference(`ORD-${Math.floor(1000 + Math.random() * 9000)}`)
    }, 700)
  }

  function handleReset() {
    if (timer.current) clearTimeout(timer.current)
    setImageId(GALLERY[0].id)
    setSize("m")
    setColor("midnight")
    setQuantity(1)
    setBagged(false)
    setReceiptOpen(false)
    setName("")
    setEmail("")
    setPhone("")
    setAddress("")
    setCity("")
    setState("")
    setPostal("")
    setShippingId("standard")
    setNotes("")
    setAttempted(false)
    setSubmitting(false)
    setReference(null)
  }

  /* Render ------------------------------------------------------------------ */

  const lowStock = stock > 0 && stock <= 5

  const receiptLines = (
    <>
      <div className="flex items-center gap-3 text-start">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mainImage.src}
          alt=""
          className="size-14 shrink-0 rounded-md border border-border/70 bg-muted object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{PRODUCT.name}</p>
          <p className="text-xs text-muted-foreground">
            {colorLabel} · {sizeLabel} · Qty {quantity}
          </p>
        </div>
        <p className="shrink-0 text-sm font-medium tabular-nums">
          {currency.format(subtotal)}
        </p>
      </div>
      <dl className="flex flex-col gap-2 border-t border-dashed border-border pt-4">
        <ReceiptRow label="Subtotal" value={currency.format(subtotal)} />
        <ReceiptRow
          label={`Shipping · ${shipping.name}`}
          value={shippingCost === 0 ? "Free" : currency.format(shippingCost)}
        />
      </dl>
    </>
  )

  const placeOrderLabel = submitting ? (
    <>
      <LoaderCircleIcon className="animate-spin" aria-hidden />
      Placing order…
    </>
  ) : (
    "Place order"
  )

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white px-4 py-10 text-foreground dark:bg-background sm:px-6 sm:py-14",
        className
      )}
      aria-labelledby={id("heading")}
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl">
        {reference ? (
          /* ---------------------------- Packing slip --------------------------- */
          <div
            role="status"
            className="mx-auto w-full max-w-2xl overflow-hidden rounded-[12px] border border-border/70 bg-card text-start shadow-soft"
          >
            <div className="flex items-start justify-between gap-4 p-6 sm:p-8">
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Packing slip
                </p>
                <h2
                  id={id("heading")}
                  dir="ltr"
                  className="mt-1 break-all font-mono text-2xl font-semibold tracking-widest sm:text-3xl"
                >
                  {reference}
                </h2>
                <p className="mt-2 text-pretty text-sm leading-6 text-muted-foreground">
                  Thanks, {name.trim().split(" ")[0]}. Your bag is packed
                  &mdash; in this demo, nothing was charged or shipped.
                </p>
              </div>
              <Badge variant="outline" className="shrink-0">
                Demo
              </Badge>
            </div>

            <div className="border-y border-dashed border-border bg-muted/30 px-6 py-4 sm:px-8">
              <Barcode seed={reference} />
              <p
                dir="ltr"
                className="mt-1 text-center font-mono text-[11px] tracking-[0.3em] text-muted-foreground"
              >
                {reference.replace("-", " ")} · DEMO
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 sm:p-8 [&>div]:min-w-0 [&>div]:break-words">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Ship to
                </p>
                <p className="mt-2 text-sm font-medium">{name.trim()}</p>
                <p className="text-sm text-muted-foreground">
                  {address.trim()}
                  <br />
                  {city.trim()}, {state} {postal.trim().toUpperCase()}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Method
                </p>
                <p className="mt-2 text-sm font-medium">{shipping.name}</p>
                <p className="text-sm text-muted-foreground">{shipping.eta}</p>
              </div>
            </div>

            <div className="px-6 pb-6 sm:px-8 sm:pb-8">
              <div className="flex items-center gap-3 rounded-md border border-border/70 p-3 sm:gap-4">
                <span
                  aria-hidden
                  className="hidden size-4 shrink-0 rounded-[4px] border border-border sm:block"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mainImage.src}
                  alt=""
                  className="size-14 shrink-0 rounded-md bg-muted object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="break-words text-sm font-medium sm:truncate">
                    {PRODUCT.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {colorLabel} · {sizeLabel}
                    <span className="sm:hidden"> · &times;{quantity}</span>
                  </p>
                </div>
                <p className="hidden text-sm tabular-nums text-muted-foreground sm:block">
                  &times;{quantity}
                </p>
                <p className="shrink-0 text-end text-sm font-medium tabular-nums sm:w-20">
                  {currency.format(subtotal)}
                </p>
              </div>

              <dl className="mt-5 flex flex-col gap-2">
                <ReceiptRow label="Subtotal" value={currency.format(subtotal)} />
                <ReceiptRow
                  label={`Shipping · ${shipping.name}`}
                  value={
                    shippingCost === 0 ? "Free" : currency.format(shippingCost)
                  }
                />
                <Separator className="my-1" />
                <ReceiptRow
                  strong
                  label="Total"
                  value={currency.format(total)}
                />
              </dl>

              {notes.trim() ? (
                <p className="mt-5 rounded-md bg-muted/40 p-3 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Note: </span>
                  {notes.trim()}
                </p>
              ) : null}

              <Button
                type="button"
                variant="outline"
                className="mt-6 w-full cursor-pointer sm:w-auto"
                onClick={handleReset}
              >
                <RotateCcwIcon aria-hidden />
                Reset &amp; start a new order
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* ------------------------------ PDP ------------------------------ */}
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-14">
              {/* Gallery */}
              <div className="flex min-w-0 flex-col-reverse gap-3 lg:sticky lg:top-6 lg:flex-row">
                <div
                  role="group"
                  aria-label="Product images"
                  className="flex shrink-0 gap-2 lg:w-[72px] lg:flex-col"
                >
                  {GALLERY.map((item) => {
                    const active = item.id === imageId
                    return (
                      <button
                        key={item.id}
                        type="button"
                        aria-pressed={active}
                        aria-label={item.label}
                        onClick={() => setImageId(item.id)}
                        className={cn(
                          "w-16 cursor-pointer overflow-hidden rounded-md border bg-muted/40 outline-none transition-all focus-visible:ring-[3px] focus-visible:ring-ring/40 lg:w-full",
                          active
                            ? "border-foreground"
                            : "border-border/70 opacity-70 hover:opacity-100"
                        )}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.src}
                          alt=""
                          loading="lazy"
                          className="aspect-square w-full object-cover"
                        />
                      </button>
                    )
                  })}
                </div>

                <div className="relative min-w-0 flex-1 overflow-hidden rounded-[12px] border border-border/70 bg-muted/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={mainImage.src}
                    alt={`${PRODUCT.name} — ${mainImage.label.toLowerCase()}`}
                    className="aspect-[4/5] w-full object-cover"
                  />
                  <Badge className="absolute start-3 top-3">
                    Save {currency.format(PRODUCT.compareAt - PRODUCT.price)}
                  </Badge>
                  <span
                    dir="ltr"
                    className="absolute bottom-3 end-3 rounded-full bg-background/80 px-2.5 py-1 text-xs font-medium tabular-nums backdrop-blur"
                  >
                    {imageIndex + 1} / {GALLERY.length}
                  </span>
                </div>
              </div>

              {/* Buy box */}
              <div className="flex min-w-0 flex-col gap-6 text-start">
                <div className="flex flex-col gap-3">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    {PRODUCT.brand}
                  </p>
                  <h1
                    id={id("heading")}
                    className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
                  >
                    {PRODUCT.name}
                  </h1>
                  <p className="text-pretty text-base leading-6 text-muted-foreground">
                    {PRODUCT.tagline}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="text-2xl font-semibold tabular-nums">
                      {currency.format(PRODUCT.price)}
                    </span>
                    <span className="text-base text-muted-foreground line-through tabular-nums">
                      {currency.format(PRODUCT.compareAt)}
                    </span>
                    {stock === 0 ? (
                      <Badge variant="destructive">Out of stock</Badge>
                    ) : lowStock ? (
                      <Badge variant="outline">Only {stock} left</Badge>
                    ) : (
                      <Badge variant="secondary">In stock</Badge>
                    )}
                  </div>
                </div>

                {/* Color swatches */}
                <Field>
                  <FieldLabel id={id("color-label")}>
                    Color
                    <span className="font-normal text-muted-foreground">
                      {colorLabel}
                    </span>
                  </FieldLabel>
                  <RadioGroup
                    value={color}
                    onValueChange={(v) => handleColor(v as ColorId)}
                    aria-labelledby={id("color-label")}
                    className="flex flex-wrap gap-3"
                  >
                    {COLORS.map((c) => {
                      const available = STOCK[c.id][size] > 0
                      return (
                        <label
                          key={c.id}
                          title={
                            available
                              ? c.label
                              : `${c.label} — unavailable in ${sizeLabel}`
                          }
                          className={cn(
                            "relative flex size-11 cursor-pointer items-center justify-center rounded-full border border-transparent p-1 transition-colors has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/40 has-data-[state=checked]:border-foreground",
                            !available && "cursor-not-allowed opacity-40"
                          )}
                        >
                          <RadioGroupItem
                            value={c.id}
                            disabled={!available}
                            aria-label={
                              available
                                ? c.label
                                : `${c.label} (unavailable in ${sizeLabel})`
                            }
                            className="absolute inset-0 size-full rounded-[inherit] opacity-0"
                          />
                          <span
                            aria-hidden
                            className="size-full rounded-full border border-black/10"
                            style={{ backgroundColor: c.swatch }}
                          />
                          {!available ? (
                            <span
                              aria-hidden
                              className="absolute inset-x-1 top-1/2 h-px -rotate-45 bg-foreground/70"
                            />
                          ) : null}
                        </label>
                      )
                    })}
                  </RadioGroup>
                </Field>

                {/* Size segmented control */}
                <Field>
                  <FieldLabel id={id("size-label")}>
                    Size
                    <span className="font-normal text-muted-foreground">
                      {sizeLabel}
                    </span>
                  </FieldLabel>
                  <RadioGroup
                    value={size}
                    onValueChange={(v) => handleSize(v as SizeId)}
                    aria-labelledby={id("size-label")}
                    className="grid h-[46px] grid-cols-4 gap-1 rounded-md bg-muted p-1"
                  >
                    {SIZES.map((s) => {
                      const available = STOCK[color][s.id] > 0
                      return (
                        <label
                          key={s.id}
                          className={cn(
                            "relative flex cursor-pointer items-center justify-center gap-1.5 rounded-[8px] px-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/40 has-data-[state=checked]:bg-card has-data-[state=checked]:text-foreground has-data-[state=checked]:shadow-sm",
                            !available &&
                              "cursor-not-allowed line-through opacity-40 hover:text-muted-foreground"
                          )}
                        >
                          <RadioGroupItem
                            value={s.id}
                            disabled={!available}
                            aria-label={
                              available
                                ? `${s.label}, ${s.detail}`
                                : `${s.label} (unavailable in ${colorLabel})`
                            }
                            className="absolute inset-0 size-full rounded-[inherit] opacity-0"
                          />
                          <span>{s.label}</span>
                          <span className="hidden text-xs font-normal opacity-70 sm:inline">
                            {s.detail}
                          </span>
                        </label>
                      )
                    })}
                  </RadioGroup>
                  <FieldDescription>
                    Crossed-out sizes aren&apos;t available in {colorLabel}.
                  </FieldDescription>
                </Field>

                {/* Free-shipping nudge */}
                <div className="flex flex-col gap-2 rounded-md border border-border/70 bg-card p-3.5">
                  <p className="text-sm">
                    {untilFree > 0 ? (
                      <>
                        You&apos;re{" "}
                        <span className="font-semibold tabular-nums">
                          {currency.format(untilFree)}
                        </span>{" "}
                        away from free standard shipping.
                      </>
                    ) : (
                      <span className="font-medium">
                        You&apos;ve unlocked free standard shipping.
                      </span>
                    )}
                  </p>
                  <div
                    role="progressbar"
                    aria-label="Progress to free shipping"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={freeProgress}
                    className="h-1.5 overflow-hidden rounded-full bg-muted"
                  >
                    <div
                      className="h-full rounded-full bg-primary transition-[width]"
                      style={{ width: `${freeProgress}%` }}
                    />
                  </div>
                </div>

                {/* Quantity + CTA */}
                <Field data-invalid={!!show("quantity")}>
                  <div className="flex flex-wrap items-stretch gap-3 sm:flex-nowrap">
                    <div
                      role="group"
                      aria-label="Quantity"
                      className="flex h-[46px] shrink-0 items-center rounded-md border border-border/70 bg-background"
                    >
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer rounded-e-none"
                        aria-label="Decrease quantity"
                        disabled={quantity <= 1}
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      >
                        <MinusIcon aria-hidden />
                      </Button>
                      <output
                        id={id("quantity")}
                        aria-live="polite"
                        className="w-8 text-center text-sm font-semibold tabular-nums"
                      >
                        {quantity}
                      </output>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer rounded-s-none"
                        aria-label="Increase quantity"
                        disabled={quantity >= maxQty}
                        onClick={() =>
                          setQuantity((q) => Math.min(maxQty, q + 1))
                        }
                      >
                        <PlusIcon aria-hidden />
                      </Button>
                    </div>
                    <Button
                      type="button"
                      size="lg"
                      className="h-[46px] min-w-[13rem] flex-1 cursor-pointer sm:min-w-0"
                      disabled={stock === 0}
                      onClick={handleAddToBag}
                    >
                      {bagged ? (
                        <>
                          <CheckIcon aria-hidden />
                          In your bag · Checkout
                        </>
                      ) : (
                        <>
                          <ShoppingBagIcon aria-hidden />
                          Add to bag · {currency.format(subtotal)}
                        </>
                      )}
                    </Button>
                  </div>
                  <FieldDescription>
                    {quantity >= maxQty
                      ? stock <= MAX_PER_ORDER
                        ? `All ${stock} in stock selected.`
                        : `Limit ${MAX_PER_ORDER} per order.`
                      : `${stock} in stock · limit ${MAX_PER_ORDER} per order.`}
                  </FieldDescription>
                  <FieldError>{show("quantity")}</FieldError>
                </Field>

                {/* Trust row */}
                <ul className="grid grid-cols-3 gap-2 border-y border-border/70 py-4">
                  {TRUST.map(({ icon: Icon, label }) => (
                    <li
                      key={label}
                      className="flex flex-col items-center gap-1.5 text-center text-xs text-muted-foreground"
                    >
                      <Icon className="size-5 text-foreground" aria-hidden />
                      {label}
                    </li>
                  ))}
                </ul>

                {/* Accordion info */}
                <div className="-mt-3 flex flex-col">
                  <details className="group border-b border-border/70 py-4" open>
                    <summary className="-my-[13px] flex min-h-[46px] cursor-pointer list-none items-center justify-between text-sm font-medium [&::-webkit-details-marker]:hidden">
                      Details
                      <ChevronDownIcon
                        className="size-4 transition-transform group-open:rotate-180"
                        aria-hidden
                      />
                    </summary>
                    <p className="mt-3 text-pretty text-sm leading-6 text-muted-foreground">
                      {PRODUCT.description}
                    </p>
                    <ul className="mt-3 flex flex-col gap-1.5 text-sm">
                      {PRODUCT.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2">
                          <CheckIcon
                            className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                            aria-hidden
                          />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                  <details className="group border-b border-border/70 py-4">
                    <summary className="-my-[13px] flex min-h-[46px] cursor-pointer list-none items-center justify-between text-sm font-medium [&::-webkit-details-marker]:hidden">
                      Shipping &amp; returns
                      <ChevronDownIcon
                        className="size-4 transition-transform group-open:rotate-180"
                        aria-hidden
                      />
                    </summary>
                    <p className="mt-3 text-pretty text-sm leading-6 text-muted-foreground">
                      Standard shipping is free on orders over{" "}
                      {currency.format(FREE_SHIPPING_FROM)}. Unused items can be
                      returned within 30 days. Demo form &mdash; nothing is
                      charged or shipped.
                    </p>
                  </details>
                </div>
              </div>
            </div>

            {/* ---------------------------- Checkout --------------------------- */}
            {bagged ? (
              <div
                ref={checkoutRef}
                className="mt-12 scroll-mt-6 border-t border-border/70 pt-10"
              >
                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
                  <form
                    id={formId}
                    noValidate
                    onSubmit={handleSubmit}
                    className="flex min-w-0 flex-col gap-8 rounded-[12px] border border-border/70 bg-card p-5 text-start shadow-soft sm:p-8"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-xl font-semibold tracking-tight">
                          Checkout
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Where should we send your bag?
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-11 shrink-0 cursor-pointer"
                        onClick={() => setBagged(false)}
                      >
                        Remove from bag
                      </Button>
                    </div>

                    <fieldset className="min-w-0">
                      <Legend>Contact</Legend>
                      <FieldGroup className="gap-4">
                        <Field data-invalid={!!show("name")}>
                          <FieldLabel htmlFor={id("name")}>
                            Full name <Required />
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
                              Email <Required />
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
                              Phone <Required />
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
                      </FieldGroup>
                    </fieldset>

                    <Separator />

                    <fieldset className="min-w-0">
                      <Legend>Shipping address</Legend>
                      <FieldGroup className="gap-4">
                        <Field data-invalid={!!show("address")}>
                          <FieldLabel htmlFor={id("address")}>
                            Street address <Required />
                          </FieldLabel>
                          <Input
                            id={id("address")}
                            name="address"
                            autoComplete="street-address"
                            dir="ltr"
                            placeholder="214 Market Street, Apt 5"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            aria-invalid={!!show("address")}
                          />
                          <FieldError>{show("address")}</FieldError>
                        </Field>
                        <Field data-invalid={!!show("city")}>
                          <FieldLabel htmlFor={id("city")}>
                            City <Required />
                          </FieldLabel>
                          <Input
                            id={id("city")}
                            name="city"
                            autoComplete="address-level2"
                            placeholder="Portland"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            aria-invalid={!!show("city")}
                          />
                          <FieldError>{show("city")}</FieldError>
                        </Field>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <Field data-invalid={!!show("state")}>
                            <FieldLabel htmlFor={id("state")}>
                              State <Required />
                            </FieldLabel>
                            <Select value={state} onValueChange={setState}>
                              <SelectTrigger
                                id={id("state")}
                                className="w-full cursor-pointer"
                                aria-invalid={!!show("state")}
                              >
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                {STATES.map(([code, label]) => (
                                  <SelectItem key={code} value={code}>
                                    {label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FieldError>{show("state")}</FieldError>
                          </Field>
                          <Field data-invalid={!!show("postal")}>
                            <FieldLabel htmlFor={id("postal")}>
                              Postal code <Required />
                            </FieldLabel>
                            <Input
                              id={id("postal")}
                              name="postal"
                              dir="ltr"
                              autoComplete="postal-code"
                              placeholder="97201"
                              value={postal}
                              onChange={(e) => setPostal(e.target.value)}
                              aria-invalid={!!show("postal")}
                            />
                            <FieldError>{show("postal")}</FieldError>
                          </Field>
                        </div>
                      </FieldGroup>
                    </fieldset>

                    <Separator />

                    <fieldset className="min-w-0">
                      <Legend>Delivery</Legend>
                      <RadioGroup
                        value={shippingId}
                        onValueChange={(v) => setShippingId(v as ShippingId)}
                        aria-label="Shipping method"
                        className="grid grid-cols-1 gap-0 divide-y divide-border/70 overflow-hidden rounded-md border border-border/70"
                      >
                        {SHIPPING.map((option) => {
                          const free =
                            option.id === "standard" &&
                            subtotal >= FREE_SHIPPING_FROM
                          return (
                            <label
                              key={option.id}
                              htmlFor={id(`ship-${option.id}`)}
                              className="flex cursor-pointer items-center gap-3 bg-background p-4 transition-colors hover:bg-muted/40 has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-inset has-[:focus-visible]:ring-ring/40 has-data-[state=checked]:bg-primary/5"
                            >
                              <RadioGroupItem
                                id={id(`ship-${option.id}`)}
                                value={option.id}
                                className="cursor-pointer"
                              />
                              <span className="flex min-w-0 flex-1 flex-col text-start">
                                <span className="text-sm font-medium leading-5">
                                  {option.name}
                                </span>
                                <span className="text-xs leading-5 text-muted-foreground">
                                  {option.eta}
                                </span>
                              </span>
                              <span className="shrink-0 text-sm font-semibold tabular-nums">
                                {free ? (
                                  <Badge variant="secondary">Free</Badge>
                                ) : (
                                  currency.format(option.cost)
                                )}
                              </span>
                            </label>
                          )
                        })}
                      </RadioGroup>
                      <FieldDescription className="mt-2">
                        Standard shipping is free on orders over{" "}
                        {currency.format(FREE_SHIPPING_FROM)}.
                      </FieldDescription>
                    </fieldset>

                    <Field data-invalid={!!show("notes")}>
                      <FieldLabel htmlFor={id("notes")}>
                        Order notes{" "}
                        <span className="font-normal text-muted-foreground">
                          (optional)
                        </span>
                      </FieldLabel>
                      <Textarea
                        id={id("notes")}
                        name="notes"
                        rows={3}
                        placeholder="Gift message, delivery instructions…"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        aria-invalid={!!show("notes")}
                      />
                      <div className="flex items-start justify-between gap-3">
                        <FieldDescription>
                          Notes are passed to the courier, not the warehouse.
                        </FieldDescription>
                        <span
                          className={cn(
                            "shrink-0 text-xs tabular-nums text-muted-foreground",
                            notes.length > LIMITS.notesMax && "text-destructive"
                          )}
                        >
                          {notes.length}/{LIMITS.notesMax}
                        </span>
                      </div>
                      <FieldError>{show("notes")}</FieldError>
                    </Field>

                    {attempted && hasErrors ? (
                      <FieldError>
                        Please fix the highlighted fields to continue.
                      </FieldError>
                    ) : null}
                  </form>

                  {/* Desktop receipt */}
                  <aside
                    aria-label="Order summary"
                    className="hidden flex-col gap-4 rounded-[12px] border border-border/70 bg-card p-5 text-start shadow-soft lg:sticky lg:top-6 lg:flex"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        Your receipt
                      </h2>
                      <Badge variant="outline">Demo</Badge>
                    </div>
                    <div aria-live="polite" className="flex flex-col gap-4">
                      {receiptLines}
                    </div>
                    <div className="flex items-baseline justify-between border-t border-dashed border-border pt-4">
                      <span className="text-sm font-medium">Total (USD)</span>
                      <span className="text-2xl font-semibold tabular-nums tracking-tight">
                        {currency.format(total)}
                      </span>
                    </div>
                    <Button
                      type="submit"
                      form={formId}
                      size="lg"
                      className="w-full cursor-pointer"
                      disabled={submitting || stock === 0}
                    >
                      {placeOrderLabel}
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                      Demo form — nothing is charged or shipped.
                    </p>
                  </aside>
                </div>

                {/* Mobile bottom sheet — sticky within the checkout wrapper (not a grid cell) */}
                <aside
                  aria-label="Order summary"
                  className="sticky bottom-3 z-20 mt-6 flex flex-col overflow-hidden rounded-[12px] border border-border/70 bg-card text-start shadow-soft lg:hidden"
                >
                  {receiptOpen ? (
                    <div
                      id={id("sheet")}
                      aria-live="polite"
                      className="flex flex-col gap-4 border-b border-border/70 p-4"
                    >
                      {receiptLines}
                    </div>
                  ) : null}
                  <div className="flex items-center gap-3 p-3">
                    <button
                      type="button"
                      aria-expanded={receiptOpen}
                      aria-controls={id("sheet")}
                      onClick={() => setReceiptOpen((v) => !v)}
                      className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 rounded-md p-1 text-start outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
                    >
                      <ChevronDownIcon
                        className={cn(
                          "size-4 shrink-0 transition-transform",
                          !receiptOpen && "rotate-180"
                        )}
                        aria-hidden
                      />
                      <span className="flex min-w-0 flex-col">
                        <span className="text-xs text-muted-foreground">
                          Total · {quantity}{" "}
                          {quantity === 1 ? "item" : "items"}
                        </span>
                        <span className="text-base font-semibold tabular-nums">
                          {currency.format(total)}
                        </span>
                      </span>
                    </button>
                    <Button
                      type="submit"
                      form={formId}
                      className="cursor-pointer"
                      disabled={submitting || stock === 0}
                    >
                      {placeOrderLabel}
                    </Button>
                  </div>
                </aside>
              </div>
            ) : null}
          </>
        )}
      </div>
    </section>
  )
}
