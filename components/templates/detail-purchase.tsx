"use client"

import type { ReactNode } from "react"
import { ExternalLinkIcon } from "lucide-react"

import { StackChip } from "@/components/templates/stack-icon"
import {
  TEMPLATE_BADGE_LABEL,
  type TemplateBadge,
} from "@/lib/templates-catalog-meta"
import type { TemplatePreviewDetail } from "@/lib/templates-preview-data"
import { cn } from "@/lib/utils"

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[11px] font-semibold tracking-[0.08em] text-[var(--sm-text-faint)] uppercase">
      {children}
    </h2>
  )
}

function badgeClass(badge: TemplateBadge) {
  if (badge === "free") return "bg-emerald-500/90"
  if (badge === "new") return "bg-sky-500/90"
  return "bg-amber-500/95"
}

export function TemplateDetailActions({
  detail,
  downloadCta,
  className,
}: {
  detail: TemplatePreviewDetail
  downloadCta: ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex items-stretch gap-2", className)}>
      <div className="min-w-0 flex-1 [&_button]:h-[46px] [&_button]:w-full">
        {downloadCta}
      </div>
      {detail.liveUrl ? (
        <a
          href={detail.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-[46px] min-w-0 flex-1 cursor-pointer items-center justify-center gap-2 rounded-md border border-[var(--sm-border)] bg-[var(--sm-chip)] text-sm font-medium text-[var(--sm-text)] hover:border-primary/40"
        >
          <ExternalLinkIcon className="size-4 shrink-0" />
          Live preview
        </a>
      ) : (
        <button
          type="button"
          disabled
          className="inline-flex h-[46px] min-w-0 flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-md border border-[var(--sm-border)] bg-[var(--sm-chip)] text-sm font-medium text-[var(--sm-text-faint)]"
        >
          Live soon
        </button>
      )}
    </div>
  )
}

export function TemplateDetailPurchase({
  detail,
  downloadCta = null,
  showActions = true,
  className,
}: {
  detail: TemplatePreviewDetail
  downloadCta?: ReactNode
  /** When false, hide Download / Live (e.g. mobile sticky bar owns them). */
  showActions?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[12px] border border-[var(--sm-border)] bg-[var(--sm-bg-elevated)]",
        className
      )}
    >
      <div className="space-y-5 p-5">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[var(--sm-chip)] px-2 py-0.5 text-[11px] font-medium text-[var(--sm-text-faint)]">
              {detail.categoryLabel}
            </span>
            {detail.badge ? (
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[11px] font-semibold text-white",
                  badgeClass(detail.badge)
                )}
              >
                {TEMPLATE_BADGE_LABEL[detail.badge]}
              </span>
            ) : null}
          </div>
          <div className="flex items-start justify-between gap-3">
            <h1 className="min-w-0 text-balance text-lg font-semibold tracking-tight text-[var(--sm-text)] sm:text-xl">
              {detail.title}
            </h1>
            <p
              className={cn(
                "shrink-0 pt-0.5 text-sm font-semibold tabular-nums sm:text-base",
                detail.access === "pro"
                  ? "text-primary"
                  : "text-[var(--sm-text-secondary)]"
              )}
            >
              {detail.priceLabel}
            </p>
          </div>
          <p className="text-sm leading-snug text-[var(--sm-text-secondary)]">
            {detail.tagline}
          </p>
        </div>

        {showActions ? (
          <TemplateDetailActions
            detail={detail}
            downloadCta={downloadCta}
          />
        ) : null}

        <div className="space-y-3 border-t border-[var(--sm-border)] pt-4">
          <SectionLabel>Made with</SectionLabel>
          <ul className="flex flex-wrap gap-1.5">
            {detail.stack.map((s) => (
              <li key={s}>
                <StackChip stack={s} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
