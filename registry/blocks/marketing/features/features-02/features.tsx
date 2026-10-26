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
  },
  {
    title: "Security",
    description:
      "Your privacy is our top priority. We implement industry-standard encryption and real-time threat detection to keep your data safe.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Support",
    description:
      "Our expert support team is available around the clock to assist you — ensuring your experience remains smooth.",
    icon: HeadphonesIcon,
  },
  {
    title: "Performance",
    description:
      "Experience lightning-fast load times and seamless performance. Our system is built to deliver results without lag.",
    icon: ChartColumnIcon,
  },
  {
    title: "Global Reach",
    description:
      "Whether you're a startup or enterprise — add users, features, or capabilities without disrupting performance.",
    icon: Globe2Icon,
  },
  {
    title: "Communication",
    description:
      "Seamless communication for your team. Tailor workflows so everyone stays connected and up to date.",
    icon: MessageSquareIcon,
  },
] as const

export default function Features({
  className,
  style,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "features-02-band w-full px-4 py-12 md:px-8 md:py-16",
        className
      )}
      style={style}
      aria-labelledby="features-heading"
      {...props}
    >
      <style>{`
        .features-02-band {
          background-image: linear-gradient(
            145deg,
            #1e3a8a 0%,
            #1d4ed8 42%,
            #0284c7 100%
          );
          color: #ffffff;
        }
        .dark .features-02-band {
          background-image: linear-gradient(
            145deg,
            #020617 0%,
            #0f172a 38%,
            #1e3a8a 100%
          );
        }
        .features-02-card {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          transition: background-color 200ms ease, border-color 200ms ease,
            box-shadow 200ms ease, transform 200ms ease;
        }
        .dark .features-02-card {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
        }
        @media (hover: hover) and (pointer: fine) {
          .features-02-card:hover {
            background: rgba(255, 255, 255, 0.18);
            border-color: rgba(255, 255, 255, 0.28);
            box-shadow: 0 12px 32px rgba(15, 23, 42, 0.22);
            transform: translateY(-2px);
          }
          .dark .features-02-card:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.2);
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
          }
        }
        .features-02-card .f02-icon,
        .features-02-card .f02-title {
          color: #ffffff;
        }
        .features-02-card .f02-desc {
          color: rgba(255, 255, 255, 0.72);
        }
      `}</style>

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-8 max-w-2xl text-center md:mb-12">
          <p className="mb-2 text-sm font-medium opacity-70">Features</p>
          <h2
            id="features-heading"
            className="mb-3 text-[1.75rem] font-bold tracking-tight sm:text-3xl md:text-4xl"
          >
            Discover our exclusive features
          </h2>
          <p className="text-base leading-relaxed opacity-75">
            Unlock a world of possibilities with our exclusive features.
            Explore how our unique offerings can transform your journey and
            empower you to achieve more.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="features-02-card rounded-[12px] p-5 text-center sm:p-6 md:p-7"
            >
              <feature.icon
                className="f02-icon mx-auto mb-4 size-7 sm:mb-5"
                aria-hidden="true"
              />
              <h3 className="f02-title mb-2 text-base font-semibold sm:text-lg">
                {feature.title}
              </h3>
              <p className="f02-desc text-sm leading-relaxed sm:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
