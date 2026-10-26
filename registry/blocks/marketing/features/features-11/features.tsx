"use client"

import type * as React from "react"
import {
  ChartColumnIcon,
  HeadphonesIcon,
  Settings2Icon,
  ShieldCheckIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

import panelImage from "./images/panel.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const features = [
  {
    title: "Customization",
    description:
      "Easily tailor every aspect of the platform to suit your business needs.",
    icon: Settings2Icon,
  },
  {
    title: "Security",
    description:
      "Your privacy is our top priority and we implement industry-standard protocols.",
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
    description:
      "Experience lightning-fast load times and seamless performance.",
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
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <div className="text-start">
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

            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:gap-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-[12px] bg-card p-4 text-start shadow-soft sm:p-5 md:p-6"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-primary text-primary-foreground">
                      <feature.icon className="size-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="mb-1 text-base font-semibold text-foreground md:text-lg">
                        {feature.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-0 max-lg:-order-1">
            <div className="aspect-[16/10] w-full overflow-hidden rounded-[12px] bg-muted shadow-soft sm:aspect-[4/3]">
              <img
                src={assetSrc(panelImage)}
                alt="Illustration showing platform features"
                className="size-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
