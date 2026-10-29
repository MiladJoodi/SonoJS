"use client"

import * as React from "react"
import type { ComponentType, SVGProps } from "react"

import {
  ClaudeIcon,
  CodexIcon,
  CopilotIcon,
  CursorIcon,
  NextjsIcon,
  OpencodeIcon,
  ReactIcon,
  TailwindIcon,
  TypescriptIcon,
} from "@/components/home/icons"
import { AdobeXdIcon } from "@/registry/icons/adobe-xd"
import { AppleIcon } from "@/registry/icons/apple"
import { AsanaIcon } from "@/registry/icons/asana"
import { BitcoinIcon } from "@/registry/icons/bitcoin"
import { CanvaIcon } from "@/registry/icons/canva"
import { DiscordIcon } from "@/registry/icons/discord"
import { DribbbleIcon } from "@/registry/icons/dribbble"
import { DropboxIcon } from "@/registry/icons/dropbox"
import { FacebookIcon } from "@/registry/icons/facebook"
import { GithubIcon } from "@/registry/icons/github"
import { GoogleIcon } from "@/registry/icons/google"
import { GoogleMeetIcon } from "@/registry/icons/google-meet"
import { InstagramIcon } from "@/registry/icons/instagram"
import { LinkedinIcon } from "@/registry/icons/linkedin"
import { MicrosoftTeamsIcon } from "@/registry/icons/microsoft-teams"
import { PhotoshopIcon } from "@/registry/icons/photoshop"
import { ProjectBoardsIcon } from "@/registry/icons/project-boards"
import { SketchIcon } from "@/registry/icons/sketch"
import { SlackIcon } from "@/registry/icons/slack"
import { XIcon } from "@/registry/icons/x"
import { cn } from "@/lib/utils"

type IconComp = ComponentType<SVGProps<SVGSVGElement>>

type ScatterItem = {
  id: string
  Icon: IconComp
  x: number
  y: number
  rot: number
  size: "sm" | "md" | "lg"
  delay: number
}

/** Bare icon sizes — no chip / white tile. */
const SIZE_ICON = {
  sm: "size-7 sm:size-8",
  md: "size-8 sm:size-9",
  lg: "size-10 sm:size-11",
} as const

/**
 * Dense staggered lattice — unique icons, centers ~10% apart so they stay clear.
 */
const SCATTER: ScatterItem[] = [
  { id: "react", Icon: ReactIcon, x: 5, y: 18, rot: -10, size: "lg", delay: 0 },
  { id: "github", Icon: GithubIcon, x: 15, y: 22, rot: 8, size: "md", delay: 0.3 },
  { id: "slack", Icon: SlackIcon, x: 25, y: 16, rot: 10, size: "sm", delay: 0.15 },
  { id: "tw", Icon: TailwindIcon, x: 35, y: 22, rot: -8, size: "md", delay: 0.7 },
  { id: "google", Icon: GoogleIcon, x: 45, y: 16, rot: 4, size: "lg", delay: 0.4 },
  { id: "discord", Icon: DiscordIcon, x: 55, y: 22, rot: 11, size: "md", delay: 0.85 },
  { id: "claude", Icon: ClaudeIcon, x: 65, y: 16, rot: -12, size: "lg", delay: 0.45 },
  { id: "apple", Icon: AppleIcon, x: 75, y: 22, rot: 6, size: "sm", delay: 0.65 },
  { id: "ts", Icon: TypescriptIcon, x: 85, y: 16, rot: 9, size: "sm", delay: 0.9 },
  { id: "fb", Icon: FacebookIcon, x: 95, y: 22, rot: 12, size: "sm", delay: 0.28 },

  { id: "copilot", Icon: CopilotIcon, x: 10, y: 50, rot: -9, size: "md", delay: 0.1 },
  { id: "next", Icon: NextjsIcon, x: 20, y: 48, rot: -5, size: "lg", delay: 0.55 },
  { id: "btc", Icon: BitcoinIcon, x: 30, y: 52, rot: -8, size: "lg", delay: 0.22 },
  { id: "cursor", Icon: CursorIcon, x: 40, y: 48, rot: -6, size: "sm", delay: 0.2 },
  { id: "li", Icon: LinkedinIcon, x: 50, y: 52, rot: -10, size: "md", delay: 0.42 },
  { id: "fig", Icon: AdobeXdIcon, x: 60, y: 48, rot: 8, size: "md", delay: 1.0 },
  { id: "codex", Icon: CodexIcon, x: 70, y: 52, rot: -7, size: "lg", delay: 0.18 },
  { id: "open", Icon: OpencodeIcon, x: 80, y: 48, rot: 5, size: "md", delay: 1.05 },
  { id: "sketch", Icon: SketchIcon, x: 90, y: 52, rot: -3, size: "md", delay: 0.72 },

  { id: "ig", Icon: InstagramIcon, x: 5, y: 82, rot: -4, size: "md", delay: 0.35 },
  { id: "canva", Icon: CanvaIcon, x: 15, y: 78, rot: -6, size: "lg", delay: 0.25 },
  { id: "asana", Icon: AsanaIcon, x: 25, y: 84, rot: 12, size: "sm", delay: 0.75 },
  { id: "dropbox", Icon: DropboxIcon, x: 35, y: 78, rot: 5, size: "md", delay: 1.1 },
  { id: "dribbble", Icon: DribbbleIcon, x: 45, y: 84, rot: -9, size: "sm", delay: 0.5 },
  { id: "teams", Icon: MicrosoftTeamsIcon, x: 55, y: 78, rot: 10, size: "md", delay: 0.6 },
  { id: "x", Icon: XIcon, x: 65, y: 84, rot: 7, size: "md", delay: 0.05 },
  { id: "meet", Icon: GoogleMeetIcon, x: 75, y: 78, rot: -5, size: "sm", delay: 0.95 },
  { id: "ps", Icon: PhotoshopIcon, x: 85, y: 84, rot: 6, size: "md", delay: 0.8 },
  { id: "boards", Icon: ProjectBoardsIcon, x: 95, y: 78, rot: 9, size: "sm", delay: 0.38 },
]

