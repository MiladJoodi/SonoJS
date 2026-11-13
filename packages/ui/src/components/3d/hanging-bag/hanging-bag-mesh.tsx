"use client"

import { useFrame } from "@react-three/fiber"
import { useMemo, useRef, type MutableRefObject } from "react"
import * as THREE from "three"

import { WireHanger, HANGER_BAR_Y } from "./rack-geometry"
import type { HangingBagItem } from "./projects"
import { ellipsePoint, RACK_Y } from "./track"

const CARD_W = 0.72
const CARD_H = 1.0
const CARD_D = 0.018

type Props = {
  project: HangingBagItem
  texture: THREE.Texture
  index: number
  total: number
  rotationRef: MutableRefObject<number>
}

export function HangingBagMesh({
  project,
  texture,
  index,
  total,
  rotationRef,
}: Props) {
  const groupRef = useRef<THREE.Group>(null)
  const cardRef = useRef<THREE.Mesh>(null)
  const baseAngle = useMemo(
    () => (index / total) * Math.PI * 2 + Math.PI / 2,
    [index, total]
  )

  const materials = useMemo(() => {
    const side = new THREE.MeshStandardMaterial({
      color: project.color,
      roughness: 0.88,
      metalness: 0,
      depthTest: true,
      depthWrite: true,
      transparent: false,
      polygonOffset: true,
      polygonOffsetFactor: 2,
      polygonOffsetUnits: 2,
    })
    const face = new THREE.MeshBasicMaterial({
      map: texture,
      depthTest: true,
      depthWrite: true,
      transparent: false,
      toneMapped: false,
      polygonOffset: true,
      polygonOffsetFactor: 2,
      polygonOffsetUnits: 2,
    })
    return [side, side, side, side, face, side]
  }, [project.color, texture])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const angle = baseAngle + rotationRef.current
    const p = ellipsePoint(angle)
    groupRef.current.position.set(p.x, RACK_Y, p.z)

    groupRef.current.rotation.order = "YXZ"
    groupRef.current.rotation.y = Math.PI / 2 - angle

    const t = clock.elapsedTime
    groupRef.current.rotation.z = Math.sin(t * 1.05 + index * 1.6) * 0.028
    groupRef.current.rotation.x = 0.015 + Math.sin(t * 0.7 + index) * 0.008

    if (cardRef.current) {
      const frontness = Math.cos(angle - Math.PI / 2)
      const dim = THREE.MathUtils.clamp(1 - (frontness + 1) * 0.5, 0, 1)
      cardRef.current.scale.setScalar(1 - dim * 0.05)
    }
  })

  const initial = ellipsePoint(baseAngle)
  const bagY = HANGER_BAR_Y - CARD_H * 0.5 - 0.05

  return (
    <group
      ref={groupRef}
      position={[initial.x, RACK_Y, initial.z]}
      rotation={[0.015, Math.PI / 2 - baseAngle, 0]}
    >
      <WireHanger />

      <mesh ref={cardRef} position={[0, bagY, -0.1]} material={materials}>
        <boxGeometry args={[CARD_W, CARD_H, CARD_D]} />
      </mesh>

      <mesh position={[0, HANGER_BAR_Y - 0.02, -0.04]}>
        <boxGeometry args={[CARD_W * 0.65, 0.022, 0.032]} />
        <meshStandardMaterial
          color="#c5ceda"
          roughness={0.4}
          metalness={0.15}
        />
      </mesh>
    </group>
  )
}
