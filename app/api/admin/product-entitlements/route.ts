import { NextResponse } from "next/server"

import {
  grantProductEntitlement,
  listProductLibraryByClerkId,
  revokeProductEntitlement,
} from "@/db/queries/product-entitlements"
import { ensureUserFromClerk, getUserByClerkId } from "@/db/queries/users"
import { AdminAuthError, requireAdmin } from "@/lib/admin"
import { getTemplateProject } from "@/lib/templates-catalog"

type Body = {
  clerkUserId?: unknown
  productSlug?: unknown
  action?: unknown
}

/**
 * Admin grant / revoke of a catalog product entitlement.
 * Body: `{ clerkUserId, productSlug, action: "grant" | "revoke" }`
 */
export async function POST(req: Request) {
  try {
    await requireAdmin()
    const body = (await req.json().catch(() => ({}))) as Body
    const clerkUserId =
      typeof body.clerkUserId === "string" ? body.clerkUserId.trim() : ""
    const productSlug =
      typeof body.productSlug === "string" ? body.productSlug.trim() : ""
    const action = body.action === "revoke" ? "revoke" : "grant"

    if (!clerkUserId) {
      return NextResponse.json(
        { error: "clerkUserId required" },
        { status: 400 }
      )
    }
    if (!productSlug) {
      return NextResponse.json(
        { error: "productSlug required" },
        { status: 400 }
      )
    }

    const project = getTemplateProject(productSlug)
    if (!project || !project.enabled) {
      return NextResponse.json({ error: "ProductNotFound" }, { status: 404 })
    }

    if (action === "revoke") {
      const revoked = await revokeProductEntitlement({
        clerkUserId,
        productSlug: project.slug,
      })
      return NextResponse.json({
        ok: true,
        revoked,
        clerkUserId,
        productSlug: project.slug,
      })
    }

    const user =
      (await getUserByClerkId(clerkUserId)) ??
      (await ensureUserFromClerk(clerkUserId))

    const row = await grantProductEntitlement({
      userId: user.id,
      clerkUserId: user.clerkUserId,
      productSlug: project.slug,
      source: "admin_grant",
      amountCents: null,
      stripeCheckoutSessionId: null,
    })

    return NextResponse.json({
      ok: true,
      entitlement: {
        id: row.id,
        productSlug: row.productSlug,
        source: row.source,
        createdAt: row.createdAt.toISOString(),
      },
    })
  } catch (err) {
    if (err instanceof AdminAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }
    console.error("POST /api/admin/product-entitlements failed:", err)
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message.slice(0, 200) : "ServerError",
      },
      { status: 500 }
    )
  }
}

/** List active entitlements for a Clerk user (admin user detail). */
export async function GET(req: Request) {
  try {
    await requireAdmin()
    const clerkUserId =
      new URL(req.url).searchParams.get("clerkUserId")?.trim() || ""
    if (!clerkUserId) {
      return NextResponse.json(
        { error: "clerkUserId required" },
        { status: 400 }
      )
    }
    const items = await listProductLibraryByClerkId(clerkUserId)
    return NextResponse.json({ items })
  } catch (err) {
    if (err instanceof AdminAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }
    console.error("GET /api/admin/product-entitlements failed:", err)
    return NextResponse.json({ error: "ServerError" }, { status: 500 })
  }
}
