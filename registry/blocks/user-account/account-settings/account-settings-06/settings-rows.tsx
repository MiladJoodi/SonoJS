"use client"

import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export function SettingsCard({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-[12px] border border-border/70 bg-muted/35 dark:bg-muted/25",
        className
      )}
    >
      {children}
    </div>
  )
}

export function SettingsSectionLabel({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <p
      className={cn(
        "mb-2 ps-0.5 text-[11px] font-medium tracking-[0.06em] text-muted-foreground uppercase",
        className
      )}
    >
      {children}
    </p>
  )
}

export function SettingsRow({
  label,
  description,
  children,
  className,
}: {
  label: string
  description?: string
  children?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex min-h-[52px] w-full items-center justify-between gap-4 border-b border-border/60 py-2.5 ps-3 pe-2.5 last:border-b-0",
        className
      )}
    >
      <div className="min-w-0 flex-1 text-start">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description ? (
          <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center justify-end">{children}</div>
    </div>
  )
}
