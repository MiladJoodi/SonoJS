/** Pure merge helper — preserves unrelated Clerk publicMetadata keys. */
export function mergePlanPublicMetadata(
  existing: Record<string, unknown> | null | undefined,
  planFields: {
    plan: "free" | "pro"
    planExpiresAt: string | null
    planInterval: "monthly" | "yearly" | null
  }
): Record<string, unknown> {
  const base =
    existing && typeof existing === "object" && !Array.isArray(existing)
      ? { ...existing }
      : {}
  return {
    ...base,
    plan: planFields.plan,
    planExpiresAt: planFields.planExpiresAt,
    planInterval: planFields.planInterval,
  }
}
