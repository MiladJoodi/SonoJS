import type { CursorCategory } from "@/lib/cursors-catalog"

export const CURSORS_GALLERY_ACTIVE_EVENT = "sonojs:cursors-gallery-active"

export function cursorGallerySectionId(category: CursorCategory): string {
  return `cursor-type-${category}`
}

export function cursorGalleryHref(category: CursorCategory): string {
  return `/cursors#${cursorGallerySectionId(category)}`
}
