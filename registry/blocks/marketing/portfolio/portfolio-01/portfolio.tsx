"use client"

import * as React from "react"
import {
  ArrowRightIcon,
  Code2Icon,
  ExternalLinkIcon,
  HeartIcon,
  LayersIcon,
  MonitorIcon,
  PenToolIcon,
  QuoteIcon,
  SmartphoneIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import projectAnalytics from "./images/project-analytics.webp"
import projectDesignSystem from "./images/project-design-system.webp"
import projectFintech from "./images/project-fintech.webp"
import projectFitness from "./images/project-fitness.webp"
import projectLogistics from "./images/project-logistics.webp"
import projectWorkspace from "./images/project-workspace.webp"
import avatarMarcus from "./images/avatar-marcus.webp"
import avatarSarah from "./images/avatar-sarah.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const CATEGORIES = [
  "All",
  "Product Design",
  "Mobile Apps",
  "Web Systems",
  "Design Systems",
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
  badgeClass: string
}

const PROJECTS: Project[] = [
  {
    title: "SonoJS Design System",
    category: "Design Systems",
    desc: "A comprehensive React component library with accessible primitives, tokens, and multi-theme support.",
    image: assetSrc(projectDesignSystem),
    alt: "Code editor showing a design system component library",
    client: "Internal Project",
    year: "2026",
    badgeClass: "border-transparent bg-primary/10 text-primary",
  },
  {
    title: "Aura Fintech App",
    category: "Mobile Apps",
    desc: "Next-generation banking experience with real-time analytics and biometric security.",
    image: assetSrc(projectFintech),
    alt: "Mobile banking app mockups on a desk",
    client: "Aura Finance",
    year: "2025",
    badgeClass:
      "border-transparent bg-violet-500/10 text-violet-700 dark:text-violet-300",
  },
  {
    title: "Vortex Analytics",
    category: "Web Systems",
    desc: "Large-scale data visualization platform for enterprise infrastructure monitoring.",
    image: assetSrc(projectAnalytics),
    alt: "Analytics dashboard with charts on a laptop",
    client: "Vortex Corp",
    year: "2025",
    badgeClass:
      "border-transparent bg-sky-500/10 text-sky-700 dark:text-sky-300",
  },
  {
    title: "Lunar Workspace",
    category: "Product Design",
    desc: "Minimalist productivity tool designed for focused creation and seamless collaboration.",
    image: assetSrc(projectWorkspace),
    alt: "Bright modern office workspace",
    client: "Lunar Labs",
    year: "2024",
    badgeClass:
      "border-transparent bg-amber-500/15 text-amber-800 dark:text-amber-300",
  },
  {
    title: "Helix Supply Chain",
    category: "Web Systems",
    desc: "Global logistics tracking and inventory management for multi-national distributors.",
    image: assetSrc(projectLogistics),
    alt: "Warehouse logistics and shipping containers",
    client: "Helix Global",
    year: "2024",
    badgeClass:
      "border-transparent bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  },
  {
    title: "Pulse Fitness",
    category: "Mobile Apps",
    desc: "Community-driven fitness tracking with personalized workout plans and social features.",
    image: assetSrc(projectFitness),
    alt: "Fitness workout session in a gym",
    client: "Pulse Inc",
    year: "2024",
    badgeClass:
      "border-transparent bg-orange-500/10 text-orange-700 dark:text-orange-300",
  },
]

const TESTIMONIALS = [
  {
    name: "Sarah Jenkins",
    role: "CPTO at Aura Finance",
    text: "The portfolio and marketing patterns were instrumental in our product launch. Truly world-class component design.",
    avatar: assetSrc(avatarSarah),
    initials: "SJ",
  },
  {
    name: "Marcus Chen",
    role: "Senior Lead Designer",
    text: "SonoJS provides the perfect balance of aesthetic appeal and technical robustness. It’s my go-to for enterprise apps.",
    avatar: assetSrc(avatarMarcus),
    initials: "MC",
  },
]

export default function Portfolio({
  className,
  ...props
}: React.ComponentProps<"main">) {
  const [activeCategory, setActiveCategory] =
    React.useState<Category>("All")

  const filteredProjects = React.useMemo(() => {
    if (activeCategory === "All") return PROJECTS
    return PROJECTS.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  return (
    <main
      className={cn(
        "min-h-svh w-full min-w-0 bg-canvas text-foreground",
        className
      )}
      {...props}
    >
      <section className="relative overflow-hidden px-4 pt-16 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
          <Badge
            variant="outline"
            className="h-9 rounded-full border-transparent bg-primary/10 px-5 font-semibold text-primary"
          >
            Selected Works 2024–2026
          </Badge>

          <div className="space-y-4">
            <h1 className="text-h1 font-semibold tracking-tight text-foreground">
              Building the future, one{" "}
              <span className="text-primary italic">pixel</span> at a time.
            </h1>
            <p className="mx-auto max-w-xl text-sm font-medium leading-relaxed text-muted-foreground">
              Award-winning digital experiences that combine innovative design
              with world-class engineering. Partnering with visionary brands to
              solve complex problems.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button type="button">
              Start a Project
              <ArrowRightIcon className="size-4" aria-hidden />
            </Button>
            <Button type="button" variant="outline">
              Get in Touch
            </Button>
          </div>
        </div>
      </section>

      <section className="sticky top-0 z-20 border-y border-border/70 bg-canvas/95 py-4 backdrop-blur supports-backdrop-filter:bg-canvas/80">
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="mx-auto flex max-w-6xl flex-wrap justify-center gap-2 px-4 sm:px-6 lg:px-8"
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
                  "cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  selected
                    ? "bg-foreground text-background shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <article
                key={project.title}
                className="group relative overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft transition-colors hover:border-primary/30"
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
                  <div className="absolute inset-x-0 bottom-0 border-t border-border/70 bg-card/95 p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <Button type="button" size="sm">
                        Case Study
                      </Button>
                      <Button
                        type="button"
                        size="icon-sm"
                        variant="ghost"
                        aria-label="View live project"
                        className="bg-muted/60"
                      >
                        <ExternalLinkIcon className="size-4" aria-hidden />
                      </Button>
                      <Button
                        type="button"
                        size="icon-sm"
                        variant="ghost"
                        aria-label="View source"
                        className="bg-muted/60"
                      >
                        <Code2Icon className="size-4" aria-hidden />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className={cn("rounded-full text-xs", project.badgeClass)}
                    >
                      {project.category}
                    </Badge>
                    <span
                      dir="ltr"
                      className="text-xs text-muted-foreground/70"
                    >
                      {project.year}
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {project.title}
                  </h2>
                  <p className="mt-4 mb-4 text-sm font-medium leading-relaxed text-muted-foreground">
                    {project.desc}
                  </p>
                  <div className="flex items-center justify-between gap-3 border-t border-border/70 pt-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border/70 bg-muted/40">
                        <LayersIcon
                          className="size-3.5 text-muted-foreground"
                          aria-hidden
                        />
                      </div>
                      <p className="truncate text-xs text-muted-foreground">
                        {project.client}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3 text-muted-foreground/40">
                      <MonitorIcon className="size-4" aria-hidden />
                      <SmartphoneIcon className="size-4" aria-hidden />
                      <PenToolIcon className="size-4" aria-hidden />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button type="button" variant="ghost" size="lg">
              View All 48 Projects
              <ArrowRightIcon className="size-4" aria-hidden />
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-border/70 bg-canvas px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="space-y-6 text-start">
            <div className="flex size-10 items-center justify-center rounded-[12px] bg-primary shadow-soft">
              <QuoteIcon
                className="size-5 text-primary-foreground"
                aria-hidden
              />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              What clients say about our{" "}
              <span className="text-primary italic">impact.</span>
            </h2>
            <p className="max-w-md text-sm font-medium leading-relaxed text-muted-foreground">
              We believe in long-term partnerships that drive real business
              results through thoughtful design and engineering excellence.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex -space-x-2 rtl:space-x-reverse">
                {[avatarSarah, avatarMarcus, projectWorkspace, projectFintech].map(
                  (src, i) => (
                    <Avatar
                      key={i}
                      className="size-8 ring-2 ring-canvas"
                    >
                      <AvatarImage src={assetSrc(src)} alt="" />
                      <AvatarFallback className="text-[10px]">
                        U{i + 1}
                      </AvatarFallback>
                    </Avatar>
                  )
                )}
                <div className="flex size-8 items-center justify-center rounded-full border-2 border-canvas bg-muted text-[10px] font-semibold text-muted-foreground">
                  +120
                </div>
              </div>
              <div className="h-4 w-px bg-border" aria-hidden />
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <HeartIcon
                    key={i}
                    className="size-3 fill-current"
                    aria-hidden
                  />
                ))}
                <span className="ms-1 text-xs font-semibold text-foreground">
                  5.0 Star Rating
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {TESTIMONIALS.map((t) => (
              <blockquote
                key={t.name}
                className="rounded-[12px] border border-border/70 bg-card p-6 shadow-soft"
              >
                <p className="mb-6 text-sm font-medium leading-relaxed text-muted-foreground italic">
                  “{t.text}”
                </p>
                <footer className="flex items-center gap-4">
                  <Avatar className="size-10 rounded-lg">
                    <AvatarImage src={t.avatar} alt="" />
                    <AvatarFallback className="rounded-lg text-xs">
                      {t.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 text-start">
                    <cite className="not-italic text-sm font-semibold text-foreground">
                      {t.name}
                    </cite>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {t.role}
                    </p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[12px] bg-foreground px-8 py-12 text-center text-background sm:px-12">
            <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center gap-6">
              <h2 className="text-2xl font-semibold tracking-tight">
                Let&apos;s build something{" "}
                <span className="text-primary italic">legendary</span>{" "}
                together.
              </h2>
              <p className="text-sm font-medium text-background/70">
                Ready to take your product to the next level? Our team is
                available for select projects.
              </p>
              <Button type="button" size="lg" className="mt-2">
                Get Started Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
