"use client"

import { Environment, OrbitControls } from "@react-three/drei"
import { Canvas, useThree } from "@react-three/fiber"
import {
  Suspense,
  useEffect,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react"

import { Carousel } from "./carousel"
import { Effects } from "./effects"
import { ensureBagFontsReady } from "./load-fonts"
import {
  DEFAULT_HANGING_BAG_ITEMS,
  type HangingBagItem,
} from "./projects"

export type HangingBagProps = {
  items?: HangingBagItem[]
  className?: string
  /** Stage height; default fills a typical docs preview. */
  height?: number | string
  /** Show orbit / scroll hint strip. */
  showHint?: boolean
}

const STAGE_LIGHT = "#f2f1ed"
const STAGE_DARK = "#09090b"

function useIsDarkTheme() {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof document === "undefined") return () => {}
      const el = document.documentElement
      const mo = new MutationObserver(onStoreChange)
      mo.observe(el, { attributes: true, attributeFilter: ["class"] })
      return () => mo.disconnect()
    },
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"),
    () => false
  )
}

function useFontsReady() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    void ensureBagFontsReady().then(() => {
      if (!cancelled) setReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return ready
}

function StageAtmosphere({ isDark }: { isDark: boolean }) {
  const { gl } = useThree()
  const stage = isDark ? STAGE_DARK : STAGE_LIGHT

  useEffect(() => {
    gl.setClearColor(stage)
  }, [gl, stage])

  return (
    <>
      <color attach="background" args={[stage]} />
      <fog attach="fog" args={[stage, isDark ? 10 : 12, isDark ? 20 : 22]} />

      <ambientLight intensity={isDark ? 0.42 : 0.62} />
      <directionalLight
        position={[5.5, 9, 4.5]}
        intensity={isDark ? 1.15 : 1.45}
      />
      <directionalLight
        position={[-6, 4, -3]}
        intensity={isDark ? 0.55 : 0.75}
        color={isDark ? "#9eb0d4" : "#c8d4f0"}
      />
      <directionalLight
        position={[1, 2.5, 7]}
        intensity={isDark ? 0.4 : 0.55}
        color="#ffffff"
      />
      <pointLight
        position={[0, 3.4, 2.2]}
        intensity={isDark ? 0.28 : 0.35}
        color="#fff1df"
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color={stage} roughness={0.96} metalness={0} />
      </mesh>
    </>
  )
}

export function HangingBag({
  items = DEFAULT_HANGING_BAG_ITEMS,
  className,
  height = "min(100vh, 640px)",
  showHint = true,
}: HangingBagProps) {
  const fontsReady = useFontsReady()
  const isDark = useIsDarkTheme()
  const heightStyle: CSSProperties = {
    height: typeof height === "number" ? `${height}px` : height,
  }

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        ...heightStyle,
        touchAction: "none",
        cursor: "grab",
      }}
    >
      <Canvas
        style={{ width: "100%", height: "100%" }}
        dpr={[1, 1.75]}
        camera={{ position: [0, 2.6, 7.4], fov: 36, near: 0.5, far: 80 }}
        gl={{
          antialias: true,
          alpha: false,
          toneMappingExposure: isDark ? 0.88 : 0.95,
          logarithmicDepthBuffer: true,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(isDark ? STAGE_DARK : STAGE_LIGHT)
        }}
      >
        <StageAtmosphere isDark={isDark} />

        <Suspense fallback={null}>
          <Environment
            preset="apartment"
            environmentIntensity={isDark ? 0.55 : 0.75}
          />
          {fontsReady ? <Carousel items={items} /> : null}
          <Effects />
        </Suspense>

        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.08}
          enablePan
          enableZoom={false}
          minDistance={3.2}
          maxDistance={14}
          minPolarAngle={0.12}
          maxPolarAngle={Math.PI - 0.12}
          target={[0, 1.2, 0]}
        />
      </Canvas>

      {showHint ? (
        <div
          aria-hidden
          style={{
            position: "absolute",
            insetInlineEnd: 24,
            bottom: 20,
            zIndex: 5,
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 4,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.03em",
            color: isDark ? "#94a3b8" : "#64748b",
          }}
        >
          <span>Drag — orbit X / Y / Z</span>
          <span>Scroll — spin rack · Ctrl+scroll — zoom</span>
        </div>
      ) : null}
    </div>
  )
}
