import Link from "next/link"

import { CommandBar } from "@/components/home/command-bar"
import { PlatformBadges } from "@/components/home/platform-badges"
import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@sonojs/ui/components/button"

export function HomeHero() {
  return (
    <div
      data-home-surface=""
      className="relative -mt-(--header-height) flex flex-1 flex-col overflow-hidden pt-(--header-height)"
    >
      {/* Soft ambient wash like uupm — no hard circles; token colors only */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(
              ellipse 85% 55% at 50% 28%,
              color-mix(in oklab, var(--primary) 32%, transparent),
              transparent 72%
            ),
            radial-gradient(
              ellipse 55% 45% at 12% 92%,
              color-mix(in oklab, var(--chart-2) 18%, transparent),
              transparent 70%
            ),
            radial-gradient(
              ellipse 50% 40% at 88% 88%,
              color-mix(in oklab, var(--primary) 14%, transparent),
              transparent 70%
            )
          `,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.35] dark:opacity-[0.28]"
        style={{
          backgroundImage: `
            linear-gradient(color-mix(in oklab, var(--foreground) 3%, transparent) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in oklab, var(--foreground) 3%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px, 48px 48px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 75%)",
        }}
      />

      <section
        className="workspace-shell relative z-10 flex min-h-[calc(100svh-var(--header-height)-5rem)] flex-1 flex-col items-center justify-center py-16 text-center"
        aria-labelledby="home-hero-heading"
      >
        <p
          className="mb-5 text-[0.8125rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase"
          style={{
            animation: "sono-fade-in var(--motion-fast) var(--motion-ease) both",
          }}
        >
          <span className="text-primary">{siteConfig.name}</span>
          <span aria-hidden className="mx-1.5 font-normal text-border">
            ·
          </span>
          Agent-ready React UI
        </p>

        <h1
          id="home-hero-heading"
          className="max-w-3xl text-balance text-4xl font-extrabold tracking-[-0.04em] text-foreground sm:text-5xl md:text-6xl"
          style={{
            animation: "sono-fade-up 520ms var(--motion-ease) 60ms both",
          }}
        >
          Tell your agent.{" "}
          <span className="bg-linear-to-br from-primary to-primary/70 bg-clip-text text-transparent">
            Get the UI.
          </span>
        </h1>

        <p
          className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          style={{
            animation: "sono-fade-up 520ms var(--motion-ease) 120ms both",
          }}
        >
          Connect via MCP. Describe what you need. Your agent builds with real
          SonoJS components, right in your codebase.
        </p>

        <div
          className="mt-9 flex w-full justify-center"
          style={{
            animation: "sono-fade-up 520ms var(--motion-ease) 180ms both",
          }}
        >
          <CommandBar />
        </div>

        <p
          className="mt-4 max-w-xl text-sm text-muted-foreground"
          style={{
            animation: "sono-fade-up 520ms var(--motion-ease) 220ms both",
          }}
        >
          <span className="font-medium text-foreground/80">Try:</span>{" "}
          <span className="font-mono text-[13px]">
            Build a beautiful login form with SonoJS
          </span>
        </p>

        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
          style={{
            animation: "sono-fade-up 520ms var(--motion-ease) 280ms both",
          }}
        >
          <Link
            href="/docs"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "cursor-pointer"
            )}
          >
            Get Started
          </Link>
          <Link
            href="/docs/components"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "cursor-pointer"
            )}
          >
            Explore Components
          </Link>
        </div>

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
