import { cn } from "@/lib/utils"

export function CursorIcon({
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
      <mask
        id="home-cursor-mask"
        width="525"
        height="600"
        x="37"
        y="0"
        maskUnits="userSpaceOnUse"
        style={{ maskType: "luminance" }}
      >
        <path fill="#fff" d="M37 0h525v600H37z" />
      </mask>
      <g mask="url(#home-cursor-mask)">
        <path
          fill="#72716d"
          d="m299.5 300 260 150.1a19 19 0 0 1-6.8 6.8l-243 140.4a20 20 0 0 1-20.4 0l-243-140.4a19 19 0 0 1-6.8-6.8z"
        />
        <path
          fill="#55544f"
          d="M299.5 0v300l-260 150.1A19 19 0 0 1 37 441V159a19 19 0 0 1 9.3-16l243-140.4A20 20 0 0 1 299.5 0"
        />
        <path
          fill="#43413c"
          d="M559.5 149.9a19 19 0 0 0-6.8-6.8L309.7 2.7A20 20 0 0 0 299.5 0v300l260 150.1a19 19 0 0 0 2.5-9.2V159q0-5-2.5-9.2z"
        />
        <path
          fill="#d6d5d2"
          d="M541.3 160.4a9 9 0 0 1 0 8.7l-236 408.8c-1.6 2.8-5.8 1.7-5.8-1.5V307a12 12 0 0 0-1.6-6z"
        />
        <path
          fill="#fff"
          d="M541.3 160.4 298 300.9a12 12 0 0 0-4.4-4.4L60.2 161.8c-2.8-1.6-1.6-5.8 1.5-5.8h472c3.4 0 6.2 1.8 7.6 4.4"
        />
      </g>
    </svg>
  )
}
