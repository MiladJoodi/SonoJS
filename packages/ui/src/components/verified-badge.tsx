import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@sonojs/ui/lib/utils"

/**
 * Verified seal (scalloped badge + check) — Instagram / X (Twitter) style.
 * Colors match X’s three check tiers (blue · gold · gray).
 */
const verifiedBadgeVariants = cva(
  "sonojs inline-block shrink-0 align-middle",
  {
    variants: {
      variant: {
        /** X Premium / creator — Twitter blue */
        blue: "text-[#1D9BF0]",
        /** X Organizations / business — gold */
        gold: "text-[#E2B719]",
        /** X Government / institutions — gray */
        gray: "text-[#829AAB]",
      },
      size: {
        sm: "size-3.5",
        md: "size-4",
        lg: "size-5",
      },
    },
    defaultVariants: {
      variant: "blue",
      size: "md",
    },
  }
)

function VerifiedBadge({
  className,
  variant = "blue",
  size = "md",
  title = "Verified",
  ...props
}: React.ComponentProps<"svg"> &
  VariantProps<typeof verifiedBadgeVariants> & {
    /** Accessible name for the mark. */
    title?: string
  }) {
  return (
    <svg
      data-slot="verified-badge"
      data-variant={variant}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={cn(verifiedBadgeVariants({ variant, size }), className)}
      {...props}
    >
      <title>{title}</title>
      {/* Scalloped seal */}
      <path
        fill="currentColor"
        d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.351h6.234l2.972 5.15 5.358-3.086 5.358 3.087 2.972-5.15h6.234v-5.351l5.432-3.137L40 25.359 36.905 20 40 14.641l-5.432-3.137V5.15h-6.234L25.358 0l-5.36 3.094z"
      />
      {/* Check */}
      <path
        fill="#fff"
        d="M26.311 14.538l2.254 2.287-11.43 11.5-6.837-6.93 2.244-2.258 4.587 4.581 9.182-9.18z"
      />
    </svg>
  )
}

export { VerifiedBadge, verifiedBadgeVariants }
