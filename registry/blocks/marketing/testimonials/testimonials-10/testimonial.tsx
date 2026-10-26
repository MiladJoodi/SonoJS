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

const testimonials = [
  {
    name: "John Doe",
    role: "Founder of Rubik",
    image: avatar1,
    rating: 4,
    content:
      "SonoJS made it easy to launch my site. The components are clean and fast to use.",
  },
  {
    name: "Mark Adair",
    role: "Founder of Alpha",
    image: avatar2,
    rating: 4,
    content:
      "Everything looks professional with SonoJS. The blocks are modern and responsive.",
  },
  {
    name: "Simon Konecki",
    role: "Founder of Labar",
    image: avatar3,
    rating: 4,
    content:
      "SonoJS gave my project a polished look without the hassle. The layouts are clear and ready to ship.",
  },
  {
    name: "Emma Wilson",
    role: "COO of NextGen",
    image: avatar4,
    rating: 5,
    content:
      "Great quality and attention to detail. Every component feels thoughtfully crafted, and my site looks pro.",
  },
  {
    name: "Lucas Brown",
    role: "Founder of Lumina",
    image: avatar5,
    rating: 3,
    content:
      "So many layout options. SonoJS has something for every use case, and it is simple to use.",
  },
  {
    name: "Anna Smith",
    role: "CEO of BrightTech",
    image: avatar6,
    rating: 4,
    content:
      "As a repeat user, I am always impressed by the updates and new layouts. SonoJS keeps getting better.",
  },
]

export default function Testimonial({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "w-full bg-muted px-4 py-6 md:px-8 md:py-12",
        className
      )}
      aria-labelledby="testimonials-heading"
      {...props}
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
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

        <div className="mt-12 columns-1 sm:columns-2 lg:columns-3">
          {testimonials.map((item) => (
            <figure
              key={`${item.name}-${item.role}`}
              className="mb-4 break-inside-avoid rounded-[12px] border border-border/70 bg-card p-4 shadow-soft sm:p-6"
            >
              <div
                className="flex gap-2"
                role="img"
                aria-label={`${item.rating} out of 5 stars`}
                dir="ltr"
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon key={i} filled={i < item.rating} />
                ))}
              </div>

              <blockquote className="mt-4">
                <p className="text-base font-normal leading-relaxed text-muted-foreground">
                  {item.content}
                </p>
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-4">
                <img
                  src={assetSrc(item.image)}
                  alt={item.name}
                  className="size-11 rounded-full border border-border/70"
                  width={44}
                  height={44}
                />
                <div className="min-w-0 text-start">
                  <span className="text-base font-semibold text-foreground">
                    {item.name}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {item.role}
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
