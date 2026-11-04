"use client"

import {
  BeamCircle,
  NextjsIcon,
  ReactIcon,
  TailwindIcon,
  TypescriptIcon,
  type OrbitConfig,
} from "@sonojs/ui/components/3d/beam-circle"

const orbits: OrbitConfig[] = [
  {
    id: 1,
    radiusFactor: 0.25,
    speed: 6,
    icon: <ReactIcon />,
    iconSize: 24,
  },
  {
    id: 2,
    radiusFactor: 0.55,
    speed: 14,
    icon: <TypescriptIcon />,
    iconSize: 28,
  },
  {
    id: 3,
    radiusFactor: 0.8,
    speed: 10,
    icon: <TailwindIcon />,
    iconSize: 28,
  },
  {
    id: 4,
    radiusFactor: 1.05,
    speed: 7,
    icon: <NextjsIcon />,
    iconSize: 36,
    orbitColor: "color-mix(in oklab, var(--primary) 40%, transparent)",
    orbitThickness: 2,
  },
]

export function BeamCircleDefault() {
  return (
    <div className="flex w-full justify-center">
      <BeamCircle
        size={280}
        orbits={orbits}
        centerIcon={<NextjsIcon size={22} />}
      />
    </div>
  )
}
