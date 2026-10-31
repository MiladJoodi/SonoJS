import { NextResponse } from "next/server"

import { canAccessContent } from "@/lib/access-server"
import {
  getProComponentArchive,
  GitHubProApiError,
  GitHubProConfigError,
  ProArchiveNotFoundError,
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
    const { filename, bytes } = await getProComponentArchive(slug)
    return new NextResponse(new Uint8Array(bytes), {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${filename.replace(/"/g, "")}"`,
        "Content-Length": String(bytes.length),
        "Cache-Control": "private, no-store",
      },
    })
  } catch (err) {
    if (err instanceof GitHubProConfigError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: 500 })
    }
    if (err instanceof ProComponentNotFoundError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: 404 })
    }
    if (err instanceof ProArchiveNotFoundError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: 404 })
    }
    if (err instanceof GitHubProApiError) {
      return NextResponse.json(
        { ok: false, error: err.message },
        { status: err.status }
      )
    }
    if (
      err instanceof Error &&
      /traversal|not allowed|Invalid path|Empty file|Archive must/i.test(
        err.message
      )
    ) {
      return NextResponse.json({ ok: false, error: err.message }, { status: 400 })
    }
    const message =
      err instanceof Error ? err.message : "Failed to download Pro archive"
    return NextResponse.json({ ok: false, error: message }, { status: 502 })
  }
}
