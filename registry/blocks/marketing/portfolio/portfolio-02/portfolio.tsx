"use client"

import * as React from "react"
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
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

const CHIPS = [
  "All",
  "Design Systems",
  "Mobile Apps",
  "Web Systems",
  "Product Design",
] as const

type Chip = (typeof CHIPS)[number]

type Project = {
  id: string
  title: string
  category: Exclude<Chip, "All">
  desc: string
  image: string
  alt: string
  client: string
  year: string
  role: string
  metrics: { label: string; value: string }[]
}

const PROJECTS: Project[] = [
  {
    id: "design-system",
    title: "SonoJS Design System",
    category: "Design Systems",
    desc: "A React component library with accessible primitives, tokens, and multi-theme support.",
    image: assetSrc(projectDesignSystem),
    alt: "Code editor showing a design system component library",
    client: "Internal project",
    year: "2026",
    role: "Design & engineering",
    metrics: [
      { label: "Components", value: "120+" },
      { label: "Themes", value: "6" },
      { label: "A11y", value: "AA" },
    ],
  },
  {
    id: "fintech",
    title: "Aura Fintech App",
    category: "Mobile Apps",
    desc: "Next-generation banking with real-time analytics and biometric security.",
    image: assetSrc(projectFintech),
    alt: "Mobile banking app mockups on a desk",
    client: "Aura Finance",
    year: "2025",
    role: "Product design",
    metrics: [
      { label: "Rating", value: "4.8" },
      { label: "Onboarding", value: "−41%" },
      { label: "Users", value: "380k" },
    ],
  },
  {
    id: "analytics",
    title: "Vortex Analytics",
    category: "Web Systems",
    desc: "Large-scale data visualization for enterprise infrastructure monitoring.",
    image: assetSrc(projectAnalytics),
    alt: "Analytics dashboard with charts on a laptop",
    client: "Vortex Corp",
    year: "2025",
    role: "Frontend platform",
    metrics: [
      { label: "Triage", value: "−38%" },
      { label: "Charts", value: "40+" },
      { label: "Uptime", value: "99.9%" },
    ],
  },
  {
    id: "workspace",
    title: "Lunar Workspace",
    category: "Product Design",
    desc: "Minimalist productivity tool built for focused creation and calm collaboration.",
    image: assetSrc(projectWorkspace),
    alt: "Bright modern office workspace",
    client: "Lunar Labs",
    year: "2024",
    role: "Product design",
    metrics: [
      { label: "Teams", value: "2×" },
      { label: "Retention", value: "+18%" },
      { label: "NPS", value: "62" },
    ],
  },
  {
    id: "logistics",
    title: "Helix Supply Chain",
    category: "Web Systems",
    desc: "Global logistics tracking and inventory management for distributors.",
    image: assetSrc(projectLogistics),
    alt: "Warehouse logistics and shipping containers",
    client: "Helix Global",
    year: "2024",
    role: "Full-stack",
    metrics: [
      { label: "Stock-outs", value: "−22%" },
      { label: "Hubs", value: "14" },
      { label: "Shipments", value: "2M" },
    ],
  },
  {
    id: "fitness",
    title: "Pulse Fitness",
    category: "Mobile Apps",
    desc: "Community-driven fitness tracking with personalised plans and social features.",
    image: assetSrc(projectFitness),
    alt: "Fitness workout session in a gym",
    client: "Pulse Inc",
    year: "2024",
    role: "Mobile design",
    metrics: [
      { label: "Workouts", value: "1.2M" },
      { label: "Streaks", value: "+31%" },
      { label: "Rating", value: "4.7" },
    ],
  },
]

