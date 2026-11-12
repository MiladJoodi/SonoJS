import { NextResponse } from "next/server"

import {
  searchAdminUsers,
  type AdminUserSearchFilter,
  type AdminUserSearchSort,
} from "@/db/queries/admin-read"
import { AdminAuthError, requireAdmin } from "@/lib/admin"

const FILTERS = new Set<AdminUserSearchFilter>([
  "all",
  "free",
  "pro",
  "active",
  "expired",
])

const SORTS = new Set<AdminUserSearchSort>([
  "newest",
  "oldest",
  "email_asc",
  "email_desc",
])

export async function GET(req: Request) {
  try {
    await requireAdmin()
    const { searchParams } = new URL(req.url)
    const q = (searchParams.get("q") ?? "").slice(0, 200)
    const filterRaw = (searchParams.get("filter") ?? "all") as AdminUserSearchFilter
    const sortRaw = (searchParams.get("sort") ?? "newest") as AdminUserSearchSort
    const page = Number(searchParams.get("page") ?? "1")
    const pageSize = Number(searchParams.get("pageSize") ?? "25")

    const result = await searchAdminUsers({
      q,
      filter: FILTERS.has(filterRaw) ? filterRaw : "all",
      sort: SORTS.has(sortRaw) ? sortRaw : "newest",
      page: Number.isFinite(page) ? page : 1,
      pageSize: Number.isFinite(pageSize) ? pageSize : 25,
    })

    return NextResponse.json(result)
  } catch (err) {
    if (err instanceof AdminAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }
    console.error("GET /api/admin/users/search failed:", err)
    return NextResponse.json({ error: "ServerError" }, { status: 500 })
  }
}
