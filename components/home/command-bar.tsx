"use client"

import { CopyButton } from "@/components/docs/copy-button"
import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"

export function CommandBar({ className }: { className?: string }) {
  const command = siteConfig.mcpInitCommand

  return (
    <div
      className={cn(
        "flex w-full max-w-xl items-center gap-2 rounded-2xl border border-border/70 bg-card py-2 ps-3.5 pe-1.5 text-start shadow-soft sm:gap-3 sm:py-2.5 sm:ps-5 sm:pe-2",
        className
      )}
    >
      <span
        aria-hidden
        className="shrink-0 font-mono text-sm text-muted-foreground sm:text-lg"
      >
        $
      </span>
      <code className="min-w-0 flex-1 overflow-x-auto overscroll-x-contain whitespace-nowrap font-mono text-[13px] font-medium [-webkit-overflow-scrolling:touch] scrollbar-none sm:text-base [&::-webkit-scrollbar]:hidden">
        <span className="text-muted-foreground">npx </span>
        <span className="text-primary">@sonojs/ui@latest</span>
        <span className="text-muted-foreground"> mcp init</span>
      </code>
      <CopyButton
        value={command}
        tone="chrome"
        tooltipIdle="Copy command"
        tooltipCopied="Copied"
        className="shrink-0"
      />
    </div>
  )
}
