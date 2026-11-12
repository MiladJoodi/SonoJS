"use client"

import type { ComponentType, SVGProps } from "react"

import { GmailIcon } from "@/components/icons/stack/gmail"
import { ThreejsIcon } from "@/components/icons/stack/threejs"
import { cn } from "@/lib/utils"
import { AppleIcon } from "@/registry/icons/apple"
import { BitcoinIcon } from "@/registry/icons/bitcoin"
import { DiscordIcon } from "@/registry/icons/discord"
import { InstagramIcon } from "@/registry/icons/instagram"
import { PhotoshopIcon } from "@/registry/icons/photoshop"
import { SlackIcon } from "@/registry/icons/slack"
import { OrbitingCircles } from "@sonojs/ui/components/3d/orbiting-circles"

type IconComp = ComponentType<SVGProps<SVGSVGElement>>

function ThreejsMark({ className }: SVGProps<SVGSVGElement>) {
  return <ThreejsIcon size={22} className={className} />
}

function GmailMark({ className }: SVGProps<SVGSVGElement>) {
  return <GmailIcon size={26} className={className} />
}

function WhatsAppIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={cn("size-full shrink-0", className)}
      {...props}
    >
      <path
        fill="#25D366"
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2m0 18.15h-.01c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24s8.24 3.7 8.24 8.24-3.69 8.24-8.23 8.24m4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.48-1.38-1.73-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.76-1.84-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74 2.49 1.07 2.49.71 2.94.67.45-.05 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.17-.48-.29"
      />
    </svg>
  )
}

function TelegramIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={cn("size-full shrink-0", className)}
      {...props}
    >
      <path
        fill="#26A5E4"
        d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635"
      />
    </svg>
  )
}

/** Outer ring — well-known brands. */
const OUTER: Array<{
  Icon: IconComp
  label: string
  iconClassName?: string
}> = [
  {
    Icon: TelegramIcon,
    label: "Telegram",
  },
  {
    Icon: WhatsAppIcon,
    label: "WhatsApp",
  },
  {
    Icon: GmailMark,
    label: "Gmail",
  },
  {
    Icon: InstagramIcon,
    label: "Instagram",
    iconClassName: "text-[#E4405F]",
  },
  {
    Icon: BitcoinIcon,
    label: "Bitcoin",
    iconClassName: "text-[#F7931A]",
  },
  {
    Icon: AppleIcon,
    label: "Apple",
    iconClassName: "text-foreground",
  },
]

/** Inner ring — product stack. */
const INNER: Array<{
  Icon: IconComp
  label: string
  iconClassName?: string
}> = [
  {
    Icon: PhotoshopIcon,
    label: "Photoshop",
    iconClassName: "text-[#31A8FF]",
  },
  { Icon: ThreejsMark, label: "Three.js" },
  {
    Icon: DiscordIcon,
    label: "Discord",
    iconClassName: "text-[#5865F2]",
  },
  {
    Icon: SlackIcon,
    label: "Slack",
    iconClassName: "text-[#4A154B] dark:text-[#E01E5A]",
  },
]

export function HomeOrbitStage({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative mx-auto flex w-full items-center justify-center",
        className
      )}
      style={{ width: "100%", maxWidth: "26rem", aspectRatio: "1 / 1" }}
    >
      <OrbitingCircles
        className="border-0 bg-transparent shadow-none"
        iconSize={40}
        radius={148}
        duration={28}
        path
      >
        {OUTER.map(({ Icon, label, iconClassName }) => (
          <Icon
            key={label}
            className={cn("size-full", iconClassName)}
            aria-hidden
          />
        ))}
      </OrbitingCircles>

      <OrbitingCircles
        className="border-0 bg-transparent shadow-none"
        iconSize={30}
        radius={92}
        duration={18}
        reverse
        speed={1.15}
        path
      >
        {INNER.map(({ Icon, label, iconClassName }) => (
          <Icon
            key={label}
            className={cn("size-full", iconClassName)}
            aria-hidden
          />
        ))}
      </OrbitingCircles>
    </div>
  )
}
