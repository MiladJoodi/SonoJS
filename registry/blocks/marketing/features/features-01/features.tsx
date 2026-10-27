"use client"

import type * as React from "react"
import {
  ArrowRightIcon,
  ChartColumnIcon,
  Globe2Icon,
  HeadphonesIcon,
  MessageSquareIcon,
  Settings2Icon,
  ShieldCheckIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

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
    description:
      "Our expert support team is available around the clock to assist you.",
    icon: HeadphonesIcon,
  },
  {
    title: "Performance",
    description: "Experience blazing-fast performance with our product.",
    icon: ChartColumnIcon,
  },
  {
    title: "Global Reach",
    description:
      "Whether you're a startup or enterprise — add users and features as you grow.",
    icon: Globe2Icon,
  },
  {
    title: "Communication",
    description:
      "Seamless communication for your team. Keep everyone connected with instant updates.",
    icon: MessageSquareIcon,
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
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-2xl text-start md:mb-12">
          <p className="mb-2 text-sm font-medium text-primary">
            Features
          </p>
          <h2
            id="features-heading"
            className="mb-3 text-[1.75rem] font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl"
          >
            Work easier today
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Unlock a world of possibilities with our exclusive features.
            Explore how our unique offerings can transform your journey and
            empower you to achieve more.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-[12px] bg-card p-5 shadow-soft sm:p-6"

              style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
              <div className="mb-4 flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-primary/10 text-primary">
                  <feature.icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="min-w-0 pt-1.5 text-base font-semibold text-foreground sm:text-lg">
                  {feature.title}
                </h3>
              </div>
              <p className="mb-4 text-base leading-relaxed text-muted-foreground sm:mb-5">
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
