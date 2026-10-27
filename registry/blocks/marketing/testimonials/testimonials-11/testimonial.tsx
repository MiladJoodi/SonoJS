"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"

import avatar1 from "./images/avatar-1.webp"
import avatar2 from "./images/avatar-2.webp"
import avatar3 from "./images/avatar-3.webp"
import avatar4 from "./images/avatar-4.webp"
import avatar5 from "./images/avatar-5.webp"

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

const testimonials = [
  {
    name: "John Doe",
    role: "Project Manager",
    image: avatar1,
    stars: 4,
    quote:
      "SonoJS made it easy to launch my site. The components are clean, fast to use, and saved hours of build time.",
  },
  {
    name: "Mark Adair",
    role: "UI/UX Designer",
    image: avatar2,
    stars: 3,
    quote:
      "Everything looks professional with SonoJS. The blocks are modern, responsive, and simple to customize.",
  },
  {
    name: "Simon Konecki",
    role: "Frontend Developer",
    image: avatar3,
    stars: 4,
    quote:
      "SonoJS gave my project a polished look without the hassle. The layouts are clear and ready to ship.",
  },
  {
    name: "Emily Chen",
    role: "Software Developer",
    image: avatar4,
    stars: 5,
    quote:
      "Great quality and attention to detail. Every component feels thoughtfully crafted, and my site looks pro.",
  },
  {
    name: "Marcus Rodriguez",
    role: "Frontend Developer",
    image: avatar5,
    stars: 4,
    quote:
      "So many layout options. SonoJS covers many use cases, and mixing components is simple.",
  },
  {
    name: "Sarah Thompson",
    role: "UI/UX Designer",
    image: avatar1,
    stars: 4,
    quote:
      "As a repeat user, I am always impressed by the updates and new layouts. SonoJS keeps getting better.",
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
      <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
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

      <div className="mx-auto max-w-5xl">
        <div className="grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              key={`${item.name}-${item.role}`}
              className="rounded-[12px] border border-border/70 bg-card p-4 shadow-soft"

              style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
              <div className="flex flex-col items-center">
                <div className="size-20 overflow-hidden rounded-full border border-border/70">
                  <img
                    src={assetSrc(item.image)}
                    alt={item.name}
                    className="size-full object-cover"
                    width={80}
                    height={80}
                  />
                </div>

                <figcaption className="mt-4">
                  <p className="text-base font-semibold text-foreground">
                    {item.name}
                  </p>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {item.role}
                  </span>
                </figcaption>

                <div
                  className="mt-6 flex gap-2"
                  role="img"
                  aria-label={`${item.stars} out of 5 stars`}
                  dir="ltr"
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <StarIcon key={index} filled={index < item.stars} />
                  ))}
                </div>
              </div>

              <blockquote className="mt-4">
                <p className="text-base font-normal leading-relaxed text-muted-foreground">
                  {item.quote}
                </p>
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
