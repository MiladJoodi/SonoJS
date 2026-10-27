import type * as React from "react"

import { cn } from "@/lib/utils"

import decorativeLines from "./images/black-red-lines.svg"
import frameAppsAvatar from "./images/frame-apps-avatar.png"
import joinBox from "./images/join-box.png"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

function CheckMark({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-7 shrink-0 sm:size-8", className)}
      aria-hidden="true"
      {...props}
    >
      <rect width="32" height="32" rx="16" fill="#7781EE" />
      <rect
        x="22.9492"
        y="9.63605"
        width="2"
        height="16"
        rx="1"
        transform="rotate(45 22.9492 9.63605)"
        fill="white"
      />
      <rect
        x="7.62891"
        y="17.0431"
        width="2"
        height="7.57417"
        rx="1"
        transform="rotate(-45 7.62891 17.0431)"
        fill="white"
      />
    </svg>
  )
}

const DEFAULT_ITEMS = [
  "Quisque euismod",
  "Nunc iaculis quis risus at tristique",
] as const

export default function ContentSection({
  eyebrow = "Content",
  title = "What you need, when you need it",
  description = "Record your audio and upload it now.",
  items = DEFAULT_ITEMS,
  frameSrc = assetSrc(frameAppsAvatar),
  joinSrc = assetSrc(joinBox),
  linesSrc = assetSrc(decorativeLines),
  className,
  ...props
}: React.ComponentProps<"section"> & {
  eyebrow?: string
  title?: string
  description?: string
  items?: readonly string[]
  frameSrc?: string
  joinSrc?: string
  linesSrc?: string
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-violet-50 pt-14 pb-10 sm:pt-20 sm:pb-12 md:pt-[7.5rem] dark:bg-violet-950/40",
        className
      )}
      aria-labelledby="content-section-heading"
      {...props}
    >
      <img
        src={linesSrc}
        alt=""
        className="pointer-events-none absolute end-0 bottom-0 -mb-6 hidden h-[90%] max-w-[40%] object-contain opacity-90 lg:block xl:me-16"
        aria-hidden="true"
      />

      <div className="relative container mx-auto px-4">
        <div className="relative grid items-start gap-10 sm:gap-12 md:grid-cols-12 md:gap-8 md:pt-12 lg:pt-16">
          <div className="min-w-0 md:col-span-5 md:order-none">
            <div className="mx-auto max-w-md md:mx-0 xl:max-w-lg">
              <div
                className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-border/60 bg-card px-4 py-2 shadow-soft sm:mb-8 sm:px-5 sm:py-2.5"
                style={{
                  backgroundColor: "var(--card)",
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                <span className="relative flex size-2 shrink-0">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-40" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
                <span className="truncate text-sm font-semibold tracking-tight text-foreground uppercase">
                  {eyebrow}
                </span>
              </div>

              <h2
                id="content-section-heading"
                className="mb-5 text-3xl font-semibold tracking-tight text-balance text-foreground sm:mb-8 sm:text-4xl md:text-5xl xl:text-6xl"
              >
                {title}
              </h2>
              <p className="mb-8 text-lg text-muted-foreground sm:mb-10 sm:text-xl md:text-2xl">
                {description}
              </p>

              <ul
                className="space-y-3 rounded-[16px] border border-border/70 bg-card p-4 shadow-soft sm:p-5"
                style={{
                  backgroundColor: "var(--card)",
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-3 sm:items-center sm:gap-4">
                    <CheckMark />
                    <span className="min-w-0 text-sm font-medium text-foreground sm:text-base md:text-lg">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative order-first min-w-0 md:order-none md:col-span-7">
            <div className="relative z-10 mx-auto flex max-w-lg flex-col items-center gap-4 pb-6 sm:pb-10 md:mx-0 md:max-w-none md:pb-32 lg:pb-40">
              <img
                src={frameSrc}
                alt=""
                className="relative z-10 mx-auto block w-full max-w-md sm:max-w-lg"
                loading="lazy"
              />
              <img
                src={joinSrc}
                alt=""
                className="relative z-20 w-[min(100%,12rem)] sm:absolute sm:top-16 sm:end-0 sm:w-48 md:w-56 md:end-2 lg:end-4 lg:top-20 xl:-end-2"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
