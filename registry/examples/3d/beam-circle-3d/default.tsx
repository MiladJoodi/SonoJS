"use client"

import {
  BeamCircle3D,
  NextjsIcon,
  ReactIcon,
  TailwindIcon,
  TypescriptIcon,
  type BeamOrbitConfig,
} from "@sonojs/ui/components/3d/beam-circle-3d"

const orbits: BeamOrbitConfig[] = [
  {
    id: 0,
    radiusFactor: 0.18,
    speed: 7,
    direction: "cw",
    orbitColor: "rgba(37, 99, 235, 0.45)",
    boxColor: "var(--card)",
    glowColor: "#93C5FD",
    size: 40,
    delay: 0,
    children: <ReactIcon size={34} />,
  },
  {
    id: 1,
    radiusFactor: 0.26,
    speed: 12,
    direction: "ccw",
    orbitColor: "rgba(57, 110, 240, 0.4)",
    boxColor: "var(--card)",
    glowColor: "#BFDBFE",
    size: 44,
    delay: 0.35,
    children: <TypescriptIcon size={38} />,
  },
  {
    id: 2,
    radiusFactor: 0.34,
    speed: 18,
    direction: "cw",
    orbitColor: "rgba(96, 165, 250, 0.35)",
    boxColor: "var(--card)",
    glowColor: "#DBEAFE",
    size: 48,
    delay: 0.7,
    children: <TailwindIcon size={42} />,
  },
]

export function BeamCircle3DDefault() {
  return (
    <div className="w-full self-end">
      <BeamCircle3D
        className="aspect-[8/3] w-full"
        mode="semi-circle"
        viewBoxHeight={300}
        orbits={orbits}
        centerGlow
        centerNodeSize={48}
        centerContent={<NextjsIcon size={44} />}
      />
    </div>
  )
}
