"use client"

import * as React from "react"
import {
  BadgeCheckIcon,
  StarIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

import avatar01 from "./images/avatar-01.webp"
import avatar02 from "./images/avatar-02.webp"
import avatar03 from "./images/avatar-03.webp"
import avatar04 from "./images/avatar-04.webp"
import avatar05 from "./images/avatar-05.webp"
import avatar06 from "./images/avatar-06.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const RATING_BREAKDOWN = [
  { label: "5.0", pct: 52 },
  { label: "4.0", pct: 24 },
  { label: "3.0", pct: 12 },
  { label: "2.0", pct: 7 },
  { label: "1.0", pct: 5 },
] as const

const FILTER_OPTIONS = [
  { value: "all", label: "All Ratings", min: 0 },
  { value: "5", label: "5 Stars", min: 5 },
  { value: "4", label: "4 Stars & Up", min: 4 },
  { value: "3", label: "3 Stars & Up", min: 3 },
  { value: "2", label: "2 Stars & Up", min: 2 },
  { value: "1", label: "1 Star", min: 1 },
] as const

const REVIEWS = [
  {
    id: 1,
    name: "Emily Carter",
    avatar: assetSrc(avatar01),
    rating: 4,
    date: "2 days ago",
    title: "Quick and Easy Experience",
    body: "Everything was seamless. Ordering was simple and the response time was super fast. Highly recommend to anyone looking for convenience and speed.",
    helpful: 36,
    notHelpful: 10,
  },
  {
    id: 2,
    name: "Daniel Kim",
    avatar: assetSrc(avatar02),
    rating: 5,
    date: "7 days ago",
    title: "Fantastic Support",
    body: "Had a few questions before ordering and the customer service team was amazing—super responsive and knowledgeable. It really made a difference!",
    helpful: 50,
    notHelpful: 18,
  },
  {
    id: 3,
    name: "Priya Singh",
    avatar: assetSrc(avatar03),
    rating: 4,
    date: "10 days ago",
    title: "Exceeded Expectations",
    body: "From start to finish, I felt taken care of. The ordering process was smooth and the delivery was right on time. The communication was clear, and I was kept in the loop at every step. The product exceeded my expectations, both in quality and presentation.",
    helpful: 17,
    notHelpful: 8,
  },
  {
    id: 4,
    name: "Liam Brown",
    avatar: assetSrc(avatar04),
    rating: 3,
    date: "12 days ago",
    title: "Highly Recommended",
    body: "Very impressed by the quality and speed. It's rare to see this level of dedication these days. I'll definitely be coming back.",
    helpful: 11,
    notHelpful: 2,
  },
  {
    id: 5,
    name: "Sophia Reed",
    avatar: assetSrc(avatar05),
    rating: 4,
    date: "18 days ago",
    title: "Amazing Support",
    body: "The customer service team went above and beyond. Super helpful, fast, and genuinely cared about my issue. Couldn't ask for better!",
    helpful: 19,
    notHelpful: 2,
  },
  {
    id: 6,
    name: "Daniel Carter",
    avatar: assetSrc(avatar06),
    rating: 4,
    date: "22 days ago",
    title: "Great Value for Money",
    body: "Wasn't sure at first, but the results speak for themselves. The pricing is fair, and the quality exceeded expectations.",
    helpful: 14,
    notHelpful: 0,
  },
] as const

type Review = (typeof REVIEWS)[number]

