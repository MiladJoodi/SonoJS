"use client"

import type * as React from "react"
import { ArrowRightIcon, ArrowUpRightIcon, SparklesIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

const FACES = [
  { initials: "MR", tone: "bg-primary/25 text-primary-foreground" },
  { initials: "AL", tone: "bg-white/15 text-white" },
  { initials: "SK", tone: "bg-white/10 text-white" },
] as const

export default function Cta({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "w-full min-w-0 bg-canvas px-4 py-10 sm:px-6 md:px-8 md:py-14",
        className
      )}
      aria-labelledby="cta-heading"
      {...props}
    >
      <div
        className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[16px] bg-zinc-950 text-zinc-50 shadow-soft dark:border dark:border-border/70"
        style={{
          boxShadow:
            "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
        }}
      >
        {/* Primary edge accent */}
        <div
          aria-hidden
          className="absolute inset-y-0 start-0 z-10 w-1.5 bg-primary"
        />

        {/* Quiet primary field in the end corner */}
        <div
          aria-hidden
          className="pointer-events-none absolute -end-16 -top-16 size-56 rounded-full bg-primary/20"
        />

        <div className="relative grid grid-cols-1 md:grid-cols-12">
          {/* Copy runway */}
          <div className="flex flex-col justify-between gap-10 p-7 sm:p-9 md:col-span-7 md:p-10 lg:p-12">
            <div className="text-start">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-zinc-300">
                <SparklesIcon className="size-3.5 text-primary" aria-hidden />
                Open for product teams
              </p>

              <h2
                id="cta-heading"
                className="mt-6 max-w-xl text-[2rem] font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-[2.75rem]"
              >
                Stop rebuilding{" "}
                <span className="text-primary">the same UI</span> every sprint.
              </h2>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
                Install a block. Keep your tokens. Ship before standup —
                without a second design pass.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  className="h-[46px] cursor-pointer gap-2 rounded-[12px] px-5"
                >
                  <a href="#">
                    Browse blocks
                    <ArrowRightIcon className="icon-dir size-4" aria-hidden />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="h-[46px] cursor-pointer gap-2 rounded-[12px] px-4 text-zinc-200 hover:bg-white/10 hover:text-white"
                >
                  <a href="#">
                    Read the docs
                    <ArrowUpRightIcon className="size-4" aria-hidden />
                  </a>
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
              <div className="flex -space-x-2 rtl:space-x-reverse">
                {FACES.map((face) => (
                  <span
                    key={face.initials}
                    className={cn(
                      "inline-flex size-8 items-center justify-center rounded-full border-2 border-zinc-950 text-[10px] font-semibold",
                      face.tone
                    )}
                  >
                    {face.initials}
                  </span>
                ))}
              </div>
              <p className="text-sm text-zinc-400">
                <span className="font-medium text-zinc-200">2,400+</span> teams
                shipping · no card required
              </p>
            </div>
          </div>

          {/* Invite panel */}
          <div className="relative border-t border-white/10 bg-white/[0.03] p-7 sm:p-9 md:col-span-5 md:border-t-0 md:border-s md:p-10 lg:p-12">
            <p className="text-xs font-medium tracking-[0.16em] text-zinc-500 uppercase">
              Claim a seat
            </p>
            <p className="mt-2 text-lg font-semibold tracking-tight text-white">
              Drop your work email.
            </p>
            <p className="mt-1 text-sm text-zinc-400">
              We&apos;ll send the CLI, the starter, and a private changelog.
            </p>

            <form
              className="mt-8 space-y-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <label className="sr-only" htmlFor="cta-02-email">
                Work email
              </label>
              <input
                id="cta-02-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@studio.com"
                className="h-[46px] w-full rounded-[12px] border border-white/15 bg-zinc-900/80 px-3 text-sm text-white outline-none placeholder:text-zinc-500 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
              />
              <Button
                type="submit"
                className="h-[46px] w-full cursor-pointer gap-2 rounded-[12px]"
              >
                Get the invite
                <ArrowRightIcon className="icon-dir size-4" aria-hidden />
              </Button>
            </form>

            <div
              dir="ltr"
              className="mt-8 rounded-[12px] border border-white/10 bg-black/40 p-4 font-mono text-[12px] leading-relaxed text-zinc-400"
            >
              <p className="text-zinc-500"># later tonight</p>
              <p className="mt-1">
                <span className="text-primary">$</span> npx @sonojs/ui add
                calendar
              </p>
              <p className="mt-1 text-emerald-400/90">
                {" "}
                + components/ui/calendar.tsx
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
