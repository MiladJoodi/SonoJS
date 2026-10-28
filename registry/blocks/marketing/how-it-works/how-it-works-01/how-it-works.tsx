"use client"

import type * as React from "react"
import { ArrowRightIcon, CheckIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

function InstallArtifact() {
  return (
    <div
      dir="ltr"
      className="overflow-hidden rounded-[12px] bg-[#1E1E1E] p-4 font-mono text-[13px] leading-relaxed text-[#D4D4D4] shadow-soft"
    >
      <div className="mb-3 flex items-center gap-1.5">
        <span className="size-2.5 rounded-full bg-[#FF5F57]" />
        <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="size-2.5 rounded-full bg-[#28C840]" />
        <span className="ms-2 text-[11px] text-white/40">terminal</span>
      </div>
      <p>
        <span className="text-[#6A9955]"># add a block</span>
      </p>
      <p>
        <span className="text-[#569CD6]">npx</span>{" "}
        <span className="text-[#CE9178]">@sonojs/ui@latest</span> add button
      </p>
      <p className="mt-2 text-[#4EC9B0]">+ components/ui/button.tsx</p>
    </div>
  )
}

function ThemeArtifact() {
  return (
    <div className="rounded-[12px] border border-border/70 bg-muted/40 p-4 shadow-soft">
      <p className="mb-3 text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
        Tokens
      </p>
      <div className="grid grid-cols-4 gap-2" dir="ltr">
        {[
          { name: "primary", swatch: "bg-primary" },
          { name: "card", swatch: "bg-card border border-border/70" },
          { name: "muted", swatch: "bg-muted" },
          { name: "fg", swatch: "bg-foreground" },
        ].map((t) => (
          <div key={t.name} className="min-w-0 text-center">
            <div className={cn("mx-auto size-10 rounded-full", t.swatch)} />
            <p className="mt-1.5 truncate text-[10px] text-muted-foreground">
              {t.name}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <span className="h-8 flex-1 rounded-md bg-background shadow-soft" />
        <span className="h-8 w-16 rounded-md bg-primary" />
      </div>
    </div>
  )
}

function BuildArtifact() {
  return (
    <div className="rounded-[12px] border border-border/70 bg-background p-4 shadow-soft">
      <div className="flex items-center justify-between gap-2 border-b border-border/70 pb-3">
        <span className="text-xs font-semibold">Dashboard</span>
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
          Live
        </span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <div className="col-span-2 h-16 rounded-md bg-muted/60" />
        <div className="h-16 rounded-md bg-primary/15" />
        <div className="h-10 rounded-md bg-muted/40" />
        <div className="h-10 rounded-md bg-muted/40" />
        <div className="h-10 rounded-md bg-muted/40" />
      </div>
    </div>
  )
}

function ShipArtifact() {
  return (
    <ul className="space-y-2.5 rounded-[12px] border border-border/70 bg-background p-4 shadow-soft">
      {[
        "Mobile + desktop checked",
        "Keyboard path verified",
        "Data wired to API",
      ].map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm">
          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckIcon className="size-3" aria-hidden />
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
    body: "Drop in packages with the CLI. One command, files land in your project — no mystery wrappers.",
    meta: "CLI · React · Tailwind",
    Artifact: InstallArtifact,
  },
  {
    n: "02",
    title: "Lock the look once",
    body: "Pick a preset and lean on semantic tokens. Light and dark stay coherent without hunting hex codes.",
    meta: "Presets · Tokens",
    Artifact: ThemeArtifact,
  },
  {
    n: "03",
    title: "Compose the product",
    body: "Stack primitives or start from a block. Rename, restyle, and shape it until it feels like yours.",
    meta: "Components · Blocks",
    Artifact: BuildArtifact,
  },
  {
    n: "04",
    title: "Ship with confidence",
    body: "Pressure-test breakpoints and focus order, then connect real data and push.",
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
        "w-full bg-canvas py-16 text-foreground sm:py-24",
        className
      )}
      aria-labelledby="how-it-works-01-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-6 border-b border-border/70 pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl text-start">
            <p className="text-sm font-medium text-primary">How it works</p>
            <h1
              id="how-it-works-01-heading"
              className="mt-3 text-h1 font-semibold tracking-tight"
            >
              From empty repo to shipped UI.
            </h1>
          </div>
          <p className="max-w-sm text-start text-sm leading-relaxed text-muted-foreground sm:text-end">
            A straight path — install, theme, compose, ship — with a glimpse of
            each step as you go.
          </p>
        </header>

        <ol className="divide-y divide-border/70">
          {STEPS.map((step, index) => {
            const Artifact = step.Artifact
            const flip = index % 2 === 1
            return (
              <li
                key={step.n}
                className="grid gap-8 py-10 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-14"
              >
                <div
                  className={cn(
                    "lg:col-span-6",
                    flip && "lg:order-2"
                  )}
                >
                  <div className="flex items-baseline gap-4 text-start">
                    <span
                      dir="ltr"
                      className="font-mono text-4xl font-semibold tracking-tight text-primary/25 tabular-nums sm:text-5xl"
                      aria-hidden
                    >
                      {step.n}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                        {step.meta}
                      </p>
                      <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                        {step.title}
                      </h2>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={cn(
                    "lg:col-span-6",
                    flip ? "lg:order-1" : "lg:ps-4"
                  )}
                >
                  <Artifact />
                </div>
              </li>
            )
          })}
        </ol>

        <div className="mt-4 flex flex-col items-start justify-between gap-5 border-t border-border/70 pt-10 sm:flex-row sm:items-center">
          <p className="text-start text-base font-medium text-foreground">
            Ready to start? The foundation is waiting.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="cursor-pointer">
              <a href="#">
                Get started
                <ArrowRightIcon className="size-4 icon-dir" aria-hidden />
              </a>
            </Button>
            <Button asChild variant="outline" className="cursor-pointer">
              <a href="#">Explore blocks</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
