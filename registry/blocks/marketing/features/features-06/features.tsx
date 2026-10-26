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

const features = [
  {
    title: "Customization",
    description:
      "Tailor every aspect of the platform to your workflow — from design preferences to functional defaults.",
    icon: Settings2Icon,
  },
  {
    title: "Security",
    description:
      "Protect sensitive data with modern encryption, access controls, and continuous monitoring.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Support",
    description:
      "Get help when you need it. Our team is ready to unblock you and keep projects moving.",
    icon: HeadphonesIcon,
  },
  {
    title: "Performance",
    description:
      "Ship fast experiences with a stack built for speed, reliability, and scale.",
    icon: ChartColumnIcon,
  },
] as const

export default function Features({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("w-full px-4 py-12 md:px-8 md:py-16", className)}
      aria-labelledby="features-heading"
      {...props}
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-12 xl:grid-cols-[minmax(0,20rem)_1fr]">
        <div className="text-start lg:pt-2">
          <p className="mb-2 text-sm font-medium text-primary">
            Features
          </p>
          <h2
            id="features-heading"
            className="mb-3 text-[1.75rem] font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl"
          >
            Discover our exclusive features
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Unlock a world of possibilities with our exclusive features.
            Explore how our unique offerings can transform your journey and
            empower you to achieve more.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-[12px] bg-card p-5 shadow-soft sm:p-6"
            >
              <div className="mb-3 flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-muted text-foreground">
                  <feature.icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="min-w-0 pt-1.5 text-base font-semibold text-foreground sm:text-lg">
                  {feature.title}
                </h3>
              </div>
              <p className="mb-3 text-base leading-relaxed text-muted-foreground sm:mb-4">
                {feature.description}
              </p>
              <a
                href="#"
                className={cn(
                  "inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-sm font-medium text-primary",
                  "hover:opacity-80",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                )}
              >
                Learn more
                <ArrowRightIcon className="size-3.5 icon-dir" aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
