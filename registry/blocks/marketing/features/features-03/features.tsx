"use client"

import type * as React from "react"
import {
  ArrowRightIcon,
  ChartColumnIcon,
  HeadphonesIcon,
  Settings2Icon,
  ShieldCheckIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"

const features = [
  {
    title: "Customization",
    description:
      "Easily tailor every aspect of the platform to suit your business needs.",
    icon: Settings2Icon,
  },
  {
    title: "Security",
    description: "Your data is protected by the latest security measures.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Support",
    description: "24/7 customer support for all your inquiries.",
    icon: HeadphonesIcon,
  },
  {
    title: "Performance",
    description: "Experience blazing-fast performance with our product.",
    icon: ChartColumnIcon,
  },
] as const

export default function Features({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("w-full bg-muted px-4 py-12 md:px-8 md:py-20", className)}
      aria-labelledby="features-heading"
      {...props}
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-stretch gap-5 md:gap-8 lg:flex-row lg:items-start lg:gap-10">
          <div className="w-full rounded-[12px] border border-border/70 bg-card p-6 text-start shadow-soft sm:p-8 md:p-10 lg:max-w-md lg:shrink-0"
              style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
            <p className="mb-3 text-sm font-medium tracking-wide text-primary">
              Features
            </p>
            <h2
              id="features-heading"
              className="mb-3 text-[1.75rem] font-bold tracking-tight text-foreground sm:mb-4 sm:text-3xl"
            >
              Discover our exclusive features
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Unlock a world of possibilities with our features. Explore how
              our unique offerings can transform your journey and empower you
              to achieve more.
            </p>
            <Button
              asChild
              className="mt-6 h-[46px] w-full rounded-[12px] sm:mt-8 sm:w-auto"
            >
              <a href="#">
                Learn more
                <ArrowRightIcon
                  className="size-3.5 icon-dir"
                  aria-hidden="true"
                />
              </a>
            </Button>
          </div>

          <div className="grid w-full gap-4 md:grid-cols-2 md:gap-5">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-[12px] bg-card p-5 text-start shadow-soft sm:p-6"

              style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
                <div className="mb-3 flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-primary text-primary-foreground">
                    <feature.icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="min-w-0 pt-1.5 text-base font-semibold tracking-tight text-foreground sm:text-lg">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
