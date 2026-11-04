"use client"

import * as React from "react"

import { cn } from "@sonojs/ui/lib/utils"

export type SmokeyFrameProps = React.PropsWithChildren<{
  /** Frame smoke color (hex or rgb). Default SonoJS primary blue. */
  frameColor?: string
  /** Interior base color when `transparentBg` is false. */
  frameBgColor?: string
  /** Transparent interior (default true). */
  transparentBg?: boolean
  /** Normalized frame width from edge toward center (0.01–0.50). */
  frameWidth?: number
  /** Animation speed multiplier. */
  speed?: number
  /** Edge falloff exponent (sharper when higher). */
  falloff?: number
  /** Procedural noise scale. */
  noiseScale?: number
  /** Noise mix into the frame (0–1). */
  noiseStrength?: number
  /** Emission intensity. */
  intensity?: number
  /** Gamma contrast. */
  gamma?: number
  /** Canvas opacity (0–1). */
  opacity?: number
  /** Pointer displaces the smoke field. */
  interactive?: boolean
  /** Soft colored glow behind the frame. */
  glow?: boolean
  glowBlur?: number
  glowOpacity?: number
  /** Border radius (default 12px). */
  radius?: string | number
  className?: string
  canvasClassName?: string
  style?: React.CSSProperties
  /** Cap device pixel ratio (default 2). */
  dpr?: number
}>

export type SmokeyFrameHandle = {
  getCanvas: () => HTMLCanvasElement | null
  getGL: () => WebGLRenderingContext | null
}

/** SonoJS primary blue (#2563EB). */
const DEFAULT_FRAME_COLOR = "#2563EB"
const FALLBACK_RGB: [number, number, number] = [37 / 255, 99 / 255, 235 / 255]

function parseColorToRgb(
  color: string,
  fallback: [number, number, number] = FALLBACK_RGB
): [number, number, number] {
  if (!color) return fallback
  const clean = color.trim()
  if (clean.startsWith("#")) {
    let hex = clean.replace("#", "")
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((c) => c + c)
        .join("")
    }
    const num = Number.parseInt(hex, 16)
    if (Number.isNaN(num)) return fallback
    return [
      ((num >> 16) & 255) / 255,
      ((num >> 8) & 255) / 255,
      (num & 255) / 255,
    ]
  }
  const match = clean.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i)
  if (match) {
    return [
      Number.parseInt(match[1]!, 10) / 255,
      Number.parseInt(match[2]!, 10) / 255,
      Number.parseInt(match[3]!, 10) / 255,
    ]
  }
  return fallback
}

function useIsDarkTheme() {
  return React.useSyncExternalStore(
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
    () => true
  )
}

const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = (a_position + 1.0) * 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

const FRAGMENT_SHADER = `
  precision highp float;
  varying vec2 v_uv;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_speed;
  uniform float u_frameWidth;
  uniform float u_falloff;
  uniform float u_noiseScale;
  uniform float u_noiseStrength;
  uniform float u_intensity;
  uniform float u_gamma;
  uniform float u_opacity;
  uniform vec3 u_frameColor;
  uniform vec3 u_frameBgColor;
  uniform float u_transparentBg;
  uniform vec2 u_mouse;
  uniform float u_isHovered;

  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
          + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float total = 0.0;
    float amp = 0.5;
    float freq = 1.0;
    for(int i = 0; i < 5; i++) {
      total += snoise(p * freq) * amp;
      freq *= 2.02;
      amp *= 0.5;
    }
    return total;
  }

  void main() {
    vec2 uv = v_uv;
    float aspect = u_resolution.x / max(u_resolution.y, 0.0001);

    vec2 noiseUV = uv;
    if (aspect > 1.0) {
      noiseUV.x *= aspect;
    } else {
      noiseUV.y /= aspect;
    }

    if (u_isHovered > 0.0) {
      vec2 mouseUV = u_mouse;
      if (aspect > 1.0) mouseUV.x *= aspect; else mouseUV.y /= aspect;
      float dMouse = distance(noiseUV, mouseUV);
      float mouseInfluence = smoothstep(0.6, 0.0, dMouse);
      noiseUV += (noiseUV - mouseUV) * mouseInfluence * 0.12 * u_isHovered;
    }

    float t = u_time * u_speed;
    float noise1 = fbm(noiseUV * u_noiseScale + vec2(t * 0.45, t * 0.28));
    float noise2 = fbm(noiseUV * (u_noiseScale * 1.5) - vec2(t * 0.32, -t * 0.4));
    float combinedNoise = (noise1 * 0.65 + noise2 * 0.35 + 1.0) * 0.5;

    vec2 distToEdge = min(uv, 1.0 - uv);
    float minAxisDist = min(distToEdge.x, distToEdge.y);

    float frameDist = clamp(minAxisDist / max(u_frameWidth, 0.0001), 0.0, 1.0);

    float edgeStrength = 1.0 - frameDist;
    edgeStrength = pow(edgeStrength, u_falloff);

    float modulatedFrame = mix(edgeStrength, edgeStrength * combinedNoise, u_noiseStrength);

    float finalGlow = pow(modulatedFrame * u_intensity, u_gamma);
    finalGlow = clamp(finalGlow, 0.0, 1.0);

    if (u_transparentBg > 0.5) {
      float alpha = finalGlow * u_opacity;
      gl_FragColor = vec4(u_frameColor, alpha);
    } else {
      vec3 finalColor = mix(u_frameBgColor, u_frameColor, finalGlow);
      gl_FragColor = vec4(finalColor, u_opacity);
    }
  }
`

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
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

