import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@sonojs/ui/components/avatar"
import { VerifiedBadge } from "@sonojs/ui/components/verified-badge"

export function VerifiedBadgeProfile() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex items-center gap-3">
        <Avatar size="lg">
          <AvatarImage src="/images/docs/01.webp" alt="Maya Chen" />
          <AvatarFallback>MC</AvatarFallback>
        </Avatar>
        <div className="min-w-0 text-start">
          <div className="flex items-center gap-1.5">
            <p className="truncate text-sm font-semibold text-foreground">
              Maya Chen
            </p>
            <VerifiedBadge size="sm" title="Verified creator" />
          </div>
          <p className="truncate text-sm text-muted-foreground">@mayachen</p>
        </div>
      </div>
    </div>
  )
}
