/**
 * Gallery thumbs for `/popups`.
 *
 * Most items: `public/images/popups/{slug}-default.jpg`
 */

const DEFAULT_THUMB_SLUGS = new Set([
  "advent-door",
  "age-check",
  "away-notice",
  "black-friday-hero",
  "black-week",
  "blackout",
  "chrome-bloom",
  "contact",
  "cyber-monday",
  "decrypt",
  "early-gift",
  "event-invite",
  "feedback",
  "follow-us",
  "get-the-app",
  "glass-cube",
  "lights-out",
  "luck-wheel",
  "midnight-drop",
  "mystery-box",
  "new-arrival",
  "notify-me",
  "price-crash",
  "sale-tag",
  "scratch-to-win",
  "sale-signup",
  "fork-ribbon",
  "holiday-popup",
  "welcome-offer",
])

export function popupsThumbSrc(slug: string, _theme: "light" | "dark") {
  return `/images/popups/${slug}-default.jpg`
}

export function hasPopupsThumb(slug: string) {
  return DEFAULT_THUMB_SLUGS.has(slug)
}

export function popupsSlugFromHref(href: string) {
  return href.replace(/^\/popups\//, "").replace(/\/$/, "")
}
