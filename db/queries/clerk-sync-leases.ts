import "server-only"

import { and, eq, lt, or, sql } from "drizzle-orm"

import { db } from "@/db"
import { LostClerkLeaseError, wrapDbError } from "@/db/errors"
import { clerkSyncLeases } from "@/db/schema"

const DEFAULT_LOCK_MS = 30_000

export type LeaseAcquireResult =
  | { acquired: true; fence: number; holderToken: string }
  | { acquired: false }

/** Mark that Clerk metadata should be refreshed for this user. */
export async function requestClerkSync(clerkUserId: string): Promise<void> {
  try {
    await db
      .insert(clerkSyncLeases)
      .values({
        clerkUserId,
        pending: true,
        fence: 0,
      })
      .onConflictDoUpdate({
        target: clerkSyncLeases.clerkUserId,
        set: {
          pending: true,
          updatedAt: new Date(),
        },
      })
  } catch (err) {
    wrapDbError("Failed to request Clerk sync", err)
  }
}

/**
 * Acquire exclusive sync lease. Does NOT clear pending (preserves concurrent requests).
 */
export async function acquireClerkSyncLease(
  clerkUserId: string,
  options?: { lockMs?: number }
): Promise<LeaseAcquireResult> {
  const lockMs = options?.lockMs ?? DEFAULT_LOCK_MS
  const holderToken = crypto.randomUUID()
  const lockedUntil = new Date(Date.now() + lockMs)
  const now = new Date()

  try {
    await db
      .insert(clerkSyncLeases)
      .values({
        clerkUserId,
        pending: true,
        fence: 0,
      })
      .onConflictDoNothing({ target: clerkSyncLeases.clerkUserId })

    const rows = await db
      .update(clerkSyncLeases)
      .set({
        fence: sql`${clerkSyncLeases.fence} + 1`,
        holderToken,
        lockedUntil,
        updatedAt: now,
        // pending intentionally untouched — cleared only after successful sync
      })
      .where(
        and(
          eq(clerkSyncLeases.clerkUserId, clerkUserId),
          or(
            sql`${clerkSyncLeases.holderToken} is null`,
            lt(clerkSyncLeases.lockedUntil, now),
            sql`${clerkSyncLeases.lockedUntil} is null`
          )
        )
      )
      .returning()

    const row = rows[0]
    if (!row) return { acquired: false }
    return {
      acquired: true,
      fence: Number(row.fence),
      holderToken: row.holderToken!,
    }
  } catch (err) {
    wrapDbError("Failed to acquire Clerk sync lease", err)
  }
}

/**
 * Atomic lease validation + renewal. Must succeed before writing Clerk metadata.
 */
export async function renewClerkSyncLease(
  clerkUserId: string,
  fence: number,
  holderToken: string,
  options?: { lockMs?: number }
): Promise<void> {
  const lockMs = options?.lockMs ?? DEFAULT_LOCK_MS
  const lockedUntil = new Date(Date.now() + lockMs)

  try {
    const rows = await db
      .update(clerkSyncLeases)
      .set({
        lockedUntil,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(clerkSyncLeases.clerkUserId, clerkUserId),
          eq(clerkSyncLeases.fence, fence),
          eq(clerkSyncLeases.holderToken, holderToken)
        )
      )
      .returning({ clerkUserId: clerkSyncLeases.clerkUserId })

    if (rows.length === 0) {
      throw new LostClerkLeaseError()
    }
  } catch (err) {
    if (err instanceof LostClerkLeaseError) throw err
    wrapDbError("Failed to renew Clerk sync lease", err)
  }
}

/**
 * Clear pending only while still holding the lease (after a successful Clerk write).
 * Stores lastSyncedFingerprint so recovery can detect drift.
 */
export async function clearClerkSyncPendingIfHolder(
  clerkUserId: string,
  fence: number,
  holderToken: string,
  fingerprint?: string
): Promise<boolean> {
  try {
    const rows = await db
      .update(clerkSyncLeases)
      .set({
        pending: false,
        ...(fingerprint !== undefined
          ? { lastSyncedFingerprint: fingerprint }
          : {}),
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(clerkSyncLeases.clerkUserId, clerkUserId),
          eq(clerkSyncLeases.fence, fence),
          eq(clerkSyncLeases.holderToken, holderToken)
        )
      )
      .returning({ clerkUserId: clerkSyncLeases.clerkUserId })
    return rows.length > 0
  } catch (err) {
    wrapDbError("Failed to clear Clerk sync pending", err)
  }
}

/**
 * Release lease if still the fence holder.
 * Returns whether another sync is pending (caller should loop).
 */
export async function releaseClerkSyncLease(
  clerkUserId: string,
  fence: number,
  holderToken: string
): Promise<{ released: boolean; pending: boolean }> {
  try {
    const rows = await db
      .update(clerkSyncLeases)
      .set({
        holderToken: null,
        lockedUntil: null,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(clerkSyncLeases.clerkUserId, clerkUserId),
          eq(clerkSyncLeases.fence, fence),
          eq(clerkSyncLeases.holderToken, holderToken)
        )
      )
      .returning()

    if (rows.length === 0) {
      return { released: false, pending: false }
    }

    const current = await db.query.clerkSyncLeases.findFirst({
      where: eq(clerkSyncLeases.clerkUserId, clerkUserId),
    })
    return { released: true, pending: current?.pending ?? false }
  } catch (err) {
    wrapDbError("Failed to release Clerk sync lease", err)
  }
}
