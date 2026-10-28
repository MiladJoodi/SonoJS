import { cn } from "@/lib/utils"

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      fill="currentColor"
      className={cn("size-[1.15em] shrink-0 text-primary", className)}
    >
      <rect
        x="2"
        y="11"
        width="4"
        height="10"
        rx="2"
        className="origin-center animate-[sono-mark-rise_0.7s_cubic-bezier(0.2,0.8,0.2,1)_both] motion-reduce:animate-none [transform-box:fill-box]"
      />
      <rect
        x="8.5"
        y="6"
        width="4"
        height="20"
        rx="2"
        className="origin-center animate-[sono-mark-rise_0.7s_cubic-bezier(0.2,0.8,0.2,1)_60ms_both] motion-reduce:animate-none [transform-box:fill-box]"
      />
      <rect
        x="15"
        y="2"
        width="4"
        height="28"
        rx="2"
        className="origin-center animate-[sono-mark-rise_0.7s_cubic-bezier(0.2,0.8,0.2,1)_120ms_both] motion-reduce:animate-none [transform-box:fill-box]"
      />
      <rect
        x="21.5"
        y="8"
        width="4"
        height="16"
        rx="2"
        className="origin-center animate-[sono-mark-rise_0.7s_cubic-bezier(0.2,0.8,0.2,1)_180ms_both] motion-reduce:animate-none [transform-box:fill-box]"
      />
      <rect
        x="27"
        y="12"
        width="4"
        height="8"
        rx="2"
        className="origin-center animate-[sono-mark-rise_0.7s_cubic-bezier(0.2,0.8,0.2,1)_240ms_both] motion-reduce:animate-none [transform-box:fill-box]"
      />
    </svg>
  )
}
