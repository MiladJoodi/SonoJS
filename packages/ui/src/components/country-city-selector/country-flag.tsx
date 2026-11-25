"use client"

import * as React from "react"

import { cn } from "@sonojs/ui/lib/utils"

/** Same CDN pattern as `/tools/flags` (jsDelivr → SonoJS-flags). */
export const DEFAULT_FLAG_CDN_BASE =
  "https://cdn.jsdelivr.net/gh/SonoJS/SonoJS-flags@main/flags"

export function flagSrc(code: string, base: string = DEFAULT_FLAG_CDN_BASE) {
  const iso = code.trim().slice(0, 2).toLowerCase()
  return `${base.replace(/\/$/, "")}/${iso}.svg`
}

function isoToFlagEmoji(code: string) {
  const iso = code.trim().toUpperCase().slice(0, 2)
  if (!/^[A-Z]{2}$/.test(iso)) return ""
  return String.fromCodePoint(
    ...[...iso].map((char) => 127397 + char.charCodeAt(0))
  )
}

export function CountryFlag({
  code,
  flagCdnBase = DEFAULT_FLAG_CDN_BASE,
  emojiFallback,
  className,
  size = "md",
}: {
  code: string
  flagCdnBase?: string
  emojiFallback?: string
  className?: string
  size?: "sm" | "md"
}) {
  const sourceKey = `${flagCdnBase}|${code}`
  const [failedKey, setFailedKey] = React.useState<string | null>(null)
  const failed = failedKey === sourceKey

  const box = "h-4 w-6 shrink-0 rounded-[2px]"

  if (failed) {
    const emoji = emojiFallback?.trim() || isoToFlagEmoji(code)
    if (emoji) {
      return (
        <span
          className={cn(
            size === "sm" ? "text-sm" : "text-base",
            "leading-none",
            className
          )}
          aria-hidden
        >
          {emoji}
        </span>
      )
    }
    return (
      <span
        className={cn(
          "flex items-center justify-center bg-muted text-[8px] font-semibold leading-none text-muted-foreground",
          box,
          className
        )}
        aria-hidden
      >
        {code.slice(0, 2).toUpperCase()}
      </span>
    )
  }

  return (
    <img
      src={flagSrc(code, flagCdnBase)}
      alt=""
      width={24}
      height={16}
      loading="lazy"
      decoding="async"
      aria-hidden
      className={cn("object-cover object-center", box, className)}
      onError={() => setFailedKey(sourceKey)}
    />
  )
}