export const SmokeyFrame = React.forwardRef<
  SmokeyFrameHandle,
  SmokeyFrameProps
>(function SmokeyFrame(
  {
    children,
    frameColor = DEFAULT_FRAME_COLOR,
    frameBgColor,
    transparentBg = true,
    frameWidth = 0.3,
    speed = 0.15,
    falloff = 6,
    noiseScale = 3,
    noiseStrength = 1,
    intensity = 1.2,
    gamma = 2,
    opacity = 1,
    interactive = true,
    glow = true,
    glowBlur = 36,
    glowOpacity = 0.45,
    radius = "12px",
    className,
    canvasClassName,
    style,
    dpr = 2,
  },
  ref
) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const glRef = React.useRef<WebGLRenderingContext | null>(null)
  const animFrameRef = React.useRef<number | null>(null)
  const isVisibleRef = React.useRef(true)
  const mousePosRef = React.useRef({ x: 0.5, y: 0.5 })
  const isHoveredRef = React.useRef(0)
  const startTimeRef = React.useRef(0)
  const frozenTimeRef = React.useRef(0)

  const isDark = useIsDarkTheme()
  const effectiveBgColor =
    frameBgColor ?? (isDark ? "#08080a" : "#ffffff")
  const parsedRadius = typeof radius === "number" ? `${radius}px` : radius

  const propsRef = React.useRef({
    frameColor,
    effectiveBgColor,
    transparentBg,
    frameWidth,
    speed,
    falloff,
    noiseScale,
    noiseStrength,
    intensity,
    gamma,
    opacity,
    dpr,
  })

  React.useEffect(() => {
    propsRef.current = {
      frameColor,
      effectiveBgColor,
      transparentBg,
      frameWidth,
      speed,
      falloff,
      noiseScale,
      noiseStrength,
      intensity,
      gamma,
      opacity,
      dpr,
    }
  }, [
    frameColor,
    effectiveBgColor,
    transparentBg,
    frameWidth,
    speed,
    falloff,
    noiseScale,
    noiseStrength,
    intensity,
    gamma,
    opacity,
    dpr,
  ])

  React.useImperativeHandle(ref, () => ({
    getCanvas: () => canvasRef.current,
    getGL: () => glRef.current,
  }))

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      depth: false,
      preserveDrawingBuffer: false,
    })
    if (!gl) return

    glRef.current = gl
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    if (!vs || !fs) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return

    gl.useProgram(program)

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    )

    const positionLocation = gl.getAttribLocation(program, "a_position")
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    const uniforms = {
      resolution: gl.getUniformLocation(program, "u_resolution"),
      time: gl.getUniformLocation(program, "u_time"),
      speed: gl.getUniformLocation(program, "u_speed"),
      frameWidth: gl.getUniformLocation(program, "u_frameWidth"),
      falloff: gl.getUniformLocation(program, "u_falloff"),
      noiseScale: gl.getUniformLocation(program, "u_noiseScale"),
      noiseStrength: gl.getUniformLocation(program, "u_noiseStrength"),
      intensity: gl.getUniformLocation(program, "u_intensity"),
      gamma: gl.getUniformLocation(program, "u_gamma"),
      opacity: gl.getUniformLocation(program, "u_opacity"),
      frameColor: gl.getUniformLocation(program, "u_frameColor"),
      frameBgColor: gl.getUniformLocation(program, "u_frameBgColor"),
      transparentBg: gl.getUniformLocation(program, "u_transparentBg"),
      mouse: gl.getUniformLocation(program, "u_mouse"),
      isHovered: gl.getUniformLocation(program, "u_isHovered"),
    }

    const handleResize = () => {
      const p = propsRef.current
      const targetDpr = Math.min(window.devicePixelRatio || 1, p.dpr)
      const displayWidth = Math.round(canvas.clientWidth * targetDpr)
      const displayHeight = Math.round(canvas.clientHeight * targetDpr)
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = Math.max(1, displayWidth)
        canvas.height = Math.max(1, displayHeight)
        gl.viewport(0, 0, canvas.width, canvas.height)
      }
    }

    handleResize()
    startTimeRef.current = performance.now()

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(canvas)

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry?.isIntersecting ?? true
      },
      { threshold: 0.05 }
    )
    intersectionObserver.observe(canvas)

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    let reduceMotion = mq.matches
    const onPRM = () => {
      reduceMotion = mq.matches
    }
    mq.addEventListener("change", onPRM)

    let currentHover = 0
    let running = true

    const render = () => {
      if (!running) return
      if (isVisibleRef.current) {
        handleResize()
        const p = propsRef.current
        const now = performance.now()
        if (!reduceMotion) {
          frozenTimeRef.current = (now - startTimeRef.current) * 0.001
        }
        const time = frozenTimeRef.current
        const fColor = parseColorToRgb(p.frameColor)
        const bColor = parseColorToRgb(p.effectiveBgColor, [0.04, 0.04, 0.04])

        const targetHover = isHoveredRef.current
        currentHover += (targetHover - currentHover) * 0.1

        gl.uniform2f(uniforms.resolution, canvas.width, canvas.height)
        gl.uniform1f(uniforms.time, time)
        gl.uniform1f(uniforms.speed, reduceMotion ? 0 : p.speed)
        gl.uniform1f(uniforms.frameWidth, p.frameWidth)
        gl.uniform1f(uniforms.falloff, p.falloff)
        gl.uniform1f(uniforms.noiseScale, p.noiseScale)
        gl.uniform1f(uniforms.noiseStrength, p.noiseStrength)
        gl.uniform1f(uniforms.intensity, p.intensity)
        gl.uniform1f(uniforms.gamma, p.gamma)
        gl.uniform1f(uniforms.opacity, p.opacity)
        gl.uniform3f(uniforms.frameColor, fColor[0], fColor[1], fColor[2])
        gl.uniform3f(uniforms.frameBgColor, bColor[0], bColor[1], bColor[2])
        gl.uniform1f(uniforms.transparentBg, p.transparentBg ? 1 : 0)
        gl.uniform2f(
          uniforms.mouse,
          mousePosRef.current.x,
          mousePosRef.current.y
        )
        gl.uniform1f(uniforms.isHovered, currentHover)

        gl.drawArrays(gl.TRIANGLES, 0, 6)
      }
      animFrameRef.current = requestAnimationFrame(render)
    }

    animFrameRef.current = requestAnimationFrame(render)

    return () => {
      running = false
      if (animFrameRef.current != null) {
        cancelAnimationFrame(animFrameRef.current)
      }
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      mq.removeEventListener("change", onPRM)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      if (positionBuffer) gl.deleteBuffer(positionBuffer)
      glRef.current = null
    }
  }, [])

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!interactive || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const w = rect.width || 1
      const h = rect.height || 1
      mousePosRef.current = {
        x: (e.clientX - rect.left) / w,
        y: 1 - (e.clientY - rect.top) / h,
      }
    },
    [interactive]
  )

  const handleMouseEnter = React.useCallback(() => {
    if (interactive) isHoveredRef.current = 1
  }, [interactive])

  const handleMouseLeave = React.useCallback(() => {
    if (interactive) isHoveredRef.current = 0
  }, [interactive])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative h-full min-h-[300px] w-full select-none overflow-hidden",
        className
      )}
      style={{
        borderRadius: parsedRadius,
        ...style,
      }}
    >
      {glow ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 scale-105 transition-opacity duration-300"
          style={{
            borderRadius: parsedRadius,
            filter: `blur(${glowBlur}px)`,
            background: `radial-gradient(ellipse at center, ${frameColor} 0%, transparent 75%)`,
            opacity: glowOpacity,
          }}
        />
      ) : null}

      <canvas
        ref={canvasRef}
        className={cn(
          "pointer-events-none absolute inset-0 block size-full",
          canvasClassName
        )}
        style={{ borderRadius: parsedRadius }}
      />

      {children ? (
        <div
          className="pointer-events-auto relative z-10 flex size-full flex-col items-center justify-center"
          style={{ borderRadius: parsedRadius }}
        >
          {children}
        </div>
      ) : null}
    </div>
  )
})

SmokeyFrame.displayName = "SmokeyFrame"

export default SmokeyFrame
export const ThreeDSmokeyFrame = SmokeyFrame
