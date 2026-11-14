import { NextResponse } from "next/server"

import { getAuthUserId } from "@/lib/clerk-auth"
import { resolveProductCheckoutStatus } from "@/lib/stripe/product-checkout-status"

/**
 * Post product-Checkout poll.
 * Ownership only when Neon has an entitlement for the slug.
 */
export async function POST(req: Request) {
  const userId = await getAuthUserId()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "InvalidJson" }, { status: 400 })
  }

  const slug =
    body &&
    typeof body === "object" &&
    "slug" in body &&
    typeof (body as { slug: unknown }).slug === "string"
      ? (body as { slug: string }).slug.trim()
      : ""

  if (!slug) {
    return NextResponse.json({ error: "InvalidSlug" }, { status: 400 })
  }

  try {
    const result = await resolveProductCheckoutStatus(userId, slug)
    return NextResponse.json(result)
  } catch (err) {
    console.error(
      "product checkout-status failed:",
      err instanceof Error ? err.message : "unknown"
    )
    return NextResponse.json(
      { error: "CheckoutStatusFailed" },
      { status: 500 }
    )
  }
}
