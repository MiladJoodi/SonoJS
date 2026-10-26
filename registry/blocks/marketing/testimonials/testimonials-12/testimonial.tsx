"use client"

import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

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
    name: "John Doe",
    role: "CEO, Company",
    image: avatar1,
    quote:
      "SonoJS gave my project a polished look without the hassle. The layouts are clear and ready to ship.",
    stars: 4,
  },
  {
    name: "Jane Smith",
    role: "Founder, TechStart",
    image: avatar2,
    quote:
      "The blocks are easy to customize. We launched our landing page fast, and the feedback has been great.",
    stars: 5,
  },
  {
    name: "Simon Konecki",
    role: "Lead Designer",
    image: avatar3,
    quote:
      "As a designer, I appreciate the clean code and modern look. It is a strong foundation for any web project.",
    stars: 3,
  },
]

export default function Testimonial({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const current = testimonials[currentIndex]

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    )
  }

  return (
    <section
      className={cn("w-full px-4 md:px-8", className)}
      aria-labelledby="testimonials-heading"
      {...props}
    >
      <div className="mx-auto max-w-4xl">
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

        <div className="relative px-12 sm:px-14">
          <figure
            key={current.name}
            className="mx-auto max-w-2xl transition-opacity duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <img
                src={assetSrc(current.image)}
                alt={current.name}
                className="size-28 rounded-full border-2 border-background object-cover shadow-soft"
                width={112}
                height={112}
              />
              <figcaption className="mt-4">
                <p className="text-base font-semibold text-foreground">
                  {current.name}
                </p>
                <span className="mt-1 block text-xs text-muted-foreground">
                  {current.role}
                </span>
              </figcaption>
            </div>

            <blockquote className="mt-8 text-center">
              <p className="text-base font-normal leading-relaxed text-muted-foreground">
                &ldquo;{current.quote}&rdquo;
              </p>
            </blockquote>

            <div
              className="mt-6 flex justify-center gap-2"
              role="img"
              aria-label={`${current.stars} out of 5 stars`}
              dir="ltr"
            >
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon key={i} filled={i < current.stars} />
              ))}
            </div>
          </figure>

          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous testimonial"
            className="absolute start-0 top-1/2 flex size-10 shrink-0 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border/70 bg-card shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ChevronLeftIcon className="size-3.5 text-foreground icon-dir" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next testimonial"
            className="absolute end-0 top-1/2 flex size-10 shrink-0 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border/70 bg-card shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ChevronRightIcon className="size-3.5 text-foreground icon-dir" />
          </button>
        </div>
      </div>
    </section>
  )
}
