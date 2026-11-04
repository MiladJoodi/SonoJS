"use client"

import * as React from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import {
  Center,
  ContactShadows,
  Environment,
  OrbitControls,
  useFBX,
  useGLTF,
} from "@react-three/drei"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js"
import * as THREE from "three"

import { cn } from "@sonojs/ui/lib/utils"

/** Bundled demo model (Khronos FlightHelmet). Served from /media after install. */
export const DEFAULT_MODEL_URL =
  "/media/3d/model-viewer/FlightHelmet.gltf"

export type ModelViewerEnvironmentPreset =
  | "city"
  | "sunset"
  | "night"
  | "dawn"
  | "studio"
  | "apartment"
  | "forest"
  | "park"
  | "none"

export type ModelViewerProps = {
  /** URL of a `.gltf`, `.glb`, `.fbx`, or `.obj` file. */
  url?: string
  width?: number | string
  height?: number | string
  defaultZoom?: number
  minZoomDistance?: number
  maxZoomDistance?: number
  enableManualRotation?: boolean
  enableManualZoom?: boolean
  ambientIntensity?: number
  keyLightIntensity?: number
  fillLightIntensity?: number
  rimLightIntensity?: number
  environmentPreset?: ModelViewerEnvironmentPreset
  autoRotate?: boolean
  autoRotateSpeed?: number
  onModelLoaded?: () => void
  className?: string
}

const deg2rad = (d: number) => (d * Math.PI) / 180

function enableShadows(root: THREE.Object3D) {
  root.traverse((o) => {
    if ((o as THREE.Mesh).isMesh) {
      o.castShadow = true
      o.receiveShadow = true
    }
  })
}

function extensionOf(url: string) {
  const clean = url.split("?")[0]?.split("#")[0] ?? url
  return clean.split(".").pop()?.toLowerCase() ?? ""
}

function GltfContent({
  url,
  onLoaded,
}: {
  url: string
  onLoaded: () => void
}) {
  const { scene } = useGLTF(url)
  const notified = React.useRef(false)

  React.useLayoutEffect(() => {
    if (!scene || notified.current) return
    enableShadows(scene)
    notified.current = true
    onLoaded()
  }, [scene, onLoaded])

  return <primitive object={scene} />
}

function FbxContent({
  url,
  onLoaded,
}: {
  url: string
  onLoaded: () => void
}) {
  const fbx = useFBX(url)
  const notified = React.useRef(false)

  React.useLayoutEffect(() => {
    if (!fbx || notified.current) return
    enableShadows(fbx)
    notified.current = true
    onLoaded()
  }, [fbx, onLoaded])

  return <primitive object={fbx} />
}

function ObjContent({
  url,
  onLoaded,
}: {
  url: string
  onLoaded: () => void
}) {
  const obj = useLoader(OBJLoader, url)
  const notified = React.useRef(false)

  React.useLayoutEffect(() => {
    if (!obj || notified.current) return
    enableShadows(obj)
    notified.current = true
    onLoaded()
  }, [obj, onLoaded])

  return <primitive object={obj} />
}

function ModelContent({
  url,
  onLoaded,
}: {
  url: string
  onLoaded: () => void
}) {
  const ext = extensionOf(url)

  switch (ext) {
    case "glb":
    case "gltf":
      return <GltfContent url={url} onLoaded={onLoaded} />
    case "fbx":
      return <FbxContent url={url} onLoaded={onLoaded} />
    case "obj":
      return <ObjContent url={url} onLoaded={onLoaded} />
    default:
      return null
  }
}

function SceneContent({
  url,
  autoRotate,
  autoRotateSpeed,
  onLoaded,
}: {
  url: string
  autoRotate?: boolean
  autoRotateSpeed?: number
  onLoaded?: () => void
}) {
  const modelRef = React.useRef<THREE.Group>(null)
  const onLoadedRef = React.useRef(onLoaded)
  React.useEffect(() => {
    onLoadedRef.current = onLoaded
  }, [onLoaded])

  const handleLoaded = React.useCallback(() => {
    onLoadedRef.current?.()
  }, [])

  useFrame((_, delta) => {
    if (!autoRotate || !modelRef.current) return
    modelRef.current.rotation.y += (autoRotateSpeed || 1) * delta
  })

  return (
    <Center>
      <group ref={modelRef}>
        <ModelContent url={url} onLoaded={handleLoaded} />
      </group>
    </Center>
  )
}

function useIsCoarsePointer() {
  return React.useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {}
      const mq = window.matchMedia("(pointer: coarse)")
      mq.addEventListener("change", onStoreChange)
      return () => mq.removeEventListener("change", onStoreChange)
    },
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches,
    () => false
  )
}

export function ModelViewer({
  url = DEFAULT_MODEL_URL,
  width = "100%",
  height = "100%",
  defaultZoom = 2,
  minZoomDistance = 0.5,
  maxZoomDistance = 10,
  enableManualRotation = true,
  enableManualZoom = true,
  ambientIntensity = 0.3,
  keyLightIntensity = 1,
  fillLightIntensity = 0.5,
  rimLightIntensity = 0.8,
  environmentPreset = "studio",
  autoRotate = false,
  autoRotateSpeed = 0.35,
  onModelLoaded,
  className,
}: ModelViewerProps) {
  const coarsePointer = useIsCoarsePointer()
  const reduceMotion = React.useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {}
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
      mq.addEventListener("change", onStoreChange)
      return () => mq.removeEventListener("change", onStoreChange)
    },
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  )

  const shouldAutoRotate = autoRotate && !reduceMotion

  React.useEffect(() => {
    const ext = extensionOf(url)
    if (ext === "glb" || ext === "gltf") {
      void useGLTF.preload(url)
    }
  }, [url])

  return (
    <div
      className={cn("relative overflow-hidden rounded-[12px] bg-card", className)}
      style={{ width, height }}
    >
      <Canvas
        className="touch-none bg-card"
        shadows
        style={{ background: "transparent" }}
        camera={{
          fov: 50,
          position: [0, 0, defaultZoom],
          near: 0.01,
          far: 100,
        }}
        gl={{
          alpha: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        <React.Suspense fallback={null}>
          <SceneContent
            url={url}
            autoRotate={shouldAutoRotate}
            autoRotateSpeed={deg2rad(autoRotateSpeed)}
            onLoaded={onModelLoaded}
          />
        </React.Suspense>

        {environmentPreset !== "none" ? (
          <Environment preset={environmentPreset} />
        ) : null}

        <ambientLight intensity={ambientIntensity} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={keyLightIntensity}
          castShadow
        />
        <directionalLight
          position={[-5, 2, 5]}
          intensity={fillLightIntensity}
        />
        <directionalLight position={[0, 4, -5]} intensity={rimLightIntensity} />

        <ContactShadows
          position={[0, -0.5, 0]}
          opacity={0.35}
          scale={10}
          blur={2}
        />

        <OrbitControls
          makeDefault
          enablePan={false}
          enableDamping={false}
          enableRotate={enableManualRotation}
          enableZoom={enableManualZoom}
          minDistance={minZoomDistance}
          maxDistance={maxZoomDistance}
          autoRotate={coarsePointer ? false : shouldAutoRotate}
          autoRotateSpeed={autoRotateSpeed}
        />
      </Canvas>
    </div>
  )
}

export default ModelViewer
