import { VerifiedBadge } from "@sonojs/ui/components/verified-badge"

export function VerifiedBadgeDefault() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      <VerifiedBadge size="sm" />
      <VerifiedBadge size="md" />
      <VerifiedBadge size="lg" />
      <VerifiedBadge variant="gold" size="lg" />
      <VerifiedBadge variant="gray" size="lg" />
    </div>
  )
}
