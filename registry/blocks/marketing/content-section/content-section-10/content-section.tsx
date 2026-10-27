import type * as React from "react"

import { cn } from "@/lib/utils"

import orangePencil from "./images/icon-orange-pencil.svg"
import widgetImg from "./images/widget.png"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

export default function ContentSection({
  eyebrow = "Discover special tools",
  title = "Free your ideas",
  description = "Newest haretra neque non mi aliquam, finibus mollis is the nulla aliquet in molestie odio congue.",
  featureTitle = "A spatial system is a set of rules for how you measure and size your UI elements.",
  featureDescription = "The nulla commodo, commodo eros a, tristique lectus.",
  ctaLabel = "Official website",
  ctaHref = "#",
  widgetSrc = assetSrc(widgetImg),
  iconSrc = assetSrc(orangePencil),
  className,
  ...props
}: React.ComponentProps<"section"> & {
  eyebrow?: string
  title?: string
  description?: string
  featureTitle?: string
  featureDescription?: string
  ctaLabel?: string
  ctaHref?: string
  widgetSrc?: string
  iconSrc?: string
}) {
  return (
    <section
      className={cn("w-full bg-canvas py-12 sm:py-20 md:py-28", className)}
      style={{ backgroundColor: "var(--canvas)" }}
      aria-labelledby="content-section-heading"
      {...props}
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16 md:mb-24">
          <div className="mb-6 flex items-center justify-center gap-3 sm:mb-8 sm:gap-4">
            <span className="h-px w-6 shrink-0 bg-border sm:w-10" aria-hidden />
            <span className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase sm:tracking-[0.22em]">
              {eyebrow}
            </span>
            <span className="h-px w-6 shrink-0 bg-border sm:w-10" aria-hidden />
          </div>
          <h2
            id="content-section-heading"
            className="mb-5 text-4xl font-medium tracking-tight text-balance text-foreground sm:mb-6 sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {title}
          </h2>
          <p className="mx-auto max-w-lg text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {description}
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-8 sm:gap-12 md:grid-cols-2 md:gap-12 lg:gap-20">
          <div
            className="relative order-first min-w-0 overflow-hidden rounded-[16px] border border-border/70 bg-card p-3 shadow-soft sm:rounded-[20px] sm:p-4 md:order-none md:p-6"
            style={{
              backgroundColor: "var(--card)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <img
              src={widgetSrc}
              alt=""
              className="h-auto w-full object-contain"
              loading="lazy"
            />
          </div>

          <div className="min-w-0 md:max-w-lg">
            <div
              className="mb-6 inline-flex rounded-[16px] border border-border/70 bg-card p-2.5 shadow-soft sm:mb-8 sm:p-3"
              style={{
                backgroundColor: "var(--card)",
                boxShadow: "var(--shadow-soft)",
              }}
            >
              <img
                src={iconSrc}
                alt=""
                className="size-14 sm:size-16"
                loading="lazy"
              />
            </div>
            <h3 className="mb-4 text-xl font-medium leading-snug tracking-tight text-balance text-foreground sm:mb-6 sm:text-2xl md:text-3xl xl:text-4xl">
              {featureTitle}
            </h3>
            <p className="mb-8 text-base leading-7 text-muted-foreground sm:mb-10 sm:text-lg">
              {featureDescription}
            </p>
            <a
              href={ctaHref}
              className="group inline-flex min-h-11 cursor-pointer items-center gap-3 border-b-2 border-primary pb-1 text-primary outline-none transition-colors hover:border-primary/70 hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              <span className="text-base font-bold tracking-tight sm:text-lg">
                {ctaLabel}
              </span>
              <svg
                className="icon-dir size-4 shrink-0 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                width="16"
                height="13"
                viewBox="0 0 16 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M10.8 1L15 7H1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 12L15 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
