"use client"

import * as React from "react"
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react"

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

const CATEGORIES = [
  "All",
  "Design Systems",
  "Mobile Apps",
  "Web Systems",
  "Product Design",
] as const

type Category = (typeof CATEGORIES)[number]

type Project = {
  title: string
  category: Exclude<Category, "All">
  desc: string
  image: string
  alt: string
  client: string
  year: string
  result: string
}

const PROJECTS: Project[] = [
  {
    title: "SonoJS Design System",
    category: "Design Systems",
    desc: "A React component library with accessible primitives, tokens, and multi-theme support — built to ship product UI faster.",
    image: assetSrc(projectDesignSystem),
    alt: "Code editor showing a design system component library",
    client: "Internal project",
    year: "2026",
    result: "120+ components shipped",
  },
  {
    title: "Aura Fintech App",
    category: "Mobile Apps",
    desc: "Next-generation banking with real-time analytics and biometric security.",
    image: assetSrc(projectFintech),
    alt: "Mobile banking app mockups on a desk",
    client: "Aura Finance",
    year: "2025",
    result: "4.8 store rating",
  },
  {
    title: "Vortex Analytics",
    category: "Web Systems",
    desc: "Large-scale data visualization for enterprise infrastructure monitoring.",
    image: assetSrc(projectAnalytics),
    alt: "Analytics dashboard with charts on a laptop",
    client: "Vortex Corp",
    year: "2025",
    result: "38% faster triage",
  },
  {
    title: "Lunar Workspace",
    category: "Product Design",
    desc: "Minimalist productivity tool built for focused creation and calm collaboration.",
    image: assetSrc(projectWorkspace),
    alt: "Bright modern office workspace",
    client: "Lunar Labs",
    year: "2024",
    result: "2× weekly active teams",
  },
  {
    title: "Helix Supply Chain",
    category: "Web Systems",
    desc: "Global logistics tracking and inventory management for distributors.",
    image: assetSrc(projectLogistics),
    alt: "Warehouse logistics and shipping containers",
    client: "Helix Global",
    year: "2024",
    result: "−22% stock-outs",
  },
  {
    title: "Pulse Fitness",
    category: "Mobile Apps",
    desc: "Community-driven fitness tracking with personalised plans and social features.",
    image: assetSrc(projectFitness),
    alt: "Fitness workout session in a gym",
    client: "Pulse Inc",
    year: "2024",
    result: "1.2M workouts logged",
  },
]

function CategoryBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge
      variant="outline"
      className="rounded-full border-transparent bg-primary/10 text-xs text-primary"
    >
      {children}
    </Badge>
  )
}

export default function Portfolio({
  className,
  ...props
}: React.ComponentProps<"main">) {
  const [activeCategory, setActiveCategory] = React.useState<Category>("All")

  const filtered = React.useMemo(
    () =>
      activeCategory === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === activeCategory),
    [activeCategory]
  )

  const [featured, ...rest] = filtered

  return (
    <main
      className={cn(
        "min-h-svh w-full min-w-0 bg-canvas text-foreground",
        className
      )}
      {...props}
    >
      <section className="px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6">
          <CategoryBadge>Selected work 2024–2026</CategoryBadge>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="max-w-2xl text-start text-h1 font-semibold tracking-tight text-foreground">
              Product work, <span className="text-primary">shipped</span>.
            </h1>
            <p className="max-w-md text-start text-sm font-medium leading-relaxed text-muted-foreground">
              One featured case, then the rest of the set. Filter by discipline
              to see what we built and what it moved.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap gap-2"
          >
            {CATEGORIES.map((cat) => {
              const selected = activeCategory === cat
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                    selected
                      ? "border-transparent bg-foreground text-background"
                      : "border-border/70 bg-card text-muted-foreground hover:text-foreground"
                  )}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {featured ? (
        <section className="px-4 pb-6 sm:px-6 lg:px-8" aria-label="Featured case">
          <article className="mx-auto grid max-w-6xl grid-cols-1 overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft lg:grid-cols-2">
            <div className="relative aspect-4/3 overflow-hidden lg:aspect-auto lg:min-h-[420px]">
              <img
                src={featured.image}
                alt={featured.alt}
                width={960}
                height={720}
                decoding="async"
                className="absolute inset-0 size-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-between gap-8 p-6 text-start sm:p-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <CategoryBadge>{featured.category}</CategoryBadge>
                  <span dir="ltr" className="text-xs text-muted-foreground">
                    {featured.year}
                  </span>
                  <span className="text-xs font-medium text-primary">
                    Featured case
                  </span>
                </div>
                <h2 className="text-h2 font-semibold tracking-tight text-foreground">
                  {featured.title}
                </h2>
                <p className="text-sm font-medium leading-relaxed text-muted-foreground">
                  {featured.desc}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/70 pt-5">
                <dl className="grid gap-1 text-sm">
                  <dt className="text-xs text-muted-foreground">
                    {featured.client}
                  </dt>
                  <dd className="font-semibold text-foreground">
                    {featured.result}
                  </dd>
                </dl>
                <Button type="button">
                  Read case study
                  <ArrowRightIcon className="icon-dir size-4" aria-hidden />
                </Button>
              </div>
            </div>
          </article>
        </section>
      ) : null}

      {rest.length > 0 ? (
        <section className="px-4 pb-10 sm:px-6 lg:px-8" aria-label="More projects">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((project) => (
              <article
                key={project.title}
                className="group flex flex-col overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft transition-colors hover:border-primary/30"
              >
                <div className="relative aspect-4/3 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.alt}
                    width={960}
                    height={720}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5 text-start">
                  <div className="flex flex-wrap items-center gap-2">
                    <CategoryBadge>{project.category}</CategoryBadge>
                    <span dir="ltr" className="text-xs text-muted-foreground">
                      {project.year}
                    </span>
                  </div>
                  <h3 className="text-h4 font-semibold tracking-tight text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {project.desc}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/70 pt-4">
                    <p className="min-w-0 truncate text-xs text-muted-foreground">
                      {project.client}
                    </p>
                    <button
                      type="button"
                      aria-label={`Open ${project.title}`}
                      className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                      <ArrowUpRightIcon className="icon-dir size-4" aria-hidden />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-[12px] border border-border/70 bg-card px-6 py-12 text-center shadow-soft sm:px-12">
          <div className="mx-auto flex max-w-xl flex-col items-center gap-5">
            <h2 className="text-h2 font-semibold tracking-tight text-foreground">
              That&apos;s the set.
            </h2>
            <p className="text-sm font-medium leading-relaxed text-muted-foreground">
              Have a product that deserves the same care? We take on a few
              projects each quarter.
            </p>
            <Button type="button" size="lg">
              Start a project
              <ArrowRightIcon className="icon-dir size-4" aria-hidden />
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
