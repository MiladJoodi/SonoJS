import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/lib/config"
import { RainbowButton } from "@sonojs/ui/components/rainbow-button"

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

      <div className="workspace-shell relative z-10 mx-auto w-full max-w-[1180px] px-4 py-14 sm:px-7 sm:py-20 lg:py-24">
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-[clamp(2.5rem,6vw,5rem)]">
          <div
            className="min-w-0 text-start"
            style={{
              animation: "sono-fade-up 520ms var(--motion-ease) both",
            }}
          >
            <p className="text-sm font-medium tracking-wide text-primary">
              + ICONS
            </p>

            <h2
              id="home-icons-heading"
              className="mt-3 text-balance text-[clamp(1.75rem,5vw,2.75rem)] leading-[1.12] font-semibold tracking-[-0.035em] text-foreground"
            >
              4000+ icons. One collection.
            </h2>

            <p className="mt-4 max-w-[34em] text-[clamp(0.9375rem,3.2vw,1.0625rem)] leading-[1.6] text-muted-foreground">
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
                    className="mt-1.5 size-1.5 shrink-0 rounded-full bg-chart-2"
                  />
                  {line}
                </li>
              ))}
            </ul>

            <div className="mt-7">
              <RainbowButton asChild>
                <Link
                  href={ICONS_HREF}
                  className="no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explore Icons
                </Link>
              </RainbowButton>
            </div>
          </div>

          <div
            className="relative mx-auto w-full min-w-0 max-w-[36rem] lg:max-w-none"
            style={{
              animation: "sono-fade-up 520ms var(--motion-ease) 80ms both",
            }}
          >
            <Image
              src="/images/docs/icons.webp"
              alt="SonoJS icons collection preview"
              width={1624}
              height={969}
              className="h-auto w-full object-contain"
              sizes="(max-width: 1024px) 100vw, 800px"
              quality={100}
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  )
}
