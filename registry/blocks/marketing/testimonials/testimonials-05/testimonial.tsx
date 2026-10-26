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
    id: 1,
    name: "Sarah Johnson",
    image: avatar1,
    profession: "Food Critic",
    rating: 4,
    text: "SonoJS exceeded my expectations. The components are well designed, organized, and easy to implement. The experience feels polished yet flexible.",
  },
  {
    id: 2,
    name: "Michael Chen",
    image: avatar2,
    profession: "Food Blogger",
    rating: 4,
    text: "The blocks are clear and well documented. Support is easy to follow, and delivery feels impressively fast.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    image: avatar3,
    profession: "Restaurant Enthusiast",
    rating: 3,
    text: "Everything is clear and well documented. The pre-built components are especially useful for fast product launches.",
  },
  {
    id: 4,
    name: "David Thompson",
    image: avatar4,
    profession: "Local Guide",
    rating: 5,
    text: "A fantastic UI experience. The layouts are modern, responsive, and clearly presented.",
  },
  {
    id: 5,
    name: "Lisa Parker",
    image: avatar5,
    profession: "Culinary Expert",
    rating: 4,
    text: "Great quality and solid design. The attention to detail in layout structure and component usability stands out.",
  },
  {
    id: 6,
    name: "James Wilson",
    image: avatar6,
    profession: "Gourmet Enthusiast",
    rating: 4,
    text: "A real upgrade for building sites. From landing pages to dashboards, every layout feels spot on. SonoJS components are clean and production ready.",
  },
  {
    id: 7,
    name: "John Doe",
    image: avatar2,
    profession: "Founder of Rubik",
    rating: 4,
    text: "Using SonoJS feels like a tour through modern UI design. Each section tells a clear visual story, and the docs add confidence.",
  },
  {
    id: 8,
    name: "Rachel Kim",
    image: avatar3,
    profession: "Food & Travel Writer",
    rating: 5,
    text: "A strong design experience with clean, modular code. The layouts show practical use cases well, and the system is easy to work with.",
  },
  {
    id: 9,
    name: "Michael Foster",
    image: avatar6,
    profession: "Food & Travel Writer",
    rating: 4,
    text: "From landing pages to dashboards, every layout feels spot on. SonoJS components are clean, scalable, and ready for production.",
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
      <div className="mx-auto max-w-3xl lg:max-w-6xl">
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

        <div className="columns-1 sm:columns-2 lg:columns-3">
          {testimonials.map((item) => (
            <figure
              key={item.id}
              className="relative mb-4 w-full break-inside-avoid rounded-[12px] border border-border/70 bg-card p-4 shadow-soft sm:p-6"
            >
              <figcaption className="flex flex-wrap items-center gap-4">
                <img
                  src={assetSrc(item.image)}
                  alt={item.name}
                  className="size-12 rounded-full border-2 border-primary"
                  width={48}
                  height={48}
                />
                <div className="text-start">
                  <p className="text-sm font-semibold text-foreground">
                    {item.name}
                  </p>
                  <span className="mt-0.5 block text-xs font-medium text-muted-foreground">
                    {item.profession}
                  </span>
                </div>
              </figcaption>

              <div
                className="mt-6 flex gap-2"
                role="img"
                aria-label={`${item.rating} out of 5 stars`}
                dir="ltr"
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <StarIcon key={index} filled={index < item.rating} />
                ))}
              </div>

              <blockquote className="mt-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
