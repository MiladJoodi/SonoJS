/**
 * Shared catalog thumb grid (charts, blocks, 3D, tools).
 * Mobile: 3 columns. From `sm` up: auto-fill so column count follows viewport width.
 */
export const CATALOG_THUMB_GRID_CLASS =
  "grid grid-cols-3 gap-1.5 sm:grid-cols-[repeat(auto-fill,minmax(min(100%,220px),1fr))] sm:gap-2"

/**
 * Eager-load budget for the first visible catalog row (3 cols mobile ≈ 1 row;
 * up to ~6 on wide auto-fill). Remaining thumbs stay `loading="lazy"`.
 */
export const CATALOG_ATF_THUMB_COUNT = 6
