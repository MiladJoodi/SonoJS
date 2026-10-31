import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { AccessGate } from "@/components/access/access-gate"
import {
  CursorDemo,
  CursorPreview,
  CursorViewPager,
} from "@/components/cursors"
import { ComponentSource, DocsInstallation } from "@/components/docs"
import {
  cursorsCatalog,
  getCursorAdjacent,
  getCursorEntry,
} from "@/lib/cursors-catalog"
import { getCursorUsage } from "@/lib/cursors-usage"
import { cursorViewMetadata } from "@/lib/seo"

/** Install / usage gates call Clerk auth — must be request-time. */
export const dynamic = "force-dynamic"

export function generateStaticParams() {
  return cursorsCatalog.map((entry) => ({ id: entry.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const entry = getCursorEntry(id)
  if (!entry) return { title: "Cursor" }
  return cursorViewMetadata(id, entry.title, entry.status === "ported")
}

export default async function CursorViewPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const entry = getCursorEntry(id)
  if (!entry) notFound()

  const { previous, next } = getCursorAdjacent(id)
  const usage = entry.status === "ported" ? getCursorUsage(id) : null

  return (
    <article className="w-full max-w-none space-y-8">
      <header className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <h1
            className="text-h1 min-w-0 flex-1 truncate"
            title={entry.title}
          >
            {entry.title}
          </h1>
          <CursorViewPager
            previous={previous}
            next={next}
            className="mt-1.5"
          />
        </div>
        <p className="text-muted-foreground">{entry.description}</p>
        {entry.status === "pending" ? (
          <p className="text-sm text-amber-600 dark:text-amber-400">
            This cursor is listed in the catalog but not ported yet.
          </p>
        ) : null}
      </header>

      {entry.status === "ported" ? (
        <>
          <CursorPreview title="Preview">
            <CursorDemo id={id} />
          </CursorPreview>

          {/* Free+ (signed in). Guests see AccessLocked — not install/code. */}
          <DocsInstallation name={id} />

          {usage ? (
            <section className="space-y-3">
              <h2 className="text-h3">Usage</h2>
              <AccessGate access="member">
                <div className="space-y-3">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {usage.blurb}
                  </p>
                  <ComponentSource
                    title="page.tsx"
                    lang="tsx"
                    code={usage.code}
                  />
                </div>
              </AccessGate>
            </section>
          ) : null}
        </>
      ) : null}
    </article>
  )
}
