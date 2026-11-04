"use client"

import * as React from "react"

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

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

/** Original demo atlas — 16 artistic stills (4×4 WebGL grid). */
const BUNDLED_IMAGES = [
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
].map(assetSrc)

export type InfiniteDrift2Props = {
  images?: string[]
  tileWidth?: number
  tileHeight?: number
  gap?: number
  borderRadius?: number
  curve?: number
  curveRadius?: number
  zoom?: number
  tileRotation?: number
  grayscale?: number
  vignette?: number
  /** RGB fringe strength at the dome rim (0–1). */
  chromaticAberration?: number
  /** Glass specular rim on tiles (0–1). */
  glass?: number
  /** Edge depth darkening (0–1). */
  depthFade?: number
  autoScrollX?: number
  autoScrollY?: number
  enableDrag?: boolean
  enableWheel?: boolean
  axis?: "both" | "x" | "y"
  dragSensitivity?: number
  wheelSensitivity?: number
  friction?: number
  backgroundColor?: string
  dpr?: number
  height?: number | string
  width?: number | string
  className?: string
  children?: React.ReactNode
}

export type InfiniteDrift2Ref = {
  resetOffset: () => void
  setOffset: (x: number, y: number) => void
  getOffset: () => { x: number; y: number }
}

export type InvertedDomeProps = InfiniteDrift2Props

const VS_SOURCE = `
  attribute vec2 aPosition;
  varying vec2 vUv;
  void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`

const FS_SOURCE = `
  precision highp float;
  varying vec2 vUv;

  uniform vec2 uResolution;
  uniform vec2 uOffset;
  uniform vec2 uTileSize;
  uniform float uGap;
  uniform float uBorderRadius;
  uniform float uCurve;
  uniform float uCurveRadius;
  uniform float uZoom;
  uniform float uTileRotation;
  uniform float uGrayscale;
  uniform float uVignette;
  uniform float uAberration;
  uniform float uGlass;
  uniform float uDepthFade;
  uniform float uTime;
  uniform sampler2D uAtlas;
  uniform vec2 uAtlasGrid;

  float sdRoundedBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
  }

  float hash21(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  vec4 sampleAtlas(vec2 worldPos, vec2 tileSize, float gap, float borderRadius, float tileRotation) {
    vec2 stepSize = tileSize + vec2(gap);
    vec2 cell = floor(worldPos / stepSize);
    vec2 localPos = mod(worldPos, stepSize) - 0.5 * stepSize;

    float angle = radians(tileRotation);
    mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    vec2 rotatedLocal = rot * localPos;

    float d = sdRoundedBox(rotatedLocal, tileSize * 0.5, borderRadius);
    float alpha = 1.0 - smoothstep(-1.2, 1.2, d);
    if (alpha <= 0.001) return vec4(0.0);

    vec2 tileUv = clamp((rotatedLocal / tileSize) + 0.5, 0.0, 1.0);
    vec2 atlasCell = mod(mod(cell, uAtlasGrid) + uAtlasGrid, uAtlasGrid);
    float atlasRow = uAtlasGrid.y - 1.0 - atlasCell.y;
    vec2 uv = (vec2(atlasCell.x, atlasRow) + tileUv) / uAtlasGrid;
    vec4 tex = texture2D(uAtlas, uv);

    float rim = smoothstep(2.5, 0.0, abs(d));
    float gloss = pow(max(0.0, 1.0 - length((tileUv - 0.5) * vec2(1.4, 1.1) - vec2(0.0, 0.22))), 4.0);
    vec3 color = tex.rgb;
    color += vec3(1.0) * gloss * uGlass * 0.28;
    color += vec3(0.55, 0.72, 1.0) * rim * uGlass * 0.18;

    return vec4(color, alpha * tex.a);
  }

  void main() {
    vec2 p = (gl_FragCoord.xy - 0.5 * uResolution) / min(uResolution.x, uResolution.y);
    float r = length(p);

    float maxDist = max(0.001, uCurveRadius);
    float normR = clamp(r / maxDist, 0.0, 1.0);
    float distortion = 1.0 + uCurve * pow(normR, 2.15) - uZoom * (1.0 - normR * 0.35);
    vec2 distortedCoord = p * distortion;
    float minDim = min(uResolution.x, uResolution.y);
    vec2 worldPos = distortedCoord * minDim + uOffset;

    float ab = uAberration * smoothstep(0.25, 1.0, normR) * 3.5;
    vec2 dir = length(p) > 0.0001 ? normalize(p) : vec2(1.0, 0.0);

    vec4 sampleG = sampleAtlas(worldPos, uTileSize, uGap, uBorderRadius, uTileRotation);
    vec4 sampleR = sampleG;
    vec4 sampleB = sampleG;

    // Skip expensive RGB fringe when aberration is off (mobile quality path)
    if (ab > 0.15) {
      sampleR = sampleAtlas(worldPos + dir * ab, uTileSize, uGap, uBorderRadius, uTileRotation);
      sampleB = sampleAtlas(worldPos - dir * ab, uTileSize, uGap, uBorderRadius, uTileRotation);
    }

    float alpha = max(sampleG.a, max(sampleR.a, sampleB.a));
    if (alpha <= 0.001) discard;

    vec3 color = vec3(
      sampleR.a > 0.001 ? sampleR.r : sampleG.r,
      sampleG.g,
      sampleB.a > 0.001 ? sampleB.b : sampleG.b
    );
    if (sampleG.a <= 0.001) {
      color = mix(sampleR.rgb, sampleB.rgb, 0.5);
    }

    float gray = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(color, vec3(gray), clamp(uGrayscale, 0.0, 1.0));

    float depth = mix(1.0, 0.42, pow(normR, 1.35) * uDepthFade);
    color *= depth;

    float vigFactor = smoothstep(0.28, 1.2, r * (1.0 + uVignette * 0.55));
    color = mix(color, color * (1.0 - uVignette * vigFactor), clamp(uVignette, 0.0, 1.0));

    float grain = (hash21(gl_FragCoord.xy * 0.7 + uTime * 12.0) - 0.5) * 0.035;
    color += grain;

    gl_FragColor = vec4(color, alpha);
  }
`

