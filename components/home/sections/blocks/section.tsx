import Link from "next/link"

import { HomeSectionHeading } from "@/components/home/section-heading"
import { HomeChatComposer } from "./chat-composer"
import { getBlocksStats } from "@/lib/blocks-nav"
import { Button } from "@sonojs/ui/components/button"

const FEATURES = [
  "Model picker and send controls",
  "Interactive composers for AI agents",
  "RTL-ready and theme-aware",
  "Copy or install with the SonoJS CLI",
] as const

export function HomeBlocksSection() {
  const { ready } = getBlocksStats()

  return (
    <section
      data-home-surface=""
      aria-labelledby="home-blocks-heading"
      className="relative overflow-x-clip border-t border-border/60"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        style={{
          backgroundImage: `
            radial-gradient(
              ellipse 70% 50% at 82% 28%,
              color-mix(in oklab, var(--primary) 12%, transparent),
              transparent 68%
            ),
            radial-gradient(
              ellipse 55% 45% at 10% 72%,
              color-mix(in oklab, var(--chart-2) 14%, transparent),
              transparent 70%
            )
          `,
        }}
      />

      <div className="workspace-shell relative z-10 mx-auto w-full max-w-[1180px] px-4 py-10 sm:px-7 sm:py-20 lg:py-24">
        {/* Mobile: title → preview → copy. Desktop: copy column | preview. */}
        <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-[clamp(2.5rem,6vw,5rem)]">
          <div className="contents lg:flex lg:flex-col lg:justify-center">
            <HomeSectionHeading
              id="home-blocks-heading"
              className="order-1 text-start"
              style={{
                animation: "sono-fade-up 520ms var(--motion-ease) both",
              }}
            >
              Blocks for complete AI interfaces
            </HomeSectionHeading>

            <div
              className="order-3 min-w-0 text-start lg:mt-4"
              style={{
                animation: "sono-fade-up 520ms var(--motion-ease) 120ms both",
              }}
            >
              <p className="max-w-[34em] text-[clamp(0.9375rem,3.2vw,1.0625rem)] leading-[1.6] text-muted-foreground">
                Production-ready blocks for agent workspaces, chat composers,
                and full product flows — so you can ship real interfaces without
                starting from a blank canvas.
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
                  {ready}+
                </span>{" "}
                blocks. Ready to build with.
              </p>

              <div className="mt-7 w-full sm:w-auto">
                <Button asChild className="w-full sm:w-auto">
                  <Link href="/blocks">Explore Blocks</Link>
                </Button>
              </div>
            </div>
          </div>

          <div
            className="relative order-2 mx-auto w-full min-w-0 max-w-[36rem] overflow-visible lg:mx-0 lg:max-w-none"
            style={{
              animation: "sono-fade-up 520ms var(--motion-ease) 80ms both",
            }}
          >
            {/* overflow-visible + bottom pad so shadow-soft on input/bubbles isn’t clipped */}
            <div className="flex h-[22rem] w-full overflow-visible pb-5 sm:h-[25rem] sm:pb-6 lg:h-[27rem]">
              <HomeChatComposer />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
