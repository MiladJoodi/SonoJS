import { cn } from "@/lib/utils"

export function OpencodeIcon({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 600 600"
      aria-hidden="true"
      className={cn("size-4 shrink-0", className)}
      {...props}
    >
      <g fillRule="evenodd">
        <path fill="#CFCECD" d="M420 480H180V240h240z" />
        <path fill="#211E1E" d="M420 120H180v360h240zm120 480H60V0h480z" />
      </g>
    </svg>
  )
}
