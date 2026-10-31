import { FreeIcon } from "@/components/icons/free-icon"
import { ProIcon } from "@/components/icons/pro-icon"
import { ProYearlyIcon } from "@/components/icons/pro-yearly-icon"
import type { PlanId } from "@/components/pricing/pricing-data"
import { cn } from "@/lib/utils"

export function PlanIcon({
  plan,
  className,
  ...props
}: React.ComponentProps<"svg"> & { plan: PlanId }) {
  if (plan === "pro-yearly") {
    return <ProYearlyIcon className={cn("size-5", className)} />
  }
  if (plan === "free") {
    return (
      <FreeIcon
        className={cn("size-5 text-zinc-500 dark:text-zinc-400", className)}
        {...props}
      />
    )
  }
  return (
    <ProIcon className={cn("size-5 text-primary", className)} {...props} />
  )
}
