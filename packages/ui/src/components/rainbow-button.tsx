"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@sonojs/ui/lib/utils"
import { Slot } from "radix-ui"

const RAINBOW =
  "linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))"

/** Shell paints as inline styles — Tailwind never emits every long bg-[linear-gradient] utility. */
const SHELLS = {
  default: {
    backgroundImage: `linear-gradient(#121213,#121213),linear-gradient(#121213 50%,rgba(18,18,19,0.6) 80%,rgba(18,18,19,0)),${RAINBOW}`,
    color: "#ffffff",
    border: "0.125rem solid transparent",
  },
  white: {
    backgroundImage: `linear-gradient(#fff,#fff),linear-gradient(#fff 50%,rgba(255,255,255,0.6) 80%,rgba(0,0,0,0)),${RAINBOW}`,
    color: "#121213",
    border: "0.125rem solid transparent",
  },
  outline: {
    backgroundImage: `linear-gradient(#ffffff,#ffffff),linear-gradient(#ffffff 50%,rgba(18,18,19,0.6) 80%,rgba(18,18,19,0)),${RAINBOW}`,
    color: "#18181b",
    border: "1px solid var(--input)",
    borderBottomColor: "transparent",
  },
  "outline-dark": {
    backgroundImage: `linear-gradient(#0a0a0a,#0a0a0a),linear-gradient(#0a0a0a 50%,rgba(255,255,255,0.6) 80%,rgba(0,0,0,0)),${RAINBOW}`,
    color: "#ffffff",
    border: "1px solid var(--input)",
    borderBottomColor: "transparent",
  },
} as const

type ShellKey = keyof typeof SHELLS

const rainbowButtonVariants = cva(
  cn(
    // Match SonoJS Button control chrome (radius / type / focus), keep rainbow motion
    "sonojs relative z-0 inline-flex shrink-0 cursor-pointer items-center justify-center gap-2",
    "rounded-md text-sm font-medium whitespace-nowrap transition-all animate-rainbow",
    "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40 aria-invalid:border-destructive",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    // Shared under-glow (single class — reliably emitted)
    "before:pointer-events-none before:absolute before:bottom-[-20%] before:left-1/2 before:-z-10 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] before:bg-[length:200%] before:[filter:blur(0.75rem)]"
  ),
  {
    variants: {
      size: {
        /* Same scale as Button — default 46px on mobile/tablet/desktop */
        default: "h-[46px] gap-2 px-4 has-[>svg]:px-3",
        xs: "h-8 gap-1 rounded-md px-2.5 text-xs has-[>svg]:px-2 [&_svg:not([class*='size-'])]:size-3.5",
        sm: "h-10 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-[52px] gap-2 px-5 has-[>svg]:px-4",
        icon: "size-[46px]",
        "icon-xs": "size-8 rounded-md [&_svg:not([class*='size-'])]:size-3.5",
        "icon-sm": "size-10",
        "icon-lg": "size-[52px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function subscribeDark(onStoreChange: () => void) {
  const obs = new MutationObserver(onStoreChange)
  obs.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })
  return () => obs.disconnect()
}

function getIsDark() {
  return document.documentElement.classList.contains("dark")
}

function useIsDark() {
  return React.useSyncExternalStore(subscribeDark, getIsDark, () => false)
}

type RainbowVariantProp = "default" | "white" | "theme" | "outline"

function resolveShell(
  variant: RainbowVariantProp | null | undefined,
  isDark: boolean
): ShellKey {
  if (variant === "theme") return isDark ? "white" : "default"
  if (variant === "white") return "white"
  if (variant === "outline") return isDark ? "outline-dark" : "outline"
  return "default"
}

function RainbowButton({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  style,
  ...props
}: Omit<React.ComponentProps<"button">, "color"> &
  VariantProps<typeof rainbowButtonVariants> & {
    variant?: RainbowVariantProp | null
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"
  // false on server + first hydration paint — avoids theme mismatch vs <html class="dark">
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
  const isDark = useIsDark()
  const shell = SHELLS[resolveShell(variant, mounted && isDark)]

  return (
    <Comp
      data-slot="rainbow-button"
      data-variant={variant ?? "default"}
      data-size={size}
      className={cn(rainbowButtonVariants({ size }), className)}
      suppressHydrationWarning
      style={{
        backgroundSize: "200%",
        backgroundClip: "padding-box, border-box, border-box",
        backgroundOrigin: "border-box",
        ...style,
        ...shell,
      }}
      {...props}
    />
  )
}

export { RainbowButton, rainbowButtonVariants }
export type { RainbowVariantProp as RainbowButtonVariant }
