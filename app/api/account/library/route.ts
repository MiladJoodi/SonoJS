import { NextResponse } from "next/server"

import { listProductLibraryByClerkId } from "@/db/queries/product-entitlements"
import { getAuthUserId } from "@/lib/clerk-auth"

/**
 * Signed-in user's purchased / admin-granted products.
 */
export async function GET() {
  const clerkUserId = await getAuthUserId()
  if (!clerkUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const items = await listProductLibraryByClerkId(clerkUserId)
    return NextResponse.json({ items })
  } catch (err) {
    console.error(
      "GET /api/account/library failed:",
      err instanceof Error ? err.message : "unknown"
    )
    return NextResponse.json({ error: "LibraryFailed" }, { status: 500 })
  }
}
