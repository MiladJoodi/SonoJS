"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import teamImage from "./images/team.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

function PhotoPanel({ className }: { className?: string }) {
  const [missing, setMissing] = React.useState(false)

  return (
    <div
      className={cn(
        "cta-07-photo relative h-full min-h-[14rem] w-full overflow-hidden md:min-h-[440px]",
        className
      )}
    >
      {!missing ? (
        <img
          src={assetSrc(teamImage)}
          alt=""
          className="absolute inset-0 size-full object-cover"
          loading="lazy"
          onError={() => setMissing(true)}
        />
      ) : null}
      <span className="cta-07-photo-overlay absolute inset-0" aria-hidden="true" />
    </div>
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
        .cta-07-band {
          background-color: #1f2937;
          border-radius: 12px;
          overflow: hidden;
        }
        .cta-07-band .cta-07-title {
          color: #f8fafc;
        }
        .cta-07-band .cta-07-desc {
          color: #94a3b8;
        }
        .cta-07-band .cta-07-photo {
          background-color: #111827;
        }
        .cta-07-band .cta-07-photo-overlay {
          background-color: rgba(30, 58, 138, 0.4);
        }
        .cta-07-band .cta-07-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 46px;
          padding-inline: 1rem;
          margin-top: 2rem;
          border-radius: 12px;
          border: 1px solid #2563eb;
          background-color: #2563eb;
          color: #ffffff;
          font-size: 0.875rem;
          font-weight: 500;
          line-height: 1;
          text-decoration: none;
          cursor: pointer;
          transition: background-color 0.15s ease;
        }
        .cta-07-band .cta-07-btn:hover {
          background-color: #1d4ed8;
        }
        .cta-07-band .cta-07-btn:focus-visible {
          outline: 2px solid #2563eb;
          outline-offset: 2px;
        }
      `}</style>

      <div className="cta-07-band mx-auto max-w-6xl">
        <div className="grid items-center gap-y-0 md:grid-cols-2">
          <PhotoPanel />

          <div className="mx-auto w-full max-w-xl p-4 text-center sm:p-6 md:p-8 md:text-start">
            <h2
              id="cta-heading"
              className="cta-07-title mb-4 text-[1.75rem] font-bold tracking-tight sm:mb-6 sm:text-3xl"
            >
              Take the Next Step with Confidence
            </h2>
            <p className="cta-07-desc text-base leading-relaxed">
              Join thousands of professionals accelerating their growth through
              our expert-backed resources and tools. Whether you&apos;re just
              starting or scaling up, we&apos;ve got you covered.
            </p>
            <p className="cta-07-desc mt-4 text-base leading-relaxed">
              From career guides to design resources, everything is crafted to
              help you stay ahead in today&apos;s competitive landscape.
            </p>

            <a href="#" className="cta-07-btn">
              Get started
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
