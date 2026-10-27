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

const REVIEWS = [
  {
    id: 1,
    name: "Emily Carter",
    avatar: assetSrc(avatar01),
    isVerified: true,
    title: "Quick and Easy Experience",
    rating: 4,
    date: "2 days ago",
    comment:
      "Everything was seamless. Ordering was simple and the response time was super fast. Highly recommend to anyone looking for convenience and speed.",
    images: [] as string[],
  },
  {
    id: 2,
    name: "Daniel Kim",
    avatar: assetSrc(avatar02),
    isVerified: true,
    title: "Fantastic Support",
    rating: 5,
    date: "4 days ago",
    comment:
      "Had a few questions before ordering and the customer service team was amazing—super responsive and knowledgeable. It really made a difference!",
    images: [assetSrc(photo01), assetSrc(photo02)],
  },
  {
    id: 3,
    name: "Priya Singh",
    avatar: assetSrc(avatar03),
    isVerified: true,
    title: "Exceeded Expectations",
    rating: 4,
    date: "5 days ago",
    comment:
      "From start to finish, I felt taken care of. The ordering process was smooth and the delivery was right on time. Would definitely use this service again.",
    images: [assetSrc(photo03), assetSrc(photo04)],
  },
  {
    id: 4,
    name: "Liam Brown",
    avatar: assetSrc(avatar04),
    isVerified: true,
    title: "Highly Recommended",
    rating: 3,
    date: "7 days ago",
    comment:
      "Very impressed by the quality and speed. It’s rare to see this level of dedication these days. I’ll definitely be coming back.",
    images: [] as string[],
  },
] as const

const RATINGS_DISTRIBUTION = [
  { label: "5.0", percentage: 52 },
  { label: "4.0", percentage: 24 },
  { label: "3.0", percentage: 12 },
  { label: "2.0", percentage: 7 },
  { label: "1.0", percentage: 5 },
] as const

const CUSTOMER_IMAGES = [
  assetSrc(photo01),
  assetSrc(photo02),
  assetSrc(photo03),
  assetSrc(photo04),
  assetSrc(photo05),
]

function Stars({
  rating,
  sizeClass = "size-3.5",
}: {
  rating: number
  sizeClass?: string
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
              sizeClass,
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

function RatingBar({
  label,
  percentage,
}: {
  label: string
  percentage: number
}) {
  return (
    <div className="flex items-center">
      <div className="w-8 shrink-0">
        <p className="text-sm font-semibold text-muted-foreground">{label}</p>
      </div>
      <div className="ms-2 h-3.5 w-full rounded bg-muted">
        <div
          className="h-full rounded bg-amber-400"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percentage}
          aria-label={`${label} star reviews`}
        />
      </div>
      <div className="w-12 shrink-0">
        <p className="ms-3 text-sm font-semibold text-muted-foreground">
          {percentage}%
        </p>
      </div>
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
      aria-labelledby="reviews-heading-03"
      {...props}
    >
      <div className="mx-auto max-w-4xl">
        <div>
          <h2
            id="reviews-heading-03"
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

        <div className="mt-12 w-full max-w-sm">
          <div>
            <p className="text-4xl font-semibold text-foreground">5.0</p>
            <div className="mt-2">
              <div className="mt-3">
                <Stars rating={5} sizeClass="size-4" />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                All reviews (5,456,852)
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            {RATINGS_DISTRIBUTION.map((item) => (
              <RatingBar
                key={item.label}
                label={item.label}
                percentage={item.percentage}
              />
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-lg font-semibold text-foreground">
            Customer images
          </h3>
          <div className="mt-4 flex items-center gap-4 overflow-x-auto">
            {CUSTOMER_IMAGES.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`Customer image ${i + 1}`}
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
                  {review.isVerified ? (
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
                  ) : null}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-base font-semibold text-foreground">
                  {review.title}
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Stars rating={review.rating} />
                  <p className="text-sm font-medium text-muted-foreground">
                    {review.date}
                  </p>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {review.comment}
                </p>
              </div>

              {review.images.length > 0 ? (
                <div className="mt-4 flex items-center gap-4 overflow-x-auto">
                  {review.images.map((img, idx) => (
                    <img
                      key={`${review.id}-${img}`}
                      src={img}
                      alt={`Review image ${idx + 1} from ${review.name}`}
                      className="h-36 w-40 shrink-0 bg-muted object-cover p-2"
                    />
                  ))}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
