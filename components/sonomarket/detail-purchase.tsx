"use client"

import type { ReactNode } from "react"
import { ExternalLinkIcon } from "lucide-react"

import { StackChip } from "@/components/marketplace/stack-icon"
import {
  MARKETPLACE_BADGE_LABEL,
  type MarketplaceBadge,
} from "@/lib/marketplace-catalog"
import type { SonoMarketPreviewDetail } from "@/lib/sonomarket-preview-data"
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

function accessLabel(access: SonoMarketPreviewDetail["access"]) {
  if (access === "pro") return "Pro only"
  if (access === "public") return "Everyone"
  return "Free account"
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[11px] font-semibold tracking-[0.08em] text-[var(--sm-text-faint)] uppercase">
      {children}
    </h2>
  )
}

function badgeClass(badge: MarketplaceBadge) {
  if (badge === "free") return "bg-emerald-500/90"
  if (badge === "new") return "bg-sky-500/90"
  return "bg-amber-500/95"
}

export function SonoMarketDetailPurchase({
  detail,
  downloadCta,
  className,
}: {
  detail: SonoMarketPreviewDetail
  downloadCta: ReactNode
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
                {MARKETPLACE_BADGE_LABEL[detail.badge]}
              </span>
            ) : null}
          </div>
          <h1 className="text-balance text-xl font-semibold tracking-tight text-[var(--sm-text)]">
            {detail.title}
          </h1>
          <p className="text-sm leading-snug text-[var(--sm-text-secondary)]">
            {detail.tagline}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-3xl font-semibold tracking-tight tabular-nums text-[var(--sm-text)]">
            {detail.priceLabel}
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
            <div className="min-w-0 flex-1 [&_button]:w-full">{downloadCta}</div>
            {detail.liveUrl ? (
              <a
                href={detail.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex h-[46px] min-w-0 flex-1 cursor-pointer items-center justify-center gap-2 rounded-md border border-[var(--sm-border)] bg-[var(--sm-chip)] text-sm font-medium text-[var(--sm-text)] hover:border-primary/40"
              >
                <ExternalLinkIcon className="size-4 shrink-0" />
                Live preview
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="flex h-[46px] min-w-0 flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-md border border-[var(--sm-border)] bg-[var(--sm-chip)] text-sm font-medium text-[var(--sm-text-faint)]"
              >
                Live soon
              </button>
            )}
          </div>
        </div>

        <div className="space-y-3 border-t border-[var(--sm-border)] pt-4">
          <SectionLabel>Quick facts</SectionLabel>
          <dl className="grid grid-cols-2 gap-x-3 gap-y-3">
            {(
              [
                ["Pages", String(detail.screens)],
                ["Version", `v${detail.version}`],
                ["Last update", formatDate(detail.updatedAt)],
                ["Who can download", accessLabel(detail.access)],
              ] as const
            ).map(([k, v]) => (
              <div key={k} className="min-w-0 space-y-0.5">
                <dt className="text-[11px] text-[var(--sm-text-faint)]">{k}</dt>
                <dd className="truncate text-sm font-medium text-[var(--sm-text)]">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

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

export function SonoMarketMobileBuyBar({
  detail,
  downloadCta,
}: {
  detail: SonoMarketPreviewDetail
  downloadCta: ReactNode
}) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--sm-border)] bg-[var(--sm-header)] px-4 py-3 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <div className="min-w-0">
          <p className="text-[17px] font-semibold tabular-nums text-[var(--sm-text)]">
            {detail.priceLabel}
          </p>
          <p className="text-[11px] text-[var(--sm-text-faint)]">
            {accessLabel(detail.access)}
          </p>
        </div>
        <div className="min-w-0 flex-1 [&_button]:h-11 [&_button]:w-full">
          {downloadCta}
        </div>
        {detail.liveUrl ? (
          <a
            href={detail.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="flex h-11 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-[var(--sm-border)] bg-[var(--sm-chip)] px-3 text-[13px] font-medium text-[var(--sm-text)]"
          >
            <ExternalLinkIcon className="size-4" />
            Live
          </a>
        ) : null}
      </div>
    </div>
  )
}
