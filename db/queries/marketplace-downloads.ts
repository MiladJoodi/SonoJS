import "server-only"

import {
  and,
  asc,
  count,
  desc,
  eq,
  gt,
  ilike,
  inArray,
  or,
  sql,
  type SQL,
} from "drizzle-orm"

import { db } from "@/db"
import { wrapDbError } from "@/db/errors"
import { marketplaceDownloads, users } from "@/db/schema"
import {
  getMarketplaceProject,
  marketplaceProjects,
} from "@/lib/marketplace-catalog"

export type MarketplaceDownloadSource = "zip" | "external"

export type MarketplaceDownloadRow = {
  id: string
  userId: string
  clerkUserId: string
  slug: string
  title: string
  source: string
  createdAt: string
}

export type AdminMarketplaceDownloadRow = {
  id: string
  userId: string
  clerkUserId: string
  email: string | null
  slug: string
  title: string
  source: string
  createdAt: string
}

export type AdminDownloadSearchSource = "all" | "zip" | "external"

export type AdminDownloadSearchSort =
  | "newest"
  | "oldest"
  | "email_asc"
  | "email_desc"
  | "slug_asc"
  | "slug_desc"

export type AdminDownloadSearchParams = {
  q?: string
  source?: AdminDownloadSearchSource
  sort?: AdminDownloadSearchSort
  page?: number
  pageSize?: number
}

export type AdminDownloadSearchResult = {
  downloads: AdminMarketplaceDownloadRow[]
  total: number
  page: number
  pageSize: number
}

export async function recordMarketplaceDownload(input: {
  userId: string
  clerkUserId: string
  slug: string
  source: MarketplaceDownloadSource
}): Promise<void> {
  const userId = input.userId.trim()
  const clerkUserId = input.clerkUserId.trim()
  const slug = input.slug.trim()
  if (!userId || !clerkUserId || !slug) return
  if (input.source !== "zip" && input.source !== "external") return

  try {
    await db.insert(marketplaceDownloads).values({
      userId,
      clerkUserId,
      slug,
      source: input.source,
    })
  } catch (err) {
    console.error("Failed to record marketplace download:", err)
  }
}

export async function listMarketplaceDownloadsByUserId(
  userId: string,
  options?: { limit?: number }
): Promise<MarketplaceDownloadRow[]> {
  const id = userId.trim()
  if (!id) return []
  const lim = Math.min(Math.max(options?.limit ?? 50, 1), 100)

  try {
    const rows = await db
      .select({
        id: marketplaceDownloads.id,
        userId: marketplaceDownloads.userId,
        clerkUserId: marketplaceDownloads.clerkUserId,
        slug: marketplaceDownloads.slug,
        source: marketplaceDownloads.source,
        createdAt: marketplaceDownloads.createdAt,
      })
      .from(marketplaceDownloads)
      .where(eq(marketplaceDownloads.userId, id))
      .orderBy(desc(marketplaceDownloads.createdAt))
      .limit(lim)

    return rows.map((r) => ({
      id: r.id,
      userId: r.userId,
      clerkUserId: r.clerkUserId,
      slug: r.slug,
      title: getMarketplaceProject(r.slug)?.title ?? r.slug,
      source: r.source,
      createdAt: r.createdAt.toISOString(),
    }))
  } catch (err) {
    wrapDbError("Failed to list marketplace downloads by user", err)
  }
}

export async function countMarketplaceDownloadsByUserId(
  userId: string
): Promise<number> {
  const id = userId.trim()
  if (!id) return 0

  try {
    const [row] = await db
      .select({ n: count() })
      .from(marketplaceDownloads)
      .where(eq(marketplaceDownloads.userId, id))
    return row?.n ?? 0
  } catch (err) {
    wrapDbError("Failed to count marketplace downloads by user", err)
  }
}

function mapAdminDownloadRow(r: {
  id: string
  userId: string
  clerkUserId: string
  email: string | null
  slug: string
  source: string
  createdAt: Date
}): AdminMarketplaceDownloadRow {
  return {
    id: r.id,
    userId: r.userId,
    clerkUserId: r.clerkUserId,
    email: r.email,
    slug: r.slug,
    title: getMarketplaceProject(r.slug)?.title ?? r.slug,
    source: r.source,
    createdAt: r.createdAt.toISOString(),
  }
}

function catalogSlugsMatchingQuery(q: string): string[] {
  const needle = q.trim().toLowerCase()
  if (!needle) return []
  return marketplaceProjects
    .filter(
      (p) =>
        p.slug.toLowerCase().includes(needle) ||
        p.title.toLowerCase().includes(needle)
    )
    .map((p) => p.slug)
    .slice(0, 40)
}

