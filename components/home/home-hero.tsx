import { CommandBar } from "@/components/home/command-bar"
import { HeroShowcase } from "@/components/home/hero-showcase"
import { PlatformBadges } from "@/components/home/platform-badges"
import { siteConfig } from "@/lib/config"

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
              className="mb-5 text-[clamp(1.5rem,5vw,2.25rem)] font-semibold tracking-[-0.03em] text-foreground sm:mb-9"
              style={{
                animation:
                  "sono-fade-in var(--motion-fast) var(--motion-ease) both",
              }}
            >
              {siteConfig.name}
            </p>

            <h1
              id="home-hero-heading"
              className="text-balance text-[clamp(2.125rem,9vw,5rem)] leading-[1.05] font-semibold tracking-[-0.045em] text-foreground sm:leading-[1.02]"
              style={{
                animation: "sono-fade-up 520ms var(--motion-ease) 60ms both",
              }}
            >
              <span className="block">Tell your agent.</span>
              <span className="block">Get the UI.</span>
            </h1>

            <p
              className="mt-4 max-w-[32em] text-[clamp(0.9375rem,3.5vw,1.1875rem)] leading-[1.55] text-muted-foreground sm:mt-6"
              style={{
                animation: "sono-fade-up 520ms var(--motion-ease) 120ms both",
              }}
            >
              Connect via MCP. Describe what you need. Your AI agent builds with
              real SonoJS components directly in your codebase.
            </p>

            <div
              className="mt-7 sm:mt-10"
              style={{
                animation: "sono-fade-up 520ms var(--motion-ease) 180ms both",
              }}
            >
              <CommandBar className="max-w-none" />
            </div>

            <div
              className="mt-5 sm:mt-6"
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
