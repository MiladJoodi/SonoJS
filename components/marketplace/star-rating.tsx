import { StarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/** Card: one lit star + score. Detail: five stars, lit by floor(rating). */
export function MarketplaceStarRating({
  rating,
  className,
  size = "sm",
  showValue = false,
  variant = "full",
}: {
  rating: number
  className?: string
  size?: "sm" | "md" | "lg"
  showValue?: boolean
  /** `single` = ★ + number (cards). `full` = 5 stars. */
  variant?: "single" | "full"
}) {
  const filled = Math.min(5, Math.max(0, Math.floor(rating)))
  const iconClass =
    size === "lg" ? "size-5" : size === "md" ? "size-4" : "size-3.5"
  const valueClass =
    size === "lg" ? "text-sm" : size === "md" ? "text-[13px]" : "text-[12px]"

  if (variant === "single") {
    return (
      <span
        className={cn("inline-flex items-center gap-1", className)}
        role="img"
        aria-label={`${rating.toFixed(1)} out of 5 stars`}
      >
        <StarIcon
          className={cn(iconClass, "fill-amber-400 text-amber-400")}
          aria-hidden
        />
        <span
          className={cn(
            "font-semibold tabular-nums text-[var(--sm-text)]",
            valueClass
          )}
        >
          {rating.toFixed(1)}
        </span>
      </span>
    )
  }

  return (
    <span
      className={cn("inline-flex items-center gap-1.5", className)}
      role="img"
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
    >
      <span className="inline-flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => {
          const on = i < filled
          return (
            <StarIcon
              key={i}
              className={cn(
                iconClass,
                on
                  ? "fill-amber-400 text-amber-400"
                  : "fill-transparent text-[var(--sm-border)] dark:text-white/25"
              )}
              aria-hidden
            />
          )
        })}
      </span>
      {showValue ? (
        <span
          className={cn(
            "font-semibold tabular-nums text-[var(--sm-text)]",
            valueClass
          )}
        >
          {rating.toFixed(1)}
        </span>
      ) : null}
    </span>
  )
}
