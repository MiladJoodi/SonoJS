"use client"

import type * as React from "react"
import {
  AppWindowIcon,
  ChartColumnIcon,
  HeadphonesIcon,
  Maximize2Icon,
  Settings2Icon,
  ShieldCheckIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

const features = [
  {
    title: "Customization",
    subtitle: "Fits your brand needs",
    description:
      "Easily tailor every aspect of the platform to suit your business needs. From design tweaks to functional preferences.",
    icon: Settings2Icon,
    chip: "f08-chip-sky",
  },
  {
    title: "Security",
    subtitle: "Enterprise-level data security",
    description:
      "Your privacy is our top priority. We implement industry-standard encryption and real-time threat detection.",
    icon: ShieldCheckIcon,
    chip: "f08-chip-emerald",
  },
  {
    title: "User-Friendly Interface",
    subtitle: "Streamlined for productivity",
    description:
      "Navigate with ease using our intuitive interface designed for efficiency — for beginners and experts alike.",
    icon: AppWindowIcon,
    chip: "f08-chip-teal",
  },
  {
    title: "Performance",
    subtitle: "Fast and dependable",
    description:
      "Experience lightning-fast load times and seamless performance without lag or disruption.",
    icon: ChartColumnIcon,
    chip: "f08-chip-orange",
  },
  {
    title: "Scalability",
    subtitle: "Scales with your growth",
    description:
      "Whether you're a startup or enterprise, add users and capabilities without disrupting performance.",
    icon: Maximize2Icon,
    chip: "f08-chip-rose",
  },
  {
    title: "24/7 Support",
    subtitle: "Help is always within reach",
    description:
      "Our expert support team is available around the clock to keep your experience smooth.",
    icon: HeadphonesIcon,
    chip: "f08-chip-blue",
  },
] as const

export default function Features({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("w-full bg-muted px-4 py-12 md:px-8 md:py-16", className)}
      aria-labelledby="features-heading"
      {...props}
    >
      <style>{`
        .f08-chip-sky { background: #e0f2fe; color: #0369a1; }
        .dark .f08-chip-sky { background: #0c4a6e; color: #7dd3fc; }
        .f08-chip-emerald { background: #d1fae5; color: #047857; }
        .dark .f08-chip-emerald { background: #064e3b; color: #6ee7b7; }
        .f08-chip-teal { background: #ccfbf1; color: #0f766e; }
        .dark .f08-chip-teal { background: #115e59; color: #5eead4; }
        .f08-chip-orange { background: #ffedd5; color: #c2410c; }
        .dark .f08-chip-orange { background: #7c2d12; color: #fdba74; }
        .f08-chip-rose { background: #ffe4e6; color: #be123c; }
        .dark .f08-chip-rose { background: #881337; color: #fda4af; }
        .f08-chip-blue { background: #dbeafe; color: #1d4ed8; }
        .dark .f08-chip-blue { background: #1e3a8a; color: #93c5fd; }
      `}</style>

      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 max-w-2xl text-start md:mb-12">
          <p className="mb-2 text-sm font-medium text-primary">Features</p>
          <h2
            id="features-heading"
            className="mb-3 text-[1.75rem] font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl"
          >
            Discover our exclusive features
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Unlock a world of possibilities with our exclusive features. Explore
            how our unique offerings can transform your journey.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-[12px] bg-card p-5 shadow-soft sm:p-6"
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "flex size-11 shrink-0 items-center justify-center rounded-[10px]",
                    feature.chip
                  )}
                >
                  <feature.icon className="size-5" aria-hidden="true" />
                </div>
                <div className="min-w-0 pt-0.5 text-start">
                  <h3 className="text-base font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {feature.subtitle}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-start text-sm leading-relaxed text-muted-foreground sm:mt-5 md:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
