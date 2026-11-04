"use client"

import * as React from "react"
import * as THREE from "three"

import { cn } from "@sonojs/ui/lib/utils"

import image01 from "./images/01.jpg"
import image02 from "./images/02.jpg"
import image03 from "./images/03.jpg"
import image04 from "./images/04.jpg"
import image05 from "./images/05.jpg"
import image06 from "./images/06.jpg"
import image07 from "./images/07.jpg"
import image08 from "./images/08.jpg"
import image09 from "./images/09.jpg"
import image10 from "./images/10.jpg"
import image11 from "./images/11.jpg"
import image12 from "./images/12.jpg"
import image13 from "./images/13.jpg"
import image14 from "./images/14.jpg"
import image15 from "./images/15.jpg"
import image16 from "./images/16.jpg"
import image17 from "./images/17.jpg"
import image18 from "./images/18.jpg"
import image19 from "./images/19.jpg"
import image20 from "./images/20.jpg"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const BUNDLED = [
  image01,
  image02,
  image03,
  image04,
  image05,
  image06,
  image07,
  image08,
  image09,
  image10,
  image11,
  image12,
  image13,
  image14,
  image15,
  image16,
  image17,
  image18,
  image19,
  image20,
].map(assetSrc)

export type InfiniteDriftBand = {
  images: string[]
  speed?: number
  rotation?: number
  offsetY?: number
  curveAmount?: number
  curveDirection?: 1 | -1
  rotationType?: "fromLeft" | "fromCenter"
}

export type InfiniteDriftProps = {
  bands?: InfiniteDriftBand[]
  height?: string | number
  gap?: number
  imageHeight?: number
  bandHeight?: number
  maxImageWidth?: number
  /** Soft corner radius for each tile (px). Default 14. */
  imageRadius?: number
  inertia?: number
  preserveOriginalRatios?: boolean
  className?: string
  children?: React.ReactNode
}

/** Design-time stage height the default offsets were authored against. */
const DESIGN_HEIGHT = 760

/**
 * Five parallel lanes at design height 760.
 * Step 160 keeps ~60px clear air between imageHeight-100 tiles so the
 * bottom pair cannot visually merge (shadows / curve no longer bridge).
 */
const DEFAULT_BANDS: InfiniteDriftBand[] = [
  {
    offsetY: -320,
    speed: 1,
    rotation: 7,
    rotationType: "fromCenter",
    curveAmount: 40,
    curveDirection: 1,
    images: BUNDLED.slice(0, 4),
  },
  {
    offsetY: -160,
    speed: 1.3,
    rotation: 7,
    rotationType: "fromCenter",
    curveAmount: 35,
    curveDirection: 1,
    images: BUNDLED.slice(4, 8),
  },
  {
    offsetY: 0,
    speed: 0.7,
    rotation: 7,
    rotationType: "fromCenter",
    curveAmount: 40,
    curveDirection: 1,
    images: BUNDLED.slice(8, 12),
  },
  {
    offsetY: 160,
    speed: 1.2,
    rotation: 7,
    rotationType: "fromCenter",
    curveAmount: 40,
    curveDirection: 1,
    images: BUNDLED.slice(12, 16),
  },
  {
    offsetY: 320,
    speed: 0.9,
    rotation: 7,
    rotationType: "fromCenter",
    curveAmount: 35,
    curveDirection: 1,
    images: BUNDLED.slice(16, 20),
  },
]

function roundedPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number
) {
  const r = Math.max(0, Math.min(radius, w / 2, h / 2))
  ctx.beginPath()
  if (r <= 0) {
    ctx.rect(x, y, w, h)
  } else if (typeof ctx.roundRect === "function") {
    ctx.roundRect(x, y, w, h, r)
  } else {
    ctx.moveTo(x + r, y)
    ctx.arcTo(x + w, y, x + w, y + h, r)
    ctx.arcTo(x + w, y + h, x, y + h, r)
    ctx.arcTo(x, y + h, x, y, r)
    ctx.arcTo(x, y, x + w, y, r)
    ctx.closePath()
  }
}

function drawRoundedImage(
  ctx: CanvasRenderingContext2D,
  img: CanvasImageSource,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number
) {
  // Soft corners only — no drop shadow (shadows were bridging lane gaps).
  ctx.save()
  roundedPath(ctx, x, y, w, h, radius)
  ctx.clip()
  ctx.drawImage(img, x, y, w, h)
  ctx.restore()
}

