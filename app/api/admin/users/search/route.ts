import { NextResponse } from "next/server"

import { searchAdminUsers } from "@/db/queries/admin-read"
import { AdminAuthError, requireAdmin } from "@/lib/admin"

export async function GET(req: Request) {
  try {
    await requireAdmin()
    const { searchParams } = new URL(req.url)
    const q = searchParams.get("q") ?? ""
    const users = await searchAdminUsers(q)
    return NextResponse.json({ users })
  } catch (err) {
    if (err instanceof AdminAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }
    console.error("GET /api/admin/users/search failed:", err)
    return NextResponse.json({ error: "ServerError" }, { status: 500 })
  }
}
