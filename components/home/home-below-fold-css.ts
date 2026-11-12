/**
 * Ensures homepage below-the-fold CSS is evaluated.
 * On `/` the page already sync-imports it; this remains for islands / soft nav.
 * Dedupes concurrent callers; safe for hard + soft navigations.
 */

const STYLE_MARKER = "data-sono-home-below-fold-css"

let loadPromise: Promise<void> | null = null

function afterNextPaint(cb: () => void) {
  if (typeof window === "undefined") return
  const run = () => requestAnimationFrame(() => requestAnimationFrame(cb))
  if (document.readyState === "complete") {
    run()
  } else {
    window.addEventListener("load", run, { once: true })
    // Fallback if `load` already raced past (bfcache / fast cache).
    run()
  }
}

/**
 * Ensures `styles/home-below-fold.css` is loaded exactly once.
 * Resolves when the dynamic CSS module has been evaluated (sheet applied).
 */
export function loadHomeBelowFoldCss(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve()
  }
  if (loadPromise) return loadPromise

  loadPromise = import("@/components/home/home-below-fold-style")
    .then(() => {
      // Mark for debugging / duplicate-guard visibility in DevTools.
      if (!document.documentElement.hasAttribute(STYLE_MARKER)) {
        document.documentElement.setAttribute(STYLE_MARKER, "1")
      }
    })
    .catch((err) => {
      // Allow retry on next call if the chunk failed.
      loadPromise = null
      throw err
    })

  return loadPromise
}

/** Kick off load after first paint (idempotent). */
export function scheduleHomeBelowFoldCss(): void {
  afterNextPaint(() => {
    void loadHomeBelowFoldCss()
  })
}
