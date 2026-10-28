import { RainbowButton } from "@sonojs/ui/components/rainbow-button"

export function RainbowButtonDefault() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <RainbowButton>Default</RainbowButton>
      <RainbowButton variant="white">White</RainbowButton>
      <RainbowButton variant="theme">Theme</RainbowButton>
      <RainbowButton variant="outline">Outline</RainbowButton>
    </div>
  )
}