function compileShader(
  gl: WebGLRenderingContext,
  source: string,
  type: number
) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function isCoarsePointer() {
  if (typeof window === "undefined") return false
  return window.matchMedia("(pointer: coarse)").matches
}

export const InfiniteDrift2 = React.forwardRef<
  InfiniteDrift2Ref,
  InfiniteDrift2Props
>(function InfiniteDrift2(
  {
    images = BUNDLED_IMAGES,
    tileWidth = 210,
    tileHeight = 210,
    gap = 16,
    borderRadius = 14,
    curve = 0.42,
    curveRadius = 1.45,
    zoom = 0.1,
    tileRotation = 0,
    grayscale = 0,
    vignette = 0.18,
    chromaticAberration = 0.45,
    glass = 0.7,
    depthFade = 0.4,
    autoScrollX = 0.35,
    autoScrollY = 0.12,
    enableDrag = true,
    enableWheel = true,
    axis = "both",
    dragSensitivity = 1,
    wheelSensitivity = 0.6,
    friction = 0.93,
    backgroundColor = "transparent",
    dpr = 2,
    height = 420,
    width = "100%",
    className,
    children,
  },
  ref
) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const offset = React.useRef({ x: 0, y: 0 })
  const velocity = React.useRef({ x: 0, y: 0 })
  const isDragging = React.useRef(false)
  const lastPointer = React.useRef({ x: 0, y: 0 })
  const activePointerId = React.useRef<number | null>(null)
  const visibleRef = React.useRef(true)

  const propsRef = React.useRef({
    tileWidth,
    tileHeight,
    gap,
    borderRadius,
    curve,
    curveRadius,
    zoom,
    tileRotation,
    grayscale,
    vignette,
    chromaticAberration,
    glass,
    depthFade,
    autoScrollX,
    autoScrollY,
    axis,
    friction,
    dpr,
    enableDrag,
    enableWheel,
    dragSensitivity,
    wheelSensitivity,
  })

  React.useEffect(() => {
    propsRef.current = {
      tileWidth,
      tileHeight,
      gap,
      borderRadius,
      curve,
      curveRadius,
      zoom,
      tileRotation,
      grayscale,
      vignette,
      chromaticAberration,
      glass,
      depthFade,
      autoScrollX,
      autoScrollY,
      axis,
      friction,
      dpr,
      enableDrag,
      enableWheel,
      dragSensitivity,
      wheelSensitivity,
    }
  }, [
    tileWidth,
    tileHeight,
    gap,
    borderRadius,
    curve,
    curveRadius,
    zoom,
    tileRotation,
    grayscale,
    vignette,
    chromaticAberration,
    glass,
    depthFade,
    autoScrollX,
    autoScrollY,
    axis,
    friction,
    dpr,
    enableDrag,
    enableWheel,
    dragSensitivity,
    wheelSensitivity,
  ])

  React.useImperativeHandle(ref, () => ({
    resetOffset: () => {
      offset.current = { x: 0, y: 0 }
      velocity.current = { x: 0, y: 0 }
    },
    setOffset: (x: number, y: number) => {
      offset.current = { x, y }
    },
    getOffset: () => ({ ...offset.current }),
  }))

  React.useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    let isMounted = true
    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
    }) as WebGLRenderingContext | null
    if (!gl) return

    const vs = compileShader(gl, VS_SOURCE, gl.VERTEX_SHADER)
    const fs = compileShader(gl, FS_SOURCE, gl.FRAGMENT_SHADER)
    if (!vs || !fs) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    )

    const aPos = gl.getAttribLocation(program, "aPosition")
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const coarse = isCoarsePointer()
    const atlasDim = coarse ? 1024 : 1536
    const atlasCanvas = document.createElement("canvas")
    const imageList = (images.length > 0 ? images : BUNDLED_IMAGES).slice(0, 16)
    const gridCount = Math.max(2, Math.ceil(Math.sqrt(imageList.length || 1)))
    const cellDim = atlasDim / gridCount
    atlasCanvas.width = atlasDim
    atlasCanvas.height = atlasDim
    const ctx = atlasCanvas.getContext("2d", { willReadFrequently: true })
    const cellTotal = gridCount * gridCount

    if (ctx) {
      const palette = [
        ["#2563EB", "#0F172A"],
        ["#38BDF8", "#1D4ED8"],
        ["#818CF8", "#312E81"],
        ["#60A5FA", "#1E3A8A"],
        ["#22D3EE", "#0E7490"],
        ["#A78BFA", "#4C1D95"],
        ["#93C5FD", "#1E40AF"],
        ["#67E8F9", "#155E75"],
        ["#C4B5FD", "#3730A3"],
      ]
      for (let i = 0; i < cellTotal; i++) {
        const gx = i % gridCount
        const gy = Math.floor(i / gridCount)
        const x = gx * cellDim
        const y = gy * cellDim
        const grad = ctx.createLinearGradient(x, y, x + cellDim, y + cellDim)
        const [c1, c2] = palette[i % palette.length]!
        grad.addColorStop(0, c1)
        grad.addColorStop(1, c2)
        ctx.fillStyle = grad
        ctx.fillRect(x, y, cellDim, cellDim)
      }
    }

    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      atlasCanvas
    )

    imageList.forEach((url, i) => {
      const img = new Image()
      img.decoding = "async"
      img.crossOrigin = "anonymous"
      img.onload = () => {
        if (!isMounted || !ctx) return
        const gx = i % gridCount
        const gy = Math.floor(i / gridCount)
        const x = gx * cellDim
        const y = gy * cellDim
        const imgAspect = img.naturalWidth / (img.naturalHeight || 1)
        let sx = 0
        let sy = 0
        let sw = img.naturalWidth
        let sh = img.naturalHeight
        if (imgAspect > 1) {
          sw = sh
          sx = (img.naturalWidth - sw) / 2
        } else {
          sh = sw
          sy = (img.naturalHeight - sh) / 2
        }
        ctx.drawImage(img, sx, sy, sw, sh, x, y, cellDim, cellDim)
        try {
          gl.bindTexture(gl.TEXTURE_2D, texture)
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
          gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            atlasCanvas
          )
        } catch {
          // ignore
        }
      }
      img.src = url
    })

    const uRes = gl.getUniformLocation(program, "uResolution")
    const uOff = gl.getUniformLocation(program, "uOffset")
    const uTile = gl.getUniformLocation(program, "uTileSize")
    const uG = gl.getUniformLocation(program, "uGap")
    const uRad = gl.getUniformLocation(program, "uBorderRadius")
    const uCurv = gl.getUniformLocation(program, "uCurve")
    const uCurvRad = gl.getUniformLocation(program, "uCurveRadius")
    const uZm = gl.getUniformLocation(program, "uZoom")
    const uRot = gl.getUniformLocation(program, "uTileRotation")
    const uGray = gl.getUniformLocation(program, "uGrayscale")
    const uVig = gl.getUniformLocation(program, "uVignette")
    const uAb = gl.getUniformLocation(program, "uAberration")
    const uGlass = gl.getUniformLocation(program, "uGlass")
    const uDepth = gl.getUniformLocation(program, "uDepthFade")
    const uTime = gl.getUniformLocation(program, "uTime")
    const uAtlas = gl.getUniformLocation(program, "uAtlas")
    const uAtlasGrid = gl.getUniformLocation(program, "uAtlasGrid")

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry?.isIntersecting ?? true
      },
      { rootMargin: "80px", threshold: 0.01 }
    )
    io.observe(container)

    let animId = 0
    let lastTime = performance.now()

    const render = (time: number) => {
      animId = requestAnimationFrame(render)
      if (!visibleRef.current) {
        lastTime = time
        return
      }

      const dt = Math.min(0.1, (time - lastTime) / 1000)
      lastTime = time
      const p = propsRef.current
      const cssW = Math.max(1, container.clientWidth)

      // Mobile: shrink tiles so more of the grid reads on small screens
      const tileScale = cssW < 480 ? Math.max(0.55, cssW / 420) : 1
      const tw = p.tileWidth * tileScale
      const th = p.tileHeight * tileScale
      const tg = p.gap * tileScale
      const tr = p.borderRadius * tileScale
      // Softer aberration on phones (also skips 3× sampling below threshold)
      const ab = cssW < 640 ? p.chromaticAberration * 0.35 : p.chromaticAberration
      const maxDpr = cssW < 640 || coarse ? Math.min(p.dpr, 1.5) : p.dpr

      if (!isDragging.current && !reduceMotion) {
        if (p.axis !== "y") {
          offset.current.x += (velocity.current.x + p.autoScrollX * 60) * dt
        }
        if (p.axis !== "x") {
          offset.current.y += (velocity.current.y + p.autoScrollY * 60) * dt
        }
        velocity.current.x *= Math.pow(p.friction, dt * 60)
        velocity.current.y *= Math.pow(p.friction, dt * 60)
      }

      const targetDpr = Math.min(window.devicePixelRatio || 1, maxDpr)
      const w = Math.max(1, Math.floor(canvas.clientWidth * targetDpr))
      const h = Math.max(1, Math.floor(canvas.clientHeight * targetDpr))

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)

      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.uniform1i(uAtlas, 0)

      gl.uniform2f(uRes, w, h)
      gl.uniform2f(uOff, offset.current.x, offset.current.y)
      gl.uniform2f(uTile, tw, th)
      gl.uniform1f(uG, tg)
      gl.uniform1f(uRad, tr)
      gl.uniform1f(uCurv, p.curve)
      gl.uniform1f(uCurvRad, p.curveRadius)
      gl.uniform1f(uZm, p.zoom)
      gl.uniform1f(uRot, p.tileRotation)
      gl.uniform1f(uGray, p.grayscale)
      gl.uniform1f(uVig, p.vignette)
      gl.uniform1f(uAb, ab)
      gl.uniform1f(uGlass, p.glass)
      gl.uniform1f(uDepth, p.depthFade)
      gl.uniform1f(uTime, time * 0.001)
      gl.uniform2f(uAtlasGrid, gridCount, gridCount)

      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

    animId = requestAnimationFrame(render)

    return () => {
      isMounted = false
      cancelAnimationFrame(animId)
      io.disconnect()
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      if (texture) gl.deleteTexture(texture)
      if (buffer) gl.deleteBuffer(buffer)
    }
  }, [images])

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!propsRef.current.enableDrag) return
    // Primary pointer only - ignore multi-touch extras
    if (activePointerId.current !== null) return
    activePointerId.current = e.pointerId
    isDragging.current = true
    lastPointer.current = { x: e.clientX, y: e.clientY }
    velocity.current = { x: 0, y: 0 }
    try {
      containerRef.current?.setPointerCapture(e.pointerId)
    } catch {
      // ignore
    }
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || e.pointerId !== activePointerId.current) return
    const sens = propsRef.current.dragSensitivity
    const ax = propsRef.current.axis
    const dx = (e.clientX - lastPointer.current.x) * sens
    const dy = (e.clientY - lastPointer.current.y) * sens
    if (ax !== "y") {
      offset.current.x -= dx
      velocity.current.x = -dx * 22
    }
    if (ax !== "x") {
      offset.current.y += dy
      velocity.current.y = dy * 22
    }
    lastPointer.current = { x: e.clientX, y: e.clientY }
  }

  const endDrag = (e: React.PointerEvent) => {
    if (e.pointerId !== activePointerId.current) return
    isDragging.current = false
    activePointerId.current = null
    try {
      containerRef.current?.releasePointerCapture(e.pointerId)
    } catch {
      // ignore
    }
  }

  const handleWheel = React.useCallback((e: WheelEvent) => {
    if (!propsRef.current.enableWheel) return
    // Only trap wheel when pointer is over the gallery - never block page scroll by default path
    e.preventDefault()
    const ax = propsRef.current.axis
    const sens = propsRef.current.wheelSensitivity
    if (ax !== "y") offset.current.x += e.deltaX * sens
    if (ax !== "x") offset.current.y -= e.deltaY * sens
  }, [])

  React.useEffect(() => {
    const container = containerRef.current
    if (!container || !enableWheel) return
    // Skip wheel trap on coarse pointers (phones) - drag is the interaction
    if (isCoarsePointer()) return
    container.addEventListener("wheel", handleWheel, { passive: false })
    return () => container.removeEventListener("wheel", handleWheel)
  }, [handleWheel, enableWheel])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full cursor-grab overflow-hidden rounded-[12px] select-none active:cursor-grabbing",
        className
      )}
      style={{ height, width, backgroundColor, touchAction: "none" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      role="region"
      aria-label="Infinite Drift 2 gallery"
    >
      <canvas ref={canvasRef} className="block size-full touch-none" />
      {children ? (
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-3">
          {children}
        </div>
      ) : null}
    </div>
  )
})

InfiniteDrift2.displayName = "InfiniteDrift2"

export const InvertedDome = InfiniteDrift2
export default InfiniteDrift2
