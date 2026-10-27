"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"

import mediaImage from "./images/media.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const metrics = [
  {
    value: "55%",
    description: "A percentage number that suggests an increase in performance.",
  },
  {
    value: "43%",
    description: "Another percentage that could suggest internet rates etc..",
  },
]

export default function Stats({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const mediaSrc = assetSrc(mediaImage)

  return (
    <section
      className={cn("w-full px-4 md:px-8", className)}
      aria-labelledby="stats-heading"
      {...props}
    >
      <style>{`
        .stats-02-band {
          overflow: hidden;
          border-radius: 24px;
          background-color: #000000;
        }
        .stats-02-band .stats-02-title {
          color: #ffffff;
        }
        .stats-02-band .stats-02-value {
          display: inline-block;
          background-image: linear-gradient(
            90deg,
            rgba(186, 109, 238, 1) 0%,
            rgba(252, 202, 89, 1) 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        .stats-02-band .stats-02-desc {
          color: #e5e7eb;
        }
        .stats-02-band .stats-02-media {
          display: block;
          width: 100%;
          max-width: 28rem;
          height: auto;
          margin-inline: auto;
          border-radius: 12px;
          transition: transform 500ms ease;
        }
        .stats-02-band .stats-02-media:hover {
          transform: translateY(-0.25rem);
        }
      `}</style>

      <div className="stats-02-band w-full overflow-hidden px-4 py-14 sm:px-6 md:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-14 lg:gap-16">
          <div className="min-w-0">
            <img
              src={mediaSrc}
              alt=""
              className="stats-02-media rounded-xl"
              loading="lazy"
            />
          </div>

          <div className="min-w-0 md:max-w-md">
            <h2
              id="stats-heading"
              className="stats-02-title mb-10 text-2xl font-semibold tracking-tight md:mb-12 md:text-3xl"
            >
              Showcase some impressive numbers.
            </h2>

            <ul className="flex flex-col gap-8">
              {metrics.map((item) => (
                <li key={item.value} className="flex flex-col gap-2">
                  <p
                    className="stats-02-value text-4xl font-semibold tracking-tight tabular-nums md:text-5xl"
                    dir="ltr"
                  >
                    {item.value}
                  </p>
                  <p className="stats-02-desc text-sm leading-relaxed">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
