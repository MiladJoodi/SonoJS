import { VerifiedBadge } from "@sonojs/ui/components/verified-badge"

export function VerifiedBadgeVariants() {
  return (
    <div className="flex w-full flex-wrap items-end justify-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <VerifiedBadge variant="blue" size="lg" />
        <span className="text-xs text-muted-foreground">blue · Premium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <VerifiedBadge variant="gold" size="lg" />
        <span className="text-xs text-muted-foreground">gold · Business</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <VerifiedBadge variant="gray" size="lg" />
        <span className="text-xs text-muted-foreground">gray · Government</span>
      </div>
    </div>
  )
}
