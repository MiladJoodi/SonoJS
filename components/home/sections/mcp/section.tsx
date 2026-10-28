import Image from "next/image"
import Link from "next/link"

import { HomeSectionHeading } from "@/components/home/section-heading"
import { Button } from "@sonojs/ui/components/button"

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

      <div className="workspace-shell relative z-10 mx-auto w-full max-w-[1180px] px-4 py-10 sm:px-7 sm:py-20 lg:py-24">
        <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-[clamp(2.5rem,6vw,5rem)]">
          <div
            className="min-w-0 text-start"
            style={{
              animation: "sono-fade-up 520ms var(--motion-ease) both",
            }}
          >
            <HomeSectionHeading id="home-mcp-heading">
              MCP for your AI coding agent
            </HomeSectionHeading>

            <p className="mt-4 max-w-[34em] text-[clamp(0.9375rem,3.2vw,1.0625rem)] leading-[1.6] text-muted-foreground">
              Connect AI coding agents like Cursor and Claude Code to SonoJS
              through MCP. Let your agent discover components, access
              documentation, and build interfaces directly in your codebase.
            </p>

            <div className="mt-7 w-full sm:w-auto">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/docs/mcp">Explore MCP</Link>
              </Button>
            </div>
          </div>

          <div
            className="relative mx-auto flex w-full min-w-0 max-w-[36rem] justify-center lg:max-w-none"
            style={{
              animation: "sono-fade-up 520ms var(--motion-ease) 80ms both",
            }}
          >
            <Image
              src="/images/docs/mcp.png"
              alt="SonoJS MCP for AI coding agents"
              width={1672}
              height={940}
              className="mx-auto h-auto max-h-[14rem] w-auto object-contain sm:max-h-none sm:w-full"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px"
              quality={100}
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  )
}
