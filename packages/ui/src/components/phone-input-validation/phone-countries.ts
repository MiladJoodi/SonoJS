import countriesData from "./countries.json"

export type PhoneCountry = {
  code: string
  name: string
  dial: string
}

export const phoneCountries = countriesData as PhoneCountry[]

/** Base URL for SonoJS flag SVGs (no trailing slash). */
export const DEFAULT_FLAG_CDN_BASE = "https://sonojs.github.io/SonoJS-flags"

export function isoToFlag(code: string) {
  const iso = code.trim().toUpperCase()
  if (!/^[A-Z]{2}$/.test(iso)) return ""
  return String.fromCodePoint(
    ...[...iso].map((char) => 127397 + char.charCodeAt(0))
  )
}

export function flagSrc(code: string, base: string = DEFAULT_FLAG_CDN_BASE) {
  return `${base.replace(/\/$/, "")}/flags/${code.toLowerCase()}.svg`
}