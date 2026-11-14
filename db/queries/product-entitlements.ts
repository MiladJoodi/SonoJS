import "server-only"

import { and, desc, eq, isNull } from "drizzle-orm"

import { db } from "@/db"
import { wrapDbError } from "@/db/errors"
import {
  productEntitlements,
  type ProductEntitlement,
  type ProductEntitlementSource,
} from "@/db/schema"
import type { ProductLibraryItem } from "@/lib/product-library-types"
import { getTemplateProject } from "@/lib/templates-catalog"
import {
  catalogHrefForProject,
  templateCoverSrc,
} from "@/lib/templates-preview-data"

export type { ProductLibraryItem }

export function toProductLibraryItem(
  row: ProductEntitlement
): ProductLibraryItem {
  const project = getTemplateProject(row.productSlug)
  return {
    slug: row.productSlug,
    title: project?.title ?? row.productSlug,
    tagline: project?.tagline ?? "",
    href: project
      ? catalogHrefForProject(project)
      : `/templates/${row.productSlug}`,
    coverSrc: project ? templateCoverSrc(project) : "",
    source: row.source,
    amountCents: row.amountCents,
    createdAt: row.createdAt.toISOString(),
  }
}

export async function userOwnsProductSlug(
  clerkUserId: string,
  productSlug: string
): Promise<boolean> {
  const clerkId = clerkUserId.trim()
  const slug = productSlug.trim()
  if (!clerkId || !slug) return false

  try {
    const [row] = await db
      .select({ id: productEntitlements.id })
      .from(productEntitlements)
      .where(
        and(
          eq(productEntitlements.clerkUserId, clerkId),
          eq(productEntitlements.productSlug, slug),
          isNull(productEntitlements.revokedAt)
        )
      )
      .limit(1)
    return Boolean(row)
  } catch (err) {
    wrapDbError("Failed to check product entitlement", err)
  }
}

export async function listActiveProductEntitlementsByClerkId(
  clerkUserId: string,
  options?: { limit?: number }
): Promise<ProductEntitlement[]> {
  const clerkId = clerkUserId.trim()
  if (!clerkId) return []
  const lim = Math.min(Math.max(options?.limit ?? 100, 1), 200)

  try {
    return await db
      .select()
      .from(productEntitlements)
      .where(
        and(
          eq(productEntitlements.clerkUserId, clerkId),
          isNull(productEntitlements.revokedAt)
        )
      )
      .orderBy(desc(productEntitlements.createdAt))
      .limit(lim)
  } catch (err) {
    wrapDbError("Failed to list product entitlements", err)
  }
}

export async function listProductLibraryByClerkId(
  clerkUserId: string,
  options?: { limit?: number }
): Promise<ProductLibraryItem[]> {
  const rows = await listActiveProductEntitlementsByClerkId(
    clerkUserId,
    options
  )
  return rows.map(toProductLibraryItem)
}

export type GrantProductEntitlementInput = {
  userId: string
  clerkUserId: string
  productSlug: string
  source: ProductEntitlementSource
  stripeCheckoutSessionId?: string | null
  amountCents?: number | null
}

/**
 * Idempotent grant: same user+slug reactivates a revoked row or no-ops if active.
 * Stripe session id is unique when provided (Phase 3 webhook safety).
 */
export async function grantProductEntitlement(
  input: GrantProductEntitlementInput
): Promise<ProductEntitlement> {
  const userId = input.userId.trim()
  const clerkUserId = input.clerkUserId.trim()
  const productSlug = input.productSlug.trim()
  if (!userId || !clerkUserId || !productSlug) {
    throw new Error("userId, clerkUserId, and productSlug are required")
  }
  if (input.source !== "purchase" && input.source !== "admin_grant") {
    throw new Error("Invalid product entitlement source")
  }

  const stripeCheckoutSessionId =
    input.stripeCheckoutSessionId?.trim() || null
  const amountCents =
    typeof input.amountCents === "number" && Number.isFinite(input.amountCents)
      ? Math.max(0, Math.floor(input.amountCents))
      : null

  try {
    const now = new Date()
    const [row] = await db
      .insert(productEntitlements)
      .values({
        userId,
        clerkUserId,
        productSlug,
        source: input.source,
        stripeCheckoutSessionId,
        amountCents,
        revokedAt: null,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: [productEntitlements.userId, productEntitlements.productSlug],
        set: {
          clerkUserId,
          source: input.source,
          ...(stripeCheckoutSessionId
            ? { stripeCheckoutSessionId }
            : {}),
          ...(amountCents !== null ? { amountCents } : {}),
          revokedAt: null,
          updatedAt: now,
        },
      })
      .returning()

    if (!row) {
      throw new Error("Failed to grant product entitlement")
    }
    return row
  } catch (err) {
    wrapDbError("Failed to grant product entitlement", err)
  }
}

export async function revokeProductEntitlement(input: {
  clerkUserId: string
  productSlug: string
}): Promise<boolean> {
  const clerkUserId = input.clerkUserId.trim()
  const productSlug = input.productSlug.trim()
  if (!clerkUserId || !productSlug) return false

  try {
    const rows = await db
      .update(productEntitlements)
      .set({
        revokedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(productEntitlements.clerkUserId, clerkUserId),
          eq(productEntitlements.productSlug, productSlug),
          isNull(productEntitlements.revokedAt)
        )
      )
      .returning({ id: productEntitlements.id })
    return rows.length > 0
  } catch (err) {
    wrapDbError("Failed to revoke product entitlement", err)
  }
}
