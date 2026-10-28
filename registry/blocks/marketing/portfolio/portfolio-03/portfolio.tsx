"use client"

import * as React from "react"
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import projectAnalytics from "./images/project-analytics.webp"
import projectDesignSystem from "./images/project-design-system.webp"
import projectFintech from "./images/project-fintech.webp"
import projectFitness from "./images/project-fitness.webp"
import projectLogistics from "./images/project-logistics.webp"
import projectWorkspace from "./images/project-workspace.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

type Project = {
  title: string
  category: string
  desc: string
  image: string
  alt: string
  client: string
  year: string
}

const PROJECTS: Project[] = [
  {
    title: "SonoJS Design System",
    category: "Design Systems",
    desc: "Accessible primitives, tokens, and multi-theme support for product teams.",
    image: assetSrc(projectDesignSystem),
    alt: "Code editor showing a design system component library",
    client: "Internal project",
    year: "2026",
  },
  {
    title: "Aura Fintech App",
    category: "Mobile Apps",
    desc: "Banking with real-time analytics and biometric security.",
    image: assetSrc(projectFintech),
    alt: "Mobile banking app mockups on a desk",
    client: "Aura Finance",
    year: "2025",
  },
  {
    title: "Vortex Analytics",
    category: "Web Systems",
    desc: "Enterprise data visualization for infrastructure monitoring.",
    image: assetSrc(projectAnalytics),
    alt: "Analytics dashboard with charts on a laptop",
    client: "Vortex Corp",
    year: "2025",
  },
  {
    title: "Lunar Workspace",
    category: "Product Design",
    desc: "A calm productivity tool for focused creation and collaboration.",
    image: assetSrc(projectWorkspace),
    alt: "Bright modern office workspace",
    client: "Lunar Labs",
    year: "2024",
  },
  {
    title: "Helix Supply Chain",
    category: "Web Systems",
    desc: "Logistics tracking and inventory for global distributors.",
    image: assetSrc(projectLogistics),
    alt: "Warehouse logistics and shipping containers",
    client: "Helix Global",
    year: "2024",
  },
  {
    title: "Pulse Fitness",
    category: "Mobile Apps",
    desc: "Community fitness tracking with personalised workout plans.",
    image: assetSrc(projectFitness),
    alt: "Fitness workout session in a gym",
    client: "Pulse Inc",
    year: "2024",
  },
]

const MARQUEE = [
  "Design systems",
  "Mobile apps",
  "Web platforms",
  "Product design",
  "Data visualization",
  "Prototyping",
]

const ORBIT_RADIUS = 44 // % of the orbit box

