"use client"

import { useMemo } from "react"

import { getHangerGeometry, HANGER_BAR_Y } from "./hanger-geometry"
import { ellipsePoint, makeEllipseTube, RACK_Y } from "./track"

function Steel({ color = "#9aa5b4" }: { color?: string }) {
  return (
    <meshPhysicalMaterial
      color={color}
      metalness={1}
      roughness={0.1}
      clearcoat={1}
      clearcoatRoughness={0.06}
      envMapIntensity={2.8}
    />
  )
}

export function RackRail() {
  const topRail = useMemo(() => makeEllipseTube(0.062, 0.03), [])
  const blackTrack = useMemo(() => makeEllipseTube(0.046, -0.042), [])
  const bottomRail = useMemo(() => makeEllipseTube(0.042, -0.105), [])
  const poles = useMemo(
    () => [0.55, 2.15, 3.7, 5.25].map((a) => ellipsePoint(a)),
    []
  )

  return (
    <group position={[0, RACK_Y, 0]}>
      <mesh geometry={topRail} renderOrder={2}>
        <Steel color="#b0b9c6" />
      </mesh>
      <mesh geometry={blackTrack} renderOrder={2}>
        <meshStandardMaterial
          color="#0a0c0f"
          metalness={0.35}
          roughness={0.52}
        />
      </mesh>
      <mesh geometry={bottomRail} renderOrder={2}>
        <Steel color="#b0b9c6" />
      </mesh>

      {poles.map((p, i) => (
        <group key={i} position={[p.x, 0, p.z]}>
          <mesh position={[0, 1.65, 0]}>
            <cylinderGeometry args={[0.022, 0.022, 3.3, 16]} />
            <Steel color="#a8b2c0" />
          </mesh>
          <mesh position={[0, 3.28, 0]}>
            <cylinderGeometry args={[0.055, 0.04, 0.08, 16]} />
            <meshStandardMaterial
              color="#6b7584"
              metalness={0.9}
              roughness={0.25}
            />
          </mesh>
          <mesh position={[0, 0.02, 0]}>
            <boxGeometry args={[0.14, 0.08, 0.1]} />
            <meshStandardMaterial
              color="#0a0c0f"
              metalness={0.45}
              roughness={0.42}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export function WireHanger() {
  const geometry = useMemo(() => getHangerGeometry(), [])

  return (
    <group>
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[0.105, 0.072, 0.085]} />
        <meshStandardMaterial
          color="#080a0d"
          metalness={0.4}
          roughness={0.48}
        />
      </mesh>
      <mesh position={[0, 0.018, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.01, 0.01, 0.055, 12]} />
        <meshStandardMaterial
          color="#1a1f27"
          metalness={0.75}
          roughness={0.32}
        />
      </mesh>

      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          color="#7a8492"
          metalness={1}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={3}
        />
      </mesh>
    </group>
  )
}

export { HANGER_BAR_Y }
