"use client"

import type * as React from "react"
import { ArrowRightIcon, CheckIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

function InstallArtifact() {
  return (
    <div
      dir="ltr"
      className="overflow-hidden rounded-[12px] bg-[#1E1E1E] p-3 font-mono text-[12px] leading-relaxed text-[#D4D4D4] shadow-soft"
    >
      <div className="mb-2 flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-[#FF5F57]" />
        <span className="size-2 rounded-full bg-[#FEBC2E]" />
        <span className="size-2 rounded-full bg-[#28C840]" />
        <span className="ms-2 text-[10px] text-white/40">terminal</span>
      </div>
      <p>
        <span className="text-[#6A9955]"># add a block</span>
      </p>
      <p>
        <span className="text-[#569CD6]">npx</span>{" "}
        <span className="text-[#CE9178]">@sonojs/ui@latest</span> add button
      </p>
      <p className="mt-1.5 text-[#4EC9B0]">+ components/ui/button.tsx</p>
    </div>
  )
}

function ThemeArtifact() {
  return (
    <div className="rounded-[12px] border border-border/70 bg-muted/40 p-3 shadow-soft">
      <p className="mb-2 text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
        Tokens
      </p>
      <div className="grid grid-cols-4 gap-1.5" dir="ltr">
        {[
          { name: "primary", swatch: "bg-primary" },
          { name: "card", swatch: "bg-card border border-border/70" },
          { name: "muted", swatch: "bg-muted" },
          { name: "fg", swatch: "bg-foreground" },
        ].map((t) => (
          <div key={t.name} className="min-w-0 text-center">
            <div className={cn("mx-auto size-8 rounded-full", t.swatch)} />
            <p className="mt-1 truncate text-[10px] text-muted-foreground">
              {t.name}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-2.5 flex gap-2">
        <span className="h-7 flex-1 rounded-md bg-background shadow-soft" />
        <span className="h-7 w-14 rounded-md bg-primary" />
      </div>
    </div>
  )
}

function BuildArtifact() {
  return (
    <div className="rounded-[12px] border border-border/70 bg-background p-3 shadow-soft">
      <div className="flex items-center justify-between gap-2 border-b border-border/70 pb-2">
        <span className="text-xs font-semibold">Dashboard</span>
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
          Live
        </span>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-1.5">
        <div className="col-span-2 h-11 rounded-md bg-muted/60" />
        <div className="h-11 rounded-md bg-primary/15" />
        <div className="h-7 rounded-md bg-muted/40" />
        <div className="h-7 rounded-md bg-muted/40" />
        <div className="h-7 rounded-md bg-muted/40" />
      </div>
    </div>
  )
}

function ShipArtifact() {
  return (
    <ul className="space-y-2 rounded-[12px] border border-border/70 bg-background p-3 shadow-soft">
      {[
        "Mobile + desktop checked",
        "Keyboard path verified",
        "Data wired to API",
      ].map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm">
          <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckIcon className="size-2.5" aria-hidden />
          </span>
          <span className="text-foreground">{item}</span>
        </li>
      ))}
    </ul>
  )
}

const STEPS = [
  {
    n: "01",
    title: "Install what you need",
    body: "CLI drop-in — one command, files in your project.",
    meta: "CLI · React · Tailwind",
    Artifact: InstallArtifact,
  },
  {
    n: "02",
    title: "Lock the look once",
    body: "Presets and tokens keep light and dark coherent.",
    meta: "Presets · Tokens",
    Artifact: ThemeArtifact,
  },
  {
    n: "03",
    title: "Compose the product",
    body: "Stack primitives or start from a block — then shape it.",
    meta: "Components · Blocks",
    Artifact: BuildArtifact,
  },
  {
    n: "04",
    title: "Ship with confidence",
    body: "Check breakpoints and focus, wire data, push.",
    meta: "QA · Launch",
    Artifact: ShipArtifact,
  },
] as const

export default function HowItWorks({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "w-full bg-white py-10 text-foreground sm:py-14 dark:bg-background",
        className
      )}
      aria-labelledby="how-it-works-01-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-3 border-b border-border/70 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-lg text-start">
            <p className="text-sm font-medium text-primary">How it works</p>
            <h1
              id="how-it-works-01-heading"
              className="mt-1.5 text-h2 font-semibold tracking-tight"
            >
              From empty repo to shipped UI.
            </h1>
          </div>
          <p className="max-w-xs text-start text-sm leading-relaxed text-muted-foreground sm:text-end">
            Install, theme, compose, ship — with a glimpse of each step.
          </p>
        </header>

        <ol className="divide-y divide-border/70">
          {STEPS.map((step, index) => {
            const Artifact = step.Artifact
            const flip = index % 2 === 1
            return (
              <li
                key={step.n}
                className="grid gap-5 py-6 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-7"
              >
                <div
                  className={cn("lg:col-span-6", flip && "lg:order-2")}
                >
                  <div className="flex items-baseline gap-3 text-start">
                    <span
                      dir="ltr"
                      className="font-mono text-3xl font-semibold tracking-tight text-primary/25 tabular-nums sm:text-4xl"
                      aria-hidden
                    >
                      {step.n}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                        {step.meta}
                      </p>
                      <h2 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">
                        {step.title}
                      </h2>
                      <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={cn(
                    "lg:col-span-6",
                    flip ? "lg:order-1" : "lg:ps-2"
                  )}
                >
                  <Artifact />
                </div>
              </li>
            )
          })}
        </ol>

        <div className="mt-2 flex flex-col items-start justify-between gap-4 border-t border-border/70 pt-6 sm:flex-row sm:items-center">
          <p className="text-start text-sm font-medium text-foreground">
            Ready to start? The foundation is waiting.
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Button asChild size="sm" className="cursor-pointer">
              <a href="#">
                Get started
                <ArrowRightIcon className="size-4 icon-dir" aria-hidden />
              </a>
            </Button>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="cursor-pointer"
            >
              <a href="#">Explore blocks</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
