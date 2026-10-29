import Link from "next/link"

import { HomeSectionHeading } from "@/components/home/section-heading"
import { IconsScatter } from "@/components/home/sections/icons/icons-scatter"
import { siteConfig } from "@/lib/config"
import { Button } from "@sonojs/ui/components/button"

const FEATURES = [
  "Developer and technology icons",
  "Crypto and blockchain icons",
  "UI and general-purpose icons",
  "Easy to find and use",
] as const

const ICONS_HREF =
  siteConfig.navItems.find((item) => item.label === "Icons")?.href ??
  "https://icons.sonojs.com"

export function HomeIconsSection() {
  return (
    <section
      data-home-surface=""
      aria-labelledby="home-icons-heading"
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
          <div className="contents lg:flex lg:flex-col lg:justify-center">
            <HomeSectionHeading
              id="home-icons-heading"
              className="order-1 text-start"
              style={{
                animation: "sono-fade-up 520ms var(--motion-ease) both",
              }}
            >
              Icons for every interface
            </HomeSectionHeading>

            <div
              className="order-3 min-w-0 text-start lg:mt-4"
              style={{
                animation: "sono-fade-up 520ms var(--motion-ease) 120ms both",
              }}
            >
              <p className="max-w-[34em] text-[clamp(0.9375rem,3.2vw,1.0625rem)] leading-[1.6] text-muted-foreground">
                Explore a growing collection of icons for development, crypto,
                interfaces, and everyday use. Find the right icon, customize it,
                and use it directly in your React projects.
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

              <div className="mt-7 w-full sm:w-auto">
                <Button asChild className="w-full sm:w-auto">
                  <Link
                    href={ICONS_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Explore Icons
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div
            className="relative order-2 mx-auto w-full min-w-0 max-w-[40rem] lg:mx-0 lg:max-w-none"
            style={{
              animation: "sono-fade-up 520ms var(--motion-ease) 80ms both",
            }}
          >
            <IconsScatter />
          </div>
        </div>
      </div>
    </section>
  )
}
