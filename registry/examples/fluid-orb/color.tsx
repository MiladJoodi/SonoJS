import { FluidOrb } from "@sonojs/ui/components/fluid-orb"

export function FluidOrbColor() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-8 py-8">
      <FluidOrb size={120} color="#1A73F2" aria-hidden />
      <FluidOrb size={120} color="#7C3AED" aria-hidden />
      <FluidOrb size={120} color="#059669" aria-hidden />
      <FluidOrb size={120} color="#EA580C" aria-hidden />
    </div>
  )
}
