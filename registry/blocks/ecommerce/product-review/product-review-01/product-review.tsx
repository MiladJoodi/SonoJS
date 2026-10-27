"use client"

import type * as React from "react"
import { BadgeCheckIcon, StarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import avatar01 from "./images/avatar-01.webp"
import avatar02 from "./images/avatar-02.webp"
import avatar03 from "./images/avatar-03.webp"
import avatar04 from "./images/avatar-04.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const REVIEWS = [
  {
    id: 1,
    name: "Emily Carter",
    image: assetSrc(avatar01),
    title: "Quick and Easy Experience",
    rating: 4,
    date: "2 days ago",
    content:
      "Everything was seamless. Ordering was simple and the response time was super fast. Highly recommend to anyone looking for convenience and speed.",
  },
  {
    id: 2,
    name: "Daniel Kim",
    image: assetSrc(avatar02),
    title: "Fantastic Support",
    rating: 5,
    date: "4 days ago",
    content:
      "Had a few questions before ordering and the customer service team was amazing—super responsive and knowledgeable. It really made a difference!",
  },
  {
    id: 3,
    name: "Priya Singh",
    image: assetSrc(avatar03),
    title: "Exceeded Expectations",
    rating: 4,
    date: "5 days ago",
    content:
      "From start to finish, I felt taken care of. The ordering process was smooth and the delivery was right on time. Would definitely use this service again.",
  },
  {
    id: 4,
    name: "Liam Brown",
    image: assetSrc(avatar04),
    title: "Highly Recommended",
    rating: 3,
    date: "7 days ago",
    content:
      "Very impressed by the quality and speed. It’s rare to see this level of dedication these days. I’ll definitely be coming back.",
  },
] as const

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-1.5"
      aria-label={`Rated ${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => {
        const filled = index < rating
        return (
          <StarIcon
            key={index}
            className={cn(
              "size-3.5 shrink-0",
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
      aria-labelledby="reviews-heading-01"
      {...props}
    >
      <div className="mx-auto max-w-4xl">
        <h2
          id="reviews-heading-01"
          className="mb-6 text-2xl font-bold text-foreground"
        >
          Customer reviews
        </h2>

        <ul className="divide-y divide-border/70">
          {REVIEWS.map((review) => (
            <li key={review.id} className="py-6">
              <div className="flex items-center gap-4">
                <img
                  src={review.image}
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
                <h3 className="text-base font-semibold text-foreground">
                  {review.title}
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <Stars rating={review.rating} />
                  <p className="ms-1 text-sm font-medium text-muted-foreground">
                    {review.date}
                  </p>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {review.content}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