export default function Portfolio({
  className,
  ...props
}: React.ComponentProps<"main">) {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const magnetRef = React.useRef<HTMLDivElement>(null)
  const active = PROJECTS[activeIndex]

  const onMagnetMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = magnetRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    el.style.setProperty("--p03-mx", `${(dx * 14).toFixed(1)}px`)
    el.style.setProperty("--p03-my", `${(dy * 14).toFixed(1)}px`)
  }

  const onMagnetLeave = () => {
    const el = magnetRef.current
    if (!el) return
    el.style.setProperty("--p03-mx", "0px")
    el.style.setProperty("--p03-my", "0px")
  }

  return (
    <main className={cn("portfolio-03", className)} {...props}>
      <style>{`
        .portfolio-03 {
          --p03-bg: #F7F3EC;
          --p03-surface: #FFFDF8;
          --p03-fg: #1C1917;
          --p03-muted: #6B6258;
          --p03-line: rgba(28, 25, 23, 0.12);
          --p03-accent: #E4572E;
          --p03-accent-fg: #FFFFFF;
          --p03-shadow: 0 1px 2px rgba(28, 25, 23, 0.06), 0 12px 32px -12px rgba(28, 25, 23, 0.18);
          --p03-cta-bg: #1C1917;
          --p03-cta-fg: #F7F3EC;
          --p03-cta-line: rgba(247, 243, 236, 0.12);
          --p03-cta-shadow: 0 1px 2px rgba(28, 25, 23, 0.2), 0 24px 48px -16px rgba(28, 25, 23, 0.4);
          min-height: 100svh;
          width: 100%;
          min-width: 0;
          overflow: hidden;
          background: var(--p03-bg);
          color: var(--p03-fg);
        }
        .dark .portfolio-03 {
          --p03-bg: #141210;
          --p03-surface: #1D1A17;
          --p03-fg: #F5EFE6;
          --p03-muted: #A39A8E;
          --p03-line: rgba(245, 239, 230, 0.12);
          --p03-accent: #FF7A4D;
          --p03-accent-fg: #141210;
          --p03-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 12px 32px -12px rgba(0, 0, 0, 0.6);
          --p03-cta-bg: #221E1A;
          --p03-cta-fg: #F5EFE6;
          --p03-cta-line: rgba(245, 239, 230, 0.16);
          --p03-cta-shadow: 0 0 0 1px rgba(245, 239, 230, 0.06), 0 24px 56px -16px rgba(0, 0, 0, 0.75);
        }

        .portfolio-03 .p03-wrap { max-width: 72rem; margin-inline: auto; padding-inline: 1rem; }
        @media (min-width: 640px) { .portfolio-03 .p03-wrap { padding-inline: 1.5rem; } }
        @media (min-width: 1024px) { .portfolio-03 .p03-wrap { padding-inline: 2rem; } }

        .portfolio-03 .p03-muted { color: var(--p03-muted); }
        .portfolio-03 .p03-eyebrow {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-size: 0.75rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--p03-accent);
        }
        .portfolio-03 .p03-accent { color: var(--p03-accent); }

        /* Marquee */
        .portfolio-03 .p03-marquee {
          overflow: hidden;
          border-block: 1px solid var(--p03-line);
          background: var(--p03-surface);
        }
        .portfolio-03 .p03-marquee-track {
          display: flex; width: max-content;
          animation: p03-marquee 32s linear infinite;
        }
        [dir="rtl"] .portfolio-03 .p03-marquee-track { animation-name: p03-marquee-rtl; }
        .portfolio-03 .p03-marquee:hover .p03-marquee-track { animation-play-state: paused; }
        .portfolio-03 .p03-marquee-item {
          display: inline-flex; align-items: center; gap: 1.5rem;
          padding-block: 0.875rem; padding-inline-end: 1.5rem;
          font-size: 1.125rem; font-weight: 500; white-space: nowrap;
        }
        .portfolio-03 .p03-marquee-dot {
          width: 0.375rem; height: 0.375rem; border-radius: 9999px; background: var(--p03-accent);
        }
        @keyframes p03-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes p03-marquee-rtl { from { transform: translateX(0); } to { transform: translateX(50%); } }

        /* Orbit stage */
        .portfolio-03 .p03-orbit {
          position: relative; width: 100%; max-width: 30rem; aspect-ratio: 1 / 1; margin-inline: auto;
        }
        .portfolio-03 .p03-orbit-ring {
          position: absolute; inset: 0; border-radius: 9999px;
          border: 1px dashed var(--p03-line);
        }
        .portfolio-03 .p03-orbit-list {
          position: absolute; inset: 0; margin: 0; padding: 0; list-style: none;
          pointer-events: none;
          animation: p03-spin 48s linear infinite;
        }
        .portfolio-03 .p03-orbit:hover .p03-orbit-list,
        .portfolio-03 .p03-orbit:hover .p03-thumb-inner,
        .portfolio-03 .p03-orbit:focus-within .p03-orbit-list,
        .portfolio-03 .p03-orbit:focus-within .p03-thumb-inner { animation-play-state: paused; }
        .portfolio-03 .p03-thumb {
          position: absolute; width: 3.5rem; height: 3.5rem;
          margin-inline-start: -1.75rem; margin-block-start: -1.75rem;
        }
        .portfolio-03 .p03-thumb-inner {
          display: block; width: 100%; height: 100%; padding: 0; cursor: pointer; pointer-events: auto;
          border-radius: 9999px; overflow: hidden;
          border: 2px solid var(--p03-surface); background: var(--p03-surface);
          box-shadow: var(--p03-shadow);
          animation: p03-spin 48s linear infinite reverse;
          transition: border-color 0.2s ease, scale 0.2s ease;
        }
        .portfolio-03 .p03-thumb-inner:hover { scale: 1.12; }
        .portfolio-03 .p03-thumb-inner[aria-current="true"] { border-color: var(--p03-accent); }
        .portfolio-03 .p03-thumb-inner:focus-visible { outline: 2px solid var(--p03-accent); outline-offset: 2px; }
        .portfolio-03 .p03-thumb-inner img { width: 100%; height: 100%; object-fit: cover; display: block; }
        @keyframes p03-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        /* Magnetic featured */
        .portfolio-03 .p03-magnet {
          position: absolute; inset: 20%;
          transform: translate3d(var(--p03-mx, 0px), var(--p03-my, 0px), 0);
          transition: transform 0.25s ease-out;
          will-change: transform;
        }
        .portfolio-03 .p03-featured {
          position: relative; width: 100%; height: 100%;
          overflow: hidden; border-radius: 1.25rem;
          border: 1px solid var(--p03-line); background: var(--p03-surface);
          box-shadow: var(--p03-shadow);
        }
        .portfolio-03 .p03-featured img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .portfolio-03 .p03-btn {
          display: inline-flex; align-items: center; gap: 0.5rem; cursor: pointer;
          height: 46px; padding-inline: 1.25rem; border-radius: 12px; border: 0;
          background: var(--p03-accent); color: var(--p03-accent-fg);
          font-size: 0.875rem; font-weight: 500;
          transition: filter 0.2s ease;
        }
        .portfolio-03 .p03-btn:hover { filter: brightness(1.06); }
        .portfolio-03 .p03-btn:focus-visible { outline: 2px solid var(--p03-fg); outline-offset: 2px; }

        /* Cards */
        .portfolio-03 .p03-card {
          display: flex; flex-direction: column; overflow: hidden;
          border-radius: 12px; border: 1px solid var(--p03-line);
          background: var(--p03-surface); box-shadow: var(--p03-shadow);
          transition: translate 0.25s ease;
        }
        .portfolio-03 .p03-card:hover { translate: 0 -4px; }
        .portfolio-03 .p03-card img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; display: block; }
        .portfolio-03 .p03-chip {
          display: inline-flex; align-items: center; border-radius: 9999px;
          padding: 0.125rem 0.625rem; font-size: 0.75rem; font-weight: 500;
          border: 1px solid var(--p03-line); color: var(--p03-muted);
        }

        .portfolio-03 .p03-link {
          display: inline-flex; align-items: center; gap: 0.375rem; align-self: flex-start;
          margin-block-start: 0.25rem; padding: 0; border: 0; background: none; cursor: pointer;
          color: var(--p03-accent); font-size: 0.875rem; font-weight: 500;
        }
        .portfolio-03 .p03-link:focus-visible { outline: 2px solid var(--p03-accent); outline-offset: 2px; }

        /* CTA */
        .portfolio-03 .p03-cta {
          border-radius: 12px; border: 1px solid var(--p03-cta-line);
          background: var(--p03-cta-bg); color: var(--p03-cta-fg);
          box-shadow: var(--p03-cta-shadow);
        }
        .portfolio-03 .p03-cta .p03-btn { background: var(--p03-cta-fg); color: var(--p03-cta-bg); }

        @media (prefers-reduced-motion: reduce) {
          .portfolio-03 .p03-marquee-track,
          .portfolio-03 .p03-orbit-list,
          .portfolio-03 .p03-thumb-inner { animation: none; }
          .portfolio-03 .p03-magnet { transition: none; }
        }
      `}</style>

      <section className="py-14 sm:py-20">
        <div className="p03-wrap grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6 text-start">
            <span className="p03-eyebrow">Studio portfolio · {active.year}</span>
            <h1 className="text-h1 font-semibold tracking-tight">
              Work that moves, <span className="p03-accent">on purpose</span>.
            </h1>
            <p className="p03-muted max-w-md text-sm leading-relaxed font-medium">
              A small studio shaping product interfaces. Pick a project from the
              orbit — the featured case follows your cursor.
            </p>

            <div className="flex flex-col gap-2" aria-live="polite">
              <div className="flex flex-wrap items-center gap-2">
                <span className="p03-chip">{active.category}</span>
                <span className="p03-muted text-xs">{active.client}</span>
              </div>
              <h2 className="text-h3 font-semibold tracking-tight">
                {active.title}
              </h2>
              <p className="p03-muted text-sm leading-relaxed">{active.desc}</p>
            </div>

            <div>
              <button type="button" className="p03-btn">
                View case
                <ArrowUpRightIcon className="icon-dir size-4" aria-hidden />
              </button>
            </div>
          </div>

          <div className="p03-orbit">
            <div className="p03-orbit-ring" aria-hidden />
            <div
              ref={magnetRef}
              className="p03-magnet"
              onPointerMove={onMagnetMove}
              onPointerLeave={onMagnetLeave}
            >
              <div className="p03-featured">
                <img
                  key={active.title}
                  src={active.image}
                  alt={active.alt}
                  width={960}
                  height={720}
                  decoding="async"
                />
              </div>
            </div>
            <ul
              aria-label="Projects"
              className="p03-orbit-list"
            >
              {PROJECTS.map((p, i) => {
                const angle = (i / PROJECTS.length) * Math.PI * 2 - Math.PI / 2
                const x = 50 + ORBIT_RADIUS * Math.cos(angle)
                const y = 50 + ORBIT_RADIUS * Math.sin(angle)
                return (
                  <li
                    key={p.title}
                    className="p03-thumb"
                    style={{
                      insetInlineStart: `${x.toFixed(2)}%`,
                      insetBlockStart: `${y.toFixed(2)}%`,
                    }}
                  >
                    <button
                      type="button"
                      className="p03-thumb-inner"
                      aria-label={p.title}
                      aria-current={i === activeIndex ? "true" : undefined}
                      onClick={() => setActiveIndex(i)}
                    >
                      <img src={p.image} alt="" width={56} height={56} loading="lazy" />
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>

      <div className="p03-marquee" aria-hidden>
        <div className="p03-marquee-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex">
              {[...MARQUEE, ...MARQUEE].map((label, i) => (
                <span key={`${dup}-${i}`} className="p03-marquee-item">
                  {label}
                  <span className="p03-marquee-dot" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="py-14 sm:py-20">
        <div className="p03-wrap flex flex-col gap-8">
          <div className="flex items-end justify-between gap-4 text-start">
            <h2 className="text-h2 font-semibold tracking-tight">All projects</h2>
            <span dir="ltr" className="p03-muted text-sm">
              {PROJECTS.length} selected
            </span>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p, i) => (
              <article key={p.title} className="p03-card text-start">
                <img
                  src={p.image}
                  alt={p.alt}
                  width={960}
                  height={720}
                  loading="lazy"
                  decoding="async"
                />
                <div className="flex flex-col gap-2 p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="p03-chip">{p.category}</span>
                    <span dir="ltr" className="p03-muted text-xs">
                      {p.year}
                    </span>
                  </div>
                  <h3 className="text-h4 font-semibold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="p03-muted text-sm leading-relaxed">{p.desc}</p>
                  <button
                    type="button"
                    className="p03-link"
                    onClick={() => setActiveIndex(i)}
                  >
                    Spotlight
                    <ArrowUpRightIcon className="icon-dir size-4" aria-hidden />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="p03-wrap">
          <div className="p03-cta px-6 py-12 text-center sm:px-12">
            <div className="mx-auto flex max-w-xl flex-col items-center gap-5">
              <h2 className="text-h2 font-semibold tracking-tight">
                Let&apos;s make the next one together.
              </h2>
              <p className="text-sm leading-relaxed opacity-70">
                We take on a handful of projects each quarter. Tell us what you
                are building.
              </p>
              <button type="button" className="p03-btn">
                Start a project
                <ArrowRightIcon className="icon-dir size-4" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
