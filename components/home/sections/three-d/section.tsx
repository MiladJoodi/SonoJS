import Link from "next/link"

import { HomeShell } from "@/components/home/home-shell"
import { HomeSectionHeading } from "@/components/home/section-heading"
import { HomeOrbitStage } from "@/components/home/sections/three-d/orbit-stage"
import { get3dPages } from "@/lib/3d-nav"
import { Button } from "@sonojs/ui/components/button"

const FEATURES = [
  "CSS orbits, WebGL stages, and model viewers",
  "Installable with the SonoJS CLI",
  "RTL-aware and theme-ready",
  "Lightweight pieces you can drop into any page",
] as const

export function HomeThreeDSection() {
  const count = get3dPages().length

  return (
    <section
      data-home-surface=""
      aria-labelledby="home-3d-heading"
      className="relative overflow-x-clip border-t border-border/60"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        style={{
          backgroundImage: `
            radial-gradient(
              ellipse 68% 52% at 78% 32%,
              color-mix(in oklab, var(--primary) 16%, transparent),
              transparent 68%
            ),
            radial-gradient(
              ellipse 58% 48% at 14% 70%,
              color-mix(in oklab, var(--chart-2) 13%, transparent),
              transparent 70%
            )
          `,
        }}
      />

      <HomeShell className="py-10 sm:py-20 lg:py-24">
        <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-[clamp(2.5rem,6vw,5rem)]">
          <div className="contents lg:flex lg:flex-col lg:justify-center">
            <HomeSectionHeading
              id="home-3d-heading"
              className="order-1 text-start"
              style={{
                animation: "sono-fade-up 520ms var(--motion-ease) both",
              }}
            >
              3D that feels alive
            </HomeSectionHeading>

            <div
              className="order-3 min-w-0 text-start lg:mt-4"
              style={{
                animation: "sono-fade-up 520ms var(--motion-ease) 120ms both",
              }}
            >
              <p className="max-w-[34em] text-[clamp(0.9375rem,3.2vw,1.0625rem)] leading-[1.6] text-muted-foreground">
                Installable 3D components for product pages, galleries, and
                brand moments - from light CSS orbits to full WebGL stages.
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
                  {count}+
                </span>{" "}
                3D pieces. Ready to install.
              </p>

              <div className="mt-7 w-full sm:w-auto">
                <Button asChild className="w-full sm:w-auto">
                  <Link href="/3d">Explore 3D</Link>
                </Button>
              </div>
            </div>
          </div>

          <div
            className="relative order-2 mx-auto w-full min-w-0 max-w-[28rem] lg:mx-0 lg:max-w-none"
            style={{
              animation: "sono-fade-up 520ms var(--motion-ease) 80ms both",
            }}
          >
            <HomeOrbitStage />
          </div>
        </div>
      </HomeShell>
    </section>
  )
}
