/**
 * Gallery thumbs for `/3d`.
 *
 * - Most items: `public/images/3d/{slug}-default.webp` (same for light + dark).
 * - Theme-sensitive: `public/images/3d/{slug}-light.webp` + `{slug}-dark.webp`.
 */

const DEFAULT_THUMB_SLUGS = new Set([
  "beam-circle",
  "beam-circle-3d",
  "clothes-rack",
  "glass-coin-carousel",
  "hanging-id-card",
  "hover-gallery",
  "image-marquee",
  "image-pageflip",
  "image-ring",
  "infinite-drift",
  "infinite-drift-2",
  "perspective-card",
  "plasma-globe",
  "scroll-trigger",
  "smokey-frame",
])

/** Separate captures for light and dark site themes. */
const THEMED_THUMB_SLUGS = new Set([
  "globe",
  "icon-cloud",
  "orbiting-circles",
])

export function threeDThumbSrc(slug: string, theme: "light" | "dark") {
  if (THEMED_THUMB_SLUGS.has(slug)) {
    return `/images/3d/${slug}-${theme}.webp`
  }
  return `/images/3d/${slug}-default.webp`
}

export function hasThreeDThumb(slug: string) {
  return DEFAULT_THUMB_SLUGS.has(slug) || THEMED_THUMB_SLUGS.has(slug)
}

export function threeDSlugFromHref(href: string) {
  return href.replace(/^\/3d\//, "").replace(/\/$/, "")
}
