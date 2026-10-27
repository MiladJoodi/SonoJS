"use client"

import * as React from "react"
import { ArrowRightIcon, Code2Icon, SparklesIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@sonojs/ui/components/field"
import { Input } from "@sonojs/ui/components/input"
import { cn } from "@/lib/utils"

function CodeSheet({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[12px] border border-white/10 bg-[#1E1E1E] text-[#D4D4D4] shadow-soft",
        className
      )}
      aria-hidden
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#FF5F57]" />
        <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="size-2.5 rounded-full bg-[#28C840]" />
        <span className="ms-2 font-mono text-[11px] text-white/50">
          invite-form.tsx
        </span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-relaxed">
        <code>
          <span className="text-[#569CD6]">import</span>
          <span>{` { Button } `}</span>
          <span className="text-[#569CD6]">from</span>
          <span className="text-[#CE9178]">{` "@/components/ui/button"`}</span>
          {"\n"}
          <span className="text-[#569CD6]">import</span>
          <span>{` { Input } `}</span>
          <span className="text-[#569CD6]">from</span>
          <span className="text-[#CE9178]">{` "@/components/ui/input"`}</span>
          {"\n\n"}
          <span className="text-[#569CD6]">export function</span>
          <span className="text-[#DCDCAA]"> InviteForm</span>
          <span>() {"{"}</span>
          {"\n"}
          <span>{`  return (`}</span>
          {"\n"}
          <span>{`    <form className="space-y-4">`}</span>
          {"\n"}
          <span>{`      <Input type="email" placeholder="you@company.com" />`}</span>
          {"\n"}
          <span>{`      <Button>Send invitation</Button>`}</span>
          {"\n"}
          <span>{`    </form>`}</span>
          {"\n"}
          <span>{`  )`}</span>
          {"\n"}
          <span>{`}`}</span>
        </code>
      </pre>
    </div>
  )
}

function InvitePreview({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[12px] border border-border/70 bg-card p-5 shadow-soft",
        className
      )}
    >
      <div className="mb-4 flex items-center justify-between gap-2">
        <p className="text-sm font-semibold">Invite a teammate</p>
        <Badge
          variant="secondary"
          className="gap-1 border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
        >
          <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
          Live
        </Badge>
      </div>
      <FieldGroup className="gap-4">
        <Field>
          <FieldLabel htmlFor="hero-11-email">Email address</FieldLabel>
          <Input
            id="hero-11-email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
          />
        </Field>
        <Button type="button" className="w-full">
          Send invitation
        </Button>
      </FieldGroup>
      <p className="mt-3 text-xs text-muted-foreground">
        They&apos;ll get a secure link that expires in 48 hours.
      </p>
    </div>
  )
}

export default function Hero11({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [mode, setMode] = React.useState<"stage" | "source">("stage")

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-canvas py-16 text-foreground sm:py-24",
        className
      )}
      aria-labelledby="hero-11-heading"
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 15% 20%, color-mix(in oklab, var(--primary) 14%, transparent), transparent 60%), radial-gradient(ellipse 50% 40% at 90% 70%, color-mix(in oklab, var(--primary) 8%, transparent), transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <Badge
              variant="secondary"
              className="gap-1.5 border-transparent bg-primary/10 font-medium text-primary"
            >
              <SparklesIcon className="size-3.5" aria-hidden />
              Built for product teams
            </Badge>

            <h1
              id="hero-11-heading"
              className="mt-6 text-4xl leading-tight font-semibold tracking-tight sm:text-5xl"
            >
              Ship the interface.{" "}
              <span className="text-primary">Keep the source.</span>
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Accessible components with a shared visual language. Preview what
              customers see — then drop the typed source into your app.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button type="button" size="lg" className="gap-2">
                Start building
                <ArrowRightIcon className="size-4 icon-dir" aria-hidden />
              </Button>
              <Button type="button" variant="outline" size="lg">
                Explore components
              </Button>
            </div>

            <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-muted-foreground">
              {[
                "Keyboard accessible",
                "TypeScript APIs",
                "Tailwind CSS v4",
                "Theme tokens included",
              ].map((label) => (
                <li key={label} className="flex items-center gap-2">
                  <span
                    className="size-1.5 shrink-0 rounded-full bg-primary"
                    aria-hidden
                  />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Product stage
              </p>
              <div
                className="inline-flex rounded-full border border-border/70 bg-card p-1 shadow-soft"
                role="tablist"
                aria-label="Preview mode"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === "stage"}
                  onClick={() => setMode("stage")}
                  className={cn(
                    "cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                    mode === "stage"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Design
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === "source"}
                  onClick={() => setMode("source")}
                  className={cn(
                    "inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                    mode === "source"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Code2Icon className="size-3.5" aria-hidden />
                  Source
                </button>
              </div>
            </div>

            <div className="relative min-h-85">
              <CodeSheet
                className={cn(
                  "absolute inset-x-2 top-0 transition-all duration-300 sm:inset-x-4",
                  mode === "source"
                    ? "z-20 translate-y-0 rotate-0 opacity-100"
                    : "z-0 translate-y-3 -rotate-2 opacity-70"
                )}
              />
              <InvitePreview
                className={cn(
                  "absolute inset-x-0 bottom-0 transition-all duration-300 sm:inset-x-6 sm:bottom-2",
                  mode === "stage"
                    ? "z-20 translate-y-0 opacity-100"
                    : "z-0 translate-y-4 scale-[0.97] opacity-40"
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
