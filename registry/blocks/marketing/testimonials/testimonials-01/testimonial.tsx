"use client"

import type * as React from "react"
import { QuoteIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import avatarImage from "./images/avatar.webp"

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
        "size-[18px]",
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

export default function Testimonial({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("w-full px-4 md:px-8", className)}
      aria-labelledby="testimonial-heading"
      {...props}
    >
      <div className="mx-auto max-w-2xl text-center">
        <QuoteIcon
          className="mx-auto mb-6 size-14 text-muted-foreground/40"
          strokeWidth={1.25}
          aria-hidden="true"
        />

        <figure>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div
              className="flex justify-center gap-2"
              role="img"
              aria-label="4 out of 5 stars"
              dir="ltr"
            >
              <StarIcon filled />
              <StarIcon filled />
              <StarIcon filled />
              <StarIcon filled />
              <StarIcon />
            </div>
            <p className="text-base font-medium text-muted-foreground">
              4 out of 5 stars
            </p>
          </div>

          <blockquote className="mt-6">
            <h2
              id="testimonial-heading"
              className="mb-4 text-2xl font-bold tracking-tight text-foreground"
            >
              Exceptional service and quality
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              &ldquo;What sets SonoJS apart is consistency. Every component is
              well crafted, easy to drop in, and works as described. Layouts stay
              clean, and the design experience never disappoints. I recommend it
              to other developers, and they share the same experience.&rdquo;
            </p>
          </blockquote>

          <figcaption className="mt-8 inline-flex flex-wrap items-center gap-4">
            <img
              src={assetSrc(avatarImage)}
              alt="John Doe"
              className="size-12 rounded-full border border-border/70"
              width={48}
              height={48}
            />
            <div className="text-start">
              <p className="text-sm font-semibold text-foreground">John Doe</p>
              <span className="mt-1 block text-xs font-medium text-muted-foreground">
                Verified customer
              </span>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
