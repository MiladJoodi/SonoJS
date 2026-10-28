"use client"

import * as React from "react"
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  MinusIcon,
  PackageIcon,
  PlusIcon,
  RotateCcwIcon,
  Share2Icon,
  ShieldIcon,
  ShoppingCartIcon,
  StarIcon,
  ThumbsUpIcon,
  TruckIcon,
  ZapIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@sonojs/ui/components/breadcrumb"
import { Button } from "@sonojs/ui/components/button"
import { Separator } from "@sonojs/ui/components/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@sonojs/ui/components/tabs"
import { cn } from "@/lib/utils"

import headphones1 from "./images/headphones-1.webp"
import headphones2 from "./images/headphones-2.webp"
import headphones3 from "./images/headphones-3.webp"
import headphones4 from "./images/headphones-4.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const PRODUCT = {
  id: "wh-pro-900",
  name: "Wireless Headphones Pro 900",
  brand: "SoundCraft",
  sku: "SC-WHP-900-BLK",
  rating: 4.8,
  reviewCount: 2340,
  price: 249.99,
  originalPrice: 329.99,
  discountPct: 24,
  badge: "Best Seller",
  description:
    "Experience sound like never before. The Pro 900 delivers studio-quality audio with 40mm drivers, active noise cancellation, and up to 30-hour battery life. Crafted from premium materials with a foldable design for on-the-go listening.",
  images: [
    {
      src: assetSrc(headphones1),
      alt: "Wireless Headphones Pro 900 — front view on black",
    },
    {
      src: assetSrc(headphones2),
      alt: "Headphones with keyboard and mouse on a desk mat",
    },
    {
      src: assetSrc(headphones3),
      alt: "Workstation flat lay with headphones, keyboard, and mouse",
    },
    {
      src: assetSrc(headphones4),
      alt: "Pearl White headphones with keyboard on a pastel desk",
    },
  ],
  colors: [
    { id: "black", label: "Midnight Black", hex: "#1a1a2e" },
    { id: "white", label: "Pearl White", hex: "#f5f5f0" },
    { id: "blue", label: "Ocean Blue", hex: "#0077b6" },
  ],
  variants: ["Standard", "Studio Edition"],
  features: [
    "40mm Drivers",
    "Active Noise Cancellation",
    "30h Battery",
    "USB-C Fast Charge",
    "Bluetooth 5.3",
    "Foldable Design",
  ],
  specs: [
    { label: "Driver Size", value: "40mm Dynamic" },
    { label: "Frequency Response", value: "20 Hz – 20 kHz" },
    { label: "Battery Life", value: "Up to 30 hours" },
    { label: "Charging", value: "USB-C, 2 hr full charge" },
    { label: "Connectivity", value: "Bluetooth 5.3, 3.5mm" },
    { label: "Weight", value: "250g" },
    { label: "ANC", value: "Active Noise Cancellation" },
    { label: "Microphone", value: "Dual-beamforming mics" },
  ],
} as const

const REVIEWS = [
  {
    id: 1,
    author: "Sarah K.",
    initials: "SK",
    rating: 5,
    date: "Jun 12, 2026",
    title: "Best headphones I've ever owned",
    body: "The ANC is incredible — completely blocks out my open-plan office. Sound is warm and detailed. Battery lasts all week on a single charge. Highly recommend.",
    helpful: 142,
    verified: true,
  },
  {
    id: 2,
    author: "Marcus T.",
    initials: "MT",
    rating: 5,
    date: "Jun 5, 2026",
    title: "Studio quality for the price",
    body: "Compared these to my $500 studio headphones and was genuinely surprised. The mids and highs are crisp without being harsh. The build quality feels premium.",
    helpful: 98,
    verified: true,
  },
  {
    id: 3,
    author: "Priya N.",
    initials: "PN",
    rating: 4,
    date: "May 28, 2026",
    title: "Great but ear cushions could be better",
    body: "Love the sound and ANC. Gets a tiny bit uncomfortable after 3+ hours. Otherwise perfect. Wish the cushions were memory foam.",
    helpful: 67,
    verified: false,
  },
] as const

