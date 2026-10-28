import { cn } from "@/lib/utils"

export function CopilotIcon({
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
      <defs>
        <radialGradient
          id="home-copilot-a"
          cx="-2.1"
          cy="1"
          r="1"
          gradientTransform="matrix(-149.46982 -182.59044 171.69315 -140.54924 0 0)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.1" stopColor="#00AEFF" />
          <stop offset="0.8" stopColor="#2253CE" />
          <stop offset="1" stopColor="#0736C4" />
        </radialGradient>
        <radialGradient
          id="home-copilot-b"
          cx="1.9"
          cy="0.8"
          r="1"
          gradientTransform="matrix(134.7391 171.46904 -166.32964 130.7006 0 0)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFB657" />
          <stop offset="0.6" stopColor="#FF5F3D" />
          <stop offset="0.9" stopColor="#C02B3C" />
        </radialGradient>
        <radialGradient
          id="home-copilot-e"
          cx="-0.1"
          cy="-0.9"
          r="1"
          gradientTransform="matrix(-172.79753 494.15103 -591.97638 -207.00565 0 0)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.1" stopColor="#8C48FF" />
          <stop offset="0.5" stopColor="#F2598A" />
          <stop offset="0.9" stopColor="#FFB152" />
        </radialGradient>
        <linearGradient
          id="home-copilot-c"
          x1="143.2"
          x2="174.6"
          y1="75"
          y2="436.4"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.2" stopColor="#0D91E1" />
          <stop offset="0.5" stopColor="#52B471" />
          <stop offset="0.7" stopColor="#98BD42" />
          <stop offset="0.9" stopColor="#FFC800" />
        </linearGradient>
        <linearGradient
          id="home-copilot-d"
          x1="170.5"
          x2="188.2"
          y1="27.3"
          y2="421.4"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3DCBFF" />
          <stop offset="0.2" stopColor="#0588F7" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="home-copilot-f"
          x1="553.7"
          x2="553.7"
          y1="154.1"
          y2="261.8"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.1" stopColor="#F8ADFA" />
          <stop offset="0.7" stopColor="#A86EDD" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        fill="url(#home-copilot-a)"
        d="M438.3 72.6a63 63 0 0 0-60.5-45.3h-18.5a63 63 0 0 0-62 51.7l-31.6 172 7.8-26.8a63 63 0 0 1 60.6-45.4h107l45 17.5 43.3-17.5h-12.6c-28 0-52.7-18.5-60.6-45.4z"
      />
      <path
        fill="url(#home-copilot-b)"
        d="M168.2 527.1a63 63 0 0 0 60.6 45.6H268a63 63 0 0 0 63-61.5l4.3-165.8-8.9 30.4a63 63 0 0 1-60.6 45.4h-108l-38.5-20.9-41.6 21H90a63 63 0 0 1 60.6 45.5z"
      />
      <path
        fill="url(#home-copilot-c)"
        d="M375 27.3H156.3c-62.5 0-100 82.6-125 165.1-29.6 98-68.4 228.8 43.8 228.8h94.4c28.2 0 53-18.7 60.8-45.8q33.3-117.1 67.7-234c11.5-38.8 21.1-72 35.8-92.8A49 49 0 0 1 375 27.3"
      />
      <path
        fill="url(#home-copilot-d)"
        d="M375 27.3H156.3c-62.5 0-100 82.6-125 165.1-29.6 98-68.4 228.8 43.8 228.8h94.4c28.2 0 53-18.7 60.8-45.8q33.3-117.1 67.7-234c11.5-38.8 21.1-72 35.8-92.8A49 49 0 0 1 375 27.3"
      />
      <path
        fill="url(#home-copilot-e)"
        d="M225 572.7h218.7c62.5 0 100-82.6 125-165.2 29.6-97.8 68.4-228.7-43.7-228.7h-94.5a63 63 0 0 0-60.7 45.8q-33.5 117-67.8 234c-11.5 38.7-21.1 72-35.8 92.8a49 49 0 0 1-41.2 21.3"
      />
      <path
        fill="url(#home-copilot-f)"
        d="M225 572.7h218.7c62.5 0 100-82.6 125-165.2 29.6-97.8 68.4-228.7-43.7-228.7h-94.5a63 63 0 0 0-60.7 45.8q-33.5 117-67.8 234c-11.5 38.7-21.1 72-35.8 92.8a49 49 0 0 1-41.2 21.3"
      />
    </svg>
  )
}
