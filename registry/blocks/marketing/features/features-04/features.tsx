"use client"

import type * as React from "react"
import {
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
    chip: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
  },
  {
    title: "Security",
    description:
      "Your privacy is our top priority. We implement industry-standard encryption and real-time threat detection to keep your data safe.",
    icon: ShieldCheckIcon,
    chip: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  },
  {
    title: "Support",
    description:
      "Our expert support team is available around the clock to assist you — ensuring your experience remains smooth.",
    icon: HeadphonesIcon,
    chip: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  },
  {
    title: "Performance",
    description:
      "Experience lightning-fast load times and seamless performance. Our system is built to deliver results without lag.",
    icon: ChartColumnIcon,
    chip: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  },
  {
    title: "Global Reach",
    description:
      "Whether you're a startup or enterprise — add users, features, or capabilities without disrupting performance.",
    icon: Globe2Icon,
    chip: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  },
  {
    title: "Communication",
    description:
      "Seamless communication for your team. Tailor workflows so everyone stays connected and up to date.",
    icon: MessageSquareIcon,
    chip: "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300",
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
        <div className="mx-auto mb-8 max-w-3xl text-center md:mb-16">
          <p className="mb-3 text-sm font-medium tracking-wide text-primary">
            Features
          </p>
          <h2
            id="features-heading"
            className="mb-3 text-[1.75rem] font-bold tracking-tight text-foreground sm:mb-4 sm:text-3xl md:text-4xl"
          >
            Discover our exclusive features
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Unlock a world of possibilities with our exclusive features.
            Explore how our unique offerings can transform your journey and
            empower you to achieve more.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-[12px] border border-border/70 bg-card px-5 py-8 text-center shadow-soft sm:px-6 sm:py-10"
            >
              <div
                className={cn(
                  "mx-auto mb-5 flex size-12 items-center justify-center rounded-[12px] sm:mb-6",
                  feature.chip
                )}
              >
                <feature.icon className="size-6" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-base font-semibold tracking-tight text-foreground sm:text-lg">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
