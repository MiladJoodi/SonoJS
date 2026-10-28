import { cn } from "@/lib/utils"

export function TailwindIcon({
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
      <path
        fill="url(#home-tailwind-grad)"
        d="M300 120q-120 0-150 120 45-60 105-45c22.8 5.7 39.1 22.3 57.2 40.6C341.6 265.4 375.6 300 450 300q120 0 150-120-45 60-105 45c-22.8-5.7-39.1-22.3-57.2-40.6C408.4 154.6 374.4 120 300 120M150 300Q30 300 0 420q45-60 105-45c22.8 5.7 39.1 22.3 57.2 40.6C191.6 445.4 225.6 480 300 480q120 0 150-120-45 60-105 45c-22.8-5.7-39.1-22.3-57.2-40.6C258.4 334.6 224.4 300 150 300"
      />
      <defs>
        <linearGradient
          id="home-tailwind-grad"
          x1="-1666.7"
          x2="50153.2"
          y1="11640"
          y2="41518.1"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2298BD" />
          <stop offset="1" stopColor="#0ED7B5" />
        </linearGradient>
      </defs>
    </svg>
  )
}
