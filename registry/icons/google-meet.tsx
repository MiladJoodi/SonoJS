import { cn } from "@/lib/utils"

export function GoogleMeetIcon({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 512 512"
      aria-hidden="true"
      className={cn("size-5 shrink-0", className)}
      {...props}
    >
      <path fill="#ff2820" d="M128 44.8 0 172.8l64 39.617 64-39.617 36.141-64z" />
      <path fill="#0084ff" d="M128 172.8H0v166.4l64 35.145 64-35.145z" />
      <path fill="#06d" d="M0 339.2v85.333C0 448 19.2 467.2 42.667 467.2H128l36.141-67.942L128 339.2z" />
      <path fill="#00ad3c" d="M485.565 90.246 406.4 152.957v.643l-25.819 98.57 25.819 99.753 78.813 63.431c10.574 8.873 26.787 1.42 26.787-12.422V102.668c0-13.842-15.861-21.295-26.435-12.422z" />
      <path fill="#ffba00" d="M406.4 152.957v-65.98c0-23.197-18.792-42.177-41.76-42.177H128v128h156.8V256l84.244-9.385z" />
      <path fill="#00ad3c" d="M284.8 339.2H128v128h236.64c22.968 0 41.76-18.952 41.76-42.116V352l-41.793-85.861L284.8 256z" />
      <path fill="#00831e" d="m284.8 256 121.6 96V152.957z" />
    </svg>
  )
}
