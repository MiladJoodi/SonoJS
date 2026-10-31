import "server-only"

import { eq } from "drizzle-orm"

import { db } from "@/db"
import { wrapDbError } from "@/db/errors"
import { plans, type Plan } from "@/db/schema"

export async function listActivePlans(): Promise<Plan[]> {
  try {
    return await db.query.plans.findMany({
      where: eq(plans.active, true),
      orderBy: (p, { asc }) => [asc(p.slug)],
    })
  } catch (err) {
    wrapDbError("Failed to list active plans", err)
  }
}

export async function getPlanBySlug(slug: string): Promise<Plan | null> {
  try {
    const row = await db.query.plans.findFirst({
      where: eq(plans.slug, slug),
    })
    return row ?? null
  } catch (err) {
    wrapDbError("Failed to get plan by slug", err)
  }
}

export async function getPlanById(id: string): Promise<Plan | null> {
  try {
    const row = await db.query.plans.findFirst({
      where: eq(plans.id, id),
    })
    return row ?? null
  } catch (err) {
    wrapDbError("Failed to get plan by id", err)
  }
}
