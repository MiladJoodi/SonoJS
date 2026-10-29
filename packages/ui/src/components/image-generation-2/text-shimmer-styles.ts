import type { CSSProperties } from "react"

/** Angled text mask: one sweep, then a pause (same cadence as Fisher). */
export const TEXT_SHIMMER_KEYFRAMES = `
@property --sono-mask-x {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@keyframes sono-text-shimmer {
  0% { --sono-mask-x: 100%; }
  50%, 100% { --sono-mask-x: -100%; }
}
@media (prefers-reduced-motion: reduce) {
  .sono-text-shimmer {
    animation: none !important;
    -webkit-mask-image: none !important;
    mask-image: none !important;
  }
}`

export const TEXT_SHIMMER_CLASS_NAME = "sono-text-shimmer text-foreground"

const mask =
  "linear-gradient(-75deg, white calc(var(--sono-mask-x) + 20%), transparent calc(var(--sono-mask-x) + 30%), white calc(var(--sono-mask-x) + 100%))"

export function textShimmerStyle(duration: number): CSSProperties {
  return {
    WebkitMaskImage: mask,
    maskImage: mask,
    animation: `sono-text-shimmer ${duration}s linear infinite`,
  }
}
