import { ProIcon } from "@/components/icons/pro-icon"
import { cn } from "@/lib/utils"

/**
 * Pro Yearly mark — same trophy as Pro, amber tint (no overlay sparkles).
 */
export function ProYearlyIcon({ className }: { className?: string }) {
  return (
    <ProIcon
      className={cn(
        "size-5 text-amber-600 dark:text-amber-400",
        className
      )}
      aria-hidden
    />
  )
}
