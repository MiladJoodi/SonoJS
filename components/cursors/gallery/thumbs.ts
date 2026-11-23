import type { CursorCategory } from "@/lib/cursors-catalog"

export const CURSORS_GALLERY_ACTIVE_EVENT = "sonojs:cursors-gallery-active"

export function cursorGallerySectionId(category: CursorCategory): string {
  return `cursor-type-${category}`
}

export function cursorGalleryHref(category: CursorCategory): string {
  return `/cursors#${cursorGallerySectionId(category)}`
}

const CURSOR_THUMB_SLUGS = new Set([
  "3d-cursor",
  "agent-cursor",
  "arrow-cursor",
  "bubble-cursor",
  "character-cursor",
  "clickeffect-cursor",
  "fairydust-cursor",
  "follow-cursor",
  "glass-cursor",
  "glitch-cursor",
  "gradient-cursor",
  "ink-cursor",
  "invert-cursor",
  "magnetic-cursor",
  "morph-cursor",
  "multi-cursor",
  "neon-cursor",
  "pointer-cursor",
  "rainbow-cursor",
  "ripple-cursor",
  "scaling-cursor",
  "smooth-cursor",
  "smooth-cursor-follower",
  "snowflake-cursor",
  "spotlight-cursor",
  "springy-cursor",
  "textflag-cursor",
  "texticon-cursor",
  "trail-cursor",
])

export function cursorThumbSrc(id: string) {
  if (!CURSOR_THUMB_SLUGS.has(id)) return undefined
  return `/images/cursors/${id}.png`
}
