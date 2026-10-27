import type * as React from "react"
import { ArrowUpRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"

import digitalImg1 from "./images/digital-img-1.webp"
import digitalImg4 from "./images/digital-img-4.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

type ContentRow = {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  mediaEnd?: boolean
  ctaLabel?: string
  ctaHref?: string
  tag?: string
}

const DEFAULT_ROWS: ContentRow[] = [
  {
    title: "Master the Art of Job Hunting",
    description:
      "Essential tips to land your first role with confidence—from standout resumes to interviews that stick.",
    imageSrc: assetSrc(digitalImg1),
    imageAlt: "Job hunting",
    mediaEnd: false,
    ctaLabel: "Get started",
    ctaHref: "#",
    tag: "Career",
  },
  {
    title: "Stand Out in a Competitive Market",
    description:
      "Position yourself as the candidate companies want—strengths, personal brand, and aligned opportunities.",
    imageSrc: assetSrc(digitalImg4),
    imageAlt: "Competitive market",
    mediaEnd: true,
    ctaLabel: "Get started",
    ctaHref: "#",
    tag: "Brand",
  },
]

export default function ContentSection({
  eyebrow = "Playbooks",
  title = "Seamless and Smart Operations",
  description = "High-quality products and services that meet expectations—and consistently exceed them. Clarity, confidence, results.",
  rows = DEFAULT_ROWS,
  className,
  ...props
}: React.ComponentProps<"section"> & {
  eyebrow?: string
  title?: string
  description?: string
  rows?: ContentRow[]
}) {
  return (
    <section
      className={cn(
        "w-full bg-canvas px-4 py-12 sm:py-16 md:px-8 md:py-24",
        className
      )}
      style={{ backgroundColor: "var(--canvas)" }}
      aria-labelledby="content-section-heading"
      {...props}
    >
      <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14 md:mb-20">
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
          {eyebrow}
        </p>
        <h2
          id="content-section-heading"
          className="mb-4 text-3xl font-bold tracking-tight text-balance text-foreground sm:mb-5 md:text-5xl"
        >
          {title}
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-5 sm:gap-8 md:grid-cols-2">
        {rows.map((row) => (
          <article
            key={row.title}
            className="group flex min-w-0 flex-col overflow-hidden rounded-[16px] border border-border/70 bg-card shadow-soft"
            style={{
              backgroundColor: "var(--card)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div
              className="relative w-full overflow-hidden bg-muted"
              style={{ aspectRatio: "16 / 11" }}
            >
              <img
                src={row.imageSrc}
                alt={row.imageAlt}
                className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
              {row.tag ? (
                <span className="absolute start-3 top-3 rounded-full border border-border/60 bg-card/95 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-sm sm:start-4 sm:top-4">
                  {row.tag}
                </span>
              ) : null}
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-6 md:p-8">
              <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground sm:mb-3 sm:text-xl">
                {row.title}
              </h3>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground sm:mb-8 sm:text-base">
                {row.description}
              </p>
              {row.ctaLabel ? (
                <Button
                  asChild
                  variant="outline"
                  className="w-full cursor-pointer gap-2 sm:w-fit"
                >
                  <a href={row.ctaHref ?? "#"}>
                    {row.ctaLabel}
                    <ArrowUpRightIcon className="size-4 icon-dir" aria-hidden />
                  </a>
                </Button>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
