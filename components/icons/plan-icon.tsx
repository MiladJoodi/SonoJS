import { FreeIcon } from "@/components/icons/free-icon"
import { ProIcon } from "@/components/icons/pro-icon"
import { ProYearlyIcon } from "@/components/icons/pro-yearly-icon"
import type { PlanId } from "@/components/pricing/pricing-data"
import { cn } from "@/lib/utils"

/** Shared plan mark colors — Monthly = check green · Yearly = primary blue. */
export const planIconTone = {
  free: "text-zinc-500 dark:text-zinc-400",
  "pro-monthly":
    "text-emerald-600 dark:text-emerald-400",
  "pro-yearly": "text-primary",
} as const

export function PlanIcon({
  plan,
  className,
  ...props
}: React.ComponentProps<"svg"> & { plan: PlanId }) {
  if (plan === "pro-yearly") {
    return (
      <ProYearlyIcon className={cn("size-5", planIconTone["pro-yearly"], className)} />
    )
  }
  if (plan === "free") {
    return (
      <FreeIcon
        className={cn("size-5", planIconTone.free, className)}
        {...props}
      />
    )
  }
  return (
    <ProIcon
      className={cn("size-5", planIconTone["pro-monthly"], className)}
      {...props}
    />
  )
}
