import { NextResponse } from "next/server"

import { canAccessContent } from "@/lib/access-server"
import {
  fetchProRegistry,
  GitHubProApiError,
  GitHubProConfigError,
} from "@/lib/github-pro"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  if (!(await canAccessContent("pro"))) {
    return NextResponse.json(
      { ok: false, error: "Pro plan required" },
      { status: 403 }
    )
  }

  try {
    const registry = await fetchProRegistry()
    return NextResponse.json({
      ok: true,
      count: Object.keys(registry).length,
      registry,
    })
  } catch (err) {
    if (err instanceof GitHubProConfigError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: 500 })
    }
    if (err instanceof GitHubProApiError) {
      return NextResponse.json(
        { ok: false, error: err.message },
        { status: err.status }
      )
    }
    const message =
      err instanceof Error ? err.message : "Failed to load Pro registry"
    return NextResponse.json({ ok: false, error: message }, { status: 502 })
  }
}
