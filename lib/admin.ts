import "server-only"

import { clerkClient } from "@clerk/nextjs/server"

import { getAuthUserId } from "@/lib/clerk-auth"

export class AdminAuthError extends Error {
  readonly status: 401 | 403

  constructor(status: 401 | 403, message: string) {
    super(message)
    this.name = "AdminAuthError"
    this.status = status
  }
}

function parseAdminEmails(): Set<string> {
  const raw = process.env.ADMIN_EMAILS?.trim() ?? ""
  if (!raw) return new Set()
  return new Set(
    raw
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean)
  )
}

export function getPrimaryEmailFromClerkUser(user: {
  primaryEmailAddressId: string | null
  emailAddresses: Array<{ id: string; emailAddress: string }>
}): string | null {
  const primary = user.emailAddresses.find(
    (e) => e.id === user.primaryEmailAddressId
  )
  const raw =
    primary?.emailAddress?.trim() ||
    user.emailAddresses[0]?.emailAddress?.trim() ||
    null
  return raw ? raw.toLowerCase() : null
}

export async function isAdminEmail(email: string | null | undefined): Promise<boolean> {
  if (!email) return false
  return parseAdminEmails().has(email.trim().toLowerCase())
}

/**
 * Require a signed-in Clerk user whose primary email is listed in ADMIN_EMAILS.
 */
export async function requireAdmin(): Promise<{
  clerkUserId: string
  email: string
}> {
  const clerkUserId = await getAuthUserId()
  if (!clerkUserId) {
    throw new AdminAuthError(401, "Unauthorized")
  }

  const admins = parseAdminEmails()
  if (admins.size === 0) {
    throw new AdminAuthError(403, "ADMIN_EMAILS is not configured")
  }

  const client = await clerkClient()
  const user = await client.users.getUser(clerkUserId)
  const email = getPrimaryEmailFromClerkUser(user)
  if (!email || !admins.has(email)) {
    throw new AdminAuthError(403, "Not admin")
  }

  return { clerkUserId, email }
}
