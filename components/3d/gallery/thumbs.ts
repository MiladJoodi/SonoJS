/**
 * Gallery thumbs for `/3d`: `public/images/3d/{slug}-default.webp`.
 * (Charts use light/dark pairs; 3D starts with a single capture per item.)
 */

const THUMB_SLUGS = new Set([
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
  "model-viewer",
  "perspective-card",
  "plasma-globe",
  "scroll-trigger",
  "smokey-frame",
])

export function threeDThumbSrc(slug: string) {
  return `/images/3d/${slug}-default.webp`
}

export function hasThreeDThumb(slug: string) {
  return THUMB_SLUGS.has(slug)
}

export function threeDSlugFromHref(href: string) {
  return href.replace(/^\/3d\//, "").replace(/\/$/, "")
}
