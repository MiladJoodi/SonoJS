import type * as React from "react"

import { cn } from "@/lib/utils"

import robotImg from "./images/image-robot.png"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

export default function ContentSection({
  titleLead = "Casper",
  titleRest = "is an awesome UI Library",
  leadParagraphs = [
    "Arcu ultrices sit non magna enim id semper quam venenatis. Mi quisque ultrices hendrerit nec aliquet integer mollis faucibus morbi.",
    "Augue justo at convallis vitae nunc maecenas est. Viverra duis feugiat posuere vitae tincidunt.",
  ],
  asideTitle = "Mi quisque ultrices hendrerit nec aliquet integer mollis faucibus morbi.",
  asideParagraphs = [
    "Pellentesque ipsum nulla in eget interdum a. Neque pellentesque pulvinar mauris pulvinar diam. Turpis aliquet pellentesque velit vitae nisi sed morbi ultrices sed.",
    "Vestibulum est ante in congue a fusce nunc. At tristique donec nisi viverra vulputate blandit orci at lectus. Morbi cras urna congue ornare.",
  ],
  imageSrc = assetSrc(robotImg),
  imageAlt = "Product illustration",
  className,
  style,
  ...props
}: React.ComponentProps<"section"> & {
  titleLead?: string
  titleRest?: string
  leadParagraphs?: readonly string[]
  asideTitle?: string
  asideParagraphs?: readonly string[]
  imageSrc?: string
  imageAlt?: string
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-zinc-950 py-12 sm:py-16 md:py-24",
        className
      )}
      style={{
        backgroundImage:
          "radial-gradient(ellipse 50% 55% at 0% 0%, rgb(124 58 237 / 0.32), transparent 70%), radial-gradient(ellipse 40% 45% at 100% 100%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 70%)",
        ...style,
      }}
      aria-labelledby="content-section-heading"
      {...props}
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 md:items-start md:gap-12 lg:gap-16">
          <div className="min-w-0">
            <h2
              id="content-section-heading"
              className="mb-6 text-3xl font-medium tracking-tight text-balance text-white sm:mb-8 sm:text-4xl lg:text-5xl"
            >
              <span className="block text-violet-300">{titleLead}</span>
              <span className="text-white"> {titleRest}</span>
            </h2>
            <div className="space-y-3 border-s border-violet-400/40 ps-4 sm:space-y-4 sm:ps-5">
              {leadParagraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 36)}
                  className="text-base font-medium leading-relaxed text-zinc-400 sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="min-w-0">
            <h3 className="mb-4 text-lg font-medium text-zinc-50 sm:mb-5 sm:text-xl">
              {asideTitle}
            </h3>
            <div className="mb-8 space-y-3 sm:mb-10 sm:space-y-4">
              {asideParagraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 36)}
                  className="text-sm leading-relaxed text-zinc-300 sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="overflow-hidden rounded-[16px] border border-white/10 bg-white/5 p-2 sm:p-3">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="block h-auto w-full rounded-[12px] object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