export default function Portfolio({
  className,
  ...props
}: React.ComponentProps<"main">) {
  const [chip, setChip] = React.useState<Chip>("All")
  const [activeId, setActiveId] = React.useState(PROJECTS[0].id)

  const visible = React.useMemo(
    () =>
      chip === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === chip),
    [chip]
  )

  const index = Math.max(
    0,
    visible.findIndex((p) => p.id === activeId)
  )
  const active = visible[index]

  const step = (delta: number) => {
    if (visible.length === 0) return
    const next = (index + delta + visible.length) % visible.length
    setActiveId(visible[next].id)
  }

  return (
    <main
      className={cn(
        "min-h-svh w-full min-w-0 bg-canvas text-foreground",
        className
      )}
      {...props}
    >
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          <header className="flex flex-col gap-3 text-start">
            <Badge
              variant="outline"
              className="w-fit rounded-full border-transparent bg-primary/10 text-xs text-primary"
            >
              Case spotlight
            </Badge>
            <h1 className="text-h1 font-semibold tracking-tight text-foreground">
              Pick a case, see the details.
            </h1>
          </header>

          <div
            role="tablist"
            aria-label="Filter cases by discipline"
            className="flex flex-wrap gap-2"
          >
            {CHIPS.map((c) => {
              const selected = chip === c
              return (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setChip(c)}
                  className={cn(
                    "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                    selected
                      ? "border-transparent bg-primary text-primary-foreground"
                      : "border-border/70 bg-card text-muted-foreground hover:text-foreground"
                  )}
                >
                  {c}
                </button>
              )
            })}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <nav
              aria-label="Cases"
              className="flex flex-col gap-2 md:col-span-4"
            >
              {visible.map((p) => {
                const selected = p.id === active?.id
                return (
                  <button
                    key={p.id}
                    type="button"
                    aria-current={selected ? "true" : undefined}
                    onClick={() => setActiveId(p.id)}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-[12px] border p-3 text-start transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                      selected
                        ? "border-primary/40 bg-card shadow-soft"
                        : "border-border/70 bg-transparent hover:bg-card"
                    )}
                  >
                    <img
                      src={p.image}
                      alt=""
                      width={96}
                      height={72}
                      loading="lazy"
                      decoding="async"
                      className="aspect-4/3 w-20 shrink-0 rounded-lg object-cover"
                    />
                    <span className="min-w-0">
                      <span
                        className={cn(
                          "block truncate text-sm font-semibold",
                          selected ? "text-primary" : "text-foreground"
                        )}
                      >
                        {p.title}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {p.client} · <span dir="ltr">{p.year}</span>
                      </span>
                    </span>
                  </button>
                )
              })}
            </nav>

            {active ? (
              <article
                key={active.id}
                className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft md:col-span-8"
              >
                <img
                  src={active.image}
                  alt={active.alt}
                  width={960}
                  height={720}
                  decoding="async"
                  className="aspect-16/10 w-full object-cover"
                />
                <div className="flex flex-col gap-5 p-6 text-start">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge
                      variant="outline"
                      className="rounded-full border-transparent bg-primary/10 text-xs text-primary"
                    >
                      {active.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {active.role}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-h3 font-semibold tracking-tight text-foreground">
                      {active.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {active.desc}
                    </p>
                  </div>
                  <dl className="grid grid-cols-3 gap-3">
                    {active.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-lg border border-border/70 bg-canvas p-3"
                      >
                        <dt className="text-xs text-muted-foreground">
                          {m.label}
                        </dt>
                        <dd
                          dir="ltr"
                          className="text-start text-lg font-semibold text-foreground"
                        >
                          {m.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-5">
                    <Button type="button">
                      Read case study
                      <ArrowRightIcon className="icon-dir size-4" aria-hidden />
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        aria-label="Previous case"
                        onClick={() => step(-1)}
                      >
                        <ChevronLeftIcon className="icon-dir size-4" aria-hidden />
                      </Button>
                      <span
                        dir="ltr"
                        className="min-w-12 text-center text-xs text-muted-foreground"
                      >
                        {index + 1} / {visible.length}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        aria-label="Next case"
                        onClick={() => step(1)}
                      >
                        <ChevronRightIcon className="icon-dir size-4" aria-hidden />
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  )
}
