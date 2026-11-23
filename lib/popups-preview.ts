/**
 * Hosted consumer previews for `/popups` (Cloudflare gallery).
 * Always external — never local `/view`. Override with
 * `NEXT_PUBLIC_POPUPS_PREVIEW_ORIGIN` when needed.
 */
const DEFAULT_HOSTED = "https://sonojs-popups.sonojs3.workers.dev"

export function getPopupsPreviewOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_POPUPS_PREVIEW_ORIGIN
  if (raw !== undefined) {
    const trimmed = raw.trim().replace(/\/$/, "")
    if (trimmed && trimmed.toLowerCase() !== "local") return trimmed
  }
  return DEFAULT_HOSTED
}

export function popupPreviewPath(name: string) {
  return `/popups/${name}`
}

export function popupPreviewUrl(
  name: string,
  opts?: { dir?: string; embed?: boolean; origin?: string }
) {
  const origin = (opts?.origin ?? getPopupsPreviewOrigin()).replace(/\/$/, "")
  const url = new URL(popupPreviewPath(name), `${origin}/`)
  if (opts?.embed) url.searchParams.set("embed", "1")
  if (opts?.dir) url.searchParams.set("dir", opts.dir)
  return url.toString()
}
