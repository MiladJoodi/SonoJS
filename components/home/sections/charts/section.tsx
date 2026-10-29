import Link from "next/link"

import { HomeSectionHeading } from "@/components/home/section-heading"
import { HomeChartStage } from "./chart-stage"
import { getChartsNavStats } from "@/lib/charts-nav"
import { Button } from "@sonojs/ui/components/button"

const FEATURES = [
  "Full RTL support",
  "Dark mode and responsive layouts",
  "Interactive chart demos",
  "Copy, customize, or install with the SonoJS CLI",
] as const

export function HomeChartsSection() {
  const { ported } = getChartsNavStats()

  return (
    <section
      data-home-surface=""
      aria-labelledby="home-charts-heading"
      className="relative overflow-x-clip border-t border-border/60"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        style={{
          backgroundImage: `
            radial-gradient(
              ellipse 70% 50% at 80% 30%,
              color-mix(in oklab, var(--chart-2) 16%, transparent),
              transparent 68%
            ),
            radial-gradient(
              ellipse 55% 45% at 12% 70%,
              color-mix(in oklab, var(--primary) 12%, transparent),
              transparent 70%
            )
          `,
        }}
      />

      <div className="workspace-shell relative z-10 mx-auto w-full max-w-[1180px] px-4 py-10 sm:px-7 sm:py-20 lg:py-24">
        <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-[clamp(2.5rem,6vw,5rem)]">
          <div className="contents lg:flex lg:flex-col lg:justify-center">
            <HomeSectionHeading
              id="home-charts-heading"
              className="order-1 text-start"
              style={{
                animation: "sono-fade-up 520ms var(--motion-ease) both",
              }}
            >
              Charts ready for production
            </HomeSectionHeading>

            <div
              className="order-3 min-w-0 text-start lg:mt-4"
              style={{
                animation: "sono-fade-up 520ms var(--motion-ease) 120ms both",
              }}
            >
              <p className="max-w-[34em] text-[clamp(0.9375rem,3.2vw,1.0625rem)] leading-[1.6] text-muted-foreground">
                A collection of customizable, interactive charts for React,
                built for modern dashboards and data-driven applications. Fully
                RTL-ready, with dark mode and responsive layouts. Easy to
                customize and install with the SonoJS CLI.
              </p>

              <ul className="mt-6 flex flex-col gap-2.5">
                {FEATURES.map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-2.5 text-sm text-foreground/90"
                  >
                    <span
                      aria-hidden
                      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary"
                    />
                    {line}
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-sm font-medium tabular-nums tracking-tight text-foreground">
                <span className="text-[1.25rem] font-semibold text-primary">
                  {ported}+
                </span>{" "}
                charts. Ready to build with.
              </p>

              <div className="mt-7 w-full sm:w-auto">
                <Button asChild className="w-full sm:w-auto">
                  <Link href="/charts">Explore Charts</Link>
                </Button>
              </div>
            </div>
          </div>

          <div
            className="order-2 min-w-0 w-full"
            style={{
              animation: "sono-fade-up 520ms var(--motion-ease) 80ms both",
            }}
          >
            <HomeChartStage />
          </div>
        </div>
      </div>
    </section>
  )
}
