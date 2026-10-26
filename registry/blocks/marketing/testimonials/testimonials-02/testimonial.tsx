"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"

import avatar1 from "./images/avatar-1.webp"
import avatar2 from "./images/avatar-2.webp"
import avatar3 from "./images/avatar-3.webp"

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
        "size-4",
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
    id: 1,
    name: "John Doe",
    image: avatar1,
    rating: 4,
    text: "SonoJS made it easy to launch my site. The components are clean, fast to use, and saved hours of build time.",
  },
  {
    id: 2,
    name: "Mark Adair",
    image: avatar2,
    rating: 5,
    text: "Everything looks professional with SonoJS. The blocks are modern, responsive, and simple to customize.",
  },
  {
    id: 3,
    name: "Simon Konecki",
    image: avatar3,
    rating: 4,
    text: "SonoJS gave my project a polished look without the hassle. The layouts are clear and ready to ship.",
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
      <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
        <h2
          id="testimonials-heading"
          className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
        >
          What our happy clients say
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          See what our clients share. They used these blocks to launch quickly,
          look professional, and grow with ease.
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-12 text-center md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((item) => (
          <figure key={item.id}>
            <figcaption className="flex flex-col items-center">
              <img
                src={assetSrc(item.image)}
                alt={item.name}
                className="size-24 rounded-full border border-border/70"
                width={96}
                height={96}
              />
              <div className="mt-6">
                <p className="text-base font-semibold text-foreground">
                  {item.name}
                </p>
              </div>
            </figcaption>

            <div
              className="mt-3 flex justify-center gap-2"
              role="img"
              aria-label={`${item.rating} out of 5 stars`}
              dir="ltr"
            >
              {Array.from({ length: 5 }, (_, index) => (
                <StarIcon key={index} filled={index < item.rating} />
              ))}
            </div>

            <blockquote className="mt-6">
              <p className="text-base leading-relaxed text-muted-foreground">
                {item.text}
              </p>
            </blockquote>
          </figure>
        ))}
      </div>
    </section>
  )
}
