"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"

import avatar1 from "./images/avatar-1.webp"
import avatar2 from "./images/avatar-2.webp"
import avatar3 from "./images/avatar-3.webp"
import avatar4 from "./images/avatar-4.webp"
import avatar5 from "./images/avatar-5.webp"
import avatar6 from "./images/avatar-6.webp"

const STAR_PATH =
  "m23.363 8.584-7.378-1.127L12.678.413c-.247-.526-1.11-.526-1.357 0L8.015 7.457.637 8.584a.75.75 0 0 0-.423 1.265l5.36 5.494-1.267 7.767a.75.75 0 0 0 1.103.777L12 20.245l6.59 3.643a.75.75 0 0 0 1.103-.777l-1.267-7.767 5.36-5.494a.75.75 0 0 0-.423-1.266z"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

function StarIcon({
  filled,
  className,
  ...props
}: React.ComponentProps<"svg"> & { filled?: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn(
        "size-3.5",
        filled ? "fill-[#ffc107]" : "fill-neutral-600",
        className
      )}
      {...props}
    >
      <path d={STAR_PATH} />
    </svg>
  )
}

function StarRating({ rating }: { rating: number }) {
  const filled = Math.floor(rating)

  return (
    <div
      className="flex justify-center gap-2"
      role="img"
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
      dir="ltr"
    >
      {Array.from({ length: 5 }, (_, index) => (
        <StarIcon key={index} filled={index < filled} />
      ))}
    </div>
  )
}

const testimonials = [
  {
    id: 1,
    name: "Mark Adair",
    image: avatar3,
    rating: 4,
    quote:
      "Everything looks professional with SonoJS. The blocks are modern, responsive, and simple to customize.",
  },
  {
    id: 2,
    name: "Simon Konecki",
    image: avatar4,
    rating: 5,
    quote:
      "SonoJS gave my project a polished look without the hassle. The layouts are clear and ready to ship.",
  },
  {
    id: 3,
    name: "Emily Chen",
    image: avatar5,
    rating: 3,
    quote:
      "Great quality and attention to detail. Every component feels thoughtfully crafted, and my site looks pro.",
  },
  {
    id: 4,
    name: "Marcus Rodriguez",
    image: avatar6,
    rating: 4,
    quote:
      "So many layout options. SonoJS covers many use cases, and mixing components is simple.",
  },
  {
    id: 5,
    name: "Sarah Thompson",
    image: avatar1,
    rating: 5,
    quote:
      "As a repeat user, I am always impressed by the updates and new layouts. SonoJS keeps getting better.",
  },
  {
    id: 6,
    name: "John Doe",
    image: avatar2,
    rating: 4,
    quote:
      "SonoJS made it easy to launch my site. The components are clean, fast to use, and saved hours of build time.",
  },
]

export default function Testimonial({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("w-full bg-canvas px-4 py-12 md:px-8 md:py-16", className)}
      style={{ backgroundColor: "var(--canvas, #f3f3f4)" }}
      aria-labelledby="testimonials-heading"
      {...props}
    >
      <div className="rounded-[12px] bg-zinc-950 px-6 py-12 md:px-10 md:py-16">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <h2
            id="testimonials-heading"
            className="mb-6 text-3xl font-bold tracking-tight text-zinc-50 md:text-4xl"
          >
            What our happy clients say
          </h2>
          <p className="text-base leading-relaxed text-zinc-400">
            See what our happy clients have to say. They shared how these blocks
            helped them launch quickly, look professional, and grow with ease.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          {testimonials.map((item) => (
            <figure
              key={item.id}
              className="flex flex-col gap-6 rounded-[12px] border border-zinc-700 p-4 shadow-soft min-[1200px]:flex-row min-[1200px]:items-center md:p-6"

              style={{
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
              <div className="mx-auto shrink-0 min-[1200px]:mx-0">
                <img
                  src={assetSrc(item.image)}
                  alt={item.name}
                  className="size-28 rounded-full border border-zinc-600 object-cover"
                  width={112}
                  height={112}
                />
              </div>

              <div className="min-w-0 flex-1 text-center min-[1200px]:text-start">
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 min-[1200px]:justify-between">
                  <figcaption>
                    <p className="text-base font-semibold text-zinc-50">
                      {item.name}
                    </p>
                  </figcaption>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <StarRating rating={item.rating} />
                    <p className="text-base font-medium text-zinc-400">
                      {item.rating.toFixed(1)}
                    </p>
                  </div>
                </div>

                <blockquote className="mt-2">
                  <p className="text-base font-normal leading-relaxed text-zinc-400">
                    {item.quote}
                  </p>
                </blockquote>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
