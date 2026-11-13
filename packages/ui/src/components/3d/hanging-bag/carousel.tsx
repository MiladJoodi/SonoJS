"use client"

import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useMemo, useRef } from "react"
import * as THREE from "three"

import { createCardTexture } from "./card-texture"
import { HangingBagMesh } from "./hanging-bag-mesh"
import type { HangingBagItem } from "./projects"
import { RackRail } from "./rack-geometry"

type Props = {
  items: HangingBagItem[]
}

export function Carousel({ items }: Props) {
  const rotation = useRef(0)
  const velocity = useRef(0)
  const auto = useRef(0.14)
  const { camera, controls, gl } = useThree()

  const textures = useMemo(() => {
    const maxA = gl.capabilities.getMaxAnisotropy()
    return items.map((p) => {
      try {
        const tex = createCardTexture(p)
        tex.anisotropy = Math.min(16, maxA)
        return tex
      } catch {
        return new THREE.CanvasTexture(document.createElement("canvas"))
      }
    })
  }, [gl, items])

  useEffect(() => {
    return () => {
      textures.forEach((t) => t.dispose())
    }
  }, [textures])

  useEffect(() => {
    const el = gl.domElement
    const onWheel = (e: WheelEvent) => {
      // Only when the pointer is over this canvas — never steal page scroll.
      e.preventDefault()
      e.stopPropagation()

      if (e.ctrlKey || e.metaKey) {
        const target =
          controls && "target" in controls
            ? (controls as unknown as { target: THREE.Vector3 }).target
            : new THREE.Vector3(0, 1.5, 0)
        const dir = new THREE.Vector3().subVectors(camera.position, target)
        const factor = Math.exp(e.deltaY * 0.0012)
        dir.multiplyScalar(factor)
        const next = target.clone().add(dir)
        const dist = next.distanceTo(target)
        if (dist > 3.2 && dist < 14) camera.position.copy(next)
        return
      }

      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      velocity.current += delta * 0.00065
      auto.current = 0.04
    }

    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [camera, controls, gl])

  useFrame((_, delta) => {
    rotation.current += velocity.current
    velocity.current *= 0.94
    rotation.current += auto.current * delta
    auto.current = THREE.MathUtils.lerp(auto.current, 0.14, delta * 0.1)
  })

  return (
    <group>
      <RackRail />
      {items.map((project, index) => (
        <HangingBagMesh
          key={project.id}
          project={project}
          texture={textures[index]!}
          index={index}
          total={items.length}
          rotationRef={rotation}
        />
      ))}
    </group>
  )
}
