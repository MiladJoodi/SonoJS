import { NextResponse } from "next/server"

import { normalizeContentAccess } from "@/lib/access"
import { getViewer } from "@/lib/access-server"
import {
  getProComponentArchive,
  GitHubProApiError,
  GitHubProConfigError,
  ProArchiveNotFoundError,
  ProComponentNotFoundError,
} from "@/lib/github-pro"
import {
  canDownloadCatalogProject,
  projectRequiresPurchase,
} from "@/lib/product-entitlement-access"
import { getTemplateProject } from "@/lib/templates-catalog"
import { recordTemplateDownload } from "@/db/queries/marketplace-downloads"
import { userOwnsProductSlug } from "@/db/queries/product-entitlements"
import { ensureUserFromClerk } from "@/db/queries/users"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type RouteContext = {
  params: Promise<{ slug: string }>
}

async function resolveNeonUserForLog(): Promise<{
  userId: string
  clerkUserId: string
} | null> {
  try {
    const viewer = await getViewer()
    if (viewer.kind === "guest" || !viewer.userId) return null
    const user = await ensureUserFromClerk(viewer.userId)
    return { userId: user.id, clerkUserId: user.clerkUserId }
  } catch (err) {
    console.error("templates download: resolve user for log failed:", err)
    return null
  }
}

async function safeLogDownload(input: {
  slug: string
  source: "zip" | "external"
}): Promise<void> {
  try {
    const neon = await resolveNeonUserForLog()
    if (!neon) return
    await recordTemplateDownload({
      userId: neon.userId,
      clerkUserId: neon.clerkUserId,
      slug: input.slug,
      source: input.source,
    })
  } catch (err) {
    console.error("templates download: log failed:", err)
  }
}

/**
 * Catalog download (templates + websites via shared API).
 * Free/member/pro tiers follow ContentAccess.
 * Paid items (`priceCents > 0`) require a product entitlement — Pro alone is not enough.
 */
export async function GET(_req: Request, context: RouteContext) {
  const { slug } = await context.params
  const project = getTemplateProject(slug)

  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const viewer = await getViewer()
  const access = normalizeContentAccess(project.access ?? "member")
  const requiresPurchase = projectRequiresPurchase(project)

  let ownsProduct = false
  if (requiresPurchase && viewer.kind !== "guest" && viewer.userId) {
    // Ownership is always checked server-side for the catalog slug — never trust client.
    ownsProduct = await userOwnsProductSlug(viewer.userId, project.slug)
  }

  const gate = canDownloadCatalogProject({
    viewer,
    access,
    requiresPurchase,
    ownsProduct,
  })

  if (!gate.ok) {
    return NextResponse.json(
      { error: gate.error, code: gate.code },
      { status: gate.status }
    )
  }

  if (!project.enabled) {
    return NextResponse.json(
      { error: "Coming soon", code: "coming_soon" },
      { status: 404 }
    )
  }

  if (project.downloadUrl) {
    // External hosts (e.g. Google Drive share page): return a URL for the
    // client to open. A 302 + fetch()/blob would save HTML instead of opening.
    await safeLogDownload({ slug: project.slug, source: "external" })
    return NextResponse.json(
      { openUrl: project.downloadUrl },
      {
        status: 200,
        headers: { "Cache-Control": "private, no-store" },
      }
    )
  }

  try {
    const { filename, bytes } = await getProComponentArchive(project.slug)
    await safeLogDownload({ slug: project.slug, source: "zip" })
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
    if (
      err instanceof ProComponentNotFoundError ||
      err instanceof ProArchiveNotFoundError
    ) {
      return NextResponse.json(
        { error: "Coming soon", code: "coming_soon" },
        { status: 404 }
      )
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
