"use client"

import type * as React from "react"
import {
  ArrowRightIcon,
  HomeIcon,
  LightbulbIcon,
  MailIcon,
  NewspaperIcon,
  SparklesIcon,
  TrendingUpIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

const features = [
  {
    title: "Fresh Insights",
    description:
      "Stay ahead with actionable insights that help you understand trends and make smarter decisions every day.",
    icon: HomeIcon,
    chip: "bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-300",
  },
  {
    title: "Trending Now",
    description:
      "See what’s capturing attention right now so your team can respond with timely, relevant work.",
    icon: NewspaperIcon,
    chip: "bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-300",
  },
  {
    title: "Daily Highlights",
    description:
      "A clear digest of the most important updates — without the noise of a crowded inbox.",
    icon: MailIcon,
    chip: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300",
  },
  {
    title: "Growth Signals",
    description:
      "Spot emerging opportunities early with signals tailored to your product and audience.",
    icon: TrendingUpIcon,
    chip: "bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-300",
  },
  {
    title: "Smart Digests",
    description:
      "Summaries that surface what matters, so you spend less time sorting and more time shipping.",
    icon: SparklesIcon,
    chip: "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-300",
  },
  {
    title: "Idea Lab",
    description:
      "Capture and refine ideas with your team — then turn the best ones into concrete next steps.",
    icon: LightbulbIcon,
    chip: "bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-300",
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
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 max-w-3xl text-start md:mb-16">
          <p className="mb-3 text-sm font-medium tracking-wide text-primary">
            Features
          </p>
          <h2
            id="features-heading"
            className="mb-3 text-[1.75rem] font-bold tracking-tight text-foreground sm:mb-4 sm:text-3xl md:text-4xl"
          >
            Explore our features
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Discover how it can transform the way you work with these focused
            tools and workflows.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col rounded-[12px] bg-card p-5 shadow-soft sm:p-6"
            >
              <div className="mb-4 flex items-start gap-3">
                <div
                  className={cn(
                    "flex size-11 shrink-0 items-center justify-center rounded-[10px]",
                    feature.chip
                  )}
                >
                  <feature.icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="min-w-0 pt-2 text-base font-semibold tracking-tight text-foreground sm:text-lg">
                  {feature.title}
                </h3>
              </div>
              <p className="mb-5 flex-1 text-base leading-relaxed text-muted-foreground sm:mb-6">
                {feature.description}
              </p>
              <a
                href="#"
                className={cn(
                  "flex h-[46px] w-full cursor-pointer items-center justify-between gap-2 rounded-full",
                  "border border-border/70 bg-background ps-4 pe-1 text-sm font-medium text-foreground",
                  "transition-colors hover:bg-muted",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                )}
              >
                Explore
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <ArrowRightIcon
                    className="size-4 icon-dir"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
