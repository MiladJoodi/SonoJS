/**
 * Gallery thumbs for `/promo`.
 *
 * Most items: `public/images/promo/{slug}-default.jpg`
 */

const DEFAULT_THUMB_SLUGS = new Set([
  "sale-tag",
  "sale-signup",
  "fork-ribbon",
  "holiday-popup",
])

export function promoThumbSrc(slug: string, _theme: "light" | "dark") {
  return `/images/promo/${slug}-default.jpg`
}

export function hasPromoThumb(slug: string) {
  return DEFAULT_THUMB_SLUGS.has(slug)
}

export function promoSlugFromHref(href: string) {
  return href.replace(/^\/promo\//, "").replace(/\/$/, "")
}
