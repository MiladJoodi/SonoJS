import { Badge } from "@sonojs/ui/components/badge"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@sonojs/ui/components/item"
import { VerifiedBadge } from "@sonojs/ui/components/verified-badge"

export function VerifiedBadgeTrust() {
  return (
    <div className="mx-auto w-full max-w-md space-y-4">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge variant="secondary" className="gap-1.5">
          <VerifiedBadge size="sm" />
          Verified account
        </Badge>
        <Badge variant="outline" className="gap-1.5">
          <VerifiedBadge variant="gold" size="sm" />
          Business
        </Badge>
      </div>

      <ItemGroup className="gap-2">
        <Item variant="outline" className="px-3 py-2.5">
          <ItemMedia>
            <VerifiedBadge size="md" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Identity verified</ItemTitle>
            <ItemDescription>
              Government ID checked — trust strip for checkout or onboarding.
            </ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
    </div>
  )
}
