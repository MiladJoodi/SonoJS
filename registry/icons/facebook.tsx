import { cn } from "@/lib/utils"

const facebookPath =
  "M12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5C6.20101 1.5 1.5 6.20101 1.5 12C1.5 17.1752 5.24405 21.4759 10.1712 22.3413V15.2112H7.5V12.2476H10.1712V9.98883C10.1712 7.4197 11.7411 6 14.1452 6C15.2959 6 16.5 6.20024 16.5 6.20024V8.7233H15.1726C13.8657 8.7233 13.4589 9.51428 13.4589 10.3252V12.2476H16.3767L15.9103 15.2112H13.4589V22.3759C12.9525 22.4534 12.4351 22.4952 11.9084 22.4996C11.9389 22.4999 11.9694 22.5 12 22.5Z"

export function FacebookIcon({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("size-5", className)}
      {...props}
    >
      <g transform="translate(12 12) scale(1.12) translate(-12 -12)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d={facebookPath}
          fill="#0866FF"
        />
      </g>
    </svg>
  )
}
