import { NextResponse } from "next/server"

import {
  listTopMarketplaceDownloadsBySlug,
  searchAdminMarketplaceDownloads,
  type AdminDownloadSearchSort,
  type AdminDownloadSearchSource,
} from "@/db/queries/marketplace-downloads"
import { AdminAuthError, requireAdmin } from "@/lib/admin"

const SOURCES = new Set<AdminDownloadSearchSource>(["all", "zip", "external"])

const SORTS = new Set<AdminDownloadSearchSort>([
  "newest",
  "oldest",
  "email_asc",
  "email_desc",
  "slug_asc",
  "slug_desc",
])

export async function GET(req: Request) {
  try {
    await requireAdmin()
    const { searchParams } = new URL(req.url)
    const q = (searchParams.get("q") ?? "").slice(0, 200)
    const sourceRaw = (searchParams.get("source") ??
      "all") as AdminDownloadSearchSource
    const sortRaw = (searchParams.get("sort") ??
      "newest") as AdminDownloadSearchSort
    const page = Number(searchParams.get("page") ?? "1")
    const pageSize = Number(searchParams.get("pageSize") ?? "25")

    const [result, top] = await Promise.all([
      searchAdminMarketplaceDownloads({
        q,
        source: SOURCES.has(sourceRaw) ? sourceRaw : "all",
        sort: SORTS.has(sortRaw) ? sortRaw : "newest",
        page: Number.isFinite(page) ? page : 1,
        pageSize: Number.isFinite(pageSize) ? pageSize : 25,
      }),
      listTopMarketplaceDownloadsBySlug({ limit: 10, sinceDays: 30 }),
    ])

    return NextResponse.json({ ...result, top })
  } catch (err) {
    if (err instanceof AdminAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }
    console.error("GET /api/admin/downloads failed:", err)
    return NextResponse.json({ error: "ServerError" }, { status: 500 })
  }
}
