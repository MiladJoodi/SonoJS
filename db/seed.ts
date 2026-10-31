import { config } from "dotenv"
import { eq } from "drizzle-orm"

config({ path: ".env.local" })

import { createDb } from "./client"
import { plans } from "./schema"

const SEED_PLANS = [
  {
    slug: "pro-monthly",
    name: "Pro Monthly",
    interval: "month" as const,
    stripeProductId: null,
    stripePriceId: null,
    amountCents: 0,
    currency: "usd",
    active: true,
  },
  {
    slug: "pro-yearly",
    name: "Pro Yearly",
    interval: "year" as const,
    stripeProductId: null,
    stripePriceId: null,
    amountCents: 0,
    currency: "usd",
    active: true,
  },
]

async function main() {
  const db = createDb()

  for (const plan of SEED_PLANS) {
    const existing = await db.query.plans.findFirst({
      where: eq(plans.slug, plan.slug),
    })

    if (existing) {
      await db
        .update(plans)
        .set({
          name: plan.name,
          interval: plan.interval,
          active: plan.active,
          amountCents: plan.amountCents,
          currency: plan.currency,
          updatedAt: new Date(),
          // Do not overwrite Stripe IDs if already set later
        })
        .where(eq(plans.slug, plan.slug))
      console.log(`updated plan: ${plan.slug}`)
      continue
    }

    await db.insert(plans).values(plan)
    console.log(`inserted plan: ${plan.slug}`)
  }

  const all = await db.select().from(plans)
  console.log(
    "plans:",
    all.map((p) => ({ slug: p.slug, interval: p.interval, active: p.active }))
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
