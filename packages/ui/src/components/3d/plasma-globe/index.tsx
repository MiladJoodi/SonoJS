"use client"

import * as React from "react"
import { Mesh, Program, Renderer, Triangle } from "ogl"

import { cn } from "@sonojs/ui/lib/utils"

export type PlasmaGlobeProps = {
  /** Global time speed multiplier. */
  speed?: number
  /** Color intensity multiplier. */
  intensity?: number
  /** Follow pointer for camera tilt + filament bias. */
  interactive?: boolean
  /** Outer glass corona strength (0–2). */
  corona?: number
  /** Electrical flicker amount (0–1). */
  crackle?: number
  /** Stage height. */
  height?: number | string
  className?: string
  style?: React.CSSProperties
}

const VERTEX_SHADER = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

// Quality uniform: 0 = mobile (fewer rays/steps), 1 = desktop
const FRAGMENT_SHADER = `#version 300 es
precision highp float;
out vec4 fragColor;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uSpeed;
uniform float uIntensity;
uniform float uCorona;
uniform float uCrackle;
uniform float uQuality;

#define FAR 6.0

mat2 mm2(float a){
  float c = cos(a), s = sin(a);
  return mat2(c, -s, s, c);
}

float hash1(float n){ return fract(sin(n)*43758.5453); }
float hash2(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }

float noise3(vec3 p){
  vec3 ip = floor(p);
  vec3 fp = fract(p);
  fp = fp*fp*(3.0-2.0*fp);

  float n000 = hash2(ip.xy + ip.z*7.0);
  float n100 = hash2(ip.xy + vec2(1.0,0.0) + ip.z*7.0);
  float n010 = hash2(ip.xy + vec2(0.0,1.0) + ip.z*7.0);
  float n110 = hash2(ip.xy + vec2(1.0,1.0) + ip.z*7.0);

  float nx0 = mix(n000, n100, fp.x);
  float nx1 = mix(n010, n110, fp.x);
  float nxy = mix(nx0, nx1, fp.y);

  float nz = mix(nxy, hash1(ip.z + 1.0), fp.z);
  return nz;
}

float flow(vec3 p, float t){
  float rz = 0.0;
  vec3 bp = p;
  float z = 2.0;
  int oct = uQuality > 0.5 ? 5 : 3;
  for (int i = 1; i < 5; i++){
    if (i >= oct) break;
    p += t * 0.1;
    rz += (sin(noise3(p + t*0.8) * 6.0) * 0.5 + 0.5) / z;
    p = mix(bp, p, 0.6);
    z *= 2.0;
    p *= 2.01;
    p *= mat3(
      0.00,  0.80,  0.60,
     -0.80,  0.36, -0.48,
     -0.60, -0.48,  0.64
    );
  }
  return rz;
}

float sins(float x, float t){
  float rz = 0.0;
  float z = 2.0;
  for (int i = 0; i < 3; i++){
    rz += abs(fract(x * 1.4) - 0.5) / z;
    x *= 1.3;
    z *= 1.15;
    x -= t * 0.65 * z;
  }
  return rz;
}

float segm(vec3 p, vec3 a, vec3 b){
  vec3 pa = p - a;
  vec3 ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h) * 0.5;
}

vec3 path(float i, float d, float t, vec2 focus){
  float sns2 = sins(d + i * 0.5, t) * 0.22;
  float sns = sins(d + i * 0.6, t) * 0.21;
  float a1 = (hash1(i * 10.569) - 0.5) * 6.2 + sns2 + focus.x * 0.55;
  float a2 = (hash1(i * 4.732) - 0.5) * 6.2 + sns + focus.y * 0.55;
  vec3 en = vec3(0.0, 0.0, 1.0);
  en.xz *= mat2(cos(a1), -sin(a1), sin(a1), cos(a1));
  en.xy *= mat2(cos(a2), -sin(a2), sin(a2), cos(a2));
  return en;
}

vec2 map(vec3 p, float i, float t, vec2 focus){
  float lp = length(p);
  vec3 bg = vec3(0.0);
  vec3 en = path(i, lp, t, focus);
  float ins = smoothstep(0.11, 0.46, lp);
  float outs = 0.15 + smoothstep(0.0, 0.15, abs(lp - 1.0));
  p *= ins * outs;
  float id = ins * outs;
  float rz = segm(p, bg, en) - 0.011;
  return vec2(rz, id);
}

vec2 iSphere2(vec3 ro, vec3 rd){
  vec3 oc = ro;
  float b = dot(oc, rd);
  float c = dot(oc, oc) - 1.0;
  float h = b*b - c;
  if (h < 0.0) return vec2(-1.0);
  return vec2((-b - sqrt(h)), (-b + sqrt(h)));
}

vec3 plasmaTint(float id, float t){
  vec3 a = vec3(0.145, 0.388, 0.922);
  vec3 b = vec3(0.133, 0.827, 0.933);
  vec3 c = vec3(0.506, 0.447, 0.984);
  float w = 0.5 + 0.5 * sin(id * 6.2 + t * 1.4);
  float w2 = 0.5 + 0.5 * sin(id * 3.1 - t * 0.9);
  return mix(mix(a, b, w), c, w2 * 0.55);
}

vec3 vmarch(vec3 ro, vec3 rd, float j, vec3 orig, float t, vec2 focus){
  vec3 p = ro;
  vec3 sum = vec3(0.0);
  int steps = uQuality > 0.5 ? 20 : 12;
  for (int i = 0; i < 20; i++){
    if (i >= steps) break;
    vec2 r = map(p, j, t, focus);
    p += rd * 0.03;
    float lp = length(p);
    vec3 col = plasmaTint(r.y + j * 0.07, t);
    col *= 0.85 + 0.4 * sin(vec3(1.05, 2.5, 1.52) * 3.94 + r.y);
    col *= smoothstep(0.0, 0.015, -r.x);
    col *= smoothstep(0.04, 0.2, abs(lp - 1.1));
    col *= smoothstep(0.1, 0.34, lp);
    float n = noise3(vec3(lp * 2.0 + j * 13.0 + t * 5.0));
    float crackle = 1.0 + uCrackle * (step(0.92, hash1(floor(t * 28.0) + j)) * 1.8 - 0.15);
    float denom = max(0.0001, log(max(0.0001, distance(p, orig) - 2.0)) + 0.75);
    sum += abs(col) * 5.2 * (1.2 - n * 1.1) * crackle / denom;
  }
  return sum;
}

float march(vec3 ro, vec3 rd, float startf, float maxd, float j, float t, vec2 focus){
  float precis = 0.001;
  float h = 0.5;
  float d = startf;
  int iters = uQuality > 0.5 ? 36 : 22;
  for (int i = 0; i < 36; i++){
    if (i >= iters) break;
    if (abs(h) < precis || d > maxd) break;
    d += h * 1.2;
    float res = map(ro + rd * d, j, t, focus).x;
    h = res;
  }
  return d;
}

void main(){
  vec2 uv = (gl_FragCoord.xy / uResolution.xy) - 0.5;
  uv.x *= uResolution.x / uResolution.y;
  vec2 um = (uMouse.xy / uResolution.xy) - 0.5;
  vec2 focus = clamp(um * 2.2, vec2(-1.2), vec2(1.2));

  vec3 ro = vec3(0.0, 0.0, 5.0);
  vec3 rd = normalize(vec3(uv * 0.7, -1.5));
  mat2 mx = mm2(uTime * 0.35 + um.x * 5.5);
  mat2 my = mm2(uTime * 0.28 + um.y * 5.5);
  ro.xz *= mx; rd.xz *= mx;
  ro.xy *= my; rd.xy *= my;

  vec3 bro = ro;
  vec3 brd = rd;

  vec3 col = vec3(0.0);
  float rays = uQuality > 0.5 ? 14.0 : 8.0;

  for (float j = 1.0; j < 15.0; j++){
    if (j > rays) break;
    ro = bro;
    rd = brd;
    mat2 mm = mm2((uTime * 0.1 + ((j + 1.0) * 5.1)) * j * 0.25);
    ro.xy *= mm; rd.xy *= mm;
    ro.xz *= mm; rd.xz *= mm;
    float rz = march(ro, rd, 2.5, FAR, j, uTime, focus);
    if (rz >= FAR) continue;
    vec3 pos = ro + rz * rd;
    col = max(col, vmarch(pos, rd, j, bro, uTime, focus));
  }

  ro = bro;
  rd = brd;
  vec2 sph = iSphere2(ro, rd);

  if (sph.x > 0.0){
    vec3 pos = ro + rd * sph.x;
    vec3 pos2 = ro + rd * sph.y;
    vec3 nrm = normalize(pos);
    vec3 rf = reflect(rd, nrm);
    vec3 rf2 = reflect(rd, normalize(pos2));
    float nz = (-log(abs(flow(rf * 1.2, uTime) - 0.01) + 0.00001));
    float nz2 = (-log(abs(flow(rf2 * 1.2, -uTime) - 0.01) + 0.00001));
    col += (0.12 * nz * nz * vec3(0.18, 0.35, 0.95) + 0.06 * nz2 * nz2 * vec3(0.35, 0.75, 1.0)) * 0.9;

    float fres = pow(1.0 - max(dot(nrm, -rd), 0.0), 3.2);
    col += fres * vec3(0.55, 0.78, 1.0) * (0.35 + 0.45 * uCorona);

    float shell = smoothstep(1.15, 0.92, length(pos));
    col += shell * vec3(0.2, 0.45, 1.0) * 0.22 * uCorona;
  } else {
    float d = length(uv) * 1.15;
    float halo = exp(-d * d * 3.8) * 0.18 * uCorona;
    col += vec3(0.2, 0.45, 1.0) * halo;
  }

  col *= (1.0 + uIntensity * 0.65);
  col = pow(clamp(col, 0.0, 10.0), vec3(1.42));
  float alpha = clamp(max(col.r, max(col.g, col.b)), 0.0, 1.0);
  fragColor = vec4(col * 1.25, alpha);
}
`

