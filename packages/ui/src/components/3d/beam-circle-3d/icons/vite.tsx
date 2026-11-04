import * as React from "react"

import { cn } from "@sonojs/ui/lib/utils"

import type { TechIconProps } from "./react"

export function ViteIcon({ className, size = 16, ...props }: TechIconProps) {
  const uid = React.useId().replace(/:/g, "")
  const gradA = `${uid}-vite-a`
  const gradB = `${uid}-vite-b`
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 410 404"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", className)}
      {...props}
    >
      <path
        d="M399.641 59.5246L215.643 388.545C211.844 395.338 202.084 395.378 198.228 388.618L10.5817 59.5563C6.38087 52.1896 12.6802 43.2665 21.0281 44.7586L205.223 77.6824C206.398 77.8924 207.601 77.8904 208.776 77.6763L389.119 44.8058C397.439 43.2894 403.823 52.1434 399.641 59.5246Z"
        fill={`url(#${gradA})`}
      />
      <path
        d="M292.965 1.5744L156.801 28.2552C154.563 28.6937 152.906 30.5903 152.771 32.8664L144.395 174.33C144.198 177.662 147.258 180.248 150.51 179.498L185.63 171.384C189.122 170.574 192.439 173.512 191.929 177.061L181.325 250.446C180.715 254.676 185.19 257.814 188.978 255.677L212.857 242.208C216.715 240.028 221.305 243.305 220.512 247.641L202.013 350.101C200.834 356.606 209.517 360.293 213.583 355.063L216.311 351.553C216.683 351.073 217.223 350.762 217.822 350.681L312.98 336.651C317.394 336.001 320.061 331.419 318.263 327.275L259.055 190.704C257.264 186.575 260.989 182.1 265.359 183.14L298.453 191.007C303.048 192.099 306.977 187.401 305.002 183.093L254.697 73.8607C252.675 69.4651 256.625 64.6661 261.115 65.7756L389.501 98.1812C394.991 99.5522 399.582 94.1314 397.071 89.0089L308.433 3.86638C305.922 -1.25604 298.386 -1.99334 292.965 1.5744Z"
        fill={`url(#${gradB})`}
      />
      <defs>
        <linearGradient
          id={gradA}
          x1="6.00017"
          y1="32.9999"
          x2="235"
          y2="344"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#41D1FF" />
          <stop offset="1" stopColor="#BD34FE" />
        </linearGradient>
        <linearGradient
          id={gradB}
          x1="194.651"
          y1="8.81818"
          x2="236.076"
          y2="292.989"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFEA83" />
          <stop offset="0.083" stopColor="#FFDD35" />
          <stop offset="1" stopColor="#FFA800" />
        </linearGradient>
      </defs>
    </svg>
  )
}
