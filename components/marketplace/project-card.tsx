"use client"

import Link from "next/link"
import { ExternalLinkIcon } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

import { ProjectCover } from "@/components/marketplace/project-cover"
import { StackIcon } from "@/components/marketplace/stack-icon"
import {
  MARKETPLACE_BADGE_LABEL,
  MARKETPLACE_CATEGORY_LABEL,
  MARKETPLACE_STACK_LABEL,
  type MarketplaceProject,
} from "@/lib/marketplace-catalog"
import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

export function ProjectCard({
  project,
  index = 0,
}: {
  project: MarketplaceProject
  index?: number
}) {
  const reduce = useReducedMotion() ?? false

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: reduce ? 0 : Math.min(index, 8) * 0.04,
        duration: 0.3,
      }}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft",
        "transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      )}
    >
      <div className="relative">
        <Link
          href={`/marketplace/${project.slug}`}
          className="block cursor-pointer overflow-hidden"
          tabIndex={-1}
          aria-hidden
        >
          <ProjectCover
            hue={project.coverHue}
            title={project.title}
            variant={project.coverVariant}
            imageSrc={project.coverImage}
            imageSrcDark={project.coverImageDark}
            interactive
            className="rounded-none border-0 border-b border-border/50"
          />
        </Link>

        {!project.enabled ? (
          <span className="pointer-events-none absolute end-2.5 top-2.5 z-10 rounded-md bg-zinc-900/80 px-2 py-0.5 text-[10px] font-semibold text-white">
            Coming soon
          </span>
        ) : null}

        {project.badge ? (
          <span
            className={cn(
              "pointer-events-none absolute start-2.5 top-2.5 z-10 rounded-md px-2 py-0.5 text-[10px] font-semibold shadow-sm",
              project.badge === "free" && "bg-emerald-500/90 text-white",
              project.badge === "new" && "bg-sky-500/90 text-white",
              project.badge === "bestseller" && "bg-amber-500/95 text-white"
            )}
          >
            {MARKETPLACE_BADGE_LABEL[project.badge]}
          </span>
        ) : null}

        <div
          className={cn(
            "absolute inset-0 z-10 flex items-center justify-center gap-2 bg-black/45 p-3",
            "opacity-0 transition-opacity duration-200 group-hover:opacity-100 motion-reduce:transition-none",
            "max-sm:opacity-0 max-sm:pointer-events-none"
          )}
        >
          <Button
            asChild
            size="sm"
            className="h-9 cursor-pointer bg-white !text-zinc-900 shadow-none hover:bg-white/90 hover:!text-zinc-900"
          >
            <Link href={`/marketplace/${project.slug}`}>Details</Link>
          </Button>
          {project.enabled && project.liveUrl ? (
            <Button
              asChild
              size="sm"
              variant="outline"
              className="h-9 cursor-pointer border-white/40 bg-black/35 text-white shadow-none hover:bg-black/55 hover:text-white"
            >
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Live preview of ${project.title}`}
              >
                <ExternalLinkIcon className="size-3.5" aria-hidden />
                Live
              </a>
            </Button>
          ) : (
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled
              className="h-9 border-white/30 bg-black/30 text-white/70 shadow-none disabled:opacity-70"
            >
              Soon
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-3.5 sm:p-4">
        <span className="w-fit rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
          {MARKETPLACE_CATEGORY_LABEL[project.category]}
        </span>

        <div className="min-w-0 space-y-1">
          <h2 className="text-base font-semibold tracking-tight text-foreground">
            <Link
              href={`/marketplace/${project.slug}`}
              className="cursor-pointer hover:underline"
            >
              {project.title}
            </Link>
          </h2>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {project.tagline}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-border/50 pt-2.5">
          <ul className="flex min-w-0 items-center gap-1" aria-label="Stack">
            {project.stack.map((s) => (
              <li key={s} title={MARKETPLACE_STACK_LABEL[s]}>
                <StackIcon stack={s} size={18} />
              </li>
            ))}
          </ul>
          <p className="shrink-0 text-base font-semibold tabular-nums text-foreground">
            {project.priceLabel}
          </p>
        </div>
      </div>
    </motion.article>
  )
}
