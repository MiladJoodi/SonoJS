/** Shared demo stage classes — full preview surface, no nested chrome. */
export const CURSOR_STAGE_BASE =
  "relative h-[min(70vh,32rem)] min-h-[28rem] w-full overflow-hidden"

/** Light demos: white in light mode, near-black in dark. */
export const CURSOR_STAGE_LIGHT = `${CURSOR_STAGE_BASE} bg-white dark:bg-zinc-950`

/** Effects that need a black stage (neon / spotlight / click). */
export const CURSOR_STAGE_DARK = `${CURSOR_STAGE_BASE} bg-black`
