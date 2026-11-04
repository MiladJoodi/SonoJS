"use client"

import * as React from "react"

import { cn } from "@sonojs/ui/lib/utils"

const VERTEX_SHADER_SOURCE = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`

const FRAGMENT_SHADER_SOURCE = `#version 300 es
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uRadius;
uniform float uCoinRadius;
uniform float uCoinThickness;
uniform float uSpeed;
uniform int uCoinsCount;
uniform float uMaxOpacity;
uniform float uDarkTheme;

out vec4 fragColor;

float sdEllipsoid(vec3 p, vec3 r) {
  float k0 = length(p / r);
  float k1 = length(p / (r * r));
  return k0 * (k0 - 1.0) / k1;
}

float map(vec3 p, out int hitId, out vec3 localP, out float hitAngle, out float wobbleVal) {
  float d = 1e10;
  hitId = -1;
  float count = max(1.0, float(uCoinsCount));

  for (int i = 0; i < 9; i++) {
    if (i >= uCoinsCount) break;

    float angle = float(i) * 6.2831853 / count + uTime * uSpeed;
    vec3 center = vec3(uRadius * cos(angle), 0.0, uRadius * sin(angle));
    vec3 lp = p - center;

    vec3 N = vec3(cos(angle), 0.0, sin(angle));
    vec3 B = vec3(0.0, 1.0, 0.0);
    vec3 T = vec3(-sin(angle), 0.0, cos(angle));

    vec3 localCoord = vec3(
      dot(lp, N),
      dot(lp, B),
      dot(lp, T)
    );

    float wobble = sin(uTime * 1.5 + float(i) * 0.8) * 0.12;
    float cosW = cos(wobble);
    float sinW = sin(wobble);

    float ly = localCoord.y * cosW - localCoord.z * sinW;
    float lz = localCoord.y * sinW + localCoord.z * cosW;
    localCoord.y = ly;
    localCoord.z = lz;

    float distCoin = sdEllipsoid(localCoord, vec3(uCoinRadius, uCoinRadius, uCoinThickness));

    if (distCoin < d) {
      d = distCoin;
      hitId = i;
      localP = localCoord;
      hitAngle = angle;
      wobbleVal = wobble;
    }
  }
  return d;
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);

  vec3 ro = vec3(0.0, 2.3, 4.8);
  vec3 ta = vec3(0.0, -0.15, 0.0);

  vec3 cw = normalize(ta - ro);
  vec3 cp = vec3(0.0, 1.0, 0.0);
  vec3 cu = normalize(cross(cw, cp));
  vec3 cv = cross(cu, cw);
  vec3 rd = normalize(uv.x * cu + uv.y * cv + 2.0 * cw);

  float t = 0.0;
  int hitId = -1;
  vec3 localP;
  float hitAngle = 0.0;
  float wobbleVal = 0.0;

  for (int i = 0; i < 64; i++) {
    vec3 p = ro + rd * t;
    int currHitId;
    vec3 currLocalP;
    float currHitAngle;
    float currWobble;
    float d = map(p, currHitId, currLocalP, currHitAngle, currWobble);
    if (d < 0.001) {
      hitId = currHitId;
      localP = currLocalP;
      hitAngle = currHitAngle;
      wobbleVal = currWobble;
      break;
    }
    t += d;
    if (t > 10.0) break;
  }

  if (hitId != -1) {
    vec3 r = vec3(uCoinRadius, uCoinRadius, uCoinThickness);
    vec3 localNormal = localP / (r * r);
    localNormal = normalize(localNormal);

    vec3 N = vec3(cos(hitAngle), 0.0, sin(hitAngle));
    vec3 B = vec3(0.0, 1.0, 0.0);
    vec3 T = vec3(-sin(hitAngle), 0.0, cos(hitAngle));

    float cosW = cos(wobbleVal);
    float sinW = sin(wobbleVal);
    vec3 B_wobbled = B * cosW + T * sinW;
    vec3 T_wobbled = -B * sinW + T * cosW;

    vec3 normal = localNormal.x * N + localNormal.y * B_wobbled + localNormal.z * T_wobbled;
    normal = normalize(normal);

    vec3 baseColor = mix(uColor1, uColor2, sin(hitAngle) * 0.5 + 0.5);
    float localGrad = localP.x / uCoinRadius * 0.5 + 0.5;
    baseColor = mix(baseColor, mix(uColor2, uColor1, sin(hitAngle) * 0.5 + 0.5), localGrad);

    vec3 viewDir = -rd;
    float fresnel = pow(1.0 - max(0.0, dot(normal, viewDir)), 2.5);

    vec3 keyLightDir = normalize(vec3(1.5, 3.0, 2.0));
    vec3 fillLightDir = normalize(vec3(-1.0, -1.0, -1.0));

    float shadowMin = mix(0.18, 0.35, uDarkTheme);
    float keyDiffuse = max(0.0, dot(normal, keyLightDir));
    float fillDiffuse = max(0.0, dot(normal, fillLightDir));
    float shadow = mix(shadowMin, 1.0, keyDiffuse);

    float edgeOcclusion = mix(1.0 - fresnel * 0.55, 1.0, uDarkTheme);

    float specIntensity = mix(0.6, 1.0, uDarkTheme);
    vec3 keyHalfDir = normalize(keyLightDir + viewDir);
    float specSharp = pow(max(0.0, dot(normal, keyHalfDir)), 64.0) * 1.6 * specIntensity;
    float specSoft = pow(max(0.0, dot(normal, keyHalfDir)), 8.0) * 0.35 * specIntensity;
    float specular = specSharp + specSoft;

    float rimIntensity = mix(0.35, 0.95, uDarkTheme);
    vec3 rimColor = mix(uColor1, uColor2, sin(hitAngle) * 0.5 + 0.5);
    rimColor = mix(rimColor, vec3(1.0), 0.28);
    vec3 rimGlow = rimColor * fresnel * rimIntensity;

    vec3 glassColor = baseColor * (shadow * edgeOcclusion + 0.18 * fillDiffuse) + rimGlow + vec3(1.0) * specular;

    float minAlpha = mix(0.55, 0.42, uDarkTheme);
    float alpha = mix(minAlpha, 0.96, fresnel) * uMaxOpacity;
    alpha = max(alpha, specSharp * 0.6);

    fragColor = vec4(glassColor, alpha);
  } else {
    fragColor = vec4(0.0, 0.0, 0.0, 0.0);
  }
}`

function hexToRgb01(hex: string): [number, number, number] {
  const raw = hex.trim().replace(/^#/, "")
  const full =
    raw.length === 3
      ? raw
          .split("")
          .map((c) => c + c)
          .join("")
      : raw
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return [0.145, 0.388, 0.922]
  const n = Number.parseInt(full, 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

function clampCoins(count: number) {
  return Math.min(9, Math.max(1, Math.round(count)))
}

function isDarkTheme() {
  if (typeof document === "undefined") return false
  return document.documentElement.classList.contains("dark")
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export interface GlassCoinCarouselProps {
  className?: string
  /** Orbiting coins (1–9). Default 9. */
  coinsCount?: number
  /** Orbit radius. Default 2.3. */
  radius?: number
  /** Individual coin radius. Default 0.65. */
  coinRadius?: number
  /** Individual coin thickness. Default 0.12. */
  coinThickness?: number
  /** Orbit speed multiplier. Default 0.8. */
  speed?: number
  /** First glass tint (hex). Default aqua. */
  color1?: string
  /** Second glass tint (hex). Default soft violet — pairs with `color1` for iridescence. */
  color2?: string
  /** Maximum glass opacity. Default 0.88. */
  maxOpacity?: number
  /** Center overlay text. */
  centerText?: string
  /** Classes for the center text overlay. */
  centerTextClassName?: string
}

export function GlassCoinCarousel({
  className,
  coinsCount = 9,
  radius = 2.3,
  coinRadius = 0.65,
  coinThickness = 0.12,
  speed = 0.8,
  color1 = "#2DD4BF",
  color2 = "#818CF8",
  maxOpacity = 0.88,
  centerText = "SonoJS",
  centerTextClassName,
}: GlassCoinCarouselProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const propsRef = React.useRef({
    coinsCount,
    radius,
    coinRadius,
    coinThickness,
    speed,
    color1,
    color2,
    maxOpacity,
  })

  React.useEffect(() => {
    propsRef.current = {
      coinsCount,
      radius,
      coinRadius,
      coinThickness,
      speed,
      color1,
      color2,
      maxOpacity,
    }
  }, [
    coinsCount,
    radius,
    coinRadius,
    coinThickness,
    speed,
    color1,
    color2,
    maxOpacity,
  ])

  React.useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const gl = canvas.getContext("webgl2", { alpha: true, antialias: true })
    if (!gl) return

    gl.clearColor(0, 0, 0, 0)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1])
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    const compileShader = (type: number, source: string) => {
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

    const vertexShader = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE)
    const fragmentShader = compileShader(
      gl.FRAGMENT_SHADER,
      FRAGMENT_SHADER_SOURCE
    )
    if (!vertexShader || !fragmentShader) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
      return
    }

    gl.useProgram(program)

    const positionLoc = gl.getAttribLocation(program, "position")
    gl.enableVertexAttribArray(positionLoc)
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0)

    const uTimeLoc = gl.getUniformLocation(program, "uTime")
    const uResolutionLoc = gl.getUniformLocation(program, "uResolution")
    const uColor1Loc = gl.getUniformLocation(program, "uColor1")
    const uColor2Loc = gl.getUniformLocation(program, "uColor2")
    const uRadiusLoc = gl.getUniformLocation(program, "uRadius")
    const uCoinRadiusLoc = gl.getUniformLocation(program, "uCoinRadius")
    const uCoinThicknessLoc = gl.getUniformLocation(program, "uCoinThickness")
    const uSpeedLoc = gl.getUniformLocation(program, "uSpeed")
    const uCoinsCountLoc = gl.getUniformLocation(program, "uCoinsCount")
    const uMaxOpacityLoc = gl.getUniformLocation(program, "uMaxOpacity")
    const uDarkThemeLoc = gl.getUniformLocation(program, "uDarkTheme")

    const resize = () => {
      const w = container.offsetWidth
      const h = container.offsetHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(w * dpr))
      canvas.height = Math.max(1, Math.floor(h * dpr))
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(container)
    resize()

    let animationId = 0
    let frozenTime = 0
    const render = (time: number) => {
      animationId = requestAnimationFrame(render)

      const p = propsRef.current
      const reduceMotion = prefersReducedMotion()
      const orbitSpeed = reduceMotion ? 0 : p.speed
      if (!reduceMotion) frozenTime = time * 0.001

      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.useProgram(program)

      gl.uniform1f(uTimeLoc, frozenTime)
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height)

      const c1 = hexToRgb01(p.color1)
      const c2 = hexToRgb01(p.color2)
      gl.uniform3f(uColor1Loc, c1[0], c1[1], c1[2])
      gl.uniform3f(uColor2Loc, c2[0], c2[1], c2[2])

      gl.uniform1f(uRadiusLoc, p.radius)
      gl.uniform1f(uCoinRadiusLoc, p.coinRadius)
      gl.uniform1f(uCoinThicknessLoc, p.coinThickness)
      gl.uniform1f(uSpeedLoc, orbitSpeed)
      gl.uniform1i(uCoinsCountLoc, clampCoins(p.coinsCount))
      gl.uniform1f(uMaxOpacityLoc, p.maxOpacity)
      gl.uniform1f(uDarkThemeLoc, isDarkTheme() ? 1.0 : 0.0)

      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }
    render(0)

    return () => {
      cancelAnimationFrame(animationId)
      ro.disconnect()
      gl.deleteBuffer(positionBuffer)
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-full min-h-[500px] w-full items-center justify-center overflow-hidden bg-transparent",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 block h-full w-full"
      />

      {centerText ? (
        <div
          className={cn(
            "pointer-events-none absolute z-10 select-none text-center font-sans text-2xl font-semibold tracking-tight text-foreground drop-shadow-sm transition-colors duration-300 sm:text-3xl",
            centerTextClassName
          )}
        >
          {centerText}
        </div>
      ) : null}
    </div>
  )
}

export default GlassCoinCarousel