export async function searchAdminMarketplaceDownloads(
  params: AdminDownloadSearchParams = {}
): Promise<AdminDownloadSearchResult> {
  const q = (params.q ?? "").trim().slice(0, 200)
  const source: AdminDownloadSearchSource =
    params.source === "zip" || params.source === "external"
      ? params.source
      : "all"
  const sort: AdminDownloadSearchSort =
    params.sort === "oldest" ||
    params.sort === "email_asc" ||
    params.sort === "email_desc" ||
    params.sort === "slug_asc" ||
    params.sort === "slug_desc"
      ? params.sort
      : "newest"
  const pageSize = Math.min(Math.max(params.pageSize ?? 25, 1), 50)
  const page = Math.min(Math.max(params.page ?? 1, 1), 10_000)
  const offset = (page - 1) * pageSize

  try {
    const clauses: SQL[] = []

    if (source !== "all") {
      clauses.push(eq(marketplaceDownloads.source, source))
    }

    if (q) {
      const pattern = `%${q.replaceAll("%", "\\%").replaceAll("_", "\\_")}%`
      const titleSlugs = catalogSlugsMatchingQuery(q)
      clauses.push(
        or(
          ilike(users.email, pattern),
          ilike(marketplaceDownloads.clerkUserId, pattern),
          ilike(marketplaceDownloads.slug, pattern),
          titleSlugs.length > 0
            ? inArray(marketplaceDownloads.slug, titleSlugs)
            : sql`false`
        )!
      )
    }

    const where =
      clauses.length === 0
        ? undefined
        : clauses.length === 1
          ? clauses[0]
          : and(...clauses)

    const [totalRow] = await db
      .select({ n: count() })
      .from(marketplaceDownloads)
      .leftJoin(users, eq(marketplaceDownloads.userId, users.id))
      .where(where)

    const total = totalRow?.n ?? 0
    if (total === 0) {
      return { downloads: [], total: 0, page, pageSize }
    }

    const orderBy =
      sort === "oldest"
        ? asc(marketplaceDownloads.createdAt)
        : sort === "email_asc"
          ? asc(users.email)
          : sort === "email_desc"
            ? desc(users.email)
            : sort === "slug_asc"
              ? asc(marketplaceDownloads.slug)
              : sort === "slug_desc"
                ? desc(marketplaceDownloads.slug)
                : desc(marketplaceDownloads.createdAt)

    const rows = await db
      .select({
        id: marketplaceDownloads.id,
        userId: marketplaceDownloads.userId,
        clerkUserId: marketplaceDownloads.clerkUserId,
        email: users.email,
        slug: marketplaceDownloads.slug,
        source: marketplaceDownloads.source,
        createdAt: marketplaceDownloads.createdAt,
      })
      .from(marketplaceDownloads)
      .leftJoin(users, eq(marketplaceDownloads.userId, users.id))
      .where(where)
      .orderBy(orderBy)
      .limit(pageSize)
      .offset(offset)

    return {
      downloads: rows.map(mapAdminDownloadRow),
      total,
      page,
      pageSize,
    }
  } catch (err) {
    wrapDbError("Failed to search admin marketplace downloads", err)
  }
}

export async function countMarketplaceDownloadsByUserIds(
  userIds: string[]
): Promise<Map<string, number>> {
  const ids = [...new Set(userIds.map((id) => id.trim()).filter(Boolean))]
  const out = new Map<string, number>()
  if (ids.length === 0) return out

  try {
    const rows = await db
      .select({
        userId: marketplaceDownloads.userId,
        n: count(),
      })
      .from(marketplaceDownloads)
      .where(inArray(marketplaceDownloads.userId, ids))
      .groupBy(marketplaceDownloads.userId)

    for (const row of rows) {
      out.set(row.userId, row.n)
    }
    return out
  } catch (err) {
    wrapDbError("Failed to count marketplace downloads by user ids", err)
  }
}

export type TopMarketplaceDownloadRow = {
  slug: string
  title: string
  downloads: number
}

/** Rank marketplace products by download count (optional rolling window). */
export async function listTopMarketplaceDownloadsBySlug(options?: {
  limit?: number
  /** When set, only count rows with `createdAt` within this many days. */
  sinceDays?: number
}): Promise<TopMarketplaceDownloadRow[]> {
  const limit = Math.min(Math.max(options?.limit ?? 10, 1), 50)
  const sinceDays = options?.sinceDays
  const since =
    typeof sinceDays === "number" && Number.isFinite(sinceDays) && sinceDays > 0
      ? new Date(Date.now() - sinceDays * 24 * 60 * 60 * 1000)
      : null

  try {
    const base = db
      .select({
        slug: marketplaceDownloads.slug,
        n: count(),
      })
      .from(marketplaceDownloads)

    const rows = await (since
      ? base.where(gt(marketplaceDownloads.createdAt, since))
      : base
    )
      .groupBy(marketplaceDownloads.slug)
      .orderBy(desc(count()), asc(marketplaceDownloads.slug))
      .limit(limit)

    return rows.map((r) => ({
      slug: r.slug,
      title: getMarketplaceProject(r.slug)?.title ?? r.slug,
      downloads: r.n,
    }))
  } catch (err) {
    wrapDbError("Failed to list top marketplace downloads by slug", err)
  }
}
