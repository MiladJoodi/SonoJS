import { cn } from "@/lib/utils"

export function NextjsIcon({
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
      <g clipPath="url(#home-nextjs-clip)">
        <path
          fill="#000"
          d="M300 600a300 300 0 1 0 0-600 300 300 0 0 0 0 600"
        />
        <path
          fill="url(#home-nextjs-grad-b)"
          d="m498.4 525-268-345H180v239.9h40.4V231.3l246.3 318.2a301 301 0 0 0 31.7-24.4"
        />
        <path fill="url(#home-nextjs-grad-c)" d="M423.3 180h-40v240h40z" />
      </g>
      <defs>
        <linearGradient
          id="home-nextjs-grad-b"
          x1="17891.2"
          x2="28522.7"
          y1="21013.3"
          y2="34190.4"
        >
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="home-nextjs-grad-c"
          x1="2383.3"
          x2="2316.3"
          y1="180"
          y2="17804.8"
        >
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="home-nextjs-clip">
          <path fill="#fff" d="M0 0h600v600H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}
