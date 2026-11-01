"use client"

import * as React from "react"
import Link from "next/link"
import { CheckIcon, ExternalLinkIcon } from "lucide-react"

import {
  MarketplaceOfferColumn,
  useMarketplaceOfferRail,
} from "@/components/marketplace/marketplace-offer-column"
import { ProjectCard } from "@/components/marketplace/project-card"
import { ProjectCover } from "@/components/marketplace/project-cover"
import { StackChip } from "@/components/marketplace/stack-icon"
import {
  getRelatedMarketplaceProjects,
  MARKETPLACE_BADGE_LABEL,
  MARKETPLACE_CATEGORY_LABEL,
  type MarketplaceProject,
} from "@/lib/marketplace-catalog"
import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[11px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
      {children}
    </h2>
  )
}

export function ProjectDetail({
  project,
  downloadCta,
}: {
  project: MarketplaceProject
  downloadCta: React.ReactNode
}) {
  const showOfferRail = useMarketplaceOfferRail()
  const related = React.useMemo(
    () => getRelatedMarketplaceProjects(project, 3),
    [project]
  )

  const specs = [
    ["Version", `v${project.version}`],
    ["Last update", formatDate(project.updatedAt)],
    ["Pages", String(project.screens)],
    ["Category", MARKETPLACE_CATEGORY_LABEL[project.category]],
    ["First release", formatDate(project.firstReleasedAt)],
  ] as const

  const livePreview =
    project.enabled && project.liveUrl ? (
      <Button
        asChild
        variant="outline"
        className="h-[46px] w-full cursor-pointer border-border/70 shadow-none"
      >
        <a href={project.liveUrl} target="_blank" rel="noreferrer">
          <ExternalLinkIcon className="size-4" aria-hidden />
          Live preview
        </a>
      </Button>
    ) : (
      <Button
        type="button"
        variant="outline"
        disabled
        className="h-[46px] w-full border-border/70 shadow-none"
      >
        Live preview soon
      </Button>
    )

  return (
    <div className="relative min-h-0 flex-1 bg-canvas">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 opacity-40 dark:opacity-25"
        aria-hidden
        style={{
          background: `radial-gradient(ellipse 55% 45% at 18% 0%, hsl(${project.coverHue} 70% 50% / 0.2), transparent 70%)`,
        }}
      />

      <div className="workspace-shell relative py-5 sm:py-7 lg:py-8">
        <div
          className={cn(
            "mx-auto grid max-w-7xl items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-x-8 lg:gap-y-0 xl:grid-cols-[minmax(0,1fr)_320px]",
            showOfferRail &&
              "xl:max-w-[min(100%,calc(80rem+var(--offer-rail-width)+2rem))] xl:grid-cols-[minmax(0,1fr)_320px_var(--offer-rail-width)]"
          )}
        >
          {/* Cover — first on mobile so CTAs can sit right under it */}
          <div
            className={cn(
              "relative order-1 min-w-0 overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft",
              "lg:col-start-1 lg:row-start-1 lg:rounded-b-none lg:border-b-0"
            )}
          >
            <ProjectCover
              hue={project.coverHue}
              title={project.title}
              variant={project.coverVariant}
              imageSrc={project.detailCoverImage ?? project.coverImage}
              imageSrcDark={
                project.detailCoverImageDark ??
                (project.detailCoverImage
                  ? undefined
                  : project.coverImageDark)
              }
              interactive
              className="aspect-video rounded-none border-0"
            />
            {!project.enabled ? (
              <span className="absolute start-2.5 top-2.5 rounded-md bg-zinc-900/80 px-2 py-0.5 text-[11px] font-semibold text-white">
                Coming soon
              </span>
            ) : null}
            {project.badge ? (
              <span
                className={cn(
                  "absolute rounded-md px-2 py-0.5 text-[11px] font-semibold text-white",
                  project.enabled ? "start-2.5 top-2.5" : "start-2.5 top-10",
                  project.badge === "free" && "bg-emerald-500/90",
                  project.badge === "new" && "bg-sky-500/90",
                  project.badge === "bestseller" && "bg-amber-500/95"
                )}
              >
                {MARKETPLACE_BADGE_LABEL[project.badge]}
              </span>
            ) : null}
          </div>

          {/* Purchase card — directly under cover on mobile */}
          <aside className="order-2 min-w-0 lg:sticky lg:top-24 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-start">
            <div className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
              <div className="space-y-5 p-5">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {MARKETPLACE_CATEGORY_LABEL[project.category]}
                    </span>
                    {project.badge ? (
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[11px] font-semibold text-white",
                          project.badge === "free" && "bg-emerald-500/90",
                          project.badge === "new" && "bg-sky-500/90",
                          project.badge === "bestseller" && "bg-amber-500/95"
                        )}
                      >
                        {MARKETPLACE_BADGE_LABEL[project.badge]}
                      </span>
                    ) : null}
                  </div>
                  <h1 className="text-balance text-xl font-semibold tracking-tight text-foreground">
                    {project.title}
                  </h1>
                  <p className="text-sm leading-snug text-muted-foreground">
                    {project.tagline}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-3xl font-semibold tracking-tight tabular-nums text-foreground">
                    {project.priceLabel}
                  </p>
                  {downloadCta}
                  {livePreview}
                </div>

                <div className="space-y-3 border-t border-border/60 pt-4">
                  <SectionLabel>Quick facts</SectionLabel>
                  <dl className="grid grid-cols-2 gap-x-3 gap-y-3">
                    {(
                      [
                        ["Pages", String(project.screens)],
                        ["Version", `v${project.version}`],
                        ["Last update", formatDate(project.updatedAt)],
                        [
                          "Who can download",
                          project.access === "pro"
                            ? "Pro only"
                            : project.access === "public"
                              ? "Everyone"
                              : "Free account",
                        ],
                      ] as const
                    ).map(([k, v]) => (
                      <div key={k} className="min-w-0 space-y-0.5">
                        <dt className="text-[11px] text-muted-foreground">
                          {k}
                        </dt>
                        <dd className="truncate text-sm font-medium text-foreground">
                          {v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="space-y-3 border-t border-border/60 pt-4">
                  <SectionLabel>Made with</SectionLabel>
                  <ul className="flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <li key={s}>
                        <StackChip stack={s} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </aside>

          {/* Story body — after purchase CTAs on mobile */}
          <article
            className={cn(
              "order-3 min-w-0 overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft",
              "lg:col-start-1 lg:row-start-2 lg:rounded-t-none lg:shadow-none"
            )}
          >
            <div className="divide-y divide-border/60">
              <section className="space-y-3 px-5 py-5 sm:px-6 sm:py-6">
                <SectionLabel>Overview</SectionLabel>
                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-[15px] sm:leading-7">
                  {project.description}
                </p>
              </section>

              <section className="space-y-4 px-5 py-5 sm:px-6 sm:py-6">
                <SectionLabel>Why this kit</SectionLabel>
                <ol className="grid gap-4 sm:grid-cols-2">
                  {project.highlights.map((item, i) => (
                    <li key={item.title} className="flex gap-3">
                      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-[11px] font-semibold tabular-nums text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 space-y-0.5">
                        <p className="text-sm font-semibold text-foreground">
                          {item.title}
                        </p>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {item.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="space-y-4 px-5 py-5 sm:px-6 sm:py-6">
                <SectionLabel>You get</SectionLabel>
                <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {project.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-foreground"
                    >
                      <CheckIcon
                        className="mt-0.5 size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                        aria-hidden
                      />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="grid gap-6 px-5 py-5 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-6">
                <div className="space-y-3">
                  <SectionLabel>Details</SectionLabel>
                  <dl className="space-y-2">
                    {specs.map(([k, v]) => (
                      <div
                        key={k}
                        className="flex items-baseline justify-between gap-4 text-sm"
                      >
                        <dt className="text-muted-foreground">{k}</dt>
                        <dd className="text-end font-medium text-foreground">
                          {v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="space-y-3">
                  <SectionLabel>You need</SectionLabel>
                  <ul className="space-y-2">
                    {project.requirements.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-foreground"
                      >
                        <span
                          className="size-1 shrink-0 rounded-full bg-muted-foreground/50"
                          aria-hidden
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>
          </article>

          <MarketplaceOfferColumn />
        </div>

        {related.length > 0 ? (
          <section className="mx-auto mt-10 max-w-7xl space-y-4 border-t border-border/50 pt-8">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                Related projects
              </h2>
              <Link
                href="/marketplace"
                className="cursor-pointer text-sm font-medium text-primary hover:underline"
              >
                View all
              </Link>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <li key={p.slug}>
                  <ProjectCard project={p} index={i} flat />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  )
}
