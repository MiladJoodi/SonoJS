export type HsvaColor = {
  h: number
  s: number
  v: number
  a: number
}

export type ColorFormat =
  | "hex"
  | "hex8"
  | "rgb"
  | "rgba"
  | "hsl"
  | "hsla"

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function round(n: number, digits = 0) {
  const p = 10 ** digits
  return Math.round(n * p) / p
}

export function hsvaToRgba(hsva: HsvaColor): {
  r: number
  g: number
  b: number
  a: number
} {
  const h = ((hsva.h % 360) + 360) % 360
  const s = clamp(hsva.s, 0, 100) / 100
  const v = clamp(hsva.v, 0, 100) / 100
  const a = clamp(hsva.a, 0, 1)
  const c = v * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = v - c
  let rp = 0
  let gp = 0
  let bp = 0
  if (h < 60) [rp, gp, bp] = [c, x, 0]
  else if (h < 120) [rp, gp, bp] = [x, c, 0]
  else if (h < 180) [rp, gp, bp] = [0, c, x]
  else if (h < 240) [rp, gp, bp] = [0, x, c]
  else if (h < 300) [rp, gp, bp] = [x, 0, c]
  else [rp, gp, bp] = [c, 0, x]
  return {
    r: Math.round((rp + m) * 255),
    g: Math.round((gp + m) * 255),
    b: Math.round((bp + m) * 255),
    a,
  }
}

export function rgbaToHsva(
  r: number,
  g: number,
  b: number,
  a = 1
): HsvaColor {
  const rn = clamp(r, 0, 255) / 255
  const gn = clamp(g, 0, 255) / 255
  const bn = clamp(b, 0, 255) / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const d = max - min
  let h = 0
  if (d !== 0) {
    if (max === rn) h = ((gn - bn) / d) % 6
    else if (max === gn) h = (bn - rn) / d + 2
    else h = (rn - gn) / d + 4
    h *= 60
    if (h < 0) h += 360
  }
  const s = max === 0 ? 0 : (d / max) * 100
  const v = max * 100
  return { h: round(h, 1), s: round(s, 1), v: round(v, 1), a: clamp(a, 0, 1) }
}

export function hsvaToHsla(hsva: HsvaColor): {
  h: number
  s: number
  l: number
  a: number
} {
  const s = clamp(hsva.s, 0, 100) / 100
  const v = clamp(hsva.v, 0, 100) / 100
  const l = v * (1 - s / 2)
  const sl = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l)
  return {
    h: round(((hsva.h % 360) + 360) % 360, 1),
    s: round(sl * 100, 1),
    l: round(l * 100, 1),
    a: clamp(hsva.a, 0, 1),
  }
}

export function hslaToHsva(
  h: number,
  s: number,
  l: number,
  a = 1
): HsvaColor {
  const sn = clamp(s, 0, 100) / 100
  const ln = clamp(l, 0, 100) / 100
  const v = ln + sn * Math.min(ln, 1 - ln)
  const sv = v === 0 ? 0 : 2 * (1 - ln / v)
  return {
    h: ((h % 360) + 360) % 360,
    s: round(sv * 100, 1),
    v: round(v * 100, 1),
    a: clamp(a, 0, 1),
  }
}

function toHexByte(n: number) {
  return clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0")
}

export function hsvaToHex(hsva: HsvaColor, withAlpha = false): string {
  const { r, g, b, a } = hsvaToRgba(hsva)
  const hex = `#${toHexByte(r)}${toHexByte(g)}${toHexByte(b)}`
  if (!withAlpha) return hex.toUpperCase()
  return `${hex}${toHexByte(Math.round(a * 255))}`.toUpperCase()
}

