"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"

import avatar1 from "./images/avatar-1.webp"
import avatar2 from "./images/avatar-2.webp"
import avatar3 from "./images/avatar-3.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    image: avatar1,
    profession: "Product Designer",
    text: "SonoJS made it easy to launch my site. The components are clean, fast to use, and saved hours of build time.",
  },
  {
    id: 2,
    name: "Mark Adair",
    image: avatar2,
    profession: "Frontend Developer",
    text: "Everything looks professional with SonoJS. The blocks are modern, responsive, and simple to customize.",
  },
  {
    id: 3,
    name: "Simon Konecki",
    image: avatar3,
    profession: "Startup Founder",
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
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center md:mb-16">
          <h2
            id="testimonials-heading"
            className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            Testimonials
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            See what our happy clients have to say. They shared how these blocks
            helped them launch quickly, look professional, and grow with ease.
          </p>
        </div>

        <div className="space-y-12">
          {testimonials.map((item) => (
            <figure key={item.id} className="grid gap-4 md:grid-cols-3">
              <figcaption className="flex">
                <img
                  src={assetSrc(item.image)}
                  alt={item.name}
                  className="size-10 rounded-full border border-border/70"
                  width={40}
                  height={40}
                />
                <div className="ms-4 text-start">
                  <p className="text-sm font-semibold text-foreground">
                    {item.name}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {item.profession}
                  </p>
                </div>
              </figcaption>

              <blockquote className="md:col-span-2">
                <p className="text-base leading-relaxed text-muted-foreground">
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
