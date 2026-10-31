import { NextResponse } from "next/server"

import { normalizeContentAccess } from "@/lib/access"
import { canAccessContent, getViewer } from "@/lib/access-server"
import {
  fetchRepoFileBytes,
  GitHubProApiError,
  GitHubProConfigError,
} from "@/lib/github-pro"
import { assertSafeProRepoPath } from "@/lib/github-pro/paths"
import { getMarketplaceProject } from "@/lib/marketplace-catalog"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type RouteContext = {
  params: Promise<{ slug: string }>
}

function assertSafeArchivePath(path: string): string {
  const safe = assertSafeProRepoPath(path)
  if (!safe.toLowerCase().endsWith(".zip")) {
    throw new Error(`Archive must be a .zip file: ${path}`)
  }
  return safe
}

/**
 * Member-gated marketplace download from the private Pro repo zip
 * (same transport as Pro component archives).
 */
export async function GET(_req: Request, context: RouteContext) {
  const { slug } = await context.params
  const project = getMarketplaceProject(slug)

  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const access = normalizeContentAccess(project.access ?? "member")
  if (access !== "public" && !(await canAccessContent(access))) {
    const viewer = await getViewer()
    if (viewer.kind === "guest") {
      return NextResponse.json(
        { error: "Sign in required to download.", code: "auth_required" },
        { status: 401 }
      )
    }
    return NextResponse.json(
      { error: "Pro plan required.", code: "pro_required" },
      { status: 403 }
    )
  }

  if (!project.enabled) {
    return NextResponse.json(
      { error: "Coming soon", code: "coming_soon" },
      { status: 404 }
    )
  }

  if (project.archivePath) {
    try {
      const archivePath = assertSafeArchivePath(project.archivePath)
      const bytes = await fetchRepoFileBytes(archivePath)
      const filename =
        archivePath.split("/").pop() || `${project.slug}.zip`

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
        return NextResponse.json({ error: err.message }, { status: 500 })
      }
      if (err instanceof GitHubProApiError) {
        return NextResponse.json(
          { error: err.message },
          { status: err.status === 404 ? 404 : err.status }
        )
      }
      if (
        err instanceof Error &&
        /traversal|not allowed|Invalid path|Archive must/i.test(err.message)
      ) {
        return NextResponse.json({ error: err.message }, { status: 400 })
      }
      const message =
        err instanceof Error ? err.message : "Failed to download archive"
      return NextResponse.json({ error: message }, { status: 502 })
    }
  }

  if (project.downloadUrl) {
    return NextResponse.redirect(project.downloadUrl)
  }

  return NextResponse.json(
    { error: "Coming soon", code: "coming_soon" },
    { status: 404 }
  )
}
