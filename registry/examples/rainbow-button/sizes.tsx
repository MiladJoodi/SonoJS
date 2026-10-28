import { RainbowButton } from "@sonojs/ui/components/rainbow-button"

export function RainbowButtonSizes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <RainbowButton size="xs">XS</RainbowButton>
      <RainbowButton size="sm">SM</RainbowButton>
      <RainbowButton size="default">Default</RainbowButton>
      <RainbowButton size="lg">LG</RainbowButton>
    </div>
  )
}