function isMobileLike() {
  if (typeof window === "undefined") return false
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    window.innerWidth < 768
  )
}

export function PlasmaGlobe({
  speed = 1,
  intensity = 1.15,
  interactive = true,
  corona = 1.15,
  crackle = 0.45,
  height = 380,
  className,
  style,
}: PlasmaGlobeProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const mouseRef = React.useRef({ x: 0, y: 0 })
  const targetMouseRef = React.useRef({ x: 0, y: 0 })
  const visibleRef = React.useRef(true)
  const propsRef = React.useRef({
    speed,
    intensity,
    interactive,
    corona,
    crackle,
  })

  React.useEffect(() => {
    propsRef.current = { speed, intensity, interactive, corona, crackle }
  }, [speed, intensity, interactive, corona, crackle])

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    const mobile = isMobileLike()
    const dprCap = mobile ? 1.25 : 2

    let renderer: Renderer
    try {
      renderer = new Renderer({
        alpha: true,
        antialias: !mobile,
        dpr: Math.min(window.devicePixelRatio || 1, dprCap),
        powerPreference: mobile ? "low-power" : "high-performance",
      })
    } catch {
      return
    }

    const gl = renderer.gl
    // Shader is GLSL 300 ES - requires WebGL2 (all modern mobile browsers)
    if (!renderer.isWebgl2) {
      gl.getExtension("WEBGL_lose_context")?.loseContext()
      return
    }
    gl.clearColor(0, 0, 0, 0)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

    const geometry = new Triangle(gl)
    const program = new Program(gl, {
      vertex: VERTEX_SHADER,
      fragment: FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [1, 1] },
        uMouse: { value: [0, 0] },
        uSpeed: { value: speed },
        uIntensity: { value: intensity },
        uCorona: { value: corona },
        uCrackle: { value: crackle },
        uQuality: { value: mobile ? 0 : 1 },
      },
    })

    const mesh = new Mesh(gl, { geometry, program })
    const canvas = gl.canvas as HTMLCanvasElement
    canvas.style.display = "block"
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    canvas.style.touchAction = "none"
    container.appendChild(canvas)

    const syncMouseCenter = (cssW: number, cssH: number) => {
      mouseRef.current = { x: cssW * 0.5, y: cssH * 0.5 }
      targetMouseRef.current = { ...mouseRef.current }
    }

    const resize = () => {
      const cssW = Math.max(1, container.clientWidth)
      const cssH = Math.max(1, container.clientHeight)
      renderer.setSize(cssW, cssH)
      // CRITICAL: gl_FragCoord is in device pixels - match drawing buffer size
      const bufW = gl.drawingBufferWidth || cssW * (renderer.dpr || 1)
      const bufH = gl.drawingBufferHeight || cssH * (renderer.dpr || 1)
      program.uniforms.uResolution.value = [bufW, bufH]
      // Mouse uniforms also in buffer space so UV math stays consistent
      if (!propsRef.current.interactive) {
        syncMouseCenter(bufW, bufH)
      } else {
        // Keep relative position when resizing
        const prev = program.uniforms.uResolution.value
        void prev
      }
      program.uniforms.uQuality.value =
        cssW < 768 || isMobileLike() ? 0 : 1
    }

    const pointerToBuffer = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect()
      const cssX = clientX - rect.left
      const cssY = clientY - rect.top
      const scaleX =
        (gl.drawingBufferWidth || rect.width) / Math.max(1, rect.width)
      const scaleY =
        (gl.drawingBufferHeight || rect.height) / Math.max(1, rect.height)
      return { x: cssX * scaleX, y: cssY * scaleY }
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!propsRef.current.interactive) return
      targetMouseRef.current = pointerToBuffer(e.clientX, e.clientY)
    }

    const onPointerDown = (e: PointerEvent) => {
      if (!propsRef.current.interactive) return
      targetMouseRef.current = pointerToBuffer(e.clientX, e.clientY)
      mouseRef.current = { ...targetMouseRef.current }
      try {
        container.setPointerCapture(e.pointerId)
      } catch {
        // ignore
      }
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry?.isIntersecting ?? true
      },
      { rootMargin: "80px", threshold: 0.01 }
    )
    io.observe(container)

    const ro = new ResizeObserver(resize)
    ro.observe(container)
    resize()
    syncMouseCenter(
      gl.drawingBufferWidth || container.clientWidth,
      gl.drawingBufferHeight || container.clientHeight
    )

    container.addEventListener("pointermove", onPointerMove)
    container.addEventListener("pointerdown", onPointerDown)

    let rafId = 0
    let frozenTime = 0
    const loop = (t: number) => {
      rafId = requestAnimationFrame(loop)
      if (!visibleRef.current) return

      const p = propsRef.current
      const w = program.uniforms.uResolution.value[0] || 1
      const h = program.uniforms.uResolution.value[1] || 1

      mouseRef.current.x +=
        (targetMouseRef.current.x - mouseRef.current.x) * 0.1
      mouseRef.current.y +=
        (targetMouseRef.current.y - mouseRef.current.y) * 0.1

      if (reduceMotion) {
        if (frozenTime === 0) frozenTime = t * 0.001 * p.speed
        program.uniforms.uTime.value = frozenTime
      } else {
        program.uniforms.uTime.value = t * 0.001 * p.speed
      }

      program.uniforms.uMouse.value = [
        p.interactive ? mouseRef.current.x : w * 0.5,
        p.interactive ? mouseRef.current.y : h * 0.5,
      ]
      program.uniforms.uSpeed.value = p.speed
      program.uniforms.uIntensity.value = p.intensity
      program.uniforms.uCorona.value = p.corona
      program.uniforms.uCrackle.value = p.crackle
      renderer.render({ scene: mesh })
    }
    rafId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      io.disconnect()
      container.removeEventListener("pointermove", onPointerMove)
      container.removeEventListener("pointerdown", onPointerDown)
      if (canvas.parentNode === container) container.removeChild(canvas)
      gl.getExtension("WEBGL_lose_context")?.loseContext()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden rounded-[12px] bg-transparent",
        interactive ? "cursor-crosshair touch-none" : "pointer-events-none",
        className
      )}
      style={{
        height,
        touchAction: interactive ? "none" : undefined,
        ...style,
      }}
      role="img"
      aria-label="Animated plasma globe"
    />
  )
}

export default PlasmaGlobe
