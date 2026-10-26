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
        .cta-09-band {
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          background-image: linear-gradient(
            to bottom right,
            #581c87 0%,
            #312e81 50%,
            #6b21a8 100%
          );
        }
        [dir="rtl"] .cta-09-band {
          background-image: linear-gradient(
            to bottom left,
            #581c87 0%,
            #312e81 50%,
            #6b21a8 100%
          );
        }
        .cta-09-band .cta-09-deco {
          position: absolute;
          pointer-events: none;
          border-radius: 12px;
          background-color: rgba(255, 255, 255, 0.1);
          transform: rotate(45deg);
        }
        .cta-09-band .cta-09-deco-a {
          inset-inline-start: 2.5rem;
          top: 50%;
          width: 7rem;
          height: 7rem;
          margin-top: -3.5rem;
        }
        .cta-09-band .cta-09-deco-b {
          inset-inline-end: 2.5rem;
          top: 2.5rem;
          width: 4rem;
          height: 4rem;
        }
        .cta-09-band .cta-09-deco-c {
          inset-inline-end: 6rem;
          bottom: 2.5rem;
          width: 5rem;
          height: 5rem;
        }
        .cta-09-band .cta-09-title {
          color: #ffffff;
        }
        .cta-09-band .cta-09-desc {
          color: #cbd5e1;
        }
        .cta-09-band .cta-09-note {
          color: #94a3b8;
        }
        .cta-09-band .cta-09-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 46px;
          padding-inline: 1rem;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 500;
          line-height: 1;
          text-decoration: none;
          cursor: pointer;
          transition: background-color 0.15s ease, color 0.15s ease;
        }
        .cta-09-band .cta-09-btn-primary {
          border: 1px solid #ffffff;
          background-color: #ffffff;
          color: #0f172a;
        }
        .cta-09-band .cta-09-btn-primary:hover {
          background-color: #f1f5f9;
        }
        .cta-09-band .cta-09-btn-ghost {
          border: 1px solid #64748b;
          background-color: transparent;
          color: #ffffff;
        }
        .cta-09-band .cta-09-btn-ghost:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
        .cta-09-band .cta-09-btn:focus-visible {
          outline: 2px solid #ffffff;
          outline-offset: 2px;
        }
        @media (max-width: 639px) {
          .cta-09-band .cta-09-deco {
            display: none;
          }
        }
      `}</style>

      <div className="cta-09-band mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 md:px-12 md:py-20">
        <div className="cta-09-deco cta-09-deco-a" aria-hidden="true" />
        <div className="cta-09-deco cta-09-deco-b" aria-hidden="true" />
        <div className="cta-09-deco cta-09-deco-c" aria-hidden="true" />

        <div className="relative mx-auto max-w-2xl text-center">
          <h2
            id="cta-heading"
            className="cta-09-title mb-4 text-[1.75rem] font-bold tracking-tight sm:mb-6 sm:text-3xl md:text-4xl"
          >
            Ready to boost your productivity?
          </h2>
          <p className="cta-09-desc text-base leading-relaxed">
            Start organizing your work, collaborating with your team, and
            achieving more with powerful tools built for modern teams.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8 sm:gap-4">
            <a href="#" className="cta-09-btn cta-09-btn-primary">
              Start your free trial
            </a>
            <a href="#" className="cta-09-btn cta-09-btn-ghost">
              View pricing
            </a>
          </div>

          <p className="cta-09-note mt-4 text-xs">
            No credit card required. Get started in minutes.
          </p>
        </div>
      </div>
    </section>
  )
}
