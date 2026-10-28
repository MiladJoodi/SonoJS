"use client"

import * as React from "react"
import {
  ArrowUpRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"

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
  stats: { label: string; value: string }[]
}

const PROJECTS: Project[] = [
  {
    title: "SonoJS Design System",
    category: "Design Systems",
    desc: "Accessible primitives, tokens, and multi-theme support — a component library built to ship product UI faster.",
    image: assetSrc(projectDesignSystem),
    alt: "Code editor showing a design system component library",
    client: "Internal project",
    year: "2026",
    stats: [
      { label: "Components", value: "120+" },
      { label: "Themes", value: "6" },
    ],
  },
  {
    title: "Aura Fintech App",
    category: "Mobile Apps",
    desc: "Next-generation banking with real-time analytics and biometric security.",
    image: assetSrc(projectFintech),
    alt: "Mobile banking app mockups on a desk",
    client: "Aura Finance",
    year: "2025",
    stats: [
      { label: "Rating", value: "4.8" },
      { label: "Users", value: "380k" },
    ],
  },
  {
    title: "Vortex Analytics",
    category: "Web Systems",
    desc: "Enterprise data visualization for large-scale infrastructure monitoring.",
    image: assetSrc(projectAnalytics),
    alt: "Analytics dashboard with charts on a laptop",
    client: "Vortex Corp",
    year: "2025",
    stats: [
      { label: "Triage", value: "−38%" },
      { label: "Uptime", value: "99.9%" },
    ],
  },
  {
    title: "Lunar Workspace",
    category: "Product Design",
    desc: "A calm productivity tool for focused creation and seamless collaboration.",
    image: assetSrc(projectWorkspace),
    alt: "Bright modern office workspace",
    client: "Lunar Labs",
    year: "2024",
    stats: [
      { label: "Teams", value: "2×" },
      { label: "Retention", value: "+18%" },
    ],
  },
  {
    title: "Helix Supply Chain",
    category: "Web Systems",
    desc: "Global logistics tracking and inventory management for distributors.",
    image: assetSrc(projectLogistics),
    alt: "Warehouse logistics and shipping containers",
    client: "Helix Global",
    year: "2024",
    stats: [
      { label: "Stock-outs", value: "−22%" },
      { label: "Hubs", value: "14" },
    ],
  },
  {
    title: "Pulse Fitness",
    category: "Mobile Apps",
    desc: "Community-driven fitness tracking with personalised plans and social features.",
    image: assetSrc(projectFitness),
    alt: "Fitness workout session in a gym",
    client: "Pulse Inc",
    year: "2024",
    stats: [
      { label: "Workouts", value: "1.2M" },
      { label: "Streaks", value: "+31%" },
    ],
  },
]

