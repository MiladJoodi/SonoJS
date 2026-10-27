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
      "Easily tailor every aspect of the platform to suit your business needs. From design tweaks to functional preferences.",
    icon: Settings2Icon,
  },
  {
    title: "Security",
    description:
      "Your privacy is our top priority. We implement industry-standard encryption and real-time detection to keep your data safe.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Support",
    description:
      "Our expert support team is available around the clock to assist you. We’re here to ensure your experience remains smooth.",
    icon: HeadphonesIcon,
  },
  {
    title: "Performance",
    description:
      "Experience lightning-fast load times and seamless performance. Our system is built to deliver results without lag or disruption.",
    icon: ChartColumnIcon,
  },
  {
    title: "Global Reach",
    description:
      "Whether you're a startup or enterprise. Add users, features, or capabilities without disrupting performance.",
    icon: Globe2Icon,
  },
  {
    title: "Communication",
    description:
      "Keep everyone connected, share updates instantly, and boost collaboration no matter where your team is located.",
    icon: MessageSquareIcon,
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
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-8 max-w-3xl text-center md:mb-16">
          <p className="mb-3 text-sm font-medium tracking-wide text-primary">
            Features
          </p>
          <h2
            id="features-heading"
            className="mb-3 text-[1.75rem] font-bold tracking-tight text-foreground sm:mb-4 sm:text-3xl md:text-4xl"
          >
            Work easier today
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Unlock a world of possibilities with our exclusive features. Explore
            how our unique offerings can transform your journey and empower you
            to achieve more.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={cn(
                "rounded-[12px] border border-border/70 bg-card px-5 py-8 text-center shadow-soft sm:px-6 sm:py-12",
                "transition-colors hover:border-primary/25"
              )}

              style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
              <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary sm:mb-6 sm:size-14">
                <feature.icon className="size-6 sm:size-7" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-base font-semibold tracking-tight text-foreground sm:mb-3 sm:text-lg">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {feature.description}
              </p>
              <a
                href="#"
                className={cn(
                  "mt-5 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md text-sm font-medium text-primary sm:mt-6",
                  "transition-colors hover:text-primary/80",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                )}
              >
                Learn more
                <ArrowRightIcon
                  className="size-3.5 icon-dir"
                  aria-hidden="true"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
