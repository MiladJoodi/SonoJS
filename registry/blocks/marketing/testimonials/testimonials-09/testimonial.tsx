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
        filled
          ? "fill-[#ffc107]"
          : "fill-[#CED5D8] dark:fill-neutral-600",
        className
      )}
      {...props}
    >
      <path d={STAR_PATH} />
    </svg>
  )
}

function StarRating({ count }: { count: number }) {
  return (
    <div
      className="mt-3 flex justify-center gap-2"
      role="img"
      aria-label={`${count} out of 5 stars`}
      dir="ltr"
    >
      {Array.from({ length: 5 }, (_, index) => (
        <StarIcon key={index} filled={index < count} />
      ))}
    </div>
  )
}

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    image: avatar2,
    quote:
      "SonoJS made it easy to launch my site. The components are clean, fast to use, and saved hours of build time.",
    stars: 4,
  },
  {
    id: 2,
    name: "Karolina Adair",
    image: avatar3,
    quote:
      "Everything looks professional with SonoJS. The blocks are modern, responsive, and simple to customize.",
    stars: 5,
  },
  {
    id: 3,
    name: "Simon Konecki",
    image: avatar4,
    quote:
      "SonoJS gave my project a polished look without the hassle. The layouts are clear and ready to ship.",
    stars: 3,
  },
  {
    id: 4,
    name: "Emily Chen",
    image: avatar5,
    quote:
      "Great quality and attention to detail. Every component feels thoughtfully crafted, and my site looks pro.",
    stars: 4,
  },
  {
    id: 5,
    name: "Marcus Rodriguez",
    image: avatar6,
    quote:
      "So many layout options. SonoJS covers many use cases, and mixing components is simple.",
    stars: 5,
  },
  {
    id: 6,
    name: "Sarah Thompson",
    image: avatar1,
    quote:
      "As a repeat user, I am always impressed by the updates and new layouts. SonoJS keeps getting better.",
    stars: 4,
  },
]

export default function Testimonial({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("w-full px-4 md:px-8", className)}
      aria-labelledby="testimonials-heading"
      {...props}
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2
          id="testimonials-heading"
          className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
        >
          What our happy clients say
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          See what our happy clients have to say. They shared how these blocks
          helped them launch quickly, look professional, and grow with ease.
        </p>
      </div>

      <div className="mx-auto mt-24 grid max-w-7xl gap-x-6 gap-y-20 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((item) => (
          <figure
            key={item.id}
            className="relative w-full rounded-[12px] border border-border/70 bg-card p-4 shadow-soft sm:p-6"
          >
            <div className="absolute inset-x-0 -top-11 mx-auto size-20 overflow-hidden rounded-full border-2 border-border/70">
              <img
                src={assetSrc(item.image)}
                alt={item.name}
                className="size-full object-cover"
                width={80}
                height={80}
              />
            </div>

            <blockquote className="mt-8 text-center">
              <p className="text-base font-normal leading-relaxed text-muted-foreground">
                {item.quote}
              </p>
            </blockquote>

            <figcaption className="mt-6 text-center">
              <p className="text-base font-semibold text-foreground">
                {item.name}
              </p>
            </figcaption>

            <StarRating count={item.stars} />
          </figure>
        ))}
      </div>
    </section>
  )
}
