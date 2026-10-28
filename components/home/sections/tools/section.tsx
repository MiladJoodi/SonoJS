import Image from "next/image"
import Link from "next/link"

import { RainbowButton } from "@sonojs/ui/components/rainbow-button"

export function HomeToolsSection() {
  return (
    <section
      data-home-surface=""
      aria-labelledby="home-tools-heading"
      className="relative overflow-x-clip border-t border-border/60"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        style={{
          backgroundImage: `
            radial-gradient(
              ellipse 70% 50% at 82% 28%,
              color-mix(in oklab, var(--chart-2) 14%, transparent),
              transparent 68%
            ),
            radial-gradient(
              ellipse 55% 45% at 12% 72%,
              color-mix(in oklab, var(--primary) 12%, transparent),
              transparent 70%
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
            <p className="text-sm font-medium tracking-wide text-primary">
              Developer Tools
            </p>

            <h2
              id="home-tools-heading"
              className="mt-3 text-balance text-[clamp(1.75rem,5vw,2.75rem)] leading-[1.12] font-semibold tracking-[-0.035em] text-foreground"
            >
              Simplify your development workflow.
            </h2>

            <p className="mt-4 max-w-[34em] text-[clamp(0.9375rem,3.2vw,1.0625rem)] leading-[1.6] text-muted-foreground">
              Practical browser tools for everyday work — call APIs, inspect
              responses, and clear friction without leaving your tab.
            </p>

            <div className="mt-7 w-full sm:w-auto">
              <RainbowButton asChild className="w-full sm:w-auto">
                <Link href="/tools" className="w-full no-underline sm:w-auto">
                  Explore Tools
                </Link>
              </RainbowButton>
            </div>
          </div>

          <div
            className="relative mx-auto flex w-full min-w-0 max-w-[36rem] justify-center lg:max-w-none"
            style={{
              animation: "sono-fade-up 520ms var(--motion-ease) 80ms both",
            }}
          >
            <Image
              src="/images/docs/tools.png"
              alt="SonoJS developer tools preview"
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
