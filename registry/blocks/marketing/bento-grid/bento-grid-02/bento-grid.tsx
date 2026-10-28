"use client"

import type * as React from "react"
import { ArrowRightIcon, QuoteIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

const STACK = [
  { label: "React 19", note: "App Router" },
  { label: "Tailwind 4", note: "@theme" },
  { label: "Radix", note: "Primitives" },
] as const

export default function BentoGrid02({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white py-12 text-foreground sm:py-16 md:py-20 dark:bg-background",
        className
      )}
      aria-labelledby="bento-grid-02-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5 md:items-stretch">
          {/* Left column — editorial + stack */}
          <div className="flex flex-col gap-4 md:col-span-5 md:gap-5">
            <header className="flex flex-1 flex-col justify-center text-start md:py-2">
              <p className="text-sm font-medium text-muted-foreground">
                Design system
              </p>
              <h2
                id="bento-grid-02-heading"
                className="mt-3 text-h2 font-semibold tracking-tight text-foreground"
              >
                Components that look finished{" "}
                <span className="text-muted-foreground">
                  before you theme them.
                </span>
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Copy a block, keep the tokens, ship. No second design pass for
                radius, type, or empty states.
              </p>
              <div className="mt-6">
                <Button
                  type="button"
                  className="h-10 cursor-pointer gap-2 rounded-lg"
                >
                  Browse blocks
                  <ArrowRightIcon className="icon-dir size-4" aria-hidden />
                </Button>
              </div>
            </header>

            <article className="rounded-[12px] border border-border/70 bg-canvas p-5 shadow-soft sm:p-6 dark:bg-card">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Works with your stack
              </p>
              <ul className="mt-4 flex flex-col gap-2">
                {STACK.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center justify-between gap-3 rounded-[10px] border border-border/70 bg-white px-3.5 py-2.5 dark:bg-background"
                  >
                    <span className="text-sm font-medium text-foreground">
                      {item.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.note}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          {/* Right column — metric, quote, terminal */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-12 md:col-span-7 md:gap-5">
            <article className="relative overflow-hidden rounded-[12px] bg-foreground p-6 text-background shadow-soft sm:col-span-7 dark:border dark:border-border/70 dark:bg-card dark:text-foreground">
              <p className="text-xs font-medium tracking-wide text-background/60 uppercase dark:text-muted-foreground">
                Open source
              </p>
              <p className="mt-4 text-5xl font-semibold tracking-tight tabular-nums">
                110
              </p>
              <p className="mt-1 text-sm text-background/70 dark:text-muted-foreground">
                GitHub stars · and counting
              </p>
              <div
                aria-hidden
                className="pointer-events-none absolute -end-6 -bottom-8 size-32 rounded-full bg-background/10 dark:bg-muted/40"
              />
            </article>

            <article className="rounded-[12px] border border-border/70 bg-canvas p-6 shadow-soft sm:col-span-5 dark:bg-card">
              <QuoteIcon
                className="size-5 text-muted-foreground/50"
                aria-hidden
              />
              <blockquote className="mt-4 text-sm leading-relaxed text-foreground">
                &ldquo;We dropped three custom tables and one half-broken
                sidebar in an afternoon.&rdquo;
              </blockquote>
              <footer className="mt-4 text-xs text-muted-foreground">
                — Maya K., design eng
              </footer>
            </article>

            <article className="rounded-[12px] border border-border/70 bg-zinc-950 p-5 text-zinc-100 shadow-soft sm:col-span-12 sm:p-6 dark:border-border/70">
              <div className="flex items-center gap-1.5" aria-hidden>
                <span className="size-2.5 rounded-full bg-zinc-700" />
                <span className="size-2.5 rounded-full bg-zinc-700" />
                <span className="size-2.5 rounded-full bg-zinc-700" />
                <span className="ms-2 font-mono text-[11px] text-zinc-500">
                  terminal
                </span>
              </div>
              <pre
                dir="ltr"
                className="mt-4 overflow-x-auto font-mono text-[13px] leading-relaxed text-zinc-300"
              >
                <code>
                  <span className="text-zinc-500">$</span> npx @sonojs/ui add
                  calendar
                  {"\n"}
                  <span className="text-emerald-400/90"> +</span>{" "}
                  components/ui/button.tsx
                  {"\n"}
                  <span className="text-emerald-400/90"> +</span>{" "}
                  components/ui/calendar.tsx
                  {"\n"}
                  <span className="text-zinc-500">→</span> npm i date-fns
                  react-day-picker
                </code>
              </pre>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
