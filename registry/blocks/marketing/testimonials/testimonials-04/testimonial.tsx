"use client"

import type * as React from "react"
import { Fragment } from "react"

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
    profession: "Frontend Developer at Rubik",
    text: "SonoJS helped us cut development time a lot. I shipped a polished MVP in days instead of weeks. The components are modern, accessible, and easy to customize.",
  },
  {
    id: 2,
    name: "Mark Adair",
    image: avatar2,
    profession: "UI/UX Designer at Lumina",
    text: "We struggled with design consistency until we switched to SonoJS. It gave our product a professional look right away. The reusable layout blocks saved my team hours.",
  },
  {
    id: 3,
    name: "Simon Konecki",
    image: avatar3,
    profession: "Full Stack Engineer at Labar",
    text: "As a full stack engineer, I like how smoothly SonoJS fits my stack. Whether it is Next.js or plain HTML, the blocks just work. It is my go-to kit for rapid prototyping.",
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
      <div className="mx-auto grid max-w-7xl items-start gap-12 md:grid-cols-2">
        <div className="max-w-3xl">
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

        <div>
          {testimonials.map((item, index) => (
            <Fragment key={item.id}>
              <figure>
                <blockquote>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </blockquote>

                <figcaption className="mt-4 flex items-center gap-4">
                  <img
                    src={assetSrc(item.image)}
                    alt={item.name}
                    className="size-10 rounded-full border border-border/70"
                    width={40}
                    height={40}
                  />
                  <div className="text-start">
                    <p className="text-sm font-semibold text-foreground">
                      {item.name}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {item.profession}
                    </p>
                  </div>
                </figcaption>
              </figure>
              {index !== testimonials.length - 1 ? (
                <hr className="my-6 border-border/70" />
              ) : null}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
