import { NextResponse } from "next/server"

import { canAccessContent } from "@/lib/access-server"
import {
  getProComponentSource,
  GitHubProApiError,
  GitHubProConfigError,
  ProComponentNotFoundError,
} from "@/lib/github-pro"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(
  _req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  if (!(await canAccessContent("pro"))) {
    return NextResponse.json(
      { ok: false, error: "Pro plan required" },
      { status: 403 }
    )
  }

  const { slug } = await context.params

  try {
    const source = await getProComponentSource(slug)
    // Metadata only — zip bytes via `/archive`. Never inline binary here.
    return NextResponse.json({
      ok: true,
      slug: source.slug,
      name: source.name,
      category: source.category,
      variant: source.variant,
      archive: source.archive ?? null,
      files: source.files,
      downloadUrl: source.archive
        ? `/api/pro/components/${encodeURIComponent(source.slug)}/archive`
        : null,
    })
  } catch (err) {
    if (err instanceof GitHubProConfigError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: 500 })
    }
    if (err instanceof ProComponentNotFoundError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: 404 })
    }
    if (err instanceof GitHubProApiError) {
      return NextResponse.json(
        { ok: false, error: err.message },
        { status: err.status }
      )
    }
    if (err instanceof Error && /traversal|not allowed|Invalid path|Empty file/i.test(err.message)) {
      return NextResponse.json({ ok: false, error: err.message }, { status: 400 })
    }
    const message =
      err instanceof Error ? err.message : "Failed to load Pro component"
    return NextResponse.json({ ok: false, error: message }, { status: 502 })
  }
}
