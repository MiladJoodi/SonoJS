import { FluidOrb } from "@sonojs/ui/components/fluid-orb"

export function FluidOrbDefault() {
  return (
    <div className="flex w-full items-center justify-center py-8">
      <FluidOrb size={160} aria-hidden />
    </div>
  )
}
