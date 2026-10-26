"use client"

import type * as React from "react"
import {
  ArrowRightIcon,
  MailIcon,
  MegaphoneIcon,
  SearchIcon,
  Share2Icon,
} from "lucide-react"

import { cn } from "@/lib/utils"

const services = [
  {
    title: "Search Engine Optimization",
    description:
      "Boost your website visibility and organic traffic with data-driven SEO strategies.",
    icon: SearchIcon,
    step: "01",
  },
  {
    title: "Pay-Per-Click Advertising",
    description:
      "Generate immediate traffic and conversions with strategic PPC campaigns.",
    icon: MegaphoneIcon,
    step: "02",
  },
  {
    title: "Social Media Marketing",
    description:
      "Build brand awareness and engage audiences with content that converts.",
    icon: Share2Icon,
    step: "03",
  },
  {
    title: "Email Marketing",
    description:
      "Nurture leads with personalized campaigns that arrive at the right moment.",
    icon: MailIcon,
    step: "04",
  },
] as const

export default function Features({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("w-full px-4 py-12 md:px-8 md:py-16", className)}
      aria-labelledby="features-heading"
      {...props}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between md:gap-6">
          <div className="max-w-xl text-start">
            <p className="mb-2 text-sm font-medium text-primary">Services</p>
            <h2
              id="features-heading"
              className="text-[1.75rem] font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl"
            >
              Our digital marketing services
            </h2>
          </div>
          <p className="max-w-sm text-start text-base leading-relaxed text-muted-foreground md:text-end">
            End-to-end solutions tailored to your goals — from discovery to
            measurable growth.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-[12px] bg-card p-5 shadow-soft sm:p-6 md:p-7"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3 sm:items-center">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <service.icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="min-w-0 text-base font-semibold leading-snug text-foreground sm:text-lg">
                    {service.title}
                  </h3>
                </div>
                <span
                  className="shrink-0 pt-0.5 text-xl font-bold tabular-nums leading-none sm:text-2xl"
                  style={{
                    color:
                      "color-mix(in oklab, var(--muted-foreground) 22%, transparent)",
                  }}
                  aria-hidden="true"
                >
                  {service.step}
                </span>
              </div>
              <p className="mb-4 text-base leading-relaxed text-muted-foreground sm:mb-5">
                {service.description}
              </p>
              <a
                href="#"
                className={cn(
                  "inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-sm font-medium text-primary",
                  "hover:opacity-80",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                )}
              >
                Learn more
                <ArrowRightIcon className="size-3.5 icon-dir" aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