function Stars({
  rating,
  large = false,
  className,
}: {
  rating: number
  large?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex items-center",
        large ? "mt-6 gap-2" : "gap-1.5",
        className
      )}
      aria-label={`Rated ${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i < rating
        return (
          <StarIcon
            key={i}
            className={cn(
              "shrink-0",
              large ? "size-4" : "size-3.5",
              filled
                ? "fill-amber-400 text-amber-400"
                : "fill-muted text-muted"
            )}
            aria-hidden
          />
        )
      })}
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="relative mb-4 w-full break-inside-avoid rounded-lg border border-border/70 bg-white p-4 shadow-xs dark:bg-card">
      <div className="flex items-center gap-4">
        <img
          src={review.avatar}
          alt={review.name}
          className="size-12 shrink-0 rounded-full border-2 border-border/70 object-cover"
        />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">{review.name}</p>
          <div className="mt-2 flex items-center gap-2">
            <span
              className="flex size-4 items-center justify-center rounded-full bg-emerald-600/20 dark:bg-emerald-400/20"
              aria-hidden
            >
              <BadgeCheckIcon
                className="size-2.5 text-emerald-700 dark:text-emerald-400"
                strokeWidth={2.5}
              />
            </span>
            <p className="text-xs text-muted-foreground">Verified Buyer</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        <Stars rating={review.rating} className="mt-0" />
        <p className="ms-1 text-sm font-medium text-muted-foreground">
          {review.date}
        </p>
      </div>

      <div className="mt-6">
        <h4 className="text-base font-semibold text-foreground">
          {review.title}
        </h4>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {review.body}
        </p>
      </div>

      <div className="mt-4 flex items-center gap-6">
        <button
          type="button"
          aria-label={`${review.helpful} people found this helpful`}
          className="flex cursor-pointer items-center gap-2 rounded border-0 bg-transparent text-sm font-medium text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ThumbsUpIcon className="size-4" aria-hidden />
          {review.helpful}
        </button>
        <button
          type="button"
          aria-label={`${review.notHelpful} people found this not helpful`}
          className="flex cursor-pointer items-center gap-2 rounded border-0 bg-transparent text-sm font-medium text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ThumbsDownIcon className="size-4" aria-hidden />
          {review.notHelpful}
        </button>
      </div>
    </div>
  )
}

export default function ProductReview({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [filter, setFilter] = React.useState("all")
  const [visible, setVisible] = React.useState(6)

  const minRating =
    FILTER_OPTIONS.find((o) => o.value === filter)?.min ?? 0

  const filtered = REVIEWS.filter((review) => {
    const rating = review.rating as number
    if (filter === "all") return true
    if (filter === "5") return rating === 5
    if (filter === "1") return rating === 1
    return rating >= minRating
  })

  const shown = filtered.slice(0, visible)

  return (
    <section
      className={cn(
        "bg-white px-4 py-6 md:px-8 dark:bg-background",
        className
      )}
      aria-labelledby="reviews-heading-04"
      {...props}
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <h2
            id="reviews-heading-04"
            className="mb-4 text-2xl font-bold text-foreground"
          >
            Customer reviews
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            See what our customers have to say! Real feedback from real users
            sharing their experiences, thoughts, and satisfaction with our
            products and services.
          </p>
        </div>

        <div className="mt-12">
          <div className="w-full max-w-sm">
            <div className="flex flex-wrap items-end gap-2">
              <p className="text-5xl font-semibold text-foreground">4.0</p>
              <p className="text-xl font-medium text-muted-foreground">
                out of
              </p>
              <p className="text-5xl font-semibold text-foreground">5</p>
            </div>

            <Stars rating={4} large />

            <div className="mt-8 space-y-2">
              {RATING_BREAKDOWN.map((row) => (
                <div key={row.label} className="flex items-center">
                  <div className="w-8 shrink-0">
                    <p className="text-sm font-semibold text-muted-foreground">
                      {row.label}
                    </p>
                  </div>
                  <div className="ms-2 h-3.5 w-full rounded bg-muted">
                    <div
                      className="h-full rounded bg-amber-400"
                      style={{ width: `${row.pct}%` }}
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={row.pct}
                      aria-label={`${row.label} star reviews`}
                    />
                  </div>
                  <div className="w-12 shrink-0">
                    <p className="ms-3 text-sm font-semibold text-muted-foreground">
                      {row.pct}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <a
              href="#"
              className="inline-block rounded text-base font-medium text-primary underline hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Write a review
            </a>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="text-xl font-semibold text-foreground">
              All reviews (5,456,852)
            </h3>
            <div className="w-48">
              <label
                htmlFor="star-filter-04"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Filter by rating
              </label>
              <select
                id="star-filter-04"
                name="star-filter"
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value)
                  setVisible(6)
                }}
                className="w-full cursor-pointer rounded-md bg-white px-3 py-2.5 text-sm text-foreground outline-1 -outline-offset-1 outline-border/70 focus:outline-2 focus:-outline-offset-2 focus:outline-ring dark:bg-card"
              >
                {FILTER_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {shown.length === 0 ? (
            <p className="mt-6 text-sm text-muted-foreground">
              No reviews match this filter.
            </p>
          ) : (
            <div className="mt-6 columns-1 space-y-4 sm:columns-2 lg:columns-3">
              {shown.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}

          {visible < filtered.length ? (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setVisible((n) => n + 6)}
                className="cursor-pointer rounded-md border border-primary bg-primary px-3.5 py-2 text-sm font-semibold !text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Load more reviews
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
