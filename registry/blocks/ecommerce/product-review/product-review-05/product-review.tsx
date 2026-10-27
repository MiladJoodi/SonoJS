"use client"

import type * as React from "react"
import { BadgeCheckIcon, StarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import avatar01 from "./images/avatar-01.webp"
import avatar02 from "./images/avatar-02.webp"
import avatar03 from "./images/avatar-03.webp"
import avatar04 from "./images/avatar-04.webp"
import photo01 from "./images/photo-01.webp"
import photo02 from "./images/photo-02.webp"
import photo03 from "./images/photo-03.webp"
import photo04 from "./images/photo-04.webp"
import photo05 from "./images/photo-05.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const OVERALL_RATING = 4
const OVERALL_LABEL = "4.5 out of 5"
const TOTAL_RATINGS = "5,456,852"

const RATING_BREAKDOWN = [
  { label: "5.0", pct: 52 },
  { label: "4.0", pct: 24 },
  { label: "3.0", pct: 12 },
  { label: "2.0", pct: 7 },
  { label: "1.0", pct: 5 },
] as const

const CUSTOMER_IMAGES = [
  { src: assetSrc(photo01), alt: "Customer image 1" },
  { src: assetSrc(photo02), alt: "Customer image 2" },
  { src: assetSrc(photo03), alt: "Customer image 3" },
  { src: assetSrc(photo04), alt: "Customer image 4" },
  { src: assetSrc(photo05), alt: "Customer image 5" },
]

const REVIEWS = [
  {
    id: 1,
    name: "Emily Carter",
    avatar: assetSrc(avatar01),
    rating: 4,
    date: "2 days ago",
    title: "Quick and Easy Experience",
    body: "Everything was seamless. Ordering was simple and the response time was super fast. Highly recommend to anyone looking for convenience and speed.",
    images: [] as { src: string; alt: string }[],
  },
  {
    id: 2,
    name: "Daniel Kim",
    avatar: assetSrc(avatar02),
    rating: 5,
    date: "4 days ago",
    title: "Fantastic Support",
    body: "Had a few questions before ordering and the customer service team was amazing—super responsive and knowledgeable. It really made a difference!",
    images: [
      { src: assetSrc(photo01), alt: "Review image 1" },
      { src: assetSrc(photo02), alt: "Review image 2" },
    ],
  },
  {
    id: 3,
    name: "Priya Singh",
    avatar: assetSrc(avatar03),
    rating: 4,
    date: "5 days ago",
    title: "Exceeded Expectations",
    body: "From start to finish, I felt taken care of. The ordering process was smooth and the delivery was right on time. Would definitely use this service again.",
    images: [
      { src: assetSrc(photo03), alt: "Review image 1" },
      { src: assetSrc(photo04), alt: "Review image 2" },
    ],
  },
  {
    id: 4,
    name: "Liam Brown",
    avatar: assetSrc(avatar04),
    rating: 3,
    date: "7 days ago",
    title: "Highly Recommended",
    body: "Very impressed by the quality and speed. It's rare to see this level of dedication these days. I'll definitely be coming back.",
    images: [] as { src: string; alt: string }[],
  },
] as const

function Stars({
  rating,
  size = "sm",
}: {
  rating: number
  size?: "sm" | "lg"
}) {
  return (
    <div
      className="flex items-center gap-1.5"
      aria-label={`Rated ${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i < rating
        return (
          <StarIcon
            key={i}
            className={cn(
              "shrink-0",
              size === "lg" ? "size-4" : "size-3.5",
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

export default function ProductReview({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "bg-white px-4 py-6 md:px-8 dark:bg-background",
        className
      )}
      aria-labelledby="reviews-heading-05"
      {...props}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-12 lg:flex-row">
          <div className="w-full max-w-sm shrink-0">
            <div>
              <h2
                id="reviews-heading-05"
                className="mb-2 text-2xl font-bold text-foreground"
              >
                Customer reviews
              </h2>

              <div className="flex flex-wrap items-center gap-2">
                <Stars rating={OVERALL_RATING} size="lg" />
                <p className="text-sm font-medium text-muted-foreground">
                  {OVERALL_LABEL}
                </p>
              </div>

              <p className="mt-4 text-sm text-muted-foreground">
                global ratings ({TOTAL_RATINGS})
              </p>
            </div>

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

            <hr className="my-6 border-border/70" />

            <div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Review this product
              </h3>
              <p className="text-sm text-muted-foreground">
                Share your thoughts with other customers
              </p>
              <button
                type="button"
                className="mt-6 cursor-pointer rounded-md border border-primary bg-primary px-3.5 py-2 text-sm font-semibold !text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Write a review
              </button>
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Customer images
              </h3>
              <div className="flex items-center gap-4 overflow-x-auto">
                {CUSTOMER_IMAGES.map((img) => (
                  <img
                    key={img.alt}
                    src={img.src}
                    alt={img.alt}
                    className="h-48 w-52 shrink-0 bg-muted object-cover p-2"
                  />
                ))}
              </div>
            </div>

            <ul className="mt-6 divide-y divide-border/70">
              {REVIEWS.map((review) => (
                <li key={review.id} className="py-8">
                  <div className="flex items-center gap-4">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="size-12 shrink-0 rounded-full border border-border/70 object-cover"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">
                        {review.name}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span
                          aria-label="Verified buyer"
                          className="flex size-4 items-center justify-center rounded-full bg-emerald-600/20 dark:bg-emerald-400/20"
                        >
                          <BadgeCheckIcon
                            className="size-2.5 text-emerald-700 dark:text-emerald-400"
                            strokeWidth={2.5}
                            aria-hidden
                          />
                        </span>
                        <p className="text-xs text-muted-foreground">
                          Verified Buyer
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-base font-semibold text-foreground">
                      {review.title}
                    </h4>
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <Stars rating={review.rating} />
                      <p className="ms-1 text-sm font-medium text-muted-foreground">
                        {review.date}
                      </p>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {review.body}
                    </p>
                  </div>

                  {review.images.length > 0 ? (
                    <div className="mt-4 flex items-center gap-4 overflow-x-auto">
                      {review.images.map((img) => (
                        <img
                          key={img.alt}
                          src={img.src}
                          alt={img.alt}
                          className="h-36 w-40 shrink-0 bg-muted object-cover p-2"
                        />
                      ))}
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