const TRUST_BADGES = [
  { icon: TruckIcon, label: "Free Shipping", sub: "On orders over $50" },
  { icon: RotateCcwIcon, label: "30-Day Returns", sub: "Hassle-free" },
  { icon: ShieldIcon, label: "2-Year Warranty", sub: "Manufacturer backed" },
  { icon: PackageIcon, label: "In Stock", sub: "Ships in 1–2 days" },
] as const

const RATING_BREAKDOWN = [
  { star: 5, pct: 72 },
  { star: 4, pct: 18 },
  { star: 3, pct: 6 },
  { star: 2, pct: 2 },
  { star: 1, pct: 2 },
] as const

function StarRating({
  rating,
  size = "sm",
}: {
  rating: number
  size?: "sm" | "md"
}) {
  const starSize = size === "md" ? "size-5" : "size-3.5"
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`Rating: ${rating} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((s) => (
        <StarIcon
          key={s}
          className={cn(
            starSize,
            s <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "text-muted-foreground/30"
          )}
          aria-hidden
        />
      ))}
    </div>
  )
}

function ImageGallery({
  images,
}: {
  images: readonly { src: string; alt: string }[]
}) {
  const [active, setActive] = React.useState(0)
  const current = images[active] ?? images[0]

  const prev = () =>
    setActive((i) => (i === 0 ? images.length - 1 : i - 1))
  const next = () =>
    setActive((i) => (i === images.length - 1 ? 0 : i + 1))

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-[12px] border border-border/70 bg-muted/40">
        <img
          src={current.src}
          alt={current.alt}
          className="size-full object-cover"
        />

        <Button
          type="button"
          variant="outline"
          size="icon-xs"
          onClick={prev}
          className="absolute inset-s-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-card/90 shadow-soft"
          aria-label="Previous image"
        >
          <ChevronLeftIcon className="size-4 icon-dir" aria-hidden />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon-xs"
          onClick={next}
          className="absolute inset-e-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-card/90 shadow-soft"
          aria-label="Next image"
        >
          <ChevronRightIcon className="size-4 icon-dir" aria-hidden />
        </Button>

        <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "h-2 rounded-full transition-all cursor-pointer",
                i === active
                  ? "w-4 bg-primary"
                  : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground/60"
              )}
              aria-label={`View image ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "aspect-square cursor-pointer overflow-hidden rounded-[12px] border-2 bg-muted/40 transition-all hover:border-primary/40",
              i === active ? "border-primary shadow-soft" : "border-border/70"
            )}
            aria-label={`View image ${i + 1}`}
            aria-pressed={i === active}
          >
            <img
              src={img.src}
              alt=""
              className="size-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default function ProductDetails09() {
  const [selectedColor, setSelectedColor] = React.useState<
    (typeof PRODUCT.colors)[number]["id"]
  >(PRODUCT.colors[0].id)
  const [selectedVariant, setSelectedVariant] = React.useState<
    (typeof PRODUCT.variants)[number]
  >(PRODUCT.variants[0])
  const [qty, setQty] = React.useState(1)
  const [wishlisted, setWishlisted] = React.useState(false)

  const savings = PRODUCT.originalPrice - PRODUCT.price
  const colorLabel =
    PRODUCT.colors.find((c) => c.id === selectedColor)?.label ?? ""

  return (
    <div className="min-h-svh bg-canvas text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRightIcon className="size-3.5 icon-dir" aria-hidden />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Electronics</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRightIcon className="size-3.5 icon-dir" aria-hidden />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Headphones</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRightIcon className="size-3.5 icon-dir" aria-hidden />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="max-w-40 truncate">
                {PRODUCT.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ImageGallery images={PRODUCT.images} />

          <div className="flex flex-col gap-5">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge className="border-transparent bg-amber-500 font-semibold text-white hover:bg-amber-500">
                  {PRODUCT.badge}
                </Badge>
                <Badge
                  variant="secondary"
                  className="border-transparent bg-emerald-500/15 font-semibold text-emerald-700 dark:text-emerald-400"
                >
                  -{PRODUCT.discountPct}% OFF
                </Badge>
              </div>
              <p className="mb-1 text-sm text-muted-foreground">
                {PRODUCT.brand}
              </p>
              <h1 className="text-3xl leading-tight font-semibold tracking-tight">
                {PRODUCT.name}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <StarRating rating={PRODUCT.rating} size="md" />
              <span className="font-semibold">{PRODUCT.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({PRODUCT.reviewCount.toLocaleString("en-US")} reviews)
              </span>
              <Separator orientation="vertical" className="hidden h-4 sm:block" />
              <span className="text-sm text-muted-foreground" dir="ltr">
                SKU: {PRODUCT.sku}
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-3xl font-semibold tabular-nums" dir="ltr">
                  ${PRODUCT.price.toFixed(2)}
                </span>
                <span
                  className="text-lg text-muted-foreground line-through tabular-nums"
                  dir="ltr"
                >
                  ${PRODUCT.originalPrice.toFixed(2)}
                </span>
              </div>
              <p className="mt-1 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                You save ${savings.toFixed(2)}
              </p>
            </div>

            <Separator />

            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="text-sm font-semibold">Color:</span>
                <span className="text-sm text-muted-foreground">{colorLabel}</span>
              </div>
              <div className="flex gap-3">
                {PRODUCT.colors.map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => setSelectedColor(color.id)}
                    className={cn(
                      "relative size-9 cursor-pointer rounded-full border-2 shadow-soft transition-all",
                      selectedColor === color.id
                        ? "border-primary ring-2 ring-primary/30 ring-offset-1 ring-offset-background"
                        : "border-border/70"
                    )}
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Select ${color.label}`}
                    aria-pressed={selectedColor === color.id}
                  >
                    {selectedColor === color.id ? (
                      <CheckIcon
                        className="absolute inset-0 m-auto size-4"
                        style={{
                          color: color.id === "white" ? "#333" : "#fff",
                        }}
                        aria-hidden
                      />
                    ) : null}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold">Edition:</p>
              <div className="flex flex-wrap gap-3">
                {PRODUCT.variants.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setSelectedVariant(v)}
                    className={cn(
                      "cursor-pointer rounded-[12px] border px-5 py-2.5 text-sm font-medium transition-all hover:border-primary/40",
                      selectedVariant === v
                        ? "border-primary bg-primary/5 text-primary shadow-soft"
                        : "border-border/70 bg-card text-muted-foreground"
                    )}
                    aria-pressed={selectedVariant === v}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center overflow-hidden rounded-[12px] border border-border/70 bg-card">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="rounded-none"
                >
                  <MinusIcon className="size-4" aria-hidden />
                </Button>
                <span
                  className="w-10 text-center text-sm font-semibold tabular-nums"
                  aria-live="polite"
                  aria-label={`Quantity: ${qty}`}
                >
                  {qty}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => q + 1)}
                  className="rounded-none"
                >
                  <PlusIcon className="size-4" aria-hidden />
                </Button>
              </div>

              <Button type="button" size="lg" className="min-w-0 flex-1 gap-2">
                <ShoppingCartIcon className="size-4" aria-hidden />
                Add to Cart
              </Button>

              <Button type="button" variant="outline" size="lg" className="gap-2">
                <ZapIcon className="size-4 text-amber-500" aria-hidden />
                Buy Now
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setWishlisted((w) => !w)}
                className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-rose-600"
                aria-pressed={wishlisted}
              >
                <HeartIcon
                  className={cn(
                    "size-4 transition-all",
                    wishlisted && "scale-110 fill-rose-600 text-rose-600"
                  )}
                  aria-hidden
                />
                {wishlisted ? "Saved to Wishlist" : "Add to Wishlist"}
              </button>
              <Separator orientation="vertical" className="h-4" />
              <button
                type="button"
                className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Share2Icon className="size-4" aria-hidden />
                Share
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 rounded-[12px] border border-border/70 bg-card p-4 shadow-soft">
              {TRUST_BADGES.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                    <Icon
                      className="size-4 text-emerald-700 dark:text-emerald-400"
                      aria-hidden
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold">{label}</p>
                    <p className="text-xs text-muted-foreground">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList variant="line" className="w-full justify-start">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">
                Reviews ({PRODUCT.reviewCount.toLocaleString("en-US")})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div className="rounded-[12px] border border-border/70 bg-card p-8 shadow-soft">
                <h2 className="mb-4 text-xl font-semibold">About this product</h2>
                <p className="max-w-3xl leading-relaxed text-muted-foreground">
                  {PRODUCT.description}
                </p>
                <ul className="mt-8 grid max-w-lg grid-cols-1 gap-4 sm:grid-cols-2">
                  {PRODUCT.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2">
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                        <CheckIcon
                          className="size-3 text-emerald-700 dark:text-emerald-400"
                          aria-hidden
                        />
                      </span>
                      <span className="text-sm">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="specs" className="mt-6">
              <div className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
                <div className="border-b border-border/70 p-6">
                  <h2 className="text-xl font-semibold">
                    Technical Specifications
                  </h2>
                </div>
                <div className="divide-y divide-border/70">
                  {PRODUCT.specs.map((spec, i) => (
                    <div
                      key={spec.label}
                      className={cn(
                        "flex items-center px-6 py-4",
                        i % 2 === 0 && "bg-muted/30"
                      )}
                    >
                      <span className="w-48 shrink-0 text-sm font-medium text-muted-foreground">
                        {spec.label}
                      </span>
                      <span className="text-sm font-semibold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
                <div className="h-fit rounded-[12px] border border-border/70 bg-card p-6 shadow-soft">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <p className="text-6xl font-semibold">{PRODUCT.rating}</p>
                    <StarRating rating={PRODUCT.rating} size="md" />
                    <p className="text-sm text-muted-foreground">
                      {PRODUCT.reviewCount.toLocaleString("en-US")} reviews
                    </p>
                    <Separator className="w-full" />
                    {RATING_BREAKDOWN.map(({ star, pct }) => (
                      <div
                        key={star}
                        className="flex w-full items-center gap-2"
                      >
                        <span className="w-2 shrink-0 text-end text-xs">
                          {star}
                        </span>
                        <StarIcon
                          className="size-3 shrink-0 fill-amber-400 text-amber-400"
                          aria-hidden
                        />
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-amber-400"
                            style={{ width: `${pct}%` }}
                            role="presentation"
                          />
                        </div>
                        <span className="w-7 text-end text-xs text-muted-foreground">
                          {pct}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <ul className="flex flex-col gap-4">
                  {REVIEWS.map((review) => (
                    <li
                      key={review.id}
                      className="rounded-[12px] border border-border/70 bg-card p-6 shadow-soft"
                    >
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <Avatar size="sm">
                            <AvatarFallback>{review.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-sm font-semibold">
                                {review.author}
                              </span>
                              {review.verified ? (
                                <Badge
                                  variant="secondary"
                                  className="border-transparent bg-emerald-500/15 font-semibold text-emerald-700 dark:text-emerald-400"
                                >
                                  Verified
                                </Badge>
                              ) : null}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {review.date}
                            </p>
                          </div>
                        </div>
                        <StarRating rating={review.rating} />
                      </div>
                      <p className="mb-2 font-semibold">{review.title}</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {review.body}
                      </p>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <ThumbsUpIcon className="size-3.5" aria-hidden />
                          Helpful ({review.helpful})
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
