"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"

import workingImage from "./images/working.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

function WorkingArt() {
  const [missing, setMissing] = React.useState(false)

  if (missing) return null

  return (
    <img
      src={assetSrc(workingImage)}
      alt=""
      aria-hidden="true"
      className="cta-04-art"
      loading="lazy"
      onError={() => setMissing(true)}
    />
  )
}

export default function Cta({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("w-full px-4 py-6 md:px-8 md:py-8", className)}
      aria-labelledby="cta-heading"
      {...props}
    >
      <style>{`
        .cta-04-band {
          background-color: #fee3c5;
          border-radius: 12px;
          overflow: hidden;
        }
        .dark .cta-04-band {
          background-color: #3f2e22;
        }
        .cta-04-band .cta-04-title {
          color: #0f172a;
        }
        .dark .cta-04-band .cta-04-title {
          color: #f8fafc;
        }
        .cta-04-band .cta-04-desc {
          color: #475569;
        }
        .dark .cta-04-band .cta-04-desc {
          color: #cbd5e1;
        }
        .cta-04-band .cta-04-art {
          display: block;
          width: 100%;
          max-width: 24rem;
          height: auto;
        }
        .cta-04-band .cta-04-art-wrap {
          display: none;
          pointer-events: none;
        }
        @media (min-width: 1024px) {
          .cta-04-band .cta-04-art-wrap {
            display: block;
            position: absolute;
            inset-inline-end: 0;
            bottom: -2rem;
          }
        }
      `}</style>

      <div className="mx-auto max-w-6xl">
        <div className="cta-04-band relative w-full px-4 py-10 sm:px-6 sm:py-12 md:px-16 md:py-16">
          <div className="relative grid lg:grid-cols-3 lg:gap-x-8">
            <div className="mx-auto max-w-3xl text-center lg:col-span-2 lg:mx-0 lg:text-start">
              <h2
                id="cta-heading"
                className="cta-04-title mb-6 text-3xl font-bold tracking-tight md:text-4xl"
              >
                Ready to launch, but not sure where to begin with your brand
                assets?
              </h2>
              <p className="cta-04-desc text-base leading-relaxed">
                Startup Design Kit is a fast, easy way to build professional
                brand visuals — from logos to landing pages. Whether you&apos;re
                just getting started or scaling fast, we&apos;ve got you covered.
              </p>

              <Button
                asChild
                className="mt-8 h-[46px] rounded-[12px]"
              >
                <a href="#">Explore the Kit</a>
              </Button>
            </div>

            <div className="cta-04-art-wrap">
              <WorkingArt />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
