import { HomeShell } from "@/components/home/home-shell"
import { HomeSectionExploreLink } from "@/components/home/section-explore-link"
import { HomeSectionHeading } from "@/components/home/section-heading"
import { HomeParallaxImageLazy } from "@/components/home/sections/parallax-image-lazy"

export function HomeMcpSection() {
  return (
    <section
      data-home-surface=""
      aria-labelledby="home-mcp-heading"
      className="relative overflow-x-clip border-t border-border/60"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        style={{
          backgroundImage: `
            radial-gradient(
              ellipse 65% 48% at 18% 35%,
              color-mix(in oklab, var(--primary) 14%, transparent),
              transparent 70%
            ),
            radial-gradient(
              ellipse 60% 50% at 88% 65%,
              color-mix(in oklab, var(--chart-2) 12%, transparent),
              transparent 68%
            )
          `,
        }}
      />

      <HomeShell className="py-10 sm:py-20 lg:py-24">
        <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-[clamp(2.5rem,6vw,5rem)]">
          <div className="contents lg:flex lg:flex-col lg:justify-center">
            <HomeSectionHeading
              id="home-mcp-heading"
              className="order-1 text-start"
              style={{
                animation: "sono-fade-up 520ms var(--motion-ease) both",
              }}
            >
              MCP for your AI coding agent
            </HomeSectionHeading>

            <div
              className="order-3 min-w-0 text-start lg:mt-4"
              style={{
                animation: "sono-fade-up 520ms var(--motion-ease) 120ms both",
              }}
            >
              <p className="max-w-[34em] text-[clamp(0.9375rem,3.2vw,1.0625rem)] leading-[1.6] text-muted-foreground">
                Connect AI coding agents like Cursor and Claude Code to SonoJS
                through MCP. Let your agent discover components, access
                documentation, and build interfaces directly in your codebase.
              </p>

              <p className="mt-6 text-sm font-medium tracking-tight text-foreground">
                <HomeSectionExploreLink href="/docs/mcp">
                  Explore
                </HomeSectionExploreLink>
              </p>
            </div>
          </div>

          <div
            className="relative order-2 mx-auto flex w-full min-w-0 max-w-[36rem] justify-center lg:mx-0 lg:max-w-none"
            style={{
              animation: "sono-fade-up 520ms var(--motion-ease) 80ms both",
            }}
          >
            <HomeParallaxImageLazy
              src="/images/docs/mcp.png"
              alt="SonoJS MCP for AI coding agents"
              width={1672}
              height={940}
              className="mx-auto h-auto max-h-[14rem] w-auto object-contain sm:max-h-none sm:w-full"
            />
          </div>
        </div>
      </HomeShell>
    </section>
  )
}
