"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { CheckIcon } from "lucide-react"

import { CodeBlockHeader } from "@/components/docs/code-block-header"
import { CopyButton } from "@/components/docs/copy-button"
import { TemplateDetailGallery } from "@/components/templates/detail-gallery"
import {
  TemplateDetailActions,
  TemplateDetailPurchase,
} from "@/components/templates/detail-purchase"
import { TemplateDownloadButton } from "@/components/templates/template-download-button"
import { TemplateProductCard } from "@/components/templates/product-card"
import type { TemplatePreviewDetail } from "@/lib/templates-preview-data"

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[11px] font-semibold tracking-[0.08em] text-[var(--sm-text-faint)] uppercase">
      {children}
    </h2>
  )
}

export function TemplateDetailPage({
  detail,
}: {
  detail: TemplatePreviewDetail
}) {
  return (
    <div data-templates="" className="min-h-0 flex-1 bg-[var(--sm-bg)] text-[var(--sm-text)]">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
        <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(300px,340px)] lg:gap-x-8 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="flex min-w-0 flex-col gap-6 lg:col-start-1">
            <TemplateDetailGallery
              title={detail.title}
              image={detail.coverSrc || detail.gallery[0] || ""}
              imageDark={detail.coverSrcDark}
              video={detail.coverVideo}
            />

            <div className="lg:hidden">
              <TemplateDetailPurchase
                detail={detail}
                showActions={false}
              />
            </div>

            <article className="min-w-0 overflow-hidden rounded-[12px] border border-[var(--sm-border)] bg-[var(--sm-bg-elevated)]">
              <div className="divide-y divide-[var(--sm-border)]">
                <section className="space-y-3 px-5 py-5 sm:px-6 sm:py-6">
                  <SectionLabel>Overview</SectionLabel>
                  <p className="max-w-3xl text-sm leading-relaxed text-[var(--sm-text-secondary)] sm:text-[15px] sm:leading-7">
                    {detail.description}
                  </p>
                </section>

                {detail.highlights.length > 0 ? (
                  <section className="space-y-4 px-5 py-5 sm:px-6 sm:py-6">
                    <SectionLabel>Highlights</SectionLabel>
                    <ol className="grid gap-4 sm:grid-cols-2">
                      {detail.highlights.map((item, i) => (
                        <li key={item.title} className="flex gap-3">
                          <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-[11px] font-semibold tabular-nums text-primary">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div className="min-w-0 space-y-0.5">
                            <p className="text-sm font-semibold text-[var(--sm-text)]">
                              {item.title}
                            </p>
                            <p className="text-sm leading-relaxed text-[var(--sm-text-secondary)]">
                              {item.body}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </section>
                ) : null}

                {detail.includes.length > 0 ? (
                  <section className="space-y-4 px-5 py-5 sm:px-6 sm:py-6">
                    <SectionLabel>You get</SectionLabel>
                    <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                      {detail.includes.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-[var(--sm-text)]"
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
                ) : null}

                {detail.runCommand ? (
                  <section className="space-y-3 px-5 py-5 sm:px-6 sm:py-6">
                    <SectionLabel>Run locally</SectionLabel>
                    <p className="text-sm leading-relaxed text-[var(--sm-text-secondary)]">
                      From the unzipped project folder:
                    </p>
                    <div className="overflow-hidden rounded-[12px] border border-[var(--sm-border)]">
                      <div className="sono-code-block rounded-none border-0">
                        <CodeBlockHeader title="Terminal">
                          <CopyButton
                            value={detail.runCommand}
                            className="size-6 shrink-0 [&_svg]:size-3"
                          />
                        </CodeBlockHeader>
                        <pre className="no-scrollbar overflow-x-auto px-4 py-3 font-mono text-[14px] leading-[1.65] text-[var(--code-foreground,#d4d4d4)]">
                          <code>{detail.runCommand}</code>
                        </pre>
                      </div>
                    </div>
                  </section>
                ) : null}
              </div>
            </article>
          </div>

          <aside className="relative hidden min-h-0 min-w-0 lg:col-start-2 lg:block">
            <div className="sticky top-24">
              <TemplateDetailPurchase
                detail={detail}
                downloadCta={
                  <TemplateDownloadButton project={detail.project} />
                }
              />
            </div>
          </aside>
        </div>

        {detail.related.length > 0 ? (
          <section className="mt-10 space-y-4 border-t border-[var(--sm-border)] pt-8 pb-8">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold tracking-tight text-[var(--sm-text)]">
                Related products
              </h2>
              <Link
                href="/templates"
                className="cursor-pointer text-sm font-medium text-primary hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {detail.related.map((item) => (
                <TemplateProductCard key={item.slug} item={item} />
              ))}
            </div>
          </section>
        ) : null}

        {/* Space for sticky Download / Live bar (tab bar hidden on product pages). */}
        <div
          className="h-[calc(4.75rem+env(safe-area-inset-bottom,0px))] lg:hidden"
          aria-hidden
        />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--sm-border)] bg-[var(--sm-bg-elevated)]/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] backdrop-blur-md lg:hidden">
        <TemplateDetailActions
          detail={detail}
          downloadCta={
            <TemplateDownloadButton project={detail.project} />
          }
          className="mx-auto max-w-lg"
        />
      </div>
    </div>
  )
}
