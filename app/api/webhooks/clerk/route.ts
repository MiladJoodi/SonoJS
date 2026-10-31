import { clerkClient } from "@clerk/nextjs/server"
import { verifyWebhook } from "@clerk/nextjs/webhooks"

/**
 * Clerk → user.created: default new accounts to Free (no expiry).
 * Admins can later set `plan: "pro"` + `planExpiresAt` (ISO) in Dashboard.
 */
export async function POST(req: Request) {
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
  }

  return new Response("ok", { status: 200 })
}
