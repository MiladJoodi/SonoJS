import { NextResponse } from "next/server"

import { getAuthUserId } from "@/lib/clerk-auth"
import { createBillingCheckout } from "@/lib/stripe/billing-checkout"

/**
 * Authenticated Stripe Checkout Session create (Test mode).
 * Pro access is granted only after the Stripe webhook reconciles Neon —
 * never because the user lands on success_url.
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

  const planSlug =
    body &&
    typeof body === "object" &&
    "planSlug" in body &&
    typeof (body as { planSlug: unknown }).planSlug === "string"
      ? (body as { planSlug: string }).planSlug
      : null

  if (!planSlug) {
    return NextResponse.json({ error: "InvalidPlanSlug" }, { status: 400 })
  }

  const result = await createBillingCheckout({
    clerkUserId,
    planSlug,
  })

  if (!result.ok) {
    return NextResponse.json(
      {
        error: result.error,
        ...(result.planSlug ? { planSlug: result.planSlug } : {}),
      },
      { status: result.status }
    )
  }

  return NextResponse.json({
    url: result.url,
    sessionId: result.sessionId,
  })
}
