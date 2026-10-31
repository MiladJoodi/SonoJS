import { ProIcon } from "@/components/icons/pro-icon"
import { cn } from "@/lib/utils"

/**
 * Pro Yearly mark — same trophy as Pro, primary blue.
 */
export function ProYearlyIcon({ className }: { className?: string }) {
  return (
    <ProIcon
      className={cn("size-5 text-primary", className)}
      aria-hidden
    />
  )
}
