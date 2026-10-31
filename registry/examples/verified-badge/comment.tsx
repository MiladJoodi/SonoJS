import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@sonojs/ui/components/avatar"
import { VerifiedBadge } from "@sonojs/ui/components/verified-badge"

export function VerifiedBadgeComment() {
  return (
    <div className="mx-auto flex w-full max-w-sm items-start gap-3 text-start">
      <Avatar size="sm">
        <AvatarImage src="/images/docs/02.webp" alt="Jordan Lee" />
        <AvatarFallback>JL</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1 rounded-2xl bg-muted/50 px-3 py-2">
        <div className="flex flex-wrap items-center gap-1">
          <span className="text-sm font-medium text-foreground">jordanlee</span>
          <VerifiedBadge size="sm" />
          <span className="text-xs text-muted-foreground">2h</span>
        </div>
        <p className="mt-0.5 text-sm leading-relaxed text-foreground/90">
          This layout finally feels right on mobile — love the spacing.
        </p>
      </div>
    </div>
  )
}
