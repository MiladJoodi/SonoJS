import Link from "next/link"

import { HeroShowcase } from "@/components/home/hero-showcase"
import { HomeShell } from "@/components/home/home-shell"
import { PlatformBadges } from "@/components/home/platform-badges"
import { siteConfig } from "@/lib/config"
import { Button } from "@sonojs/ui/components/button"

export function HomeHero() {
  return (
    <div
      data-home-surface=""
      className="relative -mt-(--header-height) flex flex-1 flex-col overflow-x-clip pt-(--header-height)"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        style={{
          backgroundImage: `
            radial-gradient(
              ellipse 85% 55% at 50% 22%,
              color-mix(in oklab, var(--primary) 24%, transparent),
              transparent 72%
            ),
            radial-gradient(
              ellipse 50% 40% at 90% 80%,
              color-mix(in oklab, var(--chart-2) 12%, transparent),
              transparent 70%
            )
          `,
        }}
      />

      <HomeShell className="flex flex-1 flex-col justify-center pt-6 pb-[max(3rem,calc(1.5rem+env(safe-area-inset-bottom)))] sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24">
        <div className="grid items-start gap-7 sm:gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-[clamp(2.5rem,6vw,5.5rem)]">
          <section
            className="min-w-0 text-start"
            aria-labelledby="home-hero-heading"
          >
            <p
              className="mb-3.5 sm:mb-8"
              style={{
                animation:
                  "sono-fade-in var(--motion-fast) var(--motion-ease) both",
              }}
            >
              <span
                className="inline-block bg-primary px-[0.55em] py-[0.18em] text-[clamp(1.5rem,5vw,2.25rem)] font-semibold tracking-[-0.03em] text-primary-foreground"
                style={{
                  borderRadius: "91% 9% 90% 10% / 29% 82% 18% 71%",
                }}
              >
                {siteConfig.name}
              </span>
            </p>

            <h1
              id="home-hero-heading"
              className="text-balance text-[clamp(2rem,7.5vw,3.75rem)] leading-[1.08] font-semibold tracking-[-0.04em] text-foreground"
              style={{
                animation: "sono-fade-up 520ms var(--motion-ease) 60ms both",
              }}
            >
              React components, blocks, and tools for your projects.
            </h1>

            <p
              className="mt-3.5 max-w-[36em] text-[clamp(0.9375rem,3.5vw,1.125rem)] leading-[1.6] text-muted-foreground sm:mt-6"
              style={{
                animation: "sono-fade-up 520ms var(--motion-ease) 120ms both",
              }}
            >
              A customizable React UI library with ready-to-use components,
              interface blocks, charts, and icons. Use the SonoJS CLI to add
              components to your project, or connect an AI coding agent through
              MCP.
            </p>

            <div
              className="mt-6 flex flex-row flex-wrap items-center justify-center gap-2.5 sm:mt-9 sm:justify-start sm:gap-3"
              style={{
                animation: "sono-fade-up 520ms var(--motion-ease) 180ms both",
              }}
            >
              <Button asChild className="shrink-0">
                <Link href="/docs">Get Started</Link>
              </Button>
              <Button variant="outline" asChild className="shrink-0">
                <Link href="/docs/components">Explore Components</Link>
              </Button>
            </div>

            <div
              className="mt-5 sm:mt-7"
              style={{
                animation: "sono-fade-up 520ms var(--motion-ease) 240ms both",
              }}
            >
              <PlatformBadges className="[&>div>ul]:mx-auto sm:[&>div>ul]:mx-0" />
            </div>
          </section>

          <div
            className="min-w-0"
            style={{
              animation: "sono-fade-up 520ms var(--motion-ease) 200ms both",
            }}
          >
            <HeroShowcase />
          </div>
        </div>
      </HomeShell>
    </div>
  )
}
