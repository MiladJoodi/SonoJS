import Link from "next/link"

import { HeroShowcase } from "@/components/home/hero-showcase"
import { PlatformBadges } from "@/components/home/platform-badges"
import { siteConfig } from "@/lib/config"
import { RainbowButton } from "@sonojs/ui/components/rainbow-button"

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

      <div className="workspace-shell relative z-10 mx-auto flex w-full max-w-[1180px] flex-1 flex-col justify-center px-4 pt-8 pb-[max(5rem,calc(2rem+env(safe-area-inset-bottom)))] sm:px-7 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24">
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-[clamp(2.5rem,6vw,5.5rem)]">
          <section
            className="min-w-0 text-start"
            aria-labelledby="home-hero-heading"
          >
            <p
              className="mb-5 text-[clamp(1.5rem,5vw,2.25rem)] font-semibold tracking-[-0.03em] text-foreground sm:mb-8"
              style={{
                animation:
                  "sono-fade-in var(--motion-fast) var(--motion-ease) both",
              }}
            >
              {siteConfig.name}
            </p>

            <h1
              id="home-hero-heading"
              className="text-balance text-[clamp(2rem,7.5vw,3.75rem)] leading-[1.08] font-semibold tracking-[-0.04em] text-foreground"
              style={{
                animation: "sono-fade-up 520ms var(--motion-ease) 60ms both",
              }}
            >
              From components to complete interfaces.{" "}
              <span className="text-primary">With AI.</span>
            </h1>

            <p
              className="mt-4 max-w-[36em] text-[clamp(0.9375rem,3.5vw,1.125rem)] leading-[1.6] text-muted-foreground sm:mt-6"
              style={{
                animation: "sono-fade-up 520ms var(--motion-ease) 120ms both",
              }}
            >
              A modern React UI library with beautifully crafted components,
              blocks, and charts. Connect your AI agent via MCP to build with
              SonoJS and generate real UI directly in your codebase.
            </p>

            <div
              className="mt-7 flex flex-wrap items-center gap-2.5 sm:mt-9 sm:gap-3"
              style={{
                animation: "sono-fade-up 520ms var(--motion-ease) 180ms both",
              }}
            >
              <RainbowButton asChild>
                <Link href="/docs" className="no-underline">
                  Get Started
                </Link>
              </RainbowButton>
              <RainbowButton variant="white" asChild>
                <Link href="/docs/components" className="no-underline">
                  Explore Components
                </Link>
              </RainbowButton>
            </div>

            <div
              className="mt-5 sm:mt-7"
              style={{
                animation: "sono-fade-up 520ms var(--motion-ease) 240ms both",
              }}
            >
              <PlatformBadges className="justify-start [&>ul]:mx-0 [&>ul]:justify-start" />
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
      </div>
    </div>
  )
}
