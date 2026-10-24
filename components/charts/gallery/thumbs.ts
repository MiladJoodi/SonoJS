/** Gallery thumbs: `public/chart/{id}-light.webp` + `{id}-dark.webp`. */

export function chartThumbSrc(id: string, theme: "light" | "dark") {
  return `/chart/${id}-${theme}.webp`
}

/** Survives remounts so thumbs don’t flash loading again. */
const loadedThumbSrcs = new Set<string>()

export function markThumbLoaded(src: string) {
  loadedThumbSrcs.add(src)
}

export function isThumbLoaded(src: string) {
  return loadedThumbSrcs.has(src)
}

/** First viewport thumbs load eagerly; the rest stay lazy. */
export const CHART_THUMB_EAGER_COUNT = 8

/** Dispatched on `/charts` when scroll-spy changes the active category. */
export const CHARTS_GALLERY_ACTIVE_EVENT = "sonojs:charts-gallery-active"

export function chartGallerySectionId(category: string) {
  return `chart-type-${category}`
}

export function chartGalleryHref(category: string) {
  return `/charts#${chartGallerySectionId(category)}`
}
