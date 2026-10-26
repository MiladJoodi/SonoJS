"use client"

import type * as React from "react"
import {
  LightbulbIcon,
  ShieldCheckIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

import socialImage from "./images/social.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const features = [
  {
    title: "Trustworthy",
    description: "100% transparency",
    icon: ShieldCheckIcon,
  },
  {
    title: "Fast Results",
    description: "Quick implementation",
    icon: ZapIcon,
  },
  {
    title: "Expert Team",
    description: "Industry specialists",
    icon: UsersIcon,
  },
  {
    title: "Innovative",
    description: "Cutting-edge solutions",
    icon: LightbulbIcon,
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
        <div
          className="overflow-hidden rounded-[16px] shadow-soft"
          style={{ backgroundColor: "#0f172a" }}
        >
          <div className="grid lg:grid-cols-2">
            <div
              className="relative min-h-[11rem] sm:min-h-[14rem] lg:order-last lg:min-h-full"
            >
              <img
                src={assetSrc(socialImage)}
                alt="Team collaborating on a social media growth strategy"
                className="absolute inset-0 size-full object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
              />
            </div>

            <div
              className="flex flex-col justify-center p-6 text-start sm:p-8 md:p-10 lg:p-12"
              style={{ backgroundColor: "#0f172a" }}
            >
              <p
                className="mb-2 text-sm font-medium sm:mb-3"
                style={{ color: "#93c5fd" }}
              >
                Growth
              </p>
              <h2
                id="features-heading"
                className="mb-3 text-[1.75rem] font-bold tracking-tight text-white sm:mb-4 sm:text-3xl md:text-4xl"
              >
                Grow your business with social media
              </h2>
              <p
                className="mb-6 max-w-md text-base leading-relaxed sm:mb-8"
                style={{ color: "#cbd5e1" }}
              >
                We connect you with top influencers to boost your content,
                expand your reach, and drive engagement.
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="rounded-[12px] p-3.5 sm:p-4"
                    style={{ backgroundColor: "#1e293b" }}
                  >
                    <div className="flex items-start gap-3 sm:block">
                      <feature.icon
                        className="mt-0.5 size-5 shrink-0 sm:mb-3 sm:mt-0"
                        style={{ color: "#93c5fd" }}
                        aria-hidden="true"
                      />
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-white">
                          {feature.title}
                        </h3>
                        <p
                          className="mt-0.5 text-xs sm:mt-1"
                          style={{ color: "#94a3b8" }}
                        >
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