const MAGNET_RADIUS = 72
const MAGNET_STRENGTH = 0.08

export function IconsScatter({ className }: { className?: string }) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const chipRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const rafRef = React.useRef(0)
  const mouseRef = React.useRef<{ x: number; y: number } | null>(null)

  const tick = React.useCallback(() => {
    rafRef.current = 0
    const mouse = mouseRef.current
    const root = rootRef.current
    if (!root) return

    chipRefs.current.forEach((chip) => {
      if (!chip) return
      if (!mouse) {
        chip.style.setProperty("--mx", "0px")
        chip.style.setProperty("--my", "0px")
        return
      }
      const rect = chip.getBoundingClientRect()
      const rootRect = root.getBoundingClientRect()
      const cx = rect.left + rect.width / 2 - rootRect.left
      const cy = rect.top + rect.height / 2 - rootRect.top
      const dx = mouse.x - cx
      const dy = mouse.y - cy
      const dist = Math.hypot(dx, dy)
      if (dist > MAGNET_RADIUS || dist < 0.01) {
        chip.style.setProperty("--mx", "0px")
        chip.style.setProperty("--my", "0px")
        return
      }
      const t = (1 - dist / MAGNET_RADIUS) * MAGNET_STRENGTH
      chip.style.setProperty("--mx", `${dx * t}px`)
      chip.style.setProperty("--my", `${dy * t}px`)
    })
  }, [])

  const schedule = React.useCallback(() => {
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(tick)
  }, [tick])

  React.useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative mx-auto aspect-[2.35/1] w-full max-w-[40rem] select-none lg:max-w-none",
        className
      )}
      aria-hidden
      onMouseMove={(e) => {
        const root = rootRef.current
        if (!root) return
        const rect = root.getBoundingClientRect()
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        }
        schedule()
      }}
      onMouseLeave={() => {
        mouseRef.current = null
        schedule()
      }}
    >
      {SCATTER.map((item, index) => (
        <div
          key={item.id}
          className="sono-icon-drift absolute"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            animationDelay: `${item.delay}s`,
          }}
        >
          <div
            ref={(el) => {
              chipRefs.current[index] = el
            }}
            className={cn(
              "text-foreground transition-transform duration-300 ease-[var(--motion-ease)]",
              "will-change-transform hover:z-10 hover:[--hs:1.08]"
            )}
            style={{
              transform: `translate3d(var(--mx, 0px), var(--my, 0px), 0) rotate(${item.rot}deg) scale(var(--hs, 1))`,
            }}
          >
            <item.Icon className={cn("shrink-0", SIZE_ICON[item.size])} />
          </div>
        </div>
      ))}
    </div>
  )
}
