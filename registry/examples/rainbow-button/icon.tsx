import { CrownIcon } from "lucide-react"

import { RainbowButton } from "@sonojs/ui/components/rainbow-button"

export function RainbowButtonIcon() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <RainbowButton>
        <CrownIcon data-icon="inline-start" aria-hidden />
        VIP Access
      </RainbowButton>
      <RainbowButton variant="white">
        <CrownIcon data-icon="inline-start" aria-hidden />
        VIP Access
      </RainbowButton>
      <RainbowButton variant="theme">
        <CrownIcon data-icon="inline-start" aria-hidden />
        VIP Access
      </RainbowButton>
    </div>
  )
}
