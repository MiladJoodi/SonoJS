"use client"

import * as React from "react"
import Image from "next/image"
import { ShoppingBagIcon, type LucideIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

export type TemplateHeroProps = {
  className?: string
  /** Eyebrow above the H1 */
  eyebrow?: string
  title?: React.ReactNode
  description?: string
  /** Background stills under /public - defaults to Templates art */
  darkImageSrc?: string
  lightImageSrc?: string
  Icon?: LucideIcon
}

export function TemplateHero({
  className,
  eyebrow = "Templates",
  title = (
    <>
      Ship faster with <span className="text-primary">ready projects</span>
    </>
  ),
  description = "Free templates and full-stack projects - ready to ship, designed to feel like a real product.",
  darkImageSrc = "/templates/hero/hero-bg-v2.png",
  lightImageSrc = "/templates/hero/hero-bg-light.png",
  Icon = ShoppingBagIcon,
}: TemplateHeroProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  const isDark = !mounted || resolvedTheme === "dark"

  return (
    <section
      className={cn(
        "relative flex w-full flex-col items-center overflow-hidden px-4 pb-16 pt-16 text-center sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-24",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 select-none [&_img]:pointer-events-none [&_img]:select-none"
      >
        <Image
          src={darkImageSrc}
          alt=""
          fill
          priority
          draggable={false}
          sizes="100vw"
          className={cn(
            "object-cover object-center transition-opacity duration-300",
            isDark ? "opacity-100" : "opacity-0"
          )}
        />
        <Image
          src={lightImageSrc}
          alt=""
          fill
          priority
          draggable={false}
          sizes="100vw"
          className={cn(
            "object-cover object-center transition-opacity duration-300",
            isDark ? "opacity-0" : "opacity-100"
          )}
        />
      </div>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-b",
          isDark
            ? "from-black/50 via-black/35 to-black/55"
            : "from-white/60 via-white/40 to-white/65"
        )}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1100px]">
        <div className={cn("mx-auto max-w-xl", isDark ? "text-white" : "text-zinc-900")}>
          <p className="mb-2 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-primary">
            <Icon className="size-4" aria-hidden />
            {eyebrow}
          </p>
          <h1
            className={cn(
              "text-balance text-[2.25rem] font-extrabold leading-[1.15] tracking-tight sm:text-[3rem] lg:text-[3.5rem]",
              isDark ? "text-white" : "text-zinc-900"
            )}
          >
            {title}
          </h1>
          <p
            className={cn(
              "mx-auto mt-2 max-w-md text-[15px] leading-snug sm:text-base",
              isDark ? "text-white/70" : "text-zinc-600"
            )}
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}
