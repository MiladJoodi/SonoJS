"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"

export function CommandBar({ className }: { className?: string }) {
  const command = siteConfig.mcpInitCommand
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), 1800)
    return () => window.clearTimeout(id)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
    } catch {
      // Clipboard may fail without permission.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy command: ${command}`}
      className={cn(
        "group flex w-full max-w-xl cursor-pointer items-center gap-3 rounded-2xl border border-border/70 bg-card py-2.5 ps-5 pe-2.5 text-start shadow-soft transition-[border-color,transform] hover:border-primary active:scale-[0.992] motion-reduce:active:scale-100",
        className
      )}
    >
      <span
        aria-hidden
        className="shrink-0 font-mono text-base text-muted-foreground sm:text-lg"
      >
        $
      </span>
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-sm font-medium scrollbar-none sm:text-base [&::-webkit-scrollbar]:hidden">
        <span className="text-muted-foreground">npx </span>
        <span className="text-primary">@sonojs/ui@latest</span>
        <span className="text-muted-foreground"> mcp init</span>
      </code>
      <span
        className={cn(
          "inline-flex h-11 shrink-0 items-center gap-2 rounded-[10px] px-4 text-sm font-medium transition-colors",
          copied
            ? "bg-primary text-primary-foreground"
            : "bg-foreground text-background"
        )}
      >
        {copied ? (
          <CheckIcon className="size-4" aria-hidden />
        ) : (
          <CopyIcon className="size-4" aria-hidden />
        )}
        <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
      </span>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Command copied to clipboard" : ""}
      </span>
    </button>
  )
}