const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;
  uniform vec2 uResolution;
  uniform sampler2D uTexture;
  uniform float uTextureWidth;
  uniform float uSequenceWidth;
  uniform float uBandHeight;
  uniform float uScroll;
  uniform float uSpeed;
  uniform float uOffsetY;
  uniform float uRotation;
  uniform float uRotationType;
  uniform float uHasRotation;
  uniform float uCurveAmount;
  uniform float uCurveDirection;
  varying vec2 vUv;

  mat2 rotate2d(float angle) {
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
  }

  void main() {
    vec2 pixelCoord = vUv * uResolution;
    vec2 originalPixelCoord = pixelCoord;

    float normalizedX = pixelCoord.x / uResolution.x;
    float curveFactor = 4.0 * (normalizedX - 0.5) * (normalizedX - 0.5);
    float curveOffset = (0.5 - curveFactor) * uCurveAmount * uCurveDirection;

    float bandTopBase = (uResolution.y - uBandHeight) * 0.5 + uOffsetY;
    float bandTop = bandTopBase + curveOffset;
    float bandBottom = bandTop + uBandHeight;
    float bandCenterY = bandTopBase + (uBandHeight * 0.5);

    if (uHasRotation > 0.5) {
      vec2 rotationCenter = (uRotationType > 0.5)
        ? vec2(0.0, bandCenterY)
        : vec2(uResolution.x * 0.5, bandCenterY);
      pixelCoord -= rotationCenter;
      pixelCoord = rotate2d(uRotation) * pixelCoord;
      pixelCoord += rotationCenter;
      originalPixelCoord -= rotationCenter;
      originalPixelCoord = rotate2d(uRotation) * originalPixelCoord;
      originalPixelCoord += rotationCenter;
    }

    float margin = 4.0;
    if (pixelCoord.y < bandTop - margin || pixelCoord.y > bandBottom + margin) {
      discard;
    }

    float scrollPos = uScroll * uSpeed;
    float wrappedX = mod(originalPixelCoord.x + scrollPos, uSequenceWidth);
    float textureX = (wrappedX + uSequenceWidth) / uTextureWidth;
    float texY = (pixelCoord.y - bandTop) / (bandBottom - bandTop);

    if (textureX < 0.0 || textureX > 1.0 || texY < 0.0 || texY > 1.0) {
      discard;
    }

    vec4 color = texture2D(uTexture, vec2(textureX, texY));
    // Premultiplied strip: discard empty gutters so lanes stay separated.
    if (color.a < 0.04) discard;

    float edge = min(pixelCoord.y - bandTop, bandBottom - pixelCoord.y);
    if (edge < margin) {
      float fade = smoothstep(0.0, margin, edge);
      color.rgb *= fade;
      color.a *= fade;
    }

    gl_FragColor = color;
  }