export function formatColor(hsva: HsvaColor, format: ColorFormat): string {
  const { r, g, b, a } = hsvaToRgba(hsva)
  const hsla = hsvaToHsla(hsva)
  switch (format) {
    case "hex":
      return hsvaToHex(hsva, false)
    case "hex8":
      return hsvaToHex(hsva, true)
    case "rgb":
      return `rgb(${r}, ${g}, ${b})`
    case "rgba":
      return `rgba(${r}, ${g}, ${b}, ${round(a, 3)})`
    case "hsl":
      return `hsl(${round(hsla.h, 1)} ${round(hsla.s, 1)}% ${round(hsla.l, 1)}%)`
    case "hsla":
      return `hsla(${round(hsla.h, 1)} ${round(hsla.s, 1)}% ${round(hsla.l, 1)}% / ${round(a, 3)})`
    default:
      return hsvaToHex(hsva, false)
  }
}

function parseHex(raw: string): HsvaColor | null {
  const hex = raw.replace(/^#/, "").trim()
  if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{4}$|^[0-9a-fA-F]{6}$|^[0-9a-fA-F]{8}$/.test(hex)) {
    return null
  }
  let r = 0
  let g = 0
  let b = 0
  let a = 1
  if (hex.length === 3 || hex.length === 4) {
    r = parseInt(hex[0] + hex[0], 16)
    g = parseInt(hex[1] + hex[1], 16)
    b = parseInt(hex[2] + hex[2], 16)
    if (hex.length === 4) a = parseInt(hex[3] + hex[3], 16) / 255
  } else {
    r = parseInt(hex.slice(0, 2), 16)
    g = parseInt(hex.slice(2, 4), 16)
    b = parseInt(hex.slice(4, 6), 16)
    if (hex.length === 8) a = parseInt(hex.slice(6, 8), 16) / 255
  }
  return rgbaToHsva(r, g, b, a)
}

export function parseColor(input: string): HsvaColor | null {
  const value = input.trim()
  if (!value) return null

  if (value.startsWith("#") || /^[0-9a-fA-F]{3,8}$/.test(value)) {
    return parseHex(value.startsWith("#") ? value : `#${value}`)
  }

  const rgbMatch = value.match(
    /^rgba?\(\s*([\d.]+)\s*,?\s*([\d.]+)\s*,?\s*([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)$/i
  )
  if (rgbMatch) {
    const aRaw = rgbMatch[4]
    const a =
      aRaw == null
        ? 1
        : aRaw.endsWith("%")
          ? parseFloat(aRaw) / 100
          : parseFloat(aRaw)
    return rgbaToHsva(
      parseFloat(rgbMatch[1]),
      parseFloat(rgbMatch[2]),
      parseFloat(rgbMatch[3]),
      Number.isFinite(a) ? a : 1
    )
  }

  const hslMatch = value.match(
    /^hsla?\(\s*([\d.]+)\s*,?\s*([\d.]+)%\s*,?\s*([\d.]+)%(?:\s*[,/]\s*([\d.]+%?))?\s*\)$/i
  )
  if (hslMatch) {
    const aRaw = hslMatch[4]
    const a =
      aRaw == null
        ? 1
        : aRaw.endsWith("%")
          ? parseFloat(aRaw) / 100
          : parseFloat(aRaw)
    return hslaToHsva(
      parseFloat(hslMatch[1]),
      parseFloat(hslMatch[2]),
      parseFloat(hslMatch[3]),
      Number.isFinite(a) ? a : 1
    )
  }

  return null
}

export function normalizeColorString(
  input: string,
  format: ColorFormat = "hex"
): string | null {
  const hsva = parseColor(input)
  if (!hsva) return null
  return formatColor(hsva, format)
}

export function colorsEqual(a: string, b: string): boolean {
  const ca = parseColor(a)
  const cb = parseColor(b)
  if (!ca || !cb) return a.trim().toLowerCase() === b.trim().toLowerCase()
  return (
    Math.abs(ca.h - cb.h) < 0.5 &&
    Math.abs(ca.s - cb.s) < 0.5 &&
    Math.abs(ca.v - cb.v) < 0.5 &&
    Math.abs(ca.a - cb.a) < 0.01
  )
}

export const DEFAULT_SWATCHES = [
  "#EF4444",
  "#F97316",
  "#EAB308",
  "#22C55E",
  "#14B8A6",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#64748B",
  "#0F172A",
  "#FFFFFF",
  "#000000",
]
