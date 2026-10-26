"use client"

import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon, QuoteIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import photo1 from "./images/photo-1.webp"
import photo2 from "./images/photo-2.webp"

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
    name: "Simon Konecki",
    role: "Founder of Labar",
    image: photo1,
    quote:
      "SonoJS helped us cut development time a lot. I shipped a polished MVP in days instead of weeks. The components are modern, accessible, and easy to customize.",
    stars: 4,
  },
  {
    name: "Jane Smith",
    role: "CTO at TechFlow",
    image: photo2,
    quote:
      "The code quality is strong and follows modern practices. Dropping these components into our workflow was simple and saved our team weeks of setup. Highly recommended.",
    stars: 5,
  },
]

export default function Testimonial({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [current, setCurrent] = React.useState(0)
  const isFirst = current === 0
  const isLast = current === testimonials.length - 1

  const nextSlide = () => {
    if (!isLast) setCurrent((prev) => prev + 1)
  }

  const prevSlide = () => {
    if (!isFirst) setCurrent((prev) => prev - 1)
  }

  return (
    <section
      className={cn("w-full px-4 md:px-8", className)}
      aria-labelledby="testimonials-heading"
      {...props}
    >
      <div className="mx-auto max-w-4xl max-md:max-w-xl">
        <div className="mb-12 max-w-3xl md:mb-16">
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

        <div>
          {testimonials.map((item, index) => (
            <figure
              key={item.name}
              className={cn(
                "items-center gap-12 transition-opacity duration-300 md:grid-cols-3",
                index === current ? "grid" : "hidden"
              )}
            >
              <div className="px-5 pb-5">
                <div className="rounded-[12px] shadow-soft">
                  <img
                    src={assetSrc(item.image)}
                    alt={item.name}
                    className="h-[280px] w-full rounded-[12px] object-cover shadow-[-20px_20px_0_var(--primary)] sm:h-[350px] rtl:shadow-[20px_20px_0_var(--primary)]"
                    width={280}
                    height={350}
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <QuoteIcon
                  className="mb-6 inline size-8 rotate-180 text-muted-foreground/40"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />

                <blockquote className="min-h-[100px]">
                  <p className="text-base leading-relaxed text-muted-foreground">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </blockquote>

                <div
                  className="mt-8 flex gap-2"
                  role="img"
                  aria-label={`${item.stars} out of 5 stars`}
                  dir="ltr"
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon key={i} filled={i < item.stars} />
                  ))}
                </div>

                <figcaption className="mt-4">
                  <p className="text-base font-semibold text-foreground">
                    {item.name}
                  </p>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {item.role}
                  </span>
                </figcaption>
              </div>
            </figure>
          ))}

          <div className="mt-4 flex justify-end gap-4">
            <button
              type="button"
              onClick={prevSlide}
              disabled={isFirst}
              aria-label="Previous testimonial"
              className={cn(
                "grid size-10 place-items-center rounded-full border border-border/70 bg-muted transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                isFirst ? "cursor-default opacity-50" : "cursor-pointer"
              )}
            >
              <ChevronLeftIcon className="size-3.5 text-foreground icon-dir" />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              disabled={isLast}
              aria-label="Next testimonial"
              className={cn(
                "grid size-10 place-items-center rounded-full border border-primary bg-primary text-primary-foreground transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                isLast ? "cursor-default opacity-50" : "cursor-pointer"
              )}
            >
              <ChevronRightIcon className="size-3.5 icon-dir" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
