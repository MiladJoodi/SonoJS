"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"

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
        .cta-05-band {
          background-image: linear-gradient(
            to bottom right,
            #000000 0%,
            #000000 45%,
            #9333ea 100%
          );
          border-radius: 24px;
        }
        [dir="rtl"] .cta-05-band {
          background-image: linear-gradient(
            to bottom left,
            #000000 0%,
            #000000 45%,
            #9333ea 100%
          );
        }
        .cta-05-band .cta-05-title {
          color: #ffffff;
        }
        .cta-05-band .cta-05-desc {
          color: #94a3b8;
        }
        .cta-05-band .cta-05-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 46px;
          padding-inline: 1rem;
          border-radius: 12px;
          border: 1px solid #ffffff;
          background-color: #ffffff;
          color: #0f172a;
          font-size: 0.875rem;
          font-weight: 500;
          line-height: 1;
          text-decoration: none;
          cursor: pointer;
          transition: background-color 0.15s ease;
        }
        .cta-05-band .cta-05-btn:hover {
          background-color: #f8fafc;
        }
        .cta-05-band .cta-05-btn:focus-visible {
          outline: 2px solid #ffffff;
          outline-offset: 2px;
        }
      `}</style>

      <div className="mx-auto max-w-4xl">
        <div className="cta-05-band w-full px-4 py-10 shadow-soft sm:px-6 sm:py-12 md:px-16 md:py-14">
          <div className="max-w-xl text-start">
            <h2
              id="cta-heading"
              className="cta-05-title mb-4 text-[1.75rem] font-bold tracking-tight sm:mb-6 sm:text-3xl md:text-4xl"
            >
              Your Free Guide is Ready!
            </h2>
            <p className="cta-05-desc text-base leading-relaxed">
              Discover insights, strategies, and resources designed to help you
              grow faster, make smarter decisions, and stay ahead in a
              constantly evolving digital landscape.
            </p>
            <a href="#" className="cta-05-btn mt-6 sm:mt-8">
              Download the Free Guide
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
