import { NextResponse } from "next/server"

import { getAdminUserDetail } from "@/db/queries/admin-read"
import { AdminAuthError, requireAdmin } from "@/lib/admin"

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function GET(_req: Request, context: RouteContext) {
  try {
    await requireAdmin()
    const { id } = await context.params
    const detail = await getAdminUserDetail(id)
    if (!detail) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
    return NextResponse.json({ detail })
  } catch (err) {
    if (err instanceof AdminAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }
    console.error("GET /api/admin/users/[id] failed:", err)
    return NextResponse.json({ error: "ServerError" }, { status: 500 })
  }
}
