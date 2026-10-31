import "server-only"

import { auth, clerkClient } from "@clerk/nextjs/server"
import { headers as nextHeaders } from "next/headers"

/**
 * `auth()` requires Clerk middleware headers (`x-clerk-auth-status`).
 * On Next.js 16 `proxy.ts` those headers sometimes never reach RSC even
 * though the proxy ran — auth() then throws.
 *
 * Fall back to authenticating the Cookie header directly so pages stay up.
 */
export async function getAuthUserId(): Promise<string | null> {
  try {
    const { userId } = await auth()
    return userId
  } catch (err) {
    if (
      !(err instanceof Error) ||
      !err.message.includes("clerkMiddleware")
    ) {
      throw err
    }
  }

  try {
    const headerList = await nextHeaders()
    const cookie = headerList.get("cookie")
    if (!cookie) return null

    const client = await clerkClient()
    const request = new Request("https://clerk.sonojs.local/", {
      headers: { cookie },
    })
    const state = await client.authenticateRequest(request)
    if (state.status !== "signed-in") return null
    return state.toAuth().userId ?? null
  } catch (err) {
    // Static/prerender contexts may reject headers()/cookies — treat as guest.
    console.error("getAuthUserId: cookie fallback failed", err)
    return null
  }
}
