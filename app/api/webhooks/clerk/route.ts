import { clerkClient } from "@clerk/nextjs/server"
import { verifyWebhook } from "@clerk/nextjs/webhooks"
import type { NextRequest } from "next/server"

import { upsertUserFromClerk } from "@/db/queries/users"

function primaryEmailFromClerkEvent(data: {
  primary_email_address_id?: string | null
  email_addresses?: Array<{ id: string; email_address: string }>
}): string | null {
  const emails = data.email_addresses ?? []
  const primaryId = data.primary_email_address_id
  const primary = primaryId
    ? emails.find((e) => e.id === primaryId)
    : undefined
  const raw =
    primary?.email_address?.trim() || emails[0]?.email_address?.trim() || null
  return raw ? raw.toLowerCase() : null
}

/**
 * Clerk → user.created: default Free metadata + upsert Neon user with email.
 * Admins can later set `plan: "pro"` + `planExpiresAt` (ISO) in Dashboard.
 */
export async function POST(req: NextRequest) {
  let evt: Awaited<ReturnType<typeof verifyWebhook>>
  try {
    evt = await verifyWebhook(req)
  } catch (err) {
    console.error("Clerk webhook verification failed:", err)
    return new Response("Webhook verification failed", { status: 400 })
  }

  if (evt.type === "user.created") {
    const existing = evt.data.public_metadata?.plan
    if (existing !== "pro" && existing !== "free") {
      const client = await clerkClient()
      await client.users.updateUserMetadata(evt.data.id, {
        publicMetadata: {
          plan: "free",
          planExpiresAt: null,
        },
      })
    }

    try {
      await upsertUserFromClerk({
        clerkUserId: evt.data.id,
        email: primaryEmailFromClerkEvent(evt.data),
      })
    } catch (err) {
      console.error("Failed to upsert Neon user on Clerk user.created:", err)
    }
  }

  return new Response("ok", { status: 200 })
}
