import { FluidOrb } from "@sonojs/ui/components/fluid-orb"

export function FluidOrbSize() {
  return (
    <div className="flex w-full flex-wrap items-end justify-center gap-8 py-8">
      <FluidOrb size={64} aria-hidden />
      <FluidOrb size={120} aria-hidden />
      <FluidOrb size={180} aria-hidden />
    </div>
  )
}
