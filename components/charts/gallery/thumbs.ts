/** Gallery thumbs: `public/images/chart/{id}-light.webp` + `{id}-dark.webp`. */

export function chartThumbSrc(id: string, theme: "light" | "dark") {
  return `/images/chart/${id}-${theme}.webp`
}

/** Dispatched on `/charts` when scroll-spy changes the active category. */
export const CHARTS_GALLERY_ACTIVE_EVENT = "sonojs:charts-gallery-active"

export function chartGallerySectionId(category: string) {
  return `chart-type-${category}`
}

export function chartGalleryHref(category: string) {
  return `/charts#${chartGallerySectionId(category)}`
}
