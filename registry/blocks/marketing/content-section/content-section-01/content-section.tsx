import type * as React from "react"

import { cn } from "@/lib/utils"

import kpisDashboard from "./images/kpis-dashboard.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const DEFAULT_METRICS = [
  { label: "Live KPIs", value: "48+" },
  { label: "Refresh", value: "Realtime" },
  { label: "Teams", value: "Unlimited" },
] as const

export default function ContentSection({
  eyebrow = "Analytics platform",
  title = "Discover the Future of Innovation",
  paragraphs = [
    "Unlock the power of data-driven decision making with our intelligent dashboard tools. Track performance metrics, visualize trends, and gain meaningful insights—all in one place.",
    "Seamlessly analyze key performance indicators across departments. From revenue growth to engagement stats, customize the view to focus on what matters most.",
    "Our interface is designed for speed and clarity. No steep learning curves—just tools that turn data into action.",
  ],
  metrics = DEFAULT_METRICS,
  imageSrc = assetSrc(kpisDashboard),
  imageAlt = "KPIs dashboard",
  className,
  ...props
}: React.ComponentProps<"section"> & {
  eyebrow?: string
  title?: string
  paragraphs?: string[]
  metrics?: readonly { label: string; value: string }[]
  imageSrc?: string
  imageAlt?: string
}) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-canvas px-4 py-12 sm:py-16 md:px-8 md:py-24",
        className
      )}
      style={{
        backgroundColor: "var(--canvas)",
        backgroundImage:
          "radial-gradient(ellipse 45% 50% at 100% 20%, color-mix(in oklab, var(--primary) 12%, transparent), transparent 70%)",
      }}
      aria-labelledby="content-section-heading"
      {...props}
    >
      <div className="relative mx-auto grid max-w-7xl items-center gap-8 sm:gap-12 md:grid-cols-12 md:gap-12 lg:gap-16">
        <div className="min-w-0 text-start md:col-span-5">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-primary uppercase sm:mb-4">
            {eyebrow}
          </p>
          <h2
            id="content-section-heading"
            className="mb-6 text-3xl font-bold tracking-tight text-balance text-foreground sm:mb-8 sm:text-4xl md:text-5xl"
          >
            {title}
          </h2>

          <div className="space-y-4 border-s-2 border-primary/40 ps-4 sm:space-y-5 sm:ps-5">
            {paragraphs.map((paragraph, index) => (
              <p
                key={paragraph.slice(0, 40)}
                className={cn(
                  "leading-relaxed",
                  index === 0
                    ? "text-base text-foreground sm:text-lg"
                    : "text-sm text-muted-foreground sm:text-base"
                )}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-3 gap-2 sm:mt-10 sm:flex sm:flex-wrap sm:gap-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="min-w-0 rounded-[12px] border border-border/70 bg-card px-2.5 py-2.5 shadow-soft sm:min-w-[7.5rem] sm:px-4 sm:py-3"
                style={{
                  backgroundColor: "var(--card)",
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                <p className="text-sm font-semibold tracking-tight text-foreground sm:text-lg">
                  {metric.value}
                </p>
                <p className="text-[10px] text-muted-foreground sm:text-xs">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative order-first min-w-0 md:order-none md:col-span-7">
          <div
            aria-hidden="true"
            className="absolute -inset-2 rounded-[20px] bg-gradient-to-br from-primary/20 via-transparent to-primary/5 sm:-inset-3"
          />
          <div
            className="relative overflow-hidden rounded-[16px] border border-border/70 bg-card p-2 shadow-soft sm:p-3 md:p-5"
            style={{
              backgroundColor: "var(--card)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div
              className="relative w-full overflow-hidden rounded-[12px] bg-muted"
              style={{ aspectRatio: "20 / 11" }}
            >
              <img
                src={imageSrc}
                alt={imageAlt}
                className="absolute inset-0 size-full object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
