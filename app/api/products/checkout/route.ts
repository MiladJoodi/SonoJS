import { NextResponse } from "next/server"

import { getAuthUserId } from "@/lib/clerk-auth"
import { createProductCheckout } from "@/lib/stripe/product-checkout"

/**
 * Authenticated one-time product Checkout.
 * Body: `{ slug }` only — price is read from the catalog on the server.
 * Entitlement is granted only after the Stripe webhook (never on success_url).
 */
export async function POST(req: Request) {
  const clerkUserId = await getAuthUserId()
  if (!clerkUserId) {
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
      ? (body as { slug: string }).slug
      : null

  if (!slug?.trim()) {
    return NextResponse.json({ error: "InvalidSlug" }, { status: 400 })
  }

  const result = await createProductCheckout({
    clerkUserId,
    slug,
  })

  if (!result.ok) {
    return NextResponse.json(
      {
        error: result.error,
        ...(result.slug ? { slug: result.slug } : {}),
      },
      { status: result.status }
    )
  }

  return NextResponse.json({
    url: result.url,
    sessionId: result.sessionId,
  })
}
