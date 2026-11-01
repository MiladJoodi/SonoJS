import { cn } from "@/lib/utils"

export function PnpmIcon({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      viewBox="76.58987244897958 44 164.00775510204068 164"
      aria-hidden="true"
      className={cn("size-4 shrink-0", className)}
      {...props}
    >
      <path
        d="M237.6 95L187.6 95L187.6 45L237.6 45L237.6 95Z"
        fill="#f9ad00"
      />
      <path
        d="M182.59 95L132.59 95L132.59 45L182.59 45L182.59 95Z"
        fill="#f9ad00"
      />
      <path
        d="M127.59 95L77.59 95L77.59 45L127.59 45L127.59 95Z"
        fill="#f9ad00"
      />
      <path
        d="M237.6 150L187.6 150L187.6 100L237.6 100L237.6 150Z"
        fill="#f9ad00"
      />
      <path
        d="M182.59 150L132.59 150L132.59 100L182.59 100L182.59 150Z"
        fill="#ffffff"
      />
      <path
        d="M182.59 205L132.59 205L132.59 155L182.59 155L182.59 205Z"
        fill="#ffffff"
      />
      <path
        d="M237.6 205L187.6 205L187.6 155L237.6 155L237.6 205Z"
        fill="#ffffff"
      />
      <path
        d="M127.59 205L77.59 205L77.59 155L127.59 155L127.59 205Z"
        fill="#ffffff"
      />
    </svg>
  )
}
