/**
 * Gallery thumbs for `/carousels`: `public/images/carousel/{slug}-default.webp`.
 */

const THUMB_SLUGS = new Set([
  "3d-bend-carousel",
  "3d-carousel",
  "3d-image-carousel",
  "3d-image-slider",
  "3d-slider",
  "angled-slider",
  "chain-carousel",
  "cool-slide-gallery",
  "stylish-carousel",
])

export function carouselThumbSrc(slug: string) {
  return `/images/carousel/${slug}-default.webp`
}

export function hasCarouselThumb(slug: string) {
  return THUMB_SLUGS.has(slug)
}

export function carouselSlugFromHref(href: string) {
  return href.replace(/^\/carousels\//, "").replace(/\/$/, "")
}