`

export function InfiniteDrift({
  bands = DEFAULT_BANDS,
  height = 760,
  gap = 20,
  imageHeight = 100,
  bandHeight = 120,
  maxImageWidth = 300,
  imageRadius = 14,
  inertia = 0.92,
  preserveOriginalRatios = true,
  className,
  children,
}: InfiniteDriftProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const scrollState = React.useRef({
    scrollY: 0,
    targetScrollY: 0,
    scrollVelocity: 0,
    isDragging: false,
    lastMouseY: 0,
  })

  React.useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
    camera.position.z = 1

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
        powerPreference: "high-performance",
      })
    } catch {
      return
    }
    renderer.setClearColor(0x000000, 0)
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const meshes: THREE.Mesh[] = []
    const materials: THREE.ShaderMaterial[] = []

    const createBandTexture = async (band: InfiniteDriftBand) => {
      const images = await Promise.all(
        band.images.map(
          (url) =>
            new Promise<HTMLImageElement | HTMLCanvasElement>((resolve) => {
              const img = new Image()
              img.crossOrigin = "anonymous"
              img.onload = () => resolve(img)
              img.onerror = () => {
                const fallback = document.createElement("canvas")
                fallback.width = 400
                fallback.height = 300
                const ctx = fallback.getContext("2d")
                if (ctx) {
                  ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 60%)`
                  ctx.fillRect(0, 0, 400, 300)
                }
                resolve(fallback)
              }
              img.src = url
            })
        )
      )

      let sequenceWidth = 0
      const imageInfos = images.map((img) => {
        const nw =
          (img as HTMLImageElement).naturalWidth ||
          (img as HTMLCanvasElement).width
        const nh =
          (img as HTMLImageElement).naturalHeight ||
          (img as HTMLCanvasElement).height
        const ratio = nw / nh || 1.5
        let w: number
        let h: number
        if (preserveOriginalRatios) {
          h = imageHeight
          w = Math.round(h * ratio)
          if (w > maxImageWidth) {
            w = maxImageWidth
            h = Math.round(w / ratio)
          }
        } else {
          h = imageHeight
          w = Math.round(h * 1.5)
        }
        sequenceWidth += w + gap
        return { img, w, h }
      })

      sequenceWidth -= gap
      const cloneCount = 3
      const totalWidth = sequenceWidth * cloneCount

      // 2× strip → smoother rounded corners when sampled in the shader.
      const pixelRatio = 2
      const offscreenCanvas = document.createElement("canvas")
      offscreenCanvas.width = Math.max(1, Math.round(totalWidth * pixelRatio))
      offscreenCanvas.height = Math.max(1, Math.round(bandHeight * pixelRatio))
      const ctx = offscreenCanvas.getContext("2d", {
        alpha: true,
        colorSpace: "srgb",
      })
      if (!ctx) {
        return {
          texture: new THREE.Texture(),
          totalWidth: 1,
          sequenceWidth: 1,
        }
      }

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = "high"
      // Keep gutters fully transparent so lanes do not paint as solid slabs.
      ctx.clearRect(0, 0, totalWidth, bandHeight)

      let currentX = 0
      for (let c = 0; c < cloneCount; c++) {
        for (const info of imageInfos) {
          drawRoundedImage(
            ctx,
            info.img,
            currentX,
            (bandHeight - info.h) / 2,
            info.w,
            info.h,
            imageRadius
          )
          currentX += info.w + gap
        }
      }

      // Premultiply so linear filtering does not darken soft corners.
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      const raw = ctx.getImageData(
        0,
        0,
        offscreenCanvas.width,
        offscreenCanvas.height
      )
      const px = raw.data
      for (let i = 0; i < px.length; i += 4) {
        const a = px[i + 3]! / 255
        px[i] = Math.round(px[i]! * a)
        px[i + 1] = Math.round(px[i + 1]! * a)
        px[i + 2] = Math.round(px[i + 2]! * a)
      }
      ctx.putImageData(raw, 0, 0)

      const texture = new THREE.Texture(offscreenCanvas)
      texture.colorSpace = THREE.SRGBColorSpace
      texture.premultiplyAlpha = true
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter
      texture.generateMipmaps = false
      texture.needsUpdate = true
      return { texture, totalWidth, sequenceWidth }
    }

    let cancelled = false

    /**
     * Scale all offsets together so relative lane gaps stay even.
     * Per-band clamping would squash the outer pair onto each other.
     */
    const offsetYFactor = () => {
      const h = container.clientHeight
      const yScale = h / DESIGN_HEIGHT
      const maxAuthored = Math.max(
        1,
        ...bands.map((b) => Math.abs(b.offsetY ?? 0))
      )
      const maxAllowed = Math.max(0, (h - bandHeight) * 0.5 - 12)
      const afterScale = maxAuthored * yScale
      const compress =
        afterScale > maxAllowed && afterScale > 0
          ? maxAllowed / afterScale
          : 1
      return yScale * compress
    }

    /** Narrow docs previews: ease tilt so parallel lanes do not visually collide. */
    const rotationFactor = () => Math.min(1, container.clientWidth / 720)

    const syncBandLayout = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      const yFactor = offsetYFactor()
      const rFactor = rotationFactor()
      for (let i = 0; i < materials.length; i++) {
        const mat = materials[i]!
        const config = bands[i]
        if (!config) continue
        mat.uniforms.uResolution!.value.set(w, h)
        mat.uniforms.uOffsetY!.value = (config.offsetY ?? 0) * yFactor
        mat.uniforms.uBandHeight!.value = bandHeight
        mat.uniforms.uRotation!.value =
          (((config.rotation ?? 0) * Math.PI) / 180) * rFactor
      }
    }

    const initBands = async () => {
      for (let i = 0; i < bands.length; i++) {
        if (cancelled) return
        const config = bands[i]!
        const { texture, totalWidth, sequenceWidth } =
          await createBandTexture(config)
        if (cancelled) {
          texture.dispose()
          return
        }

        const material = new THREE.ShaderMaterial({
          uniforms: {
            uResolution: {
              value: new THREE.Vector2(
                container.clientWidth,
                container.clientHeight
              ),
            },
            uTexture: { value: texture },
            uTextureWidth: { value: totalWidth },
            uSequenceWidth: { value: sequenceWidth },
            uBandHeight: { value: bandHeight },
            uScroll: { value: 0 },
            uSpeed: { value: config.speed ?? 1 },
            uOffsetY: { value: (config.offsetY ?? 0) * offsetYFactor() },
            uRotation: {
              value:
                (((config.rotation ?? 0) * Math.PI) / 180) * rotationFactor(),
            },
            uRotationType: {
              value: config.rotationType === "fromLeft" ? 1 : 0,
            },
            uHasRotation: { value: config.rotation ? 1 : 0 },
            uCurveAmount: { value: config.curveAmount ?? 0 },
            uCurveDirection: { value: config.curveDirection ?? 1 },
          },
          vertexShader: VERTEX_SHADER,
          fragmentShader: FRAGMENT_SHADER,
          transparent: true,
          premultipliedAlpha: true,
          depthTest: false,
          depthWrite: false,
        })

        const geometry = new THREE.PlaneGeometry(2, 2)
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.z = i * -0.01
        mesh.renderOrder = i
        scene.add(mesh)
        meshes.push(mesh)
        materials.push(material)
      }
    }

    void initBands()

    let animationId = 0
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      const state = scrollState.current

      if (!reduceMotion && !state.isDragging) {
        state.targetScrollY += state.scrollVelocity
        state.scrollVelocity *= inertia
        if (Math.abs(state.scrollVelocity) < 0.1) state.scrollVelocity = 0
      }

      state.scrollY += (state.targetScrollY - state.scrollY) * 0.1

      for (const mat of materials) {
        mat.uniforms.uScroll!.value = state.scrollY
        mat.uniforms.uResolution!.value.set(
          container.clientWidth,
          container.clientHeight
        )
      }

      renderer.render(scene, camera)
    }
    animate()

    const handleWheel = (e: WheelEvent) => {
      if (reduceMotion) return
      e.preventDefault()
      scrollState.current.targetScrollY += e.deltaY
      scrollState.current.scrollVelocity = e.deltaY * 0.15
    }

    let lastScrollTop = window.scrollY
    const handleGlobalScroll = () => {
      if (reduceMotion) return
      const current = window.scrollY
      const delta = current - lastScrollTop
      lastScrollTop = current
      scrollState.current.targetScrollY += delta * 2.5
      scrollState.current.scrollVelocity = delta * 0.3
    }

    const handleMouseDown = (e: MouseEvent) => {
      if (reduceMotion) return
      scrollState.current.isDragging = true
      scrollState.current.lastMouseY = e.clientY
      scrollState.current.scrollVelocity = 0
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!scrollState.current.isDragging) return
      const deltaY = e.clientY - scrollState.current.lastMouseY
      scrollState.current.targetScrollY += deltaY * 2
      scrollState.current.lastMouseY = e.clientY
      scrollState.current.scrollVelocity = deltaY * 0.25
    }

    const handleMouseUp = () => {
      scrollState.current.isDragging = false
    }

    const handleResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight)
      syncBandLayout()
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (reduceMotion || !e.touches[0]) return
      scrollState.current.lastMouseY = e.touches[0].clientY
      scrollState.current.isDragging = true
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!scrollState.current.isDragging || !e.touches[0]) return
      const deltaY = e.touches[0].clientY - scrollState.current.lastMouseY
      scrollState.current.targetScrollY += deltaY * 2.5
      scrollState.current.lastMouseY = e.touches[0].clientY
      scrollState.current.scrollVelocity = deltaY * 0.3
    }

    container.addEventListener("wheel", handleWheel, { passive: false })
    container.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleGlobalScroll, { passive: true })
    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    })
    container.addEventListener("touchmove", handleTouchMove, { passive: true })
    container.addEventListener("touchend", handleMouseUp)

    return () => {
      cancelled = true
      cancelAnimationFrame(animationId)
      container.removeEventListener("wheel", handleWheel)
      container.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleGlobalScroll)
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
      container.removeEventListener("touchend", handleMouseUp)

      for (const mesh of meshes) {
        scene.remove(mesh)
        mesh.geometry.dispose()
        const mat = mesh.material as THREE.ShaderMaterial
        const tex = mat.uniforms.uTexture?.value as THREE.Texture | undefined
        tex?.dispose()
        mat.dispose()
      }
      renderer.dispose()
    }
  }, [
    bands,
    gap,
    imageHeight,
    bandHeight,
    maxImageWidth,
    imageRadius,
    inertia,
    preserveOriginalRatios,
  ])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full cursor-grab overflow-hidden bg-background active:cursor-grabbing",
        className
      )}
      style={{ height }}
      aria-label="Infinite Drift gallery"
    >
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
      {children}
    </div>
  )
}

export default InfiniteDrift
