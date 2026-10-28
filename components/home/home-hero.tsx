import { BrandMark } from "@/components/home/brand-mark"
import { CommandBar } from "@/components/home/command-bar"
import { PlatformBadges } from "@/components/home/platform-badges"
import { siteConfig } from "@/lib/config"

export function HomeHero() {
  return (
    <div
      data-home-surface=""
      className="relative -mt-(--header-height) flex flex-1 flex-col overflow-hidden pt-(--header-height)"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(
              ellipse 85% 55% at 50% 28%,
              color-mix(in oklab, var(--primary) 28%, transparent),
              transparent 72%
            ),
            radial-gradient(
              ellipse 55% 45% at 12% 92%,
              color-mix(in oklab, var(--chart-2) 16%, transparent),
              transparent 70%
            ),
            radial-gradient(
              ellipse 50% 40% at 88% 88%,
              color-mix(in oklab, var(--primary) 12%, transparent),
              transparent 70%
            )
          `,
        }}
      />

      <section
        className="workspace-shell relative z-10 mx-auto flex w-full max-w-[880px] flex-1 flex-col items-center justify-center px-6 py-[72px] text-center"
        aria-labelledby="home-hero-heading"
      >
        <p
          className="mb-8 inline-flex items-center gap-2 text-[clamp(1.625rem,3.6vw,2.125rem)] font-semibold tracking-[-0.03em] text-foreground sm:mb-11"
          style={{
            animation: "sono-fade-in var(--motion-fast) var(--motion-ease) both",
          }}
        >
          <BrandMark />
          {siteConfig.name}
        </p>

        <h1
          id="home-hero-heading"
          className="text-balance text-[clamp(2.875rem,9.5vw,6.5rem)] leading-none font-semibold tracking-[-0.045em] text-foreground"
          style={{
            animation: "sono-fade-up 520ms var(--motion-ease) 60ms both",
          }}
        >
          <span className="block">Tell your agent.</span>
          <span className="block">Get the UI.</span>
        </h1>

        <p
          className="mt-6 max-w-[34em] text-balance text-[clamp(1rem,1.9vw,1.1875rem)] leading-[1.55] text-muted-foreground sm:mt-8"
          style={{
            animation: "sono-fade-up 520ms var(--motion-ease) 120ms both",
          }}
        >
          Connect via MCP. Describe what you need. Your AI agent builds with
          real SonoJS components directly in your codebase.
        </p>

        <div
          className="mt-9 flex w-full justify-center sm:mt-12"
          style={{
            animation: "sono-fade-up 520ms var(--motion-ease) 180ms both",
          }}
        >
          <CommandBar />
        </div>

        <div
          aria-hidden
          className="my-0 h-7 w-px bg-border"
          style={{
            animation: "sono-fade-in var(--motion-fast) var(--motion-ease) 240ms both",
          }}
        />

        <p
          className="inline-flex max-w-full items-center gap-3 rounded-xl border border-border/70 bg-card/60 px-5 py-3.5 text-start text-[clamp(0.9375rem,2vw,1.0625rem)] text-muted-foreground shadow-soft"
          style={{
            animation: "sono-fade-up 520ms var(--motion-ease) 280ms both",
          }}
        >
          <span
            aria-hidden
            className="h-[1.2em] w-0.5 shrink-0 rounded-full bg-primary"
          />
          Build a beautiful login form with SonoJS
        </p>

        <div
          className="mt-12 w-full sm:mt-14"
          style={{
            animation: "sono-fade-up 520ms var(--motion-ease) 360ms both",
          }}
        >
          <PlatformBadges />
        </div>
      </section>
    </div>
  )
}
