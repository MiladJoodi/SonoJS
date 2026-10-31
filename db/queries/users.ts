import "server-only"

import { and, eq, sql } from "drizzle-orm"

import { db } from "@/db"
import { BillingIdentityConflictError, wrapDbError } from "@/db/errors"
import { users, type NewUser, type User } from "@/db/schema"

export async function getUserByClerkId(
  clerkUserId: string
): Promise<User | null> {
  try {
    const row = await db.query.users.findFirst({
      where: eq(users.clerkUserId, clerkUserId),
    })
    return row ?? null
  } catch (err) {
    wrapDbError("Failed to get user by Clerk id", err)
  }
}

export async function getUserByStripeCustomerId(
  stripeCustomerId: string
): Promise<User | null> {
  try {
    const row = await db.query.users.findFirst({
      where: eq(users.stripeCustomerId, stripeCustomerId),
    })
    return row ?? null
  } catch (err) {
    wrapDbError("Failed to get user by Stripe customer id", err)
  }
}

export async function upsertUserFromClerk(input: {
  clerkUserId: string
  email?: string | null
}): Promise<User> {
  try {
    const existing = await getUserByClerkId(input.clerkUserId)
    if (existing) {
      if (input.email && input.email !== existing.email) {
        const [updated] = await db
          .update(users)
          .set({
            email: input.email,
            updatedAt: new Date(),
          })
          .where(eq(users.id, existing.id))
          .returning()
        return updated ?? existing
      }
      return existing
    }

    const values: NewUser = {
      clerkUserId: input.clerkUserId,
      email: input.email ?? null,
    }
    const [created] = await db.insert(users).values(values).returning()
    if (!created) throw new Error("Insert returned no user")
    return created
  } catch (err) {
    wrapDbError("Failed to upsert user from Clerk", err)
  }
}

/**
 * Link Stripe customer → Clerk user.
 * Never silently overwrites an existing mapping; conflicts throw
 * BillingIdentityConflictError for manual investigation.
 */
export async function linkStripeCustomerToClerkUser(input: {
  clerkUserId: string
  stripeCustomerId: string
}): Promise<User> {
  const customerId = input.stripeCustomerId.trim()
  const clerkUserId = input.clerkUserId.trim()
  if (!customerId || !clerkUserId) {
    throw new Error("clerkUserId and stripeCustomerId are required")
  }

  try {
    const user = await upsertUserFromClerk({ clerkUserId })

    if (user.stripeCustomerId === customerId) {
      return user
    }

    if (
      user.stripeCustomerId &&
      user.stripeCustomerId !== customerId
    ) {
      throw new BillingIdentityConflictError(
        `Clerk user ${clerkUserId} already linked to a different Stripe customer`
      )
    }

    const owner = await getUserByStripeCustomerId(customerId)
    if (owner && owner.clerkUserId !== clerkUserId) {
      throw new BillingIdentityConflictError(
        `Stripe customer ${customerId} already linked to a different Clerk user`
      )
    }

    const [updated] = await db
      .update(users)
      .set({
        stripeCustomerId: customerId,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(users.id, user.id),
          // CAS: still unlinked (or already this customer)
          sql`(${users.stripeCustomerId} is null or ${users.stripeCustomerId} = ${customerId})`
        )
      )
      .returning()

    if (!updated) {
      throw new BillingIdentityConflictError(
        `Failed to link Stripe customer ${customerId} — concurrent mapping conflict`
      )
    }

    // Re-check unique owner (race with another clerk user)
    const again = await getUserByStripeCustomerId(customerId)
    if (again && again.clerkUserId !== clerkUserId) {
      throw new BillingIdentityConflictError(
        `Stripe customer ${customerId} mapping conflict after update`
      )
    }

    return updated
  } catch (err) {
    if (err instanceof BillingIdentityConflictError) throw err
    wrapDbError("Failed to link Stripe customer to Clerk user", err)
  }
}

/**
 * @deprecated Prefer linkStripeCustomerToClerkUser for conflict-safe linking.
 * Still used only when caller already resolved the user row id and accepts
 * overwriting that row's customer id — kept for internal/test seed paths.
 */
export async function setUserStripeCustomerId(
  userId: string,
  stripeCustomerId: string
): Promise<User> {
  try {
    const customerId = stripeCustomerId.trim()
    const existing = await db.query.users.findFirst({
      where: eq(users.id, userId),
    })
    if (!existing) throw new Error("User not found")

    if (existing.stripeCustomerId === customerId) return existing

    if (
      existing.stripeCustomerId &&
      existing.stripeCustomerId !== customerId
    ) {
      throw new BillingIdentityConflictError(
        `User already linked to a different Stripe customer`
      )
    }

    const owner = await getUserByStripeCustomerId(customerId)
    if (owner && owner.id !== userId) {
      throw new BillingIdentityConflictError(
        `Stripe customer already linked to a different user`
      )
    }

    const [updated] = await db
      .update(users)
      .set({
        stripeCustomerId: customerId,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(users.id, userId),
          sql`(${users.stripeCustomerId} is null or ${users.stripeCustomerId} = ${customerId})`,
          // Ensure no other user stole the customer id
          sql`not exists (
            select 1 from users u2
            where u2.stripe_customer_id = ${customerId}
              and u2.id <> ${userId}::uuid
          )`
        )
      )
      .returning()

    if (!updated) {
      throw new BillingIdentityConflictError(
        "Failed to set Stripe customer id — identity conflict"
      )
    }
    return updated
  } catch (err) {
    if (err instanceof BillingIdentityConflictError) throw err
    wrapDbError("Failed to set Stripe customer id", err)
  }
}

/**
 * Resolve Neon user from Stripe customer and/or Clerk id.
 * Returns null when the Stripe customer is unknown and no clerkUserId was
 * supplied (unlinked fixture / CLI event) — callers must not invent a user.
 * Identity conflicts still throw BillingIdentityConflictError.
 */
export async function resolveBillingUser(input: {
  stripeCustomerId?: string | null
  clerkUserId?: string | null
}): Promise<User | null> {
  const customerId = input.stripeCustomerId?.trim() || null
  const clerkUserId = input.clerkUserId?.trim() || null

  try {
    if (customerId) {
      const byCustomer = await getUserByStripeCustomerId(customerId)
      if (byCustomer) {
        if (clerkUserId && byCustomer.clerkUserId !== clerkUserId) {
          throw new BillingIdentityConflictError(
            `Stripe customer ${customerId} is linked to a different Clerk user`
          )
        }
        return byCustomer
      }
    }

    if (clerkUserId) {
      const byClerk = await upsertUserFromClerk({ clerkUserId })
      if (
        customerId &&
        byClerk.stripeCustomerId &&
        byClerk.stripeCustomerId !== customerId
      ) {
        throw new BillingIdentityConflictError(
          `Clerk user ${clerkUserId} is linked to a different Stripe customer`
        )
      }
      if (customerId && !byClerk.stripeCustomerId) {
        return linkStripeCustomerToClerkUser({
          clerkUserId,
          stripeCustomerId: customerId,
        })
      }
      return byClerk
    }

    // Unlinked: customer missing/unknown and no Clerk id to attach
    return null
  } catch (err) {
    if (err instanceof BillingIdentityConflictError) throw err
    wrapDbError("Failed to resolve billing user", err)
  }
}
