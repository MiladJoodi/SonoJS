"use client"

import type * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

const STEPS = [
  {
    title: "Install the packages",
    description:
      "Add the SonoJS packages your project needs, then import a theme preset in your CSS.",
    detail: "React · Tailwind CSS",
  },
  {
    title: "Choose your theme",
    description:
      "Start with a preset. Use semantic color tokens to keep light and dark modes consistent.",
    detail: "Presets · Light and dark",
  },
  {
    title: "Build your interface",
    description:
      "Compose individual components or start from a block. Adapt the content and layout to fit your product.",
    detail: "Typed components · Portable examples",
  },
  {
    title: "Review and ship",
    description:
      "Check your layout at different screen sizes, test keyboard navigation, and connect your application data.",
    detail: "Responsive layouts · Accessible interactions",
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
        <div className="max-w-2xl text-start">
          <p className="text-sm font-medium text-primary">How it works</p>
          <h1
            id="how-it-works-01-heading"
            className="mt-4 text-h1 font-semibold tracking-tight text-foreground"
          >
            A clear path from setup to shipping.
          </h1>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            A small set of steps to build a consistent interface with SonoJS.
          </p>
        </div>

        <ol className="mt-12 grid gap-8 border-t border-border/70 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li key={step.title} className="min-w-0 text-start">
              <span
                dir="ltr"
                className="text-sm font-medium tabular-nums text-primary"
              >
                0{index + 1}
              </span>
              <h2 className="mt-5 text-lg font-semibold text-foreground">
                {step.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
              <p className="mt-5 text-xs text-muted-foreground">{step.detail}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-[12px] border border-border/70 bg-card p-6 shadow-soft sm:flex-row sm:items-center">
          <div className="min-w-0 text-start">
            <h2 className="text-lg font-semibold text-foreground">
              Start with a working foundation.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Follow the installation guide or explore the block collection.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a href="#">Get started</a>
            </Button>
            <Button asChild variant="outline">
              <a href="#">Explore blocks</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
