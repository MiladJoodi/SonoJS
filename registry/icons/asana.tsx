import { cn } from "@/lib/utils"

export function AsanaIcon({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("size-5 shrink-0", className)}
      fill="currentColor"
      {...props}
    >
      <path d="M12.021 1.108a4.837 4.837 0 1 0 0 9.675 4.837 4.837 0 0 0 0-9.675zm-6.45 11.61a4.837 4.837 0 1 0 0 9.672 4.837 4.837 0 0 0 0-9.672zm12.9 0a4.837 4.837 0 1 0 0 9.673 4.837 4.837 0 0 0 0-9.673z" />
    </svg>
  )
}