export default function Portfolio({
  className,
  ...props
}: React.ComponentProps<"main">) {
  const [index, setIndex] = React.useState(0)
  const active = PROJECTS[index]
  const pad = (n: number) => String(n).padStart(2, "0")

  const step = (delta: number) =>
    setIndex((i) => (i + delta + PROJECTS.length) % PROJECTS.length)

  return (
    <main className={cn("portfolio-04", className)} {...props}>
      <style>{`
        .portfolio-04 {
          --p04-bg: #07070B;
          --p04-surface: #0F0F16;
          --p04-fg: #F4F4F8;
          --p04-muted: #8B8BA0;
          --p04-line: rgba(255, 255, 255, 0.1);
          --p04-cyan: #22E1FF;
          --p04-magenta: #FF3DCB;
          min-height: 100svh;
          width: 100%;
          min-width: 0;
          overflow: hidden;
          background: var(--p04-bg);
          color: var(--p04-fg);
          background-image:
            radial-gradient(60rem 24rem at 15% -10%, rgba(34, 225, 255, 0.12), transparent 60%),
            radial-gradient(50rem 24rem at 90% 0%, rgba(255, 61, 203, 0.1), transparent 60%);
          background-repeat: no-repeat;
        }
        .portfolio-04 .p04-wrap { max-width: 64rem; margin-inline: auto; padding-inline: 1rem; }
        @media (min-width: 640px) { .portfolio-04 .p04-wrap { padding-inline: 1.5rem; } }

        .portfolio-04 .p04-muted { color: var(--p04-muted); }
        .portfolio-04 .p04-neon {
          background-image: linear-gradient(90deg, var(--p04-cyan), var(--p04-magenta));
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .portfolio-04 .p04-tag {
          display: inline-flex; align-items: center; gap: 0.375rem;
          border-radius: 9999px; padding: 0.25rem 0.75rem;
          font-size: 0.75rem; font-weight: 500;
          color: var(--p04-cyan); border: 1px solid rgba(34, 225, 255, 0.35);
          background: rgba(34, 225, 255, 0.08);
        }

        /* Cover */
        .portfolio-04 .p04-cover {
          position: relative; overflow: hidden;
          aspect-ratio: 16 / 9;
          border-radius: 12px; border: 1px solid var(--p04-line);
          background: var(--p04-surface);
          box-shadow: 0 0 0 1px rgba(34, 225, 255, 0.15), 0 0 48px -8px rgba(34, 225, 255, 0.35), 0 0 64px -16px rgba(255, 61, 203, 0.3);
        }
        @media (min-width: 768px) { .portfolio-04 .p04-cover { aspect-ratio: 2 / 1; } }
        .portfolio-04 .p04-cover img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
        .portfolio-04 .p04-cover::after {
          content: ""; position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(to top, rgba(7, 7, 11, 0.9), rgba(7, 7, 11, 0) 55%);
        }
        .portfolio-04 .p04-cover-meta {
          position: absolute; inset-inline: 0; inset-block-end: 0; z-index: 1;
          display: flex; align-items: flex-end; justify-content: space-between; gap: 1rem; padding: 1rem;
        }
        @media (min-width: 640px) { .portfolio-04 .p04-cover-meta { padding: 1.5rem; } }
        .portfolio-04 .p04-nav { display: flex; gap: 0.5rem; }
        .portfolio-04 .p04-icon-btn {
          display: inline-flex; align-items: center; justify-content: center; cursor: pointer;
          width: 2.5rem; height: 2.5rem; border-radius: 9999px;
          color: var(--p04-fg); background: rgba(7, 7, 11, 0.6);
          border: 1px solid var(--p04-line); backdrop-filter: none;
          transition: border-color 0.2s ease, color 0.2s ease;
        }
        .portfolio-04 .p04-icon-btn:hover { color: var(--p04-cyan); border-color: var(--p04-cyan); }
        .portfolio-04 .p04-icon-btn:focus-visible,
        .portfolio-04 .p04-thumb:focus-visible,
        .portfolio-04 .p04-btn:focus-visible { outline: 2px solid var(--p04-cyan); outline-offset: 2px; }

        /* Thumb strip: 6 columns under the cover */
        .portfolio-04 .p04-strip {
          display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 0.5rem;
          margin: 1rem 0 0; padding: 0; list-style: none;
        }
        @media (min-width: 640px) { .portfolio-04 .p04-strip { gap: 0.75rem; } }
        .portfolio-04 .p04-thumb {
          position: relative; display: block; width: 100%; padding: 0; cursor: pointer; overflow: hidden;
          aspect-ratio: 16 / 10; border-radius: 8px;
          border: 1px solid var(--p04-line); background: var(--p04-surface);
          opacity: 0.55; transition: opacity 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .portfolio-04 .p04-thumb:hover { opacity: 0.9; }
        .portfolio-04 .p04-thumb[aria-current="true"] {
          opacity: 1; border-color: var(--p04-cyan);
          box-shadow: 0 0 16px -2px rgba(34, 225, 255, 0.6);
        }
        .portfolio-04 .p04-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }

        /* Detail panel */
        .portfolio-04 .p04-panel {
          display: grid; gap: 1.5rem; margin-top: 1.5rem; padding: 1.25rem;
          border-radius: 12px; border: 1px solid var(--p04-line); background: var(--p04-surface);
        }
        @media (min-width: 768px) { .portfolio-04 .p04-panel { grid-template-columns: 1fr auto; align-items: center; padding: 1.5rem; } }
        .portfolio-04 .p04-stat {
          min-width: 6rem; padding: 0.75rem 1rem; border-radius: 8px;
          border: 1px solid var(--p04-line); background: rgba(255, 255, 255, 0.02);
        }
        .portfolio-04 .p04-btn {
          display: inline-flex; align-items: center; gap: 0.5rem; cursor: pointer;
          height: 46px; padding-inline: 1.25rem; border-radius: 12px; border: 0;
          font-size: 0.875rem; font-weight: 600; color: #07070B;
          background-image: linear-gradient(90deg, var(--p04-cyan), var(--p04-magenta));
          box-shadow: 0 0 24px -4px rgba(34, 225, 255, 0.5);
          transition: filter 0.2s ease;
        }
        .portfolio-04 .p04-btn:hover { filter: brightness(1.1); }
      `}</style>

      <section className="py-12 sm:py-16">
        <div className="p04-wrap flex flex-col gap-8">
          <header className="flex flex-col gap-4 text-start">
            <span className="p04-tag w-fit">Showreel · {PROJECTS.length} projects</span>
            <h1 className="text-h1 font-semibold tracking-tight">
              Interfaces that <span className="p04-neon">glow</span> in the dark.
            </h1>
            <p className="p04-muted max-w-xl text-sm leading-relaxed font-medium">
              Select a thumbnail to swap the cover. Six projects, one reel.
            </p>
          </header>

          <div>
            <div className="p04-cover">
              <img
                key={active.title}
                src={active.image}
                alt={active.alt}
                width={960}
                height={720}
                decoding="async"
              />
              <div className="p04-cover-meta">
                <div className="flex min-w-0 flex-col gap-2 text-start" aria-live="polite">
                  <span className="p04-tag w-fit">{active.category}</span>
                  <h2 className="text-h3 font-semibold tracking-tight">
                    {active.title}
                  </h2>
                </div>
                <div className="p04-nav">
                  <button
                    type="button"
                    className="p04-icon-btn"
                    aria-label="Previous project"
                    onClick={() => step(-1)}
                  >
                    <ChevronLeftIcon className="icon-dir size-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    className="p04-icon-btn"
                    aria-label="Next project"
                    onClick={() => step(1)}
                  >
                    <ChevronRightIcon className="icon-dir size-4" aria-hidden />
                  </button>
                </div>
              </div>
            </div>

            <ul className="p04-strip" aria-label="Projects">
              {PROJECTS.map((p, i) => (
                <li key={p.title}>
                  <button
                    type="button"
                    className="p04-thumb"
                    aria-label={p.title}
                    aria-current={i === index ? "true" : undefined}
                    onClick={() => setIndex(i)}
                  >
                    <img src={p.image} alt="" width={160} height={100} loading="lazy" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="p04-panel">
              <div className="flex flex-col gap-3 text-start">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span dir="ltr" className="p04-neon font-semibold">
                    {pad(index + 1)} / {pad(PROJECTS.length)}
                  </span>
                  <span className="p04-muted">
                    {active.client} · <span dir="ltr">{active.year}</span>
                  </span>
                </div>
                <p className="p04-muted max-w-xl text-sm leading-relaxed">
                  {active.desc}
                </p>
                <div className="flex flex-wrap gap-3">
                  {active.stats.map((s) => (
                    <div key={s.label} className="p04-stat">
                      <p className="p04-muted text-xs">{s.label}</p>
                      <p dir="ltr" className="text-start text-lg font-semibold">
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <button type="button" className="p04-btn">
                  View case study
                  <ArrowUpRightIcon className="icon-dir size-4" aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
